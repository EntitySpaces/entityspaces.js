
(function (es, myNS) { //myNS = "myNameSpace" ... for example purposes

    if (typeof (es) === undefined) { throw "Please Load EntitySpaces.Core First"; }

    // Custom method
    es.objects.Employees.prototype.LoadByPrimaryKeyHierarchical = function (employeeId, success) {

        this.load({
            route: this.routes['LoadByPrimaryKeyHierarchical'],
            data: employeeId,
            success: success
        });
    };

    //#region Routing
    es.objects.Employees.prototype.routes['LoadByPrimaryKeyHierarchical'] = { method: 'GET', url: 'Employees_LoadByPrimaryKeyHierarchical', response: 'entity'}
    //#endregion

} (window.es, window.myNS));
