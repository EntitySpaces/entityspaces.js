/*globals es */
/// <reference path="../Libs/jquery-1.7.1.js" />
/// <reference path="../Libs/json2.js" />
/// <reference path="../Libs/knockout-2.0.0.debug.js" />
/// <reference path="../Constants.js" />
/// <reference path="../Namespace.js" />
/// <reference path="../Utils.js" />


es.EsEntity = function () { //empty constructor
    var self, //is only set when we call 'init'
        extenders = [];

    //#region Initialization Logic
    this.routes = {};

    this.customize = function (extender) {
        extenders.push(extender);
        return this;
    };

    this.init = function () {
        self = this;

        self['___esEntity___'] = es.utils.newId(); // assign a unique id so we can test objects with this key, do equality comparison, etc...

        // before populating the data, call each extender to add the required functionality to our object        
        ko.utils.arrayForEach(extenders, function (extender) {

            //Make sure to set the 'this' properly by using 'call'
            extender.call(self);
        });

        //start change tracking
        es.utils.startTracking(self);
    };

    this.populateEntity = function (data) {
        var prop, EntityCtor, entityProp;

        //populate the entity with data back from the server...
        es.utils.extendObservable(self, data);

        //expand the Extra Columns
        es.utils.expandExtraColumns(self, true);

        //start change tracking
        es.utils.startTracking(self);

        for (prop in data) {
            if (data.hasOwnProperty(prop)) {

                if (this.esTypeDefs && this.esTypeDefs[prop]) {
                    EntityCtor = es.getType(this.esTypeDefs[prop]);
                    if (EntityCtor) {

                        entityProp = new EntityCtor();
                        if (entityProp.hasOwnProperty('___esCollection___')) { //if its a collection call 'populateCollection'
                            entityProp.populateCollection(data[prop]);
                        } else { //else call 'populateEntity'
                            entityProp.populateEntity(data[prop]);
                        }

                        this[prop] = entityProp; //then set the property back to the new Entity Object
                    }
                }
            }
        }

        //reset change tracking variables
        this.RowState(es.RowState.UNCHANGED);
        this.ModifiedColumns([]);

    };
    //#endregion

    this.applyDefaults = function () {
        //here to be overridden higher up the prototype chain
    };

    this.markAsDeleted = function () {
        var entity = this;

        if (!entity.hasOwnProperty("RowState")) {
            entity.RowState = ko.observable(es.RowStateEnum.deleted);
        } else if (entity.RowState() !== es.RowStateEnum.deleted) {
            entity.RowState(es.RowStateEnum.deleted);
        }

        if (entity.hasOwnProperty("ModifiedColumns")) {
            entity.ModifiedColumns.removeAll();
        }
    };

    //#region Loads
    this.load = function (options) {
        self = this;

        if (options.success !== undefined || options.error !== undefined) {
            options.async = true;
        } else {
            options.async = false;
        }

        //if a route was passed in, use that route to pull the ajax options url & type
        if (options.route) {
            options.url = options.route.url || this.routes[options.route].url;
            options.type = options.route.method || this.routes[options.route].method; //in jQuery, the HttpVerb is the 'type' param
        }

        // ensure that the data is flattened
        if (options.data && options.data['toJS']) {
            options.data = options.data.toJS();
        }

        //sprinkle in our own success handler, but make sure the original still gets called
        var origSuccessHandler = options.success;

        //wrap the passed in success handler so that we can populate the Entity
        options.success = function (data) {

            //populate the entity with the returned data;
            self.populateEntity(data);

            //fire the passed in success handler
            if (origSuccessHandler) { origSuccessHandler.call(self, data); }
        };

        es.dataProvider.execute(options);
    };

    this.loadByPrimaryKey = function (primaryKey, success) {

        this.load({
            route: this.routes['loadByPrimaryKey'],
            data: primaryKey,
            success: success
        });

    };
    //#endregion Save

    //#region Save
    this.save = function (success, error) {
        self = this;

        var route, options = {};

        if (success !== undefined || error !== undefined) {
            options.async = true;
        } else {
            options.async = false;
        }

        // The default unless overriden
        route = self.routes['commit'];

        switch (self.RowState()) {
            case es.RowState.ADDED:
                route = self.routes['create'] || route;
                break;
            case es.RowState.MODIFIED:
                route = self.routes['update'] || route;
                break;
            case es.RowState.DELETED:
                route = self.routes['del'] || route;
                break;
        }

        options.route = route;

        //TODO: potentially the most inefficient call in the whole lib
        options.data = es.utils.getDirtyGraph(ko.toJS(self));

        if (route) {
            options.url = route.url;
            options.type = route.method;
        }

        options.success = function (data) {
            self.populateEntity(data);
            if (success) { success.call(self, data); }
        };

        options.error = function (xhr, textStatus, errorThrown) {
            if (error) { error.call(self, { code: textStatus, message: errorThrown }); }
        };

        es.dataProvider.execute(options);
    };
    //#endregion

    // TODO : THIS CAUSE A RECURSIVE STACK OVERFLOW

    //#region Serialization
    //    this.toJS = function () {
    //        return ko.toJS(this);
    //    };

    //    this.toJSON = function () {
    //        return ko.toJSON(this);
    //    };
    //#endregion

};