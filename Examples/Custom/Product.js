
(function (es, myNS) { //myNS = "myNameSpace" ... for example purposes

    if (typeof (es) === undefined) { throw "Please Load EntitySpaces.Core First"; }

    //Use this to define custom properties
    myNS.Product.prototype.customize(function () {

        this.mySpecialProperty = ko.observable('something');
        this.myComputedProperty = ko.dependentObservable(function () {
            return "Test" + "Test2";
        });
    });

    myNS.Product.prototype.loadBySomeSpecialId = function (specialId, success) {

        this.load({
            url: 'Api/Product/Special',
            type: 'POST',
            data: specialId,
            success: success
        });

    };

} (window.es, window.myNS));