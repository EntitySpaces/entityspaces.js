/// <reference path="../Libs/jquery-1.7.1.js" />
/// <reference path="../Libs/knockout-2.0.0.debug.js" />
/// <reference path="../Libs/json2.js" />
/// <reference path="Qunit/qunit.js" />
/// <reference path="../Build/entityspaces.debug.js" />

module('Basic Collection Tests');

test('Basic Collection Smoke Test', function () {

    var coll = new es.objects.EmployeesCollection();

    ok(coll, 'Collection Initialized');
    equals(coll.length, 0, 'Initialized as an Empty Array');
    equals(coll.myMethod(), 2, 'Extra method was correctly added to Collection');
});

test('Basic Populate Collection Test', function () {

    var coll = new es.objects.EmployeesCollection();

    coll.populateCollection([
        { EmployeeID: 56 },
        { EmployeeID: 81 }
    ]);

    equals(coll().length, 2, 'Collection contains 2 items');
    equals(coll()[0].EmployeeID(), 56, 'First item has correct property value');
    equals(coll()[1].EmployeeID(), 81, 'First item has correct property value');
});

test('Collection IsDirty Test', function () {

    var coll = new es.objects.EmployeesCollection();

    var emp = new es.objects.Employees();
    emp.EmployeeID(44);

    coll.push(emp);
    equals(coll.isDirty(), true, 'isDirty returns true!');

    emp.acceptChanges();
    equals(!coll.isDirty(), true, 'isDirty returns true!');

    emp.EmployeeID(44); // set it to the same value shouldn't make it dirty
    equals(!coll.isDirty(), true, 'isDirty returns true!');

    emp.EmployeeID(45); // now really change it
    equals(coll.isDirty(), true, 'isDirty returns true!');
});


