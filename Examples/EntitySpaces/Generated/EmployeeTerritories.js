
(function (es) { //myNS = "myNameSpace" ... for example purposes

	if (typeof (es) === undefined) {
		throw "Please Load EntitySpaces.Core First";
	}

	es.objects.EmployeeTerritories = es.defineEntity(function () {

		// core columns
		this.EmployeeID = ko.observable();
		this.TerritoryID = ko.observable();

		// extended colulmns
		this.esExtendedData;


		// Hierarchical Properties
		this.UpToEmployeesByEmployeeID;
		this.UpToTerritoriesByTerritoryID;

		this.esTypeDefs = {
			UpToEmployeesByEmployeeID: "Employees",
			UpToTerritoriesByTerritoryID: "Territories"
		};
	});

	//#region Routing

	es.objects.EmployeeTerritories.prototype.routes = {
		commit: { method: 'PUT', url: 'EmployeeTerritories_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'EmployeeTerritories_LoadByPrimaryKey', response: 'entity', synchronous: true }
	};

	//#endregion
}(window.es, window.myNS));

(function (es) {

	es.objects.EmployeeTerritoriesCollection = es.defineCollection('EmployeeTerritoriesCollection', 'EmployeeTerritories');

	//#region Routing

	es.objects.EmployeeTerritoriesCollection.prototype.routes = {
		commit: { method: 'PUT', url: 'EmployeeTerritoriesCollection_Save', response: 'collection' },
		loadAll: { method: 'GET', url: 'EmployeeTerritoriesCollection_LoadAll', response: 'collection', synchronous: true }
	};

	//#endregion
}(window.es));
