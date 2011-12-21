/// <reference path="../Libs/jquery-1.7.1.js" />
/// <reference path="../Libs/knockout-2.0.RC.js" />
/// <reference path="../Libs/json2.js" />
/// <reference path="Qunit/qunit.js" />
/// <reference path="../Build/entityspaces.debug.js" />

module('Basic Collection Tests');

test('Basic Collection Smoke Test', function () {
    es.clearTypes(); //clear out any previous class definitions

    var Product = es.defineEntity(function () {
        this.ProductId = ko.observable(null);
    });

    var ProductCollection = es.defineCollection('ProductCollection', 'Product');

    ProductCollection.prototype.myMethod = function () {
        console.log('myMethod was called');
    };

    var myProdCollection = new ProductCollection();

    ok(myProdCollection, 'Collection Initialized');


    equals(myProdCollection().length, [].length, 'Initialized as an Empty Array');

});

