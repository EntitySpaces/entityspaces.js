
(function (es) { //myNS = "myNameSpace" ... for example purposes

	if (typeof (es) === undefined) {
		throw "Please Load EntitySpaces.Core First";
	}

	es.objects.Territories = es.defineEntity(function () {

		// core columns
		this.TerritoryID = ko.observable();
		this.TerritoryDescription = ko.observable();
		this.RegionID = ko.observable();

		// extended colulmns
		this.esExtendedData;


		// Hierarchical Properties
		this.UpToEmployeesCollection;
		this.EmployeeTerritoriesCollectionByTerritoryID;
		this.UpToRegionByRegionID;

		this.esTypeDefs = {
			UpToEmployeesCollection: "EmployeesCollection",
			EmployeeTerritoriesCollectionByTerritoryID: "EmployeeTerritoriesCollection",
			UpToRegionByRegionID: "Region"
		};
	});

	//#region Routing

	es.objects.Territories.prototype.routes = {
		commit: { method: 'PUT', url: 'Territories_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'Territories_LoadByPrimaryKey', response: 'entity' }
	};

	//#endregion
}(window.es, window.myNS));

(function (es) {

	es.objects.TerritoriesCollection = es.defineCollection('TerritoriesCollection', 'Territories');

	//#region Routing

	es.objects.TerritoriesCollection.prototype.routes = {
		commit: { method: 'PUT', url: 'TerritoriesCollection_Save', response: 'collection' },
		loadAll: { method: 'GET', url: 'TerritoriesCollection_LoadAll', response: 'collection' }
	};

	//#endregion
}(window.es));
