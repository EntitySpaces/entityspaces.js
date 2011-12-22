
window['es'] = {}; //define root namespace

"use-strict";

var config = window.esConfig || {};

config = $.extend(config, {
    //defines the namespace where the Business Objects will be stored
    namespace: 'es.objects'

});

//ensure the namespace is built out...
(function () {
    
    var path = config.namespace.split('.');
    var target = window;

    for(var i = 0; i < path.length; i++){
        target = target[path[i]] || {};
    }

    es.generatedNamespace = target;

}());


es.getGeneratedNamespaceObj = function(){
        
    return es.generatedNamespace;
};

es.getType = function (typeName) {
    var ns = es.getGeneratedNamespaceObj();
    
    return ns[typeName];       
}

es.clearTypes = function(){
    
    es.generatedNamespace = {};

};

//Event to subscribe to for errors
es.onError = ko.observable({});
es.onError.subscribe(function (error) {
    throw JSON.stringify(error);
});
