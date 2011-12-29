


(function (es) { //myNS = "myNameSpace" ... for example purposes

	if (typeof (es) === undefined) {
		throw "Please Load EntitySpaces.Core First";
	}

	es.objects.Categories = es.defineEntity(function () {

		// core columns
		this.CategoryID = ko.observable();
		this.CategoryName = ko.observable();
		this.Description = ko.observable();
		this.Picture = ko.observable();

		// extended colulmns
		this.esExtendedData;


		// Hierarchical Properties
		this.ProductsCollectionByCategoryID;

		this.esTypeDefs = {
			ProductsCollectionByCategoryID: "ProductsCollection"
		};
	});

	//#region Routing

	es.objects.Categories.prototype.routes = {
		commit: { method: 'PUT', url: 'Categories_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'Categories_LoadByPrimaryKey', response: 'entity', synchronous: true }
	};

	//#endregion
}(window.es, window.myNS));

(function (es) {

	es.objects.CategoriesCollection = es.defineCollection('CategoriesCollection', 'Categories');

	//#region Routing

	es.objects.CategoriesCollection.prototype.routes = {
		commit: { method: 'PUT', url: 'CategoriesCollection_Save', response: 'collection' },
		loadAll: { method: 'GET', url: 'CategoriesCollection_LoadAll', response: 'collection', synchronous: true }
	};

	//#endregion
}(window.es));
