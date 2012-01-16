
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

            //#region Private Methods

            //#endregion Private Methods

            /*
            this.isDirty = ko.computed(function () {

                var i,
                    entity,
                    arr = self(),
                    dirty = false;

                if (this.es.deletedEntities.length > 0) {
                    dirty = true;
                } else if (arr.length > 0 && arr[arr.length - 1].isDirty()) {
                    dirty = true;
                } else {
                    for (i = 0; i < arr.length; i++) {

                        entity = arr[i];

                        if (entity.RowState() !== es.RowState.UNCHANGED) {
                            dirty = true;
                            break;
                        }
                    }
                }

                return dirty;
            });
            */


            this.isDirty = function () {

                var i,
                    entity,
                    arr = self(),
                    dirty = false;

                if (this.es.deletedEntities.length > 0) {
                    dirty = true;
                } else if (arr.length > 0 && arr[arr.length - 1].isDirty()) {
                    dirty = true;
                } else {
                    for (i = 0; i < arr.length; i++) {

                        entity = arr[i];

                        if (entity.RowState() !== es.RowState.UNCHANGED) {
                            dirty = true;
                            break;
                        }
                    }
                }

                return dirty;
            };

            this.isDirtyGraph = function () {

                // Rather than just call isDirty() above we dup the logic here
                // for performance so we do not have to walk all of the entities twice
                var i,
                    entity,
                    arr = self(),
                    dirty = false;

                if (this.es.deletedEntities.length > 0) {
                    dirty = true;
                } else if (arr.length > 0 && arr[arr.length - 1].isDirty()) {
                    dirty = true;
                } else {
                    for (i = 0; i < arr.length; i++) {

                        entity = arr[i];

                        if (entity.RowState() !== es.RowState.UNCHANGED) {
                            dirty = true;
                            break;
                        } else {
                            dirty = entity.isDirtyGraph();
                            if (dirty === true) {
                                break;
                            }
                        }
                    }
                }

                return dirty;
            };
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

