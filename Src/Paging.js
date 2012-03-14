/*globals es, ko*/

es.PagerFilterCriteria = function () {
    this.column = null;
    this.criteria1 = null;
    this.criteria2 = null;
    this.operation = null;
    this.conjuction = "AND";
};

es.PagerSortCriteria = function () {
    this.column = null;
    this.direction = "ASC";
};

es.PagerRequest = function () {
    this.getTotalRows = true;
    this.totalRows = 0;
    this.pageSize = 20;
    this.pageNumber = 1;

    this.sortCriteria = null;
    this.filterCriteria = null;
};