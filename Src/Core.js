
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

//#endregion

es.exportSymbol('es.isEsCollection', es.isEsCollection);