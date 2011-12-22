
//#region TypeCache Methods
es.getType = function (typeName) {
    var ns = es.getGeneratedNamespaceObj();

    return ns[typeName];
}

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

es.isEsCollection = function (array) {

    var isEsArray = false;

    if (array.isArray || Object.prototype.toString.call(array) === '[object Array]') {
        
        if (array.length > 0) {
            if (array[0].hasOwnProperty("RowState")) {
                isEsArray = true;
            }
        }
        
    }
    return isEsArray;
}

//#endregion
