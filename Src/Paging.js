/*globals es, ko*/

es.PagerFilterCriteria = function() {
    this.column;
    this.criteria1;
    this.criteria2;
    this.operation;
    this.conjuction;
};

es.PagerSortCriteria = function() {
    this.column;
    this.direction;
};

es.PagerRequest = function () {
    this.initialRequest = 1;
    this.totalRows = 0;
    this.pageSize = 20;
    this.pageNumber = 1;
    this.conjuction = "AND";

    this.sortCriteria;
    this.filterCriteria;
};