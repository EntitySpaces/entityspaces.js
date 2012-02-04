//===============================================================================		
// EntitySpaces Version : 2012.1.0000.0
// Date Generated       : 2/4/2012 8:18:51 AM
//===============================================================================

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

        // Primary Key(s)
        this.esPrimaryKeys = function () {
            return this.OrderID();
        }

        // extended columns
        this.esExtendedData = undefined;

        // Hierarchical Properties
        this.UpToProductsCollection = es.defineLazyLoader(this, 'UpToProductsCollection');
        this.OrderDetailsCollectionByOrderID = es.defineLazyLoader(this, 'OrderDetailsCollectionByOrderID');
        this.UpToCustomersByCustomerID = es.defineLazyLoader(this, 'UpToCustomersByCustomerID');
        this.UpToEmployeesByEmployeeID = es.defineLazyLoader(this, 'UpToEmployeesByEmployeeID');
        this.UpToShippersByShipVia = es.defineLazyLoader(this, 'UpToShippersByShipVia');
    });

    //#region Prototype Level Information

    es.objects.Orders.prototype.esTypeDefs = {
        UpToProductsCollection: "ProductsCollection",
        OrderDetailsCollectionByOrderID: "OrderDetailsCollection",
        UpToCustomersByCustomerID: "Customers",
        UpToEmployeesByEmployeeID: "Employees",
        UpToShippersByShipVia: "Shippers"
    };

    es.objects.Orders.prototype.esRoutes = {
        commit: { method: 'PUT', url: 'Orders_Save', response: 'entity' },
        loadByPrimaryKey: { method: 'GET', url: 'Orders_LoadByPrimaryKey', response: 'entity' },
        UpToProductsCollection: { method: 'GET', url: 'Orders_UpToProductsCollection', response: 'collection' },
        OrderDetailsCollectionByOrderID: { method: 'GET', url: 'Orders_OrderDetailsCollectionByOrderID', response: 'collection' },
        UpToCustomersByCustomerID: { method: 'GET', url: 'Orders_UpToCustomersByCustomerID', response: 'entity' },
        UpToEmployeesByEmployeeID: { method: 'GET', url: 'Orders_UpToEmployeesByEmployeeID', response: 'entity' },
        UpToShippersByShipVia: { method: 'GET', url: 'Orders_UpToShippersByShipVia', response: 'entity' }
    };

    es.objects.Orders.prototype.esColumnMap = {
        'OrderID': 1,
        'CustomerID': 1,
        'EmployeeID': 1,
        'OrderDate': 1,
        'RequiredDate': 1,
        'ShippedDate': 1,
        'ShipVia': 1,
        'Freight': 1,
        'ShipName': 1,
        'ShipAddress': 1,
        'ShipCity': 1,
        'ShipRegion': 1,
        'ShipPostalCode': 1,
        'ShipCountry': 1
    };

    //#endregion

} (window.es, window.myNS));

(function (es) {

	es.objects.OrdersCollection = es.defineCollection('OrdersCollection', 'Orders');

	//#region Prototype Level Information

	es.objects.OrdersCollection.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'OrdersCollection_Save', response: 'collection' },
		loadAll: { method: 'GET', url: 'OrdersCollection_LoadAll', response: 'collection' }
	};

	//#endregion

}(window.es, window.myNS));