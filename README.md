A Knockout/Javascript ORM
============================================


**Watch a Video of entityspaces.js in action**

[Video ...](http://www.entityspaces.net/developer/Videos/entityspaces_js/entityspaces.html)


The entityspaces.js syntax
============================================

Below is an example of real working code for the entityspaces.js and is the same code demonstrated in the video above.

**Loading and Saving, Hierarchical Data, using Synchronous calls**

````javascript
<script language="javascript" type="text/javascript">

    es.dataProvider = new es.XMLHttpRequestProvider();
    es.dataProvider.baseURL = "http://www.entityspaces.net/Knockout/Part1/esService/esJson.svc/";

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

</script>
````

**Adding New Records**

````javascript
<script language="javascript" type="text/javascript">

    es.dataProvider = new es.XMLHttpRequestProvider();
    es.dataProvider.baseURL = "http://www.entityspaces.net/Knockout/Part1/esService/esJson.svc/";

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

</script>
````

**Deleting Records**

````javascript
<script language="javascript" type="text/javascript">

    es.dataProvider = new es.XMLHttpRequestProvider();
    es.dataProvider.baseURL = "http://www.entityspaces.net/Knockout/Part1/esService/esJson.svc/";

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

</script>
````

**Using Asychronous methods**

````javascript
<script language="javascript" type="text/javascript">

    es.dataProvider = new es.XMLHttpRequestProvider();
    es.dataProvider.baseURL = "http://www.entityspaces.net/Knockout/Part1/esService/esJson.svc/";

	// NOTE: ALL LOADING AND SAVING CALLS CAN BE MADE ASYNCHRONOUSLY

    var emp = new es.objects.Employees();
    emp.loadByPrimaryKey(2, function (data) {
        emp.FirstName("sync" + "!!!");
		emp.save();
    });

    var coll = new es.objects.EmployeesCollection();
    coll.loadAll();

    coll()[0].FirstName("Rocks!!");

    coll.save(function (data) {
        // It was saved
        var qq = 0;
    });

</script>
````

