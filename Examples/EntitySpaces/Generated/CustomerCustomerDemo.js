//===============================================================================		
// EntitySpaces Version : 2012.1.0000.0
// Date Generated       : 1/31/2012 8:46:07 PM
//===============================================================================

(function (es) { //myNS = "myNameSpace" ... for example purposes

	if (typeof (es) === undefined) {
		throw "Please Load EntitySpaces.Core First";
	}

	es.objects.CustomerCustomerDemo = es.defineEntity(function () {

		// core columns
		this.CustomerID = ko.observable();
		this.CustomerTypeID = ko.observable();

		this.esPrimaryKeys = function() {
			var val = {data: {}};
			val.data.customerID = this.CustomerID();
			val.data.customerTypeID = this.CustomerTypeID();
			return val;
		};

		// extended columns
		this.esExtendedData = undefined;

		// Hierarchical Properties
		this.UpToCustomerDemographicsByCustomerTypeID = new es.defineLazyLoader(this, 'UpToCustomerDemographicsByCustomerTypeID');
		this.UpToCustomersByCustomerID = new es.defineLazyLoader(this, 'UpToCustomersByCustomerID');
	});

	//#region Prototype Level Information

	es.objects.CustomerCustomerDemo.prototype.esTypeDefs = {
		UpToCustomerDemographicsByCustomerTypeID: "CustomerDemographics",
		UpToCustomersByCustomerID: "Customers"
	};

	es.objects.CustomerCustomerDemo.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'CustomerCustomerDemo_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'CustomerCustomerDemo_LoadByPrimaryKey', response: 'entity' },
		UpToCustomerDemographicsByCustomerTypeID: { method: 'GET', url: 'CustomerCustomerDemo_UpToCustomerDemographicsByCustomerTypeID', response: 'entity'},
		UpToCustomersByCustomerID: { method: 'GET', url: 'CustomerCustomerDemo_UpToCustomersByCustomerID', response: 'entity'}
	};

	es.objects.CustomerCustomerDemo.prototype.esColumnMap = {
		'CustomerID': 1,
		'CustomerTypeID': 1
	};

	//#endregion

}(window.es, window.myNS));

(function (es) {

	es.objects.CustomerCustomerDemoCollection = es.defineCollection('CustomerCustomerDemoCollection', 'CustomerCustomerDemo');

	//#region Prototype Level Information

	es.objects.CustomerCustomerDemoCollection.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'CustomerCustomerDemoCollection_Save', response: 'collection' },
		loadAll: { method: 'GET', url: 'CustomerCustomerDemoCollection_LoadAll', response: 'collection' }
	};

	//#endregion

}(window.es, window.myNS));