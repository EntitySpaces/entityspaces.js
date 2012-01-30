//es.esLazyLoader = function () {
//    var obs = ko.observableArray([]);

//    Function.__ko_proto__ = ko.observable;

//    //define the 'es' utility object
//    obs.es = {};

//    //add all of our extra methods to the array
//    ko.utils.extend(obs, es.esLazyLoader.fn);

//    obs.es['___esLazyLoader___'] = es.utils.newId(); // assign a unique id so we can test objects with this key, do equality comparison, etc...

//    return obs;
//};

es.esLazyLoader = function (esRoute, esTypeDef, propName, selfy) {

    var self = selfy;
    Function.__ko_proto__ = ko.observable;
    
    var esLazyLoader = function () {

        var val = undefined;

//      if (arguments.length === 0) {

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
  //      }
    };

    var route = esRoute;
    var type = esTypeDef;
    var data = undefined;

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
    Function.__ko_proto__ = ko.observable;

    var eswhatever = function () {

        Function.__ko_proto__ = ko.observable;

        var lazy = new es.esLazyLoader(esRoute, esTypeDef, propName, selfy);
        return lazy();
    };

    ko.utils.extend(eswhatever, es.esLazyLoader.fn);
    eswhatever.es = {};
    eswhatever.es.___esLazyLoad___ = true;
    return eswhatever;
};
