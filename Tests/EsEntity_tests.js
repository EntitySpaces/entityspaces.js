/// <reference path="Qunit/qunit.js" />
/// <reference path="../Libs/jquery-1.7.1.js" />
/// <reference path="../Libs/json2.js" />
/// <reference path="../Libs/knockout-2.0.0.debug.js" />
/// <reference path="../Build/entityspaces.debug.js" />
/// <reference path="TestObjects/Generated/Employees.js" />


module('EsEntity_tests.js');

test('Basic Constructor Test', function () {

    //define an object
    var emp = new es.objects.Employees();
    ok(emp, 'New Class Instantiated');

});

test('Basic Constructor Test with Hydrating data', function () {

    var emp = new es.objects.Employees();
    emp.EmployeeID(42);

    ok(emp, 'New Class Instantiated');
    equals(emp.EmployeeID(), 42, 'EmployeeID Id matches passed in value');

});

test('Hydrating Constructor Test with data', function () {

    var emp = new es.objects.Employees({
        EmployeeID: 42
    });

    ok(emp, 'New Class Instantiated');
    equals(emp.EmployeeID(), 42, 'EmployeeID Id matches passed in value');

});

test('Extended Constructor Test', function () {

    //define an object
    var emp = new es.objects.Employees();
    emp.EmployeeID(42);
    emp.OtherEmployeeID(43);

    ok(emp, 'New Class Instantiated');
    equals(emp.EmployeeID(), 42, 'EmployeeID matches passed in value');
    equals(emp.OtherEmployeeID(), 43, 'OtherEmployeeID matches passed in value');

});

test('Testing Multiple Objects prototype chain', function () {

    //define an object
    var emp1 = new es.objects.Employees();
    emp1.EmployeeID(42);
    emp1.OtherEmployeeID(43);

    var emp2 = new es.objects.Employees();
    emp2.EmployeeID(44);
    emp2.OtherEmployeeID(45);

    ok(emp1, 'New Class Instantiated');
    equals(emp1.EmployeeID(), 42, 'EmployeeID matches passed in value');
    equals(emp1.OtherEmployeeID(), 43, 'OtherEmployeeID matches passed in value');

    ok(emp2, 'New Class Instantiated');
    equals(emp2.EmployeeID(), 44, 'EmployeeID matches passed in value');
    equals(emp2.OtherEmployeeID(), 45, 'OtherEmployeeID matches passed in value');

});

test('Testing Multiple Objects prototype BASE chain', function () {

    var emp1 = new es.objects.Employees();
    emp1.RowState(es.RowState.UNCHANGED); //Mark it as unchanged

    emp1.EmployeeID(44);  //should trip the RowState to modified
    emp1.OtherEmployeeID(45);

    var emp2 = new es.objects.Employees();

    equals(emp1.EmployeeID(), 44, 'EmployeeID matches passed in value');
    equals(emp1.OtherEmployeeID(), 45, 'OtherEmployeeID matches passed in value');
    equals(emp1.RowState(), es.RowState.MODIFIED, 'Base RowState changed independently of other instances');

    equals(emp2.RowState(), es.RowState.ADDED, 'Base RowState changed independently of other instances');

});

test('IsDirty Test', function () {

    var emp = new es.objects.Employees();
    emp.EmployeeID(99);

    equals(emp.isDirty(), true, 'isDirty returns true!');
    equals(emp.RowState(), es.RowState.ADDED, 'RowState has changed to modified');
});

test('Ensure Change Tracking Test', function () {

    var emp = new es.objects.Employees();

    ok(emp, 'New Class Instantiated');
    ok(emp.ModifiedColumns, 'ModifiedColumns exists');
    ok(emp.RowState, 'RowState exists');

    ok(ko.isObservable(emp.ModifiedColumns), 'ModifiedColumns is observable');
    ok(ko.isObservable(emp.RowState), 'RowState is observable');

    equals(emp.ModifiedColumns().length, 0, 'New Object has No Modified Columns');
    equals(emp.RowState(), es.RowState.ADDED, 'Newly Instantiated Object has RowState of Added');
});

test('Ensure Change Tracking Test - Modification', function () {

    var emp = new es.objects.Employees();

    emp.RowState(es.RowState.UNCHANGED);
    emp.EmployeeID(99);

    equals(emp.ModifiedColumns().length, 1, 'Updated EmployeeID and Modified Columns reflects one field');
    equals(emp.RowState(), es.RowState.MODIFIED, 'RowState has changed to modified');
});

test('Accept Changes - Modification', function () {

    var emp = new es.objects.Employees();
    emp.EmployeeID(99);
    emp.acceptChanges();

    equals(emp.ModifiedColumns().length, 0, 'ModifiedColumns is Empty');
    equals(emp.es.originalValues['EmployeeID'], undefined, 'Original Values is empty');
    equals(emp.RowState(), es.RowState.UNCHANGED, 'RowState has been set back');
});

test('Accept Changes - Adding', function () {

    var emp = new es.objects.Employees();
    emp.acceptChanges();

    equals(emp.es.originalValues['EmployeeID'], undefined, 'Original Values is empty');
    equals(emp.RowState(), es.RowState.UNCHANGED, 'RowState has been set back');
});

test('Reject Changes - Modification', function () {

    var emp = new es.objects.Employees();
    emp.acceptChanges(); //set everything to UNCHANGED

    emp.EmployeeID(99);

    emp.rejectChanges();

    ok(!emp.isDirty(), 'Object is not Dirty after rejecting changes');
    equals(emp.es.originalValues['EmployeeID'], undefined, 'Original Values is empty');
    equals(emp.RowState(), es.RowState.UNCHANGED, 'RowState has been set back');
});

test('Reject Changes - Adding', function () {

    var emp = new es.objects.Employees();

    emp.EmployeeID(99);
    emp.rejectChanges();

    ok(emp.isDirty(), 'Object is Dirty when adding');
    equals(emp.es.originalValues['EmployeeID'], undefined, 'Original Values is empty');
    equals(emp.RowState(), es.RowState.ADDED, 'RowState has been set back');
});

test('Reject Changes - Deleting', function () {

    var emp = new es.objects.Employees();
    emp.EmployeeID(99);

    emp.markAsDeleted();

    emp.rejectChanges();

    ok(emp.isDirty(), 'Object is Dirty bc it was added');
    equals(emp.es.originalValues['EmployeeID'], undefined, 'Original Values is empty');
    equals(emp.RowState(), es.RowState.ADDED, 'RowState has been set back');
});

test('Ensure "populateEntity" works and "ExtraColumns" are flattened', function () {

    //define an object
    var emp = new es.objects.Employees();
    emp.populateEntity({ "EmployeeID": 42, "esExtendedData": [{ "Key": "ExtraColumn", "Value": "asdf" }, { "Key": "IDasExtraColumn", "Value": 1519}] });

    equals(emp.EmployeeID(), 42, 'EmployeeID is present');
    equals(emp.ExtraColumn(), 'asdf', 'ExtraColumn is present');
    equals(emp.IDasExtraColumn(), 1519, 'IDasExtraColumn is present');
});

test('Test Basic Save', function () {
    var saveReq;

    //define an object
    var emp = new es.objects.Employees();
    emp.populateEntity({ "EmployeeID": 42, "esExtendedData": [{ "Key": "ExtraColumn", "Value": "asdf" }, { "Key": "IDasExtraColumn", "Value": 1519}] });
    emp.RowState(es.RowState.UNCHANGED);

    emp.EmployeeID(48);

    //override the provider's execute method
    es.testDataProvider.execute = function (options) {
        saveReq = options;
    };

    emp.save();

    ok(saveReq.data, 'data submitted for save');
    equals(saveReq.data.EmployeeID, 48, 'Correct ProductId was handed back');
    equals(saveReq.data.RowState, es.RowState.MODIFIED, 'Correct RowState was handed Back');
});


test('Hierarchical Save', function () {
    var saveReq;

    var emp = new es.objects.Employees();
    emp.populateEntity(getEmployeeData());

    emp.FirstName("Googy");
    emp.OrdersCollectionByEmployeeID()[0].CustomerID('ERIC');
    emp.OrdersCollectionByEmployeeID()[0].OrderDetailsCollectionByOrderID()[0].Quantity(16);
    emp.OrdersCollectionByEmployeeID()[1].Freight(56);

    //override the provider's execute method
    es.testDataProvider.execute = function (options) {
        saveReq = options;
    };

    emp.save();

    ok(saveReq.data, 'data submitted for save');
    equals(saveReq.data.OrdersCollectionByEmployeeID[0].CustomerID, 'ERIC', 'Correct CustomerID');
    equals(saveReq.data.OrdersCollectionByEmployeeID[0].OrderDetailsCollectionByOrderID[0].Quantity, 16, 'Correct Quantity');
    equals(saveReq.data.OrdersCollectionByEmployeeID[1].Freight, 56, 'Correct Freight');
});

