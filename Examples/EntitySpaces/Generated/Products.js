
(function (es) { //myNS = "myNameSpace" ... for example purposes

	if (typeof (es) === undefined) {
		throw "Please Load EntitySpaces.Core First";
	}

	es.objects.Products = es.defineEntity(function () {

		// core columns
		this.ProductID = ko.observable();
		this.ProductName = ko.observable();
		this.SupplierID = ko.observable();
		this.CategoryID = ko.observable();
		this.QuantityPerUnit = ko.observable();
		this.UnitPrice = ko.observable();
		this.UnitsInStock = ko.observable();
		this.UnitsOnOrder = ko.observable();
		this.ReorderLevel = ko.observable();
		this.Discontinued = ko.observable();

		// extended colulmns
		this.esExtendedData;


		// Hierarchical Properties
		this.UpToOrdersCollection;
		this.OrderDetailsCollectionByProductID;
		this.UpToCategoriesByCategoryID;
		this.UpToSuppliersBySupplierID;

		this.esTypeDefs = {
			UpToOrdersCollection: "OrdersCollection",
			OrderDetailsCollectionByProductID: "OrderDetailsCollection",
			UpToCategoriesByCategoryID: "Categories",
			UpToSuppliersBySupplierID: "Suppliers"
		};
	});

	//#region Routing

	es.objects.Products.prototype.routes = {
		commit: { method: 'PUT', url: 'Products_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'Products_LoadByPrimaryKey', response: 'entity' }
	};

	//#endregion
}(window.es, window.myNS));

(function (es) {

	es.objects.ProductsCollection = es.defineCollection('ProductsCollection', 'Products');

	//#region Routing

	es.objects.ProductsCollection.prototype.routes = {
		commit: { method: 'PUT', url: 'ProductsCollection_Save', response: 'collection' },
		loadAll: { method: 'GET', url: 'ProductsCollection_LoadAll', response: 'collection' }
	};

	//#endregion
}(window.es));
