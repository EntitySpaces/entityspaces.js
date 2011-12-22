/// <reference path="../Libs/jquery-1.7.1.js" />
/// <reference path="../Libs/knockout-2.0.RC.js" />
/// <reference path="../Libs/json2.js" />
/// <reference path="Qunit/qunit.js" />
/// <reference path="../Build/entityspaces.debug.js" />

module('Basic Collection Tests');

test('Basic Collection Smoke Test', function () {
    var Product = es.defineEntity(function () {
        this.ProductId = ko.observable(null);
    });

    var ProductCollection = es.defineCollection('ProductCollection', 'Product');

    ProductCollection.prototype.myMethod = function () {
        return 2;
    };

    var myProdCollection = new ProductCollection();

    ok(myProdCollection, 'Collection Initialized');
    equals(myProdCollection().length, [].length, 'Initialized as an Empty Array');
    equals(myProdCollection.myMethod(), 2, 'Extra method was correctly added to Collection');
});

test('Basic Populate Collection Test', function () {
    var Product = es.defineEntity("Product", function () {
        this.ProductId = ko.observable(null);
    });

    var ProductCollection = es.defineCollection('ProductCollection', 'Product');

    var myProdCollection = new ProductCollection();

    myProdCollection.populateCollection([
        { ProductId: 'testId1' },
        { ProductId: 'testId2' }
    ]);

    equals(myProdCollection().length, 2, 'Collection contains 2 items');
    equals(myProdCollection()[0].ProductId(), 'testId1', 'First item has correct property value');
    equals(myProdCollection()[1].ProductId(), 'testId2', 'First item has correct property value');
});


