
es.defineEntity = function (ctor) {

    var EsCtor = function () {
        //fire the provided constructor
        ctor.call(this);

        //call the init method on the prototype
        this.init();
    };

    //Setup the prototype chain correctly
    EsCtor.prototype = new es.BaseEntity();

    return EsCtor;
};