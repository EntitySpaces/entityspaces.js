/* File Created: December 22, 2011 */

(function (es) { //myNS = "myNameSpace" ... for example purposes

    if (typeof (es) === undefined) {
        throw "Please Load EntitySpaces.Core First";
    }

    es.objects.OrderDetails = es.defineEntity(function () {

        // core columns
        this.OrderID = ko.observable(null);
        this.ProductID = ko.observable(null);
        this.UnitPrice = ko.observable(null);
        this.Quantity = ko.observable(null);
        this.Discount = ko.observable(null);

        // extended colulmns
        this.esExtendedData = null;
    });

    //#region Routing

    es.objects.OrderDetails.prototype.routes = {
        create: { method: 'PUT', url: '/OrderDetails/Create' },
        update: { method: 'POST', url: '/OrderDetails/Update' },
        del: { method: 'DELETE', url: '/OrderDetails/Delete' },
        loadByPrimaryKey: { method: 'GET', url: '/OrderDetails/{orderID}{productID}' }
    };

    //#endregion
} (window.es, window.myNS));

(function (es) {

    es.objects.OrderDetailsCollection = es.defineCollection('OrderDetailsCollection', 'OrderDetails');

    //#region Routing

    es.objects.OrderDetailsCollection.prototype.routes = {
        create: { method: 'PUT', url: '/OrderDetailsCollection/Create' },
        update: { method: 'POST', url: '/OrderDetailsCollection/Update' },
        del: { method: 'DELETE', url: '/OrderDetailsCollection/Delete' }
    };

    //#endregion
} (window.es));