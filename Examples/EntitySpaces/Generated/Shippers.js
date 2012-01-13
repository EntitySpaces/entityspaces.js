
(function (es) { //myNS = "myNameSpace" ... for example purposes

	if (typeof (es) === undefined) {
		throw "Please Load EntitySpaces.Core First";
	}

	es.objects.Shippers = es.defineEntity(function () {

		// core columns
		this.ShipperID = ko.observable();
		this.CompanyName = ko.observable();
		this.Phone = ko.observable();

		// extended colulmns
		this.esExtendedData = undefined;


		// Hierarchical Properties
		this.OrdersCollectionByShipVia = undefined;

		this.es.esTypeDefs = {
			OrdersCollectionByShipVia: "OrdersCollection"
		};
	});

	//#region Routing

	es.objects.Shippers.prototype.routes = {
		commit: { method: 'PUT', url: 'Shippers_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'Shippers_LoadByPrimaryKey', response: 'entity' }
	};

	//#endregion

}(window.es, window.myNS));

(function (es) {

	es.objects.ShippersCollection = es.defineCollection('ShippersCollection', 'Shippers');

	//#region Routing

	es.objects.ShippersCollection.prototype.routes = {
		commit: { method: 'PUT', url: 'ShippersCollection_Save', response: 'collection' },
		loadAll: { method: 'GET', url: 'ShippersCollection_LoadAll', response: 'collection' }
	};

	//#endregion

}(window.es));
