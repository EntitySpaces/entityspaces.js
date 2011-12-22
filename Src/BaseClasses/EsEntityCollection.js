/*globals es*/
/// <reference path="../../Libs/jquery-1.7.1.js" />
/// <reference path="../../Libs/json2.js" />
/// <reference path="../../Libs/knockout-2.0.RC.js" />


es.EsEntityCollection = function () {
    var obs = ko.observableArray([]);

    //add all of our extra methods to the array
    ko.utils.extend(obs, es.EsEntityCollection.fn);

    obs['___esCollection___'] = es.utils.newId(); // assign a unique id so we can test objects with this key, do equality comparison, etc...


    return obs;
};

es.EsEntityCollection.fn = { //can't do prototype on this one bc its a function

    filter: function (predicate) {
        var array = this();

        return ko.utils.arrayFilter(array, predicate);
    },

    markAllAsDeleted: function () {
        var i, entity,
            coll = this(),
            len = coll.length;

        for (i = 0; i < len; i += 1) {
            entity = coll[i];
            if (entity['markAsDeleted']) {
                entity.markAsDeleted();
            }
        }
    },

    //call this when walking the returned server data to populate collection
    populateCollection: function (dataArray) {
        var entityTypeName = this.entityTypeName, // this should be set in the 'DefineCollection' call, unless it was an anonymous definition
            EntityCtor,
            finalColl = [],
            create = this.createEntity,
            entity;

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
            entityTypeName = this.entityTypeName;
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

    //#region Loads
    load: function (options) {
        var self = this;

        //if a route was passed in, use that route to pull the ajax options url & type
        if (options.route) {
            options.url = this.routes[options.route].url;
            options.type = this.routes[options.route].method; //in jQuery, the HttpVerb is the 'type' param
        }

        // ensure that the data is flattened
        if (options.data['toJS']) {
            options.data = options.data.toJS();
        }

        //sprinkle in our own success handler, but make sure the original still gets called
        var origSuccessHandler = options.success;

        //wrap the passed in success handler so that we can populate the Entity
        options.success = function (data) {

            //populate the entity with the returned data;
            self.populateCollection(data);

            //fire the passed in success handler
            if (origSuccessHandler) { origSuccessHandler.call(self, data); }
        };

        es.dataProvider.execute(options);
    },
    //#endregion Save

    //#region Save
    save: function () {
        var self = this, 
            route,
            ajaxOptions = {
                data: self.toJS()
            };

        if (route) {
            ajaxOptions.url = route.url;
            ajaxOptions.type = route.method;
        }

        ajaxOptions.success = function (data) {
            self.populateCollection(data);
        };

        es.dataProvider.execute(ajaxOptions);
    },
    //#endregion

    //#region Serialization
    toJS: function () {
        return ko.toJS(this()); //use this() to pull the array out
    },

    toJSON: function () {
        return ko.toJSON(this()); //use this() to pull the array out
    }

};