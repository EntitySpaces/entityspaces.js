// Knockout JavaScript library v2.1.0pre
// (c) Steven Sanderson - http://knockoutjs.com/
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

(function (window, document, navigator, undefined) {
    function l(x) { throw x; } var m = void 0, o = !0, p = null, q = !1;
    function B(x) {
        function D(a, c) { a && "object" == typeof a ? c = a : (c = c || {}, c.read = a || c.read); "function" != typeof c.read && l("Pass a function that returns the value of the dependentObservable"); return c } function C(b, c, d) { d && c !== a.h.q(b) && a.h.S(b, c); c !== a.h.q(b) && a.a.sa(b, "change") } var a = "undefined" !== typeof x ? x : {}; a.b = function (b, c) { for (var d = b.split("."), e = a, f = 0; f < d.length - 1; f++) e = e[d[f]]; e[d[d.length - 1]] = c }; a.l = function (a, c, d) { a[c] = d }; a.version = "2.1.0pre"; a.b("version", a.version); a.a = new function () {
            function b(a,
b) { if ("INPUT" != a.tagName || !a.type) return q; if ("click" != b.toLowerCase()) return q; var e = a.type.toLowerCase(); return "checkbox" == e || "radio" == e } var c = /^(\s|\u00A0)+|(\s|\u00A0)+$/g, d = {}, e = {}; d[/Firefox\/2/i.test(navigator.userAgent) ? "KeyboardEvent" : "UIEvents"] = ["keyup", "keydown", "keypress"]; d.MouseEvents = "click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave".split(","); for (var f in d) { var h = d[f]; if (h.length) for (var g = 0, i = h.length; g < i; g++) e[h[g]] = f } var j = function () {
    for (var a =
3, b = document.createElement("div"), e = b.getElementsByTagName("i"); b.innerHTML = "<\!--[if gt IE " + ++a + "]><i></i><![endif]--\>", e[0]; ); return 4 < a ? a : m
} (); return { Ba: ["authenticity_token", /^__RequestVerificationToken(_.*)?$/], n: function (a, b) { for (var e = 0, c = a.length; e < c; e++) b(a[e]) }, k: function (a, b) { if ("function" == typeof Array.prototype.indexOf) return Array.prototype.indexOf.call(a, b); for (var e = 0, c = a.length; e < c; e++) if (a[e] === b) return e; return -1 }, Wa: function (a, b, e) {
    for (var c = 0, f = a.length; c < f; c++) if (b.call(e,
a[c])) return a[c]; return p
}, ca: function (b, e) { var c = a.a.k(b, e); 0 <= c && b.splice(c, 1) }, ya: function (b) { for (var b = b || [], e = [], c = 0, f = b.length; c < f; c++) 0 > a.a.k(e, b[c]) && e.push(b[c]); return e }, ba: function (a, b) { for (var a = a || [], e = [], c = 0, f = a.length; c < f; c++) e.push(b(a[c])); return e }, aa: function (a, b) { for (var a = a || [], e = [], c = 0, f = a.length; c < f; c++) b(a[c]) && e.push(a[c]); return e }, J: function (a, b) { for (var e = 0, c = b.length; e < c; e++) a.push(b[e]); return a }, extend: function (a, b) {
    for (var e in b) b.hasOwnProperty(e) && (a[e] = b[e]);
    return a
}, U: function (b) { for (; b.firstChild; ) a.removeNode(b.firstChild) }, oa: function (b, e) { a.a.U(b); e && a.a.n(e, function (a) { b.appendChild(a) }) }, Ja: function (b, e) { var c = b.nodeType ? [b] : b; if (0 < c.length) { for (var f = c[0], d = f.parentNode, h = 0, g = e.length; h < g; h++) d.insertBefore(e[h], f); h = 0; for (g = c.length; h < g; h++) a.removeNode(c[h]) } }, La: function (a, b) { 0 <= navigator.userAgent.indexOf("MSIE 6") ? a.setAttribute("selected", b) : a.selected = b }, z: function (a) { return (a || "").replace(c, "") }, Eb: function (b, e) {
    for (var c = [], f = (b || "").split(e),
d = 0, h = f.length; d < h; d++) { var g = a.a.z(f[d]); "" !== g && c.push(g) } return c
}, Db: function (a, b) { a = a || ""; return b.length > a.length ? q : a.substring(0, b.length) === b }, Za: function (a, b) { for (var e = "return (" + a + ")", c = 0; c < b; c++) e = "with(sc[" + c + "]) { " + e + " } "; return new Function("sc", e) }, hb: function (a, b) { if (b.compareDocumentPosition) return 16 == (b.compareDocumentPosition(a) & 16); for (; a != p; ) { if (a == b) return o; a = a.parentNode } return q }, ga: function (b) { return a.a.hb(b, document) }, s: function (a, e, c) {
    if ("undefined" != typeof jQuery) {
        if (b(a,
e)) var f = c, c = function (a, b) { var e = this.checked; if (b) this.checked = b.$a !== o; f.call(this, a); this.checked = e }; jQuery(a).bind(e, c)
    } else "function" == typeof a.addEventListener ? a.addEventListener(e, c, q) : "undefined" != typeof a.attachEvent ? a.attachEvent("on" + e, function (b) { c.call(a, b) }) : l(Error("Browser doesn't support addEventListener or attachEvent"))
}, sa: function (a, c) {
    (!a || !a.nodeType) && l(Error("element must be a DOM node when calling triggerEvent")); if ("undefined" != typeof jQuery) {
        var f = []; b(a, c) && f.push({ $a: a.checked });
        jQuery(a).trigger(c, f)
    } else if ("function" == typeof document.createEvent) "function" == typeof a.dispatchEvent ? (f = document.createEvent(e[c] || "HTMLEvents"), f.initEvent(c, o, o, window, 0, 0, 0, 0, 0, q, q, q, q, 0, a), a.dispatchEvent(f)) : l(Error("The supplied element doesn't support dispatchEvent")); else if ("undefined" != typeof a.fireEvent) { if ("click" == c && "INPUT" == a.tagName && ("checkbox" == a.type.toLowerCase() || "radio" == a.type.toLowerCase())) a.checked = a.checked !== o; a.fireEvent("on" + c) } else l(Error("Browser doesn't support triggering events"))
},
    d: function (b) { return a.V(b) ? b() : b }, gb: function (b, e) { return 0 <= a.a.k((b.className || "").split(/\s+/), e) }, Qa: function (b, e, c) { var f = a.a.gb(b, e); if (c && !f) b.className = (b.className || "") + " " + e; else if (f && !c) { for (var c = (b.className || "").split(/\s+/), f = "", d = 0; d < c.length; d++) c[d] != e && (f += c[d] + " "); b.className = a.a.z(f) } }, outerHTML: function (a) { if (j === m) { var b = a.outerHTML; if ("string" == typeof b) return b } b = window.document.createElement("div"); b.appendChild(a.cloneNode(o)); return b.innerHTML }, Ma: function (b, e) {
        var c =
a.a.d(e); if (c === p || c === m) c = ""; "innerText" in b ? b.innerText = c : b.textContent = c; if (9 <= j) b.style.display = b.style.display
    }, zb: function (b, e) { for (var b = a.a.d(b), e = a.a.d(e), c = [], f = b; f <= e; f++) c.push(f); return c }, X: function (a) { for (var b = [], e = 0, c = a.length; e < c; e++) b.push(a[e]); return b }, pb: 6 === j, qb: 7 === j, Ca: function (b, e) {
        for (var c = a.a.X(b.getElementsByTagName("INPUT")).concat(a.a.X(b.getElementsByTagName("TEXTAREA"))), f = "string" == typeof e ? function (a) { return a.name === e } : function (a) { return e.test(a.name) }, d = [],
h = c.length - 1; 0 <= h; h--) f(c[h]) && d.push(c[h]); return d
    }, wb: function (b) { return "string" == typeof b && (b = a.a.z(b)) ? window.JSON && window.JSON.parse ? window.JSON.parse(b) : (new Function("return " + b))() : p }, qa: function (b) { ("undefined" == typeof JSON || "undefined" == typeof JSON.stringify) && l(Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js")); return JSON.stringify(a.a.d(b)) },
    xb: function (b, e, c) {
        var c = c || {}, f = c.params || {}, d = c.includeFields || this.Ba, h = b; if ("object" == typeof b && "FORM" == b.tagName) for (var h = b.action, g = d.length - 1; 0 <= g; g--) for (var j = a.a.Ca(b, d[g]), i = j.length - 1; 0 <= i; i--) f[j[i].name] = j[i].value; var e = a.a.d(e), u = document.createElement("FORM"); u.style.display = "none"; u.action = h; u.method = "post"; for (var z in e) b = document.createElement("INPUT"), b.name = z, b.value = a.a.qa(a.a.d(e[z])), u.appendChild(b); for (z in f) b = document.createElement("INPUT"), b.name = z, b.value = f[z], u.appendChild(b);
        document.body.appendChild(u); c.submitter ? c.submitter(u) : u.submit(); setTimeout(function () { u.parentNode.removeChild(u) }, 0)
    } 
}
        }; a.b("utils", a.a); a.b("utils.arrayForEach", a.a.n); a.b("utils.arrayFirst", a.a.Wa); a.b("utils.arrayFilter", a.a.aa); a.b("utils.arrayGetDistinctValues", a.a.ya); a.b("utils.arrayIndexOf", a.a.k); a.b("utils.arrayMap", a.a.ba); a.b("utils.arrayPushAll", a.a.J); a.b("utils.arrayRemoveItem", a.a.ca); a.b("utils.extend", a.a.extend); a.b("utils.fieldsIncludedWithJsonPost", a.a.Ba); a.b("utils.getFormFields",
a.a.Ca); a.b("utils.postJson", a.a.xb); a.b("utils.parseJson", a.a.wb); a.b("utils.registerEventHandler", a.a.s); a.b("utils.stringifyJson", a.a.qa); a.b("utils.range", a.a.zb); a.b("utils.toggleDomNodeCssClass", a.a.Qa); a.b("utils.triggerEvent", a.a.sa); a.b("utils.unwrapObservable", a.a.d); Function.prototype.bind || (Function.prototype.bind = function (a) { var c = this, d = Array.prototype.slice.call(arguments), a = d.shift(); return function () { return c.apply(a, d.concat(Array.prototype.slice.call(arguments))) } }); a.a.e = new function () {
    var b =
0, c = "__ko__" + (new Date).getTime(), d = {}; return { get: function (b, c) { var d = a.a.e.getAll(b, q); return d === m ? m : d[c] }, set: function (b, c, d) { d === m && a.a.e.getAll(b, q) === m || (a.a.e.getAll(b, o)[c] = d) }, getAll: function (a, f) { var h = a[c]; if (!(h && "null" !== h)) { if (!f) return; h = a[c] = "ko" + b++; d[h] = {} } return d[h] }, clear: function (a) { var b = a[c]; b && (delete d[b], a[c] = p) } }
}; a.b("utils.domData", a.a.e); a.b("utils.domData.clear", a.a.e.clear); a.a.A = new function () {
    function b(b, c) {
        var h = a.a.e.get(b, d); h === m && c && (h = [], a.a.e.set(b, d, h));
        return h
    } function c(e) { var c = b(e, q); if (c) for (var c = c.slice(0), d = 0; d < c.length; d++) c[d](e); a.a.e.clear(e); "function" == typeof jQuery && "function" == typeof jQuery.cleanData && jQuery.cleanData([e]) } var d = "__ko_domNodeDisposal__" + (new Date).getTime(); return { va: function (a, c) { "function" != typeof c && l(Error("Callback must be a function")); b(a, o).push(c) }, Ia: function (e, c) { var h = b(e, q); h && (a.a.ca(h, c), 0 == h.length && a.a.e.set(e, d, m)) }, F: function (b) {
        if (!(1 != b.nodeType && 9 != b.nodeType)) {
            c(b); var f = []; a.a.J(f, b.getElementsByTagName("*"));
            for (var b = 0, d = f.length; b < d; b++) c(f[b])
        } 
    }, removeNode: function (b) { a.F(b); b.parentNode && b.parentNode.removeChild(b) } 
    }
}; a.F = a.a.A.F; a.removeNode = a.a.A.removeNode; a.b("cleanNode", a.F); a.b("removeNode", a.removeNode); a.b("utils.domNodeDisposal", a.a.A); a.b("utils.domNodeDisposal.addDisposeCallback", a.a.A.va); a.b("utils.domNodeDisposal.removeDisposeCallback", a.a.A.Ia); (function () {
    a.a.ma = function (b) {
        var c; if ("undefined" != typeof jQuery) {
            if ((c = jQuery.clean([b])) && c[0]) {
                for (b = c[0]; b.parentNode && 11 !== b.parentNode.nodeType; ) b =
b.parentNode; b.parentNode && b.parentNode.removeChild(b)
            } 
        } else { var d = a.a.z(b).toLowerCase(); c = document.createElement("div"); d = d.match(/^<(thead|tbody|tfoot)/) && [1, "<table>", "</table>"] || !d.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"] || (!d.indexOf("<td") || !d.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"] || [0, "", ""]; b = "ignored<div>" + d[1] + b + d[2] + "</div>"; for ("function" == typeof window.innerShiv ? c.appendChild(window.innerShiv(b)) : c.innerHTML = b; d[0]--; ) c = c.lastChild; c = a.a.X(c.lastChild.childNodes) } return c
    };
    a.a.Z = function (b, c) { a.a.U(b); if (c !== p && c !== m) if ("string" != typeof c && (c = c.toString()), "undefined" != typeof jQuery) jQuery(b).html(c); else for (var d = a.a.ma(c), e = 0; e < d.length; e++) b.appendChild(d[e]) } 
})(); a.b("utils.parseHtmlFragment", a.a.ma); a.b("utils.setHtml", a.a.Z); a.r = function () {
    function b() { return (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1) } function c(b, f) {
        if (b) if (8 == b.nodeType) { var d = a.r.Ga(b.nodeValue); d != p && f.push({ fb: b, ub: d }) } else if (1 == b.nodeType) for (var d = 0, g = b.childNodes, i = g.length; d <
i; d++) c(g[d], f)
    } var d = {}; return { ka: function (a) { "function" != typeof a && l(Error("You can only pass a function to ko.memoization.memoize()")); var c = b() + b(); d[c] = a; return "<\!--[ko_memo:" + c + "]--\>" }, Ra: function (a, b) { var c = d[a]; c === m && l(Error("Couldn't find any memo with ID " + a + ". Perhaps it's already been unmemoized.")); try { return c.apply(p, b || []), o } finally { delete d[a] } }, Sa: function (b, f) {
        var d = []; c(b, d); for (var g = 0, i = d.length; g < i; g++) {
            var j = d[g].fb, k = [j]; f && a.a.J(k, f); a.r.Ra(d[g].ub, k); j.nodeValue = ""; j.parentNode &&
j.parentNode.removeChild(j)
        } 
    }, Ga: function (a) { return (a = a.match(/^\[ko_memo\:(.*?)\]$/)) ? a[1] : p } 
    }
} (); a.b("memoization", a.r); a.b("memoization.memoize", a.r.ka); a.b("memoization.unmemoize", a.r.Ra); a.b("memoization.parseMemoText", a.r.Ga); a.b("memoization.unmemoizeDomNodeAndDescendants", a.r.Sa); a.Aa = { throttle: function (b, c) { b.throttleEvaluation = c; var d = p; return a.i({ read: b, write: function (a) { clearTimeout(d); d = setTimeout(function () { b(a) }, c) } }) }, notify: function (b, c) {
    b.equalityComparer = "always" == c ? function () { return q } :
a.w.fn.equalityComparer; return b
} 
}; a.b("extenders", a.Aa); a.Oa = function (b, c) { this.da = b; this.eb = c; a.l(this, "dispose", this.v) }; a.Oa.prototype.v = function () { this.ob = o; this.eb() }; a.R = function () { this.u = {}; a.a.extend(this, a.R.fn); a.l(this, "subscribe", this.ra); a.l(this, "extend", this.extend); a.l(this, "getSubscriptionsCount", this.lb) }; a.R.fn = { ra: function (b, c, d) { var d = d || "change", b = c ? b.bind(c) : b, e = new a.Oa(b, function () { a.a.ca(this.u[d], e) } .bind(this)); this.u[d] || (this.u[d] = []); this.u[d].push(e); return e }, notifySubscribers: function (b,
c) { c = c || "change"; this.u[c] && a.a.n(this.u[c].slice(0), function (a) { a && a.ob !== o && a.da(b) }) }, lb: function () { var a = 0, c; for (c in this.u) this.u.hasOwnProperty(c) && (a += this.u[c].length); return a }, extend: function (b) { var c = this; if (b) for (var d in b) { var e = a.Aa[d]; "function" == typeof e && (c = e(c, b[d])) } return c } 
}; a.Ea = function (a) { return "function" == typeof a.ra && "function" == typeof a.notifySubscribers }; a.b("subscribable", a.R); a.b("isSubscribable", a.Ea); a.T = function () {
    var b = []; return { Xa: function (a) { b.push({ da: a, za: [] }) },
        end: function () { b.pop() }, Ha: function (c) { a.Ea(c) || l("Only subscribable things can act as dependencies"); if (0 < b.length) { var d = b[b.length - 1]; 0 <= a.a.k(d.za, c) || (d.za.push(c), d.da(c)) } } 
    }
} (); var E = { undefined: o, "boolean": o, number: o, string: o }; a.w = function (b) {
    function c() { if (0 < arguments.length) { if (!c.equalityComparer || !c.equalityComparer(d, arguments[0])) c.H(), d = arguments[0], c.G(); return this } a.T.Ha(c); return d } var d = b; a.R.call(c); c.G = function () { c.notifySubscribers(d) }; c.H = function () { c.notifySubscribers(d, "beforeChange") };
    a.a.extend(c, a.w.fn); a.l(c, "valueHasMutated", c.G); a.l(c, "valueWillMutate", c.H); return c
}; a.w.fn = { B: a.w, equalityComparer: function (a, c) { return a === p || typeof a in E ? a === c : q } }; a.V = function (b) { return b === p || b === m || b.B === m ? q : b.B === a.w ? o : a.V(b.B) }; a.P = function (b) { return "function" == typeof b && b.B === a.w ? o : "function" == typeof b && b.B === a.i && b.mb ? o : q }; a.b("observable", a.w); a.b("isObservable", a.V); a.b("isWriteableObservable", a.P); a.Q = function (b) {
    0 == arguments.length && (b = []); b !== p && b !== m && !("length" in b) && l(Error("The argument passed when initializing an observable array must be an array, or null, or undefined."));
    var c = new a.w(b); a.a.extend(c, a.Q.fn); a.l(c, "remove", c.remove); a.l(c, "removeAll", c.Ab); a.l(c, "destroy", c.fa); a.l(c, "destroyAll", c.cb); a.l(c, "indexOf", c.indexOf); a.l(c, "replace", c.replace); return c
}; a.Q.fn = { remove: function (a) { for (var c = this(), d = [], e = "function" == typeof a ? a : function (c) { return c === a }, f = 0; f < c.length; f++) { var h = c[f]; e(h) && (0 === d.length && this.H(), d.push(h), c.splice(f, 1), f--) } d.length && this.G(); return d }, Ab: function (b) {
    if (b === m) {
        var c = this(), d = c.slice(0); this.H(); c.splice(0, c.length); this.G();
        return d
    } return !b ? [] : this.remove(function (c) { return 0 <= a.a.k(b, c) })
}, fa: function (a) { var c = this(), d = "function" == typeof a ? a : function (c) { return c === a }; this.H(); for (var e = c.length - 1; 0 <= e; e--) d(c[e]) && (c[e]._destroy = o); this.G() }, cb: function (b) { return b === m ? this.fa(function () { return o }) : !b ? [] : this.fa(function (c) { return 0 <= a.a.k(b, c) }) }, indexOf: function (b) { var c = this(); return a.a.k(c, b) }, replace: function (a, c) { var d = this.indexOf(a); 0 <= d && (this.H(), this()[d] = c, this.G()) } 
}; a.a.n("pop,push,reverse,shift,sort,splice,unshift".split(","),
function (b) { a.Q.fn[b] = function () { var a = this(); this.H(); a = a[b].apply(a, arguments); this.G(); return a } }); a.a.n(["slice"], function (b) { a.Q.fn[b] = function () { var a = this(); return a[b].apply(a, arguments) } }); a.b("observableArray", a.Q); a.i = function (b, c, d) {
    function e() { a.a.n(t, function (a) { a.v() }); t = [] } function f() { var a = g.throttleEvaluation; a && 0 <= a ? (clearTimeout(v), v = setTimeout(h, a)) : h() } function h() {
        if (j && "function" == typeof d.disposeWhen && d.disposeWhen()) g.v(); else {
            try {
                e(); a.T.Xa(function (a) { t.push(a.ra(f)) });
                var b = d.read.call(d.owner || c); g.notifySubscribers(i, "beforeChange"); i = b
            } finally { a.T.end() } g.notifySubscribers(i); j = o
        } 
    } function g() { if (0 < arguments.length) "function" === typeof d.write ? d.write.apply(d.owner || c, arguments) : l("Cannot write a value to a dependentObservable unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters."); else return j || h(), a.T.Ha(g), i } var i, j = q, d = D(b, d), k = "object" == typeof d.disposeWhenNodeIsRemoved ? d.disposeWhenNodeIsRemoved : p, n = p; if (k) {
        n =
function () { g.v() }; a.a.A.va(k, n); var s = d.disposeWhen; d.disposeWhen = function () { return !a.a.ga(k) || "function" == typeof s && s() } 
    } var t = [], v = p; g.kb = function () { return t.length }; g.mb = "function" === typeof d.write; g.v = function () { k && a.a.A.Ia(k, n); e() }; a.R.call(g); a.a.extend(g, a.i.fn); d.deferEvaluation !== o && h(); a.l(g, "dispose", g.v); a.l(g, "getDependenciesCount", g.kb); return g
}; a.i.fn = { B: a.i }; a.i.B = a.w; a.b("dependentObservable", a.i); a.b("computed", a.i); (function () {
    function b(a, f, h) {
        h = h || new d; a = f(a); if (!("object" ==
typeof a && a !== p && a !== m && !(a instanceof Date))) return a; var g = a instanceof Array ? [] : {}; h.save(a, g); c(a, function (c) { var d = f(a[c]); switch (typeof d) { case "boolean": case "number": case "string": case "function": g[c] = d; break; case "object": case "undefined": var k = h.get(d); g[c] = k !== m ? k : b(d, f, h) } }); return g
    } function c(a, b) { if (a instanceof Array) for (var c = 0; c < a.length; c++) b(c); else for (c in a) b(c) } function d() {
        var b = [], c = []; this.save = function (d, g) { var i = a.a.k(b, d); 0 <= i ? c[i] = g : (b.push(d), c.push(g)) }; this.get = function (d) {
            d =
a.a.k(b, d); return 0 <= d ? c[d] : m
        } 
    } a.Pa = function (c) { 0 == arguments.length && l(Error("When calling ko.toJS, pass the object you want to convert.")); return b(c, function (b) { for (var c = 0; a.V(b) && 10 > c; c++) b = b(); return b }) }; a.toJSON = function (b) { b = a.Pa(b); return a.a.qa(b) } 
})(); a.b("toJS", a.Pa); a.b("toJSON", a.toJSON); (function () {
    a.h = { q: function (b) {
        return "OPTION" == b.tagName ? b.__ko__hasDomDataOptionValue__ === o ? a.a.e.get(b, a.c.options.la) : b.getAttribute("value") : "SELECT" == b.tagName ? 0 <= b.selectedIndex ? a.h.q(b.options[b.selectedIndex]) :
m : b.value
    }, S: function (b, c) { if ("OPTION" == b.tagName) switch (typeof c) { case "string": a.a.e.set(b, a.c.options.la, m); "__ko__hasDomDataOptionValue__" in b && delete b.__ko__hasDomDataOptionValue__; b.value = c; break; default: a.a.e.set(b, a.c.options.la, c), b.__ko__hasDomDataOptionValue__ = o, b.value = "number" === typeof c ? c : "" } else if ("SELECT" == b.tagName) for (var d = b.options.length - 1; 0 <= d; d--) { if (a.h.q(b.options[d]) == c) { b.selectedIndex = d; break } } else { if (c === p || c === m) c = ""; b.value = c } } 
    }
})(); a.b("selectExtensions", a.h); a.b("selectExtensions.readValue",
a.h.q); a.b("selectExtensions.writeValue", a.h.S); a.j = function () {
    function b(a, b) { for (var e = p; a != e; ) e = a, a = a.replace(c, function (a, c) { return b[c] }); return a } var c = /\@ko_token_(\d+)\@/g, d = /^[\_$a-z][\_$a-z0-9]*(\[.*?\])*(\.[\_$a-z][\_$a-z0-9]*(\[.*?\])*)*$/i, e = ["true", "false"]; return { D: [], Y: function (c) {
        var e = a.a.z(c); if (3 > e.length) return []; "{" === e.charAt(0) && (e = e.substring(1, e.length - 1)); for (var c = [], d = p, i, j = 0; j < e.length; j++) {
            var k = e.charAt(j); if (d === p) switch (k) { case '"': case "'": case "/": d = j, i = k } else if (k ==
i && "\\" !== e.charAt(j - 1)) { k = e.substring(d, j + 1); c.push(k); var n = "@ko_token_" + (c.length - 1) + "@", e = e.substring(0, d) + n + e.substring(j + 1), j = j - (k.length - n.length), d = p } 
        } i = d = p; for (var s = 0, t = p, j = 0; j < e.length; j++) { k = e.charAt(j); if (d === p) switch (k) { case "{": d = j; t = k; i = "}"; break; case "(": d = j; t = k; i = ")"; break; case "[": d = j, t = k, i = "]" } k === t ? s++ : k === i && (s--, 0 === s && (k = e.substring(d, j + 1), c.push(k), n = "@ko_token_" + (c.length - 1) + "@", e = e.substring(0, d) + n + e.substring(j + 1), j -= k.length - n.length, d = p)) } i = []; e = e.split(","); d = 0; for (j =
e.length; d < j; d++) s = e[d], t = s.indexOf(":"), 0 < t && t < s.length - 1 ? (k = s.substring(t + 1), i.push({ key: b(s.substring(0, t), c), value: b(k, c) })) : i.push({ unknown: b(s, c) }); return i
    }, ia: function (b) {
        for (var c = "string" === typeof b ? a.j.Y(b) : b, g = [], b = [], i, j = 0; i = c[j]; j++) if (0 < g.length && g.push(","), i.key) {
            var k; a: { k = i.key; var n = a.a.z(k); switch (n.length && n.charAt(0)) { case "'": case '"': break a; default: k = "'" + n + "'" } } i = i.value; g.push(k); g.push(":"); g.push(i); n = a.a.z(i); if (0 <= a.a.k(e, a.a.z(n).toLowerCase()) ? 0 : n.match(d) !== p) 0 < b.length &&
b.push(", "), b.push(k + " : function(__ko_value) { " + i + " = __ko_value; }")
        } else i.unknown && g.push(i.unknown); c = g.join(""); 0 < b.length && (c = c + ", '_ko_property_writers' : { " + b.join("") + " } "); return c
    }, sb: function (b, c) { for (var e = 0; e < b.length; e++) if (a.a.z(b[e].key) == c) return o; return q } 
    }
} (); a.b("jsonExpressionRewriting", a.j); a.b("jsonExpressionRewriting.bindingRewriteValidators", a.j.D); a.b("jsonExpressionRewriting.parseObjectLiteral", a.j.Y); a.b("jsonExpressionRewriting.insertPropertyAccessorsIntoJson",
a.j.ia); (function () {
    function b(a) { return 8 == a.nodeType && (f ? a.text : a.nodeValue).match(h) } function c(a) { return 8 == a.nodeType && (f ? a.text : a.nodeValue).match(g) } function d(a, e) { for (var d = a, f = 1, g = []; d = d.nextSibling; ) { if (c(d) && (f--, 0 === f)) return g; g.push(d); b(d) && f++ } e || l(Error("Cannot find closing comment tag to match: " + a.nodeValue)); return p } function e(a, b) { var c = d(a, b); return c ? 0 < c.length ? c[c.length - 1].nextSibling : a.nextSibling : p } var f = "<\!--test--\>" === document.createComment("test").text, h = f ? /^<\!--\s*ko\s+(.*\:.*)\s*--\>$/ :
/^\s*ko\s+(.*\:.*)\s*$/, g = f ? /^<\!--\s*\/ko\s*--\>$/ : /^\s*\/ko\s*$/, i = { ul: o, ol: o }; a.f = { C: {}, childNodes: function (a) { return b(a) ? d(a) : a.childNodes }, ha: function (c) { if (b(c)) for (var c = a.f.childNodes(c), e = 0, d = c.length; e < d; e++) a.removeNode(c[e]); else a.a.U(c) }, oa: function (c, e) { if (b(c)) { a.f.ha(c); for (var d = c.nextSibling, f = 0, g = e.length; f < g; f++) d.parentNode.insertBefore(e[f], d) } else a.a.oa(c, e) }, yb: function (a, c) { b(a) ? a.parentNode.insertBefore(c, a.nextSibling) : a.firstChild ? a.insertBefore(c, a.firstChild) : a.appendChild(c) },
    nb: function (a, c, e) { b(a) ? a.parentNode.insertBefore(c, e.nextSibling) : e.nextSibling ? a.insertBefore(c, e.nextSibling) : a.appendChild(c) }, nextSibling: function (a) { return b(a) ? e(a).nextSibling : a.nextSibling && c(a.nextSibling) ? m : a.nextSibling }, ta: function (a) { return (a = b(a)) ? a[1] : p }, jb: function (b) { if (a.f.ta(b)) { var c; c = a.f.childNodes(b); for (var e = [], d = 0, f = c.length; d < f; d++) a.a.A.F(c[d]), e.push(a.a.outerHTML(c[d])); c = String.prototype.concat.apply("", e); a.f.ha(b); (new a.m.I(b)).text(c) } }, Fa: function (a) {
        if (i[a.tagName.toLowerCase()]) {
            var d =
a.firstChild; if (d) { do if (1 === d.nodeType) { var f; f = d.firstChild; var g = p; if (f) { do if (g) g.push(f); else if (b(f)) { var h = e(f, o); h ? f = h : g = [f] } else c(f) && (g = [f]); while (f = f.nextSibling) } if (f = g) { g = d.nextSibling; for (h = 0; h < f.length; h++) g ? a.insertBefore(f[h], g) : a.appendChild(f[h]) } } while (d = d.nextSibling) } 
        } 
    } 
}
})(); (function () {
    a.L = function () { this.Ya = {} }; a.a.extend(a.L.prototype, { nodeHasBindings: function (b) { switch (b.nodeType) { case 1: return b.getAttribute("data-bind") != p; case 8: return a.f.ta(b) != p; default: return q } },
        getBindings: function (a, c) { var d = this.getBindingsString(a, c); return d ? this.parseBindingsString(d, c) : p }, getBindingsString: function (b) { switch (b.nodeType) { case 1: return b.getAttribute("data-bind"); case 8: return a.f.ta(b); default: return p } }, parseBindingsString: function (b, c) {
            try { var d = c.$data, d = "object" == typeof d && d != p ? [d, c] : [c], e = d.length, f = this.Ya, h = e + "_" + b, g; if (!(g = f[h])) { var i = " { " + a.j.ia(b) + " } "; g = f[h] = a.a.Za(i, e) } return g(d) } catch (j) {
                l(Error("Unable to parse bindings.\nMessage: " + j + ";\nBindings value: " +
b))
            } 
        } 
    }); a.L.instance = new a.L
})(); a.b("bindingProvider", a.L); (function () {
    function b(b, d) { for (var h, g = d.childNodes[0]; h = g; ) g = a.f.nextSibling(h), c(b, h, q) } function c(c, f, h) { var g = o, i = 1 == f.nodeType; i && a.f.Fa(f); if (i && h || a.L.instance.nodeHasBindings(f)) g = d(f, p, c, h).Cb; i && g && b(c, f) } function d(b, c, d, g) {
        function i(a) { return function () { return n[a] } } function j() { return n } var k = 0; a.f.jb(b); var n, s; new a.i(function () {
            var t = d && d instanceof a.K ? d : new a.K(a.a.d(d)), v = t.$data; g && a.Na(b, t); if (n = ("function" == typeof c ?
c() : c) || a.L.instance.getBindings(b, t)) {
                if (0 === k) { k = 1; for (var r in n) { var w = a.c[r]; w && 8 === b.nodeType && !a.f.C[r] && l(Error("The binding '" + r + "' cannot be used with virtual elements")); if (w && "function" == typeof w.init && (w = (0, w.init)(b, i(r), j, v, t)) && w.controlsDescendantBindings) s !== m && l(Error("Multiple bindings (" + s + " and " + r + ") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.")), s = r } k = 2 } if (2 === k) for (r in n) (w = a.c[r]) && "function" ==
typeof w.update && (0, w.update)(b, i(r), j, v, t)
            } 
        }, p, { disposeWhenNodeIsRemoved: b }); return { Cb: s === m}
    } a.c = {}; a.K = function (a, b) { this.$data = a; b ? (this.$parent = b.$data, this.$parents = (b.$parents || []).slice(0), this.$parents.unshift(this.$parent), this.$root = b.$root) : (this.$parents = [], this.$root = a) }; a.K.prototype.createChildContext = function (b) { return new a.K(b, this) }; a.Na = function (b, c) { if (2 == arguments.length) a.a.e.set(b, "__ko_bindingContext__", c); else return a.a.e.get(b, "__ko_bindingContext__") }; a.xa = function (b,
c, h) { 1 === b.nodeType && a.f.Fa(b); return d(b, c, h, o) }; a.Ta = function (a, c) { 1 === c.nodeType && b(a, c) }; a.wa = function (a, b) { b && 1 !== b.nodeType && 8 !== b.nodeType && l(Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node")); b = b || window.document.body; c(a, b, o) }; a.ea = function (b) { switch (b.nodeType) { case 1: case 8: var c = a.Na(b); if (c) return c; if (b.parentNode) return a.ea(b.parentNode) } }; a.bb = function (b) { return (b = a.ea(b)) ? b.$data : m }; a.b("bindingHandlers", a.c); a.b("applyBindings",
a.wa); a.b("applyBindingsToDescendants", a.Ta); a.b("applyBindingsToNode", a.xa); a.b("contextFor", a.ea); a.b("dataFor", a.bb)
})(); a.a.n(["click"], function (b) { a.c[b] = { init: function (c, d, e, f) { return a.c.event.init.call(this, c, function () { var a = {}; a[b] = d(); return a }, e, f) } } }); a.c.event = { init: function (b, c, d, e) {
    var f = c() || {}, h; for (h in f) (function () {
        var f = h; "string" == typeof f && a.a.s(b, f, function (b) {
            var h, k = c()[f]; if (k) {
                var n = d(); try { var s = a.a.X(arguments); s.unshift(e); h = k.apply(e, s) } finally {
                    if (h !== o) b.preventDefault ?
b.preventDefault() : b.returnValue = q
                } if (n[f + "Bubble"] === q) b.cancelBubble = o, b.stopPropagation && b.stopPropagation()
            } 
        })
    })()
} 
}; a.c.submit = { init: function (b, c, d, e) { "function" != typeof c() && l(Error("The value for a submit binding must be a function")); a.a.s(b, "submit", function (a) { var d, g = c(); try { d = g.call(e, b) } finally { if (d !== o) a.preventDefault ? a.preventDefault() : a.returnValue = q } }) } }; a.c.visible = { update: function (b, c) {
    var d = a.a.d(c()), e = "none" != b.style.display; if (d && !e) b.style.display = ""; else if (!d && e) b.style.display =
"none"
} 
}; a.c.enable = { update: function (b, c) { var d = a.a.d(c()); if (d && b.disabled) b.removeAttribute("disabled"); else if (!d && !b.disabled) b.disabled = o } }; a.c.disable = { update: function (b, c) { a.c.enable.update(b, function () { return !a.a.d(c()) }) } }; a.c.value = { init: function (b, c, d) {
    var e = ["change"], f = d().valueUpdate; f && ("string" == typeof f && (f = [f]), a.a.J(e, f), e = a.a.ya(e)); a.a.n(e, function (e) {
        var f = q; a.a.Db(e, "after") && (f = o, e = e.substring(5)); var i = f ? function (a) { setTimeout(a, 0) } : function (a) { a() }; a.a.s(b, e, function () {
            i(function () {
                var e =
c(), f = a.h.q(b); a.P(e) ? e(f) : (e = d(), e._ko_property_writers && e._ko_property_writers.value && e._ko_property_writers.value(f))
            })
        })
    })
}, update: function (b, c) { var d = a.a.d(c()), e = a.h.q(b), f = d != e; 0 === d && 0 !== e && "0" !== e && (f = o); f && (e = function () { a.h.S(b, d) }, e(), "SELECT" == b.tagName && setTimeout(e, 0)); "SELECT" == b.tagName && 0 < b.length && C(b, d, q) } 
}; a.c.options = { update: function (b, c, d) {
    "SELECT" != b.tagName && l(Error("options binding applies only to SELECT elements")); var e = 0 == b.length, f = a.a.ba(a.a.aa(b.childNodes, function (a) {
        return a.tagName &&
"OPTION" == a.tagName && a.selected
    }), function (b) { return a.h.q(b) || b.innerText || b.textContent }), h = b.scrollTop; b.scrollTop = 0; for (var g = a.a.d(c()); 0 < b.length; ) a.F(b.options[0]), b.remove(0); if (g) {
        d = d(); "number" != typeof g.length && (g = [g]); if (d.optionsCaption) { var i = document.createElement("OPTION"); a.a.Z(i, d.optionsCaption); a.h.S(i, m); b.appendChild(i) } for (var c = 0, j = g.length; c < j; c++) {
            var i = document.createElement("OPTION"), k = "string" == typeof d.optionsValue ? g[c][d.optionsValue] : g[c], k = a.a.d(k); a.h.S(i, k); var n =
d.optionsText, k = "function" == typeof n ? n(g[c]) : "string" == typeof n ? g[c][n] : k; if (k === p || k === m) k = ""; a.a.Ma(i, k); b.appendChild(i)
        } g = b.getElementsByTagName("OPTION"); c = i = 0; for (j = g.length; c < j; c++) 0 <= a.a.k(f, a.h.q(g[c])) && (a.a.La(g[c], o), i++); if (h) b.scrollTop = h; e && "value" in d && C(b, a.a.d(d.value), o)
    } 
} 
}; a.c.options.la = "__ko.optionValueDomData__"; a.c.selectedOptions = { Da: function (b) { for (var c = [], b = b.childNodes, d = 0, e = b.length; d < e; d++) { var f = b[d]; "OPTION" == f.tagName && f.selected && c.push(a.h.q(f)) } return c }, init: function (b,
c, d) { a.a.s(b, "change", function () { var b = c(); a.P(b) ? b(a.c.selectedOptions.Da(this)) : (b = d(), b._ko_property_writers && b._ko_property_writers.value && b._ko_property_writers.value(a.c.selectedOptions.Da(this))) }) }, update: function (b, c) { "SELECT" != b.tagName && l(Error("values binding applies only to SELECT elements")); var d = a.a.d(c()); if (d && "number" == typeof d.length) for (var e = b.childNodes, f = 0, h = e.length; f < h; f++) { var g = e[f]; "OPTION" == g.tagName && a.a.La(g, 0 <= a.a.k(d, a.h.q(g))) } } 
}; a.c.text = { update: function (b, c) {
    a.a.Ma(b,
c())
} 
}; a.c.html = { init: function () { return { controlsDescendantBindings: o} }, update: function (b, c) { var d = a.a.d(c()); a.a.Z(b, d) } }; a.c.css = { update: function (b, c) { var d = a.a.d(c() || {}), e; for (e in d) if ("string" == typeof e) { var f = a.a.d(d[e]); a.a.Qa(b, e, f) } } }; a.c.style = { update: function (b, c) { var d = a.a.d(c() || {}), e; for (e in d) if ("string" == typeof e) { var f = a.a.d(d[e]); b.style[e] = f || "" } } }; a.c.uniqueName = { init: function (b, c) {
    if (c()) b.name = "ko_unique_" + ++a.c.uniqueName.ab, (a.a.pb || a.a.qb) && b.mergeAttributes(document.createElement("<input name='" +
b.name + "'/>"), q)
} 
}; a.c.uniqueName.ab = 0; a.c.checked = { init: function (b, c, d) {
    a.a.s(b, "click", function () { var e; if ("checkbox" == b.type) e = b.checked; else if ("radio" == b.type && b.checked) e = b.value; else return; var f = c(); "checkbox" == b.type && a.a.d(f) instanceof Array ? (e = a.a.k(a.a.d(f), b.value), b.checked && 0 > e ? f.push(b.value) : !b.checked && 0 <= e && f.splice(e, 1)) : a.P(f) ? f() !== e && f(e) : (f = d(), f._ko_property_writers && f._ko_property_writers.checked && f._ko_property_writers.checked(e)) }); "radio" == b.type && !b.name && a.c.uniqueName.init(b,
function () { return o })
}, update: function (b, c) { var d = a.a.d(c()); if ("checkbox" == b.type) b.checked = d instanceof Array ? 0 <= a.a.k(d, b.value) : d; else if ("radio" == b.type) b.checked = b.value == d } 
}; a.c.attr = { update: function (b, c) { var d = a.a.d(c()) || {}, e; for (e in d) if ("string" == typeof e) { var f = a.a.d(d[e]); f === q || f === p || f === m ? b.removeAttribute(e) : b.setAttribute(e, f.toString()) } } }; a.c.hasfocus = { init: function (b, c, d) {
    function e(b) {
        var e = c(); b != a.a.d(e) && (a.P(e) ? e(b) : (e = d(), e._ko_property_writers && e._ko_property_writers.hasfocus &&
e._ko_property_writers.hasfocus(b)))
    } a.a.s(b, "focus", function () { e(o) }); a.a.s(b, "focusin", function () { e(o) }); a.a.s(b, "blur", function () { e(q) }); a.a.s(b, "focusout", function () { e(q) })
}, update: function (b, c) { var d = a.a.d(c()); d ? b.focus() : b.blur(); a.a.sa(b, d ? "focusin" : "focusout") } 
}; a.c["with"] = { o: function (b) { return function () { var c = b(); return { "if": c, data: c, templateEngine: a.p.M} } }, init: function (b, c) { return a.c.template.init(b, a.c["with"].o(c)) }, update: function (b, c, d, e, f) {
    return a.c.template.update(b, a.c["with"].o(c),
d, e, f)
} 
}; a.j.D["with"] = q; a.f.C["with"] = o; a.c["if"] = { o: function (b) { return function () { return { "if": b(), templateEngine: a.p.M} } }, init: function (b, c) { return a.c.template.init(b, a.c["if"].o(c)) }, update: function (b, c, d, e, f) { return a.c.template.update(b, a.c["if"].o(c), d, e, f) } }; a.j.D["if"] = q; a.f.C["if"] = o; a.c.ifnot = { o: function (b) { return function () { return { ifnot: b(), templateEngine: a.p.M} } }, init: function (b, c) { return a.c.template.init(b, a.c.ifnot.o(c)) }, update: function (b, c, d, e, f) {
    return a.c.template.update(b, a.c.ifnot.o(c),
d, e, f)
} 
}; a.j.D.ifnot = q; a.f.C.ifnot = o; a.c.foreach = { o: function (b) { return function () { var c = a.a.d(b()); return !c || "number" == typeof c.length ? { foreach: c, templateEngine: a.p.M} : { foreach: c.data, includeDestroyed: c.includeDestroyed, afterAdd: c.afterAdd, beforeRemove: c.beforeRemove, afterRender: c.afterRender, templateEngine: a.p.M} } }, init: function (b, c) { return a.c.template.init(b, a.c.foreach.o(c)) }, update: function (b, c, d, e, f) { return a.c.template.update(b, a.c.foreach.o(c), d, e, f) } }; a.j.D.foreach = q; a.f.C.foreach = o; a.b("allowedVirtualElementBindings",
a.f.C); a.t = function () { }; a.t.prototype.renderTemplateSource = function () { l("Override renderTemplateSource") }; a.t.prototype.createJavaScriptEvaluatorBlock = function () { l("Override createJavaScriptEvaluatorBlock") }; a.t.prototype.makeTemplateSource = function (b) { if ("string" == typeof b) { var c = document.getElementById(b); c || l(Error("Cannot find template with ID " + b)); return new a.m.g(c) } if (1 == b.nodeType || 8 == b.nodeType) return new a.m.I(b); l(Error("Unknown template type: " + b)) }; a.t.prototype.renderTemplate = function (a,
c, d) { return this.renderTemplateSource(this.makeTemplateSource(a), c, d) }; a.t.prototype.isTemplateRewritten = function (a) { return this.allowTemplateRewriting === q ? o : this.W && this.W[a] ? o : this.makeTemplateSource(a).data("isRewritten") }; a.t.prototype.rewriteTemplate = function (a, c) { var d = this.makeTemplateSource(a), e = c(d.text()); d.text(e); d.data("isRewritten", o); if ("string" == typeof a) this.W = this.W || {}, this.W[a] = o }; a.b("templateEngine", a.t); a.$ = function () {
    function b(b, c, d) {
        for (var b = a.j.Y(b), g = a.j.D, i = 0; i < b.length; i++) {
            var j =
b[i].key; if (g.hasOwnProperty(j)) { var k = g[j]; "function" === typeof k ? (j = k(b[i].value)) && l(Error(j)) : k || l(Error("This template engine does not support the '" + j + "' binding within its templates")) } 
        } b = "ko.templateRewriting.applyMemoizedBindingsToNextSibling(function() {             return (function() { return { " + a.j.ia(b) + " } })()         })"; return d.createJavaScriptEvaluatorBlock(b) + c
    } var c = /(<[a-z]+\d*(\s+(?!data-bind=)[a-z0-9\-]+(=(\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind=(["'])([\s\S]*?)\5/gi, d = /<\!--\s*ko\b\s*([\s\S]*?)\s*--\>/g;
    return { ib: function (b, c) { c.isTemplateRewritten(b) || c.rewriteTemplate(b, function (b) { return a.$.vb(b, c) }) }, vb: function (a, f) { return a.replace(c, function (a, c, d, e, k, n, s) { return b(s, c, f) }).replace(d, function (a, c) { return b(c, "<\!-- ko --\>", f) }) }, Ua: function (b) { return a.r.ka(function (c, d) { c.nextSibling && a.xa(c.nextSibling, b, d) }) } }
} (); a.b("templateRewriting", a.$); a.b("templateRewriting.applyMemoizedBindingsToNextSibling", a.$.Ua); (function () {
    a.m = {}; a.m.g = function (a) { this.g = a }; a.m.g.prototype.text = function () {
        if (0 ==
arguments.length) return "script" == this.g.tagName.toLowerCase() ? this.g.text : this.g.innerHTML; var b = arguments[0]; "script" == this.g.tagName.toLowerCase() ? this.g.text = b : a.a.Z(this.g, b)
    }; a.m.g.prototype.data = function (b) { if (1 === arguments.length) return a.a.e.get(this.g, "templateSourceData_" + b); a.a.e.set(this.g, "templateSourceData_" + b, arguments[1]) }; a.m.I = function (a) { this.g = a }; a.m.I.prototype = new a.m.g; a.m.I.prototype.text = function () {
        if (0 == arguments.length) return a.a.e.get(this.g, "__ko_anon_template__"); a.a.e.set(this.g,
"__ko_anon_template__", arguments[0])
    }; a.b("templateSources", a.m); a.b("templateSources.domElement", a.m.g); a.b("templateSources.anonymousTemplate", a.m.I)
})(); (function () {
    function b(a, b, c) { for (var d = 0; node = a[d]; d++) node.parentNode === b && (1 === node.nodeType || 8 === node.nodeType) && c(node) } function c(b, c, h, g, i) {
        var i = i || {}, j = i.templateEngine || d; a.$.ib(h, j); h = j.renderTemplate(h, g, i); ("number" != typeof h.length || 0 < h.length && "number" != typeof h[0].nodeType) && l("Template engine must return an array of DOM nodes");
        j = q; switch (c) { case "replaceChildren": a.f.oa(b, h); j = o; break; case "replaceNode": a.a.Ja(b, h); j = o; break; case "ignoreTargetNode": break; default: l(Error("Unknown renderMode: " + c)) } j && (a.ua(h, g), i.afterRender && i.afterRender(h, g.$data)); return h
    } var d; a.pa = function (b) { b != m && !(b instanceof a.t) && l("templateEngine must inherit from ko.templateEngine"); d = b }; a.ua = function (c, d) { var h = a.a.J([], c), g = 0 < c.length ? c[0].parentNode : p; b(h, g, function (b) { a.wa(d, b) }); b(h, g, function (b) { a.r.Sa(b, [d]) }) }; a.na = function (b, f, h,
g, i) { h = h || {}; (h.templateEngine || d) == m && l("Set a template engine before calling renderTemplate"); i = i || "replaceChildren"; if (g) { var j = g.nodeType ? g : 0 < g.length ? g[0] : p; return new a.i(function () { var d = f && f instanceof a.K ? f : new a.K(a.a.d(f)), n = "function" == typeof b ? b(d.$data) : b, d = c(g, i, n, d, h); "replaceNode" == i && (g = d, j = g.nodeType ? g : 0 < g.length ? g[0] : p) }, p, { disposeWhen: function () { return !j || !a.a.ga(j) }, disposeWhenNodeIsRemoved: j && "replaceNode" == i ? j.parentNode : j }) } return a.r.ka(function (c) { a.na(b, f, h, c, "replaceNode") }) };
    a.Bb = function (b, d, h, g, i) { function j(b, c) { var d = k(b); a.ua(c, d); h.afterRender && h.afterRender(c, d.$data) } function k(b) { return i.createChildContext(a.a.d(b)) } return new a.i(function () { var i = a.a.d(d) || []; "undefined" == typeof i.length && (i = [i]); i = a.a.aa(i, function (b) { return h.includeDestroyed || b === m || b === p || !a.a.d(b._destroy) }); a.a.Ka(g, i, function (a) { var d = "function" == typeof b ? b(a) : b; return c(p, "ignoreTargetNode", d, k(a), h) }, h, j) }, p, { disposeWhenNodeIsRemoved: g }) }; a.c.template = { init: function (b, c) {
        var d = a.a.d(c());
        "string" != typeof d && !d.name && 1 == b.nodeType && ((new a.m.I(b)).text(b.innerHTML), a.a.U(b)); return { controlsDescendantBindings: o}
    }, update: function (b, c, d, g, i) {
        c = a.a.d(c()); g = o; "string" == typeof c ? d = c : (d = c.name, "if" in c && (g = g && a.a.d(c["if"])), "ifnot" in c && (g = g && !a.a.d(c.ifnot))); var j = p; "object" === typeof c && "foreach" in c ? j = a.Bb(d || b, g && c.foreach || [], c, b, i) : g ? (i = "object" == typeof c && "data" in c ? i.createChildContext(a.a.d(c.data)) : i, j = a.na(d || b, i, c, b)) : a.f.ha(b); i = j; (c = a.a.e.get(b, "__ko__templateSubscriptionDomDataKey__")) &&
"function" == typeof c.v && c.v(); a.a.e.set(b, "__ko__templateSubscriptionDomDataKey__", i)
    } 
    }; a.j.D.template = function (b) { b = a.j.Y(b); return 1 == b.length && b[0].unknown ? p : a.j.sb(b, "name") ? p : "This template engine does not support anonymous templates nested within its templates" }; a.f.C.template = o
})(); a.b("setTemplateEngine", a.pa); a.b("renderTemplate", a.na); (function () {
    a.a.N = function (b, c, d) {
        if (d === m) return a.a.N(b, c, 1) || a.a.N(b, c, 10) || a.a.N(b, c, Number.MAX_VALUE); for (var b = b || [], c = c || [], e = b, f = c, h = [], g = 0; g <= f.length; g++) h[g] =
[]; for (var g = 0, i = Math.min(e.length, d); g <= i; g++) h[0][g] = g; g = 1; for (i = Math.min(f.length, d); g <= i; g++) h[g][0] = g; for (var i = e.length, j, k = f.length, g = 1; g <= i; g++) { j = Math.max(1, g - d); for (var n = Math.min(k, g + d); j <= n; j++) h[j][g] = e[g - 1] === f[j - 1] ? h[j - 1][g - 1] : Math.min(h[j - 1][g] === m ? Number.MAX_VALUE : h[j - 1][g] + 1, h[j][g - 1] === m ? Number.MAX_VALUE : h[j][g - 1] + 1) } d = b.length; e = c.length; f = []; g = h[e][d]; if (g === m) h = p; else {
            for (; 0 < d || 0 < e; ) {
                i = h[e][d]; k = 0 < e ? h[e - 1][d] : g + 1; n = 0 < d ? h[e][d - 1] : g + 1; j = 0 < e && 0 < d ? h[e - 1][d - 1] : g + 1; if (k === m || k < i - 1) k =
g + 1; if (n === m || n < i - 1) n = g + 1; j < i - 1 && (j = g + 1); k <= n && k < j ? (f.push({ status: "added", value: c[e - 1] }), e--) : (n < k && n < j ? f.push({ status: "deleted", value: b[d - 1] }) : (f.push({ status: "retained", value: b[d - 1] }), e--), d--)
            } h = f.reverse()
        } return h
    } 
})(); a.b("utils.compareArrays", a.a.N); (function () {
    function b(a) { if (2 < a.length) { for (var b = a[0], c = a[a.length - 1], h = [b]; b !== c; ) { b = b.nextSibling; if (!b) return; h.push(b) } Array.prototype.splice.apply(a, [0, a.length].concat(h)) } } function c(c, e, f, h) {
        var g = [], c = a.i(function () {
            var c = e(f) || []; 0 <
g.length && (b(g), a.a.Ja(g, c), h && h(f, c)); g.splice(0, g.length); a.a.J(g, c)
        }, p, { disposeWhenNodeIsRemoved: c, disposeWhen: function () { return 0 == g.length || !a.a.ga(g[0]) } }); return { tb: g, i: c}
    } a.a.Ka = function (d, e, f, h, g) {
        for (var e = e || [], h = h || {}, i = a.a.e.get(d, "setDomNodeChildrenFromArrayMapping_lastMappingResult") === m, j = a.a.e.get(d, "setDomNodeChildrenFromArrayMapping_lastMappingResult") || [], k = a.a.ba(j, function (a) { return a.Va }), n = a.a.N(k, e), e = [], s = 0, t = [], k = [], v = p, r = 0, w = n.length; r < w; r++) switch (n[r].status) {
            case "retained": var y =
j[s]; e.push(y); 0 < y.O.length && (v = y.O[y.O.length - 1]); s++; break; case "deleted": j[s].i.v(); b(j[s].O); a.a.n(j[s].O, function (a) { t.push({ element: a, index: r, value: n[r].value }); v = a }); s++; break; case "added": var y = n[r].value, A = c(d, f, y, g), u = A.tb; e.push({ Va: n[r].value, O: u, i: A.i }); for (var A = 0, z = u.length; A < z; A++) { var x = u[A]; k.push({ element: x, index: r, value: n[r].value }); v == p ? a.f.yb(d, x) : a.f.nb(d, x, v); v = x } g && g(y, u)
        } a.a.n(t, function (b) { a.F(b.element) }); f = q; if (!i) {
            if (h.afterAdd) for (r = 0; r < k.length; r++) h.afterAdd(k[r].element,
k[r].index, k[r].value); if (h.beforeRemove) { for (r = 0; r < t.length; r++) h.beforeRemove(t[r].element, t[r].index, t[r].value); f = o } 
        } f || a.a.n(t, function (b) { a.removeNode(b.element) }); a.a.e.set(d, "setDomNodeChildrenFromArrayMapping_lastMappingResult", e)
    } 
})(); a.b("utils.setDomNodeChildrenFromArrayMapping", a.a.Ka); a.p = function () { this.allowTemplateRewriting = q }; a.p.prototype = new a.t; a.p.prototype.renderTemplateSource = function (b) { b = b.text(); return a.a.ma(b) }; a.p.M = new a.p; a.pa(a.p.M); a.b("nativeTemplateEngine", a.p);
        (function () {
            a.ja = function () {
                var a = this.rb = function () { if ("undefined" == typeof jQuery || !jQuery.tmpl) return 0; try { if (0 <= jQuery.tmpl.tag.tmpl.open.toString().indexOf("__")) return 2 } catch (a) { } return 1 } (); this.renderTemplateSource = function (b, e, f) {
                    f = f || {}; 2 > a && l(Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.")); var h = b.data("precompiled"); h || (h = b.text() || "", h = jQuery.template(p, "{{ko_with $item.koBindingContext}}" + h + "{{/ko_with}}"), b.data("precompiled", h));
                    b = [e.$data]; e = jQuery.extend({ koBindingContext: e }, f.templateOptions); e = jQuery.tmpl(h, b, e); e.appendTo(document.createElement("div")); jQuery.fragments = {}; return e
                }; this.createJavaScriptEvaluatorBlock = function (a) { return "{{ko_code ((function() { return " + a + " })()) }}" }; this.addTemplate = function (a, b) { document.write("<script type='text/html' id='" + a + "'>" + b + "<\/script>") }; if (0 < a) jQuery.tmpl.tag.ko_code = { open: "__.push($1 || '');" }, jQuery.tmpl.tag.ko_with = { open: "with($1) {", close: "} "}
            }; a.ja.prototype = new a.t;
            var b = new a.ja; 0 < b.rb && a.pa(b); a.b("jqueryTmplTemplateEngine", a.ja)
        })()
    } "function" === typeof require && "object" === typeof exports && "object" === typeof module ? B(module.exports || exports) : "function" === typeof define && define.amd ? define(["exports"], B) : B(window.ko = {});
})(window, document, navigator);                  
