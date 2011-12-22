(function (es) { //myNS = "myNameSpace" ... for example purposes

    if (typeof (es) === undefined) { throw "Please Load EntitySpaces.Core First"; }

    es.objects.Product = es.defineEntity(function() {
        this.ProductId = null,
        this.OrganizationId = null,
        this.Sku = ko.observable(null),
        this.Summary = ko.observable(null),
        this.Description = ko.observable(null),
        this.ClassId = null,
        this.ColorCode = ko.observable(null),
        this.Alert = ko.observable(null),
        this.PrimaryFeatureCategoryId = null,
        this.SecondaryFeatureCategoryId = null,
        this.SupplierSku = ko.observable(null),
        this.SupplierId = null,
        this.ColorId = null,
        this.ProductTypeKey = ko.observable(null),
        this.CreatedOn = null,
        this.ModifiedOn = null,
        this.ModifiedBy = null,
        this.Version = null
    });

    //#region Routing

    es.objects.Product.prototype.routes = {
        create: { method: 'PUT', url: '/Product/Create' },
        update: { method: 'POST', url: '/Product/Update' },
        del: { method: 'DELETE', url: '/Product/Delete' },
        loadByPrimaryKey: { method: 'GET', url: '/Product/{id}' }
    };

    //#endregion
} (window.es, window.myNS));

(function (es) { 

    es.objects.ProductCollection = es.defineCollection('ProductCollection', 'Product');

    //#region Routing

    es.objects.ProductCollection.prototype.routes = {
        create: { method: 'PUT', url: '/Products/Create' },
        update: { method: 'POST', url: '/Products/Update' },
        del: { method: 'DELETE', url: '/Products/Delete' },
        loadByPrimaryKey: { method: 'GET', url: '/Products/{id}' }
    };

    //#endregion
} (window.es));