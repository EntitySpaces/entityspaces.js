
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