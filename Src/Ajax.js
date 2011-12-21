/// <reference path="../Libs/jquery-1.7.1.js" />
/// <reference path="../Libs/json2.js" />

//set this up so we match jQuery's api style... if we want to rip it out later, we can...
var ajax = {

    executeRequest: function (options) {
        var noop = function () { },
            success = options.success || noop,
            error = options.error || noop,
            defaults = {
                cache: false,
                accepts: 'application/json; charset=utf-8;',
                contentType: 'application/json; charset=utf-8;',
                dataType: 'json',
                type: 'GET'
            };

        //extend the defaults with our options
        options = $.extend(defaults, options);

        // override the passed in successHandler so we can add global processing if needed
        options.success = function (data) {
            success(data);
        };

        // override the passed in errorHandler so we can add global processing if needed
        options.error = function (jqXHR, textStatus, errorThrown) {
            error(jqXHR, textStatus, errorThrown);
        };

        //parameterize the Url
        options.url = ajax.parameterizeUrl(options.url, options.data);

        $.ajax(options);
    },

    parameterizeUrl: function (url, data) {
        var rurlDataExpr = /\{([^\}]+)\}/g;
        var newUrl;

        if (typeof data === "string") {
            return;
        }

        //thanks AmplifyJS for this little tidbit
        // url = "/Product/{id}" => "/Product/57966910-C5EF-400A-8FC4-615159D95C2D
        newUrl = url.replace(rurlDataExpr, function (m, key) {
            if (key in data) {
                return ko.utils.unwrapObservable(data[key]);
            }
        });

        return newUrl;
    }
};

es.ajax = ajax;