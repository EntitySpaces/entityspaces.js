Purpose of entityspaces.js
==================================

This is an example of real working code for the EntitySpaces Knockout/Javascript ORM

* **A simple button click to kick off our javascript method**

<code>
<html>
    <body>
        <button onclick="doIt()" />DoIt</button>
    </body>
</html>
<code>

* **The entityspaces.js syntax **

<pre>
<script language="javascript" type="text/javascript">

    es.dataProvider = new es.XMLHttpRequestProvider();
    es.dataProvider.baseURL = "http://www.entityspaces.net/Knockout/Part1/esService/esJson.svc/";

    doIt = function () {

        var emp = new es.objects.Employees();
        emp.loadByPrimaryKey(2);

        emp.FirstName("This");

        emp.save();

        var coll = new es.objects.EmployeesCollection();
        coll.loadAll();

        coll()[0].FirstName("Rocks!!");

        coll.save();
    }

</script>

</pre>