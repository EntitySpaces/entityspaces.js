//===============================================================================		
// EntitySpaces Version : 2012.1.0000.0
// Date Generated       : 1/14/2012 8:40:02 PM
//===============================================================================

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

		// extended columns
		this.esExtendedData = undefined;

		// Hierarchical Properties
		this.ProductsCollectionByCategoryID = undefined;
	});

	//#region Prototype Level Information

	es.objects.Categories.prototype.esTypeDefs = {
		ProductsCollectionByCategoryID: "ProductsCollection"
	};
	
	es.objects.Categories.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'Categories_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'Categories_LoadByPrimaryKey', response: 'entity' }
	};

	es.objects.Categories.prototype.esColumnMap = {
		'CategoryID': 'CategoryID',
		'CategoryName': 'CategoryName',
		'Description': 'Description',
		'Picture': 'Picture'
	};

	//#endregion

}(window.es, window.myNS));

(function (es) {

	es.objects.CategoriesCollection = es.defineCollection('CategoriesCollection', 'Categories');

	//#region Prototype Level Information

	es.objects.CategoriesCollection.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'CategoriesCollection_Save', response: 'collection' },
		loadAll: { method: 'GET', url: 'CategoriesCollection_LoadAll', response: 'collection' }
	};

	//#endregion

}(window.es, window.myNS));
