//===============================================================================		
// EntitySpaces Version : 2012.1.0000.0
// Date Generated       : 2/4/2012 8:18:51 AM
//===============================================================================

(function (es) { //myNS = "myNameSpace" ... for example purposes

	if (typeof (es) === undefined) {
		throw "Please Load EntitySpaces.Core First";
	}

	es.objects.Region = es.defineEntity(function () {

		// core columns
		this.RegionID = ko.observable();
		this.RegionDescription = ko.observable();

		// Primary Key(s)
		this.esPrimaryKeys = function() {
			return this.RegionID();
		}

		// extended columns
		this.esExtendedData = undefined;

		// Hierarchical Properties
		this.TerritoriesCollectionByRegionID = es.defineLazyLoader(this, 'TerritoriesCollectionByRegionID');
	});

	//#region Prototype Level Information

	es.objects.Region.prototype.esTypeDefs = {
		TerritoriesCollectionByRegionID: "TerritoriesCollection"
	};

	es.objects.Region.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'Region_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'Region_LoadByPrimaryKey', response: 'entity' },
		TerritoriesCollectionByRegionID: { method: 'GET', url: 'Region_TerritoriesCollectionByRegionID', response: 'collection'}
	};

	es.objects.Region.prototype.esColumnMap = {
		'RegionID': 1,
		'RegionDescription': 1
	};

	//#endregion

}(window.es, window.myNS));

(function (es) {

	es.objects.RegionCollection = es.defineCollection('RegionCollection', 'Region');

	//#region Prototype Level Information

	es.objects.RegionCollection.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'RegionCollection_Save', response: 'collection' },
		loadAll: { method: 'GET', url: 'RegionCollection_LoadAll', response: 'collection' }
	};

	//#endregion

}(window.es, window.myNS));