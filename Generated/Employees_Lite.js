
(function (es) { //myNS = "myNameSpace" ... for example purposes

    if (typeof (es) === undefined) {
        throw "Please Load EntitySpaces.Core First";
    }

    es.objects.Employees = es.defineEntity(function () {

        this.onPropertyChanged = function (originalValue, proposedValue, propertyName) {
            if (originalValue !== proposedValue) {

                this.ModifiedColumns.push(propertyName);

                if (this.RowState() !== es.RowState.MODIFIED && this.RowState() !== es.RowState.ADDED) {
                    this.RowState(es.RowState.MODIFIED);
                }

                return true;
            } else {
                return false;
            }
        };

        // core columns
        var EmployeeID = 9;
        this.EmployeeID = function () {  };

        var _firstName;
        this.FirstName = function () {
            if (arguments.length === 0) {
                return _firstName;
            } else {

                if (this.onPropertyChanged(_firstName, arguments[0], "FirstName")) {
                    _firstName = arguments[0];
                }
            }
        };

        var _lastName = "";
        this.LastName = function () {
            if (arguments.length === 0) {
                return _lastName;
            } else {

                if (this.onPropertyChanged(_lastName, arguments[0], "LastName")) {
                    _lastName = arguments[0];
                }
            }
        };

        var _title;
        this.Title = function () { if (arguments.length == 0) { return _title } else { _title = arguments[0]; } };

        var _titleOfCourtesy;
        this.TitleOfCourtesy = function () { if (arguments.length == 0) { return _titleOfCourtesy } else { _titleOfCourtesy = arguments[0]; } };

        var _birthDate;
        this.BirthDate = function () { if (arguments.length == 0) { return _birthDate } else { _birthDate = arguments[0]; } };

        var _hireDate;
        this.HireDate = function () { if (arguments.length == 0) { return _hireDate } else { _hireDate = arguments[0]; } };

        var _address;
        this.Address = function () { if (arguments.length == 0) { return _address } else { _address = arguments[0]; } };

        var _city;
        this.City = function () { if (arguments.length == 0) { return _city } else { _city = arguments[0]; } };

        var _region;
        this.Region = function () { if (arguments.length == 0) { return _region } else { _region = arguments[0]; } };

        var _postalCode;
        this.PostalCode = function () { if (arguments.length == 0) { return _postalCode } else { _postalCode = arguments[0]; } };

        var _country;
        this.Country = function () { if (arguments.length == 0) { return _country } else { _country = arguments[0]; } };

        var _homePhone;
        this.HomePhone = function () { if (arguments.length == 0) { return _homePhone } else { _homePhone = arguments[0]; } };

        var _extension;
        this.Extension = function () { if (arguments.length == 0) { return _extension } else { _extension = arguments[0]; } };

        var _photo;
        this.Photo = function () { if (arguments.length == 0) { return _photo } else { _photo = arguments[0]; } };

        var _notes;
        this.Notes = function () { if (arguments.length == 0) { return _notes } else { _notes = arguments[0]; } };

        var _reportsTo;
        this.ReportsTo = function () { if (arguments.length == 0) { return _reportsTo } else { _reportsTo = arguments[0]; } };

        var _photoPath;
        this.PhotoPath = function () { if (arguments.length == 0) { return _photoPath } else { _photoPath = arguments[0]; } };

        // RowState
        var _rowState = 4;
        this.RowState = function () { if (arguments.length == 0) { return _rowState } else { _rowState = arguments[0]; } };

        this.ModifiedColumns = [];

        // extended colulmns
        this.esExtendedData;


        // Hierarchical Properties
        this.EmployeesCollectionByReportsTo;
        this.UpToEmployeesByReportsTo;
        this.UpToTerritoriesCollection;
        this.EmployeeTerritoriesCollectionByEmployeeID;
        this.OrdersCollectionByEmployeeID;

        this.esTypeDefs = {
            EmployeesCollectionByReportsTo: "EmployeesCollection",
            UpToEmployeesByReportsTo: "Employees",
            UpToTerritoriesCollection: "TerritoriesCollection",
            EmployeeTerritoriesCollectionByEmployeeID: "EmployeeTerritoriesCollection",
            OrdersCollectionByEmployeeID: "OrdersCollection"
        };

    });

    //#region Routing

    es.objects.Employees.prototype.routes = {
        commit: { method: 'PUT', url: 'Employees_Save', response: 'entity' },
        loadByPrimaryKey: { method: 'GET', url: 'Employees_LoadByPrimaryKey', response: 'entity' }
    };

    //#endregion
} (window.es, window.myNS));

(function (es) {

	es.objects.EmployeesCollection = es.defineCollection('EmployeesCollection', 'Employees');

	//#region Routing

	es.objects.EmployeesCollection.prototype.routes = {
		commit: { method: 'PUT', url: 'EmployeesCollection_Save', response: 'collection' },
		loadAll: { method: 'GET', url: 'EmployeesCollection_LoadAll', response: 'collection' }
	};

	//#endregion
}(window.es));
