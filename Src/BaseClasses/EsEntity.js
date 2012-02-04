/*globals es */
/// <reference path="../Libs/jquery-1.7.1.js" />
/// <reference path="../Libs/json2.js" />
/// <reference path="../Libs/knockout-2.0.0.debug.js" />
/// <reference path="../Constants.js" />
/// <reference path="../Namespace.js" />
/// <reference path="../Utils.js" />


es.EsEntity = function () { //empty constructor
    var extenders = [];

    this.customize = function (extender) {
        extenders.push(extender);
        return this;
    };

    this.init = function () {
        var self = this;

        //build out the 'es' utility object
        self.es.___esEntity___ = es.utils.newId(); // assign a unique id so we can test objects with this key, do equality comparison, etc...
        self.es.ignorePropertyChanged = false;
        self.es.originalValues = {};
        self.es.isLoading = ko.observable(false);

        //start change tracking
        es.utils.startTracking(self);

        // before populating the data, call each extender to add the required functionality to our object        
        ko.utils.arrayForEach(extenders, function (extender) {

            if (extender) {
                //Make sure to set the 'this' properly by using 'call'
                extender.call(self);
            }
        });


        this.isDirty = ko.computed(function () {
            return (self.RowState() !== es.RowState.UNCHANGED);
        });

        this.isDirtyGraph = function () {

            var propertyName, dirty = false;

            if (self.RowState() !== es.RowState.UNCHANGED) {
                return true;
            }

            for (propertyName in this.esTypeDefs) {

                if (this[propertyName] !== undefined) {
                    dirty = this[propertyName].isDirtyGraph();
                    if (dirty === true) {
                        break;
                    }
                }
            }

            return dirty;
        };
    };

    this.createObjectFromEsTypeDef = function (esTypeDef) {
        var entityProp, EntityCtor;

        if (this.esTypeDefs && this.esTypeDefs[esTypeDef]) {
            EntityCtor = es.getType(this.esTypeDefs[esTypeDef]);
            if (EntityCtor) {
                entityProp = new EntityCtor();
            }
        }

        return entityProp;
    };

    this.createObjectFromType = function (type) {
        var entityProp, EntityCtor;

        EntityCtor = es.getType(type);
        if (EntityCtor) {
            entityProp = new EntityCtor();
        }

        return entityProp;
    };

    this.prepareForJSON = function () {

        var self = this,
            stripped = {};

        ko.utils.arrayForEach(es.objectKeys(this), function (key) {

            var mappedName, srcValue;

            switch (key) {
                case 'es':
                case 'esTypeDefs':
                case 'esRoutes':
                case 'esColumnMap':
                case 'esExtendedData':
                    break;

                case 'RowState':
                    stripped['RowState'] = ko.utils.unwrapObservable(self.RowState);
                    break;

                case 'ModifiedColumns':
                    stripped['ModifiedColumns'] = ko.utils.unwrapObservable(self.ModifiedColumns);
                    break;

                default:

                    mappedName = self.esColumnMap[key];

                    if (mappedName !== undefined) {

                        srcValue = ko.utils.unwrapObservable(self[key]);

                        if (srcValue === null || (!es.isEsCollection(srcValue) && typeof srcValue !== "function" && srcValue !== undefined)) {

                            // This is a core column ...
                            if (srcValue !== null && srcValue instanceof Date) {
                                stripped[key] = utils.dateParser.serialize(srcValue);
                            } else {
                                stripped[key] = srcValue;
                            }
                        }
                    }
                    break;

            }
        });

        return stripped;
    };

    this.populateEntity = function (data) {
        var self = this,
            prop,
            EntityCtor,
            entityProp;

        self.es.ignorePropertyChanged = true;

        try {
            //blow away ModifiedColumns && orinalValues            
            if (this.hasOwnProperty("ModifiedColumns")) {
                //overwrite existing data
                this.ModifiedColumns([]);
            } else {
                this.ModifiedColumns = ko.observableArray();
            }
            this.es.originalValues = {};

            //populate the entity with data back from the server...
            es.utils.copyDataIntoEntity(self, data);

            //expand the Extra Columns
            es.utils.expandExtraColumns(self, true);

            for (prop in data) {
                if (data.hasOwnProperty(prop)) {

                    if (this.esTypeDefs && this.esTypeDefs[prop]) {
                        EntityCtor = es.getType(this.esTypeDefs[prop]);
                        if (EntityCtor) {

                            entityProp = new EntityCtor();
                            if (entityProp.es.hasOwnProperty('___esCollection___')) { //if its a collection call 'populateCollection'
                                entityProp.populateCollection(data[prop]);
                            } else { //else call 'populateEntity'
                                entityProp.populateEntity(data[prop]);
                            }

                            if (es.isEsCollection(this[prop])) {
                                this[prop](entityProp()); // Pass the entities into the already created collection
                            } else {
                                this[prop] = entityProp;  //then set the property back to the new Entity Object
                            }
                        } else {
                            // NOTE: We have a hierarchical property but the .js file for that entity wasn't included
                            //       so we need to make these regular ol' javascript objects
                            if (es.isArray(data[prop])) {
                                this[prop] = data[prop];
                                ko.utils.arrayForEach(this[prop], function (data) {
                                    // TODO : CONTINUE WALKING, TALK WITH ERIC
                                });
                            } else {
                                this[prop] = data[prop];
                                // TODO : CONTINUE WALKING, TALK WITH ERIC
                            }
                        }
                    }
                }
            }
        } finally {
            // We need to make sure we always turn this off ...
            self.es.ignorePropertyChanged = false;
        }
    };

    this.applyDefaults = function () {
        //here to be overridden higher up the prototype chain
    };

    this.acceptChanges = function () {

        //clear out originalValues so it thinks all values are original
        this.es.originalValues = {};

        //then clear out ModifiedColumns
        this.ModifiedColumns([]);

        //finally set RowState back
        this.es.ignorePropertyChanged = true;
        this.RowState(es.RowState.UNCHANGED);
        this.es.ignorePropertyChanged = false;
    };

    this.rejectChanges = function () {
        var prop;

        if (this.es.originalValues) {

            this.es.ignorePropertyChanged = true;

            //loop through the properties and revert the values back
            for (prop in this.es.originalValues) {

                //ideally RowState is handled by this as well
                this[prop](this.es.originalValues[prop]); // set the observable
            }

            // reset changes
            this.ModifiedColumns([]);
            this.es.originalValues = {};

            this.es.ignorePropertyChanged = false;
        }
    };

    this.markAsDeleted = function () {
        var entity = this;

        if (!entity.hasOwnProperty("RowState")) {
            entity.RowState = ko.observable(es.RowState.DELETED);
        } else if (entity.RowState() !== es.RowState.DELETED) {
            entity.RowState(es.RowState.DELETED);
        }

        if (entity.hasOwnProperty("ModifiedColumns")) {
            entity.ModifiedColumns.removeAll();
        }
    };

    //#region Loads
    this.load = function (options) {
        var state = {},
            self = this;

        self.es.isLoading(true);

        state.wasLoaded = false;
        state.state = options.state;

        if (options.success !== undefined || options.error !== undefined) {
            options.async = true;
        } else {
            options.async = false;
        }

        //if a route was passed in, use that route to pull the ajax options url & type
        if (options.route) {
            options.url = options.route.url || this.esRoutes[options.route].url;
            options.type = options.route.method || this.esRoutes[options.route].method; //in jQuery, the HttpVerb is the 'type' param
        }

        //sprinkle in our own handlers, but make sure the original still gets called
        var successHandler = options.success;
        var errorHandler = options.error;

        //wrap the passed in success handler so that we can populate the Entity
        options.success = function (data, options) {

            if (data !== undefined && data !== null) {

                state.wasLoaded = true;

                //populate the entity with the returned data;
                self.populateEntity(data);
            }

            //fire the passed in success handler
            if (successHandler) { successHandler.call(self, data, state); }
            self.es.isLoading(false);
        };

        options.error = function (status, responseText, options) {
            if (errorHandler) { errorHandler.call(self, status, responseText, state); }
            self.es.isLoading(false);
        };

        es.dataProvider.execute(options);

        if (options.async === false) {
            self.es.isLoading(false);
        }

        return state.wasLoaded;
    };

    this.loadByPrimaryKey = function (primaryKey, success, error, state) { // or single argument of options

        var options = {
            route: this.esRoutes['loadByPrimaryKey']
        };

        if (arguments.length === 1 && arguments[0] && typeof arguments[0] === 'object') {
            es.utils.extend(options, arguments[0]);
        } else {
            options.data = primaryKey;
            options.success = success;
            options.error = error;
            options.state = state;
        }

        return this.load(options);
    };
    //#endregion Save

    //#region Save
    this.save = function (success, error, state) {
        var self = this;

        self.es.isLoading(true);

        var options = { success: success, error: error, state: state, route: self.esRoutes['commit'] };

        switch (self.RowState()) {
            case es.RowState.ADDED:
                options.route = self.esRoutes['create'] || options.route;
                break;
            case es.RowState.MODIFIED:
                options.route = self.esRoutes['update'] || options.route;
                break;
            case es.RowState.DELETED:
                options.route = self.esRoutes['delete'] || options.route;
                break;
        }

        if (arguments.length === 1 && arguments[0] && typeof arguments[0] === 'object') {
            es.utils.extend(options, arguments[0]);
        }

        if (options.success !== undefined || options.error !== undefined) {
            options.async = true;
        } else {
            options.async = false;
        }

        // Get all of the dirty data in the entire object graph
        options.data = es.utils.getDirtyGraph(self);

        if (options.data === null) {
            // there was no data to save
            if (options.async === true) {
                options.success(null, options.state);
            }

            self.es.isLoading(false);
            return;
        }

        if (options.route) {
            options.url = options.route.url;
            options.type = options.route.method;
        }

        var successHandler = options.success,
            errorHandler = options.error;

        options.success = function (data, options) {
            self.populateEntity(data);
            if (successHandler) { successHandler.call(self, data, options.state); }
            self.es.isLoading(false);
        };

        options.error = function (status, responseText, options) {
            if (errorHandler) { errorHandler.call(self, status, responseText, options.state); }
            self.es.isLoading(false);
        };

        es.dataProvider.execute(options);

        if (options.async === false) {
            self.es.isLoading(false);
        }
    };
    //#endregion
};

es.exportSymbol('es.EsEntity', es.EsEntity);
es.exportSymbol('es.EsEntity.populateEntity', es.EsEntity.populateEntity);
es.exportSymbol('es.EsEntity.markAsDeleted', es.EsEntity.markAsDeleted);
es.exportSymbol('es.EsEntity.load', es.EsEntity.load);
es.exportSymbol('es.EsEntity.loadByPrimaryKey', es.EsEntity.loadByPrimaryKey);
es.exportSymbol('es.EsEntity.save', es.EsEntity.save);
