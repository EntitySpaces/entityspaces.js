A Knockout/Javascript ORM
============================================


This is an example of real working code for the entityspaces.js


* **A simple button click to kick off our javascript method**


````html
<html>
    <body>
        <button onclick="doIt()" />DoIt</button>
    </body>
</html>
````


* **The entityspaces.js syntax**


````javascript
<script language="javascript" type="text/javascript">

    es.dataProvider = new es.XMLHttpRequestProvider();
    es.dataProvider.baseURL = "http://www.entityspaces.net/Knockout/Part1/esService/esJson.svc/";

    doIt = function () {

        // Single Employee load/save
        var emp = new es.objects.Employees();
        emp.loadByPrimaryKey(2);

        emp.FirstName("This");
        emp.save();

        // Collection load/save
        var coll = new es.objects.EmployeesCollection();
        coll.loadAll();

        coll()[0].FirstName("Rocks!!");
        coll.save();
    }

</script>
````