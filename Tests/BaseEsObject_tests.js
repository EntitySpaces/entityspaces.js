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

    Product.prototype.extend(function () {
        this.OtherProductId = ko.observable('something2');
    });

    var testP = new Product();
    testP.ProductId('testId')
    testP.OtherProductId('testId2');

    ok(testP, 'New Class Instantiated');
    equals(testP.OtherProductId(), 'testId2', 'Product Id matches passed in value');

});

test('Ensure Change Tracking Test', function () {

    //define an object
    var Product = es.defineEntity(function (data) {
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
    var Product = es.defineEntity(function (data) {
        this.ProductId = ko.observable('something');
    });

    var testP = new Product();
    //set it to unchanged

    testP.RowState(es.RowState.UNCHANGED);
    testP.ProductId('newTestId');

    equals(testP.ModifiedColumns().length, 1, 'Updated ProductId, and Modified Columns reflects one field');
    equals(testP.RowState(), es.RowState.MODIFIED, 'RowState has changed to modified');
});

