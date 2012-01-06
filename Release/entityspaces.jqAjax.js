(function (l, h) {
    l.es = {}; es.exportSymbol = function (a, c) { for (var b = a.split("."), d = l, e = 0; e < b.length - 1; e++) d = d[b[e]]; d[b[b.length - 1]] = c }; var m = l.esConfig || {}, m = function (a, c) { var b; if (a && c) { for (b in c) a[b] = c[b]; return a } } (m, { namespace: "es.objects" }); (function () { for (var a = m.namespace.split("."), c = l, b = 0; b < a.length; b++) c[a[b]] === h && (c[a[b]] = {}), c = c[a[b]]; es.generatedNamespace = c })(); es.getGeneratedNamespaceObj = function () { return es.generatedNamespace }; es.exportSymbol("es", es); es.RowState = { INVALID: 0, UNCHANGED: 2,
        ADDED: 4, DELETED: 8, MODIFIED: 16
    }; es.exportSymbol("es.RowState", es.RowState); es.getType = function (a) { return es.getGeneratedNamespaceObj()[a] }; es.clearTypes = function () { es.generatedNamespace = {} }; es.onError = ko.observable({}); es.onError.subscribe(function (a) { throw JSON.stringify(a); }); es.isArray = function (a) { return !a ? !1 : a.isArray || "[object Array]" === Object.prototype.toString.call(a) }; es.objectKeys = Object.keys || function (a) { var c = [], b; for (b in a) c.push(b); return c }; es.isEsCollection = function (a) {
        var c = !1; es.isArray(a) &&
0 < a.length && a[0].hasOwnProperty("RowState") && (c = !0); return c
    }; es.exportSymbol("es.isEsCollection", es.isEsCollection); var i = { copyDataIntoEntity: function (a, c) { var b; if (a && c) { for (b in a) if (c.hasOwnProperty(b)) if (ko.isObservable(a[b])) a[b](c[b]); else a[b] = c[b]; return a } }, extend: function (a, c) { var b; if (a && c) { for (b in c) a[b] = c[b]; return a } }, addPropertyChangedHandlers: function (a, c) {
        var b = a[c]; ko.isObservable(b) && !(b instanceof Array) && b.subscribe(function () {
            !1 === a.ignorePropertyChanged && -1 === ko.utils.arrayIndexOf(a.ModifiedColumns(),
c) && "RowState" !== c && (a.ModifiedColumns.push(c), a.RowState() !== es.RowState.MODIFIED && a.RowState() !== es.RowState.ADDED && a.RowState(es.RowState.MODIFIED))
        })
    }, startTracking: function (a) {
        var c; if (a.hasOwnProperty("RowState")) { if (!ko.isObservable(a.RowState)) a.RowState = ko.observable(a.RowState) } else a.RowState = ko.observable(es.RowState.ADDED); a.hasOwnProperty("ModifiedColumns"); a.ModifiedColumns = ko.observableArray(); for (c in a) if ("RowState" !== c && "ModifiedColumns" !== c && "__type" !== c && "esExtendedData" !== c) {
            var b =
a[c]; b instanceof Array || a.hasOwnProperty(c) && ko.isObservable(b) && i.addPropertyChangedHandlers(a, c)
        } return a
    }, expandExtraColumns: function (a, c) { var b, d, e = c || !1; if (a.esExtendedData && es.isArray(a.esExtendedData)) { b = ko.isObservable(a.esExtendedData) ? a.esExtendedData() : a.esExtendedData; for (d = 0; d < b.length; d++) a[b[d].Key] = e ? ko.observable(b[d].Value) : b[d].Value; delete a.esExtendedData } if (b !== h) { a.esExtendedData = []; for (d = 0; d < b.length; d++) a.esExtendedData.push(ko.isObservable(b[d].Key) ? b[d].Key() : b[d].Key) } return a },
        removeExtraColumns: function (a) { var c, b; if (a.esExtendedData && es.isArray(a.esExtendedData)) { b = ko.isObservable(a.esExtendedData) ? a.esExtendedData() : a.esExtendedData; for (c = 0; c < b.length; c++) delete a[b[c]]; delete a.esExtendedData } return a }, shallowCopy: function (a) {
            if ("object" === typeof a && null !== a) {
                var c; if (es.isArray(a)) c = []; else if (a instanceof Date) c = new Date(a); else if (a instanceof Boolean) c = new Boolean(a); else if (a instanceof Number) c = new Number(a); else if (a instanceof String) c = new String(a); else if (Object.create &&
Object.getPrototypeOf) c = Object.create(Object.getPrototypeOf(a)); else if (a.__proto__ || a.constructor.prototype) { var b = a.__proto__ || a.constructor.prototype || {}, d = function () { }; d.prototype = b; c = new d; if (!c.__proto__) c.__proto__ = b } ko.utils.arrayForEach(es.objectKeys(a), function (b) { if (!es.isEsCollection(a[b])) switch (b) { case "___esEntity___": case "esTypeDefs": case "routes": case "ignorePropertyChanged": break; default: c[b] = a[b] } }); return c
            } return a
        }, getDirtyGraph: function (a) {
            var c, b, d, e = [], g = null; es.Visit(a).forEach(function (a) {
                if ("esExtendedData" ===
this.key) this.block(); else if (!1 === this.isLeaf) { if (a instanceof Array) return a; if (a.hasOwnProperty("RowState")) switch (a.RowState) { case es.RowState.ADDED: case es.RowState.DELETED: case es.RowState.MODIFIED: e.push(this.path) } } return a
            }); if (0 < e.length) {
                g = d = es.isArray(a) ? [] : i.shallowCopy(i.removeExtraColumns(a)); for (c = 0; c < e.length; c++) {
                    var j = e[c], n = a; d = g; for (b = 0; b < j.length; b++) d.hasOwnProperty(j[b]) ? d = d[j[b]] : es.isArray(n[j[b]]) && (d[j[b]] = [], d = d[j[b]]), n = n[j[b]]; n = i.removeExtraColumns(n); es.isArray(d) ?
d.push(i.shallowCopy(n)) : d = i.shallowCopy(n)
                } 
            } return g
        } 
    }; i.newId = function () { var a = (new Date).getTime(); return function () { return ++a } } (); es.utils = i; es.exportSymbol("es.extend", es.extend); es.exportSymbol("es.startTracking", es.startTracking); es.exportSymbol("es.getDirtyGraph", es.getDirtyGraph); es.Visit = function (a) { if (!(this instanceof es.Visit)) return new es.Visit(a); this.value = a }; es.Visit.prototype.forEach = function (a) { return this.value = r(this.value, a, !1) }; var r = function (a, c, b) {
        var d = [], e = [], g = !0, j = function (a,
b) { if (a.forEach) return a.forEach(b); for (var c = 0; c < a.length; c++) b(a[c], c, a) }; return function q(a) {
    var k = b ? copy(a) : a, i, l, m, p, o = !0, f = { node: k, node_: a, path: [].concat(d), parent: e[e.length - 1], parents: e, key: d.slice(-1)[0], isRoot: 0 === d.length, level: d.length, circular: null, update: function (a, b) { f.isRoot || (f.parent.node[f.key] = a); f.node = a; b && (o = !1) }, "delete": function (a) { delete f.parent.node[f.key]; a && (o = !1) }, remove: function (a) {
        es.isArray(f.parent.node) ? f.parent.node.splice(f.key, 1) : delete f.parent.node[f.key];
        a && (o = !1)
    }, keys: null, before: function (a) { i = a }, after: function (a) { l = a }, pre: function (a) { m = a }, post: function (a) { p = a }, stop: function () { g = !1 }, block: function () { o = !1 } 
    }; if (!g) return f; if ("object" === typeof k && null !== k) { f.keys = es.objectKeys(k); f.isLeaf = 0 === f.keys.length; for (k = 0; k < e.length; k++) if (e[k].node_ === a) { f.circular = e[k]; break } } else f.isLeaf = !0; f.notLeaf = !f.isLeaf; f.notRoot = !f.isRoot; a = c.call(f, f.node); a !== h && f.update && f.update(a); i && i.call(f, f.node); if (!o) return f; "object" === typeof f.node && null !== f.node &&
!f.circular && (e.push(f), j(f.keys, function (a, c) { d.push(a); m && m.call(f, f.node[a], a); var e = q(f.node[a]); if (b && Object.hasOwnProperty.call(f.node, a)) f.node[a] = e.node; e.isLast = c == f.keys.length - 1; e.isFirst = 0 == c; p && p.call(f, e); d.pop() }), e.pop()); l && l.call(f, f.node); return f
} (a).node
    }; es.EsEntity = function () {
        var a, c = []; this.ignorePropertyChanged = !1; this.routes = {}; this.customize = function (a) { c.push(a); return this }; this.init = function () {
            a = this; a.___esEntity___ = es.utils.newId(); ko.utils.arrayForEach(c, function (b) {
                b &&
b.call(a)
            }); es.utils.startTracking(a)
        }; this.populateEntity = function (b) {
            var c, e, g; a.ignorePropertyChanged = !0; try { for (c in es.utils.copyDataIntoEntity(a, b), es.utils.expandExtraColumns(a, !0), b) b.hasOwnProperty(c) && this.esTypeDefs && this.esTypeDefs[c] && ((e = es.getType(this.esTypeDefs[c])) ? (g = new e, g.hasOwnProperty("___esCollection___") ? g.populateCollection(b[c]) : g.populateEntity(b[c]), this[c] = g) : es.isArray(b[c]) ? (this[c] = b[c], ko.utils.arrayForEach(this[c], function () { })) : this[c] = b[c]) } finally {
                a.ignorePropertyChanged =
!1
            } 
        }; this.applyDefaults = function () { }; this.markAsDeleted = function () { this.hasOwnProperty("RowState") ? this.RowState() !== es.RowState.DELETED && this.RowState(es.RowState.DELETED) : this.RowState = ko.observable(es.RowState.DELETED); this.hasOwnProperty("ModifiedColumns") && this.ModifiedColumns.removeAll() }; this.load = function (b) {
            a = this; b.async = b.success !== h || b.error !== h ? !0 : !1; if (b.route) b.url = b.route.url || this.routes[b.route].url, b.type = b.route.method || this.routes[b.route].method; if (b.data && b.data.toJS) b.data =
b.data.toJS(); var c = b.success; b.success = function (b) { a.populateEntity(b); c && c.call(a, b) }; es.dataProvider.execute(b)
        }; this.loadByPrimaryKey = function (a, c, e) { var g = { route: this.routes.loadByPrimaryKey }; 1 === arguments.length && arguments[0] && "object" === typeof arguments[0] ? es.utils.extend(g, arguments[0]) : (g.data = a, g.success = c, g.error = e); this.load(g) }; this.save = function (b, c) {
            a = this; var e, g = { success: b, error: c }; 1 === arguments.length && arguments[0] && "object" === typeof arguments[0] && es.utils.extend(g, arguments[0]);
            g.async = g.success !== h || g.error !== h ? !0 : !1; e = a.routes.commit; switch (a.RowState()) { case es.RowState.ADDED: e = a.routes.create || e; break; case es.RowState.MODIFIED: e = a.routes.update || e; break; case es.RowState.DELETED: e = a.routes.del || e } g.route = e; g.data = es.utils.getDirtyGraph(ko.toJS(a)); if (e) g.url = e.url, g.type = e.method; var j = g.success; g.success = function (b) { a.populateEntity(b); j && j.call(a, b) }; es.dataProvider.execute(g)
        } 
    }; es.exportSymbol("es.EsEntity", es.EsEntity); es.exportSymbol("es.EsEntity.populateEntity",
es.EsEntity.populateEntity); es.exportSymbol("es.EsEntity.markAsDeleted", es.EsEntity.markAsDeleted); es.exportSymbol("es.EsEntity.load", es.EsEntity.load); es.exportSymbol("es.EsEntity.loadByPrimaryKey", es.EsEntity.loadByPrimaryKey); es.exportSymbol("es.EsEntity.save", es.EsEntity.save); es.EsEntityCollection = function () { var a = ko.observableArray([]); ko.utils.extend(a, es.EsEntityCollection.fn); a.___esCollection___ = es.utils.newId(); return a }; es.EsEntityCollection.fn = { filter: function (a) {
    var c = this(); return ko.utils.arrayFilter(c,
a)
}, markAllAsDeleted: function () { var a, c, b = this(), d = b.length; for (a = 0; a < d; a += 1) c = b[a], c.markAsDeleted && c.markAsDeleted() }, populateCollection: function (a) { var c = this.entityTypeName, b, d = [], e = this.createEntity, g; c && (b = es.getType(c)); a && es.isArray(a) && (ko.utils.arrayForEach(a, function (a) { g = e(a, b); g !== h && null !== g && d.push(g) }), this(d)) }, createEntity: function (a, c) { var b; b = c; if (!c) b = this.entityTypeName, b = es.getType(b); b ? (b = new b, b.populateEntity(a)) : b = a; return b }, load: function (a) {
    var c = this; a.async = a.success !==
h || a.error !== h ? !0 : !1; if (a.route) a.url = a.route.url || this.routes[a.route].url, a.type = a.route.method || this.routes[a.route].method; if (a.data && a.data.toJS) a.data = a.data.toJS(); var b = a.success; a.success = function (a) { c.populateCollection(a); b && b.call(c, a) }; es.dataProvider.execute(a)
}, loadAll: function (a, c) { var b = { route: this.routes.loadAll }; 1 === arguments.length && arguments[0] && "object" === typeof arguments[0] ? es.utils.extend(b, arguments[0]) : (b.success = a, b.error = c); this.load(b) }, save: function (a, c) {
    var b = this, d =
{ success: a, error: c }; 1 === arguments.length && arguments[0] && "object" === typeof arguments[0] && es.utils.extend(d, arguments[0]); d.async = d.success !== h || d.error !== h ? !0 : !1; d.route = b.routes.commit; d.data = es.utils.getDirtyGraph(ko.toJS(b)); if (d.route) d.url = d.route.url, d.type = d.route.method; var e = d.success; d.success = function (a) { b.populateCollection(a); e && e.call(b, a) }; es.dataProvider.execute(d)
} 
}; es.exportSymbol("es.EsEntityCollection", es.EsEntityCollection); es.exportSymbol("es.EsEntityCollection.markAllAsDeleted",
es.EsEntityCollection.markAllAsDeleted); es.exportSymbol("es.EsEntityCollection.loadAll", es.EsEntityCollection.loadAll); es.exportSymbol("es.EsEntityCollection.load", es.EsEntityCollection.load); es.exportSymbol("es.EsEntityCollection.save", es.EsEntityCollection.save); es.defineEntity = function (a, c) { var b = "string" !== typeof a, d = b ? a : c, e = function () { d.call(this); this.applyDefaults(); this.init() }; e.prototype = new es.EsEntity; b || (es.generatedNamespace[a] = e); return e }; es.exportSymbol("es.defineEntity", es.defineEntity);
    es.defineCollection = function (a, c) { var b = "string" !== typeof a, d = b ? a : c, e = function () { var a = new es.EsEntityCollection; a.entityTypeName = d; this.init.call(a); return a }; e.prototype = new function () { var a = this, b = []; this.init = function () { var c = this; ko.utils.arrayForEach(b, function (a) { a.call(c) }); for (var d in a) a.hasOwnProperty(d) && "init" !== d && "customize" !== d && (c[d] = a[d]) }; this.customize = function (a) { b.push(a) } }; b || (es.generatedNamespace[a] = e); return e }; es.exportSymbol("es.defineCollection", es.defineCollection);
    es.AjaxProvider = function () {
        var a = function () { }, c = function (a, c) { if ("string" !== typeof c) return a.replace(/\{([^\}]+)\}/g, function (a, b) { if (b in c) return ko.utils.unwrapObservable(c[b]) }) }; this.execute = function (b) {
            var d = b.success || a, e = b.error || a, b = $.extend({ cache: !1, contentType: "application/json; charset=utf-8;", dataType: "json", type: "GET" }, b); b.success = function (a) { d(a) }; b.error = function (a) { if (e) e(a.status, a.responseText); else es.onError({ code: a.status, message: a.responseText }) }; b.url = c(b.url, b.data); if (b.data) b.data =
ko.toJSON(b.data); $.ajax(b)
        } 
    }; es.dataProvider = new es.AjaxProvider
})(window);