License
============================================
License: MIT [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)

A Javascript ORM (Data Access) Framework that uses Knockout
===========================================================

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

The entityspaces.js classes
============================================

The Single Entity Class (pseudocode)

````javascript

es.EsEntity = function () {

	// Public Methods
	acceptChanges();    // rarely used
	rejectChanges();    // rollback any changes
	applyDefaults();    // override to assign defaults to columns
	customize();        // override to add extra columns to your entity
	isDirty();          // does this entity have changes
	isDirtyGraph();     // does this entire object graph have changes
	loadByPrimaryKey(); // load this entity by the primary key
	markAsDeleted();    // mark this entity as deleted
	save();             // save this entity

	// Protected Methods
	load();             // called by your custom load methods
	populateEntity();   // load by passing in data (not recommended)

	// Properties
	RowState();         // es.RowState.ADDED/DELETED/MODIFIED/UNCHANGED
	ModifiedColumns[];  // contains the columns that are dirty
};
````

The Collection Class (pseudocode)

````javascript

es.EsEntityCollection = function () {

	// Public Methods
	acceptChanges();      // rarely used
	addNew();             // adds a new entity and returns it
	rejectChanges();      // rollback any changes
	applyDefaults();      // override to assign defaults to columns
	isDirty();            // does this entity have changes
	isDirtyGraph();       // does this entire object graph have changes
	loadAll();            // loads all records from the associate table
	markAllAsDeleted();   // marks all entities in the collection as deleted
	save();               // save this entity (and the entire graph)

	// Protected Methods
	load();               // called by your custom load methods
	populateCollection(); // load by passing in data (not recommended)
};
````

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

    emp = coll.addNew();
    emp.FirstName("Just1");
    emp.LastName("Added1");
    coll.push(emp);

    emp = coll.addNew();
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

//===============================================================================		
// EntitySpaces Version : 2012.1.0000.0
// Date Generated       : 1/15/2012 8:03:31 PM
//===============================================================================

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

		// extended columns
		this.esExtendedData = undefined;

		// Hierarchical Properties
		this.EmployeesCollectionByReportsTo = undefined;
		this.UpToEmployeesByReportsTo = undefined;
		this.UpToTerritoriesCollection = undefined;
		this.EmployeeTerritoriesCollectionByEmployeeID = undefined;
		this.OrdersCollectionByEmployeeID = undefined;
	});

	//#region Prototype Level Information

	es.objects.Employees.prototype.esTypeDefs = {
		EmployeesCollectionByReportsTo: "EmployeesCollection",
		UpToEmployeesByReportsTo: "Employees",
		UpToTerritoriesCollection: "TerritoriesCollection",
		EmployeeTerritoriesCollectionByEmployeeID: "EmployeeTerritoriesCollection",
		OrdersCollectionByEmployeeID: "OrdersCollection"
	};
	
	es.objects.Employees.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'Employees_Save', response: 'entity' },
		loadByPrimaryKey: { method: 'GET', url: 'Employees_LoadByPrimaryKey', response: 'entity' }
	};

	es.objects.Employees.prototype.esColumnMap = {
		'EmployeeID': 1,
		'LastName': 1,
		'FirstName': 1,
		'Title': 1,
		'TitleOfCourtesy': 1,
		'BirthDate': 1,
		'HireDate': 1,
		'Address': 1,
		'City': 1,
		'Region': 1,
		'PostalCode': 1,
		'Country': 1,
		'HomePhone': 1,
		'Extension': 1,
		'Photo': 1,
		'Notes': 1,
		'ReportsTo': 1,
		'PhotoPath': 1
	};

	//#endregion

}(window.es, window.myNS));

(function (es) {

	es.objects.EmployeesCollection = es.defineCollection('EmployeesCollection', 'Employees');

	//#region Prototype Level Information

	es.objects.EmployeesCollection.prototype.esRoutes = {
		commit: { method: 'PUT', url: 'EmployeesCollection_Save', response: 'collection' },
		loadAll: { method: 'GET', url: 'EmployeesCollection_LoadAll', response: 'collection' }
	};

	//#endregion

}(window.es, window.myNS));

````

A "Custom" entityspaces.js Entity class
====================================================
The custom class contains custom methods and properties. The methods are added via the JavaScript "prototype" syntax. Add any of your custom properties in the "customize" method which is called for you automatically when you instantiate a class.

````javascript

// Custom method
es.objects.Employees.prototype.LoadByPrimaryKeyHierarchical = 
    function (employeeId, success, error, state) {

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
````