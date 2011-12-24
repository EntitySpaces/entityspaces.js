/* File Created: December 23, 2011 */

es.XMLHttpRequestProvider = function () {

    var noop = function () { };
    this.baseURL = "http://localhost";

    this.execute = function (options) {

        var theData = null,
            path = null,
            xmlHttp,
            origSuccess = options.success || noop,
            origError = options.error || noop;


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
        path = this.baseURL + options.url;

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

        if (options.route.response !== undefined) {

            switch (options.route.response) {
                case 'entity':
                    return origSuccess(theData[options.route.response]);

                case 'collection':
                    return origSuccess(theData[options.route.response]);
            }

        } else {
            return theData;
        }
    };
};

// es.dataProvider = new es.XMLHttpRequestProvider(); //assign default data provider