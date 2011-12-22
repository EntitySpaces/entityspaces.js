/// <reference path="../Libs/jquery-1.7.1.js" />
/// <reference path="../Libs/json2.js" />

//set this up so we match jQuery's api style... if we want to rip it out later, we can...
var ajaxProvider = (function () {
    var noop = function () { },
        parameterizeUrl = function (url, data) {
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
        };

    return {
        execute: function (options) {

            var origSuccess = options.success || noop,
                origError = options.error || noop,
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
                origSuccess(data);
            };

            // override the passed in errorHandler so we can add global processing if needed
            options.error = function (jqXHR, textStatus, errorThrown) {
                origError(jqXHR, textStatus, errorThrown);
                es.onError({ code: textStatus, message: errorThrown });
            };

            //parameterize the Url
            options.url = parameterizeUrl(options.url, options.data);

            $.ajax(options);
        }
    };
} ());
    

es.dataProvider = ajaxProvider; //assign default data provider