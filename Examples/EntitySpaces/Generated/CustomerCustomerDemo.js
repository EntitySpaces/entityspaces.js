//===============================================================================		
// EntitySpaces Version : 2012.1.0000.0
// Date Generated       : 1/14/2012 5:51:23 PM
//===============================================================================

(function (es) { //myNS = "myNameSpace" ... for example purposes

	if (typeof (es) === undefined) {
		throw "Please Load EntitySpaces.Core First";
	}

	es.objects.CustomerCustomerDemo = es.defineEntity(function () {

		// core columns
		this.CustomerID = ko.observable();
		this.CustomerTypeID = ko.observable();

		// extended columns
		this.esExtendedData = undefined;

		// Hierarchical Properties
		this.UpToCustomerDemographicsByCustomerTypeID = undefined;
		this.UpToCustomersByCustomerID = undefined;
	});

	//#region Prototype Level Information

	es.objects.CustomerCustomerDemo.prototype.esTypeDefs = {
		UpToCustomerDemographicsByCustomerTypeID: "CustomerDemographics",
		UpToCustomersByCustomerID: "Customers"
	};
	
	es.objects.CustomerCustomerDemo.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'CustomerCustomerDemo_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'CustomerCustomerDemo_LoadByPrimaryKey', response: 'entity' }
	};

	es.objects.CustomerCustomerDemo.prototype.esColumnMap = [];

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
