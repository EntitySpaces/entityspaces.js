A Javascript ORM that uses Knockout
============================================

<table border="0">
    <tr>
        <td>
            <a href="http://www.entityspaces.net/developer/Videos/entityspaces_js/entityspaces_js_cool.html" target="new"><img src="http://www.entityspaces.net/downloads/video.png"></a>
        </td>
        <td>
            Watch a video of entityspaces.js in action
        </td>
    </tr>
</table>

There's Still Time to Enroll in the Early Adopter Program
===============================================================
First, if you don't already own EntitySpaces, an extended full featured trial version will be provided to your team if you are accepted into the early adopter program. Of course, existing customers are welcome too. 

The entityspaces.js JavaScript library provides an excellent way to write HTML/JavaScript applications using the familiar MVVM model while leveraging EntitySpaces as the data source serving up your entities in JSON format. Our early adopters program will provide participants with free licenses for EntitySpaces once they go "live". Each company accepted to participate in the early adopter program will receive: 

Up to Five EntitySpaces Studio Licenses depending on your team size. <BR>
Up to Five EnititySpaces Profiler Licenses depending on your team size. <BR>
<b>That's a potential value of $1,992.00 dollars</b>. Those are not trial version but real production versions. <BR>

We are looking for medium to large companies, if you are interested send an email to support@entityspaces.net with "Early Adopter" in the subject line with information about your company and how you would use entityspaces.js.


The entityspaces.js syntax
============================================

Below is an example of real working code for the entityspaces.js and is the same code demonstrated in the video above. These code samples use our XMLHttpRequestProvider but we also provide an JQuery based AjaxProvider for restful API's.

**Loading and Saving, Hierarchical Data, using Synchronous calls**

````javascript

    // Load an employee with hierarchical model and save hierarchical data back to the server
    var emp = new es.objects.Employees();
    emp.loadByPrimaryKey(2);

    emp.FirstName("This");
    emp.OrdersCollectionByEmployeeID()[0].ShipCity(Math.random().toString().substr(0, 4));
    emp.save();

    // Collection load/save
    var coll = new es.objects.EmployeesCollection();
    coll.loadAll();

    coll()[0].FirstName("Rocks!!");
    coll.save();
````

**Adding New Records**

````javascript

    // Add a single record
    var emp = new es.objects.Employees();
    emp.FirstName("Just");
    emp.LastName("Added");
    emp.save();

    // It's an autoincrement column and we get it back
    var employeeId = emp.EmployeeID();

    // Add two new employees through a collection
    var coll = new es.objects.EmployeesCollection();

    emp = new es.objects.Employees();
    emp.FirstName("Just1");
    emp.LastName("Added1");
    coll.push(emp);

    emp = new es.objects.Employees();
    emp.FirstName("Just2");
    emp.LastName("Added2");
    coll.push(emp);

    coll.save();

    // Check to make sure we got our autoincrement primary keys
    var employeeId_1 = coll()[0].EmployeeID();
    var employeeId_2 = coll()[1].EmployeeID();
````

**Deleting Records**

````javascript

    // Add a single record
    var emp = new es.objects.Employees();
    emp.FirstName("Just");
    emp.LastName("Added");
    emp.save();

    var employeeId = emp.EmployeeID();

    // Reload the new record and delete it
    emp = new es.objects.Employees();
    emp.loadByPrimaryKey(employeeId);
    emp.markAsDeleted();
    emp.save();

    // Can we reload the deleted record
    emp = new es.objects.Employees();
    var loaded = emp.loadByPrimaryKey(employeeId);

    // The employeeId = undefined
    employeeId = emp.EmployeeID();
````

**Asychronous and or Synchronous methods**

While this sample might not makes sense asynchronously it does show that you can use the API in any fashion you desire.

````javascript

    //----------------------------------------------------------
    // Here is a code snippet using the synchronous approach
    //----------------------------------------------------------
    var emp = new es.objects.Employees();
    emp.loadByPrimaryKey(2);
    emp.FirstName("sync" + "!!!");
    emp.save();

    var coll = new es.objects.EmployeesCollection();
    coll.loadAll();

    coll()[0].FirstName("Rocks!!");
    coll.save();

    //-----------------------------------------------------------------
    // Here is the same code from above using the asynchronous approach
    //-----------------------------------------------------------------
    var emp = new es.objects.Employees();
    emp.loadByPrimaryKey(2, function (data) {

        emp.FirstName("sync" + "!!!");

        emp.save(function (data) {

            var coll = new es.objects.EmployeesCollection();

            coll.loadAll(function (data) {

                coll()[0].FirstName("Rocks!!");

                coll.save(function (data) {

                    var str = "Save is complete ...";
                });
            });
        });
    });
````
**Passing in a 'state' to the Async methods**

This example shows you how to pass 'state' back to yourself in the async methods, state can be any value, including an object.

````javascript

    var emp1 = new es.objects.Employees();
    emp.loadByPrimaryKey({ 
        employeeId: 2, 
        success: function (data, state) {
            var myState = state;
            console.log(myState); // 'SomeValue'
        }, 
        error: function (status, responsText, state) {
            var myState = state;
            console.log(myState); // 'SomeValue'
        }, 
        state: 'SomeValue' 
    });
````

The "Generated" entityspaces.js Entity and Collection
======================================================
This can be generated for you by EntitySpaces Studio. This is what we call the "Generated" class. Later down the page we show a custom class where we extend this class in another file, this way we can regenerate whenver our database schema changes and you don't have to worry about losing custom changes.

````javascript

// *************************************************************************
// Generated by an EntitySpaces Tempate from the Northwind.Employees Table
// *************************************************************************

(function (es) { //myNS = "myNameSpace" ... for example purposes

    if (typeof (es) === undefined) {
        throw "Please Load EntitySpaces.Core First";
    }

    es.objects.Employees = es.defineEntity(function () {

        // core columns
        this.EmployeeID = ko.observable();
        this.LastName = ko.observable();
        this.FirstName = ko.observable();
        this.Title = ko.observable();
        this.TitleOfCourtesy = ko.observable();
        this.BirthDate = ko.observable();
        this.HireDate = ko.observable();
        this.Address = ko.observable();
        this.City = ko.observable();
        this.Region = ko.observable();
        this.PostalCode = ko.observable();
        this.Country = ko.observable();
        this.HomePhone = ko.observable();
        this.Extension = ko.observable();
        this.Photo = ko.observable();
        this.Notes = ko.observable();
        this.ReportsTo = ko.observable();
        this.PhotoPath = ko.observable();

        // extended colulmns
        this.esExtendedData = undefined;


        // Hierarchical Properties
        this.EmployeesCollectionByReportsTo = undefined;
        this.UpToEmployeesByReportsTo = undefined;
        this.UpToTerritoriesCollection = undefined;
        this.EmployeeTerritoriesCollectionByEmployeeID = undefined;
        this.OrdersCollectionByEmployeeID = undefined;

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

}(window.es, window.myNS));

(function (es) {

    es.objects.EmployeesCollection = es.defineCollection('EmployeesCollection', 'Employees');

    //#region Routing

    es.objects.EmployeesCollection.prototype.routes = {
        commit: { method: 'PUT', url: 'EmployeesCollection_Save', response: 'collection' },
        loadAll: { method: 'GET', url: 'EmployeesCollection_LoadAll', response: 'collection' }
    };

    //#endregion

}(window.es));
````

A "Custom" entityspaces.js Entity class
====================================================
The custom class contains custom methods and properties. The methods are added via the JavaScript "prototype" syntax. Add any of your custom properties in the "customize" method which is called for you automatically when you instantiate a class.

````javascript

// Custom method
es.objects.Employees.prototype.LoadByPrimaryKeyHierarchical = 
    function (employeeId, success, error, state) {

    this.load({
        route: this.routes['LoadByPrimaryKeyHierarchical'],
        data: employeeId,
        success: success,
        error: error,
        state: state
    });
};

// Custom Properties go in the "customize" method which is called for you automatically
es.objects.Employees.prototype.customize(function () {

    // You can add any number of extra properties of any type in here
    this.FullName = ko.computed(function () {
        return this.LastName() + ", " + this.FirstName();
    }, this);

});

//#region Routing
es.objects.Employees.prototype.routes['LoadByPrimaryKeyHierarchical'] = 
    { method: 'GET', url: 'Employees_LoadByPrimaryKeyHierarchical', response: 'entity' }
//#endregion
````