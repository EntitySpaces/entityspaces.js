
(function (es) { //myNS = "myNameSpace" ... for example purposes

	if (typeof (es) === undefined) {
		throw "Please Load EntitySpaces.Core First";
	}

	es.objects.Region = es.defineEntity(function () {

		// core columns
		this.RegionID = ko.observable();
		this.RegionDescription = ko.observable();

		// extended colulmns
		this.esExtendedData;


		// Hierarchical Properties
		this.TerritoriesCollectionByRegionID;

		this.esTypeDefs = {
			TerritoriesCollectionByRegionID: "TerritoriesCollection"
		};
	});

	//#region Routing

	es.objects.Region.prototype.routes = {
		commit: { method: 'PUT', url: 'Region_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'Region_LoadByPrimaryKey', response: 'entity', synchronous: true }
	};

	//#endregion
}(window.es, window.myNS));

(function (es) {

	es.objects.RegionCollection = es.defineCollection('RegionCollection', 'Region');

	//#region Routing

	es.objects.RegionCollection.prototype.routes = {
		commit: { method: 'PUT', url: 'RegionCollection_Save', response: 'collection' },
		loadAll: { method: 'GET', url: 'RegionCollection_LoadAll', response: 'collection', synchronous: true }
	};

	//#endregion
}(window.es));
