(function (es) { //myNS = "myNameSpace" ... for example purposes

    if (typeof (es) === undefined) { throw "Please Load EntitySpaces.Core First"; }

    es.objects.Product = es.defineEntity(function () {

        this.ProductId,
        this.OrganizationId,
        this.Sku = ko.observable(),
        this.Summary = ko.observable(),
        this.Description = ko.observable(),
        this.ClassId,
        this.ColorCode = ko.observable(),
        this.Alert = ko.observable(),
        this.PrimaryFeatureCategoryId,
        this.SecondaryFeatureCategoryId ,
        this.SupplierSku = ko.observable(),
        this.SupplierId,
        this.ColorId,
        this.ProductTypeKey = ko.observable(),
        this.CreatedOn,
        this.ModifiedOn,
        this.ModifiedBy,
        this.Version,

        // extended colulmns
        this.esExtendedData;
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