

(function (es, myNS) { //myNS = "myNameSpace" ... for example purposes

    if (typeof (es) === undefined) { throw "Please Load EntitySpaces.Core First"; }

    myNS.Product = function (data) {
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

        this.init(data); //base object
    };

    myNS.Product.prototype = new es.BaseEsObject();

    //#region Routing

    myNS.Product.prototype.routes = {
        create: { method: 'PUT', url: '/Product/Create' },
        update: { method: 'POST', url: '/Product/Update'},
        del: { method: 'DELETE', url: '/Product/Delete'},
        loadByPrimaryKey: { method: 'GET', url: '/Product/{id}'}
    };

    //#endregion
} (window.es, window.myNS));