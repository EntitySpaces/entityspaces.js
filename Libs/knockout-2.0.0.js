// Knockout JavaScript library v2.1.0pre
// (c) Steven Sanderson - http://knockoutjs.com/
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

(function (window, document, navigator, undefined) {
    function l(x) { throw x; } var m = void 0, o = !0, p = null, r = !1; function B(x) { return function () { return x } }
    function C(x) {
        function D(b, c, d) { d && c !== a.h.p(b) && a.h.T(b, c); c !== a.h.p(b) && a.a.ta(b, "change") } var a = "undefined" !== typeof x ? x : {}; a.b = function (b, c) { for (var d = b.split("."), e = a, f = 0; f < d.length - 1; f++) e = e[d[f]]; e[d[d.length - 1]] = c }; a.l = function (a, c, d) { a[c] = d }; a.version = "2.1.0pre"; a.b("version", a.version); a.a = new function () {
            function b(a, b) { if ("INPUT" != a.tagName || !a.type) return r; if ("click" != b.toLowerCase()) return r; var e = a.type.toLowerCase(); return "checkbox" == e || "radio" == e } var c = /^(\s|\u00A0)+|(\s|\u00A0)+$/g,
d = {}, e = {}; d[/Firefox\/2/i.test(navigator.userAgent) ? "KeyboardEvent" : "UIEvents"] = ["keyup", "keydown", "keypress"]; d.MouseEvents = "click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave".split(","); for (var f in d) { var h = d[f]; if (h.length) for (var g = 0, i = h.length; g < i; g++) e[h[g]] = f } var j = function () { for (var a = 3, b = document.createElement("div"), e = b.getElementsByTagName("i"); b.innerHTML = "<\!--[if gt IE " + ++a + "]><i></i><![endif]--\>", e[0]; ); return 4 < a ? a : m } (); return { Ca: ["authenticity_token",
/^__RequestVerificationToken(_.*)?$/], q: function (a, b) { for (var e = 0, c = a.length; e < c; e++) b(a[e]) }, i: function (a, b) { if ("function" == typeof Array.prototype.indexOf) return Array.prototype.indexOf.call(a, b); for (var e = 0, c = a.length; e < c; e++) if (a[e] === b) return e; return -1 }, Ya: function (a, b, e) { for (var c = 0, f = a.length; c < f; c++) if (b.call(e, a[c])) return a[c]; return p }, ba: function (b, e) { var c = a.a.i(b, e); 0 <= c && b.splice(c, 1) }, ya: function (b) { for (var b = b || [], e = [], c = 0, f = b.length; c < f; c++) 0 > a.a.i(e, b[c]) && e.push(b[c]); return e },
    U: function (a, b) { for (var a = a || [], e = [], c = 0, f = a.length; c < f; c++) e.push(b(a[c])); return e }, aa: function (a, b) { for (var a = a || [], e = [], c = 0, f = a.length; c < f; c++) b(a[c]) && e.push(a[c]); return e }, H: function (a, b) { if (b instanceof Array) a.push.apply(a, b); else for (var e = 0, c = b.length; e < c; e++) a.push(b[e]); return a }, extend: function (a, b) { for (var e in b) b.hasOwnProperty(e) && (a[e] = b[e]); return a }, ha: function (b) { for (; b.firstChild; ) a.removeNode(b.firstChild) }, yb: function (b) {
        for (var b = a.a.M(b), e = document.createElement("div"),
c = 0, f = b.length; c < f; c++) e.appendChild(b[c]); return e
    }, oa: function (b, e) { a.a.ha(b); if (e) for (var c = 0, f = e.length; c < f; c++) b.appendChild(e[c]) }, Ka: function (b, e) { var c = b.nodeType ? [b] : b; if (0 < c.length) { for (var f = c[0], h = f.parentNode, d = 0, g = e.length; d < g; d++) h.insertBefore(e[d], f); d = 0; for (g = c.length; d < g; d++) a.removeNode(c[d]) } }, Ma: function (a, b) { 0 <= navigator.userAgent.indexOf("MSIE 6") ? a.setAttribute("selected", b) : a.selected = b }, w: function (a) { return (a || "").replace(c, "") }, Hb: function (b, e) {
        for (var c = [], f = (b || "").split(e),
h = 0, d = f.length; h < d; h++) { var g = a.a.w(f[h]); "" !== g && c.push(g) } return c
    }, Gb: function (a, b) { a = a || ""; return b.length > a.length ? r : a.substring(0, b.length) === b }, ab: function (a, b) { for (var e = "return (" + a + ")", c = 0; c < b; c++) e = "with(sc[" + c + "]) { " + e + " } "; return new Function("sc", e) }, jb: function (a, b) { if (b.compareDocumentPosition) return 16 == (b.compareDocumentPosition(a) & 16); for (; a != p; ) { if (a == b) return o; a = a.parentNode } return r }, ga: function (b) { return a.a.jb(b, document) }, s: function (a, e, c) {
        if ("undefined" != typeof jQuery) {
            if (b(a,
e)) var f = c, c = function (a, b) { var e = this.checked; if (b) this.checked = b.bb !== o; f.call(this, a); this.checked = e }; jQuery(a).bind(e, c)
        } else "function" == typeof a.addEventListener ? a.addEventListener(e, c, r) : "undefined" != typeof a.attachEvent ? a.attachEvent("on" + e, function (b) { c.call(a, b) }) : l(Error("Browser doesn't support addEventListener or attachEvent"))
    }, ta: function (a, c) {
        (!a || !a.nodeType) && l(Error("element must be a DOM node when calling triggerEvent")); if ("undefined" != typeof jQuery) {
            var f = []; b(a, c) && f.push({ bb: a.checked });
            jQuery(a).trigger(c, f)
        } else if ("function" == typeof document.createEvent) "function" == typeof a.dispatchEvent ? (f = document.createEvent(e[c] || "HTMLEvents"), f.initEvent(c, o, o, window, 0, 0, 0, 0, 0, r, r, r, r, 0, a), a.dispatchEvent(f)) : l(Error("The supplied element doesn't support dispatchEvent")); else if ("undefined" != typeof a.fireEvent) { if ("click" == c && "INPUT" == a.tagName && ("checkbox" == a.type.toLowerCase() || "radio" == a.type.toLowerCase())) a.checked = a.checked !== o; a.fireEvent("on" + c) } else l(Error("Browser doesn't support triggering events"))
    },
    d: function (b) { return a.W(b) ? b() : b }, ib: function (b, e) { return 0 <= a.a.i((b.className || "").split(/\s+/), e) }, Ra: function (b, e, c) { var f = a.a.ib(b, e); if (c && !f) b.className = (b.className || "") + " " + e; else if (f && !c) { for (var c = (b.className || "").split(/\s+/), f = "", h = 0; h < c.length; h++) c[h] != e && (f += c[h] + " "); b.className = a.a.w(f) } }, Na: function (b, e) { var c = a.a.d(e); if (c === p || c === m) c = ""; "innerText" in b ? b.innerText = c : b.textContent = c; if (9 <= j) b.style.display = b.style.display }, Cb: function (b, e) {
        for (var b = a.a.d(b), e = a.a.d(e), c = [],
f = b; f <= e; f++) c.push(f); return c
    }, M: function (a) { for (var b = [], e = 0, c = a.length; e < c; e++) b.push(a[e]); return b }, rb: 6 === j, sb: 7 === j, ob: j, Da: function (b, e) { for (var c = a.a.M(b.getElementsByTagName("INPUT")).concat(a.a.M(b.getElementsByTagName("TEXTAREA"))), f = "string" == typeof e ? function (a) { return a.name === e } : function (a) { return e.test(a.name) }, h = [], d = c.length - 1; 0 <= d; d--) f(c[d]) && h.push(c[d]); return h }, zb: function (b) {
        return "string" == typeof b && (b = a.a.w(b)) ? window.JSON && window.JSON.parse ? window.JSON.parse(b) : (new Function("return " +
b))() : p
    }, qa: function (b) { ("undefined" == typeof JSON || "undefined" == typeof JSON.stringify) && l(Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js")); return JSON.stringify(a.a.d(b)) }, Ab: function (b, e, c) {
        var c = c || {}, f = c.params || {}, h = c.includeFields || this.Ca, d = b; if ("object" == typeof b && "FORM" == b.tagName) for (var d = b.action, g = h.length - 1; 0 <= g; g--) for (var j =
a.a.Da(b, h[g]), i = j.length - 1; 0 <= i; i--) f[j[i].name] = j[i].value; var e = a.a.d(e), v = document.createElement("FORM"); v.style.display = "none"; v.action = d; v.method = "post"; for (var A in e) b = document.createElement("INPUT"), b.name = A, b.value = a.a.qa(a.a.d(e[A])), v.appendChild(b); for (A in f) b = document.createElement("INPUT"), b.name = A, b.value = f[A], v.appendChild(b); document.body.appendChild(v); c.submitter ? c.submitter(v) : v.submit(); setTimeout(function () { v.parentNode.removeChild(v) }, 0)
    } 
}
        }; a.b("utils", a.a); a.b("utils.arrayForEach",
a.a.q); a.b("utils.arrayFirst", a.a.Ya); a.b("utils.arrayFilter", a.a.aa); a.b("utils.arrayGetDistinctValues", a.a.ya); a.b("utils.arrayIndexOf", a.a.i); a.b("utils.arrayMap", a.a.U); a.b("utils.arrayPushAll", a.a.H); a.b("utils.arrayRemoveItem", a.a.ba); a.b("utils.extend", a.a.extend); a.b("utils.fieldsIncludedWithJsonPost", a.a.Ca); a.b("utils.getFormFields", a.a.Da); a.b("utils.postJson", a.a.Ab); a.b("utils.parseJson", a.a.zb); a.b("utils.registerEventHandler", a.a.s); a.b("utils.stringifyJson", a.a.qa); a.b("utils.range",
a.a.Cb); a.b("utils.toggleDomNodeCssClass", a.a.Ra); a.b("utils.triggerEvent", a.a.ta); a.b("utils.unwrapObservable", a.a.d); Function.prototype.bind || (Function.prototype.bind = function (a) { var c = this, d = Array.prototype.slice.call(arguments), a = d.shift(); return function () { return c.apply(a, d.concat(Array.prototype.slice.call(arguments))) } }); a.a.e = new function () {
    var b = 0, c = "__ko__" + (new Date).getTime(), d = {}; return { get: function (b, c) { var h = a.a.e.getAll(b, r); return h === m ? m : h[c] }, set: function (b, c, h) {
        h === m && a.a.e.getAll(b,
r) === m || (a.a.e.getAll(b, o)[c] = h)
    }, getAll: function (a, f) { var h = a[c]; if (!(h && "null" !== h)) { if (!f) return; h = a[c] = "ko" + b++; d[h] = {} } return d[h] }, clear: function (a) { var b = a[c]; b && (delete d[b], a[c] = p) } 
    }
}; a.b("utils.domData", a.a.e); a.b("utils.domData.clear", a.a.e.clear); a.a.D = new function () {
    function b(b, e) { var c = a.a.e.get(b, d); c === m && e && (c = [], a.a.e.set(b, d, c)); return c } function c(e) {
        var d = b(e, r); if (d) for (var d = d.slice(0), i = 0; i < d.length; i++) d[i](e); a.a.e.clear(e); "function" == typeof jQuery && "function" == typeof jQuery.cleanData &&
jQuery.cleanData([e]); if (f[e.nodeType]) for (d = e.firstChild; e = d; ) d = e.nextSibling, 8 === e.nodeType && c(e)
    } var d = "__ko_domNodeDisposal__" + (new Date).getTime(), e = { 1: o, 8: o, 9: o }, f = { 1: o, 9: o }; return { va: function (a, e) { "function" != typeof e && l(Error("Callback must be a function")); b(a, o).push(e) }, Ja: function (e, c) { var f = b(e, r); f && (a.a.ba(f, c), 0 == f.length && a.a.e.set(e, d, m)) }, K: function (b) { if (e[b.nodeType] && (c(b), f[b.nodeType])) { var d = []; a.a.H(d, b.getElementsByTagName("*")); for (var b = 0, i = d.length; b < i; b++) c(d[b]) } },
        removeNode: function (b) { a.K(b); b.parentNode && b.parentNode.removeChild(b) } 
    }
}; a.K = a.a.D.K; a.removeNode = a.a.D.removeNode; a.b("cleanNode", a.K); a.b("removeNode", a.removeNode); a.b("utils.domNodeDisposal", a.a.D); a.b("utils.domNodeDisposal.addDisposeCallback", a.a.D.va); a.b("utils.domNodeDisposal.removeDisposeCallback", a.a.D.Ja); (function () {
    a.a.ma = function (b) {
        var c; if ("undefined" != typeof jQuery) {
            if ((c = jQuery.clean([b])) && c[0]) {
                for (b = c[0]; b.parentNode && 11 !== b.parentNode.nodeType; ) b = b.parentNode; b.parentNode &&
b.parentNode.removeChild(b)
            } 
        } else { var d = a.a.w(b).toLowerCase(); c = document.createElement("div"); d = d.match(/^<(thead|tbody|tfoot)/) && [1, "<table>", "</table>"] || !d.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"] || (!d.indexOf("<td") || !d.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"] || [0, "", ""]; b = "ignored<div>" + d[1] + b + d[2] + "</div>"; for ("function" == typeof window.innerShiv ? c.appendChild(window.innerShiv(b)) : c.innerHTML = b; d[0]--; ) c = c.lastChild; c = a.a.M(c.lastChild.childNodes) } return c
    };
    a.a.Z = function (b, c) { a.a.ha(b); if (c !== p && c !== m) if ("string" != typeof c && (c = c.toString()), "undefined" != typeof jQuery) jQuery(b).html(c); else for (var d = a.a.ma(c), e = 0; e < d.length; e++) b.appendChild(d[e]) } 
})(); a.b("utils.parseHtmlFragment", a.a.ma); a.b("utils.setHtml", a.a.Z); a.r = function () {
    function b() { return (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1) } function c(b, f) {
        if (b) if (8 == b.nodeType) { var d = a.r.Ha(b.nodeValue); d != p && f.push({ hb: b, wb: d }) } else if (1 == b.nodeType) for (var d = 0, g = b.childNodes, i = g.length; d <
i; d++) c(g[d], f)
    } var d = {}; return { ka: function (a) { "function" != typeof a && l(Error("You can only pass a function to ko.memoization.memoize()")); var c = b() + b(); d[c] = a; return "<\!--[ko_memo:" + c + "]--\>" }, Sa: function (a, b) { var c = d[a]; c === m && l(Error("Couldn't find any memo with ID " + a + ". Perhaps it's already been unmemoized.")); try { return c.apply(p, b || []), o } finally { delete d[a] } }, Ta: function (b, f) {
        var d = []; c(b, d); for (var g = 0, i = d.length; g < i; g++) {
            var j = d[g].hb, k = [j]; f && a.a.H(k, f); a.r.Sa(d[g].wb, k); j.nodeValue = ""; j.parentNode &&
j.parentNode.removeChild(j)
        } 
    }, Ha: function (a) { return (a = a.match(/^\[ko_memo\:(.*?)\]$/)) ? a[1] : p } 
    }
} (); a.b("memoization", a.r); a.b("memoization.memoize", a.r.ka); a.b("memoization.unmemoize", a.r.Sa); a.b("memoization.parseMemoText", a.r.Ha); a.b("memoization.unmemoizeDomNodeAndDescendants", a.r.Ta); a.Ba = { throttle: function (b, c) { b.throttleEvaluation = c; var d = p; return a.j({ read: b, write: function (a) { clearTimeout(d); d = setTimeout(function () { b(a) }, c) } }) }, notify: function (b, c) {
    b.equalityComparer = "always" == c ? B(r) : a.v.fn.equalityComparer;
    return b
} 
}; a.b("extenders", a.Ba); a.Pa = function (b, c, d) { this.target = b; this.ca = c; this.gb = d; a.l(this, "dispose", this.z) }; a.Pa.prototype.z = function () { this.qb = o; this.gb() }; a.S = function () { this.u = {}; a.a.extend(this, a.S.fn); a.l(this, "subscribe", this.ra); a.l(this, "extend", this.extend); a.l(this, "getSubscriptionsCount", this.mb) }; a.S.fn = { ra: function (b, c, d) { var d = d || "change", b = c ? b.bind(c) : b, e = new a.Pa(this, b, function () { a.a.ba(this.u[d], e) } .bind(this)); this.u[d] || (this.u[d] = []); this.u[d].push(e); return e }, notifySubscribers: function (b,
c) { c = c || "change"; this.u[c] && a.a.q(this.u[c].slice(0), function (a) { a && a.qb !== o && a.ca(b) }) }, mb: function () { var a = 0, c; for (c in this.u) this.u.hasOwnProperty(c) && (a += this.u[c].length); return a }, extend: function (b) { var c = this; if (b) for (var d in b) { var e = a.Ba[d]; "function" == typeof e && (c = e(c, b[d])) } return c } 
}; a.Fa = function (a) { return "function" == typeof a.ra && "function" == typeof a.notifySubscribers }; a.b("subscribable", a.S); a.b("isSubscribable", a.Fa); a.V = function () {
    var b = []; return { Za: function (a) { b.push({ ca: a, za: [] }) },
        end: function () { b.pop() }, Ia: function (c) { a.Fa(c) || l(Error("Only subscribable things can act as dependencies")); if (0 < b.length) { var d = b[b.length - 1]; 0 <= a.a.i(d.za, c) || (d.za.push(c), d.ca(c)) } } 
    }
} (); var E = { undefined: o, "boolean": o, number: o, string: o }; a.v = function (b) {
    function c() { if (0 < arguments.length) { if (!c.equalityComparer || !c.equalityComparer(d, arguments[0])) c.G(), d = arguments[0], c.F(); return this } a.V.Ia(c); return d } var d = b; a.S.call(c); c.F = function () { c.notifySubscribers(d) }; c.G = function () {
        c.notifySubscribers(d,
"beforeChange")
    }; a.a.extend(c, a.v.fn); a.l(c, "valueHasMutated", c.F); a.l(c, "valueWillMutate", c.G); return c
}; a.v.fn = { A: a.v, equalityComparer: function (a, c) { return a === p || typeof a in E ? a === c : r } }; a.W = function (b) { return b === p || b === m || b.A === m ? r : b.A === a.v ? o : a.W(b.A) }; a.Q = function (b) { return "function" == typeof b && b.A === a.v ? o : "function" == typeof b && b.A === a.j && b.nb ? o : r }; a.b("observable", a.v); a.b("isObservable", a.W); a.b("isWriteableObservable", a.Q); a.R = function (b) {
    0 == arguments.length && (b = []); b !== p && b !== m && !("length" in
b) && l(Error("The argument passed when initializing an observable array must be an array, or null, or undefined.")); var c = new a.v(b); a.a.extend(c, a.R.fn); a.l(c, "remove", c.remove); a.l(c, "removeAll", c.Db); a.l(c, "destroy", c.fa); a.l(c, "destroyAll", c.fb); a.l(c, "indexOf", c.indexOf); a.l(c, "replace", c.replace); return c
}; a.R.fn = { remove: function (a) {
    for (var c = this(), d = [], e = "function" == typeof a ? a : function (c) { return c === a }, f = 0; f < c.length; f++) { var h = c[f]; e(h) && (0 === d.length && this.G(), d.push(h), c.splice(f, 1), f--) } d.length &&
this.F(); return d
}, Db: function (b) { if (b === m) { var c = this(), d = c.slice(0); this.G(); c.splice(0, c.length); this.F(); return d } return !b ? [] : this.remove(function (c) { return 0 <= a.a.i(b, c) }) }, fa: function (a) { var c = this(), d = "function" == typeof a ? a : function (c) { return c === a }; this.G(); for (var e = c.length - 1; 0 <= e; e--) d(c[e]) && (c[e]._destroy = o); this.F() }, fb: function (b) { return b === m ? this.fa(B(o)) : !b ? [] : this.fa(function (c) { return 0 <= a.a.i(b, c) }) }, indexOf: function (b) { var c = this(); return a.a.i(c, b) }, replace: function (a, c) {
    var d =
this.indexOf(a); 0 <= d && (this.G(), this()[d] = c, this.F())
} 
}; a.a.q("pop,push,reverse,shift,sort,splice,unshift".split(","), function (b) { a.R.fn[b] = function () { var a = this(); this.G(); a = a[b].apply(a, arguments); this.F(); return a } }); a.a.q(["slice"], function (b) { a.R.fn[b] = function () { var a = this(); return a[b].apply(a, arguments) } }); a.b("observableArray", a.R); a.j = function (b, c, d) {
    function e() { a.a.q(s, function (a) { a.z() }); s = [] } function f() { var a = g.throttleEvaluation; a && 0 <= a ? (clearTimeout(z), z = setTimeout(h, a)) : h() } function h() {
        if (k &&
u()) w(); else { try { var b = a.a.U(s, function (a) { return a.target }); a.V.Za(function (c) { var e; 0 <= (e = a.a.i(b, c)) ? b[e] = m : s.push(c.ra(f)) }); for (var e = n.call(c), d = b.length - 1; 0 <= d; d--) b[d] && s.splice(d, 1)[0].z(); g.notifySubscribers(j, "beforeChange"); j = e } finally { a.V.end() } g.notifySubscribers(j); k = o } 
    } function g() { if (0 < arguments.length) i.apply(g, arguments); else return k || h(), a.V.Ia(g), j } function i() { "function" === typeof t ? t.apply(c, arguments) : l(Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.")) }
    var j, k = r, n = b; n && "object" == typeof n ? (d = n, n = d.read) : (d = d || {}, n || (n = d.read)); "function" != typeof n && l(Error("Pass a function that returns the value of the ko.computed")); var t = d.write; c || (c = d.owner); var s = [], w = e, q = "object" == typeof d.disposeWhenNodeIsRemoved ? d.disposeWhenNodeIsRemoved : p, u = d.disposeWhen || B(r); if (q) { w = function () { a.a.D.Ja(q, arguments.callee); e() }; a.a.D.va(q, w); var y = u, u = function () { return !a.a.ga(q) || y() } } var z = p; g.lb = function () { return s.length }; g.nb = "function" === typeof d.write; g.z = function () { w() };
    a.S.call(g); a.a.extend(g, a.j.fn); d.deferEvaluation !== o && h(); a.l(g, "dispose", g.z); a.l(g, "getDependenciesCount", g.lb); return g
}; a.j.fn = { A: a.j }; a.j.A = a.v; a.b("dependentObservable", a.j); a.b("computed", a.j); (function () {
    function b(a, f, h) {
        h = h || new d; a = f(a); if (!("object" == typeof a && a !== p && a !== m && !(a instanceof Date))) return a; var g = a instanceof Array ? [] : {}; h.save(a, g); c(a, function (c) {
            var d = f(a[c]); switch (typeof d) {
                case "boolean": case "number": case "string": case "function": g[c] = d; break; case "object": case "undefined": var k =
h.get(d); g[c] = k !== m ? k : b(d, f, h)
            } 
        }); return g
    } function c(a, b) { if (a instanceof Array) for (var c = 0; c < a.length; c++) b(c); else for (c in a) b(c) } function d() { var b = [], c = []; this.save = function (d, g) { var i = a.a.i(b, d); 0 <= i ? c[i] = g : (b.push(d), c.push(g)) }; this.get = function (d) { d = a.a.i(b, d); return 0 <= d ? c[d] : m } } a.Qa = function (c) { 0 == arguments.length && l(Error("When calling ko.toJS, pass the object you want to convert.")); return b(c, function (b) { for (var c = 0; a.W(b) && 10 > c; c++) b = b(); return b }) }; a.toJSON = function (b) {
        b = a.Qa(b);
        return a.a.qa(b)
    } 
})(); a.b("toJS", a.Qa); a.b("toJSON", a.toJSON); (function () {
    a.h = { p: function (b) { return "OPTION" == b.tagName ? b.__ko__hasDomDataOptionValue__ === o ? a.a.e.get(b, a.c.options.la) : b.getAttribute("value") : "SELECT" == b.tagName ? 0 <= b.selectedIndex ? a.h.p(b.options[b.selectedIndex]) : m : b.value }, T: function (b, c) {
        if ("OPTION" == b.tagName) switch (typeof c) {
            case "string": a.a.e.set(b, a.c.options.la, m); "__ko__hasDomDataOptionValue__" in b && delete b.__ko__hasDomDataOptionValue__; b.value = c; break; default: a.a.e.set(b,
a.c.options.la, c), b.__ko__hasDomDataOptionValue__ = o, b.value = "number" === typeof c ? c : ""
        } else if ("SELECT" == b.tagName) for (var d = b.options.length - 1; 0 <= d; d--) { if (a.h.p(b.options[d]) == c) { b.selectedIndex = d; break } } else { if (c === p || c === m) c = ""; b.value = c } 
    } 
    }
})(); a.b("selectExtensions", a.h); a.b("selectExtensions.readValue", a.h.p); a.b("selectExtensions.writeValue", a.h.T); a.k = function () {
    function b(a, b) { for (var e = p; a != e; ) e = a, a = a.replace(c, function (a, c) { return b[c] }); return a } var c = /\@ko_token_(\d+)\@/g, d = /^[\_$a-z][\_$a-z0-9]*(\[.*?\])*(\.[\_$a-z][\_$a-z0-9]*(\[.*?\])*)*$/i,
e = ["true", "false"]; return { C: [], Y: function (c) {
    var e = a.a.w(c); if (3 > e.length) return []; "{" === e.charAt(0) && (e = e.substring(1, e.length - 1)); for (var c = [], d = p, i, j = 0; j < e.length; j++) { var k = e.charAt(j); if (d === p) switch (k) { case '"': case "'": case "/": d = j, i = k } else if (k == i && "\\" !== e.charAt(j - 1)) { k = e.substring(d, j + 1); c.push(k); var n = "@ko_token_" + (c.length - 1) + "@", e = e.substring(0, d) + n + e.substring(j + 1), j = j - (k.length - n.length), d = p } } i = d = p; for (var t = 0, s = p, j = 0; j < e.length; j++) {
        k = e.charAt(j); if (d === p) switch (k) {
            case "{": d = j;
                s = k; i = "}"; break; case "(": d = j; s = k; i = ")"; break; case "[": d = j, s = k, i = "]"
        } k === s ? t++ : k === i && (t--, 0 === t && (k = e.substring(d, j + 1), c.push(k), n = "@ko_token_" + (c.length - 1) + "@", e = e.substring(0, d) + n + e.substring(j + 1), j -= k.length - n.length, d = p))
    } i = []; e = e.split(","); d = 0; for (j = e.length; d < j; d++) t = e[d], s = t.indexOf(":"), 0 < s && s < t.length - 1 ? (k = t.substring(s + 1), i.push({ key: b(t.substring(0, s), c), value: b(k, c) })) : i.push({ unknown: b(t, c) }); return i
}, ia: function (b) {
    for (var c = "string" === typeof b ? a.k.Y(b) : b, g = [], b = [], i, j = 0; i = c[j]; j++) if (0 <
g.length && g.push(","), i.key) { var k; a: { k = i.key; var n = a.a.w(k); switch (n.length && n.charAt(0)) { case "'": case '"': break a; default: k = "'" + n + "'" } } i = i.value; g.push(k); g.push(":"); g.push(i); n = a.a.w(i); if (0 <= a.a.i(e, a.a.w(n).toLowerCase()) ? 0 : n.match(d) !== p) 0 < b.length && b.push(", "), b.push(k + " : function(__ko_value) { " + i + " = __ko_value; }") } else i.unknown && g.push(i.unknown); c = g.join(""); 0 < b.length && (c = c + ", '_ko_property_writers' : { " + b.join("") + " } "); return c
}, ub: function (b, c) {
    for (var e = 0; e < b.length; e++) if (a.a.w(b[e].key) ==
c) return o; return r
} 
}
} (); a.b("jsonExpressionRewriting", a.k); a.b("jsonExpressionRewriting.bindingRewriteValidators", a.k.C); a.b("jsonExpressionRewriting.parseObjectLiteral", a.k.Y); a.b("jsonExpressionRewriting.insertPropertyAccessorsIntoJson", a.k.ia); (function () {
    function b(a) { return 8 == a.nodeType && (f ? a.text : a.nodeValue).match(h) } function c(a) { return 8 == a.nodeType && (f ? a.text : a.nodeValue).match(g) } function d(a, e) {
        for (var d = a, f = 1, g = []; d = d.nextSibling; ) { if (c(d) && (f--, 0 === f)) return g; g.push(d); b(d) && f++ } e ||
l(Error("Cannot find closing comment tag to match: " + a.nodeValue)); return p
    } function e(a, b) { var c = d(a, b); return c ? 0 < c.length ? c[c.length - 1].nextSibling : a.nextSibling : p } var f = "<\!--test--\>" === document.createComment("test").text, h = f ? /^<\!--\s*ko\s+(.*\:.*)\s*--\>$/ : /^\s*ko\s+(.*\:.*)\s*$/, g = f ? /^<\!--\s*\/ko\s*--\>$/ : /^\s*\/ko\s*$/, i = { ul: o, ol: o }; a.g = { B: {}, childNodes: function (a) { return b(a) ? d(a) : a.childNodes }, Aa: function (c) {
        if (b(c)) for (var c = a.g.childNodes(c), e = 0, d = c.length; e < d; e++) a.removeNode(c[e]);
        else a.a.ha(c)
    }, oa: function (c, e) { if (b(c)) { a.g.Aa(c); for (var d = c.nextSibling, f = 0, g = e.length; f < g; f++) d.parentNode.insertBefore(e[f], d) } else a.a.oa(c, e) }, Bb: function (a, c) { b(a) ? a.parentNode.insertBefore(c, a.nextSibling) : a.firstChild ? a.insertBefore(c, a.firstChild) : a.appendChild(c) }, pb: function (a, c, e) { b(a) ? a.parentNode.insertBefore(c, e.nextSibling) : e.nextSibling ? a.insertBefore(c, e.nextSibling) : a.appendChild(c) }, nextSibling: function (a) { return b(a) ? e(a).nextSibling : a.nextSibling && c(a.nextSibling) ? m : a.nextSibling },
        Ua: function (a) { return (a = b(a)) ? a[1] : p }, Ga: function (a) { if (i[a.tagName.toLowerCase()]) { var d = a.firstChild; if (d) { do if (1 === d.nodeType) { var f; f = d.firstChild; var g = p; if (f) { do if (g) g.push(f); else if (b(f)) { var h = e(f, o); h ? f = h : g = [f] } else c(f) && (g = [f]); while (f = f.nextSibling) } if (f = g) { g = d.nextSibling; for (h = 0; h < f.length; h++) g ? a.insertBefore(f[h], g) : a.appendChild(f[h]) } } while (d = d.nextSibling) } } } 
    }
})(); (function () {
    a.J = function () { this.$a = {} }; a.a.extend(a.J.prototype, { nodeHasBindings: function (b) {
        switch (b.nodeType) {
            case 1: return b.getAttribute("data-bind") !=
p; case 8: return a.g.Ua(b) != p; default: return r
        } 
    }, getBindings: function (a, c) { var d = this.getBindingsString(a, c); return d ? this.parseBindingsString(d, c) : p }, getBindingsString: function (b) { switch (b.nodeType) { case 1: return b.getAttribute("data-bind"); case 8: return a.g.Ua(b); default: return p } }, parseBindingsString: function (b, c) {
        try { var d = c.$data, d = "object" == typeof d && d != p ? [d, c] : [c], e = d.length, f = this.$a, h = e + "_" + b, g; if (!(g = f[h])) { var i = " { " + a.k.ia(b) + " } "; g = f[h] = a.a.ab(i, e) } return g(d) } catch (j) {
            l(Error("Unable to parse bindings.\nMessage: " +
j + ";\nBindings value: " + b))
        } 
    } 
    }); a.J.instance = new a.J
})(); a.b("bindingProvider", a.J); (function () {
    function b(b, d) { for (var h, g = d.childNodes[0]; h = g; ) g = a.g.nextSibling(h), c(b, h, r) } function c(c, f, h) { var g = o, i = 1 == f.nodeType; i && a.g.Ga(f); if (i && h || a.J.instance.nodeHasBindings(f)) g = d(f, p, c, h).Fb; i && g && b(c, f) } function d(b, c, d, g) {
        function i(a) { return function () { return n[a] } } function j() { return n } var k = 0, n, t; new a.j(function () {
            var s = d && d instanceof a.I ? d : new a.I(a.a.d(d)), w = s.$data; g && a.Oa(b, s); if (n = ("function" ==
typeof c ? c() : c) || a.J.instance.getBindings(b, s)) {
                if (0 === k) { k = 1; for (var q in n) { var u = a.c[q]; u && 8 === b.nodeType && !a.g.B[q] && l(Error("The binding '" + q + "' cannot be used with virtual elements")); if (u && "function" == typeof u.init && (u = (0, u.init)(b, i(q), j, w, s)) && u.controlsDescendantBindings) t !== m && l(Error("Multiple bindings (" + t + " and " + q + ") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.")), t = q } k = 2 } if (2 === k) for (q in n) (u = a.c[q]) && "function" ==
typeof u.update && (0, u.update)(b, i(q), j, w, s)
            } 
        }, p, { disposeWhenNodeIsRemoved: b }); return { Fb: t === m}
    } a.c = {}; a.I = function (a, b) { this.$data = a; b ? (this.$parent = b.$data, this.$parents = (b.$parents || []).slice(0), this.$parents.unshift(this.$parent), this.$root = b.$root) : (this.$parents = [], this.$root = a) }; a.I.prototype.createChildContext = function (b) { return new a.I(b, this) }; a.Oa = function (b, c) { if (2 == arguments.length) a.a.e.set(b, "__ko_bindingContext__", c); else return a.a.e.get(b, "__ko_bindingContext__") }; a.xa = function (b,
c, h) { 1 === b.nodeType && a.g.Ga(b); return d(b, c, h, o) }; a.Va = function (a, c) { 1 === c.nodeType && b(a, c) }; a.wa = function (a, b) { b && 1 !== b.nodeType && 8 !== b.nodeType && l(Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node")); b = b || window.document.body; c(a, b, o) }; a.ea = function (b) { switch (b.nodeType) { case 1: case 8: var c = a.Oa(b); if (c) return c; if (b.parentNode) return a.ea(b.parentNode) } }; a.eb = function (b) { return (b = a.ea(b)) ? b.$data : m }; a.b("bindingHandlers", a.c); a.b("applyBindings",
a.wa); a.b("applyBindingsToDescendants", a.Va); a.b("applyBindingsToNode", a.xa); a.b("contextFor", a.ea); a.b("dataFor", a.eb)
})(); a.a.q(["click"], function (b) { a.c[b] = { init: function (c, d, e, f) { return a.c.event.init.call(this, c, function () { var a = {}; a[b] = d(); return a }, e, f) } } }); a.c.event = { init: function (b, c, d, e) {
    var f = c() || {}, h; for (h in f) (function () {
        var f = h; "string" == typeof f && a.a.s(b, f, function (b) {
            var h, k = c()[f]; if (k) {
                var n = d(); try { var t = a.a.M(arguments); t.unshift(e); h = k.apply(e, t) } finally {
                    if (h !== o) b.preventDefault ?
b.preventDefault() : b.returnValue = r
                } if (n[f + "Bubble"] === r) b.cancelBubble = o, b.stopPropagation && b.stopPropagation()
            } 
        })
    })()
} 
}; a.c.submit = { init: function (b, c, d, e) { "function" != typeof c() && l(Error("The value for a submit binding must be a function")); a.a.s(b, "submit", function (a) { var d, g = c(); try { d = g.call(e, b) } finally { if (d !== o) a.preventDefault ? a.preventDefault() : a.returnValue = r } }) } }; a.c.visible = { update: function (b, c) {
    var d = a.a.d(c()), e = "none" != b.style.display; if (d && !e) b.style.display = ""; else if (!d && e) b.style.display =
"none"
} 
}; a.c.enable = { update: function (b, c) { var d = a.a.d(c()); if (d && b.disabled) b.removeAttribute("disabled"); else if (!d && !b.disabled) b.disabled = o } }; a.c.disable = { update: function (b, c) { a.c.enable.update(b, function () { return !a.a.d(c()) }) } }; a.c.value = { init: function (b, c, d) {
    var e = ["change"], f = d().valueUpdate; f && ("string" == typeof f && (f = [f]), a.a.H(e, f), e = a.a.ya(e)); a.a.q(e, function (e) {
        var f = r; a.a.Gb(e, "after") && (f = o, e = e.substring(5)); var i = f ? function (a) { setTimeout(a, 0) } : function (a) { a() }; a.a.s(b, e, function () {
            i(function () {
                var e =
c(), f = a.h.p(b); a.Q(e) ? e(f) : (e = d(), e._ko_property_writers && e._ko_property_writers.value && e._ko_property_writers.value(f))
            })
        })
    })
}, update: function (b, c) { var d = a.a.d(c()), e = a.h.p(b), f = d != e; 0 === d && 0 !== e && "0" !== e && (f = o); f && (e = function () { a.h.T(b, d) }, e(), "SELECT" == b.tagName && setTimeout(e, 0)); "SELECT" == b.tagName && 0 < b.length && D(b, d, r) } 
}; a.c.options = { update: function (b, c, d) {
    "SELECT" != b.tagName && l(Error("options binding applies only to SELECT elements")); var e = 0 == b.length, f = a.a.U(a.a.aa(b.childNodes, function (a) {
        return a.tagName &&
"OPTION" == a.tagName && a.selected
    }), function (b) { return a.h.p(b) || b.innerText || b.textContent }), h = b.scrollTop; b.scrollTop = 0; for (var g = a.a.d(c()); 0 < b.length; ) a.K(b.options[0]), b.remove(0); if (g) {
        d = d(); "number" != typeof g.length && (g = [g]); if (d.optionsCaption) { var i = document.createElement("OPTION"); a.a.Z(i, d.optionsCaption); a.h.T(i, m); b.appendChild(i) } for (var c = 0, j = g.length; c < j; c++) {
            var i = document.createElement("OPTION"), k = "string" == typeof d.optionsValue ? g[c][d.optionsValue] : g[c], k = a.a.d(k); a.h.T(i, k); var n =
d.optionsText, k = "function" == typeof n ? n(g[c]) : "string" == typeof n ? g[c][n] : k; if (k === p || k === m) k = ""; a.a.Na(i, k); b.appendChild(i)
        } g = b.getElementsByTagName("OPTION"); c = i = 0; for (j = g.length; c < j; c++) 0 <= a.a.i(f, a.h.p(g[c])) && (a.a.Ma(g[c], o), i++); if (h) b.scrollTop = h; e && "value" in d && D(b, a.a.d(d.value), o)
    } 
} 
}; a.c.options.la = "__ko.optionValueDomData__"; a.c.selectedOptions = { Ea: function (b) { for (var c = [], b = b.childNodes, d = 0, e = b.length; d < e; d++) { var f = b[d]; "OPTION" == f.tagName && f.selected && c.push(a.h.p(f)) } return c }, init: function (b,
c, d) { a.a.s(b, "change", function () { var b = c(); a.Q(b) ? b(a.c.selectedOptions.Ea(this)) : (b = d(), b._ko_property_writers && b._ko_property_writers.value && b._ko_property_writers.value(a.c.selectedOptions.Ea(this))) }) }, update: function (b, c) { "SELECT" != b.tagName && l(Error("values binding applies only to SELECT elements")); var d = a.a.d(c()); if (d && "number" == typeof d.length) for (var e = b.childNodes, f = 0, h = e.length; f < h; f++) { var g = e[f]; "OPTION" == g.tagName && a.a.Ma(g, 0 <= a.a.i(d, a.h.p(g))) } } 
}; a.c.text = { update: function (b, c) {
    a.a.Na(b,
c())
} 
}; a.c.html = { init: function () { return { controlsDescendantBindings: o} }, update: function (b, c) { var d = a.a.d(c()); a.a.Z(b, d) } }; a.c.css = { update: function (b, c) { var d = a.a.d(c() || {}), e; for (e in d) if ("string" == typeof e) { var f = a.a.d(d[e]); a.a.Ra(b, e, f) } } }; a.c.style = { update: function (b, c) { var d = a.a.d(c() || {}), e; for (e in d) if ("string" == typeof e) { var f = a.a.d(d[e]); b.style[e] = f || "" } } }; a.c.uniqueName = { init: function (b, c) {
    if (c()) b.name = "ko_unique_" + ++a.c.uniqueName.cb, (a.a.rb || a.a.sb) && b.mergeAttributes(document.createElement("<input name='" +
b.name + "'/>"), r)
} 
}; a.c.uniqueName.cb = 0; a.c.checked = { init: function (b, c, d) {
    a.a.s(b, "click", function () { var e; if ("checkbox" == b.type) e = b.checked; else if ("radio" == b.type && b.checked) e = b.value; else return; var f = c(); "checkbox" == b.type && a.a.d(f) instanceof Array ? (e = a.a.i(a.a.d(f), b.value), b.checked && 0 > e ? f.push(b.value) : !b.checked && 0 <= e && f.splice(e, 1)) : a.Q(f) ? f() !== e && f(e) : (f = d(), f._ko_property_writers && f._ko_property_writers.checked && f._ko_property_writers.checked(e)) }); "radio" == b.type && !b.name && a.c.uniqueName.init(b,
B(o))
}, update: function (b, c) { var d = a.a.d(c()); if ("checkbox" == b.type) b.checked = d instanceof Array ? 0 <= a.a.i(d, b.value) : d; else if ("radio" == b.type) b.checked = b.value == d } 
}; a.c.attr = { update: function (b, c) { var d = a.a.d(c()) || {}, e; for (e in d) if ("string" == typeof e) { var f = a.a.d(d[e]); f === r || f === p || f === m ? b.removeAttribute(e) : b.setAttribute(e, f.toString()) } } }; a.c.hasfocus = { init: function (b, c, d) {
    function e(b) { var e = c(); b != a.a.d(e) && (a.Q(e) ? e(b) : (e = d(), e._ko_property_writers && e._ko_property_writers.hasfocus && e._ko_property_writers.hasfocus(b))) }
    a.a.s(b, "focus", function () { e(o) }); a.a.s(b, "focusin", function () { e(o) }); a.a.s(b, "blur", function () { e(r) }); a.a.s(b, "focusout", function () { e(r) })
}, update: function (b, c) { var d = a.a.d(c()); d ? b.focus() : b.blur(); a.a.ta(b, d ? "focusin" : "focusout") } 
}; a.c["with"] = { n: function (b) { return function () { var c = b(); return { "if": c, data: c, templateEngine: a.o.L} } }, init: function (b, c) { return a.c.template.init(b, a.c["with"].n(c)) }, update: function (b, c, d, e, f) { return a.c.template.update(b, a.c["with"].n(c), d, e, f) } }; a.k.C["with"] = r; a.g.B["with"] =
o; a.c["if"] = { n: function (b) { return function () { return { "if": b(), templateEngine: a.o.L} } }, init: function (b, c) { return a.c.template.init(b, a.c["if"].n(c)) }, update: function (b, c, d, e, f) { return a.c.template.update(b, a.c["if"].n(c), d, e, f) } }; a.k.C["if"] = r; a.g.B["if"] = o; a.c.ifnot = { n: function (b) { return function () { return { ifnot: b(), templateEngine: a.o.L} } }, init: function (b, c) { return a.c.template.init(b, a.c.ifnot.n(c)) }, update: function (b, c, d, e, f) { return a.c.template.update(b, a.c.ifnot.n(c), d, e, f) } }; a.k.C.ifnot = r; a.g.B.ifnot =
o; a.c.foreach = { n: function (b) { return function () { var c = a.a.d(b()); return !c || "number" == typeof c.length ? { foreach: c, templateEngine: a.o.L} : { foreach: c.data, includeDestroyed: c.includeDestroyed, afterAdd: c.afterAdd, beforeRemove: c.beforeRemove, afterRender: c.afterRender, templateEngine: a.o.L} } }, init: function (b, c) { return a.c.template.init(b, a.c.foreach.n(c)) }, update: function (b, c, d, e, f) { return a.c.template.update(b, a.c.foreach.n(c), d, e, f) } }; a.k.C.foreach = r; a.g.B.foreach = o; a.b("allowedVirtualElementBindings", a.g.B);
        a.t = function () { }; a.t.prototype.renderTemplateSource = function () { l(Error("Override renderTemplateSource")) }; a.t.prototype.createJavaScriptEvaluatorBlock = function () { l(Error("Override createJavaScriptEvaluatorBlock")) }; a.t.prototype.makeTemplateSource = function (b) { if ("string" == typeof b) { var c = document.getElementById(b); c || l(Error("Cannot find template with ID " + b)); return new a.m.f(c) } if (1 == b.nodeType || 8 == b.nodeType) return new a.m.N(b); l(Error("Unknown template type: " + b)) }; a.t.prototype.renderTemplate =
function (a, c, d) { return this.renderTemplateSource(this.makeTemplateSource(a), c, d) }; a.t.prototype.isTemplateRewritten = function (a) { return this.allowTemplateRewriting === r ? o : this.X && this.X[a] ? o : this.makeTemplateSource(a).data("isRewritten") }; a.t.prototype.rewriteTemplate = function (a, c) { var d = this.makeTemplateSource(a), e = c(d.text()); d.text(e); d.data("isRewritten", o); if ("string" == typeof a) this.X = this.X || {}, this.X[a] = o }; a.b("templateEngine", a.t); a.$ = function () {
    function b(b, c, d) {
        for (var b = a.k.Y(b), g = a.k.C,
i = 0; i < b.length; i++) { var j = b[i].key; if (g.hasOwnProperty(j)) { var k = g[j]; "function" === typeof k ? (j = k(b[i].value)) && l(Error(j)) : k || l(Error("This template engine does not support the '" + j + "' binding within its templates")) } } b = "ko.templateRewriting.applyMemoizedBindingsToNextSibling(function() {             return (function() { return { " + a.k.ia(b) + " } })()         })"; return d.createJavaScriptEvaluatorBlock(b) + c
    } var c = /(<[a-z]+\d*(\s+(?!data-bind=)[a-z0-9\-]+(=(\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind=(["'])([\s\S]*?)\5/gi,
d = /<\!--\s*ko\b\s*([\s\S]*?)\s*--\>/g; return { kb: function (b, c) { c.isTemplateRewritten(b) || c.rewriteTemplate(b, function (b) { return a.$.xb(b, c) }) }, xb: function (a, f) { return a.replace(c, function (a, c, e, d, k, n, t) { return b(t, c, f) }).replace(d, function (a, c) { return b(c, "<\!-- ko --\>", f) }) }, Wa: function (b) { return a.r.ka(function (c, d) { c.nextSibling && a.xa(c.nextSibling, b, d) }) } }
} (); a.b("templateRewriting", a.$); a.b("templateRewriting.applyMemoizedBindingsToNextSibling", a.$.Wa); (function () {
    a.m = {}; a.m.f = function (a) {
        this.f =
a
    }; a.m.f.prototype.text = function () { if (0 == arguments.length) return "script" == this.f.tagName.toLowerCase() ? this.f.text : this.f.innerHTML; var b = arguments[0]; "script" == this.f.tagName.toLowerCase() ? this.f.text = b : a.a.Z(this.f, b) }; a.m.f.prototype.data = function (b) { if (1 === arguments.length) return a.a.e.get(this.f, "templateSourceData_" + b); a.a.e.set(this.f, "templateSourceData_" + b, arguments[1]) }; a.m.N = function (a) { this.f = a }; a.m.N.prototype = new a.m.f; a.m.N.prototype.text = function () {
        if (0 == arguments.length) {
            var b = a.a.e.get(this.f,
"__ko_anon_template__") || {}; if (b.sa === m && b.da) b.sa = b.da.innerHTML; return b.sa
        } a.a.e.set(this.f, "__ko_anon_template__", { sa: arguments[0] })
    }; a.m.f.prototype.nodes = function () { if (0 == arguments.length) return (a.a.e.get(this.f, "__ko_anon_template__") || {}).da; a.a.e.set(this.f, "__ko_anon_template__", { da: arguments[0] }) }; a.b("templateSources", a.m); a.b("templateSources.domElement", a.m.f); a.b("templateSources.anonymousTemplate", a.m.N)
})(); (function () {
    function b(a, b, c) {
        for (var d = 0; node = a[d]; d++) node.parentNode ===
b && (1 === node.nodeType || 8 === node.nodeType) && c(node)
    } function c(b, c, h, g, i) {
        var i = i || {}, j = i.templateEngine || d; a.$.kb(h, j); h = j.renderTemplate(h, g, i); ("number" != typeof h.length || 0 < h.length && "number" != typeof h[0].nodeType) && l(Error("Template engine must return an array of DOM nodes")); j = r; switch (c) { case "replaceChildren": a.g.oa(b, h); j = o; break; case "replaceNode": a.a.Ka(b, h); j = o; break; case "ignoreTargetNode": break; default: l(Error("Unknown renderMode: " + c)) } j && (a.ua(h, g), i.afterRender && i.afterRender(h, g.$data));
        return h
    } var d; a.pa = function (b) { b != m && !(b instanceof a.t) && l(Error("templateEngine must inherit from ko.templateEngine")); d = b }; a.ua = function (c, d) { var h = a.a.H([], c), g = 0 < c.length ? c[0].parentNode : p; b(h, g, function (b) { a.wa(d, b) }); b(h, g, function (b) { a.r.Ta(b, [d]) }) }; a.na = function (b, f, h, g, i) {
        h = h || {}; (h.templateEngine || d) == m && l(Error("Set a template engine before calling renderTemplate")); i = i || "replaceChildren"; if (g) {
            var j = g.nodeType ? g : 0 < g.length ? g[0] : p; return new a.j(function () {
                var d = f && f instanceof a.I ?
f : new a.I(a.a.d(f)), n = "function" == typeof b ? b(d.$data) : b, d = c(g, i, n, d, h); "replaceNode" == i && (g = d, j = g.nodeType ? g : 0 < g.length ? g[0] : p)
            }, p, { disposeWhen: function () { return !j || !a.a.ga(j) }, disposeWhenNodeIsRemoved: j && "replaceNode" == i ? j.parentNode : j })
        } return a.r.ka(function (c) { a.na(b, f, h, c, "replaceNode") })
    }; a.Eb = function (b, d, h, g, i) {
        function j(b, c) { var d = k(b); a.ua(c, d); h.afterRender && h.afterRender(c, d.$data) } function k(b) { return i.createChildContext(a.a.d(b)) } return new a.j(function () {
            var i = a.a.d(d) || []; "undefined" ==
typeof i.length && (i = [i]); i = a.a.aa(i, function (b) { return h.includeDestroyed || b === m || b === p || !a.a.d(b._destroy) }); a.a.La(g, i, function (a) { var d = "function" == typeof b ? b(a) : b; return c(p, "ignoreTargetNode", d, k(a), h) }, h, j)
        }, p, { disposeWhenNodeIsRemoved: g })
    }; a.c.template = { init: function (b, c) { var d = a.a.d(c()); if ("string" != typeof d && !d.name && (1 == b.nodeType || 8 == b.nodeType)) d = 1 == b.nodeType ? b.childNodes : a.g.childNodes(b), d = a.a.yb(d), (new a.m.N(b)).nodes(d); return { controlsDescendantBindings: o} }, update: function (b, c,
d, g, i) { c = a.a.d(c()); g = o; "string" == typeof c ? d = c : (d = c.name, "if" in c && (g = g && a.a.d(c["if"])), "ifnot" in c && (g = g && !a.a.d(c.ifnot))); var j = p; "object" === typeof c && "foreach" in c ? j = a.Eb(d || b, g && c.foreach || [], c, b, i) : g ? (i = "object" == typeof c && "data" in c ? i.createChildContext(a.a.d(c.data)) : i, j = a.na(d || b, i, c, b)) : a.g.Aa(b); i = j; (c = a.a.e.get(b, "__ko__templateSubscriptionDomDataKey__")) && "function" == typeof c.z && c.z(); a.a.e.set(b, "__ko__templateSubscriptionDomDataKey__", i) } 
    }; a.k.C.template = function (b) {
        b = a.k.Y(b); return 1 ==
b.length && b[0].unknown ? p : a.k.ub(b, "name") ? p : "This template engine does not support anonymous templates nested within its templates"
    }; a.g.B.template = o
})(); a.b("setTemplateEngine", a.pa); a.b("renderTemplate", a.na); (function () {
    a.a.O = function (b, c, d) {
        if (d === m) return a.a.O(b, c, 1) || a.a.O(b, c, 10) || a.a.O(b, c, Number.MAX_VALUE); for (var b = b || [], c = c || [], e = b, f = c, h = [], g = 0; g <= f.length; g++) h[g] = []; for (var g = 0, i = Math.min(e.length, d); g <= i; g++) h[0][g] = g; g = 1; for (i = Math.min(f.length, d); g <= i; g++) h[g][0] = g; for (var i = e.length,
j, k = f.length, g = 1; g <= i; g++) { j = Math.max(1, g - d); for (var n = Math.min(k, g + d); j <= n; j++) h[j][g] = e[g - 1] === f[j - 1] ? h[j - 1][g - 1] : Math.min(h[j - 1][g] === m ? Number.MAX_VALUE : h[j - 1][g] + 1, h[j][g - 1] === m ? Number.MAX_VALUE : h[j][g - 1] + 1) } d = b.length; e = c.length; f = []; g = h[e][d]; if (g === m) h = p; else {
            for (; 0 < d || 0 < e; ) {
                i = h[e][d]; k = 0 < e ? h[e - 1][d] : g + 1; n = 0 < d ? h[e][d - 1] : g + 1; j = 0 < e && 0 < d ? h[e - 1][d - 1] : g + 1; if (k === m || k < i - 1) k = g + 1; if (n === m || n < i - 1) n = g + 1; j < i - 1 && (j = g + 1); k <= n && k < j ? (f.push({ status: "added", value: c[e - 1] }), e--) : (n < k && n < j ? f.push({ status: "deleted",
                    value: b[d - 1]
                }) : (f.push({ status: "retained", value: b[d - 1] }), e--), d--)
            } h = f.reverse()
        } return h
    } 
})(); a.b("utils.compareArrays", a.a.O); (function () {
    function b(a) { if (2 < a.length) { for (var b = a[0], c = a[a.length - 1], h = [b]; b !== c; ) { b = b.nextSibling; if (!b) return; h.push(b) } Array.prototype.splice.apply(a, [0, a.length].concat(h)) } } function c(c, e, f, h) {
        var g = [], c = a.j(function () { var c = e(f) || []; 0 < g.length && (b(g), a.a.Ka(g, c), h && h(f, c)); g.splice(0, g.length); a.a.H(g, c) }, p, { disposeWhenNodeIsRemoved: c, disposeWhen: function () {
            return 0 ==
g.length || !a.a.ga(g[0])
        } 
        }); return { vb: g, j: c}
    } a.a.La = function (d, e, f, h, g) {
        for (var e = e || [], h = h || {}, i = a.a.e.get(d, "setDomNodeChildrenFromArrayMapping_lastMappingResult") === m, j = a.a.e.get(d, "setDomNodeChildrenFromArrayMapping_lastMappingResult") || [], k = a.a.U(j, function (a) { return a.Xa }), n = a.a.O(k, e), e = [], t = 0, s = [], k = [], w = p, q = 0, u = n.length; q < u; q++) switch (n[q].status) {
            case "retained": var y = j[t]; e.push(y); 0 < y.P.length && (w = y.P[y.P.length - 1]); t++; break; case "deleted": j[t].j.z(); b(j[t].P); a.a.q(j[t].P, function (a) {
                s.push({ element: a,
                    index: q, value: n[q].value
                }); w = a
            }); t++; break; case "added": var y = n[q].value, z = c(d, f, y, g), v = z.vb; e.push({ Xa: n[q].value, P: v, j: z.j }); for (var z = 0, A = v.length; z < A; z++) { var x = v[z]; k.push({ element: x, index: q, value: n[q].value }); w == p ? a.g.Bb(d, x) : a.g.pb(d, x, w); w = x } g && g(y, v)
        } a.a.q(s, function (b) { a.K(b.element) }); f = r; if (!i) { if (h.afterAdd) for (q = 0; q < k.length; q++) h.afterAdd(k[q].element, k[q].index, k[q].value); if (h.beforeRemove) { for (q = 0; q < s.length; q++) h.beforeRemove(s[q].element, s[q].index, s[q].value); f = o } } f || a.a.q(s,
function (b) { a.removeNode(b.element) }); a.a.e.set(d, "setDomNodeChildrenFromArrayMapping_lastMappingResult", e)
    } 
})(); a.b("utils.setDomNodeChildrenFromArrayMapping", a.a.La); a.o = function () { this.allowTemplateRewriting = r }; a.o.prototype = new a.t; a.o.prototype.renderTemplateSource = function (b) { var c = !(9 > a.a.ob) && b.nodes ? b.nodes() : p; if (c) return a.a.M(c.cloneNode(o).childNodes); b = b.text(); return a.a.ma(b) }; a.o.L = new a.o; a.pa(a.o.L); a.b("nativeTemplateEngine", a.o); (function () {
    a.ja = function () {
        var a = this.tb = function () {
            if ("undefined" ==
typeof jQuery || !jQuery.tmpl) return 0; try { if (0 <= jQuery.tmpl.tag.tmpl.open.toString().indexOf("__")) return 2 } catch (a) { } return 1
        } (); this.renderTemplateSource = function (b, e, f) {
            f = f || {}; 2 > a && l(Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.")); var h = b.data("precompiled"); h || (h = b.text() || "", h = jQuery.template(p, "{{ko_with $item.koBindingContext}}" + h + "{{/ko_with}}"), b.data("precompiled", h)); b = [e.$data]; e = jQuery.extend({ koBindingContext: e }, f.templateOptions); e =
jQuery.tmpl(h, b, e); e.appendTo(document.createElement("div")); jQuery.fragments = {}; return e
        }; this.createJavaScriptEvaluatorBlock = function (a) { return "{{ko_code ((function() { return " + a + " })()) }}" }; this.addTemplate = function (a, b) { document.write("<script type='text/html' id='" + a + "'>" + b + "<\/script>") }; if (0 < a) jQuery.tmpl.tag.ko_code = { open: "__.push($1 || '');" }, jQuery.tmpl.tag.ko_with = { open: "with($1) {", close: "} "}
    }; a.ja.prototype = new a.t; var b = new a.ja; 0 < b.tb && a.pa(b); a.b("jqueryTmplTemplateEngine", a.ja)
})()
    }
    "function" === typeof require && "object" === typeof exports && "object" === typeof module ? C(module.exports || exports) : "function" === typeof define && define.amd ? define(["exports"], C) : C(window.ko = {});
})(window, document, navigator);