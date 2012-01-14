//===============================================================================		
// EntitySpaces Version : 2012.1.0000.0
// Date Generated       : 1/14/2012 5:51:24 PM
//===============================================================================

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

		// extended columns
		this.esExtendedData = undefined;

		// Hierarchical Properties
		this.UpToOrdersCollection = undefined;
		this.OrderDetailsCollectionByProductID = undefined;
		this.UpToCategoriesByCategoryID = undefined;
		this.UpToSuppliersBySupplierID = undefined;
	});

	//#region Prototype Level Information

	es.objects.Products.prototype.esTypeDefs = {
		UpToOrdersCollection: "OrdersCollection",
		OrderDetailsCollectionByProductID: "OrderDetailsCollection",
		UpToCategoriesByCategoryID: "Categories",
		UpToSuppliersBySupplierID: "Suppliers"
	};
	
	es.objects.Products.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'Products_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'Products_LoadByPrimaryKey', response: 'entity' }
	};

	es.objects.Products.prototype.esColumnMap = [];

	//#endregion

}(window.es, window.myNS));

(function (es) {

	es.objects.ProductsCollection = es.defineCollection('ProductsCollection', 'Products');

	//#region Prototype Level Information

	es.objects.ProductsCollection.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'ProductsCollection_Save', response: 'collection' },
		loadAll: { method: 'GET', url: 'ProductsCollection_LoadAll', response: 'collection' }
	};

	//#endregion

}(window.es, window.myNS));
