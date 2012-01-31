/*globals es*/
/// <reference path="../../Libs/jquery-1.7.1.js" />
/// <reference path="../../Libs/json2.js" />
/// <reference path="../../Libs/knockout-2.0.0.debug.js" />


es.EsEntityCollection = function () {
    var obs = ko.observableArray([]);

    //define the 'es' utility object
    obs.es = {};

    //add all of our extra methods to the array
    ko.utils.extend(obs, es.EsEntityCollection.fn);

    obs.es['___esCollection___'] = es.utils.newId(); // assign a unique id so we can test objects with this key, do equality comparison, etc...
    obs.es.deletedEntities = new ko.observableArray();
    obs.es.deletedEntities([]);
    obs.es.isLoading = ko.observable(false);

    return obs;
};

es.EsEntityCollection.fn = { //can't do prototype on this one bc its a function

    filter: function (predicate) {
        var array = this();

        return ko.utils.arrayFilter(array, predicate);
    },

    prepareForJSON: function () {

        var stripped = [];

        ko.utils.arrayForEach(this(), function (entity) {
            if (entity.isDirtyGraph()) {
                stripped.push(entity);
            }
        });

        ko.utils.arrayForEach(this.es.deletedEntities(), function (entity) {
            if (entity.RowState() !== es.RowState.ADDED) {
                stripped.push(entity);
            }
        });

        return stripped;
    },

    acceptChanges: function () {

        ko.utils.arrayForEach(this(), function (entity) {
            if (entity.RowState() !== es.RowState.UNCHANGED) {
                entity.acceptChanges();
            }
        });

        this.es.deletedEntities([]);
    },

    rejectChanges: function () {
        var self = this,
            addedEntities = [],
            slot = 0,
            index = 0,
            newArr,
            i;

        ko.utils.arrayForEach(self.es.deletedEntities(), function (entity) {
            if (entity.RowState() === es.RowState.ADDED) {
                addedEntities[slot] = index;
                slot += 1;
            } else {
                entity.rejectChanges();
            }
            index += 1;
        });


        if (addedEntities.length > 0) {
            for (index = addedEntities.length - 1; index >= 0; index--) {
                this.es.deletedEntities.splice(addedEntities[index], 1);
            }
        }

        addedEntities = [];
        ko.utils.arrayForEach(this(), function (entity) {

            switch (entity.RowState()) {
                case es.RowState.MODIFIED:
                    entity.rejectChanges();
                    break;

                case es.RowState.ADDED:
                    addedEntities.push(entity);
                    break;
            }
        });

        if (addedEntities.length > 0) {
            for (i = 0; i < addedEntities.length; i++) {
                index = ko.utils.arrayIndexOf(self(), addedEntities[i]);
                if (index >= 0) {
                    self.splice(index, 1);
                }
            }
        }

        if (this.es.deletedEntities().length > 0) {
            newArr = self().concat(this.es.deletedEntities());
            self(newArr);
        }

        this.es.deletedEntities([]);
    },

    markAllAsDeleted: function () {

        var i, entity, coll, len, self = this;

        self.es.deletedEntities(self.splice(0, self().length));
        coll = self.es.deletedEntities;
        len = coll().length;

        // NOTE: Added ones are moved into the es.deletedEntities area incase reject changes is called
        //       in which case they are restored, however, during a save they are simply discarded.
        for (i = 0; i < len; i += 1) {
            entity = coll()[i];

            if (entity.RowState() === es.RowState.UNCHANGED) {

                if (!entity.hasOwnProperty("RowState")) {
                    entity.RowState = ko.observable(es.RowState.DELETED);
                } else if (entity.RowState() !== es.RowState.DELETED) {
                    entity.RowState(es.RowState.DELETED);
                }

                if (entity.hasOwnProperty("ModifiedColumns")) {
                    entity.ModifiedColumns.removeAll();
                }
            }
        }
    },

    // Can be a single entity or an array of entities
    markAsDeleted: function (entitiesOrEntityToDelete) {

        var i, entity, coll, len, arr, tempArr = [], self = this;

        if (!arguments) {
            throw new Error("The entitiesOrEntityToDelete cannot be null or undefined.");
        }

        if (es.isArray(entitiesOrEntityToDelete)) {

            tempArr = ko.utils.unwrapObservable(entitiesOrEntityToDelete);

            if (tempArr.length === 0) {
                throw new Error("The array passed in to markAsDeleted.markAsDeleted() cannot be empty.");
            }
        } else {
            for (i = 0; i < arguments.length; i++) {
                if (es.isEsEntity(arguments[i])) {
                    tempArr.push(arguments[i]);
                } else {
                    throw new Error("Invalid type passed in to markAsDeleted.markAsDeleted()");
                }
            }
        }

        arr = this.es.deletedEntities().concat(tempArr);
        this.es.deletedEntities(arr);
        this.removeAll(tempArr);

        coll = this.es.deletedEntities;
        len = coll().length;

        // NOTE: Added ones are moved into the es.deletedEntities area incase reject changes is called
        //       in which case they are restored, however, during a save they are simply discarded.
        for (i = 0; i < len; i += 1) {
            entity = coll()[i];

            if (entity.RowState() === es.RowState.UNCHANGED) {

                if (!entity.hasOwnProperty("RowState")) {
                    entity.RowState = ko.observable(es.RowState.DELETED);
                } else if (entity.RowState() !== es.RowState.DELETED) {
                    entity.RowState(es.RowState.DELETED);
                }

                if (entity.hasOwnProperty("ModifiedColumns")) {
                    entity.ModifiedColumns.removeAll();
                }
            }
        }
    },

    //call this when walking the returned server data to populate collection
    populateCollection: function (dataArray) {
        var entityTypeName = this.es.entityTypeName, // this should be set in the 'DefineCollection' call, unless it was an anonymous definition
            EntityCtor,
            finalColl = [],
            create = this.createEntity,
            entity,
            self = this;

        if (entityTypeName) {
            EntityCtor = es.getType(entityTypeName); //might return undefined
        }

        if (dataArray && es.isArray(dataArray)) {

            ko.utils.arrayForEach(dataArray, function (data) {

                //call 'createEntity' for each item in the data array
                entity = create(data, EntityCtor); //ok to pass an undefined Ctor

                if (entity !== undefined && entity !== null) { //could be zeros or empty strings legitimately
                    finalColl.push(entity);
                }
            });

            //now set the observableArray that we inherit off of
            this(finalColl);
        }
    },

    createEntity: function (entityData, Ctor) {
        var entityTypeName, // this should be set in the 'DefineCollection' call 
            EntityCtor = Ctor,
            entity;

        if (!Ctor) { //undefined Ctor was passed in
            entityTypeName = this.es.entityTypeName;
            EntityCtor = es.getType(entityTypeName); //could return undefined
        }

        if (EntityCtor) { //if we have a constructor, new it up
            entity = new EntityCtor();
            entity.populateEntity(entityData);
        } else { //else just set the entity to the passed in data
            entity = entityData;
        }

        return entity;
    },

    addNew: function () {

        var entity = null,
            EntityCtor,
            entityTypeName = this.es.entityTypeName; // this should be set in the 'DefineCollection' call, unless it was an anonymous definition

        if (entityTypeName) {
            EntityCtor = es.getType(entityTypeName);
            entity = new EntityCtor();
            this.push(entity);
        }

        return entity;
    },

    //#region Loads
    load: function (options) {
        var self = this;

        self.es.isLoading(true);

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
        var successHandler = options.success, 
            errorHandler = options.error;

        //wrap the passed in success handler so that we can populate the Entity
        options.success = function (data, options) {

            //populate the entity with the returned data;
            self.populateCollection(data);

            //fire the passed in success handler
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
    },

    loadAll: function (success, error, state) {

        var options = {
            route: this.esRoutes['loadAll']
        };

        if (arguments.length === 1 && arguments[0] && typeof arguments[0] === 'object') {
            es.utils.extend(options, arguments[0]);
        } else {
            options.success = success;
            options.error = error;
            options.state = state;
        }

        this.load(options);
    },
    //#endregion Loads

    //#region Save
    save: function (success, error, state) {
        var self = this;

        self.es.isLoading(true);

        var options = { success: success, error: error, state: state, route: self.esRoutes['commit'] };

        if (arguments.length === 1 && arguments[0] && typeof arguments[0] === 'object') {
            es.utils.extend(options, arguments[0]);
        }

        if (options.success !== undefined || options.error !== undefined) {
            options.async = true;
        } else {
            options.async = false;
        }

        //TODO: potentially the most inefficient call in the whole lib
        options.data = es.utils.getDirtyGraph(self);

        if (options.data === null) {
            // there was no data to save
            if (options.async === false) {
                self.es.isLoading(false);
                return;
            } else {
                options.success(null, options);
            }
        }

        if (options.route) {
            options.url = options.route.url;
            options.type = options.route.method;
        }

        var successHandler = options.success;
        var errorHandler = options.error;

        options.success = function (data, options) {
            self.es.deletedEntities([]);
            self.populateCollection(data);
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
    }
    //#endregion
};

es.exportSymbol('es.EsEntityCollection', es.EsEntityCollection);
es.exportSymbol('es.EsEntityCollection.markAllAsDeleted', es.EsEntityCollection.markAllAsDeleted);
es.exportSymbol('es.EsEntityCollection.loadAll', es.EsEntityCollection.loadAll);
es.exportSymbol('es.EsEntityCollection.load', es.EsEntityCollection.load);
es.exportSymbol('es.EsEntityCollection.save', es.EsEntityCollection.save);