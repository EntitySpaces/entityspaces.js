/// <reference path="../Libs/jquery-1.7.1.js" />
/// <reference path="../Libs/knockout-2.0.RC.js" />
/// <reference path="../Libs/json2.js" />
/// <reference path="Qunit/qunit.js" />
/// <reference path="../Build/entityspaces.debug.js" />

module('Visitor Tests');

test('Base Test', function () {

    var paths = [];

    es.Visit(getEmployeeCollectionData()).forEach(function (theObj) {

            if (this.key === "esExtendedData") {
                this.block();
            } else {

                if (this.isLeaf === false) {

                    if (theObj instanceof Array) { return theObj; }

                    if (theObj.hasOwnProperty("RowState")) {

                        switch (theObj.RowState) {

                            case es.RowState.UNCHANGED:

                                paths.push(this.path);
                                break;
                        }
                    }
                }
            }

            return theObj;
        });

    ok(paths.length, "Paths length != zero");
});

