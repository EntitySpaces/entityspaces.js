es.esLazyLoader = function (esRoute, esTypeDef, propName, entity) {

    var route = esRoute,
        type = esTypeDef,
        self = entity,
        data;

    var esLazyLoader = function () {

        var val;

        if (arguments.length === 0) {

            if (val === undefined) {

                val = self.createObjectFromType(type);

                if (val === undefined) {
                    throw "Please include the JavaScript class file for the '" + type + "'";
                }

                val.load({
                    route: route,
                    data: self.esPrimaryKeys()
                });
            }

            self[propName] = val;
    
            return val();
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

es.defineLazyLoader = function (esRoute, esTypeDef, propName, selfy) {

    var eswhatever = function () {

        var lazy = new es.esLazyLoader(esRoute, esTypeDef, propName, selfy);
        return lazy();
    };

    ko.utils.extend(eswhatever, es.esLazyLoader.fn);
    eswhatever.es = {};
    eswhatever.es.___esLazyLoad___ = true;
    return eswhatever;
};