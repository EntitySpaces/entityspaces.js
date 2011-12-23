/// <reference path="../Libs/jquery-1.7.1.js" />
/// <reference path="../Libs/json2.js" />
/// <reference path="../Libs/knockout-2.0.0.debug.js" />
/// <reference path="Qunit/qunit.js" />
/// <reference path="MockJax/jquery.mockjax.js" />

module('AJAX Loading Tests');

asyncTest('Core Load Basic Test', function () {

    //swap out the testDataProvider for the real AjaxProvider
    es.dataProvider = new es.AjaxProvider();

    //Setup Mockjax

    $.mockjax({
        url: '/Product/Test',
        contentType: 'text/json',
        responseText: {
            ProductId: 'TestId'
        }
    });


    //define an object
    var Product = es.defineEntity(function (data) {
        this.ProductId = ko.observable(null);
    });

    var testP = new Product();

    testP.load({
        url: '/Product/Test',
        type: 'GET',
        success: function () {
            ok(testP, 'Product Loaded');
            equals(testP.ProductId(), 'TestId', 'ProductId was set correctly');

            //clear out the mockjax fake call for more tests            
            $.mockjaxClear();

            start(); //continue the Qunit tests

            //reset the dataProvider
            es.dataProvider = es.testDataProvider;
        }
    });
});


