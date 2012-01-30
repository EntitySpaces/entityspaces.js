es.esLazyLoader = function (entity, propName) {

    var self = entity,
        data;

    var esLazyLoader = function () {

        var val;

        if (arguments.length === 0) {

            if (val === undefined) {

                val = self.createObjectFromType(self.esTypeDefs[propName]);

                if (val === undefined) {
                    throw "Please include the JavaScript class file for the '" + type + "'";
                }

                val.load({
                    route: self.esRoutes[propName],
                    data: self.esPrimaryKeys()
                });
            }

            self[propName] = val;

            if (self.esRoutes[propName].response === 'collection') {
                return val();
            } else {
                return val;
            }
        }
    };

    return esLazyLoader;
};

es.esLazyLoader.fn = { //can't do prototype on this one bc its a function

    __ko_proto__: ko.observable,

    isDirty: function () {
        return false;
    },

    isDirtyGraph: function () {
        return false;
    },

    subscribe: function () {

    }
};

es.defineLazyLoader = function (entity, propName) {

    var eswhatever = function () {
        var lazy = new es.esLazyLoader(entity, propName);
        return lazy();
    };

    ko.utils.extend(eswhatever, es.esLazyLoader.fn);
    eswhatever.es = {};
    eswhatever.es.___esLazyLoad___ = true;
    return eswhatever;
};