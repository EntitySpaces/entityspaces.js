/// <reference path="Qunit/qunit.js" />
/// <reference path="../Libs/jquery-1.7.1.js" />
/// <reference path="../Libs/json2.js" />
/// <reference path="../Libs/knockout-2.0.0.debug.js" />
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

test('IsDirty Test', function () {

    //define an object
    var Product = es.defineEntity(function () {
        this.ProductId = ko.observable('something');
    });

    var testP = new Product();
    
    testP.ProductId('newTestId');

    equals(testP.isDirty(), true, 'isDirty returns true!');
    equals(testP.RowState(), es.RowState.ADDED, 'RowState has changed to modified');
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

test('Accept Changes - Modification', function () {

    //define an object
    var Product = es.defineEntity(function () {
        this.ProductId = ko.observable('something');
    });

    var testP = new Product();
    //set it to unchanged

    testP.ProductId('newTestId');

    testP.acceptChanges();

    equals(testP.ModifiedColumns().length, 0, 'ModifiedColumns is Empty');
    equals(testP.es.originalValues['ProductId'], undefined, 'Original Values is empty');
    equals(testP.RowState(), es.RowState.UNCHANGED, 'RowState has been set back');
});

test('Accept Changes - Adding', function () {

    //define an object
    var Product = es.defineEntity(function () {
        this.ProductId = ko.observable('something');
    });

    var testP = new Product();
    
    testP.acceptChanges();

    equals(testP.es.originalValues['ProductId'], undefined, 'Original Values is empty');
    equals(testP.RowState(), es.RowState.UNCHANGED, 'RowState has been set back');
});

test('Reject Changes - Modification', function () {

    //define an object
    var Product = es.defineEntity(function () {
        this.ProductId = ko.observable('something');
    });

    var testP = new Product();
    testP.acceptChanges(); //set everything to UNCHANGED

    testP.ProductId('newTestId');

    testP.rejectChanges();

    ok(!testP.isDirty(), 'Object is not Dirty after rejecting changes');
    equals(testP.es.originalValues['ProductId'], undefined, 'Original Values is empty');
    equals(testP.RowState(), es.RowState.UNCHANGED, 'RowState has been set back');
});

test('Reject Changes - Adding', function () {

    //define an object
    var Product = es.defineEntity(function () {
        this.ProductId = ko.observable('something');
    });

    var testP = new Product();
    
    testP.ProductId('newTestId');

    testP.rejectChanges();

    ok(testP.isDirty(), 'Object is Dirty when adding');
    equals(testP.es.originalValues['ProductId'], undefined, 'Original Values is empty');
    equals(testP.RowState(), es.RowState.ADDED, 'RowState has been set back');
});

test('Reject Changes - Deleting', function () {

    //define an object
    var Product = es.defineEntity(function () {
        this.ProductId = ko.observable('something');
    });

    var testP = new Product();

    testP.markAsDeleted();

    testP.rejectChanges();

    ok(testP.isDirty(), 'Object is Dirty bc it was added');
    equals(testP.es.originalValues['ProductId'], undefined, 'Original Values is empty');
    equals(testP.RowState(), es.RowState.ADDED, 'RowState has been set back');
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

test('Test Basic Save', function () {
    var saveReq;

    //define an object
    var Product = es.defineEntity(function () {
        this.ProductId = ko.observable('something');
        this.esExtendedData = null;
    });
    Product.prototype.routes['update'] = { method: 'POST', url: 'TestUrl' };


    var testP = new Product();
    testP.populateEntity({ "ProductId": 42, "esExtendedData": [{ "Key": "ExtraColumn", "Value": "asdf" }, { "Key": "IDasExtraColumn", "Value": 1519}] });
    testP.RowState(es.RowState.UNCHANGED);

    testP.ProductId(48);

    //override the provider's execute method
    es.testDataProvider.execute = function (options) {
        saveReq = options;
    };

    testP.save();

    ok(saveReq.data, 'data submitted for save');
    equals(saveReq.data.ProductId, 48, 'Correct ProductId was handed back');
    equals(saveReq.data.RowState, es.RowState.MODIFIED, 'Correct RowState was handed Back');
});


test('Hierarchical Save', function () {
    var saveReq;

    var emp = new es.objects.Employees();
    emp.populateEntity(getEmployeeData());

    emp.FirstName("Googy");
    emp.OrdersCollectionByEmployeeID()[0].CustomerID('ERIC');
    emp.OrdersCollectionByEmployeeID()[0].OrderDetailsCollectionByOrderID()[0].Quantity(16);
    emp.OrdersCollectionByEmployeeID()[1].Freight(55);

    //override the provider's execute method
    es.testDataProvider.execute = function (options) {
        saveReq = options;
    };

    emp.save();

    ok(saveReq.data, 'data submitted for save');
    equals(saveReq.data.OrdersCollectionByEmployeeID[0].CustomerID, 'ERIC', 'Correct CustomerID');
    equals(saveReq.data.OrdersCollectionByEmployeeID[0].OrderDetailsCollectionByOrderID[0].Quantity, 16, 'Correct Quantity');
    equals(saveReq.data.OrdersCollectionByEmployeeID[1].Freight, 55, 'Correct Freight');
});

