(function() {
	var e = this,
		t = e._,
		n = {},
		r = Array.prototype,
		i = Object.prototype,
		s = Function.prototype,
		o = r.push,
		u = r.slice,
		a = r.concat,
		f = i.toString,
		l = i.hasOwnProperty,
		c = r.forEach,
		h = r.map,
		p = r.reduce,
		d = r.reduceRight,
		v = r.filter,
		m = r.every,
		g = r.some,
		y = r.indexOf,
		b = r.lastIndexOf,
		w = Array.isArray,
		E = Object.keys,
		S = s.bind,
		x = function(e) {
			if (e instanceof x) return e;
			if (!(this instanceof x)) return new x(e);
			this._wrapped = e
		};
	typeof exports != "undefined" ? (typeof module != "undefined" && module.exports && (exports = module.exports = x), exports._ = x) : e._ = x, x.VERSION = "1.4.4";
	var T = x.each = x.forEach = function(e, t, r) {
		if (e == null) return;
		if (c && e.forEach === c) e.forEach(t, r);
		else if (e.length === +e.length) {
			for (var i = 0, s = e.length; i < s; i++)
				if (t.call(r, e[i], i, e) === n) return
		} else
			for (var o in e)
				if (x.has(e, o) && t.call(r, e[o], o, e) === n) return
	};
	x.map = x.collect = function(e, t, n) {
		var r = [];
		return e == null ? r : h && e.map === h ? e.map(t, n) : (T(e, function(e, i, s) {
			r[r.length] = t.call(n, e, i, s)
		}), r)
	};
	var N = "Reduce of empty array with no initial value";
	x.reduce = x.foldl = x.inject = function(e, t, n, r) {
		var i = arguments.length > 2;
		e == null && (e = []);
		if (p && e.reduce === p) return r && (t = x.bind(t, r)), i ? e.reduce(t, n) : e.reduce(t);
		T(e, function(e, s, o) {
			i ? n = t.call(r, n, e, s, o) : (n = e, i = !0)
		});
		if (!i) throw new TypeError(N);
		return n
	}, x.reduceRight = x.foldr = function(e, t, n, r) {
		var i = arguments.length > 2;
		e == null && (e = []);
		if (d && e.reduceRight === d) return r && (t = x.bind(t, r)), i ? e.reduceRight(t, n) : e.reduceRight(t);
		var s = e.length;
		if (s !== +s) {
			var o = x.keys(e);
			s = o.length
		}
		T(e, function(u, a, f) {
			a = o ? o[--s] : --s, i ? n = t.call(r, n, e[a], a, f) : (n = e[a], i = !0)
		});
		if (!i) throw new TypeError(N);
		return n
	}, x.find = x.detect = function(e, t, n) {
		var r;
		return C(e, function(e, i, s) {
			if (t.call(n, e, i, s)) return r = e, !0
		}), r
	}, x.filter = x.select = function(e, t, n) {
		var r = [];
		return e == null ? r : v && e.filter === v ? e.filter(t, n) : (T(e, function(e, i, s) {
			t.call(n, e, i, s) && (r[r.length] = e)
		}), r)
	}, x.reject = function(e, t, n) {
		return x.filter(e, function(e, r, i) {
			return !t.call(n, e, r, i)
		}, n)
	}, x.every = x.all = function(e, t, r) {
		t || (t = x.identity);
		var i = !0;
		return e == null ? i : m && e.every === m ? e.every(t, r) : (T(e, function(e, s, o) {
			if (!(i = i && t.call(r, e, s, o))) return n
		}), !!i)
	};
	var C = x.some = x.any = function(e, t, r) {
		t || (t = x.identity);
		var i = !1;
		return e == null ? i : g && e.some === g ? e.some(t, r) : (T(e, function(e, s, o) {
			if (i || (i = t.call(r, e, s, o))) return n
		}), !!i)
	};
	x.contains = x.include = function(e, t) {
		return e == null ? !1 : y && e.indexOf === y ? e.indexOf(t) != -1 : C(e, function(e) {
			return e === t
		})
	}, x.invoke = function(e, t) {
		var n = u.call(arguments, 2),
			r = x.isFunction(t);
		return x.map(e, function(e) {
			return (r ? t : e[t]).apply(e, n)
		})
	}, x.pluck = function(e, t) {
		return x.map(e, function(e) {
			return e[t]
		})
	}, x.where = function(e, t, n) {
		return x.isEmpty(t) ? n ? null : [] : x[n ? "find" : "filter"](e, function(e) {
			for (var n in t)
				if (t[n] !== e[n]) return !1;
			return !0
		})
	}, x.findWhere = function(e, t) {
		return x.where(e, t, !0)
	}, x.max = function(e, t, n) {
		if (!t && x.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.max.apply(Math, e);
		if (!t && x.isEmpty(e)) return -Infinity;
		var r = {
			computed: -Infinity,
			value: -Infinity
		};
		return T(e, function(e, i, s) {
			var o = t ? t.call(n, e, i, s) : e;
			o >= r.computed && (r = {
				value: e,
				computed: o
			})
		}), r.value
	}, x.min = function(e, t, n) {
		if (!t && x.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.min.apply(Math, e);
		if (!t && x.isEmpty(e)) return Infinity;
		var r = {
			computed: Infinity,
			value: Infinity
		};
		return T(e, function(e, i, s) {
			var o = t ? t.call(n, e, i, s) : e;
			o < r.computed && (r = {
				value: e,
				computed: o
			})
		}), r.value
	}, x.shuffle = function(e) {
		var t, n = 0,
			r = [];
		return T(e, function(e) {
			t = x.random(n++), r[n - 1] = r[t], r[t] = e
		}), r
	};
	var k = function(e) {
		return x.isFunction(e) ? e : function(t) {
			return t[e]
		}
	};
	x.sortBy = function(e, t, n) {
		var r = k(t);
		return x.pluck(x.map(e, function(e, t, i) {
			return {
				value: e,
				index: t,
				criteria: r.call(n, e, t, i)
			}
		}).sort(function(e, t) {
			var n = e.criteria,
				r = t.criteria;
			if (n !== r) {
				if (n > r || n === void 0) return 1;
				if (n < r || r === void 0) return -1
			}
			return e.index < t.index ? -1 : 1
		}), "value")
	};
	var L = function(e, t, n, r) {
		var i = {},
			s = k(t || x.identity);
		return T(e, function(t, o) {
			var u = s.call(n, t, o, e);
			r(i, u, t)
		}), i
	};
	x.groupBy = function(e, t, n) {
		return L(e, t, n, function(e, t, n) {
			(x.has(e, t) ? e[t] : e[t] = []).push(n)
		})
	}, x.countBy = function(e, t, n) {
		return L(e, t, n, function(e, t) {
			x.has(e, t) || (e[t] = 0), e[t]++
		})
	}, x.sortedIndex = function(e, t, n, r) {
		n = n == null ? x.identity : k(n);
		var i = n.call(r, t),
			s = 0,
			o = e.length;
		while (s < o) {
			var u = s + o >>> 1;
			n.call(r, e[u]) < i ? s = u + 1 : o = u
		}
		return s
	}, x.toArray = function(e) {
		return e ? x.isArray(e) ? u.call(e) : e.length === +e.length ? x.map(e, x.identity) : x.values(e) : []
	}, x.size = function(e) {
		return e == null ? 0 : e.length === +e.length ? e.length : x.keys(e).length
	}, x.first = x.head = x.take = function(e, t, n) {
		return e == null ? void 0 : t != null && !n ? u.call(e, 0, t) : e[0]
	}, x.initial = function(e, t, n) {
		return u.call(e, 0, e.length - (t == null || n ? 1 : t))
	}, x.last = function(e, t, n) {
		return e == null ? void 0 : t != null && !n ? u.call(e, Math.max(e.length - t, 0)) : e[e.length - 1]
	}, x.rest = x.tail = x.drop = function(e, t, n) {
		return u.call(e, t == null || n ? 1 : t)
	}, x.compact = function(e) {
		return x.filter(e, x.identity)
	};
	var A = function(e, t, n) {
		return T(e, function(e) {
			x.isArray(e) ? t ? o.apply(n, e) : A(e, t, n) : n.push(e)
		}), n
	};
	x.flatten = function(e, t) {
		return A(e, t, [])
	}, x.without = function(e) {
		return x.difference(e, u.call(arguments, 1))
	}, x.uniq = x.unique = function(e, t, n, r) {
		x.isFunction(t) && (r = n, n = t, t = !1);
		var i = n ? x.map(e, n, r) : e,
			s = [],
			o = [];
		return T(i, function(n, r) {
			if (t ? !r || o[o.length - 1] !== n : !x.contains(o, n)) o.push(n), s.push(e[r])
		}), s
	}, x.union = function() {
		return x.uniq(a.apply(r, arguments))
	}, x.intersection = function(e) {
		var t = u.call(arguments, 1);
		return x.filter(x.uniq(e), function(e) {
			return x.every(t, function(t) {
				return x.indexOf(t, e) >= 0
			})
		})
	}, x.difference = function(e) {
		var t = a.apply(r, u.call(arguments, 1));
		return x.filter(e, function(e) {
			return !x.contains(t, e)
		})
	}, x.zip = function() {
		var e = u.call(arguments),
			t = x.max(x.pluck(e, "length")),
			n = new Array(t);
		for (var r = 0; r < t; r++) n[r] = x.pluck(e, "" + r);
		return n
	}, x.object = function(e, t) {
		if (e == null) return {};
		var n = {};
		for (var r = 0, i = e.length; r < i; r++) t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
		return n
	}, x.indexOf = function(e, t, n) {
		if (e == null) return -1;
		var r = 0,
			i = e.length;
		if (n) {
			if (typeof n != "number") return r = x.sortedIndex(e, t), e[r] === t ? r : -1;
			r = n < 0 ? Math.max(0, i + n) : n
		}
		if (y && e.indexOf === y) return e.indexOf(t, n);
		for (; r < i; r++)
			if (e[r] === t) return r;
		return -1
	}, x.lastIndexOf = function(e, t, n) {
		if (e == null) return -1;
		var r = n != null;
		if (b && e.lastIndexOf === b) return r ? e.lastIndexOf(t, n) : e.lastIndexOf(t);
		var i = r ? n : e.length;
		while (i--)
			if (e[i] === t) return i;
		return -1
	}, x.range = function(e, t, n) {
		arguments.length <= 1 && (t = e || 0, e = 0), n = arguments[2] || 1;
		var r = Math.max(Math.ceil((t - e) / n), 0),
			i = 0,
			s = new Array(r);
		while (i < r) s[i++] = e, e += n;
		return s
	}, x.bind = function(e, t) {
		if (e.bind === S && S) return S.apply(e, u.call(arguments, 1));
		var n = u.call(arguments, 2);
		return function() {
			return e.apply(t, n.concat(u.call(arguments)))
		}
	}, x.partial = function(e) {
		var t = u.call(arguments, 1);
		return function() {
			return e.apply(this, t.concat(u.call(arguments)))
		}
	}, x.bindAll = function(e) {
		var t = u.call(arguments, 1);
		return t.length === 0 && (t = x.functions(e)), T(t, function(t) {
			e[t] = x.bind(e[t], e)
		}), e
	}, x.memoize = function(e, t) {
		var n = {};
		return t || (t = x.identity),
			function() {
				var r = t.apply(this, arguments);
				return x.has(n, r) ? n[r] : n[r] = e.apply(this, arguments)
			}
	}, x.delay = function(e, t) {
		var n = u.call(arguments, 2);
		return setTimeout(function() {
			return e.apply(null, n)
		}, t)
	}, x.defer = function(e) {
		return x.delay.apply(x, [e, 1].concat(u.call(arguments, 1)))
	}, x.throttle = function(e, t) {
		var n, r, i, s, o = 0,
			u = function() {
				o = new Date, i = null, s = e.apply(n, r)
			};
		return function() {
			var a = new Date,
				f = t - (a - o);
			return n = this, r = arguments, f <= 0 ? (clearTimeout(i), i = null, o = a, s = e.apply(n, r)) : i || (i = setTimeout(u, f)), s
		}
	}, x.debounce = function(e, t, n) {
		var r, i;
		return function() {
			var s = this,
				o = arguments,
				u = function() {
					r = null, n || (i = e.apply(s, o))
				},
				a = n && !r;
			return clearTimeout(r), r = setTimeout(u, t), a && (i = e.apply(s, o)), i
		}
	}, x.once = function(e) {
		var t = !1,
			n;
		return function() {
			return t ? n : (t = !0, n = e.apply(this, arguments), e = null, n)
		}
	}, x.wrap = function(e, t) {
		return function() {
			var n = [e];
			return o.apply(n, arguments), t.apply(this, n)
		}
	}, x.compose = function() {
		var e = arguments;
		return function() {
			var t = arguments;
			for (var n = e.length - 1; n >= 0; n--) t = [e[n].apply(this, t)];
			return t[0]
		}
	}, x.after = function(e, t) {
		return e <= 0 ? t() : function() {
			if (--e < 1) return t.apply(this, arguments)
		}
	}, x.keys = E || function(e) {
		if (e !== Object(e)) throw new TypeError("Invalid object");
		var t = [];
		for (var n in e) x.has(e, n) && (t[t.length] = n);
		return t
	}, x.values = function(e) {
		var t = [];
		for (var n in e) x.has(e, n) && t.push(e[n]);
		return t
	}, x.pairs = function(e) {
		var t = [];
		for (var n in e) x.has(e, n) && t.push([n, e[n]]);
		return t
	}, x.invert = function(e) {
		var t = {};
		for (var n in e) x.has(e, n) && (t[e[n]] = n);
		return t
	}, x.functions = x.methods = function(e) {
		var t = [];
		for (var n in e) x.isFunction(e[n]) && t.push(n);
		return t.sort()
	}, x.extend = function(e) {
		return T(u.call(arguments, 1), function(t) {
			if (t)
				for (var n in t) e[n] = t[n]
		}), e
	}, x.pick = function(e) {
		var t = {},
			n = a.apply(r, u.call(arguments, 1));
		return T(n, function(n) {
			n in e && (t[n] = e[n])
		}), t
	}, x.omit = function(e) {
		var t = {},
			n = a.apply(r, u.call(arguments, 1));
		for (var i in e) x.contains(n, i) || (t[i] = e[i]);
		return t
	}, x.defaults = function(e) {
		return T(u.call(arguments, 1), function(t) {
			if (t)
				for (var n in t) e[n] == null && (e[n] = t[n])
		}), e
	}, x.clone = function(e) {
		return x.isObject(e) ? x.isArray(e) ? e.slice() : x.extend({}, e) : e
	}, x.tap = function(e, t) {
		return t(e), e
	};
	var O = function(e, t, n, r) {
		if (e === t) return e !== 0 || 1 / e == 1 / t;
		if (e == null || t == null) return e === t;
		e instanceof x && (e = e._wrapped), t instanceof x && (t = t._wrapped);
		var i = f.call(e);
		if (i != f.call(t)) return !1;
		switch (i) {
			case "[object String]":
				return e == String(t);
			case "[object Number]":
				return e != +e ? t != +t : e == 0 ? 1 / e == 1 / t : e == +t;
			case "[object Date]":
			case "[object Boolean]":
				return +e == +t;
			case "[object RegExp]":
				return e.source == t.source && e.global == t.global && e.multiline == t.multiline && e.ignoreCase == t.ignoreCase
		}
		if (typeof e != "object" || typeof t != "object") return !1;
		var s = n.length;
		while (s--)
			if (n[s] == e) return r[s] == t;
		n.push(e), r.push(t);
		var o = 0,
			u = !0;
		if (i == "[object Array]") {
			o = e.length, u = o == t.length;
			if (u)
				while (o--)
					if (!(u = O(e[o], t[o], n, r))) break
		} else {
			var a = e.constructor,
				l = t.constructor;
			if (a !== l && !(x.isFunction(a) && a instanceof a && x.isFunction(l) && l instanceof l)) return !1;
			for (var c in e)
				if (x.has(e, c)) {
					o++;
					if (!(u = x.has(t, c) && O(e[c], t[c], n, r))) break
				}
			if (u) {
				for (c in t)
					if (x.has(t, c) && !(o--)) break;
				u = !o
			}
		}
		return n.pop(), r.pop(), u
	};
	x.isEqual = function(e, t) {
		return O(e, t, [], [])
	}, x.isEmpty = function(e) {
		if (e == null) return !0;
		if (x.isArray(e) || x.isString(e)) return e.length === 0;
		for (var t in e)
			if (x.has(e, t)) return !1;
		return !0
	}, x.isElement = function(e) {
		return !!e && e.nodeType === 1
	}, x.isArray = w || function(e) {
		return f.call(e) == "[object Array]"
	}, x.isObject = function(e) {
		return e === Object(e)
	}, T(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(e) {
		x["is" + e] = function(t) {
			return f.call(t) == "[object " + e + "]"
		}
	}), x.isArguments(arguments) || (x.isArguments = function(e) {
		return !!e && !!x.has(e, "callee")
	}), typeof /./ != "function" && (x.isFunction = function(e) {
		return typeof e == "function"
	}), x.isFinite = function(e) {
		return isFinite(e) && !isNaN(parseFloat(e))
	}, x.isNaN = function(e) {
		return x.isNumber(e) && e != +e
	}, x.isBoolean = function(e) {
		return e === !0 || e === !1 || f.call(e) == "[object Boolean]"
	}, x.isNull = function(e) {
		return e === null
	}, x.isUndefined = function(e) {
		return e === void 0
	}, x.has = function(e, t) {
		return l.call(e, t)
	}, x.noConflict = function() {
		return e._ = t, this
	}, x.identity = function(e) {
		return e
	}, x.times = function(e, t, n) {
		var r = Array(e);
		for (var i = 0; i < e; i++) r[i] = t.call(n, i);
		return r
	}, x.random = function(e, t) {
		return t == null && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
	};
	var M = {
		escape: {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#x27;",
			"/": "&#x2F;"
		}
	};
	M.unescape = x.invert(M.escape);
	var _ = {
		escape: new RegExp("[" + x.keys(M.escape).join("") + "]", "g"),
		unescape: new RegExp("(" + x.keys(M.unescape).join("|") + ")", "g")
	};
	x.each(["escape", "unescape"], function(e) {
		x[e] = function(t) {
			return t == null ? "" : ("" + t).replace(_[e], function(t) {
				return M[e][t]
			})
		}
	}), x.result = function(e, t) {
		if (e == null) return null;
		var n = e[t];
		return x.isFunction(n) ? n.call(e) : n
	}, x.mixin = function(e) {
		T(x.functions(e), function(t) {
			var n = x[t] = e[t];
			x.prototype[t] = function() {
				var e = [this._wrapped];
				return o.apply(e, arguments), j.call(this, n.apply(x, e))
			}
		})
	};
	var D = 0;
	x.uniqueId = function(e) {
		var t = ++D + "";
		return e ? e + t : t
	}, x.templateSettings = {
		evaluate: /<%([\s\S]+?)%>/g,
		interpolate: /<%=([\s\S]+?)%>/g,
		escape: /<%-([\s\S]+?)%>/g
	};
	var P = /(.)^/,
		H = {
			"'": "'",
			"\\": "\\",
			"\r": "r",
			"\n": "n",
			"	": "t",
			"\u2028": "u2028",
			"\u2029": "u2029"
		},
		B = /\\|'|\r|\n|\t|\u2028|\u2029/g;
	x.template = function(e, t, n) {
		if (x.isFunction(e)) return t ? e(t) : e;
		var r;
		n = x.defaults({}, n, x.templateSettings);
		var i = new RegExp([(n.escape || P).source, (n.interpolate || P).source, (n.evaluate || P).source].join("|") + "|$", "g"),
			s = 0,
			o = "__p+='",
			u = e;
		e.replace(i, function(t, n, r, i, u) {
			return o += e.slice(s, u).replace(B, function(e) {
				return "\\" + H[e]
			}), n && (o += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'"), r && (o += "'+\n((__t=(" + r + "))==null?'':__t)+\n'"), i && (o += "';\n" + i + "\n__p+='"), s = u + t.length, t
		}), o += "';\n", n.variable || (o = "with(obj||{}){\n" + o + "}\n"), o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
		try {
			r = new Function(n.variable || "obj", "_", o)
		} catch (a) {
			throw a.source = o, a
		}
		if (t) return r(t, x);
		var f = function(e) {
			return r.call(this, e, x)
		};
		return f.source = "function(" + (n.variable || "obj") + "){\n" + o + "}", f.textsource = u, f
	}, x.chain = function(e) {
		return x(e).chain()
	};
	var j = function(e) {
		return this._chain ? x(e).chain() : e
	};
	x.mixin(x), T(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
		var t = r[e];
		x.prototype[e] = function() {
			var n = this._wrapped;
			return t.apply(n, arguments), (e == "shift" || e == "splice") && n.length === 0 && delete n[0], j.call(this, n)
		}
	}), T(["concat", "join", "slice"], function(e) {
		var t = r[e];
		x.prototype[e] = function() {
			return j.call(this, t.apply(this._wrapped, arguments))
		}
	}), x.extend(x.prototype, {
		chain: function() {
			return this._chain = !0, this
		},
		value: function() {
			return this._wrapped
		}
	})
}).call(this), define("underscore", function(e) {
		return function() {
			var t, n;
			return t || e._
		}
	}(this)),
	function() {
		var e = this,
			t = e.Backbone,
			n = [],
			r = n.push,
			i = n.slice,
			s = n.splice,
			o;
		o = "undefined" != typeof exports ? exports : e.Backbone = {}, o.VERSION = "0.9.10";
		var u = e._;
		!u && "undefined" != typeof require && (u = require("underscore")), o.$ = e.jQuery || e.Zepto || e.ender, o.noConflict = function() {
			return e.Backbone = t, this
		}, o.emulateHTTP = !1, o.emulateJSON = !1;
		var a = /\s+/,
			f = function(e, t, n, r) {
				if (!n) return !0;
				if ("object" == typeof n)
					for (var i in n) e[t].apply(e, [i, n[i]].concat(r));
				else {
					if (!a.test(n)) return !0;
					n = n.split(a), i = 0;
					for (var s = n.length; i < s; i++) e[t].apply(e, [n[i]].concat(r))
				}
			},
			l = function(e, t) {
				var n, r = -1,
					i = e.length;
				switch (t.length) {
					case 0:
						for (; ++r < i;)(n = e[r]).callback.call(n.ctx);
						break;
					case 1:
						for (; ++r < i;)(n = e[r]).callback.call(n.ctx, t[0]);
						break;
					case 2:
						for (; ++r < i;)(n = e[r]).callback.call(n.ctx, t[0], t[1]);
						break;
					case 3:
						for (; ++r < i;)(n = e[r]).callback.call(n.ctx, t[0], t[1], t[2]);
						break;
					default:
						for (; ++r < i;)(n = e[r]).callback.apply(n.ctx, t)
				}
			},
			n = o.Events = {
				on: function(e, t, n) {
					return !f(this, "on", e, [t, n]) || !t ? this : (this._events || (this._events = {}), (this._events[e] || (this._events[e] = [])).push({
						callback: t,
						context: n,
						ctx: n || this
					}), this)
				},
				once: function(e, t, n) {
					if (!f(this, "once", e, [t, n]) || !t) return this;
					var r = this,
						i = u.once(function() {
							r.off(e, i), t.apply(this, arguments)
						});
					return i._callback = t, this.on(e, i, n), this
				},
				off: function(e, t, n) {
					var r, i, s, o, a, l, c, h;
					if (!this._events || !f(this, "off", e, [t, n])) return this;
					if (!e && !t && !n) return this._events = {}, this;
					o = e ? [e] : u.keys(this._events), a = 0;
					for (l = o.length; a < l; a++)
						if (e = o[a], r = this._events[e]) {
							s = [];
							if (t || n) {
								c = 0;
								for (h = r.length; c < h; c++) i = r[c], (t && t !== i.callback && t !== i.callback._callback || n && n !== i.context) && s.push(i)
							}
							this._events[e] = s
						}
					return this
				},
				trigger: function(e) {
					if (!this._events) return this;
					var t = i.call(arguments, 1);
					if (!f(this, "trigger", e, t)) return this;
					var n = this._events[e],
						r = this._events.all;
					return n && l(n, t), r && l(r, arguments), this
				},
				listenTo: function(e, t, n) {
					var r = this._listeners || (this._listeners = {}),
						i = e._listenerId || (e._listenerId = u.uniqueId("l"));
					return r[i] = e, e.on(t, "object" == typeof t ? this : n, this), this
				},
				stopListening: function(e, t, n) {
					var r = this._listeners;
					if (r) {
						if (e) e.off(t, "object" == typeof t ? this : n, this), !t && !n && delete r[e._listenerId];
						else {
							"object" == typeof t && (n = this);
							for (var i in r) r[i].off(t, n, this);
							this._listeners = {}
						}
						return this
					}
				}
			};
		n.bind = n.on, n.unbind = n.off, u.extend(o, n);
		var c = o.Model = function(e, t) {
			var n, r = e || {};
			this.cid = u.uniqueId("c"), this.attributes = {}, t && t.collection && (this.collection = t.collection), t && t.parse && (r = this.parse(r, t) || {});
			if (n = u.result(this, "defaults")) r = u.defaults({}, r, n);
			this.set(r, t), this.changed = {}, this.initialize.apply(this, arguments)
		};
		u.extend(c.prototype, n, {
			changed: null,
			idAttribute: "id",
			initialize: function() {},
			toJSON: function() {
				return u.clone(this.attributes)
			},
			sync: function() {
				return o.sync.apply(this, arguments)
			},
			get: function(e) {
				return this.attributes[e]
			},
			escape: function(e) {
				return u.escape(this.get(e))
			},
			has: function(e) {
				return null != this.get(e)
			},
			set: function(e, t, n) {
				var r, i, s, o, a, f, l;
				if (null == e) return this;
				"object" == typeof e ? (i = e, n = t) : (i = {})[e] = t, n || (n = {});
				if (!this._validate(i, n)) return !1;
				s = n.unset, o = n.silent, e = [], a = this._changing, this._changing = !0, a || (this._previousAttributes = u.clone(this.attributes), this.changed = {}), l = this.attributes, f = this._previousAttributes, this.idAttribute in i && (this.id = i[this.idAttribute]);
				for (r in i) t = i[r], u.isEqual(l[r], t) || e.push(r), u.isEqual(f[r], t) ? delete this.changed[r] : this.changed[r] = t, s ? delete l[r] : l[r] = t;
				if (!o) {
					e.length && (this._pending = !0), t = 0;
					for (r = e.length; t < r; t++) this.trigger("change:" + e[t], this, l[e[t]], n)
				}
				if (a) return this;
				if (!o)
					for (; this._pending;) this._pending = !1, this.trigger("change", this, n);
				return this._changing = this._pending = !1, this
			},
			unset: function(e, t) {
				return this.set(e, void 0, u.extend({}, t, {
					unset: !0
				}))
			},
			clear: function(e) {
				var t = {},
					n;
				for (n in this.attributes) t[n] = void 0;
				return this.set(t, u.extend({}, e, {
					unset: !0
				}))
			},
			hasChanged: function(e) {
				return null == e ? !u.isEmpty(this.changed) : u.has(this.changed, e)
			},
			changedAttributes: function(e) {
				if (!e) return this.hasChanged() ? u.clone(this.changed) : !1;
				var t, n = !1,
					r = this._changing ? this._previousAttributes : this.attributes,
					i;
				for (i in e) u.isEqual(r[i], t = e[i]) || ((n || (n = {}))[i] = t);
				return n
			},
			previous: function(e) {
				return null == e || !this._previousAttributes ? null : this._previousAttributes[e]
			},
			previousAttributes: function() {
				return u.clone(this._previousAttributes)
			},
			fetch: function(e) {
				e = e ? u.clone(e) : {}, void 0 === e.parse && (e.parse = !0);
				var t = e.success;
				return e.success = function(e, n, r) {
					if (!e.set(e.parse(n, r), r)) return !1;
					t && t(e, n, r)
				}, this.sync("read", this, e)
			},
			save: function(e, t, n) {
				var r, i, s = this.attributes;
				return null == e || "object" == typeof e ? (r = e, n = t) : (r = {})[e] = t, r && (!n || !n.wait) && !this.set(r, n) ? !1 : (n = u.extend({
					validate: !0
				}, n), this._validate(r, n) ? (r && n.wait && (this.attributes = u.extend({}, s, r)), void 0 === n.parse && (n.parse = !0), i = n.success, n.success = function(e, t, n) {
					e.attributes = s;
					var o = e.parse(t, n);
					n.wait && (o = u.extend(r || {}, o));
					if (u.isObject(o) && !e.set(o, n)) return !1;
					i && i(e, t, n)
				}, e = this.isNew() ? "create" : n.patch ? "patch" : "update", "patch" === e && (n.attrs = r), e = this.sync(e, this, n), r && n.wait && (this.attributes = s), e) : !1)
			},
			destroy: function(e) {
				e = e ? u.clone(e) : {};
				var t = this,
					n = e.success,
					r = function() {
						t.trigger("destroy", t, t.collection, e)
					};
				e.success = function(e, t, i) {
					(i.wait || e.isNew()) && r(), n && n(e, t, i)
				};
				if (this.isNew()) return e.success(this, null, e), !1;
				var i = this.sync("delete", this, e);
				return e.wait || r(), i
			},
			url: function() {
				var e = u.result(this, "urlRoot") || u.result(this.collection, "url") || k();
				return this.isNew() ? e : e + ("/" === e.charAt(e.length - 1) ? "" : "/") + encodeURIComponent(this.id)
			},
			parse: function(e) {
				return e
			},
			clone: function() {
				return new this.constructor(this.attributes)
			},
			isNew: function() {
				return null == this.id
			},
			isValid: function(e) {
				return !this.validate || !this.validate(this.attributes, e)
			},
			_validate: function(e, t) {
				if (!t.validate || !this.validate) return !0;
				e = u.extend({}, this.attributes, e);
				var n = this.validationError = this.validate(e, t) || null;
				return n ? (this.trigger("invalid", this, n, t || {}), !1) : !0
			}
		});
		var h = o.Collection = function(e, t) {
			t || (t = {}), t.model && (this.model = t.model), void 0 !== t.comparator && (this.comparator = t.comparator), this.models = [], this._reset(), this.initialize.apply(this, arguments), e && this.reset(e, u.extend({
				silent: !0
			}, t))
		};
		u.extend(h.prototype, n, {
			model: c,
			initialize: function() {},
			toJSON: function(e) {
				return this.map(function(t) {
					return t.toJSON(e)
				})
			},
			sync: function() {
				return o.sync.apply(this, arguments)
			},
			add: function(e, t) {
				e = u.isArray(e) ? e.slice() : [e], t || (t = {});
				var n, i, o, a, f, l, c, h, p, d;
				c = [], h = t.at, p = this.comparator && null == h && 0 != t.sort, d = u.isString(this.comparator) ? this.comparator : null, n = 0;
				for (i = e.length; n < i; n++)(o = this._prepareModel(a = e[n], t)) ? (f = this.get(o)) ? t.merge && (f.set(a === o ? o.attributes : a, t), p && !l && f.hasChanged(d) && (l = !0)) : (c.push(o), o.on("all", this._onModelEvent, this), this._byId[o.cid] = o, null != o.id && (this._byId[o.id] = o)) : this.trigger("invalid", this, a, t);
				c.length && (p && (l = !0), this.length += c.length, null != h ? s.apply(this.models, [h, 0].concat(c)) : r.apply(this.models, c)), l && this.sort({
					silent: !0
				});
				if (t.silent) return this;
				n = 0;
				for (i = c.length; n < i; n++)(o = c[n]).trigger("add", o, this, t);
				return l && this.trigger("sort", this, t), this
			},
			remove: function(e, t) {
				e = u.isArray(e) ? e.slice() : [e], t || (t = {});
				var n, r, i, s;
				n = 0;
				for (r = e.length; n < r; n++)
					if (s = this.get(e[n])) delete this._byId[s.id], delete this._byId[s.cid], i = this.indexOf(s), this.models.splice(i, 1), this.length--, t.silent || (t.index = i, s.trigger("remove", s, this, t)), this._removeReference(s);
				return this
			},
			push: function(e, t) {
				return e = this._prepareModel(e, t), this.add(e, u.extend({
					at: this.length
				}, t)), e
			},
			pop: function(e) {
				var t = this.at(this.length - 1);
				return this.remove(t, e), t
			},
			unshift: function(e, t) {
				return e = this._prepareModel(e, t), this.add(e, u.extend({
					at: 0
				}, t)), e
			},
			shift: function(e) {
				var t = this.at(0);
				return this.remove(t, e), t
			},
			slice: function(e, t) {
				return this.models.slice(e, t)
			},
			get: function(e) {
				if (null != e) return this._idAttr || (this._idAttr = this.model.prototype.idAttribute), this._byId[e.id || e.cid || e[this._idAttr] || e]
			},
			at: function(e) {
				return this.models[e]
			},
			where: function(e) {
				return u.isEmpty(e) ? [] : this.filter(function(t) {
					for (var n in e)
						if (e[n] !== t.get(n)) return !1;
					return !0
				})
			},
			sort: function(e) {
				if (!this.comparator) throw Error("Cannot sort a set without a comparator");
				return e || (e = {}), u.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(u.bind(this.comparator, this)), e.silent || this.trigger("sort", this, e), this
			},
			pluck: function(e) {
				return u.invoke(this.models, "get", e)
			},
			update: function(e, t) {
				t = u.extend({
					add: !0,
					merge: !0,
					remove: !0
				}, t), t.parse && (e = this.parse(e, t));
				var n, r, i, s, o = [],
					a = [],
					f = {};
				u.isArray(e) || (e = e ? [e] : []);
				if (t.add && !t.remove) return this.add(e, t);
				r = 0;
				for (i = e.length; r < i; r++) n = e[r], s = this.get(n), t.remove && s && (f[s.cid] = !0), (t.add && !s || t.merge && s) && o.push(n);
				if (t.remove) {
					r = 0;
					for (i = this.models.length; r < i; r++) n = this.models[r], f[n.cid] || a.push(n)
				}
				return a.length && this.remove(a, t), o.length && this.add(o, t), this
			},
			reset: function(e, t) {
				t || (t = {}), t.parse && (e = this.parse(e, t));
				for (var n = 0, r = this.models.length; n < r; n++) this._removeReference(this.models[n]);
				return t.previousModels = this.models.slice(), this._reset(), e && this.add(e, u.extend({
					silent: !0
				}, t)), t.silent || this.trigger("reset", this, t), this
			},
			fetch: function(e) {
				e = e ? u.clone(e) : {}, void 0 === e.parse && (e.parse = !0);
				var t = e.success;
				return e.success = function(e, n, r) {
					e[r.update ? "update" : "reset"](n, r), t && t(e, n, r)
				}, this.sync("read", this, e)
			},
			create: function(e, t) {
				t = t ? u.clone(t) : {};
				if (!(e = this._prepareModel(e, t))) return !1;
				t.wait || this.add(e, t);
				var n = this,
					r = t.success;
				return t.success = function(e, t, i) {
					i.wait && n.add(e, i), r && r(e, t, i)
				}, e.save(null, t), e
			},
			parse: function(e) {
				return e
			},
			clone: function() {
				return new this.constructor(this.models)
			},
			_reset: function() {
				this.length = 0, this.models.length = 0, this._byId = {}
			},
			_prepareModel: function(e, t) {
				if (e instanceof c) return e.collection || (e.collection = this), e;
				t || (t = {}), t.collection = this;
				var n = new this.model(e, t);
				return n._validate(e, t) ? n : !1
			},
			_removeReference: function(e) {
				this === e.collection && delete e.collection, e.off("all", this._onModelEvent, this)
			},
			_onModelEvent: function(e, t, n, r) {
				("add" === e || "remove" === e) && n !== this || ("destroy" === e && this.remove(t, r), t && e === "change:" + t.idAttribute && (delete this._byId[t.previous(t.idAttribute)], null != t.id && (this._byId[t.id] = t)), this.trigger.apply(this, arguments))
			},
			sortedIndex: function(e, t, n) {
				t || (t = this.comparator);
				var r = u.isFunction(t) ? t : function(e) {
					return e.get(t)
				};
				return u.sortedIndex(this.models, e, r, n)
			}
		}), u.each("forEach each map collect reduce foldl inject reduceRight foldr find detect filter select reject every all some any include contains invoke max min toArray size first head take initial rest tail drop last without indexOf shuffle lastIndexOf isEmpty chain".split(" "), function(e) {
			h.prototype[e] = function() {
				var t = i.call(arguments);
				return t.unshift(this.models), u[e].apply(u, t)
			}
		}), u.each(["groupBy", "countBy", "sortBy"], function(e) {
			h.prototype[e] = function(t, n) {
				var r = u.isFunction(t) ? t : function(e) {
					return e.get(t)
				};
				return u[e](this.models, r, n)
			}
		});
		var p = o.Router = function(e) {
				e || (e = {}), e.routes && (this.routes = e.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
			},
			d = /\((.*?)\)/g,
			v = /(\(\?)?:\w+/g,
			m = /\*\w+/g,
			g = /[\-{}\[\]+?.,\\\^$|#\s]/g;
		u.extend(p.prototype, n, {
			initialize: function() {},
			route: function(e, t, n) {
				return u.isRegExp(e) || (e = this._routeToRegExp(e)), n || (n = this[t]), o.history.route(e, u.bind(function(r) {
					r = this._extractParameters(e, r), n && n.apply(this, r), this.trigger.apply(this, ["route:" + t].concat(r)), this.trigger("route", t, r), o.history.trigger("route", this, t, r)
				}, this)), this
			},
			navigate: function(e, t) {
				return o.history.navigate(e, t), this
			},
			_bindRoutes: function() {
				if (this.routes)
					for (var e, t = u.keys(this.routes); null != (e = t.pop());) this.route(e, this.routes[e])
			},
			_routeToRegExp: function(e) {
				return e = e.replace(g, "\\$&").replace(d, "(?:$1)?").replace(v, function(e, t) {
					return t ? e : "([^/]+)"
				}).replace(m, "(.*?)"), RegExp("^" + e + "$")
			},
			_extractParameters: function(e, t) {
				return e.exec(t).slice(1)
			}
		});
		var y = o.History = function() {
				this.handlers = [], u.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, this.history = window.history)
			},
			b = /^[#\/]|\s+$/g,
			w = /^\/+|\/+$/g,
			E = /msie [\w.]+/,
			S = /\/$/;
		y.started = !1, u.extend(y.prototype, n, {
			interval: 50,
			getHash: function(e) {
				return (e = (e || this).location.href.match(/#(.*)$/)) ? e[1] : ""
			},
			getFragment: function(e, t) {
				if (null == e)
					if (this._hasPushState || !this._wantsHashChange || t) {
						e = this.location.pathname;
						var n = this.root.replace(S, "");
						e.indexOf(n) || (e = e.substr(n.length))
					} else e = this.getHash();
				return e.replace(b, "")
			},
			start: function(e) {
				if (y.started) throw Error("Backbone.history has already been started");
				y.started = !0, this.options = u.extend({}, {
					root: "/"
				}, this.options, e), this.root = this.options.root, this._wantsHashChange = !1 !== this.options.hashChange, this._wantsPushState = !!this.options.pushState, this._hasPushState = !(!this.options.pushState || !this.history || !this.history.pushState), e = this.getFragment();
				var t = document.documentMode,
					t = E.exec(navigator.userAgent.toLowerCase()) && (!t || 7 >= t);
				this.root = ("/" + this.root + "/").replace(w, "/"), t && this._wantsHashChange && (this.iframe = o.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(e)), this._hasPushState ? o.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !t ? o.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = e, e = this.location, t = e.pathname.replace(/[^\/]$/, "$&/") === this.root;
				if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !t) return this.fragment = this.getFragment(null, !0), this.location.replace(this.root + this.location.search + "#" + this.fragment), !0;
				this._wantsPushState && this._hasPushState && t && e.hash && (this.fragment = this.getHash().replace(b, ""), this.history.replaceState({}, document.title, this.root + this.fragment + e.search));
				if (!this.options.silent) return this.loadUrl()
			},
			stop: function() {
				o.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), clearInterval(this._checkUrlInterval), y.started = !1
			},
			route: function(e, t) {
				this.handlers.unshift({
					route: e,
					callback: t
				})
			},
			checkUrl: function() {
				var e = this.getFragment();
				e === this.fragment && this.iframe && (e = this.getFragment(this.getHash(this.iframe)));
				if (e === this.fragment) return !1;
				this.iframe && this.navigate(e), this.loadUrl() || this.loadUrl(this.getHash())
			},
			loadUrl: function(e) {
				var t = this.fragment = this.getFragment(e);
				return u.any(this.handlers, function(e) {
					if (e.route.test(t)) return e.callback(t), !0
				})
			},
			navigate: function(e, t) {
				if (!y.started) return !1;
				if (!t || !0 === t) t = {
					trigger: t
				};
				e = this.getFragment(e || "");
				if (this.fragment !== e) {
					this.fragment = e;
					var n = this.root + e;
					if (this._hasPushState) this.history[t.replace ? "replaceState" : "pushState"]({}, document.title, n);
					else {
						if (!this._wantsHashChange) return this.location.assign(n);
						this._updateHash(this.location, e, t.replace), this.iframe && e !== this.getFragment(this.getHash(this.iframe)) && (t.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, e, t.replace))
					}
					t.trigger && this.loadUrl(e)
				}
			},
			_updateHash: function(e, t, n) {
				n ? (n = e.href.replace(/(javascript:|#).*$/, ""), e.replace(n + "#" + t)) : e.hash = "#" + t
			}
		}), o.history = new y;
		var x = o.View = function(e) {
				this.cid = u.uniqueId("view"), this._configure(e || {}), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
			},
			T = /^(\S+)\s*(.*)$/,
			N = "model collection el id attributes className tagName events".split(" ");
		u.extend(x.prototype, n, {
			tagName: "div",
			$: function(e) {
				return this.$el.find(e)
			},
			initialize: function() {},
			render: function() {
				return this
			},
			remove: function() {
				return this.$el.remove(), this.stopListening(), this
			},
			setElement: function(e, t) {
				return this.$el && this.undelegateEvents(), this.$el = e instanceof o.$ ? e : o.$(e), this.el = this.$el[0], !1 !== t && this.delegateEvents(), this
			},
			delegateEvents: function(e) {
				if (e || (e = u.result(this, "events"))) {
					this.undelegateEvents();
					for (var t in e) {
						var n = e[t];
						u.isFunction(n) || (n = this[e[t]]);
						if (!n) throw Error('Method "' + e[t] + '" does not exist');
						var r = t.match(T),
							i = r[1],
							r = r[2],
							n = u.bind(n, this),
							i = i + (".delegateEvents" + this.cid);
						"" === r ? this.$el.on(i, n) : this.$el.on(i, r, n)
					}
				}
			},
			undelegateEvents: function() {
				this.$el.off(".delegateEvents" + this.cid)
			},
			_configure: function(e) {
				this.options && (e = u.extend({}, u.result(this, "options"), e)), u.extend(this, u.pick(e, N)), this.options = e
			},
			_ensureElement: function() {
				if (this.el) this.setElement(u.result(this, "el"), !1);
				else {
					var e = u.extend({}, u.result(this, "attributes"));
					this.id && (e.id = u.result(this, "id")), this.className && (e["class"] = u.result(this, "className")), e = o.$("<" + u.result(this, "tagName") + ">").attr(e), this.setElement(e, !1)
				}
			}
		});
		var C = {
			create: "POST",
			update: "PUT",
			patch: "PATCH",
			"delete": "DELETE",
			read: "GET"
		};
		o.sync = function(e, t, n) {
			var r = C[e];
			u.defaults(n || (n = {}), {
				emulateHTTP: o.emulateHTTP,
				emulateJSON: o.emulateJSON
			});
			var i = {
				type: r,
				dataType: "json"
			};
			n.url || (i.url = u.result(t, "url") || k()), null == n.data && t && ("create" === e || "update" === e || "patch" === e) && (i.contentType = "application/json", i.data = JSON.stringify(n.attrs || t.toJSON(n))), n.emulateJSON && (i.contentType = "application/x-www-form-urlencoded", i.data = i.data ? {
				model: i.data
			} : {});
			if (n.emulateHTTP && ("PUT" === r || "DELETE" === r || "PATCH" === r)) {
				i.type = "POST", n.emulateJSON && (i.data._method = r);
				var s = n.beforeSend;
				n.beforeSend = function(e) {
					e.setRequestHeader("X-HTTP-Method-Override", r);
					if (s) return s.apply(this, arguments)
				}
			}
			"GET" !== i.type && !n.emulateJSON && (i.processData = !1);
			var a = n.success;
			n.success = function(e) {
				a && a(t, e, n), t.trigger("sync", t, e, n)
			};
			var f = n.error;
			return n.error = function(e) {
				f && f(t, e, n), t.trigger("error", t, e, n)
			}, e = n.xhr = o.ajax(u.extend(i, n)), t.trigger("request", t, e, n), e
		}, o.ajax = function() {
			return o.$.ajax.apply(o.$, arguments)
		}, c.extend = h.extend = p.extend = x.extend = y.extend = function(e, t) {
			var n = this,
				r;
			r = e && u.has(e, "constructor") ? e.constructor : function() {
				return n.apply(this, arguments)
			}, u.extend(r, n, t);
			var i = function() {
				this.constructor = r
			};
			return i.prototype = n.prototype, r.prototype = new i, e && u.extend(r.prototype, e), r.__super__ = n.prototype, r
		};
		var k = function() {
			throw Error('A "url" property or function must be specified')
		}
	}.call(this), define("backbone", ["underscore", "jquery"], function(e) {
		return function() {
			var t, n;
			return t || e.Backbone
		}
	}(this)),
	function() {
		var e = {
			uuid: function(e) {
				function t() {
					return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1)
				}
				if (!e) return t() + t() + t() + t() + t() + t() + t() + t();
				var n = "";
				while (e--) n += t();
				return n
			},
			getUrlParameterByName: function(e, t) {
				var n = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"),
					r = new RegExp("[\\?&]" + n + "=([^&#]*)"),
					i = r.exec(typeof t != "undefined" && t || location.search);
				return i == null ? null : decodeURIComponent(i[1].replace(/\+/g, " "))
			},
			replaceUrlParameterByName: function(e, t, n) {
				var r = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"),
					i = typeof n != "undefined" && n || location.search,
					s = new RegExp("[\\?&]" + r + "=([^&#]*)"),
					o = s.exec(i);
				return i.replace(o[0].substr(1), t)
			},
			getHashParameterByName: function(e) {
				var t = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"),
					n = new RegExp("[\\#&]" + t + "=([^&#]*)"),
					r = n.exec(location.hash);
				return r == null ? null : decodeURIComponent(r[1].replace(/\+/g, " "))
			},
			replaceHashParameterByName: function(e, t) {
				var n = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"),
					r = new RegExp("[\\#&]" + n + "=([^&#]*)"),
					i = r.exec(location.hash);
				return location.hash.replace(i[0].substr(1), t)
			},
			parseTemplate: function(e) {
				var t = null;
				return typeof e == "function" && (t = e), typeof e == "string" && (t = _.template(e)), t
			},
			renderT: function(e, t, n, r, i) {
				if (!e) return !1;
				t || (t = {});
				var s = r || null,
					o = $.extend(!0, {}, t);
				s && typeof _gDebug != "undefined" && _gDebug && _g.debug && _g.debug.enabled && _g.debug.query_user_template(s) && !i && (e = _g.debug.query_user_template(s));
				if (n) {
					var u = {};
					u[n] = o, o = u
				}
				var a = _g.parseTemplate(e);
				s && _g.debug && _g.debug.enabled && (_g.debug.template[s] = {
					data: o,
					template: typeof e == "string" ? e : e.textsource,
					debug: !0
				});
				var f = $(a(o));
				return s && _g.debug && _g.debug.enabled && (_g.debug.template[s].el = f), _g.generator && (_g.generator.autoWidget(f), (f.hasClass("c-slimscroll") || f.find(".c-slimscroll").length) && _g.generator.autoScroll(f)), f.find("[data-toggle=tooltip],.c-tooltip-btn").each(function() {
					var e = $(this),
						t = $(this).data().template;
					t ? require(["text!" + t], function() {
						var n = require("text!" + t);
						e.tooltip({
							template: n
						})
					}) : $(this).tooltip()
				}), f
			},
			domExist: function(e, t) {
				return t || (t = document), typeof e == "string" && (e = $(e)), jQuery.contains(t.documentElement, e[0])
			},
			browserSupport: function(e) {
				var t = !1,
					n = {
						msie: 1,
						chrome: 1,
						mozilla: 1,
						safari: 1,
						opera: 1,
						success: null,
						fail: null
					};
				e = e ? $.extend(!0, {}, n, e) : $.extend(!0, {}, n);
				var r = parseInt($.browser.version, 10);
				return $.browser.msie && e.msie == 1 || $.browser.chrome && e.chrome == 1 || $.browser.mozilla && e.mozilla == 1 || $.browser.safari && e.safrai == 1 && $.browser.opera && e.opera == 1 ? t = !0 : $.browser.msie && e.msie == 0 || $.browser.chrome && e.chrome == 0 || $.browser.mozilla && e.mozilla == 0 || $.browser.safari && e.safrai == 0 && $.browser.opera && e.opera == 0 ? t = !1 : ($.browser.msie && (t = r >= e.msie), $.browser.chrome && (t = r >= e.chrome), $.browser.mozilla && (t = r >= e.mozilla), $.browser.opera && (t = r >= e.opera), $.browser.safari && (t = r >= e.safari)), t ? e.success && e.success() : e.fail && e.fail(), t
			},
			array: {
				moveup: function(e, t) {
					var n = e.indexOf(t);
					return n > 0 && (e = _g.array.swap(e, n, n - 1)), e
				},
				movedown: function(e, t) {
					var n = e.indexOf(t);
					return n < e.length && (e = _g.array.swap(e, n, n + 1)), e
				},
				swap: function(e, t, n) {
					return e[t] = e.splice(n, 1, e[t])[0], e
				},
				move2first: function(e, t) {
					var n = [];
					n.push(t);
					for (i = 0; i < e.length; i++) e[i] != t && n.push(e[i]);
					return n
				},
				move2last: function(e, t) {
					var n = [];
					for (i = 0; i < e.length; i++) e[i] != t && n.push(e[i]);
					return n.push(t), n
				},
				randomPick: function(e) {
					return e[Math.floor(Math.random() * e.length)]
				},
				maptree: function(e) {
					var t = {
						treesource: null,
						mapdata: null,
						idAttribute: "id"
					};
					e = e ? $.extend(!0, {}, t, e) : $.extend(!0, {}, t);
					if (!e.treesource || !e.mapdata) return [];
					var n = [];
					return _.each(e.treesource, function(t) {
						t.children && (t.children = _g.array.maptree({
							treesource: t.children,
							mapdata: e.mapdata,
							idAttribute: e.idAttribute
						}));
						var r = _.find(e.mapdata, function(n) {
							return n[e.idAttribute] == t[e.idAttribute]
						});
						r && (t = $.extend(!0, t, r)), n.push(t)
					}), n
				},
				toDict: function(e, t) {
					var n = {},
						r;
					for (i = 0; i < e.length; i++) r = e[i][t], n[r] = e[i];
					return n
				},
				treeToList: function(e, t, n) {
					var r = {
						childrenKey: "children",
						parentKey: "parent",
						idAttribute: "id"
					};
					t = t ? $.extend(!0, {}, r, t) : $.extend(!0, {}, r);
					if (!e) return [];
					var i = [];
					return _.each(e, function(r) {
						if (r[t.childrenKey].length) {
							var s = _g.array.toTreeList(r[t.childrenKey], t, n ? n : e);
							for (j = 0; j < s.length; j++) i.push(s[j]);
							r.children = _.pluck(r.children, "id")
						} else delete r.children;
						i.push(r)
					}), i
				},
				listToTree: function(e, t, n) {
					var r = {
						childrenKey: "children",
						parentKey: "parent",
						idAttribute: "id"
					};
					t = t ? $.extend(!0, {}, r, t) : $.extend(!0, {}, r);
					var i = [];
					return n && (e = _.map(e, function(e) {
						return typeof e == "string" && (e = _.find(n, function(n) {
							return n[t.idAttribute] == e
						})), e
					})), _.each(e, function(r) {
						var s = $.extend(!0, {}, r);
						n || s[t.parentKey], s[t.childrenKey] && s[t.childrenKey].length ? (s[t.childrenKey] = _g.array.listToTree(s[t.childrenKey], t, n ? n : e), i.push(s)) : i.push(s)
					}), i
				}
			},
			object: {
				jsonparse: function(e) {
					if (!e) return null;
					try {
						return a = JSON.parse(e), a
					} catch (t) {
						return e
					}
				},
				equal: function(e, t) {},
				treeToArray: function(e) {},
				getKeyByValue: function(e, t) {
					try {
						var n = _.keys(e)[_.values(e).indexOf(t)];
						return n
					} catch (r) {
						return undefined
					}
				}
			},
			string: {
				randomGenerate: function(e) {
					e = e ? e : 10;
					var t = "",
						n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
					for (var r = 0; r < e; r++) t += n.charAt(Math.floor(Math.random() * n.length));
					return t
				},
				getUrlExt: function(e) {
					return e.match(/(.[^.]+|)$/)[0]
				},
				getUrlNameWithOutExt: function(e) {
					return e.substr(0, e.lastIndexOf(".")) || e
				},
				getFileNameByPath: function(e) {
					return e.replace(/^.*[\\\/]/, "")
				},
				string2boolean: function(e) {
					return e == "true" ? !0 : !1
				},
				capitalize: function(e) {
					return e = e.substring(0, 1).toUpperCase() + e.substring(1), e
				},
				rmfirst: function(e) {
					return e.replace(/^.(\s+)?/, "")
				},
				rmlast: function(e) {
					return e.replace(/(\s+)?.$/, "")
				},
				isPureEng: function(e) {
					var t = 0,
						n = e;
					if (n == "") return !0;
					for (var r = 0; r < n.length; r++)
						if (!(n.charCodeAt(r) >= 48 && n.charCodeAt(r) <= 57 || n.charCodeAt(r) >= 65 && n.charCodeAt(r) <= 90 || n.charCodeAt(r) >= 97 && n.charCodeAt(r) <= 122)) return !1;
					return !0
				},
				isEng: function(e) {
					var t = 0,
						n = e;
					if (n == "") return !0;
					for (var r = 0; r < n.length; r++)
						if (!(n.charCodeAt(r) == 32 || n.charCodeAt(r) >= 48 && n.charCodeAt(r) <= 57 || n.charCodeAt(r) >= 65 && n.charCodeAt(r) <= 90 || n.charCodeAt(r) >= 97 && n.charCodeAt(r) <= 122)) return !1;
					return !0
				},
				isPureChi: function(e) {
					var t = 0,
						n = e;
					if (n == "") return !0;
					for (var r = 0; r < n.length; r++)
						if (!(n.charCodeAt(r) >= 19968 && n.charCodeAt(r) <= 64041)) return !1;
					return !0
				},
				isChi: function(e) {
					var t = 0,
						n = e;
					if (n == "") return !0;
					for (var r = 0; r < n.length; r++)
						if (!(n.charCodeAt(r) == 32 || n.charCodeAt(r) >= 19968 && n.charCodeAt(r) <= 64041)) return !1;
					return !0
				},
				autoName: function(e, t, n, r) {
					e || (e = ""), n || (n = ""), r || (r = 1);
					var i = e + r + n;
					return t.indexOf(i) != -1 ? _g.string.autoName(e, t, n, r + 1) : i
				}
			},
			"boolean": {
				randomPick: function() {
					return !!Math.round(Math.random() * 1)
				}
			},
			number: {
				random: function(e, t) {
					return typeof e == "undefined" && (e = 0), typeof t == "undefined" && (t = 100), Math.random() * (t - e) + e
				},
				randomInt: function(e, t) {
					return typeof e == "undefined" && (e = 0), typeof t == "undefined" && (t = 100), Math.floor(Math.random() * (t - e + 1)) + e
				},
				round: function(e, t) {
					var n = e;
					typeof t == undefined && (t = .5);
					var r = parseInt(e),
						i = e - r;
					i < t ? n = r : n = r + 1
				},
				rgbToHex: function(e, t, n) {
					return "#" + ((1 << 24) + (e << 16) + (t << 8) + n).toString(16).slice(1)
				},
				hexToRgb: function(e) {
					var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
					e = e.replace(t, function(e, t, n, r) {
						return t + t + n + n + r + r
					});
					var n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
					return n ? {
						r: parseInt(n[1], 16),
						g: parseInt(n[2], 16),
						b: parseInt(n[3], 16)
					} : null
				},
				decimal: function(e, t) {
					return Number(e.toFixed(t))
				}
			},
			hasTouch: function() {
				try {
					return document.createEvent("TouchEvent"), !0
				} catch (e) {
					return !1
				}
			}(),
			inIframe: function() {
				try {
					return window.self !== window.top
				} catch (e) {
					return !0
				}
			},
			supportFlash: function() {
				return typeof swfobject != "undefined" && swfobject.getFlashPlayerVersion().major !== 0 ? !0 : !1
			},
			isMSIE11: function() {
				return !!navigator.userAgent.match(/Trident\/7\./)
			},
			getRGBA: function(e, t) {
				t = t != undefined ? Number(t) : 1;
				if (!e) return "transparent";
				var n = _g.number.hexToRgb(e);
				if (n) var r = "rgba(" + n.r + "," + n.g + "," + n.b + "," + t + ")";
				else r = "rgba(255,255,255,1)";
				return r
			},
			weixinShare: function() {
				if (typeof wx_permissions != "undefined" && wx_permissions.onMenuShareTimeline) {
					var e = message_link + (message_link.indexOf("disableHistoryStart=0") >= 0 ? "#page/" + interaction_view.currentPage : ""),
						t = shareTitle == bookTitle ? descContent : shareTitle;
					wx.onMenuShareAppMessage({
						title: bookTitle,
						desc: t,
						link: e,
						imgUrl: imgUrl,
						trigger: function(e) {
							_gaq.push(["_trackEvent", "weixin", "share", "appmessage", "click"])
						},
						success: function(e) {
							_gaq.push(["_trackSocial", "Wechat", "appmessage", ga_opt_target, ga_opt_pagePath])
						},
						cancel: function(e) {
							_gaq.push(["_trackEvent", "weixin", "share", "appmessage", "cancel"])
						},
						fail: function(e) {
							_gaq.push(["_trackEvent", "error", "weixinjsapi", "appmessage", JSON.stringify(e)])
						}
					}), wx.onMenuShareTimeline({
						title: shareTitle,
						link: e,
						imgUrl: imgUrl,
						trigger: function(e) {
							_gaq.push(["_trackEvent", "weixin", "share", "timeline", "click"])
						},
						success: function(e) {
							_gaq.push(["_trackSocial", "Wechat", "timeline", ga_opt_target, ga_opt_pagePath])
						},
						cancel: function(e) {
							_gaq.push(["_trackEvent", "weixin", "share", "timeline", "cancel"])
						},
						fail: function(e) {
							_gaq.push(["_trackEvent", "error", "weixinjsapi", "timeline", JSON.stringify(e)])
						}
					}), wx.onMenuShareQQ({
						title: bookTitle,
						desc: t,
						link: e,
						imgUrl: imgUrl,
						trigger: function(e) {
							_gaq.push(["_trackEvent", "weixin", "share", "QQ", "click"])
						},
						complete: function(e) {
							_gaq.push(["_trackEvent", "weixin", "share", "QQ", "complete"])
						},
						success: function(e) {
							_gaq.push(["_trackSocial", "Wechat", "QQ", ga_opt_target, ga_opt_pagePath])
						},
						cancel: function(e) {
							_gaq.push(["_trackEvent", "weixin", "share", "QQ", "cancel"])
						},
						fail: function(e) {
							_gaq.push(["_trackEvent", "error", "weixinjsapi", "QQ", JSON.stringify(e)])
						}
					}), wx.onMenuShareWeibo({
						title: shareTitle,
						desc: descContent,
						link: message_link,
						imgUrl: imgUrl,
						trigger: function(e) {
							_gaq.push(["_trackEvent", "weixin", "share", "Weibo", "click"])
						},
						complete: function(e) {
							_gaq.push(["_trackEvent", "weixin", "share", "Weibo", "complete"])
						},
						success: function(e) {
							_gaq.push(["_trackSocial", "Wechat", "Weibo", ga_opt_target, ga_opt_pagePath])
						},
						cancel: function(e) {
							_gaq.push(["_trackEvent", "weixin", "share", "Weibo", "cancel"])
						},
						fail: function(e) {
							_gaq.push(["_trackEvent", "error", "weixinjsapi", "Weibo", JSON.stringify(e)])
						}
					})
				}
			}
		};
		typeof require == "undefined" ? (window._g || (window._g = {}), window._g = $.extend(!0, {}, window._g, e), e = undefined) : define("_g/base", ["jquery", "backbone"], function() {
			return window._g || (window._g = {}), window._g = $.extend(!0, {}, window._g, e), e = undefined, window._g
		})
	}(window),
	function() {
		var _g_mvc = {
			createModel: function(opts) {
				var defaults = {
					defaults: {},
					autoIndex: !0,
					autoUpdate: !0,
					autoRemove: !0,
					enableSync: !0,
					createUrl: null,
					updateUrl: null,
					removeUrl: null,
					fetchUrl: null,
					staticFetchUrl: null,
					staticRemoveUrl: null,
					staticCreateUrl: null,
					staticUpdateUrl: null,
					fetchUrlName: null,
					removeUrlName: null,
					createUrlName: null,
					updateUrlName: null,
					restful: !1,
					debug: !1,
					bindChange: null,
					bindRemove: null,
					callback: null,
					initView: null,
					patchKeys: null,
					initialize: function() {
						this.iViewlist = [], this.iCollectionlist = [];
						if (!this.get("id")) {
							this.set("isNew", !0);
							if (this.autoIndex) {
								var prefix = this.get("type") || this.get("iType") || "M";
								this.set("id", prefix + "_" + _g.uuid()), this.preset()
							} else this.save({}, {
								wait: !0,
								success: function(model, response) {
									var returned = eval(response);
									(returned.Status == "Success" || returned.code == 200) && model.set("id", returned.ID.toString()), model.preset()
								}
							})
						} else this.preset()
					},
					addView: function(e, t) {
						typeof t == "function" && (this[e] = new t({
							model: this
						}));
						if (typeof t == "object") {
							var n = _g.mvc.createView(t);
							this[e] = new n({
								model: this
							})
						}
						this[e] && this.iViewlist.push(this[e])
					},
					addCollection: function(e, t) {
						typeof t == "function" && (this[e] = new t);
						if (typeof view == "object") {
							var n = _g.mvc.createCollection(t);
							this[e] = new n
						}
						this[e] && this.iCollectionlist.push(this[e])
					},
					preset: function() {
						this.callback && this.callback(this);
						var e = this;
						this.autoUpdate && this.on("change", function() {
							e.updateAllViews()
						}), this.autoRemove && this.on("destroy", function(e, t, n) {
							e.removeAllViews(), e.bindRemove && e.bindRemove(e, n)
						}), this.bindChange && this.bindChange(), this.initView && this.addView("iview", this.initView)
					},
					updateAllViews: function() {
						_.each(this.iViewlist, function(e) {
							e.$el && e.update()
						})
					},
					removeView: function(e) {
						this[e] && (this[e].$el.remove(), this.iViewlist = _.reject(this.iViewlist, function(t) {
							return t == this[e]
						}), this[e] = null)
					},
					removeAllViews: function(e) {
						_.each(this.iViewlist, function(t) {
							t.$el && (e ? t.undelegateEvents() : t.$el.remove())
						})
					}
				};
				opts = opts ? $.extend(!0, {}, defaults, opts) : defaults;
				var Model = Backbone.Model.extend(opts);
				return Model
			},
			createView: function(e) {
				var t = {
					template: null,
					className: null,
					containment: null,
					wrap: null,
					wrapClassName: null,
					autoRender: !0,
					position: 1,
					parseData: null,
					callback: null,
					bindChange: null,
					parseTemplate: null,
					templateKey: null,
					templateName: null,
					afterRender: null,
					afterUpdate: null,
					initialize: function() {
						_.bindAll(this), this.autoRender && this.render(), this.callback && this.callback(this)
					},
					createEl: function() {
						var e = this.model.toJSON(),
							t;
						return this.parseData && (e = this.parseData()), this.parseTemplate ? t = this.parseTemplate(this.template) : t = this.template, _g.renderT(t, e, this.templateKey, this.templateName)
					},
					render: function(e, t) {
						var n = this;
						if (!this.model || !this.template) return !1;
						if (!_g.domExist(this.$el)) {
							if (!e && !this.containment) return !1;
							e || (e = $(this.containment)), t || (t = this.position), this.wrap && !$(this.containment).is(this.wrap) && ($(this.containment).children(this.wrap).length == 0 && $(this.containment).append(document.createElement(this.wrap)), e = $(this.containment).children(this.wrap), this.containment && this.wrapClassName && e.addClass(this.wrapClassName));
							var r = this.createEl(),
								i = r;
							return this.setElement(i), t == 1 ? e.append(i) : e.prepend(i), this.className && this.$el.addClass(this.className), this.afterRender && this.afterRender(this), this
						}
						var r = this.createEl(),
							i = r;
						this.$el.replaceWith(i), this.setElement(i), this.afterUpdate && this.afterUpdate(this)
					},
					update: function() {
						this.render()
					},
					afterUpdate: function() {
						this.afterRender && this.afterRender(this)
					},
					events: {}
				};
				e = e ? $.extend(!0, {}, t, e) : t;
				var n = Backbone.View.extend(e);
				return n
			},
			createCollection: function(e) {
				var t = {
					enableSync: !1,
					fetchUrl: null,
					staticFetchUrl: null,
					saveUrl: null,
					staticSaveUrl: null,
					debug: !1,
					bindRemove: !1,
					bindReset: !0,
					bindAdd: null,
					callback: null,
					patchKeys: null,
					name: null,
					initialize: function() {
						var e = this;
						this.bindRemove && this.on("remove", function(t) {
							typeof e.bindRemove == "function" ? e.bindRemove(t) : t.removeAllViews()
						}), this.bindReset && this.on("reset", function(t, n) {
							typeof e.bindReset == "function" ? e.bindReset(t, n) : _.each(n.previousModels, function(e) {
								e.removeAllViews()
							}), e.afterReset && e.afterReset(t, n)
						}), this.bindAdd && this.on("add", function(t) {
							e.bindAdd()
						}), this.callback && this.callback(this)
					},
					refreshView: function(e) {
						var t = {
							containment: null,
							viewname: null
						};
						e = e ? $.extend({}, t, e) : t, this.length > 0 && (_.each(this.at(0).iViewlist, function(t) {
							containment = e.containment || t.containment, containment && (t.wrap && !$(containment).is(t.wrap) ? $(containment).children(t.wrap).empty() : $(containment).empty())
						}), this.each(function(t) {
							e.containment && (t.iview.containment = e.containment), e.viewname ? t[viewname].update() : t.iview.update()
						}))
					},
					removeAllViews: function(e) {
						this.each(function(t) {
							t.removeAllViews(e)
						})
					}
				};
				e = e ? $.extend(!0, {}, t, e) : t;
				var n = Backbone.Collection.extend(e);
				return n
			}
		};
		typeof require == "undefined" ? (window._g || (window._g = {}), window._g.mvc = _g_mvc, _g_mvc = undefined) : define("_g/simplemvc", ["jquery", "backbone", "_g/base"], function() {
			return window._g.mvc = _g_mvc, _g_mvc = undefined, window._g.mvc
		})
	}(window), define("coolsite_play/varible/coolsite", [], function() {
		window.coolsite_play = {
			model: {
				animation: {},
				action: {},
				timeline: {},
				element: {},
				action: {}
			},
			view: {
				animation: {},
				action: {},
				timeline: {},
				element: {},
				action: {}
			},
			controller: {
				animation: {},
				action: {},
				timeline: {},
				element: {},
				action: {}
			},
			collection: {},
			ui: {},
			events: {},
			util: {},
			varible: {}
		}, coolsite_play.isPreview = !1, coolsite_play.scrollItems = [], coolsite_play.sectionItems = [], coolsite_play.currentActiveIndex = null, coolsite_play.isSectionSwitching = null, coolsite_play.isSectionLock = null
	}), define("coolsite_play/varible/animation", ["coolsite_play/varible/coolsite"], function() {
		coolsite_play.animationCommonArgs = {
			de: 0,
			du: 1,
			rp: 0,
			rv: 0,
			st: 1,
			es: 0,
			wa: 0
		}, coolsite_play.animationArgs = {
			1: {
				di: 0,
				dt: 0,
				dl: 0
			},
			2: {
				di: 0,
				dt: 0,
				dl: 0
			},
			3: {},
			4: {},
			7: {
				deg: 0,
				ax: 0
			},
			8: {
				op: 100
			},
			9: {
				sc: 1
			},
			10: {
				sc: 2,
				op: 50
			}
		}, coolsite_play.easeType = {
			0: "Linear.easeNone",
			1: "Power0.easeIn",
			2: "Power0.easeInOut",
			3: "Power0.easeOut",
			4: "Power1.easeIn",
			5: "Power1.easeInOut",
			6: "Power1.easeOut",
			7: "Power2.easeIn",
			8: "Power2.easeInOut",
			9: "Power2.easeOut",
			10: "Power3.easeIn",
			11: "Power3.easeInOut",
			12: "Power3.easeOut",
			13: "Power4.easeIn",
			14: "Power4.easeInOut",
			15: "Power4.easeOut",
			16: "Quad.easeIn",
			17: "Quad.easeInOut",
			18: "Quad.easeOut",
			19: "Cubic.easeIn",
			20: "Cubic.easeInOut",
			21: "Cubic.easeOut",
			22: "Quart.easeIn",
			23: "Quart.easeInOut",
			24: "Quart.easeOut",
			25: "Quint.easeIn",
			26: "Quint.easeInOut",
			27: "Quint.easeOut",
			28: "Strong.easeIn",
			29: "Strong.easeInOut",
			30: "Strong.easeOut",
			31: "Back.easeIn",
			32: "Back.easeInOut",
			33: "Back.easeOut",
			34: "Bounce.easeIn",
			35: "Bounce.easeInOut",
			36: "Bounce.easeOut",
			37: "Circ.easeIn",
			38: "Circ.easeInOut",
			39: "Circ.easeOut",
			40: "Elastic.easeIn",
			41: "Elastic.easeInOut",
			42: "Elastic.easeOut",
			43: "Expo.easeIn",
			44: "Expo.easeInOut",
			45: "Expo.easeOut",
			46: "Sine.easeIn",
			47: "Sine.easeInOut",
			48: "Sine.easeOut",
			49: "SlowMo.ease"
		}
	}), define("coolsite_play/varible/element", ["coolsite_play/varible/coolsite"], function() {
		coolsite_play.elementReference = {
			"c-section": "section",
			"c-container": "container",
			"c-image": "image",
			"c-slider": "slider",
			"c-button": "button",
			"c-row": "row",
			"c-column": "column",
			"c-paragraph": "c-paragraph",
			"c-heading": "heading",
			"c-div": "div",
			"c-list": "list",
			"c-listitem": "listitem",
			"c-textblock": "textblock",
			"c-slidermask": "slidermask",
			"c-slide": "slide",
			"c-linkblock": "lineblock",
			"c-textlink": "textlink",
			"c-leftarrow": "leftarrow",
			"c-rightarrow": "rightarrow",
			"c-icon": "icon",
			"c-slidernav": "slidernav",
			"c-slidernavdot": "slidernavdot"
		}, coolsite_play.elementState = {
			state1: "c-state1",
			state2: "c-state2",
			state3: "c-state3"
		}
	}), define("coolsite_play/varible/main", ["coolsite_play/varible/coolsite", "coolsite_play/varible/animation", "coolsite_play/varible/element"], function() {
		coolsite_play.varible.init = function(e) {
			coolsite_play.animationlist = new coolsite_play.collection.animation, coolsite_play.timelinelist = new coolsite_play.collection.timeline, coolsite_play.sliderlist = new coolsite_play.collection.slider, coolsite_play.actionlist = new coolsite_play.collection.action
		}
	}), define("coolsite_play/collection/animation/animation", ["_g/simplemvc", "coolsite_play/varible/main"], function() {
		var e = {
			model: function(e, t) {
				return new coolsite_play.model.animation.animation(e, t)
			},
			bindRemove: function(e) {},
			bindAdd: function(e) {},
			afterReset: function(e, t) {}
		};
		coolsite_play.collection.animation = _g.mvc.createCollection(e)
	}), define("coolsite_play/collection/timeline/timeline", ["_g/simplemvc", "coolsite_play/varible/main"], function() {
		var e = {
			model: function(e, t) {
				return new coolsite_play.model.timeline.timeline(e, t)
			},
			bindRemove: function(e) {},
			bindAdd: function(e) {},
			afterReset: function(e, t) {}
		};
		coolsite_play.collection.timeline = _g.mvc.createCollection(e)
	}), define("coolsite_play/collection/element/element", ["_g/simplemvc", "coolsite_play/varible/main"], function() {
		var e = {
			enableSync: !1,
			generate: function(e) {
				e.children().each(function() {})
			}
		};
		coolsite_play.collection.element = _g.mvc.createCollection(e)
	}), define("coolsite_play/controller/element/element", ["coolsite_play/varible/main"], function() {
		coolsite_play.controller.element.element = {
			scrollUpIn: function(e) {
				console.log("slider scroll in")
			}
		}
	}), define("coolsite_play/view/element/element", ["coolsite_play/varible/main", "coolsite_play/controller/element/element"], function() {
		coolsite_play.view.element.element = {
			autoRender: !1,
			events: coolsite_play.controller.element.element
		}
	}), define("coolsite_play/model/element/element", ["_g/simplemvc", "coolsite_play/varible/main", "coolsite_play/view/element/element"], function() {
		var e = {
			enableSync: !1,
			autoIndex: !0,
			initView: coolsite_play.view.element.element,
			callback: function() {}
		};
		coolsite_play.model.element.element = _g.mvc.createModel(e)
	}), define("coolsite_play/controller/element/slider", ["coolsite_play/controller/element/element"], function() {
		coolsite_play.controller.element.slider = $.extend(!0, {}, coolsite_play.controller.element.element, {
			scrollUpIn: function(e) {
				if (!$(e.target).is(this.$el)) return;
				console.log("slider scroll in"), this.model.start(), this.model.onChangeTo(null, 0)
			},
			switchTo: function(e, t) {
				if (!$(e.target).is(this.$el)) return;
				console.log(t), this.model.switchSlide(t)
			}
		})
	}), define("coolsite_play/view/element/slider", ["coolsite_play/view/element/element", "coolsite_play/controller/element/slider"], function() {
		coolsite_play.view.element.slider = $.extend(!0, {}, coolsite_play.view.element.element, {
			events: coolsite_play.controller.element.slider,
			afterRender: function() {
				this.slidernav = this.$el.children(".c-slider-nav"), this.slidernavdots = this.slidernav.children(".c-slider-nav-dot"), this.slidermask = this.$el.children(".c-slider-mask"), this.slides = this.slidermask.children(".c-slide");
				var e = this.model.get("args");
				coolsite_play.isPreview || (this.model.transition = coolsite_play.slider(this.slidermask, e), this.model.transition.refreshSlideClass(this.slidermask, 0), this.slidernavdots.first().addClass("c-active"), this.model.transition.currentIndex = 0)
			}
		})
	}), define("coolsite_play/model/element/slider", ["coolsite_play/model/element/element", "coolsite_play/view/element/slider"], function() {
		coolsite_play.model.element.slider = coolsite_play.model.element.element.extend({
			initView: coolsite_play.view.element.slider,
			start: function() {
				var e = this,
					t = this.get("args");
				this.transition = transition = this.getTransition();
				if (!this.silderStart) {
					this.sliderStart = !0, this.iview.$el.children(".c-leftarrow").on("click", function() {
						e.switchSlide("prev")
					}), this.iview.$el.children(".c-rightarrow").on("click", function() {
						e.switchSlide("next")
					}), coolsite_play.isPreview || _.each(this.iview.slidernavdots, function(t, n) {
						$(t).on("click", function() {
							e.switchSlide(n)
						})
					}), this.iview.$el.children(".c-slider-mask").data("sliderId", this.id);
					if (!Number(t.ap)) return;
					transition.enableTimer(), transition.timerStart({})
				}
			},
			stop: function() {
				this.sliderStart && (this.transition.timerStop(), this.iview.$el.children(".c-leftarrow").off("click"), this.iview.$el.children(".c-rightarrow").off("click"), coolsite_play.isPreview || this.iview.slidernavdots.off("click"), this.sliderStart = !1)
			},
			switchSlide: function(e) {
				if (this.transition && this.transition.isTransiting) return;
				var t = this.get("args");
				e == "prev" && (this.transition.TimerDirection = 1, this.transition.autostart(t.type, "x", 1)), e == "next" && this.transition.autostart(t.type, "x", -1);
				if (_.isNumber(e)) {
					if (e == this.transition.currentIndex) return null;
					e > this.transition.currentIndex ? direction = -1 : direction = 1, this.transition.currentIndex = e, this.transition.prepareNextClass(this.iview.slidermask, e, direction), this.transition.TimerDirection = direction, this.transition.Timer && window.clearTimeout(this.transition.Timer), this.transition.tempCurrent = e, this.transition.autostart(t.type, "x", direction), this.transition.TimerDirection = -1
				}
			},
			onChangeTo: function(e, t) {
				if (coolsite_play.isPreview || coolsite_play.isPlay) _.isNumber(e) && this.iview.slides.eq(e).trigger("recover"), this.iview.slides.eq(t).trigger("changeTo")
			},
			getTransition: function() {
				if (this.transition) return this.transition;
				var e = this.iview.$el.attr("data-c_sliderid"),
					t = coolsite_editor.elementlist.get(e);
				return t.transition
			}
		})
	}), define("coolsite_play/collection/element/slider", ["coolsite_play/collection/element/element", "coolsite_play/model/element/slider"], function() {
		coolsite_play.collection.slider = coolsite_play.collection.element.extend({
			model: coolsite_play.model.element.slider,
			generate: function() {
				var e = this;
				this.reset([], {
					silent: !0
				}), $(document).find(".c-slider").each(function() {
					var t = e.getArgs(this);
					e.add({
						args: t
					}), e.last().iview.setElement(this), e.last().iview.afterRender()
				})
			},
			getArgs: function(e) {
				var t = $(e).attr("data-c_slider_args"),
					t = t.split(";"),
					n = {};
				return _.each(t, function(e) {
					var t = e.split(":");
					n[t[0]] = t[1]
				}), n
			},
			stop: function() {
				this.each(function(e) {
					e.stop()
				})
			}
		})
	}), define("coolsite_play/collection/action/action", ["_g/simplemvc", "coolsite_play/varible/main"], function() {
		var e = {
			model: function(e, t) {
				return new coolsite_play.model.action.action(e, t)
			},
			bindRemove: function(e) {},
			bindAdd: function(e) {},
			afterReset: function(e, t) {}
		};
		coolsite_play.collection.action = _g.mvc.createCollection(e)
	}), define("coolsite_play/collection/main", ["coolsite_play/collection/animation/animation", "coolsite_play/collection/timeline/timeline", "coolsite_play/collection/element/element", "coolsite_play/collection/element/slider", "coolsite_play/collection/action/action"], function() {}), define("coolsite_play/controller/animation/animation", ["coolsite_play/varible/main"], function() {
		coolsite_play.controller.animation.animation = {}
	}), define("coolsite_play/view/animation/animation", ["coolsite_play/varible/main", "coolsite_play/controller/animation/animation"], function() {
		coolsite_play.view.animation.animation = {
			autoRender: !1,
			events: coolsite_play.controller.animation.animation,
			stashStyle: function() {
				this.tmpClass = this.$el.attr("class"), this.tmpStyle = this.$el.attr("style")
			},
			recoverStyle: function() {
				this.$el.attr("class", this.tmpClass), this.$el.attr("style", this.tmpStyle)
			}
		}
	}), define("coolsite_play/model/animation/animation", ["_g/simplemvc", "coolsite_play/varible/main", "coolsite_play/view/animation/animation"], function() {
		var e = {
			enableSync: !1,
			autoIndex: !0,
			element: null,
			bindRemove: function(e, t) {},
			callback: function() {},
			initView: coolsite_play.view.animation.animation
		};
		coolsite_play.model.animation.animation = _g.mvc.createModel(e)
	}), define("coolsite_play/controller/timeline/timeline", ["coolsite_play/varible/main"], function() {
		coolsite_play.controller.timeline.timeline = {
			scrollIn: function(e) {
				if (!$(e.target).is(this.$el)) return;
				this.model.play()
			},
			recover: function(e) {
				if (!$(e.target).is(this.$el)) return;
				this.model.recoverStyle()
			},
			changeTo: function(e) {
				if (!$(e.target).is(this.$el)) return;
				this.model.play()
			},
			c_active: function(e) {
				if (!$(e.target).is(this.$el)) return
			},
			c_deactive: function(e) {
				if (!$(e.target).is(this.$el)) return
			},
			t_start: function(e) {
				if (!$(e.target).is(this.$el)) return;
				this.$el.attr("data-c_tl_locked") == "locked" ? coolsite_play.isSectionLock = this.model.id : coolsite_play.isSectionLock = !1
			},
			t_end: function(e) {
				if (!$(e.target).is(this.$el)) return;
				coolsite_play.isSectionLock == this.model.id && (coolsite_play.isSectionLock = !1)
			}
		}
	}), define("coolsite_play/view/timeline/timeline", ["coolsite_play/varible/main", "coolsite_play/controller/timeline/timeline"], function() {
		coolsite_play.view.timeline.timeline = {
			autoRender: !1,
			events: coolsite_play.controller.timeline.timeline
		}
	}), define("coolsite_play/model/timeline/timeline", ["_g/simplemvc", "coolsite_play/varible/main", "coolsite_play/view/timeline/timeline"], function() {
		var e = {
			enableSync: !1,
			autoIndex: !0,
			element: null,
			bindRemove: function(e, t) {},
			callback: function() {},
			initView: coolsite_play.view.timeline.timeline,
			play: function() {
				var e = this.getArgs();
				if (e && e.st == 2 && this.played) return;
				this.played = !0, this.animations || (this.animations = this.get("animations"), this.animations && this.animations.length && (this.animations = _.map(this.animations, function(e) {
					var t = coolsite_play.animationlist.get(e);
					return t ? t : null
				}), this.animations = _.reject(this.animations, function(e) {
					return !e
				}), this.animations = _.reject(this.animations, function(e) {
					return e.toJSON().data.t.wa
				}))), console.log({
					animations: this.animations
				}), this.timeline || (this.timeline = coolsite_play.util.timeline.createTimeline({
					animations: this.animations,
					args: e,
					model: this
				})), this.timeline.play(0)
			},
			stop: function() {
				this.timeline && this.timeline.kill()
			},
			recoverStyle: function() {
				var e = this.getArgs();
				if (e && e.st == 2 && this.played) return;
				this.animations && _.each(this.animations, function(e) {
					e.iview.recoverStyle()
				})
			},
			getArgs: function() {
				var e = this.get("data");
				return e.t
			}
		};
		coolsite_play.model.timeline.timeline = _g.mvc.createModel(e)
	}), define("coolsite_play/controller/action/action", ["coolsite_play/varible/main"], function() {
		coolsite_play.controller.action.action = {
			c_start: function(e) {
				if (!$(e.target).is(this.$el)) return;
				if (this.model.type == 6) return this.execute(e), !1
			},
			click: function(e) {
				console.log("element click");
				if (this.model.type == 0) return this.execute(e), !1
			},
			dblclick: function(e) {
				console.log("element dblclick");
				if (this.model.type == 4) return this.execute(e), !1
			},
			mouseover: function(e) {
				console.log("element mouseover");
				if (this.model.type == 20) return this.execute(e), !1
			},
			mouseout: function(e) {
				console.log("element mouseout");
				if (this.model.type == 21) return this.execute(e), !1
			},
			c_scroll: function(e) {
				console.log("element mouseout"), this.model.type == 23 && this.execute(e)
			},
			c_scrollUp: function(e) {
				if (!$(e.target).is(this.$el)) return;
				console.log("element mouseout"), this.model.type == 24 && this.execute(e)
			},
			c_scrollDown: function(e) {
				if (!$(e.target).is(this.$el)) return;
				console.log("element mouseout"), this.model.type == 25 && this.execute(e)
			},
			scrollIn: function(e) {
				if (!$(e.target).is(this.$el)) return;
				console.log("element mouseout"), this.model.type == 26 && this.execute(e)
			},
			scrollUpIn: function(e) {
				if (!$(e.target).is(this.$el)) return;
				console.log("element mouseout"), this.model.type == 27 && this.execute(e)
			},
			scrollDownIn: function(e) {
				if (!$(e.target).is(this.$el)) return;
				console.log("element mouseout"), this.model.type == 28 && this.execute(e)
			},
			scrollOut: function(e) {
				if (!$(e.target).is(this.$el)) return;
				console.log("element mouseout"), this.model.type == 29 && this.execute(e)
			},
			scrollUpOut: function(e) {
				if (!$(e.target).is(this.$el)) return;
				console.log("element mouseout"), this.model.type == 30 && this.execute(e)
			},
			scrollDownOut: function(e) {
				if (!$(e.target).is(this.$el)) return;
				console.log("element mouseout"), this.model.type == 31 && this.execute(e)
			},
			changeTo: function(e) {
				if (!$(e.target).is(this.$el)) return;
				console.log("element changeTo"), this.model.type == 5 && this.execute(e)
			},
			c_active: function(e) {
				if (!$(e.target).is(this.$el)) return;
				this.model.type == 33 && this.execute(e)
			},
			c_deactive: function(e) {
				if (!$(e.target).is(this.$el)) return;
				this.model.type == 34 && this.execute(e)
			}
		}
	}), define("coolsite_play/view/action/action", ["coolsite_play/varible/main", "coolsite_play/controller/action/action"], function() {
		coolsite_play.view.action.action = {
			autoRender: !1,
			events: coolsite_play.controller.action.action,
			execute: function(e) {
				var t = this.model.getArgs();
				if (t && t.st == 2 && this.model.triggered) return !1;
				this.model.triggered = !0;
				var n = this.model.get("data").exec,
					r = null;
				switch (n) {
					case 0:
						this.renderAnimations();
						break;
					case 1:
						this.renderShow();
						break;
					case 2:
						this.renderHide();
						break;
					case 5:
						this.renderUrl();
						break;
					case 6:
						this.renderSwitch();
						break;
					case 10:
						this.renderUrl();
						break;
					case 16:
						this.renderPhone();
						break;
					case 30:
						this.renderHash();
						break;
					case 20:
						this.renderToggle();
						break;
					case 21:
						this.renderClass("add");
						break;
					case 22:
						this.renderClass("remove");
						break;
					case 23:
						this.renderClass("toggle");
						break;
					case 26:
						this.renderState();
						break;
					case 27:
						this.renderDialog("open", e);
						break;
					case 28:
						this.renderDialog("close", e);
						break;
					case 29:
						this.renderDialog("toggle", e);
						break;
					case 32:
						this.renderHtml("load");
						break;
					case 33:
						this.renderHtml("unload");
						break;
					case 52:
						this.renderMedia("play");
						break;
					case 53:
						this.renderMedia("pause");
						break;
					case 54:
						this.renderMedia("stop");
						break;
					case 55:
						this.renderMedia("toggle")
				}
			},
			renderAnimations: function() {
				var e = this.model.getArgs();
				this.animations || (this.animations = e.a_ids, this.animations && this.animations.length && (this.animations = _.map(this.animations, function(e) {
					var t = coolsite_play.animationlist.get(e);
					return t ? t : null
				}), this.animations = _.reject(this.animations, function(e) {
					return !e
				}))), this.timeline || (this.timeline = coolsite_play.util.timeline.createTimeline({
					animations: this.animations,
					args: e
				})), this.timeline.play(0)
			},
			getEl: function(e) {
				var t = $("[data-c_e_id=" + e + "]");
				return t.length > 1 && this.model.siblingIndex != undefined && t[this.model.siblingIndex] ? t = $(t[this.model.siblingIndex]) : t = t, t
			},
			renderShow: function() {
				var e = this,
					t = this.model.getArgs(),
					n = t.e_ids;
				_.each(n, function(t) {
					var n = e.getEl(t);
					n.length && (n.removeClass("c-initHide"), n.removeClass("cf-initHide"), n.show())
				})
			},
			renderHide: function() {
				var e = this,
					t = this.model.getArgs(),
					n = t.e_ids;
				_.each(n, function(t) {
					var n = e.getEl(t);
					n.length && n.hide()
				})
			},
			renderToggle: function() {
				var e = this,
					t = this.model.getArgs(),
					n = t.e_ids;
				_.each(n, function(t) {
					var n = e.getEl(t);
					n.length && (n.hasClass("c-initHide") || n.hasClass("cf-initHide") ? (n.removeClass("c-initHide"), n.removeClass("cf-initHide"), n.show()) : n.toggle())
				})
			},
			renderClass: function(e, t) {
				var n = this,
					r = this.model.getArgs();
				t || (t = r.cla);
				var i = r.e_ids;
				if (!t) return;
				_.each(i, function(r) {
					var i = n.getEl(r);
					i.length && (e == "add" && i.addClass(t), e == "remove" && i.removeClass(t), e == "toggle" && i.toggleClass(t))
				})
			},
			renderDialog: function(e, t) {
				var n = this,
					r = this.model.getArgs(),
					i = r.e_ids;
				_.each(i, function(r) {
					var i = n.getEl(r);
					if (i.length) {
						var s = $(t.target).closest("[data-c_contentview_id]");
						if (s.length) {
							var o = s.attr("data-c_contentview_id");
							console.log(o);
							if (i.find("[data-c_e_id=" + o + "]").length) {
								var u = s.attr("data-c_content_url");
								if (u) {
									i.find("[data-c_e_id=" + o + "]").empty();
									var a = $.ajax({
										url: u,
										type: "GET",
										dataType: "html",
										success: function(e) {
											i && i.find("[data-c_e_id=" + o + "]").length && i.find("[data-c_e_id=" + o + "]").replaceWith(e)
										},
										error: function() {},
										timeout: 1e4
									})
								}
							}
						}
						e == "open" ? (i.removeClass("c-initHide"), i.removeClass("cf-initHide"), i.show(), window.setTimeout(function() {
							i.addClass("c-dialog-open")
						}, 300)) : e == "close" ? (i.removeClass("c-dialog-open"), window.setTimeout(function() {
							i.hide()
						}, 300)) : e == "toggle" && (i.hasClass("c-dialog-open") ? (i.removeClass("c-dialog-open"), window.setTimeout(function() {
							i.hide()
						}, 300)) : (i.removeClass("c-initHide"), i.removeClass("cf-initHide"), i.show(), window.setTimeout(function() {
							i.addClass("c-dialog-open")
						}, 300)))
					}
				})
			},
			renderMedia: function(e) {
				var t = this.model.getArgs(),
					n = t.e_ids;
				_.each(n, function(t) {
					switch (e) {
						case "play":
							_g.html5media.play(t);
							break;
						case "pause":
							_g.html5media.pause(t);
							break;
						case "stop":
							_g.html5media.stop(t);
							break;
						case "toggle":
							_g.html5media.toggle(t)
					}
				})
			},
			renderState: function(e) {
				var t = this,
					n = this.model.getArgs();
				e || (e = n.cla);
				var r = n.e_ids;
				_.each(r, function(n) {
					var r = t.getEl(n);
					if (r.length) {
						e != "c-state1" && r.removeClass("c-state1"), e != "c-state2" && r.removeClass("c-state2"), e != "c-state3" && r.removeClass("c-state3");
						if (!e) return;
						r.addClass(e)
					}
				})
			},
			renderUrl: function() {
				var e = this.model.getArgs();
				if (!e.url) return;
				var t = this.model.get("data").exec;
				t == 10 ? e.url.indexOf("#") != 0 && e.url.indexOf("://") == -1 && (e.url = "http://" + e.url) : t == 5 && typeof portal_url != "undefined" && (e.url = portal_url + e.url);
				if (e.blank) {
					if (!!coolsite_play.isPreview) return coolsite_editor.ui.message.show("warning", coolsite_editor.WARN[100]), !1;
					window.open(e.url)
				} else {
					if (!!coolsite_play.isPreview) return coolsite_editor.ui.message.show("warning", coolsite_editor.WARN[100]), !1;
					window.location.href = e.url
				}
			},
			renderHash: function() {
				var e = this.model.getArgs();
				if (!e.url) return;
				coolsite_play.events.scroll.doHashScroll(null, e.url)
			},
			renderPhone: function() {
				var e = this.model.getArgs();
				if (!e.url) return;
				window.location = "tel:" + e.url
			},
			renderHtml: function(e) {
				var t = this,
					n = this.model.getArgs(),
					r = n.e_ids;
				_.each(r, function(n) {
					var r = t.getEl(n);
					r.length && (e == "load" ? (r.removeClass("c-initHide"), r.removeClass("cf-initHide"), r.show(), r.attr("data-src") && r.attr("src", r.attr("data-src")), r.attr("data-srcdoc") && (_g.device.msie() ? r[0].contentWindow.document.write(r.attr("data-srcdoc")) : r.attr("srcdoc", r.attr("data-srcdoc")))) : e == "unload" && (r.attr("src") && r.removeAttr("src"), r.attr("srcdoc") && (_g.device.msie() ? r[0].contentWindow.document.write("") : r.removeAttr("srcdoc"))))
				})
			},
			renderSwitch: function() {
				var e = this,
					t = this.model.getArgs(),
					n = t.e_ids;
				_.each(n, function(n) {
					var r = e.getEl(n);
					r.length && r.trigger("switchTo", t.i)
				})
			}
		}
	}), define("coolsite_play/model/action/action", ["_g/simplemvc", "coolsite_play/varible/main", "coolsite_play/view/action/action"], function() {
		var e = {
			enableSync: !1,
			autoIndex: !0,
			element: null,
			bindRemove: function(e, t) {},
			callback: function() {
				this.type = this.get("data").type, this.exec = this.get("data").exec
			},
			initView: coolsite_play.view.action.action,
			getArgs: function() {
				var e = this.get("data").args;
				return e
			},
			getType: function() {
				var e = this.get("data").type;
				return e
			}
		};
		coolsite_play.model.action.action = _g.mvc.createModel(e)
	}), define("coolsite_play/model/main", ["coolsite_play/model/animation/animation", "coolsite_play/model/timeline/timeline", "coolsite_play/model/element/element", "coolsite_play/model/element/slider", "coolsite_play/model/action/action"], function() {}), define("coolsite_play/util/animation", ["coolsite_play/varible/main"], function() {
		coolsite_play.util.animation = {
			generate: function() {
				coolsite_play.doc.find("[data-c_ani_id]").each(function() {
					var e = this,
						t = $(this).attr("data-c_ani_id"),
						n = String(t).split("|");
					for (i = 0; i < n.length; i++) coolsite_play.animationlist.each(function(t) {
						if (t.id == n[i])
							if (!t.hasEl) t.iview.setElement(e), t.iview.stashStyle(), t.hasEl = !0;
							else {
								var r = $.extend(!0, {}, t.toJSON());
								delete r.id, coolsite_play.animationlist.add(r);
								var s = coolsite_play.animationlist.last();
								s.iview.setElement(e), s.iview.stashStyle(), s.hasEl = !0, t.siblingIds || (t.siblingIds = []), t.siblingIds.push(s.id)
							}
					})
				})
			}
		}
	}), define("coolsite_play/util/timeline", ["coolsite_play/varible/main"], function() {
		coolsite_play.util.timeline = {
			generate: function() {
				coolsite_play.doc.find("[data-c_tl_id]").each(function() {
					var e = $(this).attr("data-c_tl_id"),
						t = this,
						n = String(e).split("|");
					for (i = 0; i < n.length; i++) coolsite_play.timelinelist.each(function(e) {
						e.id == n[i] && e.iview.setElement(t)
					})
				})
			},
			createTimeline: function(e) {
				var t = _g.timeline.create(e);
				return t
			},
			stopAll: function() {
				coolsite_play.timelinelist.each(function(e) {
					e.stop()
				})
			}
		}
	}), define("coolsite_play/util/action", ["coolsite_play/varible/main"], function() {
		coolsite_play.util.action = {
			generate: function() {
				coolsite_play.doc.find("[data-c_act_id]").each(function() {
					var e = this,
						t = $(this).attr("data-c_act_id"),
						n = String(t).split("|");
					for (i = 0; i < n.length; i++) coolsite_play.actionlist.each(function(t) {
						if (t.id == n[i])
							if (!t.hasEl) t.iview.setElement(e), t.getType() == 0 && t.iview.$el.addClass("c-action-click"), t.hasEl = !0;
							else {
								var r = $.extend(!0, {}, t.toJSON());
								delete r.id, coolsite_play.actionlist.add(r);
								var s = coolsite_play.actionlist.last();
								s.iview.setElement(e), s.hasEl = !0, t.siblingIds || (t.isSibling = !0, t.siblingIndex = 0, t.siblingIds = []), t.getType() == 0 && s.iview.$el.addClass("c-action-click"), t.siblingIds.push(s.id), s.isSibling = !0, s.siblingIndex = t.siblingIds.length
							}
					})
				})
			}
		}
	}), define("coolsite_play/util/video", ["coolsite_play/varible/main"], function() {
		coolsite_play.util.video = {
			init: function() {
				_g.html5media.collect(document, "data-c_e_id")
			},
			stopAll: function() {
				_g.html5media.stopAll()
			}
		}
	}), define("coolsite_play/util/form", function() {}), define("coolsite_play/util/main", ["coolsite_play/util/animation", "coolsite_play/util/timeline", "coolsite_play/util/action", "coolsite_play/util/video", "coolsite_play/util/form"], function() {}), define("coolsite_play/events/scroll", ["coolsite_play/varible/main"], function() {
		coolsite_play.events.scroll = {
			init: function() {
				coolsite_play.events.scroll.refresh(), $("body").trigger("scrollIn"), $("body").trigger("scrollUpIn");
				var e = $(window).scrollTop(),
					t, n = coolsite_play.events.scroll.getScrollHeight(),
					r = n - $(window).height(),
					s = coolsite_play.sectionItems;
				$("body").find(".c-section,.c-slider").each(function() {
					$(this).offset().top < e + $(window).height() && (console.log(this), $(this).addClass("c-scrollIn"), $(this).trigger("scrollIn"), $(this).trigger("scrollUpIn"))
				});
				if (s.length)
					if (e >= r) coolsite_play.events.scroll.activate(s.length - 1);
					else if (e <= s[0].top) coolsite_play.events.scroll.activate(0);
				else
					for (i = 0; i < s.length; i++) e >= s[i].top && (!s[i + 1] || e <= s[i + 1].top) && coolsite_play.events.scroll.activate(i);
				coolsite_play.events.scroll.lastst = e, coolsite_play.scroll_offset = 0, $(window).bind("scroll", coolsite_play.events.scroll.handle), $(window).bind("resize", coolsite_play.events.scroll.resizehandle)
			},
			refresh: function() {
				coolsite_play.scrollItems = [], coolsite_play.sectionItems = [];
				var e = $("body").find(".c-section,.c-slider");
				e.map(function() {
					var e = $(this).offset().top,
						t = $(this).offset().top + $(this).height(),
						n = $(this).hasClass("c-section") ? "section" : $(this).hasClass("c-slider") ? "slider" : "other";
					return {
						top: e,
						bottom: t,
						target: this
					}
				}).sort(function(e, t) {
					return e.top - t.top
				}).each(function() {
					coolsite_play.scrollItems.push(this), $(this.target).hasClass("c-section") && $(this.target).attr("data-c_spy") == "scroll" && coolsite_play.sectionItems.push(this)
				}), coolsite_play.scrollHeight = coolsite_play.events.scroll.getScrollHeight(), console.log(coolsite_play.scrollItems)
			},
			getScrollHeight: function() {
				return Math.max($("body")[0].scrollHeight, document.documentElement.scrollHeight)
			},
			handle: function(e) {
				var t = $(this).scrollTop(),
					n, r = coolsite_play.events.scroll.getScrollHeight(),
					i = r - $(window).height(),
					s, o, u = coolsite_play.scrollItems,
					a = coolsite_play.sectionItems;
				coolsite_play.scrollHeight != r && coolsite_play.events.scroll.refresh(), t > coolsite_play.events.scroll.lastst ? n = 1 : n = 0, coolsite_play.events.scroll.lastst = t, $("body").trigger("c_scroll"), $("body").trigger(n == 1 ? "c_scrollUp" : "c_scrollDown");
				if (a.length)
					if (t >= i) coolsite_play.events.scroll.activate(a.length - 1);
					else if (t <= a[0].top) coolsite_play.events.scroll.activate(0);
				else
					for (s = 0; s < a.length; s++) n ? t >= a[s].top && (!a[s + 1] || t <= a[s + 1].top) && coolsite_play.events.scroll.activate(s) : t <= a[s].top && (!a[s - 1] || t >= a[s - 1].top) && coolsite_play.events.scroll.activate(s - 1);
				for (s = 0; s < u.length; s++) {
					var f = u[s].target,
						l = u[s].top,
						c = u[s].bottom;
					n ? l < t + $(window).height() && c - t > 0 ? $(f).hasClass("c-scrollIn") ? ($(f).trigger("c_scroll"), $(f).trigger("c_scrollUp")) : ($(f).addClass("c-scrollIn"), $(f).trigger("scrollIn"), $(f).trigger("scrollUpIn"), console.log("upIn")) : $(f).hasClass("c-scrollIn") && ($(f).removeClass("c-scrollIn"), $(f).trigger("scrollOut"), $(f).trigger("scrollUpOut"), $(f).trigger("recover"), console.log("upOut")) : c - t > 0 && l < t + $(window).height() ? $(f).hasClass("c-scrollIn") ? ($(f).trigger("c_scroll"), $(f).trigger("c_scrollDown")) : ($(f).addClass("c-scrollIn"), $(f).trigger("scrollIn"), $(f).trigger("scrollDownIn")) : $(f).hasClass("c-scrollIn") && ($(f).removeClass("c-scrollIn"), $(f).trigger("scrollOut"), $(f).trigger("scrollDownOut"), $(f).trigger("recover"))
				}
			},
			activate: function(e) {
				var t = coolsite_play.sectionItems;
				if (coolsite_play.currentActiveIndex == null || coolsite_play.currentActiveIndex != e) {
					if (coolsite_play.currentActiveIndex != null) {
						$(t[coolsite_play.currentActiveIndex].target).trigger("c_deactive");
						var n = t[coolsite_play.currentActiveIndex].target.id;
						if (n) {
							var r = $("[href=#" + n + "]");
							r.length && r.each(function() {
								$(this).attr("data-c_spy") == "scroll" && $(this).parent("li").length && $(this).parent("li").removeClass("active")
							})
						}
					}
					console.log(coolsite_play.currentActiveIndex + ":deactive"), $(t[e].target).trigger("c_active"), coolsite_play.currentActiveIndex = e, console.log(e + ":active");
					var n = t[e].target.id;
					if (n) {
						var r = $("[href=#" + n + "]");
						r.length && r.each(function() {
							$(this).attr("data-c_spy") == "scroll" && $(this).parent("li").length && $(this).parent("li").addClass("active")
						})
					}
				}
			},
			resizehandle: function(e) {
				coolsite_play.events.scroll.refresh()
			},
			bindHashScroll: function() {
				$("a[href^='#'][data-toggle!='tab']").bind("click", coolsite_play.events.scroll.doHashScroll)
			},
			unBindHashScroll: function() {
				$("a[href^='#'][data-toggle!='tab']").unbind("click", coolsite_play.events.scroll.doHashScroll)
			},
			doHashScroll: function(e, t) {
				return t || (t = $(this).attr("href")), $(t).length && $("html, body").animate({
					scrollTop: $(t).offset().top
				}, 800), !1
			},
			doScrollByElement: function(e) {
				if (coolsite_play.isSectionSwitching || coolsite_play.isSectionLock) return;
				$(e).length && $("html, body").animate({
					scrollTop: $(e).offset().top
				}, 800)
			},
			doSectionSwitch: function(e, t) {
				var n = $(e).prev(".c-section-switch").length ? $(e).prev(".c-section-switch") : $(e).prev(".c-section") ? $(e).prev(".c-section") : null,
					r = $(e).next(".c-section-switch").length ? $(e).next(".c-section-switch") : $(e).next(".c-section") ? $(e).next(".c-section") : null;
				t && (coolsite_play.isSectionSwitching || r && (coolsite_play.events.scroll.doScrollByElement(r), coolsite_play.isSectionSwitching = e, window.setTimeout(function() {
					coolsite_play.isSectionSwitching = null
				}, 1e3))), t || coolsite_play.isSectionSwitching || n && (coolsite_play.events.scroll.doScrollByElement(n), coolsite_play.isSectionSwitching = e, window.setTimeout(function() {
					coolsite_play.isSectionSwitching = null
				}, 1e3))
			},
			stop: function() {
				$(window).unbind("scroll", coolsite_play.events.scroll.handle), $(window).unbind("resize", coolsite_play.events.scroll.resizehandle), coolsite_play.currentActiveIndex = null
			}
		}
	}), define("coolsite_play/events/dialog", ["coolsite_play/varible/main"], function() {
		coolsite_play.events.dialog = {
			init: function() {
				$(document).find(".c-modal").on("click", ".dialog-close", coolsite_play.events.dialog.handleDialogClose)
			},
			handleDialogClose: function() {
				var e = $(this).closest(".c-modal");
				return e.removeClass("c-dialog-open"), window.setTimeout(function() {
					e.hide()
				}, 300), !1
			},
			stop: function() {
				$(document).find(".c-modal").off("click", ".dialog-close", coolsite_play.events.dialog.handleDialogClose)
			}
		}
	}), define("coolsite_play/events/html", ["coolsite_play/varible/main"], function() {
		coolsite_play.events.html = {
			init: function() {
				_g.device.msie() && $(document).find("iframe.c-iframe").each(function() {
					if ($(this).attr("srcdoc")) {
						var e = $(this).attr("srcdoc");
						this.contentWindow.document.write(e)
					}
				})
			}
		}
	}), define("coolsite_play/events/mousewheel", ["coolsite_play/varible/main"], function() {
		coolsite_play.events.mousewheel = {
			init: function() {
				$("body").find(".c-section-switch").each(function() {
					$(this).on("mousewheel", coolsite_play.events.mousewheel.handlemousewheel)
				})
			},
			stop: function() {
				$("body").find(".c-section-switch").each(function() {
					$(this).off("mousewheel", coolsite_play.events.mousewheel.handlemousewheel)
				})
			},
			handlemousewheel: function(e) {
				var t = e.currentTarget,
					n = null;
				if (e.deltaY < -10 || coolsite_play.isWindows && e.deltaY < 0) n = 1;
				if (e.deltaY > 10 || coolsite_play.isWindows && e.deltaY > 0) n = 0;
				n != null && coolsite_play.events.scroll.doSectionSwitch(t, n), e.preventDefault()
			}
		}
	}), define("coolsite_play/events/touch", ["coolsite_play/varible/main"], function() {
		coolsite_play.events.touch = {
			init: function() {
				$("body").find(".c-section-switch").each(function() {
					$(this).hammer().on("dragup", function(e) {
						return console.log("dragup"), deltaY = e.gesture.deltaY, coolsite_play.events.touch.handletouch(e, 1), e.gesture.preventDefault(), !1
					}), $(this).hammer().on("dragdown", function(e) {
						return console.log("dragdown"), deltaY = e.gesture.deltaY, coolsite_play.events.touch.handletouch(e, 0), e.gesture.preventDefault(), !1
					})
				});
				var e = !1;
				$("body").hammer().on("drag", function(t) {
					if (!e) {
						var n = _.filter(_g.html5media.medias, function(e) {
							return e.type == "audio" && e.autoplay
						});
						if (n.length) try {
							n[0].media.play(), e = !0
						} catch (r) {
							e = !1
						} else e = !0
					}
				})
			},
			handletouch: function(e, t) {
				var n = e.currentTarget;
				coolsite_play.events.scroll.doSectionSwitch(n, t)
			}
		}
	}), define("coolsite_play/events/form", ["coolsite_play/varible/main"], function() {
		coolsite_play.events.form = {
			init: function() {
				$("form textarea").each(function() {
					$(this).html() == "    " && $(this).html("")
				}), $("[data-c_form]").each(function() {
					$(this).bind("submit", coolsite_play.events.form.bind)
				})
			},
			bind: function() {
				var e = $(this),
					t = $(this).attr("data-action");
				if (!t) return !1;
				var n = $.ajax({
					url: t,
					type: "POST",
					dataType: "JSON",
					data: $(this).serialize(),
					beforeSend: function(e) {
						e.setRequestHeader("X-CSRFToken", coolsite_play.readCookie("csrftoken"))
					},
					traditional: !0,
					success: function(t) {
						e.find(".c-error").removeClass("c-error");
						if (t.code == 200) e.addClass("c-success"), e.removeClass("c-error"), coolsite_play.events.form.handleRedirect(e);
						else {
							e.addClass("c-error");
							var n = t.msg;
							_.each(n, function(t, n) {
								var r = e.find("[name=" + n + "]");
								r.is("input[type=radio]") || r.is("input[type=checkbox]") ? r.parent().addClass("c-error") : e.find("[name=" + n + "]").addClass("c-error")
							})
						}
					},
					error: function() {},
					timeout: 1e4
				});
				return !1
			},
			stop: function() {
				$("[data-c_form]").each(function() {
					$(this).unbind("submit", coolsite_play.events.form.bind)
				})
			},
			handleRedirect: function(e) {
				var t = e.attr("data-url"),
					n = e.attr("data-page"),
					r = e.attr("data-target"),
					i;
				if (t) i = t, i.indexOf("#") != 0 && i.indexOf("://") == -1 && (i = "http://" + i);
				else {
					if (!n) return !1;
					i = n, typeof portal_url != "undefined" && (i = portal_url + i)
				}
				if (r) {
					if (!!coolsite_play.isPreview) return coolsite_editor.ui.message.show("warning", coolsite_editor.WARN[100]), !1;
					window.open(i)
				} else {
					if (!!coolsite_play.isPreview) return coolsite_editor.ui.message.show("warning", coolsite_editor.WARN[100]), !1;
					window.location.href = i
				}
			}
		}
	}), define("coolsite_play/events/main", ["coolsite_play/events/scroll", "coolsite_play/events/dialog", "coolsite_play/events/html", "coolsite_play/events/mousewheel", "coolsite_play/events/touch", "coolsite_play/events/form"], function() {}), define("coolsite_play/view/main", ["coolsite_play/view/animation/animation", "coolsite_play/view/timeline/timeline", "coolsite_play/view/element/element", "coolsite_play/view/element/slider", "coolsite_play/view/action/action"], function() {}), define("coolsite_play/controller/main", ["coolsite_play/controller/animation/animation", "coolsite_play/controller/timeline/timeline", "coolsite_play/controller/element/element", "coolsite_play/controller/element/slider", "coolsite_play/controller/action/action"], function() {});
var _gsScope = typeof module != "undefined" && module.exports && typeof global != "undefined" ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
		_gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(e, t, n) {
				var r = function(e) {
						var t = [],
							n = e.length,
							r;
						for (r = 0; r !== n; t.push(e[r++]));
						return t
					},
					i = function(e, t, r) {
						n.call(this, e, t, r), this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = i.prototype.render
					},
					s = 1e-10,
					o = n._internals,
					u = o.isSelector,
					a = o.isArray,
					f = i.prototype = n.to({}, .1, {}),
					l = [];
				i.version = "1.13.2", f.constructor = i, f.kill()._gc = !1, i.killTweensOf = i.killDelayedCallsTo = n.killTweensOf, i.getTweensOf = n.getTweensOf, i.lagSmoothing = n.lagSmoothing, i.ticker = n.ticker, i.render = n.render, f.invalidate = function() {
					return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), n.prototype.invalidate.call(this)
				}, f.updateTo = function(e, t) {
					var r = this.ratio,
						i;
					t && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
					for (i in e) this.vars[i] = e[i];
					if (this._initted)
						if (t) this._initted = !1;
						else {
							this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && n._onPluginEvent("_onDisable", this);
							if (this._time / this._duration > .998) {
								var s = this._time;
								this.render(0, !0, !1), this._initted = !1, this.render(s, !0, !1)
							} else if (this._time > 0) {
								this._initted = !1, this._init();
								var o = 1 / (1 - r),
									u = this._firstPT,
									a;
								while (u) a = u.s + u.c, u.c *= o, u.s = a - u.c, u = u._next
							}
						}
					return this
				}, f.render = function(e, t, n) {
					this._initted || this._duration === 0 && this.vars.repeat && this.invalidate();
					var r = this._dirty ? this.totalDuration() : this._totalDuration,
						i = this._time,
						u = this._totalTime,
						a = this._cycle,
						f = this._duration,
						c = this._rawPrevTime,
						h, p, d, v, m, g, y, b, w;
					if (e >= r) this._totalTime = r, this._cycle = this._repeat, this._yoyo && (this._cycle & 1) !== 0 ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = f, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (h = !0, p = "onComplete"), f === 0 && (this._initted || !this.vars.lazy || n) && (this._startTime === this._timeline._duration && (e = 0), (e === 0 || c < 0 || c === s) && c !== e && (n = !0, c > s && (p = "onReverseComplete")), this._rawPrevTime = b = !t || e || c === e ? e : s);
					else if (e < 1e-7) {
						this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
						if (u !== 0 || f === 0 && c > 0 && c !== s) p = "onReverseComplete", h = this._reversed;
						e < 0 && (this._active = !1, f === 0 && (this._initted || !this.vars.lazy || n) && (c >= 0 && (n = !0), this._rawPrevTime = b = !t || e || c === e ? e : s)), this._initted || (n = !0)
					} else {
						this._totalTime = this._time = e, this._repeat !== 0 && (v = f + this._repeatDelay, this._cycle = this._totalTime / v >> 0, this._cycle !== 0 && this._cycle === this._totalTime / v && this._cycle--, this._time = this._totalTime - this._cycle * v, this._yoyo && (this._cycle & 1) !== 0 && (this._time = f - this._time), this._time > f ? this._time = f : this._time < 0 && (this._time = 0));
						if (this._easeType) {
							m = this._time / f, g = this._easeType, y = this._easePower;
							if (g === 1 || g === 3 && m >= .5) m = 1 - m;
							g === 3 && (m *= 2), y === 1 ? m *= m : y === 2 ? m *= m * m : y === 3 ? m *= m * m * m : y === 4 && (m *= m * m * m * m), g === 1 ? this.ratio = 1 - m : g === 2 ? this.ratio = m : this._time / f < .5 ? this.ratio = m / 2 : this.ratio = 1 - m / 2
						} else this.ratio = this._ease.getRatio(this._time / f)
					}
					if (i === this._time && !n && a === this._cycle) {
						u !== this._totalTime && this._onUpdate && (t || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || l));
						return
					}
					if (!this._initted) {
						this._init();
						if (!this._initted || this._gc) return;
						if (!n && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) {
							this._time = i, this._totalTime = u, this._rawPrevTime = c, this._cycle = a, o.lazyTweens.push(this), this._lazy = [e, t];
							return
						}
						this._time && !h ? this.ratio = this._ease.getRatio(this._time / f) : h && this._ease._calcEnd && (this.ratio = this._ease.getRatio(this._time === 0 ? 0 : 1))
					}
					this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== i && e >= 0 && (this._active = !0), u === 0 && (this._initted === 2 && e > 0 && this._init(), this._startAt && (e >= 0 ? this._startAt.render(e, t, n) : p || (p = "_dummyGS")), this.vars.onStart && (this._totalTime !== 0 || f === 0) && (t || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || l))), d = this._firstPT;
					while (d) d.f ? d.t[d.p](d.c * this.ratio + d.s) : d.t[d.p] = d.c * this.ratio + d.s, d = d._next;
					this._onUpdate && (e < 0 && this._startAt && this._startTime && this._startAt.render(e, t, n), t || (this._totalTime !== u || h) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || l)), this._cycle !== a && (t || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || l)), p && (!this._gc || n) && (e < 0 && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(e, t, n), h && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[p] && this.vars[p].apply(this.vars[p + "Scope"] || this, this.vars[p + "Params"] || l), f === 0 && this._rawPrevTime === s && b !== s && (this._rawPrevTime = 0))
				}, i.to = function(e, t, n) {
					return new i(e, t, n)
				}, i.from = function(e, t, n) {
					return n.runBackwards = !0, n.immediateRender = n.immediateRender != 0, new i(e, t, n)
				}, i.fromTo = function(e, t, n, r) {
					return r.startAt = n, r.immediateRender = r.immediateRender != 0 && n.immediateRender != 0, new i(e, t, r)
				}, i.staggerTo = i.allTo = function(e, t, s, o, f, c, h) {
					o = o || 0;
					var p = s.delay || 0,
						d = [],
						v = function() {
							s.onComplete && s.onComplete.apply(s.onCompleteScope || this, arguments), f.apply(h || this, c || l)
						},
						m, g, y, b;
					a(e) || (typeof e == "string" && (e = n.selector(e) || e), u(e) && (e = r(e))), m = e.length;
					for (y = 0; y < m; y++) {
						g = {};
						for (b in s) g[b] = s[b];
						g.delay = p, y === m - 1 && f && (g.onComplete = v), d[y] = new i(e[y], t, g), p += o
					}
					return d
				}, i.staggerFrom = i.allFrom = function(e, t, n, r, s, o, u) {
					return n.runBackwards = !0, n.immediateRender = n.immediateRender != 0, i.staggerTo(e, t, n, r, s, o, u)
				}, i.staggerFromTo = i.allFromTo = function(e, t, n, r, s, o, u, a) {
					return r.startAt = n, r.immediateRender = r.immediateRender != 0 && n.immediateRender != 0, i.staggerTo(e, t, r, s, o, u, a)
				}, i.delayedCall = function(e, t, n, r, s) {
					return new i(t, 0, {
						delay: e,
						onComplete: t,
						onCompleteParams: n,
						onCompleteScope: r,
						onReverseComplete: t,
						onReverseCompleteParams: n,
						onReverseCompleteScope: r,
						immediateRender: !1,
						useFrames: s,
						overwrite: 0
					})
				}, i.set = function(e, t) {
					return new i(e, 0, t)
				}, i.isTweening = function(e) {
					return n.getTweensOf(e, !0).length > 0
				};
				var c = function(e, t) {
						var r = [],
							i = 0,
							s = e._first;
						while (s) s instanceof n ? r[i++] = s : (t && (r[i++] = s), r = r.concat(c(s, t)), i = r.length), s = s._next;
						return r
					},
					h = i.getAllTweens = function(t) {
						return c(e._rootTimeline, t).concat(c(e._rootFramesTimeline, t))
					};
				i.killAll = function(e, n, r, i) {
					n == null && (n = !0), r == null && (r = !0);
					var s = h(i != 0),
						o = s.length,
						u = n && r && i,
						a, f, l;
					for (l = 0; l < o; l++) {
						f = s[l];
						if (u || f instanceof t || (a = f.target === f.vars.onComplete) && r || n && !a) e ? f.totalTime(f._reversed ? 0 : f.totalDuration()) : f._enabled(!1, !1)
					}
				}, i.killChildTweensOf = function(e, t) {
					if (e == null) return;
					var s = o.tweenLookup,
						f, l, c, h, p;
					typeof e == "string" && (e = n.selector(e) || e), u(e) && (e = r(e));
					if (a(e)) {
						h = e.length;
						while (--h > -1) i.killChildTweensOf(e[h], t);
						return
					}
					f = [];
					for (c in s) {
						l = s[c].target.parentNode;
						while (l) l === e && (f = f.concat(s[c].tweens)), l = l.parentNode
					}
					p = f.length;
					for (h = 0; h < p; h++) t && f[h].totalTime(f[h].totalDuration()), f[h]._enabled(!1, !1)
				};
				var p = function(e, n, r, i) {
					n = n !== !1, r = r !== !1, i = i !== !1;
					var s = h(i),
						o = n && r && i,
						u = s.length,
						a, f;
					while (--u > -1) f = s[u], (o || f instanceof t || (a = f.target === f.vars.onComplete) && r || n && !a) && f.paused(e)
				};
				return i.pauseAll = function(e, t, n) {
					p(!0, e, t, n)
				}, i.resumeAll = function(e, t, n) {
					p(!1, e, t, n)
				}, i.globalTimeScale = function(t) {
					var r = e._rootTimeline,
						i = n.ticker.time;
					return arguments.length ? (t = t || s, r._startTime = i - (i - r._startTime) * r._timeScale / t, r = e._rootFramesTimeline, i = n.ticker.frame, r._startTime = i - (i - r._startTime) * r._timeScale / t, r._timeScale = e._rootTimeline._timeScale = t, t) : r._timeScale
				}, f.progress = function(e) {
					return arguments.length ? this.totalTime(this.duration() * (this._yoyo && (this._cycle & 1) !== 0 ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
				}, f.totalProgress = function(e) {
					return arguments.length ? this.totalTime(this.totalDuration() * e, !1) : this._totalTime / this.totalDuration()
				}, f.time = function(e, t) {
					return arguments.length ? (this._dirty && this.totalDuration(), e > this._duration && (e = this._duration), this._yoyo && (this._cycle & 1) !== 0 ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : this._repeat !== 0 && (e += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(e, t)) : this._time
				}, f.duration = function(t) {
					return arguments.length ? e.prototype.duration.call(this, t) : this._duration
				}, f.totalDuration = function(e) {
					return arguments.length ? this._repeat === -1 ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = this._repeat === -1 ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
				}, f.repeat = function(e) {
					return arguments.length ? (this._repeat = e, this._uncache(!0)) : this._repeat
				}, f.repeatDelay = function(e) {
					return arguments.length ? (this._repeatDelay = e, this._uncache(!0)) : this._repeatDelay
				}, f.yoyo = function(e) {
					return arguments.length ? (this._yoyo = e, this) : this._yoyo
				}, i
			}, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(e, t, n) {
				var r = function(e) {
						t.call(this, e), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
						var n = this.vars,
							r, i;
						for (i in n) r = n[i], u(r) && r.join("").indexOf("{self}") !== -1 && (n[i] = this._swapSelfInParams(r));
						u(n.tweens) && this.add(n.tweens, 0, n.align, n.stagger)
					},
					i = 1e-10,
					s = n._internals,
					o = s.isSelector,
					u = s.isArray,
					a = s.lazyTweens,
					f = s.lazyRender,
					l = [],
					c = _gsScope._gsDefine.globals,
					h = function(e) {
						var t = {},
							n;
						for (n in e) t[n] = e[n];
						return t
					},
					p = function(e, t, n, r) {
						var i = e._timeline._totalTime;
						if (t || !this._forcingPlayhead) e._timeline.pause(e._startTime), t && t.apply(r || e._timeline, n || l), this._forcingPlayhead && e._timeline.seek(i)
					},
					d = function(e) {
						var t = [],
							n = e.length,
							r;
						for (r = 0; r !== n; t.push(e[r++]));
						return t
					},
					v = r.prototype = new t;
				return r.version = "1.13.2", v.constructor = r, v.kill()._gc = v._forcingPlayhead = !1, v.to = function(e, t, r, i) {
					var s = r.repeat && c.TweenMax || n;
					return t ? this.add(new s(e, t, r), i) : this.set(e, r, i)
				}, v.from = function(e, t, r, i) {
					return this.add((r.repeat && c.TweenMax || n).from(e, t, r), i)
				}, v.fromTo = function(e, t, r, i, s) {
					var o = i.repeat && c.TweenMax || n;
					return t ? this.add(o.fromTo(e, t, r, i), s) : this.set(e, i, s)
				}, v.staggerTo = function(e, t, i, s, u, a, f, l) {
					var c = new r({
							onComplete: a,
							onCompleteParams: f,
							onCompleteScope: l,
							smoothChildTiming: this.smoothChildTiming
						}),
						p;
					typeof e == "string" && (e = n.selector(e) || e), o(e) && (e = d(e)), s = s || 0;
					for (p = 0; p < e.length; p++) i.startAt && (i.startAt = h(i.startAt)), c.to(e[p], t, h(i), p * s);
					return this.add(c, u)
				}, v.staggerFrom = function(e, t, n, r, i, s, o, u) {
					return n.immediateRender = n.immediateRender != 0, n.runBackwards = !0, this.staggerTo(e, t, n, r, i, s, o, u)
				}, v.staggerFromTo = function(e, t, n, r, i, s, o, u, a) {
					return r.startAt = n, r.immediateRender = r.immediateRender != 0 && n.immediateRender != 0, this.staggerTo(e, t, r, i, s, o, u, a)
				}, v.call = function(e, t, r, i) {
					return this.add(n.delayedCall(0, e, t, r), i)
				}, v.set = function(e, t, r) {
					return r = this._parseTimeOrLabel(r, 0, !0), t.immediateRender == null && (t.immediateRender = r === this._time && !this._paused), this.add(new n(e, 0, t), r)
				}, r.exportRoot = function(e, t) {
					e = e || {}, e.smoothChildTiming == null && (e.smoothChildTiming = !0);
					var i = new r(e),
						s = i._timeline,
						o, u;
					t == null && (t = !0), s._remove(i, !0), i._startTime = 0, i._rawPrevTime = i._time = i._totalTime = s._time, o = s._first;
					while (o) u = o._next, (!t || !(o instanceof n && o.target === o.vars.onComplete)) && i.add(o, o._startTime - o._delay), o = u;
					return s.add(i, 0), i
				}, v.add = function(i, s, o, a) {
					var f, l, c, h, p, d;
					typeof s != "number" && (s = this._parseTimeOrLabel(s, 0, !0, i));
					if (!(i instanceof e)) {
						if (i instanceof Array || i && i.push && u(i)) {
							o = o || "normal", a = a || 0, f = s, l = i.length;
							for (c = 0; c < l; c++) u(h = i[c]) && (h = new r({
								tweens: h
							})), this.add(h, f), typeof h != "string" && typeof h != "function" && (o === "sequence" ? f = h._startTime + h.totalDuration() / h._timeScale : o === "start" && (h._startTime -= h.delay())), f += a;
							return this._uncache(!0)
						}
						if (typeof i == "string") return this.addLabel(i, s);
						if (typeof i != "function") throw "Cannot add " + i + " into the timeline; it is not a tween, timeline, function, or string.";
						i = n.delayedCall(0, i)
					}
					t.prototype.add.call(this, i, s);
					if (this._gc || this._time === this._duration)
						if (!this._paused && this._duration < this.duration()) {
							p = this, d = p.rawTime() > i._startTime;
							while (p._timeline) d && p._timeline.smoothChildTiming ? p.totalTime(p._totalTime, !0) : p._gc && p._enabled(!0, !1), p = p._timeline
						}
					return this
				}, v.remove = function(t) {
					if (t instanceof e) return this._remove(t, !1);
					if (t instanceof Array || t && t.push && u(t)) {
						var n = t.length;
						while (--n > -1) this.remove(t[n]);
						return this
					}
					return typeof t == "string" ? this.removeLabel(t) : this.kill(null, t)
				}, v._remove = function(e, n) {
					t.prototype._remove.call(this, e, n);
					var r = this._last;
					return r ? this._time > r._startTime + r._totalDuration / r._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
				}, v.append = function(e, t) {
					return this.add(e, this._parseTimeOrLabel(null, t, !0, e))
				}, v.insert = v.insertMultiple = function(e, t, n, r) {
					return this.add(e, t || 0, n, r)
				}, v.appendMultiple = function(e, t, n, r) {
					return this.add(e, this._parseTimeOrLabel(null, t, !0, e), n, r)
				}, v.addLabel = function(e, t) {
					return this._labels[e] = this._parseTimeOrLabel(t), this
				}, v.addPause = function(e, t, n, r) {
					return this.call(p, ["{self}", t, n, r], this, e)
				}, v.removeLabel = function(e) {
					return delete this._labels[e], this
				}, v.getLabelTime = function(e) {
					return this._labels[e] != null ? this._labels[e] : -1
				}, v._parseTimeOrLabel = function(t, n, r, i) {
					var s;
					if (i instanceof e && i.timeline === this) this.remove(i);
					else if (i && (i instanceof Array || i.push && u(i))) {
						s = i.length;
						while (--s > -1) i[s] instanceof e && i[s].timeline === this && this.remove(i[s])
					}
					if (typeof n == "string") return this._parseTimeOrLabel(n, r && typeof t == "number" && this._labels[n] == null ? t - this.duration() : 0, r);
					n = n || 0;
					if (typeof t != "string" || !isNaN(t) && this._labels[t] == null) t == null && (t = this.duration());
					else {
						s = t.indexOf("=");
						if (s === -1) return this._labels[t] == null ? r ? this._labels[t] = this.duration() + n : n : this._labels[t] + n;
						n = parseInt(t.charAt(s - 1) + "1", 10) * Number(t.substr(s + 1)), t = s > 1 ? this._parseTimeOrLabel(t.substr(0, s - 1), 0, r) : this.duration()
					}
					return Number(t) + n
				}, v.seek = function(e, t) {
					return this.totalTime(typeof e == "number" ? e : this._parseTimeOrLabel(e), t !== !1)
				}, v.stop = function() {
					return this.paused(!0)
				}, v.gotoAndPlay = function(e, t) {
					return this.play(e, t)
				}, v.gotoAndStop = function(e, t) {
					return this.pause(e, t)
				}, v.render = function(e, t, n) {
					this._gc && this._enabled(!0, !1);
					var r = this._dirty ? this.totalDuration() : this._totalDuration,
						s = this._time,
						o = this._startTime,
						u = this._timeScale,
						c = this._paused,
						h, p, d, v, m;
					if (e >= r) this._totalTime = this._time = r, this._reversed || this._hasPausedChild() || (p = !0, v = "onComplete", this._duration === 0 && (e === 0 || this._rawPrevTime < 0 || this._rawPrevTime === i) && this._rawPrevTime !== e && this._first && (m = !0, this._rawPrevTime > i && (v = "onReverseComplete"))), this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : i, e = r + 1e-4;
					else if (e < 1e-7) {
						this._totalTime = this._time = 0;
						if (s !== 0 || this._duration === 0 && this._rawPrevTime !== i && (this._rawPrevTime > 0 || e < 0 && this._rawPrevTime >= 0)) v = "onReverseComplete", p = this._reversed;
						e < 0 ? (this._active = !1, this._rawPrevTime >= 0 && this._first && (m = !0), this._rawPrevTime = e) : (this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : i, e = 0, this._initted || (m = !0))
					} else this._totalTime = this._time = this._rawPrevTime = e;
					if ((this._time === s || !this._first) && !n && !m) return;
					this._initted || (this._initted = !0), this._active || !this._paused && this._time !== s && e > 0 && (this._active = !0), s === 0 && this.vars.onStart && this._time !== 0 && (t || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || l));
					if (this._time >= s) {
						h = this._first;
						while (h) {
							d = h._next;
							if (this._paused && !c) break;
							if (h._active || h._startTime <= this._time && !h._paused && !h._gc) h._reversed ? h.render((h._dirty ? h.totalDuration() : h._totalDuration) - (e - h._startTime) * h._timeScale, t, n) : h.render((e - h._startTime) * h._timeScale, t, n);
							h = d
						}
					} else {
						h = this._last;
						while (h) {
							d = h._prev;
							if (this._paused && !c) break;
							if (h._active || h._startTime <= s && !h._paused && !h._gc) h._reversed ? h.render((h._dirty ? h.totalDuration() : h._totalDuration) - (e - h._startTime) * h._timeScale, t, n) : h.render((e - h._startTime) * h._timeScale, t, n);
							h = d
						}
					}
					this._onUpdate && (t || (a.length && f(), this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || l))), v && !this._gc && (o === this._startTime || u !== this._timeScale) && (this._time === 0 || r >= this.totalDuration()) && (p && (a.length && f(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[v] && this.vars[v].apply(this.vars[v + "Scope"] || this, this.vars[v + "Params"] || l))
				}, v._hasPausedChild = function() {
					var e = this._first;
					while (e) {
						if (e._paused || e instanceof r && e._hasPausedChild()) return !0;
						e = e._next
					}
					return !1
				}, v.getChildren = function(e, t, r, i) {
					i = i || -9999999999;
					var s = [],
						o = this._first,
						u = 0;
					while (o) o._startTime < i || (o instanceof n ? t !== !1 && (s[u++] = o) : (r !== !1 && (s[u++] = o), e !== !1 && (s = s.concat(o.getChildren(!0, t, r)), u = s.length))), o = o._next;
					return s
				}, v.getTweensOf = function(e, t) {
					var r = this._gc,
						i = [],
						s = 0,
						o, u;
					r && this._enabled(!0, !0), o = n.getTweensOf(e), u = o.length;
					while (--u > -1)
						if (o[u].timeline === this || t && this._contains(o[u])) i[s++] = o[u];
					return r && this._enabled(!1, !0), i
				}, v._contains = function(e) {
					var t = e.timeline;
					while (t) {
						if (t === this) return !0;
						t = t.timeline
					}
					return !1
				}, v.shiftChildren = function(e, t, n) {
					n = n || 0;
					var r = this._first,
						i = this._labels,
						s;
					while (r) r._startTime >= n && (r._startTime += e), r = r._next;
					if (t)
						for (s in i) i[s] >= n && (i[s] += e);
					return this._uncache(!0)
				}, v._kill = function(e, t) {
					if (!e && !t) return this._enabled(!1, !1);
					var n = t ? this.getTweensOf(t) : this.getChildren(!0, !0, !1),
						r = n.length,
						i = !1;
					while (--r > -1) n[r]._kill(e, t) && (i = !0);
					return i
				}, v.clear = function(e) {
					var t = this.getChildren(!1, !0, !0),
						n = t.length;
					this._time = this._totalTime = 0;
					while (--n > -1) t[n]._enabled(!1, !1);
					return e !== !1 && (this._labels = {}), this._uncache(!0)
				}, v.invalidate = function() {
					var t = this._first;
					while (t) t.invalidate(), t = t._next;
					return e.prototype.invalidate.call(this)
				}, v._enabled = function(e, n) {
					if (e === this._gc) {
						var r = this._first;
						while (r) r._enabled(e, !0), r = r._next
					}
					return t.prototype._enabled.call(this, e, n)
				}, v.totalTime = function(t, n, r) {
					this._forcingPlayhead = !0;
					var i = e.prototype.totalTime.apply(this, arguments);
					return this._forcingPlayhead = !1, i
				}, v.duration = function(e) {
					return arguments.length ? (this.duration() !== 0 && e !== 0 && this.timeScale(this._duration / e), this) : (this._dirty && this.totalDuration(), this._duration)
				}, v.totalDuration = function(e) {
					if (!arguments.length) {
						if (this._dirty) {
							var t = 0,
								n = this._last,
								r = 999999999999,
								i, s;
							while (n) i = n._prev, n._dirty && n.totalDuration(), n._startTime > r && this._sortChildren && !n._paused ? this.add(n, n._startTime - n._delay) : r = n._startTime, n._startTime < 0 && !n._paused && (t -= n._startTime, this._timeline.smoothChildTiming && (this._startTime += n._startTime / this._timeScale), this.shiftChildren(-n._startTime, !1, -9999999999), r = 0), s = n._startTime + n._totalDuration / n._timeScale, s > t && (t = s), n = i;
							this._duration = this._totalDuration = t, this._dirty = !1
						}
						return this._totalDuration
					}
					return this.totalDuration() !== 0 && e !== 0 && this.timeScale(this._totalDuration / e), this
				}, v.usesFrames = function() {
					var t = this._timeline;
					while (t._timeline) t = t._timeline;
					return t === e._rootFramesTimeline
				}, v.rawTime = function() {
					return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
				}, r
			}, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(e, t, n) {
				var r = function(t) {
						e.call(this, t), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
					},
					i = 1e-10,
					s = [],
					o = t._internals,
					u = o.lazyTweens,
					a = o.lazyRender,
					f = new n(null, null, 1, 0),
					l = r.prototype = new e;
				return l.constructor = r, l.kill()._gc = !1, r.version = "1.13.2", l.invalidate = function() {
					return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), e.prototype.invalidate.call(this)
				}, l.addCallback = function(e, n, r, i) {
					return this.add(t.delayedCall(0, e, r, i), n)
				}, l.removeCallback = function(e, t) {
					if (e)
						if (t == null) this._kill(null, e);
						else {
							var n = this.getTweensOf(e, !1),
								r = n.length,
								i = this._parseTimeOrLabel(t);
							while (--r > -1) n[r]._startTime === i && n[r]._enabled(!1, !1)
						}
					return this
				}, l.tweenTo = function(e, n) {
					n = n || {};
					var r = {
							ease: f,
							overwrite: n.delay ? 2 : 1,
							useFrames: this.usesFrames(),
							immediateRender: !1
						},
						i, o, u;
					for (o in n) r[o] = n[o];
					return r.time = this._parseTimeOrLabel(e), i = Math.abs(Number(r.time) - this._time) / this._timeScale || .001, u = new t(this, i, r), r.onStart = function() {
						u.target.paused(!0), u.vars.time !== u.target.time() && i === u.duration() && u.duration(Math.abs(u.vars.time - u.target.time()) / u.target._timeScale), n.onStart && n.onStart.apply(n.onStartScope || u, n.onStartParams || s)
					}, u
				}, l.tweenFromTo = function(e, t, n) {
					n = n || {}, e = this._parseTimeOrLabel(e), n.startAt = {
						onComplete: this.seek,
						onCompleteParams: [e],
						onCompleteScope: this
					}, n.immediateRender = n.immediateRender !== !1;
					var r = this.tweenTo(t, n);
					return r.duration(Math.abs(r.vars.time - e) / this._timeScale || .001)
				}, l.render = function(e, t, n) {
					this._gc && this._enabled(!0, !1);
					var r = this._dirty ? this.totalDuration() : this._totalDuration,
						o = this._duration,
						f = this._time,
						l = this._totalTime,
						c = this._startTime,
						h = this._timeScale,
						p = this._rawPrevTime,
						d = this._paused,
						v = this._cycle,
						m, g, y, b, w, E;
					if (e >= r) this._locked || (this._totalTime = r, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (g = !0, b = "onComplete", this._duration === 0 && (e === 0 || p < 0 || p === i) && p !== e && this._first && (w = !0, p > i && (b = "onReverseComplete"))), this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : i, this._yoyo && (this._cycle & 1) !== 0 ? this._time = e = 0 : (this._time = o, e = o + 1e-4);
					else if (e < 1e-7) {
						this._locked || (this._totalTime = this._cycle = 0), this._time = 0;
						if (f !== 0 || o === 0 && p !== i && (p > 0 || e < 0 && p >= 0) && !this._locked) b = "onReverseComplete", g = this._reversed;
						e < 0 ? (this._active = !1, p >= 0 && this._first && (w = !0), this._rawPrevTime = e) : (this._rawPrevTime = o || !t || e || this._rawPrevTime === e ? e : i, e = 0, this._initted || (w = !0))
					} else o === 0 && p < 0 && (w = !0), this._time = this._rawPrevTime = e, this._locked || (this._totalTime = e, this._repeat !== 0 && (E = o + this._repeatDelay, this._cycle = this._totalTime / E >> 0, this._cycle !== 0 && this._cycle === this._totalTime / E && this._cycle--, this._time = this._totalTime - this._cycle * E, this._yoyo && (this._cycle & 1) !== 0 && (this._time = o - this._time), this._time > o ? (this._time = o, e = o + 1e-4) : this._time < 0 ? this._time = e = 0 : e = this._time));
					if (this._cycle !== v && !this._locked) {
						var S = this._yoyo && (v & 1) !== 0,
							x = S === (this._yoyo && (this._cycle & 1) !== 0),
							T = this._totalTime,
							N = this._cycle,
							C = this._rawPrevTime,
							k = this._time;
						this._totalTime = v * o, this._cycle < v ? S = !S : this._totalTime += o, this._time = f, this._rawPrevTime = o === 0 ? p - 1e-4 : p, this._cycle = v, this._locked = !0, f = S ? 0 : o, this.render(f, t, o === 0), t || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || s), x && (f = S ? o + 1e-4 : -0.0001, this.render(f, !0, !1)), this._locked = !1;
						if (this._paused && !d) return;
						this._time = k, this._totalTime = T, this._cycle = N, this._rawPrevTime = C
					}
					if ((this._time === f || !this._first) && !n && !w) {
						l !== this._totalTime && this._onUpdate && (t || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || s));
						return
					}
					this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== l && e > 0 && (this._active = !0), l === 0 && this.vars.onStart && this._totalTime !== 0 && (t || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || s));
					if (this._time >= f) {
						m = this._first;
						while (m) {
							y = m._next;
							if (this._paused && !d) break;
							if (m._active || m._startTime <= this._time && !m._paused && !m._gc) m._reversed ? m.render((m._dirty ? m.totalDuration() : m._totalDuration) - (e - m._startTime) * m._timeScale, t, n) : m.render((e - m._startTime) * m._timeScale, t, n);
							m = y
						}
					} else {
						m = this._last;
						while (m) {
							y = m._prev;
							if (this._paused && !d) break;
							if (m._active || m._startTime <= f && !m._paused && !m._gc) m._reversed ? m.render((m._dirty ? m.totalDuration() : m._totalDuration) - (e - m._startTime) * m._timeScale, t, n) : m.render((e - m._startTime) * m._timeScale, t, n);
							m = y
						}
					}
					this._onUpdate && (t || (u.length && a(), this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || s))), b && (this._locked || !this._gc && (c === this._startTime || h !== this._timeScale) && (this._time === 0 || r >= this.totalDuration()) && (g && (u.length && a(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[b] && this.vars[b].apply(this.vars[b + "Scope"] || this, this.vars[b + "Params"] || s)))
				}, l.getActive = function(e, t, n) {
					e == null && (e = !0), t == null && (t = !0), n == null && (n = !1);
					var r = [],
						i = this.getChildren(e, t, n),
						s = 0,
						o = i.length,
						u, a;
					for (u = 0; u < o; u++) a = i[u], a.isActive() && (r[s++] = a);
					return r
				}, l.getLabelAfter = function(e) {
					e || e !== 0 && (e = this._time);
					var t = this.getLabelsArray(),
						n = t.length,
						r;
					for (r = 0; r < n; r++)
						if (t[r].time > e) return t[r].name;
					return null
				}, l.getLabelBefore = function(e) {
					e == null && (e = this._time);
					var t = this.getLabelsArray(),
						n = t.length;
					while (--n > -1)
						if (t[n].time < e) return t[n].name;
					return null
				}, l.getLabelsArray = function() {
					var e = [],
						t = 0,
						n;
					for (n in this._labels) e[t++] = {
						time: this._labels[n],
						name: n
					};
					return e.sort(function(e, t) {
						return e.time - t.time
					}), e
				}, l.progress = function(e, t) {
					return arguments.length ? this.totalTime(this.duration() * (this._yoyo && (this._cycle & 1) !== 0 ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), t) : this._time / this.duration()
				}, l.totalProgress = function(e, t) {
					return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this._totalTime / this.totalDuration()
				}, l.totalDuration = function(t) {
					return arguments.length ? this._repeat === -1 ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (e.prototype.totalDuration.call(this), this._totalDuration = this._repeat === -1 ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
				}, l.time = function(e, t) {
					return arguments.length ? (this._dirty && this.totalDuration(), e > this._duration && (e = this._duration), this._yoyo && (this._cycle & 1) !== 0 ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : this._repeat !== 0 && (e += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(e, t)) : this._time
				}, l.repeat = function(e) {
					return arguments.length ? (this._repeat = e, this._uncache(!0)) : this._repeat
				}, l.repeatDelay = function(e) {
					return arguments.length ? (this._repeatDelay = e, this._uncache(!0)) : this._repeatDelay
				}, l.yoyo = function(e) {
					return arguments.length ? (this._yoyo = e, this) : this._yoyo
				}, l.currentLabel = function(e) {
					return arguments.length ? this.seek(e, !0) : this.getLabelBefore(this._time + 1e-8)
				}, r
			}, !0),
			function() {
				var e = 180 / Math.PI,
					t = [],
					n = [],
					r = [],
					i = {},
					s = function(e, t, n, r) {
						this.a = e, this.b = t, this.c = n, this.d = r, this.da = r - e, this.ca = n - e, this.ba = t - e
					},
					o = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
					u = function(e, t, n, r) {
						var i = {
								a: e
							},
							s = {},
							o = {},
							u = {
								c: r
							},
							a = (e + t) / 2,
							f = (t + n) / 2,
							l = (n + r) / 2,
							c = (a + f) / 2,
							h = (f + l) / 2,
							p = (h - c) / 8;
						return i.b = a + (e - a) / 4, s.b = c + p, i.c = s.a = (i.b + s.b) / 2, s.c = o.a = (c + h) / 2, o.b = h - p, u.b = l + (r - l) / 4, o.c = u.a = (o.b + u.b) / 2, [i, s, o, u]
					},
					a = function(e, i, s, o, a) {
						var f = e.length - 1,
							l = 0,
							c = e[0].a,
							h, p, d, v, m, g, y, b, w, E, S, x, T;
						for (h = 0; h < f; h++) m = e[l], p = m.a, d = m.d, v = e[l + 1].d, a ? (S = t[h], x = n[h], T = (x + S) * i * .25 / (o ? .5 : r[h] || .5), g = d - (d - p) * (o ? i * .5 : S !== 0 ? T / S : 0), y = d + (v - d) * (o ? i * .5 : x !== 0 ? T / x : 0), b = d - (g + ((y - g) * (S * 3 / (S + x) + .5) / 4 || 0))) : (g = d - (d - p) * i * .5, y = d + (v - d) * i * .5, b = d - (g + y) / 2), g += b, y += b, m.c = w = g, h !== 0 ? m.b = c : m.b = c = m.a + (m.c - m.a) * .6, m.da = d - p, m.ca = w - p, m.ba = c - p, s ? (E = u(p, c, w, d), e.splice(l, 1, E[0], E[1], E[2], E[3]), l += 4) : l++, c = y;
						m = e[l], m.b = c, m.c = c + (m.d - c) * .4, m.da = m.d - m.a, m.ca = m.c - m.a, m.ba = c - m.a, s && (E = u(m.a, c, m.c, m.d), e.splice(l, 1, E[0], E[1], E[2], E[3]))
					},
					f = function(e, r, i, o) {
						var u = [],
							a, f, l, c, h, p;
						if (o) {
							e = [o].concat(e), f = e.length;
							while (--f > -1) typeof(p = e[f][r]) == "string" && p.charAt(1) === "=" && (e[f][r] = o[r] + Number(p.charAt(0) + p.substr(2)))
						}
						a = e.length - 2;
						if (a < 0) return u[0] = new s(e[0][r], 0, 0, e[a < -1 ? 0 : 1][r]), u;
						for (f = 0; f < a; f++) l = e[f][r], c = e[f + 1][r], u[f] = new s(l, 0, 0, c), i && (h = e[f + 2][r], t[f] = (t[f] || 0) + (c - l) * (c - l), n[f] = (n[f] || 0) + (h - c) * (h - c));
						return u[f] = new s(e[f][r], 0, 0, e[f + 1][r]), u
					},
					l = function(e, s, u, l, c, h) {
						var p = {},
							d = [],
							v = h || e[0],
							m, g, y, b, w, E, S, x;
						c = typeof c == "string" ? "," + c + "," : o, s == null && (s = 1);
						for (g in e[0]) d.push(g);
						if (e.length > 1) {
							x = e[e.length - 1], S = !0, m = d.length;
							while (--m > -1) {
								g = d[m];
								if (Math.abs(v[g] - x[g]) > .05) {
									S = !1;
									break
								}
							}
							S && (e = e.concat(), h && e.unshift(h), e.push(e[1]), h = e[e.length - 3])
						}
						t.length = n.length = r.length = 0, m = d.length;
						while (--m > -1) g = d[m], i[g] = c.indexOf("," + g + ",") !== -1, p[g] = f(e, g, i[g], h);
						m = t.length;
						while (--m > -1) t[m] = Math.sqrt(t[m]), n[m] = Math.sqrt(n[m]);
						if (!l) {
							m = d.length;
							while (--m > -1)
								if (i[g]) {
									y = p[d[m]], E = y.length - 1;
									for (b = 0; b < E; b++) w = y[b + 1].da / n[b] + y[b].da / t[b], r[b] = (r[b] || 0) + w * w
								}
							m = r.length;
							while (--m > -1) r[m] = Math.sqrt(r[m])
						}
						m = d.length, b = u ? 4 : 1;
						while (--m > -1) g = d[m], y = p[g], a(y, s, u, l, i[g]), S && (y.splice(0, b), y.splice(y.length - b, b));
						return p
					},
					c = function(e, t, n) {
						t = t || "soft";
						var r = {},
							i = t === "cubic" ? 3 : 2,
							o = t === "soft",
							u = [],
							a, f, l, c, h, p, d, v, m, g, y;
						o && n && (e = [n].concat(e));
						if (e == null || e.length < i + 1) throw "invalid Bezier data";
						for (m in e[0]) u.push(m);
						p = u.length;
						while (--p > -1) {
							m = u[p], r[m] = h = [], g = 0, v = e.length;
							for (d = 0; d < v; d++) a = n == null ? e[d][m] : typeof(y = e[d][m]) == "string" && y.charAt(1) === "=" ? n[m] + Number(y.charAt(0) + y.substr(2)) : Number(y), o && d > 1 && d < v - 1 && (h[g++] = (a + h[g - 2]) / 2), h[g++] = a;
							v = g - i + 1, g = 0;
							for (d = 0; d < v; d += i) a = h[d], f = h[d + 1], l = h[d + 2], c = i === 2 ? 0 : h[d + 3], h[g++] = y = i === 3 ? new s(a, f, l, c) : new s(a, (2 * f + a) / 3, (2 * f + l) / 3, l);
							h.length = g
						}
						return r
					},
					h = function(e, t, n) {
						var r = 1 / n,
							i = e.length,
							s, o, u, a, f, l, c, h, p, d, v;
						while (--i > -1) {
							d = e[i], u = d.a, a = d.d - u, f = d.c - u, l = d.b - u, s = o = 0;
							for (h = 1; h <= n; h++) c = r * h, p = 1 - c, s = o - (o = (c * c * a + 3 * p * (c * f + p * l)) * c), v = i * n + h - 1, t[v] = (t[v] || 0) + s * s
						}
					},
					p = function(e, t) {
						t = t >> 0 || 6;
						var n = [],
							r = [],
							i = 0,
							s = 0,
							o = t - 1,
							u = [],
							a = [],
							f, l, c, p;
						for (f in e) h(e[f], n, t);
						c = n.length;
						for (l = 0; l < c; l++) i += Math.sqrt(n[l]), p = l % t, a[p] = i, p === o && (s += i, p = l / t >> 0, u[p] = a, r[p] = s, i = 0, a = []);
						return {
							length: s,
							lengths: r,
							segments: u
						}
					},
					d = _gsScope._gsDefine.plugin({
						propName: "bezier",
						priority: -1,
						version: "1.3.3",
						API: 2,
						global: !0,
						init: function(e, t, n) {
							this._target = e, t instanceof Array && (t = {
								values: t
							}), this._func = {}, this._round = {}, this._props = [], this._timeRes = t.timeResolution == null ? 6 : parseInt(t.timeResolution, 10);
							var r = t.values || [],
								i = {},
								s = r[0],
								o = t.autoRotate || n.vars.orientToBezier,
								u, a, f, h, d;
							this._autoRotate = o ? o instanceof Array ? o : [
								["x", "y", "rotation", o === !0 ? 0 : Number(o) || 0]
							] : null;
							for (u in s) this._props.push(u);
							f = this._props.length;
							while (--f > -1) u = this._props[f], this._overwriteProps.push(u), a = this._func[u] = typeof e[u] == "function", i[u] = a ? e[u.indexOf("set") || typeof e["get" + u.substr(3)] != "function" ? u : "get" + u.substr(3)]() : parseFloat(e[u]), d || i[u] !== r[0][u] && (d = i);
							this._beziers = t.type !== "cubic" && t.type !== "quadratic" && t.type !== "soft" ? l(r, isNaN(t.curviness) ? 1 : t.curviness, !1, t.type === "thruBasic", t.correlate, d) : c(r, t.type, i), this._segCount = this._beziers[u].length;
							if (this._timeRes) {
								var v = p(this._beziers, this._timeRes);
								this._length = v.length, this._lengths = v.lengths, this._segments = v.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
							}
							if (o = this._autoRotate) {
								this._initialRotations = [], o[0] instanceof Array || (this._autoRotate = o = [o]), f = o.length;
								while (--f > -1) {
									for (h = 0; h < 3; h++) u = o[f][h], this._func[u] = typeof e[u] == "function" ? e[u.indexOf("set") || typeof e["get" + u.substr(3)] != "function" ? u : "get" + u.substr(3)] : !1;
									u = o[f][2], this._initialRotations[f] = this._func[u] ? this._func[u].call(this._target) : this._target[u]
								}
							}
							return this._startRatio = n.vars.runBackwards ? 1 : 0, !0
						},
						set: function(t) {
							var n = this._segCount,
								r = this._func,
								i = this._target,
								s = t !== this._startRatio,
								o, u, a, f, l, c, h, p, d, v;
							if (!this._timeRes) o = t < 0 ? 0 : t >= 1 ? n - 1 : n * t >> 0, c = (t - o * (1 / n)) * n;
							else {
								d = this._lengths, v = this._curSeg, t *= this._length, a = this._li;
								if (t > this._l2 && a < n - 1) {
									p = n - 1;
									while (a < p && (this._l2 = d[++a]) <= t);
									this._l1 = d[a - 1], this._li = a, this._curSeg = v = this._segments[a], this._s2 = v[this._s1 = this._si = 0]
								} else if (t < this._l1 && a > 0) {
									while (a > 0 && (this._l1 = d[--a]) >= t);
									a === 0 && t < this._l1 ? this._l1 = 0 : a++, this._l2 = d[a], this._li = a, this._curSeg = v = this._segments[a], this._s1 = v[(this._si = v.length - 1) - 1] || 0, this._s2 = v[this._si]
								}
								o = a, t -= this._l1, a = this._si;
								if (t > this._s2 && a < v.length - 1) {
									p = v.length - 1;
									while (a < p && (this._s2 = v[++a]) <= t);
									this._s1 = v[a - 1], this._si = a
								} else if (t < this._s1 && a > 0) {
									while (a > 0 && (this._s1 = v[--a]) >= t);
									a === 0 && t < this._s1 ? this._s1 = 0 : a++, this._s2 = v[a], this._si = a
								}
								c = (a + (t - this._s1) / (this._s2 - this._s1)) * this._prec
							}
							u = 1 - c, a = this._props.length;
							while (--a > -1) f = this._props[a], l = this._beziers[f][o], h = (c * c * l.da + 3 * u * (c * l.ca + u * l.ba)) * c + l.a, this._round[f] && (h = Math.round(h)), r[f] ? i[f](h) : i[f] = h;
							if (this._autoRotate) {
								var m = this._autoRotate,
									g, y, b, w, E, S, x;
								a = m.length;
								while (--a > -1) f = m[a][2], S = m[a][3] || 0, x = m[a][4] === !0 ? 1 : e, l = this._beziers[m[a][0]], g = this._beziers[m[a][1]], l && g && (l = l[o], g = g[o], y = l.a + (l.b - l.a) * c, w = l.b + (l.c - l.b) * c, y += (w - y) * c, w += (l.c + (l.d - l.c) * c - w) * c, b = g.a + (g.b - g.a) * c, E = g.b + (g.c - g.b) * c, b += (E - b) * c, E += (g.c + (g.d - g.c) * c - E) * c, h = s ? (Math.atan2(E - b, w - y) + 3.1415) * x + S : this._initialRotations[a], r[f] ? i[f](h) : i[f] = h)
							}
						}
					}),
					v = d.prototype;
				d.bezierThrough = l, d.cubicToQuadratic = u, d._autoCSS = !0, d.quadraticToCubic = function(e, t, n) {
					return new s(e, (2 * t + e) / 3, (2 * t + n) / 3, n)
				}, d._cssRegister = function() {
					var e = _gsScope._gsDefine.globals.CSSPlugin;
					if (!e) return;
					var t = e._internals,
						n = t._parseToProxy,
						r = t._setPluginRatio,
						i = t.CSSPropTween;
					t._registerComplexSpecialProp("bezier", {
						parser: function(e, t, s, o, u, a) {
							t instanceof Array && (t = {
								values: t
							}), a = new d;
							var f = t.values,
								l = f.length - 1,
								c = [],
								h = {},
								p, v, m;
							if (l < 0) return u;
							for (p = 0; p <= l; p++) m = n(e, f[p], o, u, a, l !== p), c[p] = m.end;
							for (v in t) h[v] = t[v];
							return h.values = c, u = new i(e, "bezier", 0, 0, m.pt, 2), u.data = m, u.plugin = a, u.setRatio = r, h.autoRotate === 0 && (h.autoRotate = !0), h.autoRotate && !(h.autoRotate instanceof Array) && (p = h.autoRotate === !0 ? 0 : Number(h.autoRotate), h.autoRotate = m.end.left != null ? [
								["left", "top", "rotation", p, !1]
							] : m.end.x != null ? [
								["x", "y", "rotation", p, !1]
							] : !1), h.autoRotate && (o._transform || o._enableTransforms(!1), m.autoRotate = o._target._gsTransform), a._onInitTween(m.proxy, h, o._tween), u
						}
					})
				}, v._roundProps = function(e, t) {
					var n = this._overwriteProps,
						r = n.length;
					while (--r > -1)
						if (e[n[r]] || e.bezier || e.bezierThrough) this._round[n[r]] = t
				}, v._kill = function(e) {
					var t = this._props,
						n, r;
					for (n in this._beziers)
						if (n in e) {
							delete this._beziers[n], delete this._func[n], r = t.length;
							while (--r > -1) t[r] === n && t.splice(r, 1)
						}
					return this._super._kill.call(this, e)
				}
			}(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(e, t) {
				var n = function() {
						e.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = n.prototype.setRatio
					},
					r, i, s, o, u = {},
					a = n.prototype = new e("css");
				a.constructor = n, n.version = "1.13.2", n.API = 2, n.defaultTransformPerspective = 0, n.defaultSkewType = "compensated", a = "px", n.suffixMap = {
					top: a,
					right: a,
					bottom: a,
					left: a,
					width: a,
					height: a,
					fontSize: a,
					padding: a,
					margin: a,
					perspective: a,
					lineHeight: ""
				};
				var f = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
					l = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
					c = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
					h = /[^\d\-\.]/g,
					p = /(?:\d|\-|\+|=|#|\.)*/g,
					d = /opacity *= *([^)]*)/i,
					v = /opacity:([^;]*)/i,
					m = /alpha\(opacity *=.+?\)/i,
					g = /^(rgb|hsl)/,
					y = /([A-Z])/g,
					b = /-([a-z])/gi,
					w = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
					E = function(e, t) {
						return t.toUpperCase()
					},
					S = /(?:Left|Right|Width)/i,
					x = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
					T = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
					N = /,(?=[^\)]*(?:\(|$))/gi,
					C = Math.PI / 180,
					k = 180 / Math.PI,
					L = {},
					A = document,
					O = A.createElement("div"),
					M = A.createElement("img"),
					_ = n._internals = {
						_specialProps: u
					},
					D = navigator.userAgent,
					P, H, B, j, F, I, q = function() {
						var e = D.indexOf("Android"),
							t = A.createElement("div"),
							n;
						return B = D.indexOf("Safari") !== -1 && D.indexOf("Chrome") === -1 && (e === -1 || Number(D.substr(e + 8, 1)) > 3), F = B && Number(D.substr(D.indexOf("Version/") + 8, 1)) < 6, j = D.indexOf("Firefox") !== -1, /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(D) && (I = parseFloat(RegExp.$1)), t.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>", n = t.getElementsByTagName("a")[0], n ? /^0.55/.test(n.style.opacity) : !1
					}(),
					R = function(e) {
						return d.test(typeof e == "string" ? e : (e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
					},
					U = function(e) {
						window.console && console.log(e)
					},
					z = "",
					W = "",
					X = function(e, t) {
						t = t || O;
						var n = t.style,
							r, i;
						if (n[e] !== undefined) return e;
						e = e.charAt(0).toUpperCase() + e.substr(1), r = ["O", "Moz", "ms", "Ms", "Webkit"], i = 5;
						while (--i > -1 && n[r[i] + e] === undefined);
						return i >= 0 ? (W = i === 3 ? "ms" : r[i], z = "-" + W.toLowerCase() + "-", W + e) : null
					},
					V = A.defaultView ? A.defaultView.getComputedStyle : function() {},
					$ = n.getStyle = function(e, t, n, r, i) {
						var s;
						return !q && t === "opacity" ? R(e) : (!r && e.style[t] ? s = e.style[t] : (n = n || V(e)) ? s = n[t] || n.getPropertyValue(t) || n.getPropertyValue(t.replace(y, "-$1").toLowerCase()) : e.currentStyle && (s = e.currentStyle[t]), i == null || !!s && s !== "none" && s !== "auto" && s !== "auto auto" ? s : i)
					},
					J = _.convertToPixels = function(e, r, i, s, o) {
						if (s === "px" || !s) return i;
						if (s === "auto" || !i) return 0;
						var u = S.test(r),
							a = e,
							f = O.style,
							l = i < 0,
							c, h, p;
						l && (i = -i);
						if (s === "%" && r.indexOf("border") !== -1) c = i / 100 * (u ? e.clientWidth : e.clientHeight);
						else {
							f.cssText = "border:0 solid red;position:" + $(e, "position") + ";line-height:0;";
							if (s === "%" || !a.appendChild) {
								a = e.parentNode || A.body, h = a._gsCache, p = t.ticker.frame;
								if (h && u && h.time === p) return h.width * i / 100;
								f[u ? "width" : "height"] = i + s
							} else f[u ? "borderLeftWidth" : "borderTopWidth"] = i + s;
							a.appendChild(O), c = parseFloat(O[u ? "offsetWidth" : "offsetHeight"]), a.removeChild(O), u && s === "%" && n.cacheWidths !== !1 && (h = a._gsCache = a._gsCache || {}, h.time = p, h.width = c / i * 100), c === 0 && !o && (c = J(e, r, i, s, !0))
						}
						return l ? -c : c
					},
					K = _.calculateOffset = function(e, t, n) {
						if ($(e, "position", n) !== "absolute") return 0;
						var r = t === "left" ? "Left" : "Top",
							i = $(e, "margin" + r, n);
						return e["offset" + r] - (J(e, t, parseFloat(i), i.replace(p, "")) || 0)
					},
					Q = function(e, t) {
						var n = {},
							r, i;
						if (t = t || V(e, null))
							if (r = t.length)
								while (--r > -1) n[t[r].replace(b, E)] = t.getPropertyValue(t[r]);
							else
								for (r in t) n[r] = t[r];
						else if (t = e.currentStyle || e.style)
							for (r in t) typeof r == "string" && n[r] === undefined && (n[r.replace(b, E)] = t[r]);
						return q || (n.opacity = R(e)), i = Ct(e, t, !1), n.rotation = i.rotation, n.skewX = i.skewX, n.scaleX = i.scaleX, n.scaleY = i.scaleY, n.x = i.x, n.y = i.y, Tt && (n.z = i.z, n.rotationX = i.rotationX, n.rotationY = i.rotationY, n.scaleZ = i.scaleZ), n.filters && delete n.filters, n
					},
					G = function(e, t, n, r, i) {
						var s = {},
							o = e.style,
							u, a, f;
						for (a in n) a !== "cssText" && a !== "length" && isNaN(a) && (t[a] !== (u = n[a]) || i && i[a]) && a.indexOf("Origin") === -1 && (typeof u == "number" || typeof u == "string") && (s[a] = u !== "auto" || a !== "left" && a !== "top" ? u !== "" && u !== "auto" && u !== "none" || typeof t[a] != "string" || t[a].replace(h, "") === "" ? u : 0 : K(e, a), o[a] !== undefined && (f = new ht(o, a, o[a], f)));
						if (r)
							for (a in r) a !== "className" && (s[a] = r[a]);
						return {
							difs: s,
							firstMPT: f
						}
					},
					Y = {
						width: ["Left", "Right"],
						height: ["Top", "Bottom"]
					},
					Z = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
					et = function(e, t, n) {
						var r = parseFloat(t === "width" ? e.offsetWidth : e.offsetHeight),
							i = Y[t],
							s = i.length;
						n = n || V(e, null);
						while (--s > -1) r -= parseFloat($(e, "padding" + i[s], n, !0)) || 0, r -= parseFloat($(e, "border" + i[s] + "Width", n, !0)) || 0;
						return r
					},
					tt = function(e, t) {
						if (e == null || e === "" || e === "auto" || e === "auto auto") e = "0 0";
						var n = e.split(" "),
							r = e.indexOf("left") !== -1 ? "0%" : e.indexOf("right") !== -1 ? "100%" : n[0],
							i = e.indexOf("top") !== -1 ? "0%" : e.indexOf("bottom") !== -1 ? "100%" : n[1];
						i == null ? i = "0" : i === "center" && (i = "50%");
						if (r === "center" || isNaN(parseFloat(r)) && (r + "").indexOf("=") === -1) r = "50%";
						return t && (t.oxp = r.indexOf("%") !== -1, t.oyp = i.indexOf("%") !== -1, t.oxr = r.charAt(1) === "=", t.oyr = i.charAt(1) === "=", t.ox = parseFloat(r.replace(h, "")), t.oy = parseFloat(i.replace(h, ""))), r + " " + i + (n.length > 2 ? " " + n[2] : "")
					},
					nt = function(e, t) {
						return typeof e == "string" && e.charAt(1) === "=" ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(t)
					},
					rt = function(e, t) {
						return e == null ? t : typeof e == "string" && e.charAt(1) === "=" ? parseInt(e.charAt(0) + "1", 10) * Number(e.substr(2)) + t : parseFloat(e)
					},
					it = function(e, t, n, r) {
						var i = 1e-6,
							s, o, u, a;
						return e == null ? a = t : typeof e == "number" ? a = e : (s = 360, o = e.split("_"), u = Number(o[0].replace(h, "")) * (e.indexOf("rad") === -1 ? 1 : k) - (e.charAt(1) === "=" ? 0 : t), o.length && (r && (r[n] = t + u), e.indexOf("short") !== -1 && (u %= s, u !== u % (s / 2) && (u = u < 0 ? u + s : u - s)), e.indexOf("_cw") !== -1 && u < 0 ? u = (u + s * 9999999999) % s - (u / s | 0) * s : e.indexOf("ccw") !== -1 && u > 0 && (u = (u - s * 9999999999) % s - (u / s | 0) * s)), a = t + u), a < i && a > -i && (a = 0), a
					},
					st = {
						aqua: [0, 255, 255],
						lime: [0, 255, 0],
						silver: [192, 192, 192],
						black: [0, 0, 0],
						maroon: [128, 0, 0],
						teal: [0, 128, 128],
						blue: [0, 0, 255],
						navy: [0, 0, 128],
						white: [255, 255, 255],
						fuchsia: [255, 0, 255],
						olive: [128, 128, 0],
						yellow: [255, 255, 0],
						orange: [255, 165, 0],
						gray: [128, 128, 128],
						purple: [128, 0, 128],
						green: [0, 128, 0],
						red: [255, 0, 0],
						pink: [255, 192, 203],
						cyan: [0, 255, 255],
						transparent: [255, 255, 255, 0]
					},
					ot = function(e, t, n) {
						return e = e < 0 ? e + 1 : e > 1 ? e - 1 : e, (e * 6 < 1 ? t + (n - t) * e * 6 : e < .5 ? n : e * 3 < 2 ? t + (n - t) * (2 / 3 - e) * 6 : t) * 255 + .5 | 0
					},
					ut = function(e) {
						var t, n, r, i, s, o;
						return !e || e === "" ? st.black : typeof e == "number" ? [e >> 16, e >> 8 & 255, e & 255] : (e.charAt(e.length - 1) === "," && (e = e.substr(0, e.length - 1)), st[e] ? st[e] : e.charAt(0) === "#" ? (e.length === 4 && (t = e.charAt(1), n = e.charAt(2), r = e.charAt(3), e = "#" + t + t + n + n + r + r), e = parseInt(e.substr(1), 16), [e >> 16, e >> 8 & 255, e & 255]) : e.substr(0, 3) === "hsl" ? (e = e.match(f), i = Number(e[0]) % 360 / 360, s = Number(e[1]) / 100, o = Number(e[2]) / 100, n = o <= .5 ? o * (s + 1) : o + s - o * s, t = o * 2 - n, e.length > 3 && (e[3] = Number(e[3])), e[0] = ot(i + 1 / 3, t, n), e[1] = ot(i, t, n), e[2] = ot(i - 1 / 3, t, n), e) : (e = e.match(f) || st.transparent, e[0] = Number(e[0]), e[1] = Number(e[1]), e[2] = Number(e[2]), e.length > 3 && (e[3] = Number(e[3])), e))
					},
					at = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
				for (a in st) at += "|" + a + "\\b";
				at = new RegExp(at + ")", "gi");
				var ft = function(e, t, n, r) {
						if (e == null) return function(e) {
							return e
						};
						var i = t ? (e.match(at) || [""])[0] : "",
							s = e.split(i).join("").match(c) || [],
							o = e.substr(0, e.indexOf(s[0])),
							u = e.charAt(e.length - 1) === ")" ? ")" : "",
							a = e.indexOf(" ") !== -1 ? " " : ",",
							l = s.length,
							h = l > 0 ? s[0].replace(f, "") : "",
							p;
						return l ? t ? (p = function(e) {
							var t, f, d, v;
							if (typeof e == "number") e += h;
							else if (r && N.test(e)) {
								v = e.replace(N, "|").split("|");
								for (d = 0; d < v.length; d++) v[d] = p(v[d]);
								return v.join(",")
							}
							t = (e.match(at) || [i])[0], f = e.split(t).join("").match(c) || [], d = f.length;
							if (l > d--)
								while (++d < l) f[d] = n ? f[(d - 1) / 2 | 0] : s[d];
							return o + f.join(a) + a + t + u + (e.indexOf("inset") !== -1 ? " inset" : "")
						}, p) : (p = function(e) {
							var t, i, f;
							if (typeof e == "number") e += h;
							else if (r && N.test(e)) {
								i = e.replace(N, "|").split("|");
								for (f = 0; f < i.length; f++) i[f] = p(i[f]);
								return i.join(",")
							}
							t = e.match(c) || [], f = t.length;
							if (l > f--)
								while (++f < l) t[f] = n ? t[(f - 1) / 2 | 0] : s[f];
							return o + t.join(a) + u
						}, p) : function(e) {
							return e
						}
					},
					lt = function(e) {
						return e = e.split(","),
							function(t, n, r, i, s, o, u) {
								var a = (n + "").split(" "),
									f;
								u = {};
								for (f = 0; f < 4; f++) u[e[f]] = a[f] = a[f] || a[(f - 1) / 2 >> 0];
								return i.parse(t, u, s, o)
							}
					},
					ct = _._setPluginRatio = function(e) {
						this.plugin.setRatio(e);
						var t = this.data,
							n = t.proxy,
							r = t.firstMPT,
							i = 1e-6,
							s, o, u, a;
						while (r) s = n[r.v], r.r ? s = Math.round(s) : s < i && s > -i && (s = 0), r.t[r.p] = s, r = r._next;
						t.autoRotate && (t.autoRotate.rotation = n.rotation);
						if (e === 1) {
							r = t.firstMPT;
							while (r) {
								o = r.t;
								if (!o.type) o.e = o.s + o.xs0;
								else if (o.type === 1) {
									a = o.xs0 + o.s + o.xs1;
									for (u = 1; u < o.l; u++) a += o["xn" + u] + o["xs" + (u + 1)];
									o.e = a
								}
								r = r._next
							}
						}
					},
					ht = function(e, t, n, r, i) {
						this.t = e, this.p = t, this.v = n, this.r = i, r && (r._prev = this, this._next = r)
					},
					pt = _._parseToProxy = function(e, t, n, r, i, s) {
						var o = r,
							u = {},
							a = {},
							f = n._transform,
							l = L,
							c, h, p, d, v;
						n._transform = null, L = t, r = v = n.parse(e, t, r, i), L = l, s && (n._transform = f, o && (o._prev = null, o._prev && (o._prev._next = null)));
						while (r && r !== o) {
							if (r.type <= 1) {
								h = r.p, a[h] = r.s + r.c, u[h] = r.s, s || (d = new ht(r, "s", h, d, r.r), r.c = 0);
								if (r.type === 1) {
									c = r.l;
									while (--c > 0) p = "xn" + c, h = r.p + "_" + p, a[h] = r.data[p], u[h] = r[p], s || (d = new ht(r, p, h, d, r.rxp[p]))
								}
							}
							r = r._next
						}
						return {
							proxy: u,
							end: a,
							firstMPT: d,
							pt: v
						}
					},
					dt = _.CSSPropTween = function(e, t, n, i, s, u, a, f, l, c, h) {
						this.t = e, this.p = t, this.s = n, this.c = i, this.n = a || t, e instanceof dt || o.push(this.n), this.r = f, this.type = u || 0, l && (this.pr = l, r = !0), this.b = c === undefined ? n : c, this.e = h === undefined ? n + i : h, s && (this._next = s, s._prev = this)
					},
					vt = n.parseComplex = function(e, t, n, r, i, s, o, u, a, c) {
						n = n || s || "", o = new dt(e, t, 0, 0, o, c ? 2 : 1, null, !1, u, n, r), r += "";
						var h = n.split(", ").join(",").split(" "),
							p = r.split(", ").join(",").split(" "),
							d = h.length,
							v = P !== !1,
							m, y, b, w, E, S, x, T, C, k, L, A;
						if (r.indexOf(",") !== -1 || n.indexOf(",") !== -1) h = h.join(" ").replace(N, ", ").split(" "), p = p.join(" ").replace(N, ", ").split(" "), d = h.length;
						d !== p.length && (h = (s || "").split(" "), d = h.length), o.plugin = a, o.setRatio = c;
						for (m = 0; m < d; m++) {
							w = h[m], E = p[m], T = parseFloat(w);
							if (T || T === 0) o.appendXtra("", T, nt(E, T), E.replace(l, ""), v && E.indexOf("px") !== -1, !0);
							else if (i && (w.charAt(0) === "#" || st[w] || g.test(w))) A = E.charAt(E.length - 1) === "," ? ")," : ")", w = ut(w), E = ut(E), C = w.length + E.length > 6, C && !q && E[3] === 0 ? (o["xs" + o.l] += o.l ? " transparent" : "transparent", o.e = o.e.split(p[m]).join("transparent")) : (q || (C = !1), o.appendXtra(C ? "rgba(" : "rgb(", w[0], E[0] - w[0], ",", !0, !0).appendXtra("", w[1], E[1] - w[1], ",", !0).appendXtra("", w[2], E[2] - w[2], C ? "," : A, !0), C && (w = w.length < 4 ? 1 : w[3], o.appendXtra("", w, (E.length < 4 ? 1 : E[3]) - w, A, !1)));
							else {
								S = w.match(f);
								if (!S) o["xs" + o.l] += o.l ? " " + w : w;
								else {
									x = E.match(l);
									if (!x || x.length !== S.length) return o;
									b = 0;
									for (y = 0; y < S.length; y++) L = S[y], k = w.indexOf(L, b), o.appendXtra(w.substr(b, k - b), Number(L), nt(x[y], L), "", v && w.substr(k + L.length, 2) === "px", y === 0), b = k + L.length;
									o["xs" + o.l] += w.substr(b)
								}
							}
						}
						if (r.indexOf("=") !== -1 && o.data) {
							A = o.xs0 + o.data.s;
							for (m = 1; m < o.l; m++) A += o["xs" + m] + o.data["xn" + m];
							o.e = A + o["xs" + m]
						}
						return o.l || (o.type = -1, o.xs0 = o.e), o.xfirst || o
					},
					mt = 9;
				a = dt.prototype, a.l = a.pr = 0;
				while (--mt > 0) a["xn" + mt] = 0, a["xs" + mt] = "";
				a.xs0 = "", a._next = a._prev = a.xfirst = a.data = a.plugin = a.setRatio = a.rxp = null, a.appendXtra = function(e, t, n, r, i, s) {
					var o = this,
						u = o.l;
					return o["xs" + u] += s && u ? " " + e : e || "", !n && u !== 0 && !o.plugin ? (o["xs" + u] += t + (r || ""), o) : (o.l++, o.type = o.setRatio ? 2 : 1, o["xs" + o.l] = r || "", u > 0 ? (o.data["xn" + u] = t + n, o.rxp["xn" + u] = i, o["xn" + u] = t, o.plugin || (o.xfirst = new dt(o, "xn" + u, t, n, o.xfirst || o, 0, o.n, i, o.pr), o.xfirst.xs0 = 0), o) : (o.data = {
						s: t + n
					}, o.rxp = {}, o.s = t, o.c = n, o.r = i, o))
				};
				var gt = function(e, t) {
						t = t || {}, this.p = t.prefix ? X(e) || e : e, u[e] = u[this.p] = this, this.format = t.formatter || ft(t.defaultValue, t.color, t.collapsible, t.multi), t.parser && (this.parse = t.parser), this.clrs = t.color, this.multi = t.multi, this.keyword = t.keyword, this.dflt = t.defaultValue, this.pr = t.priority || 0
					},
					yt = _._registerComplexSpecialProp = function(e, t, n) {
						typeof t != "object" && (t = {
							parser: n
						});
						var r = e.split(","),
							i = t.defaultValue,
							s, o;
						n = n || [i];
						for (s = 0; s < r.length; s++) t.prefix = s === 0 && t.prefix, t.defaultValue = n[s] || i, o = new gt(r[s], t)
					},
					bt = function(e) {
						if (!u[e]) {
							var t = e.charAt(0).toUpperCase() + e.substr(1) + "Plugin";
							yt(e, {
								parser: function(e, n, r, i, s, o, a) {
									var f = (_gsScope.GreenSockGlobals || _gsScope).com.greensock.plugins[t];
									return f ? (f._cssRegister(), u[r].parse(e, n, r, i, s, o, a)) : (U("Error: " + t + " js file not loaded."), s)
								}
							})
						}
					};
				a = gt.prototype, a.parseComplex = function(e, t, n, r, i, s) {
					var o = this.keyword,
						u, a, f, l, c, h;
					this.multi && (N.test(n) || N.test(t) ? (a = t.replace(N, "|").split("|"), f = n.replace(N, "|").split("|")) : o && (a = [t], f = [n]));
					if (f) {
						l = f.length > a.length ? f.length : a.length;
						for (u = 0; u < l; u++) t = a[u] = a[u] || this.dflt, n = f[u] = f[u] || this.dflt, o && (c = t.indexOf(o), h = n.indexOf(o), c !== h && (n = h === -1 ? f : a, n[u] += " " + o));
						t = a.join(", "), n = f.join(", ")
					}
					return vt(e, this.p, t, n, this.clrs, this.dflt, r, this.pr, i, s)
				}, a.parse = function(e, t, n, r, i, o, u) {
					return this.parseComplex(e.style, this.format($(e, this.p, s, !1, this.dflt)), this.format(t), i, o)
				}, n.registerSpecialProp = function(e, t, n) {
					yt(e, {
						parser: function(e, r, i, s, o, u, a) {
							var f = new dt(e, i, 0, 0, o, 2, i, !1, n);
							return f.plugin = u, f.setRatio = t(e, r, s._tween, i), f
						},
						priority: n
					})
				};
				var wt = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
					Et = X("transform"),
					St = z + "transform",
					xt = X("transformOrigin"),
					Tt = X("perspective") !== null,
					Nt = _.Transform = function() {
						this.skewY = 0
					},
					Ct = _.getTransform = function(e, t, r, i) {
						if (e._gsTransform && r && !i) return e._gsTransform;
						var s = r ? e._gsTransform || new Nt : new Nt,
							o = s.scaleX < 0,
							u = 2e-5,
							a = 1e5,
							f = 179.99,
							l = f * C,
							c = Tt ? parseFloat($(e, xt, t, !1, "0 0 0").split(" ")[2]) || s.zOrigin || 0 : 0,
							h = parseFloat(n.defaultTransformPerspective) || 0,
							p, d, v, m, g, y, b, w, E, S, T, N, L;
						Et ? p = $(e, St, t, !0) : e.currentStyle && (p = e.currentStyle.filter.match(x), p = p && p.length === 4 ? [p[0].substr(4), Number(p[2].substr(4)), Number(p[1].substr(4)), p[3].substr(4), s.x || 0, s.y || 0].join(",") : "");
						if (!p || p === "none" || p === "matrix(1, 0, 0, 1, 0, 0)") s = {
							x: 0,
							y: 0,
							z: 0,
							scaleX: 1,
							scaleY: 1,
							scaleZ: 1,
							skewX: 0,
							perspective: h,
							rotation: 0,
							rotationX: 0,
							rotationY: 0,
							zOrigin: 0
						};
						else {
							d = (p || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], v = d.length;
							while (--v > -1) m = Number(d[v]), d[v] = (g = m - (m |= 0)) ? (g * a + (g < 0 ? -0.5 : .5) | 0) / a + m : m;
							if (d.length === 16) {
								var A = d[8],
									O = d[9],
									M = d[10],
									_ = d[12],
									D = d[13],
									P = d[14];
								s.zOrigin && (P = -s.zOrigin, _ = A * P - d[12], D = O * P - d[13], P = M * P + s.zOrigin - d[14]);
								if (!r || i || s.rotationX == null) {
									var H = d[0],
										B = d[1],
										j = d[2],
										F = d[3],
										I = d[4],
										q = d[5],
										R = d[6],
										U = d[7],
										z = d[11],
										W = Math.atan2(R, M),
										X = W < -l || W > l,
										V, J, K, Q, G, Y, Z;
									s.rotationX = W * k, W && (Q = Math.cos(-W), G = Math.sin(-W), V = I * Q + A * G, J = q * Q + O * G, K = R * Q + M * G, A = I * -G + A * Q, O = q * -G + O * Q, M = R * -G + M * Q, z = U * -G + z * Q, I = V, q = J, R = K), W = Math.atan2(A, H), s.rotationY = W * k, W && (Y = W < -l || W > l, Q = Math.cos(-W), G = Math.sin(-W), V = H * Q - A * G, J = B * Q - O * G, K = j * Q - M * G, O = B * G + O * Q, M = j * G + M * Q, z = F * G + z * Q, H = V, B = J, j = K), W = Math.atan2(B, q), s.rotation = W * k, W && (Z = W < -l || W > l, Q = Math.cos(-W), G = Math.sin(-W), H = H * Q + I * G, J = B * Q + q * G, q = B * -G + q * Q, R = j * -G + R * Q, B = J), Z && X ? s.rotation = s.rotationX = 0 : Z && Y ? s.rotation = s.rotationY = 0 : Y && X && (s.rotationY = s.rotationX = 0), s.scaleX = (Math.sqrt(H * H + B * B) * a + .5 | 0) / a, s.scaleY = (Math.sqrt(q * q + O * O) * a + .5 | 0) / a, s.scaleZ = (Math.sqrt(R * R + M * M) * a + .5 | 0) / a, s.skewX = 0, s.perspective = z ? 1 / (z < 0 ? -z : z) : 0, s.x = _, s.y = D, s.z = P
								}
							} else if ((!Tt || i || !d.length || s.x !== d[4] || s.y !== d[5] || !s.rotationX && !s.rotationY) && (s.x === undefined || $(e, "display", t) !== "none")) {
								var et = d.length >= 6,
									tt = et ? d[0] : 1,
									nt = d[1] || 0,
									rt = d[2] || 0,
									it = et ? d[3] : 1;
								s.x = d[4] || 0, s.y = d[5] || 0, y = Math.sqrt(tt * tt + nt * nt), b = Math.sqrt(it * it + rt * rt), w = tt || nt ? Math.atan2(nt, tt) * k : s.rotation || 0, E = rt || it ? Math.atan2(rt, it) * k + w : s.skewX || 0, S = y - Math.abs(s.scaleX || 0), T = b - Math.abs(s.scaleY || 0), Math.abs(E) > 90 && Math.abs(E) < 270 && (o ? (y *= -1, E += w <= 0 ? 180 : -180, w += w <= 0 ? 180 : -180) : (b *= -1, E += E <= 0 ? 180 : -180)), N = (w - s.rotation) % 180, L = (E - s.skewX) % 180;
								if (s.skewX === undefined || S > u || S < -u || T > u || T < -u || N > -f && N < f && N * a | !1 || L > -f && L < f && L * a | !1) s.scaleX = y, s.scaleY = b, s.rotation = w, s.skewX = E;
								Tt && (s.rotationX = s.rotationY = s.z = 0, s.perspective = h, s.scaleZ = 1)
							}
							s.zOrigin = c;
							for (v in s) s[v] < u && s[v] > -u && (s[v] = 0)
						}
						return r && (e._gsTransform = s), s.xPercent = s.yPercent = 0, s
					},
					kt = function(e) {
						var t = this.data,
							n = -t.rotation * C,
							r = n + t.skewX * C,
							i = 1e5,
							s = (Math.cos(n) * t.scaleX * i | 0) / i,
							o = (Math.sin(n) * t.scaleX * i | 0) / i,
							u = (Math.sin(r) * -t.scaleY * i | 0) / i,
							a = (Math.cos(r) * t.scaleY * i | 0) / i,
							f = this.t.style,
							l = this.t.currentStyle,
							c, h;
						if (!l) return;
						h = o, o = -u, u = -h, c = l.filter, f.filter = "";
						var v = this.t.offsetWidth,
							m = this.t.offsetHeight,
							g = l.position !== "absolute",
							y = "progid:DXImageTransform.Microsoft.Matrix(M11=" + s + ", M12=" + o + ", M21=" + u + ", M22=" + a,
							b = t.x + v * t.xPercent / 100,
							w = t.y + m * t.yPercent / 100,
							E, S;
						t.ox != null && (E = (t.oxp ? v * t.ox * .01 : t.ox) - v / 2, S = (t.oyp ? m * t.oy * .01 : t.oy) - m / 2, b += E - (E * s + S * o), w += S - (E * u + S * a)), g ? (E = v / 2, S = m / 2, y += ", Dx=" + (E - (E * s + S * o) + b) + ", Dy=" + (S - (E * u + S * a) + w) + ")") : y += ", sizingMethod='auto expand')", c.indexOf("DXImageTransform.Microsoft.Matrix(") !== -1 ? f.filter = c.replace(T, y) : f.filter = y + " " + c, (e === 0 || e === 1) && s === 1 && o === 0 && u === 0 && a === 1 && (!g || y.indexOf("Dx=0, Dy=0") !== -1) && (!d.test(c) || parseFloat(RegExp.$1) === 100) && c.indexOf(c.indexOf("Alpha")) === -1 && f.removeAttribute("filter");
						if (!g) {
							var x = I < 8 ? 1 : -1,
								N, k, L;
							E = t.ieOffsetX || 0, S = t.ieOffsetY || 0, t.ieOffsetX = Math.round((v - ((s < 0 ? -s : s) * v + (o < 0 ? -o : o) * m)) / 2 + b), t.ieOffsetY = Math.round((m - ((a < 0 ? -a : a) * m + (u < 0 ? -u : u) * v)) / 2 + w);
							for (mt = 0; mt < 4; mt++) k = Z[mt], N = l[k], h = N.indexOf("px") !== -1 ? parseFloat(N) : J(this.t, k, parseFloat(N), N.replace(p, "")) || 0, h !== t[k] ? L = mt < 2 ? -t.ieOffsetX : -t.ieOffsetY : L = mt < 2 ? E - t.ieOffsetX : S - t.ieOffsetY, f[k] = (t[k] = Math.round(h - L * (mt === 0 || mt === 2 ? 1 : x))) + "px"
						}
					},
					Lt = _.set3DTransformRatio = function(e) {
						var t = this.data,
							n = this.t.style,
							r = t.rotation * C,
							i = t.scaleX,
							s = t.scaleY,
							o = t.scaleZ,
							u = t.x,
							a = t.y,
							f = t.z,
							l = t.perspective,
							c, h, p, d, v, m, g, y, b, w, E, S, x, T, N, k, L, A, O, M, _, D, P;
						if (e === 1 || e === 0)
							if (t.force3D === "auto" && !t.rotationY && !t.rotationX && o === 1 && !l && !f) {
								At.call(this, e);
								return
							}
						if (j) {
							var H = 1e-4;
							i < H && i > -H && (i = o = 2e-5), s < H && s > -H && (s = o = 2e-5), l && !t.z && !t.rotationX && !t.rotationY && (l = 0)
						}
						if (r || t.skewX) A = Math.cos(r), O = Math.sin(r), c = A, v = O, t.skewX && (r -= t.skewX * C, A = Math.cos(r), O = Math.sin(r), t.skewType === "simple" && (M = Math.tan(t.skewX * C), M = Math.sqrt(1 + M * M), A *= M, O *= M)), h = -O, m = A;
						else {
							if (!t.rotationY && !t.rotationX && o === 1 && !l) {
								n[Et] = (t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) translate3d(" : "translate3d(") + u + "px," + a + "px," + f + "px)" + (i !== 1 || s !== 1 ? " scale(" + i + "," + s + ")" : "");
								return
							}
							c = m = 1, h = v = 0
						}
						E = 1, p = d = g = y = b = w = S = x = T = 0, N = l ? -1 / l : 0, k = t.zOrigin, L = 1e5, r = t.rotationY * C, r && (A = Math.cos(r), O = Math.sin(r), b = E * -O, x = N * -O, p = c * O, g = v * O, E *= A, N *= A, c *= A, v *= A), r = t.rotationX * C, r && (A = Math.cos(r), O = Math.sin(r), M = h * A + p * O, _ = m * A + g * O, D = w * A + E * O, P = T * A + N * O, p = h * -O + p * A, g = m * -O + g * A, E = w * -O + E * A, N = T * -O + N * A, h = M, m = _, w = D, T = P), o !== 1 && (p *= o, g *= o, E *= o, N *= o), s !== 1 && (h *= s, m *= s, w *= s, T *= s), i !== 1 && (c *= i, v *= i, b *= i, x *= i), k && (S -= k, d = p * S, y = g * S, S = E * S + k), d = (M = (d += u) - (d |= 0)) ? (M * L + (M < 0 ? -0.5 : .5) | 0) / L + d : d, y = (M = (y += a) - (y |= 0)) ? (M * L + (M < 0 ? -0.5 : .5) | 0) / L + y : y, S = (M = (S += f) - (S |= 0)) ? (M * L + (M < 0 ? -0.5 : .5) | 0) / L + S : S, n[Et] = (t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix3d(" : "matrix3d(") + [(c * L | 0) / L, (v * L | 0) / L, (b * L | 0) / L, (x * L | 0) / L, (h * L | 0) / L, (m * L | 0) / L, (w * L | 0) / L, (T * L | 0) / L, (p * L | 0) / L, (g * L | 0) / L, (E * L | 0) / L, (N * L | 0) / L, d, y, S, l ? 1 + -S / l : 1].join(",") + ")"
					},
					At = _.set2DTransformRatio = function(e) {
						var t = this.data,
							n = this.t,
							r = n.style,
							i = t.x,
							s = t.y,
							o = "",
							u, a, f, l, c;
						if (t.rotationX || t.rotationY || t.z || t.force3D === !0 || t.force3D === "auto" && e !== 1 && e !== 0) {
							this.setRatio = Lt, Lt.call(this, e);
							return
						}!t.rotation && !t.skewX ? r[Et] = (t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + t.scaleX + ",0,0," + t.scaleY + "," + i + "," + s + ")" : (u = t.rotation * C, a = u - t.skewX * C, f = 1e5, l = t.scaleX * f, c = t.scaleY * f, r[Et] = (t.xPercent || t.yPercent ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + (Math.cos(u) * l | 0) / f + "," + (Math.sin(u) * l | 0) / f + "," + (Math.sin(a) * -c | 0) / f + "," + (Math.cos(a) * c | 0) / f + "," + i + "," + s + ")")
					};
				yt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent", {
					parser: function(e, t, r, i, o, u, a) {
						if (i._transform) return o;
						var f = i._transform = Ct(e, s, !0, a.parseTransform),
							l = e.style,
							c = 1e-6,
							h = wt.length,
							p = a,
							d = {},
							v, m, g, y, b, w, E;
						if (typeof p.transform == "string" && Et) g = O.style, g[Et] = p.transform, g.display = "block", g.position = "absolute", A.body.appendChild(O), v = Ct(O, null, !1), A.body.removeChild(O);
						else if (typeof p == "object") {
							v = {
								scaleX: rt(p.scaleX != null ? p.scaleX : p.scale, f.scaleX),
								scaleY: rt(p.scaleY != null ? p.scaleY : p.scale, f.scaleY),
								scaleZ: rt(p.scaleZ, f.scaleZ),
								x: rt(p.x, f.x),
								y: rt(p.y, f.y),
								z: rt(p.z, f.z),
								xPercent: rt(p.xPercent, f.xPercent),
								yPercent: rt(p.yPercent, f.yPercent),
								perspective: rt(p.transformPerspective, f.perspective)
							}, E = p.directionalRotation;
							if (E != null)
								if (typeof E == "object")
									for (g in E) p[g] = E[g];
								else p.rotation = E;
							typeof p.x == "string" && p.x.indexOf("%") !== -1 && (v.x = 0, v.xPercent = rt(p.x, f.xPercent)), typeof p.y == "string" && p.y.indexOf("%") !== -1 && (v.y = 0, v.yPercent = rt(p.y, f.yPercent)), v.rotation = it("rotation" in p ? p.rotation : "shortRotation" in p ? p.shortRotation + "_short" : "rotationZ" in p ? p.rotationZ : f.rotation, f.rotation, "rotation", d), Tt && (v.rotationX = it("rotationX" in p ? p.rotationX : "shortRotationX" in p ? p.shortRotationX + "_short" : f.rotationX || 0, f.rotationX, "rotationX", d), v.rotationY = it("rotationY" in p ? p.rotationY : "shortRotationY" in p ? p.shortRotationY + "_short" : f.rotationY || 0, f.rotationY, "rotationY", d)), v.skewX = p.skewX == null ? f.skewX : it(p.skewX, f.skewX), v.skewY = p.skewY == null ? f.skewY : it(p.skewY, f.skewY);
							if (m = v.skewY - f.skewY) v.skewX += m, v.rotation += m
						}
						Tt && p.force3D != null && (f.force3D = p.force3D, w = !0), f.skewType = p.skewType || f.skewType || n.defaultSkewType, b = f.force3D || f.z || f.rotationX || f.rotationY || v.z || v.rotationX || v.rotationY || v.perspective, !b && p.scale != null && (v.scaleZ = 1);
						while (--h > -1) {
							r = wt[h], y = v[r] - f[r];
							if (y > c || y < -c || L[r] != null) w = !0, o = new dt(f, r, f[r], y, o), r in d && (o.e = d[r]), o.xs0 = 0, o.plugin = u, i._overwriteProps.push(o.n)
						}
						y = p.transformOrigin;
						if (y || Tt && b && f.zOrigin) Et ? (w = !0, r = xt, y = (y || $(e, r, s, !1, "50% 50%")) + "", o = new dt(l, r, 0, 0, o, -1, "transformOrigin"), o.b = l[r], o.plugin = u, Tt ? (g = f.zOrigin, y = y.split(" "), f.zOrigin = (y.length > 2 && (g === 0 || y[2] !== "0px") ? parseFloat(y[2]) : g) || 0, o.xs0 = o.e = y[0] + " " + (y[1] || "50%") + " 0px", o = new dt(f, "zOrigin", 0, 0, o, -1, o.n), o.b = g, o.xs0 = o.e = f.zOrigin) : o.xs0 = o.e = y) : tt(y + "", f);
						return w && (i._transformType = b || this._transformType === 3 ? 3 : 2), o
					},
					prefix: !0
				}), yt("boxShadow", {
					defaultValue: "0px 0px 0px 0px #999",
					prefix: !0,
					color: !0,
					multi: !0,
					keyword: "inset"
				}), yt("borderRadius", {
					defaultValue: "0px",
					parser: function(e, t, n, r, o, u) {
						t = this.format(t);
						var a = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
							f = e.style,
							l, c, h, p, d, v, m, g, y, b, w, E, S, x, T, N;
						y = parseFloat(e.offsetWidth), b = parseFloat(e.offsetHeight), l = t.split(" ");
						for (c = 0; c < a.length; c++) this.p.indexOf("border") && (a[c] = X(a[c])), d = p = $(e, a[c], s, !1, "0px"), d.indexOf(" ") !== -1 && (p = d.split(" "), d = p[0], p = p[1]), v = h = l[c], m = parseFloat(d), E = d.substr((m + "").length), S = v.charAt(1) === "=", S ? (g = parseInt(v.charAt(0) + "1", 10), v = v.substr(2), g *= parseFloat(v), w = v.substr((g + "").length - (g < 0 ? 1 : 0)) || "") : (g = parseFloat(v), w = v.substr((g + "").length)), w === "" && (w = i[n] || E), w !== E && (x = J(e, "borderLeft", m, E), T = J(e, "borderTop", m, E), w === "%" ? (d = x / y * 100 + "%", p = T / b * 100 + "%") : w === "em" ? (N = J(e, "borderLeft", 1, "em"), d = x / N + "em", p = T / N + "em") : (d = x + "px", p = T + "px"), S && (v = parseFloat(d) + g + w, h = parseFloat(p) + g + w)), o = vt(f, a[c], d + " " + p, v + " " + h, !1, "0px", o);
						return o
					},
					prefix: !0,
					formatter: ft("0px 0px 0px 0px", !1, !0)
				}), yt("backgroundPosition", {
					defaultValue: "0 0",
					parser: function(e, t, n, r, i, o) {
						var u = "background-position",
							a = s || V(e, null),
							f = this.format((a ? I ? a.getPropertyValue(u + "-x") + " " + a.getPropertyValue(u + "-y") : a.getPropertyValue(u) : e.currentStyle.backgroundPositionX + " " + e.currentStyle.backgroundPositionY) || "0 0"),
							l = this.format(t),
							c, h, p, d, v, m;
						if (f.indexOf("%") !== -1 != (l.indexOf("%") !== -1)) {
							m = $(e, "backgroundImage").replace(w, "");
							if (m && m !== "none") {
								c = f.split(" "), h = l.split(" "), M.setAttribute("src", m), p = 2;
								while (--p > -1) f = c[p], d = f.indexOf("%") !== -1, d !== (h[p].indexOf("%") !== -1) && (v = p === 0 ? e.offsetWidth - M.width : e.offsetHeight - M.height, c[p] = d ? parseFloat(f) / 100 * v + "px" : parseFloat(f) / v * 100 + "%");
								f = c.join(" ")
							}
						}
						return this.parseComplex(e.style, f, l, i, o)
					},
					formatter: tt
				}), yt("backgroundSize", {
					defaultValue: "0 0",
					formatter: tt
				}), yt("perspective", {
					defaultValue: "0px",
					prefix: !0
				}), yt("perspectiveOrigin", {
					defaultValue: "50% 50%",
					prefix: !0
				}), yt("transformStyle", {
					prefix: !0
				}), yt("backfaceVisibility", {
					prefix: !0
				}), yt("userSelect", {
					prefix: !0
				}), yt("margin", {
					parser: lt("marginTop,marginRight,marginBottom,marginLeft")
				}), yt("padding", {
					parser: lt("paddingTop,paddingRight,paddingBottom,paddingLeft")
				}), yt("clip", {
					defaultValue: "rect(0px,0px,0px,0px)",
					parser: function(e, t, n, r, i, o) {
						var u, a, f;
						return I < 9 ? (a = e.currentStyle, f = I < 8 ? " " : ",", u = "rect(" + a.clipTop + f + a.clipRight + f + a.clipBottom + f + a.clipLeft + ")", t = this.format(t).split(",").join(f)) : (u = this.format($(e, this.p, s, !1, this.dflt)), t = this.format(t)), this.parseComplex(e.style, u, t, i, o)
					}
				}), yt("textShadow", {
					defaultValue: "0px 0px 0px #999",
					color: !0,
					multi: !0
				}), yt("autoRound,strictUnits", {
					parser: function(e, t, n, r, i) {
						return i
					}
				}), yt("border", {
					defaultValue: "0px solid #000",
					parser: function(e, t, n, r, i, o) {
						return this.parseComplex(e.style, this.format($(e, "borderTopWidth", s, !1, "0px") + " " + $(e, "borderTopStyle", s, !1, "solid") + " " + $(e, "borderTopColor", s, !1, "#000")), this.format(t), i, o)
					},
					color: !0,
					formatter: function(e) {
						var t = e.split(" ");
						return t[0] + " " + (t[1] || "solid") + " " + (e.match(at) || ["#000"])[0]
					}
				}), yt("borderWidth", {
					parser: lt("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
				}), yt("float,cssFloat,styleFloat", {
					parser: function(e, t, n, r, i, s) {
						var o = e.style,
							u = "cssFloat" in o ? "cssFloat" : "styleFloat";
						return new dt(o, u, 0, 0, i, -1, n, !1, 0, o[u], t)
					}
				});
				var Ot = function(e) {
					var t = this.t,
						n = t.filter || $(this.data, "filter"),
						r = this.s + this.c * e | 0,
						i;
					r === 100 && (n.indexOf("atrix(") === -1 && n.indexOf("radient(") === -1 && n.indexOf("oader(") === -1 ? (t.removeAttribute("filter"), i = !$(this.data, "filter")) : (t.filter = n.replace(m, ""), i = !0));
					if (!i) {
						this.xn1 && (t.filter = n = n || "alpha(opacity=" + r + ")");
						if (n.indexOf("pacity") === -1) {
							if (r !== 0 || !this.xn1) t.filter = n + " alpha(opacity=" + r + ")"
						} else t.filter = n.replace(d, "opacity=" + r)
					}
				};
				yt("opacity,alpha,autoAlpha", {
					defaultValue: "1",
					parser: function(e, t, n, r, i, o) {
						var u = parseFloat($(e, "opacity", s, !1, "1")),
							a = e.style,
							f = n === "autoAlpha";
						return typeof t == "string" && t.charAt(1) === "=" && (t = (t.charAt(0) === "-" ? -1 : 1) * parseFloat(t.substr(2)) + u), f && u === 1 && $(e, "visibility", s) === "hidden" && t !== 0 && (u = 0), q ? i = new dt(a, "opacity", u, t - u, i) : (i = new dt(a, "opacity", u * 100, (t - u) * 100, i), i.xn1 = f ? 1 : 0, a.zoom = 1, i.type = 2, i.b = "alpha(opacity=" + i.s + ")", i.e = "alpha(opacity=" + (i.s + i.c) + ")", i.data = e, i.plugin = o, i.setRatio = Ot), f && (i = new dt(a, "visibility", 0, 0, i, -1, null, !1, 0, u !== 0 ? "inherit" : "hidden", t === 0 ? "hidden" : "inherit"), i.xs0 = "inherit", r._overwriteProps.push(i.n), r._overwriteProps.push(n)), i
					}
				});
				var Mt = function(e, t) {
						t && (e.removeProperty ? (t.substr(0, 2) === "ms" && (t = "M" + t.substr(1)), e.removeProperty(t.replace(y, "-$1").toLowerCase())) : e.removeAttribute(t))
					},
					_t = function(e) {
						this.t._gsClassPT = this;
						if (e === 1 || e === 0) {
							this.t.setAttribute("class", e === 0 ? this.b : this.e);
							var t = this.data,
								n = this.t.style;
							while (t) t.v ? n[t.p] = t.v : Mt(n, t.p), t = t._next;
							e === 1 && this.t._gsClassPT === this && (this.t._gsClassPT = null)
						} else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
					};
				yt("className", {
					parser: function(e, t, n, i, o, u, a) {
						var f = e.getAttribute("class") || "",
							l = e.style.cssText,
							c, h, p, d, v;
						o = i._classNamePT = new dt(e, n, 0, 0, o, 2), o.setRatio = _t, o.pr = -11, r = !0, o.b = f, h = Q(e, s), p = e._gsClassPT;
						if (p) {
							d = {}, v = p.data;
							while (v) d[v.p] = 1, v = v._next;
							p.setRatio(1)
						}
						return e._gsClassPT = o, o.e = t.charAt(1) !== "=" ? t : f.replace(new RegExp("\\s*\\b" + t.substr(2) + "\\b"), "") + (t.charAt(0) === "+" ? " " + t.substr(2) : ""), i._tween._duration && (e.setAttribute("class", o.e), c = G(e, h, Q(e), a, d), e.setAttribute("class", f), o.data = c.firstMPT, e.style.cssText = l, o = o.xfirst = i.parse(e, c.difs, o, u)), o
					}
				});
				var Dt = function(e) {
					if (e === 1 || e === 0)
						if (this.data._totalTime === this.data._totalDuration && this.data.data !== "isFromStart") {
							var t = this.t.style,
								n = u.transform.parse,
								r, i, s, o;
							if (this.e === "all") t.cssText = "", o = !0;
							else {
								r = this.e.split(","), s = r.length;
								while (--s > -1) i = r[s], u[i] && (u[i].parse === n ? o = !0 : i = i === "transformOrigin" ? xt : u[i].p), Mt(t, i)
							}
							o && (Mt(t, Et), this.t._gsTransform && delete this.t._gsTransform)
						}
				};
				yt("clearProps", {
					parser: function(e, t, n, i, s) {
						return s = new dt(e, n, 0, 0, s, 2), s.setRatio = Dt, s.e = t, s.pr = -10, s.data = i._tween, r = !0, s
					}
				}), a = "bezier,throwProps,physicsProps,physics2D".split(","), mt = a.length;
				while (mt--) bt(a[mt]);
				a = n.prototype, a._firstPT = null, a._onInitTween = function(e, t, u) {
					if (!e.nodeType) return !1;
					this._target = e, this._tween = u, this._vars = t, P = t.autoRound, r = !1, i = t.suffixMap || n.suffixMap, s = V(e, ""), o = this._overwriteProps;
					var a = e.style,
						f, l, c, h, p, d, m, g, y;
					H && a.zIndex === "" && (f = $(e, "zIndex", s), (f === "auto" || f === "") && this._addLazySet(a, "zIndex", 0)), typeof t == "string" && (h = a.cssText, f = Q(e, s), a.cssText = h + ";" + t, f = G(e, f, Q(e)).difs, !q && v.test(t) && (f.opacity = parseFloat(RegExp.$1)), t = f, a.cssText = h), this._firstPT = l = this.parse(e, t, null);
					if (this._transformType) {
						y = this._transformType === 3, Et ? B && (H = !0, a.zIndex === "" && (m = $(e, "zIndex", s), (m === "auto" || m === "") && this._addLazySet(a, "zIndex", 0)), F && this._addLazySet(a, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (y ? "visible" : "hidden"))) : a.zoom = 1, c = l;
						while (c && c._next) c = c._next;
						g = new dt(e, "transform", 0, 0, null, 2), this._linkCSSP(g, null, c), g.setRatio = y && Tt ? Lt : Et ? At : kt, g.data = this._transform || Ct(e, s, !0), o.pop()
					}
					if (r) {
						while (l) {
							d = l._next, c = h;
							while (c && c.pr > l.pr) c = c._next;
							(l._prev = c ? c._prev : p) ? l._prev._next = l: h = l, (l._next = c) ? c._prev = l : p = l, l = d
						}
						this._firstPT = h
					}
					return !0
				}, a.parse = function(e, t, n, r) {
					var o = e.style,
						a, f, l, c, h, d, v, m, y, b;
					for (a in t) {
						d = t[a], f = u[a];
						if (f) n = f.parse(e, d, a, this, n, r, t);
						else {
							h = $(e, a, s) + "", y = typeof d == "string";
							if (a === "color" || a === "fill" || a === "stroke" || a.indexOf("Color") !== -1 || y && g.test(d)) y || (d = ut(d), d = (d.length > 3 ? "rgba(" : "rgb(") + d.join(",") + ")"), n = vt(o, a, h, d, !0, "transparent", n, 0, r);
							else if (!y || d.indexOf(" ") === -1 && d.indexOf(",") === -1) {
								l = parseFloat(h), v = l || l === 0 ? h.substr((l + "").length) : "";
								if (h === "" || h === "auto") a === "width" || a === "height" ? (l = et(e, a, s), v = "px") : a === "left" || a === "top" ? (l = K(e, a, s), v = "px") : (l = a !== "opacity" ? 0 : 1, v = "");
								b = y && d.charAt(1) === "=", b ? (c = parseInt(d.charAt(0) + "1", 10), d = d.substr(2), c *= parseFloat(d), m = d.replace(p, "")) : (c = parseFloat(d), m = y ? d.substr((c + "").length) || "" : ""), m === "" && (m = a in i ? i[a] : v), d = c || c === 0 ? (b ? c + l : c) + m : t[a], v !== m && m !== "" && (c || c === 0) && l && (l = J(e, a, l, v), m === "%" ? (l /= J(e, a, 100, "%") / 100, t.strictUnits !== !0 && (h = l + "%")) : m === "em" ? l /= J(e, a, 1, "em") : m !== "px" && (c = J(e, a, c, m), m = "px"), b && (c || c === 0) && (d = c + l + m)), b && (c += l), !l && l !== 0 || !c && c !== 0 ? o[a] === undefined || !d && (d + "" == "NaN" || d == null) ? U("invalid " + a + " tween value: " + t[a]) : (n = new dt(o, a, c || l || 0, 0, n, -1, a, !1, 0, h, d), n.xs0 = d !== "none" || a !== "display" && a.indexOf("Style") === -1 ? d : h) : (n = new dt(o, a, l, c - l, n, 0, a, P !== !1 && (m === "px" || a === "zIndex"), 0, h, d), n.xs0 = m)
							} else n = vt(o, a, h, d, !0, null, n, 0, r)
						}
						r && n && !n.plugin && (n.plugin = r)
					}
					return n
				}, a.setRatio = function(e) {
					var t = this._firstPT,
						n = 1e-6,
						r, i, s;
					if (e !== 1 || this._tween._time !== this._tween._duration && this._tween._time !== 0)
						if (e || this._tween._time !== this._tween._duration && this._tween._time !== 0 || this._tween._rawPrevTime === -0.000001)
							while (t) {
								r = t.c * e + t.s, t.r ? r = Math.round(r) : r < n && r > -n && (r = 0);
								if (!t.type) t.t[t.p] = r + t.xs0;
								else if (t.type === 1) {
									s = t.l;
									if (s === 2) t.t[t.p] = t.xs0 + r + t.xs1 + t.xn1 + t.xs2;
									else if (s === 3) t.t[t.p] = t.xs0 + r + t.xs1 + t.xn1 + t.xs2 + t.xn2 + t.xs3;
									else if (s === 4) t.t[t.p] = t.xs0 + r + t.xs1 + t.xn1 + t.xs2 + t.xn2 + t.xs3 + t.xn3 + t.xs4;
									else if (s === 5) t.t[t.p] = t.xs0 + r + t.xs1 + t.xn1 + t.xs2 + t.xn2 + t.xs3 + t.xn3 + t.xs4 + t.xn4 + t.xs5;
									else {
										i = t.xs0 + r + t.xs1;
										for (s = 1; s < t.l; s++) i += t["xn" + s] + t["xs" + (s + 1)];
										t.t[t.p] = i
									}
								} else t.type === -1 ? t.t[t.p] = t.xs0 : t.setRatio && t.setRatio(e);
								t = t._next
							} else
								while (t) t.type !== 2 ? t.t[t.p] = t.b : t.setRatio(e), t = t._next;
						else
							while (t) t.type !== 2 ? t.t[t.p] = t.e : t.setRatio(e), t = t._next
				}, a._enableTransforms = function(e) {
					this._transformType = e || this._transformType === 3 ? 3 : 2, this._transform = this._transform || Ct(this._target, s, !0)
				};
				var Pt = function(e) {
					this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
				};
				a._addLazySet = function(e, t, n) {
					var r = this._firstPT = new dt(e, t, 0, 0, this._firstPT, 2);
					r.e = n, r.setRatio = Pt, r.data = this
				}, a._linkCSSP = function(e, t, n, r) {
					return e && (t && (t._prev = e), e._next && (e._next._prev = e._prev), e._prev ? e._prev._next = e._next : this._firstPT === e && (this._firstPT = e._next, r = !0), n ? n._next = e : !r && this._firstPT === null && (this._firstPT = e), e._next = t, e._prev = n), e
				}, a._kill = function(t) {
					var n = t,
						r, i, s;
					if (t.autoAlpha || t.alpha) {
						n = {};
						for (i in t) n[i] = t[i];
						n.opacity = 1, n.autoAlpha && (n.visibility = 1)
					}
					return t.className && (r = this._classNamePT) && (s = r.xfirst, s && s._prev ? this._linkCSSP(s._prev, r._next, s._prev._prev) : s === this._firstPT && (this._firstPT = r._next), r._next && this._linkCSSP(r._next, r._next._next, s._prev), this._classNamePT = null), e.prototype._kill.call(this, n)
				};
				var Ht = function(e, t, n) {
					var r, i, s, o;
					if (e.slice) {
						i = e.length;
						while (--i > -1) Ht(e[i], t, n);
						return
					}
					r = e.childNodes, i = r.length;
					while (--i > -1) s = r[i], o = s.type, s.style && (t.push(Q(s)), n && n.push(s)), (o === 1 || o === 9 || o === 11) && s.childNodes.length && Ht(s, t, n)
				};
				return n.cascadeTo = function(e, n, r) {
					var i = t.to(e, n, r),
						s = [i],
						o = [],
						u = [],
						a = [],
						f = t._internals.reservedProps,
						l, c, h;
					e = i._targets || i.target, Ht(e, o, a), i.render(n, !0), Ht(e, u), i.render(0, !0), i._enabled(!0), l = a.length;
					while (--l > -1) {
						c = G(a[l], o[l], u[l]);
						if (c.firstMPT) {
							c = c.difs;
							for (h in r) f[h] && (c[h] = r[h]);
							s.push(t.to(a[l], n, c))
						}
					}
					return s
				}, e.activate([n]), n
			}, !0),
			function() {
				var e = _gsScope._gsDefine.plugin({
						propName: "roundProps",
						priority: -1,
						API: 2,
						init: function(e, t, n) {
							return this._tween = n, !0
						}
					}),
					t = e.prototype;
				t._onInitAllProps = function() {
					var e = this._tween,
						t = e.vars.roundProps instanceof Array ? e.vars.roundProps : e.vars.roundProps.split(","),
						n = t.length,
						r = {},
						i = e._propLookup.roundProps,
						s, o, u;
					while (--n > -1) r[t[n]] = 1;
					n = t.length;
					while (--n > -1) {
						s = t[n], o = e._firstPT;
						while (o) u = o._next, o.pg ? o.t._roundProps(r, !0) : o.n === s && (this._add(o.t, s, o.s, o.c), u && (u._prev = o._prev), o._prev ? o._prev._next = u : e._firstPT === o && (e._firstPT = u), o._next = o._prev = null, e._propLookup[s] = i), o = u
					}
					return !1
				}, t._add = function(e, t, n, r) {
					this._addTween(e, t, n, n + r, t, !0), this._overwriteProps.push(t)
				}
			}(), _gsScope._gsDefine.plugin({
				propName: "attr",
				API: 2,
				version: "0.3.3",
				init: function(e, t, n) {
					var r, i, s;
					if (typeof e.setAttribute != "function") return !1;
					this._target = e, this._proxy = {}, this._start = {}, this._end = {};
					for (r in t) this._start[r] = this._proxy[r] = i = e.getAttribute(r), s = this._addTween(this._proxy, r, parseFloat(i), t[r], r), this._end[r] = s ? s.s + s.c : t[r], this._overwriteProps.push(r);
					return !0
				},
				set: function(e) {
					this._super.setRatio.call(this, e);
					var t = this._overwriteProps,
						n = t.length,
						r = e === 1 ? this._end : e ? this._proxy : this._start,
						i;
					while (--n > -1) i = t[n], this._target.setAttribute(i, r[i] + "")
				}
			}), _gsScope._gsDefine.plugin({
				propName: "directionalRotation",
				version: "0.2.1",
				API: 2,
				init: function(e, t, n) {
					typeof t != "object" && (t = {
						rotation: t
					}), this.finals = {};
					var r = t.useRadians === !0 ? Math.PI * 2 : 360,
						i = 1e-6,
						s, o, u, a, f, l;
					for (s in t)
						if (s !== "useRadians") {
							l = (t[s] + "").split("_"), o = l[0], u = parseFloat(typeof e[s] != "function" ? e[s] : e[s.indexOf("set") || typeof e["get" + s.substr(3)] != "function" ? s : "get" + s.substr(3)]()), a = this.finals[s] = typeof o == "string" && o.charAt(1) === "=" ? u + parseInt(o.charAt(0) + "1", 10) * Number(o.substr(2)) : Number(o) || 0, f = a - u, l.length && (o = l.join("_"), o.indexOf("short") !== -1 && (f %= r, f !== f % (r / 2) && (f = f < 0 ? f + r : f - r)), o.indexOf("_cw") !== -1 && f < 0 ? f = (f + r * 9999999999) % r - (f / r | 0) * r : o.indexOf("ccw") !== -1 && f > 0 && (f = (f - r * 9999999999) % r - (f / r | 0) * r));
							if (f > i || f < -i) this._addTween(e, s, u, u + f, s), this._overwriteProps.push(s)
						}
					return !0
				},
				set: function(e) {
					var t;
					if (e !== 1) this._super.setRatio.call(this, e);
					else {
						t = this._firstPT;
						while (t) t.f ? t.t[t.p](this.finals[t.p]) : t.t[t.p] = this.finals[t.p], t = t._next
					}
				}
			})._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(e) {
				var t = _gsScope.GreenSockGlobals || _gsScope,
					n = t.com.greensock,
					r = Math.PI * 2,
					i = Math.PI / 2,
					s = n._class,
					o = function(t, n) {
						var r = s("easing." + t, function() {}, !0),
							i = r.prototype = new e;
						return i.constructor = r, i.getRatio = n, r
					},
					u = e.register || function() {},
					a = function(e, t, n, r, i) {
						var o = s("easing." + e, {
							easeOut: new t,
							easeIn: new n,
							easeInOut: new r
						}, !0);
						return u(o, e), o
					},
					f = function(e, t, n) {
						this.t = e, this.v = t, n && (this.next = n, n.prev = this, this.c = n.v - t, this.gap = n.t - e)
					},
					l = function(t, n) {
						var r = s("easing." + t, function(e) {
								this._p1 = e || e === 0 ? e : 1.70158, this._p2 = this._p1 * 1.525
							}, !0),
							i = r.prototype = new e;
						return i.constructor = r, i.getRatio = n, i.config = function(e) {
							return new r(e)
						}, r
					},
					c = a("Back", l("BackOut", function(e) {
						return (e -= 1) * e * ((this._p1 + 1) * e + this._p1) + 1
					}), l("BackIn", function(e) {
						return e * e * ((this._p1 + 1) * e - this._p1)
					}), l("BackInOut", function(e) {
						return (e *= 2) < 1 ? .5 * e * e * ((this._p2 + 1) * e - this._p2) : .5 * ((e -= 2) * e * ((this._p2 + 1) * e + this._p2) + 2)
					})),
					h = s("easing.SlowMo", function(e, t, n) {
						t = t || t === 0 ? t : .7, e == null ? e = .7 : e > 1 && (e = 1), this._p = e !== 1 ? t : 0, this._p1 = (1 - e) / 2, this._p2 = e, this._p3 = this._p1 + this._p2, this._calcEnd = n === !0
					}, !0),
					p = h.prototype = new e,
					d, v, m;
				return p.constructor = h, p.getRatio = function(e) {
					var t = e + (.5 - e) * this._p;
					return e < this._p1 ? this._calcEnd ? 1 - (e = 1 - e / this._p1) * e : t - (e = 1 - e / this._p1) * e * e * e * t : e > this._p3 ? this._calcEnd ? 1 - (e = (e - this._p3) / this._p1) * e : t + (e - t) * (e = (e - this._p3) / this._p1) * e * e * e : this._calcEnd ? 1 : t
				}, h.ease = new h(.7, .7), p.config = h.config = function(e, t, n) {
					return new h(e, t, n)
				}, d = s("easing.SteppedEase", function(e) {
					e = e || 1, this._p1 = 1 / e, this._p2 = e + 1
				}, !0), p = d.prototype = new e, p.constructor = d, p.getRatio = function(e) {
					return e < 0 ? e = 0 : e >= 1 && (e = .999999999), (this._p2 * e >> 0) * this._p1
				}, p.config = d.config = function(e) {
					return new d(e)
				}, v = s("easing.RoughEase", function(t) {
					t = t || {};
					var n = t.taper || "none",
						r = [],
						i = 0,
						s = (t.points || 20) | 0,
						o = s,
						u = t.randomize !== !1,
						a = t.clamp === !0,
						l = t.template instanceof e ? t.template : null,
						c = typeof t.strength == "number" ? t.strength * .4 : .4,
						h, p, d, v, m, g;
					while (--o > -1) h = u ? Math.random() : 1 / s * o, p = l ? l.getRatio(h) : h, n === "none" ? d = c : n === "out" ? (v = 1 - h, d = v * v * c) : n === "in" ? d = h * h * c : h < .5 ? (v = h * 2, d = v * v * .5 * c) : (v = (1 - h) * 2, d = v * v * .5 * c), u ? p += Math.random() * d - d * .5 : o % 2 ? p += d * .5 : p -= d * .5, a && (p > 1 ? p = 1 : p < 0 && (p = 0)), r[i++] = {
						x: h,
						y: p
					};
					r.sort(function(e, t) {
						return e.x - t.x
					}), g = new f(1, 1, null), o = s;
					while (--o > -1) m = r[o], g = new f(m.x, m.y, g);
					this._prev = new f(0, 0, g.t !== 0 ? g : g.next)
				}, !0), p = v.prototype = new e, p.constructor = v, p.getRatio = function(e) {
					var t = this._prev;
					if (e > t.t) {
						while (t.next && e >= t.t) t = t.next;
						t = t.prev
					} else
						while (t.prev && e <= t.t) t = t.prev;
					return this._prev = t, t.v + (e - t.t) / t.gap * t.c
				}, p.config = function(e) {
					return new v(e)
				}, v.ease = new v, a("Bounce", o("BounceOut", function(e) {
					return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
				}), o("BounceIn", function(e) {
					return (e = 1 - e) < 1 / 2.75 ? 1 - 7.5625 * e * e : e < 2 / 2.75 ? 1 - (7.5625 * (e -= 1.5 / 2.75) * e + .75) : e < 2.5 / 2.75 ? 1 - (7.5625 * (e -= 2.25 / 2.75) * e + .9375) : 1 - (7.5625 * (e -= 2.625 / 2.75) * e + .984375)
				}), o("BounceInOut", function(e) {
					var t = e < .5;
					return t ? e = 1 - e * 2 : e = e * 2 - 1, e < 1 / 2.75 ? e = 7.5625 * e * e : e < 2 / 2.75 ? e = 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? e = 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : e = 7.5625 * (e -= 2.625 / 2.75) * e + .984375, t ? (1 - e) * .5 : e * .5 + .5
				})), a("Circ", o("CircOut", function(e) {
					return Math.sqrt(1 - (e -= 1) * e)
				}), o("CircIn", function(e) {
					return -(Math.sqrt(1 - e * e) - 1)
				}), o("CircInOut", function(e) {
					return (e *= 2) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
				})), m = function(t, n, i) {
					var o = s("easing." + t, function(e, t) {
							this._p1 = e || 1, this._p2 = t || i, this._p3 = this._p2 / r * (Math.asin(1 / this._p1) || 0)
						}, !0),
						u = o.prototype = new e;
					return u.constructor = o, u.getRatio = n, u.config = function(e, t) {
						return new o(e, t)
					}, o
				}, a("Elastic", m("ElasticOut", function(e) {
					return this._p1 * Math.pow(2, -10 * e) * Math.sin((e - this._p3) * r / this._p2) + 1
				}, .3), m("ElasticIn", function(e) {
					return -(this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * r / this._p2))
				}, .3), m("ElasticInOut", function(e) {
					return (e *= 2) < 1 ? -0.5 * this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * r / this._p2) : this._p1 * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - this._p3) * r / this._p2) * .5 + 1
				}, .45)), a("Expo", o("ExpoOut", function(e) {
					return 1 - Math.pow(2, -10 * e)
				}), o("ExpoIn", function(e) {
					return Math.pow(2, 10 * (e - 1)) - .001
				}), o("ExpoInOut", function(e) {
					return (e *= 2) < 1 ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * (e - 1)))
				})), a("Sine", o("SineOut", function(e) {
					return Math.sin(e * i)
				}), o("SineIn", function(e) {
					return -Math.cos(e * i) + 1
				}), o("SineInOut", function(e) {
					return -0.5 * (Math.cos(Math.PI * e) - 1)
				})), s("easing.EaseLookup", {
					find: function(t) {
						return e.map[t]
					}
				}, !0), u(t.SlowMo, "SlowMo", "ease,"), u(v, "RoughEase", "ease,"), u(d, "SteppedEase", "ease,"), c
			}, !0)
	}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
	function(e, t) {
		var n = e.GreenSockGlobals = e.GreenSockGlobals || e;
		if (n.TweenLite) return;
		var r = function(e) {
				var t = e.split("."),
					r = n,
					i;
				for (i = 0; i < t.length; i++) r[t[i]] = r = r[t[i]] || {};
				return r
			},
			i = r("com.greensock"),
			s = 1e-10,
			o = function(e) {
				var t = [],
					n = e.length,
					r;
				for (r = 0; r !== n; t.push(e[r++]));
				return t
			},
			u = function() {},
			a = function() {
				var e = Object.prototype.toString,
					t = e.call([]);
				return function(n) {
					return n != null && (n instanceof Array || typeof n == "object" && !!n.push && e.call(n) === t)
				}
			}(),
			f, l, c, h, p, d = {},
			v = function(i, s, o, u) {
				this.sc = d[i] ? d[i].sc : [], d[i] = this, this.gsClass = null, this.func = o;
				var a = [];
				this.check = function(f) {
					var l = s.length,
						c = l,
						h, p, m, g;
					while (--l > -1)(h = d[s[l]] || new v(s[l], [])).gsClass ? (a[l] = h.gsClass, c--) : f && h.sc.push(this);
					if (c === 0 && o) {
						p = ("com.greensock." + i).split("."), m = p.pop(), g = r(p.join("."))[m] = this.gsClass = o.apply(o, a), u && (n[m] = g, typeof define == "function" && define.amd ? define((e.GreenSockAMDPath ? e.GreenSockAMDPath + "/" : "") + i.split(".").pop(), [], function() {
							return g
						}) : i === t && typeof module != "undefined" && module.exports && (module.exports = g));
						for (l = 0; l < this.sc.length; l++) this.sc[l].check()
					}
				}, this.check(!0)
			},
			m = e._gsDefine = function(e, t, n, r) {
				return new v(e, t, n, r)
			},
			g = i._class = function(e, t, n) {
				return t = t || function() {}, m(e, [], function() {
					return t
				}, n), t
			};
		m.globals = n;
		var y = [0, 0, 1, 1],
			b = [],
			w = g("easing.Ease", function(e, t, n, r) {
				this._func = e, this._type = n || 0, this._power = r || 0, this._params = t ? y.concat(t) : y
			}, !0),
			E = w.map = {},
			S = w.register = function(e, t, n, r) {
				var s = t.split(","),
					o = s.length,
					u = (n || "easeIn,easeOut,easeInOut").split(","),
					a, f, l, c;
				while (--o > -1) {
					f = s[o], a = r ? g("easing." + f, null, !0) : i.easing[f] || {}, l = u.length;
					while (--l > -1) c = u[l], E[f + "." + c] = E[c + f] = a[c] = e.getRatio ? e : e[c] || new e
				}
			};
		c = w.prototype, c._calcEnd = !1, c.getRatio = function(e) {
			if (this._func) return this._params[0] = e, this._func.apply(null, this._params);
			var t = this._type,
				n = this._power,
				r = t === 1 ? 1 - e : t === 2 ? e : e < .5 ? e * 2 : (1 - e) * 2;
			return n === 1 ? r *= r : n === 2 ? r *= r * r : n === 3 ? r *= r * r * r : n === 4 && (r *= r * r * r * r), t === 1 ? 1 - r : t === 2 ? r : e < .5 ? r / 2 : 1 - r / 2
		}, f = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], l = f.length;
		while (--l > -1) c = f[l] + ",Power" + l, S(new w(null, null, 1, l), c, "easeOut", !0), S(new w(null, null, 2, l), c, "easeIn" + (l === 0 ? ",easeNone" : "")), S(new w(null, null, 3, l), c, "easeInOut");
		E.linear = i.easing.Linear.easeIn, E.swing = i.easing.Quad.easeInOut;
		var x = g("events.EventDispatcher", function(e) {
			this._listeners = {}, this._eventTarget = e || this
		});
		c = x.prototype, c.addEventListener = function(e, t, n, r, i) {
			i = i || 0;
			var s = this._listeners[e],
				o = 0,
				u, a;
			s == null && (this._listeners[e] = s = []), a = s.length;
			while (--a > -1) u = s[a], u.c === t && u.s === n ? s.splice(a, 1) : o === 0 && u.pr < i && (o = a + 1);
			s.splice(o, 0, {
				c: t,
				s: n,
				up: r,
				pr: i
			}), this === h && !p && h.wake()
		}, c.removeEventListener = function(e, t) {
			var n = this._listeners[e],
				r;
			if (n) {
				r = n.length;
				while (--r > -1)
					if (n[r].c === t) {
						n.splice(r, 1);
						return
					}
			}
		}, c.dispatchEvent = function(e) {
			var t = this._listeners[e],
				n, r, i;
			if (t) {
				n = t.length, r = this._eventTarget;
				while (--n > -1) i = t[n], i.up ? i.c.call(i.s || r, {
					type: e,
					target: r
				}) : i.c.call(i.s || r)
			}
		};
		var T = e.requestAnimationFrame,
			N = e.cancelAnimationFrame,
			C = Date.now || function() {
				return (new Date).getTime()
			},
			k = C();
		f = ["ms", "moz", "webkit", "o"], l = f.length;
		while (--l > -1 && !T) T = e[f[l] + "RequestAnimationFrame"], N = e[f[l] + "CancelAnimationFrame"] || e[f[l] + "CancelRequestAnimationFrame"];
		g("Ticker", function(e, t) {
			var n = this,
				r = C(),
				i = t !== !1 && T,
				o = 500,
				a = 33,
				f, l, c, d, v, m = function(e) {
					var t = C() - k,
						i, s;
					t > o && (r += t - a), k += t, n.time = (k - r) / 1e3, i = n.time - v;
					if (!f || i > 0 || e === !0) n.frame++, v += i + (i >= d ? .004 : d - i), s = !0;
					e !== !0 && (c = l(m)), s && n.dispatchEvent("tick")
				};
			x.call(n), n.time = n.frame = 0, n.tick = function() {
				m(!0)
			}, n.lagSmoothing = function(e, t) {
				o = e || 1 / s, a = Math.min(t, o, 0)
			}, n.sleep = function() {
				if (c == null) return;
				!i || !N ? clearTimeout(c) : N(c), l = u, c = null, n === h && (p = !1)
			}, n.wake = function() {
				c !== null ? n.sleep() : n.frame > 10 && (k = C() - o + 5), l = f === 0 ? u : !i || !T ? function(e) {
					return setTimeout(e, (v - n.time) * 1e3 + 1 | 0)
				} : T, n === h && (p = !0), m(2)
			}, n.fps = function(e) {
				if (!arguments.length) return f;
				f = e, d = 1 / (f || 60), v = this.time + d, n.wake()
			}, n.useRAF = function(e) {
				if (!arguments.length) return i;
				n.sleep(), i = e, n.fps(f)
			}, n.fps(e), setTimeout(function() {
				i && (!c || n.frame < 5) && n.useRAF(!1)
			}, 1500)
		}), c = i.Ticker.prototype = new i.events.EventDispatcher, c.constructor = i.Ticker;
		var L = g("core.Animation", function(e, t) {
			this.vars = t = t || {}, this._duration = this._totalDuration = e || 0, this._delay = Number(t.delay) || 0, this._timeScale = 1, this._active = t.immediateRender === !0, this.data = t.data, this._reversed = t.reversed === !0;
			if (!z) return;
			p || h.wake();
			var n = this.vars.useFrames ? U : z;
			n.add(this, n._time), this.vars.paused && this.paused(!0)
		});
		h = L.ticker = new i.Ticker, c = L.prototype, c._dirty = c._gc = c._initted = c._paused = !1, c._totalTime = c._time = 0, c._rawPrevTime = -1, c._next = c._last = c._onUpdate = c._timeline = c.timeline = null, c._paused = !1;
		var A = function() {
			p && C() - k > 2e3 && h.wake(), setTimeout(A, 2e3)
		};
		A(), c.play = function(e, t) {
			return e != null && this.seek(e, t), this.reversed(!1).paused(!1)
		}, c.pause = function(e, t) {
			return e != null && this.seek(e, t), this.paused(!0)
		}, c.resume = function(e, t) {
			return e != null && this.seek(e, t), this.paused(!1)
		}, c.seek = function(e, t) {
			return this.totalTime(Number(e), t !== !1)
		}, c.restart = function(e, t) {
			return this.reversed(!1).paused(!1).totalTime(e ? -this._delay : 0, t !== !1, !0)
		}, c.reverse = function(e, t) {
			return e != null && this.seek(e || this.totalDuration(), t), this.reversed(!0).paused(!1)
		}, c.render = function(e, t, n) {}, c.invalidate = function() {
			return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
		}, c.isActive = function() {
			var e = this._timeline,
				t = this._startTime,
				n;
			return !e || !this._gc && !this._paused && e.isActive() && (n = e.rawTime()) >= t && n < t + this.totalDuration() / this._timeScale
		}, c._enabled = function(e, t) {
			return p || h.wake(), this._gc = !e, this._active = this.isActive(), t !== !0 && (e && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !e && this.timeline && this._timeline._remove(this, !0)), !1
		}, c._kill = function(e, t) {
			return this._enabled(!1, !1)
		}, c.kill = function(e, t) {
			return this._kill(e, t), this
		}, c._uncache = function(e) {
			var t = e ? this : this.timeline;
			while (t) t._dirty = !0, t = t.timeline;
			return this
		}, c._swapSelfInParams = function(e) {
			var t = e.length,
				n = e.concat();
			while (--t > -1) e[t] === "{self}" && (n[t] = this);
			return n
		}, c.eventCallback = function(e, t, n, r) {
			if ((e || "").substr(0, 2) === "on") {
				var i = this.vars;
				if (arguments.length === 1) return i[e];
				t == null ? delete i[e] : (i[e] = t, i[e + "Params"] = a(n) && n.join("").indexOf("{self}") !== -1 ? this._swapSelfInParams(n) : n, i[e + "Scope"] = r), e === "onUpdate" && (this._onUpdate = t)
			}
			return this
		}, c.delay = function(e) {
			return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + e - this._delay), this._delay = e, this) : this._delay
		}, c.duration = function(e) {
			return arguments.length ? (this._duration = this._totalDuration = e, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && e !== 0 && this.totalTime(this._totalTime * (e / this._duration), !0), this) : (this._dirty = !1, this._duration)
		}, c.totalDuration = function(e) {
			return this._dirty = !1, arguments.length ? this.duration(e) : this._totalDuration
		}, c.time = function(e, t) {
			return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(e > this._duration ? this._duration : e, t)) : this._time
		}, c.totalTime = function(e, t, n) {
			p || h.wake();
			if (!arguments.length) return this._totalTime;
			if (this._timeline) {
				e < 0 && !n && (e += this.totalDuration());
				if (this._timeline.smoothChildTiming) {
					this._dirty && this.totalDuration();
					var r = this._totalDuration,
						i = this._timeline;
					e > r && !n && (e = r), this._startTime = (this._paused ? this._pauseTime : i._time) - (this._reversed ? r - e : e) / this._timeScale, i._dirty || this._uncache(!1);
					if (i._timeline)
						while (i._timeline) i._timeline._time !== (i._startTime + i._totalTime) / i._timeScale && i.totalTime(i._totalTime, !0), i = i._timeline
				}
				this._gc && this._enabled(!0, !1);
				if (this._totalTime !== e || this._duration === 0) this.render(e, t, !1), P.length && W()
			}
			return this
		}, c.progress = c.totalProgress = function(e, t) {
			return arguments.length ? this.totalTime(this.duration() * e, t) : this._time / this.duration()
		}, c.startTime = function(e) {
			return arguments.length ? (e !== this._startTime && (this._startTime = e, this.timeline && this.timeline._sortChildren && this.timeline.add(this, e - this._delay)), this) : this._startTime
		}, c.timeScale = function(e) {
			if (!arguments.length) return this._timeScale;
			e = e || s;
			if (this._timeline && this._timeline.smoothChildTiming) {
				var t = this._pauseTime,
					n = t || t === 0 ? t : this._timeline.totalTime();
				this._startTime = n - (n - this._startTime) * this._timeScale / e
			}
			return this._timeScale = e, this._uncache(!1)
		}, c.reversed = function(e) {
			return arguments.length ? (e != this._reversed && (this._reversed = e, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
		}, c.paused = function(e) {
			if (!arguments.length) return this._paused;
			if (e != this._paused && this._timeline) {
				!p && !e && h.wake();
				var t = this._timeline,
					n = t.rawTime(),
					r = n - this._pauseTime;
				!e && t.smoothChildTiming && (this._startTime += r, this._uncache(!1)), this._pauseTime = e ? n : null, this._paused = e, this._active = this.isActive(), !e && r !== 0 && this._initted && this.duration() && this.render(t.smoothChildTiming ? this._totalTime : (n - this._startTime) / this._timeScale, !0, !0)
			}
			return this._gc && !e && this._enabled(!0, !1), this
		};
		var O = g("core.SimpleTimeline", function(e) {
			L.call(this, 0, e), this.autoRemoveChildren = this.smoothChildTiming = !0
		});
		c = O.prototype = new L, c.constructor = O, c.kill()._gc = !1, c._first = c._last = null, c._sortChildren = !1, c.add = c.insert = function(e, t, n, r) {
			var i, s;
			e._startTime = Number(t || 0) + e._delay, e._paused && this !== e._timeline && (e._pauseTime = e._startTime + (this.rawTime() - e._startTime) / e._timeScale), e.timeline && e.timeline._remove(e, !0), e.timeline = e._timeline = this, e._gc && e._enabled(!0, !0), i = this._last;
			if (this._sortChildren) {
				s = e._startTime;
				while (i && i._startTime > s) i = i._prev
			}
			return i ? (e._next = i._next, i._next = e) : (e._next = this._first, this._first = e), e._next ? e._next._prev = e : this._last = e, e._prev = i, this._timeline && this._uncache(!0), this
		}, c._remove = function(e, t) {
			return e.timeline === this && (t || e._enabled(!1, !0), e._prev ? e._prev._next = e._next : this._first === e && (this._first = e._next), e._next ? e._next._prev = e._prev : this._last === e && (this._last = e._prev), e._next = e._prev = e.timeline = null, this._timeline && this._uncache(!0)), this
		}, c.render = function(e, t, n) {
			var r = this._first,
				i;
			this._totalTime = this._time = this._rawPrevTime = e;
			while (r) {
				i = r._next;
				if (r._active || e >= r._startTime && !r._paused) r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, n) : r.render((e - r._startTime) * r._timeScale, t, n);
				r = i
			}
		}, c.rawTime = function() {
			return p || h.wake(), this._totalTime
		};
		var M = g("TweenLite", function(t, n, r) {
				L.call(this, n, r), this.render = M.prototype.render;
				if (t == null) throw "Cannot tween a null target.";
				this.target = t = typeof t != "string" ? t : M.selector(t) || t;
				var i = t.jquery || t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType),
					u = this.vars.overwrite,
					f, l, c;
				this._overwrite = u = u == null ? R[M.defaultOverwrite] : typeof u == "number" ? u >> 0 : R[u];
				if ((i || t instanceof Array || t.push && a(t)) && typeof t[0] != "number") {
					this._targets = c = o(t), this._propLookup = [], this._siblings = [];
					for (f = 0; f < c.length; f++) {
						l = c[f];
						if (!l) {
							c.splice(f--, 1);
							continue
						}
						if (typeof l == "string") {
							l = c[f--] = M.selector(l), typeof l == "string" && c.splice(f + 1, 1);
							continue
						}
						if (l.length && l !== e && l[0] && (l[0] === e || l[0].nodeType && l[0].style && !l.nodeType)) {
							c.splice(f--, 1), this._targets = c = c.concat(o(l));
							continue
						}
						this._siblings[f] = X(l, this, !1), u === 1 && this._siblings[f].length > 1 && V(l, this, null, 1, this._siblings[f])
					}
				} else this._propLookup = {}, this._siblings = X(t, this, !1), u === 1 && this._siblings.length > 1 && V(t, this, null, 1, this._siblings);
				if (this.vars.immediateRender || n === 0 && this._delay === 0 && this.vars.immediateRender !== !1) this._time = -s, this.render(-this._delay)
			}, !0),
			_ = function(t) {
				return t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType)
			},
			D = function(e, t) {
				var n = {},
					r;
				for (r in e) !q[r] && (!(r in t) || r === "transform" || r === "x" || r === "y" || r === "width" || r === "height" || r === "className" || r === "border") && (!j[r] || j[r] && j[r]._autoCSS) && (n[r] = e[r], delete e[r]);
				e.css = n
			};
		c = M.prototype = new L, c.constructor = M, c.kill()._gc = !1, c.ratio = 0, c._firstPT = c._targets = c._overwrittenProps = c._startAt = null, c._notifyPluginsOfEnabled = c._lazy = !1, M.version = "1.13.2", M.defaultEase = c._ease = new w(null, null, 1, 1), M.defaultOverwrite = "auto", M.ticker = h, M.autoSleep = !0, M.lagSmoothing = function(e, t) {
			h.lagSmoothing(e, t)
		}, M.selector = e.$ || e.jQuery || function(t) {
			var n = e.$ || e.jQuery;
			return n ? (M.selector = n, n(t)) : typeof document == "undefined" ? t : document.querySelectorAll ? document.querySelectorAll(t) : document.getElementById(t.charAt(0) === "#" ? t.substr(1) : t)
		};
		var P = [],
			H = {},
			B = M._internals = {
				isArray: a,
				isSelector: _,
				lazyTweens: P
			},
			j = M._plugins = {},
			F = B.tweenLookup = {},
			I = 0,
			q = B.reservedProps = {
				ease: 1,
				delay: 1,
				overwrite: 1,
				onComplete: 1,
				onCompleteParams: 1,
				onCompleteScope: 1,
				useFrames: 1,
				runBackwards: 1,
				startAt: 1,
				onUpdate: 1,
				onUpdateParams: 1,
				onUpdateScope: 1,
				onStart: 1,
				onStartParams: 1,
				onStartScope: 1,
				onReverseComplete: 1,
				onReverseCompleteParams: 1,
				onReverseCompleteScope: 1,
				onRepeat: 1,
				onRepeatParams: 1,
				onRepeatScope: 1,
				easeParams: 1,
				yoyo: 1,
				immediateRender: 1,
				repeat: 1,
				repeatDelay: 1,
				data: 1,
				paused: 1,
				reversed: 1,
				autoCSS: 1,
				lazy: 1
			},
			R = {
				none: 0,
				all: 1,
				auto: 2,
				concurrent: 3,
				allOnStart: 4,
				preexisting: 5,
				"true": 1,
				"false": 0
			},
			U = L._rootFramesTimeline = new O,
			z = L._rootTimeline = new O,
			W = B.lazyRender = function() {
				var e = P.length;
				H = {};
				while (--e > -1) f = P[e], f && f._lazy !== !1 && (f.render(f._lazy[0], f._lazy[1], !0), f._lazy = !1);
				P.length = 0
			};
		z._startTime = h.time, U._startTime = h.frame, z._active = U._active = !0, setTimeout(W, 1), L._updateRoot = M.render = function() {
			var e, t, n;
			P.length && W(), z.render((h.time - z._startTime) * z._timeScale, !1, !1), U.render((h.frame - U._startTime) * U._timeScale, !1, !1), P.length && W();
			if (!(h.frame % 120)) {
				for (n in F) {
					t = F[n].tweens, e = t.length;
					while (--e > -1) t[e]._gc && t.splice(e, 1);
					t.length === 0 && delete F[n]
				}
				n = z._first;
				if (!n || n._paused)
					if (M.autoSleep && !U._first && h._listeners.tick.length === 1) {
						while (n && n._paused) n = n._next;
						n || h.sleep()
					}
			}
		}, h.addEventListener("tick", L._updateRoot);
		var X = function(e, t, n) {
				var r = e._gsTweenID,
					i, s;
				F[r || (e._gsTweenID = r = "t" + I++)] || (F[r] = {
					target: e,
					tweens: []
				});
				if (t) {
					i = F[r].tweens, i[s = i.length] = t;
					if (n)
						while (--s > -1) i[s] === t && i.splice(s, 1)
				}
				return F[r].tweens
			},
			V = function(e, t, n, r, i) {
				var o, u, a, f;
				if (r === 1 || r >= 4) {
					f = i.length;
					for (o = 0; o < f; o++)
						if ((a = i[o]) !== t) a._gc || a._enabled(!1, !1) && (u = !0);
						else if (r === 5) break;
					return u
				}
				var l = t._startTime + s,
					c = [],
					h = 0,
					p = t._duration === 0,
					d;
				o = i.length;
				while (--o > -1)(a = i[o]) !== t && !a._gc && !a._paused && (a._timeline !== t._timeline ? (d = d || $(t, 0, p), $(a, d, p) === 0 && (c[h++] = a)) : a._startTime <= l && a._startTime + a.totalDuration() / a._timeScale > l && ((p || !a._initted) && l - a._startTime <= 2e-10 || (c[h++] = a)));
				o = h;
				while (--o > -1) a = c[o], r === 2 && a._kill(n, e) && (u = !0), (r !== 2 || !a._firstPT && a._initted) && a._enabled(!1, !1) && (u = !0);
				return u
			},
			$ = function(e, t, n) {
				var r = e._timeline,
					i = r._timeScale,
					o = e._startTime;
				while (r._timeline) {
					o += r._startTime, i *= r._timeScale;
					if (r._paused) return -100;
					r = r._timeline
				}
				return o /= i, o > t ? o - t : n && o === t || !e._initted && o - t < 2 * s ? s : (o += e.totalDuration() / e._timeScale / i) > t + s ? 0 : o - t - s
			};
		c._init = function() {
			var e = this.vars,
				t = this._overwrittenProps,
				n = this._duration,
				r = !!e.immediateRender,
				i = e.ease,
				s, o, u, a, f;
			if (e.startAt) {
				this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), f = {};
				for (a in e.startAt) f[a] = e.startAt[a];
				f.overwrite = !1, f.immediateRender = !0, f.lazy = r && e.lazy !== !1, f.startAt = f.delay = null, this._startAt = M.to(this.target, 0, f);
				if (r)
					if (this._time > 0) this._startAt = null;
					else if (n !== 0) return
			} else if (e.runBackwards && n !== 0)
				if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
				else {
					this._time !== 0 && (r = !1), u = {};
					for (a in e)
						if (!q[a] || a === "autoCSS") u[a] = e[a];
					u.overwrite = 0, u.data = "isFromStart", u.lazy = r && e.lazy !== !1, u.immediateRender = r, this._startAt = M.to(this.target, 0, u);
					if (!r) this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null);
					else if (this._time === 0) return
				}
			this._ease = i = i ? i instanceof w ? i : typeof i == "function" ? new w(i, e.easeParams) : E[i] || M.defaultEase : M.defaultEase, e.easeParams instanceof Array && i.config && (this._ease = i.config.apply(i, e.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null;
			if (this._targets) {
				s = this._targets.length;
				while (--s > -1) this._initProps(this._targets[s], this._propLookup[s] = {}, this._siblings[s], t ? t[s] : null) && (o = !0)
			} else o = this._initProps(this.target, this._propLookup, this._siblings, t);
			o && M._onPluginEvent("_onInitAllProps", this), t && (this._firstPT || typeof this.target != "function" && this._enabled(!1, !1));
			if (e.runBackwards) {
				u = this._firstPT;
				while (u) u.s += u.c, u.c = -u.c, u = u._next
			}
			this._onUpdate = e.onUpdate, this._initted = !0
		}, c._initProps = function(t, n, r, i) {
			var s, o, u, f, l, c;
			if (t == null) return !1;
			H[t._gsTweenID] && W(), this.vars.css || t.style && t !== e && t.nodeType && j.css && this.vars.autoCSS !== !1 && D(this.vars, t);
			for (s in this.vars) {
				c = this.vars[s];
				if (q[s]) c && (c instanceof Array || c.push && a(c)) && c.join("").indexOf("{self}") !== -1 && (this.vars[s] = c = this._swapSelfInParams(c, this));
				else if (j[s] && (f = new j[s])._onInitTween(t, this.vars[s], this)) {
					this._firstPT = l = {
						_next: this._firstPT,
						t: f,
						p: "setRatio",
						s: 0,
						c: 1,
						f: !0,
						n: s,
						pg: !0,
						pr: f._priority
					}, o = f._overwriteProps.length;
					while (--o > -1) n[f._overwriteProps[o]] = this._firstPT;
					if (f._priority || f._onInitAllProps) u = !0;
					if (f._onDisable || f._onEnable) this._notifyPluginsOfEnabled = !0
				} else this._firstPT = n[s] = l = {
					_next: this._firstPT,
					t: t,
					p: s,
					f: typeof t[s] == "function",
					n: s,
					pg: !1,
					pr: 0
				}, l.s = l.f ? t[s.indexOf("set") || typeof t["get" + s.substr(3)] != "function" ? s : "get" + s.substr(3)]() : parseFloat(t[s]), l.c = typeof c == "string" && c.charAt(1) === "=" ? parseInt(c.charAt(0) + "1", 10) * Number(c.substr(2)) : Number(c) - l.s || 0;
				l && l._next && (l._next._prev = l)
			}
			return i && this._kill(i, t) ? this._initProps(t, n, r, i) : this._overwrite > 1 && this._firstPT && r.length > 1 && V(t, this, n, this._overwrite, r) ? (this._kill(n, t), this._initProps(t, n, r, i)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (H[t._gsTweenID] = !0), u)
		}, c.render = function(e, t, n) {
			var r = this._time,
				i = this._duration,
				o = this._rawPrevTime,
				u, a, f, l;
			if (e >= i) this._totalTime = this._time = i, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (u = !0, a = "onComplete"), i === 0 && (this._initted || !this.vars.lazy || n) && (this._startTime === this._timeline._duration && (e = 0), (e === 0 || o < 0 || o === s) && o !== e && (n = !0, o > s && (a = "onReverseComplete")), this._rawPrevTime = l = !t || e || o === e ? e : s);
			else if (e < 1e-7) {
				this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
				if (r !== 0 || i === 0 && o > 0 && o !== s) a = "onReverseComplete", u = this._reversed;
				e < 0 && (this._active = !1, i === 0 && (this._initted || !this.vars.lazy || n) && (o >= 0 && (n = !0), this._rawPrevTime = l = !t || e || o === e ? e : s)), this._initted || (n = !0)
			} else {
				this._totalTime = this._time = e;
				if (this._easeType) {
					var c = e / i,
						h = this._easeType,
						p = this._easePower;
					if (h === 1 || h === 3 && c >= .5) c = 1 - c;
					h === 3 && (c *= 2), p === 1 ? c *= c : p === 2 ? c *= c * c : p === 3 ? c *= c * c * c : p === 4 && (c *= c * c * c * c), h === 1 ? this.ratio = 1 - c : h === 2 ? this.ratio = c : e / i < .5 ? this.ratio = c / 2 : this.ratio = 1 - c / 2
				} else this.ratio = this._ease.getRatio(e / i)
			}
			if (this._time === r && !n) return;
			if (!this._initted) {
				this._init();
				if (!this._initted || this._gc) return;
				if (!n && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) {
					this._time = this._totalTime = r, this._rawPrevTime = o, P.push(this), this._lazy = [e, t];
					return
				}
				this._time && !u ? this.ratio = this._ease.getRatio(this._time / i) : u && this._ease._calcEnd && (this.ratio = this._ease.getRatio(this._time === 0 ? 0 : 1))
			}
			this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== r && e >= 0 && (this._active = !0), r === 0 && (this._startAt && (e >= 0 ? this._startAt.render(e, t, n) : a || (a = "_dummyGS")), this.vars.onStart && (this._time !== 0 || i === 0) && (t || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || b))), f = this._firstPT;
			while (f) f.f ? f.t[f.p](f.c * this.ratio + f.s) : f.t[f.p] = f.c * this.ratio + f.s, f = f._next;
			this._onUpdate && (e < 0 && this._startAt && this._startTime && this._startAt.render(e, t, n), t || (this._time !== r || u) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || b)), a && (!this._gc || n) && (e < 0 && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(e, t, n), u && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[a] && this.vars[a].apply(this.vars[a + "Scope"] || this, this.vars[a + "Params"] || b), i === 0 && this._rawPrevTime === s && l !== s && (this._rawPrevTime = 0))
		}, c._kill = function(e, t) {
			e === "all" && (e = null);
			if (e == null)
				if (t == null || t === this.target) return this._lazy = !1, this._enabled(!1, !1);
			t = typeof t != "string" ? t || this._targets || this.target : M.selector(t) || t;
			var n, r, i, s, o, u, f, l;
			if ((a(t) || _(t)) && typeof t[0] != "number") {
				n = t.length;
				while (--n > -1) this._kill(e, t[n]) && (u = !0)
			} else {
				if (this._targets) {
					n = this._targets.length;
					while (--n > -1)
						if (t === this._targets[n]) {
							o = this._propLookup[n] || {}, this._overwrittenProps = this._overwrittenProps || [], r = this._overwrittenProps[n] = e ? this._overwrittenProps[n] || {} : "all";
							break
						}
				} else {
					if (t !== this.target) return !1;
					o = this._propLookup, r = this._overwrittenProps = e ? this._overwrittenProps || {} : "all"
				}
				if (o) {
					f = e || o, l = e !== r && r !== "all" && e !== o && (typeof e != "object" || !e._tempKill);
					for (i in f) {
						if (s = o[i]) {
							s.pg && s.t._kill(f) && (u = !0);
							if (!s.pg || s.t._overwriteProps.length === 0) s._prev ? s._prev._next = s._next : s === this._firstPT && (this._firstPT = s._next), s._next && (s._next._prev = s._prev), s._next = s._prev = null;
							delete o[i]
						}
						l && (r[i] = 1)
					}!this._firstPT && this._initted && this._enabled(!1, !1)
				}
			}
			return u
		}, c.invalidate = function() {
			return this._notifyPluginsOfEnabled && M._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], L.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -s, this.render(-this._delay)), this
		}, c._enabled = function(e, t) {
			p || h.wake();
			if (e && this._gc) {
				var n = this._targets,
					r;
				if (n) {
					r = n.length;
					while (--r > -1) this._siblings[r] = X(n[r], this, !0)
				} else this._siblings = X(this.target, this, !0)
			}
			return L.prototype._enabled.call(this, e, t), this._notifyPluginsOfEnabled && this._firstPT ? M._onPluginEvent(e ? "_onEnable" : "_onDisable", this) : !1
		}, M.to = function(e, t, n) {
			return new M(e, t, n)
		}, M.from = function(e, t, n) {
			return n.runBackwards = !0, n.immediateRender = n.immediateRender != 0, new M(e, t, n)
		}, M.fromTo = function(e, t, n, r) {
			return r.startAt = n, r.immediateRender = r.immediateRender != 0 && n.immediateRender != 0, new M(e, t, r)
		}, M.delayedCall = function(e, t, n, r, i) {
			return new M(t, 0, {
				delay: e,
				onComplete: t,
				onCompleteParams: n,
				onCompleteScope: r,
				onReverseComplete: t,
				onReverseCompleteParams: n,
				onReverseCompleteScope: r,
				immediateRender: !1,
				useFrames: i,
				overwrite: 0
			})
		}, M.set = function(e, t) {
			return new M(e, 0, t)
		}, M.getTweensOf = function(e, t) {
			if (e == null) return [];
			e = typeof e != "string" ? e : M.selector(e) || e;
			var n, r, i, s;
			if ((a(e) || _(e)) && typeof e[0] != "number") {
				n = e.length, r = [];
				while (--n > -1) r = r.concat(M.getTweensOf(e[n], t));
				n = r.length;
				while (--n > -1) {
					s = r[n], i = n;
					while (--i > -1) s === r[i] && r.splice(n, 1)
				}
			} else {
				r = X(e).concat(), n = r.length;
				while (--n > -1)(r[n]._gc || t && !r[n].isActive()) && r.splice(n, 1)
			}
			return r
		}, M.killTweensOf = M.killDelayedCallsTo = function(e, t, n) {
			typeof t == "object" && (n = t, t = !1);
			var r = M.getTweensOf(e, t),
				i = r.length;
			while (--i > -1) r[i]._kill(n, e)
		};
		var J = g("plugins.TweenPlugin", function(e, t) {
			this._overwriteProps = (e || "").split(","), this._propName = this._overwriteProps[0], this._priority = t || 0, this._super = J.prototype
		}, !0);
		c = J.prototype, J.version = "1.10.1", J.API = 2, c._firstPT = null, c._addTween = function(e, t, n, r, i, s) {
			var o, u;
			if (r != null && (o = typeof r == "number" || r.charAt(1) !== "=" ? Number(r) - n : parseInt(r.charAt(0) + "1", 10) * Number(r.substr(2)))) return this._firstPT = u = {
				_next: this._firstPT,
				t: e,
				p: t,
				s: n,
				c: o,
				f: typeof e[t] == "function",
				n: i || t,
				r: s
			}, u._next && (u._next._prev = u), u
		}, c.setRatio = function(e) {
			var t = this._firstPT,
				n = 1e-6,
				r;
			while (t) r = t.c * e + t.s, t.r ? r = Math.round(r) : r < n && r > -n && (r = 0), t.f ? t.t[t.p](r) : t.t[t.p] = r, t = t._next
		}, c._kill = function(e) {
			var t = this._overwriteProps,
				n = this._firstPT,
				r;
			if (e[this._propName] != null) this._overwriteProps = [];
			else {
				r = t.length;
				while (--r > -1) e[t[r]] != null && t.splice(r, 1)
			}
			while (n) e[n.n] != null && (n._next && (n._next._prev = n._prev), n._prev ? (n._prev._next = n._next, n._prev = null) : this._firstPT === n && (this._firstPT = n._next)), n = n._next;
			return !1
		}, c._roundProps = function(e, t) {
			var n = this._firstPT;
			while (n) {
				if (e[this._propName] || n.n != null && e[n.n.split(this._propName + "_").join("")]) n.r = t;
				n = n._next
			}
		}, M._onPluginEvent = function(e, t) {
			var n = t._firstPT,
				r, i, s, o, u;
			if (e === "_onInitAllProps") {
				while (n) {
					u = n._next, i = s;
					while (i && i.pr > n.pr) i = i._next;
					(n._prev = i ? i._prev : o) ? n._prev._next = n: s = n, (n._next = i) ? i._prev = n : o = n, n = u
				}
				n = t._firstPT = s
			}
			while (n) n.pg && typeof n.t[e] == "function" && n.t[e]() && (r = !0), n = n._next;
			return r
		}, J.activate = function(e) {
			var t = e.length;
			while (--t > -1) e[t].API === J.API && (j[(new e[t])._propName] = e[t]);
			return !0
		}, m.plugin = function(e) {
			if (!e || !e.propName || !e.init || !e.API) throw "illegal plugin definition.";
			var t = e.propName,
				n = e.priority || 0,
				r = e.overwriteProps,
				i = {
					init: "_onInitTween",
					set: "setRatio",
					kill: "_kill",
					round: "_roundProps",
					initAll: "_onInitAllProps"
				},
				s = g("plugins." + t.charAt(0).toUpperCase() + t.substr(1) + "Plugin", function() {
					J.call(this, t, n), this._overwriteProps = r || []
				}, e.global === !0),
				o = s.prototype = new J(t),
				u;
			o.constructor = s, s.API = e.API;
			for (u in i) typeof e[u] == "function" && (o[i[u]] = e[u]);
			return s.version = e.version, J.activate([s]), s
		}, f = e._gsQueue;
		if (f) {
			for (l = 0; l < f.length; l++) f[l]();
			for (c in d) d[c].func || e.console.log("GSAP encountered missing dependency: com.greensock." + c)
		}
		p = !1
	}(typeof module != "undefined" && module.exports && typeof global != "undefined" ? global : this || window, "TweenMax"), define("greensock/TweenMax", function() {}), define("coolsite_play/sdk/animation/commonparam", [], function() {
		var e = {
			param: function(e, t) {
				var n = {
					repeat: t.t.rp,
					ease: coolsite_play.easeType[t.t.es]
				};
				return n.onStartParams = ["{self}", t, e], n.onStart = this.onStart, n.onComplete = this.onComplete, n.onCompleteParams = ["{self}", t, e], n
			},
			fromparam: function(e, t) {
				var n = {};
				return n
			},
			toparam: function(e, t) {
				var n = {};
				return n.onComplete = this.stop, n.onCompleteParams = ["{self}", t, e], n.ease = coolsite_play.easeType[t.t.es], n.repeat = t.t.rp, n.immediateRender = !1, n.onStartParams = ["{self}", t, e], n.onStart = this.onStart, n
			},
			onStart: function(t, n, r) {
				console.log(r, n);
				switch (n.type) {
					case 1:
					case 3:
					case 5:
						e.show(r), e.setOriginCenter(r);
						break;
					case 6:
						e.setOriginCenter(r);
						break;
					case 9:
						e.setOriginCenter(r);
						break;
					case 10:
						e.show(r), e.setOriginCenter(r)
				}
			},
			onComplete: function(t, n, r) {
				switch (n.type) {
					case 5:
						e.unsetOriginCenter(r);
						break;
					case 2:
					case 4:
					case 6:
						e.unsetOriginCenter(r), e.hide(r);
						break;
					case 7:
						break;
					case 9:
					case 10:
						e.unsetOriginCenter(r)
				}
				console.log(r, n)
			},
			show: function(e, t) {
				$(e).removeClass("c-initHide"), $(e).removeClass("cf-initHide"), $(e).show()
			},
			hide: function(e, t) {
				$(e).addClass("c-initHide"), $(e).addClass("cf-initHide")
			},
			setOriginCenter: function(e) {
				$(e).css("transform-origin", "50% 50%")
			},
			unsetOriginCenter: function(e) {}
		};
		return e
	}), define("coolsite_play/sdk/animation/varible", ["_g/base"], function() {
		_g.timeline = {
			animation: {}
		}
	}), define("coolsite_play/sdk/animation/flyin", ["coolsite_play/sdk/animation/commonparam", "coolsite_play/sdk/animation/varible"], function() {
		var e = require("coolsite_play/sdk/animation/commonparam");
		_g.timeline.animation[1] = function(t, n) {
			var r = n.d.di,
				i = n.d.dt,
				s = n.d.dl,
				o = e.fromparam(t, n),
				u = e.toparam(t, n),
				a = $(window).width(),
				f = $(window).height();
			o.css = {}, u.css = {
				force3D: !1
			};
			var l = !1;
			$(t).hasClass("c-initHide") && (l = !0), $(t).addClass("cf-invisible c-invisible").removeClass("c-initHide").removeClass("cf-initHide").show();
			var c = t.offset();
			switch (r) {
				case 0:
					o.css.y = i ? -s : -(c.top + t.height() - $(window).scrollTop()), u.css.y = 0;
					break;
				case 3:
					o.css.x = i ? s : a - c.left, u.css.x = 0;
					break;
				case 2:
					o.css.y = i ? s : f - (c.top - $(window).scrollTop()), u.css.y = 0;
					break;
				case 1:
					o.css.x = i ? -s : -(c.left + t.width()), u.css.x = 0
			}
			i && (o.css.opacity = 0, u.css.opacity = 1), l && $(t).addClass("c-initHide").addClass("cf-initHide"), $(t).removeClass("cf-invisible c-invisible");
			var h = TweenMax.fromTo(t, n.t.du, o, u);
			return h
		}
	}), define("coolsite_play/sdk/animation/fadein", ["coolsite_play/sdk/animation/commonparam", "coolsite_play/sdk/animation/varible"], function() {
		var e = require("coolsite_play/sdk/animation/commonparam");
		_g.timeline.animation[3] = function(t, n) {
			var r = e.fromparam(t, n),
				i = e.toparam(t, n);
			r.css = {
				opacity: 0
			}, i.css = {
				opacity: 1,
				force3D: !1
			};
			var s = TweenMax.fromTo(t, n.t.du, r, i);
			return s
		}
	}), define("coolsite_play/sdk/animation/flyout", ["coolsite_play/sdk/animation/commonparam", "coolsite_play/sdk/animation/varible"], function() {
		var e = require("coolsite_play/sdk/animation/commonparam");
		_g.timeline.animation[2] = function(t, n) {
			var r = n.d.di,
				i = n.d.dt,
				s = n.d.dl,
				o = e.param(t, n),
				u = t.offset(),
				a = $(window).width(),
				f = $(window).height();
			o.css = {
				force3D: !1
			};
			switch (r) {
				case 0:
					o.css.y = i ? -s : -(u.top + t.height() - $(window).scrollTop());
					break;
				case 3:
					o.css.x = i ? s : a - u.left;
					break;
				case 2:
					o.css.y = i ? s : f - (u.top - $(window).scrollTop());
					break;
				case 1:
					o.css.x = i ? -s : -(u.left + t.width())
			}
			i && (o.css.opacity = 0);
			var l = TweenMax.to(t, n.t.du, o);
			return l
		}
	}), define("coolsite_play/sdk/animation/fadeout", ["coolsite_play/sdk/animation/commonparam", "coolsite_play/sdk/animation/varible"], function() {
		var e = require("coolsite_play/sdk/animation/commonparam");
		_g.timeline.animation[4] = function(t, n) {
			var r = e.param(t, n);
			r.css = {
				opacity: 0,
				force3D: !1
			};
			var i = TweenMax.to(t, n.t.du, r);
			return i
		}
	}), define("coolsite_play/sdk/animation/magnify", ["coolsite_play/sdk/animation/commonparam", "coolsite_play/sdk/animation/varible"], function() {
		var e = require("coolsite_play/sdk/animation/commonparam");
		_g.timeline.animation[5] = function(t, n) {
			var r = e.fromparam(t, n),
				i = e.toparam(t, n);
			r.css = {
				scale: 0
			}, i.css = {
				scale: 1,
				force3D: !1
			};
			var s = TweenMax.fromTo(t, n.t.du, r, i);
			return s
		}
	}), define("coolsite_play/sdk/animation/minify", ["coolsite_play/sdk/animation/commonparam", "coolsite_play/sdk/animation/varible"], function() {
		var e = require("coolsite_play/sdk/animation/commonparam");
		_g.timeline.animation[6] = function(t, n) {
			var r = e.fromparam(t, n),
				i = e.toparam(t, n);
			r.css = {
				scale: 1
			}, i.css = {
				scale: 0,
				force3D: "auto"
			};
			var s = TweenMax.fromTo(t, n.t.du, r, i);
			return s
		}
	}), define("coolsite_play/sdk/animation/rotate", ["coolsite_play/sdk/animation/commonparam", "coolsite_play/sdk/animation/varible"], function() {
		var e = require("coolsite_play/sdk/animation/commonparam");
		_g.timeline.animation[7] = function(t, n) {
			var r = e.param(t, n),
				i = _.isNumber(n.d.deg) ? Number(n.d.deg) : 0,
				s = n.d.ax || 0,
				o = "_cw",
				u = "+";
			i < 0 && (o = "_ccw"), i < 0 && (u = "-");
			var a = {
				force3D: !1
			};
			s == 0 && (a.rotation = u + "=" + Math.abs(i) + o), s == 1 && (a.rotationX = u + "=" + Math.abs(i) + o), s == 2 && (a.rotationY = u + "=" + Math.abs(i) + o), r.css = a, _g.device.android() && TweenLite.set(t, {
				transformPerspective: 2e3
			});
			var f = TweenMax.to(t, n.t.du, r);
			return f
		}
	}), define("coolsite_play/sdk/animation/opacity", ["coolsite_play/sdk/animation/commonparam", "coolsite_play/sdk/animation/varible"], function() {
		var e = require("coolsite_play/sdk/animation/commonparam");
		_g.timeline.animation[8] = function(t, n) {
			var r = e.param(t, n),
				i = _.isNumber(n.d.op) ? Number(n.d.op) : 100;
			r.css = {
				opacity: i / 100,
				force3D: !1
			};
			var s = TweenMax.to(t, n.t.du, r);
			return s
		}
	}), define("coolsite_play/sdk/animation/scale", ["coolsite_play/sdk/animation/commonparam", "coolsite_play/sdk/animation/varible"], function() {
		var e = require("coolsite_play/sdk/animation/commonparam");
		_g.timeline.animation[9] = function(t, n) {
			var r = e.param(t, n),
				i = _.isNumber(n.d.sc) ? Number(n.d.sc) : 1;
			r.css = {
				scale: i,
				force3D: !1
			};
			var s = TweenMax.to(t, n.t.du, r);
			return s
		}
	}), define("coolsite_play/sdk/animation/scalein", ["coolsite_play/sdk/animation/commonparam", "coolsite_play/sdk/animation/varible"], function() {
		var e = require("coolsite_play/sdk/animation/commonparam");
		_g.timeline.animation[10] = function(t, n) {
			var r = e.fromparam(t, n),
				i = e.toparam(t, n),
				s = _.isNumber(n.d.op) ? Number(n.d.op) : 50,
				o = _.isNumber(n.d.sc) ? Number(n.d.sc) : 2;
			r.css = {
				opacity: s / 100,
				scale: o
			}, i.css = {
				opacity: 1,
				scale: 1,
				force3D: !1
			};
			var u = TweenMax.fromTo(t, n.t.du, r, i);
			return u
		}
	}), define("coolsite_play/sdk/animation/main", ["greensock/TweenMax", "coolsite_play/sdk/animation/flyin", "coolsite_play/sdk/animation/fadein", "coolsite_play/sdk/animation/flyout", "coolsite_play/sdk/animation/fadeout", "coolsite_play/sdk/animation/magnify", "coolsite_play/sdk/animation/minify", "coolsite_play/sdk/animation/rotate", "coolsite_play/sdk/animation/opacity", "coolsite_play/sdk/animation/scale", "coolsite_play/sdk/animation/scalein"], function() {
		_g.timeline.create = function(e) {
			var t = {
					paused: !0,
					onStart: function(t) {
						e.model && e.model.iview && e.model.iview.$el.trigger("t_start")
					},
					onComplete: function(t) {
						e.model && e.model.iview && e.model.iview.$el.trigger("t_end")
					},
					repeat: e.args ? e.args.rp : 0
				},
				n = 0,
				r = new TimelineMax(t);
			r.addLabel("Start");
			var i = e.animations;
			return _.each(i, function(e, t) {
				var i = e.toJSON().data,
					s = i.t.de,
					o = i.t.st,
					u = i.t.rp;
				n += s;
				if (o == 2)
					if (t != 0) {
						var a = r.getLabelTime(t - 1 + "_start");
						r.addLabel(t + "_start", a + s), n = a + s
					} else r.addLabel(t + "_start", n);
				else r.addLabel(t + "_start", n);
				i.d || (i.d = {});
				var f = _g.timeline.animation[i.type](e.iview.$el, i);
				r.add(f, n), n += i.t.du, e.siblingIds && _.each(e.siblingIds, function(e) {
					var i = coolsite_play.animationlist.get(e);
					if (i) {
						var s = i.toJSON().data,
							o = s.t.de,
							u = s.t.st,
							a = s.t.rp;
						n += o;
						if (u == 2)
							if (t != 0) {
								var f = r.getLabelTime(t - 1 + "_start");
								r.addLabel(t + "_start", f + o), n = f + o
							} else r.addLabel(t + "_start", n);
						else r.addLabel(t + "_start", n);
						s.d || (s.d = {});
						var l = _g.timeline.animation[s.type](i.iview.$el, s);
						r.add(l, n), n += s.t.du
					}
				})
			}), r
		}
	}), define("coolsite_play/sdk/slider/main", ["coolsite_play/varible/main", "jquery"], function() {
		coolsite_play.slider = function(e, t) {
			var n = new _g.transition({
				containment: e,
				disableControlled: !coolsite_play.isPreview && _g.device.mobile() ? !1 : !0,
				duration: 500,
				repeat: !0,
				control: !coolsite_play.isPreview && _g.device.mobile() ? !0 : !1,
				interval: Number(t.ti) * 1e3,
				type: Number(t.type),
				autoplayAxis: "x",
				onEnd: function(t, r) {
					n.currentIndex = r, n.refreshSlideClass(e, r), n.setNavDots(e, r), typeof coolsite_editor != "undefined" && coolsite_editor.currentSlider && coolsite_editor.currentSlider.transitionEnd && coolsite_editor.currentSlider.transitionEnd(t, r);
					var i = $(e).data("sliderId");
					i && ($slider = coolsite_play.sliderlist.get(i), $slider.onChangeTo(t, r))
				}
			});
			return n.clearSlideClass = function(e) {
				$(e).children().removeClass("c-transition-left").removeClass("c-transition-right").removeClass("c-transition-top").removeClass("c-transition-bottom")
			}, n.refreshSlideClass = function(e, t, r) {
				r || (r = -1), n.clearSlideClass(e);
				var i = $(e).children().length;
				if (r == -1) var s = "c-transition-right",
					o = "c-transition-left";
				else var s = "c-transition-left",
					o = "c-transition-right";
				$(e).children().each(function() {
					var n = $(this).index();
					n == t ? ($(this).addClass("c-transition-current"), $(this).prev().length ? $(this).prev().addClass(o) : i > 1 && ($(e).last().is(this) || $(e).last().addClass(o)), $(this).next().length ? $(this).next().addClass(s) : i > 1 && ($(e).first().is(this) || $(e).first().addClass(s))) : $(this).removeClass("c-transition-current")
				})
			}, n.prepareNextClass = function(e, t, r) {
				r || (r = -1), n.clearSlideClass(e);
				var i = $(e).children().length;
				if (r == -1) var s = "c-transition-right",
					o = "c-transition-left";
				else var s = "c-transition-left",
					o = "c-transition-right";
				$(e).children().each(function() {
					var e = $(this).index();
					e == t && $(this).addClass(s)
				})
			}, n.setNavDots = function(e, t) {
				var n = $(e).parent().children(".c-slider-nav").children(".c-slider-nav-dot");
				n.removeClass("c-active"), n.eq(t).addClass("c-active")
			}, n
		}
	}),
	function(e) {
		typeof define == "function" && define.amd ? define("jquery.mousewheel", ["jquery"], e) : typeof exports == "object" ? module.exports = e : e(jQuery)
	}(function(e) {
		function a(t) {
			var n = t || window.event,
				o = r.call(arguments, 1),
				a = 0,
				c = 0,
				h = 0,
				p = 0,
				d = 0,
				v = 0;
			t = e.event.fix(n), t.type = "mousewheel", "detail" in n && (h = n.detail * -1), "wheelDelta" in n && (h = n.wheelDelta), "wheelDeltaY" in n && (h = n.wheelDeltaY), "wheelDeltaX" in n && (c = n.wheelDeltaX * -1), "axis" in n && n.axis === n.HORIZONTAL_AXIS && (c = h * -1, h = 0), a = h === 0 ? c : h, "deltaY" in n && (h = n.deltaY * -1, a = h), "deltaX" in n && (c = n.deltaX, h === 0 && (a = c * -1));
			if (h === 0 && c === 0) return;
			if (n.deltaMode === 1) {
				var m = e.data(this, "mousewheel-line-height");
				a *= m, h *= m, c *= m
			} else if (n.deltaMode === 2) {
				var g = e.data(this, "mousewheel-page-height");
				a *= g, h *= g, c *= g
			}
			p = Math.max(Math.abs(h), Math.abs(c));
			if (!s || p < s) s = p, l(n, p) && (s /= 40);
			l(n, p) && (a /= 40, c /= 40, h /= 40), a = Math[a >= 1 ? "floor" : "ceil"](a / s), c = Math[c >= 1 ? "floor" : "ceil"](c / s), h = Math[h >= 1 ? "floor" : "ceil"](h / s);
			if (u.settings.normalizeOffset && this.getBoundingClientRect) {
				var y = this.getBoundingClientRect();
				d = t.clientX - y.left, v = t.clientY - y.top
			}
			return t.deltaX = c, t.deltaY = h, t.deltaFactor = s, t.offsetX = d, t.offsetY = v, t.deltaMode = 0, o.unshift(t, a, c, h), i && clearTimeout(i), i = setTimeout(f, 200), (e.event.dispatch || e.event.handle).apply(this, o)
		}

		function f() {
			s = null
		}

		function l(e, t) {
			return u.settings.adjustOldDeltas && e.type === "mousewheel" && t % 120 === 0
		}
		var t = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
			n = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
			r = Array.prototype.slice,
			i, s;
		if (e.event.fixHooks)
			for (var o = t.length; o;) e.event.fixHooks[t[--o]] = e.event.mouseHooks;
		var u = e.event.special.mousewheel = {
			version: "3.1.12",
			setup: function() {
				if (this.addEventListener)
					for (var t = n.length; t;) this.addEventListener(n[--t], a, !1);
				else this.onmousewheel = a;
				e.data(this, "mousewheel-line-height", u.getLineHeight(this)), e.data(this, "mousewheel-page-height", u.getPageHeight(this))
			},
			teardown: function() {
				if (this.removeEventListener)
					for (var t = n.length; t;) this.removeEventListener(n[--t], a, !1);
				else this.onmousewheel = null;
				e.removeData(this, "mousewheel-line-height"), e.removeData(this, "mousewheel-page-height")
			},
			getLineHeight: function(t) {
				var n = e(t),
					r = n["offsetParent" in e.fn ? "offsetParent" : "parent"]();
				return r.length || (r = e("body")), parseInt(r.css("fontSize"), 10) || parseInt(n.css("fontSize"), 10) || 16
			},
			getPageHeight: function(t) {
				return e(t).height()
			},
			settings: {
				adjustOldDeltas: !0,
				normalizeOffset: !0
			}
		};
		e.fn.extend({
			mousewheel: function(e) {
				return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
			},
			unmousewheel: function(e) {
				return this.unbind("mousewheel", e)
			}
		})
	}),
	function(e, t) {
		function r() {
			if (n.READY) return;
			n.event.determineEventTypes(), n.utils.each(n.gestures, function(e) {
				n.detection.register(e)
			}), n.event.onTouch(n.DOCUMENT, n.EVENT_MOVE, n.detection.detect), n.event.onTouch(n.DOCUMENT, n.EVENT_END, n.detection.detect), n.READY = !0
		}
		var n = function(e, t) {
			return new n.Instance(e, t || {})
		};
		n.defaults = {
			stop_browser_behavior: {
				userSelect: "none",
				touchAction: "none",
				touchCallout: "none",
				contentZooming: "none",
				userDrag: "none",
				tapHighlightColor: "rgba(0,0,0,0)"
			}
		}, n.HAS_POINTEREVENTS = e.navigator.pointerEnabled || e.navigator.msPointerEnabled, n.HAS_TOUCHEVENTS = "ontouchstart" in e, n.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android|silk/i, n.NO_MOUSEEVENTS = n.HAS_TOUCHEVENTS && e.navigator.userAgent.match(n.MOBILE_REGEX), n.EVENT_TYPES = {}, n.DIRECTION_DOWN = "down", n.DIRECTION_LEFT = "left", n.DIRECTION_UP = "up", n.DIRECTION_RIGHT = "right", n.POINTER_MOUSE = "mouse", n.POINTER_TOUCH = "touch", n.POINTER_PEN = "pen", n.EVENT_START = "start", n.EVENT_MOVE = "move", n.EVENT_END = "end", n.DOCUMENT = e.document, n.plugins = n.plugins || {}, n.gestures = n.gestures || {}, n.READY = !1, n.utils = {
			extend: function(n, r, i) {
				for (var s in r) {
					if (n[s] !== t && i) continue;
					n[s] = r[s]
				}
				return n
			},
			each: function(e, n, r) {
				var i, s;
				if ("forEach" in e) e.forEach(n, r);
				else if (e.length !== t) {
					for (i = 0, s = e.length; i < s; i++)
						if (n.call(r, e[i], i, e) === !1) return
				} else
					for (i in e)
						if (e.hasOwnProperty(i) && n.call(r, e[i], i, e) === !1) return
			},
			hasParent: function(e, t) {
				while (e) {
					if (e == t) return !0;
					e = e.parentNode
				}
				return !1
			},
			getCenter: function(t) {
				var r = [],
					i = [];
				return n.utils.each(t, function(e) {
					r.push(typeof e.clientX != "undefined" ? e.clientX : e.pageX), i.push(typeof e.clientY != "undefined" ? e.clientY : e.pageY)
				}), {
					pageX: (Math.min.apply(Math, r) + Math.max.apply(Math, r)) / 2,
					pageY: (Math.min.apply(Math, i) + Math.max.apply(Math, i)) / 2
				}
			},
			getVelocity: function(t, n, r) {
				return {
					x: Math.abs(n / t) || 0,
					y: Math.abs(r / t) || 0
				}
			},
			getAngle: function(t, n) {
				var r = n.pageY - t.pageY,
					i = n.pageX - t.pageX;
				return Math.atan2(r, i) * 180 / Math.PI
			},
			getDirection: function(t, r) {
				var i = Math.abs(t.pageX - r.pageX),
					s = Math.abs(t.pageY - r.pageY);
				return i >= s ? t.pageX - r.pageX > 0 ? n.DIRECTION_LEFT : n.DIRECTION_RIGHT : t.pageY - r.pageY > 0 ? n.DIRECTION_UP : n.DIRECTION_DOWN
			},
			getDistance: function(t, n) {
				var r = n.pageX - t.pageX,
					i = n.pageY - t.pageY;
				return Math.sqrt(r * r + i * i)
			},
			getScale: function(t, n) {
				return t.length >= 2 && n.length >= 2 ? this.getDistance(n[0], n[1]) / this.getDistance(t[0], t[1]) : 1
			},
			getRotation: function(t, n) {
				return t.length >= 2 && n.length >= 2 ? this.getAngle(n[1], n[0]) - this.getAngle(t[1], t[0]) : 0
			},
			isVertical: function(t) {
				return t == n.DIRECTION_UP || t == n.DIRECTION_DOWN
			},
			stopDefaultBrowserBehavior: function(t, r) {
				if (!r || !t || !t.style) return;
				n.utils.each(["webkit", "khtml", "moz", "Moz", "ms", "o", ""], function(e) {
					n.utils.each(r, function(n, r) {
						e && (r = e + r.substring(0, 1).toUpperCase() + r.substring(1)), r in t.style && (t.style[r] = n)
					})
				}), r.userSelect == "none" && (t.onselectstart = function() {
					return !1
				}), r.userDrag == "none" && (t.ondragstart = function() {
					return !1
				})
			}
		}, n.Instance = function(e, t) {
			var i = this;
			return r(), this.element = e, this.enabled = !0, this.options = n.utils.extend(n.utils.extend({}, n.defaults), t || {}), this.options.stop_browser_behavior && n.utils.stopDefaultBrowserBehavior(this.element, this.options.stop_browser_behavior), n.event.onTouch(e, n.EVENT_START, function(e) {
				i.enabled && n.detection.startDetect(i, e)
			}), this
		}, n.Instance.prototype = {
			on: function(t, r) {
				var i = t.split(" ");
				return n.utils.each(i, function(e) {
					this.element.addEventListener(e, r, !1)
				}, this), this
			},
			off: function(t, r) {
				var i = t.split(" ");
				return n.utils.each(i, function(e) {
					this.element.removeEventListener(e, r, !1)
				}, this), this
			},
			trigger: function(t, r) {
				r || (r = {});
				var i = n.DOCUMENT.createEvent("Event");
				i.initEvent(t, !0, !0), i.gesture = r;
				var s = this.element;
				return n.utils.hasParent(r.target, s) && (s = r.target), s.dispatchEvent(i), this
			},
			enable: function(t) {
				return this.enabled = t, this
			},
			reset: function() {
				i = null, s = !1, o = !1, n.PointerEvent.reset()
			}
		};
		var i = null,
			s = !1,
			o = !1;
		n.event = {
			bindDom: function(e, t, r) {
				var i = t.split(" ");
				n.utils.each(i, function(t) {
					e.addEventListener(t, r, !1)
				})
			},
			onTouch: function(t, r, u) {
				var a = this;
				this.bindDom(t, n.EVENT_TYPES[r], function(f) {
					var l = f.type.toLowerCase();
					if (l.match(/mouse/) && o) return;
					l.match(/touch/) || l.match(/pointerdown/) || l.match(/mouse/) && f.which === 1 ? s = !0 : l.match(/mouse/) && !f.which && (s = !1), l.match(/touch|pointer/) && (o = !0);
					var c = 0;
					if (s) {
						n.HAS_POINTEREVENTS && r != n.EVENT_END ? c = n.PointerEvent.updatePointer(r, f) : l.match(/touch/) ? c = f.touches.length : o || (c = l.match(/up/) ? 0 : 1), c > 0 && r == n.EVENT_END ? r = n.EVENT_MOVE : c || (r = n.EVENT_END);
						if (c || i === null) i = f;
						u.call(n.detection, a.collectEventData(t, r, a.getTouchList(i, r), f)), n.HAS_POINTEREVENTS && r == n.EVENT_END && (c = n.PointerEvent.updatePointer(r, f))
					}
					c || (i = null, s = !1, o = !1, n.PointerEvent.reset())
				})
			},
			determineEventTypes: function() {
				var t;
				n.HAS_POINTEREVENTS ? t = n.PointerEvent.getEvents() : n.NO_MOUSEEVENTS ? t = ["touchstart", "touchmove", "touchend touchcancel"] : t = ["touchstart mousedown", "touchmove mousemove", "touchend touchcancel mouseup"], n.EVENT_TYPES[n.EVENT_START] = t[0], n.EVENT_TYPES[n.EVENT_MOVE] = t[1], n.EVENT_TYPES[n.EVENT_END] = t[2]
			},
			getTouchList: function(t) {
				return n.HAS_POINTEREVENTS ? n.PointerEvent.getTouchList() : t.touches ? t.touches : (t.identifier = 1, [t])
			},
			collectEventData: function(t, r, i, s) {
				var o = n.POINTER_TOUCH;
				if (s.type.match(/mouse/) || n.PointerEvent.matchType(n.POINTER_MOUSE, s)) o = n.POINTER_MOUSE;
				return {
					center: n.utils.getCenter(i),
					timeStamp: (new Date).getTime(),
					target: s.target,
					touches: i,
					eventType: r,
					pointerType: o,
					srcEvent: s,
					preventDefault: function() {
						this.srcEvent.preventManipulation && this.srcEvent.preventManipulation(), this.srcEvent.preventDefault && this.srcEvent.preventDefault()
					},
					stopPropagation: function() {
						this.srcEvent.stopPropagation()
					},
					stopDetect: function() {
						return n.detection.stopDetect()
					}
				}
			}
		}, n.PointerEvent = {
			pointers: {},
			getTouchList: function() {
				var e = this,
					t = [];
				return n.utils.each(e.pointers, function(e) {
					t.push(e)
				}), t
			},
			updatePointer: function(e, t) {
				return e == n.EVENT_END ? this.pointers = {} : (t.identifier = t.pointerId, this.pointers[t.pointerId] = t), Object.keys(this.pointers).length
			},
			matchType: function(e, t) {
				if (!t.pointerType) return !1;
				var r = t.pointerType,
					i = {};
				return i[n.POINTER_MOUSE] = r === t.MSPOINTER_TYPE_MOUSE || r === n.POINTER_MOUSE, i[n.POINTER_TOUCH] = r === t.MSPOINTER_TYPE_TOUCH || r === n.POINTER_TOUCH, i[n.POINTER_PEN] = r === t.MSPOINTER_TYPE_PEN || r === n.POINTER_PEN, i[e]
			},
			getEvents: function() {
				return ["pointerdown MSPointerDown", "pointermove MSPointerMove", "pointerup pointercancel MSPointerUp MSPointerCancel"]
			},
			reset: function() {
				this.pointers = {}
			}
		}, n.detection = {
			gestures: [],
			current: null,
			previous: null,
			stopped: !1,
			startDetect: function(t, r) {
				if (this.current) return;
				this.stopped = !1, this.current = {
					inst: t,
					startEvent: n.utils.extend({}, r),
					lastEvent: !1,
					name: ""
				}, this.detect(r)
			},
			detect: function(t) {
				if (!this.current || this.stopped) return;
				t = this.extendEventData(t);
				var r = this.current.inst.options;
				return n.utils.each(this.gestures, function(e) {
					if (!this.stopped && r[e.name] !== !1 && e.handler.call(e, t, this.current.inst) === !1) return this.stopDetect(), !1
				}, this), this.current && (this.current.lastEvent = t), t.eventType == n.EVENT_END && !t.touches.length - 1 && this.stopDetect(), t
			},
			stopDetect: function() {
				this.previous = n.utils.extend({}, this.current), this.current = null, this.stopped = !0
			},
			extendEventData: function(t) {
				var r = this.current.startEvent;
				r && (t.touches.length != r.touches.length || t.touches === r.touches) && (r.touches = [], n.utils.each(t.touches, function(e) {
					r.touches.push(n.utils.extend({}, e))
				}));
				var i = t.timeStamp - r.timeStamp,
					s = t.center.pageX - r.center.pageX,
					o = t.center.pageY - r.center.pageY,
					u = n.utils.getVelocity(i, s, o),
					a, f;
				return t.eventType === "end" ? (a = this.current.lastEvent && this.current.lastEvent.interimAngle, f = this.current.lastEvent && this.current.lastEvent.interimDirection) : (a = this.current.lastEvent && n.utils.getAngle(this.current.lastEvent.center, t.center), f = this.current.lastEvent && n.utils.getDirection(this.current.lastEvent.center, t.center)), n.utils.extend(t, {
					deltaTime: i,
					deltaX: s,
					deltaY: o,
					velocityX: u.x,
					velocityY: u.y,
					distance: n.utils.getDistance(r.center, t.center),
					angle: n.utils.getAngle(r.center, t.center),
					interimAngle: a,
					direction: n.utils.getDirection(r.center, t.center),
					interimDirection: f,
					scale: n.utils.getScale(r.touches, t.touches),
					rotation: n.utils.getRotation(r.touches, t.touches),
					startEvent: r
				}), t
			},
			register: function(r) {
				var i = r.defaults || {};
				return i[r.name] === t && (i[r.name] = !0), n.utils.extend(n.defaults, i, !0), r.index = r.index || 1e3, this.gestures.push(r), this.gestures.sort(function(e, t) {
					return e.index < t.index ? -1 : e.index > t.index ? 1 : 0
				}), this.gestures
			}
		}, n.gestures.Drag = {
			name: "drag",
			index: 50,
			defaults: {
				drag_min_distance: 10,
				correct_for_drag_min_distance: !0,
				drag_max_touches: 1,
				drag_block_horizontal: !1,
				drag_block_vertical: !1,
				drag_lock_to_axis: !1,
				drag_lock_min_distance: 25
			},
			triggered: !1,
			handler: function(t, r) {
				if (n.detection.current && n.detection.current.name != this.name && this.triggered) {
					r.trigger(this.name + "end", t), this.triggered = !1;
					return
				}
				if (r.options.drag_max_touches > 0 && t.touches.length > r.options.drag_max_touches) return;
				switch (t.eventType) {
					case n.EVENT_START:
						this.triggered = !1;
						break;
					case n.EVENT_MOVE:
						if (t.distance < r.options.drag_min_distance && n.detection.current.name != this.name) return;
						if (n.detection.current.name != this.name) {
							n.detection.current.name = this.name;
							if (r.options.correct_for_drag_min_distance && t.distance > 0) {
								var i = Math.abs(r.options.drag_min_distance / t.distance);
								n.detection.current.startEvent.center.pageX += t.deltaX * i, n.detection.current.startEvent.center.pageY += t.deltaY * i, t = n.detection.extendEventData(t)
							}
						}
						if (n.detection.current.lastEvent.drag_locked_to_axis || r.options.drag_lock_to_axis && r.options.drag_lock_min_distance <= t.distance) t.drag_locked_to_axis = !0;
						var s = n.detection.current.lastEvent.direction;
						t.drag_locked_to_axis && s !== t.direction && (n.utils.isVertical(s) ? t.direction = t.deltaY < 0 ? n.DIRECTION_UP : n.DIRECTION_DOWN : t.direction = t.deltaX < 0 ? n.DIRECTION_LEFT : n.DIRECTION_RIGHT), this.triggered || (r.trigger(this.name + "start", t), this.triggered = !0), r.trigger(this.name, t), r.trigger(this.name + t.direction, t), (r.options.drag_block_vertical && n.utils.isVertical(t.direction) || r.options.drag_block_horizontal && !n.utils.isVertical(t.direction)) && t.preventDefault();
						break;
					case n.EVENT_END:
						this.triggered && r.trigger(this.name + "end", t), this.triggered = !1
				}
			}
		}, n.gestures.Hold = {
			name: "hold",
			index: 10,
			defaults: {
				hold_timeout: 800,
				hold_threshold: 1
			},
			timer: null,
			handler: function(t, r) {
				switch (t.eventType) {
					case n.EVENT_START:
						clearTimeout(this.timer), n.detection.current.name = this.name, this.timer = setTimeout(function() {
							n.detection.current && n.detection.current.name == "hold" && r.trigger("hold", t)
						}, r.options.hold_timeout);
						break;
					case n.EVENT_MOVE:
						t.distance > r.options.hold_threshold && clearTimeout(this.timer);
						break;
					case n.EVENT_END:
						clearTimeout(this.timer)
				}
			}
		}, n.gestures.Release = {
			name: "release",
			index: Infinity,
			handler: function(t, r) {
				t.eventType == n.EVENT_END && r.trigger(this.name, t)
			}
		}, n.gestures.Swipe = {
			name: "swipe",
			index: 40,
			defaults: {
				swipe_min_touches: 1,
				swipe_max_touches: 1,
				swipe_velocity: .7
			},
			handler: function(t, r) {
				if (t.eventType == n.EVENT_END) {
					if (r.options.swipe_max_touches > 0 && t.touches.length < r.options.swipe_min_touches && t.touches.length > r.options.swipe_max_touches) return;
					if (t.velocityX > r.options.swipe_velocity || t.velocityY > r.options.swipe_velocity) r.trigger(this.name, t), r.trigger(this.name + t.direction, t)
				}
			}
		}, n.gestures.Tap = {
			name: "tap",
			index: 100,
			defaults: {
				tap_max_touchtime: 250,
				tap_max_distance: 10,
				tap_always: !0,
				doubletap_distance: 20,
				doubletap_interval: 300
			},
			handler: function(t, r) {
				if (t.eventType == n.EVENT_END && t.srcEvent.type != "touchcancel") {
					var i = n.detection.previous,
						s = !1;
					if (t.deltaTime > r.options.tap_max_touchtime || t.distance > r.options.tap_max_distance) return;
					i && i.name == "tap" && t.timeStamp - i.lastEvent.timeStamp < r.options.doubletap_interval && t.distance < r.options.doubletap_distance && (r.trigger("doubletap", t), s = !0);
					if (!s || r.options.tap_always) n.detection.current.name = "tap", r.trigger(n.detection.current.name, t)
				}
			}
		}, n.gestures.Touch = {
			name: "touch",
			index: -Infinity,
			defaults: {
				prevent_default: !1,
				prevent_mouseevents: !1
			},
			handler: function(t, r) {
				if (r.options.prevent_mouseevents && t.pointerType == n.POINTER_MOUSE) {
					t.stopDetect();
					return
				}
				r.options.prevent_default && t.preventDefault(), t.eventType == n.EVENT_START && r.trigger(this.name, t)
			}
		}, n.gestures.Transform = {
			name: "transform",
			index: 45,
			defaults: {
				transform_min_scale: .01,
				transform_min_rotation: 1,
				transform_always_block: !1
			},
			triggered: !1,
			handler: function(t, r) {
				if (n.detection.current.name != this.name && this.triggered) {
					r.trigger(this.name + "end", t), this.triggered = !1;
					return
				}
				if (t.touches.length < 2) return;
				r.options.transform_always_block && t.preventDefault();
				switch (t.eventType) {
					case n.EVENT_START:
						this.triggered = !1;
						break;
					case n.EVENT_MOVE:
						var i = Math.abs(1 - t.scale),
							s = Math.abs(t.rotation);
						if (i < r.options.transform_min_scale && s < r.options.transform_min_rotation) return;
						n.detection.current.name = this.name, this.triggered || (r.trigger(this.name + "start", t), this.triggered = !0), r.trigger(this.name, t), s > r.options.transform_min_rotation && r.trigger("rotate", t), i > r.options.transform_min_scale && (r.trigger("pinch", t), r.trigger("pinch" + (t.scale < 1 ? "in" : "out"), t));
						break;
					case n.EVENT_END:
						this.triggered && r.trigger(this.name + "end", t), this.triggered = !1
				}
			}
		}, typeof define == "function" && define.amd ? define("hammerjs", [], function() {
			return n
		}) : typeof module == "object" && module.exports ? module.exports = n : e.Hammer = n
	}(window),
	function(e, t) {
		function n(e, n) {
			e.event.bindDom = function(e, r, i) {
				n(e).on(r, function(e) {
					var n = e.originalEvent || e;
					n.pageX === t && (n.pageX = e.pageX, n.pageY = e.pageY), n.target || (n.target = e.target), n.which === t && (n.which = n.button), n.preventDefault || (n.preventDefault = e.preventDefault), n.stopPropagation || (n.stopPropagation = e.stopPropagation), i.call(this, n)
				})
			}, e.Instance.prototype.on = function(e, t) {
				return n(this.element).on(e, t)
			}, e.Instance.prototype.off = function(e, t) {
				return n(this.element).off(e, t)
			}, e.Instance.prototype.trigger = function(e, t) {
				var r = n(this.element);
				return r.has(t.target).length && (r = n(t.target)), r.trigger({
					type: e,
					gesture: t
				})
			}, n.fn.hammer = function(t) {
				return this.each(function() {
					var r = n(this),
						i = r.data("hammer");
					i ? t == "reset" ? e.detection.current = null : i && t && e.utils.extend(i.options, t) : r.data("hammer", new e(this, t || {}))
				})
			}
		}
		typeof define == "function" && typeof define.amd == "object" && define.amd ? define("jquery.hammer", ["hammerjs", "jquery"], n) : n(e.Hammer, e.jQuery || e.Zepto)
	}(this),
	function() {
		var e = {
			bind: function(e) {
				var t, n, r = 0,
					i = 0,
					s = 0,
					o = 0;
				e.callback || (e.callback = function() {
					return !0
				}), $(e.el).hammer().on("dragstart", function(n) {
					if (e.canDrag && !e.canDrag(n)) return;
					e.dragstart && e.dragstart(n), t = !0
				}), $(e.el).hammer().on("dragleft", function(r) {
					n == null && (n = 1);
					if (e.canDragX && !e.canDragX(r)) return;
					if (!_g.dragcontrol._testDragEventAccess(r, n)) return;
					return console.log("dragleft"), t = !0, $.zoom && $.zoom != 1 && (r.gesture.deltaX = r.gesture.deltaX / $.zoom), s = r.gesture.deltaX, e.dragleft && e.dragleft(r), r.gesture.preventDefault(), !1
				}), $(e.el).hammer().on("dragright", function(r) {
					n == null && (n = 1);
					if (e.canDragX && !e.canDragX(r)) return;
					if (!_g.dragcontrol._testDragEventAccess(r, n)) return;
					return console.log("dragright"), t = !0, $.zoom && $.zoom != 1 && (r.gesture.deltaX = r.gesture.deltaX / $.zoom), s = r.gesture.deltaX, e.dragright && e.dragright(r), r.gesture.preventDefault(), !1
				}), $(e.el).hammer().on("dragup", function(r) {
					n == null && (n = 2);
					if (e.canDragY && !e.canDragY(r)) return;
					if (!_g.dragcontrol._testDragEventAccess(r, n)) return;
					return console.log("dragup"), t = !0, $.zoom && $.zoom != 1 && (r.gesture.deltaY = r.gesture.deltaY / $.zoom), o = r.gesture.deltaY, e.dragup && e.dragup(r), r.gesture.preventDefault(), !1
				}), $(e.el).hammer().on("dragdown", function(r) {
					n == null && (n = 2);
					if (e.canDragY && !e.canDragY(r)) return;
					if (!_g.dragcontrol._testDragEventAccess(r, n)) return;
					return console.log("dragdown"), t = !0, $.zoom && $.zoom != 1 && (r.gesture.deltaY = r.gesture.deltaY / $.zoom), o = r.gesture.deltaY, e.dragdown && e.dragdown(r), r.gesture.preventDefault(), !1
				}), $(e.el).hammer().on("dragend", function(r) {
					console.log("slide is dragended"), t || (n = null);
					if (e.canDrag && !e.canDrag(r)) return;
					if (!_g.dragcontrol._testDragEventAccess(r, n)) return;
					if (n == 1 && s || n == 2 && o) $.zoom && $.zoom != 1 && (n == 2 && o && (r.gesture.deltaY = r.gesture.deltaY / $.zoom), n == 1 && s && (r.gesture.deltaX = r.gesture.deltaX / $.zoom)), e.dragend && e.dragend(r);
					return t = !1, n = null, s = 0, o = 0, r.gesture.preventDefault(), !1
				})
			},
			_testDragEventAccess: function(e, t) {
				var n = !0;
				return t == 1 && (e.type == "dragup" || e.type == "dragdown") && (n = !1), t == 2 && (e.type == "dragleft" || e.type == "dragright") && (n = !1), e.type == "dragend" && (t || (n = !1)), n
			}
		};
		typeof require == "undefined" ? (window._g || (window._g = {}), window._g.dragcontrol = e) : define("_g/dragcontrol", ["_g/base", "jquery.hammer"], function() {
			return window._g.dragcontrol = e, window._g.dragcontrol
		})
	}(window),
	function(e) {
		function r(e) {
			if (e in t.style) return e;
			var n = ["Moz", "Webkit", "O", "ms"],
				r = e.charAt(0).toUpperCase() + e.substr(1);
			if (e in t.style) return e;
			for (var i = 0; i < n.length; ++i) {
				var s = n[i] + r;
				if (s in t.style) return s
			}
		}

		function i() {
			return t.style[n.transform] = "", t.style[n.transform] = "rotateY(90deg)", t.style[n.transform] !== ""
		}

		function f(e) {
			return typeof e == "string" && this.parse(e), this
		}

		function l(e, t, n) {
			t === !0 ? e.queue(n) : t ? e.queue(t, n) : n()
		}

		function c(t) {
			var n = [];
			return e.each(t, function(t) {
				t = e.camelCase(t), t = e.transit.propertyMap[t] || e.cssProps[t] || t, t = d(t), e.inArray(t, n) === -1 && n.push(t)
			}), n
		}

		function h(t, n, r, i) {
			var s = c(t);
			e.cssEase[r] && (r = e.cssEase[r]);
			var o = "" + m(n) + " " + r;
			parseInt(i, 10) > 0 && (o += " " + m(i));
			var u = [];
			return e.each(s, function(e, t) {
				u.push(t + " " + o)
			}), u.join(", ")
		}

		function p(t, r) {
			r || (e.cssNumber[t] = !0), e.transit.propertyMap[t] = n.transform, e.cssHooks[t] = {
				get: function(n) {
					var r = e(n).css("transit:transform");
					return r.get(t)
				},
				set: function(n, r) {
					var i = e(n).css("transit:transform");
					i.setFromString(t, r), e(n).css({
						"transit:transform": i
					})
				}
			}
		}

		function d(e) {
			return e.replace(/([A-Z])/g, function(e) {
				return "-" + e.toLowerCase()
			})
		}

		function v(e, t) {
			return typeof e == "string" && !e.match(/^[\-0-9\.]+$/) ? e : "" + e + t
		}

		function m(t) {
			var n = t;
			return e.fx.speeds[n] && (n = e.fx.speeds[n]), v(n, "ms")
		}
		e.transit = {
			version: "0.9.9",
			propertyMap: {
				marginLeft: "margin",
				marginRight: "margin",
				marginBottom: "margin",
				marginTop: "margin",
				paddingLeft: "padding",
				paddingRight: "padding",
				paddingBottom: "padding",
				paddingTop: "padding"
			},
			enabled: !0,
			useTransitionEnd: !1
		};
		var t = document.createElement("div"),
			n = {},
			s = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
		n.transition = r("transition"), n.transitionDelay = r("transitionDelay"), n.transform = r("transform"), n.transformOrigin = r("transformOrigin"), n.transform3d = i();
		var o = {
				transition: "transitionEnd",
				MozTransition: "transitionend",
				OTransition: "oTransitionEnd",
				WebkitTransition: "webkitTransitionEnd",
				msTransition: "MSTransitionEnd"
			},
			u = n.transitionEnd = o[n.transition] || null;
		for (var a in n) n.hasOwnProperty(a) && typeof e.support[a] == "undefined" && (e.support[a] = n[a]);
		t = null, e.cssEase = {
			_default: "ease",
			"in": "ease-in",
			out: "ease-out",
			"in-out": "ease-in-out",
			snap: "cubic-bezier(0,1,.5,1)",
			easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
			easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
			easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
			easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
			easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
			easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
			easeOutExpo: "cubic-bezier(.19,1,.22,1)",
			easeInOutExpo: "cubic-bezier(1,0,0,1)",
			easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
			easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
			easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
			easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
			easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
			easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
			easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
			easeOutQuint: "cubic-bezier(.23,1,.32,1)",
			easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
			easeInSine: "cubic-bezier(.47,0,.745,.715)",
			easeOutSine: "cubic-bezier(.39,.575,.565,1)",
			easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
			easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
			easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
			easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
		}, e.cssHooks["transit:transform"] = {
			get: function(t) {
				return e(t).data("transform") || new f
			},
			set: function(t, r) {
				var i = r;
				i instanceof f || (i = new f(i)), n.transform === "WebkitTransform" && !s ? t.style[n.transform] = i.toString(!0) : t.style[n.transform] = i.toString(), e(t).data("transform", i)
			}
		}, e.cssHooks.transform = {
			set: e.cssHooks["transit:transform"].set
		}, e.fn.jquery < "1.8" && (e.cssHooks.transformOrigin = {
			get: function(e) {
				return e.style[n.transformOrigin]
			},
			set: function(e, t) {
				e.style[n.transformOrigin] = t
			}
		}, e.cssHooks.transition = {
			get: function(e) {
				return e.style[n.transition]
			},
			set: function(e, t) {
				e.style[n.transition] = t
			}
		}), p("scale"), p("translate"), p("translateZ"), p("rotate"), p("rotateX"), p("rotateY"), p("rotate3d"), p("perspective"), p("skewX"), p("skewY"), p("x", !0), p("y", !0), f.prototype = {
			setFromString: function(e, t) {
				var n = typeof t == "string" ? t.split(",") : t.constructor === Array ? t : [t];
				n.unshift(e), f.prototype.set.apply(this, n)
			},
			set: function(e) {
				var t = Array.prototype.slice.apply(arguments, [1]);
				this.setter[e] ? this.setter[e].apply(this, t) : this[e] = t.join(",")
			},
			get: function(e) {
				return this.getter[e] ? this.getter[e].apply(this) : this[e] || 0
			},
			setter: {
				rotate: function(e) {
					this.rotate = v(e, "deg")
				},
				rotateX: function(e) {
					this.rotateX = v(e, "deg")
				},
				rotateY: function(e) {
					this.rotateY = v(e, "deg")
				},
				scale: function(e, t) {
					t === undefined && (t = e), this.scale = e + "," + t
				},
				skewX: function(e) {
					this.skewX = v(e, "deg")
				},
				skewY: function(e) {
					this.skewY = v(e, "deg")
				},
				perspective: function(e) {
					this.perspective = v(e, "px")
				},
				x: function(e) {
					this.set("translate", e, null)
				},
				y: function(e) {
					this.set("translate", null, e)
				},
				translate: function(e, t) {
					this._translateX === undefined && (this._translateX = 0), this._translateY === undefined && (this._translateY = 0), e !== null && e !== undefined && (this._translateX = v(e, "px")), t !== null && t !== undefined && (this._translateY = v(t, "px")), this.translate = this._translateX + "," + this._translateY
				},
				translateZ: function(e) {
					this.translateZ = v(e, "px")
				}
			},
			getter: {
				x: function() {
					return this._translateX || 0
				},
				y: function() {
					return this._translateY || 0
				},
				translateZ: function() {
					return this.translateZ || 0
				},
				scale: function() {
					var e = (this.scale || "1,1").split(",");
					return e[0] && (e[0] = parseFloat(e[0])), e[1] && (e[1] = parseFloat(e[1])), e[0] === e[1] ? e[0] : e
				},
				rotate3d: function() {
					var e = (this.rotate3d || "0,0,0,0deg").split(",");
					for (var t = 0; t <= 3; ++t) e[t] && (e[t] = parseFloat(e[t]));
					return e[3] && (e[3] = v(e[3], "deg")), e
				}
			},
			parse: function(e) {
				var t = this;
				e.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function(e, n, r) {
					t.setFromString(n, r)
				})
			},
			toString: function(e) {
				var t = [];
				for (var r in this)
					if (this.hasOwnProperty(r)) {
						if (!n.transform3d && (r === "rotateX" || r === "rotateY" || r === "translateZ" || r === "perspective" || r === "transformOrigin")) continue;
						r[0] !== "_" && (e && r === "scale" ? t.push(r + "3d(" + this[r] + ",1)") : e && r === "translate" ? t.push(r + "3d(" + this[r] + ",0)") : t.push(r + "(" + this[r] + ")"))
					}
				return t.join(" ")
			}
		}, e.fn.transition = e.fn.transit = function(t, r, i, s) {
			var o = this,
				a = 0,
				f = !0;
			typeof r == "function" && (s = r, r = undefined), typeof i == "function" && (s = i, i = undefined), typeof t.easing != "undefined" && (i = t.easing, delete t.easing), typeof t.duration != "undefined" && (r = t.duration, delete t.duration), typeof t.complete != "undefined" && (s = t.complete, delete t.complete), typeof t.queue != "undefined" && (f = t.queue, delete t.queue), typeof t.delay != "undefined" && (a = t.delay, delete t.delay), typeof r == "undefined" && (r = e.fx.speeds._default), typeof i == "undefined" && (i = e.cssEase._default), e.fx.off && (r = 0), r = m(r);
			var c = h(t, r, i, a),
				p = e.transit.enabled && n.transition,
				d = p ? parseInt(r, 10) + parseInt(a, 10) : 0;
			if (d === 0) {
				var v = function(e) {
					o.css(t), s && s.apply(o), e && e()
				};
				return l(o, f, v), o
			}
			var g = {},
				y = function(r) {
					var i = !1,
						a = function() {
							i && o.unbind(u, a), d > 0 && o.each(function() {
								this.style[n.transition] = g[this] || null
							}), typeof s == "function" && s.apply(o), typeof r == "function" && r()
						};
					d > 0 && u && e.transit.useTransitionEnd ? (i = !0, o.bind(u, a)) : window.setTimeout(a, d), o.each(function() {
						d > 0 && (this.style[n.transition] = c), e(this).css(t)
					})
				},
				b = function(e) {
					this.offsetWidth, y(e)
				};
			return l(o, f, b), this
		}, e.transit.getTransitionValue = h
	}(jQuery), define("jquery.transit", ["jquery"], function() {}),
	function() {
		var e = {
			0: {
				x: {
					activeItem: {
						x: function(e, t) {
							return -e * (1 - t) * 100 + "%"
						}
					},
					currentItem: {
						x: function(e, t) {
							return e * t * 100 + "%"
						}
					}
				},
				y: {
					activeItem: {
						y: function(e, t) {
							return -e * (1 - t) * 100 + "%"
						}
					},
					currentItem: {
						y: function(e, t) {
							return e * t * 100 + "%"
						}
					}
				},
				perspective: !1,
				currentEasing: "linear",
				activeEasing: "linear"
			},
			1: {
				x: {
					activeItem: {
						x: function(e, t) {
							return -e * (1 - t) * 100 + "%"
						}
					},
					currentItem: {
						x: 0
					}
				},
				y: {
					activeItem: {
						y: function(e, t) {
							return -e * (1 - t) * 100 + "%"
						}
					},
					currentItem: {
						y: 0
					}
				},
				activeTop: !0,
				perspective: !1,
				currentEasing: "in",
				activeEasing: "out"
			},
			2: {
				x: {
					activeItem: {},
					currentItem: {
						opacity: function(e, t) {
							return 1 - t
						}
					}
				},
				y: {
					activeItem: {},
					currentItem: {
						opacity: function(e, t) {
							return 1 - t
						}
					}
				},
				currentTop: !0,
				perspective: !1,
				currentEasing: "linear",
				activeEasing: "linear"
			},
			3: {
				perspective: !0,
				currentEasing: "out",
				activeEasing: "in",
				currentTop: !0,
				percentcontrol: [.5, 1],
				.5: {
					x: {
						activeItem: {
							rotateY: function(e, t) {
								return -e * 90 + "deg"
							},
							opacity: .2
						},
						currentItem: {
							rotateY: function(e, t) {
								return e * 90 * t * 2 + "deg"
							},
							opacity: function(e, t) {
								return .2 + .8 * (1 - t * 2)
							}
						}
					},
					y: {
						activeItem: {
							rotateX: function(e, t) {
								return e * 90 + "deg"
							},
							opacity: .2
						},
						currentItem: {
							rotateX: function(e, t) {
								return -e * 90 * t * 2 + "deg"
							},
							opacity: function(e, t) {
								return .2 + .8 * (1 - t * 2)
							}
						}
					}
				},
				1: {
					x: {
						activeItem: {
							rotateY: function(e, t) {
								return -e * 90 * (1 - (t - .5) * 2) + "deg"
							},
							opacity: function(e, t) {
								return .2 + .8 * (t - .5) * 2
							}
						},
						currentItem: {
							rotateY: function(e, t) {
								return e * 90 + "deg"
							},
							opacity: .2
						}
					},
					y: {
						activeItem: {
							rotateX: function(e, t) {
								return e * 90 * (1 - (t - .5) * 2) + "deg"
							},
							opacity: function(e, t) {
								return .2 + .8 * (t - .5) * 2
							}
						},
						currentItem: {
							rotateX: function(e, t) {
								return -e * 90 + "deg"
							},
							opacity: .2
						}
					}
				}
			},
			4: {
				x: {
					css: {
						currentItem: {
							transformOrigin: function(e, t) {
								return e < 0 ? "100% 50%" : "0% 50%"
							}
						},
						activeItem: {
							transformOrigin: function(e, t) {
								return e > 0 ? "100% 50%" : "0% 50%"
							}
						}
					},
					activeItem: {
						x: function(e, t) {
							return -e * (1 - t) * 100 + "%"
						},
						opacity: function(e, t) {
							return t
						},
						rotateY: function(e, t) {
							return -e * (1 - t) * 90 + "deg"
						}
					},
					currentItem: {
						x: function(e, t) {
							return e * t * 100 + "%"
						},
						rotateY: function(e, t) {
							return e * t * 90 + "deg"
						},
						opacity: function(e, t) {
							return 1 - t
						}
					}
				},
				y: {
					css: {
						currentItem: {
							transformOrigin: function(e, t) {
								return e < 0 ? "50% 100%" : "50% 0%"
							}
						},
						activeItem: {
							transformOrigin: function(e, t) {
								return e > 0 ? "50% 100%" : "50% 0%"
							}
						}
					},
					activeItem: {
						y: function(e, t) {
							return -e * (1 - t) * 100 + "%"
						},
						opacity: function(e, t) {
							return t
						},
						rotateX: function(e, t) {
							return e * (1 - t) * 90 + "deg"
						}
					},
					currentItem: {
						y: function(e, t) {
							return e * t * 100 + "%"
						},
						rotateX: function(e, t) {
							return -e * t * 90 + "deg"
						},
						opacity: function(e, t) {
							return 1 - t
						}
					}
				},
				currentTop: !0,
				perspective: !0,
				currentEasing: "linear",
				activeEasing: "linear"
			},
			5: {
				x: {
					css: {
						currentItem: {
							transformOrigin: function(e, t) {
								return e > 0 ? "100% 50%" : "0% 50%"
							}
						}
					},
					activeItem: {
						x: function(e, t) {
							return -e * (1 - t) * 100 + "%"
						}
					},
					currentItem: {
						x: 0,
						scale: function(e, t) {
							return .5 + .5 * (1 - t)
						}
					}
				},
				y: {
					css: {
						currentItem: {
							transformOrigin: function(e, t) {
								return e > 0 ? "50% 100%" : "50% 0%"
							}
						}
					},
					activeItem: {
						y: function(e, t) {
							return -e * (1 - t) * 100 + "%"
						}
					},
					currentItem: {
						y: 0,
						scale: function(e, t) {
							return .5 + .5 * (1 - t)
						}
					}
				},
				activeTop: !0,
				perspective: !1,
				currentEasing: "in",
				activeEasing: "out"
			}
		};
		typeof require == "undefined" ? (window._g || (window._g = {}), window._g.transitionargs = e) : define("_g/transitionargs", ["_g/base"], function() {
			return window._g.transitionargs = e, window._g.transitionargs
		})
	}(window),
	function() {
		var e = function(e) {
			this.init(e)
		};
		e.prototype = {
			isDraged: !1,
			init: function(e) {
				var t = {
						containment: null,
						containmentClass: "c-transition-containment",
						perspectiveClass: "c-perspective",
						itemClass: "c-transition-item",
						currentClass: "c-transition-current",
						leftClass: "c-transition-left",
						rightClass: "c-transition-right",
						upClass: "c-transition-up",
						downClass: "c-transition-down",
						activeClass: "c-transition-active",
						topClass: "c-transition-top",
						repeat: !1,
						direction: 0,
						type: 1,
						duration: 1e3,
						onStart: null,
						onEnd: null,
						control: !0,
						autoplay: !1,
						width: null,
						height: null,
						disableControlled: !1,
						autoplayDirection: -1,
						autoplayAxis: null
					},
					n = this;
				return this.opts = e ? $.extend(!0, {}, t, e) : t, this.opts.containment ? ($(this.opts.containment).addClass(this.opts.containmentClass), _.bindAll(this), this.opts.control && (this.control(), this.opts.disableControlled && this.disableControl()), this.opts.autostart ? (this.timerDisabled = !1, this.timerstart({})) : this.timerDisabled = !0, this) : !1
			},
			disableControlled: !1,
			disableControl: function() {
				this.disableControlled = !0
			},
			enableControl: function() {
				this.disableControlled = !1
			},
			control: function() {
				var e = this;
				_g.dragcontrol.bind({
					el: this.opts.containment,
					dragstart: function(t) {
						console.log(t);
						if (e.disableControlled) return;
						e.start(t)
					},
					dragleft: function(t) {
						if (e.disableControlled) return;
						e.dragX(t)
					},
					dragright: function(t) {
						if (e.disableControlled) return;
						e.dragX(t)
					},
					dragup: function(t) {
						if (e.disableControlled) return;
						e.dragY(t)
					},
					dragdown: function(t) {
						if (e.disableControled) return;
						e.dragY(t)
					},
					dragend: function(t) {
						if (e.disableControlled) return;
						if (e.direction && !e.timerDisabled) {
							var n = e.direction == "x" ? t.gesture.deltaX : t.gesture.deltaY;
							e.TimerDirection = n > 0 ? 1 : -1
						}
						e.dragEnd(t)
					},
					canDragX: function() {
						return !e.opts.autoplayAxis || e.opts.autoplayAxis == "x" ? !0 : !1
					},
					canDragY: function() {
						return !e.opts.autoplayAxis || e.opts.autoplayAxis == "y" ? !0 : !1
					}
				})
			},
			stashitemClass: function() {
				$(this.opts.containment).find("." + this.opts.itemClass).css({
					transform: "",
					"-moz-transform": "",
					"-webkit-transform": "",
					"-o-transform": "",
					"-ms-transform": "",
					opacity: ""
				}), this.stashClass = {
					current: $(this.opts.containment).find("." + this.opts.currentClass).attr("style"),
					left: $(this.opts.containment).find("." + this.opts.leftClass).attr("style"),
					right: $(this.opts.containment).find("." + this.opts.rightClass).attr("style"),
					up: $(this.opts.containment).find("." + this.opts.upClass).attr("style"),
					down: $(this.opts.containment).find("." + this.opts.downClass).attr("style")
				}, this.stashed = !0
			},
			recoveritemClass: function() {
				if (this.stashed) try {
					this.currentItem.attr("style", this.stashClass.current || ""), this.activeItem.hasClass(this.opts.leftClass) ? this.activeItem.attr("style", this.stashClass.left || "") : this.activeItem.hasClass(this.opts.rightClass) ? this.activeItem.attr("style", this.stashClass.right || "") : this.activeItem.hasClass(this.opts.upClass) ? this.activeItem.attr("style", this.stashClass.up || "") : this.activeItem.hasClass(this.opts.downClass) && this.activeItem.attr("style", this.stashClass.down || "")
				} catch (e) {
					console.log(e)
				}
				$(this.opts.containment).find("." + this.opts.itemClass).css({
					transform: "",
					"-moz-transform": "",
					"-webkit-transform": "",
					"-o-transform": "",
					"-ms-transform": "",
					opacity: ""
				}), this.stashed = !1
			},
			start: function(e, t) {
				if (this.isTransiting) return;
				t || (t = this.opts.type), this.args = _g.transitionargs[t], this.args.perspective ? $(this.opts.containment).addClass(this.opts.perspectiveClass) : $(this.opts.containment).removeClass(this.opts.perspectiveClass), this.currentItem = $(this.opts.containment).find("." + this.opts.currentClass), this.currentItem.addClass(this.opts.topClass), this.stashitemClass()
			},
			dragX: function(e) {
				if (this.isTransiting) return;
				e.gesture.deltaX <= 0 ? (this.plus = -1, this.activeItem = $(this.opts.containment).find("." + this.opts.rightClass)) : (this.plus = 1, this.activeItem = $(this.opts.containment).find("." + this.opts.leftClass));
				if (!this.activeItem.length) return;
				var t = e.gesture.deltaX;
				this.direction = "x", this.dragHandle(t)
			},
			dragY: function(e) {
				if (this.isTransiting) return;
				e.gesture.deltaY <= 0 ? (this.plus = -1, this.activeItem = $(this.opts.containment).find("." + this.opts.downClass)) : (this.plus = 1, this.activeItem = $(this.opts.containment).find("." + this.opts.upClass));
				if (!this.activeItem.length) return;
				var t = e.gesture.deltaY;
				this.direction = "y", this.dragHandle(t)
			},
			dragHandle: function(e) {
				isDraged = !0, $(this.opts.containment).find("." + this.opts.itemClass).removeClass(this.opts.activeClass), this.activeItem.addClass(this.opts.activeClass), this.currentItem = $(this.opts.containment).find("." + this.opts.currentClass);
				var t = Math.abs(e) / $(this.opts.containment).width();
				if (!_g.browserSupport({
						msie: 9
					})) this.currentItem.css(this.direction == "x" ? "margin-left" : "margin-top", this.plus * t * 100 + "%"), this.activeItem.css(this.direction == "x" ? "margin-left" : "margin-top", -this.plus * (1 - t) * 100 + "%");
				else if (this.args.percentcontrol) {
					for (i = 0; i < this.args.percentcontrol.length; i++)
						if (t <= this.args.percentcontrol[i]) {
							if (this.args[this.args.percentcontrol[i]][this.direction].css) {
								var n = this.args[this.args.percentcontrol[i]][this.direction].css;
								n.currentItem && this.currentItem.css(this.getArgs(n.currentItem, this.plus, t)), n.activeItem && this.activeItem.css(this.getArgs(n.activeItem, this.plus, t))
							}
							this.activeItem.css(this.getArgs(this.args[this.args.percentcontrol[i]][this.direction].activeItem, this.plus, t)), this.currentItem.css(this.getArgs(this.args[this.args.percentcontrol[i]][this.direction].currentItem, this.plus, t));
							break
						}
				} else {
					if (this.args[this.direction].css) {
						var n = this.args[this.direction].css;
						n.currentItem && this.currentItem.css(this.getArgs(n.currentItem, this.plus, t)), n.activeItem && this.activeItem.css(this.getArgs(n.activeItem, this.plus, t))
					}
					this.activeItem.css(this.getArgs(this.args[this.direction].activeItem, this.plus, t)), this.currentItem.css(this.getArgs(this.args[this.direction].currentItem, this.plus, t))
				}
				this.args.currentTop ? this.currentItem.addClass(this.opts.topClass) : this.currentItem.removeClass(this.opts.topClass), this.args.activeTop && this.activeItem.addClass(this.opts.topClass), this.opts.onTransition && this.opts.onTransition(event, t)
			},
			dragEnd: function(e) {
				if (this.isTransiting) return;
				if (!this.currentItem.length || !this.activeItem.length) return;
				var t = this;
				this.isTransiting = !0;
				var n = this.direction == "x" ? e.gesture.deltaX : e.gesture.deltaY,
					r = Math.abs(n) / $(this.opts.containment).width();
				if (!_g.browserSupport({
						msie: 9
					})) this.activeItem.css(this.direction == "x" ? "margin-left" : "margin-top", "0%"), this.currentItem.css(this.direction == "x" ? "margin-left" : "margin-top", -this.plus * 100 + "%");
				else if (this.args.percentcontrol) {
					this.percent = r;
					for (i = 0; i < this.args.percentcontrol.length; i++)
						if (r <= this.args.percentcontrol[i]) {
							this.transitPercent(i);
							break
						}
				} else {
					var s = this.opts.duration * (1 - r),
						o = this.getArgs(this.args[this.direction].currentItem, this.plus, 1);
					o.duration = s, o.easing = this.args.currentEasing;
					var u = this.getArgs(this.args[this.direction].activeItem, this.plus, 1);
					u.duration = s, u.easing = this.args.activeEasing, u.complete = function() {
						t.isTransiting = !1, t.onTransitionEnd()
					}, this.currentItem.transit(o), this.activeItem.transit(u)
				}
				console.log("dragend")
			},
			onTransitionEnd: function() {
				var e = this;
				this.recoveritemClass(), this.currentItem.removeClass(this.opts.currentClass), this.activeItem.addClass(this.opts.currentClass).removeClass(this.opts.activeClass).removeClass(this.opts.upClass).removeClass(this.opts.rightClass).removeClass(this.opts.leftClass).removeClass(this.opts.downClass), $(this.opts.containment).find("." + this.opts.itemClass).removeClass(this.opts.topClass);
				var t = this.currentItem.index(),
					n = this.activeItem.index();
				$(this.opts.containment).removeClass(this.opts.perspectiveClass), e.opts.onEnd && e.opts.onEnd(t, n), this.timerStart()
			},
			transitPercent: function(e) {
				var t = this;
				if (e < this.args.percentcontrol.length) {
					var t = this,
						n = this.opts.duration * (this.args.percentcontrol[e] - this.percent),
						r = this.getArgs(this.args[this.args.percentcontrol[e]][this.direction].currentItem, this.plus, this.args.percentcontrol[e]);
					r.duration = n, r.easing = this.args.currentEasing;
					var i = this.getArgs(this.args[this.args.percentcontrol[e]][this.direction].activeItem, this.plus, this.args.percentcontrol[e]);
					i.duration = n, i.easing = this.args.activeEasing, i.complete = function() {
						t.transitPercent(e + 1)
					}, this.percent = this.args.percentcontrol[e], this.currentItem.transit(r), this.activeItem.transit(i)
				} else t.isTransiting = !1, this.onTransitionEnd()
			},
			getArgs: function(e, t, n) {
				var r = {};
				return _.each(e, function(e, i) {
					typeof e == "function" ? r[i] = e(t, n) : r[i] = e
				}), r
			},
			autostart: function(e, t, n) {
				if (this.isTransiting) return;
				this.args = _g.transitionargs[e], this.currentItem = $(this.opts.containment).find("." + this.opts.currentClass), this.stashitemClass(), t == "x" && (n < 0 ? this.activeItem = $(this.opts.containment).find("." + this.opts.rightClass) : this.activeItem = $(this.opts.containment).find("." + this.opts.leftClass)), t == "y" && (n < 0 ? this.activeItem = $(this.opts.containment).find("." + this.opts.downClass) : this.activeItem = $(this.opts.containment).find("." + this.opts.upClass));
				if (!this.activeItem.length) return;
				this.args.currentTop && this.currentItem.addClass(this.opts.topClass), this.plus = n, this.direction = t, this.args.perspective ? $(this.opts.containment).addClass(this.opts.perspectiveClass) : $(this.opts.containment).removeClass(this.opts.perspectiveClass);
				var r = {
					gesture: {}
				};
				t == "x" ? r.gesture.deltaX = 0 : r.gesture.deltaY = 0, this.dragHandle(0), this.dragEnd(r)
			},
			enableTimer: function() {
				this.timerDisabled = !1
			},
			disableTimer: function() {
				this.timerDisabled = !0
			},
			setCurrent: function(e, t) {
				var n, r = this;
				$(this.opts.containment).children("." + this.opts.itemClass).removeClass(this.opts.topClass).removeClass(this.opts.activeClass).removeClass(this.opts.upClass).removeClass(this.opts.rightClass).removeClass(this.opts.leftClass).removeClass(this.opts.downClass);
				var i = $(this.opts.containment).children().length;
				if (e >= i) {
					if (!this.opts.repeat) {
						this.timerStop();
						return
					}
					this.current = 0, e = 0
				} else if (e < 0) {
					if (!this.opts.repeat) {
						this.timerStop();
						return
					}
					this.current = i - 1, e = i - 1
				}
				$(this.opts.containment).children().each(function() {
					$(this).index() == e ? (n = $(this), $(this).addClass(r.opts.currentClass)) : $(this).removeClass(r.opts.currentClass)
				});
				if (t && n) {
					if (t == "x") var s = this.opts.leftClass,
						o = this.opts.rightClass;
					else var s = this.opts.upClass,
						o = this.opts.downClass;
					n.prev().length ? n.prev().addClass(s) : this.opts.repeat && $(this.opts.containment).children().last().addClass(s), n.next().length ? n.next().addClass(o) : this.opts.repeat && $(this.opts.containment).children().first().addClass(o)
				}
			},
			timerStart: function(e) {
				if (this.timerDisabled) return;
				var t = this;
				if (e) e.type || (e.type = t.opts.type), e.axis || (e.axis = "x"), e.diretion || (e.direction = -1), e.startAt || (e.startAt = 0), this.setCurrent(e.startAt, e.axis), this.current = e.startAt, this.TimerArgs = e;
				else {
					if (!this.TimerArgs) return;
					e = this.TimerArgs, this.TimerDirection = this.TimerDirection || t.opts.autoplayDirection, this.current = this.tempCurrent != null ? this.tempCurrent : this.TimerDirection == -1 ? this.current + 1 : this.current - 1, this.tempCurrent = null, this.TimerDirection = null, this.setCurrent(this.current, e.axis)
				}
				this.Timer && window.clearTimeout(this.Timer), this.Timer = window.setTimeout(function() {
					t.autostart(e.type, e.axis, e.direction)
				}, this.opts.interval)
			},
			timerStop: function(e) {
				this.Timer && (window.clearTimeout(this.Timer), this.Timer = null), this.TimerArgs = null, this.disableTimer()
			}
		}, typeof require == "undefined" ? (window._g || (window._g = {}), window._g.transition = e) : define("_g/transition", ["_g/base", "jquery.transit", "_g/transitionargs"], function() {
			return window._g.transition = e, window._g.transition
		})
	}(window),
	function() {
		var e, t, n, r, i, s, o, u, a, f, l = {};
		n = window.document.documentElement, f = window.navigator.userAgent.toLowerCase(), l.ios = function() {
			return l.iphone() || l.ipod() || l.ipad()
		}, l.iphone = function() {
			return r("iphone")
		}, l.ipod = function() {
			return r("ipod")
		}, l.ipad = function() {
			return r("ipad")
		}, l.android = function() {
			return r("android")
		}, l.androidPhone = function() {
			return l.android() && r("mobile")
		}, l.androidTablet = function() {
			return l.android() && !r("mobile")
		}, l.blackberry = function() {
			return r("blackberry") || r("bb10") || r("rim")
		}, l.blackberryPhone = function() {
			return l.blackberry() && !r("tablet")
		}, l.blackberryTablet = function() {
			return l.blackberry() && r("tablet")
		}, l.windows = function() {
			return r("windows")
		}, l.mac = function() {
			return r("mac")
		}, l.linux = function() {
			return r("linux")
		}, l.windowsPhone = function() {
			return l.windows() && r("phone")
		}, l.windowsTablet = function() {
			return l.windows() && r("touch")
		}, l.fxos = function() {
			return (r("(mobile;") || r("(tablet;")) && r("; rv:")
		}, l.fxosPhone = function() {
			return l.fxos() && r("mobile")
		}, l.fxosTablet = function() {
			return l.fxos() && r("tablet")
		}, l.meego = function() {
			return r("meego")
		}, l.mobile = function() {
			return l.androidPhone() || l.iphone() || l.ipod() || l.windowsPhone() || l.blackberryPhone() || l.fxosPhone() || l.meego()
		}, l.tablet = function() {
			return l.ipad() || l.androidTablet() || l.blackberryTablet() || l.windowsTablet() || l.fxosTablet()
		}, l.msie = function() {
			return $.browser.msie || !!navigator.userAgent.match(/Trident\/7\./)
		}, l.portrait = function() {
			return Math.abs(window.orientation) !== 90
		}, l.landscape = function() {
			return Math.abs(window.orientation) === 90
		}, l.noConflict = function() {
			return this
		}, l.svg = function() {
			return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape", "1.1")
		}, l.online = function(e, t, n) {
			var r = new Image;
			r.onload = function() {
				console.log("online"), t && t.constructor == Function && t()
			}, r.onerror = function() {
				console.log("offline"), n && n.constructor == Function && n()
			}, r.src = e + "?t=" + _g.uuid()
		}, l.screenSize = function() {
			var e = window,
				t = document,
				n = t.documentElement,
				r = t.getElementsByTagName("body")[0],
				i = e.innerWidth || n.clientWidth || r.clientWidth,
				s = e.innerHeight || n.clientHeight || r.clientHeight;
			return {
				x: i,
				y: s
			}
		}, l.isWeixin = function() {
			var e = navigator.userAgent.toLowerCase();
			return /micromessenger/.test(e) ? !0 : !1
		}, r = function(e) {
			return f.indexOf(e) !== -1
		}, s = function(e) {
			var t;
			return t = new RegExp(e, "i"), n.className.match(t)
		}, t = function(e) {
			if (!s(e)) return n.className += " " + e
		}, u = function(e) {
			if (s(e)) return n.className = n.className.replace(e, "")
		};
		var c = function() {
			l.ios() ? l.ipad() ? t("ios ipad tablet") : l.iphone() ? t("ios iphone mobile") : l.ipod() && t("ios ipod mobile") : l.android() ? l.androidTablet() ? t("android tablet") : t("android mobile") : l.blackberry() ? l.blackberryTablet() ? t("blackberry tablet") : t("blackberry mobile") : l.windows() ? l.windowsTablet() ? t("windows tablet") : l.windowsPhone() ? t("windows mobile") : t("desktop") : l.fxos() ? l.fxosTablet() ? t("fxos tablet") : t("fxos mobile") : l.meego() ? t("meego mobile") : t("desktop")
		};
		i = function() {
			return l.landscape() ? (u("portrait"), t("landscape")) : (u("landscape"), t("portrait"))
		}, a = "onorientationchange" in window, o = a ? "orientationchange" : "resize", window.addEventListener ? window.addEventListener(o, i, !1) : window.attachEvent ? window.attachEvent(o, i) : window[o] = i, i(), l.initDom = c, window._g_device = l, typeof require == "undefined" ? (window._g || (window._g = {}), window._g.device = _g_device) : define("_g/device", ["_g/base"], function() {
			return window._g.device = _g_device, window._g.device
		})
	}(window),
	function() {
		var e = {
			support: function() {
				return !!document.createElement("video").canPlayType
			}(),
			medias: [],
			collect: function(e, t) {
				if (!_g.html5media.support) return;
				e || (e = document), t || (t = "id"), $(e).find("video,audio").each(function() {
					var e = {
						media: this,
						duration: 0,
						currentTime: 0,
						timer: 0,
						seekx: 0,
						seekPos: 0,
						buffered: 0,
						timerBuffer: 0,
						type: this.tagName == "VIDEO" ? "video" : "audio",
						autoplay: $(this).attr("autoplay"),
						id: $(this).attr(t)
					};
					_g.html5media.medias.push(e), this.addEventListener("ended", function() {}, !0), this.addEventListener("play", function() {}, !0), this.addEventListener("timeupdate", function() {}, !0), this.addEventListener("pause", function() {}, !0)
				})
			},
			findById: function(e) {
				return _g.html5media.support ? _.find(_g.html5media.medias, function(t) {
					return t.id == e
				}) : null
			},
			play: function(e) {
				var t = _g.html5media.findById(e);
				try {
					t.media.play()
				} catch (n) {}
			},
			pause: function(e) {
				var t = _g.html5media.findById(e);
				try {
					t.media.pause()
				} catch (n) {}
			},
			pauseAll: function() {
				_.each(_g.html5media.medias, function(e) {
					_g.html5media.pause(e.id)
				})
			},
			stopAll: function() {
				_.each(_g.html5media.medias, function(e) {
					_g.html5media.stop(e.id)
				})
			},
			stop: function(e) {
				var t = _g.html5media.findById(e);
				try {
					t.media.pause(), t.media.currentTime = 0
				} catch (n) {}
			},
			toggle: function(e) {
				var t = _g.html5media.findById(e);
				try {
					t.media.paused ? t.media.play() : t.media.pause()
				} catch (n) {}
			}
		};
		typeof require == "undefined" ? (window._g || (window._g = {}), window._g.html5media = e) : define("_g/html5media", ["_g/base", "underscore"], function() {
			return window._g.html5media = e, window._g.html5media
		})
	}(window), define("coolsite_play/init/main", ["coolsite_play/collection/main", "coolsite_play/model/main", "coolsite_play/util/main", "coolsite_play/events/main", "coolsite_play/view/main", "coolsite_play/controller/main", "coolsite_play/sdk/animation/main", "coolsite_play/sdk/slider/main", "jquery.mousewheel", "_g/dragcontrol", "_g/transition", "_g/device", "_g/html5media", "bootstrap"], function() {
		coolsite_play.readCookie = function(e) {
			var t = e + "=",
				n = document.cookie.split(";");
			for (var r = 0; r < n.length; r++) {
				var i = n[r];
				while (i.charAt(0) == " ") i = i.substring(1, i.length);
				if (i.indexOf(t) == 0) return i.substring(t.length, i.length)
			}
			return null
		}, coolsite_play.isWindows = _g.device.windows(), coolsite_play.varible.init("preview")
	}), define("coolsite_play/init/play", ["coolsite_play/init/main"], function() {
		coolsite_play.play = {
			start: function() {
				coolsite_play.isPlay = !0;
				if (typeof c_data == "undefined") return !1;
				c_data.timelines = c_data.timelines || [], c_data.actions = c_data.actions || [], c_data.animations = c_data.animations || [], coolsite_play.doc = $("html"), c_data.timelines.length && coolsite_play.timelinelist.reset(c_data.timelines, {
					silent: !0
				}), c_data.animations.length && coolsite_play.animationlist.reset(c_data.animations, {
					silent: !0
				}), c_data.actions.length && coolsite_play.actionlist.reset(c_data.actions, {
					silent: !0
				}), coolsite_play.sliderlist.generate(), coolsite_play.util.timeline.generate(), coolsite_play.util.animation.generate(), coolsite_play.util.action.generate(), coolsite_play.events.scroll.init(), _g.device.mobile() ? coolsite_play.events.touch.init() : coolsite_play.events.mousewheel.init(), coolsite_play.events.scroll.bindHashScroll(), coolsite_play.events.dialog.init(), coolsite_play.events.html.init(), coolsite_play.util.video.init(), coolsite_play.events.form.init(), _g.device.android() && $("body,.c-slider-mask").css({
					"touch-action": "initial"
				}), $("body").trigger("c_start")
			}
		}
	});
if (!window.console || !console.log) console = {
	log: function() {},
	debug: function() {},
	info: function() {},
	warn: function() {},
	error: function() {}
};
require(["coolsite_play/init/play"], function() {
	coolsite_play.play.start()
}), define("common/js/coolsite_play/c_play", function() {});