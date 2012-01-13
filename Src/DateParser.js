

es.DateParser = function () {

    // From the Server
    this.deserialize = function (date) {

        var newDate = date;

        //deserialize weird .NET Date strings
        /*
        if (typeof newDate === "string") {
            if (newDate.indexOf('/Date(') === 0) {
                newDate = new Date(parseInt(newDate.substr(6)));
            }
        }
        */

        return newDate;
    };

    // To the Server
    this.serialize = function (date) {
        return date; //.format('yyyy/MM/dd HH:mm:ss');
    };
};