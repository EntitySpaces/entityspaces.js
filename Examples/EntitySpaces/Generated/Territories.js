//===============================================================================		
// EntitySpaces Version : 2012.1.0000.0
// Date Generated       : 1/14/2012 8:40:02 PM
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

		// extended columns
		this.esExtendedData = undefined;

		// Hierarchical Properties
		this.UpToEmployeesCollection = undefined;
		this.EmployeeTerritoriesCollectionByTerritoryID = undefined;
		this.UpToRegionByRegionID = undefined;
	});

	//#region Prototype Level Information

	es.objects.Territories.prototype.esTypeDefs = {
		UpToEmployeesCollection: "EmployeesCollection",
		EmployeeTerritoriesCollectionByTerritoryID: "EmployeeTerritoriesCollection",
		UpToRegionByRegionID: "Region"
	};
	
	es.objects.Territories.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'Territories_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'Territories_LoadByPrimaryKey', response: 'entity' }
	};

	es.objects.Territories.prototype.esColumnMap = {
		'TerritoryID': 'TerritoryID',
		'TerritoryDescription': 'TerritoryDescription',
		'RegionID': 'RegionID'
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
