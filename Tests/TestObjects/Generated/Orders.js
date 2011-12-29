/* File Created: December 22, 2011 */

(function (es) { //myNS = "myNameSpace" ... for example purposes

    if (typeof (es) === undefined) {
        throw "Please Load EntitySpaces.Core First"; 
    }

    es.objects.Orders = es.defineEntity(function () {

        // core columns
        this.OrderID = ko.observable();
        this.CustomerID = ko.observable();
        this.EmployeeID = ko.observable();
        this.OrderDate = ko.observable();
        this.RequiredDate = ko.observable();
        this.ShippedDate = ko.observable();
        this.ShipVia = ko.observable();
        this.Freight = ko.observable();
        this.ShipName = ko.observable();
        this.ShipAddress = ko.observable();
        this.ShipCity = ko.observable();
        this.ShipRegion = ko.observable();
        this.ShipPostalCode = ko.observable();
        this.ShipCountry = ko.observable();

        // extended colulmns
        this.esExtendedData;

        // hierarchical data
        this.OrderDetailsCollectionByOrderID;

        this.esTypeDefs = {
            OrderDetailsCollectionByOrderID: "OrderDetailsCollection"
        };
    });

    //#region Routing

    es.objects.Orders.prototype.routes = {
        create: { method: 'PUT', url: '/Orders/Create' },
        update: { method: 'POST', url: '/Orders/Update' },
        del: { method: 'DELETE', url: '/Orders/Delete' },
        loadByPrimaryKey: { method: 'GET', url: '/Orders/{OrderID}' }
    };

    //#endregion
} (window.es, window.myNS));

(function (es) {

    es.objects.OrdersCollection = es.defineCollection('OrdersCollection', 'Orders');

    //#region Routing

    es.objects.OrdersCollection.prototype.routes = {
        create: { method: 'PUT', url: '/OrdersCollection/Create' },
        update: { method: 'POST', url: '/OrdersCollection/Update' },
        del: { method: 'DELETE', url: '/OrdersCollection/Delete' }
    };

    //#endregion
} (window.es));