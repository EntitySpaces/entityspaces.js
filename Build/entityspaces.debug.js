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
        target = target[path[i]] || {};
    }

    es.generatedNamespace = target;

}()); 
 
 
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
* FILE: ..\Src\utils.js 
***********************************************/ 
﻿/*globals es, ko*/

/// <reference path="../Libs/jquery-1.7.1.js" />
/// <reference path="../Libs/knockout-2.0.RC.js" />

var utils = {
    
    extendObservable: function (target, source) {
        var prop;

        if (!target || !source) {
            return;
        }

        for (prop in target) {

            if (target.hasOwnProperty(prop) && source.hasOwnProperty(prop)) {

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

                if (property instanceof Array) { continue; }

                if(entity.hasOwnProperty(propertyName) && ko.isObservable(property)) {
                    utils.addPropertyChangedHandlers(entity, propertyName);
                }
            }
        }

        return entity;
    },

    expandExtraColumns: function (entity) {
        var data, i, ext,
                makeObservable = arguments[1] || false;

        if (entity.esExtendedData !== undefined) {

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

        if (entity.esExtendedData !== undefined) {

            var data = ko.utils.unwrapObservable(entity.esExtendedData);

            for (i = 0; i < data.length; i++) {
                delete entity[data[i]];
            }
            delete entity.esExtendedData;
        }

        return entity;
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
* FILE: ..\Src\ajax.js 
***********************************************/ 
﻿/// <reference path="../Libs/jquery-1.7.1.js" />
/// <reference path="../Libs/json2.js" />

//set this up so we match jQuery's api style... if we want to rip it out later, we can...
var ajax = {

    executeRequest: function (options) {
        var noop = function () { },
            success = options.success || noop,
            error = options.error || noop,
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
            success(data);
        };

        // override the passed in errorHandler so we can add global processing if needed
        options.error = function (jqXHR, textStatus, errorThrown) {
            error(jqXHR, textStatus, errorThrown);
        };

        //parameterize the Url
        options.url = ajax.parameterizeUrl(options.url, options.data);

        $.ajax(options);
    },

    parameterizeUrl: function (url, data) {
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
    }
};

es.ajax = ajax; 
 
 
/*********************************************** 
* FILE: ..\Src\BaseClasses\EsEntity.js 
***********************************************/ 
﻿/*globals es */
/// <reference path="../Libs/jquery-1.7.1.js" />
/// <reference path="../Libs/json2.js" />
/// <reference path="../Libs/knockout-2.0.RC.js" />
/// <reference path="../Constants.js" />
/// <reference path="../Namespace.js" />
/// <reference path="../Utils.js" />


es.EsEntity = function () { //empty constructor
    var self, //is only set when we call 'init'
        extenders = [];

    //#region Initialization Logic
    this.extend = function (extender) {
        extenders.push(extender);
        return this;
    };

    this.init = function () {
        self = this;

        self['___esKey___'] = es.utils.newId(); // assign a unique id so we can test objects with this key, do equality comparison, etc...

        // before populating the data, call each extender to add the required functionality to our object        
        ko.utils.arrayForEach(extenders, function (extender) {

            //Make sure to set the 'this' properly by using 'call'
            extender.call(self);
        });

        //start change tracking
        es.utils.startTracking(self);
    };

    this.populateEntity = function (data) {
        //populate the entity with data back from the server...
        es.utils.extendObservable(self, data);

        //expand the Extra Columns
        es.utils.expandExtraColumns(self, true);

        //start change tracking
        es.utils.startTracking(self);
    };
    //#endregion

    this.applyDefaults = function () {
        //here to be overridden higher up the prototype chain
    };

    this.markAsDeleted = function () {
        this.RowState(es.RowState.DELETED);
    };

    //#region Loads
    this.load = function (options) {
        //if a route was passed in, use that route to pull the ajax options url & type
        if (options.route) {
            options.url = this.routes[options.route].url;
            options.type = this.routes[options.route].method; //in jQuery, the HttpVerb is the 'type' param
        }

        //sprinkle in our own success handler, but make sure the original still gets called
        var origSuccessHandler = options.success;

        options.success = function (data) {
            self.populateEntity(data);
            if (origSuccessHandler) { origSuccessHandler(data); }
        };

        es.ajax.executeRequest(options);
    };

    //#endregion Save

    //#region Save
    this.save = function () {
        var route,
            ajaxOptions = {
                data: self
            };

        switch (self.RowState() || es.RowState.ADDED) {
            case es.RowState.ADDED:
                route = self.routes['create'];
                break;
            case es.RowState.MODIFIED:
                route = self.routes['update'];
                break;
            case es.RowState.DELETED:
                route = self.routes['del'];
                break;
        }

        if (route) {
            ajaxOptions.url = route.url;
            ajaxOptions.type = route.method;
        }

        ajaxOptions.success = function (data) {
            self.populateEntity(data);
        };

        ajaxOptions.error = function (xhr, textStatus, errorThrown) {
            //improve this for 
            throw JSON.stringify(errorThrown);
        };

        es.ajax.executeRequest(ajaxOptions);
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
﻿/* File Created: December 20, 2011 */ 
 
 
/*********************************************** 
* FILE: ..\Src\BaseClasses\DefineEntity.js 
***********************************************/ 
﻿
es.defineEntity = function (Ctor) {

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

    return EsCtor;
}; 
}(window)); 
