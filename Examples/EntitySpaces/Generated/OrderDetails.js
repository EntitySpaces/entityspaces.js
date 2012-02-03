//===============================================================================		
// EntitySpaces Version : 2012.1.0000.0
// Date Generated       : 2/2/2012 8:02:05 PM
//===============================================================================

(function (es) { //myNS = "myNameSpace" ... for example purposes

	if (typeof (es) === undefined) {
		throw "Please Load EntitySpaces.Core First";
	}

	es.objects.OrderDetails = es.defineEntity(function () {

		// core columns
		this.OrderID = ko.observable();
		this.ProductID = ko.observable();
		this.UnitPrice = ko.observable();
		this.Quantity = ko.observable();
		this.Discount = ko.observable();

		this.esPrimaryKeys = function() {
			var val = {data: {}};
			val.data.orderID = this.OrderID();
			val.data.productID = this.ProductID();
			return val;
		};

		// extended columns
		this.esExtendedData = undefined;

		// Hierarchical Properties
		this.UpToOrdersByOrderID = new es.defineLazyLoader(this, 'UpToOrdersByOrderID');
		this.UpToProductsByProductID = new es.defineLazyLoader(this, 'UpToProductsByProductID');
	});

	//#region Prototype Level Information

	es.objects.OrderDetails.prototype.esTypeDefs = {
		UpToOrdersByOrderID: "Orders",
		UpToProductsByProductID: "Products"
	};

	es.objects.OrderDetails.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'OrderDetails_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'OrderDetails_LoadByPrimaryKey', response: 'entity' },
		UpToOrdersByOrderID: { method: 'GET', url: 'OrderDetails_UpToOrdersByOrderID', response: 'entity'},
		UpToProductsByProductID: { method: 'GET', url: 'OrderDetails_UpToProductsByProductID', response: 'entity'}
	};

	es.objects.OrderDetails.prototype.esColumnMap = {
		'OrderID': 1,
		'ProductID': 1,
		'UnitPrice': 1,
		'Quantity': 1,
		'Discount': 1
	};

	//#endregion

}(window.es, window.myNS));

(function (es) {

	es.objects.OrderDetailsCollection = es.defineCollection('OrderDetailsCollection', 'OrderDetails');

	//#region Prototype Level Information

	es.objects.OrderDetailsCollection.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'OrderDetailsCollection_Save', response: 'collection' },
		loadAll: { method: 'GET', url: 'OrderDetailsCollection_LoadAll', response: 'collection' }
	};

	//#endregion

}(window.es, window.myNS));