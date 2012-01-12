
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

		// extended colulmns
		this.esExtendedData;


		// Hierarchical Properties
		this.EmployeesCollectionByReportsTo;
		this.UpToEmployeesByReportsTo;
		this.UpToTerritoriesCollection;
		this.EmployeeTerritoriesCollectionByEmployeeID;
		this.OrdersCollectionByEmployeeID;

		this.es.esTypeDefs = {
			EmployeesCollectionByReportsTo: "EmployeesCollection",
			UpToEmployeesByReportsTo: "Employees",
			UpToTerritoriesCollection: "TerritoriesCollection",
			EmployeeTerritoriesCollectionByEmployeeID: "EmployeeTerritoriesCollection",
			OrdersCollectionByEmployeeID: "OrdersCollection"
		};
	});

	//#region Routing

	es.objects.Employees.prototype.routes = {
		commit: { method: 'PUT', url: 'Employees_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'Employees_LoadByPrimaryKey', response: 'entity', synchronous: true }
	};

	//#endregion
}(window.es, window.myNS));

(function (es) {

	es.objects.EmployeesCollection = es.defineCollection('EmployeesCollection', 'Employees');

	//#region Routing

	es.objects.EmployeesCollection.prototype.routes = {
		commit: { method: 'PUT', url: 'EmployeesCollection_Save', response: 'collection' },
		loadAll: { method: 'GET', url: 'EmployeesCollection_LoadAll', response: 'collection', synchronous: true }
	};

	//#endregion
}(window.es));
