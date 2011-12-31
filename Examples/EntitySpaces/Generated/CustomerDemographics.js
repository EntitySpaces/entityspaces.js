
(function (es) { //myNS = "myNameSpace" ... for example purposes

	if (typeof (es) === undefined) {
		throw "Please Load EntitySpaces.Core First";
	}

	es.objects.CustomerDemographics = es.defineEntity(function () {

		// core columns
		this.CustomerTypeID = ko.observable();
		this.CustomerDesc = ko.observable();

		// extended colulmns
		this.esExtendedData;


		// Hierarchical Properties
		this.UpToCustomersCollection;
		this.CustomerCustomerDemoCollectionByCustomerTypeID;

		this.esTypeDefs = {
			UpToCustomersCollection: "CustomersCollection",
			CustomerCustomerDemoCollectionByCustomerTypeID: "CustomerCustomerDemoCollection"
		};
	});

	//#region Routing

	es.objects.CustomerDemographics.prototype.routes = {
		commit: { method: 'PUT', url: 'CustomerDemographics_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'CustomerDemographics_LoadByPrimaryKey', response: 'entity' }
	};

	//#endregion
}(window.es, window.myNS));

(function (es) {

	es.objects.CustomerDemographicsCollection = es.defineCollection('CustomerDemographicsCollection', 'CustomerDemographics');

	//#region Routing

	es.objects.CustomerDemographicsCollection.prototype.routes = {
		commit: { method: 'PUT', url: 'CustomerDemographicsCollection_Save', response: 'collection' },
		loadAll: { method: 'GET', url: 'CustomerDemographicsCollection_LoadAll', response: 'collection' }
	};

	//#endregion
}(window.es));
