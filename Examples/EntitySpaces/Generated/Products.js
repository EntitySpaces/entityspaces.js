//===============================================================================		
// EntitySpaces Version : 2012.1.0000.0
// Date Generated       : 2/4/2012 8:18:51 AM
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

		// Primary Key(s)
		this.esPrimaryKeys = function() {
			return this.ProductID();
		}

		// extended columns
		this.esExtendedData = undefined;

		// Hierarchical Properties
		this.UpToOrdersCollection = es.defineLazyLoader(this, 'UpToOrdersCollection');
		this.OrderDetailsCollectionByProductID = es.defineLazyLoader(this, 'OrderDetailsCollectionByProductID');
		this.UpToCategoriesByCategoryID = es.defineLazyLoader(this, 'UpToCategoriesByCategoryID');
		this.UpToSuppliersBySupplierID = es.defineLazyLoader(this, 'UpToSuppliersBySupplierID');
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
		loadByPrimaryKey: { method: 'GET', url: 'Products_LoadByPrimaryKey', response: 'entity' },
		UpToOrdersCollection: { method: 'GET', url: 'Products_UpToOrdersCollection', response: 'collection'},
		OrderDetailsCollectionByProductID: { method: 'GET', url: 'Products_OrderDetailsCollectionByProductID', response: 'collection'},
		UpToCategoriesByCategoryID: { method: 'GET', url: 'Products_UpToCategoriesByCategoryID', response: 'entity'},
		UpToSuppliersBySupplierID: { method: 'GET', url: 'Products_UpToSuppliersBySupplierID', response: 'entity'}
	};

	es.objects.Products.prototype.esColumnMap = {
		'ProductID': 1,
		'ProductName': 1,
		'SupplierID': 1,
		'CategoryID': 1,
		'QuantityPerUnit': 1,
		'UnitPrice': 1,
		'UnitsInStock': 1,
		'UnitsOnOrder': 1,
		'ReorderLevel': 1,
		'Discontinued': 1
	};

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