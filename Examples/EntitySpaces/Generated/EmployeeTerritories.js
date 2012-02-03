//===============================================================================		
// EntitySpaces Version : 2012.1.0000.0
// Date Generated       : 2/2/2012 8:02:05 PM
//===============================================================================

(function (es) { //myNS = "myNameSpace" ... for example purposes

	if (typeof (es) === undefined) {
		throw "Please Load EntitySpaces.Core First";
	}

	es.objects.EmployeeTerritories = es.defineEntity(function () {

		// core columns
		this.EmployeeID = ko.observable();
		this.TerritoryID = ko.observable();

		this.esPrimaryKeys = function() {
			var val = {data: {}};
			val.data.employeeID = this.EmployeeID();
			val.data.territoryID = this.TerritoryID();
			return val;
		};

		// extended columns
		this.esExtendedData = undefined;

		// Hierarchical Properties
		this.UpToEmployeesByEmployeeID = new es.defineLazyLoader(this, 'UpToEmployeesByEmployeeID');
		this.UpToTerritoriesByTerritoryID = new es.defineLazyLoader(this, 'UpToTerritoriesByTerritoryID');
	});

	//#region Prototype Level Information

	es.objects.EmployeeTerritories.prototype.esTypeDefs = {
		UpToEmployeesByEmployeeID: "Employees",
		UpToTerritoriesByTerritoryID: "Territories"
	};

	es.objects.EmployeeTerritories.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'EmployeeTerritories_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'EmployeeTerritories_LoadByPrimaryKey', response: 'entity' },
		UpToEmployeesByEmployeeID: { method: 'GET', url: 'EmployeeTerritories_UpToEmployeesByEmployeeID', response: 'entity'},
		UpToTerritoriesByTerritoryID: { method: 'GET', url: 'EmployeeTerritories_UpToTerritoriesByTerritoryID', response: 'entity'}
	};

	es.objects.EmployeeTerritories.prototype.esColumnMap = {
		'EmployeeID': 1,
		'TerritoryID': 1
	};

	//#endregion

}(window.es, window.myNS));

(function (es) {

	es.objects.EmployeeTerritoriesCollection = es.defineCollection('EmployeeTerritoriesCollection', 'EmployeeTerritories');

	//#region Prototype Level Information

	es.objects.EmployeeTerritoriesCollection.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'EmployeeTerritoriesCollection_Save', response: 'collection' },
		loadAll: { method: 'GET', url: 'EmployeeTerritoriesCollection_LoadAll', response: 'collection' }
	};

	//#endregion

}(window.es, window.myNS));