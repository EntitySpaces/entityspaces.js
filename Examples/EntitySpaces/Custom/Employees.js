// Custom method
es.objects.Employees.prototype.LoadByPrimaryKeyHierarchical = function (employeeId, success, error, state) {

    this.load({
        route: this.esRoutes['LoadByPrimaryKeyHierarchical'],
        data: employeeId,
        success: success,
        error: error,
        state: state
    });
};

// Custom Properties goes in the "customize" method and this is called for you automatically
es.objects.Employees.prototype.customize(function () {

    // You can add any number of extra properties of any type in here
    this.FullName = ko.computed(function () {
        return this.LastName() + ", " + this.FirstName();
    }, this);

});

//#region Routing
es.objects.Employees.prototype.esRoutes['LoadByPrimaryKeyHierarchical'] = 
    { method: 'GET', url: 'Employees_LoadByPrimaryKeyHierarchical', response: 'entity' }
//#endregion 
