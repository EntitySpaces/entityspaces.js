//-------------------------------------------------------------------- 
// The entityspaces.js JavaScript library v1.0.18-pre 
// (c) EntitySpaces, LLC - http://www.entityspaces.net/ 
// 
// Built on Wed 01/25/2012 at 21:29:18.54    
// https://github.com/EntitySpaces/entityspaces.js 
// 
// License: MIT (http://www.opensource.org/licenses/mit-license.php) 
//-------------------------------------------------------------------- 
 
(function(window, undefined) { 
 
 
/*********************************************** 
* FILE: ..\Src\Namespace.js 
***********************************************/ 
﻿window['es'] = {}; //define root namespace

"use-strict";

// Google Closure Compiler helpers (used only to make the minified file smaller)
es.exportSymbol = function (publicPath, object) {
    var tokens = publicPath.split(".");
    var target = window;
    for (var i = 0; i < tokens.length - 1; i++)
        target = target[tokens[i]];
    target[tokens[tokens.length - 1]] = object;
};

var config = window.esConfig || {};

var extend = function (target, source) {
    var prop;

    if (!target || !source) {
        return;
    }

    for (prop in source) {
        target[prop] = source[prop];
    }

    return target;
};

config = extend(config, {
    //defines the namespace where the Business Objects will be stored
    namespace: 'es.objects'
});

//ensure the namespace is built out...
(function () {
    
    var path = config.namespace.split('.');
    var target = window;

    for(var i = 0; i < path.length; i++){
        if(target[path[i]] === undefined){
            target[path[i]] = {};
        }
        target = target[path[i]];
    }

    es.generatedNamespace = target;

}());


es.getGeneratedNamespaceObj = function() {
    return es.generatedNamespace;
};

es.exportSymbol('es', es); 
 
 
/*********************************************** 
* FILE: ..\Src\Constants.js 
***********************************************/ 
﻿
es.RowState = {
    INVALID: 0,
    UNCHANGED: 2,
    ADDED: 4,
    DELETED: 8,
    MODIFIED: 16
};

es.exportSymbol('es.RowState', es.RowState); 
 
 
/*********************************************** 
* FILE: ..\Src\DateParser.js 
***********************************************/ 
﻿
es.DateParser = function () {

    // From the Server
    this.deserialize = function (date) {

        var newDate = date;

        //deserialize weird .NET Date strings
        if (typeof newDate === "string") {
            if (newDate.indexOf('/Date(') === 0) {
                newDate = new Date(parseInt(newDate.substr(6)));
            }
        }

        return newDate;
    };

    // To the Server
    this.serialize = function (date, format) {
        return "\/Date(" + Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 0)  + ")\/";
    };
}; 
 
 
/*********************************************** 
* FILE: ..\Src\Core.js 
***********************************************/ 
﻿
//#region TypeCache Methods
es.getType = function (typeName) {
    var ns = es.getGeneratedNamespaceObj();
    return ns[typeName];
};

es.clearTypes = function () {
    es.generatedNamespace = {};
};

//#endregion

//#region Error Handling
es.onError = ko.observable({});
es.onError.subscribe(function (error) {
    throw JSON.stringify(error);
});

//#endregion

//#region Core Quick Methods

es.isArray = function (array) {
    if (!array) { return false; }
    return array.isArray || Object.prototype.toString.call(array) === '[object Array]';
};

es.objectKeys = Object.keys || function(obj) {
    var res = [];
    for (var key in obj) {
        res.push(key);
    }
    return res;
};

es.isEsCollection = function (coll) {
    var isEsColl = false;
    if (coll !== undefined && coll.es !== undefined && coll.es.___esCollection___ !== undefined) {
        isEsColl = true;
    } else {
        if (es.isArray(coll)) {
            if (coll.length > 0) {
                if (coll[0].hasOwnProperty("RowState")) {
                    isEsColl = true;
                }
            }
        }
    }
    return isEsColl;
};

es.isEsEntity = function (entity) {
    var isEsEnt = false;
    if (entity !== undefined && entity.es !== undefined && entity.es.___esEntity___ !== undefined) {
        isEsEnt = true;
    }
    return isEsEnt;
};

//#endregion

es.exportSymbol('es.isEsCollection', es.isEsCollection); 
 
 
/*********************************************** 
* FILE: ..\Src\utils.js 
***********************************************/ 
﻿/*globals es, ko*/

/// <reference path="../Libs/jquery-1.7.1.js" />
/// <reference path="../Libs/knockout-2.0.0.debug.js" />

var utils = {

    dateParser: new es.DateParser(),

    copyDataIntoEntity: function (target, source) {
        var prop, srcProp;

        if (!target || !source) {
            return;
        }

        for (prop in target) {

            if (source.hasOwnProperty(prop)) {

                srcProp = source[prop];

                if (typeof srcProp === "string") {
                    srcProp = utils.dateParser.deserialize(srcProp);
                }

                if (ko.isObservable(target[prop])) { //set the observable property
                    target[prop](srcProp); // set the observable
                } else {
                    target[prop] = srcProp;
                }
            }
        }

        return target;
    },

    extend: function (target, source) {
        var prop;

        if (!target || !source) {
            return;
        }

        for (prop in source) {
            target[prop] = source[prop];
        }

        return target;
    },

    addPropertyChangedHandlers: function (obj, propertyName) {

        var property = obj[propertyName];

        //only subscribe to property changes if its a ko.observable... not an ObservableArray, or a Computed
        if (ko.isObservable(property) && !(property instanceof Array) && property.__ko_proto__ !== ko.dependentObservable) {

            // This is the actual PropertyChanged event
            property.subscribe(function (originalValue) {

                var mappedName;

                if (obj.es.ignorePropertyChanged === false) {

                    mappedName = obj.esColumnMap[propertyName];

                    if (mappedName === 1) {
                        mappedName = propertyName;
                    }

                    mappedName = mappedName || propertyName;

                    if (ko.utils.arrayIndexOf(obj.ModifiedColumns(), mappedName) === -1) {

                        if (!obj.es.originalValues[propertyName]) {
                            obj.es.originalValues[propertyName] = originalValue;
                        }

                        if (propertyName !== "RowState") {

                            obj.ModifiedColumns.push(mappedName);

                            if (obj.RowState() !== es.RowState.MODIFIED && obj.RowState() !== es.RowState.ADDED) {
                                obj.RowState(es.RowState.MODIFIED);
                            }
                        }
                    }
                }
            }, obj, "beforeChange"); //subscribe to 'beforeChange' so we can be notified of the current value and not the new value!
        }
    },

    startTracking: function (entity) {

        var propertyName;

        if (!entity.hasOwnProperty("RowState")) {
            entity.RowState = ko.observable(es.RowState.ADDED);
        } else {
            if (!ko.isObservable(entity.RowState)) {
                entity.RowState = ko.observable(entity.RowState);
            }
        }

        if (entity.hasOwnProperty("ModifiedColumns")) {
            //overwrite existing data
            entity.ModifiedColumns([]);
        } else {
            entity.ModifiedColumns = ko.observableArray();
        }


        for (propertyName in entity) {
            if (propertyName !== "ModifiedColumns" &&
                propertyName !== '__type' &&
                propertyName !== 'esExtendedData' &&
                propertyName !== 'es') {

                var property = entity[propertyName];

                if (property instanceof Array) {
                    continue;
                }

                if (entity.hasOwnProperty(propertyName) && ko.isObservable(property)) {
                    utils.addPropertyChangedHandlers(entity, propertyName);
                }
            }
        }

        return entity;
    },

    expandExtraColumns: function (entity, shouldMakeObservable) {

        var data,
            i,
            ext,
            makeObservable = arguments[1] || false;

        if (entity.esExtendedData && es.isArray(entity.esExtendedData)) {

            data = ko.isObservable(entity.esExtendedData) ? entity.esExtendedData() : entity.esExtendedData;

            for (i = 0; i < data.length; i++) {

                if (ko.isObservable(entity[data[i].Key])) { //set the observable property
                    entity[data[i].Key](data[i].Value); // set the observable
                } else {
                    if (makeObservable) {
                        entity[data[i].Key] = ko.observable(data[i].Value);
                    } else {
                        entity[data[i].Key] = data[i].Value;
                    }
                }
            }

            delete entity.esExtendedData;
        }

        return entity;
    },

    getDirtyGraph: function (obj, root, dirtyGraph) {

        var propertyName, entity, arr, temp, index;

        // Check and see if we have anything dirty at all?
        if (root === undefined) {
            if (!obj.isDirtyGraph()) {
                return null;
            }
        }

        if (es.isEsEntity(obj)) {

            if (es.isArray(dirtyGraph)) {
                temp = obj.prepareForJSON();
                dirtyGraph.push(temp);
                dirtyGraph = temp;
            } else {
                dirtyGraph = obj.prepareForJSON();
            }

            if (root === undefined) {
                root = dirtyGraph;
            }

            for (propertyName in obj.esTypeDefs) {

                if (obj[propertyName] !== undefined) {

                    if (obj[propertyName].isDirtyGraph()) {

                        arr = obj[propertyName].prepareForJSON();
                        dirtyGraph[propertyName] = [];

                        for (index = 0; index < arr.length; index++) {
                            entity = arr[index];
                            es.utils.getDirtyGraph(entity, root, dirtyGraph[propertyName]);
                        }
                    }
                }
            }
        } else {

            // They passed in a collection 
            root = [];

            arr = obj.prepareForJSON();

            for (index = 0; index < arr.length; index++) {
                entity = arr[index];
                es.utils.getDirtyGraph(entity, root, root);
            }
        }

        return root;
    }
};

utils.newId = (function () {
    var seedId = new Date().getTime();

    return function () {
        return ++seedId;
    };

} ());

es.utils = utils;

es.exportSymbol('es.extend', es.extend);
es.exportSymbol('es.startTracking', es.startTracking);
es.exportSymbol('es.getDirtyGraph', es.getDirtyGraph); 
 
 
/*********************************************** 
* FILE: ..\Src\BaseClasses\EsEntity.js 
***********************************************/ 
﻿/*globals es */
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
        self.es.collection = undefined;
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

            var dirty = false;

            if (self.RowState() !== es.RowState.UNCHANGED) {
                return true;
            }

            for (propertyName in this.esTypeDefs) {

                if (this[propertyName] !== undefined) {
                    dirty = this[propertyName].isDirtyGraph();
                    if (dirty == true) {
                        break;
                    }
                }
            }

            return dirty;
        }
    };

    this.prepareForJSON = function () {

        var self = this,
            stripped = {};

        ko.utils.arrayForEach(es.objectKeys(this), function (key) {

            var mappedName, srcValue;

            switch (key) {
                case 'es':
                case 'esRoutes':
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
                            if (srcValue != null && srcValue instanceof Date) {
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

                            this[prop] = entityProp; //then set the property back to the new Entity Object
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

        if (entity.es.collection !== undefined) {
            // We are in a collection, remove it from there and add it to it's 
            // deletedEntities list
            var index = ko.utils.arrayIndexOf(entity.es.collection(), entity);
            if (index >= 0) {
                var obj = entity.es.collection.splice(index, 1);
            }
            entity.es.collection.es.deletedEntities.push(obj[0]);
        }

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
        var successHandler = options.success;
        var errorHandler = options.error;

        //wrap the passed in success handler so that we can populate the Entity
        options.success = function (data, options) {

            //populate the entity with the returned data;
            self.populateEntity(data);

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

        this.load(options);
    };
    //#endregion Save

    //#region Save
    this.save = function (success, error, state) {
        var self = this;

        self.es.isLoading(true);

        var options = { success: success, error: error, state: state, route: self.esRoutes['commit'] }

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

        var root = undefined;

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
 
 
 
/*********************************************** 
* FILE: ..\Src\BaseClasses\EsEntityCollection.js 
***********************************************/ 
﻿/*globals es*/
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
    obs.es.isLoading = ko.observable(false);

    return obs;
};

es.EsEntityCollection.fn = { //can't do prototype on this one bc its a function

    filter: function (predicate) {
        var array = this();

        return ko.utils.arrayFilter(array, predicate);
    },

    prepareForJSON: function () {

        var stripped = [],
            self = this;

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

        var self = this;

        ko.utils.arrayForEach(this(), function (entity) {
            if (entity.RowState() !== es.RowState.UNCHANGED) {
                entity.acceptChanges();
            }
        });

        this.es.deletedEntities([]);
    },

    rejectChanges: function () {
        var self = this;

        var addedEntities = [],
            slot = 0,
            index = 0,
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
                var index = ko.utils.arrayIndexOf(self(), addedEntities[i]);
                if (index >= 0) {
                    var obj = self.splice(index, 1);
                }
            }
        }

        if (this.es.deletedEntities().length > 0) {
            var newArr = self().concat(this.es.deletedEntities());
            self(newArr);
        }

        this.es.deletedEntities([]);
    },

    markAllAsDeleted: function () {

        var i, entity, coll, len, arr;

        if (arguments.length > 0) {
            arr = this.es.deletedEntities().concat(arguments[0]());
            this.es.deletedEntities(arr);

            this.removeAll(arguments[0]());
        } else {
            this.es.deletedEntities(this.splice(0, this().length));
        }

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
                entity.es.collection = self;

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
            entity.es.collection = this;
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
        var successHandler = options.success;
        var errorHandler = options.error;

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

        var options = { success: success, error: error, state: state, route: self.esRoutes['commit'] }

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
 
 
/*********************************************** 
* FILE: ..\Src\BaseClasses\DefineEntity.js 
***********************************************/ 
﻿
es.defineEntity = function (typeName, constrctor) {
    var isAnonymous = (typeof (typeName) !== 'string'),
        Ctor = isAnonymous ? arguments[0] : arguments[1];

    var EsCtor = function () {
        this.es = {};

        //MUST do this here so that obj.hasOwnProperty actually returns the keys in the object!
        Ctor.call(this);

        //call apply defaults here before change tracking is enabled
        this.applyDefaults();

        //call the init method on the base prototype
        this.init();

        // Are they initializing it during construction?
        if (arguments[0]) {
            this.populateEntity(arguments[0]);
        } 
    };

    //Setup the prototype chain correctly
    EsCtor.prototype = new es.EsEntity();

    //add it to the correct namespace if it isn't an anonymous type
    if (!isAnonymous) {
        es.generatedNamespace[typeName] = EsCtor;
    }

    return EsCtor;
};

es.exportSymbol('es.defineEntity', es.defineEntity); 
 
 
/*********************************************** 
* FILE: ..\Src\BaseClasses\DefineCollection.js 
***********************************************/ 
﻿
es.defineCollection = function (typeName, entityName) {
    var isAnonymous = (typeof (typeName) !== 'string'),
        ctorName = isAnonymous ? arguments[0] : arguments[1];

    var EsCollCtor = function () {

        var coll = new es.EsEntityCollection();

        //add the type definition;
        coll.es.entityTypeName = ctorName;

        this.init.call(coll); //Trickery and sorcery on the prototype

        return coll;

    };

    var F = function () {
        var base = this,
            extenders = [];



        this.init = function () {
            var self = this;

            //loop through the extenders and call each one
            ko.utils.arrayForEach(extenders, function (ext) {

                //make sure to set 'this' properly
                ext.call(self);
            });

            //loop through all the PROTOTYPE methods/properties and tack them on
            for (var prop in base) {
                if (base.hasOwnProperty(prop) && prop !== "init" && prop !== "customize") {

                    self[prop] = base[prop];

                }
            }

            /*
            this.isDirty = ko.computed(function () {

            var i,
            entity,
            arr = self(),
            dirty = false;

            if (self.es.deletedEntities().length > 0) {
            dirty = true;
            } else if (arr.length > 0 && arr[arr.length - 1].isDirty()) {
            dirty = true;
            } else {
            for (i = 0; i < arr.length; i++) {

            entity = arr[i];

            if (entity.RowState() !== es.RowState.UNCHANGED) {
            dirty = true;
            break;
            }
            }
            }

            return dirty;
            });
            */


            this.isDirty = function () {

                var i,
            entity,
            arr = self(),
            dirty = false;

                if (this.es.deletedEntities().length > 0) {
                    dirty = true;
                } else if (arr.length > 0 && arr[arr.length - 1].isDirty()) {
                    dirty = true;
                } else {
                    for (i = 0; i < arr.length; i++) {

                        entity = arr[i];

                        if (entity.RowState() !== es.RowState.UNCHANGED) {
                            dirty = true;
                            break;
                        }
                    }
                }

                return dirty;
            };


            this.isDirtyGraph = function () {

                // Rather than just call isDirty() above we dup the logic here
                // for performance so we do not have to walk all of the entities twice
                var i,
                    entity,
                    arr = self(),
                    dirty = false;

                if (this.es.deletedEntities().length > 0) {
                    dirty = true;
                } else if (arr.length > 0 && arr[arr.length - 1].isDirty()) {
                    dirty = true;
                } else {
                    for (i = 0; i < arr.length; i++) {

                        entity = arr[i];

                        if (entity.RowState() !== es.RowState.UNCHANGED) {
                            dirty = true;
                            break;
                        } else {
                            dirty = entity.isDirtyGraph();
                            if (dirty === true) {
                                break;
                            }
                        }
                    }
                }

                return dirty;
            };
        };

        this.customize = function (customizer) {

            extenders.push(customizer);

        };
    };

    EsCollCtor.prototype = new F();

    //add it to the correct namespace if it isn't an anonymous type
    if (!isAnonymous) {
        es.generatedNamespace[typeName] = EsCollCtor;
    }

    return EsCollCtor;
};

es.exportSymbol('es.defineCollection', es.defineCollection);

 
 
 
/*********************************************** 
* FILE: ..\Src\Providers\XMLHttpRequestProvider.js 
***********************************************/ 
﻿/* File Created: December 23, 2011 */

es.XMLHttpRequestProvider = function () {

    var createRequest, executeCompleted, noop = function () { };
    this.baseURL = "http://localhost";

    createRequest = function () {

        var xmlHttp;

        // Create HTTP request
        try {
            xmlHttp = new XMLHttpRequest();
        } catch (e1) {
            try {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e2) {
                try {
                    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e3) {
                    alert("This sample only works in browsers with AJAX support");
                    return false;
                }
            }
        }

        return xmlHttp;
    };

    executeCompleted = function (responseText, route) {

        var response = {
            data: JSON.parse(responseText),
            error: undefined
        };

        if (route.response !== undefined) {
            switch (route.response) {
                case 'entity':
                case 'collection':
                    response.error = response.data['exception'];
                    response.data = response.data[route.response];
                    break;
            }
        }

        return response;
    };

    // Called by the entityspaces.js framework when working with entities
    this.execute = function (options) {

        var path = null, xmlHttp, success, error, response;

        success = options.success || noop;
        error = options.error || noop;

        // Create HTTP request
        xmlHttp = createRequest();

        // Build the operation URL
        path = this.baseURL + options.url;

        // Make the HTTP request
        xmlHttp.open("POST", path, options.async || false);
        xmlHttp.setRequestHeader("Content-type", "application/json; charset=utf-8");

        if (options.async === true) {
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4) {

                    response = executeCompleted(xmlHttp.responseText, options.route);

                    if (xmlHttp.status === 200 && response.error === null) {
                        success(response.data, options);
                    } else {
                        error(xmlHttp.status, response.error || xmlHttp.responseText, options);
                    }
                }
            };
        }

        xmlHttp.send(ko.toJSON(options.data));

        if (options.async === false) {

            response = executeCompleted(xmlHttp.responseText, options.route);

            if (xmlHttp.status === 200 && response.error === null) {
                if (xmlHttp.responseText !== '{}' && xmlHttp.responseText !== "") {
                    success(response.data, options);
                }
            } else {
                error(xmlHttp.status, response.error || xmlHttp.responseText, options)
            }
        }
    };

    // So developers can make their own requests, synchronous or aynchronous
    this.makeRequest = function (url, methodName, params, successCallback, failureCallback) {

        var theData = null, path = null, async = false, xmlHttp, success, failure;

        if (successCallback !== undefined || failureCallback !== undefined) {
            async = true;
            success = successCallback || noop;
            failure = failureCallback || noop;
        }

        // Create HTTP request
        xmlHttp = createRequest();

        // Build the operation URL
        path = url + methodName;

        // Make the HTTP request
        xmlHttp.open("POST", path, async);
        xmlHttp.setRequestHeader("Content-type", "application/json; charset=utf-8");

        if (async === true) {
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4) {
                    if (xmlHttp.status === 200) {
                        success(JSON.parse(xmlHttp.responseText));
                    } else {
                        failure(xmlHttp.status, xmlHttp.statusText);
                    }
                }
            };
        }

        xmlHttp.send(params);

        if (async === false) {
            if (xmlHttp.status === 200) {
                if (xmlHttp.responseText !== '{}' && xmlHttp.responseText !== "") {
                    theData = JSON.parse(xmlHttp.responseText);
                }
            } else {
                es.makeRequstError = xmlHttp.statusText;
            }
        }

        return theData;
    };
};

es.dataProvider = new es.XMLHttpRequestProvider(); //assign default data provider 
}(window)); 
