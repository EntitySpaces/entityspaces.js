
es.defineEntity = function (typeName, constrctor) {
    var isAnonymous = (typeOf(typeName) !== 'string'),
        Ctor = isAnonymous ? arguments[0] : arguments[1];

    var EsCtor = function () {

        //MUST do this here so that obj.hasOwnProperty actually returns the keys in the object!
        Ctor.call(this);

        //call apply defaults here before change tracking is enabled
        this.applyDefaults();

        //call the init method on the base prototype
        this.init();
    };

    //Setup the prototype chain correctly
    EsCtor.prototype = new es.EsEntity();

    //add it to the correct namespace if it isn't an anonymous type
    if (!isAnonymous) {
        es.generatedNamespace[typeName] = Ctor;
    }

    return EsCtor;
};