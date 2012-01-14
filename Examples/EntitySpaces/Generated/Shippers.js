//===============================================================================		
// EntitySpaces Version : 2012.1.0000.0
// Date Generated       : 1/14/2012 5:51:24 PM
//===============================================================================

(function (es) { //myNS = "myNameSpace" ... for example purposes

	if (typeof (es) === undefined) {
		throw "Please Load EntitySpaces.Core First";
	}

	es.objects.Shippers = es.defineEntity(function () {

		// core columns
		this.ShipperID = ko.observable();
		this.CompanyName = ko.observable();
		this.Phone = ko.observable();

		// extended columns
		this.esExtendedData = undefined;

		// Hierarchical Properties
		this.OrdersCollectionByShipVia = undefined;
	});

	//#region Prototype Level Information

	es.objects.Shippers.prototype.esTypeDefs = {
		OrdersCollectionByShipVia: "OrdersCollection"
	};
	
	es.objects.Shippers.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'Shippers_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'Shippers_LoadByPrimaryKey', response: 'entity' }
	};

	es.objects.Shippers.prototype.esColumnMap = [];

	//#endregion

}(window.es, window.myNS));

(function (es) {

	es.objects.ShippersCollection = es.defineCollection('ShippersCollection', 'Shippers');

	//#region Prototype Level Information

	es.objects.ShippersCollection.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'ShippersCollection_Save', response: 'collection' },
		loadAll: { method: 'GET', url: 'ShippersCollection_LoadAll', response: 'collection' }
	};

	//#endregion

}(window.es, window.myNS));
