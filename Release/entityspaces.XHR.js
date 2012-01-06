(function (m, j) {
    m.es = {}; es.exportSymbol = function (a, c) { for (var b = a.split("."), d = m, g = 0; g < b.length - 1; g++) d = d[b[g]]; d[b[b.length - 1]] = c }; var l = m.esConfig || {}, l = function (a, c) { var b; if (a && c) { for (b in c) a[b] = c[b]; return a } } (l, { namespace: "es.objects" }); (function () { for (var a = l.namespace.split("."), c = m, b = 0; b < a.length; b++) c[a[b]] === j && (c[a[b]] = {}), c = c[a[b]]; es.generatedNamespace = c })(); es.getGeneratedNamespaceObj = function () { return es.generatedNamespace }; es.exportSymbol("es", es); es.RowState = { INVALID: 0, UNCHANGED: 2,
        ADDED: 4, DELETED: 8, MODIFIED: 16
    }; es.exportSymbol("es.RowState", es.RowState); es.getType = function (a) { return es.getGeneratedNamespaceObj()[a] }; es.clearTypes = function () { es.generatedNamespace = {} }; es.onError = ko.observable({}); es.onError.subscribe(function (a) { throw JSON.stringify(a); }); es.isArray = function (a) { return !a ? !1 : a.isArray || "[object Array]" === Object.prototype.toString.call(a) }; es.objectKeys = Object.keys || function (a) { var c = [], b; for (b in a) c.push(b); return c }; es.isEsCollection = function (a) {
        var c = !1; es.isArray(a) &&
0 < a.length && a[0].hasOwnProperty("RowState") && (c = !0); return c
    }; es.exportSymbol("es.isEsCollection", es.isEsCollection); var k = { copyDataIntoEntity: function (a, c) { var b; if (a && c) { for (b in a) if (c.hasOwnProperty(b)) if (ko.isObservable(a[b])) a[b](c[b]); else a[b] = c[b]; return a } }, extend: function (a, c) { var b; if (a && c) { for (b in c) a[b] = c[b]; return a } }, addPropertyChangedHandlers: function (a, c) {
        var b = a[c]; ko.isObservable(b) && !(b instanceof Array) && b.subscribe(function () {
            !1 === a.ignorePropertyChanged && -1 === ko.utils.arrayIndexOf(a.ModifiedColumns(),
c) && "RowState" !== c && (a.ModifiedColumns.push(c), a.RowState() !== es.RowState.MODIFIED && a.RowState() !== es.RowState.ADDED && a.RowState(es.RowState.MODIFIED))
        })
    }, startTracking: function (a) {
        var c; if (a.hasOwnProperty("RowState")) { if (!ko.isObservable(a.RowState)) a.RowState = ko.observable(a.RowState) } else a.RowState = ko.observable(es.RowState.ADDED); a.hasOwnProperty("ModifiedColumns"); a.ModifiedColumns = ko.observableArray(); for (c in a) if ("RowState" !== c && "ModifiedColumns" !== c && "__type" !== c && "esExtendedData" !== c) {
            var b =
a[c]; b instanceof Array || a.hasOwnProperty(c) && ko.isObservable(b) && k.addPropertyChangedHandlers(a, c)
        } return a
    }, expandExtraColumns: function (a, c) { var b, d, g = c || !1; if (a.esExtendedData && es.isArray(a.esExtendedData)) { b = ko.isObservable(a.esExtendedData) ? a.esExtendedData() : a.esExtendedData; for (d = 0; d < b.length; d++) a[b[d].Key] = g ? ko.observable(b[d].Value) : b[d].Value; delete a.esExtendedData } if (b !== j) { a.esExtendedData = []; for (d = 0; d < b.length; d++) a.esExtendedData.push(ko.isObservable(b[d].Key) ? b[d].Key() : b[d].Key) } return a },
        removeExtraColumns: function (a) { var c, b; if (a.esExtendedData && es.isArray(a.esExtendedData)) { b = ko.isObservable(a.esExtendedData) ? a.esExtendedData() : a.esExtendedData; for (c = 0; c < b.length; c++) delete a[b[c]]; delete a.esExtendedData } return a }, shallowCopy: function (a) {
            if ("object" === typeof a && null !== a) {
                var c; if (es.isArray(a)) c = []; else if (a instanceof Date) c = new Date(a); else if (a instanceof Boolean) c = new Boolean(a); else if (a instanceof Number) c = new Number(a); else if (a instanceof String) c = new String(a); else if (Object.create &&
Object.getPrototypeOf) c = Object.create(Object.getPrototypeOf(a)); else if (a.__proto__ || a.constructor.prototype) { var b = a.__proto__ || a.constructor.prototype || {}, d = function () { }; d.prototype = b; c = new d; if (!c.__proto__) c.__proto__ = b } ko.utils.arrayForEach(es.objectKeys(a), function (b) { if (!es.isEsCollection(a[b])) switch (b) { case "___esEntity___": case "esTypeDefs": case "routes": case "ignorePropertyChanged": break; default: c[b] = a[b] } }); return c
            } return a
        }, getDirtyGraph: function (a) {
            var c, b, d, g = [], e = null; es.Visit(a).forEach(function (a) {
                if ("esExtendedData" ===
this.key) this.block(); else if (!1 === this.isLeaf) { if (a instanceof Array) return a; if (a.hasOwnProperty("RowState")) switch (a.RowState) { case es.RowState.ADDED: case es.RowState.DELETED: case es.RowState.MODIFIED: g.push(this.path) } } return a
            }); if (0 < g.length) {
                e = d = es.isArray(a) ? [] : k.shallowCopy(k.removeExtraColumns(a)); for (c = 0; c < g.length; c++) {
                    var i = g[c], n = a; d = e; for (b = 0; b < i.length; b++) d.hasOwnProperty(i[b]) ? d = d[i[b]] : es.isArray(n[i[b]]) && (d[i[b]] = [], d = d[i[b]]), n = n[i[b]]; n = k.removeExtraColumns(n); es.isArray(d) ?
d.push(k.shallowCopy(n)) : d = k.shallowCopy(n)
                } 
            } return e
        } 
    }; k.newId = function () { var a = (new Date).getTime(); return function () { return ++a } } (); es.utils = k; es.exportSymbol("es.extend", es.extend); es.exportSymbol("es.startTracking", es.startTracking); es.exportSymbol("es.getDirtyGraph", es.getDirtyGraph); es.Visit = function (a) { if (!(this instanceof es.Visit)) return new es.Visit(a); this.value = a }; es.Visit.prototype.forEach = function (a) { return this.value = s(this.value, a, !1) }; var s = function (a, c, b) {
        var d = [], g = [], e = !0, i = function (a,
b) { if (a.forEach) return a.forEach(b); for (var d = 0; d < a.length; d++) b(a[d], d, a) }; return function r(a) {
    var h = b ? copy(a) : a, k, o, m, l, p = !0, f = { node: h, node_: a, path: [].concat(d), parent: g[g.length - 1], parents: g, key: d.slice(-1)[0], isRoot: 0 === d.length, level: d.length, circular: null, update: function (a, b) { f.isRoot || (f.parent.node[f.key] = a); f.node = a; b && (p = !1) }, "delete": function (a) { delete f.parent.node[f.key]; a && (p = !1) }, remove: function (a) {
        es.isArray(f.parent.node) ? f.parent.node.splice(f.key, 1) : delete f.parent.node[f.key];
        a && (p = !1)
    }, keys: null, before: function (a) { k = a }, after: function (a) { o = a }, pre: function (a) { m = a }, post: function (a) { l = a }, stop: function () { e = !1 }, block: function () { p = !1 } 
    }; if (!e) return f; if ("object" === typeof h && null !== h) { f.keys = es.objectKeys(h); f.isLeaf = 0 === f.keys.length; for (h = 0; h < g.length; h++) if (g[h].node_ === a) { f.circular = g[h]; break } } else f.isLeaf = !0; f.notLeaf = !f.isLeaf; f.notRoot = !f.isRoot; a = c.call(f, f.node); a !== j && f.update && f.update(a); k && k.call(f, f.node); if (!p) return f; "object" === typeof f.node && null !== f.node &&
!f.circular && (g.push(f), i(f.keys, function (a, c) { d.push(a); m && m.call(f, f.node[a], a); var e = r(f.node[a]); if (b && Object.hasOwnProperty.call(f.node, a)) f.node[a] = e.node; e.isLast = c == f.keys.length - 1; e.isFirst = 0 == c; l && l.call(f, e); d.pop() }), g.pop()); o && o.call(f, f.node); return f
} (a).node
    }; es.EsEntity = function () {
        var a, c = []; this.ignorePropertyChanged = !1; this.routes = {}; this.customize = function (a) { c.push(a); return this }; this.init = function () {
            a = this; a.___esEntity___ = es.utils.newId(); ko.utils.arrayForEach(c, function (b) {
                b &&
b.call(a)
            }); es.utils.startTracking(a)
        }; this.populateEntity = function (b) {
            var d, c, e; a.ignorePropertyChanged = !0; try { for (d in es.utils.copyDataIntoEntity(a, b), es.utils.expandExtraColumns(a, !0), b) b.hasOwnProperty(d) && this.esTypeDefs && this.esTypeDefs[d] && ((c = es.getType(this.esTypeDefs[d])) ? (e = new c, e.hasOwnProperty("___esCollection___") ? e.populateCollection(b[d]) : e.populateEntity(b[d]), this[d] = e) : es.isArray(b[d]) ? (this[d] = b[d], ko.utils.arrayForEach(this[d], function () { })) : this[d] = b[d]) } finally {
                a.ignorePropertyChanged =
!1
            } 
        }; this.applyDefaults = function () { }; this.markAsDeleted = function () { this.hasOwnProperty("RowState") ? this.RowState() !== es.RowState.DELETED && this.RowState(es.RowState.DELETED) : this.RowState = ko.observable(es.RowState.DELETED); this.hasOwnProperty("ModifiedColumns") && this.ModifiedColumns.removeAll() }; this.load = function (b) {
            a = this; b.async = b.success !== j || b.error !== j ? !0 : !1; if (b.route) b.url = b.route.url || this.routes[b.route].url, b.type = b.route.method || this.routes[b.route].method; if (b.data && b.data.toJS) b.data =
b.data.toJS(); var d = b.success; b.success = function (b) { a.populateEntity(b); d && d.call(a, b) }; es.dataProvider.execute(b)
        }; this.loadByPrimaryKey = function (a, d, c) { var e = { route: this.routes.loadByPrimaryKey }; 1 === arguments.length && arguments[0] && "object" === typeof arguments[0] ? es.utils.extend(e, arguments[0]) : (e.data = a, e.success = d, e.error = c); this.load(e) }; this.save = function (b, d) {
            a = this; var c, e = { success: b, error: d }; 1 === arguments.length && arguments[0] && "object" === typeof arguments[0] && es.utils.extend(e, arguments[0]);
            e.async = e.success !== j || e.error !== j ? !0 : !1; c = a.routes.commit; switch (a.RowState()) { case es.RowState.ADDED: c = a.routes.create || c; break; case es.RowState.MODIFIED: c = a.routes.update || c; break; case es.RowState.DELETED: c = a.routes.del || c } e.route = c; e.data = es.utils.getDirtyGraph(ko.toJS(a)); if (c) e.url = c.url, e.type = c.method; var i = e.success; e.success = function (b) { a.populateEntity(b); i && i.call(a, b) }; es.dataProvider.execute(e)
        } 
    }; es.exportSymbol("es.EsEntity", es.EsEntity); es.exportSymbol("es.EsEntity.populateEntity",
es.EsEntity.populateEntity); es.exportSymbol("es.EsEntity.markAsDeleted", es.EsEntity.markAsDeleted); es.exportSymbol("es.EsEntity.load", es.EsEntity.load); es.exportSymbol("es.EsEntity.loadByPrimaryKey", es.EsEntity.loadByPrimaryKey); es.exportSymbol("es.EsEntity.save", es.EsEntity.save); es.EsEntityCollection = function () { var a = ko.observableArray([]); ko.utils.extend(a, es.EsEntityCollection.fn); a.___esCollection___ = es.utils.newId(); return a }; es.EsEntityCollection.fn = { filter: function (a) {
    var c = this(); return ko.utils.arrayFilter(c,
a)
}, markAllAsDeleted: function () { var a, c, b = this(), d = b.length; for (a = 0; a < d; a += 1) c = b[a], c.markAsDeleted && c.markAsDeleted() }, populateCollection: function (a) { var c = this.entityTypeName, b, d = [], g = this.createEntity, e; c && (b = es.getType(c)); a && es.isArray(a) && (ko.utils.arrayForEach(a, function (a) { e = g(a, b); e !== j && null !== e && d.push(e) }), this(d)) }, createEntity: function (a, c) { var b; b = c; if (!c) b = this.entityTypeName, b = es.getType(b); b ? (b = new b, b.populateEntity(a)) : b = a; return b }, load: function (a) {
    var c = this; a.async = a.success !==
j || a.error !== j ? !0 : !1; if (a.route) a.url = a.route.url || this.routes[a.route].url, a.type = a.route.method || this.routes[a.route].method; if (a.data && a.data.toJS) a.data = a.data.toJS(); var b = a.success; a.success = function (a) { c.populateCollection(a); b && b.call(c, a) }; es.dataProvider.execute(a)
}, loadAll: function (a, c) { var b = { route: this.routes.loadAll }; 1 === arguments.length && arguments[0] && "object" === typeof arguments[0] ? es.utils.extend(b, arguments[0]) : (b.success = a, b.error = c); this.load(b) }, save: function (a, c) {
    var b = this, d =
{ success: a, error: c }; 1 === arguments.length && arguments[0] && "object" === typeof arguments[0] && es.utils.extend(d, arguments[0]); d.async = d.success !== j || d.error !== j ? !0 : !1; d.route = b.routes.commit; d.data = es.utils.getDirtyGraph(ko.toJS(b)); if (d.route) d.url = d.route.url, d.type = d.route.method; var g = d.success; d.success = function (a) { b.populateCollection(a); g && g.call(b, a) }; es.dataProvider.execute(d)
} 
}; es.exportSymbol("es.EsEntityCollection", es.EsEntityCollection); es.exportSymbol("es.EsEntityCollection.markAllAsDeleted",
es.EsEntityCollection.markAllAsDeleted); es.exportSymbol("es.EsEntityCollection.loadAll", es.EsEntityCollection.loadAll); es.exportSymbol("es.EsEntityCollection.load", es.EsEntityCollection.load); es.exportSymbol("es.EsEntityCollection.save", es.EsEntityCollection.save); es.defineEntity = function (a, c) { var b = "string" !== typeof a, d = b ? a : c, g = function () { d.call(this); this.applyDefaults(); this.init() }; g.prototype = new es.EsEntity; b || (es.generatedNamespace[a] = g); return g }; es.exportSymbol("es.defineEntity", es.defineEntity);
    es.defineCollection = function (a, c) { var b = "string" !== typeof a, d = b ? a : c, g = function () { var a = new es.EsEntityCollection; a.entityTypeName = d; this.init.call(a); return a }; g.prototype = new function () { var a = this, b = []; this.init = function () { var c = this; ko.utils.arrayForEach(b, function (a) { a.call(c) }); for (var d in a) a.hasOwnProperty(d) && "init" !== d && "customize" !== d && (c[d] = a[d]) }; this.customize = function (a) { b.push(a) } }; b || (es.generatedNamespace[a] = g); return g }; es.exportSymbol("es.defineCollection", es.defineCollection);
    es.XMLHttpRequestProvider = function () {
        var a, c, b = function () { }; this.baseURL = "http://localhost"; a = function () { var a; try { a = new XMLHttpRequest } catch (b) { try { a = new ActiveXObject("Msxml2.XMLHTTP") } catch (c) { try { a = new ActiveXObject("Microsoft.XMLHTTP") } catch (i) { return alert("This sample only works in browsers with AJAX support"), !1 } } } return a }; c = function (a, b) { var c = JSON.parse(a); if (b.response !== j) switch (b.response) { case "entity": return c[b.response]; case "collection": return c[b.response] } return c }; this.execute =
function (d) { var g = null, e, i, j; i = d.success || b; j = d.error || b; e = a(); g = this.baseURL + d.url; e.open("POST", g, d.synchronous || !1); e.setRequestHeader("Content-type", "application/json; charset=utf-8"); if (!0 === d.async) e.onreadystatechange = function () { 4 === e.readyState && (200 === e.status ? i(c(e.responseText, d.route)) : failure(e.status, e.statusText)) }; e.send(ko.toJSON(d.data)); !1 === d.async && (200 === e.status ? "{}" !== e.responseText && "" !== e.responseText && i(c(e.responseText, d.route)) : j(e.status, e.responseText)) }; this.makeRequest =
function (c, g, e, i, k) { var m = null, l = null, l = !1, h, q, o; if (i !== j || k !== j) l = !0, q = i || b, o = k || b; h = a(); h.open("POST", c + g, l); h.setRequestHeader("Content-type", "application/json; charset=utf-8"); if (!0 === l) h.onreadystatechange = function () { 4 === h.readyState && (200 === h.status ? q(JSON.parse(h.responseText)) : o(h.status, h.statusText)) }; h.send(e); if (!1 === l) 200 === h.status ? "{}" !== h.responseText && "" !== h.responseText && (m = JSON.parse(h.responseText)) : es.makeRequstError = h.statusText; return m } 
    }; es.dataProvider = new es.XMLHttpRequestProvider
})(window);