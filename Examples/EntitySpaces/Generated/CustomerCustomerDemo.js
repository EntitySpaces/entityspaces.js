
(function (es) { //myNS = "myNameSpace" ... for example purposes

	if (typeof (es) === undefined) {
		throw "Please Load EntitySpaces.Core First";
	}

	es.objects.CustomerCustomerDemo = es.defineEntity(function () {

		// core columns
		this.CustomerID = ko.observable();
		this.CustomerTypeID = ko.observable();

		// extended colulmns
		this.esExtendedData;


		// Hierarchical Properties
		this.UpToCustomerDemographicsByCustomerTypeID;
		this.UpToCustomersByCustomerID;

		this.esTypeDefs = {
			UpToCustomerDemographicsByCustomerTypeID: "CustomerDemographics",
			UpToCustomersByCustomerID: "Customers"
		};
	});

	//#region Routing

	es.objects.CustomerCustomerDemo.prototype.routes = {
		commit: { method: 'PUT', url: 'CustomerCustomerDemo_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'CustomerCustomerDemo_LoadByPrimaryKey', response: 'entity', synchronous: true }
	};

	//#endregion
}(window.es, window.myNS));

(function (es) {

	es.objects.CustomerCustomerDemoCollection = es.defineCollection('CustomerCustomerDemoCollection', 'CustomerCustomerDemo');

	//#region Routing

	es.objects.CustomerCustomerDemoCollection.prototype.routes = {
		commit: { method: 'PUT', url: 'CustomerCustomerDemoCollection_Save', response: 'collection' },
		loadAll: { method: 'GET', url: 'CustomerCustomerDemoCollection_LoadAll', response: 'collection', synchronous: true }
	};

	//#endregion
}(window.es));
