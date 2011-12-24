/* File Created: December 22, 2011 */

(function (es) { //myNS = "myNameSpace" ... for example purposes

    if (typeof (es) === undefined) {
        throw "Please Load EntitySpaces.Core First"; 
    }

    es.objects.Orders = es.defineEntity(function () {

        // core columns
        this.OrderID = ko.observable(null);
        this.CustomerID = ko.observable(null);
        this.EmployeeID = ko.observable(null);
        this.OrderDate = ko.observable(null);
        this.RequiredDate = ko.observable(null);
        this.ShippedDate = ko.observable(null);
        this.ShipVia = ko.observable(null);
        this.Freight = ko.observable(null);
        this.ShipName = ko.observable(null);
        this.ShipAddress = ko.observable(null);
        this.ShipCity = ko.observable(null);
        this.ShipRegion = ko.observable(null);
        this.ShipPostalCode = ko.observable(null);
        this.ShipCountry = ko.observable(null);

        // extended colulmns
        this.esExtendedData = null;

        // hierarchical data
        this.OrderDetailsCollectionByOrderID = null;

        this.esTypeDefs = {
            OrderDetailsCollectionByOrderID: "OrderDetailsCollection"
        };
    });

    //#region Routing

    es.objects.Orders.prototype.routes = {
        commit: { method: 'PUT', url: 'Orders_Save', response: 'entity' },
        loadByPrimaryKey: { method: 'GET', url: 'Orders_LoadByPrimaryKey', response: 'entity', synchronous: true }
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