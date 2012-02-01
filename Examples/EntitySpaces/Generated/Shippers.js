//===============================================================================		
// EntitySpaces Version : 2012.1.0000.0
// Date Generated       : 1/31/2012 8:54:00 PM
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

		// Primary Key(s)
		this.esPrimaryKeys = function() {
			return this.ShipperID();
		}

		// extended columns
		this.esExtendedData = undefined;

		// Hierarchical Properties
		this.OrdersCollectionByShipVia = new es.defineLazyLoader(this, 'OrdersCollectionByShipVia');
	});

	//#region Prototype Level Information

	es.objects.Shippers.prototype.esTypeDefs = {
		OrdersCollectionByShipVia: "OrdersCollection"
	};

	es.objects.Shippers.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'Shippers_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'Shippers_LoadByPrimaryKey', response: 'entity' },
		OrdersCollectionByShipVia: { method: 'GET', url: 'Shippers_OrdersCollectionByShipVia', response: 'collection'}
	};

	es.objects.Shippers.prototype.esColumnMap = {
		'ShipperID': 1,
		'CompanyName': 1,
		'Phone': 1
	};

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