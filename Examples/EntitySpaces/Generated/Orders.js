
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


		// Hierarchical Properties
		this.UpToProductsCollection;
		this.OrderDetailsCollectionByOrderID;
		this.UpToCustomersByCustomerID;
		this.UpToEmployeesByEmployeeID;
		this.UpToShippersByShipVia;

		this.esTypeDefs = {
			UpToProductsCollection: "ProductsCollection",
			OrderDetailsCollectionByOrderID: "OrderDetailsCollection",
			UpToCustomersByCustomerID: "Customers",
			UpToEmployeesByEmployeeID: "Employees",
			UpToShippersByShipVia: "Shippers"
		};
	});

	//#region Routing

	es.objects.Orders.prototype.routes = {
		commit: { method: 'PUT', url: 'Orders_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'Orders_LoadByPrimaryKey', response: 'entity', synchronous: true }
	};

	//#endregion
}(window.es, window.myNS));

(function (es) {

	es.objects.OrdersCollection = es.defineCollection('OrdersCollection', 'Orders');

	//#region Routing

	es.objects.OrdersCollection.prototype.routes = {
		commit: { method: 'PUT', url: 'OrdersCollection_Save', response: 'collection' },
		loadAll: { method: 'GET', url: 'OrdersCollection_LoadAll', response: 'collection', synchronous: true }
	};

	//#endregion
}(window.es));
