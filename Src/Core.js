
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
    var arr = ko.utils.unwrapObservable(array);
    if (!arr) { return false; }
    return arr.isArray || Object.prototype.toString.call(arr) === '[object Array]';
};

es.objectKeys = Object.keys || function (obj) {
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

es.isEsLazyLoader = function (obj) {
    var isEsLaz = false;
    if (obj !== undefined && obj.es !== undefined && obj.es.___esLazyLoad___ !== undefined) {
        isEsLaz = true;
    }
    return isEsLaz;
};

//es.esLazyLoader = function (esRoute, esTypeDef, propName) {

//    //var self = this;

//    var Function = function () {

//        this.es = {};

//        this.es.___esLazyLoad___ = true;

//        var self = this;
//        var val = undefined;

//        if (arguments.length === 0) {

//            if (val === undefined) {

//                val = self.createObjectFromType(type);

//                if (val === undefined) {
//                    throw "Please include the JavaScript class file for the '" + type + "'";
//                }

//                val.load({
//                    route: route,
//                    data: self.esPrimaryKeys()
//                });

//                self[propName] = val;
//            }
//            return self[propName]; //()
//        } 
//    };

//    var route = esRoute;
//    var type = esTypeDef
//    var data = undefined;

//    return Function;
//};

//#endregion

es.exportSymbol('es.isEsCollection', es.isEsCollection);