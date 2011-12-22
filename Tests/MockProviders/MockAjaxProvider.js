
//override the standard Ajax Provider
//all you need to do is overwrite the 'execute' function in your test!
es.testDataProvider = {

    execute: function (options) {

    }

};

es.dataProvider = es.testDataProvider;

