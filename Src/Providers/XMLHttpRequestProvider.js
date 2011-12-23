/* File Created: December 23, 2011 */

es.XMLHttpRequestProvider = function () {

    this.baseURL = "http://localhost";

    this.execute = function (options) {

        var theData = null, path = null, xmlHttp;

        // Create HTTP request
        try {
            xmlHttp = new XMLHttpRequest();
        } catch (e1) {
            try {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e2) {
                try {
                    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e3) {
                    alert("This sample only works in browsers with AJAX support");
                    return false;
                }
            }
        }

        // Build the operation URL
        path = this.baseURL + options.route.url;

        // Make the HTTP request
        xmlHttp.open("POST", path, options.synchronous || false);
        xmlHttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xmlHttp.send(ko.toJSON(options.data));

        if (xmlHttp.status === 200) {
            if (xmlHttp.responseText !== '{}' && xmlHttp.responseText !== "") {
                theData = JSON.parse(xmlHttp.responseText);
            }
        } else {
            var error = true;
            //es.makeRequstError = xmlHttp.responseText;
        }

        return theData;
    };
};


es.dataProvider = new es.XMLHttpRequestProvider(); //assign default data provider