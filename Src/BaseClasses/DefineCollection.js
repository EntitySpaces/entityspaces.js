
es.defineCollection = function (typeName, entityName) {
    var isAnonymous = (typeof (typeName) !== 'string'),
        ctorName = isAnonymous ? arguments[0] : arguments[1];

    var EsCollCtor = function () {

        var coll = new es.EsEntityCollection();

        //add the type definition;
        coll.es.entityTypeName = ctorName;

        this.init.call(coll); //Trickery and sorcery on the prototype

        return coll;

    };

    var F = function () {
        var base = this,
            extenders = [];

        this.init = function () {
            var self = this;

            //loop through the extenders and call each one
            ko.utils.arrayForEach(extenders, function (ext) {

                //make sure to set 'this' properly
                ext.call(self);
            });

            //loop through all the PROTOTYPE methods/properties and tack them on
            for (var prop in base) {
                if (base.hasOwnProperty(prop) && prop !== "init" && prop !== "customize") {

                    self[prop] = base[prop];

                }
            }

            this.isDirty = ko.computed(function () {

                var i,
                    entity,
                    arr = self(), 
                    isDirty = false;

                for (i = 0; i < arr.length; i++) {

                    entity = arr[i];

                    if (entity.RowState() !== es.RowState.UNCHANGED) {
                        isDirty = true;
                        break;
                    }
                }

                return isDirty;
            });
        };

        this.customize = function (customizer) {

            extenders.push(customizer);

        };
    };

    EsCollCtor.prototype = new F();

    //add it to the correct namespace if it isn't an anonymous type
    if (!isAnonymous) {
        es.generatedNamespace[typeName] = EsCollCtor;
    }

    return EsCollCtor;
};

es.exportSymbol('es.defineCollection', es.defineCollection);

