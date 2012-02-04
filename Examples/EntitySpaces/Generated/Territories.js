//===============================================================================		
// EntitySpaces Version : 2012.1.0000.0
// Date Generated       : 2/4/2012 8:18:51 AM
//===============================================================================

(function (es) { //myNS = "myNameSpace" ... for example purposes

	if (typeof (es) === undefined) {
		throw "Please Load EntitySpaces.Core First";
	}

	es.objects.Territories = es.defineEntity(function () {

		// core columns
		this.TerritoryID = ko.observable();
		this.TerritoryDescription = ko.observable();
		this.RegionID = ko.observable();

		// Primary Key(s)
		this.esPrimaryKeys = function() {
			return this.TerritoryID();
		}

		// extended columns
		this.esExtendedData = undefined;

		// Hierarchical Properties
		this.UpToEmployeesCollection = es.defineLazyLoader(this, 'UpToEmployeesCollection');
		this.EmployeeTerritoriesCollectionByTerritoryID = es.defineLazyLoader(this, 'EmployeeTerritoriesCollectionByTerritoryID');
		this.UpToRegionByRegionID = es.defineLazyLoader(this, 'UpToRegionByRegionID');
	});

	//#region Prototype Level Information

	es.objects.Territories.prototype.esTypeDefs = {
		UpToEmployeesCollection: "EmployeesCollection",
		EmployeeTerritoriesCollectionByTerritoryID: "EmployeeTerritoriesCollection",
		UpToRegionByRegionID: "Region"
	};

	es.objects.Territories.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'Territories_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'Territories_LoadByPrimaryKey', response: 'entity' },
		UpToEmployeesCollection: { method: 'GET', url: 'Territories_UpToEmployeesCollection', response: 'collection'},
		EmployeeTerritoriesCollectionByTerritoryID: { method: 'GET', url: 'Territories_EmployeeTerritoriesCollectionByTerritoryID', response: 'collection'},
		UpToRegionByRegionID: { method: 'GET', url: 'Territories_UpToRegionByRegionID', response: 'entity'}
	};

	es.objects.Territories.prototype.esColumnMap = {
		'TerritoryID': 1,
		'TerritoryDescription': 1,
		'RegionID': 1
	};

	//#endregion

}(window.es, window.myNS));

(function (es) {

	es.objects.TerritoriesCollection = es.defineCollection('TerritoriesCollection', 'Territories');

	//#region Prototype Level Information

	es.objects.TerritoriesCollection.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'TerritoriesCollection_Save', response: 'collection' },
		loadAll: { method: 'GET', url: 'TerritoriesCollection_LoadAll', response: 'collection' }
	};

	//#endregion

}(window.es, window.myNS));