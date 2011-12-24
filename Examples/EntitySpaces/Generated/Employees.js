(function (es) { //myNS = "myNameSpace" ... for example purposes

    if (typeof (es) === undefined) {
        throw "Please Load EntitySpaces.Core First";
    }


    es.objects.Employees = es.defineEntity(function () {

        // core columns
        this.EmployeeID = ko.observable(null);
        this.LastName = ko.observable(null);
        this.FirstName = ko.observable(null);
        this.Title = ko.observable(null);
        this.TitleOfCourtesy = ko.observable(null);
        this.BirthDate = ko.observable(null);
        this.HireDate = ko.observable(null);
        this.Address = ko.observable(null);
        this.City = ko.observable(null);
        this.Region = ko.observable(null);
        this.PostalCode = ko.observable(null);
        this.Country = ko.observable(null);
        this.HomePhone = ko.observable(null);
        this.Extension = ko.observable(null);
        this.Photo = ko.observable(null);
        this.Notes = ko.observable(null);
        this.ReportsTo = ko.observable(null);
        this.PhotoPath = ko.observable(null);

        // extended colulmns
        this.esExtendedData = null;

        // hierarchical data
        this.OrdersCollectionByEmployeeID = null;

        this.esTypeDefs = {
            OrdersCollectionByEmployeeID: "OrdersCollection"
        };
    });

    //#region Routing

    es.objects.Employees.prototype.routes = {
        commit: { method: 'PUT', url: 'Employees_Save', response: 'entity' },
        loadByPrimaryKey: { method: 'GET', url: 'Employees_LoadByPrimaryKey', response: 'entity', synchronous: true }
    };

    //#endregion
} (window.es, window.myNS));

(function (es) {

    es.objects.EmployeesCollection = es.defineCollection('EmployeesCollection', 'Employees');

    //#region Routing

    es.objects.EmployeesCollection.prototype.routes = {
        commit: { method: 'PUT', url: 'EmployeesCollection_Save', response: 'collection' },
        loadAll: { method: 'GET', url: 'EmployeesCollection_LoadAll', response: 'collection', synchronous: true }
    };

    //#endregion
} (window.es));