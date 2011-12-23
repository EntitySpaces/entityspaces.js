/// <reference path="../Libs/jquery-1.7.1.js" />
/// <reference path="../Libs/knockout-2.0.0.debug.js" />
/// <reference path="../Libs/json2.js" />
/// <reference path="Qunit/qunit.js" />
/// <reference path="../Build/entityspaces.debug.js" />
/// <reference path="MockProviders/MockAjaxProvider.js" />

module('Populate Entity Tests');

test('basic smoke Test', function () {

    //override the provider's execute method
    es.testDataProvider.execute = function (options) {

        //hand the success handler our dummy data
        options.success(getEmployeeData());
    };

    var emp = new es.objects.Employees();

    //this will test the entire request pipeline
    emp.loadByPrimaryKey('testId');

    equals(emp.EmployeeID(), 1, 'EmployeeId is correct');
});

test('Two Level Hierarchical Test', function () {

    //override the provider's execute method
    es.testDataProvider.execute = function (options) {

        //hand the success handler our dummy data
        options.success(getEmployeeData());
    };

    var emp = new es.objects.Employees();

    //this will test the entire request pipeline
    emp.loadByPrimaryKey('testId');

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
    emp.loadByPrimaryKey('testId');

    var orderDetails = emp.OrdersCollectionByEmployeeID()[0].OrderDetailsCollectionByOrderID();

    equals(orderDetails.length, 3, 'emp.OrdersCollectionByEmployeeID was populated');
});