/// <reference path="Qunit/qunit.js" />
/// <reference path="../Libs/jquery-1.7.1.js" />
/// <reference path="../Libs/json2.js" />
/// <reference path="../Libs/knockout-2.0.RC.js" />
/// <reference path="../Build/entityspaces.debug.js" />

module('BaseEsObject Tests');

test('Basic Constructor Test', function () {

    //define an object
    var Product = es.defineEntity(function () {
        this.ProductId = ko.observable(null);
    });
    
    var testP = new Product();

    ok(testP, 'New Class Instantiated');
    
});

test('Basic Constructor Test with Hydrating data', function () {

    //define an object
    var Product = es.defineEntity(function () {
        this.ProductId = ko.observable('something');
    });

    var testP = new Product();
    testP.ProductId('testId');

    ok(testP, 'New Class Instantiated');
    equals(testP.ProductId(), 'testId', 'Product Id matches passed in value');

});

test('Extended Constructor Test', function () {

    //define an object
    var Product = es.defineEntity(function (data) {
        this.ProductId = ko.observable('something');
    });

    Product.prototype.customize(function () {
        this.OtherProductId = ko.observable('something2');
    });

    var testP = new Product();
    testP.ProductId('testId')
    testP.OtherProductId('testId2');

    ok(testP, 'New Class Instantiated');
    equals(testP.OtherProductId(), 'testId2', 'Product Id matches passed in value');

});

test('Testing Multiple Objects prototype chain', function () {

    //define an object
    var Product = es.defineEntity(function (data) {
        this.ProductId = ko.observable(null);
    });

    Product.prototype.customize(function () {
        this.OtherProductId = ko.observable(null);
    });

    var testP1 = new Product();
    testP1.ProductId('testId')
    testP1.OtherProductId('testId2');

    var testP2 = new Product();
    testP2.ProductId('testId3');
    testP2.OtherProductId('testId4');


    equals(testP1.ProductId(), 'testId', 'Product Id matches passed in value');
    equals(testP1.OtherProductId(), 'testId2', 'Product Id matches passed in value');

    equals(testP2.ProductId(), 'testId3', 'Product Id matches passed in value');
    equals(testP2.OtherProductId(), 'testId4', 'Product Id matches passed in value');

});

test('Testing Multiple Objects prototype BASE chain', function () {

    //define an object
    var Product = es.defineEntity(function () {
        this.ProductId = ko.observable(null);
    });

    Product.prototype.customize(function () {
        this.OtherProductId = ko.observable(null);
    });

    var testP1 = new Product();
    testP1.RowState(es.RowState.UNCHANGED); //Mark it as unchanged

    testP1.ProductId('testId'); //should trip the RowState to modified
    testP1.OtherProductId('testId2');

    var testP2 = new Product(); //rowstate should stay as added

    equals(testP1.ProductId(), 'testId', 'Product Id matches passed in value');
    equals(testP1.OtherProductId(), 'testId2', 'OtherProduct Id matches passed in value');
    equals(testP1.RowState(), es.RowState.MODIFIED, 'Base RowState changed independently of other instances');

    equals(testP2.RowState(), es.RowState.ADDED, 'Base RowState changed independently of other instances');

});

test('Ensure Change Tracking Test', function () {

    //define an object
    var Product = es.defineEntity(function () {
        this.ProductId = ko.observable('something');
    });

    var testP = new Product();

    ok(testP, 'New Class Instantiated');
    ok(testP.ModifiedColumns, 'ModifiedColumns exists');
    ok(testP.RowState, 'RowState exists');

    ok(ko.isObservable(testP.ModifiedColumns), 'ModifiedColumns is observable');
    ok(ko.isObservable(testP.RowState), 'RowState is observable');

    equals(testP.ModifiedColumns().length, 0, 'New Object has No Modified Columns');
    equals(testP.RowState(), es.RowState.ADDED, 'Newly Instantiated Object has RowState of Added');
});

test('Ensure Change Tracking Test - Modification', function () {

    //define an object
    var Product = es.defineEntity(function () {
        this.ProductId = ko.observable('something');
    });

    var testP = new Product();
    //set it to unchanged

    testP.RowState(es.RowState.UNCHANGED);
    testP.ProductId('newTestId');

    equals(testP.ModifiedColumns().length, 1, 'Updated ProductId, and Modified Columns reflects one field');
    equals(testP.RowState(), es.RowState.MODIFIED, 'RowState has changed to modified');
});

test('Ensure "populateEntity" works and "ExtraColumns" are flattened', function () {

    //define an object
    var Product = es.defineEntity(function () {
        this.ProductId = ko.observable('something');
        this.esExtendedData = null;
    });

    var testP = new Product();
    testP.populateEntity({ "ProductId": 42, "esExtendedData": [{ "Key": "ExtraColumn", "Value": "asdf" }, { "Key": "IDasExtraColumn", "Value": 1519}] });

    equals(testP.ProductId(), 42, 'ProductId is present');
    equals(testP.ExtraColumn(), 'asdf', 'ExtraColumn is present');
    equals(testP.IDasExtraColumn(), 1519, 'IDasExtraColumn is present');
});


