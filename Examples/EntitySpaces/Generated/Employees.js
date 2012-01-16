//===============================================================================		
// EntitySpaces Version : 2012.1.0000.0
// Date Generated       : 1/15/2012 12:20:55 PM
//===============================================================================

(function (es) { //myNS = "myNameSpace" ... for example purposes

	if (typeof (es) === undefined) {
		throw "Please Load EntitySpaces.Core First";
	}

	es.objects.Employees = es.defineEntity(function () {

		// core columns
		this.EmployeeID = ko.observable();
		this.LastName = ko.observable();
		this.FirstName = ko.observable();
		this.Title = ko.observable();
		this.TitleOfCourtesy = ko.observable();
		this.BirthDate = ko.observable();
		this.HireDate = ko.observable();
		this.Address = ko.observable();
		this.City = ko.observable();
		this.Region = ko.observable();
		this.PostalCode = ko.observable();
		this.Country = ko.observable();
		this.HomePhone = ko.observable();
		this.Extension = ko.observable();
		this.Photo = ko.observable();
		this.Notes = ko.observable();
		this.ReportsTo = ko.observable();
		this.PhotoPath = ko.observable();

		// extended columns
		this.esExtendedData = undefined;

		// Hierarchical Properties
		this.EmployeesCollectionByReportsTo = undefined;
		this.UpToEmployeesByReportsTo = undefined;
		this.UpToTerritoriesCollection = undefined;
		this.EmployeeTerritoriesCollectionByEmployeeID = undefined;
		this.OrdersCollectionByEmployeeID = undefined;
	});

	//#region Prototype Level Information

	es.objects.Employees.prototype.esTypeDefs = {
		EmployeesCollectionByReportsTo: "EmployeesCollection",
		UpToEmployeesByReportsTo: "Employees",
		UpToTerritoriesCollection: "TerritoriesCollection",
		EmployeeTerritoriesCollectionByEmployeeID: "EmployeeTerritoriesCollection",
		OrdersCollectionByEmployeeID: "OrdersCollection"
	};
	
	es.objects.Employees.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'Employees_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'Employees_LoadByPrimaryKey', response: 'entity' }
	};

	es.objects.Employees.prototype.esColumnMap = {
		'EmployeeID': 1,
		'LastName': 1,
		'FirstName': 1,
		'Title': 1,
		'TitleOfCourtesy': 1,
		'BirthDate': 1,
		'HireDate': 1,
		'Address': 1,
		'City': 1,
		'Region': 1,
		'PostalCode': 1,
		'Country': 1,
		'HomePhone': 1,
		'Extension': 1,
		'Photo': 1,
		'Notes': 1,
		'ReportsTo': 1,
		'PhotoPath': 1
	};

	//#endregion

}(window.es, window.myNS));

(function (es) {

	es.objects.EmployeesCollection = es.defineCollection('EmployeesCollection', 'Employees');

	//#region Prototype Level Information

	es.objects.EmployeesCollection.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'EmployeesCollection_Save', response: 'collection' },
		loadAll: { method: 'GET', url: 'EmployeesCollection_LoadAll', response: 'collection' }
	};

	//#endregion

}(window.es, window.myNS));
