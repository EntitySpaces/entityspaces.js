/// <reference path="../Libs/jquery-1.7.1.js" />
/// <reference path="../Libs/knockout-2.0.0.debug.js" />
/// <reference path="../Libs/json2.js" />
/// <reference path="Qunit/qunit.js" />
/// <reference path="../Build/entityspaces.debug.js" />

module('EsEntityCollection_tests.js');

test('Basic Collection Smoke Test', function () {

    var coll = new es.objects.EmployeesCollection();

    ok(coll, 'Collection Initialized');
    equals(coll.length, 0, 'Initialized as an Empty Array');
    equals(coll.myMethod(), 2, 'Extra method was correctly added to Collection');
});

test('addNew Test', function () {

    var coll = new es.objects.EmployeesCollection();
    var emp = coll.addNew();
    emp.EmployeeID(44);

    ok(coll, 'Collection Initialized');
    ok(emp, 'Employee Initialized');
    equals(coll().length, 1, 'Initialized as an Empty Array');
    equals(coll()[0].EmployeeID(), 44, 'First item has correct property value');
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

test('Ctor Populate Collection Test', function () {

    var coll = new es.objects.EmployeesCollection([
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

test('Collection.MarkAsDeleted Test', function () {

    var i, arr, koArr,
        coll = new es.objects.EmployeesCollection();


    for (i = 0; i < 50; i++) {
        var emp = new es.objects.Employees({
            EmployeeID: i,
            FirstName: 'John',
            LastName: 'Smith'
        });

        coll.push(emp);
    }

    // Mark them all as unchanged
    coll.acceptChanges();

    equals(coll().length, 50, 'Count is equal to 50');

    coll.markAsDeleted(coll()[25]);
    equals(coll().length, 49, 'Count is equal to 50');

    coll.rejectChanges();
    equals(coll().length, 50, 'Count is equal to 50');

    arr = [];
    arr.push(coll()[25]);
    arr.push(coll()[27]);

    coll.markAsDeleted(arr);
    equals(coll().length, 48, 'Count is equal to 48');

    coll.rejectChanges();
    equals(coll().length, 50, 'Count is equal to 50');

    koArr = ko.observableArray();
    koArr.push(coll()[25]);
    koArr.push(coll()[27]);

    coll.markAsDeleted(koArr);
    equals(coll().length, 48, 'Count is equal to 48');

    coll.rejectChanges();
    equals(coll().length, 50, 'Count is equal to 50');

    coll.markAsDeleted(coll()[25], coll()[27], coll()[29]);
    equals(coll().length, 47, 'Count is equal to 47');

    coll.rejectChanges();
    equals(coll().length, 50, 'Count is equal to 50');
});


