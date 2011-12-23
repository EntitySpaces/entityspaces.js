(function(window, undefined){ 
 
 
/*********************************************** 
* FILE: ..\Src\Namespace.js 
***********************************************/ 
﻿
window['es'] = {}; //define root namespace

"use-strict";

var config = window.esConfig || {};

config = $.extend(config, {
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


es.getGeneratedNamespaceObj = function(){
        
    return es.generatedNamespace;
};
 
 
 
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

es.isEsCollection = function (array) {
    var isEsArray = false;

    if (es.isArray(array)) {

        if (array.length > 0) {
            if (array[0].hasOwnProperty("RowState")) {
                isEsArray = true;
            }
        }

    }
    return isEsArray;
};

//#endregion
 
 
 
/*********************************************** 
* FILE: ..\Src\utils.js 
***********************************************/ 
﻿/*globals es, ko*/

/// <reference path="../Libs/jquery-1.7.1.js" />
/// <reference path="../Libs/knockout-2.0.0.debug.js" />

var utils = {

    extendObservable: function (target, source) {
        var prop;

        if (!target || !source) {
            return;
        }

        for (prop in target) {

            if (source.hasOwnProperty(prop)) {

                if (ko.isObservable(target[prop])) { //set the observable property

                    target[prop](source[prop]); // set the observable
                } else {

                    target[prop] = source[prop];
                }
            }
        }

        return target;
    },

    addPropertyChangedHandlers: function (obj, propertyName) {

        var property = obj[propertyName];
        if (ko.isObservable(property) && !(property instanceof Array)) {

            // This is the actual PropertyChanged event
            property.subscribe(function () {
                if (ko.utils.arrayIndexOf(obj.ModifiedColumns(), propertyName) === -1) {

                    if (propertyName !== "RowState") {
                        obj.ModifiedColumns.push(propertyName);

                        if (obj.RowState() !== es.RowState.MODIFIED && obj.RowState() !== es.RowState.ADDED) {
                            obj.RowState(es.RowState.MODIFIED);
                        }
                    }
                }
            });
        }
    },

    startTracking: function (entity) {

        var propertyName;

        if (!entity.hasOwnProperty("RowState")) {
            entity.RowState = ko.observable(es.RowState.ADDED);
            if (entity.hasOwnProperty("__ko_mapping__")) {
                entity.__ko_mapping__.mappedProperties["RowState"] = true;
            }
        } else {
            if (!ko.isObservable(entity.RowState)) {
                entity.RowState = ko.observable(entity.RowState);
            }
        }

        if (!entity.hasOwnProperty("ModifiedColumns")) {
            entity.ModifiedColumns = ko.observableArray();
            if (entity.hasOwnProperty("__ko_mapping__")) {
                entity.__ko_mapping__.mappedProperties["ModifiedColumns"] = true;
            }
        } else {
            if (!ko.isObservable(entity.ModifiedColumns)) {
                entity.ModifiedColumns = ko.observable(entity.ModifiedColumns);
            }
        }

        for (propertyName in entity) {
            if (propertyName !== 'RowState' && propertyName !== "ModifiedColumns" && propertyName !== '__type' && propertyName !== 'esExtendedData') {

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
        var data, i, ext,
                makeObservable = arguments[1] || false;

        if (entity.esExtendedData && es.isArray(entity.esExtendedData)) {

            data = ko.utils.unwrapObservable(entity.esExtendedData);

            for (i = 0; i < data.length; i++) {

                if (makeObservable) {
                    entity[ko.utils.unwrapObservable(data[i].Key)] = ko.observable(ko.utils.unwrapObservable(data[i].Value));
                } else {
                    entity[ko.utils.unwrapObservable(data[i].Key)] = ko.utils.unwrapObservable(data[i].Value);
                }

                if (entity.hasOwnProperty("__ko_mapping__")) {
                    if (entity.__ko_mapping__.hasOwnProperty("mappedProperties")) {
                        entity.__ko_mapping__.mappedProperties[ko.utils.unwrapObservable(data[i].Key)] = true;
                    }
                }
            }

            ext = ko.utils.unwrapObservable(entity.esExtendedData);
            delete entity.esExtendedData;
        }

        if (data !== undefined) {

            entity["esExtendedData"] = [];

            for (i = 0; i < data.length; i++) {
                entity.esExtendedData.push(ko.utils.unwrapObservable(data[i].Key));
            }
        }

        return entity;
    },

    removeExtraColumns: function (entity) {
        var i;

        if (entity.esExtendedData && es.isArray(entity.esExtendedData)) {

            var data = ko.utils.unwrapObservable(entity.esExtendedData);

            for (i = 0; i < data.length; i++) {
                delete entity[data[i]];
            }
            delete entity.esExtendedData;
        }

        return entity;
    },

    // private function used by 'getDirtyEntities' below
    shallowCopy: function (src) {
        if (typeof src === 'object' && src !== null) {
            var dst;

            if (es.isArray(src)) {
                dst = [];
            }
            else if (src instanceof Date) {
                dst = new Date(src);
            }
            else if (src instanceof Boolean) {
                dst = new Boolean(src);
            }
            else if (src instanceof Number) {
                dst = new Number(src);
            }
            else if (src instanceof String) {
                dst = new String(src);
            }
            else if (Object.create && Object.getPrototypeOf) {
                dst = Object.create(Object.getPrototypeOf(src));
            }
            else if (src.__proto__ || src.constructor.prototype) {
                var proto = src.__proto__ || src.constructor.prototype || {};
                var T = function () { };
                T.prototype = proto;
                dst = new T;
                if (!dst.__proto__) { dst.__proto__ = proto; }
            }

            ko.utils.arrayForEach(es.objectKeys(src), function(key) {
                if (!es.isEsCollection(src[key])) {
                    dst[key] = src[key];
                }
            });
            return dst;
        } else {
            return src;
        }
    },

    getDirtyGraph: function (obj) {

        var i, k, dirty, paths = [], root = null;

        es.Visit(obj).forEach(function (theObj) {

            if (this.key === "esExtendedData") {
                this.block();
            } else {

                if (this.isLeaf === false) {

                    if (theObj instanceof Array) { return theObj; }

                    if (theObj.hasOwnProperty("RowState")) {

                        switch (theObj.RowState) {

                            case es.RowState.ADDED:
                            case es.RowState.DELETED:
                            case es.RowState.MODIFIED:

                                paths.push(this.path);
                                break;
                        }
                    }
                }
            }

            return theObj;
        });

        //#region Rebuild tree of dirty objects from "paths[]"
        if (paths.length > 0) {

            if (es.isArray(obj)) {
                dirty = [];
            } else {
                dirty = utils.shallowCopy(utils.removeExtraColumns(obj));
            }

            root = dirty;

            for (i = 0; i < paths.length; i++) {

                var thePath = paths[i];
                var data = obj;
                dirty = root;

                for (k = 0; k < thePath.length; k++) {

                    if (!dirty.hasOwnProperty(thePath[k])) {

                        if (es.isArray(data[thePath[k]])) {
                            dirty[thePath[k]] = [];
                            dirty = dirty[thePath[k]];
                        }
                    } else {
                        dirty = dirty[thePath[k]];
                    }

                    data = data[thePath[k]];
                }

                data = utils.removeExtraColumns(data);

                if (es.isArray(dirty)) {
                    dirty.push(utils.shallowCopy(data));
                } else {
                    dirty = utils.shallowCopy(data);
                }
            }
        }
        //#endregion Save

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
 
 
 
/*********************************************** 
* FILE: ..\Src\Visitor.js 
***********************************************/ 
﻿
es.Visit = function (obj) {
    if (!(this instanceof es.Visit)) {
        return new es.Visit(obj);
    }
    this.value = obj;
};

es.Visit.prototype.forEach = function (cb) {
    this.value = walk(this.value, cb, false);
    return this.value;
};

var walk = function(root, cb, immutable) {
    var path = [];
    var parents = [];
    var alive = true;

    var forEach = function (xs, fn) {
        if (xs.forEach) return xs.forEach(fn)
        else for (var i = 0; i < xs.length; i++) {
            fn(xs[i], i, xs);
        }
    };

    return (function walker(node_) {
        var node = immutable ? copy(node_) : node_;
        var modifiers = {};

        var keepGoing = true;

        var state = {
            node: node,
            node_: node_,
            path: [].concat(path),
            parent: parents[parents.length - 1],
            parents: parents,
            key: path.slice(-1)[0],
            isRoot: path.length === 0,
            level: path.length,
            circular: null,
            update: function (x, stopHere) {
                if (!state.isRoot) {
                    state.parent.node[state.key] = x;
                }
                state.node = x;
                if (stopHere) { keepGoing = false; }
            },
            'delete': function (stopHere) {
                delete state.parent.node[state.key];
                if (stopHere) { keepGoing = false; }
            },
            remove: function (stopHere) {
                if (es.isArray(state.parent.node)) {
                    state.parent.node.splice(state.key, 1);
                } else {
                    delete state.parent.node[state.key];
                }
                if (stopHere) { keepGoing = false; }
            },
            keys: null,
            before: function (f) { modifiers.before = f; },
            after: function (f) { modifiers.after = f; },
            pre: function (f) { modifiers.pre = f; },
            post: function (f) { modifiers.post = f; },
            stop: function () { alive = false; },
            block: function () { keepGoing = false; }
        };

        if (!alive) { return state; }

        if (typeof node === 'object' && node !== null) {
            state.keys = es.objectKeys(node);

            state.isLeaf = state.keys.length === 0;

            for (var i = 0; i < parents.length; i++) {
                if (parents[i].node_ === node_) {
                    state.circular = parents[i];
                    break;
                }
            }
        }
        else {
            state.isLeaf = true;
        }

        state.notLeaf = !state.isLeaf;
        state.notRoot = !state.isRoot;

        // use return values to update if defined
        var ret = cb.call(state, state.node);
        if (ret !== undefined && state.update) state.update(ret);

        if (modifiers.before) modifiers.before.call(state, state.node);

        if (!keepGoing) return state;

        if (typeof state.node === 'object' && state.node !== null && !state.circular) {
            parents.push(state);

            forEach(state.keys, function (key, i) {
                path.push(key);

                if (modifiers.pre) modifiers.pre.call(state, state.node[key], key);

                var child = walker(state.node[key]);
                if (immutable && Object.hasOwnProperty.call(state.node, key)) {
                    state.node[key] = child.node;
                }

                child.isLast = i == state.keys.length - 1;
                child.isFirst = i == 0;

                if (modifiers.post) modifiers.post.call(state, child);

                path.pop();
            });
            parents.pop();
        }

        if (modifiers.after) modifiers.after.call(state, state.node);

        return state;
    })(root).node;
};



 
 
 
/*********************************************** 
* FILE: ..\Src\Providers\ajaxProvider.js 
***********************************************/ 
﻿/*globals es*/
/// <reference path="../Libs/jquery-1.7.1.js" />
/// <reference path="../Libs/json2.js" />

//set this up so we match jQuery's api style... if we want to rip it out later, we can...
es.AjaxProvider = function () {
    var noop = function () { };
    var parameterizeUrl = function (url, data) {
        var rurlDataExpr = /\{([^\}]+)\}/g;
        var newUrl;

        if (typeof data === "string") {
            return;
        }

        //thanks AmplifyJS for this little tidbit
        // url = "/Product/{id}" => "/Product/57966910-C5EF-400A-8FC4-615159D95C2D
        newUrl = url.replace(rurlDataExpr, function (m, key) {
            if (key in data) {
                return ko.utils.unwrapObservable(data[key]);
            }
        });

        return newUrl;
    };


    this.execute = function (options) {
        var origSuccess = options.success || noop,
            origError = options.error || noop,
            defaults = {
                cache: false,
                accepts: 'application/json; charset=utf-8;',
                contentType: 'application/json; charset=utf-8;',
                dataType: 'json',
                type: 'GET'
            };

        //extend the defaults with our options
        options = $.extend(defaults, options);

        // override the passed in successHandler so we can add global processing if needed
        options.success = function (data) {
            origSuccess(data);
        };

        // override the passed in errorHandler so we can add global processing if needed
        options.error = function (jqXHR, textStatus, errorThrown) {
            origError(jqXHR, textStatus, errorThrown);
            es.onError({ code: textStatus, message: errorThrown });
        };

        //parameterize the Url
        options.url = parameterizeUrl(options.url, options.data);

        $.ajax(options);
    };
};
    

es.dataProvider = new es.AjaxProvider(); //assign default data provider 
 
 
/*********************************************** 
* FILE: ..\Src\Providers\XMLHttpRequestProvider.js 
***********************************************/ 
﻿/* File Created: December 23, 2011 */

es.XMLHttpRequestProvider = function () {

    this.baseURL = "http://localhost";

    this.execute = function (options) {

        var theData = null, path = null, xmlHttp;

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

        // Build the operation URL
        path = this.baseURL + options.route.url;

        // Make the HTTP request
        xmlHttp.open("POST", path, options.synchronous || false);
        xmlHttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xmlHttp.send(ko.toJSON(options.data));

        if (xmlHttp.status === 200) {
            if (xmlHttp.responseText !== '{}' && xmlHttp.responseText !== "") {
                theData = JSON.parse(xmlHttp.responseText);
            }
        } else {
            var error = true;
            //es.makeRequstError = xmlHttp.responseText;
        }

        return theData;
    };
};


es.dataProvider = new es.XMLHttpRequestProvider(); //assign default data provider 
 
 
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
    this.save = function (origSuccess, origError) {
        self = this;

        var route,
            options = {};

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

        //TODO: potentially the most inefficient call in the whole lib
        options.data = es.utils.getDirtyGraph(this.toJS(self));

        if (route) {
            options.url = route.url;
            options.type = route.method;
        }

        options.success = function (data) {
            self.populateEntity(data);
            origSuccess.call(self, data);
        };

        options.error = function (xhr, textStatus, errorThrown) {
            origError.call(self, { code: textStatus, message: errorThrown });
        };

        es.dataProvider.execute(options);
    };
    //#endregion

    //#region Serialization
    this.toJS = function () {
        return ko.toJS(this);
    };

    this.toJSON = function () {
        return ko.toJSON(this);
    };
    //#endregion

}; 
 
 
/*********************************************** 
* FILE: ..\Src\BaseClasses\EsEntityCollection.js 
***********************************************/ 
﻿/*globals es*/
/// <reference path="../../Libs/jquery-1.7.1.js" />
/// <reference path="../../Libs/json2.js" />
/// <reference path="../../Libs/knockout-2.0.0.debug.js" />


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
 
 
/*********************************************** 
* FILE: ..\Src\BaseClasses\DefineEntity.js 
***********************************************/ 
﻿
es.defineEntity = function (typeName, constrctor) {
    var isAnonymous = (typeof(typeName) !== 'string'),
        Ctor = isAnonymous ? arguments[0] : arguments[1];

    var EsCtor = function () {

        //MUST do this here so that obj.hasOwnProperty actually returns the keys in the object!
        Ctor.call(this);

        //call apply defaults here before change tracking is enabled
        this.applyDefaults();

        //call the init method on the base prototype
        this.init();
    };

    //Setup the prototype chain correctly
    EsCtor.prototype = new es.EsEntity();

    //add it to the correct namespace if it isn't an anonymous type
    if (!isAnonymous) {
        es.generatedNamespace[typeName] = EsCtor;
    }

    return EsCtor;
}; 
 
 
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
        coll.entityTypeName = ctorName;

        this.init.call(coll); //Trickery and sorcery on the prototype

        return coll;

    };

    var F = function () {
        var base = this,
            extenders = [];

        this.init = function () {
            var self = this;

            //loop through the extenders and call each one
            ko.utils.arrayForEach(extenders, function(ext){
                
                //make sure to set 'this' properly
                ext.call(self);
            });

            //loop through all the PROTOTYPE methods/properties and tack them on
            for (var prop in base) {
                if (base.hasOwnProperty(prop) && prop !== "init" && prop !== "customize") {

                    self[prop] = base[prop];

                }
            }

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
}(window)); 
