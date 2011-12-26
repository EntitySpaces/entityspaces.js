/* File Created: December 23, 2011 */

es.XMLHttpRequestProvider = function () {

    var createRequest, executeCompleted, noop = function () { };
    this.baseURL = "http://localhost";

    createRequest = function () {

        var xmlHttp;

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

        return xmlHttp;
    };

    executeCompleted = function (responseText, route) {

        var theData = JSON.parse(responseText);

        if (route.response !== undefined) {
            switch (route.response) {
                case 'entity':
                    return theData[route.response];
                case 'collection':
                    return theData[route.response];
            }
        }

        return theData;
    };

    // Called by the entityspaces.js framework when working with entities
    this.execute = function (options) {

        var path = null, xmlHttp, success, failure;

        success = options.success || noop;
        failure = options.error || noop;

        // Create HTTP request
        xmlHttp = createRequest();

        // Build the operation URL
        path = this.baseURL + options.url;

        // Make the HTTP request
        xmlHttp.open("POST", path, options.synchronous || false);
        xmlHttp.setRequestHeader("Content-type", "application/json; charset=utf-8");

        if (options.async === true) {
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4) {
                    if (xmlHttp.status === 200) {
                        success(executeCompleted(xmlHttp.responseText, options.route));
                    } else {
                        failure(xmlHttp.status, xmlHttp.statusText);
                    }
                }
            };
        }

        xmlHttp.send(ko.toJSON(options.data));

        if (options.async === false) {
            if (xmlHttp.status === 200) {
                if (xmlHttp.responseText !== '{}' && xmlHttp.responseText !== "") {
                    success(executeCompleted(xmlHttp.responseText, options.route));
                }
            }
        }
    };

    // So developers can make their own requests, synchronous or aynchronous
    this.makeRequest = function (url, methodName, params, successCallback, failureCallback) {

        var theData = null, path = null, async = false, xmlHttp, success, failure;

        if (successCallback !== undefined || failureCallback !== undefined) {
            async = true;
            success = successCallback || noop;
            failure = failureCallback || noop;
        }

        // Create HTTP request
        xmlHttp = createRequest();

        // Build the operation URL
        path = url + methodName;

        // Make the HTTP request
        xmlHttp.open("POST", path, async);
        xmlHttp.setRequestHeader("Content-type", "application/json; charset=utf-8");

        if (async === true) {
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4) {
                    if (xmlHttp.status === 200) {
                        success(JSON.parse(xmlHttp.responseText));
                    } else {
                        failure(xmlHttp.status, xmlHttp.statusText);
                    }
                }
            };
        }

        xmlHttp.send(params);

        if (async === false) {
            if (xmlHttp.status === 200) {
                if (xmlHttp.responseText !== '{}' && xmlHttp.responseText !== "") {
                    theData = JSON.parse(xmlHttp.responseText);
                }
            } else {
                es.makeRequstError = xmlHttp.statusText;
            }
        }

        return theData;
    };
};

// es.dataProvider = new es.XMLHttpRequestProvider(); //assign default data provider