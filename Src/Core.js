
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

es.isEsCollection = function (array) {
    var isEsArray = false;

    if (es.isArray(array)) {

        if (array.length > 0) {
            if (array[0].hasOwnProperty("RowState")) {
                isEsArray = true;
            }
        }

    }
    return isEsArray;
};

//#endregion
