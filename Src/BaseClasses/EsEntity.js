/*globals es */
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
    this.customize = function (extender) {
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