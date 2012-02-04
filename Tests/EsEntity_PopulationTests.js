/// <reference path="../Libs/jquery-1.7.1.js" />
/// <reference path="../Libs/knockout-2.0.0.debug.js" />
/// <reference path="../Libs/json2.js" />
/// <reference path="Qunit/qunit.js" />
/// <reference path="../Build/entityspaces.debug.js" />
/// <reference path="MockProviders/MockAjaxProvider.js" />

module('EsEntity_PopulationTests.js');

test('basic smoke Test', function () {

    //override the provider's execute method
    es.testDataProvider.execute = function (options) {

        //hand the success handler our dummy data
        options.success(getEmployeeData());
    };

    var emp = new es.objects.Employees();

    //this will test the entire request pipeline
    var wasLoaded = emp.loadByPrimaryKey(1);

    equals(wasLoaded, true, 'EmployeeId was loaded');
    equals(emp.EmployeeID(), 1, 'EmployeeId is correct');
});

test('initialize during construction', function () {

    var emp = new es.objects.Employees({
        FirstName: 'John',
        LastName: 'Smith'
    });

    equals(emp.RowState(), es.RowState.ADDED, 'The RowState is ADDED');
    equals(emp.FirstName(), 'John', 'FirstName is correct');
    equals(emp.LastName(), 'Smith', 'LastName is correct');
});

test('Two Level Hierarchical Test', function () {

    //override the provider's execute method
    es.testDataProvider.execute = function (options) {

        //hand the success handler our dummy data
        options.success(getEmployeeData());
    };

    var emp = new es.objects.Employees();

    //this will test the entire request pipeline
    var loaded = emp.loadByPrimaryKey(1);

    equals(loaded, true, 'Employee was loaded');
    equals(emp.OrdersCollectionByEmployeeID().length, 2, 'emp.OrdersCollectionByEmployeeID was populated');
});

test('Three Level Hierarchical Test', function () {

    //override the provider's execute method
    es.testDataProvider.execute = function (options) {

        //hand the success handler our dummy data
        options.success(getEmployeeData());
    };

    var emp = new es.objects.Employees();

    //this will test the entire request pipeline
    var loaded = emp.loadByPrimaryKey(1);
    equals(loaded, true, 'Employee was loaded');

    var orderDetails = emp.OrdersCollectionByEmployeeID()[0].OrderDetailsCollectionByOrderID();

    equals(orderDetails.length, 3, 'emp.OrdersCollectionByEmployeeID was populated');
});