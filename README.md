#A Javascript (ORM) Data Access Framework that uses Knockout#

By: [EntitySpaces, LLC] (http://www.entityspaces.net)

License: [MIT](http://www.opensource.org/licenses/mit-license.php)

Dependencies: Knockout

##Live Example##
* [Fully Editable Example] (http://www.entityspaces.net/entityspaces.js/examples/entityspaces/FullExample.htm)

##Features##
* Supports WCF JSON Service and RESTFUL API's
* Supports Full Hierarchical Data Models
* Two Providers, either pure XHR or JQuery Ajax (you choose which one you want to use)
* Tracks Row Level and Column Level Dirty State
* Tracks Original Values so Edits can be Cancelled via RejectChanges
* Generic - Can be used with any ORM or Database Backend

##Intuitive API##
```javascript

    // Add a single record
    var emp = new es.objects.Employees();
    emp.FirstName("Just");
    emp.LastName("Added");
    emp.save();
```

##EntitySpaces Studio Specific Abilities##
* Will Generate your entire set of JavaScript class from your Database Schema
* Will Generate your WCF JSON Service for you that will work Out-Of-The-Box 
* Supports MS SQL Server, Azure, CE, MS Access, Oracle, PostgreSQL, Sybase SQL Anywhere, MySQL, SQLite, VistaDB

##Watch a video of entityspaces.js in action##
<table border="0">
    <tr>
        <td>
            <a href="http://www.entityspaces.net/developer/Videos/entityspaces_js/entityspaces_js_cool.html" target="new"><img src="http://www.entityspaces.net/downloads/video.png" border="0"></a>
        </td>
    </tr>
</table>

##Example Class Definitions (pseudocode)##
* [Single Entity Class] (https://github.com/EntitySpaces/entityspaces.js/wiki/Single-Entity-Class-Definition)
* [Collection Class] (https://github.com/EntitySpaces/entityspaces.js/wiki/Collection-Entity-Class-Definition)

##Real JavaScript Classes##
* [Employees Generated Class (created by EntitySpaces Studio)] (https://github.com/EntitySpaces/entityspaces.js/wiki/Our-Employee-Generated-Class)
* [Employees Collection] (https://github.com/EntitySpaces/entityspaces.js/wiki/Our-Employee-Custom-Class)

##Real World Usage Examples##
* [Adding and Saving New Records] (https://github.com/EntitySpaces/entityspaces.js/wiki/Adding-New-Records)
* [Deleting Records] (https://github.com/EntitySpaces/entityspaces.js/wiki/Deleting-Records)
* [Loading and Saving Hierarchical Data] (https://github.com/EntitySpaces/entityspaces.js/wiki/Loading-and-Saving-Hierarchical-Data)
* [Asychronous and or Synchronous methods] (https://github.com/EntitySpaces/entityspaces.js/wiki/Asychronous-and-or-Synchronous-methods)
* [Passing in 'state' to the Async methods] (https://github.com/EntitySpaces/entityspaces.js/wiki/Passing-in-'state'-to-the-Async-methods)