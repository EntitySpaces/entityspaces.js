//===============================================================================		
// EntitySpaces Version : 2012.1.0000.0
// Date Generated       : 1/14/2012 5:51:24 PM
//===============================================================================

(function (es) { //myNS = "myNameSpace" ... for example purposes

	if (typeof (es) === undefined) {
		throw "Please Load EntitySpaces.Core First";
	}

	es.objects.EmployeeTerritories = es.defineEntity(function () {

		// core columns
		this.EmployeeID = ko.observable();
		this.TerritoryID = ko.observable();

		// extended columns
		this.esExtendedData = undefined;

		// Hierarchical Properties
		this.UpToEmployeesByEmployeeID = undefined;
		this.UpToTerritoriesByTerritoryID = undefined;
	});

	//#region Prototype Level Information

	es.objects.EmployeeTerritories.prototype.esTypeDefs = {
		UpToEmployeesByEmployeeID: "Employees",
		UpToTerritoriesByTerritoryID: "Territories"
	};
	
	es.objects.EmployeeTerritories.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'EmployeeTerritories_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'EmployeeTerritories_LoadByPrimaryKey', response: 'entity' }
	};

	es.objects.EmployeeTerritories.prototype.esColumnMap = [];

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
