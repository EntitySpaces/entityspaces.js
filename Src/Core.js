
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

es.lazyLoader = function (esRoute, esTypeDef) {

    var Function = function () {

        var val = undefined;

        if (arguments.length === 0) {

            if (val === undefined) {

                val = this.createObjectFromType(type);

                if (val === undefined) {
                    throw "Please include the class file for " + type;
                }

                val.load({
                    route: route,
                    data: this.esPrimaryKeys()
                });

            }
            return val();
        } else {
            val = arguments[0];
        }
    };

    var route = esRoute;
    var type = esTypeDef
    var data = undefined;

    return Function;
};

//#endregion

es.exportSymbol('es.isEsCollection', es.isEsCollection);