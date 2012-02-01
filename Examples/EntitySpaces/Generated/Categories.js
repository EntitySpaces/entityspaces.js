//===============================================================================		
// EntitySpaces Version : 2012.1.0000.0
// Date Generated       : 1/31/2012 8:46:07 PM
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

		// Primary Key(s)
        this.esPrimaryKeys = function() {
            return this.CategoryID();
        }

		// extended columns
		this.esExtendedData = undefined;

		// Hierarchical Properties
		this.ProductsCollectionByCategoryID = new es.defineLazyLoader(this, 'ProductsCollectionByCategoryID');
	});

	//#region Prototype Level Information

	es.objects.Categories.prototype.esTypeDefs = {
		ProductsCollectionByCategoryID: "ProductsCollection"
	};

	es.objects.Categories.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'Categories_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'Categories_LoadByPrimaryKey', response: 'entity' },
		ProductsCollectionByCategoryID: { method: 'GET', url: 'Categories_ProductsCollectionByCategoryID', response: 'collection'}
	};

	es.objects.Categories.prototype.esColumnMap = {
		'CategoryID': 1,
		'CategoryName': 1,
		'Description': 1,
		'Picture': 1
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