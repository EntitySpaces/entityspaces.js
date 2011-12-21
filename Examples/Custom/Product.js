
(function (es, myNS) { //myNS = "myNameSpace" ... for example purposes

    if (typeof (es) === undefined) { throw "Please Load EntitySpaces.Core First"; }

    myNS.Product.prototype.extend(function () {

        this.mySpecialProperty = ko.observable('something');


        this.myMethod = function (something) {
            return something + 2;
        };
    });
    
} (window.es, window.myNS));