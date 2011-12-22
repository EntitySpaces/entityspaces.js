/// <reference path="../../Libs/jquery-1.7.1.js" />
/// <reference path="../../Libs/json2.js" />
/// <reference path="../../Libs/knockout-2.0.RC.js" />


es.EsEntityCollection = function () {
    var obs = ko.observableArray([]);

    //add all of our extra methods to the array
    ko.utils.extend(obs, es.EsEntityCollection.fn);

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

    //#region Loads
    load: function (options) {
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
            self.populateEntity(data);

            //fire the passed in success handler
            if (origSuccessHandler) { origSuccessHandler(data); }
        };

        es.dataProvider.execute(options);
    },
    //#endregion Save

    //#region Save
    save: function () {
        var route,
            ajaxOptions = {
                data: self.toJS()
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

            //any suggestions?

        };

        es.dataProvider.execute(ajaxOptions);
    },
    //#endregion

    //#region Serialization
    toJS: function () {
        return ko.toJS(this);
    },

    toJSON: function () {
        return ko.toJSON(this);
    }

};