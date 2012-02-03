//===============================================================================		
// EntitySpaces Version : 2012.1.0000.0
// Date Generated       : 2/2/2012 8:02:05 PM
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

		// Primary Key(s)
		this.esPrimaryKeys = function() {
			return this.CustomerID();
		}

		// extended columns
		this.esExtendedData = undefined;

		// Hierarchical Properties
		this.UpToCustomerDemographicsCollection = new es.defineLazyLoader(this, 'UpToCustomerDemographicsCollection');
		this.CustomerCustomerDemoCollectionByCustomerID = new es.defineLazyLoader(this, 'CustomerCustomerDemoCollectionByCustomerID');
		this.OrdersCollectionByCustomerID = new es.defineLazyLoader(this, 'OrdersCollectionByCustomerID');
	});

	//#region Prototype Level Information

	es.objects.Customers.prototype.esTypeDefs = {
		UpToCustomerDemographicsCollection: "CustomerDemographicsCollection",
		CustomerCustomerDemoCollectionByCustomerID: "CustomerCustomerDemoCollection",
		OrdersCollectionByCustomerID: "OrdersCollection"
	};

	es.objects.Customers.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'Customers_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'Customers_LoadByPrimaryKey', response: 'entity' },
		UpToCustomerDemographicsCollection: { method: 'GET', url: 'Customers_UpToCustomerDemographicsCollection', response: 'collection'},
		CustomerCustomerDemoCollectionByCustomerID: { method: 'GET', url: 'Customers_CustomerCustomerDemoCollectionByCustomerID', response: 'collection'},
		OrdersCollectionByCustomerID: { method: 'GET', url: 'Customers_OrdersCollectionByCustomerID', response: 'collection'}
	};

	es.objects.Customers.prototype.esColumnMap = {
		'CustomerID': 1,
		'CompanyName': 1,
		'ContactName': 1,
		'ContactTitle': 1,
		'Address': 1,
		'City': 1,
		'Region': 1,
		'PostalCode': 1,
		'Country': 1,
		'Phone': 1,
		'Fax': 1
	};

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