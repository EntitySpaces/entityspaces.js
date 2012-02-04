//===============================================================================		
// EntitySpaces Version : 2012.1.0000.0
// Date Generated       : 2/4/2012 8:18:51 AM
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

		// Primary Key(s)
		this.esPrimaryKeys = function() {
			return this.EmployeeID();
		}

		// extended columns
		this.esExtendedData = undefined;

		// Hierarchical Properties
		this.EmployeesCollectionByReportsTo = es.defineLazyLoader(this, 'EmployeesCollectionByReportsTo');
		this.UpToEmployeesByReportsTo = es.defineLazyLoader(this, 'UpToEmployeesByReportsTo');
		this.UpToTerritoriesCollection = es.defineLazyLoader(this, 'UpToTerritoriesCollection');
		this.EmployeeTerritoriesCollectionByEmployeeID = es.defineLazyLoader(this, 'EmployeeTerritoriesCollectionByEmployeeID');
		this.OrdersCollectionByEmployeeID = es.defineLazyLoader(this, 'OrdersCollectionByEmployeeID');
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
		loadByPrimaryKey: { method: 'GET', url: 'Employees_LoadByPrimaryKey', response: 'entity' },
		EmployeesCollectionByReportsTo: { method: 'GET', url: 'Employees_EmployeesCollectionByReportsTo', response: 'collection'},
		UpToEmployeesByReportsTo: { method: 'GET', url: 'Employees_UpToEmployeesByReportsTo', response: 'entity'},
		UpToTerritoriesCollection: { method: 'GET', url: 'Employees_UpToTerritoriesCollection', response: 'collection'},
		EmployeeTerritoriesCollectionByEmployeeID: { method: 'GET', url: 'Employees_EmployeeTerritoriesCollectionByEmployeeID', response: 'collection'},
		OrdersCollectionByEmployeeID: { method: 'GET', url: 'Employees_OrdersCollectionByEmployeeID', response: 'collection'}
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