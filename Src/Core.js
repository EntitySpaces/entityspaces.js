
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

es.isEsCollection = function (coll) {
    var isEsColl = false;
    if (coll !== undefined && coll.es !== undefined && coll.es.___esCollection___ !== undefined) {
        isEsColl = true;
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

