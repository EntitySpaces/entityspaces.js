
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

		// extended colulmns
		this.esExtendedData = undefined;


		// Hierarchical Properties
		this.UpToOrdersByOrderID = undefined;
		this.UpToProductsByProductID = undefined;

		this.es.esTypeDefs = {
			UpToOrdersByOrderID: "Orders",
			UpToProductsByProductID: "Products"
		};
	});

	//#region Routing

	es.objects.OrderDetails.prototype.routes = {
		commit: { method: 'PUT', url: 'OrderDetails_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'OrderDetails_LoadByPrimaryKey', response: 'entity' }
	};

	//#endregion

}(window.es, window.myNS));

(function (es) {

	es.objects.OrderDetailsCollection = es.defineCollection('OrderDetailsCollection', 'OrderDetails');

	//#region Routing

	es.objects.OrderDetailsCollection.prototype.routes = {
		commit: { method: 'PUT', url: 'OrderDetailsCollection_Save', response: 'collection' },
		loadAll: { method: 'GET', url: 'OrderDetailsCollection_LoadAll', response: 'collection' }
	};

	//#endregion

}(window.es));
