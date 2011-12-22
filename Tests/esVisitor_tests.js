/// <reference path="../Libs/jquery-1.7.1.js" />
/// <reference path="../Libs/knockout-2.0.RC.js" />
/// <reference path="../Libs/json2.js" />
/// <reference path="Qunit/qunit.js" />
/// <reference path="../Build/entityspaces.debug.js" />

module('Visitor Tests');

test('Base Collection Walk Test', function () {

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

    equals(paths.length, 14, 'We have 14 paths which is correct');
});

test('Base Collection Walk Test with real dirty data', function () {

    var paths = [];

    var data = getEmployeeCollectionData();

    // Make 1 object way down deep truly dirty
    data[0].OrdersCollectionByEmployeeID[0].OrderDetailsCollectionByOrderID[0].RowState = es.RowState.MODIFIED;

    es.Visit(data).forEach(function (theObj) {

        if (this.key === "esExtendedData") {
            this.block();
        } else {

            if (this.isLeaf === false) {

                if (theObj instanceof Array) { return theObj; }

                if (theObj.hasOwnProperty("RowState")) {

                    switch (theObj.RowState) {

                        case es.RowState.MODIFIED:

                            paths.push(this.path);
                            break;
                    }
                }
            }
        }

        return theObj;
    });

    equals(paths.length, 1, 'We have 1 path which is correct');
});

test('Base Entity Walk Test', function () {

    var paths = [];

    es.Visit(getEmployeeData()).forEach(function (theObj) {

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

    equals(paths.length, 7, 'We have 7 paths which is correct');
});

test('Base Entity Walk Test with real dirty data', function () {

    var paths = [];

    var data = getEmployeeData();

    // Make 1 object way down deep truly dirty
    data.OrdersCollectionByEmployeeID[0].OrderDetailsCollectionByOrderID[0].RowState = es.RowState.MODIFIED;

    es.Visit(data).forEach(function (theObj) {

        if (this.key === "esExtendedData") {
            this.block();
        } else {

            if (this.isLeaf === false) {

                if (theObj instanceof Array) { return theObj; }

                if (theObj.hasOwnProperty("RowState")) {

                    switch (theObj.RowState) {

                        case es.RowState.MODIFIED:

                            paths.push(this.path);
                            break;
                    }
                }
            }
        }

        return theObj;
    });

    equals(paths.length, 1, 'We have 1 path which is correct');
});


