
(function (es) { //myNS = "myNameSpace" ... for example purposes

	if (typeof (es) === undefined) {
		throw "Please Load EntitySpaces.Core First";
	}

	es.objects.Customers = es.defineEntity(function () {

		// core columns
		this.CustomerID = ko.observable();
		this.CompanyName = ko.observable();
		this.ContactName = ko.observable();
		this.ContactTitle = ko.observable();
		this.Address = ko.observable();
		this.City = ko.observable();
		this.Region = ko.observable();
		this.PostalCode = ko.observable();
		this.Country = ko.observable();
		this.Phone = ko.observable();
		this.Fax = ko.observable();

		// extended colulmns
		this.esExtendedData = undefined;


		// Hierarchical Properties
		this.UpToCustomerDemographicsCollection = undefined;
		this.CustomerCustomerDemoCollectionByCustomerID = undefined;
		this.OrdersCollectionByCustomerID = undefined;

		this.esTypeDefs = {
			UpToCustomerDemographicsCollection: "CustomerDemographicsCollection",
			CustomerCustomerDemoCollectionByCustomerID: "CustomerCustomerDemoCollection",
			OrdersCollectionByCustomerID: "OrdersCollection"
		};
	});

	//#region Routing

	es.objects.Customers.prototype.routes = {
		commit: { method: 'PUT', url: 'Customers_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'Customers_LoadByPrimaryKey', response: 'entity' }
	};

	//#endregion

}(window.es, window.myNS));

(function (es) {

	es.objects.CustomersCollection = es.defineCollection('CustomersCollection', 'Customers');

	//#region Routing

	es.objects.CustomersCollection.prototype.routes = {
		commit: { method: 'PUT', url: 'CustomersCollection_Save', response: 'collection' },
		loadAll: { method: 'GET', url: 'CustomersCollection_LoadAll', response: 'collection' }
	};

	//#endregion

}(window.es));
