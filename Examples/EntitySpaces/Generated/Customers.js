//===============================================================================		
// EntitySpaces Version : 2012.1.0000.0
// Date Generated       : 1/14/2012 11:29:15 AM
//===============================================================================

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

		// extended columns
		this.esExtendedData = undefined;

		// Hierarchical Properties
		this.UpToCustomerDemographicsCollection = undefined;
		this.CustomerCustomerDemoCollectionByCustomerID = undefined;
		this.OrdersCollectionByCustomerID = undefined;
	});

	//#region Prototype Level Information

	es.objects.Customers.prototype.esTypeDefs = {
		UpToCustomerDemographicsCollection: "CustomerDemographicsCollection",
		CustomerCustomerDemoCollectionByCustomerID: "CustomerCustomerDemoCollection",
		OrdersCollectionByCustomerID: "OrdersCollection"
	};
	
	es.objects.Customers.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'Customers_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'Customers_LoadByPrimaryKey', response: 'entity' }
	};

	es.objects.Customers.prototype.esColumnMap = [];

	//#endregion

}(window.es, window.myNS));

(function (es) {

	es.objects.CustomersCollection = es.defineCollection('CustomersCollection', 'Customers');

	//#region Prototype Level Information

	es.objects.CustomersCollection.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'CustomersCollection_Save', response: 'collection' },
		loadAll: { method: 'GET', url: 'CustomersCollection_LoadAll', response: 'collection' }
	};

	//#endregion

}(window.es, window.myNS));
