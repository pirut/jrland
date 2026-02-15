import * as _syscalls1_0 from "spacetime:sys@1.0";
import { register_hooks } from "spacetime:sys@1.0";
import { register_hooks as register_hooks$1 } from "spacetime:sys@1.1";
import * as _syscalls1_2 from "spacetime:sys@1.2";
import { register_hooks as register_hooks$2 } from "spacetime:sys@1.2";
import * as _syscalls1_3 from "spacetime:sys@1.3";

//#region node_modules/headers-polyfill/lib/index.mjs
var __create$1 = Object.create;
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames$1 = Object.getOwnPropertyNames;
var __getProtoOf$1 = Object.getPrototypeOf;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __commonJS$1 = (cb, mod) => function __require() {
	return mod || (0, cb[__getOwnPropNames$1(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps$1 = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") {
		for (let key of __getOwnPropNames$1(from)) if (!__hasOwnProp$1.call(to, key) && key !== except) __defProp$1(to, key, {
			get: () => from[key],
			enumerable: !(desc = __getOwnPropDesc$1(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM$1 = (mod, isNodeMode, target) => (target = mod != null ? __create$1(__getProtoOf$1(mod)) : {}, __copyProps$1(isNodeMode || !mod || !mod.__esModule ? __defProp$1(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var import_set_cookie_parser = __toESM$1(__commonJS$1({ "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
	var defaultParseOptions = {
		decodeValues: true,
		map: false,
		silent: false
	};
	function isNonEmptyString(str) {
		return typeof str === "string" && !!str.trim();
	}
	function parseString(setCookieValue, options) {
		var parts = setCookieValue.split(";").filter(isNonEmptyString);
		var parsed = parseNameValuePair(parts.shift());
		var name = parsed.name;
		var value = parsed.value;
		options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
		try {
			value = options.decodeValues ? decodeURIComponent(value) : value;
		} catch (e) {
			console.error("set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.", e);
		}
		var cookie = {
			name,
			value
		};
		parts.forEach(function(part) {
			var sides = part.split("=");
			var key = sides.shift().trimLeft().toLowerCase();
			var value2 = sides.join("=");
			if (key === "expires") cookie.expires = new Date(value2);
			else if (key === "max-age") cookie.maxAge = parseInt(value2, 10);
			else if (key === "secure") cookie.secure = true;
			else if (key === "httponly") cookie.httpOnly = true;
			else if (key === "samesite") cookie.sameSite = value2;
			else cookie[key] = value2;
		});
		return cookie;
	}
	function parseNameValuePair(nameValuePairStr) {
		var name = "";
		var value = "";
		var nameValueArr = nameValuePairStr.split("=");
		if (nameValueArr.length > 1) {
			name = nameValueArr.shift();
			value = nameValueArr.join("=");
		} else value = nameValuePairStr;
		return {
			name,
			value
		};
	}
	function parse(input, options) {
		options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
		if (!input) if (!options.map) return [];
		else return {};
		if (input.headers) if (typeof input.headers.getSetCookie === "function") input = input.headers.getSetCookie();
		else if (input.headers["set-cookie"]) input = input.headers["set-cookie"];
		else {
			var sch = input.headers[Object.keys(input.headers).find(function(key) {
				return key.toLowerCase() === "set-cookie";
			})];
			if (!sch && input.headers.cookie && !options.silent) console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.");
			input = sch;
		}
		if (!Array.isArray(input)) input = [input];
		options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
		if (!options.map) return input.filter(isNonEmptyString).map(function(str) {
			return parseString(str, options);
		});
		else return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
			var cookie = parseString(str, options);
			cookies2[cookie.name] = cookie;
			return cookies2;
		}, {});
	}
	function splitCookiesString2(cookiesString) {
		if (Array.isArray(cookiesString)) return cookiesString;
		if (typeof cookiesString !== "string") return [];
		var cookiesStrings = [];
		var pos = 0;
		var start;
		var ch;
		var lastComma;
		var nextStart;
		var cookiesSeparatorFound;
		function skipWhitespace() {
			while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) pos += 1;
			return pos < cookiesString.length;
		}
		function notSpecialChar() {
			ch = cookiesString.charAt(pos);
			return ch !== "=" && ch !== ";" && ch !== ",";
		}
		while (pos < cookiesString.length) {
			start = pos;
			cookiesSeparatorFound = false;
			while (skipWhitespace()) {
				ch = cookiesString.charAt(pos);
				if (ch === ",") {
					lastComma = pos;
					pos += 1;
					skipWhitespace();
					nextStart = pos;
					while (pos < cookiesString.length && notSpecialChar()) pos += 1;
					if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
						cookiesSeparatorFound = true;
						pos = nextStart;
						cookiesStrings.push(cookiesString.substring(start, lastComma));
						start = pos;
					} else pos = lastComma + 1;
				} else pos += 1;
			}
			if (!cookiesSeparatorFound || pos >= cookiesString.length) cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
		}
		return cookiesStrings;
	}
	module.exports = parse;
	module.exports.parse = parse;
	module.exports.parseString = parseString;
	module.exports.splitCookiesString = splitCookiesString2;
} })());
var HEADERS_INVALID_CHARACTERS = /[^a-z0-9\-#$%&'*+.^_`|~]/i;
function normalizeHeaderName(name) {
	if (HEADERS_INVALID_CHARACTERS.test(name) || name.trim() === "") throw new TypeError("Invalid character in header field name");
	return name.trim().toLowerCase();
}
var charCodesToRemove = [
	String.fromCharCode(10),
	String.fromCharCode(13),
	String.fromCharCode(9),
	String.fromCharCode(32)
];
var HEADER_VALUE_REMOVE_REGEXP = new RegExp(`(^[${charCodesToRemove.join("")}]|$[${charCodesToRemove.join("")}])`, "g");
function normalizeHeaderValue(value) {
	return value.replace(HEADER_VALUE_REMOVE_REGEXP, "");
}
function isValidHeaderName(value) {
	if (typeof value !== "string") return false;
	if (value.length === 0) return false;
	for (let i = 0; i < value.length; i++) {
		const character = value.charCodeAt(i);
		if (character > 127 || !isToken(character)) return false;
	}
	return true;
}
function isToken(value) {
	return ![
		127,
		32,
		"(",
		")",
		"<",
		">",
		"@",
		",",
		";",
		":",
		"\\",
		"\"",
		"/",
		"[",
		"]",
		"?",
		"=",
		"{",
		"}"
	].includes(value);
}
function isValidHeaderValue(value) {
	if (typeof value !== "string") return false;
	if (value.trim() !== value) return false;
	for (let i = 0; i < value.length; i++) {
		const character = value.charCodeAt(i);
		if (character === 0 || character === 10 || character === 13) return false;
	}
	return true;
}
var NORMALIZED_HEADERS = Symbol("normalizedHeaders");
var RAW_HEADER_NAMES = Symbol("rawHeaderNames");
var HEADER_VALUE_DELIMITER = ", ";
var _a, _b, _c;
var Headers = class _Headers {
	constructor(init$1) {
		this[_a] = {};
		this[_b] = /* @__PURE__ */ new Map();
		this[_c] = "Headers";
		if (["Headers", "HeadersPolyfill"].includes(init$1?.constructor.name) || init$1 instanceof _Headers || typeof globalThis.Headers !== "undefined" && init$1 instanceof globalThis.Headers) init$1.forEach((value, name) => {
			this.append(name, value);
		}, this);
		else if (Array.isArray(init$1)) init$1.forEach(([name, value]) => {
			this.append(name, Array.isArray(value) ? value.join(HEADER_VALUE_DELIMITER) : value);
		});
		else if (init$1) Object.getOwnPropertyNames(init$1).forEach((name) => {
			const value = init$1[name];
			this.append(name, Array.isArray(value) ? value.join(HEADER_VALUE_DELIMITER) : value);
		});
	}
	[(_a = NORMALIZED_HEADERS, _b = RAW_HEADER_NAMES, _c = Symbol.toStringTag, Symbol.iterator)]() {
		return this.entries();
	}
	*keys() {
		for (const [name] of this.entries()) yield name;
	}
	*values() {
		for (const [, value] of this.entries()) yield value;
	}
	*entries() {
		let sortedKeys = Object.keys(this[NORMALIZED_HEADERS]).sort((a, b) => a.localeCompare(b));
		for (const name of sortedKeys) if (name === "set-cookie") for (const value of this.getSetCookie()) yield [name, value];
		else yield [name, this.get(name)];
	}
	/**
	* Returns a boolean stating whether a `Headers` object contains a certain header.
	*/
	has(name) {
		if (!isValidHeaderName(name)) throw new TypeError(`Invalid header name "${name}"`);
		return this[NORMALIZED_HEADERS].hasOwnProperty(normalizeHeaderName(name));
	}
	/**
	* Returns a `ByteString` sequence of all the values of a header with a given name.
	*/
	get(name) {
		if (!isValidHeaderName(name)) throw TypeError(`Invalid header name "${name}"`);
		return this[NORMALIZED_HEADERS][normalizeHeaderName(name)] ?? null;
	}
	/**
	* Sets a new value for an existing header inside a `Headers` object, or adds the header if it does not already exist.
	*/
	set(name, value) {
		if (!isValidHeaderName(name) || !isValidHeaderValue(value)) return;
		const normalizedName = normalizeHeaderName(name);
		const normalizedValue = normalizeHeaderValue(value);
		this[NORMALIZED_HEADERS][normalizedName] = normalizeHeaderValue(normalizedValue);
		this[RAW_HEADER_NAMES].set(normalizedName, name);
	}
	/**
	* Appends a new value onto an existing header inside a `Headers` object, or adds the header if it does not already exist.
	*/
	append(name, value) {
		if (!isValidHeaderName(name) || !isValidHeaderValue(value)) return;
		const normalizedName = normalizeHeaderName(name);
		const normalizedValue = normalizeHeaderValue(value);
		let resolvedValue = this.has(normalizedName) ? `${this.get(normalizedName)}, ${normalizedValue}` : normalizedValue;
		this.set(name, resolvedValue);
	}
	/**
	* Deletes a header from the `Headers` object.
	*/
	delete(name) {
		if (!isValidHeaderName(name)) return;
		if (!this.has(name)) return;
		const normalizedName = normalizeHeaderName(name);
		delete this[NORMALIZED_HEADERS][normalizedName];
		this[RAW_HEADER_NAMES].delete(normalizedName);
	}
	/**
	* Traverses the `Headers` object,
	* calling the given callback for each header.
	*/
	forEach(callback, thisArg) {
		for (const [name, value] of this.entries()) callback.call(thisArg, value, name, this);
	}
	/**
	* Returns an array containing the values
	* of all Set-Cookie headers associated
	* with a response
	*/
	getSetCookie() {
		const setCookieHeader = this.get("set-cookie");
		if (setCookieHeader === null) return [];
		if (setCookieHeader === "") return [""];
		return (0, import_set_cookie_parser.splitCookiesString)(setCookieHeader);
	}
};
function headersToList(headers) {
	const headersList = [];
	headers.forEach((value, name) => {
		const resolvedValue = value.includes(",") ? value.split(",").map((value2) => value2.trim()) : value;
		headersList.push([name, resolvedValue]);
	});
	return headersList;
}

//#endregion
//#region node_modules/spacetimedb/dist/server/index.mjs
typeof globalThis !== "undefined" && (globalThis.global = globalThis.global || globalThis, globalThis.window = globalThis.window || globalThis);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
var __typeError = (msg) => {
	throw TypeError(msg);
};
var __commonJS = (cb, mod) => function __require() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from2, except, desc) => {
	if (from2 && typeof from2 === "object" || typeof from2 === "function") {
		for (let key of __getOwnPropNames(from2)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: () => from2[key],
			enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(__defProp(target, "default", {
	value: mod,
	enumerable: true
}), mod));
var __using = (stack, value, async) => {
	if (value != null) {
		if (typeof value !== "object" && typeof value !== "function") __typeError("Object expected");
		var dispose, inner;
		if (dispose === void 0) dispose = value[__knownSymbol("dispose")];
		if (typeof dispose !== "function") __typeError("Object not disposable");
		if (inner) dispose = function() {
			try {
				inner.call(this);
			} catch (e) {
				return Promise.reject(e);
			}
		};
		stack.push([
			async,
			dispose,
			value
		]);
	}
	return value;
};
var __callDispose = (stack, error, hasError) => {
	var E = typeof SuppressedError === "function" ? SuppressedError : function(e, s, m, _) {
		return _ = Error(m), _.name = "SuppressedError", _.error = e, _.suppressed = s, _;
	};
	var fail = (e) => error = hasError ? new E(e, error, "An error was suppressed during disposal") : (hasError = true, e);
	var next = (it) => {
		while (it = stack.pop()) try {
			var result = it[1] && it[1].call(it[2]);
			if (it[0]) return Promise.resolve(result).then(next, (e) => (fail(e), next()));
		} catch (e) {
			fail(e);
		}
		if (hasError) throw error;
	};
	return next();
};
var require_base64_js = __commonJS({ "../../node_modules/.pnpm/base64-js@1.5.1/node_modules/base64-js/index.js"(exports) {
	exports.byteLength = byteLength;
	exports.toByteArray = toByteArray;
	exports.fromByteArray = fromByteArray2;
	var lookup = [];
	var revLookup = [];
	var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
	var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	for (i = 0, len = code.length; i < len; ++i) {
		lookup[i] = code[i];
		revLookup[code.charCodeAt(i)] = i;
	}
	var i;
	var len;
	revLookup["-".charCodeAt(0)] = 62;
	revLookup["_".charCodeAt(0)] = 63;
	function getLens(b64) {
		var len2 = b64.length;
		if (len2 % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
		var validLen = b64.indexOf("=");
		if (validLen === -1) validLen = len2;
		var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
		return [validLen, placeHoldersLen];
	}
	function byteLength(b64) {
		var lens = getLens(b64);
		var validLen = lens[0];
		var placeHoldersLen = lens[1];
		return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
	}
	function _byteLength(b64, validLen, placeHoldersLen) {
		return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
	}
	function toByteArray(b64) {
		var tmp;
		var lens = getLens(b64);
		var validLen = lens[0];
		var placeHoldersLen = lens[1];
		var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
		var curByte = 0;
		var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
		var i2;
		for (i2 = 0; i2 < len2; i2 += 4) {
			tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
			arr[curByte++] = tmp >> 16 & 255;
			arr[curByte++] = tmp >> 8 & 255;
			arr[curByte++] = tmp & 255;
		}
		if (placeHoldersLen === 2) {
			tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
			arr[curByte++] = tmp & 255;
		}
		if (placeHoldersLen === 1) {
			tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
			arr[curByte++] = tmp >> 8 & 255;
			arr[curByte++] = tmp & 255;
		}
		return arr;
	}
	function tripletToBase64(num) {
		return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
	}
	function encodeChunk(uint8, start, end) {
		var tmp;
		var output = [];
		for (var i2 = start; i2 < end; i2 += 3) {
			tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
			output.push(tripletToBase64(tmp));
		}
		return output.join("");
	}
	function fromByteArray2(uint8) {
		var tmp;
		var len2 = uint8.length;
		var extraBytes = len2 % 3;
		var parts = [];
		var maxChunkLength = 16383;
		for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
		if (extraBytes === 1) {
			tmp = uint8[len2 - 1];
			parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
		} else if (extraBytes === 2) {
			tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
			parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
		}
		return parts.join("");
	}
} });
var require_text_min = __commonJS({ "../../node_modules/.pnpm/fast-text-encoding@1.0.6/node_modules/fast-text-encoding/text.min.js"(exports) {
	(function(scope) {
		function B(r, e) {
			var f;
			return r instanceof Buffer ? f = r : f = Buffer.from(r.buffer, r.byteOffset, r.byteLength), f.toString(e);
		}
		var w = function(r) {
			return Buffer.from(r);
		};
		function h(r) {
			for (var e = 0, f = Math.min(256 * 256, r.length + 1), n = new Uint16Array(f), i = [], o = 0;;) {
				var t2 = e < r.length;
				if (!t2 || o >= f - 1) {
					var m = n.subarray(0, o);
					if (i.push(String.fromCharCode.apply(null, m)), !t2) return i.join("");
					r = r.subarray(e), e = 0, o = 0;
				}
				var a = r[e++];
				if ((a & 128) === 0) n[o++] = a;
				else if ((a & 224) === 192) {
					var d = r[e++] & 63;
					n[o++] = (a & 31) << 6 | d;
				} else if ((a & 240) === 224) {
					var d = r[e++] & 63, l = r[e++] & 63;
					n[o++] = (a & 31) << 12 | d << 6 | l;
				} else if ((a & 248) === 240) {
					var d = r[e++] & 63, l = r[e++] & 63, R = r[e++] & 63, c = (a & 7) << 18 | d << 12 | l << 6 | R;
					c > 65535 && (c -= 65536, n[o++] = c >>> 10 & 1023 | 55296, c = 56320 | c & 1023), n[o++] = c;
				}
			}
		}
		function F(r) {
			for (var e = 0, f = r.length, n = 0, i = Math.max(32, f + (f >>> 1) + 7), o = new Uint8Array(i >>> 3 << 3); e < f;) {
				var t2 = r.charCodeAt(e++);
				if (t2 >= 55296 && t2 <= 56319) {
					if (e < f) {
						var s = r.charCodeAt(e);
						(s & 64512) === 56320 && (++e, t2 = ((t2 & 1023) << 10) + (s & 1023) + 65536);
					}
					if (t2 >= 55296 && t2 <= 56319) continue;
				}
				if (n + 4 > o.length) {
					i += 8, i *= 1 + e / r.length * 2, i = i >>> 3 << 3;
					var m = new Uint8Array(i);
					m.set(o), o = m;
				}
				if ((t2 & 4294967168) === 0) {
					o[n++] = t2;
					continue;
				} else if ((t2 & 4294965248) === 0) o[n++] = t2 >>> 6 & 31 | 192;
				else if ((t2 & 4294901760) === 0) o[n++] = t2 >>> 12 & 15 | 224, o[n++] = t2 >>> 6 & 63 | 128;
				else if ((t2 & 4292870144) === 0) o[n++] = t2 >>> 18 & 7 | 240, o[n++] = t2 >>> 12 & 63 | 128, o[n++] = t2 >>> 6 & 63 | 128;
				else continue;
				o[n++] = t2 & 63 | 128;
			}
			return o.slice ? o.slice(0, n) : o.subarray(0, n);
		}
		var u = "Failed to ", p = function(r, e, f) {
			if (r) throw new Error("".concat(u).concat(e, ": the '").concat(f, "' option is unsupported."));
		};
		var x = typeof Buffer == "function" && Buffer.from;
		var A = x ? w : F;
		function v() {
			this.encoding = "utf-8";
		}
		v.prototype.encode = function(r, e) {
			return p(e && e.stream, "encode", "stream"), A(r);
		};
		function U(r) {
			var e;
			try {
				var f = new Blob([r], { type: "text/plain;charset=UTF-8" });
				e = URL.createObjectURL(f);
				var n = new XMLHttpRequest();
				return n.open("GET", e, false), n.send(), n.responseText;
			} finally {
				e && URL.revokeObjectURL(e);
			}
		}
		var O = !x && typeof Blob == "function" && typeof URL == "function" && typeof URL.createObjectURL == "function", S = [
			"utf-8",
			"utf8",
			"unicode-1-1-utf-8"
		], T = h;
		x ? T = B : O && (T = function(r) {
			try {
				return U(r);
			} catch (e) {
				return h(r);
			}
		});
		var y = "construct 'TextDecoder'", E = "".concat(u, " ").concat(y, ": the ");
		function g(r, e) {
			p(e && e.fatal, y, "fatal"), r = r || "utf-8";
			var f;
			if (x ? f = Buffer.isEncoding(r) : f = S.indexOf(r.toLowerCase()) !== -1, !f) throw new RangeError("".concat(E, " encoding label provided ('").concat(r, "') is invalid."));
			this.encoding = r, this.fatal = false, this.ignoreBOM = false;
		}
		g.prototype.decode = function(r, e) {
			p(e && e.stream, "decode", "stream");
			var f;
			return r instanceof Uint8Array ? f = r : r.buffer instanceof ArrayBuffer ? f = new Uint8Array(r.buffer) : f = new Uint8Array(r), T(f, this.encoding);
		};
		scope.TextEncoder = scope.TextEncoder || v;
		scope.TextDecoder = scope.TextDecoder || g;
	})(typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : exports);
} });
var require_codes = __commonJS({ "../../node_modules/.pnpm/statuses@2.0.2/node_modules/statuses/codes.json"(exports, module) {
	module.exports = {
		"100": "Continue",
		"101": "Switching Protocols",
		"102": "Processing",
		"103": "Early Hints",
		"200": "OK",
		"201": "Created",
		"202": "Accepted",
		"203": "Non-Authoritative Information",
		"204": "No Content",
		"205": "Reset Content",
		"206": "Partial Content",
		"207": "Multi-Status",
		"208": "Already Reported",
		"226": "IM Used",
		"300": "Multiple Choices",
		"301": "Moved Permanently",
		"302": "Found",
		"303": "See Other",
		"304": "Not Modified",
		"305": "Use Proxy",
		"307": "Temporary Redirect",
		"308": "Permanent Redirect",
		"400": "Bad Request",
		"401": "Unauthorized",
		"402": "Payment Required",
		"403": "Forbidden",
		"404": "Not Found",
		"405": "Method Not Allowed",
		"406": "Not Acceptable",
		"407": "Proxy Authentication Required",
		"408": "Request Timeout",
		"409": "Conflict",
		"410": "Gone",
		"411": "Length Required",
		"412": "Precondition Failed",
		"413": "Payload Too Large",
		"414": "URI Too Long",
		"415": "Unsupported Media Type",
		"416": "Range Not Satisfiable",
		"417": "Expectation Failed",
		"418": "I'm a Teapot",
		"421": "Misdirected Request",
		"422": "Unprocessable Entity",
		"423": "Locked",
		"424": "Failed Dependency",
		"425": "Too Early",
		"426": "Upgrade Required",
		"428": "Precondition Required",
		"429": "Too Many Requests",
		"431": "Request Header Fields Too Large",
		"451": "Unavailable For Legal Reasons",
		"500": "Internal Server Error",
		"501": "Not Implemented",
		"502": "Bad Gateway",
		"503": "Service Unavailable",
		"504": "Gateway Timeout",
		"505": "HTTP Version Not Supported",
		"506": "Variant Also Negotiates",
		"507": "Insufficient Storage",
		"508": "Loop Detected",
		"509": "Bandwidth Limit Exceeded",
		"510": "Not Extended",
		"511": "Network Authentication Required"
	};
} });
var require_statuses = __commonJS({ "../../node_modules/.pnpm/statuses@2.0.2/node_modules/statuses/index.js"(exports, module) {
	var codes = require_codes();
	module.exports = status2;
	status2.message = codes;
	status2.code = createMessageToStatusCodeMap(codes);
	status2.codes = createStatusCodeList(codes);
	status2.redirect = {
		300: true,
		301: true,
		302: true,
		303: true,
		305: true,
		307: true,
		308: true
	};
	status2.empty = {
		204: true,
		205: true,
		304: true
	};
	status2.retry = {
		502: true,
		503: true,
		504: true
	};
	function createMessageToStatusCodeMap(codes2) {
		var map = {};
		Object.keys(codes2).forEach(function forEachCode(code) {
			var message = codes2[code];
			var status3 = Number(code);
			map[message.toLowerCase()] = status3;
		});
		return map;
	}
	function createStatusCodeList(codes2) {
		return Object.keys(codes2).map(function mapCode(code) {
			return Number(code);
		});
	}
	function getStatusCode(message) {
		var msg = message.toLowerCase();
		if (!Object.prototype.hasOwnProperty.call(status2.code, msg)) throw new Error("invalid status message: \"" + message + "\"");
		return status2.code[msg];
	}
	function getStatusMessage(code) {
		if (!Object.prototype.hasOwnProperty.call(status2.message, code)) throw new Error("invalid status code: " + code);
		return status2.message[code];
	}
	function status2(code) {
		if (typeof code === "number") return getStatusMessage(code);
		if (typeof code !== "string") throw new TypeError("code must be a number or string");
		var n = parseInt(code, 10);
		if (!isNaN(n)) return getStatusMessage(n);
		return getStatusCode(code);
	}
} });
var TimeDuration = class _TimeDuration {
	__time_duration_micros__;
	static MICROS_PER_MILLIS = 1000n;
	/**
	* Get the algebraic type representation of the {@link TimeDuration} type.
	* @returns The algebraic type representation of the type.
	*/
	static getAlgebraicType() {
		return AlgebraicType.Product({ elements: [{
			name: "__time_duration_micros__",
			algebraicType: AlgebraicType.I64
		}] });
	}
	static isTimeDuration(algebraicType) {
		if (algebraicType.tag !== "Product") return false;
		const elements = algebraicType.value.elements;
		if (elements.length !== 1) return false;
		const microsElement = elements[0];
		return microsElement.name === "__time_duration_micros__" && microsElement.algebraicType.tag === "I64";
	}
	get micros() {
		return this.__time_duration_micros__;
	}
	get millis() {
		return Number(this.micros / _TimeDuration.MICROS_PER_MILLIS);
	}
	constructor(micros) {
		this.__time_duration_micros__ = micros;
	}
	static fromMillis(millis) {
		return new _TimeDuration(BigInt(millis) * _TimeDuration.MICROS_PER_MILLIS);
	}
	/** This outputs the same string format that we use in the host and in Rust modules */
	toString() {
		const micros = this.micros;
		const sign = micros < 0 ? "-" : "+";
		const pos = micros < 0 ? -micros : micros;
		const secs = pos / 1000000n;
		const micros_remaining = pos % 1000000n;
		return `${sign}${secs}.${String(micros_remaining).padStart(6, "0")}`;
	}
};
var Timestamp = class _Timestamp {
	__timestamp_micros_since_unix_epoch__;
	static MICROS_PER_MILLIS = 1000n;
	get microsSinceUnixEpoch() {
		return this.__timestamp_micros_since_unix_epoch__;
	}
	constructor(micros) {
		this.__timestamp_micros_since_unix_epoch__ = micros;
	}
	/**
	* Get the algebraic type representation of the {@link Timestamp} type.
	* @returns The algebraic type representation of the type.
	*/
	static getAlgebraicType() {
		return AlgebraicType.Product({ elements: [{
			name: "__timestamp_micros_since_unix_epoch__",
			algebraicType: AlgebraicType.I64
		}] });
	}
	static isTimestamp(algebraicType) {
		if (algebraicType.tag !== "Product") return false;
		const elements = algebraicType.value.elements;
		if (elements.length !== 1) return false;
		const microsElement = elements[0];
		return microsElement.name === "__timestamp_micros_since_unix_epoch__" && microsElement.algebraicType.tag === "I64";
	}
	/**
	* The Unix epoch, the midnight at the beginning of January 1, 1970, UTC.
	*/
	static UNIX_EPOCH = new _Timestamp(0n);
	/**
	* Get a `Timestamp` representing the execution environment's belief of the current moment in time.
	*/
	static now() {
		return _Timestamp.fromDate(/* @__PURE__ */ new Date());
	}
	/** Convert to milliseconds since Unix epoch. */
	toMillis() {
		return this.microsSinceUnixEpoch / 1000n;
	}
	/**
	* Get a `Timestamp` representing the same point in time as `date`.
	*/
	static fromDate(date) {
		const millis = date.getTime();
		return new _Timestamp(BigInt(millis) * _Timestamp.MICROS_PER_MILLIS);
	}
	/**
	* Get a `Date` representing approximately the same point in time as `this`.
	*
	* This method truncates to millisecond precision,
	* and throws `RangeError` if the `Timestamp` is outside the range representable as a `Date`.
	*/
	toDate() {
		const millis = this.__timestamp_micros_since_unix_epoch__ / _Timestamp.MICROS_PER_MILLIS;
		if (millis > BigInt(Number.MAX_SAFE_INTEGER) || millis < BigInt(Number.MIN_SAFE_INTEGER)) throw new RangeError("Timestamp is outside of the representable range of JS's Date");
		return new Date(Number(millis));
	}
	since(other) {
		return new TimeDuration(this.__timestamp_micros_since_unix_epoch__ - other.__timestamp_micros_since_unix_epoch__);
	}
};
var Uuid = class _Uuid {
	__uuid__;
	/**
	* The nil UUID (all zeros).
	*
	* @example
	* ```ts
	* const uuid = Uuid.NIL;
	* console.assert(
	*   uuid.toString() === "00000000-0000-0000-0000-000000000000"
	* );
	* ```
	*/
	static NIL = new _Uuid(0n);
	static MAX_UUID_BIGINT = 340282366920938463463374607431768211455n;
	/**
	* The max UUID (all ones).
	*
	* @example
	* ```ts
	* const uuid = Uuid.MAX;
	* console.assert(
	*   uuid.toString() === "ffffffff-ffff-ffff-ffff-ffffffffffff"
	* );
	* ```
	*/
	static MAX = new _Uuid(_Uuid.MAX_UUID_BIGINT);
	/**
	* Create a UUID from a raw 128-bit value.
	*
	* @param u - Unsigned 128-bit integer
	* @throws {Error} If the value is outside the valid UUID range
	*/
	constructor(u) {
		if (u < 0n || u > _Uuid.MAX_UUID_BIGINT) throw new Error("Invalid UUID: must be between 0 and `MAX_UUID_BIGINT`");
		this.__uuid__ = u;
	}
	/**
	* Create a UUID `v4` from explicit random bytes.
	*
	* This method assumes the bytes are already sufficiently random.
	* It only sets the appropriate bits for the UUID version and variant.
	*
	* @param bytes - Exactly 16 random bytes
	* @returns A UUID `v4`
	* @throws {Error} If `bytes.length !== 16`
	*
	* @example
	* ```ts
	* const randomBytes = new Uint8Array(16);
	* const uuid = Uuid.fromRandomBytesV4(randomBytes);
	*
	* console.assert(
	*   uuid.toString() === "00000000-0000-4000-8000-000000000000"
	* );
	* ```
	*/
	static fromRandomBytesV4(bytes) {
		if (bytes.length !== 16) throw new Error("UUID v4 requires 16 bytes");
		const arr = new Uint8Array(bytes);
		arr[6] = arr[6] & 15 | 64;
		arr[8] = arr[8] & 63 | 128;
		return new _Uuid(_Uuid.bytesToBigInt(arr));
	}
	/**
	* Generate a UUID `v7` using a monotonic counter from `0` to `2^31 - 1`,
	* a timestamp, and 4 random bytes.
	*
	* The counter wraps around on overflow.
	*
	* The UUID `v7` is structured as follows:
	*
	* ```ascii
	* ┌───────────────────────────────────────────────┬───────────────────┐
	* | B0  | B1  | B2  | B3  | B4  | B5              |         B6        |
	* ├───────────────────────────────────────────────┼───────────────────┤
	* |                 unix_ts_ms                    |      version 7    |
	* └───────────────────────────────────────────────┴───────────────────┘
	* ┌──────────────┬─────────┬──────────────────┬───────────────────────┐
	* | B7           | B8      | B9  | B10 | B11  | B12 | B13 | B14 | B15 |
	* ├──────────────┼─────────┼──────────────────┼───────────────────────┤
	* | counter_high | variant |    counter_low   |        random         |
	* └──────────────┴─────────┴──────────────────┴───────────────────────┘
	* ```
	*
	* @param counter - Mutable monotonic counter (31-bit)
	* @param now - Timestamp since the Unix epoch
	* @param randomBytes - Exactly 4 random bytes
	* @returns A UUID `v7`
	*
	* @throws {Error} If the `counter` is negative
	* @throws {Error} If the `timestamp` is before the Unix epoch
	* @throws {Error} If `randomBytes.length !== 4`
	*
	* @example
	* ```ts
	* const now = Timestamp.fromMillis(1_686_000_000_000n);
	* const counter = { value: 1 };
	* const randomBytes = new Uint8Array(4);
	*
	* const uuid = Uuid.fromCounterV7(counter, now, randomBytes);
	*
	* console.assert(
	*   uuid.toString() === "0000647e-5180-7000-8000-000200000000"
	* );
	* ```
	*/
	static fromCounterV7(counter, now, randomBytes) {
		if (randomBytes.length !== 4) throw new Error("`fromCounterV7` requires `randomBytes.length == 4`");
		if (counter.value < 0) throw new Error("`fromCounterV7` uuid `counter` must be non-negative");
		if (now.__timestamp_micros_since_unix_epoch__ < 0) throw new Error("`fromCounterV7` `timestamp` before unix epoch");
		const counterVal = counter.value;
		counter.value = counterVal + 1 & 2147483647;
		const tsMs = now.toMillis() & 281474976710655n;
		const bytes = new Uint8Array(16);
		bytes[0] = Number(tsMs >> 40n & 255n);
		bytes[1] = Number(tsMs >> 32n & 255n);
		bytes[2] = Number(tsMs >> 24n & 255n);
		bytes[3] = Number(tsMs >> 16n & 255n);
		bytes[4] = Number(tsMs >> 8n & 255n);
		bytes[5] = Number(tsMs & 255n);
		bytes[7] = counterVal >>> 23 & 255;
		bytes[9] = counterVal >>> 15 & 255;
		bytes[10] = counterVal >>> 7 & 255;
		bytes[11] = (counterVal & 127) << 1 & 255;
		bytes[12] |= randomBytes[0] & 127;
		bytes[13] = randomBytes[1];
		bytes[14] = randomBytes[2];
		bytes[15] = randomBytes[3];
		bytes[6] = bytes[6] & 15 | 112;
		bytes[8] = bytes[8] & 63 | 128;
		return new _Uuid(_Uuid.bytesToBigInt(bytes));
	}
	/**
	* Parse a UUID from a string representation.
	*
	* @param s - UUID string
	* @returns Parsed UUID
	* @throws {Error} If the string is not a valid UUID
	*
	* @example
	* ```ts
	* const s = "01888d6e-5c00-7000-8000-000000000000";
	* const uuid = Uuid.parse(s);
	*
	* console.assert(uuid.toString() === s);
	* ```
	*/
	static parse(s) {
		const hex = s.replace(/-/g, "");
		if (hex.length !== 32) throw new Error("Invalid hex UUID");
		let v = 0n;
		for (let i = 0; i < 32; i += 2) v = v << 8n | BigInt(parseInt(hex.slice(i, i + 2), 16));
		return new _Uuid(v);
	}
	/** Convert to string (hyphenated form). */
	toString() {
		const hex = [..._Uuid.bigIntToBytes(this.__uuid__)].map((b) => b.toString(16).padStart(2, "0")).join("");
		return hex.slice(0, 8) + "-" + hex.slice(8, 12) + "-" + hex.slice(12, 16) + "-" + hex.slice(16, 20) + "-" + hex.slice(20);
	}
	/** Convert to bigint (u128). */
	asBigInt() {
		return this.__uuid__;
	}
	/** Return a `Uint8Array` of 16 bytes. */
	toBytes() {
		return _Uuid.bigIntToBytes(this.__uuid__);
	}
	static bytesToBigInt(bytes) {
		let result = 0n;
		for (const b of bytes) result = result << 8n | BigInt(b);
		return result;
	}
	static bigIntToBytes(value) {
		const bytes = new Uint8Array(16);
		for (let i = 15; i >= 0; i--) {
			bytes[i] = Number(value & 255n);
			value >>= 8n;
		}
		return bytes;
	}
	/**
	* Returns the version of this UUID.
	*
	* This represents the algorithm used to generate the value.
	*
	* @returns A `UuidVersion`
	* @throws {Error} If the version field is not recognized
	*/
	getVersion() {
		const version = this.toBytes()[6] >> 4 & 15;
		switch (version) {
			case 4: return "V4";
			case 7: return "V7";
			default:
				if (this == _Uuid.NIL) return "Nil";
				if (this == _Uuid.MAX) return "Max";
				throw new Error(`Unsupported UUID version: ${version}`);
		}
	}
	/**
	* Extract the monotonic counter from a UUIDv7.
	*
	* Intended for testing and diagnostics.
	* Behavior is undefined if called on a non-V7 UUID.
	*
	* @returns 31-bit counter value
	*/
	getCounter() {
		const bytes = this.toBytes();
		const high = bytes[7];
		const mid1 = bytes[9];
		const mid2 = bytes[10];
		const low = bytes[11] >>> 1;
		return high << 23 | mid1 << 15 | mid2 << 7 | low | 0;
	}
	compareTo(other) {
		if (this.__uuid__ < other.__uuid__) return -1;
		if (this.__uuid__ > other.__uuid__) return 1;
		return 0;
	}
	static getAlgebraicType() {
		return AlgebraicType.Product({ elements: [{
			name: "__uuid__",
			algebraicType: AlgebraicType.U128
		}] });
	}
};
var BinaryReader = class {
	/**
	* The DataView used to read values from the binary data.
	*
	* Note: The DataView's `byteOffset` is relative to the beginning of the
	* underlying ArrayBuffer, not the start of the provided Uint8Array input.
	* This `BinaryReader`'s `#offset` field is used to track the current read position
	* relative to the start of the provided Uint8Array input.
	*/
	#view;
	/**
	* Represents the offset (in bytes) relative to the start of the DataView
	* and provided Uint8Array input.
	*
	* Note: This is *not* the absolute byte offset within the underlying ArrayBuffer.
	*/
	#offset = 0;
	constructor(input) {
		this.#view = new DataView(input.buffer, input.byteOffset, input.byteLength);
		this.#offset = 0;
	}
	get offset() {
		return this.#offset;
	}
	get remaining() {
		return this.#view.byteLength - this.#offset;
	}
	/** Ensure we have at least `n` bytes left to read */
	#ensure(n) {
		if (this.#offset + n > this.#view.byteLength) throw new RangeError(`Tried to read ${n} byte(s) at relative offset ${this.#offset}, but only ${this.remaining} byte(s) remain`);
	}
	readUInt8Array() {
		const length = this.readU32();
		this.#ensure(length);
		return this.readBytes(length);
	}
	readBool() {
		const value = this.#view.getUint8(this.#offset);
		this.#offset += 1;
		return value !== 0;
	}
	readByte() {
		const value = this.#view.getUint8(this.#offset);
		this.#offset += 1;
		return value;
	}
	readBytes(length) {
		const array = new Uint8Array(this.#view.buffer, this.#view.byteOffset + this.#offset, length);
		this.#offset += length;
		return array;
	}
	readI8() {
		const value = this.#view.getInt8(this.#offset);
		this.#offset += 1;
		return value;
	}
	readU8() {
		return this.readByte();
	}
	readI16() {
		const value = this.#view.getInt16(this.#offset, true);
		this.#offset += 2;
		return value;
	}
	readU16() {
		const value = this.#view.getUint16(this.#offset, true);
		this.#offset += 2;
		return value;
	}
	readI32() {
		const value = this.#view.getInt32(this.#offset, true);
		this.#offset += 4;
		return value;
	}
	readU32() {
		const value = this.#view.getUint32(this.#offset, true);
		this.#offset += 4;
		return value;
	}
	readI64() {
		const value = this.#view.getBigInt64(this.#offset, true);
		this.#offset += 8;
		return value;
	}
	readU64() {
		const value = this.#view.getBigUint64(this.#offset, true);
		this.#offset += 8;
		return value;
	}
	readU128() {
		const lowerPart = this.#view.getBigUint64(this.#offset, true);
		const upperPart = this.#view.getBigUint64(this.#offset + 8, true);
		this.#offset += 16;
		return (upperPart << BigInt(64)) + lowerPart;
	}
	readI128() {
		const lowerPart = this.#view.getBigUint64(this.#offset, true);
		const upperPart = this.#view.getBigInt64(this.#offset + 8, true);
		this.#offset += 16;
		return (upperPart << BigInt(64)) + lowerPart;
	}
	readU256() {
		const p0 = this.#view.getBigUint64(this.#offset, true);
		const p1 = this.#view.getBigUint64(this.#offset + 8, true);
		const p2 = this.#view.getBigUint64(this.#offset + 16, true);
		const p3 = this.#view.getBigUint64(this.#offset + 24, true);
		this.#offset += 32;
		return (p3 << BigInt(192)) + (p2 << BigInt(128)) + (p1 << BigInt(64)) + p0;
	}
	readI256() {
		const p0 = this.#view.getBigUint64(this.#offset, true);
		const p1 = this.#view.getBigUint64(this.#offset + 8, true);
		const p2 = this.#view.getBigUint64(this.#offset + 16, true);
		const p3 = this.#view.getBigInt64(this.#offset + 24, true);
		this.#offset += 32;
		return (p3 << BigInt(192)) + (p2 << BigInt(128)) + (p1 << BigInt(64)) + p0;
	}
	readF32() {
		const value = this.#view.getFloat32(this.#offset, true);
		this.#offset += 4;
		return value;
	}
	readF64() {
		const value = this.#view.getFloat64(this.#offset, true);
		this.#offset += 8;
		return value;
	}
	readString() {
		const uint8Array = this.readUInt8Array();
		return new TextDecoder("utf-8").decode(uint8Array);
	}
};
var import_base64_js = __toESM(require_base64_js());
var BinaryWriter = class {
	#buffer;
	#view;
	#offset = 0;
	constructor(size) {
		this.#buffer = new Uint8Array(size);
		this.#view = new DataView(this.#buffer.buffer);
	}
	#expandBuffer(additionalCapacity) {
		const minCapacity = this.#offset + additionalCapacity + 1;
		if (minCapacity <= this.#buffer.length) return;
		let newCapacity = this.#buffer.length * 2;
		if (newCapacity < minCapacity) newCapacity = minCapacity;
		const newBuffer = new Uint8Array(newCapacity);
		newBuffer.set(this.#buffer);
		this.#buffer = newBuffer;
		this.#view = new DataView(this.#buffer.buffer);
	}
	toBase64() {
		return (0, import_base64_js.fromByteArray)(this.#buffer.subarray(0, this.#offset));
	}
	getBuffer() {
		return this.#buffer.slice(0, this.#offset);
	}
	get offset() {
		return this.#offset;
	}
	writeUInt8Array(value) {
		const length = value.length;
		this.#expandBuffer(4 + length);
		this.writeU32(length);
		this.#buffer.set(value, this.#offset);
		this.#offset += value.length;
	}
	writeBool(value) {
		this.#expandBuffer(1);
		this.#view.setUint8(this.#offset, value ? 1 : 0);
		this.#offset += 1;
	}
	writeByte(value) {
		this.#expandBuffer(1);
		this.#view.setUint8(this.#offset, value);
		this.#offset += 1;
	}
	writeI8(value) {
		this.#expandBuffer(1);
		this.#view.setInt8(this.#offset, value);
		this.#offset += 1;
	}
	writeU8(value) {
		this.#expandBuffer(1);
		this.#view.setUint8(this.#offset, value);
		this.#offset += 1;
	}
	writeI16(value) {
		this.#expandBuffer(2);
		this.#view.setInt16(this.#offset, value, true);
		this.#offset += 2;
	}
	writeU16(value) {
		this.#expandBuffer(2);
		this.#view.setUint16(this.#offset, value, true);
		this.#offset += 2;
	}
	writeI32(value) {
		this.#expandBuffer(4);
		this.#view.setInt32(this.#offset, value, true);
		this.#offset += 4;
	}
	writeU32(value) {
		this.#expandBuffer(4);
		this.#view.setUint32(this.#offset, value, true);
		this.#offset += 4;
	}
	writeI64(value) {
		this.#expandBuffer(8);
		this.#view.setBigInt64(this.#offset, value, true);
		this.#offset += 8;
	}
	writeU64(value) {
		this.#expandBuffer(8);
		this.#view.setBigUint64(this.#offset, value, true);
		this.#offset += 8;
	}
	writeU128(value) {
		this.#expandBuffer(16);
		const lowerPart = value & BigInt("0xFFFFFFFFFFFFFFFF");
		const upperPart = value >> BigInt(64);
		this.#view.setBigUint64(this.#offset, lowerPart, true);
		this.#view.setBigUint64(this.#offset + 8, upperPart, true);
		this.#offset += 16;
	}
	writeI128(value) {
		this.#expandBuffer(16);
		const lowerPart = value & BigInt("0xFFFFFFFFFFFFFFFF");
		const upperPart = value >> BigInt(64);
		this.#view.setBigInt64(this.#offset, lowerPart, true);
		this.#view.setBigInt64(this.#offset + 8, upperPart, true);
		this.#offset += 16;
	}
	writeU256(value) {
		this.#expandBuffer(32);
		const low_64_mask = BigInt("0xFFFFFFFFFFFFFFFF");
		const p0 = value & low_64_mask;
		const p1 = value >> BigInt(64) & low_64_mask;
		const p2 = value >> BigInt(128) & low_64_mask;
		const p3 = value >> BigInt(192);
		this.#view.setBigUint64(this.#offset + 0, p0, true);
		this.#view.setBigUint64(this.#offset + 8, p1, true);
		this.#view.setBigUint64(this.#offset + 16, p2, true);
		this.#view.setBigUint64(this.#offset + 24, p3, true);
		this.#offset += 32;
	}
	writeI256(value) {
		this.#expandBuffer(32);
		const low_64_mask = BigInt("0xFFFFFFFFFFFFFFFF");
		const p0 = value & low_64_mask;
		const p1 = value >> BigInt(64) & low_64_mask;
		const p2 = value >> BigInt(128) & low_64_mask;
		const p3 = value >> BigInt(192);
		this.#view.setBigUint64(this.#offset + 0, p0, true);
		this.#view.setBigUint64(this.#offset + 8, p1, true);
		this.#view.setBigUint64(this.#offset + 16, p2, true);
		this.#view.setBigInt64(this.#offset + 24, p3, true);
		this.#offset += 32;
	}
	writeF32(value) {
		this.#expandBuffer(4);
		this.#view.setFloat32(this.#offset, value, true);
		this.#offset += 4;
	}
	writeF64(value) {
		this.#expandBuffer(8);
		this.#view.setFloat64(this.#offset, value, true);
		this.#offset += 8;
	}
	writeString(value) {
		const encodedString = new TextEncoder().encode(value);
		this.writeU32(encodedString.length);
		this.#expandBuffer(encodedString.length);
		this.#buffer.set(encodedString, this.#offset);
		this.#offset += encodedString.length;
	}
};
function toPascalCase(s) {
	const str = s.replace(/([-_][a-z])/gi, ($1) => {
		return $1.toUpperCase().replace("-", "").replace("_", "");
	});
	return str.charAt(0).toUpperCase() + str.slice(1);
}
function uint8ArrayToHexString(array) {
	return Array.prototype.map.call(array.reverse(), (x) => ("00" + x.toString(16)).slice(-2)).join("");
}
function uint8ArrayToU128(array) {
	if (array.length != 16) throw new Error(`Uint8Array is not 16 bytes long: ${array}`);
	return new BinaryReader(array).readU128();
}
function uint8ArrayToU256(array) {
	if (array.length != 32) throw new Error(`Uint8Array is not 32 bytes long: [${array}]`);
	return new BinaryReader(array).readU256();
}
function hexStringToUint8Array(str) {
	if (str.startsWith("0x")) str = str.slice(2);
	const matches = str.match(/.{1,2}/g) || [];
	return Uint8Array.from(matches.map((byte) => parseInt(byte, 16))).reverse();
}
function hexStringToU128(str) {
	return uint8ArrayToU128(hexStringToUint8Array(str));
}
function hexStringToU256(str) {
	return uint8ArrayToU256(hexStringToUint8Array(str));
}
function u128ToUint8Array(data) {
	const writer = new BinaryWriter(16);
	writer.writeU128(data);
	return writer.getBuffer();
}
function u128ToHexString(data) {
	return uint8ArrayToHexString(u128ToUint8Array(data));
}
function u256ToUint8Array(data) {
	const writer = new BinaryWriter(32);
	writer.writeU256(data);
	return writer.getBuffer();
}
function u256ToHexString(data) {
	return uint8ArrayToHexString(u256ToUint8Array(data));
}
function toCamelCase(str) {
	return str.replace(/[-_]+/g, "_").replace(/_([a-zA-Z0-9])/g, (_, c) => c.toUpperCase());
}
function bsatnBaseSize(typespace, ty) {
	const assumedArrayLength = 4;
	while (ty.tag === "Ref") ty = typespace.types[ty.value];
	if (ty.tag === "Product") {
		let sum = 0;
		for (const { algebraicType: elem } of ty.value.elements) sum += bsatnBaseSize(typespace, elem);
		return sum;
	} else if (ty.tag === "Sum") {
		let min = Infinity;
		for (const { algebraicType: vari } of ty.value.variants) {
			const vSize = bsatnBaseSize(typespace, vari);
			if (vSize < min) min = vSize;
		}
		if (min === Infinity) min = 0;
		return 4 + min;
	} else if (ty.tag == "Array") return 4 + assumedArrayLength * bsatnBaseSize(typespace, ty.value);
	return {
		String: 4 + assumedArrayLength,
		Sum: 1,
		Bool: 1,
		I8: 1,
		U8: 1,
		I16: 2,
		U16: 2,
		I32: 4,
		U32: 4,
		F32: 4,
		I64: 8,
		U64: 8,
		F64: 8,
		I128: 16,
		U128: 16,
		I256: 32,
		U256: 32
	}[ty.tag];
}
var ConnectionId = class _ConnectionId {
	__connection_id__;
	/**
	* Creates a new `ConnectionId`.
	*/
	constructor(data) {
		this.__connection_id__ = data;
	}
	/**
	* Get the algebraic type representation of the {@link ConnectionId} type.
	* @returns The algebraic type representation of the type.
	*/
	static getAlgebraicType() {
		return AlgebraicType.Product({ elements: [{
			name: "__connection_id__",
			algebraicType: AlgebraicType.U128
		}] });
	}
	isZero() {
		return this.__connection_id__ === BigInt(0);
	}
	static nullIfZero(addr) {
		if (addr.isZero()) return null;
		else return addr;
	}
	static random() {
		function randomU8() {
			return Math.floor(Math.random() * 255);
		}
		let result = BigInt(0);
		for (let i = 0; i < 16; i++) result = result << BigInt(8) | BigInt(randomU8());
		return new _ConnectionId(result);
	}
	/**
	* Compare two connection IDs for equality.
	*/
	isEqual(other) {
		return this.__connection_id__ == other.__connection_id__;
	}
	/**
	* Check if two connection IDs are equal.
	*/
	equals(other) {
		return this.isEqual(other);
	}
	/**
	* Print the connection ID as a hexadecimal string.
	*/
	toHexString() {
		return u128ToHexString(this.__connection_id__);
	}
	/**
	* Convert the connection ID to a Uint8Array.
	*/
	toUint8Array() {
		return u128ToUint8Array(this.__connection_id__);
	}
	/**
	* Parse a connection ID from a hexadecimal string.
	*/
	static fromString(str) {
		return new _ConnectionId(hexStringToU128(str));
	}
	static fromStringOrNull(str) {
		const addr = _ConnectionId.fromString(str);
		if (addr.isZero()) return null;
		else return addr;
	}
};
var Identity = class _Identity {
	__identity__;
	/**
	* Creates a new `Identity`.
	*
	* `data` can be a hexadecimal string or a `bigint`.
	*/
	constructor(data) {
		this.__identity__ = typeof data === "string" ? hexStringToU256(data) : data;
	}
	/**
	* Get the algebraic type representation of the {@link Identity} type.
	* @returns The algebraic type representation of the type.
	*/
	static getAlgebraicType() {
		return AlgebraicType.Product({ elements: [{
			name: "__identity__",
			algebraicType: AlgebraicType.U256
		}] });
	}
	/**
	* Check if two identities are equal.
	*/
	isEqual(other) {
		return this.toHexString() === other.toHexString();
	}
	/**
	* Check if two identities are equal.
	*/
	equals(other) {
		return this.isEqual(other);
	}
	/**
	* Print the identity as a hexadecimal string.
	*/
	toHexString() {
		return u256ToHexString(this.__identity__);
	}
	/**
	* Convert the address to a Uint8Array.
	*/
	toUint8Array() {
		return u256ToUint8Array(this.__identity__);
	}
	/**
	* Parse an Identity from a hexadecimal string.
	*/
	static fromString(str) {
		return new _Identity(str);
	}
	/**
	* Zero identity (0x0000000000000000000000000000000000000000000000000000000000000000)
	*/
	static zero() {
		return new _Identity(0n);
	}
	toString() {
		return this.toHexString();
	}
};
var AlgebraicType = {
	Ref: (value) => ({
		tag: "Ref",
		value
	}),
	Sum: (value) => ({
		tag: "Sum",
		value
	}),
	Product: (value) => ({
		tag: "Product",
		value
	}),
	Array: (value) => ({
		tag: "Array",
		value
	}),
	String: { tag: "String" },
	Bool: { tag: "Bool" },
	I8: { tag: "I8" },
	U8: { tag: "U8" },
	I16: { tag: "I16" },
	U16: { tag: "U16" },
	I32: { tag: "I32" },
	U32: { tag: "U32" },
	I64: { tag: "I64" },
	U64: { tag: "U64" },
	I128: { tag: "I128" },
	U128: { tag: "U128" },
	I256: { tag: "I256" },
	U256: { tag: "U256" },
	F32: { tag: "F32" },
	F64: { tag: "F64" },
	serializeValue(writer, ty, value, typespace) {
		if (ty.tag === "Ref") {
			if (!typespace) throw new Error("cannot serialize refs without a typespace");
			while (ty.tag === "Ref") ty = typespace.types[ty.value];
		}
		switch (ty.tag) {
			case "Product":
				ProductType.serializeValue(writer, ty.value, value, typespace);
				break;
			case "Sum":
				SumType.serializeValue(writer, ty.value, value, typespace);
				break;
			case "Array":
				if (ty.value.tag === "U8") writer.writeUInt8Array(value);
				else {
					const elemType = ty.value;
					writer.writeU32(value.length);
					for (const elem of value) AlgebraicType.serializeValue(writer, elemType, elem, typespace);
				}
				break;
			case "Bool":
				writer.writeBool(value);
				break;
			case "I8":
				writer.writeI8(value);
				break;
			case "U8":
				writer.writeU8(value);
				break;
			case "I16":
				writer.writeI16(value);
				break;
			case "U16":
				writer.writeU16(value);
				break;
			case "I32":
				writer.writeI32(value);
				break;
			case "U32":
				writer.writeU32(value);
				break;
			case "I64":
				writer.writeI64(value);
				break;
			case "U64":
				writer.writeU64(value);
				break;
			case "I128":
				writer.writeI128(value);
				break;
			case "U128":
				writer.writeU128(value);
				break;
			case "I256":
				writer.writeI256(value);
				break;
			case "U256":
				writer.writeU256(value);
				break;
			case "F32":
				writer.writeF32(value);
				break;
			case "F64":
				writer.writeF64(value);
				break;
			case "String":
				writer.writeString(value);
				break;
		}
	},
	deserializeValue: function(reader, ty, typespace) {
		if (ty.tag === "Ref") {
			if (!typespace) throw new Error("cannot deserialize refs without a typespace");
			while (ty.tag === "Ref") ty = typespace.types[ty.value];
		}
		switch (ty.tag) {
			case "Product": return ProductType.deserializeValue(reader, ty.value, typespace);
			case "Sum": return SumType.deserializeValue(reader, ty.value, typespace);
			case "Array": if (ty.value.tag === "U8") return reader.readUInt8Array();
			else {
				const elemType = ty.value;
				const length = reader.readU32();
				const result = [];
				for (let i = 0; i < length; i++) result.push(AlgebraicType.deserializeValue(reader, elemType, typespace));
				return result;
			}
			case "Bool": return reader.readBool();
			case "I8": return reader.readI8();
			case "U8": return reader.readU8();
			case "I16": return reader.readI16();
			case "U16": return reader.readU16();
			case "I32": return reader.readI32();
			case "U32": return reader.readU32();
			case "I64": return reader.readI64();
			case "U64": return reader.readU64();
			case "I128": return reader.readI128();
			case "U128": return reader.readU128();
			case "I256": return reader.readI256();
			case "U256": return reader.readU256();
			case "F32": return reader.readF32();
			case "F64": return reader.readF64();
			case "String": return reader.readString();
		}
	},
	intoMapKey: function(ty, value) {
		switch (ty.tag) {
			case "U8":
			case "U16":
			case "U32":
			case "U64":
			case "U128":
			case "U256":
			case "I8":
			case "I16":
			case "I32":
			case "I64":
			case "I128":
			case "I256":
			case "F32":
			case "F64":
			case "String":
			case "Bool": return value;
			case "Product": return ProductType.intoMapKey(ty.value, value);
			default: {
				const writer = new BinaryWriter(10);
				AlgebraicType.serializeValue(writer, ty, value);
				return writer.toBase64();
			}
		}
	}
};
var ProductType = {
	serializeValue(writer, ty, value, typespace) {
		for (const element of ty.elements) AlgebraicType.serializeValue(writer, element.algebraicType, value[element.name], typespace);
	},
	deserializeValue(reader, ty, typespace) {
		const result = {};
		if (ty.elements.length === 1) {
			if (ty.elements[0].name === "__time_duration_micros__") return new TimeDuration(reader.readI64());
			if (ty.elements[0].name === "__timestamp_micros_since_unix_epoch__") return new Timestamp(reader.readI64());
			if (ty.elements[0].name === "__identity__") return new Identity(reader.readU256());
			if (ty.elements[0].name === "__connection_id__") return new ConnectionId(reader.readU128());
			if (ty.elements[0].name === "__uuid__") return new Uuid(reader.readU128());
		}
		for (const element of ty.elements) result[element.name] = AlgebraicType.deserializeValue(reader, element.algebraicType, typespace);
		return result;
	},
	intoMapKey(ty, value) {
		if (ty.elements.length === 1) {
			if (ty.elements[0].name === "__time_duration_micros__") return value.__time_duration_micros__;
			if (ty.elements[0].name === "__timestamp_micros_since_unix_epoch__") return value.__timestamp_micros_since_unix_epoch__;
			if (ty.elements[0].name === "__identity__") return value.__identity__;
			if (ty.elements[0].name === "__connection_id__") return value.__connection_id__;
			if (ty.elements[0].name === "__uuid__") return value.__uuid__;
		}
		const writer = new BinaryWriter(10);
		AlgebraicType.serializeValue(writer, AlgebraicType.Product(ty), value);
		return writer.toBase64();
	}
};
var SumType = {
	serializeValue: function(writer, ty, value, typespace) {
		if (ty.variants.length == 2 && ty.variants[0].name === "some" && ty.variants[1].name === "none") if (value !== null && value !== void 0) {
			writer.writeByte(0);
			AlgebraicType.serializeValue(writer, ty.variants[0].algebraicType, value, typespace);
		} else writer.writeByte(1);
		else if (ty.variants.length == 2 && ty.variants[0].name === "ok" && ty.variants[1].name === "err") {
			let variantName;
			let innerValue;
			let index;
			if ("ok" in value) {
				variantName = "ok";
				innerValue = value.ok;
				index = 0;
			} else {
				variantName = "err";
				innerValue = value.err;
				index = 1;
			}
			if (index < 0) throw `Result serialization error: variant '${variantName}' not found in ${JSON.stringify(ty)}`;
			writer.writeU8(index);
			AlgebraicType.serializeValue(writer, ty.variants[index].algebraicType, innerValue, typespace);
		} else {
			const variant = value["tag"];
			const index = ty.variants.findIndex((v) => v.name === variant);
			if (index < 0) throw `Can't serialize a sum type, couldn't find ${value.tag} tag ${JSON.stringify(value)} in variants ${JSON.stringify(ty)}`;
			writer.writeU8(index);
			AlgebraicType.serializeValue(writer, ty.variants[index].algebraicType, value["value"], typespace);
		}
	},
	deserializeValue: function(reader, ty, typespace) {
		const tag = reader.readU8();
		if (ty.variants.length == 2 && ty.variants[0].name === "some" && ty.variants[1].name === "none") if (tag === 0) return AlgebraicType.deserializeValue(reader, ty.variants[0].algebraicType, typespace);
		else if (tag === 1) return;
		else throw `Can't deserialize an option type, couldn't find ${tag} tag`;
		else if (ty.variants.length == 2 && ty.variants[0].name === "ok" && ty.variants[1].name === "err") if (tag === 0) return { ok: AlgebraicType.deserializeValue(reader, ty.variants[0].algebraicType, typespace) };
		else if (tag === 1) return { err: AlgebraicType.deserializeValue(reader, ty.variants[1].algebraicType, typespace) };
		else throw `Can't deserialize a result type, couldn't find ${tag} tag`;
		else {
			const variant = ty.variants[tag];
			const value = AlgebraicType.deserializeValue(reader, variant.algebraicType, typespace);
			return {
				tag: variant.name,
				value
			};
		}
	}
};
var Option = { getAlgebraicType(innerType) {
	return AlgebraicType.Sum({ variants: [{
		name: "some",
		algebraicType: innerType
	}, {
		name: "none",
		algebraicType: AlgebraicType.Product({ elements: [] })
	}] });
} };
var Result = { getAlgebraicType(okType, errType) {
	return AlgebraicType.Sum({ variants: [{
		name: "ok",
		algebraicType: okType
	}, {
		name: "err",
		algebraicType: errType
	}] });
} };
var ScheduleAt = {
	interval(value) {
		return Interval(value);
	},
	time(value) {
		return Time(value);
	},
	getAlgebraicType() {
		return AlgebraicType.Sum({ variants: [{
			name: "Interval",
			algebraicType: TimeDuration.getAlgebraicType()
		}, {
			name: "Time",
			algebraicType: Timestamp.getAlgebraicType()
		}] });
	},
	isScheduleAt(algebraicType) {
		if (algebraicType.tag !== "Sum") return false;
		const variants = algebraicType.value.variants;
		if (variants.length !== 2) return false;
		const intervalVariant = variants.find((v) => v.name === "Interval");
		const timeVariant = variants.find((v) => v.name === "Time");
		if (!intervalVariant || !timeVariant) return false;
		return TimeDuration.isTimeDuration(intervalVariant.algebraicType) && Timestamp.isTimestamp(timeVariant.algebraicType);
	}
};
var Interval = (micros) => ({
	tag: "Interval",
	value: new TimeDuration(micros)
});
var Time = (microsSinceUnixEpoch) => ({
	tag: "Time",
	value: new Timestamp(microsSinceUnixEpoch)
});
var schedule_at_default = ScheduleAt;
function set(x, t2) {
	return {
		...x,
		...t2
	};
}
var TypeBuilder = class {
	/**
	* The TypeScript phantom type. This is not stored at runtime,
	* but is visible to the compiler
	*/
	type;
	/**
	* The SpacetimeDB algebraic type (run‑time value). In addition to storing
	* the runtime representation of the `AlgebraicType`, it also captures
	* the TypeScript type information of the `AlgebraicType`. That is to say
	* the value is not merely an `AlgebraicType`, but is constructed to be
	* the corresponding concrete `AlgebraicType` for the TypeScript type `Type`.
	*
	* e.g. `string` corresponds to `AlgebraicType.String`
	*/
	algebraicType;
	constructor(algebraicType) {
		this.algebraicType = algebraicType;
	}
	optional() {
		return new OptionBuilder(this);
	}
	serialize(writer, value) {
		AlgebraicType.serializeValue(writer, this.algebraicType, value);
	}
	deserialize(reader) {
		return AlgebraicType.deserializeValue(reader, this.algebraicType);
	}
};
var U8Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U8);
	}
	index(algorithm = "btree") {
		return new U8ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U8ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U8ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U8ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U8ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U8ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var U16Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U16);
	}
	index(algorithm = "btree") {
		return new U16ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U16ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U16ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U16ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U16ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U16ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var U32Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U32);
	}
	index(algorithm = "btree") {
		return new U32ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U32ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U32ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U32ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U32ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U32ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var U64Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U64);
	}
	index(algorithm = "btree") {
		return new U64ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U64ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U64ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U64ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U64ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U64ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var U128Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U128);
	}
	index(algorithm = "btree") {
		return new U128ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U128ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U128ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U128ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U128ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U128ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var U256Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.U256);
	}
	index(algorithm = "btree") {
		return new U256ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new U256ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new U256ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new U256ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new U256ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new U256ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I8Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I8);
	}
	index(algorithm = "btree") {
		return new I8ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I8ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I8ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I8ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I8ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I8ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I16Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I16);
	}
	index(algorithm = "btree") {
		return new I16ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I16ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I16ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I16ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I16ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I16ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I32Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I32);
	}
	index(algorithm = "btree") {
		return new I32ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I32ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I32ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I32ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I32ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I32ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I64Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I64);
	}
	index(algorithm = "btree") {
		return new I64ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I64ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I64ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I64ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I64ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I64ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I128Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I128);
	}
	index(algorithm = "btree") {
		return new I128ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I128ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I128ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I128ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I128ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I128ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var I256Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.I256);
	}
	index(algorithm = "btree") {
		return new I256ColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new I256ColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new I256ColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new I256ColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new I256ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new I256ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var F32Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.F32);
	}
	default(value) {
		return new F32ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new F32ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var F64Builder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.F64);
	}
	default(value) {
		return new F64ColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new F64ColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var BoolBuilder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.Bool);
	}
	index(algorithm = "btree") {
		return new BoolColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new BoolColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new BoolColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new BoolColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new BoolColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var StringBuilder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.String);
	}
	index(algorithm = "btree") {
		return new StringColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new StringColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new StringColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new StringColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new StringColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var ArrayBuilder = class extends TypeBuilder {
	element;
	constructor(element) {
		super(AlgebraicType.Array(element.algebraicType));
		this.element = element;
	}
	default(value) {
		return new ArrayColumnBuilder(this.element, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new ArrayColumnBuilder(this.element, set(defaultMetadata, { name }));
	}
};
var ByteArrayBuilder = class extends TypeBuilder {
	constructor() {
		super(AlgebraicType.Array(AlgebraicType.U8));
	}
	default(value) {
		return new ByteArrayColumnBuilder(set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new ByteArrayColumnBuilder(set(defaultMetadata, { name }));
	}
};
var OptionBuilder = class extends TypeBuilder {
	value;
	constructor(value) {
		super(Option.getAlgebraicType(value.algebraicType));
		this.value = value;
	}
	default(value) {
		return new OptionColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new OptionColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var ProductBuilder = class extends TypeBuilder {
	typeName;
	elements;
	constructor(elements, name) {
		function elementsArrayFromElementsObj(obj) {
			return Object.keys(obj).map((key) => ({
				name: key,
				get algebraicType() {
					return obj[key].algebraicType;
				}
			}));
		}
		super(AlgebraicType.Product({ elements: elementsArrayFromElementsObj(elements) }));
		this.typeName = name;
		this.elements = elements;
	}
	default(value) {
		return new ProductColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new ProductColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var ResultBuilder = class extends TypeBuilder {
	ok;
	err;
	constructor(ok, err) {
		super(Result.getAlgebraicType(ok.algebraicType, err.algebraicType));
		this.ok = ok;
		this.err = err;
	}
	default(value) {
		return new ResultColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
};
var UnitBuilder = class extends TypeBuilder {
	constructor() {
		super({
			tag: "Product",
			value: { elements: [] }
		});
	}
};
var RowBuilder = class extends TypeBuilder {
	row;
	typeName;
	constructor(row, name) {
		const mappedRow = Object.fromEntries(Object.entries(row).map(([colName, builder]) => [colName, builder instanceof ColumnBuilder ? builder : new ColumnBuilder(builder, {})]));
		const elements = Object.keys(mappedRow).map((name2) => ({
			name: name2,
			get algebraicType() {
				return mappedRow[name2].typeBuilder.algebraicType;
			}
		}));
		super(AlgebraicType.Product({ elements }));
		this.row = mappedRow;
		this.typeName = name;
	}
};
var SumBuilderImpl = class extends TypeBuilder {
	variants;
	typeName;
	constructor(variants, name) {
		function variantsArrayFromVariantsObj(variants2) {
			return Object.keys(variants2).map((key) => ({
				name: key,
				get algebraicType() {
					return variants2[key].algebraicType;
				}
			}));
		}
		super(AlgebraicType.Sum({ variants: variantsArrayFromVariantsObj(variants) }));
		this.variants = variants;
		this.typeName = name;
		for (const key of Object.keys(variants)) {
			const desc = Object.getOwnPropertyDescriptor(variants, key);
			const isAccessor = !!desc && (typeof desc.get === "function" || typeof desc.set === "function");
			let isUnit2 = false;
			if (!isAccessor) isUnit2 = variants[key] instanceof UnitBuilder;
			if (isUnit2) {
				const constant = this.create(key);
				Object.defineProperty(this, key, {
					value: constant,
					writable: false,
					enumerable: true,
					configurable: false
				});
			} else {
				const fn = ((value) => this.create(key, value));
				Object.defineProperty(this, key, {
					value: fn,
					writable: false,
					enumerable: true,
					configurable: false
				});
			}
		}
	}
	create(tag, value) {
		return value === void 0 ? { tag } : {
			tag,
			value
		};
	}
	default(value) {
		return new SumColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new SumColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var SumBuilder = SumBuilderImpl;
var SimpleSumBuilderImpl = class extends SumBuilderImpl {
	index(algorithm = "btree") {
		return new SimpleSumColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	primaryKey() {
		return new SimpleSumColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
};
var ScheduleAtBuilder = class extends TypeBuilder {
	constructor() {
		super(schedule_at_default.getAlgebraicType());
	}
	default(value) {
		return new ScheduleAtColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new ScheduleAtColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var IdentityBuilder = class extends TypeBuilder {
	constructor() {
		super(Identity.getAlgebraicType());
	}
	index(algorithm = "btree") {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new IdentityColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var ConnectionIdBuilder = class extends TypeBuilder {
	constructor() {
		super(ConnectionId.getAlgebraicType());
	}
	index(algorithm = "btree") {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new ConnectionIdColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var TimestampBuilder = class extends TypeBuilder {
	constructor() {
		super(Timestamp.getAlgebraicType());
	}
	index(algorithm = "btree") {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new TimestampColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var TimeDurationBuilder = class extends TypeBuilder {
	constructor() {
		super(TimeDuration.getAlgebraicType());
	}
	index(algorithm = "btree") {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new TimeDurationColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var UuidBuilder = class extends TypeBuilder {
	constructor() {
		super(Uuid.getAlgebraicType());
	}
	index(algorithm = "btree") {
		return new UuidColumnBuilder(this, set(defaultMetadata, { indexType: algorithm }));
	}
	unique() {
		return new UuidColumnBuilder(this, set(defaultMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new UuidColumnBuilder(this, set(defaultMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new UuidColumnBuilder(this, set(defaultMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new UuidColumnBuilder(this, set(defaultMetadata, { defaultValue: value }));
	}
	name(name) {
		return new UuidColumnBuilder(this, set(defaultMetadata, { name }));
	}
};
var defaultMetadata = {};
var ColumnBuilder = class {
	typeBuilder;
	columnMetadata;
	constructor(typeBuilder, metadata) {
		this.typeBuilder = typeBuilder;
		this.columnMetadata = metadata;
	}
	serialize(writer, value) {
		AlgebraicType.serializeValue(writer, this.typeBuilder.algebraicType, value);
	}
	deserialize(reader) {
		return AlgebraicType.deserializeValue(reader, this.typeBuilder.algebraicType);
	}
};
var U8ColumnBuilder = class _U8ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var U16ColumnBuilder = class _U16ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var U32ColumnBuilder = class _U32ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var U64ColumnBuilder = class _U64ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var U128ColumnBuilder = class _U128ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var U256ColumnBuilder = class _U256ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _U256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I8ColumnBuilder = class _I8ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I8ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I16ColumnBuilder = class _I16ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I16ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I32ColumnBuilder = class _I32ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I64ColumnBuilder = class _I64ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I128ColumnBuilder = class _I128ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I128ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var I256ColumnBuilder = class _I256ColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	autoInc() {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isAutoIncrement: true }));
	}
	default(value) {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _I256ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var F32ColumnBuilder = class _F32ColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _F32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _F32ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var F64ColumnBuilder = class _F64ColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _F64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _F64ColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var BoolColumnBuilder = class _BoolColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _BoolColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _BoolColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _BoolColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _BoolColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _BoolColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var StringColumnBuilder = class _StringColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _StringColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _StringColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _StringColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _StringColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _StringColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var ArrayColumnBuilder = class _ArrayColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _ArrayColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _ArrayColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var ByteArrayColumnBuilder = class _ByteArrayColumnBuilder extends ColumnBuilder {
	constructor(metadata) {
		super(new TypeBuilder(AlgebraicType.Array(AlgebraicType.U8)), metadata);
	}
	default(value) {
		return new _ByteArrayColumnBuilder(set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _ByteArrayColumnBuilder(set(this.columnMetadata, { name }));
	}
};
var OptionColumnBuilder = class _OptionColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _OptionColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _OptionColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var ResultColumnBuilder = class _ResultColumnBuilder extends ColumnBuilder {
	constructor(typeBuilder, metadata) {
		super(typeBuilder, metadata);
	}
	default(value) {
		return new _ResultColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
};
var ProductColumnBuilder = class _ProductColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _ProductColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _ProductColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var SumColumnBuilder = class _SumColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _SumColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _SumColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var SimpleSumColumnBuilder = class _SimpleSumColumnBuilder extends SumColumnBuilder {
	index(algorithm = "btree") {
		return new _SimpleSumColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	primaryKey() {
		return new _SimpleSumColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
};
var ScheduleAtColumnBuilder = class _ScheduleAtColumnBuilder extends ColumnBuilder {
	default(value) {
		return new _ScheduleAtColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _ScheduleAtColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var IdentityColumnBuilder = class _IdentityColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _IdentityColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _IdentityColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _IdentityColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _IdentityColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _IdentityColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var ConnectionIdColumnBuilder = class _ConnectionIdColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _ConnectionIdColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _ConnectionIdColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _ConnectionIdColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _ConnectionIdColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _ConnectionIdColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var TimestampColumnBuilder = class _TimestampColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _TimestampColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _TimestampColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _TimestampColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _TimestampColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _TimestampColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var TimeDurationColumnBuilder = class _TimeDurationColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _TimeDurationColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _TimeDurationColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _TimeDurationColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _TimeDurationColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _TimeDurationColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var UuidColumnBuilder = class _UuidColumnBuilder extends ColumnBuilder {
	index(algorithm = "btree") {
		return new _UuidColumnBuilder(this.typeBuilder, set(this.columnMetadata, { indexType: algorithm }));
	}
	unique() {
		return new _UuidColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isUnique: true }));
	}
	primaryKey() {
		return new _UuidColumnBuilder(this.typeBuilder, set(this.columnMetadata, { isPrimaryKey: true }));
	}
	default(value) {
		return new _UuidColumnBuilder(this.typeBuilder, set(this.columnMetadata, { defaultValue: value }));
	}
	name(name) {
		return new _UuidColumnBuilder(this.typeBuilder, set(this.columnMetadata, { name }));
	}
};
var RefBuilder = class extends TypeBuilder {
	ref;
	/** The phantom type of the pointee of this ref. */
	__spacetimeType;
	constructor(ref) {
		super(AlgebraicType.Ref(ref));
		this.ref = ref;
	}
};
var enumImpl = ((nameOrObj, maybeObj) => {
	let obj = nameOrObj;
	let name = void 0;
	if (typeof nameOrObj === "string") {
		if (!maybeObj) throw new TypeError("When providing a name, you must also provide the variants object or array.");
		obj = maybeObj;
		name = nameOrObj;
	}
	if (Array.isArray(obj)) {
		const simpleVariantsObj = {};
		for (const variant of obj) simpleVariantsObj[variant] = new UnitBuilder();
		return new SimpleSumBuilderImpl(simpleVariantsObj, name);
	}
	return new SumBuilder(obj, name);
});
var t = {
	bool: () => new BoolBuilder(),
	string: () => new StringBuilder(),
	number: () => new F64Builder(),
	i8: () => new I8Builder(),
	u8: () => new U8Builder(),
	i16: () => new I16Builder(),
	u16: () => new U16Builder(),
	i32: () => new I32Builder(),
	u32: () => new U32Builder(),
	i64: () => new I64Builder(),
	u64: () => new U64Builder(),
	i128: () => new I128Builder(),
	u128: () => new U128Builder(),
	i256: () => new I256Builder(),
	u256: () => new U256Builder(),
	f32: () => new F32Builder(),
	f64: () => new F64Builder(),
	object: ((nameOrObj, maybeObj) => {
		if (typeof nameOrObj === "string") {
			if (!maybeObj) throw new TypeError("When providing a name, you must also provide the object.");
			return new ProductBuilder(maybeObj, nameOrObj);
		}
		return new ProductBuilder(nameOrObj, void 0);
	}),
	row: ((nameOrObj, maybeObj) => {
		const [obj, name] = typeof nameOrObj === "string" ? [maybeObj, nameOrObj] : [nameOrObj, void 0];
		return new RowBuilder(obj, name);
	}),
	array(e) {
		return new ArrayBuilder(e);
	},
	enum: enumImpl,
	unit() {
		return new UnitBuilder();
	},
	lazy(thunk) {
		let cached = null;
		const get = () => cached ??= thunk();
		return new Proxy({}, {
			get(_t, prop, recv) {
				const target = get();
				const val = Reflect.get(target, prop, recv);
				return typeof val === "function" ? val.bind(target) : val;
			},
			set(_t, prop, value, recv) {
				return Reflect.set(get(), prop, value, recv);
			},
			has(_t, prop) {
				return prop in get();
			},
			ownKeys() {
				return Reflect.ownKeys(get());
			},
			getOwnPropertyDescriptor(_t, prop) {
				return Object.getOwnPropertyDescriptor(get(), prop);
			},
			getPrototypeOf() {
				return Object.getPrototypeOf(get());
			}
		});
	},
	scheduleAt: () => {
		return new ScheduleAtBuilder();
	},
	option(value) {
		return new OptionBuilder(value);
	},
	result(ok, err) {
		return new ResultBuilder(ok, err);
	},
	identity: () => {
		return new IdentityBuilder();
	},
	connectionId: () => {
		return new ConnectionIdBuilder();
	},
	timestamp: () => {
		return new TimestampBuilder();
	},
	timeDuration: () => {
		return new TimeDurationBuilder();
	},
	uuid: () => {
		return new UuidBuilder();
	},
	byteArray: () => {
		return new ByteArrayBuilder();
	}
};
var lifecycle_type_default = t.enum("Lifecycle", {
	Init: t.unit(),
	OnConnect: t.unit(),
	OnDisconnect: t.unit()
});
function pushReducer(name, params, fn, lifecycle) {
	if (existingReducers.has(name)) throw new TypeError(`There is already a reducer with the name '${name}'`);
	existingReducers.add(name);
	if (!(params instanceof RowBuilder)) params = new RowBuilder(params);
	if (params.typeName === void 0) params.typeName = toPascalCase(name);
	const ref = registerTypesRecursively(params);
	const paramsType = resolveType(MODULE_DEF.typespace, ref).value;
	MODULE_DEF.reducers.push({
		name,
		params: paramsType,
		lifecycle
	});
	if (!fn.name) Object.defineProperty(fn, "name", {
		value: name,
		writable: false
	});
	REDUCERS.push(fn);
}
var existingReducers = /* @__PURE__ */ new Set();
var REDUCERS = [];
function reducer(name, params, fn) {
	pushReducer(name, params, fn);
}
function init(name, params, fn) {
	pushReducer(name, params, fn, lifecycle_type_default.Init);
}
function clientConnected(name, params, fn) {
	pushReducer(name, params, fn, lifecycle_type_default.OnConnect);
}
function clientDisconnected(name, params, fn) {
	pushReducer(name, params, fn, lifecycle_type_default.OnDisconnect);
}
var QueryBrand = Symbol("QueryBrand");
var isRowTypedQuery = (val) => !!val && typeof val === "object" && QueryBrand in val;
function toSql(q) {
	return q.toSql();
}
var SemijoinImpl = class _SemijoinImpl {
	constructor(sourceQuery, filterQuery, joinCondition) {
		this.sourceQuery = sourceQuery;
		this.filterQuery = filterQuery;
		this.joinCondition = joinCondition;
		if (sourceQuery.table.name === filterQuery.table.name) throw new Error("Cannot semijoin a table to itself");
	}
	[QueryBrand] = true;
	type = "semijoin";
	build() {
		return this;
	}
	where(predicate) {
		return new _SemijoinImpl(this.sourceQuery.where(predicate), this.filterQuery, this.joinCondition);
	}
	toSql() {
		const left = this.filterQuery;
		const right = this.sourceQuery;
		const leftTable = quoteIdentifier(left.table.name);
		const rightTable = quoteIdentifier(right.table.name);
		let sql = `SELECT ${rightTable}.* FROM ${leftTable} JOIN ${rightTable} ON ${booleanExprToSql(this.joinCondition)}`;
		const clauses = [];
		if (left.whereClause) clauses.push(booleanExprToSql(left.whereClause));
		if (right.whereClause) clauses.push(booleanExprToSql(right.whereClause));
		if (clauses.length > 0) {
			const whereSql = clauses.length === 1 ? clauses[0] : clauses.map(wrapInParens).join(" AND ");
			sql += ` WHERE ${whereSql}`;
		}
		return sql;
	}
};
var FromBuilder = class _FromBuilder {
	constructor(table2, whereClause) {
		this.table = table2;
		this.whereClause = whereClause;
	}
	[QueryBrand] = true;
	where(predicate) {
		const newCondition = predicate(this.table.cols);
		const nextWhere = this.whereClause ? and(this.whereClause, newCondition) : newCondition;
		return new _FromBuilder(this.table, nextWhere);
	}
	rightSemijoin(right, on) {
		const sourceQuery = new _FromBuilder(right);
		const joinCondition = on(this.table.indexedCols, right.indexedCols);
		return new SemijoinImpl(sourceQuery, this, joinCondition);
	}
	leftSemijoin(right, on) {
		const filterQuery = new _FromBuilder(right);
		const joinCondition = on(this.table.indexedCols, right.indexedCols);
		return new SemijoinImpl(this, filterQuery, joinCondition);
	}
	toSql() {
		return renderSelectSqlWithJoins(this.table, this.whereClause);
	}
	build() {
		return this;
	}
};
var TableRefImpl = class {
	type = "table";
	name;
	cols;
	indexedCols;
	tableDef;
	constructor(tableDef) {
		this.name = tableDef.name;
		this.cols = createRowExpr(tableDef);
		this.indexedCols = this.cols;
		this.tableDef = tableDef;
		Object.freeze(this);
	}
	asFrom() {
		return new FromBuilder(this);
	}
	rightSemijoin(other, on) {
		return this.asFrom().rightSemijoin(other, on);
	}
	leftSemijoin(other, on) {
		return this.asFrom().leftSemijoin(other, on);
	}
	build() {
		return this.asFrom().build();
	}
	toSql() {
		return this.asFrom().toSql();
	}
	where(predicate) {
		return this.asFrom().where(predicate);
	}
};
function createTableRefFromDef(tableDef) {
	return new TableRefImpl(tableDef);
}
function makeQueryBuilder(schema2) {
	const qb = /* @__PURE__ */ Object.create(null);
	for (const table2 of schema2.tables) {
		const ref = createTableRefFromDef(table2);
		qb[table2.name] = ref;
	}
	return Object.freeze(qb);
}
function createRowExpr(tableDef) {
	const row = {};
	for (const columnName of Object.keys(tableDef.columns)) {
		const columnBuilder = tableDef.columns[columnName];
		const column = new ColumnExpression(tableDef.name, columnName, columnBuilder.typeBuilder.algebraicType);
		row[columnName] = Object.freeze(column);
	}
	return Object.freeze(row);
}
function renderSelectSqlWithJoins(table2, where, extraClauses = []) {
	const sql = `SELECT * FROM ${quoteIdentifier(table2.name)}`;
	const clauses = [];
	if (where) clauses.push(booleanExprToSql(where));
	clauses.push(...extraClauses);
	if (clauses.length === 0) return sql;
	return `${sql} WHERE ${clauses.length === 1 ? clauses[0] : clauses.map(wrapInParens).join(" AND ")}`;
}
var ColumnExpression = class {
	type = "column";
	column;
	table;
	tsValueType;
	spacetimeType;
	constructor(table2, column, spacetimeType) {
		this.table = table2;
		this.column = column;
		this.spacetimeType = spacetimeType;
	}
	eq(x) {
		return {
			type: "eq",
			left: this,
			right: normalizeValue(x)
		};
	}
	lt(x) {
		return {
			type: "lt",
			left: this,
			right: normalizeValue(x)
		};
	}
	lte(x) {
		return {
			type: "lte",
			left: this,
			right: normalizeValue(x)
		};
	}
	gt(x) {
		return {
			type: "gt",
			left: this,
			right: normalizeValue(x)
		};
	}
	gte(x) {
		return {
			type: "gte",
			left: this,
			right: normalizeValue(x)
		};
	}
};
function literal(value) {
	return {
		type: "literal",
		value
	};
}
function normalizeValue(val) {
	if (val.type === "literal") return val;
	if (typeof val === "object" && val != null && "type" in val && val.type === "column") return val;
	return literal(val);
}
function and(...clauses) {
	return {
		type: "and",
		clauses
	};
}
function booleanExprToSql(expr, tableAlias) {
	switch (expr.type) {
		case "eq": return `${valueExprToSql(expr.left)} = ${valueExprToSql(expr.right)}`;
		case "ne": return `${valueExprToSql(expr.left)} <> ${valueExprToSql(expr.right)}`;
		case "gt": return `${valueExprToSql(expr.left)} > ${valueExprToSql(expr.right)}`;
		case "gte": return `${valueExprToSql(expr.left)} >= ${valueExprToSql(expr.right)}`;
		case "lt": return `${valueExprToSql(expr.left)} < ${valueExprToSql(expr.right)}`;
		case "lte": return `${valueExprToSql(expr.left)} <= ${valueExprToSql(expr.right)}`;
		case "and": return expr.clauses.map((c) => booleanExprToSql(c)).map(wrapInParens).join(" AND ");
		case "or": return expr.clauses.map((c) => booleanExprToSql(c)).map(wrapInParens).join(" OR ");
		case "not": return `NOT ${wrapInParens(booleanExprToSql(expr.clause))}`;
	}
}
function wrapInParens(sql) {
	return `(${sql})`;
}
function valueExprToSql(expr, tableAlias) {
	if (isLiteralExpr(expr)) return literalValueToSql(expr.value);
	const table2 = expr.table;
	return `${quoteIdentifier(table2)}.${quoteIdentifier(expr.column)}`;
}
function literalValueToSql(value) {
	if (value === null || value === void 0) return "NULL";
	if (value instanceof Identity || value instanceof ConnectionId) return `0x${value.toHexString()}`;
	switch (typeof value) {
		case "number":
		case "bigint": return String(value);
		case "boolean": return value ? "TRUE" : "FALSE";
		case "string": return `'${value.replace(/'/g, "''")}'`;
		default: return `'${JSON.stringify(value).replace(/'/g, "''")}'`;
	}
}
function quoteIdentifier(name) {
	return `"${name.replace(/"/g, "\"\"")}"`;
}
function isLiteralExpr(expr) {
	return expr.type === "literal";
}
function defineView(opts, anon, params, ret, fn) {
	const paramsBuilder = new RowBuilder(params, toPascalCase(opts.name));
	let returnType = registerTypesRecursively(ret).algebraicType;
	const { value: paramType } = resolveType(MODULE_DEF.typespace, registerTypesRecursively(paramsBuilder));
	MODULE_DEF.miscExports.push({
		tag: "View",
		value: {
			name: opts.name,
			index: (anon ? ANON_VIEWS : VIEWS).length,
			isPublic: opts.public,
			isAnonymous: anon,
			params: paramType,
			returnType
		}
	});
	if (returnType.tag == "Sum") {
		const originalFn = fn;
		fn = ((ctx, args) => {
			const ret2 = originalFn(ctx, args);
			return ret2 == null ? [] : [ret2];
		});
		returnType = AlgebraicType.Array(returnType.value.variants[0].algebraicType);
	}
	(anon ? ANON_VIEWS : VIEWS).push({
		fn,
		params: paramType,
		returnType,
		returnTypeBaseSize: bsatnBaseSize(MODULE_DEF.typespace, returnType)
	});
}
var VIEWS = [];
var ANON_VIEWS = [];
function procedure(name, params, ret, fn) {
	const paramsType = { elements: Object.entries(params).map(([n, c]) => ({
		name: n,
		algebraicType: registerTypesRecursively("typeBuilder" in c ? c.typeBuilder : c).algebraicType
	})) };
	const returnType = registerTypesRecursively(ret).algebraicType;
	MODULE_DEF.miscExports.push({
		tag: "Procedure",
		value: {
			name,
			params: paramsType,
			returnType
		}
	});
	PROCEDURES.push({
		fn,
		paramsType,
		returnType,
		returnTypeBaseSize: bsatnBaseSize(MODULE_DEF.typespace, returnType)
	});
}
var PROCEDURES = [];
var REGISTERED_SCHEMA = null;
function getRegisteredSchema() {
	if (REGISTERED_SCHEMA == null) throw new Error("Schema has not been registered yet. Call schema() first.");
	return REGISTERED_SCHEMA;
}
function tablesToSchema(tables) {
	return { tables: tables.map(tableToSchema) };
}
function tableToSchema(schema2) {
	const getColName = (i) => schema2.rowType.algebraicType.value.elements[i].name;
	return {
		name: schema2.tableName,
		accessorName: toCamelCase(schema2.tableName),
		columns: schema2.rowType.row,
		rowType: schema2.rowSpacetimeType,
		constraints: schema2.tableDef.constraints.map((c) => ({
			name: c.name,
			constraint: "unique",
			columns: c.data.value.columns.map(getColName)
		})),
		indexes: schema2.tableDef.indexes.map((idx) => {
			const columnIds = idx.algorithm.tag === "Direct" ? [idx.algorithm.value] : idx.algorithm.value;
			return {
				name: idx.accessorName,
				unique: schema2.tableDef.constraints.some((c) => c.data.value.columns.every((col) => columnIds.includes(col))),
				algorithm: idx.algorithm.tag.toLowerCase(),
				columns: columnIds.map(getColName)
			};
		})
	};
}
var MODULE_DEF = {
	typespace: { types: [] },
	tables: [],
	reducers: [],
	types: [],
	miscExports: [],
	rowLevelSecurity: []
};
var COMPOUND_TYPES = /* @__PURE__ */ new Map();
function resolveType(typespace, typeBuilder) {
	let ty = typeBuilder.algebraicType;
	while (ty.tag === "Ref") ty = typespace.types[ty.value];
	return ty;
}
function registerTypesRecursively(typeBuilder) {
	if (typeBuilder instanceof ProductBuilder && !isUnit(typeBuilder) || typeBuilder instanceof SumBuilder || typeBuilder instanceof RowBuilder) return registerCompoundTypeRecursively(typeBuilder);
	else if (typeBuilder instanceof OptionBuilder) return new OptionBuilder(registerTypesRecursively(typeBuilder.value));
	else if (typeBuilder instanceof ResultBuilder) return new ResultBuilder(registerTypesRecursively(typeBuilder.ok), registerTypesRecursively(typeBuilder.err));
	else if (typeBuilder instanceof ArrayBuilder) return new ArrayBuilder(registerTypesRecursively(typeBuilder.element));
	else return typeBuilder;
}
function registerCompoundTypeRecursively(typeBuilder) {
	const ty = typeBuilder.algebraicType;
	const name = typeBuilder.typeName;
	if (name === void 0) throw new Error(`Missing type name for ${typeBuilder.constructor.name ?? "TypeBuilder"} ${JSON.stringify(typeBuilder)}`);
	let r = COMPOUND_TYPES.get(ty);
	if (r != null) return r;
	const newTy = typeBuilder instanceof RowBuilder || typeBuilder instanceof ProductBuilder ? {
		tag: "Product",
		value: { elements: [] }
	} : {
		tag: "Sum",
		value: { variants: [] }
	};
	r = new RefBuilder(MODULE_DEF.typespace.types.length);
	MODULE_DEF.typespace.types.push(newTy);
	COMPOUND_TYPES.set(ty, r);
	if (typeBuilder instanceof RowBuilder) for (const [name2, elem] of Object.entries(typeBuilder.row)) newTy.value.elements.push({
		name: name2,
		algebraicType: registerTypesRecursively(elem.typeBuilder).algebraicType
	});
	else if (typeBuilder instanceof ProductBuilder) for (const [name2, elem] of Object.entries(typeBuilder.elements)) newTy.value.elements.push({
		name: name2,
		algebraicType: registerTypesRecursively(elem).algebraicType
	});
	else if (typeBuilder instanceof SumBuilder) for (const [name2, variant] of Object.entries(typeBuilder.variants)) newTy.value.variants.push({
		name: name2,
		algebraicType: registerTypesRecursively(variant).algebraicType
	});
	MODULE_DEF.types.push({
		name: splitName(name),
		ty: r.ref,
		customOrdering: true
	});
	return r;
}
function isUnit(typeBuilder) {
	return typeBuilder.typeName == null && typeBuilder.algebraicType.value.elements.length === 0;
}
function splitName(name) {
	const scope = name.split(".");
	return {
		name: scope.pop(),
		scope
	};
}
var Schema = class {
	tablesDef;
	typespace;
	schemaType;
	constructor(tables, typespace, handles) {
		this.tablesDef = { tables };
		this.typespace = typespace;
		this.schemaType = tablesToSchema(handles);
	}
	reducer(name, paramsOrFn, fn) {
		if (typeof paramsOrFn === "function") {
			reducer(name, {}, paramsOrFn);
			return paramsOrFn;
		} else {
			reducer(name, paramsOrFn, fn);
			return fn;
		}
	}
	init(nameOrFn, maybeFn) {
		const [name, fn] = typeof nameOrFn === "string" ? [nameOrFn, maybeFn] : ["init", nameOrFn];
		init(name, {}, fn);
	}
	clientConnected(nameOrFn, maybeFn) {
		const [name, fn] = typeof nameOrFn === "string" ? [nameOrFn, maybeFn] : ["on_connect", nameOrFn];
		clientConnected(name, {}, fn);
	}
	clientDisconnected(nameOrFn, maybeFn) {
		const [name, fn] = typeof nameOrFn === "string" ? [nameOrFn, maybeFn] : ["on_disconnect", nameOrFn];
		clientDisconnected(name, {}, fn);
	}
	view(opts, ret, fn) {
		defineView(opts, false, {}, ret, fn);
	}
	anonymousView(opts, ret, fn) {
		defineView(opts, true, {}, ret, fn);
	}
	procedure(name, paramsOrRet, retOrFn, maybeFn) {
		if (typeof retOrFn === "function") {
			procedure(name, {}, paramsOrRet, retOrFn);
			return retOrFn;
		} else {
			procedure(name, paramsOrRet, retOrFn, maybeFn);
			return maybeFn;
		}
	}
	clientVisibilityFilter = { sql(filter) {
		MODULE_DEF.rowLevelSecurity.push({ sql: filter });
	} };
};
function schema(...args) {
	const handles = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
	const tableDefs = handles.map((h) => h.tableDef);
	MODULE_DEF.tables.push(...tableDefs);
	REGISTERED_SCHEMA = { tables: handles.map((handle) => ({
		name: handle.tableName,
		accessorName: handle.tableName,
		columns: handle.rowType.row,
		rowType: handle.rowSpacetimeType,
		indexes: handle.idxs,
		constraints: handle.constraints
	})) };
	return new Schema(tableDefs, MODULE_DEF.typespace, handles);
}
var raw_index_algorithm_type_default = t.enum("RawIndexAlgorithm", {
	BTree: t.array(t.u16()),
	Hash: t.array(t.u16()),
	Direct: t.u16()
});
function table(opts, row, ..._) {
	const { name, public: isPublic = false, indexes: userIndexes = [], scheduled } = opts;
	const colIds = /* @__PURE__ */ new Map();
	const colNameList = [];
	if (!(row instanceof RowBuilder)) row = new RowBuilder(row);
	if (row.typeName === void 0) row.typeName = toPascalCase(name);
	const rowTypeRef = registerTypesRecursively(row);
	row.algebraicType.value.elements.forEach((elem, i) => {
		colIds.set(elem.name, i);
		colNameList.push(elem.name);
	});
	const pk = [];
	const indexes = [];
	const constraints = [];
	const sequences = [];
	let scheduleAtCol;
	for (const [name2, builder] of Object.entries(row.row)) {
		const meta = builder.columnMetadata;
		if (meta.isPrimaryKey) pk.push(colIds.get(name2));
		const isUnique = meta.isUnique || meta.isPrimaryKey;
		if (meta.indexType || isUnique) {
			const algo = meta.indexType ?? "btree";
			const id = colIds.get(name2);
			let algorithm;
			switch (algo) {
				case "btree":
					algorithm = raw_index_algorithm_type_default.BTree([id]);
					break;
				case "direct":
					algorithm = raw_index_algorithm_type_default.Direct(id);
					break;
			}
			indexes.push({
				name: void 0,
				accessorName: name2,
				algorithm
			});
		}
		if (isUnique) constraints.push({
			name: void 0,
			data: {
				tag: "Unique",
				value: { columns: [colIds.get(name2)] }
			}
		});
		if (meta.isAutoIncrement) sequences.push({
			name: void 0,
			start: void 0,
			minValue: void 0,
			maxValue: void 0,
			column: colIds.get(name2),
			increment: 1n
		});
		if (scheduled) {
			const algebraicType = builder.typeBuilder.algebraicType;
			if (schedule_at_default.isScheduleAt(algebraicType)) scheduleAtCol = colIds.get(name2);
		}
	}
	for (const indexOpts of userIndexes ?? []) {
		let algorithm;
		switch (indexOpts.algorithm) {
			case "btree":
				algorithm = {
					tag: "BTree",
					value: indexOpts.columns.map((c) => colIds.get(c))
				};
				break;
			case "direct":
				algorithm = {
					tag: "Direct",
					value: colIds.get(indexOpts.column)
				};
				break;
		}
		indexes.push({
			name: void 0,
			accessorName: indexOpts.name,
			algorithm
		});
	}
	for (const constraintOpts of opts.constraints ?? []) if (constraintOpts.constraint === "unique") {
		const data = {
			tag: "Unique",
			value: { columns: constraintOpts.columns.map((c) => colIds.get(c)) }
		};
		constraints.push({
			name: constraintOpts.name,
			data
		});
		continue;
	}
	for (const index of indexes) index.name = `${name}_${(index.algorithm.tag === "Direct" ? [index.algorithm.value] : index.algorithm.value).map((i) => colNameList[i]).join("_")}_idx_${index.algorithm.tag.toLowerCase()}`;
	const tableDef = {
		name,
		productTypeRef: rowTypeRef.ref,
		primaryKey: pk,
		indexes,
		constraints,
		sequences,
		schedule: scheduled && scheduleAtCol !== void 0 ? {
			name: void 0,
			reducerName: scheduled,
			scheduledAtColumn: scheduleAtCol
		} : void 0,
		tableType: { tag: "User" },
		tableAccess: { tag: isPublic ? "Public" : "Private" }
	};
	const productType = row.algebraicType.value;
	return {
		rowType: row,
		tableName: name,
		rowSpacetimeType: productType,
		tableDef,
		idxs: {},
		constraints
	};
}
var SpacetimeHostError = class _SpacetimeHostError extends Error {
	code;
	message;
	constructor(code, message) {
		super();
		const proto = Object.getPrototypeOf(this);
		let cls;
		if (errorProtoypes.has(proto)) {
			cls = proto.constructor;
			if (code !== cls.CODE) throw new TypeError(`invalid error code for ${cls.name}`);
		} else if (proto === _SpacetimeHostError.prototype) {
			cls = errnoToClass.get(code);
			if (!cls) throw new RangeError(`unknown error code ${code}`);
		} else throw new TypeError("cannot subclass SpacetimeError");
		Object.setPrototypeOf(this, cls.prototype);
		this.code = cls.CODE;
		this.message = message ?? cls.MESSAGE;
	}
	get name() {
		return errnoToClass.get(this.code)?.name ?? "SpacetimeHostError";
	}
};
var SenderError = class extends Error {
	constructor(message) {
		super(message);
	}
	get name() {
		return "SenderError";
	}
};
var errorData = {
	HostCallFailure: [1, "ABI called by host returned an error"],
	NotInTransaction: [2, "ABI call can only be made while in a transaction"],
	BsatnDecodeError: [3, "Couldn't decode the BSATN to the expected type"],
	NoSuchTable: [4, "No such table"],
	NoSuchIndex: [5, "No such index"],
	NoSuchIter: [6, "The provided row iterator is not valid"],
	NoSuchConsoleTimer: [7, "The provided console timer does not exist"],
	NoSuchBytes: [8, "The provided bytes source or sink is not valid"],
	NoSpace: [9, "The provided sink has no more space left"],
	BufferTooSmall: [11, "The provided buffer is not large enough to store the data"],
	UniqueAlreadyExists: [12, "Value with given unique identifier already exists"],
	ScheduleAtDelayTooLong: [13, "Specified delay in scheduling row was too long"],
	IndexNotUnique: [14, "The index was not unique"],
	NoSuchRow: [15, "The row was not found, e.g., in an update call"],
	AutoIncOverflow: [16, "The auto-increment sequence overflowed"],
	WouldBlockTransaction: [17, "Attempted async or blocking op while holding open a transaction"],
	TransactionNotAnonymous: [18, "Not in an anonymous transaction. Called by a reducer?"],
	TransactionIsReadOnly: [19, "ABI call can only be made while within a mutable transaction"],
	TransactionIsMut: [20, "ABI call can only be made while within a read-only transaction"],
	HttpError: [21, "The HTTP request failed"]
};
function mapEntries(x, f) {
	return Object.fromEntries(Object.entries(x).map(([k, v]) => [k, f(k, v)]));
}
var errors = Object.freeze(mapEntries(errorData, (name, [code, message]) => Object.defineProperty(class extends SpacetimeHostError {
	static CODE = code;
	static MESSAGE = message;
	constructor() {
		super(code);
	}
}, "name", {
	value: name,
	writable: false
})));
var errorProtoypes = new Set(Object.values(errors).map((cls) => cls.prototype));
var errnoToClass = new Map(Object.values(errors).map((cls) => [cls.CODE, cls]));
var SBigInt = typeof BigInt !== "undefined" ? BigInt : void 0;
var One = typeof BigInt !== "undefined" ? BigInt(1) : void 0;
var ThirtyTwo = typeof BigInt !== "undefined" ? BigInt(32) : void 0;
var NumValues = typeof BigInt !== "undefined" ? BigInt(4294967296) : void 0;
function unsafeUniformBigIntDistribution(from2, to, rng) {
	var diff = to - from2 + One;
	var FinalNumValues = NumValues;
	var NumIterations = 1;
	while (FinalNumValues < diff) {
		FinalNumValues <<= ThirtyTwo;
		++NumIterations;
	}
	var value = generateNext(NumIterations, rng);
	if (value < diff) return value + from2;
	if (value + diff < FinalNumValues) return value % diff + from2;
	var MaxAcceptedRandom = FinalNumValues - FinalNumValues % diff;
	while (value >= MaxAcceptedRandom) value = generateNext(NumIterations, rng);
	return value % diff + from2;
}
function generateNext(NumIterations, rng) {
	var value = SBigInt(rng.unsafeNext() + 2147483648);
	for (var num = 1; num < NumIterations; ++num) {
		var out = rng.unsafeNext();
		value = (value << ThirtyTwo) + SBigInt(out + 2147483648);
	}
	return value;
}
function unsafeUniformIntDistributionInternal(rangeSize, rng) {
	var MaxAllowed = rangeSize > 2 ? ~~(4294967296 / rangeSize) * rangeSize : 4294967296;
	var deltaV = rng.unsafeNext() + 2147483648;
	while (deltaV >= MaxAllowed) deltaV = rng.unsafeNext() + 2147483648;
	return deltaV % rangeSize;
}
function fromNumberToArrayInt64(out, n) {
	if (n < 0) {
		var posN = -n;
		out.sign = -1;
		out.data[0] = ~~(posN / 4294967296);
		out.data[1] = posN >>> 0;
	} else {
		out.sign = 1;
		out.data[0] = ~~(n / 4294967296);
		out.data[1] = n >>> 0;
	}
	return out;
}
function substractArrayInt64(out, arrayIntA, arrayIntB) {
	var lowA = arrayIntA.data[1];
	var highA = arrayIntA.data[0];
	var signA = arrayIntA.sign;
	var lowB = arrayIntB.data[1];
	var highB = arrayIntB.data[0];
	var signB = arrayIntB.sign;
	out.sign = 1;
	if (signA === 1 && signB === -1) {
		var low_1 = lowA + lowB;
		var high = highA + highB + (low_1 > 4294967295 ? 1 : 0);
		out.data[0] = high >>> 0;
		out.data[1] = low_1 >>> 0;
		return out;
	}
	var lowFirst = lowA;
	var highFirst = highA;
	var lowSecond = lowB;
	var highSecond = highB;
	if (signA === -1) {
		lowFirst = lowB;
		highFirst = highB;
		lowSecond = lowA;
		highSecond = highA;
	}
	var reminderLow = 0;
	var low = lowFirst - lowSecond;
	if (low < 0) {
		reminderLow = 1;
		low = low >>> 0;
	}
	out.data[0] = highFirst - highSecond - reminderLow;
	out.data[1] = low;
	return out;
}
function unsafeUniformArrayIntDistributionInternal(out, rangeSize, rng) {
	var rangeLength = rangeSize.length;
	while (true) {
		for (var index = 0; index !== rangeLength; ++index) out[index] = unsafeUniformIntDistributionInternal(index === 0 ? rangeSize[0] + 1 : 4294967296, rng);
		for (var index = 0; index !== rangeLength; ++index) {
			var current = out[index];
			var currentInRange = rangeSize[index];
			if (current < currentInRange) return out;
			else if (current > currentInRange) break;
		}
	}
}
var safeNumberMaxSafeInteger = Number.MAX_SAFE_INTEGER;
var sharedA = {
	sign: 1,
	data: [0, 0]
};
var sharedB = {
	sign: 1,
	data: [0, 0]
};
var sharedC = {
	sign: 1,
	data: [0, 0]
};
var sharedData = [0, 0];
function uniformLargeIntInternal(from2, to, rangeSize, rng) {
	var rangeSizeArrayIntValue = rangeSize <= safeNumberMaxSafeInteger ? fromNumberToArrayInt64(sharedC, rangeSize) : substractArrayInt64(sharedC, fromNumberToArrayInt64(sharedA, to), fromNumberToArrayInt64(sharedB, from2));
	if (rangeSizeArrayIntValue.data[1] === 4294967295) {
		rangeSizeArrayIntValue.data[0] += 1;
		rangeSizeArrayIntValue.data[1] = 0;
	} else rangeSizeArrayIntValue.data[1] += 1;
	unsafeUniformArrayIntDistributionInternal(sharedData, rangeSizeArrayIntValue.data, rng);
	return sharedData[0] * 4294967296 + sharedData[1] + from2;
}
function unsafeUniformIntDistribution(from2, to, rng) {
	var rangeSize = to - from2;
	if (rangeSize <= 4294967295) return unsafeUniformIntDistributionInternal(rangeSize + 1, rng) + from2;
	return uniformLargeIntInternal(from2, to, rangeSize, rng);
}
var XoroShiro128Plus = (function() {
	function XoroShiro128Plus2(s01, s00, s11, s10) {
		this.s01 = s01;
		this.s00 = s00;
		this.s11 = s11;
		this.s10 = s10;
	}
	XoroShiro128Plus2.prototype.clone = function() {
		return new XoroShiro128Plus2(this.s01, this.s00, this.s11, this.s10);
	};
	XoroShiro128Plus2.prototype.next = function() {
		var nextRng = new XoroShiro128Plus2(this.s01, this.s00, this.s11, this.s10);
		return [nextRng.unsafeNext(), nextRng];
	};
	XoroShiro128Plus2.prototype.unsafeNext = function() {
		var out = this.s00 + this.s10 | 0;
		var a0 = this.s10 ^ this.s00;
		var a1 = this.s11 ^ this.s01;
		var s00 = this.s00;
		var s01 = this.s01;
		this.s00 = s00 << 24 ^ s01 >>> 8 ^ a0 ^ a0 << 16;
		this.s01 = s01 << 24 ^ s00 >>> 8 ^ a1 ^ (a1 << 16 | a0 >>> 16);
		this.s10 = a1 << 5 ^ a0 >>> 27;
		this.s11 = a0 << 5 ^ a1 >>> 27;
		return out;
	};
	XoroShiro128Plus2.prototype.jump = function() {
		var nextRng = new XoroShiro128Plus2(this.s01, this.s00, this.s11, this.s10);
		nextRng.unsafeJump();
		return nextRng;
	};
	XoroShiro128Plus2.prototype.unsafeJump = function() {
		var ns01 = 0;
		var ns00 = 0;
		var ns11 = 0;
		var ns10 = 0;
		var jump = [
			3639956645,
			3750757012,
			1261568508,
			386426335
		];
		for (var i = 0; i !== 4; ++i) for (var mask = 1; mask; mask <<= 1) {
			if (jump[i] & mask) {
				ns01 ^= this.s01;
				ns00 ^= this.s00;
				ns11 ^= this.s11;
				ns10 ^= this.s10;
			}
			this.unsafeNext();
		}
		this.s01 = ns01;
		this.s00 = ns00;
		this.s11 = ns11;
		this.s10 = ns10;
	};
	XoroShiro128Plus2.prototype.getState = function() {
		return [
			this.s01,
			this.s00,
			this.s11,
			this.s10
		];
	};
	return XoroShiro128Plus2;
})();
function fromState(state) {
	if (!(state.length === 4)) throw new Error("The state must have been produced by a xoroshiro128plus RandomGenerator");
	return new XoroShiro128Plus(state[0], state[1], state[2], state[3]);
}
var xoroshiro128plus = Object.assign(function(seed) {
	return new XoroShiro128Plus(-1, ~seed, seed | 0, 0);
}, { fromState });
var { asUintN } = BigInt;
function pcg32(state) {
	state = asUintN(64, state * 6364136223846793005n + 11634580027462260723n);
	const xorshifted = Number(asUintN(32, (state >> 18n ^ state) >> 27n));
	const rot = Number(asUintN(32, state >> 59n));
	return xorshifted >> rot | xorshifted << 32 - rot;
}
function generateFloat64(rng) {
	const g1 = unsafeUniformIntDistribution(0, (1 << 26) - 1, rng);
	const g2 = unsafeUniformIntDistribution(0, (1 << 27) - 1, rng);
	return (g1 * Math.pow(2, 27) + g2) * Math.pow(2, -53);
}
function makeRandom(seed) {
	const rng = xoroshiro128plus(pcg32(seed.microsSinceUnixEpoch));
	const random = () => generateFloat64(rng);
	random.fill = (array) => {
		const elem = array.at(0);
		if (typeof elem === "bigint") {
			const upper = (1n << BigInt(array.BYTES_PER_ELEMENT * 8)) - 1n;
			for (let i = 0; i < array.length; i++) array[i] = unsafeUniformBigIntDistribution(0n, upper, rng);
		} else if (typeof elem === "number") {
			const upper = (1 << array.BYTES_PER_ELEMENT * 8) - 1;
			for (let i = 0; i < array.length; i++) array[i] = unsafeUniformIntDistribution(0, upper, rng);
		}
		return array;
	};
	random.uint32 = () => rng.unsafeNext();
	random.integerInRange = (min, max) => unsafeUniformIntDistribution(min, max, rng);
	random.bigintInRange = (min, max) => unsafeUniformBigIntDistribution(min, max, rng);
	return random;
}
__toESM(require_text_min());
var sum_type_variant_type_default = t.object("SumTypeVariant", {
	name: t.option(t.string()),
	get algebraicType() {
		return algebraic_type_type_default;
	}
});
var sum_type_type_default = t.object("SumType", { get variants() {
	return t.array(sum_type_variant_type_default);
} });
var product_type_element_type_default = t.object("ProductTypeElement", {
	name: t.option(t.string()),
	get algebraicType() {
		return algebraic_type_type_default;
	}
});
var product_type_type_default = t.object("ProductType", { get elements() {
	return t.array(product_type_element_type_default);
} });
var AlgebraicType2 = t.enum("AlgebraicType", {
	Ref: t.u32(),
	get Sum() {
		return sum_type_type_default;
	},
	get Product() {
		return product_type_type_default;
	},
	get Array() {
		return AlgebraicType2;
	},
	String: t.unit(),
	Bool: t.unit(),
	I8: t.unit(),
	U8: t.unit(),
	I16: t.unit(),
	U16: t.unit(),
	I32: t.unit(),
	U32: t.unit(),
	I64: t.unit(),
	U64: t.unit(),
	I128: t.unit(),
	U128: t.unit(),
	I256: t.unit(),
	U256: t.unit(),
	F32: t.unit(),
	F64: t.unit()
});
var algebraic_type_type_default = AlgebraicType2;
var typespace_type_default = t.object("Typespace", { get types() {
	return t.array(algebraic_type_type_default);
} });
var raw_column_def_v_8_type_default = t.object("RawColumnDefV8", {
	colName: t.string(),
	get colType() {
		return algebraic_type_type_default;
	}
});
var index_type_type_default = t.enum("IndexType", {
	BTree: t.unit(),
	Hash: t.unit()
});
var raw_index_def_v_8_type_default = t.object("RawIndexDefV8", {
	indexName: t.string(),
	isUnique: t.bool(),
	get indexType() {
		return index_type_type_default;
	},
	columns: t.array(t.u16())
});
var raw_constraint_def_v_8_type_default = t.object("RawConstraintDefV8", {
	constraintName: t.string(),
	constraints: t.u8(),
	columns: t.array(t.u16())
});
var raw_sequence_def_v_8_type_default = t.object("RawSequenceDefV8", {
	sequenceName: t.string(),
	colPos: t.u16(),
	increment: t.i128(),
	start: t.option(t.i128()),
	minValue: t.option(t.i128()),
	maxValue: t.option(t.i128()),
	allocated: t.i128()
});
var raw_table_def_v_8_type_default = t.object("RawTableDefV8", {
	tableName: t.string(),
	get columns() {
		return t.array(raw_column_def_v_8_type_default);
	},
	get indexes() {
		return t.array(raw_index_def_v_8_type_default);
	},
	get constraints() {
		return t.array(raw_constraint_def_v_8_type_default);
	},
	get sequences() {
		return t.array(raw_sequence_def_v_8_type_default);
	},
	tableType: t.string(),
	tableAccess: t.string(),
	scheduled: t.option(t.string())
});
var table_desc_type_default = t.object("TableDesc", {
	get schema() {
		return raw_table_def_v_8_type_default;
	},
	data: t.u32()
});
var reducer_def_type_default = t.object("ReducerDef", {
	name: t.string(),
	get args() {
		return t.array(product_type_element_type_default);
	}
});
var type_alias_type_default = t.object("TypeAlias", {
	name: t.string(),
	ty: t.u32()
});
var misc_module_export_type_default = t.enum("MiscModuleExport", { get TypeAlias() {
	return type_alias_type_default;
} });
var raw_module_def_v_8_type_default = t.object("RawModuleDefV8", {
	get typespace() {
		return typespace_type_default;
	},
	get tables() {
		return t.array(table_desc_type_default);
	},
	get reducers() {
		return t.array(reducer_def_type_default);
	},
	get miscExports() {
		return t.array(misc_module_export_type_default);
	}
});
var raw_index_def_v_9_type_default = t.object("RawIndexDefV9", {
	name: t.option(t.string()),
	accessorName: t.option(t.string()),
	get algorithm() {
		return raw_index_algorithm_type_default;
	}
});
var raw_unique_constraint_data_v_9_type_default = t.object("RawUniqueConstraintDataV9", { columns: t.array(t.u16()) });
var raw_constraint_data_v_9_type_default = t.enum("RawConstraintDataV9", { get Unique() {
	return raw_unique_constraint_data_v_9_type_default;
} });
var raw_constraint_def_v_9_type_default = t.object("RawConstraintDefV9", {
	name: t.option(t.string()),
	get data() {
		return raw_constraint_data_v_9_type_default;
	}
});
var raw_sequence_def_v_9_type_default = t.object("RawSequenceDefV9", {
	name: t.option(t.string()),
	column: t.u16(),
	start: t.option(t.i128()),
	minValue: t.option(t.i128()),
	maxValue: t.option(t.i128()),
	increment: t.i128()
});
var raw_schedule_def_v_9_type_default = t.object("RawScheduleDefV9", {
	name: t.option(t.string()),
	reducerName: t.string(),
	scheduledAtColumn: t.u16()
});
var table_type_type_default = t.enum("TableType", {
	System: t.unit(),
	User: t.unit()
});
var table_access_type_default = t.enum("TableAccess", {
	Public: t.unit(),
	Private: t.unit()
});
var raw_table_def_v_9_type_default = t.object("RawTableDefV9", {
	name: t.string(),
	productTypeRef: t.u32(),
	primaryKey: t.array(t.u16()),
	get indexes() {
		return t.array(raw_index_def_v_9_type_default);
	},
	get constraints() {
		return t.array(raw_constraint_def_v_9_type_default);
	},
	get sequences() {
		return t.array(raw_sequence_def_v_9_type_default);
	},
	get schedule() {
		return t.option(raw_schedule_def_v_9_type_default);
	},
	get tableType() {
		return table_type_type_default;
	},
	get tableAccess() {
		return table_access_type_default;
	}
});
var raw_reducer_def_v_9_type_default = t.object("RawReducerDefV9", {
	name: t.string(),
	get params() {
		return product_type_type_default;
	},
	get lifecycle() {
		return t.option(lifecycle_type_default);
	}
});
var raw_scoped_type_name_v_9_type_default = t.object("RawScopedTypeNameV9", {
	scope: t.array(t.string()),
	name: t.string()
});
var raw_type_def_v_9_type_default = t.object("RawTypeDefV9", {
	get name() {
		return raw_scoped_type_name_v_9_type_default;
	},
	ty: t.u32(),
	customOrdering: t.bool()
});
var raw_column_default_value_v_9_type_default = t.object("RawColumnDefaultValueV9", {
	table: t.string(),
	colId: t.u16(),
	value: t.byteArray()
});
var raw_procedure_def_v_9_type_default = t.object("RawProcedureDefV9", {
	name: t.string(),
	get params() {
		return product_type_type_default;
	},
	get returnType() {
		return algebraic_type_type_default;
	}
});
var raw_view_def_v_9_type_default = t.object("RawViewDefV9", {
	name: t.string(),
	index: t.u32(),
	isPublic: t.bool(),
	isAnonymous: t.bool(),
	get params() {
		return product_type_type_default;
	},
	get returnType() {
		return algebraic_type_type_default;
	}
});
var raw_misc_module_export_v_9_type_default = t.enum("RawMiscModuleExportV9", {
	get ColumnDefaultValue() {
		return raw_column_default_value_v_9_type_default;
	},
	get Procedure() {
		return raw_procedure_def_v_9_type_default;
	},
	get View() {
		return raw_view_def_v_9_type_default;
	}
});
var raw_row_level_security_def_v_9_type_default = t.object("RawRowLevelSecurityDefV9", { sql: t.string() });
var raw_module_def_v_9_type_default = t.object("RawModuleDefV9", {
	get typespace() {
		return typespace_type_default;
	},
	get tables() {
		return t.array(raw_table_def_v_9_type_default);
	},
	get reducers() {
		return t.array(raw_reducer_def_v_9_type_default);
	},
	get types() {
		return t.array(raw_type_def_v_9_type_default);
	},
	get miscExports() {
		return t.array(raw_misc_module_export_v_9_type_default);
	},
	get rowLevelSecurity() {
		return t.array(raw_row_level_security_def_v_9_type_default);
	}
});
var raw_module_def_type_default = t.enum("RawModuleDef", {
	get V8BackCompat() {
		return raw_module_def_v_8_type_default;
	},
	get V9() {
		return raw_module_def_v_9_type_default;
	}
});
var Range = class {
	#from;
	#to;
	constructor(from2, to) {
		this.#from = from2 ?? { tag: "unbounded" };
		this.#to = to ?? { tag: "unbounded" };
	}
	get from() {
		return this.#from;
	}
	get to() {
		return this.#to;
	}
};
var import_statuses = __toESM(require_statuses());
var http_header_pair_type_default = t.object("HttpHeaderPair", {
	name: t.string(),
	value: t.byteArray()
});
var http_headers_type_default = t.object("HttpHeaders", { get entries() {
	return t.array(http_header_pair_type_default);
} });
var http_method_type_default = t.enum("HttpMethod", {
	Get: t.unit(),
	Head: t.unit(),
	Post: t.unit(),
	Put: t.unit(),
	Delete: t.unit(),
	Connect: t.unit(),
	Options: t.unit(),
	Trace: t.unit(),
	Patch: t.unit(),
	Extension: t.string()
});
var http_version_type_default = t.enum("HttpVersion", {
	Http09: t.unit(),
	Http10: t.unit(),
	Http11: t.unit(),
	Http2: t.unit(),
	Http3: t.unit()
});
var http_request_type_default = t.object("HttpRequest", {
	get method() {
		return http_method_type_default;
	},
	get headers() {
		return http_headers_type_default;
	},
	timeout: t.option(t.timeDuration()),
	uri: t.string(),
	get version() {
		return http_version_type_default;
	}
});
var http_response_type_default = t.object("HttpResponse", {
	get headers() {
		return http_headers_type_default;
	},
	get version() {
		return http_version_type_default;
	},
	code: t.u16()
});
var { freeze } = Object;
var textEncoder = new TextEncoder();
var textDecoder = new TextDecoder("utf-8");
var makeResponse = Symbol("makeResponse");
var SyncResponse = class _SyncResponse {
	#body;
	#inner;
	constructor(body, init2) {
		if (body == null) this.#body = null;
		else if (typeof body === "string") this.#body = body;
		else this.#body = new Uint8Array(body).buffer;
		this.#inner = {
			headers: new Headers(init2?.headers),
			status: init2?.status ?? 200,
			statusText: init2?.statusText ?? "",
			type: "default",
			url: null,
			aborted: false
		};
	}
	static [makeResponse](body, inner) {
		const me = new _SyncResponse(body);
		me.#inner = inner;
		return me;
	}
	get headers() {
		return this.#inner.headers;
	}
	get status() {
		return this.#inner.status;
	}
	get statusText() {
		return this.#inner.statusText;
	}
	get ok() {
		return 200 <= this.#inner.status && this.#inner.status <= 299;
	}
	get url() {
		return this.#inner.url ?? "";
	}
	get type() {
		return this.#inner.type;
	}
	arrayBuffer() {
		return this.bytes().buffer;
	}
	bytes() {
		if (this.#body == null) return new Uint8Array();
		else if (typeof this.#body === "string") return textEncoder.encode(this.#body);
		else return new Uint8Array(this.#body);
	}
	json() {
		return JSON.parse(this.text());
	}
	text() {
		if (this.#body == null) return "";
		else if (typeof this.#body === "string") return this.#body;
		else return textDecoder.decode(this.#body);
	}
};
var requestBaseSize = bsatnBaseSize({ types: [] }, http_request_type_default.algebraicType);
var methods = /* @__PURE__ */ new Map([
	["GET", { tag: "Get" }],
	["HEAD", { tag: "Head" }],
	["POST", { tag: "Post" }],
	["PUT", { tag: "Put" }],
	["DELETE", { tag: "Delete" }],
	["CONNECT", { tag: "Connect" }],
	["OPTIONS", { tag: "Options" }],
	["TRACE", { tag: "Trace" }],
	["PATCH", { tag: "Patch" }]
]);
function fetch(url, init2 = {}) {
	const method = methods.get(init2.method?.toUpperCase() ?? "GET") ?? {
		tag: "Extension",
		value: init2.method
	};
	const headers = { entries: headersToList(new Headers(init2.headers)).flatMap(([k, v]) => Array.isArray(v) ? v.map((v2) => [k, v2]) : [[k, v]]).map(([name, value]) => ({
		name,
		value: textEncoder.encode(value)
	})) };
	const uri = "" + url;
	const request = freeze({
		method,
		headers,
		timeout: init2.timeout,
		uri,
		version: { tag: "Http11" }
	});
	const requestBuf = new BinaryWriter(requestBaseSize);
	http_request_type_default.serialize(requestBuf, request);
	const body = init2.body == null ? new Uint8Array() : typeof init2.body === "string" ? init2.body : new Uint8Array(init2.body);
	const [responseBuf, responseBody] = sys.procedure_http_request(requestBuf.getBuffer(), body);
	const response = http_response_type_default.deserialize(new BinaryReader(responseBuf));
	return SyncResponse[makeResponse](responseBody, {
		type: "basic",
		url: uri,
		status: response.code,
		statusText: (0, import_statuses.default)(response.code),
		headers: new Headers(),
		aborted: false
	});
}
freeze(fetch);
var httpClient = freeze({ fetch });
var { freeze: freeze2 } = Object;
function callProcedure(id, sender, connectionId, timestamp, argsBuf) {
	const { fn, paramsType, returnType, returnTypeBaseSize } = PROCEDURES[id];
	const args = ProductType.deserializeValue(new BinaryReader(argsBuf), paramsType, MODULE_DEF.typespace);
	const ctx = {
		sender,
		timestamp,
		connectionId,
		http: httpClient,
		counter_uuid: { value: 0 },
		get identity() {
			return new Identity(sys.identity().__identity__);
		},
		withTx(body) {
			const run = () => {
				const timestamp2 = sys.procedure_start_mut_tx();
				try {
					return body(new ReducerCtxImpl(sender, new Timestamp(timestamp2), connectionId));
				} catch (e) {
					sys.procedure_abort_mut_tx();
					throw e;
				}
			};
			let res = run();
			try {
				sys.procedure_commit_mut_tx();
				return res;
			} catch {}
			console.warn("committing anonymous transaction failed");
			res = run();
			try {
				sys.procedure_commit_mut_tx();
				return res;
			} catch (e) {
				throw new Error("transaction retry failed again", { cause: e });
			}
		},
		newUuidV4() {
			const bytes = crypto.getRandomValues(new Uint8Array(16));
			return Uuid.fromRandomBytesV4(bytes);
		},
		newUuidV7() {
			const bytes = crypto.getRandomValues(new Uint8Array(10));
			return Uuid.fromCounterV7(this.counter_uuid, this.timestamp, bytes);
		}
	};
	freeze2(ctx);
	const ret = callUserFunction(fn, ctx, args);
	const retBuf = new BinaryWriter(returnTypeBaseSize);
	AlgebraicType.serializeValue(retBuf, returnType, ret, MODULE_DEF.typespace);
	return retBuf.getBuffer();
}
var view_result_header_type_default = t.enum("ViewResultHeader", {
	RowData: t.unit(),
	RawSql: t.string()
});
var { freeze: freeze3 } = Object;
var sys = freeze3(wrapSyscalls(_syscalls1_0, _syscalls1_2, _syscalls1_3));
function parseJsonObject(json) {
	let value;
	try {
		value = JSON.parse(json);
	} catch {
		throw new Error("Invalid JSON: failed to parse string");
	}
	if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error("Expected a JSON object at the top level");
	return value;
}
var JwtClaimsImpl = class {
	/**
	* Creates a new JwtClaims instance.
	* @param rawPayload The JWT payload as a raw JSON string.
	* @param identity The identity for this JWT. We are only taking this because we don't have a blake3 implementation (which we need to compute it).
	*/
	constructor(rawPayload, identity) {
		this.rawPayload = rawPayload;
		this.fullPayload = parseJsonObject(rawPayload);
		this._identity = identity;
	}
	fullPayload;
	_identity;
	get identity() {
		return this._identity;
	}
	get subject() {
		return this.fullPayload["sub"];
	}
	get issuer() {
		return this.fullPayload["iss"];
	}
	get audience() {
		const aud = this.fullPayload["aud"];
		if (aud == null) return [];
		return typeof aud === "string" ? [aud] : aud;
	}
};
var AuthCtxImpl = class _AuthCtxImpl {
	isInternal;
	_jwtSource;
	_initializedJWT = false;
	_jwtClaims;
	_senderIdentity;
	constructor(opts) {
		this.isInternal = opts.isInternal;
		this._jwtSource = opts.jwtSource;
		this._senderIdentity = opts.senderIdentity;
	}
	_initializeJWT() {
		if (this._initializedJWT) return;
		this._initializedJWT = true;
		const token = this._jwtSource();
		if (!token) this._jwtClaims = null;
		else this._jwtClaims = new JwtClaimsImpl(token, this._senderIdentity);
		Object.freeze(this);
	}
	/** Lazily compute whether a JWT exists and is parseable. */
	get hasJWT() {
		this._initializeJWT();
		return this._jwtClaims !== null;
	}
	/** Lazily parse the JwtClaims only when accessed. */
	get jwt() {
		this._initializeJWT();
		return this._jwtClaims;
	}
	/** Create a context representing internal (non-user) requests. */
	static internal() {
		return new _AuthCtxImpl({
			isInternal: true,
			jwtSource: () => null,
			senderIdentity: Identity.zero()
		});
	}
	/** If there is a connection id, look up the JWT payload from the system tables. */
	static fromSystemTables(connectionId, sender) {
		if (connectionId === null) return new _AuthCtxImpl({
			isInternal: false,
			jwtSource: () => null,
			senderIdentity: sender
		});
		return new _AuthCtxImpl({
			isInternal: false,
			jwtSource: () => {
				const payloadBuf = sys.get_jwt_payload(connectionId.__connection_id__);
				if (payloadBuf.length === 0) return null;
				return new TextDecoder().decode(payloadBuf);
			},
			senderIdentity: sender
		});
	}
};
var ReducerCtxImpl = class ReducerCtx {
	#identity;
	#senderAuth;
	#uuidCounter;
	#random;
	sender;
	timestamp;
	connectionId;
	db;
	constructor(sender, timestamp, connectionId) {
		Object.seal(this);
		this.sender = sender;
		this.timestamp = timestamp;
		this.connectionId = connectionId;
		this.db = getDbView();
	}
	get identity() {
		return this.#identity ??= new Identity(sys.identity().__identity__);
	}
	get senderAuth() {
		return this.#senderAuth ??= AuthCtxImpl.fromSystemTables(this.connectionId, this.sender);
	}
	get random() {
		return this.#random ??= makeRandom(this.timestamp);
	}
	/**
	* Create a new random {@link Uuid} `v4` using this `ReducerCtx`'s RNG.
	*/
	newUuidV4() {
		const bytes = this.random.fill(new Uint8Array(16));
		return Uuid.fromRandomBytesV4(bytes);
	}
	/**
	* Create a new sortable {@link Uuid} `v7` using this `ReducerCtx`'s RNG, counter,
	* and timestamp.
	*/
	newUuidV7() {
		const bytes = this.random.fill(new Uint8Array(4));
		const counter = this.#uuidCounter ??= { value: 0 };
		return Uuid.fromCounterV7(counter, this.timestamp, bytes);
	}
};
var callUserFunction = function __spacetimedb_end_short_backtrace(fn, ...args) {
	return fn(...args);
};
var hooks = {
	__describe_module__() {
		const writer = new BinaryWriter(128);
		AlgebraicType.serializeValue(writer, raw_module_def_type_default.algebraicType, raw_module_def_type_default.V9(MODULE_DEF));
		return writer.getBuffer();
	},
	__call_reducer__(reducerId, sender, connId, timestamp, argsBuf) {
		const argsType = MODULE_DEF.reducers[reducerId].params;
		const args = ProductType.deserializeValue(new BinaryReader(argsBuf), argsType, MODULE_DEF.typespace);
		const ctx = new ReducerCtxImpl(new Identity(sender), new Timestamp(timestamp), ConnectionId.nullIfZero(new ConnectionId(connId)));
		try {
			return callUserFunction(REDUCERS[reducerId], ctx, args) ?? { tag: "ok" };
		} catch (e) {
			if (e instanceof SenderError) return {
				tag: "err",
				value: e.message
			};
			throw e;
		}
	}
};
var hooks_v1_1 = {
	__call_view__(id, sender, argsBuf) {
		const { fn, params, returnType, returnTypeBaseSize } = VIEWS[id];
		const ret = callUserFunction(fn, freeze3({
			sender: new Identity(sender),
			db: getDbView(),
			from: makeQueryBuilder(getRegisteredSchema())
		}), ProductType.deserializeValue(new BinaryReader(argsBuf), params, MODULE_DEF.typespace));
		const retBuf = new BinaryWriter(returnTypeBaseSize);
		if (isRowTypedQuery(ret)) {
			const query = toSql(ret);
			const v = view_result_header_type_default.RawSql(query);
			AlgebraicType.serializeValue(retBuf, view_result_header_type_default.algebraicType, v, MODULE_DEF.typespace);
			return { data: retBuf.getBuffer() };
		} else {
			AlgebraicType.serializeValue(retBuf, view_result_header_type_default.algebraicType, view_result_header_type_default.RowData, MODULE_DEF.typespace);
			AlgebraicType.serializeValue(retBuf, returnType, ret, MODULE_DEF.typespace);
			return { data: retBuf.getBuffer() };
		}
	},
	__call_view_anon__(id, argsBuf) {
		const { fn, params, returnType, returnTypeBaseSize } = ANON_VIEWS[id];
		const ret = callUserFunction(fn, freeze3({
			db: getDbView(),
			from: makeQueryBuilder(getRegisteredSchema())
		}), ProductType.deserializeValue(new BinaryReader(argsBuf), params, MODULE_DEF.typespace));
		const retBuf = new BinaryWriter(returnTypeBaseSize);
		if (isRowTypedQuery(ret)) {
			const query = toSql(ret);
			const v = view_result_header_type_default.RawSql(query);
			AlgebraicType.serializeValue(retBuf, view_result_header_type_default.algebraicType, v, MODULE_DEF.typespace);
			return { data: retBuf.getBuffer() };
		} else {
			AlgebraicType.serializeValue(retBuf, view_result_header_type_default.algebraicType, view_result_header_type_default.RowData, MODULE_DEF.typespace);
			AlgebraicType.serializeValue(retBuf, returnType, ret, MODULE_DEF.typespace);
			return { data: retBuf.getBuffer() };
		}
	}
};
var hooks_v1_2 = { __call_procedure__(id, sender, connection_id, timestamp, args) {
	return callProcedure(id, new Identity(sender), ConnectionId.nullIfZero(new ConnectionId(connection_id)), new Timestamp(timestamp), args);
} };
var DB_VIEW = null;
function getDbView() {
	DB_VIEW ??= makeDbView(MODULE_DEF);
	return DB_VIEW;
}
function makeDbView(moduleDef) {
	return freeze3(Object.fromEntries(moduleDef.tables.map((table2) => [toCamelCase(table2.name), makeTableView(moduleDef.typespace, table2)])));
}
function makeTableView(typespace, table2) {
	const table_id = sys.table_id_from_name(table2.name);
	const rowType = typespace.types[table2.productTypeRef];
	if (rowType.tag !== "Product") throw "impossible";
	const baseSize = bsatnBaseSize(typespace, rowType);
	const sequences = table2.sequences.map((seq) => {
		const col = rowType.value.elements[seq.column];
		const colType = col.algebraicType;
		let sequenceTrigger;
		switch (colType.tag) {
			case "U8":
			case "I8":
			case "U16":
			case "I16":
			case "U32":
			case "I32":
				sequenceTrigger = 0;
				break;
			case "U64":
			case "I64":
			case "U128":
			case "I128":
			case "U256":
			case "I256":
				sequenceTrigger = 0n;
				break;
			default: throw new TypeError("invalid sequence type");
		}
		return {
			colName: col.name,
			sequenceTrigger,
			read: (reader) => AlgebraicType.deserializeValue(reader, colType, typespace)
		};
	});
	const hasAutoIncrement = sequences.length > 0;
	const iter = () => tableIterator(sys.datastore_table_scan_bsatn(table_id), rowType);
	const integrateGeneratedColumns = hasAutoIncrement ? (row, ret_buf) => {
		const reader = new BinaryReader(ret_buf);
		for (const { colName, read, sequenceTrigger } of sequences) if (row[colName] === sequenceTrigger) row[colName] = read(reader);
	} : null;
	const tableMethods = {
		count: () => sys.datastore_table_row_count(table_id),
		iter,
		[Symbol.iterator]: () => iter(),
		insert: (row) => {
			const writer = new BinaryWriter(baseSize);
			AlgebraicType.serializeValue(writer, rowType, row, typespace);
			const ret_buf = sys.datastore_insert_bsatn(table_id, writer.getBuffer());
			const ret = { ...row };
			integrateGeneratedColumns?.(ret, ret_buf);
			return ret;
		},
		delete: (row) => {
			const writer = new BinaryWriter(4 + baseSize);
			writer.writeU32(1);
			AlgebraicType.serializeValue(writer, rowType, row, typespace);
			return sys.datastore_delete_all_by_eq_bsatn(table_id, writer.getBuffer()) > 0;
		}
	};
	const tableView = Object.assign(/* @__PURE__ */ Object.create(null), tableMethods);
	for (const indexDef of table2.indexes) {
		const index_id = sys.index_id_from_name(indexDef.name);
		let column_ids;
		switch (indexDef.algorithm.tag) {
			case "BTree":
				column_ids = indexDef.algorithm.value;
				break;
			case "Hash": throw new Error("impossible");
			case "Direct":
				column_ids = [indexDef.algorithm.value];
				break;
		}
		const numColumns = column_ids.length;
		const columnSet = new Set(column_ids);
		const isUnique = table2.constraints.filter((x) => x.data.tag === "Unique").some((x) => columnSet.isSubsetOf(new Set(x.data.value.columns)));
		const indexType = AlgebraicType.Product({ elements: column_ids.map((id) => rowType.value.elements[id]) });
		const baseSize2 = bsatnBaseSize(typespace, indexType);
		const serializePrefix = (writer, prefix, prefix_elems) => {
			for (let i = 0; i < prefix_elems; i++) {
				const elemType = indexType.value.elements[i].algebraicType;
				AlgebraicType.serializeValue(writer, elemType, prefix[i], typespace);
			}
			return writer;
		};
		const serializePoint = (colVal) => {
			const writer = new BinaryWriter(baseSize2);
			serializePrefix(writer, colVal, numColumns);
			return writer.getBuffer();
		};
		const singleElement = numColumns === 1 ? indexType.value.elements[0].algebraicType : null;
		const serializeSinglePoint = singleElement && ((colVal) => {
			const writer = new BinaryWriter(baseSize2);
			AlgebraicType.serializeValue(writer, singleElement, colVal, typespace);
			return writer.getBuffer();
		});
		let index;
		if (isUnique && serializeSinglePoint) index = {
			find: (colVal) => {
				const point = serializeSinglePoint(colVal);
				const iter2 = tableIterator(sys.datastore_index_scan_point_bsatn(index_id, point), rowType);
				const { value, done } = iter2.next();
				if (done) return null;
				if (!iter2.next().done) throw new Error("`datastore_index_scan_range_bsatn` on unique field cannot return >1 rows");
				return value;
			},
			delete: (colVal) => {
				const point = serializeSinglePoint(colVal);
				return sys.datastore_delete_by_index_scan_point_bsatn(index_id, point) > 0;
			},
			update: (row) => {
				const writer = new BinaryWriter(baseSize2);
				AlgebraicType.serializeValue(writer, rowType, row, typespace);
				const ret_buf = sys.datastore_update_bsatn(table_id, index_id, writer.getBuffer());
				integrateGeneratedColumns?.(row, ret_buf);
				return row;
			}
		};
		else if (isUnique) index = {
			find: (colVal) => {
				if (colVal.length !== numColumns) throw new TypeError("wrong number of elements");
				const point = serializePoint(colVal);
				const iter2 = tableIterator(sys.datastore_index_scan_point_bsatn(index_id, point), rowType);
				const { value, done } = iter2.next();
				if (done) return null;
				if (!iter2.next().done) throw new Error("`datastore_index_scan_range_bsatn` on unique field cannot return >1 rows");
				return value;
			},
			delete: (colVal) => {
				if (colVal.length !== numColumns) throw new TypeError("wrong number of elements");
				const point = serializePoint(colVal);
				return sys.datastore_delete_by_index_scan_point_bsatn(index_id, point) > 0;
			},
			update: (row) => {
				const writer = new BinaryWriter(baseSize2);
				AlgebraicType.serializeValue(writer, rowType, row, typespace);
				const ret_buf = sys.datastore_update_bsatn(table_id, index_id, writer.getBuffer());
				integrateGeneratedColumns?.(row, ret_buf);
				return row;
			}
		};
		else if (serializeSinglePoint) index = {
			filter: (range) => {
				const point = serializeSinglePoint(range);
				return tableIterator(sys.datastore_index_scan_point_bsatn(index_id, point), rowType);
			},
			delete: (range) => {
				const point = serializeSinglePoint(range);
				return sys.datastore_delete_by_index_scan_point_bsatn(index_id, point);
			}
		};
		else {
			const serializeRange = (range) => {
				if (range.length > numColumns) throw new TypeError("too many elements");
				const writer = new BinaryWriter(baseSize2 + 1);
				const prefix_elems = range.length - 1;
				serializePrefix(writer, range, prefix_elems);
				const rstartOffset = writer.offset;
				const term = range[range.length - 1];
				const termType = indexType.value.elements[range.length - 1].algebraicType;
				let rstart, rend;
				if (term instanceof Range) {
					const writeBound = (bound) => {
						writer.writeU8({
							included: 0,
							excluded: 1,
							unbounded: 2
						}[bound.tag]);
						if (bound.tag !== "unbounded") AlgebraicType.serializeValue(writer, termType, bound.value, typespace);
					};
					writeBound(term.from);
					const rendOffset = writer.offset;
					writeBound(term.to);
					rstart = writer.getBuffer().slice(rstartOffset, rendOffset);
					rend = writer.getBuffer().slice(rendOffset);
				} else {
					writer.writeU8(0);
					AlgebraicType.serializeValue(writer, termType, term, typespace);
					rstart = rend = writer.getBuffer().slice(rstartOffset);
				}
				return [
					writer.getBuffer().slice(0, rstartOffset),
					prefix_elems,
					rstart,
					rend
				];
			};
			index = {
				filter: (range) => {
					if (range.length === numColumns) {
						const point = serializePoint(range);
						return tableIterator(sys.datastore_index_scan_point_bsatn(index_id, point), rowType);
					} else {
						const args = serializeRange(range);
						return tableIterator(sys.datastore_index_scan_range_bsatn(index_id, ...args), rowType);
					}
				},
				delete: (range) => {
					if (range.length === numColumns) {
						const point = serializePoint(range);
						return sys.datastore_delete_by_index_scan_point_bsatn(index_id, point);
					} else {
						const args = serializeRange(range);
						return sys.datastore_delete_by_index_scan_range_bsatn(index_id, ...args);
					}
				}
			};
		}
		if (Object.hasOwn(tableView, indexDef.accessorName)) freeze3(Object.assign(tableView[indexDef.accessorName], index));
		else tableView[indexDef.accessorName] = freeze3(index);
	}
	return freeze3(tableView);
}
function hasOwn(o, k) {
	return Object.hasOwn(o, k);
}
function* tableIterator(id, ty) {
	var _stack = [];
	try {
		const iter = __using(_stack, new IteratorHandle(id));
		const { typespace } = MODULE_DEF;
		let buf;
		while ((buf = advanceIter(iter)) != null) {
			const reader = new BinaryReader(buf);
			while (reader.remaining > 0) yield AlgebraicType.deserializeValue(reader, ty, typespace);
		}
	} catch (_) {
		var _error = _, _hasError = true;
	} finally {
		__callDispose(_stack, _error, _hasError);
	}
}
function advanceIter(iter) {
	let buf_max_len = 65536;
	while (true) try {
		return iter.advance(buf_max_len);
	} catch (e) {
		if (e && typeof e === "object" && hasOwn(e, "__buffer_too_small__")) {
			buf_max_len = e.__buffer_too_small__;
			continue;
		}
		throw e;
	}
}
var IteratorHandle = class _IteratorHandle {
	#id;
	static #finalizationRegistry = new FinalizationRegistry(sys.row_iter_bsatn_close);
	constructor(id) {
		this.#id = id;
		_IteratorHandle.#finalizationRegistry.register(this, id, this);
	}
	/** Unregister this object with the finalization registry and return the id */
	#detach() {
		const id = this.#id;
		this.#id = -1;
		_IteratorHandle.#finalizationRegistry.unregister(this);
		return id;
	}
	/** Call `row_iter_bsatn_advance`, returning null if this iterator was already exhausted. */
	advance(buf_max_len) {
		if (this.#id === -1) return null;
		const { 0: done, 1: buf } = sys.row_iter_bsatn_advance(this.#id, buf_max_len);
		if (done) this.#detach();
		return buf;
	}
	[Symbol.dispose]() {
		if (this.#id >= 0) {
			const id = this.#detach();
			sys.row_iter_bsatn_close(id);
		}
	}
};
function wrapSyscalls(...modules) {
	return Object.fromEntries(modules.flatMap(Object.entries).map(([k, v]) => [k, wrapSyscall(v)]));
}
function wrapSyscall(func) {
	const name = func.name;
	return { [name](...args) {
		try {
			return func(...args);
		} catch (e) {
			if (e !== null && typeof e === "object" && hasOwn(e, "__code_error__") && typeof e.__code_error__ == "number") {
				const message = hasOwn(e, "__error_message__") && typeof e.__error_message__ === "string" ? e.__error_message__ : void 0;
				throw new SpacetimeHostError(e.__code_error__, message);
			}
			throw e;
		}
	} }[name];
}
function fmtLog(...data) {
	return data.join(" ");
}
var console_level_error = 0;
var console_level_warn = 1;
var console_level_info = 2;
var console_level_debug = 3;
var console_level_trace = 4;
var timerMap = /* @__PURE__ */ new Map();
var console2 = {
	__proto__: {},
	[Symbol.toStringTag]: "console",
	assert: (condition = false, ...data) => {
		if (!condition) sys.console_log(console_level_error, fmtLog(...data));
	},
	clear: () => {},
	debug: (...data) => {
		sys.console_log(console_level_debug, fmtLog(...data));
	},
	error: (...data) => {
		sys.console_log(console_level_error, fmtLog(...data));
	},
	info: (...data) => {
		sys.console_log(console_level_info, fmtLog(...data));
	},
	log: (...data) => {
		sys.console_log(console_level_info, fmtLog(...data));
	},
	table: (tabularData, _properties) => {
		sys.console_log(console_level_info, fmtLog(tabularData));
	},
	trace: (...data) => {
		sys.console_log(console_level_trace, fmtLog(...data));
	},
	warn: (...data) => {
		sys.console_log(console_level_warn, fmtLog(...data));
	},
	dir: (_item, _options) => {},
	dirxml: (..._data) => {},
	count: (_label = "default") => {},
	countReset: (_label = "default") => {},
	group: (..._data) => {},
	groupCollapsed: (..._data) => {},
	groupEnd: () => {},
	time: (label = "default") => {
		if (timerMap.has(label)) {
			sys.console_log(console_level_warn, `Timer '${label}' already exists.`);
			return;
		}
		timerMap.set(label, sys.console_timer_start(label));
	},
	timeLog: (label = "default", ...data) => {
		sys.console_log(console_level_info, fmtLog(label, ...data));
	},
	timeEnd: (label = "default") => {
		const spanId = timerMap.get(label);
		if (spanId === void 0) {
			sys.console_log(console_level_warn, `Timer '${label}' does not exist.`);
			return;
		}
		sys.console_timer_end(spanId);
		timerMap.delete(label);
	},
	timeStamp: () => {},
	profile: () => {},
	profileEnd: () => {}
};
console2.Console = console2;
globalThis.console = console2;
register_hooks(hooks);
register_hooks$1(hooks_v1_1);
register_hooks$2(hooks_v1_2);

//#endregion
//#region src/index.ts
const playerTable = table({
	name: "player",
	public: true
}, {
	id: t.string().primaryKey(),
	name: t.string(),
	x: t.f32(),
	y: t.f32(),
	health: t.f32(),
	hunger: t.f32(),
	stamina: t.f32(),
	region: t.string().index(),
	connected: t.bool(),
	lastSeen: t.f64(),
	identity: t.string().index().default("")
});
const inputTable = table({
	name: "player_input",
	public: true
}, {
	id: t.string().primaryKey(),
	keys: t.string(),
	hasMoveTarget: t.bool(),
	moveTargetX: t.f32(),
	moveTargetY: t.f32(),
	hasPointer: t.bool(),
	pointerX: t.f32(),
	pointerY: t.f32(),
	buildActive: t.bool(),
	buildSelected: t.string(),
	buildRotation: t.i32(),
	mode: t.string(),
	inventoryOpen: t.bool(),
	updatedAt: t.f64()
});
const chatTable = table({
	name: "chat",
	public: true
}, {
	id: t.u64().autoInc(),
	sender: t.string().index(),
	message: t.string(),
	time: t.f64()
});
const worldTable = table({
	name: "world",
	public: true
}, {
	id: t.string().primaryKey(),
	seed: t.u32(),
	timeOfDay: t.f32(),
	lastTick: t.f64()
});
const spacetimedb = schema(playerTable, inputTable, chatTable, worldTable);
function nowMillis(ctx) {
	return Number(ctx.timestamp.toMillis());
}
function ensureAuth(ctx) {
	return null;
}
function upsertPlayer(ctx, data) {
	const existing = ctx.db.player.id.find(data.id);
	if (existing) ctx.db.player.id.update({
		...existing,
		...data
	});
	else ctx.db.player.insert(data);
}
function upsertInput(ctx, data) {
	if (!data?.id) return;
	const inputTable$1 = ctx.db.player_input ?? ctx.db.playerInput;
	if (!inputTable$1) return;
	const existing = inputTable$1.id.find(data.id);
	if (existing) inputTable$1.id.update({
		...existing,
		...data
	});
	else inputTable$1.insert(data);
}
spacetimedb.init((ctx) => {
	if (!ctx.db.world.id.find("world")) ctx.db.world.insert({
		id: "world",
		seed: 1337,
		timeOfDay: .25,
		lastTick: nowMillis(ctx)
	});
});
spacetimedb.clientConnected((ctx) => {
	ensureAuth(ctx);
	upsertPlayer(ctx, {
		id: ctx.connectionId?.toHexString?.() ?? ctx.identity.toHexString(),
		identity: ctx.identity.toHexString(),
		name: "Player",
		x: 0,
		y: 0,
		health: 100,
		hunger: 100,
		stamina: 100,
		region: "region-0",
		connected: true,
		lastSeen: nowMillis(ctx)
	});
});
spacetimedb.clientDisconnected((ctx) => {
	const id = ctx.connectionId?.toHexString?.() ?? ctx.identity.toHexString();
	const existing = ctx.db.player.id.find(id);
	if (existing) ctx.db.player.id.update({
		...existing,
		connected: false,
		lastSeen: nowMillis(ctx)
	});
});
spacetimedb.reducer("input_sample", {
	x: t.f32(),
	y: t.f32(),
	health: t.f32(),
	hunger: t.f32(),
	stamina: t.f32(),
	keys: t.string(),
	hasMoveTarget: t.bool(),
	moveTargetX: t.f32(),
	moveTargetY: t.f32(),
	hasPointer: t.bool(),
	pointerX: t.f32(),
	pointerY: t.f32(),
	buildActive: t.bool(),
	buildSelected: t.string(),
	buildRotation: t.i32(),
	mode: t.string(),
	inventoryOpen: t.bool(),
	region: t.string()
}, (ctx, payload) => {
	ensureAuth(ctx);
	const id = ctx.connectionId?.toHexString?.() ?? ctx.identity.toHexString();
	const identity = ctx.identity.toHexString();
	const now = nowMillis(ctx);
	upsertPlayer(ctx, {
		id,
		identity,
		name: "Player",
		x: payload.x,
		y: payload.y,
		health: payload.health,
		hunger: payload.hunger,
		stamina: payload.stamina,
		region: payload.region,
		connected: true,
		lastSeen: now
	});
	upsertInput(ctx, {
		id,
		keys: payload.keys,
		hasMoveTarget: payload.hasMoveTarget,
		moveTargetX: payload.moveTargetX,
		moveTargetY: payload.moveTargetY,
		hasPointer: payload.hasPointer,
		pointerX: payload.pointerX,
		pointerY: payload.pointerY,
		buildActive: payload.buildActive,
		buildSelected: payload.buildSelected,
		buildRotation: payload.buildRotation,
		mode: payload.mode,
		inventoryOpen: payload.inventoryOpen,
		updatedAt: now
	});
});
spacetimedb.reducer("send_chat", { message: t.string() }, (ctx, { message }) => {
	ensureAuth(ctx);
	const id = ctx.identity.toHexString();
	ctx.db.chat.insert({
		sender: id,
		message,
		time: nowMillis(ctx)
	});
});
spacetimedb.reducer("set_seed", { seed: t.u32() }, (ctx, { seed }) => {
	ensureAuth(ctx);
	const existing = ctx.db.world.id.find("world");
	const now = nowMillis(ctx);
	if (existing) ctx.db.world.id.update({
		...existing,
		seed,
		lastTick: now
	});
	else ctx.db.world.insert({
		id: "world",
		seed,
		timeOfDay: .25,
		lastTick: now
	});
});

//#endregion
export { spacetimedb };
//# debugId=25e40b57-82d5-4eac-9b04-4547f035099e
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibmFtZXMiOlsiX19jcmVhdGUiLCJfX2RlZlByb3AiLCJfX2dldE93blByb3BEZXNjIiwiX19nZXRPd25Qcm9wTmFtZXMiLCJfX2dldFByb3RvT2YiLCJfX2hhc093blByb3AiLCJfX2NvbW1vbkpTIiwiX19jb3B5UHJvcHMiLCJfX3RvRVNNIiwiaW5pdCIsIiN2aWV3IiwiI29mZnNldCIsIiNlbnN1cmUiLCIjYnVmZmVyIiwiI2V4cGFuZEJ1ZmZlciIsIiNmcm9tIiwiI3RvIiwiI2JvZHkiLCIjaW5uZXIiLCIjaWRlbnRpdHkiLCIjc2VuZGVyQXV0aCIsIiNyYW5kb20iLCIjdXVpZENvdW50ZXIiLCIjZmluYWxpemF0aW9uUmVnaXN0cnkiLCIjaWQiLCIjZGV0YWNoIiwiaW5wdXRUYWJsZSJdLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9oZWFkZXJzLXBvbHlmaWxsL2xpYi9pbmRleC5tanMiLCJub2RlX21vZHVsZXMvc3BhY2V0aW1lZGIvZGlzdC9zZXJ2ZXIvaW5kZXgubWpzIiwic3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2NyZWF0ZSA9IE9iamVjdC5jcmVhdGU7XG52YXIgX19kZWZQcm9wID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIF9fZ2V0T3duUHJvcERlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIF9fZ2V0T3duUHJvcE5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG52YXIgX19nZXRQcm90b09mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xudmFyIF9faGFzT3duUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgX19jb21tb25KUyA9IChjYiwgbW9kKSA9PiBmdW5jdGlvbiBfX3JlcXVpcmUoKSB7XG4gIHJldHVybiBtb2QgfHwgKDAsIGNiW19fZ2V0T3duUHJvcE5hbWVzKGNiKVswXV0pKChtb2QgPSB7IGV4cG9ydHM6IHt9IH0pLmV4cG9ydHMsIG1vZCksIG1vZC5leHBvcnRzO1xufTtcbnZhciBfX2NvcHlQcm9wcyA9ICh0bywgZnJvbSwgZXhjZXB0LCBkZXNjKSA9PiB7XG4gIGlmIChmcm9tICYmIHR5cGVvZiBmcm9tID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBmcm9tID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBmb3IgKGxldCBrZXkgb2YgX19nZXRPd25Qcm9wTmFtZXMoZnJvbSkpXG4gICAgICBpZiAoIV9faGFzT3duUHJvcC5jYWxsKHRvLCBrZXkpICYmIGtleSAhPT0gZXhjZXB0KVxuICAgICAgICBfX2RlZlByb3AodG8sIGtleSwgeyBnZXQ6ICgpID0+IGZyb21ba2V5XSwgZW51bWVyYWJsZTogIShkZXNjID0gX19nZXRPd25Qcm9wRGVzYyhmcm9tLCBrZXkpKSB8fCBkZXNjLmVudW1lcmFibGUgfSk7XG4gIH1cbiAgcmV0dXJuIHRvO1xufTtcbnZhciBfX3RvRVNNID0gKG1vZCwgaXNOb2RlTW9kZSwgdGFyZ2V0KSA9PiAodGFyZ2V0ID0gbW9kICE9IG51bGwgPyBfX2NyZWF0ZShfX2dldFByb3RvT2YobW9kKSkgOiB7fSwgX19jb3B5UHJvcHMoXG4gIC8vIElmIHRoZSBpbXBvcnRlciBpcyBpbiBub2RlIGNvbXBhdGliaWxpdHkgbW9kZSBvciB0aGlzIGlzIG5vdCBhbiBFU01cbiAgLy8gZmlsZSB0aGF0IGhhcyBiZWVuIGNvbnZlcnRlZCB0byBhIENvbW1vbkpTIGZpbGUgdXNpbmcgYSBCYWJlbC1cbiAgLy8gY29tcGF0aWJsZSB0cmFuc2Zvcm0gKGkuZS4gXCJfX2VzTW9kdWxlXCIgaGFzIG5vdCBiZWVuIHNldCksIHRoZW4gc2V0XG4gIC8vIFwiZGVmYXVsdFwiIHRvIHRoZSBDb21tb25KUyBcIm1vZHVsZS5leHBvcnRzXCIgZm9yIG5vZGUgY29tcGF0aWJpbGl0eS5cbiAgaXNOb2RlTW9kZSB8fCAhbW9kIHx8ICFtb2QuX19lc01vZHVsZSA/IF9fZGVmUHJvcCh0YXJnZXQsIFwiZGVmYXVsdFwiLCB7IHZhbHVlOiBtb2QsIGVudW1lcmFibGU6IHRydWUgfSkgOiB0YXJnZXQsXG4gIG1vZFxuKSk7XG5cbi8vIG5vZGVfbW9kdWxlcy9zZXQtY29va2llLXBhcnNlci9saWIvc2V0LWNvb2tpZS5qc1xudmFyIHJlcXVpcmVfc2V0X2Nvb2tpZSA9IF9fY29tbW9uSlMoe1xuICBcIm5vZGVfbW9kdWxlcy9zZXQtY29va2llLXBhcnNlci9saWIvc2V0LWNvb2tpZS5qc1wiKGV4cG9ydHMsIG1vZHVsZSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIHZhciBkZWZhdWx0UGFyc2VPcHRpb25zID0ge1xuICAgICAgZGVjb2RlVmFsdWVzOiB0cnVlLFxuICAgICAgbWFwOiBmYWxzZSxcbiAgICAgIHNpbGVudDogZmFsc2VcbiAgICB9O1xuICAgIGZ1bmN0aW9uIGlzTm9uRW1wdHlTdHJpbmcoc3RyKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHN0ciA9PT0gXCJzdHJpbmdcIiAmJiAhIXN0ci50cmltKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlU3RyaW5nKHNldENvb2tpZVZhbHVlLCBvcHRpb25zKSB7XG4gICAgICB2YXIgcGFydHMgPSBzZXRDb29raWVWYWx1ZS5zcGxpdChcIjtcIikuZmlsdGVyKGlzTm9uRW1wdHlTdHJpbmcpO1xuICAgICAgdmFyIG5hbWVWYWx1ZVBhaXJTdHIgPSBwYXJ0cy5zaGlmdCgpO1xuICAgICAgdmFyIHBhcnNlZCA9IHBhcnNlTmFtZVZhbHVlUGFpcihuYW1lVmFsdWVQYWlyU3RyKTtcbiAgICAgIHZhciBuYW1lID0gcGFyc2VkLm5hbWU7XG4gICAgICB2YXIgdmFsdWUgPSBwYXJzZWQudmFsdWU7XG4gICAgICBvcHRpb25zID0gb3B0aW9ucyA/IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRQYXJzZU9wdGlvbnMsIG9wdGlvbnMpIDogZGVmYXVsdFBhcnNlT3B0aW9ucztcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhbHVlID0gb3B0aW9ucy5kZWNvZGVWYWx1ZXMgPyBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpIDogdmFsdWU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgXCJzZXQtY29va2llLXBhcnNlciBlbmNvdW50ZXJlZCBhbiBlcnJvciB3aGlsZSBkZWNvZGluZyBhIGNvb2tpZSB3aXRoIHZhbHVlICdcIiArIHZhbHVlICsgXCInLiBTZXQgb3B0aW9ucy5kZWNvZGVWYWx1ZXMgdG8gZmFsc2UgdG8gZGlzYWJsZSB0aGlzIGZlYXR1cmUuXCIsXG4gICAgICAgICAgZVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgdmFyIGNvb2tpZSA9IHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgdmFsdWVcbiAgICAgIH07XG4gICAgICBwYXJ0cy5mb3JFYWNoKGZ1bmN0aW9uKHBhcnQpIHtcbiAgICAgICAgdmFyIHNpZGVzID0gcGFydC5zcGxpdChcIj1cIik7XG4gICAgICAgIHZhciBrZXkgPSBzaWRlcy5zaGlmdCgpLnRyaW1MZWZ0KCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdmFyIHZhbHVlMiA9IHNpZGVzLmpvaW4oXCI9XCIpO1xuICAgICAgICBpZiAoa2V5ID09PSBcImV4cGlyZXNcIikge1xuICAgICAgICAgIGNvb2tpZS5leHBpcmVzID0gbmV3IERhdGUodmFsdWUyKTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwibWF4LWFnZVwiKSB7XG4gICAgICAgICAgY29va2llLm1heEFnZSA9IHBhcnNlSW50KHZhbHVlMiwgMTApO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJzZWN1cmVcIikge1xuICAgICAgICAgIGNvb2tpZS5zZWN1cmUgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJodHRwb25seVwiKSB7XG4gICAgICAgICAgY29va2llLmh0dHBPbmx5ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwic2FtZXNpdGVcIikge1xuICAgICAgICAgIGNvb2tpZS5zYW1lU2l0ZSA9IHZhbHVlMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb29raWVba2V5XSA9IHZhbHVlMjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gY29va2llO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwYXJzZU5hbWVWYWx1ZVBhaXIobmFtZVZhbHVlUGFpclN0cikge1xuICAgICAgdmFyIG5hbWUgPSBcIlwiO1xuICAgICAgdmFyIHZhbHVlID0gXCJcIjtcbiAgICAgIHZhciBuYW1lVmFsdWVBcnIgPSBuYW1lVmFsdWVQYWlyU3RyLnNwbGl0KFwiPVwiKTtcbiAgICAgIGlmIChuYW1lVmFsdWVBcnIubGVuZ3RoID4gMSkge1xuICAgICAgICBuYW1lID0gbmFtZVZhbHVlQXJyLnNoaWZ0KCk7XG4gICAgICAgIHZhbHVlID0gbmFtZVZhbHVlQXJyLmpvaW4oXCI9XCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBuYW1lVmFsdWVQYWlyU3RyO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgbmFtZSwgdmFsdWUgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcGFyc2UoaW5wdXQsIG9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zID8gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdFBhcnNlT3B0aW9ucywgb3B0aW9ucykgOiBkZWZhdWx0UGFyc2VPcHRpb25zO1xuICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICBpZiAoIW9wdGlvbnMubWFwKSB7XG4gICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGlucHV0LmhlYWRlcnMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpbnB1dC5oZWFkZXJzLmdldFNldENvb2tpZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgaW5wdXQgPSBpbnB1dC5oZWFkZXJzLmdldFNldENvb2tpZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGlucHV0LmhlYWRlcnNbXCJzZXQtY29va2llXCJdKSB7XG4gICAgICAgICAgaW5wdXQgPSBpbnB1dC5oZWFkZXJzW1wic2V0LWNvb2tpZVwiXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgc2NoID0gaW5wdXQuaGVhZGVyc1tPYmplY3Qua2V5cyhpbnB1dC5oZWFkZXJzKS5maW5kKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGtleS50b0xvd2VyQ2FzZSgpID09PSBcInNldC1jb29raWVcIjtcbiAgICAgICAgICB9KV07XG4gICAgICAgICAgaWYgKCFzY2ggJiYgaW5wdXQuaGVhZGVycy5jb29raWUgJiYgIW9wdGlvbnMuc2lsZW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgIFwiV2FybmluZzogc2V0LWNvb2tpZS1wYXJzZXIgYXBwZWFycyB0byBoYXZlIGJlZW4gY2FsbGVkIG9uIGEgcmVxdWVzdCBvYmplY3QuIEl0IGlzIGRlc2lnbmVkIHRvIHBhcnNlIFNldC1Db29raWUgaGVhZGVycyBmcm9tIHJlc3BvbnNlcywgbm90IENvb2tpZSBoZWFkZXJzIGZyb20gcmVxdWVzdHMuIFNldCB0aGUgb3B0aW9uIHtzaWxlbnQ6IHRydWV9IHRvIHN1cHByZXNzIHRoaXMgd2FybmluZy5cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaW5wdXQgPSBzY2g7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShpbnB1dCkpIHtcbiAgICAgICAgaW5wdXQgPSBbaW5wdXRdO1xuICAgICAgfVxuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgPyBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0UGFyc2VPcHRpb25zLCBvcHRpb25zKSA6IGRlZmF1bHRQYXJzZU9wdGlvbnM7XG4gICAgICBpZiAoIW9wdGlvbnMubWFwKSB7XG4gICAgICAgIHJldHVybiBpbnB1dC5maWx0ZXIoaXNOb25FbXB0eVN0cmluZykubWFwKGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgIHJldHVybiBwYXJzZVN0cmluZyhzdHIsIG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBjb29raWVzID0ge307XG4gICAgICAgIHJldHVybiBpbnB1dC5maWx0ZXIoaXNOb25FbXB0eVN0cmluZykucmVkdWNlKGZ1bmN0aW9uKGNvb2tpZXMyLCBzdHIpIHtcbiAgICAgICAgICB2YXIgY29va2llID0gcGFyc2VTdHJpbmcoc3RyLCBvcHRpb25zKTtcbiAgICAgICAgICBjb29raWVzMltjb29raWUubmFtZV0gPSBjb29raWU7XG4gICAgICAgICAgcmV0dXJuIGNvb2tpZXMyO1xuICAgICAgICB9LCBjb29raWVzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gc3BsaXRDb29raWVzU3RyaW5nMihjb29raWVzU3RyaW5nKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjb29raWVzU3RyaW5nKSkge1xuICAgICAgICByZXR1cm4gY29va2llc1N0cmluZztcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgY29va2llc1N0cmluZyAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgICB2YXIgY29va2llc1N0cmluZ3MgPSBbXTtcbiAgICAgIHZhciBwb3MgPSAwO1xuICAgICAgdmFyIHN0YXJ0O1xuICAgICAgdmFyIGNoO1xuICAgICAgdmFyIGxhc3RDb21tYTtcbiAgICAgIHZhciBuZXh0U3RhcnQ7XG4gICAgICB2YXIgY29va2llc1NlcGFyYXRvckZvdW5kO1xuICAgICAgZnVuY3Rpb24gc2tpcFdoaXRlc3BhY2UoKSB7XG4gICAgICAgIHdoaWxlIChwb3MgPCBjb29raWVzU3RyaW5nLmxlbmd0aCAmJiAvXFxzLy50ZXN0KGNvb2tpZXNTdHJpbmcuY2hhckF0KHBvcykpKSB7XG4gICAgICAgICAgcG9zICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBvcyA8IGNvb2tpZXNTdHJpbmcubGVuZ3RoO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gbm90U3BlY2lhbENoYXIoKSB7XG4gICAgICAgIGNoID0gY29va2llc1N0cmluZy5jaGFyQXQocG9zKTtcbiAgICAgICAgcmV0dXJuIGNoICE9PSBcIj1cIiAmJiBjaCAhPT0gXCI7XCIgJiYgY2ggIT09IFwiLFwiO1xuICAgICAgfVxuICAgICAgd2hpbGUgKHBvcyA8IGNvb2tpZXNTdHJpbmcubGVuZ3RoKSB7XG4gICAgICAgIHN0YXJ0ID0gcG9zO1xuICAgICAgICBjb29raWVzU2VwYXJhdG9yRm91bmQgPSBmYWxzZTtcbiAgICAgICAgd2hpbGUgKHNraXBXaGl0ZXNwYWNlKCkpIHtcbiAgICAgICAgICBjaCA9IGNvb2tpZXNTdHJpbmcuY2hhckF0KHBvcyk7XG4gICAgICAgICAgaWYgKGNoID09PSBcIixcIikge1xuICAgICAgICAgICAgbGFzdENvbW1hID0gcG9zO1xuICAgICAgICAgICAgcG9zICs9IDE7XG4gICAgICAgICAgICBza2lwV2hpdGVzcGFjZSgpO1xuICAgICAgICAgICAgbmV4dFN0YXJ0ID0gcG9zO1xuICAgICAgICAgICAgd2hpbGUgKHBvcyA8IGNvb2tpZXNTdHJpbmcubGVuZ3RoICYmIG5vdFNwZWNpYWxDaGFyKCkpIHtcbiAgICAgICAgICAgICAgcG9zICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocG9zIDwgY29va2llc1N0cmluZy5sZW5ndGggJiYgY29va2llc1N0cmluZy5jaGFyQXQocG9zKSA9PT0gXCI9XCIpIHtcbiAgICAgICAgICAgICAgY29va2llc1NlcGFyYXRvckZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcG9zID0gbmV4dFN0YXJ0O1xuICAgICAgICAgICAgICBjb29raWVzU3RyaW5ncy5wdXNoKGNvb2tpZXNTdHJpbmcuc3Vic3RyaW5nKHN0YXJ0LCBsYXN0Q29tbWEpKTtcbiAgICAgICAgICAgICAgc3RhcnQgPSBwb3M7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwb3MgPSBsYXN0Q29tbWEgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwb3MgKz0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb29raWVzU2VwYXJhdG9yRm91bmQgfHwgcG9zID49IGNvb2tpZXNTdHJpbmcubGVuZ3RoKSB7XG4gICAgICAgICAgY29va2llc1N0cmluZ3MucHVzaChjb29raWVzU3RyaW5nLnN1YnN0cmluZyhzdGFydCwgY29va2llc1N0cmluZy5sZW5ndGgpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNvb2tpZXNTdHJpbmdzO1xuICAgIH1cbiAgICBtb2R1bGUuZXhwb3J0cyA9IHBhcnNlO1xuICAgIG1vZHVsZS5leHBvcnRzLnBhcnNlID0gcGFyc2U7XG4gICAgbW9kdWxlLmV4cG9ydHMucGFyc2VTdHJpbmcgPSBwYXJzZVN0cmluZztcbiAgICBtb2R1bGUuZXhwb3J0cy5zcGxpdENvb2tpZXNTdHJpbmcgPSBzcGxpdENvb2tpZXNTdHJpbmcyO1xuICB9XG59KTtcblxuLy8gc3JjL0hlYWRlcnMudHNcbnZhciBpbXBvcnRfc2V0X2Nvb2tpZV9wYXJzZXIgPSBfX3RvRVNNKHJlcXVpcmVfc2V0X2Nvb2tpZSgpKTtcblxuLy8gc3JjL3V0aWxzL25vcm1hbGl6ZUhlYWRlck5hbWUudHNcbnZhciBIRUFERVJTX0lOVkFMSURfQ0hBUkFDVEVSUyA9IC9bXmEtejAtOVxcLSMkJSYnKisuXl9gfH5dL2k7XG5mdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKG5hbWUpIHtcbiAgaWYgKEhFQURFUlNfSU5WQUxJRF9DSEFSQUNURVJTLnRlc3QobmFtZSkgfHwgbmFtZS50cmltKCkgPT09IFwiXCIpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBjaGFyYWN0ZXIgaW4gaGVhZGVyIGZpZWxkIG5hbWVcIik7XG4gIH1cbiAgcmV0dXJuIG5hbWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG59XG5cbi8vIHNyYy91dGlscy9ub3JtYWxpemVIZWFkZXJWYWx1ZS50c1xudmFyIGNoYXJDb2Rlc1RvUmVtb3ZlID0gW1xuICBTdHJpbmcuZnJvbUNoYXJDb2RlKDEwKSxcbiAgU3RyaW5nLmZyb21DaGFyQ29kZSgxMyksXG4gIFN0cmluZy5mcm9tQ2hhckNvZGUoOSksXG4gIFN0cmluZy5mcm9tQ2hhckNvZGUoMzIpXG5dO1xudmFyIEhFQURFUl9WQUxVRV9SRU1PVkVfUkVHRVhQID0gbmV3IFJlZ0V4cChcbiAgYCheWyR7Y2hhckNvZGVzVG9SZW1vdmUuam9pbihcIlwiKX1dfCRbJHtjaGFyQ29kZXNUb1JlbW92ZS5qb2luKFwiXCIpfV0pYCxcbiAgXCJnXCJcbik7XG5mdW5jdGlvbiBub3JtYWxpemVIZWFkZXJWYWx1ZSh2YWx1ZSkge1xuICBjb25zdCBuZXh0VmFsdWUgPSB2YWx1ZS5yZXBsYWNlKEhFQURFUl9WQUxVRV9SRU1PVkVfUkVHRVhQLCBcIlwiKTtcbiAgcmV0dXJuIG5leHRWYWx1ZTtcbn1cblxuLy8gc3JjL3V0aWxzL2lzVmFsaWRIZWFkZXJOYW1lLnRzXG5mdW5jdGlvbiBpc1ZhbGlkSGVhZGVyTmFtZSh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoYXJhY3RlciA9IHZhbHVlLmNoYXJDb2RlQXQoaSk7XG4gICAgaWYgKGNoYXJhY3RlciA+IDEyNyB8fCAhaXNUb2tlbihjaGFyYWN0ZXIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gaXNUb2tlbih2YWx1ZSkge1xuICByZXR1cm4gIVtcbiAgICAxMjcsXG4gICAgMzIsXG4gICAgXCIoXCIsXG4gICAgXCIpXCIsXG4gICAgXCI8XCIsXG4gICAgXCI+XCIsXG4gICAgXCJAXCIsXG4gICAgXCIsXCIsXG4gICAgXCI7XCIsXG4gICAgXCI6XCIsXG4gICAgXCJcXFxcXCIsXG4gICAgJ1wiJyxcbiAgICBcIi9cIixcbiAgICBcIltcIixcbiAgICBcIl1cIixcbiAgICBcIj9cIixcbiAgICBcIj1cIixcbiAgICBcIntcIixcbiAgICBcIn1cIlxuICBdLmluY2x1ZGVzKHZhbHVlKTtcbn1cblxuLy8gc3JjL3V0aWxzL2lzVmFsaWRIZWFkZXJWYWx1ZS50c1xuZnVuY3Rpb24gaXNWYWxpZEhlYWRlclZhbHVlKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHZhbHVlLnRyaW0oKSAhPT0gdmFsdWUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoYXJhY3RlciA9IHZhbHVlLmNoYXJDb2RlQXQoaSk7XG4gICAgaWYgKFxuICAgICAgLy8gTlVMLlxuICAgICAgY2hhcmFjdGVyID09PSAwIHx8IC8vIEhUVFAgbmV3bGluZSBieXRlcy5cbiAgICAgIGNoYXJhY3RlciA9PT0gMTAgfHwgY2hhcmFjdGVyID09PSAxM1xuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gc3JjL0hlYWRlcnMudHNcbnZhciBOT1JNQUxJWkVEX0hFQURFUlMgPSBTeW1ib2woXCJub3JtYWxpemVkSGVhZGVyc1wiKTtcbnZhciBSQVdfSEVBREVSX05BTUVTID0gU3ltYm9sKFwicmF3SGVhZGVyTmFtZXNcIik7XG52YXIgSEVBREVSX1ZBTFVFX0RFTElNSVRFUiA9IFwiLCBcIjtcbnZhciBfYSwgX2IsIF9jO1xudmFyIEhlYWRlcnMgPSBjbGFzcyBfSGVhZGVycyB7XG4gIGNvbnN0cnVjdG9yKGluaXQpIHtcbiAgICAvLyBOb3JtYWxpemVkIGhlYWRlciB7XCJuYW1lXCI6XCJhLCBiXCJ9IHN0b3JhZ2UuXG4gICAgdGhpc1tfYV0gPSB7fTtcbiAgICAvLyBLZWVwcyB0aGUgbWFwcGluZyBiZXR3ZWVuIHRoZSByYXcgaGVhZGVyIG5hbWVcbiAgICAvLyBhbmQgdGhlIG5vcm1hbGl6ZWQgaGVhZGVyIG5hbWUgdG8gZWFzZSB0aGUgbG9va3VwLlxuICAgIHRoaXNbX2JdID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbiAgICB0aGlzW19jXSA9IFwiSGVhZGVyc1wiO1xuICAgIGlmIChbXCJIZWFkZXJzXCIsIFwiSGVhZGVyc1BvbHlmaWxsXCJdLmluY2x1ZGVzKGluaXQ/LmNvbnN0cnVjdG9yLm5hbWUpIHx8IGluaXQgaW5zdGFuY2VvZiBfSGVhZGVycyB8fCB0eXBlb2YgZ2xvYmFsVGhpcy5IZWFkZXJzICE9PSBcInVuZGVmaW5lZFwiICYmIGluaXQgaW5zdGFuY2VvZiBnbG9iYWxUaGlzLkhlYWRlcnMpIHtcbiAgICAgIGNvbnN0IGluaXRpYWxIZWFkZXJzID0gaW5pdDtcbiAgICAgIGluaXRpYWxIZWFkZXJzLmZvckVhY2goKHZhbHVlLCBuYW1lKSA9PiB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIHZhbHVlKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShpbml0KSkge1xuICAgICAgaW5pdC5mb3JFYWNoKChbbmFtZSwgdmFsdWVdKSA9PiB7XG4gICAgICAgIHRoaXMuYXBwZW5kKFxuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5qb2luKEhFQURFUl9WQUxVRV9ERUxJTUlURVIpIDogdmFsdWVcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoaW5pdCkge1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaW5pdCkuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGluaXRbbmFtZV07XG4gICAgICAgIHRoaXMuYXBwZW5kKFxuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5qb2luKEhFQURFUl9WQUxVRV9ERUxJTUlURVIpIDogdmFsdWVcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBbKF9hID0gTk9STUFMSVpFRF9IRUFERVJTLCBfYiA9IFJBV19IRUFERVJfTkFNRVMsIF9jID0gU3ltYm9sLnRvU3RyaW5nVGFnLCBTeW1ib2wuaXRlcmF0b3IpXSgpIHtcbiAgICByZXR1cm4gdGhpcy5lbnRyaWVzKCk7XG4gIH1cbiAgKmtleXMoKSB7XG4gICAgZm9yIChjb25zdCBbbmFtZV0gb2YgdGhpcy5lbnRyaWVzKCkpIHtcbiAgICAgIHlpZWxkIG5hbWU7XG4gICAgfVxuICB9XG4gICp2YWx1ZXMoKSB7XG4gICAgZm9yIChjb25zdCBbLCB2YWx1ZV0gb2YgdGhpcy5lbnRyaWVzKCkpIHtcbiAgICAgIHlpZWxkIHZhbHVlO1xuICAgIH1cbiAgfVxuICAqZW50cmllcygpIHtcbiAgICBsZXQgc29ydGVkS2V5cyA9IE9iamVjdC5rZXlzKHRoaXNbTk9STUFMSVpFRF9IRUFERVJTXSkuc29ydChcbiAgICAgIChhLCBiKSA9PiBhLmxvY2FsZUNvbXBhcmUoYilcbiAgICApO1xuICAgIGZvciAoY29uc3QgbmFtZSBvZiBzb3J0ZWRLZXlzKSB7XG4gICAgICBpZiAobmFtZSA9PT0gXCJzZXQtY29va2llXCIpIHtcbiAgICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiB0aGlzLmdldFNldENvb2tpZSgpKSB7XG4gICAgICAgICAgeWllbGQgW25hbWUsIHZhbHVlXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeWllbGQgW25hbWUsIHRoaXMuZ2V0KG5hbWUpXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgYSBib29sZWFuIHN0YXRpbmcgd2hldGhlciBhIGBIZWFkZXJzYCBvYmplY3QgY29udGFpbnMgYSBjZXJ0YWluIGhlYWRlci5cbiAgICovXG4gIGhhcyhuYW1lKSB7XG4gICAgaWYgKCFpc1ZhbGlkSGVhZGVyTmFtZShuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCBoZWFkZXIgbmFtZSBcIiR7bmFtZX1cImApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpc1tOT1JNQUxJWkVEX0hFQURFUlNdLmhhc093blByb3BlcnR5KG5vcm1hbGl6ZUhlYWRlck5hbWUobmFtZSkpO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgYEJ5dGVTdHJpbmdgIHNlcXVlbmNlIG9mIGFsbCB0aGUgdmFsdWVzIG9mIGEgaGVhZGVyIHdpdGggYSBnaXZlbiBuYW1lLlxuICAgKi9cbiAgZ2V0KG5hbWUpIHtcbiAgICBpZiAoIWlzVmFsaWRIZWFkZXJOYW1lKG5hbWUpKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoYEludmFsaWQgaGVhZGVyIG5hbWUgXCIke25hbWV9XCJgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNbTk9STUFMSVpFRF9IRUFERVJTXVtub3JtYWxpemVIZWFkZXJOYW1lKG5hbWUpXSA/PyBudWxsO1xuICB9XG4gIC8qKlxuICAgKiBTZXRzIGEgbmV3IHZhbHVlIGZvciBhbiBleGlzdGluZyBoZWFkZXIgaW5zaWRlIGEgYEhlYWRlcnNgIG9iamVjdCwgb3IgYWRkcyB0aGUgaGVhZGVyIGlmIGl0IGRvZXMgbm90IGFscmVhZHkgZXhpc3QuXG4gICAqL1xuICBzZXQobmFtZSwgdmFsdWUpIHtcbiAgICBpZiAoIWlzVmFsaWRIZWFkZXJOYW1lKG5hbWUpIHx8ICFpc1ZhbGlkSGVhZGVyVmFsdWUodmFsdWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5vcm1hbGl6ZWROYW1lID0gbm9ybWFsaXplSGVhZGVyTmFtZShuYW1lKTtcbiAgICBjb25zdCBub3JtYWxpemVkVmFsdWUgPSBub3JtYWxpemVIZWFkZXJWYWx1ZSh2YWx1ZSk7XG4gICAgdGhpc1tOT1JNQUxJWkVEX0hFQURFUlNdW25vcm1hbGl6ZWROYW1lXSA9IG5vcm1hbGl6ZUhlYWRlclZhbHVlKG5vcm1hbGl6ZWRWYWx1ZSk7XG4gICAgdGhpc1tSQVdfSEVBREVSX05BTUVTXS5zZXQobm9ybWFsaXplZE5hbWUsIG5hbWUpO1xuICB9XG4gIC8qKlxuICAgKiBBcHBlbmRzIGEgbmV3IHZhbHVlIG9udG8gYW4gZXhpc3RpbmcgaGVhZGVyIGluc2lkZSBhIGBIZWFkZXJzYCBvYmplY3QsIG9yIGFkZHMgdGhlIGhlYWRlciBpZiBpdCBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0LlxuICAgKi9cbiAgYXBwZW5kKG5hbWUsIHZhbHVlKSB7XG4gICAgaWYgKCFpc1ZhbGlkSGVhZGVyTmFtZShuYW1lKSB8fCAhaXNWYWxpZEhlYWRlclZhbHVlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBub3JtYWxpemVkTmFtZSA9IG5vcm1hbGl6ZUhlYWRlck5hbWUobmFtZSk7XG4gICAgY29uc3Qgbm9ybWFsaXplZFZhbHVlID0gbm9ybWFsaXplSGVhZGVyVmFsdWUodmFsdWUpO1xuICAgIGxldCByZXNvbHZlZFZhbHVlID0gdGhpcy5oYXMobm9ybWFsaXplZE5hbWUpID8gYCR7dGhpcy5nZXQobm9ybWFsaXplZE5hbWUpfSwgJHtub3JtYWxpemVkVmFsdWV9YCA6IG5vcm1hbGl6ZWRWYWx1ZTtcbiAgICB0aGlzLnNldChuYW1lLCByZXNvbHZlZFZhbHVlKTtcbiAgfVxuICAvKipcbiAgICogRGVsZXRlcyBhIGhlYWRlciBmcm9tIHRoZSBgSGVhZGVyc2Agb2JqZWN0LlxuICAgKi9cbiAgZGVsZXRlKG5hbWUpIHtcbiAgICBpZiAoIWlzVmFsaWRIZWFkZXJOYW1lKG5hbWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghdGhpcy5oYXMobmFtZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgbm9ybWFsaXplZE5hbWUgPSBub3JtYWxpemVIZWFkZXJOYW1lKG5hbWUpO1xuICAgIGRlbGV0ZSB0aGlzW05PUk1BTElaRURfSEVBREVSU11bbm9ybWFsaXplZE5hbWVdO1xuICAgIHRoaXNbUkFXX0hFQURFUl9OQU1FU10uZGVsZXRlKG5vcm1hbGl6ZWROYW1lKTtcbiAgfVxuICAvKipcbiAgICogVHJhdmVyc2VzIHRoZSBgSGVhZGVyc2Agb2JqZWN0LFxuICAgKiBjYWxsaW5nIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgZWFjaCBoZWFkZXIuXG4gICAqL1xuICBmb3JFYWNoKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgZm9yIChjb25zdCBbbmFtZSwgdmFsdWVdIG9mIHRoaXMuZW50cmllcygpKSB7XG4gICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHZhbHVlLCBuYW1lLCB0aGlzKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gYXJyYXkgY29udGFpbmluZyB0aGUgdmFsdWVzXG4gICAqIG9mIGFsbCBTZXQtQ29va2llIGhlYWRlcnMgYXNzb2NpYXRlZFxuICAgKiB3aXRoIGEgcmVzcG9uc2VcbiAgICovXG4gIGdldFNldENvb2tpZSgpIHtcbiAgICBjb25zdCBzZXRDb29raWVIZWFkZXIgPSB0aGlzLmdldChcInNldC1jb29raWVcIik7XG4gICAgaWYgKHNldENvb2tpZUhlYWRlciA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBpZiAoc2V0Q29va2llSGVhZGVyID09PSBcIlwiKSB7XG4gICAgICByZXR1cm4gW1wiXCJdO1xuICAgIH1cbiAgICByZXR1cm4gKDAsIGltcG9ydF9zZXRfY29va2llX3BhcnNlci5zcGxpdENvb2tpZXNTdHJpbmcpKHNldENvb2tpZUhlYWRlcik7XG4gIH1cbn07XG5cbi8vIHNyYy9nZXRSYXdIZWFkZXJzLnRzXG5mdW5jdGlvbiBnZXRSYXdIZWFkZXJzKGhlYWRlcnMpIHtcbiAgY29uc3QgcmF3SGVhZGVycyA9IHt9O1xuICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgaGVhZGVycy5lbnRyaWVzKCkpIHtcbiAgICByYXdIZWFkZXJzW2hlYWRlcnNbUkFXX0hFQURFUl9OQU1FU10uZ2V0KG5hbWUpXSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiByYXdIZWFkZXJzO1xufVxuXG4vLyBzcmMvdHJhbnNmb3JtZXJzL2hlYWRlcnNUb0xpc3QudHNcbmZ1bmN0aW9uIGhlYWRlcnNUb0xpc3QoaGVhZGVycykge1xuICBjb25zdCBoZWFkZXJzTGlzdCA9IFtdO1xuICBoZWFkZXJzLmZvckVhY2goKHZhbHVlLCBuYW1lKSA9PiB7XG4gICAgY29uc3QgcmVzb2x2ZWRWYWx1ZSA9IHZhbHVlLmluY2x1ZGVzKFwiLFwiKSA/IHZhbHVlLnNwbGl0KFwiLFwiKS5tYXAoKHZhbHVlMikgPT4gdmFsdWUyLnRyaW0oKSkgOiB2YWx1ZTtcbiAgICBoZWFkZXJzTGlzdC5wdXNoKFtuYW1lLCByZXNvbHZlZFZhbHVlXSk7XG4gIH0pO1xuICByZXR1cm4gaGVhZGVyc0xpc3Q7XG59XG5cbi8vIHNyYy90cmFuc2Zvcm1lcnMvaGVhZGVyc1RvU3RyaW5nLnRzXG5mdW5jdGlvbiBoZWFkZXJzVG9TdHJpbmcoaGVhZGVycykge1xuICBjb25zdCBsaXN0ID0gaGVhZGVyc1RvTGlzdChoZWFkZXJzKTtcbiAgY29uc3QgbGluZXMgPSBsaXN0Lm1hcCgoW25hbWUsIHZhbHVlXSkgPT4ge1xuICAgIGNvbnN0IHZhbHVlcyA9IFtdLmNvbmNhdCh2YWx1ZSk7XG4gICAgcmV0dXJuIGAke25hbWV9OiAke3ZhbHVlcy5qb2luKFwiLCBcIil9YDtcbiAgfSk7XG4gIHJldHVybiBsaW5lcy5qb2luKFwiXFxyXFxuXCIpO1xufVxuXG4vLyBzcmMvdHJhbnNmb3JtZXJzL2hlYWRlcnNUb09iamVjdC50c1xudmFyIHNpbmdsZVZhbHVlSGVhZGVycyA9IFtcInVzZXItYWdlbnRcIl07XG5mdW5jdGlvbiBoZWFkZXJzVG9PYmplY3QoaGVhZGVycykge1xuICBjb25zdCBoZWFkZXJzT2JqZWN0ID0ge307XG4gIGhlYWRlcnMuZm9yRWFjaCgodmFsdWUsIG5hbWUpID0+IHtcbiAgICBjb25zdCBpc011bHRpVmFsdWUgPSAhc2luZ2xlVmFsdWVIZWFkZXJzLmluY2x1ZGVzKG5hbWUudG9Mb3dlckNhc2UoKSkgJiYgdmFsdWUuaW5jbHVkZXMoXCIsXCIpO1xuICAgIGhlYWRlcnNPYmplY3RbbmFtZV0gPSBpc011bHRpVmFsdWUgPyB2YWx1ZS5zcGxpdChcIixcIikubWFwKChzKSA9PiBzLnRyaW0oKSkgOiB2YWx1ZTtcbiAgfSk7XG4gIHJldHVybiBoZWFkZXJzT2JqZWN0O1xufVxuXG4vLyBzcmMvdHJhbnNmb3JtZXJzL3N0cmluZ1RvSGVhZGVycy50c1xuZnVuY3Rpb24gc3RyaW5nVG9IZWFkZXJzKHN0cikge1xuICBjb25zdCBsaW5lcyA9IHN0ci50cmltKCkuc3BsaXQoL1tcXHJcXG5dKy8pO1xuICByZXR1cm4gbGluZXMucmVkdWNlKChoZWFkZXJzLCBsaW5lKSA9PiB7XG4gICAgaWYgKGxpbmUudHJpbSgpID09PSBcIlwiKSB7XG4gICAgICByZXR1cm4gaGVhZGVycztcbiAgICB9XG4gICAgY29uc3QgcGFydHMgPSBsaW5lLnNwbGl0KFwiOiBcIik7XG4gICAgY29uc3QgbmFtZSA9IHBhcnRzLnNoaWZ0KCk7XG4gICAgY29uc3QgdmFsdWUgPSBwYXJ0cy5qb2luKFwiOiBcIik7XG4gICAgaGVhZGVycy5hcHBlbmQobmFtZSwgdmFsdWUpO1xuICAgIHJldHVybiBoZWFkZXJzO1xuICB9LCBuZXcgSGVhZGVycygpKTtcbn1cblxuLy8gc3JjL3RyYW5zZm9ybWVycy9saXN0VG9IZWFkZXJzLnRzXG5mdW5jdGlvbiBsaXN0VG9IZWFkZXJzKGxpc3QpIHtcbiAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gIGxpc3QuZm9yRWFjaCgoW25hbWUsIHZhbHVlXSkgPT4ge1xuICAgIGNvbnN0IHZhbHVlcyA9IFtdLmNvbmNhdCh2YWx1ZSk7XG4gICAgdmFsdWVzLmZvckVhY2goKHZhbHVlMikgPT4ge1xuICAgICAgaGVhZGVycy5hcHBlbmQobmFtZSwgdmFsdWUyKTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBoZWFkZXJzO1xufVxuXG4vLyBzcmMvdHJhbnNmb3JtZXJzL3JlZHVjZUhlYWRlcnNPYmplY3QudHNcbmZ1bmN0aW9uIHJlZHVjZUhlYWRlcnNPYmplY3QoaGVhZGVycywgcmVkdWNlciwgaW5pdGlhbFN0YXRlKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhoZWFkZXJzKS5yZWR1Y2UoKG5leHRIZWFkZXJzLCBuYW1lKSA9PiB7XG4gICAgcmV0dXJuIHJlZHVjZXIobmV4dEhlYWRlcnMsIG5hbWUsIGhlYWRlcnNbbmFtZV0pO1xuICB9LCBpbml0aWFsU3RhdGUpO1xufVxuXG4vLyBzcmMvdHJhbnNmb3JtZXJzL29iamVjdFRvSGVhZGVycy50c1xuZnVuY3Rpb24gb2JqZWN0VG9IZWFkZXJzKGhlYWRlcnNPYmplY3QpIHtcbiAgcmV0dXJuIHJlZHVjZUhlYWRlcnNPYmplY3QoXG4gICAgaGVhZGVyc09iamVjdCxcbiAgICAoaGVhZGVycywgbmFtZSwgdmFsdWUpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlcyA9IFtdLmNvbmNhdCh2YWx1ZSkuZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgdmFsdWVzLmZvckVhY2goKHZhbHVlMikgPT4ge1xuICAgICAgICBoZWFkZXJzLmFwcGVuZChuYW1lLCB2YWx1ZTIpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gaGVhZGVycztcbiAgICB9LFxuICAgIG5ldyBIZWFkZXJzKClcbiAgKTtcbn1cblxuLy8gc3JjL3RyYW5zZm9ybWVycy9mbGF0dGVuSGVhZGVyc0xpc3QudHNcbmZ1bmN0aW9uIGZsYXR0ZW5IZWFkZXJzTGlzdChsaXN0KSB7XG4gIHJldHVybiBsaXN0Lm1hcCgoW25hbWUsIHZhbHVlc10pID0+IHtcbiAgICByZXR1cm4gW25hbWUsIFtdLmNvbmNhdCh2YWx1ZXMpLmpvaW4oXCIsIFwiKV07XG4gIH0pO1xufVxuXG4vLyBzcmMvdHJhbnNmb3JtZXJzL2ZsYXR0ZW5IZWFkZXJzT2JqZWN0LnRzXG5mdW5jdGlvbiBmbGF0dGVuSGVhZGVyc09iamVjdChoZWFkZXJzT2JqZWN0KSB7XG4gIHJldHVybiByZWR1Y2VIZWFkZXJzT2JqZWN0KFxuICAgIGhlYWRlcnNPYmplY3QsXG4gICAgKGhlYWRlcnMsIG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICBoZWFkZXJzW25hbWVdID0gW10uY29uY2F0KHZhbHVlKS5qb2luKFwiLCBcIik7XG4gICAgICByZXR1cm4gaGVhZGVycztcbiAgICB9LFxuICAgIHt9XG4gICk7XG59XG5leHBvcnQge1xuICBIZWFkZXJzLFxuICBmbGF0dGVuSGVhZGVyc0xpc3QsXG4gIGZsYXR0ZW5IZWFkZXJzT2JqZWN0LFxuICBnZXRSYXdIZWFkZXJzLFxuICBoZWFkZXJzVG9MaXN0LFxuICBoZWFkZXJzVG9PYmplY3QsXG4gIGhlYWRlcnNUb1N0cmluZyxcbiAgbGlzdFRvSGVhZGVycyxcbiAgb2JqZWN0VG9IZWFkZXJzLFxuICByZWR1Y2VIZWFkZXJzT2JqZWN0LFxuICBzdHJpbmdUb0hlYWRlcnNcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwIiwiaW1wb3J0ICogYXMgX3N5c2NhbGxzMV8wIGZyb20gJ3NwYWNldGltZTpzeXNAMS4wJztcbmltcG9ydCB7IHJlZ2lzdGVyX2hvb2tzIH0gZnJvbSAnc3BhY2V0aW1lOnN5c0AxLjAnO1xuaW1wb3J0IHsgcmVnaXN0ZXJfaG9va3MgYXMgcmVnaXN0ZXJfaG9va3MkMSB9IGZyb20gJ3NwYWNldGltZTpzeXNAMS4xJztcbmltcG9ydCAqIGFzIF9zeXNjYWxsczFfMiBmcm9tICdzcGFjZXRpbWU6c3lzQDEuMic7XG5pbXBvcnQgeyByZWdpc3Rlcl9ob29rcyBhcyByZWdpc3Rlcl9ob29rcyQyIH0gZnJvbSAnc3BhY2V0aW1lOnN5c0AxLjInO1xuaW1wb3J0ICogYXMgX3N5c2NhbGxzMV8zIGZyb20gJ3NwYWNldGltZTpzeXNAMS4zJztcbmltcG9ydCB7IGhlYWRlcnNUb0xpc3QsIEhlYWRlcnMgfSBmcm9tICdoZWFkZXJzLXBvbHlmaWxsJztcblxudHlwZW9mIGdsb2JhbFRoaXMhPT1cInVuZGVmaW5lZFwiJiYoKGdsb2JhbFRoaXMuZ2xvYmFsPWdsb2JhbFRoaXMuZ2xvYmFsfHxnbG9iYWxUaGlzKSwoZ2xvYmFsVGhpcy53aW5kb3c9Z2xvYmFsVGhpcy53aW5kb3d8fGdsb2JhbFRoaXMpKTtcbnZhciBfX2NyZWF0ZSA9IE9iamVjdC5jcmVhdGU7XG52YXIgX19kZWZQcm9wID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIF9fZ2V0T3duUHJvcERlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIF9fZ2V0T3duUHJvcE5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG52YXIgX19nZXRQcm90b09mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xudmFyIF9faGFzT3duUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgX19rbm93blN5bWJvbCA9IChuYW1lLCBzeW1ib2wpID0+IChzeW1ib2wgPSBTeW1ib2xbbmFtZV0pID8gc3ltYm9sIDogU3ltYm9sLmZvcihcIlN5bWJvbC5cIiArIG5hbWUpO1xudmFyIF9fdHlwZUVycm9yID0gKG1zZykgPT4ge1xuICB0aHJvdyBUeXBlRXJyb3IobXNnKTtcbn07XG52YXIgX19jb21tb25KUyA9IChjYiwgbW9kKSA9PiBmdW5jdGlvbiBfX3JlcXVpcmUoKSB7XG4gIHJldHVybiBtb2QgfHwgKDAsIGNiW19fZ2V0T3duUHJvcE5hbWVzKGNiKVswXV0pKChtb2QgPSB7IGV4cG9ydHM6IHt9IH0pLmV4cG9ydHMsIG1vZCksIG1vZC5leHBvcnRzO1xufTtcbnZhciBfX2NvcHlQcm9wcyA9ICh0bywgZnJvbTIsIGV4Y2VwdCwgZGVzYykgPT4ge1xuICBpZiAoZnJvbTIgJiYgdHlwZW9mIGZyb20yID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBmcm9tMiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZm9yIChsZXQga2V5IG9mIF9fZ2V0T3duUHJvcE5hbWVzKGZyb20yKSlcbiAgICAgIGlmICghX19oYXNPd25Qcm9wLmNhbGwodG8sIGtleSkgJiYga2V5ICE9PSBleGNlcHQpXG4gICAgICAgIF9fZGVmUHJvcCh0bywga2V5LCB7IGdldDogKCkgPT4gZnJvbTJba2V5XSwgZW51bWVyYWJsZTogIShkZXNjID0gX19nZXRPd25Qcm9wRGVzYyhmcm9tMiwga2V5KSkgfHwgZGVzYy5lbnVtZXJhYmxlIH0pO1xuICB9XG4gIHJldHVybiB0bztcbn07XG52YXIgX190b0VTTSA9IChtb2QsIGlzTm9kZU1vZGUsIHRhcmdldCkgPT4gKHRhcmdldCA9IG1vZCAhPSBudWxsID8gX19jcmVhdGUoX19nZXRQcm90b09mKG1vZCkpIDoge30sIF9fY29weVByb3BzKFxuICAvLyBJZiB0aGUgaW1wb3J0ZXIgaXMgaW4gbm9kZSBjb21wYXRpYmlsaXR5IG1vZGUgb3IgdGhpcyBpcyBub3QgYW4gRVNNXG4gIC8vIGZpbGUgdGhhdCBoYXMgYmVlbiBjb252ZXJ0ZWQgdG8gYSBDb21tb25KUyBmaWxlIHVzaW5nIGEgQmFiZWwtXG4gIC8vIGNvbXBhdGlibGUgdHJhbnNmb3JtIChpLmUuIFwiX19lc01vZHVsZVwiIGhhcyBub3QgYmVlbiBzZXQpLCB0aGVuIHNldFxuICAvLyBcImRlZmF1bHRcIiB0byB0aGUgQ29tbW9uSlMgXCJtb2R1bGUuZXhwb3J0c1wiIGZvciBub2RlIGNvbXBhdGliaWxpdHkuXG4gIF9fZGVmUHJvcCh0YXJnZXQsIFwiZGVmYXVsdFwiLCB7IHZhbHVlOiBtb2QsIGVudW1lcmFibGU6IHRydWUgfSkgLFxuICBtb2RcbikpO1xudmFyIF9fdXNpbmcgPSAoc3RhY2ssIHZhbHVlLCBhc3luYykgPT4ge1xuICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIF9fdHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkXCIpO1xuICAgIHZhciBkaXNwb3NlLCBpbm5lcjtcbiAgICBpZiAoZGlzcG9zZSA9PT0gdm9pZCAwKSB7XG4gICAgICBkaXNwb3NlID0gdmFsdWVbX19rbm93blN5bWJvbChcImRpc3Bvc2VcIildO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGRpc3Bvc2UgIT09IFwiZnVuY3Rpb25cIikgX190eXBlRXJyb3IoXCJPYmplY3Qgbm90IGRpc3Bvc2FibGVcIik7XG4gICAgaWYgKGlubmVyKSBkaXNwb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgICB0cnkge1xuICAgICAgICBpbm5lci5jYWxsKHRoaXMpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBzdGFjay5wdXNoKFthc3luYywgZGlzcG9zZSwgdmFsdWVdKTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59O1xudmFyIF9fY2FsbERpc3Bvc2UgPSAoc3RhY2ssIGVycm9yLCBoYXNFcnJvcikgPT4ge1xuICB2YXIgRSA9IHR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uKGUsIHMsIG0sIF8pIHtcbiAgICByZXR1cm4gXyA9IEVycm9yKG0pLCBfLm5hbWUgPSBcIlN1cHByZXNzZWRFcnJvclwiLCBfLmVycm9yID0gZSwgXy5zdXBwcmVzc2VkID0gcywgXztcbiAgfTtcbiAgdmFyIGZhaWwgPSAoZSkgPT4gZXJyb3IgPSBoYXNFcnJvciA/IG5ldyBFKGUsIGVycm9yLCBcIkFuIGVycm9yIHdhcyBzdXBwcmVzc2VkIGR1cmluZyBkaXNwb3NhbFwiKSA6IChoYXNFcnJvciA9IHRydWUsIGUpO1xuICB2YXIgbmV4dCA9IChpdCkgPT4ge1xuICAgIHdoaWxlIChpdCA9IHN0YWNrLnBvcCgpKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gaXRbMV0gJiYgaXRbMV0uY2FsbChpdFsyXSk7XG4gICAgICAgIGlmIChpdFswXSkgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXN1bHQpLnRoZW4obmV4dCwgKGUpID0+IChmYWlsKGUpLCBuZXh0KCkpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZmFpbChlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGhhc0Vycm9yKSB0aHJvdyBlcnJvcjtcbiAgfTtcbiAgcmV0dXJuIG5leHQoKTtcbn07XG5cbi8vIC4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9iYXNlNjQtanNAMS41LjEvbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qc1xudmFyIHJlcXVpcmVfYmFzZTY0X2pzID0gX19jb21tb25KUyh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2Jhc2U2NC1qc0AxLjUuMS9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzXCIoZXhwb3J0cykge1xuICAgIGV4cG9ydHMuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGg7XG4gICAgZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5O1xuICAgIGV4cG9ydHMuZnJvbUJ5dGVBcnJheSA9IGZyb21CeXRlQXJyYXkyO1xuICAgIHZhciBsb29rdXAgPSBbXTtcbiAgICB2YXIgcmV2TG9va3VwID0gW107XG4gICAgdmFyIEFyciA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSBcInVuZGVmaW5lZFwiID8gVWludDhBcnJheSA6IEFycmF5O1xuICAgIHZhciBjb2RlID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCI7XG4gICAgZm9yIChpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgbG9va3VwW2ldID0gY29kZVtpXTtcbiAgICAgIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaTtcbiAgICB9XG4gICAgdmFyIGk7XG4gICAgdmFyIGxlbjtcbiAgICByZXZMb29rdXBbXCItXCIuY2hhckNvZGVBdCgwKV0gPSA2MjtcbiAgICByZXZMb29rdXBbXCJfXCIuY2hhckNvZGVBdCgwKV0gPSA2MztcbiAgICBmdW5jdGlvbiBnZXRMZW5zKGI2NCkge1xuICAgICAgdmFyIGxlbjIgPSBiNjQubGVuZ3RoO1xuICAgICAgaWYgKGxlbjIgJSA0ID4gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHN0cmluZy4gTGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0XCIpO1xuICAgICAgfVxuICAgICAgdmFyIHZhbGlkTGVuID0gYjY0LmluZGV4T2YoXCI9XCIpO1xuICAgICAgaWYgKHZhbGlkTGVuID09PSAtMSkgdmFsaWRMZW4gPSBsZW4yO1xuICAgICAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IHZhbGlkTGVuID09PSBsZW4yID8gMCA6IDQgLSB2YWxpZExlbiAlIDQ7XG4gICAgICByZXR1cm4gW3ZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW5dO1xuICAgIH1cbiAgICBmdW5jdGlvbiBieXRlTGVuZ3RoKGI2NCkge1xuICAgICAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NCk7XG4gICAgICB2YXIgdmFsaWRMZW4gPSBsZW5zWzBdO1xuICAgICAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV07XG4gICAgICByZXR1cm4gKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0IC0gcGxhY2VIb2xkZXJzTGVuO1xuICAgIH1cbiAgICBmdW5jdGlvbiBfYnl0ZUxlbmd0aChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pIHtcbiAgICAgIHJldHVybiAodmFsaWRMZW4gKyBwbGFjZUhvbGRlcnNMZW4pICogMyAvIDQgLSBwbGFjZUhvbGRlcnNMZW47XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRvQnl0ZUFycmF5KGI2NCkge1xuICAgICAgdmFyIHRtcDtcbiAgICAgIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpO1xuICAgICAgdmFyIHZhbGlkTGVuID0gbGVuc1swXTtcbiAgICAgIHZhciBwbGFjZUhvbGRlcnNMZW4gPSBsZW5zWzFdO1xuICAgICAgdmFyIGFyciA9IG5ldyBBcnIoX2J5dGVMZW5ndGgoYjY0LCB2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuKSk7XG4gICAgICB2YXIgY3VyQnl0ZSA9IDA7XG4gICAgICB2YXIgbGVuMiA9IHBsYWNlSG9sZGVyc0xlbiA+IDAgPyB2YWxpZExlbiAtIDQgOiB2YWxpZExlbjtcbiAgICAgIHZhciBpMjtcbiAgICAgIGZvciAoaTIgPSAwOyBpMiA8IGxlbjI7IGkyICs9IDQpIHtcbiAgICAgICAgdG1wID0gcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkyKV0gPDwgMTggfCByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaTIgKyAxKV0gPDwgMTIgfCByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaTIgKyAyKV0gPDwgNiB8IHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpMiArIDMpXTtcbiAgICAgICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgPj4gMTYgJiAyNTU7XG4gICAgICAgIGFycltjdXJCeXRlKytdID0gdG1wID4+IDggJiAyNTU7XG4gICAgICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMjU1O1xuICAgICAgfVxuICAgICAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMikge1xuICAgICAgICB0bXAgPSByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaTIpXSA8PCAyIHwgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkyICsgMSldID4+IDQ7XG4gICAgICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMjU1O1xuICAgICAgfVxuICAgICAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMSkge1xuICAgICAgICB0bXAgPSByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaTIpXSA8PCAxMCB8IHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpMiArIDEpXSA8PCA0IHwgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkyICsgMildID4+IDI7XG4gICAgICAgIGFycltjdXJCeXRlKytdID0gdG1wID4+IDggJiAyNTU7XG4gICAgICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMjU1O1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFycjtcbiAgICB9XG4gICAgZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0KG51bSkge1xuICAgICAgcmV0dXJuIGxvb2t1cFtudW0gPj4gMTggJiA2M10gKyBsb29rdXBbbnVtID4+IDEyICYgNjNdICsgbG9va3VwW251bSA+PiA2ICYgNjNdICsgbG9va3VwW251bSAmIDYzXTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZW5jb2RlQ2h1bmsodWludDgsIHN0YXJ0LCBlbmQpIHtcbiAgICAgIHZhciB0bXA7XG4gICAgICB2YXIgb3V0cHV0ID0gW107XG4gICAgICBmb3IgKHZhciBpMiA9IHN0YXJ0OyBpMiA8IGVuZDsgaTIgKz0gMykge1xuICAgICAgICB0bXAgPSAodWludDhbaTJdIDw8IDE2ICYgMTY3MTE2ODApICsgKHVpbnQ4W2kyICsgMV0gPDwgOCAmIDY1MjgwKSArICh1aW50OFtpMiArIDJdICYgMjU1KTtcbiAgICAgICAgb3V0cHV0LnB1c2godHJpcGxldFRvQmFzZTY0KHRtcCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG91dHB1dC5qb2luKFwiXCIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBmcm9tQnl0ZUFycmF5Mih1aW50OCkge1xuICAgICAgdmFyIHRtcDtcbiAgICAgIHZhciBsZW4yID0gdWludDgubGVuZ3RoO1xuICAgICAgdmFyIGV4dHJhQnl0ZXMgPSBsZW4yICUgMztcbiAgICAgIHZhciBwYXJ0cyA9IFtdO1xuICAgICAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODM7XG4gICAgICBmb3IgKHZhciBpMiA9IDAsIGxlbjIyID0gbGVuMiAtIGV4dHJhQnl0ZXM7IGkyIDwgbGVuMjI7IGkyICs9IG1heENodW5rTGVuZ3RoKSB7XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlQ2h1bmsodWludDgsIGkyLCBpMiArIG1heENodW5rTGVuZ3RoID4gbGVuMjIgPyBsZW4yMiA6IGkyICsgbWF4Q2h1bmtMZW5ndGgpKTtcbiAgICAgIH1cbiAgICAgIGlmIChleHRyYUJ5dGVzID09PSAxKSB7XG4gICAgICAgIHRtcCA9IHVpbnQ4W2xlbjIgLSAxXTtcbiAgICAgICAgcGFydHMucHVzaChcbiAgICAgICAgICBsb29rdXBbdG1wID4+IDJdICsgbG9va3VwW3RtcCA8PCA0ICYgNjNdICsgXCI9PVwiXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKGV4dHJhQnl0ZXMgPT09IDIpIHtcbiAgICAgICAgdG1wID0gKHVpbnQ4W2xlbjIgLSAyXSA8PCA4KSArIHVpbnQ4W2xlbjIgLSAxXTtcbiAgICAgICAgcGFydHMucHVzaChcbiAgICAgICAgICBsb29rdXBbdG1wID4+IDEwXSArIGxvb2t1cFt0bXAgPj4gNCAmIDYzXSArIGxvb2t1cFt0bXAgPDwgMiAmIDYzXSArIFwiPVwiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcGFydHMuam9pbihcIlwiKTtcbiAgICB9XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZmFzdC10ZXh0LWVuY29kaW5nQDEuMC42L25vZGVfbW9kdWxlcy9mYXN0LXRleHQtZW5jb2RpbmcvdGV4dC5taW4uanNcbnZhciByZXF1aXJlX3RleHRfbWluID0gX19jb21tb25KUyh7XG4gIFwiLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2Zhc3QtdGV4dC1lbmNvZGluZ0AxLjAuNi9ub2RlX21vZHVsZXMvZmFzdC10ZXh0LWVuY29kaW5nL3RleHQubWluLmpzXCIoZXhwb3J0cykge1xuICAgIChmdW5jdGlvbihzY29wZSkge1xuICAgICAgZnVuY3Rpb24gQihyLCBlKSB7XG4gICAgICAgIHZhciBmO1xuICAgICAgICByZXR1cm4gciBpbnN0YW5jZW9mIEJ1ZmZlciA/IGYgPSByIDogZiA9IEJ1ZmZlci5mcm9tKHIuYnVmZmVyLCByLmJ5dGVPZmZzZXQsIHIuYnl0ZUxlbmd0aCksIGYudG9TdHJpbmcoZSk7XG4gICAgICB9XG4gICAgICB2YXIgdyA9IGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHIpO1xuICAgICAgfTtcbiAgICAgIGZ1bmN0aW9uIGgocikge1xuICAgICAgICBmb3IgKHZhciBlID0gMCwgZiA9IE1hdGgubWluKDI1NiAqIDI1Niwgci5sZW5ndGggKyAxKSwgbiA9IG5ldyBVaW50MTZBcnJheShmKSwgaSA9IFtdLCBvID0gMDsgOyApIHtcbiAgICAgICAgICB2YXIgdDIgPSBlIDwgci5sZW5ndGg7XG4gICAgICAgICAgaWYgKCF0MiB8fCBvID49IGYgLSAxKSB7XG4gICAgICAgICAgICB2YXIgcyA9IG4uc3ViYXJyYXkoMCwgbyksIG0gPSBzO1xuICAgICAgICAgICAgaWYgKGkucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIG0pKSwgIXQyKSByZXR1cm4gaS5qb2luKFwiXCIpO1xuICAgICAgICAgICAgciA9IHIuc3ViYXJyYXkoZSksIGUgPSAwLCBvID0gMDtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGEgPSByW2UrK107XG4gICAgICAgICAgaWYgKChhICYgMTI4KSA9PT0gMCkgbltvKytdID0gYTtcbiAgICAgICAgICBlbHNlIGlmICgoYSAmIDIyNCkgPT09IDE5Mikge1xuICAgICAgICAgICAgdmFyIGQgPSByW2UrK10gJiA2MztcbiAgICAgICAgICAgIG5bbysrXSA9IChhICYgMzEpIDw8IDYgfCBkO1xuICAgICAgICAgIH0gZWxzZSBpZiAoKGEgJiAyNDApID09PSAyMjQpIHtcbiAgICAgICAgICAgIHZhciBkID0gcltlKytdICYgNjMsIGwgPSByW2UrK10gJiA2MztcbiAgICAgICAgICAgIG5bbysrXSA9IChhICYgMzEpIDw8IDEyIHwgZCA8PCA2IHwgbDtcbiAgICAgICAgICB9IGVsc2UgaWYgKChhICYgMjQ4KSA9PT0gMjQwKSB7XG4gICAgICAgICAgICB2YXIgZCA9IHJbZSsrXSAmIDYzLCBsID0gcltlKytdICYgNjMsIFIgPSByW2UrK10gJiA2MywgYyA9IChhICYgNykgPDwgMTggfCBkIDw8IDEyIHwgbCA8PCA2IHwgUjtcbiAgICAgICAgICAgIGMgPiA2NTUzNSAmJiAoYyAtPSA2NTUzNiwgbltvKytdID0gYyA+Pj4gMTAgJiAxMDIzIHwgNTUyOTYsIGMgPSA1NjMyMCB8IGMgJiAxMDIzKSwgbltvKytdID0gYztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIEYocikge1xuICAgICAgICBmb3IgKHZhciBlID0gMCwgZiA9IHIubGVuZ3RoLCBuID0gMCwgaSA9IE1hdGgubWF4KDMyLCBmICsgKGYgPj4+IDEpICsgNyksIG8gPSBuZXcgVWludDhBcnJheShpID4+PiAzIDw8IDMpOyBlIDwgZjsgKSB7XG4gICAgICAgICAgdmFyIHQyID0gci5jaGFyQ29kZUF0KGUrKyk7XG4gICAgICAgICAgaWYgKHQyID49IDU1Mjk2ICYmIHQyIDw9IDU2MzE5KSB7XG4gICAgICAgICAgICBpZiAoZSA8IGYpIHtcbiAgICAgICAgICAgICAgdmFyIHMgPSByLmNoYXJDb2RlQXQoZSk7XG4gICAgICAgICAgICAgIChzICYgNjQ1MTIpID09PSA1NjMyMCAmJiAoKytlLCB0MiA9ICgodDIgJiAxMDIzKSA8PCAxMCkgKyAocyAmIDEwMjMpICsgNjU1MzYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHQyID49IDU1Mjk2ICYmIHQyIDw9IDU2MzE5KSBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG4gKyA0ID4gby5sZW5ndGgpIHtcbiAgICAgICAgICAgIGkgKz0gOCwgaSAqPSAxICsgZSAvIHIubGVuZ3RoICogMiwgaSA9IGkgPj4+IDMgPDwgMztcbiAgICAgICAgICAgIHZhciBtID0gbmV3IFVpbnQ4QXJyYXkoaSk7XG4gICAgICAgICAgICBtLnNldChvKSwgbyA9IG07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgodDIgJiA0Mjk0OTY3MTY4KSA9PT0gMCkge1xuICAgICAgICAgICAgb1tuKytdID0gdDI7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCh0MiAmIDQyOTQ5NjUyNDgpID09PSAwKSBvW24rK10gPSB0MiA+Pj4gNiAmIDMxIHwgMTkyO1xuICAgICAgICAgIGVsc2UgaWYgKCh0MiAmIDQyOTQ5MDE3NjApID09PSAwKSBvW24rK10gPSB0MiA+Pj4gMTIgJiAxNSB8IDIyNCwgb1tuKytdID0gdDIgPj4+IDYgJiA2MyB8IDEyODtcbiAgICAgICAgICBlbHNlIGlmICgodDIgJiA0MjkyODcwMTQ0KSA9PT0gMCkgb1tuKytdID0gdDIgPj4+IDE4ICYgNyB8IDI0MCwgb1tuKytdID0gdDIgPj4+IDEyICYgNjMgfCAxMjgsIG9bbisrXSA9IHQyID4+PiA2ICYgNjMgfCAxMjg7XG4gICAgICAgICAgZWxzZSBjb250aW51ZTtcbiAgICAgICAgICBvW24rK10gPSB0MiAmIDYzIHwgMTI4O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvLnNsaWNlID8gby5zbGljZSgwLCBuKSA6IG8uc3ViYXJyYXkoMCwgbik7XG4gICAgICB9XG4gICAgICB2YXIgdSA9IFwiRmFpbGVkIHRvIFwiLCBwID0gZnVuY3Rpb24ociwgZSwgZikge1xuICAgICAgICBpZiAocikgdGhyb3cgbmV3IEVycm9yKFwiXCIuY29uY2F0KHUpLmNvbmNhdChlLCBcIjogdGhlICdcIikuY29uY2F0KGYsIFwiJyBvcHRpb24gaXMgdW5zdXBwb3J0ZWQuXCIpKTtcbiAgICAgIH07XG4gICAgICB2YXIgeCA9IHR5cGVvZiBCdWZmZXIgPT0gXCJmdW5jdGlvblwiICYmIEJ1ZmZlci5mcm9tO1xuICAgICAgdmFyIEEgPSB4ID8gdyA6IEY7XG4gICAgICBmdW5jdGlvbiB2KCkge1xuICAgICAgICB0aGlzLmVuY29kaW5nID0gXCJ1dGYtOFwiO1xuICAgICAgfVxuICAgICAgdi5wcm90b3R5cGUuZW5jb2RlID0gZnVuY3Rpb24ociwgZSkge1xuICAgICAgICByZXR1cm4gcChlICYmIGUuc3RyZWFtLCBcImVuY29kZVwiLCBcInN0cmVhbVwiKSwgQShyKTtcbiAgICAgIH07XG4gICAgICBmdW5jdGlvbiBVKHIpIHtcbiAgICAgICAgdmFyIGU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFyIGYgPSBuZXcgQmxvYihbcl0sIHsgdHlwZTogXCJ0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLThcIiB9KTtcbiAgICAgICAgICBlID0gVVJMLmNyZWF0ZU9iamVjdFVSTChmKTtcbiAgICAgICAgICB2YXIgbiA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgIHJldHVybiBuLm9wZW4oXCJHRVRcIiwgZSwgZmFsc2UpLCBuLnNlbmQoKSwgbi5yZXNwb25zZVRleHQ7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgZSAmJiBVUkwucmV2b2tlT2JqZWN0VVJMKGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgTyA9ICF4ICYmIHR5cGVvZiBCbG9iID09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgVVJMID09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PSBcImZ1bmN0aW9uXCIsIFMgPSBbXCJ1dGYtOFwiLCBcInV0ZjhcIiwgXCJ1bmljb2RlLTEtMS11dGYtOFwiXSwgVCA9IGg7XG4gICAgICB4ID8gVCA9IEIgOiBPICYmIChUID0gZnVuY3Rpb24ocikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBVKHIpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgcmV0dXJuIGgocik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdmFyIHkgPSBcImNvbnN0cnVjdCAnVGV4dERlY29kZXInXCIsIEUgPSBcIlwiLmNvbmNhdCh1LCBcIiBcIikuY29uY2F0KHksIFwiOiB0aGUgXCIpO1xuICAgICAgZnVuY3Rpb24gZyhyLCBlKSB7XG4gICAgICAgIHAoZSAmJiBlLmZhdGFsLCB5LCBcImZhdGFsXCIpLCByID0gciB8fCBcInV0Zi04XCI7XG4gICAgICAgIHZhciBmO1xuICAgICAgICBpZiAoeCA/IGYgPSBCdWZmZXIuaXNFbmNvZGluZyhyKSA6IGYgPSBTLmluZGV4T2Yoci50b0xvd2VyQ2FzZSgpKSAhPT0gLTEsICFmKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIlwiLmNvbmNhdChFLCBcIiBlbmNvZGluZyBsYWJlbCBwcm92aWRlZCAoJ1wiKS5jb25jYXQociwgXCInKSBpcyBpbnZhbGlkLlwiKSk7XG4gICAgICAgIHRoaXMuZW5jb2RpbmcgPSByLCB0aGlzLmZhdGFsID0gZmFsc2UsIHRoaXMuaWdub3JlQk9NID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBnLnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbihyLCBlKSB7XG4gICAgICAgIHAoZSAmJiBlLnN0cmVhbSwgXCJkZWNvZGVcIiwgXCJzdHJlYW1cIik7XG4gICAgICAgIHZhciBmO1xuICAgICAgICByZXR1cm4gciBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkgPyBmID0gciA6IHIuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgPyBmID0gbmV3IFVpbnQ4QXJyYXkoci5idWZmZXIpIDogZiA9IG5ldyBVaW50OEFycmF5KHIpLCBUKGYsIHRoaXMuZW5jb2RpbmcpO1xuICAgICAgfTtcbiAgICAgIHNjb3BlLlRleHRFbmNvZGVyID0gc2NvcGUuVGV4dEVuY29kZXIgfHwgdjtcbiAgICAgIHNjb3BlLlRleHREZWNvZGVyID0gc2NvcGUuVGV4dERlY29kZXIgfHwgZztcbiAgICB9KSh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IGV4cG9ydHMpO1xuICB9XG59KTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3N0YXR1c2VzQDIuMC4yL25vZGVfbW9kdWxlcy9zdGF0dXNlcy9jb2Rlcy5qc29uXG52YXIgcmVxdWlyZV9jb2RlcyA9IF9fY29tbW9uSlMoe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9zdGF0dXNlc0AyLjAuMi9ub2RlX21vZHVsZXMvc3RhdHVzZXMvY29kZXMuanNvblwiKGV4cG9ydHMsIG1vZHVsZSkge1xuICAgIG1vZHVsZS5leHBvcnRzID0ge1xuICAgICAgXCIxMDBcIjogXCJDb250aW51ZVwiLFxuICAgICAgXCIxMDFcIjogXCJTd2l0Y2hpbmcgUHJvdG9jb2xzXCIsXG4gICAgICBcIjEwMlwiOiBcIlByb2Nlc3NpbmdcIixcbiAgICAgIFwiMTAzXCI6IFwiRWFybHkgSGludHNcIixcbiAgICAgIFwiMjAwXCI6IFwiT0tcIixcbiAgICAgIFwiMjAxXCI6IFwiQ3JlYXRlZFwiLFxuICAgICAgXCIyMDJcIjogXCJBY2NlcHRlZFwiLFxuICAgICAgXCIyMDNcIjogXCJOb24tQXV0aG9yaXRhdGl2ZSBJbmZvcm1hdGlvblwiLFxuICAgICAgXCIyMDRcIjogXCJObyBDb250ZW50XCIsXG4gICAgICBcIjIwNVwiOiBcIlJlc2V0IENvbnRlbnRcIixcbiAgICAgIFwiMjA2XCI6IFwiUGFydGlhbCBDb250ZW50XCIsXG4gICAgICBcIjIwN1wiOiBcIk11bHRpLVN0YXR1c1wiLFxuICAgICAgXCIyMDhcIjogXCJBbHJlYWR5IFJlcG9ydGVkXCIsXG4gICAgICBcIjIyNlwiOiBcIklNIFVzZWRcIixcbiAgICAgIFwiMzAwXCI6IFwiTXVsdGlwbGUgQ2hvaWNlc1wiLFxuICAgICAgXCIzMDFcIjogXCJNb3ZlZCBQZXJtYW5lbnRseVwiLFxuICAgICAgXCIzMDJcIjogXCJGb3VuZFwiLFxuICAgICAgXCIzMDNcIjogXCJTZWUgT3RoZXJcIixcbiAgICAgIFwiMzA0XCI6IFwiTm90IE1vZGlmaWVkXCIsXG4gICAgICBcIjMwNVwiOiBcIlVzZSBQcm94eVwiLFxuICAgICAgXCIzMDdcIjogXCJUZW1wb3JhcnkgUmVkaXJlY3RcIixcbiAgICAgIFwiMzA4XCI6IFwiUGVybWFuZW50IFJlZGlyZWN0XCIsXG4gICAgICBcIjQwMFwiOiBcIkJhZCBSZXF1ZXN0XCIsXG4gICAgICBcIjQwMVwiOiBcIlVuYXV0aG9yaXplZFwiLFxuICAgICAgXCI0MDJcIjogXCJQYXltZW50IFJlcXVpcmVkXCIsXG4gICAgICBcIjQwM1wiOiBcIkZvcmJpZGRlblwiLFxuICAgICAgXCI0MDRcIjogXCJOb3QgRm91bmRcIixcbiAgICAgIFwiNDA1XCI6IFwiTWV0aG9kIE5vdCBBbGxvd2VkXCIsXG4gICAgICBcIjQwNlwiOiBcIk5vdCBBY2NlcHRhYmxlXCIsXG4gICAgICBcIjQwN1wiOiBcIlByb3h5IEF1dGhlbnRpY2F0aW9uIFJlcXVpcmVkXCIsXG4gICAgICBcIjQwOFwiOiBcIlJlcXVlc3QgVGltZW91dFwiLFxuICAgICAgXCI0MDlcIjogXCJDb25mbGljdFwiLFxuICAgICAgXCI0MTBcIjogXCJHb25lXCIsXG4gICAgICBcIjQxMVwiOiBcIkxlbmd0aCBSZXF1aXJlZFwiLFxuICAgICAgXCI0MTJcIjogXCJQcmVjb25kaXRpb24gRmFpbGVkXCIsXG4gICAgICBcIjQxM1wiOiBcIlBheWxvYWQgVG9vIExhcmdlXCIsXG4gICAgICBcIjQxNFwiOiBcIlVSSSBUb28gTG9uZ1wiLFxuICAgICAgXCI0MTVcIjogXCJVbnN1cHBvcnRlZCBNZWRpYSBUeXBlXCIsXG4gICAgICBcIjQxNlwiOiBcIlJhbmdlIE5vdCBTYXRpc2ZpYWJsZVwiLFxuICAgICAgXCI0MTdcIjogXCJFeHBlY3RhdGlvbiBGYWlsZWRcIixcbiAgICAgIFwiNDE4XCI6IFwiSSdtIGEgVGVhcG90XCIsXG4gICAgICBcIjQyMVwiOiBcIk1pc2RpcmVjdGVkIFJlcXVlc3RcIixcbiAgICAgIFwiNDIyXCI6IFwiVW5wcm9jZXNzYWJsZSBFbnRpdHlcIixcbiAgICAgIFwiNDIzXCI6IFwiTG9ja2VkXCIsXG4gICAgICBcIjQyNFwiOiBcIkZhaWxlZCBEZXBlbmRlbmN5XCIsXG4gICAgICBcIjQyNVwiOiBcIlRvbyBFYXJseVwiLFxuICAgICAgXCI0MjZcIjogXCJVcGdyYWRlIFJlcXVpcmVkXCIsXG4gICAgICBcIjQyOFwiOiBcIlByZWNvbmRpdGlvbiBSZXF1aXJlZFwiLFxuICAgICAgXCI0MjlcIjogXCJUb28gTWFueSBSZXF1ZXN0c1wiLFxuICAgICAgXCI0MzFcIjogXCJSZXF1ZXN0IEhlYWRlciBGaWVsZHMgVG9vIExhcmdlXCIsXG4gICAgICBcIjQ1MVwiOiBcIlVuYXZhaWxhYmxlIEZvciBMZWdhbCBSZWFzb25zXCIsXG4gICAgICBcIjUwMFwiOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiLFxuICAgICAgXCI1MDFcIjogXCJOb3QgSW1wbGVtZW50ZWRcIixcbiAgICAgIFwiNTAyXCI6IFwiQmFkIEdhdGV3YXlcIixcbiAgICAgIFwiNTAzXCI6IFwiU2VydmljZSBVbmF2YWlsYWJsZVwiLFxuICAgICAgXCI1MDRcIjogXCJHYXRld2F5IFRpbWVvdXRcIixcbiAgICAgIFwiNTA1XCI6IFwiSFRUUCBWZXJzaW9uIE5vdCBTdXBwb3J0ZWRcIixcbiAgICAgIFwiNTA2XCI6IFwiVmFyaWFudCBBbHNvIE5lZ290aWF0ZXNcIixcbiAgICAgIFwiNTA3XCI6IFwiSW5zdWZmaWNpZW50IFN0b3JhZ2VcIixcbiAgICAgIFwiNTA4XCI6IFwiTG9vcCBEZXRlY3RlZFwiLFxuICAgICAgXCI1MDlcIjogXCJCYW5kd2lkdGggTGltaXQgRXhjZWVkZWRcIixcbiAgICAgIFwiNTEwXCI6IFwiTm90IEV4dGVuZGVkXCIsXG4gICAgICBcIjUxMVwiOiBcIk5ldHdvcmsgQXV0aGVudGljYXRpb24gUmVxdWlyZWRcIlxuICAgIH07XG4gIH1cbn0pO1xuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vc3RhdHVzZXNAMi4wLjIvbm9kZV9tb2R1bGVzL3N0YXR1c2VzL2luZGV4LmpzXG52YXIgcmVxdWlyZV9zdGF0dXNlcyA9IF9fY29tbW9uSlMoe1xuICBcIi4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9zdGF0dXNlc0AyLjAuMi9ub2RlX21vZHVsZXMvc3RhdHVzZXMvaW5kZXguanNcIihleHBvcnRzLCBtb2R1bGUpIHtcbiAgICB2YXIgY29kZXMgPSByZXF1aXJlX2NvZGVzKCk7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBzdGF0dXMyO1xuICAgIHN0YXR1czIubWVzc2FnZSA9IGNvZGVzO1xuICAgIHN0YXR1czIuY29kZSA9IGNyZWF0ZU1lc3NhZ2VUb1N0YXR1c0NvZGVNYXAoY29kZXMpO1xuICAgIHN0YXR1czIuY29kZXMgPSBjcmVhdGVTdGF0dXNDb2RlTGlzdChjb2Rlcyk7XG4gICAgc3RhdHVzMi5yZWRpcmVjdCA9IHtcbiAgICAgIDMwMDogdHJ1ZSxcbiAgICAgIDMwMTogdHJ1ZSxcbiAgICAgIDMwMjogdHJ1ZSxcbiAgICAgIDMwMzogdHJ1ZSxcbiAgICAgIDMwNTogdHJ1ZSxcbiAgICAgIDMwNzogdHJ1ZSxcbiAgICAgIDMwODogdHJ1ZVxuICAgIH07XG4gICAgc3RhdHVzMi5lbXB0eSA9IHtcbiAgICAgIDIwNDogdHJ1ZSxcbiAgICAgIDIwNTogdHJ1ZSxcbiAgICAgIDMwNDogdHJ1ZVxuICAgIH07XG4gICAgc3RhdHVzMi5yZXRyeSA9IHtcbiAgICAgIDUwMjogdHJ1ZSxcbiAgICAgIDUwMzogdHJ1ZSxcbiAgICAgIDUwNDogdHJ1ZVxuICAgIH07XG4gICAgZnVuY3Rpb24gY3JlYXRlTWVzc2FnZVRvU3RhdHVzQ29kZU1hcChjb2RlczIpIHtcbiAgICAgIHZhciBtYXAgPSB7fTtcbiAgICAgIE9iamVjdC5rZXlzKGNvZGVzMikuZm9yRWFjaChmdW5jdGlvbiBmb3JFYWNoQ29kZShjb2RlKSB7XG4gICAgICAgIHZhciBtZXNzYWdlID0gY29kZXMyW2NvZGVdO1xuICAgICAgICB2YXIgc3RhdHVzMyA9IE51bWJlcihjb2RlKTtcbiAgICAgICAgbWFwW21lc3NhZ2UudG9Mb3dlckNhc2UoKV0gPSBzdGF0dXMzO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbWFwO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVTdGF0dXNDb2RlTGlzdChjb2RlczIpIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhjb2RlczIpLm1hcChmdW5jdGlvbiBtYXBDb2RlKGNvZGUpIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcihjb2RlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRTdGF0dXNDb2RlKG1lc3NhZ2UpIHtcbiAgICAgIHZhciBtc2cgPSBtZXNzYWdlLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdGF0dXMyLmNvZGUsIG1zZykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHN0YXR1cyBtZXNzYWdlOiBcIicgKyBtZXNzYWdlICsgJ1wiJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RhdHVzMi5jb2RlW21zZ107XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFN0YXR1c01lc3NhZ2UoY29kZSkge1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RhdHVzMi5tZXNzYWdlLCBjb2RlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIHN0YXR1cyBjb2RlOiBcIiArIGNvZGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0YXR1czIubWVzc2FnZVtjb2RlXTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc3RhdHVzMihjb2RlKSB7XG4gICAgICBpZiAodHlwZW9mIGNvZGUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgcmV0dXJuIGdldFN0YXR1c01lc3NhZ2UoY29kZSk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGNvZGUgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImNvZGUgbXVzdCBiZSBhIG51bWJlciBvciBzdHJpbmdcIik7XG4gICAgICB9XG4gICAgICB2YXIgbiA9IHBhcnNlSW50KGNvZGUsIDEwKTtcbiAgICAgIGlmICghaXNOYU4obikpIHtcbiAgICAgICAgcmV0dXJuIGdldFN0YXR1c01lc3NhZ2Uobik7XG4gICAgICB9XG4gICAgICByZXR1cm4gZ2V0U3RhdHVzQ29kZShjb2RlKTtcbiAgICB9XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGliL3RpbWVfZHVyYXRpb24udHNcbnZhciBUaW1lRHVyYXRpb24gPSBjbGFzcyBfVGltZUR1cmF0aW9uIHtcbiAgX190aW1lX2R1cmF0aW9uX21pY3Jvc19fO1xuICBzdGF0aWMgTUlDUk9TX1BFUl9NSUxMSVMgPSAxMDAwbjtcbiAgLyoqXG4gICAqIEdldCB0aGUgYWxnZWJyYWljIHR5cGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIHtAbGluayBUaW1lRHVyYXRpb259IHR5cGUuXG4gICAqIEByZXR1cm5zIFRoZSBhbGdlYnJhaWMgdHlwZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgdHlwZS5cbiAgICovXG4gIHN0YXRpYyBnZXRBbGdlYnJhaWNUeXBlKCkge1xuICAgIHJldHVybiBBbGdlYnJhaWNUeXBlLlByb2R1Y3Qoe1xuICAgICAgZWxlbWVudHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IFwiX190aW1lX2R1cmF0aW9uX21pY3Jvc19fXCIsXG4gICAgICAgICAgYWxnZWJyYWljVHlwZTogQWxnZWJyYWljVHlwZS5JNjRcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuICB9XG4gIHN0YXRpYyBpc1RpbWVEdXJhdGlvbihhbGdlYnJhaWNUeXBlKSB7XG4gICAgaWYgKGFsZ2VicmFpY1R5cGUudGFnICE9PSBcIlByb2R1Y3RcIikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBlbGVtZW50cyA9IGFsZ2VicmFpY1R5cGUudmFsdWUuZWxlbWVudHM7XG4gICAgaWYgKGVsZW1lbnRzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBtaWNyb3NFbGVtZW50ID0gZWxlbWVudHNbMF07XG4gICAgcmV0dXJuIG1pY3Jvc0VsZW1lbnQubmFtZSA9PT0gXCJfX3RpbWVfZHVyYXRpb25fbWljcm9zX19cIiAmJiBtaWNyb3NFbGVtZW50LmFsZ2VicmFpY1R5cGUudGFnID09PSBcIkk2NFwiO1xuICB9XG4gIGdldCBtaWNyb3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX190aW1lX2R1cmF0aW9uX21pY3Jvc19fO1xuICB9XG4gIGdldCBtaWxsaXMoKSB7XG4gICAgcmV0dXJuIE51bWJlcih0aGlzLm1pY3JvcyAvIF9UaW1lRHVyYXRpb24uTUlDUk9TX1BFUl9NSUxMSVMpO1xuICB9XG4gIGNvbnN0cnVjdG9yKG1pY3Jvcykge1xuICAgIHRoaXMuX190aW1lX2R1cmF0aW9uX21pY3Jvc19fID0gbWljcm9zO1xuICB9XG4gIHN0YXRpYyBmcm9tTWlsbGlzKG1pbGxpcykge1xuICAgIHJldHVybiBuZXcgX1RpbWVEdXJhdGlvbihCaWdJbnQobWlsbGlzKSAqIF9UaW1lRHVyYXRpb24uTUlDUk9TX1BFUl9NSUxMSVMpO1xuICB9XG4gIC8qKiBUaGlzIG91dHB1dHMgdGhlIHNhbWUgc3RyaW5nIGZvcm1hdCB0aGF0IHdlIHVzZSBpbiB0aGUgaG9zdCBhbmQgaW4gUnVzdCBtb2R1bGVzICovXG4gIHRvU3RyaW5nKCkge1xuICAgIGNvbnN0IG1pY3JvcyA9IHRoaXMubWljcm9zO1xuICAgIGNvbnN0IHNpZ24gPSBtaWNyb3MgPCAwID8gXCItXCIgOiBcIitcIjtcbiAgICBjb25zdCBwb3MgPSBtaWNyb3MgPCAwID8gLW1pY3JvcyA6IG1pY3JvcztcbiAgICBjb25zdCBzZWNzID0gcG9zIC8gMTAwMDAwMG47XG4gICAgY29uc3QgbWljcm9zX3JlbWFpbmluZyA9IHBvcyAlIDEwMDAwMDBuO1xuICAgIHJldHVybiBgJHtzaWdufSR7c2Vjc30uJHtTdHJpbmcobWljcm9zX3JlbWFpbmluZykucGFkU3RhcnQoNiwgXCIwXCIpfWA7XG4gIH1cbn07XG5cbi8vIHNyYy9saWIvdGltZXN0YW1wLnRzXG52YXIgVGltZXN0YW1wID0gY2xhc3MgX1RpbWVzdGFtcCB7XG4gIF9fdGltZXN0YW1wX21pY3Jvc19zaW5jZV91bml4X2Vwb2NoX187XG4gIHN0YXRpYyBNSUNST1NfUEVSX01JTExJUyA9IDEwMDBuO1xuICBnZXQgbWljcm9zU2luY2VVbml4RXBvY2goKSB7XG4gICAgcmV0dXJuIHRoaXMuX190aW1lc3RhbXBfbWljcm9zX3NpbmNlX3VuaXhfZXBvY2hfXztcbiAgfVxuICBjb25zdHJ1Y3RvcihtaWNyb3MpIHtcbiAgICB0aGlzLl9fdGltZXN0YW1wX21pY3Jvc19zaW5jZV91bml4X2Vwb2NoX18gPSBtaWNyb3M7XG4gIH1cbiAgLyoqXG4gICAqIEdldCB0aGUgYWxnZWJyYWljIHR5cGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIHtAbGluayBUaW1lc3RhbXB9IHR5cGUuXG4gICAqIEByZXR1cm5zIFRoZSBhbGdlYnJhaWMgdHlwZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgdHlwZS5cbiAgICovXG4gIHN0YXRpYyBnZXRBbGdlYnJhaWNUeXBlKCkge1xuICAgIHJldHVybiBBbGdlYnJhaWNUeXBlLlByb2R1Y3Qoe1xuICAgICAgZWxlbWVudHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IFwiX190aW1lc3RhbXBfbWljcm9zX3NpbmNlX3VuaXhfZXBvY2hfX1wiLFxuICAgICAgICAgIGFsZ2VicmFpY1R5cGU6IEFsZ2VicmFpY1R5cGUuSTY0XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcbiAgfVxuICBzdGF0aWMgaXNUaW1lc3RhbXAoYWxnZWJyYWljVHlwZSkge1xuICAgIGlmIChhbGdlYnJhaWNUeXBlLnRhZyAhPT0gXCJQcm9kdWN0XCIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgZWxlbWVudHMgPSBhbGdlYnJhaWNUeXBlLnZhbHVlLmVsZW1lbnRzO1xuICAgIGlmIChlbGVtZW50cy5sZW5ndGggIT09IDEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgbWljcm9zRWxlbWVudCA9IGVsZW1lbnRzWzBdO1xuICAgIHJldHVybiBtaWNyb3NFbGVtZW50Lm5hbWUgPT09IFwiX190aW1lc3RhbXBfbWljcm9zX3NpbmNlX3VuaXhfZXBvY2hfX1wiICYmIG1pY3Jvc0VsZW1lbnQuYWxnZWJyYWljVHlwZS50YWcgPT09IFwiSTY0XCI7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBVbml4IGVwb2NoLCB0aGUgbWlkbmlnaHQgYXQgdGhlIGJlZ2lubmluZyBvZiBKYW51YXJ5IDEsIDE5NzAsIFVUQy5cbiAgICovXG4gIHN0YXRpYyBVTklYX0VQT0NIID0gbmV3IF9UaW1lc3RhbXAoMG4pO1xuICAvKipcbiAgICogR2V0IGEgYFRpbWVzdGFtcGAgcmVwcmVzZW50aW5nIHRoZSBleGVjdXRpb24gZW52aXJvbm1lbnQncyBiZWxpZWYgb2YgdGhlIGN1cnJlbnQgbW9tZW50IGluIHRpbWUuXG4gICAqL1xuICBzdGF0aWMgbm93KCkge1xuICAgIHJldHVybiBfVGltZXN0YW1wLmZyb21EYXRlKC8qIEBfX1BVUkVfXyAqLyBuZXcgRGF0ZSgpKTtcbiAgfVxuICAvKiogQ29udmVydCB0byBtaWxsaXNlY29uZHMgc2luY2UgVW5peCBlcG9jaC4gKi9cbiAgdG9NaWxsaXMoKSB7XG4gICAgcmV0dXJuIHRoaXMubWljcm9zU2luY2VVbml4RXBvY2ggLyAxMDAwbjtcbiAgfVxuICAvKipcbiAgICogR2V0IGEgYFRpbWVzdGFtcGAgcmVwcmVzZW50aW5nIHRoZSBzYW1lIHBvaW50IGluIHRpbWUgYXMgYGRhdGVgLlxuICAgKi9cbiAgc3RhdGljIGZyb21EYXRlKGRhdGUpIHtcbiAgICBjb25zdCBtaWxsaXMgPSBkYXRlLmdldFRpbWUoKTtcbiAgICBjb25zdCBtaWNyb3MgPSBCaWdJbnQobWlsbGlzKSAqIF9UaW1lc3RhbXAuTUlDUk9TX1BFUl9NSUxMSVM7XG4gICAgcmV0dXJuIG5ldyBfVGltZXN0YW1wKG1pY3Jvcyk7XG4gIH1cbiAgLyoqXG4gICAqIEdldCBhIGBEYXRlYCByZXByZXNlbnRpbmcgYXBwcm94aW1hdGVseSB0aGUgc2FtZSBwb2ludCBpbiB0aW1lIGFzIGB0aGlzYC5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgdHJ1bmNhdGVzIHRvIG1pbGxpc2Vjb25kIHByZWNpc2lvbixcbiAgICogYW5kIHRocm93cyBgUmFuZ2VFcnJvcmAgaWYgdGhlIGBUaW1lc3RhbXBgIGlzIG91dHNpZGUgdGhlIHJhbmdlIHJlcHJlc2VudGFibGUgYXMgYSBgRGF0ZWAuXG4gICAqL1xuICB0b0RhdGUoKSB7XG4gICAgY29uc3QgbWljcm9zID0gdGhpcy5fX3RpbWVzdGFtcF9taWNyb3Nfc2luY2VfdW5peF9lcG9jaF9fO1xuICAgIGNvbnN0IG1pbGxpcyA9IG1pY3JvcyAvIF9UaW1lc3RhbXAuTUlDUk9TX1BFUl9NSUxMSVM7XG4gICAgaWYgKG1pbGxpcyA+IEJpZ0ludChOdW1iZXIuTUFYX1NBRkVfSU5URUdFUikgfHwgbWlsbGlzIDwgQmlnSW50KE51bWJlci5NSU5fU0FGRV9JTlRFR0VSKSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXG4gICAgICAgIFwiVGltZXN0YW1wIGlzIG91dHNpZGUgb2YgdGhlIHJlcHJlc2VudGFibGUgcmFuZ2Ugb2YgSlMncyBEYXRlXCJcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgRGF0ZShOdW1iZXIobWlsbGlzKSk7XG4gIH1cbiAgc2luY2Uob3RoZXIpIHtcbiAgICByZXR1cm4gbmV3IFRpbWVEdXJhdGlvbihcbiAgICAgIHRoaXMuX190aW1lc3RhbXBfbWljcm9zX3NpbmNlX3VuaXhfZXBvY2hfXyAtIG90aGVyLl9fdGltZXN0YW1wX21pY3Jvc19zaW5jZV91bml4X2Vwb2NoX19cbiAgICApO1xuICB9XG59O1xuXG4vLyBzcmMvbGliL3V1aWQudHNcbnZhciBVdWlkID0gY2xhc3MgX1V1aWQge1xuICBfX3V1aWRfXztcbiAgLyoqXG4gICAqIFRoZSBuaWwgVVVJRCAoYWxsIHplcm9zKS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHNcbiAgICogY29uc3QgdXVpZCA9IFV1aWQuTklMO1xuICAgKiBjb25zb2xlLmFzc2VydChcbiAgICogICB1dWlkLnRvU3RyaW5nKCkgPT09IFwiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwXCJcbiAgICogKTtcbiAgICogYGBgXG4gICAqL1xuICBzdGF0aWMgTklMID0gbmV3IF9VdWlkKDBuKTtcbiAgc3RhdGljIE1BWF9VVUlEX0JJR0lOVCA9IDB4ZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZuO1xuICAvKipcbiAgICogVGhlIG1heCBVVUlEIChhbGwgb25lcykuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHRzXG4gICAqIGNvbnN0IHV1aWQgPSBVdWlkLk1BWDtcbiAgICogY29uc29sZS5hc3NlcnQoXG4gICAqICAgdXVpZC50b1N0cmluZygpID09PSBcImZmZmZmZmZmLWZmZmYtZmZmZi1mZmZmLWZmZmZmZmZmZmZmZlwiXG4gICAqICk7XG4gICAqIGBgYFxuICAgKi9cbiAgc3RhdGljIE1BWCA9IG5ldyBfVXVpZChfVXVpZC5NQVhfVVVJRF9CSUdJTlQpO1xuICAvKipcbiAgICogQ3JlYXRlIGEgVVVJRCBmcm9tIGEgcmF3IDEyOC1iaXQgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB1IC0gVW5zaWduZWQgMTI4LWJpdCBpbnRlZ2VyXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgdmFsdWUgaXMgb3V0c2lkZSB0aGUgdmFsaWQgVVVJRCByYW5nZVxuICAgKi9cbiAgY29uc3RydWN0b3IodSkge1xuICAgIGlmICh1IDwgMG4gfHwgdSA+IF9VdWlkLk1BWF9VVUlEX0JJR0lOVCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBVVUlEOiBtdXN0IGJlIGJldHdlZW4gMCBhbmQgYE1BWF9VVUlEX0JJR0lOVGBcIik7XG4gICAgfVxuICAgIHRoaXMuX191dWlkX18gPSB1O1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBVVUlEIGB2NGAgZnJvbSBleHBsaWNpdCByYW5kb20gYnl0ZXMuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGFzc3VtZXMgdGhlIGJ5dGVzIGFyZSBhbHJlYWR5IHN1ZmZpY2llbnRseSByYW5kb20uXG4gICAqIEl0IG9ubHkgc2V0cyB0aGUgYXBwcm9wcmlhdGUgYml0cyBmb3IgdGhlIFVVSUQgdmVyc2lvbiBhbmQgdmFyaWFudC5cbiAgICpcbiAgICogQHBhcmFtIGJ5dGVzIC0gRXhhY3RseSAxNiByYW5kb20gYnl0ZXNcbiAgICogQHJldHVybnMgQSBVVUlEIGB2NGBcbiAgICogQHRocm93cyB7RXJyb3J9IElmIGBieXRlcy5sZW5ndGggIT09IDE2YFxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGB0c1xuICAgKiBjb25zdCByYW5kb21CeXRlcyA9IG5ldyBVaW50OEFycmF5KDE2KTtcbiAgICogY29uc3QgdXVpZCA9IFV1aWQuZnJvbVJhbmRvbUJ5dGVzVjQocmFuZG9tQnl0ZXMpO1xuICAgKlxuICAgKiBjb25zb2xlLmFzc2VydChcbiAgICogICB1dWlkLnRvU3RyaW5nKCkgPT09IFwiMDAwMDAwMDAtMDAwMC00MDAwLTgwMDAtMDAwMDAwMDAwMDAwXCJcbiAgICogKTtcbiAgICogYGBgXG4gICAqL1xuICBzdGF0aWMgZnJvbVJhbmRvbUJ5dGVzVjQoYnl0ZXMpIHtcbiAgICBpZiAoYnl0ZXMubGVuZ3RoICE9PSAxNikgdGhyb3cgbmV3IEVycm9yKFwiVVVJRCB2NCByZXF1aXJlcyAxNiBieXRlc1wiKTtcbiAgICBjb25zdCBhcnIgPSBuZXcgVWludDhBcnJheShieXRlcyk7XG4gICAgYXJyWzZdID0gYXJyWzZdICYgMTUgfCA2NDtcbiAgICBhcnJbOF0gPSBhcnJbOF0gJiA2MyB8IDEyODtcbiAgICByZXR1cm4gbmV3IF9VdWlkKF9VdWlkLmJ5dGVzVG9CaWdJbnQoYXJyKSk7XG4gIH1cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGEgVVVJRCBgdjdgIHVzaW5nIGEgbW9ub3RvbmljIGNvdW50ZXIgZnJvbSBgMGAgdG8gYDJeMzEgLSAxYCxcbiAgICogYSB0aW1lc3RhbXAsIGFuZCA0IHJhbmRvbSBieXRlcy5cbiAgICpcbiAgICogVGhlIGNvdW50ZXIgd3JhcHMgYXJvdW5kIG9uIG92ZXJmbG93LlxuICAgKlxuICAgKiBUaGUgVVVJRCBgdjdgIGlzIHN0cnVjdHVyZWQgYXMgZm9sbG93czpcbiAgICpcbiAgICogYGBgYXNjaWlcbiAgICog4pSM4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSs4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSQXG4gICAqIHwgQjAgIHwgQjEgIHwgQjIgIHwgQjMgIHwgQjQgIHwgQjUgICAgICAgICAgICAgIHwgICAgICAgICBCNiAgICAgICAgfFxuICAgKiDilJzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilLzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilKRcbiAgICogfCAgICAgICAgICAgICAgICAgdW5peF90c19tcyAgICAgICAgICAgICAgICAgICAgfCAgICAgIHZlcnNpb24gNyAgICB8XG4gICAqIOKUlOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUtOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUmFxuICAgKiDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilKzilIDilIDilIDilIDilIDilIDilIDilIDilIDilKzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilKzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJBcbiAgICogfCBCNyAgICAgICAgICAgfCBCOCAgICAgIHwgQjkgIHwgQjEwIHwgQjExICB8IEIxMiB8IEIxMyB8IEIxNCB8IEIxNSB8XG4gICAqIOKUnOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUvOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUvOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUvOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUpFxuICAgKiB8IGNvdW50ZXJfaGlnaCB8IHZhcmlhbnQgfCAgICBjb3VudGVyX2xvdyAgIHwgICAgICAgIHJhbmRvbSAgICAgICAgIHxcbiAgICog4pSU4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS04pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS04pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pS04pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSYXG4gICAqIGBgYFxuICAgKlxuICAgKiBAcGFyYW0gY291bnRlciAtIE11dGFibGUgbW9ub3RvbmljIGNvdW50ZXIgKDMxLWJpdClcbiAgICogQHBhcmFtIG5vdyAtIFRpbWVzdGFtcCBzaW5jZSB0aGUgVW5peCBlcG9jaFxuICAgKiBAcGFyYW0gcmFuZG9tQnl0ZXMgLSBFeGFjdGx5IDQgcmFuZG9tIGJ5dGVzXG4gICAqIEByZXR1cm5zIEEgVVVJRCBgdjdgXG4gICAqXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgYGNvdW50ZXJgIGlzIG5lZ2F0aXZlXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgYHRpbWVzdGFtcGAgaXMgYmVmb3JlIHRoZSBVbml4IGVwb2NoXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiBgcmFuZG9tQnl0ZXMubGVuZ3RoICE9PSA0YFxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGB0c1xuICAgKiBjb25zdCBub3cgPSBUaW1lc3RhbXAuZnJvbU1pbGxpcygxXzY4Nl8wMDBfMDAwXzAwMG4pO1xuICAgKiBjb25zdCBjb3VudGVyID0geyB2YWx1ZTogMSB9O1xuICAgKiBjb25zdCByYW5kb21CeXRlcyA9IG5ldyBVaW50OEFycmF5KDQpO1xuICAgKlxuICAgKiBjb25zdCB1dWlkID0gVXVpZC5mcm9tQ291bnRlclY3KGNvdW50ZXIsIG5vdywgcmFuZG9tQnl0ZXMpO1xuICAgKlxuICAgKiBjb25zb2xlLmFzc2VydChcbiAgICogICB1dWlkLnRvU3RyaW5nKCkgPT09IFwiMDAwMDY0N2UtNTE4MC03MDAwLTgwMDAtMDAwMjAwMDAwMDAwXCJcbiAgICogKTtcbiAgICogYGBgXG4gICAqL1xuICBzdGF0aWMgZnJvbUNvdW50ZXJWNyhjb3VudGVyLCBub3csIHJhbmRvbUJ5dGVzKSB7XG4gICAgaWYgKHJhbmRvbUJ5dGVzLmxlbmd0aCAhPT0gNCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYGZyb21Db3VudGVyVjdgIHJlcXVpcmVzIGByYW5kb21CeXRlcy5sZW5ndGggPT0gNGBcIik7XG4gICAgfVxuICAgIGlmIChjb3VudGVyLnZhbHVlIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYGZyb21Db3VudGVyVjdgIHV1aWQgYGNvdW50ZXJgIG11c3QgYmUgbm9uLW5lZ2F0aXZlXCIpO1xuICAgIH1cbiAgICBpZiAobm93Ll9fdGltZXN0YW1wX21pY3Jvc19zaW5jZV91bml4X2Vwb2NoX18gPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJgZnJvbUNvdW50ZXJWN2AgYHRpbWVzdGFtcGAgYmVmb3JlIHVuaXggZXBvY2hcIik7XG4gICAgfVxuICAgIGNvbnN0IGNvdW50ZXJWYWwgPSBjb3VudGVyLnZhbHVlO1xuICAgIGNvdW50ZXIudmFsdWUgPSBjb3VudGVyVmFsICsgMSAmIDIxNDc0ODM2NDc7XG4gICAgY29uc3QgdHNNcyA9IG5vdy50b01pbGxpcygpICYgMHhmZmZmZmZmZmZmZmZuO1xuICAgIGNvbnN0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuICAgIGJ5dGVzWzBdID0gTnVtYmVyKHRzTXMgPj4gNDBuICYgMHhmZm4pO1xuICAgIGJ5dGVzWzFdID0gTnVtYmVyKHRzTXMgPj4gMzJuICYgMHhmZm4pO1xuICAgIGJ5dGVzWzJdID0gTnVtYmVyKHRzTXMgPj4gMjRuICYgMHhmZm4pO1xuICAgIGJ5dGVzWzNdID0gTnVtYmVyKHRzTXMgPj4gMTZuICYgMHhmZm4pO1xuICAgIGJ5dGVzWzRdID0gTnVtYmVyKHRzTXMgPj4gOG4gJiAweGZmbik7XG4gICAgYnl0ZXNbNV0gPSBOdW1iZXIodHNNcyAmIDB4ZmZuKTtcbiAgICBieXRlc1s3XSA9IGNvdW50ZXJWYWwgPj4+IDIzICYgMjU1O1xuICAgIGJ5dGVzWzldID0gY291bnRlclZhbCA+Pj4gMTUgJiAyNTU7XG4gICAgYnl0ZXNbMTBdID0gY291bnRlclZhbCA+Pj4gNyAmIDI1NTtcbiAgICBieXRlc1sxMV0gPSAoY291bnRlclZhbCAmIDEyNykgPDwgMSAmIDI1NTtcbiAgICBieXRlc1sxMl0gfD0gcmFuZG9tQnl0ZXNbMF0gJiAxMjc7XG4gICAgYnl0ZXNbMTNdID0gcmFuZG9tQnl0ZXNbMV07XG4gICAgYnl0ZXNbMTRdID0gcmFuZG9tQnl0ZXNbMl07XG4gICAgYnl0ZXNbMTVdID0gcmFuZG9tQnl0ZXNbM107XG4gICAgYnl0ZXNbNl0gPSBieXRlc1s2XSAmIDE1IHwgMTEyO1xuICAgIGJ5dGVzWzhdID0gYnl0ZXNbOF0gJiA2MyB8IDEyODtcbiAgICByZXR1cm4gbmV3IF9VdWlkKF9VdWlkLmJ5dGVzVG9CaWdJbnQoYnl0ZXMpKTtcbiAgfVxuICAvKipcbiAgICogUGFyc2UgYSBVVUlEIGZyb20gYSBzdHJpbmcgcmVwcmVzZW50YXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSBzIC0gVVVJRCBzdHJpbmdcbiAgICogQHJldHVybnMgUGFyc2VkIFVVSURcbiAgICogQHRocm93cyB7RXJyb3J9IElmIHRoZSBzdHJpbmcgaXMgbm90IGEgdmFsaWQgVVVJRFxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGB0c1xuICAgKiBjb25zdCBzID0gXCIwMTg4OGQ2ZS01YzAwLTcwMDAtODAwMC0wMDAwMDAwMDAwMDBcIjtcbiAgICogY29uc3QgdXVpZCA9IFV1aWQucGFyc2Uocyk7XG4gICAqXG4gICAqIGNvbnNvbGUuYXNzZXJ0KHV1aWQudG9TdHJpbmcoKSA9PT0gcyk7XG4gICAqIGBgYFxuICAgKi9cbiAgc3RhdGljIHBhcnNlKHMpIHtcbiAgICBjb25zdCBoZXggPSBzLnJlcGxhY2UoLy0vZywgXCJcIik7XG4gICAgaWYgKGhleC5sZW5ndGggIT09IDMyKSB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGhleCBVVUlEXCIpO1xuICAgIGxldCB2ID0gMG47XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzMjsgaSArPSAyKSB7XG4gICAgICB2ID0gdiA8PCA4biB8IEJpZ0ludChwYXJzZUludChoZXguc2xpY2UoaSwgaSArIDIpLCAxNikpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IF9VdWlkKHYpO1xuICB9XG4gIC8qKiBDb252ZXJ0IHRvIHN0cmluZyAoaHlwaGVuYXRlZCBmb3JtKS4gKi9cbiAgdG9TdHJpbmcoKSB7XG4gICAgY29uc3QgYnl0ZXMgPSBfVXVpZC5iaWdJbnRUb0J5dGVzKHRoaXMuX191dWlkX18pO1xuICAgIGNvbnN0IGhleCA9IFsuLi5ieXRlc10ubWFwKChiKSA9PiBiLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCBcIjBcIikpLmpvaW4oXCJcIik7XG4gICAgcmV0dXJuIGhleC5zbGljZSgwLCA4KSArIFwiLVwiICsgaGV4LnNsaWNlKDgsIDEyKSArIFwiLVwiICsgaGV4LnNsaWNlKDEyLCAxNikgKyBcIi1cIiArIGhleC5zbGljZSgxNiwgMjApICsgXCItXCIgKyBoZXguc2xpY2UoMjApO1xuICB9XG4gIC8qKiBDb252ZXJ0IHRvIGJpZ2ludCAodTEyOCkuICovXG4gIGFzQmlnSW50KCkge1xuICAgIHJldHVybiB0aGlzLl9fdXVpZF9fO1xuICB9XG4gIC8qKiBSZXR1cm4gYSBgVWludDhBcnJheWAgb2YgMTYgYnl0ZXMuICovXG4gIHRvQnl0ZXMoKSB7XG4gICAgcmV0dXJuIF9VdWlkLmJpZ0ludFRvQnl0ZXModGhpcy5fX3V1aWRfXyk7XG4gIH1cbiAgc3RhdGljIGJ5dGVzVG9CaWdJbnQoYnl0ZXMpIHtcbiAgICBsZXQgcmVzdWx0ID0gMG47XG4gICAgZm9yIChjb25zdCBiIG9mIGJ5dGVzKSByZXN1bHQgPSByZXN1bHQgPDwgOG4gfCBCaWdJbnQoYik7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBzdGF0aWMgYmlnSW50VG9CeXRlcyh2YWx1ZSkge1xuICAgIGNvbnN0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuICAgIGZvciAobGV0IGkgPSAxNTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGJ5dGVzW2ldID0gTnVtYmVyKHZhbHVlICYgMHhmZm4pO1xuICAgICAgdmFsdWUgPj49IDhuO1xuICAgIH1cbiAgICByZXR1cm4gYnl0ZXM7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZlcnNpb24gb2YgdGhpcyBVVUlELlxuICAgKlxuICAgKiBUaGlzIHJlcHJlc2VudHMgdGhlIGFsZ29yaXRobSB1c2VkIHRvIGdlbmVyYXRlIHRoZSB2YWx1ZS5cbiAgICpcbiAgICogQHJldHVybnMgQSBgVXVpZFZlcnNpb25gXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiB0aGUgdmVyc2lvbiBmaWVsZCBpcyBub3QgcmVjb2duaXplZFxuICAgKi9cbiAgZ2V0VmVyc2lvbigpIHtcbiAgICBjb25zdCB2ZXJzaW9uID0gdGhpcy50b0J5dGVzKClbNl0gPj4gNCAmIDE1O1xuICAgIHN3aXRjaCAodmVyc2lvbikge1xuICAgICAgY2FzZSA0OlxuICAgICAgICByZXR1cm4gXCJWNFwiO1xuICAgICAgY2FzZSA3OlxuICAgICAgICByZXR1cm4gXCJWN1wiO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKHRoaXMgPT0gX1V1aWQuTklMKSB7XG4gICAgICAgICAgcmV0dXJuIFwiTmlsXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMgPT0gX1V1aWQuTUFYKSB7XG4gICAgICAgICAgcmV0dXJuIFwiTWF4XCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBVVUlEIHZlcnNpb246ICR7dmVyc2lvbn1gKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEV4dHJhY3QgdGhlIG1vbm90b25pYyBjb3VudGVyIGZyb20gYSBVVUlEdjcuXG4gICAqXG4gICAqIEludGVuZGVkIGZvciB0ZXN0aW5nIGFuZCBkaWFnbm9zdGljcy5cbiAgICogQmVoYXZpb3IgaXMgdW5kZWZpbmVkIGlmIGNhbGxlZCBvbiBhIG5vbi1WNyBVVUlELlxuICAgKlxuICAgKiBAcmV0dXJucyAzMS1iaXQgY291bnRlciB2YWx1ZVxuICAgKi9cbiAgZ2V0Q291bnRlcigpIHtcbiAgICBjb25zdCBieXRlcyA9IHRoaXMudG9CeXRlcygpO1xuICAgIGNvbnN0IGhpZ2ggPSBieXRlc1s3XTtcbiAgICBjb25zdCBtaWQxID0gYnl0ZXNbOV07XG4gICAgY29uc3QgbWlkMiA9IGJ5dGVzWzEwXTtcbiAgICBjb25zdCBsb3cgPSBieXRlc1sxMV0gPj4+IDE7XG4gICAgcmV0dXJuIGhpZ2ggPDwgMjMgfCBtaWQxIDw8IDE1IHwgbWlkMiA8PCA3IHwgbG93IHwgMDtcbiAgfVxuICBjb21wYXJlVG8ob3RoZXIpIHtcbiAgICBpZiAodGhpcy5fX3V1aWRfXyA8IG90aGVyLl9fdXVpZF9fKSByZXR1cm4gLTE7XG4gICAgaWYgKHRoaXMuX191dWlkX18gPiBvdGhlci5fX3V1aWRfXykgcmV0dXJuIDE7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgc3RhdGljIGdldEFsZ2VicmFpY1R5cGUoKSB7XG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUuUHJvZHVjdCh7XG4gICAgICBlbGVtZW50czogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJfX3V1aWRfX1wiLFxuICAgICAgICAgIGFsZ2VicmFpY1R5cGU6IEFsZ2VicmFpY1R5cGUuVTEyOFxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG4gIH1cbn07XG5cbi8vIHNyYy9saWIvYmluYXJ5X3JlYWRlci50c1xudmFyIEJpbmFyeVJlYWRlciA9IGNsYXNzIHtcbiAgLyoqXG4gICAqIFRoZSBEYXRhVmlldyB1c2VkIHRvIHJlYWQgdmFsdWVzIGZyb20gdGhlIGJpbmFyeSBkYXRhLlxuICAgKlxuICAgKiBOb3RlOiBUaGUgRGF0YVZpZXcncyBgYnl0ZU9mZnNldGAgaXMgcmVsYXRpdmUgdG8gdGhlIGJlZ2lubmluZyBvZiB0aGVcbiAgICogdW5kZXJseWluZyBBcnJheUJ1ZmZlciwgbm90IHRoZSBzdGFydCBvZiB0aGUgcHJvdmlkZWQgVWludDhBcnJheSBpbnB1dC5cbiAgICogVGhpcyBgQmluYXJ5UmVhZGVyYCdzIGAjb2Zmc2V0YCBmaWVsZCBpcyB1c2VkIHRvIHRyYWNrIHRoZSBjdXJyZW50IHJlYWQgcG9zaXRpb25cbiAgICogcmVsYXRpdmUgdG8gdGhlIHN0YXJ0IG9mIHRoZSBwcm92aWRlZCBVaW50OEFycmF5IGlucHV0LlxuICAgKi9cbiAgI3ZpZXc7XG4gIC8qKlxuICAgKiBSZXByZXNlbnRzIHRoZSBvZmZzZXQgKGluIGJ5dGVzKSByZWxhdGl2ZSB0byB0aGUgc3RhcnQgb2YgdGhlIERhdGFWaWV3XG4gICAqIGFuZCBwcm92aWRlZCBVaW50OEFycmF5IGlucHV0LlxuICAgKlxuICAgKiBOb3RlOiBUaGlzIGlzICpub3QqIHRoZSBhYnNvbHV0ZSBieXRlIG9mZnNldCB3aXRoaW4gdGhlIHVuZGVybHlpbmcgQXJyYXlCdWZmZXIuXG4gICAqL1xuICAjb2Zmc2V0ID0gMDtcbiAgY29uc3RydWN0b3IoaW5wdXQpIHtcbiAgICB0aGlzLiN2aWV3ID0gbmV3IERhdGFWaWV3KGlucHV0LmJ1ZmZlciwgaW5wdXQuYnl0ZU9mZnNldCwgaW5wdXQuYnl0ZUxlbmd0aCk7XG4gICAgdGhpcy4jb2Zmc2V0ID0gMDtcbiAgfVxuICBnZXQgb2Zmc2V0KCkge1xuICAgIHJldHVybiB0aGlzLiNvZmZzZXQ7XG4gIH1cbiAgZ2V0IHJlbWFpbmluZygpIHtcbiAgICByZXR1cm4gdGhpcy4jdmlldy5ieXRlTGVuZ3RoIC0gdGhpcy4jb2Zmc2V0O1xuICB9XG4gIC8qKiBFbnN1cmUgd2UgaGF2ZSBhdCBsZWFzdCBgbmAgYnl0ZXMgbGVmdCB0byByZWFkICovXG4gICNlbnN1cmUobikge1xuICAgIGlmICh0aGlzLiNvZmZzZXQgKyBuID4gdGhpcy4jdmlldy5ieXRlTGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcbiAgICAgICAgYFRyaWVkIHRvIHJlYWQgJHtufSBieXRlKHMpIGF0IHJlbGF0aXZlIG9mZnNldCAke3RoaXMuI29mZnNldH0sIGJ1dCBvbmx5ICR7dGhpcy5yZW1haW5pbmd9IGJ5dGUocykgcmVtYWluYFxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgcmVhZFVJbnQ4QXJyYXkoKSB7XG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5yZWFkVTMyKCk7XG4gICAgdGhpcy4jZW5zdXJlKGxlbmd0aCk7XG4gICAgcmV0dXJuIHRoaXMucmVhZEJ5dGVzKGxlbmd0aCk7XG4gIH1cbiAgcmVhZEJvb2woKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLiN2aWV3LmdldFVpbnQ4KHRoaXMuI29mZnNldCk7XG4gICAgdGhpcy4jb2Zmc2V0ICs9IDE7XG4gICAgcmV0dXJuIHZhbHVlICE9PSAwO1xuICB9XG4gIHJlYWRCeXRlKCkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy4jdmlldy5nZXRVaW50OCh0aGlzLiNvZmZzZXQpO1xuICAgIHRoaXMuI29mZnNldCArPSAxO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByZWFkQnl0ZXMobGVuZ3RoKSB7XG4gICAgY29uc3QgYXJyYXkgPSBuZXcgVWludDhBcnJheShcbiAgICAgIHRoaXMuI3ZpZXcuYnVmZmVyLFxuICAgICAgdGhpcy4jdmlldy5ieXRlT2Zmc2V0ICsgdGhpcy4jb2Zmc2V0LFxuICAgICAgbGVuZ3RoXG4gICAgKTtcbiAgICB0aGlzLiNvZmZzZXQgKz0gbGVuZ3RoO1xuICAgIHJldHVybiBhcnJheTtcbiAgfVxuICByZWFkSTgoKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLiN2aWV3LmdldEludDgodGhpcy4jb2Zmc2V0KTtcbiAgICB0aGlzLiNvZmZzZXQgKz0gMTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmVhZFU4KCkge1xuICAgIHJldHVybiB0aGlzLnJlYWRCeXRlKCk7XG4gIH1cbiAgcmVhZEkxNigpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuI3ZpZXcuZ2V0SW50MTYodGhpcy4jb2Zmc2V0LCB0cnVlKTtcbiAgICB0aGlzLiNvZmZzZXQgKz0gMjtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmVhZFUxNigpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuI3ZpZXcuZ2V0VWludDE2KHRoaXMuI29mZnNldCwgdHJ1ZSk7XG4gICAgdGhpcy4jb2Zmc2V0ICs9IDI7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJlYWRJMzIoKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLiN2aWV3LmdldEludDMyKHRoaXMuI29mZnNldCwgdHJ1ZSk7XG4gICAgdGhpcy4jb2Zmc2V0ICs9IDQ7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJlYWRVMzIoKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLiN2aWV3LmdldFVpbnQzMih0aGlzLiNvZmZzZXQsIHRydWUpO1xuICAgIHRoaXMuI29mZnNldCArPSA0O1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByZWFkSTY0KCkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy4jdmlldy5nZXRCaWdJbnQ2NCh0aGlzLiNvZmZzZXQsIHRydWUpO1xuICAgIHRoaXMuI29mZnNldCArPSA4O1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByZWFkVTY0KCkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy4jdmlldy5nZXRCaWdVaW50NjQodGhpcy4jb2Zmc2V0LCB0cnVlKTtcbiAgICB0aGlzLiNvZmZzZXQgKz0gODtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmVhZFUxMjgoKSB7XG4gICAgY29uc3QgbG93ZXJQYXJ0ID0gdGhpcy4jdmlldy5nZXRCaWdVaW50NjQodGhpcy4jb2Zmc2V0LCB0cnVlKTtcbiAgICBjb25zdCB1cHBlclBhcnQgPSB0aGlzLiN2aWV3LmdldEJpZ1VpbnQ2NCh0aGlzLiNvZmZzZXQgKyA4LCB0cnVlKTtcbiAgICB0aGlzLiNvZmZzZXQgKz0gMTY7XG4gICAgcmV0dXJuICh1cHBlclBhcnQgPDwgQmlnSW50KDY0KSkgKyBsb3dlclBhcnQ7XG4gIH1cbiAgcmVhZEkxMjgoKSB7XG4gICAgY29uc3QgbG93ZXJQYXJ0ID0gdGhpcy4jdmlldy5nZXRCaWdVaW50NjQodGhpcy4jb2Zmc2V0LCB0cnVlKTtcbiAgICBjb25zdCB1cHBlclBhcnQgPSB0aGlzLiN2aWV3LmdldEJpZ0ludDY0KHRoaXMuI29mZnNldCArIDgsIHRydWUpO1xuICAgIHRoaXMuI29mZnNldCArPSAxNjtcbiAgICByZXR1cm4gKHVwcGVyUGFydCA8PCBCaWdJbnQoNjQpKSArIGxvd2VyUGFydDtcbiAgfVxuICByZWFkVTI1NigpIHtcbiAgICBjb25zdCBwMCA9IHRoaXMuI3ZpZXcuZ2V0QmlnVWludDY0KHRoaXMuI29mZnNldCwgdHJ1ZSk7XG4gICAgY29uc3QgcDEgPSB0aGlzLiN2aWV3LmdldEJpZ1VpbnQ2NCh0aGlzLiNvZmZzZXQgKyA4LCB0cnVlKTtcbiAgICBjb25zdCBwMiA9IHRoaXMuI3ZpZXcuZ2V0QmlnVWludDY0KHRoaXMuI29mZnNldCArIDE2LCB0cnVlKTtcbiAgICBjb25zdCBwMyA9IHRoaXMuI3ZpZXcuZ2V0QmlnVWludDY0KHRoaXMuI29mZnNldCArIDI0LCB0cnVlKTtcbiAgICB0aGlzLiNvZmZzZXQgKz0gMzI7XG4gICAgcmV0dXJuIChwMyA8PCBCaWdJbnQoMyAqIDY0KSkgKyAocDIgPDwgQmlnSW50KDIgKiA2NCkpICsgKHAxIDw8IEJpZ0ludCgxICogNjQpKSArIHAwO1xuICB9XG4gIHJlYWRJMjU2KCkge1xuICAgIGNvbnN0IHAwID0gdGhpcy4jdmlldy5nZXRCaWdVaW50NjQodGhpcy4jb2Zmc2V0LCB0cnVlKTtcbiAgICBjb25zdCBwMSA9IHRoaXMuI3ZpZXcuZ2V0QmlnVWludDY0KHRoaXMuI29mZnNldCArIDgsIHRydWUpO1xuICAgIGNvbnN0IHAyID0gdGhpcy4jdmlldy5nZXRCaWdVaW50NjQodGhpcy4jb2Zmc2V0ICsgMTYsIHRydWUpO1xuICAgIGNvbnN0IHAzID0gdGhpcy4jdmlldy5nZXRCaWdJbnQ2NCh0aGlzLiNvZmZzZXQgKyAyNCwgdHJ1ZSk7XG4gICAgdGhpcy4jb2Zmc2V0ICs9IDMyO1xuICAgIHJldHVybiAocDMgPDwgQmlnSW50KDMgKiA2NCkpICsgKHAyIDw8IEJpZ0ludCgyICogNjQpKSArIChwMSA8PCBCaWdJbnQoMSAqIDY0KSkgKyBwMDtcbiAgfVxuICByZWFkRjMyKCkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy4jdmlldy5nZXRGbG9hdDMyKHRoaXMuI29mZnNldCwgdHJ1ZSk7XG4gICAgdGhpcy4jb2Zmc2V0ICs9IDQ7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJlYWRGNjQoKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLiN2aWV3LmdldEZsb2F0NjQodGhpcy4jb2Zmc2V0LCB0cnVlKTtcbiAgICB0aGlzLiNvZmZzZXQgKz0gODtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgcmVhZFN0cmluZygpIHtcbiAgICBjb25zdCB1aW50OEFycmF5ID0gdGhpcy5yZWFkVUludDhBcnJheSgpO1xuICAgIHJldHVybiBuZXcgVGV4dERlY29kZXIoXCJ1dGYtOFwiKS5kZWNvZGUodWludDhBcnJheSk7XG4gIH1cbn07XG5cbi8vIHNyYy9saWIvYmluYXJ5X3dyaXRlci50c1xudmFyIGltcG9ydF9iYXNlNjRfanMgPSBfX3RvRVNNKHJlcXVpcmVfYmFzZTY0X2pzKCkpO1xudmFyIEJpbmFyeVdyaXRlciA9IGNsYXNzIHtcbiAgI2J1ZmZlcjtcbiAgI3ZpZXc7XG4gICNvZmZzZXQgPSAwO1xuICBjb25zdHJ1Y3RvcihzaXplKSB7XG4gICAgdGhpcy4jYnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSk7XG4gICAgdGhpcy4jdmlldyA9IG5ldyBEYXRhVmlldyh0aGlzLiNidWZmZXIuYnVmZmVyKTtcbiAgfVxuICAjZXhwYW5kQnVmZmVyKGFkZGl0aW9uYWxDYXBhY2l0eSkge1xuICAgIGNvbnN0IG1pbkNhcGFjaXR5ID0gdGhpcy4jb2Zmc2V0ICsgYWRkaXRpb25hbENhcGFjaXR5ICsgMTtcbiAgICBpZiAobWluQ2FwYWNpdHkgPD0gdGhpcy4jYnVmZmVyLmxlbmd0aCkgcmV0dXJuO1xuICAgIGxldCBuZXdDYXBhY2l0eSA9IHRoaXMuI2J1ZmZlci5sZW5ndGggKiAyO1xuICAgIGlmIChuZXdDYXBhY2l0eSA8IG1pbkNhcGFjaXR5KSBuZXdDYXBhY2l0eSA9IG1pbkNhcGFjaXR5O1xuICAgIGNvbnN0IG5ld0J1ZmZlciA9IG5ldyBVaW50OEFycmF5KG5ld0NhcGFjaXR5KTtcbiAgICBuZXdCdWZmZXIuc2V0KHRoaXMuI2J1ZmZlcik7XG4gICAgdGhpcy4jYnVmZmVyID0gbmV3QnVmZmVyO1xuICAgIHRoaXMuI3ZpZXcgPSBuZXcgRGF0YVZpZXcodGhpcy4jYnVmZmVyLmJ1ZmZlcik7XG4gIH1cbiAgdG9CYXNlNjQoKSB7XG4gICAgcmV0dXJuICgwLCBpbXBvcnRfYmFzZTY0X2pzLmZyb21CeXRlQXJyYXkpKHRoaXMuI2J1ZmZlci5zdWJhcnJheSgwLCB0aGlzLiNvZmZzZXQpKTtcbiAgfVxuICBnZXRCdWZmZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuI2J1ZmZlci5zbGljZSgwLCB0aGlzLiNvZmZzZXQpO1xuICB9XG4gIGdldCBvZmZzZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuI29mZnNldDtcbiAgfVxuICB3cml0ZVVJbnQ4QXJyYXkodmFsdWUpIHtcbiAgICBjb25zdCBsZW5ndGggPSB2YWx1ZS5sZW5ndGg7XG4gICAgdGhpcy4jZXhwYW5kQnVmZmVyKDQgKyBsZW5ndGgpO1xuICAgIHRoaXMud3JpdGVVMzIobGVuZ3RoKTtcbiAgICB0aGlzLiNidWZmZXIuc2V0KHZhbHVlLCB0aGlzLiNvZmZzZXQpO1xuICAgIHRoaXMuI29mZnNldCArPSB2YWx1ZS5sZW5ndGg7XG4gIH1cbiAgd3JpdGVCb29sKHZhbHVlKSB7XG4gICAgdGhpcy4jZXhwYW5kQnVmZmVyKDEpO1xuICAgIHRoaXMuI3ZpZXcuc2V0VWludDgodGhpcy4jb2Zmc2V0LCB2YWx1ZSA/IDEgOiAwKTtcbiAgICB0aGlzLiNvZmZzZXQgKz0gMTtcbiAgfVxuICB3cml0ZUJ5dGUodmFsdWUpIHtcbiAgICB0aGlzLiNleHBhbmRCdWZmZXIoMSk7XG4gICAgdGhpcy4jdmlldy5zZXRVaW50OCh0aGlzLiNvZmZzZXQsIHZhbHVlKTtcbiAgICB0aGlzLiNvZmZzZXQgKz0gMTtcbiAgfVxuICB3cml0ZUk4KHZhbHVlKSB7XG4gICAgdGhpcy4jZXhwYW5kQnVmZmVyKDEpO1xuICAgIHRoaXMuI3ZpZXcuc2V0SW50OCh0aGlzLiNvZmZzZXQsIHZhbHVlKTtcbiAgICB0aGlzLiNvZmZzZXQgKz0gMTtcbiAgfVxuICB3cml0ZVU4KHZhbHVlKSB7XG4gICAgdGhpcy4jZXhwYW5kQnVmZmVyKDEpO1xuICAgIHRoaXMuI3ZpZXcuc2V0VWludDgodGhpcy4jb2Zmc2V0LCB2YWx1ZSk7XG4gICAgdGhpcy4jb2Zmc2V0ICs9IDE7XG4gIH1cbiAgd3JpdGVJMTYodmFsdWUpIHtcbiAgICB0aGlzLiNleHBhbmRCdWZmZXIoMik7XG4gICAgdGhpcy4jdmlldy5zZXRJbnQxNih0aGlzLiNvZmZzZXQsIHZhbHVlLCB0cnVlKTtcbiAgICB0aGlzLiNvZmZzZXQgKz0gMjtcbiAgfVxuICB3cml0ZVUxNih2YWx1ZSkge1xuICAgIHRoaXMuI2V4cGFuZEJ1ZmZlcigyKTtcbiAgICB0aGlzLiN2aWV3LnNldFVpbnQxNih0aGlzLiNvZmZzZXQsIHZhbHVlLCB0cnVlKTtcbiAgICB0aGlzLiNvZmZzZXQgKz0gMjtcbiAgfVxuICB3cml0ZUkzMih2YWx1ZSkge1xuICAgIHRoaXMuI2V4cGFuZEJ1ZmZlcig0KTtcbiAgICB0aGlzLiN2aWV3LnNldEludDMyKHRoaXMuI29mZnNldCwgdmFsdWUsIHRydWUpO1xuICAgIHRoaXMuI29mZnNldCArPSA0O1xuICB9XG4gIHdyaXRlVTMyKHZhbHVlKSB7XG4gICAgdGhpcy4jZXhwYW5kQnVmZmVyKDQpO1xuICAgIHRoaXMuI3ZpZXcuc2V0VWludDMyKHRoaXMuI29mZnNldCwgdmFsdWUsIHRydWUpO1xuICAgIHRoaXMuI29mZnNldCArPSA0O1xuICB9XG4gIHdyaXRlSTY0KHZhbHVlKSB7XG4gICAgdGhpcy4jZXhwYW5kQnVmZmVyKDgpO1xuICAgIHRoaXMuI3ZpZXcuc2V0QmlnSW50NjQodGhpcy4jb2Zmc2V0LCB2YWx1ZSwgdHJ1ZSk7XG4gICAgdGhpcy4jb2Zmc2V0ICs9IDg7XG4gIH1cbiAgd3JpdGVVNjQodmFsdWUpIHtcbiAgICB0aGlzLiNleHBhbmRCdWZmZXIoOCk7XG4gICAgdGhpcy4jdmlldy5zZXRCaWdVaW50NjQodGhpcy4jb2Zmc2V0LCB2YWx1ZSwgdHJ1ZSk7XG4gICAgdGhpcy4jb2Zmc2V0ICs9IDg7XG4gIH1cbiAgd3JpdGVVMTI4KHZhbHVlKSB7XG4gICAgdGhpcy4jZXhwYW5kQnVmZmVyKDE2KTtcbiAgICBjb25zdCBsb3dlclBhcnQgPSB2YWx1ZSAmIEJpZ0ludChcIjB4RkZGRkZGRkZGRkZGRkZGRlwiKTtcbiAgICBjb25zdCB1cHBlclBhcnQgPSB2YWx1ZSA+PiBCaWdJbnQoNjQpO1xuICAgIHRoaXMuI3ZpZXcuc2V0QmlnVWludDY0KHRoaXMuI29mZnNldCwgbG93ZXJQYXJ0LCB0cnVlKTtcbiAgICB0aGlzLiN2aWV3LnNldEJpZ1VpbnQ2NCh0aGlzLiNvZmZzZXQgKyA4LCB1cHBlclBhcnQsIHRydWUpO1xuICAgIHRoaXMuI29mZnNldCArPSAxNjtcbiAgfVxuICB3cml0ZUkxMjgodmFsdWUpIHtcbiAgICB0aGlzLiNleHBhbmRCdWZmZXIoMTYpO1xuICAgIGNvbnN0IGxvd2VyUGFydCA9IHZhbHVlICYgQmlnSW50KFwiMHhGRkZGRkZGRkZGRkZGRkZGXCIpO1xuICAgIGNvbnN0IHVwcGVyUGFydCA9IHZhbHVlID4+IEJpZ0ludCg2NCk7XG4gICAgdGhpcy4jdmlldy5zZXRCaWdJbnQ2NCh0aGlzLiNvZmZzZXQsIGxvd2VyUGFydCwgdHJ1ZSk7XG4gICAgdGhpcy4jdmlldy5zZXRCaWdJbnQ2NCh0aGlzLiNvZmZzZXQgKyA4LCB1cHBlclBhcnQsIHRydWUpO1xuICAgIHRoaXMuI29mZnNldCArPSAxNjtcbiAgfVxuICB3cml0ZVUyNTYodmFsdWUpIHtcbiAgICB0aGlzLiNleHBhbmRCdWZmZXIoMzIpO1xuICAgIGNvbnN0IGxvd182NF9tYXNrID0gQmlnSW50KFwiMHhGRkZGRkZGRkZGRkZGRkZGXCIpO1xuICAgIGNvbnN0IHAwID0gdmFsdWUgJiBsb3dfNjRfbWFzaztcbiAgICBjb25zdCBwMSA9IHZhbHVlID4+IEJpZ0ludCg2NCAqIDEpICYgbG93XzY0X21hc2s7XG4gICAgY29uc3QgcDIgPSB2YWx1ZSA+PiBCaWdJbnQoNjQgKiAyKSAmIGxvd182NF9tYXNrO1xuICAgIGNvbnN0IHAzID0gdmFsdWUgPj4gQmlnSW50KDY0ICogMyk7XG4gICAgdGhpcy4jdmlldy5zZXRCaWdVaW50NjQodGhpcy4jb2Zmc2V0ICsgOCAqIDAsIHAwLCB0cnVlKTtcbiAgICB0aGlzLiN2aWV3LnNldEJpZ1VpbnQ2NCh0aGlzLiNvZmZzZXQgKyA4ICogMSwgcDEsIHRydWUpO1xuICAgIHRoaXMuI3ZpZXcuc2V0QmlnVWludDY0KHRoaXMuI29mZnNldCArIDggKiAyLCBwMiwgdHJ1ZSk7XG4gICAgdGhpcy4jdmlldy5zZXRCaWdVaW50NjQodGhpcy4jb2Zmc2V0ICsgOCAqIDMsIHAzLCB0cnVlKTtcbiAgICB0aGlzLiNvZmZzZXQgKz0gMzI7XG4gIH1cbiAgd3JpdGVJMjU2KHZhbHVlKSB7XG4gICAgdGhpcy4jZXhwYW5kQnVmZmVyKDMyKTtcbiAgICBjb25zdCBsb3dfNjRfbWFzayA9IEJpZ0ludChcIjB4RkZGRkZGRkZGRkZGRkZGRlwiKTtcbiAgICBjb25zdCBwMCA9IHZhbHVlICYgbG93XzY0X21hc2s7XG4gICAgY29uc3QgcDEgPSB2YWx1ZSA+PiBCaWdJbnQoNjQgKiAxKSAmIGxvd182NF9tYXNrO1xuICAgIGNvbnN0IHAyID0gdmFsdWUgPj4gQmlnSW50KDY0ICogMikgJiBsb3dfNjRfbWFzaztcbiAgICBjb25zdCBwMyA9IHZhbHVlID4+IEJpZ0ludCg2NCAqIDMpO1xuICAgIHRoaXMuI3ZpZXcuc2V0QmlnVWludDY0KHRoaXMuI29mZnNldCArIDggKiAwLCBwMCwgdHJ1ZSk7XG4gICAgdGhpcy4jdmlldy5zZXRCaWdVaW50NjQodGhpcy4jb2Zmc2V0ICsgOCAqIDEsIHAxLCB0cnVlKTtcbiAgICB0aGlzLiN2aWV3LnNldEJpZ1VpbnQ2NCh0aGlzLiNvZmZzZXQgKyA4ICogMiwgcDIsIHRydWUpO1xuICAgIHRoaXMuI3ZpZXcuc2V0QmlnSW50NjQodGhpcy4jb2Zmc2V0ICsgOCAqIDMsIHAzLCB0cnVlKTtcbiAgICB0aGlzLiNvZmZzZXQgKz0gMzI7XG4gIH1cbiAgd3JpdGVGMzIodmFsdWUpIHtcbiAgICB0aGlzLiNleHBhbmRCdWZmZXIoNCk7XG4gICAgdGhpcy4jdmlldy5zZXRGbG9hdDMyKHRoaXMuI29mZnNldCwgdmFsdWUsIHRydWUpO1xuICAgIHRoaXMuI29mZnNldCArPSA0O1xuICB9XG4gIHdyaXRlRjY0KHZhbHVlKSB7XG4gICAgdGhpcy4jZXhwYW5kQnVmZmVyKDgpO1xuICAgIHRoaXMuI3ZpZXcuc2V0RmxvYXQ2NCh0aGlzLiNvZmZzZXQsIHZhbHVlLCB0cnVlKTtcbiAgICB0aGlzLiNvZmZzZXQgKz0gODtcbiAgfVxuICB3cml0ZVN0cmluZyh2YWx1ZSkge1xuICAgIGNvbnN0IGVuY29kZXIgPSBuZXcgVGV4dEVuY29kZXIoKTtcbiAgICBjb25zdCBlbmNvZGVkU3RyaW5nID0gZW5jb2Rlci5lbmNvZGUodmFsdWUpO1xuICAgIHRoaXMud3JpdGVVMzIoZW5jb2RlZFN0cmluZy5sZW5ndGgpO1xuICAgIHRoaXMuI2V4cGFuZEJ1ZmZlcihlbmNvZGVkU3RyaW5nLmxlbmd0aCk7XG4gICAgdGhpcy4jYnVmZmVyLnNldChlbmNvZGVkU3RyaW5nLCB0aGlzLiNvZmZzZXQpO1xuICAgIHRoaXMuI29mZnNldCArPSBlbmNvZGVkU3RyaW5nLmxlbmd0aDtcbiAgfVxufTtcblxuLy8gc3JjL2xpYi91dGlsLnRzXG5mdW5jdGlvbiB0b1Bhc2NhbENhc2Uocykge1xuICBjb25zdCBzdHIgPSBzLnJlcGxhY2UoLyhbLV9dW2Etel0pL2dpLCAoJDEpID0+IHtcbiAgICByZXR1cm4gJDEudG9VcHBlckNhc2UoKS5yZXBsYWNlKFwiLVwiLCBcIlwiKS5yZXBsYWNlKFwiX1wiLCBcIlwiKTtcbiAgfSk7XG4gIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG59XG5mdW5jdGlvbiB1aW50OEFycmF5VG9IZXhTdHJpbmcoYXJyYXkpIHtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbChhcnJheS5yZXZlcnNlKCksICh4KSA9PiAoXCIwMFwiICsgeC50b1N0cmluZygxNikpLnNsaWNlKC0yKSkuam9pbihcIlwiKTtcbn1cbmZ1bmN0aW9uIHVpbnQ4QXJyYXlUb1UxMjgoYXJyYXkpIHtcbiAgaWYgKGFycmF5Lmxlbmd0aCAhPSAxNikge1xuICAgIHRocm93IG5ldyBFcnJvcihgVWludDhBcnJheSBpcyBub3QgMTYgYnl0ZXMgbG9uZzogJHthcnJheX1gKTtcbiAgfVxuICByZXR1cm4gbmV3IEJpbmFyeVJlYWRlcihhcnJheSkucmVhZFUxMjgoKTtcbn1cbmZ1bmN0aW9uIHVpbnQ4QXJyYXlUb1UyNTYoYXJyYXkpIHtcbiAgaWYgKGFycmF5Lmxlbmd0aCAhPSAzMikge1xuICAgIHRocm93IG5ldyBFcnJvcihgVWludDhBcnJheSBpcyBub3QgMzIgYnl0ZXMgbG9uZzogWyR7YXJyYXl9XWApO1xuICB9XG4gIHJldHVybiBuZXcgQmluYXJ5UmVhZGVyKGFycmF5KS5yZWFkVTI1NigpO1xufVxuZnVuY3Rpb24gaGV4U3RyaW5nVG9VaW50OEFycmF5KHN0cikge1xuICBpZiAoc3RyLnN0YXJ0c1dpdGgoXCIweFwiKSkge1xuICAgIHN0ciA9IHN0ci5zbGljZSgyKTtcbiAgfVxuICBjb25zdCBtYXRjaGVzID0gc3RyLm1hdGNoKC8uezEsMn0vZykgfHwgW107XG4gIGNvbnN0IGRhdGEgPSBVaW50OEFycmF5LmZyb20oXG4gICAgbWF0Y2hlcy5tYXAoKGJ5dGUpID0+IHBhcnNlSW50KGJ5dGUsIDE2KSlcbiAgKTtcbiAgcmV0dXJuIGRhdGEucmV2ZXJzZSgpO1xufVxuZnVuY3Rpb24gaGV4U3RyaW5nVG9VMTI4KHN0cikge1xuICByZXR1cm4gdWludDhBcnJheVRvVTEyOChoZXhTdHJpbmdUb1VpbnQ4QXJyYXkoc3RyKSk7XG59XG5mdW5jdGlvbiBoZXhTdHJpbmdUb1UyNTYoc3RyKSB7XG4gIHJldHVybiB1aW50OEFycmF5VG9VMjU2KGhleFN0cmluZ1RvVWludDhBcnJheShzdHIpKTtcbn1cbmZ1bmN0aW9uIHUxMjhUb1VpbnQ4QXJyYXkoZGF0YSkge1xuICBjb25zdCB3cml0ZXIgPSBuZXcgQmluYXJ5V3JpdGVyKDE2KTtcbiAgd3JpdGVyLndyaXRlVTEyOChkYXRhKTtcbiAgcmV0dXJuIHdyaXRlci5nZXRCdWZmZXIoKTtcbn1cbmZ1bmN0aW9uIHUxMjhUb0hleFN0cmluZyhkYXRhKSB7XG4gIHJldHVybiB1aW50OEFycmF5VG9IZXhTdHJpbmcodTEyOFRvVWludDhBcnJheShkYXRhKSk7XG59XG5mdW5jdGlvbiB1MjU2VG9VaW50OEFycmF5KGRhdGEpIHtcbiAgY29uc3Qgd3JpdGVyID0gbmV3IEJpbmFyeVdyaXRlcigzMik7XG4gIHdyaXRlci53cml0ZVUyNTYoZGF0YSk7XG4gIHJldHVybiB3cml0ZXIuZ2V0QnVmZmVyKCk7XG59XG5mdW5jdGlvbiB1MjU2VG9IZXhTdHJpbmcoZGF0YSkge1xuICByZXR1cm4gdWludDhBcnJheVRvSGV4U3RyaW5nKHUyNTZUb1VpbnQ4QXJyYXkoZGF0YSkpO1xufVxuZnVuY3Rpb24gdG9DYW1lbENhc2Uoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvWy1fXSsvZywgXCJfXCIpLnJlcGxhY2UoL18oW2EtekEtWjAtOV0pL2csIChfLCBjKSA9PiBjLnRvVXBwZXJDYXNlKCkpO1xufVxuZnVuY3Rpb24gYnNhdG5CYXNlU2l6ZSh0eXBlc3BhY2UsIHR5KSB7XG4gIGNvbnN0IGFzc3VtZWRBcnJheUxlbmd0aCA9IDQ7XG4gIHdoaWxlICh0eS50YWcgPT09IFwiUmVmXCIpIHR5ID0gdHlwZXNwYWNlLnR5cGVzW3R5LnZhbHVlXTtcbiAgaWYgKHR5LnRhZyA9PT0gXCJQcm9kdWN0XCIpIHtcbiAgICBsZXQgc3VtID0gMDtcbiAgICBmb3IgKGNvbnN0IHsgYWxnZWJyYWljVHlwZTogZWxlbSB9IG9mIHR5LnZhbHVlLmVsZW1lbnRzKSB7XG4gICAgICBzdW0gKz0gYnNhdG5CYXNlU2l6ZSh0eXBlc3BhY2UsIGVsZW0pO1xuICAgIH1cbiAgICByZXR1cm4gc3VtO1xuICB9IGVsc2UgaWYgKHR5LnRhZyA9PT0gXCJTdW1cIikge1xuICAgIGxldCBtaW4gPSBJbmZpbml0eTtcbiAgICBmb3IgKGNvbnN0IHsgYWxnZWJyYWljVHlwZTogdmFyaSB9IG9mIHR5LnZhbHVlLnZhcmlhbnRzKSB7XG4gICAgICBjb25zdCB2U2l6ZSA9IGJzYXRuQmFzZVNpemUodHlwZXNwYWNlLCB2YXJpKTtcbiAgICAgIGlmICh2U2l6ZSA8IG1pbikgbWluID0gdlNpemU7XG4gICAgfVxuICAgIGlmIChtaW4gPT09IEluZmluaXR5KSBtaW4gPSAwO1xuICAgIHJldHVybiA0ICsgbWluO1xuICB9IGVsc2UgaWYgKHR5LnRhZyA9PSBcIkFycmF5XCIpIHtcbiAgICByZXR1cm4gNCArIGFzc3VtZWRBcnJheUxlbmd0aCAqIGJzYXRuQmFzZVNpemUodHlwZXNwYWNlLCB0eS52YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBTdHJpbmc6IDQgKyBhc3N1bWVkQXJyYXlMZW5ndGgsXG4gICAgU3VtOiAxLFxuICAgIEJvb2w6IDEsXG4gICAgSTg6IDEsXG4gICAgVTg6IDEsXG4gICAgSTE2OiAyLFxuICAgIFUxNjogMixcbiAgICBJMzI6IDQsXG4gICAgVTMyOiA0LFxuICAgIEYzMjogNCxcbiAgICBJNjQ6IDgsXG4gICAgVTY0OiA4LFxuICAgIEY2NDogOCxcbiAgICBJMTI4OiAxNixcbiAgICBVMTI4OiAxNixcbiAgICBJMjU2OiAzMixcbiAgICBVMjU2OiAzMlxuICB9W3R5LnRhZ107XG59XG5cbi8vIHNyYy9saWIvY29ubmVjdGlvbl9pZC50c1xudmFyIENvbm5lY3Rpb25JZCA9IGNsYXNzIF9Db25uZWN0aW9uSWQge1xuICBfX2Nvbm5lY3Rpb25faWRfXztcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYENvbm5lY3Rpb25JZGAuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgdGhpcy5fX2Nvbm5lY3Rpb25faWRfXyA9IGRhdGE7XG4gIH1cbiAgLyoqXG4gICAqIEdldCB0aGUgYWxnZWJyYWljIHR5cGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIHtAbGluayBDb25uZWN0aW9uSWR9IHR5cGUuXG4gICAqIEByZXR1cm5zIFRoZSBhbGdlYnJhaWMgdHlwZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgdHlwZS5cbiAgICovXG4gIHN0YXRpYyBnZXRBbGdlYnJhaWNUeXBlKCkge1xuICAgIHJldHVybiBBbGdlYnJhaWNUeXBlLlByb2R1Y3Qoe1xuICAgICAgZWxlbWVudHM6IFtcbiAgICAgICAgeyBuYW1lOiBcIl9fY29ubmVjdGlvbl9pZF9fXCIsIGFsZ2VicmFpY1R5cGU6IEFsZ2VicmFpY1R5cGUuVTEyOCB9XG4gICAgICBdXG4gICAgfSk7XG4gIH1cbiAgaXNaZXJvKCkge1xuICAgIHJldHVybiB0aGlzLl9fY29ubmVjdGlvbl9pZF9fID09PSBCaWdJbnQoMCk7XG4gIH1cbiAgc3RhdGljIG51bGxJZlplcm8oYWRkcikge1xuICAgIGlmIChhZGRyLmlzWmVybygpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGFkZHI7XG4gICAgfVxuICB9XG4gIHN0YXRpYyByYW5kb20oKSB7XG4gICAgZnVuY3Rpb24gcmFuZG9tVTgoKSB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU1KTtcbiAgICB9XG4gICAgbGV0IHJlc3VsdCA9IEJpZ0ludCgwKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyBpKyspIHtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdCA8PCBCaWdJbnQoOCkgfCBCaWdJbnQocmFuZG9tVTgoKSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgX0Nvbm5lY3Rpb25JZChyZXN1bHQpO1xuICB9XG4gIC8qKlxuICAgKiBDb21wYXJlIHR3byBjb25uZWN0aW9uIElEcyBmb3IgZXF1YWxpdHkuXG4gICAqL1xuICBpc0VxdWFsKG90aGVyKSB7XG4gICAgcmV0dXJuIHRoaXMuX19jb25uZWN0aW9uX2lkX18gPT0gb3RoZXIuX19jb25uZWN0aW9uX2lkX187XG4gIH1cbiAgLyoqXG4gICAqIENoZWNrIGlmIHR3byBjb25uZWN0aW9uIElEcyBhcmUgZXF1YWwuXG4gICAqL1xuICBlcXVhbHMob3RoZXIpIHtcbiAgICByZXR1cm4gdGhpcy5pc0VxdWFsKG90aGVyKTtcbiAgfVxuICAvKipcbiAgICogUHJpbnQgdGhlIGNvbm5lY3Rpb24gSUQgYXMgYSBoZXhhZGVjaW1hbCBzdHJpbmcuXG4gICAqL1xuICB0b0hleFN0cmluZygpIHtcbiAgICByZXR1cm4gdTEyOFRvSGV4U3RyaW5nKHRoaXMuX19jb25uZWN0aW9uX2lkX18pO1xuICB9XG4gIC8qKlxuICAgKiBDb252ZXJ0IHRoZSBjb25uZWN0aW9uIElEIHRvIGEgVWludDhBcnJheS5cbiAgICovXG4gIHRvVWludDhBcnJheSgpIHtcbiAgICByZXR1cm4gdTEyOFRvVWludDhBcnJheSh0aGlzLl9fY29ubmVjdGlvbl9pZF9fKTtcbiAgfVxuICAvKipcbiAgICogUGFyc2UgYSBjb25uZWN0aW9uIElEIGZyb20gYSBoZXhhZGVjaW1hbCBzdHJpbmcuXG4gICAqL1xuICBzdGF0aWMgZnJvbVN0cmluZyhzdHIpIHtcbiAgICByZXR1cm4gbmV3IF9Db25uZWN0aW9uSWQoaGV4U3RyaW5nVG9VMTI4KHN0cikpO1xuICB9XG4gIHN0YXRpYyBmcm9tU3RyaW5nT3JOdWxsKHN0cikge1xuICAgIGNvbnN0IGFkZHIgPSBfQ29ubmVjdGlvbklkLmZyb21TdHJpbmcoc3RyKTtcbiAgICBpZiAoYWRkci5pc1plcm8oKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBhZGRyO1xuICAgIH1cbiAgfVxufTtcblxuLy8gc3JjL2xpYi9pZGVudGl0eS50c1xudmFyIElkZW50aXR5ID0gY2xhc3MgX0lkZW50aXR5IHtcbiAgX19pZGVudGl0eV9fO1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgSWRlbnRpdHlgLlxuICAgKlxuICAgKiBgZGF0YWAgY2FuIGJlIGEgaGV4YWRlY2ltYWwgc3RyaW5nIG9yIGEgYGJpZ2ludGAuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgdGhpcy5fX2lkZW50aXR5X18gPSB0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIiA/IGhleFN0cmluZ1RvVTI1NihkYXRhKSA6IGRhdGE7XG4gIH1cbiAgLyoqXG4gICAqIEdldCB0aGUgYWxnZWJyYWljIHR5cGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIHtAbGluayBJZGVudGl0eX0gdHlwZS5cbiAgICogQHJldHVybnMgVGhlIGFsZ2VicmFpYyB0eXBlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB0eXBlLlxuICAgKi9cbiAgc3RhdGljIGdldEFsZ2VicmFpY1R5cGUoKSB7XG4gICAgcmV0dXJuIEFsZ2VicmFpY1R5cGUuUHJvZHVjdCh7XG4gICAgICBlbGVtZW50czogW3sgbmFtZTogXCJfX2lkZW50aXR5X19cIiwgYWxnZWJyYWljVHlwZTogQWxnZWJyYWljVHlwZS5VMjU2IH1dXG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIENoZWNrIGlmIHR3byBpZGVudGl0aWVzIGFyZSBlcXVhbC5cbiAgICovXG4gIGlzRXF1YWwob3RoZXIpIHtcbiAgICByZXR1cm4gdGhpcy50b0hleFN0cmluZygpID09PSBvdGhlci50b0hleFN0cmluZygpO1xuICB9XG4gIC8qKlxuICAgKiBDaGVjayBpZiB0d28gaWRlbnRpdGllcyBhcmUgZXF1YWwuXG4gICAqL1xuICBlcXVhbHMob3RoZXIpIHtcbiAgICByZXR1cm4gdGhpcy5pc0VxdWFsKG90aGVyKTtcbiAgfVxuICAvKipcbiAgICogUHJpbnQgdGhlIGlkZW50aXR5IGFzIGEgaGV4YWRlY2ltYWwgc3RyaW5nLlxuICAgKi9cbiAgdG9IZXhTdHJpbmcoKSB7XG4gICAgcmV0dXJuIHUyNTZUb0hleFN0cmluZyh0aGlzLl9faWRlbnRpdHlfXyk7XG4gIH1cbiAgLyoqXG4gICAqIENvbnZlcnQgdGhlIGFkZHJlc3MgdG8gYSBVaW50OEFycmF5LlxuICAgKi9cbiAgdG9VaW50OEFycmF5KCkge1xuICAgIHJldHVybiB1MjU2VG9VaW50OEFycmF5KHRoaXMuX19pZGVudGl0eV9fKTtcbiAgfVxuICAvKipcbiAgICogUGFyc2UgYW4gSWRlbnRpdHkgZnJvbSBhIGhleGFkZWNpbWFsIHN0cmluZy5cbiAgICovXG4gIHN0YXRpYyBmcm9tU3RyaW5nKHN0cikge1xuICAgIHJldHVybiBuZXcgX0lkZW50aXR5KHN0cik7XG4gIH1cbiAgLyoqXG4gICAqIFplcm8gaWRlbnRpdHkgKDB4MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMClcbiAgICovXG4gIHN0YXRpYyB6ZXJvKCkge1xuICAgIHJldHVybiBuZXcgX0lkZW50aXR5KDBuKTtcbiAgfVxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy50b0hleFN0cmluZygpO1xuICB9XG59O1xuXG4vLyBzcmMvbGliL2FsZ2VicmFpY190eXBlLnRzXG52YXIgQWxnZWJyYWljVHlwZSA9IHtcbiAgUmVmOiAodmFsdWUpID0+ICh7IHRhZzogXCJSZWZcIiwgdmFsdWUgfSksXG4gIFN1bTogKHZhbHVlKSA9PiAoe1xuICAgIHRhZzogXCJTdW1cIixcbiAgICB2YWx1ZVxuICB9KSxcbiAgUHJvZHVjdDogKHZhbHVlKSA9PiAoe1xuICAgIHRhZzogXCJQcm9kdWN0XCIsXG4gICAgdmFsdWVcbiAgfSksXG4gIEFycmF5OiAodmFsdWUpID0+ICh7XG4gICAgdGFnOiBcIkFycmF5XCIsXG4gICAgdmFsdWVcbiAgfSksXG4gIFN0cmluZzogeyB0YWc6IFwiU3RyaW5nXCIgfSxcbiAgQm9vbDogeyB0YWc6IFwiQm9vbFwiIH0sXG4gIEk4OiB7IHRhZzogXCJJOFwiIH0sXG4gIFU4OiB7IHRhZzogXCJVOFwiIH0sXG4gIEkxNjogeyB0YWc6IFwiSTE2XCIgfSxcbiAgVTE2OiB7IHRhZzogXCJVMTZcIiB9LFxuICBJMzI6IHsgdGFnOiBcIkkzMlwiIH0sXG4gIFUzMjogeyB0YWc6IFwiVTMyXCIgfSxcbiAgSTY0OiB7IHRhZzogXCJJNjRcIiB9LFxuICBVNjQ6IHsgdGFnOiBcIlU2NFwiIH0sXG4gIEkxMjg6IHsgdGFnOiBcIkkxMjhcIiB9LFxuICBVMTI4OiB7IHRhZzogXCJVMTI4XCIgfSxcbiAgSTI1NjogeyB0YWc6IFwiSTI1NlwiIH0sXG4gIFUyNTY6IHsgdGFnOiBcIlUyNTZcIiB9LFxuICBGMzI6IHsgdGFnOiBcIkYzMlwiIH0sXG4gIEY2NDogeyB0YWc6IFwiRjY0XCIgfSxcbiAgc2VyaWFsaXplVmFsdWUod3JpdGVyLCB0eSwgdmFsdWUsIHR5cGVzcGFjZSkge1xuICAgIGlmICh0eS50YWcgPT09IFwiUmVmXCIpIHtcbiAgICAgIGlmICghdHlwZXNwYWNlKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYW5ub3Qgc2VyaWFsaXplIHJlZnMgd2l0aG91dCBhIHR5cGVzcGFjZVwiKTtcbiAgICAgIHdoaWxlICh0eS50YWcgPT09IFwiUmVmXCIpIHR5ID0gdHlwZXNwYWNlLnR5cGVzW3R5LnZhbHVlXTtcbiAgICB9XG4gICAgc3dpdGNoICh0eS50YWcpIHtcbiAgICAgIGNhc2UgXCJQcm9kdWN0XCI6XG4gICAgICAgIFByb2R1Y3RUeXBlLnNlcmlhbGl6ZVZhbHVlKHdyaXRlciwgdHkudmFsdWUsIHZhbHVlLCB0eXBlc3BhY2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJTdW1cIjpcbiAgICAgICAgU3VtVHlwZS5zZXJpYWxpemVWYWx1ZSh3cml0ZXIsIHR5LnZhbHVlLCB2YWx1ZSwgdHlwZXNwYWNlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiQXJyYXlcIjpcbiAgICAgICAgaWYgKHR5LnZhbHVlLnRhZyA9PT0gXCJVOFwiKSB7XG4gICAgICAgICAgd3JpdGVyLndyaXRlVUludDhBcnJheSh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgZWxlbVR5cGUgPSB0eS52YWx1ZTtcbiAgICAgICAgICB3cml0ZXIud3JpdGVVMzIodmFsdWUubGVuZ3RoKTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGVsZW0gb2YgdmFsdWUpIHtcbiAgICAgICAgICAgIEFsZ2VicmFpY1R5cGUuc2VyaWFsaXplVmFsdWUod3JpdGVyLCBlbGVtVHlwZSwgZWxlbSwgdHlwZXNwYWNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiQm9vbFwiOlxuICAgICAgICB3cml0ZXIud3JpdGVCb29sKHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiSThcIjpcbiAgICAgICAgd3JpdGVyLndyaXRlSTgodmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJVOFwiOlxuICAgICAgICB3cml0ZXIud3JpdGVVOCh2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkkxNlwiOlxuICAgICAgICB3cml0ZXIud3JpdGVJMTYodmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJVMTZcIjpcbiAgICAgICAgd3JpdGVyLndyaXRlVTE2KHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiSTMyXCI6XG4gICAgICAgIHdyaXRlci53cml0ZUkzMih2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIlUzMlwiOlxuICAgICAgICB3cml0ZXIud3JpdGVVMzIodmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJJNjRcIjpcbiAgICAgICAgd3JpdGVyLndyaXRlSTY0KHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiVTY0XCI6XG4gICAgICAgIHdyaXRlci53cml0ZVU2NCh2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkkxMjhcIjpcbiAgICAgICAgd3JpdGVyLndyaXRlSTEyOCh2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIlUxMjhcIjpcbiAgICAgICAgd3JpdGVyLndyaXRlVTEyOCh2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkkyNTZcIjpcbiAgICAgICAgd3JpdGVyLndyaXRlSTI1Nih2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIlUyNTZcIjpcbiAgICAgICAgd3JpdGVyLndyaXRlVTI1Nih2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkYzMlwiOlxuICAgICAgICB3cml0ZXIud3JpdGVGMzIodmFsdWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJGNjRcIjpcbiAgICAgICAgd3JpdGVyLndyaXRlRjY0KHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiU3RyaW5nXCI6XG4gICAgICAgIHdyaXRlci53cml0ZVN0cmluZyh2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSxcbiAgZGVzZXJpYWxpemVWYWx1ZTogZnVuY3Rpb24ocmVhZGVyLCB0eSwgdHlwZXNwYWNlKSB7XG4gICAgaWYgKHR5LnRhZyA9PT0gXCJSZWZcIikge1xuICAgICAgaWYgKCF0eXBlc3BhY2UpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbm5vdCBkZXNlcmlhbGl6ZSByZWZzIHdpdGhvdXQgYSB0eXBlc3BhY2VcIik7XG4gICAgICB3aGlsZSAodHkudGFnID09PSBcIlJlZlwiKSB0eSA9IHR5cGVzcGFjZS50eXBlc1t0eS52YWx1ZV07XG4gICAgfVxuICAgIHN3aXRjaCAodHkudGFnKSB7XG4gICAgICBjYXNlIFwiUHJvZHVjdFwiOlxuICAgICAgICByZXR1cm4gUHJvZHVjdFR5cGUuZGVzZXJpYWxpemVWYWx1ZShyZWFkZXIsIHR5LnZhbHVlLCB0eXBlc3BhY2UpO1xuICAgICAgY2FzZSBcIlN1bVwiOlxuICAgICAgICByZXR1cm4gU3VtVHlwZS5kZXNlcmlhbGl6ZVZhbHVlKHJlYWRlciwgdHkudmFsdWUsIHR5cGVzcGFjZSk7XG4gICAgICBjYXNlIFwiQXJyYXlcIjpcbiAgICAgICAgaWYgKHR5LnZhbHVlLnRhZyA9PT0gXCJVOFwiKSB7XG4gICAgICAgICAgcmV0dXJuIHJlYWRlci5yZWFkVUludDhBcnJheSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGVsZW1UeXBlID0gdHkudmFsdWU7XG4gICAgICAgICAgY29uc3QgbGVuZ3RoID0gcmVhZGVyLnJlYWRVMzIoKTtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChcbiAgICAgICAgICAgICAgQWxnZWJyYWljVHlwZS5kZXNlcmlhbGl6ZVZhbHVlKHJlYWRlciwgZWxlbVR5cGUsIHR5cGVzcGFjZSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgIGNhc2UgXCJCb29sXCI6XG4gICAgICAgIHJldHVybiByZWFkZXIucmVhZEJvb2woKTtcbiAgICAgIGNhc2UgXCJJOFwiOlxuICAgICAgICByZXR1cm4gcmVhZGVyLnJlYWRJOCgpO1xuICAgICAgY2FzZSBcIlU4XCI6XG4gICAgICAgIHJldHVybiByZWFkZXIucmVhZFU4KCk7XG4gICAgICBjYXNlIFwiSTE2XCI6XG4gICAgICAgIHJldHVybiByZWFkZXIucmVhZEkxNigpO1xuICAgICAgY2FzZSBcIlUxNlwiOlxuICAgICAgICByZXR1cm4gcmVhZGVyLnJlYWRVMTYoKTtcbiAgICAgIGNhc2UgXCJJMzJcIjpcbiAgICAgICAgcmV0dXJuIHJlYWRlci5yZWFkSTMyKCk7XG4gICAgICBjYXNlIFwiVTMyXCI6XG4gICAgICAgIHJldHVybiByZWFkZXIucmVhZFUzMigpO1xuICAgICAgY2FzZSBcIkk2NFwiOlxuICAgICAgICByZXR1cm4gcmVhZGVyLnJlYWRJNjQoKTtcbiAgICAgIGNhc2UgXCJVNjRcIjpcbiAgICAgICAgcmV0dXJuIHJlYWRlci5yZWFkVTY0KCk7XG4gICAgICBjYXNlIFwiSTEyOFwiOlxuICAgICAgICByZXR1cm4gcmVhZGVyLnJlYWRJMTI4KCk7XG4gICAgICBjYXNlIFwiVTEyOFwiOlxuICAgICAgICByZXR1cm4gcmVhZGVyLnJlYWRVMTI4KCk7XG4gICAgICBjYXNlIFwiSTI1NlwiOlxuICAgICAgICByZXR1cm4gcmVhZGVyLnJlYWRJMjU2KCk7XG4gICAgICBjYXNlIFwiVTI1NlwiOlxuICAgICAgICByZXR1cm4gcmVhZGVyLnJlYWRVMjU2KCk7XG4gICAgICBjYXNlIFwiRjMyXCI6XG4gICAgICAgIHJldHVybiByZWFkZXIucmVhZEYzMigpO1xuICAgICAgY2FzZSBcIkY2NFwiOlxuICAgICAgICByZXR1cm4gcmVhZGVyLnJlYWRGNjQoKTtcbiAgICAgIGNhc2UgXCJTdHJpbmdcIjpcbiAgICAgICAgcmV0dXJuIHJlYWRlci5yZWFkU3RyaW5nKCk7XG4gICAgfVxuICB9LFxuICAvKipcbiAgICogQ29udmVydCBhIHZhbHVlIG9mIHRoZSBhbGdlYnJhaWMgdHlwZSBpbnRvIHNvbWV0aGluZyB0aGF0IGNhbiBiZSB1c2VkIGFzIGEga2V5IGluIGEgbWFwLlxuICAgKiBUaGVyZSBhcmUgbm8gZ3VhcmFudGVlcyBhYm91dCBiZWluZyBhYmxlIHRvIG9yZGVyIGl0LlxuICAgKiBUaGlzIGlzIG9ubHkgZ3VhcmFudGVlZCB0byBiZSBjb21wYXJhYmxlIHRvIG90aGVyIHZhbHVlcyBvZiB0aGUgc2FtZSB0eXBlLlxuICAgKiBAcGFyYW0gdmFsdWUgQSB2YWx1ZSBvZiB0aGUgYWxnZWJyYWljIHR5cGVcbiAgICogQHJldHVybnMgU29tZXRoaW5nIHRoYXQgY2FuIGJlIHVzZWQgYXMgYSBrZXkgaW4gYSBtYXAuXG4gICAqL1xuICBpbnRvTWFwS2V5OiBmdW5jdGlvbih0eSwgdmFsdWUpIHtcbiAgICBzd2l0Y2ggKHR5LnRhZykge1xuICAgICAgY2FzZSBcIlU4XCI6XG4gICAgICBjYXNlIFwiVTE2XCI6XG4gICAgICBjYXNlIFwiVTMyXCI6XG4gICAgICBjYXNlIFwiVTY0XCI6XG4gICAgICBjYXNlIFwiVTEyOFwiOlxuICAgICAgY2FzZSBcIlUyNTZcIjpcbiAgICAgIGNhc2UgXCJJOFwiOlxuICAgICAgY2FzZSBcIkkxNlwiOlxuICAgICAgY2FzZSBcIkkzMlwiOlxuICAgICAgY2FzZSBcIkk2NFwiOlxuICAgICAgY2FzZSBcIkkxMjhcIjpcbiAgICAgIGNhc2UgXCJJMjU2XCI6XG4gICAgICBjYXNlIFwiRjMyXCI6XG4gICAgICBjYXNlIFwiRjY0XCI6XG4gICAgICBjYXNlIFwiU3RyaW5nXCI6XG4gICAgICBjYXNlIFwiQm9vbFwiOlxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICBjYXNlIFwiUHJvZHVjdFwiOlxuICAgICAgICByZXR1cm4gUHJvZHVjdFR5cGUuaW50b01hcEtleSh0eS52YWx1ZSwgdmFsdWUpO1xuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBjb25zdCB3cml0ZXIgPSBuZXcgQmluYXJ5V3JpdGVyKDEwKTtcbiAgICAgICAgQWxnZWJyYWljVHlwZS5zZXJpYWxpemVWYWx1ZSh3cml0ZXIsIHR5LCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiB3cml0ZXIudG9CYXNlNjQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG52YXIgUHJvZHVjdFR5cGUgPSB7XG4gIHNlcmlhbGl6ZVZhbHVlKHdyaXRlciwgdHksIHZhbHVlLCB0eXBlc3BhY2UpIHtcbiAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgdHkuZWxlbWVudHMpIHtcbiAgICAgIEFsZ2VicmFpY1R5cGUuc2VyaWFsaXplVmFsdWUoXG4gICAgICAgIHdyaXRlcixcbiAgICAgICAgZWxlbWVudC5hbGdlYnJhaWNUeXBlLFxuICAgICAgICB2YWx1ZVtlbGVtZW50Lm5hbWVdLFxuICAgICAgICB0eXBlc3BhY2VcbiAgICAgICk7XG4gICAgfVxuICB9LFxuICBkZXNlcmlhbGl6ZVZhbHVlKHJlYWRlciwgdHksIHR5cGVzcGFjZSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGlmICh0eS5lbGVtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGlmICh0eS5lbGVtZW50c1swXS5uYW1lID09PSBcIl9fdGltZV9kdXJhdGlvbl9taWNyb3NfX1wiKSB7XG4gICAgICAgIHJldHVybiBuZXcgVGltZUR1cmF0aW9uKHJlYWRlci5yZWFkSTY0KCkpO1xuICAgICAgfVxuICAgICAgaWYgKHR5LmVsZW1lbnRzWzBdLm5hbWUgPT09IFwiX190aW1lc3RhbXBfbWljcm9zX3NpbmNlX3VuaXhfZXBvY2hfX1wiKSB7XG4gICAgICAgIHJldHVybiBuZXcgVGltZXN0YW1wKHJlYWRlci5yZWFkSTY0KCkpO1xuICAgICAgfVxuICAgICAgaWYgKHR5LmVsZW1lbnRzWzBdLm5hbWUgPT09IFwiX19pZGVudGl0eV9fXCIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJZGVudGl0eShyZWFkZXIucmVhZFUyNTYoKSk7XG4gICAgICB9XG4gICAgICBpZiAodHkuZWxlbWVudHNbMF0ubmFtZSA9PT0gXCJfX2Nvbm5lY3Rpb25faWRfX1wiKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ29ubmVjdGlvbklkKHJlYWRlci5yZWFkVTEyOCgpKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eS5lbGVtZW50c1swXS5uYW1lID09PSBcIl9fdXVpZF9fXCIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVdWlkKHJlYWRlci5yZWFkVTEyOCgpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHR5LmVsZW1lbnRzKSB7XG4gICAgICByZXN1bHRbZWxlbWVudC5uYW1lXSA9IEFsZ2VicmFpY1R5cGUuZGVzZXJpYWxpemVWYWx1ZShcbiAgICAgICAgcmVhZGVyLFxuICAgICAgICBlbGVtZW50LmFsZ2VicmFpY1R5cGUsXG4gICAgICAgIHR5cGVzcGFjZVxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcbiAgaW50b01hcEtleSh0eSwgdmFsdWUpIHtcbiAgICBpZiAodHkuZWxlbWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBpZiAodHkuZWxlbWVudHNbMF0ubmFtZSA9PT0gXCJfX3RpbWVfZHVyYXRpb25fbWljcm9zX19cIikge1xuICAgICAgICByZXR1cm4gdmFsdWUuX190aW1lX2R1cmF0aW9uX21pY3Jvc19fO1xuICAgICAgfVxuICAgICAgaWYgKHR5LmVsZW1lbnRzWzBdLm5hbWUgPT09IFwiX190aW1lc3RhbXBfbWljcm9zX3NpbmNlX3VuaXhfZXBvY2hfX1wiKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5fX3RpbWVzdGFtcF9taWNyb3Nfc2luY2VfdW5peF9lcG9jaF9fO1xuICAgICAgfVxuICAgICAgaWYgKHR5LmVsZW1lbnRzWzBdLm5hbWUgPT09IFwiX19pZGVudGl0eV9fXCIpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLl9faWRlbnRpdHlfXztcbiAgICAgIH1cbiAgICAgIGlmICh0eS5lbGVtZW50c1swXS5uYW1lID09PSBcIl9fY29ubmVjdGlvbl9pZF9fXCIpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLl9fY29ubmVjdGlvbl9pZF9fO1xuICAgICAgfVxuICAgICAgaWYgKHR5LmVsZW1lbnRzWzBdLm5hbWUgPT09IFwiX191dWlkX19cIikge1xuICAgICAgICByZXR1cm4gdmFsdWUuX191dWlkX187XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHdyaXRlciA9IG5ldyBCaW5hcnlXcml0ZXIoMTApO1xuICAgIEFsZ2VicmFpY1R5cGUuc2VyaWFsaXplVmFsdWUod3JpdGVyLCBBbGdlYnJhaWNUeXBlLlByb2R1Y3QodHkpLCB2YWx1ZSk7XG4gICAgcmV0dXJuIHdyaXRlci50b0Jhc2U2NCgpO1xuICB9XG59O1xudmFyIFN1bVR5cGUgPSB7XG4gIHNlcmlhbGl6ZVZhbHVlOiBmdW5jdGlvbih3cml0ZXIsIHR5LCB2YWx1ZSwgdHlwZXNwYWNlKSB7XG4gICAgaWYgKHR5LnZhcmlhbnRzLmxlbmd0aCA9PSAyICYmIHR5LnZhcmlhbnRzWzBdLm5hbWUgPT09IFwic29tZVwiICYmIHR5LnZhcmlhbnRzWzFdLm5hbWUgPT09IFwibm9uZVwiKSB7XG4gICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHZvaWQgMCkge1xuICAgICAgICB3cml0ZXIud3JpdGVCeXRlKDApO1xuICAgICAgICBBbGdlYnJhaWNUeXBlLnNlcmlhbGl6ZVZhbHVlKFxuICAgICAgICAgIHdyaXRlcixcbiAgICAgICAgICB0eS52YXJpYW50c1swXS5hbGdlYnJhaWNUeXBlLFxuICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIHR5cGVzcGFjZVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3JpdGVyLndyaXRlQnl0ZSgxKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5LnZhcmlhbnRzLmxlbmd0aCA9PSAyICYmIHR5LnZhcmlhbnRzWzBdLm5hbWUgPT09IFwib2tcIiAmJiB0eS52YXJpYW50c1sxXS5uYW1lID09PSBcImVyclwiKSB7XG4gICAgICBsZXQgdmFyaWFudE5hbWU7XG4gICAgICBsZXQgaW5uZXJWYWx1ZTtcbiAgICAgIGxldCBpbmRleDtcbiAgICAgIGlmIChcIm9rXCIgaW4gdmFsdWUpIHtcbiAgICAgICAgdmFyaWFudE5hbWUgPSBcIm9rXCI7XG4gICAgICAgIGlubmVyVmFsdWUgPSB2YWx1ZS5vaztcbiAgICAgICAgaW5kZXggPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyaWFudE5hbWUgPSBcImVyclwiO1xuICAgICAgICBpbm5lclZhbHVlID0gdmFsdWUuZXJyO1xuICAgICAgICBpbmRleCA9IDE7XG4gICAgICB9XG4gICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIHRocm93IGBSZXN1bHQgc2VyaWFsaXphdGlvbiBlcnJvcjogdmFyaWFudCAnJHt2YXJpYW50TmFtZX0nIG5vdCBmb3VuZCBpbiAke0pTT04uc3RyaW5naWZ5KHR5KX1gO1xuICAgICAgfVxuICAgICAgd3JpdGVyLndyaXRlVTgoaW5kZXgpO1xuICAgICAgQWxnZWJyYWljVHlwZS5zZXJpYWxpemVWYWx1ZShcbiAgICAgICAgd3JpdGVyLFxuICAgICAgICB0eS52YXJpYW50c1tpbmRleF0uYWxnZWJyYWljVHlwZSxcbiAgICAgICAgaW5uZXJWYWx1ZSxcbiAgICAgICAgdHlwZXNwYWNlXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB2YXJpYW50ID0gdmFsdWVbXCJ0YWdcIl07XG4gICAgICBjb25zdCBpbmRleCA9IHR5LnZhcmlhbnRzLmZpbmRJbmRleCgodikgPT4gdi5uYW1lID09PSB2YXJpYW50KTtcbiAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgdGhyb3cgYENhbid0IHNlcmlhbGl6ZSBhIHN1bSB0eXBlLCBjb3VsZG4ndCBmaW5kICR7dmFsdWUudGFnfSB0YWcgJHtKU09OLnN0cmluZ2lmeSh2YWx1ZSl9IGluIHZhcmlhbnRzICR7SlNPTi5zdHJpbmdpZnkodHkpfWA7XG4gICAgICB9XG4gICAgICB3cml0ZXIud3JpdGVVOChpbmRleCk7XG4gICAgICBBbGdlYnJhaWNUeXBlLnNlcmlhbGl6ZVZhbHVlKFxuICAgICAgICB3cml0ZXIsXG4gICAgICAgIHR5LnZhcmlhbnRzW2luZGV4XS5hbGdlYnJhaWNUeXBlLFxuICAgICAgICB2YWx1ZVtcInZhbHVlXCJdLFxuICAgICAgICB0eXBlc3BhY2VcbiAgICAgICk7XG4gICAgfVxuICB9LFxuICBkZXNlcmlhbGl6ZVZhbHVlOiBmdW5jdGlvbihyZWFkZXIsIHR5LCB0eXBlc3BhY2UpIHtcbiAgICBjb25zdCB0YWcgPSByZWFkZXIucmVhZFU4KCk7XG4gICAgaWYgKHR5LnZhcmlhbnRzLmxlbmd0aCA9PSAyICYmIHR5LnZhcmlhbnRzWzBdLm5hbWUgPT09IFwic29tZVwiICYmIHR5LnZhcmlhbnRzWzFdLm5hbWUgPT09IFwibm9uZVwiKSB7XG4gICAgICBpZiAodGFnID09PSAwKSB7XG4gICAgICAgIHJldHVybiBBbGdlYnJhaWNUeXBlLmRlc2VyaWFsaXplVmFsdWUoXG4gICAgICAgICAgcmVhZGVyLFxuICAgICAgICAgIHR5LnZhcmlhbnRzWzBdLmFsZ2VicmFpY1R5cGUsXG4gICAgICAgICAgdHlwZXNwYWNlXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKHRhZyA9PT0gMSkge1xuICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgYENhbid0IGRlc2VyaWFsaXplIGFuIG9wdGlvbiB0eXBlLCBjb3VsZG4ndCBmaW5kICR7dGFnfSB0YWdgO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHkudmFyaWFudHMubGVuZ3RoID09IDIgJiYgdHkudmFyaWFudHNbMF0ubmFtZSA9PT0gXCJva1wiICYmIHR5LnZhcmlhbnRzWzFdLm5hbWUgPT09IFwiZXJyXCIpIHtcbiAgICAgIGlmICh0YWcgPT09IDApIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBBbGdlYnJhaWNUeXBlLmRlc2VyaWFsaXplVmFsdWUoXG4gICAgICAgICAgcmVhZGVyLFxuICAgICAgICAgIHR5LnZhcmlhbnRzWzBdLmFsZ2VicmFpY1R5cGUsXG4gICAgICAgICAgdHlwZXNwYWNlXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB7IG9rOiB2YWx1ZSB9O1xuICAgICAgfSBlbHNlIGlmICh0YWcgPT09IDEpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBBbGdlYnJhaWNUeXBlLmRlc2VyaWFsaXplVmFsdWUoXG4gICAgICAgICAgcmVhZGVyLFxuICAgICAgICAgIHR5LnZhcmlhbnRzWzFdLmFsZ2VicmFpY1R5cGUsXG4gICAgICAgICAgdHlwZXNwYWNlXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB7IGVycjogdmFsdWUgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IGBDYW4ndCBkZXNlcmlhbGl6ZSBhIHJlc3VsdCB0eXBlLCBjb3VsZG4ndCBmaW5kICR7dGFnfSB0YWdgO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB2YXJpYW50ID0gdHkudmFyaWFudHNbdGFnXTtcbiAgICAgIGNvbnN0IHZhbHVlID0gQWxnZWJyYWljVHlwZS5kZXNlcmlhbGl6ZVZhbHVlKFxuICAgICAgICByZWFkZXIsXG4gICAgICAgIHZhcmlhbnQuYWxnZWJyYWljVHlwZSxcbiAgICAgICAgdHlwZXNwYWNlXG4gICAgICApO1xuICAgICAgcmV0dXJuIHsgdGFnOiB2YXJpYW50Lm5hbWUsIHZhbHVlIH07XG4gICAgfVxuICB9XG59O1xuXG4vLyBzcmMvbGliL29wdGlvbi50c1xudmFyIE9wdGlvbiA9IHtcbiAgZ2V0QWxnZWJyYWljVHlwZShpbm5lclR5cGUpIHtcbiAgICByZXR1cm4gQWxnZWJyYWljVHlwZS5TdW0oe1xuICAgICAgdmFyaWFudHM6IFtcbiAgICAgICAgeyBuYW1lOiBcInNvbWVcIiwgYWxnZWJyYWljVHlwZTogaW5uZXJUeXBlIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBcIm5vbmVcIixcbiAgICAgICAgICBhbGdlYnJhaWNUeXBlOiBBbGdlYnJhaWNUeXBlLlByb2R1Y3QoeyBlbGVtZW50czogW10gfSlcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pO1xuICB9XG59O1xuXG4vLyBzcmMvbGliL3Jlc3VsdC50c1xudmFyIFJlc3VsdCA9IHtcbiAgZ2V0QWxnZWJyYWljVHlwZShva1R5cGUsIGVyclR5cGUpIHtcbiAgICByZXR1cm4gQWxnZWJyYWljVHlwZS5TdW0oe1xuICAgICAgdmFyaWFudHM6IFtcbiAgICAgICAgeyBuYW1lOiBcIm9rXCIsIGFsZ2VicmFpY1R5cGU6IG9rVHlwZSB9LFxuICAgICAgICB7IG5hbWU6IFwiZXJyXCIsIGFsZ2VicmFpY1R5cGU6IGVyclR5cGUgfVxuICAgICAgXVxuICAgIH0pO1xuICB9XG59O1xuXG4vLyBzcmMvbGliL3NjaGVkdWxlX2F0LnRzXG52YXIgU2NoZWR1bGVBdCA9IHtcbiAgaW50ZXJ2YWwodmFsdWUpIHtcbiAgICByZXR1cm4gSW50ZXJ2YWwodmFsdWUpO1xuICB9LFxuICB0aW1lKHZhbHVlKSB7XG4gICAgcmV0dXJuIFRpbWUodmFsdWUpO1xuICB9LFxuICBnZXRBbGdlYnJhaWNUeXBlKCkge1xuICAgIHJldHVybiBBbGdlYnJhaWNUeXBlLlN1bSh7XG4gICAgICB2YXJpYW50czogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJJbnRlcnZhbFwiLFxuICAgICAgICAgIGFsZ2VicmFpY1R5cGU6IFRpbWVEdXJhdGlvbi5nZXRBbGdlYnJhaWNUeXBlKClcbiAgICAgICAgfSxcbiAgICAgICAgeyBuYW1lOiBcIlRpbWVcIiwgYWxnZWJyYWljVHlwZTogVGltZXN0YW1wLmdldEFsZ2VicmFpY1R5cGUoKSB9XG4gICAgICBdXG4gICAgfSk7XG4gIH0sXG4gIGlzU2NoZWR1bGVBdChhbGdlYnJhaWNUeXBlKSB7XG4gICAgaWYgKGFsZ2VicmFpY1R5cGUudGFnICE9PSBcIlN1bVwiKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHZhcmlhbnRzID0gYWxnZWJyYWljVHlwZS52YWx1ZS52YXJpYW50cztcbiAgICBpZiAodmFyaWFudHMubGVuZ3RoICE9PSAyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGludGVydmFsVmFyaWFudCA9IHZhcmlhbnRzLmZpbmQoKHYpID0+IHYubmFtZSA9PT0gXCJJbnRlcnZhbFwiKTtcbiAgICBjb25zdCB0aW1lVmFyaWFudCA9IHZhcmlhbnRzLmZpbmQoKHYpID0+IHYubmFtZSA9PT0gXCJUaW1lXCIpO1xuICAgIGlmICghaW50ZXJ2YWxWYXJpYW50IHx8ICF0aW1lVmFyaWFudCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gVGltZUR1cmF0aW9uLmlzVGltZUR1cmF0aW9uKGludGVydmFsVmFyaWFudC5hbGdlYnJhaWNUeXBlKSAmJiBUaW1lc3RhbXAuaXNUaW1lc3RhbXAodGltZVZhcmlhbnQuYWxnZWJyYWljVHlwZSk7XG4gIH1cbn07XG52YXIgSW50ZXJ2YWwgPSAobWljcm9zKSA9PiAoe1xuICB0YWc6IFwiSW50ZXJ2YWxcIixcbiAgdmFsdWU6IG5ldyBUaW1lRHVyYXRpb24obWljcm9zKVxufSk7XG52YXIgVGltZSA9IChtaWNyb3NTaW5jZVVuaXhFcG9jaCkgPT4gKHtcbiAgdGFnOiBcIlRpbWVcIixcbiAgdmFsdWU6IG5ldyBUaW1lc3RhbXAobWljcm9zU2luY2VVbml4RXBvY2gpXG59KTtcbnZhciBzY2hlZHVsZV9hdF9kZWZhdWx0ID0gU2NoZWR1bGVBdDtcblxuLy8gc3JjL2xpYi90eXBlX3V0aWwudHNcbmZ1bmN0aW9uIHNldCh4LCB0Mikge1xuICByZXR1cm4geyAuLi54LCAuLi50MiB9O1xufVxuXG4vLyBzcmMvbGliL3R5cGVfYnVpbGRlcnMudHNcbnZhciBUeXBlQnVpbGRlciA9IGNsYXNzIHtcbiAgLyoqXG4gICAqIFRoZSBUeXBlU2NyaXB0IHBoYW50b20gdHlwZS4gVGhpcyBpcyBub3Qgc3RvcmVkIGF0IHJ1bnRpbWUsXG4gICAqIGJ1dCBpcyB2aXNpYmxlIHRvIHRoZSBjb21waWxlclxuICAgKi9cbiAgdHlwZTtcbiAgLyoqXG4gICAqIFRoZSBTcGFjZXRpbWVEQiBhbGdlYnJhaWMgdHlwZSAocnVu4oCRdGltZSB2YWx1ZSkuIEluIGFkZGl0aW9uIHRvIHN0b3JpbmdcbiAgICogdGhlIHJ1bnRpbWUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGBBbGdlYnJhaWNUeXBlYCwgaXQgYWxzbyBjYXB0dXJlc1xuICAgKiB0aGUgVHlwZVNjcmlwdCB0eXBlIGluZm9ybWF0aW9uIG9mIHRoZSBgQWxnZWJyYWljVHlwZWAuIFRoYXQgaXMgdG8gc2F5XG4gICAqIHRoZSB2YWx1ZSBpcyBub3QgbWVyZWx5IGFuIGBBbGdlYnJhaWNUeXBlYCwgYnV0IGlzIGNvbnN0cnVjdGVkIHRvIGJlXG4gICAqIHRoZSBjb3JyZXNwb25kaW5nIGNvbmNyZXRlIGBBbGdlYnJhaWNUeXBlYCBmb3IgdGhlIFR5cGVTY3JpcHQgdHlwZSBgVHlwZWAuXG4gICAqXG4gICAqIGUuZy4gYHN0cmluZ2AgY29ycmVzcG9uZHMgdG8gYEFsZ2VicmFpY1R5cGUuU3RyaW5nYFxuICAgKi9cbiAgYWxnZWJyYWljVHlwZTtcbiAgY29uc3RydWN0b3IoYWxnZWJyYWljVHlwZSkge1xuICAgIHRoaXMuYWxnZWJyYWljVHlwZSA9IGFsZ2VicmFpY1R5cGU7XG4gIH1cbiAgb3B0aW9uYWwoKSB7XG4gICAgcmV0dXJuIG5ldyBPcHRpb25CdWlsZGVyKHRoaXMpO1xuICB9XG4gIHNlcmlhbGl6ZSh3cml0ZXIsIHZhbHVlKSB7XG4gICAgQWxnZWJyYWljVHlwZS5zZXJpYWxpemVWYWx1ZSh3cml0ZXIsIHRoaXMuYWxnZWJyYWljVHlwZSwgdmFsdWUpO1xuICB9XG4gIGRlc2VyaWFsaXplKHJlYWRlcikge1xuICAgIHJldHVybiBBbGdlYnJhaWNUeXBlLmRlc2VyaWFsaXplVmFsdWUocmVhZGVyLCB0aGlzLmFsZ2VicmFpY1R5cGUpO1xuICB9XG59O1xudmFyIFU4QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihBbGdlYnJhaWNUeXBlLlU4KTtcbiAgfVxuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IFU4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBVOENvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KSk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IFU4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IFU4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgVThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBVOENvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBVMTZCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuVTE2KTtcbiAgfVxuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IFUxNkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgVTE2Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgVTE2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IFUxNkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFUxNkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFUxNkNvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBVMzJCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuVTMyKTtcbiAgfVxuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IFUzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgVTMyQ29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgVTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IFUzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFUzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFUzMkNvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBVNjRCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuVTY0KTtcbiAgfVxuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IFU2NENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgVTY0Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgVTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IFU2NENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFU2NENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFU2NENvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBVMTI4QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihBbGdlYnJhaWNUeXBlLlUxMjgpO1xuICB9XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgVTEyOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgVTEyOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IFUxMjhDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgVTEyOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFUxMjhDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBVMTI4Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIFUyNTZCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuVTI1Nik7XG4gIH1cbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBVMjU2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBVMjU2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgVTI1NkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBVMjU2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgVTI1NkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFUyNTZDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgSThCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuSTgpO1xuICB9XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgSThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IEk4Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgSThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgSThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBJOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IEk4Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIEkxNkJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5JMTYpO1xuICB9XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgSTE2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBJMTZDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSkpO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBJMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgSTE2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgSTE2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgSTE2Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIEkzMkJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5JMzIpO1xuICB9XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgSTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBJMzJDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSkpO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBJMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgSTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgSTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgSTMyQ29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIEk2NEJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5JNjQpO1xuICB9XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgSTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBJNjRDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSkpO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBJNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgSTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgSTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgSTY0Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIEkxMjhCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuSTEyOCk7XG4gIH1cbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBJMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBJMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgSTEyOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBJMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgSTEyOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IEkxMjhDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgSTI1NkJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5JMjU2KTtcbiAgfVxuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IEkyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IEkyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBJMjU2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IEkyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBJMjU2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgSTI1NkNvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBGMzJCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuRjMyKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBGMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBGMzJDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgRjY0QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihBbGdlYnJhaWNUeXBlLkY2NCk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgRjY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgRjY0Q29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIEJvb2xCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuQm9vbCk7XG4gIH1cbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBCb29sQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBCb29sQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgQm9vbENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IEJvb2xDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBCb29sQ29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIFN0cmluZ0J1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoQWxnZWJyYWljVHlwZS5TdHJpbmcpO1xuICB9XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgU3RyaW5nQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBTdHJpbmdDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBTdHJpbmdDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBTdHJpbmdDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBTdHJpbmdDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgQXJyYXlCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICBzdXBlcihBbGdlYnJhaWNUeXBlLkFycmF5KGVsZW1lbnQuYWxnZWJyYWljVHlwZSkpO1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgQXJyYXlDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy5lbGVtZW50LFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IEFycmF5Q29sdW1uQnVpbGRlcih0aGlzLmVsZW1lbnQsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgQnl0ZUFycmF5QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihBbGdlYnJhaWNUeXBlLkFycmF5KEFsZ2VicmFpY1R5cGUuVTgpKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBCeXRlQXJyYXlDb2x1bW5CdWlsZGVyKFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IEJ5dGVBcnJheUNvbHVtbkJ1aWxkZXIoc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBPcHRpb25CdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIHZhbHVlO1xuICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgIHN1cGVyKE9wdGlvbi5nZXRBbGdlYnJhaWNUeXBlKHZhbHVlLmFsZ2VicmFpY1R5cGUpKTtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgT3B0aW9uQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgT3B0aW9uQ29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIFByb2R1Y3RCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIHR5cGVOYW1lO1xuICBlbGVtZW50cztcbiAgY29uc3RydWN0b3IoZWxlbWVudHMsIG5hbWUpIHtcbiAgICBmdW5jdGlvbiBlbGVtZW50c0FycmF5RnJvbUVsZW1lbnRzT2JqKG9iaikge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKChrZXkpID0+ICh7XG4gICAgICAgIG5hbWU6IGtleSxcbiAgICAgICAgLy8gTGF6aWx5IHJlc29sdmUgdGhlIHVuZGVybHlpbmcgb2JqZWN0J3MgYWxnZWJyYWljVHlwZS5cbiAgICAgICAgLy8gVGhpcyB3aWxsIGNhbGwgb2JqW2tleV0uYWxnZWJyYWljVHlwZSBvbmx5IHdoZW4gc29tZW9uZVxuICAgICAgICAvLyBhY3R1YWxseSByZWFkcyB0aGlzIHByb3BlcnR5LlxuICAgICAgICBnZXQgYWxnZWJyYWljVHlwZSgpIHtcbiAgICAgICAgICByZXR1cm4gb2JqW2tleV0uYWxnZWJyYWljVHlwZTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH1cbiAgICBzdXBlcihcbiAgICAgIEFsZ2VicmFpY1R5cGUuUHJvZHVjdCh7XG4gICAgICAgIGVsZW1lbnRzOiBlbGVtZW50c0FycmF5RnJvbUVsZW1lbnRzT2JqKGVsZW1lbnRzKVxuICAgICAgfSlcbiAgICApO1xuICAgIHRoaXMudHlwZU5hbWUgPSBuYW1lO1xuICAgIHRoaXMuZWxlbWVudHMgPSBlbGVtZW50cztcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9kdWN0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgUHJvZHVjdENvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBSZXN1bHRCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIG9rO1xuICBlcnI7XG4gIGNvbnN0cnVjdG9yKG9rLCBlcnIpIHtcbiAgICBzdXBlcihSZXN1bHQuZ2V0QWxnZWJyYWljVHlwZShvay5hbGdlYnJhaWNUeXBlLCBlcnIuYWxnZWJyYWljVHlwZSkpO1xuICAgIHRoaXMub2sgPSBvaztcbiAgICB0aGlzLmVyciA9IGVycjtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBSZXN1bHRDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KSk7XG4gIH1cbn07XG52YXIgVW5pdEJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoeyB0YWc6IFwiUHJvZHVjdFwiLCB2YWx1ZTogeyBlbGVtZW50czogW10gfSB9KTtcbiAgfVxufTtcbnZhciBSb3dCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIHJvdztcbiAgdHlwZU5hbWU7XG4gIGNvbnN0cnVjdG9yKHJvdywgbmFtZSkge1xuICAgIGNvbnN0IG1hcHBlZFJvdyA9IE9iamVjdC5mcm9tRW50cmllcyhcbiAgICAgIE9iamVjdC5lbnRyaWVzKHJvdykubWFwKChbY29sTmFtZSwgYnVpbGRlcl0pID0+IFtcbiAgICAgICAgY29sTmFtZSxcbiAgICAgICAgYnVpbGRlciBpbnN0YW5jZW9mIENvbHVtbkJ1aWxkZXIgPyBidWlsZGVyIDogbmV3IENvbHVtbkJ1aWxkZXIoYnVpbGRlciwge30pXG4gICAgICBdKVxuICAgICk7XG4gICAgY29uc3QgZWxlbWVudHMgPSBPYmplY3Qua2V5cyhtYXBwZWRSb3cpLm1hcCgobmFtZTIpID0+ICh7XG4gICAgICBuYW1lOiBuYW1lMixcbiAgICAgIGdldCBhbGdlYnJhaWNUeXBlKCkge1xuICAgICAgICByZXR1cm4gbWFwcGVkUm93W25hbWUyXS50eXBlQnVpbGRlci5hbGdlYnJhaWNUeXBlO1xuICAgICAgfVxuICAgIH0pKTtcbiAgICBzdXBlcihBbGdlYnJhaWNUeXBlLlByb2R1Y3QoeyBlbGVtZW50cyB9KSk7XG4gICAgdGhpcy5yb3cgPSBtYXBwZWRSb3c7XG4gICAgdGhpcy50eXBlTmFtZSA9IG5hbWU7XG4gIH1cbn07XG52YXIgU3VtQnVpbGRlckltcGwgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgdmFyaWFudHM7XG4gIHR5cGVOYW1lO1xuICBjb25zdHJ1Y3Rvcih2YXJpYW50cywgbmFtZSkge1xuICAgIGZ1bmN0aW9uIHZhcmlhbnRzQXJyYXlGcm9tVmFyaWFudHNPYmoodmFyaWFudHMyKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXModmFyaWFudHMyKS5tYXAoKGtleSkgPT4gKHtcbiAgICAgICAgbmFtZToga2V5LFxuICAgICAgICAvLyBMYXppbHkgcmVzb2x2ZSB0aGUgdW5kZXJseWluZyBvYmplY3QncyBhbGdlYnJhaWNUeXBlLlxuICAgICAgICAvLyBUaGlzIHdpbGwgY2FsbCBvYmpba2V5XS5hbGdlYnJhaWNUeXBlIG9ubHkgd2hlbiBzb21lb25lXG4gICAgICAgIC8vIGFjdHVhbGx5IHJlYWRzIHRoaXMgcHJvcGVydHkuXG4gICAgICAgIGdldCBhbGdlYnJhaWNUeXBlKCkge1xuICAgICAgICAgIHJldHVybiB2YXJpYW50czJba2V5XS5hbGdlYnJhaWNUeXBlO1xuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgfVxuICAgIHN1cGVyKFxuICAgICAgQWxnZWJyYWljVHlwZS5TdW0oe1xuICAgICAgICB2YXJpYW50czogdmFyaWFudHNBcnJheUZyb21WYXJpYW50c09iaih2YXJpYW50cylcbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLnZhcmlhbnRzID0gdmFyaWFudHM7XG4gICAgdGhpcy50eXBlTmFtZSA9IG5hbWU7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModmFyaWFudHMpKSB7XG4gICAgICBjb25zdCBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih2YXJpYW50cywga2V5KTtcbiAgICAgIGNvbnN0IGlzQWNjZXNzb3IgPSAhIWRlc2MgJiYgKHR5cGVvZiBkZXNjLmdldCA9PT0gXCJmdW5jdGlvblwiIHx8IHR5cGVvZiBkZXNjLnNldCA9PT0gXCJmdW5jdGlvblwiKTtcbiAgICAgIGxldCBpc1VuaXQyID0gZmFsc2U7XG4gICAgICBpZiAoIWlzQWNjZXNzb3IpIHtcbiAgICAgICAgY29uc3QgdmFyaWFudCA9IHZhcmlhbnRzW2tleV07XG4gICAgICAgIGlzVW5pdDIgPSB2YXJpYW50IGluc3RhbmNlb2YgVW5pdEJ1aWxkZXI7XG4gICAgICB9XG4gICAgICBpZiAoaXNVbml0Mikge1xuICAgICAgICBjb25zdCBjb25zdGFudCA9IHRoaXMuY3JlYXRlKGtleSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBrZXksIHtcbiAgICAgICAgICB2YWx1ZTogY29uc3RhbnQsXG4gICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGZuID0gKCh2YWx1ZSkgPT4gdGhpcy5jcmVhdGUoa2V5LCB2YWx1ZSkpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywga2V5LCB7XG4gICAgICAgICAgdmFsdWU6IGZuLFxuICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNyZWF0ZSh0YWcsIHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB2b2lkIDAgPyB7IHRhZyB9IDogeyB0YWcsIHZhbHVlIH07XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgU3VtQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgU3VtQ29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIFN1bUJ1aWxkZXIgPSBTdW1CdWlsZGVySW1wbDtcbnZhciBTaW1wbGVTdW1CdWlsZGVySW1wbCA9IGNsYXNzIGV4dGVuZHMgU3VtQnVpbGRlckltcGwge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IFNpbXBsZVN1bUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IFNpbXBsZVN1bUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIFNpbXBsZVN1bUJ1aWxkZXIgPSBTaW1wbGVTdW1CdWlsZGVySW1wbDtcbnZhciBTY2hlZHVsZUF0QnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihzY2hlZHVsZV9hdF9kZWZhdWx0LmdldEFsZ2VicmFpY1R5cGUoKSk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgU2NoZWR1bGVBdENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IFNjaGVkdWxlQXRDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgSWRlbnRpdHlCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKElkZW50aXR5LmdldEFsZ2VicmFpY1R5cGUoKSk7XG4gIH1cbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBJZGVudGl0eUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgSWRlbnRpdHlDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBJZGVudGl0eUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBJZGVudGl0eUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IElkZW50aXR5Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgSWRlbnRpdHlDb2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgQ29ubmVjdGlvbklkQnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihDb25uZWN0aW9uSWQuZ2V0QWxnZWJyYWljVHlwZSgpKTtcbiAgfVxuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IENvbm5lY3Rpb25JZENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgQ29ubmVjdGlvbklkQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgQ29ubmVjdGlvbklkQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IENvbm5lY3Rpb25JZENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IENvbm5lY3Rpb25JZENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IENvbm5lY3Rpb25JZENvbHVtbkJ1aWxkZXIodGhpcywgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBUaW1lc3RhbXBCdWlsZGVyID0gY2xhc3MgZXh0ZW5kcyBUeXBlQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKFRpbWVzdGFtcC5nZXRBbGdlYnJhaWNUeXBlKCkpO1xuICB9XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgVGltZXN0YW1wQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBUaW1lc3RhbXBDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBUaW1lc3RhbXBDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgVGltZXN0YW1wQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgVGltZXN0YW1wQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMsXG4gICAgICBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgVGltZXN0YW1wQ29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIFRpbWVEdXJhdGlvbkJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoVGltZUR1cmF0aW9uLmdldEFsZ2VicmFpY1R5cGUoKSk7XG4gIH1cbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBUaW1lRHVyYXRpb25Db2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IFRpbWVEdXJhdGlvbkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IFRpbWVEdXJhdGlvbkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBUaW1lRHVyYXRpb25Db2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBUaW1lRHVyYXRpb25Db2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBUaW1lRHVyYXRpb25Db2x1bW5CdWlsZGVyKHRoaXMsIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgbmFtZSB9KSk7XG4gIH1cbn07XG52YXIgVXVpZEJ1aWxkZXIgPSBjbGFzcyBleHRlbmRzIFR5cGVCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoVXVpZC5nZXRBbGdlYnJhaWNUeXBlKCkpO1xuICB9XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgVXVpZENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgVXVpZENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IFV1aWRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgVXVpZENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLFxuICAgICAgc2V0KGRlZmF1bHRNZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFV1aWRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcyxcbiAgICAgIHNldChkZWZhdWx0TWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBVdWlkQ29sdW1uQnVpbGRlcih0aGlzLCBzZXQoZGVmYXVsdE1ldGFkYXRhLCB7IG5hbWUgfSkpO1xuICB9XG59O1xudmFyIGRlZmF1bHRNZXRhZGF0YSA9IHt9O1xudmFyIENvbHVtbkJ1aWxkZXIgPSBjbGFzcyB7XG4gIHR5cGVCdWlsZGVyO1xuICBjb2x1bW5NZXRhZGF0YTtcbiAgY29uc3RydWN0b3IodHlwZUJ1aWxkZXIsIG1ldGFkYXRhKSB7XG4gICAgdGhpcy50eXBlQnVpbGRlciA9IHR5cGVCdWlsZGVyO1xuICAgIHRoaXMuY29sdW1uTWV0YWRhdGEgPSBtZXRhZGF0YTtcbiAgfVxuICBzZXJpYWxpemUod3JpdGVyLCB2YWx1ZSkge1xuICAgIEFsZ2VicmFpY1R5cGUuc2VyaWFsaXplVmFsdWUod3JpdGVyLCB0aGlzLnR5cGVCdWlsZGVyLmFsZ2VicmFpY1R5cGUsIHZhbHVlKTtcbiAgfVxuICBkZXNlcmlhbGl6ZShyZWFkZXIpIHtcbiAgICByZXR1cm4gQWxnZWJyYWljVHlwZS5kZXNlcmlhbGl6ZVZhbHVlKFxuICAgICAgcmVhZGVyLFxuICAgICAgdGhpcy50eXBlQnVpbGRlci5hbGdlYnJhaWNUeXBlXG4gICAgKTtcbiAgfVxufTtcbnZhciBVOENvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfVThDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgX1U4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgX1U4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IF9VOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgX1U4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9VOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX1U4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBVMTZDb2x1bW5CdWlsZGVyID0gY2xhc3MgX1UxNkNvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBfVTE2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgX1UxNkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBfVTE2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBfVTE2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9VMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9VMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIFUzMkNvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfVTMyQ29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IF9VMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBfVTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IF9VMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IF9VMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX1UzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX1UzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgVTY0Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9VNjRDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgX1U2NENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IF9VNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgX1U2NENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgX1U2NENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfVTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfVTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBVMTI4Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9VMTI4Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IF9VMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgX1UxMjhDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgX1UxMjhDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IF9VMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9VMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfVTEyOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgVTI1NkNvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfVTI1NkNvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBfVTI1NkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IF9VMjU2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IF9VMjU2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBfVTI1NkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfVTI1NkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX1UyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIEk4Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9JOENvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBfSThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBfSThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgX0k4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBfSThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX0k4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfSThDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIEkxNkNvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfSTE2Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IF9JMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBfSTE2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IF9JMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IF9JMTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX0kxNkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX0kxNkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgSTMyQ29sdW1uQnVpbGRlciA9IGNsYXNzIF9JMzJDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgX0kzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IF9JMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgX0kzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgX0kzMkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNBdXRvSW5jcmVtZW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfSTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfSTMyQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBJNjRDb2x1bW5CdWlsZGVyID0gY2xhc3MgX0k2NENvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBfSTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgX0k2NENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBfSTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGF1dG9JbmMoKSB7XG4gICAgcmV0dXJuIG5ldyBfSTY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9JNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9JNjRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIEkxMjhDb2x1bW5CdWlsZGVyID0gY2xhc3MgX0kxMjhDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgX0kxMjhDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBfSTEyOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBfSTEyOENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBhdXRvSW5jKCkge1xuICAgIHJldHVybiBuZXcgX0kxMjhDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzQXV0b0luY3JlbWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX0kxMjhDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9JMTI4Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBJMjU2Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9JMjU2Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IF9JMjU2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgX0kyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgX0kyNTZDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgYXV0b0luYygpIHtcbiAgICByZXR1cm4gbmV3IF9JMjU2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc0F1dG9JbmNyZW1lbnQ6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9JMjU2Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfSTI1NkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgRjMyQ29sdW1uQnVpbGRlciA9IGNsYXNzIF9GMzJDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9GMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9GMzJDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIEY2NENvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfRjY0Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfRjY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfRjY0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBCb29sQ29sdW1uQnVpbGRlciA9IGNsYXNzIF9Cb29sQ29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IF9Cb29sQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgX0Jvb2xDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgX0Jvb2xDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX0Jvb2xDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9Cb29sQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBTdHJpbmdDb2x1bW5CdWlsZGVyID0gY2xhc3MgX1N0cmluZ0NvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBfU3RyaW5nQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgX1N0cmluZ0NvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBfU3RyaW5nQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9TdHJpbmdDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdmFsdWVcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9TdHJpbmdDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIEFycmF5Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9BcnJheUNvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX0FycmF5Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwge1xuICAgICAgICBkZWZhdWx0VmFsdWU6IHZhbHVlXG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfQXJyYXlDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIEJ5dGVBcnJheUNvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfQnl0ZUFycmF5Q29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcihtZXRhZGF0YSkge1xuICAgIHN1cGVyKG5ldyBUeXBlQnVpbGRlcihBbGdlYnJhaWNUeXBlLkFycmF5KEFsZ2VicmFpY1R5cGUuVTgpKSwgbWV0YWRhdGEpO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9CeXRlQXJyYXlDb2x1bW5CdWlsZGVyKFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfQnl0ZUFycmF5Q29sdW1uQnVpbGRlcihzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pKTtcbiAgfVxufTtcbnZhciBPcHRpb25Db2x1bW5CdWlsZGVyID0gY2xhc3MgX09wdGlvbkNvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX09wdGlvbkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX09wdGlvbkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgUmVzdWx0Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9SZXN1bHRDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGNvbnN0cnVjdG9yKHR5cGVCdWlsZGVyLCBtZXRhZGF0YSkge1xuICAgIHN1cGVyKHR5cGVCdWlsZGVyLCBtZXRhZGF0YSk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX1Jlc3VsdENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlOiB2YWx1ZVxuICAgICAgfSlcbiAgICApO1xuICB9XG59O1xudmFyIFByb2R1Y3RDb2x1bW5CdWlsZGVyID0gY2xhc3MgX1Byb2R1Y3RDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9Qcm9kdWN0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9Qcm9kdWN0Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBTdW1Db2x1bW5CdWlsZGVyID0gY2xhc3MgX1N1bUNvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX1N1bUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfU3VtQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBTaW1wbGVTdW1Db2x1bW5CdWlsZGVyID0gY2xhc3MgX1NpbXBsZVN1bUNvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBTdW1Db2x1bW5CdWlsZGVyIHtcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBfU2ltcGxlU3VtQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IF9TaW1wbGVTdW1Db2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgU2NoZWR1bGVBdENvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfU2NoZWR1bGVBdENvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX1NjaGVkdWxlQXRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX1NjaGVkdWxlQXRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIElkZW50aXR5Q29sdW1uQnVpbGRlciA9IGNsYXNzIF9JZGVudGl0eUNvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBfSWRlbnRpdHlDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBfSWRlbnRpdHlDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgX0lkZW50aXR5Q29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9JZGVudGl0eUNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfSWRlbnRpdHlDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIENvbm5lY3Rpb25JZENvbHVtbkJ1aWxkZXIgPSBjbGFzcyBfQ29ubmVjdGlvbklkQ29sdW1uQnVpbGRlciBleHRlbmRzIENvbHVtbkJ1aWxkZXIge1xuICBpbmRleChhbGdvcml0aG0gPSBcImJ0cmVlXCIpIHtcbiAgICByZXR1cm4gbmV3IF9Db25uZWN0aW9uSWRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBfQ29ubmVjdGlvbklkQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1VuaXF1ZTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgcHJpbWFyeUtleSgpIHtcbiAgICByZXR1cm4gbmV3IF9Db25uZWN0aW9uSWRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzUHJpbWFyeUtleTogdHJ1ZSB9KVxuICAgICk7XG4gIH1cbiAgZGVmYXVsdCh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgX0Nvbm5lY3Rpb25JZENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfQ29ubmVjdGlvbklkQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBuYW1lIH0pXG4gICAgKTtcbiAgfVxufTtcbnZhciBUaW1lc3RhbXBDb2x1bW5CdWlsZGVyID0gY2xhc3MgX1RpbWVzdGFtcENvbHVtbkJ1aWxkZXIgZXh0ZW5kcyBDb2x1bW5CdWlsZGVyIHtcbiAgaW5kZXgoYWxnb3JpdGhtID0gXCJidHJlZVwiKSB7XG4gICAgcmV0dXJuIG5ldyBfVGltZXN0YW1wQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpbmRleFR5cGU6IGFsZ29yaXRobSB9KVxuICAgICk7XG4gIH1cbiAgdW5pcXVlKCkge1xuICAgIHJldHVybiBuZXcgX1RpbWVzdGFtcENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBfVGltZXN0YW1wQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBpc1ByaW1hcnlLZXk6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIGRlZmF1bHQodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IF9UaW1lc3RhbXBDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGRlZmF1bHRWYWx1ZTogdmFsdWUgfSlcbiAgICApO1xuICB9XG4gIG5hbWUobmFtZSkge1xuICAgIHJldHVybiBuZXcgX1RpbWVzdGFtcENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgVGltZUR1cmF0aW9uQ29sdW1uQnVpbGRlciA9IGNsYXNzIF9UaW1lRHVyYXRpb25Db2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgX1RpbWVEdXJhdGlvbkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaW5kZXhUeXBlOiBhbGdvcml0aG0gfSlcbiAgICApO1xuICB9XG4gIHVuaXF1ZSgpIHtcbiAgICByZXR1cm4gbmV3IF9UaW1lRHVyYXRpb25Db2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGlzVW5pcXVlOiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBwcmltYXJ5S2V5KCkge1xuICAgIHJldHVybiBuZXcgX1RpbWVEdXJhdGlvbkNvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfVGltZUR1cmF0aW9uQ29sdW1uQnVpbGRlcihcbiAgICAgIHRoaXMudHlwZUJ1aWxkZXIsXG4gICAgICBzZXQodGhpcy5jb2x1bW5NZXRhZGF0YSwgeyBkZWZhdWx0VmFsdWU6IHZhbHVlIH0pXG4gICAgKTtcbiAgfVxuICBuYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IF9UaW1lRHVyYXRpb25Db2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IG5hbWUgfSlcbiAgICApO1xuICB9XG59O1xudmFyIFV1aWRDb2x1bW5CdWlsZGVyID0gY2xhc3MgX1V1aWRDb2x1bW5CdWlsZGVyIGV4dGVuZHMgQ29sdW1uQnVpbGRlciB7XG4gIGluZGV4KGFsZ29yaXRobSA9IFwiYnRyZWVcIikge1xuICAgIHJldHVybiBuZXcgX1V1aWRDb2x1bW5CdWlsZGVyKFxuICAgICAgdGhpcy50eXBlQnVpbGRlcixcbiAgICAgIHNldCh0aGlzLmNvbHVtbk1ldGFkYXRhLCB7IGluZGV4VHlwZTogYWxnb3JpdGhtIH0pXG4gICAgKTtcbiAgfVxuICB1bmlxdWUoKSB7XG4gICAgcmV0dXJuIG5ldyBfVXVpZENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNVbmlxdWU6IHRydWUgfSlcbiAgICApO1xuICB9XG4gIHByaW1hcnlLZXkoKSB7XG4gICAgcmV0dXJuIG5ldyBfVXVpZENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgaXNQcmltYXJ5S2V5OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuICBkZWZhdWx0KHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBfVXVpZENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgZGVmYXVsdFZhbHVlOiB2YWx1ZSB9KVxuICAgICk7XG4gIH1cbiAgbmFtZShuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBfVXVpZENvbHVtbkJ1aWxkZXIoXG4gICAgICB0aGlzLnR5cGVCdWlsZGVyLFxuICAgICAgc2V0KHRoaXMuY29sdW1uTWV0YWRhdGEsIHsgbmFtZSB9KVxuICAgICk7XG4gIH1cbn07XG52YXIgUmVmQnVpbGRlciA9IGNsYXNzIGV4dGVuZHMgVHlwZUJ1aWxkZXIge1xuICByZWY7XG4gIC8qKiBUaGUgcGhhbnRvbSB0eXBlIG9mIHRoZSBwb2ludGVlIG9mIHRoaXMgcmVmLiAqL1xuICBfX3NwYWNldGltZVR5cGU7XG4gIGNvbnN0cnVjdG9yKHJlZikge1xuICAgIHN1cGVyKEFsZ2VicmFpY1R5cGUuUmVmKHJlZikpO1xuICAgIHRoaXMucmVmID0gcmVmO1xuICB9XG59O1xudmFyIGVudW1JbXBsID0gKChuYW1lT3JPYmosIG1heWJlT2JqKSA9PiB7XG4gIGxldCBvYmogPSBuYW1lT3JPYmo7XG4gIGxldCBuYW1lID0gdm9pZCAwO1xuICBpZiAodHlwZW9mIG5hbWVPck9iaiA9PT0gXCJzdHJpbmdcIikge1xuICAgIGlmICghbWF5YmVPYmopIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgIFwiV2hlbiBwcm92aWRpbmcgYSBuYW1lLCB5b3UgbXVzdCBhbHNvIHByb3ZpZGUgdGhlIHZhcmlhbnRzIG9iamVjdCBvciBhcnJheS5cIlxuICAgICAgKTtcbiAgICB9XG4gICAgb2JqID0gbWF5YmVPYmo7XG4gICAgbmFtZSA9IG5hbWVPck9iajtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgY29uc3Qgc2ltcGxlVmFyaWFudHNPYmogPSB7fTtcbiAgICBmb3IgKGNvbnN0IHZhcmlhbnQgb2Ygb2JqKSB7XG4gICAgICBzaW1wbGVWYXJpYW50c09ialt2YXJpYW50XSA9IG5ldyBVbml0QnVpbGRlcigpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFNpbXBsZVN1bUJ1aWxkZXJJbXBsKHNpbXBsZVZhcmlhbnRzT2JqLCBuYW1lKTtcbiAgfVxuICByZXR1cm4gbmV3IFN1bUJ1aWxkZXIob2JqLCBuYW1lKTtcbn0pO1xudmFyIHQgPSB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBCb29sYCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xuICAgKiBSZXByZXNlbnRlZCBhcyBgYm9vbGVhbmAgaW4gVHlwZVNjcmlwdC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIEJvb2xCdWlsZGVyfSBpbnN0YW5jZVxuICAgKi9cbiAgYm9vbDogKCkgPT4gbmV3IEJvb2xCdWlsZGVyKCksXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBTdHJpbmdgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXG4gICAqIFJlcHJlc2VudGVkIGFzIGBzdHJpbmdgIGluIFR5cGVTY3JpcHQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBTdHJpbmdCdWlsZGVyfSBpbnN0YW5jZVxuICAgKi9cbiAgc3RyaW5nOiAoKSA9PiBuZXcgU3RyaW5nQnVpbGRlcigpLFxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgRjY0YCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xuICAgKiBSZXByZXNlbnRlZCBhcyBgbnVtYmVyYCBpbiBUeXBlU2NyaXB0LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgRjY0QnVpbGRlcn0gaW5zdGFuY2VcbiAgICovXG4gIG51bWJlcjogKCkgPT4gbmV3IEY2NEJ1aWxkZXIoKSxcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYEk4YCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xuICAgKiBSZXByZXNlbnRlZCBhcyBgbnVtYmVyYCBpbiBUeXBlU2NyaXB0LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgSThCdWlsZGVyfSBpbnN0YW5jZVxuICAgKi9cbiAgaTg6ICgpID0+IG5ldyBJOEJ1aWxkZXIoKSxcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYFU4YCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xuICAgKiBSZXByZXNlbnRlZCBhcyBgbnVtYmVyYCBpbiBUeXBlU2NyaXB0LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgVThCdWlsZGVyfSBpbnN0YW5jZVxuICAgKi9cbiAgdTg6ICgpID0+IG5ldyBVOEJ1aWxkZXIoKSxcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYEkxNmAge0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnNcbiAgICogUmVwcmVzZW50ZWQgYXMgYG51bWJlcmAgaW4gVHlwZVNjcmlwdC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIEkxNkJ1aWxkZXJ9IGluc3RhbmNlXG4gICAqL1xuICBpMTY6ICgpID0+IG5ldyBJMTZCdWlsZGVyKCksXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBVMTZgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXG4gICAqIFJlcHJlc2VudGVkIGFzIGBudW1iZXJgIGluIFR5cGVTY3JpcHQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBVMTZCdWlsZGVyfSBpbnN0YW5jZVxuICAgKi9cbiAgdTE2OiAoKSA9PiBuZXcgVTE2QnVpbGRlcigpLFxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgSTMyYCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xuICAgKiBSZXByZXNlbnRlZCBhcyBgbnVtYmVyYCBpbiBUeXBlU2NyaXB0LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgSTMyQnVpbGRlcn0gaW5zdGFuY2VcbiAgICovXG4gIGkzMjogKCkgPT4gbmV3IEkzMkJ1aWxkZXIoKSxcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYFUzMmAge0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnNcbiAgICogUmVwcmVzZW50ZWQgYXMgYG51bWJlcmAgaW4gVHlwZVNjcmlwdC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIFUzMkJ1aWxkZXJ9IGluc3RhbmNlXG4gICAqL1xuICB1MzI6ICgpID0+IG5ldyBVMzJCdWlsZGVyKCksXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBJNjRgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXG4gICAqIFJlcHJlc2VudGVkIGFzIGBiaWdpbnRgIGluIFR5cGVTY3JpcHQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBJNjRCdWlsZGVyfSBpbnN0YW5jZVxuICAgKi9cbiAgaTY0OiAoKSA9PiBuZXcgSTY0QnVpbGRlcigpLFxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgVTY0YCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xuICAgKiBSZXByZXNlbnRlZCBhcyBgYmlnaW50YCBpbiBUeXBlU2NyaXB0LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgVTY0QnVpbGRlcn0gaW5zdGFuY2VcbiAgICovXG4gIHU2NDogKCkgPT4gbmV3IFU2NEJ1aWxkZXIoKSxcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYEkxMjhgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXG4gICAqIFJlcHJlc2VudGVkIGFzIGBiaWdpbnRgIGluIFR5cGVTY3JpcHQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBJMTI4QnVpbGRlcn0gaW5zdGFuY2VcbiAgICovXG4gIGkxMjg6ICgpID0+IG5ldyBJMTI4QnVpbGRlcigpLFxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgVTEyOGAge0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnNcbiAgICogUmVwcmVzZW50ZWQgYXMgYGJpZ2ludGAgaW4gVHlwZVNjcmlwdC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIFUxMjhCdWlsZGVyfSBpbnN0YW5jZVxuICAgKi9cbiAgdTEyODogKCkgPT4gbmV3IFUxMjhCdWlsZGVyKCksXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBJMjU2YCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xuICAgKiBSZXByZXNlbnRlZCBhcyBgYmlnaW50YCBpbiBUeXBlU2NyaXB0LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgSTI1NkJ1aWxkZXJ9IGluc3RhbmNlXG4gICAqL1xuICBpMjU2OiAoKSA9PiBuZXcgSTI1NkJ1aWxkZXIoKSxcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYFUyNTZgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zXG4gICAqIFJlcHJlc2VudGVkIGFzIGBiaWdpbnRgIGluIFR5cGVTY3JpcHQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBVMjU2QnVpbGRlcn0gaW5zdGFuY2VcbiAgICovXG4gIHUyNTY6ICgpID0+IG5ldyBVMjU2QnVpbGRlcigpLFxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgRjMyYCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9uc1xuICAgKiBSZXByZXNlbnRlZCBhcyBgbnVtYmVyYCBpbiBUeXBlU2NyaXB0LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgRjMyQnVpbGRlcn0gaW5zdGFuY2VcbiAgICovXG4gIGYzMjogKCkgPT4gbmV3IEYzMkJ1aWxkZXIoKSxcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYEY2NGAge0BsaW5rIEFsZ2VicmFpY1R5cGV9IHRvIGJlIHVzZWQgaW4gdGFibGUgZGVmaW5pdGlvbnNcbiAgICogUmVwcmVzZW50ZWQgYXMgYG51bWJlcmAgaW4gVHlwZVNjcmlwdC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIEY2NEJ1aWxkZXJ9IGluc3RhbmNlXG4gICAqL1xuICBmNjQ6ICgpID0+IG5ldyBGNjRCdWlsZGVyKCksXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGBQcm9kdWN0YCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9ucy4gUHJvZHVjdCB0eXBlcyBpbiBTcGFjZXRpbWVEQlxuICAgKiBhcmUgZXNzZW50aWFsbHkgdGhlIHNhbWUgYXMgb2JqZWN0cyBpbiBKYXZhU2NyaXB0L1R5cGVTY3JpcHQuXG4gICAqIFByb3BlcnRpZXMgb2YgdGhlIG9iamVjdCBtdXN0IGFsc28gYmUge0BsaW5rIFR5cGVCdWlsZGVyfXMuXG4gICAqIFJlcHJlc2VudGVkIGFzIGFuIG9iamVjdCB3aXRoIHNwZWNpZmljIHByb3BlcnRpZXMgaW4gVHlwZVNjcmlwdC5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgKG9wdGlvbmFsKSBBIGRpc3BsYXkgbmFtZSBmb3IgdGhlIHByb2R1Y3QgdHlwZS4gSWYgb21pdHRlZCwgYW4gYW5vbnltb3VzIHByb2R1Y3QgdHlwZSBpcyBjcmVhdGVkLlxuICAgKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgZGVmaW5pbmcgdGhlIHByb3BlcnRpZXMgb2YgdGhlIHR5cGUsIHdob3NlIHByb3BlcnR5XG4gICAqIHZhbHVlcyBtdXN0IGJlIHtAbGluayBUeXBlQnVpbGRlcn1zLlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgUHJvZHVjdEJ1aWxkZXJ9IGluc3RhbmNlLlxuICAgKi9cbiAgb2JqZWN0OiAoKG5hbWVPck9iaiwgbWF5YmVPYmopID0+IHtcbiAgICBpZiAodHlwZW9mIG5hbWVPck9iaiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgaWYgKCFtYXliZU9iaikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiV2hlbiBwcm92aWRpbmcgYSBuYW1lLCB5b3UgbXVzdCBhbHNvIHByb3ZpZGUgdGhlIG9iamVjdC5cIlxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBQcm9kdWN0QnVpbGRlcihtYXliZU9iaiwgbmFtZU9yT2JqKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBQcm9kdWN0QnVpbGRlcihuYW1lT3JPYmosIHZvaWQgMCk7XG4gIH0pLFxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgUm93YCB7QGxpbmsgQWxnZWJyYWljVHlwZX0gdG8gYmUgdXNlZCBpbiB0YWJsZSBkZWZpbml0aW9ucy4gUm93IHR5cGVzIGluIFNwYWNldGltZURCXG4gICAqIGFyZSBzaW1pbGFyIHRvIGBQcm9kdWN0YCB0eXBlcywgYnV0IGFyZSBzcGVjaWZpY2FsbHkgdXNlZCB0byBkZWZpbmUgdGhlIHNjaGVtYSBvZiBhIHRhYmxlIHJvdy5cbiAgICogUHJvcGVydGllcyBvZiB0aGUgb2JqZWN0IG11c3QgYWxzbyBiZSB7QGxpbmsgVHlwZUJ1aWxkZXJ9IG9yIHtAbGluayBDb2x1bW5CdWlsZGVyfXMuXG4gICAqXG4gICAqIFlvdSBjYW4gcmVwcmVzZW50IGEgYFJvd2AgYXMgZWl0aGVyIGEge0BsaW5rIFJvd09ian0gb3IgYW4ge0BsaW5rIFJvd0J1aWxkZXJ9IHR5cGUgd2hlblxuICAgKiBkZWZpbmluZyBhIHRhYmxlIHNjaGVtYS5cbiAgICpcbiAgICogVGhlIHtAbGluayBSb3dCdWlsZGVyfSB0eXBlIGlzIHVzZWZ1bCB3aGVuIHlvdSB3YW50IHRvIGNyZWF0ZSBhIHR5cGUgd2hpY2ggY2FuIGJlIHVzZWQgYW55d2hlcmVcbiAgICogYSB7QGxpbmsgVHlwZUJ1aWxkZXJ9IGlzIGFjY2VwdGVkLCBzdWNoIGFzIGluIG5lc3RlZCBvYmplY3RzIG9yIGFycmF5cywgb3IgYXMgdGhlIGFyZ3VtZW50XG4gICAqIHRvIGEgc2NoZWR1bGVkIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgZGVmaW5pbmcgdGhlIHByb3BlcnRpZXMgb2YgdGhlIHJvdywgd2hvc2UgcHJvcGVydHlcbiAgICogdmFsdWVzIG11c3QgYmUge0BsaW5rIFR5cGVCdWlsZGVyfXMgb3Ige0BsaW5rIENvbHVtbkJ1aWxkZXJ9cy5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIFJvd0J1aWxkZXJ9IGluc3RhbmNlXG4gICAqL1xuICByb3c6ICgobmFtZU9yT2JqLCBtYXliZU9iaikgPT4ge1xuICAgIGNvbnN0IFtvYmosIG5hbWVdID0gdHlwZW9mIG5hbWVPck9iaiA9PT0gXCJzdHJpbmdcIiA/IFttYXliZU9iaiwgbmFtZU9yT2JqXSA6IFtuYW1lT3JPYmosIHZvaWQgMF07XG4gICAgcmV0dXJuIG5ldyBSb3dCdWlsZGVyKG9iaiwgbmFtZSk7XG4gIH0pLFxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgQXJyYXlgIHtAbGluayBBbGdlYnJhaWNUeXBlfSB0byBiZSB1c2VkIGluIHRhYmxlIGRlZmluaXRpb25zLlxuICAgKiBSZXByZXNlbnRlZCBhcyBhbiBhcnJheSBpbiBUeXBlU2NyaXB0LlxuICAgKiBAcGFyYW0gZWxlbWVudCBUaGUgZWxlbWVudCB0eXBlIG9mIHRoZSBhcnJheSwgd2hpY2ggbXVzdCBiZSBhIGBUeXBlQnVpbGRlcmAuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBBcnJheUJ1aWxkZXJ9IGluc3RhbmNlXG4gICAqL1xuICBhcnJheShlKSB7XG4gICAgcmV0dXJuIG5ldyBBcnJheUJ1aWxkZXIoZSk7XG4gIH0sXG4gIGVudW06IGVudW1JbXBsLFxuICAvKipcbiAgICogVGhpcyBpcyBhIHNwZWNpYWwgaGVscGVyIGZ1bmN0aW9uIGZvciBjb252ZW5pZW50bHkgY3JlYXRpbmcge0BsaW5rIFByb2R1Y3R9IHR5cGUgY29sdW1ucyB3aXRoIG5vIGZpZWxkcy5cbiAgICpcbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIFByb2R1Y3RCdWlsZGVyfSBpbnN0YW5jZSB3aXRoIG5vIGZpZWxkcy5cbiAgICovXG4gIHVuaXQoKSB7XG4gICAgcmV0dXJuIG5ldyBVbml0QnVpbGRlcigpO1xuICB9LFxuICAvKipcbiAgICogQ3JlYXRlcyBhIGxhemlseS1ldmFsdWF0ZWQge0BsaW5rIFR5cGVCdWlsZGVyfS4gVGhpcyBpcyB1c2VmdWwgZm9yIGNyZWF0aW5nXG4gICAqIHJlY3Vyc2l2ZSB0eXBlcywgc3VjaCBhcyBhIHRyZWUgb3IgbGlua2VkIGxpc3QuXG4gICAqIEBwYXJhbSB0aHVuayBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHtAbGluayBUeXBlQnVpbGRlcn0uXG4gICAqIEByZXR1cm5zIEEgcHJveHkge0BsaW5rIFR5cGVCdWlsZGVyfSB0aGF0IGV2YWx1YXRlcyB0aGUgdGh1bmsgb24gZmlyc3QgYWNjZXNzLlxuICAgKi9cbiAgbGF6eSh0aHVuaykge1xuICAgIGxldCBjYWNoZWQgPSBudWxsO1xuICAgIGNvbnN0IGdldCA9ICgpID0+IGNhY2hlZCA/Pz0gdGh1bmsoKTtcbiAgICBjb25zdCBwcm94eSA9IG5ldyBQcm94eSh7fSwge1xuICAgICAgZ2V0KF90LCBwcm9wLCByZWN2KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGdldCgpO1xuICAgICAgICBjb25zdCB2YWwgPSBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3AsIHJlY3YpO1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gXCJmdW5jdGlvblwiID8gdmFsLmJpbmQodGFyZ2V0KSA6IHZhbDtcbiAgICAgIH0sXG4gICAgICBzZXQoX3QsIHByb3AsIHZhbHVlLCByZWN2KSB7XG4gICAgICAgIHJldHVybiBSZWZsZWN0LnNldChnZXQoKSwgcHJvcCwgdmFsdWUsIHJlY3YpO1xuICAgICAgfSxcbiAgICAgIGhhcyhfdCwgcHJvcCkge1xuICAgICAgICByZXR1cm4gcHJvcCBpbiBnZXQoKTtcbiAgICAgIH0sXG4gICAgICBvd25LZXlzKCkge1xuICAgICAgICByZXR1cm4gUmVmbGVjdC5vd25LZXlzKGdldCgpKTtcbiAgICAgIH0sXG4gICAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoX3QsIHByb3ApIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZ2V0KCksIHByb3ApO1xuICAgICAgfSxcbiAgICAgIGdldFByb3RvdHlwZU9mKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldFByb3RvdHlwZU9mKGdldCgpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcHJveHk7XG4gIH0sXG4gIC8qKlxuICAgKiBUaGlzIGlzIGEgc3BlY2lhbCBoZWxwZXIgZnVuY3Rpb24gZm9yIGNvbnZlbmllbnRseSBjcmVhdGluZyB7QGxpbmsgU2NoZWR1bGVBdH0gdHlwZSBjb2x1bW5zLlxuICAgKiBAcmV0dXJucyBBIG5ldyBDb2x1bW5CdWlsZGVyIGluc3RhbmNlIHdpdGggdGhlIHtAbGluayBTY2hlZHVsZUF0fSB0eXBlLlxuICAgKi9cbiAgc2NoZWR1bGVBdDogKCkgPT4ge1xuICAgIHJldHVybiBuZXcgU2NoZWR1bGVBdEJ1aWxkZXIoKTtcbiAgfSxcbiAgLyoqXG4gICAqIFRoaXMgaXMgYSBjb252ZW5pZW5jZSBtZXRob2QgZm9yIGNyZWF0aW5nIGEgY29sdW1uIHdpdGggdGhlIHtAbGluayBPcHRpb259IHR5cGUuXG4gICAqIFlvdSBjYW4gY3JlYXRlIGEgY29sdW1uIG9mIHRoZSBzYW1lIHR5cGUgYnkgY29uc3RydWN0aW5nIGFuIGVudW0gd2l0aCBhIGBzb21lYCBhbmQgYG5vbmVgIHZhcmlhbnQuXG4gICAqIEBwYXJhbSB2YWx1ZSBUaGUgdHlwZSBvZiB0aGUgdmFsdWUgY29udGFpbmVkIGluIHRoZSBgc29tZWAgdmFyaWFudCBvZiB0aGUgYE9wdGlvbmAuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBPcHRpb25CdWlsZGVyfSBpbnN0YW5jZSB3aXRoIHRoZSB7QGxpbmsgT3B0aW9ufSB0eXBlLlxuICAgKi9cbiAgb3B0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBPcHRpb25CdWlsZGVyKHZhbHVlKTtcbiAgfSxcbiAgLyoqXG4gICAqIFRoaXMgaXMgYSBjb252ZW5pZW5jZSBtZXRob2QgZm9yIGNyZWF0aW5nIGEgY29sdW1uIHdpdGggdGhlIHtAbGluayBSZXN1bHR9IHR5cGUuXG4gICAqIFlvdSBjYW4gY3JlYXRlIGEgY29sdW1uIG9mIHRoZSBzYW1lIHR5cGUgYnkgY29uc3RydWN0aW5nIGFuIGVudW0gd2l0aCBhbiBgb2tgIGFuZCBgZXJyYCB2YXJpYW50LlxuICAgKiBAcGFyYW0gb2sgVGhlIHR5cGUgb2YgdGhlIHZhbHVlIGNvbnRhaW5lZCBpbiB0aGUgYG9rYCB2YXJpYW50IG9mIHRoZSBgUmVzdWx0YC5cbiAgICogQHBhcmFtIGVyciBUaGUgdHlwZSBvZiB0aGUgdmFsdWUgY29udGFpbmVkIGluIHRoZSBgZXJyYCB2YXJpYW50IG9mIHRoZSBgUmVzdWx0YC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIFJlc3VsdEJ1aWxkZXJ9IGluc3RhbmNlIHdpdGggdGhlIHtAbGluayBSZXN1bHR9IHR5cGUuXG4gICAqL1xuICByZXN1bHQob2ssIGVycikge1xuICAgIHJldHVybiBuZXcgUmVzdWx0QnVpbGRlcihvaywgZXJyKTtcbiAgfSxcbiAgLyoqXG4gICAqIFRoaXMgaXMgYSBjb252ZW5pZW5jZSBtZXRob2QgZm9yIGNyZWF0aW5nIGEgY29sdW1uIHdpdGggdGhlIHtAbGluayBJZGVudGl0eX0gdHlwZS5cbiAgICogWW91IGNhbiBjcmVhdGUgYSBjb2x1bW4gb2YgdGhlIHNhbWUgdHlwZSBieSBjb25zdHJ1Y3RpbmcgYW4gYG9iamVjdGAgd2l0aCBhIHNpbmdsZSBgX19pZGVudGl0eV9fYCBlbGVtZW50LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgVHlwZUJ1aWxkZXJ9IGluc3RhbmNlIHdpdGggdGhlIHtAbGluayBJZGVudGl0eX0gdHlwZS5cbiAgICovXG4gIGlkZW50aXR5OiAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBJZGVudGl0eUJ1aWxkZXIoKTtcbiAgfSxcbiAgLyoqXG4gICAqIFRoaXMgaXMgYSBjb252ZW5pZW5jZSBtZXRob2QgZm9yIGNyZWF0aW5nIGEgY29sdW1uIHdpdGggdGhlIHtAbGluayBDb25uZWN0aW9uSWR9IHR5cGUuXG4gICAqIFlvdSBjYW4gY3JlYXRlIGEgY29sdW1uIG9mIHRoZSBzYW1lIHR5cGUgYnkgY29uc3RydWN0aW5nIGFuIGBvYmplY3RgIHdpdGggYSBzaW5nbGUgYF9fY29ubmVjdGlvbl9pZF9fYCBlbGVtZW50LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgVHlwZUJ1aWxkZXJ9IGluc3RhbmNlIHdpdGggdGhlIHtAbGluayBDb25uZWN0aW9uSWR9IHR5cGUuXG4gICAqL1xuICBjb25uZWN0aW9uSWQ6ICgpID0+IHtcbiAgICByZXR1cm4gbmV3IENvbm5lY3Rpb25JZEJ1aWxkZXIoKTtcbiAgfSxcbiAgLyoqXG4gICAqIFRoaXMgaXMgYSBjb252ZW5pZW5jZSBtZXRob2QgZm9yIGNyZWF0aW5nIGEgY29sdW1uIHdpdGggdGhlIHtAbGluayBUaW1lc3RhbXB9IHR5cGUuXG4gICAqIFlvdSBjYW4gY3JlYXRlIGEgY29sdW1uIG9mIHRoZSBzYW1lIHR5cGUgYnkgY29uc3RydWN0aW5nIGFuIGBvYmplY3RgIHdpdGggYSBzaW5nbGUgYF9fdGltZXN0YW1wX21pY3Jvc19zaW5jZV91bml4X2Vwb2NoX19gIGVsZW1lbnQuXG4gICAqIEByZXR1cm5zIEEgbmV3IHtAbGluayBUeXBlQnVpbGRlcn0gaW5zdGFuY2Ugd2l0aCB0aGUge0BsaW5rIFRpbWVzdGFtcH0gdHlwZS5cbiAgICovXG4gIHRpbWVzdGFtcDogKCkgPT4ge1xuICAgIHJldHVybiBuZXcgVGltZXN0YW1wQnVpbGRlcigpO1xuICB9LFxuICAvKipcbiAgICogVGhpcyBpcyBhIGNvbnZlbmllbmNlIG1ldGhvZCBmb3IgY3JlYXRpbmcgYSBjb2x1bW4gd2l0aCB0aGUge0BsaW5rIFRpbWVEdXJhdGlvbn0gdHlwZS5cbiAgICogWW91IGNhbiBjcmVhdGUgYSBjb2x1bW4gb2YgdGhlIHNhbWUgdHlwZSBieSBjb25zdHJ1Y3RpbmcgYW4gYG9iamVjdGAgd2l0aCBhIHNpbmdsZSBgX190aW1lX2R1cmF0aW9uX21pY3Jvc19fYCBlbGVtZW50LlxuICAgKiBAcmV0dXJucyBBIG5ldyB7QGxpbmsgVHlwZUJ1aWxkZXJ9IGluc3RhbmNlIHdpdGggdGhlIHtAbGluayBUaW1lRHVyYXRpb259IHR5cGUuXG4gICAqL1xuICB0aW1lRHVyYXRpb246ICgpID0+IHtcbiAgICByZXR1cm4gbmV3IFRpbWVEdXJhdGlvbkJ1aWxkZXIoKTtcbiAgfSxcbiAgLyoqXG4gICAqIFRoaXMgaXMgYSBjb252ZW5pZW5jZSBtZXRob2QgZm9yIGNyZWF0aW5nIGEgY29sdW1uIHdpdGggdGhlIHtAbGluayBVdWlkfSB0eXBlLlxuICAgKiBZb3UgY2FuIGNyZWF0ZSBhIGNvbHVtbiBvZiB0aGUgc2FtZSB0eXBlIGJ5IGNvbnN0cnVjdGluZyBhbiBgb2JqZWN0YCB3aXRoIGEgc2luZ2xlIGBfX3V1aWRfX2AgZWxlbWVudC5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIFR5cGVCdWlsZGVyfSBpbnN0YW5jZSB3aXRoIHRoZSB7QGxpbmsgVXVpZH0gdHlwZS5cbiAgICovXG4gIHV1aWQ6ICgpID0+IHtcbiAgICByZXR1cm4gbmV3IFV1aWRCdWlsZGVyKCk7XG4gIH0sXG4gIC8qKlxuICAgKiBUaGlzIGlzIGEgY29udmVuaWVuY2UgbWV0aG9kIGZvciBjcmVhdGluZyBhIGNvbHVtbiB3aXRoIHRoZSB7QGxpbmsgQnl0ZUFycmF5fSB0eXBlLlxuICAgKiBZb3UgY2FuIGNyZWF0ZSBhIGNvbHVtbiBvZiB0aGUgc2FtZSB0eXBlIGJ5IGNvbnN0cnVjdGluZyBhbiBgYXJyYXlgIG9mIGB1OGAuXG4gICAqIFRoZSBUeXBlU2NyaXB0IHJlcHJlc2VudGF0aW9uIGlzIHtAbGluayBVaW50OEFycmF5fS5cbiAgICogQHJldHVybnMgQSBuZXcge0BsaW5rIEJ5dGVBcnJheUJ1aWxkZXJ9IGluc3RhbmNlIHdpdGggdGhlIHtAbGluayBCeXRlQXJyYXl9IHR5cGUuXG4gICAqL1xuICBieXRlQXJyYXk6ICgpID0+IHtcbiAgICByZXR1cm4gbmV3IEJ5dGVBcnJheUJ1aWxkZXIoKTtcbiAgfVxufTtcblxuLy8gc3JjL2xpYi9hdXRvZ2VuL2xpZmVjeWNsZV90eXBlLnRzXG52YXIgTGlmZWN5Y2xlID0gdC5lbnVtKFwiTGlmZWN5Y2xlXCIsIHtcbiAgSW5pdDogdC51bml0KCksXG4gIE9uQ29ubmVjdDogdC51bml0KCksXG4gIE9uRGlzY29ubmVjdDogdC51bml0KClcbn0pO1xudmFyIGxpZmVjeWNsZV90eXBlX2RlZmF1bHQgPSBMaWZlY3ljbGU7XG5cbi8vIHNyYy9saWIvcmVkdWNlcnMudHNcbmZ1bmN0aW9uIHB1c2hSZWR1Y2VyKG5hbWUsIHBhcmFtcywgZm4sIGxpZmVjeWNsZSkge1xuICBpZiAoZXhpc3RpbmdSZWR1Y2Vycy5oYXMobmFtZSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBUaGVyZSBpcyBhbHJlYWR5IGEgcmVkdWNlciB3aXRoIHRoZSBuYW1lICcke25hbWV9J2ApO1xuICB9XG4gIGV4aXN0aW5nUmVkdWNlcnMuYWRkKG5hbWUpO1xuICBpZiAoIShwYXJhbXMgaW5zdGFuY2VvZiBSb3dCdWlsZGVyKSkge1xuICAgIHBhcmFtcyA9IG5ldyBSb3dCdWlsZGVyKHBhcmFtcyk7XG4gIH1cbiAgaWYgKHBhcmFtcy50eXBlTmFtZSA9PT0gdm9pZCAwKSB7XG4gICAgcGFyYW1zLnR5cGVOYW1lID0gdG9QYXNjYWxDYXNlKG5hbWUpO1xuICB9XG4gIGNvbnN0IHJlZiA9IHJlZ2lzdGVyVHlwZXNSZWN1cnNpdmVseShwYXJhbXMpO1xuICBjb25zdCBwYXJhbXNUeXBlID0gcmVzb2x2ZVR5cGUoTU9EVUxFX0RFRi50eXBlc3BhY2UsIHJlZikudmFsdWU7XG4gIE1PRFVMRV9ERUYucmVkdWNlcnMucHVzaCh7XG4gICAgbmFtZSxcbiAgICBwYXJhbXM6IHBhcmFtc1R5cGUsXG4gICAgbGlmZWN5Y2xlXG4gICAgLy8gPC0gbGlmZWN5Y2xlIGZsYWcgbGFuZHMgaGVyZVxuICB9KTtcbiAgaWYgKCFmbi5uYW1lKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBcIm5hbWVcIiwgeyB2YWx1ZTogbmFtZSwgd3JpdGFibGU6IGZhbHNlIH0pO1xuICB9XG4gIFJFRFVDRVJTLnB1c2goZm4pO1xufVxudmFyIGV4aXN0aW5nUmVkdWNlcnMgPSAvKiBAX19QVVJFX18gKi8gbmV3IFNldCgpO1xudmFyIFJFRFVDRVJTID0gW107XG5mdW5jdGlvbiByZWR1Y2VyKG5hbWUsIHBhcmFtcywgZm4pIHtcbiAgcHVzaFJlZHVjZXIobmFtZSwgcGFyYW1zLCBmbik7XG59XG5mdW5jdGlvbiBpbml0KG5hbWUsIHBhcmFtcywgZm4pIHtcbiAgcHVzaFJlZHVjZXIobmFtZSwgcGFyYW1zLCBmbiwgbGlmZWN5Y2xlX3R5cGVfZGVmYXVsdC5Jbml0KTtcbn1cbmZ1bmN0aW9uIGNsaWVudENvbm5lY3RlZChuYW1lLCBwYXJhbXMsIGZuKSB7XG4gIHB1c2hSZWR1Y2VyKG5hbWUsIHBhcmFtcywgZm4sIGxpZmVjeWNsZV90eXBlX2RlZmF1bHQuT25Db25uZWN0KTtcbn1cbmZ1bmN0aW9uIGNsaWVudERpc2Nvbm5lY3RlZChuYW1lLCBwYXJhbXMsIGZuKSB7XG4gIHB1c2hSZWR1Y2VyKG5hbWUsIHBhcmFtcywgZm4sIGxpZmVjeWNsZV90eXBlX2RlZmF1bHQuT25EaXNjb25uZWN0KTtcbn1cbnZhciBSZWR1Y2VycyA9IGNsYXNzIHtcbiAgcmVkdWNlcnNUeXBlO1xuICBjb25zdHJ1Y3RvcihoYW5kbGVzKSB7XG4gICAgdGhpcy5yZWR1Y2Vyc1R5cGUgPSByZWR1Y2Vyc1RvU2NoZW1hKGhhbmRsZXMpO1xuICB9XG59O1xuZnVuY3Rpb24gcmVkdWNlcnNUb1NjaGVtYShyZWR1Y2VyczIpIHtcbiAgY29uc3QgbWFwcGVkID0gcmVkdWNlcnMyLm1hcCgocikgPT4ge1xuICAgIGNvbnN0IHBhcmFtc1JvdyA9IHIucGFyYW1zLnJvdztcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogci5yZWR1Y2VyTmFtZSxcbiAgICAgIC8vIFByZWZlciB0aGUgc2NoZW1hJ3Mgb3duIGFjY2Vzc29yTmFtZSBpZiBwcmVzZW50IGF0IHJ1bnRpbWU7IG90aGVyd2lzZSBkZXJpdmUgaXQuXG4gICAgICBhY2Nlc3Nvck5hbWU6IHIuYWNjZXNzb3JOYW1lLFxuICAgICAgcGFyYW1zOiBwYXJhbXNSb3csXG4gICAgICBwYXJhbXNUeXBlOiByLnBhcmFtc1NwYWNldGltZVR5cGVcbiAgICB9O1xuICB9KTtcbiAgY29uc3QgcmVzdWx0ID0geyByZWR1Y2VyczogbWFwcGVkIH07XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiByZWR1Y2VycyguLi5hcmdzKSB7XG4gIGNvbnN0IGhhbmRsZXMgPSBhcmdzLmxlbmd0aCA9PT0gMSAmJiBBcnJheS5pc0FycmF5KGFyZ3NbMF0pID8gYXJnc1swXSA6IGFyZ3M7XG4gIHJldHVybiBuZXcgUmVkdWNlcnMoaGFuZGxlcyk7XG59XG5cbi8vIHNyYy9saWIvcXVlcnkudHNcbnZhciBRdWVyeUJyYW5kID0gU3ltYm9sKFwiUXVlcnlCcmFuZFwiKTtcbnZhciBpc1Jvd1R5cGVkUXVlcnkgPSAodmFsKSA9PiAhIXZhbCAmJiB0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiICYmIFF1ZXJ5QnJhbmQgaW4gdmFsO1xudmFyIGlzVHlwZWRRdWVyeSA9ICh2YWwpID0+ICEhdmFsICYmIHR5cGVvZiB2YWwgPT09IFwib2JqZWN0XCIgJiYgUXVlcnlCcmFuZCBpbiB2YWw7XG5mdW5jdGlvbiB0b1NxbChxKSB7XG4gIHJldHVybiBxLnRvU3FsKCk7XG59XG52YXIgU2VtaWpvaW5JbXBsID0gY2xhc3MgX1NlbWlqb2luSW1wbCB7XG4gIGNvbnN0cnVjdG9yKHNvdXJjZVF1ZXJ5LCBmaWx0ZXJRdWVyeSwgam9pbkNvbmRpdGlvbikge1xuICAgIHRoaXMuc291cmNlUXVlcnkgPSBzb3VyY2VRdWVyeTtcbiAgICB0aGlzLmZpbHRlclF1ZXJ5ID0gZmlsdGVyUXVlcnk7XG4gICAgdGhpcy5qb2luQ29uZGl0aW9uID0gam9pbkNvbmRpdGlvbjtcbiAgICBpZiAoc291cmNlUXVlcnkudGFibGUubmFtZSA9PT0gZmlsdGVyUXVlcnkudGFibGUubmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHNlbWlqb2luIGEgdGFibGUgdG8gaXRzZWxmXCIpO1xuICAgIH1cbiAgfVxuICBbUXVlcnlCcmFuZF0gPSB0cnVlO1xuICB0eXBlID0gXCJzZW1pam9pblwiO1xuICBidWlsZCgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB3aGVyZShwcmVkaWNhdGUpIHtcbiAgICBjb25zdCBuZXh0U291cmNlUXVlcnkgPSB0aGlzLnNvdXJjZVF1ZXJ5LndoZXJlKHByZWRpY2F0ZSk7XG4gICAgcmV0dXJuIG5ldyBfU2VtaWpvaW5JbXBsKFxuICAgICAgbmV4dFNvdXJjZVF1ZXJ5LFxuICAgICAgdGhpcy5maWx0ZXJRdWVyeSxcbiAgICAgIHRoaXMuam9pbkNvbmRpdGlvblxuICAgICk7XG4gIH1cbiAgdG9TcWwoKSB7XG4gICAgY29uc3QgbGVmdCA9IHRoaXMuZmlsdGVyUXVlcnk7XG4gICAgY29uc3QgcmlnaHQgPSB0aGlzLnNvdXJjZVF1ZXJ5O1xuICAgIGNvbnN0IGxlZnRUYWJsZSA9IHF1b3RlSWRlbnRpZmllcihsZWZ0LnRhYmxlLm5hbWUpO1xuICAgIGNvbnN0IHJpZ2h0VGFibGUgPSBxdW90ZUlkZW50aWZpZXIocmlnaHQudGFibGUubmFtZSk7XG4gICAgbGV0IHNxbCA9IGBTRUxFQ1QgJHtyaWdodFRhYmxlfS4qIEZST00gJHtsZWZ0VGFibGV9IEpPSU4gJHtyaWdodFRhYmxlfSBPTiAke2Jvb2xlYW5FeHByVG9TcWwodGhpcy5qb2luQ29uZGl0aW9uKX1gO1xuICAgIGNvbnN0IGNsYXVzZXMgPSBbXTtcbiAgICBpZiAobGVmdC53aGVyZUNsYXVzZSkge1xuICAgICAgY2xhdXNlcy5wdXNoKGJvb2xlYW5FeHByVG9TcWwobGVmdC53aGVyZUNsYXVzZSkpO1xuICAgIH1cbiAgICBpZiAocmlnaHQud2hlcmVDbGF1c2UpIHtcbiAgICAgIGNsYXVzZXMucHVzaChib29sZWFuRXhwclRvU3FsKHJpZ2h0LndoZXJlQ2xhdXNlKSk7XG4gICAgfVxuICAgIGlmIChjbGF1c2VzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHdoZXJlU3FsID0gY2xhdXNlcy5sZW5ndGggPT09IDEgPyBjbGF1c2VzWzBdIDogY2xhdXNlcy5tYXAod3JhcEluUGFyZW5zKS5qb2luKFwiIEFORCBcIik7XG4gICAgICBzcWwgKz0gYCBXSEVSRSAke3doZXJlU3FsfWA7XG4gICAgfVxuICAgIHJldHVybiBzcWw7XG4gIH1cbn07XG52YXIgRnJvbUJ1aWxkZXIgPSBjbGFzcyBfRnJvbUJ1aWxkZXIge1xuICBjb25zdHJ1Y3Rvcih0YWJsZTIsIHdoZXJlQ2xhdXNlKSB7XG4gICAgdGhpcy50YWJsZSA9IHRhYmxlMjtcbiAgICB0aGlzLndoZXJlQ2xhdXNlID0gd2hlcmVDbGF1c2U7XG4gIH1cbiAgW1F1ZXJ5QnJhbmRdID0gdHJ1ZTtcbiAgd2hlcmUocHJlZGljYXRlKSB7XG4gICAgY29uc3QgbmV3Q29uZGl0aW9uID0gcHJlZGljYXRlKHRoaXMudGFibGUuY29scyk7XG4gICAgY29uc3QgbmV4dFdoZXJlID0gdGhpcy53aGVyZUNsYXVzZSA/IGFuZCh0aGlzLndoZXJlQ2xhdXNlLCBuZXdDb25kaXRpb24pIDogbmV3Q29uZGl0aW9uO1xuICAgIHJldHVybiBuZXcgX0Zyb21CdWlsZGVyKHRoaXMudGFibGUsIG5leHRXaGVyZSk7XG4gIH1cbiAgcmlnaHRTZW1pam9pbihyaWdodCwgb24pIHtcbiAgICBjb25zdCBzb3VyY2VRdWVyeSA9IG5ldyBfRnJvbUJ1aWxkZXIocmlnaHQpO1xuICAgIGNvbnN0IGpvaW5Db25kaXRpb24gPSBvbihcbiAgICAgIHRoaXMudGFibGUuaW5kZXhlZENvbHMsXG4gICAgICByaWdodC5pbmRleGVkQ29sc1xuICAgICk7XG4gICAgcmV0dXJuIG5ldyBTZW1pam9pbkltcGwoc291cmNlUXVlcnksIHRoaXMsIGpvaW5Db25kaXRpb24pO1xuICB9XG4gIGxlZnRTZW1pam9pbihyaWdodCwgb24pIHtcbiAgICBjb25zdCBmaWx0ZXJRdWVyeSA9IG5ldyBfRnJvbUJ1aWxkZXIocmlnaHQpO1xuICAgIGNvbnN0IGpvaW5Db25kaXRpb24gPSBvbihcbiAgICAgIHRoaXMudGFibGUuaW5kZXhlZENvbHMsXG4gICAgICByaWdodC5pbmRleGVkQ29sc1xuICAgICk7XG4gICAgcmV0dXJuIG5ldyBTZW1pam9pbkltcGwodGhpcywgZmlsdGVyUXVlcnksIGpvaW5Db25kaXRpb24pO1xuICB9XG4gIHRvU3FsKCkge1xuICAgIHJldHVybiByZW5kZXJTZWxlY3RTcWxXaXRoSm9pbnModGhpcy50YWJsZSwgdGhpcy53aGVyZUNsYXVzZSk7XG4gIH1cbiAgYnVpbGQoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn07XG52YXIgVGFibGVSZWZJbXBsID0gY2xhc3Mge1xuICB0eXBlID0gXCJ0YWJsZVwiO1xuICBuYW1lO1xuICBjb2xzO1xuICBpbmRleGVkQ29scztcbiAgdGFibGVEZWY7XG4gIGNvbnN0cnVjdG9yKHRhYmxlRGVmKSB7XG4gICAgdGhpcy5uYW1lID0gdGFibGVEZWYubmFtZTtcbiAgICB0aGlzLmNvbHMgPSBjcmVhdGVSb3dFeHByKHRhYmxlRGVmKTtcbiAgICB0aGlzLmluZGV4ZWRDb2xzID0gdGhpcy5jb2xzO1xuICAgIHRoaXMudGFibGVEZWYgPSB0YWJsZURlZjtcbiAgICBPYmplY3QuZnJlZXplKHRoaXMpO1xuICB9XG4gIGFzRnJvbSgpIHtcbiAgICByZXR1cm4gbmV3IEZyb21CdWlsZGVyKHRoaXMpO1xuICB9XG4gIHJpZ2h0U2VtaWpvaW4ob3RoZXIsIG9uKSB7XG4gICAgcmV0dXJuIHRoaXMuYXNGcm9tKCkucmlnaHRTZW1pam9pbihvdGhlciwgb24pO1xuICB9XG4gIGxlZnRTZW1pam9pbihvdGhlciwgb24pIHtcbiAgICByZXR1cm4gdGhpcy5hc0Zyb20oKS5sZWZ0U2VtaWpvaW4ob3RoZXIsIG9uKTtcbiAgfVxuICBidWlsZCgpIHtcbiAgICByZXR1cm4gdGhpcy5hc0Zyb20oKS5idWlsZCgpO1xuICB9XG4gIHRvU3FsKCkge1xuICAgIHJldHVybiB0aGlzLmFzRnJvbSgpLnRvU3FsKCk7XG4gIH1cbiAgd2hlcmUocHJlZGljYXRlKSB7XG4gICAgcmV0dXJuIHRoaXMuYXNGcm9tKCkud2hlcmUocHJlZGljYXRlKTtcbiAgfVxufTtcbmZ1bmN0aW9uIGNyZWF0ZVRhYmxlUmVmRnJvbURlZih0YWJsZURlZikge1xuICByZXR1cm4gbmV3IFRhYmxlUmVmSW1wbCh0YWJsZURlZik7XG59XG5mdW5jdGlvbiBtYWtlUXVlcnlCdWlsZGVyKHNjaGVtYTIpIHtcbiAgY29uc3QgcWIgPSAvKiBAX19QVVJFX18gKi8gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgZm9yIChjb25zdCB0YWJsZTIgb2Ygc2NoZW1hMi50YWJsZXMpIHtcbiAgICBjb25zdCByZWYgPSBjcmVhdGVUYWJsZVJlZkZyb21EZWYoXG4gICAgICB0YWJsZTJcbiAgICApO1xuICAgIHFiW3RhYmxlMi5uYW1lXSA9IHJlZjtcbiAgfVxuICByZXR1cm4gT2JqZWN0LmZyZWV6ZShxYik7XG59XG5mdW5jdGlvbiBjcmVhdGVSb3dFeHByKHRhYmxlRGVmKSB7XG4gIGNvbnN0IHJvdyA9IHt9O1xuICBmb3IgKGNvbnN0IGNvbHVtbk5hbWUgb2YgT2JqZWN0LmtleXModGFibGVEZWYuY29sdW1ucykpIHtcbiAgICBjb25zdCBjb2x1bW5CdWlsZGVyID0gdGFibGVEZWYuY29sdW1uc1tjb2x1bW5OYW1lXTtcbiAgICBjb25zdCBjb2x1bW4gPSBuZXcgQ29sdW1uRXhwcmVzc2lvbihcbiAgICAgIHRhYmxlRGVmLm5hbWUsXG4gICAgICBjb2x1bW5OYW1lLFxuICAgICAgY29sdW1uQnVpbGRlci50eXBlQnVpbGRlci5hbGdlYnJhaWNUeXBlXG4gICAgKTtcbiAgICByb3dbY29sdW1uTmFtZV0gPSBPYmplY3QuZnJlZXplKGNvbHVtbik7XG4gIH1cbiAgcmV0dXJuIE9iamVjdC5mcmVlemUocm93KTtcbn1cbmZ1bmN0aW9uIGZyb20oc291cmNlKSB7XG4gIHJldHVybiBuZXcgRnJvbUJ1aWxkZXIocmVzb2x2ZVRhYmxlUmVmKHNvdXJjZSkpO1xufVxuZnVuY3Rpb24gcmVzb2x2ZVRhYmxlUmVmKHNvdXJjZSkge1xuICBpZiAodHlwZW9mIHNvdXJjZS5yZWYgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBzb3VyY2UucmVmKCk7XG4gIH1cbiAgcmV0dXJuIHNvdXJjZTtcbn1cbmZ1bmN0aW9uIHJlbmRlclNlbGVjdFNxbFdpdGhKb2lucyh0YWJsZTIsIHdoZXJlLCBleHRyYUNsYXVzZXMgPSBbXSkge1xuICBjb25zdCBxdW90ZWRUYWJsZSA9IHF1b3RlSWRlbnRpZmllcih0YWJsZTIubmFtZSk7XG4gIGNvbnN0IHNxbCA9IGBTRUxFQ1QgKiBGUk9NICR7cXVvdGVkVGFibGV9YDtcbiAgY29uc3QgY2xhdXNlcyA9IFtdO1xuICBpZiAod2hlcmUpIGNsYXVzZXMucHVzaChib29sZWFuRXhwclRvU3FsKHdoZXJlKSk7XG4gIGNsYXVzZXMucHVzaCguLi5leHRyYUNsYXVzZXMpO1xuICBpZiAoY2xhdXNlcy5sZW5ndGggPT09IDApIHJldHVybiBzcWw7XG4gIGNvbnN0IHdoZXJlU3FsID0gY2xhdXNlcy5sZW5ndGggPT09IDEgPyBjbGF1c2VzWzBdIDogY2xhdXNlcy5tYXAod3JhcEluUGFyZW5zKS5qb2luKFwiIEFORCBcIik7XG4gIHJldHVybiBgJHtzcWx9IFdIRVJFICR7d2hlcmVTcWx9YDtcbn1cbnZhciBDb2x1bW5FeHByZXNzaW9uID0gY2xhc3Mge1xuICB0eXBlID0gXCJjb2x1bW5cIjtcbiAgY29sdW1uO1xuICB0YWJsZTtcbiAgLy8gcGhhbnRvbTogYWN0dWFsIHJ1bnRpbWUgdmFsdWUgaXMgdW5kZWZpbmVkXG4gIHRzVmFsdWVUeXBlO1xuICBzcGFjZXRpbWVUeXBlO1xuICBjb25zdHJ1Y3Rvcih0YWJsZTIsIGNvbHVtbiwgc3BhY2V0aW1lVHlwZSkge1xuICAgIHRoaXMudGFibGUgPSB0YWJsZTI7XG4gICAgdGhpcy5jb2x1bW4gPSBjb2x1bW47XG4gICAgdGhpcy5zcGFjZXRpbWVUeXBlID0gc3BhY2V0aW1lVHlwZTtcbiAgfVxuICAvLyBUaGVzZSB0eXBlcyBjb3VsZCBiZSB0aWdodGVkLCBidXQgc2luY2Ugd2UgZGVjbGFyZSB0aGUgb3ZlcmxvYWRzIGFib3ZlLCBpdCBkb2Vzbid0IHdlYWtlbiB0aGUgQVBJIHN1cmZhY2UuXG4gIGVxKHgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogXCJlcVwiLFxuICAgICAgbGVmdDogdGhpcyxcbiAgICAgIHJpZ2h0OiBub3JtYWxpemVWYWx1ZSh4KVxuICAgIH07XG4gIH1cbiAgLy8gVGhlc2UgdHlwZXMgY291bGQgYmUgdGlnaHRlZCwgYnV0IHNpbmNlIHdlIGRlY2xhcmUgdGhlIG92ZXJsb2FkcyBhYm92ZSwgaXQgZG9lc24ndCB3ZWFrZW4gdGhlIEFQSSBzdXJmYWNlLlxuICBsdCh4KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IFwibHRcIixcbiAgICAgIGxlZnQ6IHRoaXMsXG4gICAgICByaWdodDogbm9ybWFsaXplVmFsdWUoeClcbiAgICB9O1xuICB9XG4gIC8vIFRoZXNlIHR5cGVzIGNvdWxkIGJlIHRpZ2h0ZWQsIGJ1dCBzaW5jZSB3ZSBkZWNsYXJlIHRoZSBvdmVybG9hZHMgYWJvdmUsIGl0IGRvZXNuJ3Qgd2Vha2VuIHRoZSBBUEkgc3VyZmFjZS5cbiAgbHRlKHgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogXCJsdGVcIixcbiAgICAgIGxlZnQ6IHRoaXMsXG4gICAgICByaWdodDogbm9ybWFsaXplVmFsdWUoeClcbiAgICB9O1xuICB9XG4gIC8vIFRoZXNlIHR5cGVzIGNvdWxkIGJlIHRpZ2h0ZWQsIGJ1dCBzaW5jZSB3ZSBkZWNsYXJlIHRoZSBvdmVybG9hZHMgYWJvdmUsIGl0IGRvZXNuJ3Qgd2Vha2VuIHRoZSBBUEkgc3VyZmFjZS5cbiAgZ3QoeCkge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBcImd0XCIsXG4gICAgICBsZWZ0OiB0aGlzLFxuICAgICAgcmlnaHQ6IG5vcm1hbGl6ZVZhbHVlKHgpXG4gICAgfTtcbiAgfVxuICAvLyBUaGVzZSB0eXBlcyBjb3VsZCBiZSB0aWdodGVkLCBidXQgc2luY2Ugd2UgZGVjbGFyZSB0aGUgb3ZlcmxvYWRzIGFib3ZlLCBpdCBkb2Vzbid0IHdlYWtlbiB0aGUgQVBJIHN1cmZhY2UuXG4gIGd0ZSh4KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IFwiZ3RlXCIsXG4gICAgICBsZWZ0OiB0aGlzLFxuICAgICAgcmlnaHQ6IG5vcm1hbGl6ZVZhbHVlKHgpXG4gICAgfTtcbiAgfVxufTtcbmZ1bmN0aW9uIGxpdGVyYWwodmFsdWUpIHtcbiAgcmV0dXJuIHsgdHlwZTogXCJsaXRlcmFsXCIsIHZhbHVlIH07XG59XG5mdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWwpIHtcbiAgaWYgKHZhbC50eXBlID09PSBcImxpdGVyYWxcIilcbiAgICByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIiAmJiB2YWwgIT0gbnVsbCAmJiBcInR5cGVcIiBpbiB2YWwgJiYgdmFsLnR5cGUgPT09IFwiY29sdW1uXCIpIHtcbiAgICByZXR1cm4gdmFsO1xuICB9XG4gIHJldHVybiBsaXRlcmFsKHZhbCk7XG59XG5mdW5jdGlvbiBub3QoY2xhdXNlKSB7XG4gIHJldHVybiB7IHR5cGU6IFwibm90XCIsIGNsYXVzZSB9O1xufVxuZnVuY3Rpb24gYW5kKC4uLmNsYXVzZXMpIHtcbiAgcmV0dXJuIHsgdHlwZTogXCJhbmRcIiwgY2xhdXNlcyB9O1xufVxuZnVuY3Rpb24gb3IoLi4uY2xhdXNlcykge1xuICByZXR1cm4geyB0eXBlOiBcIm9yXCIsIGNsYXVzZXMgfTtcbn1cbmZ1bmN0aW9uIGJvb2xlYW5FeHByVG9TcWwoZXhwciwgdGFibGVBbGlhcykge1xuICBzd2l0Y2ggKGV4cHIudHlwZSkge1xuICAgIGNhc2UgXCJlcVwiOlxuICAgICAgcmV0dXJuIGAke3ZhbHVlRXhwclRvU3FsKGV4cHIubGVmdCl9ID0gJHt2YWx1ZUV4cHJUb1NxbChleHByLnJpZ2h0KX1gO1xuICAgIGNhc2UgXCJuZVwiOlxuICAgICAgcmV0dXJuIGAke3ZhbHVlRXhwclRvU3FsKGV4cHIubGVmdCl9IDw+ICR7dmFsdWVFeHByVG9TcWwoZXhwci5yaWdodCl9YDtcbiAgICBjYXNlIFwiZ3RcIjpcbiAgICAgIHJldHVybiBgJHt2YWx1ZUV4cHJUb1NxbChleHByLmxlZnQpfSA+ICR7dmFsdWVFeHByVG9TcWwoZXhwci5yaWdodCl9YDtcbiAgICBjYXNlIFwiZ3RlXCI6XG4gICAgICByZXR1cm4gYCR7dmFsdWVFeHByVG9TcWwoZXhwci5sZWZ0KX0gPj0gJHt2YWx1ZUV4cHJUb1NxbChleHByLnJpZ2h0KX1gO1xuICAgIGNhc2UgXCJsdFwiOlxuICAgICAgcmV0dXJuIGAke3ZhbHVlRXhwclRvU3FsKGV4cHIubGVmdCl9IDwgJHt2YWx1ZUV4cHJUb1NxbChleHByLnJpZ2h0KX1gO1xuICAgIGNhc2UgXCJsdGVcIjpcbiAgICAgIHJldHVybiBgJHt2YWx1ZUV4cHJUb1NxbChleHByLmxlZnQpfSA8PSAke3ZhbHVlRXhwclRvU3FsKGV4cHIucmlnaHQpfWA7XG4gICAgY2FzZSBcImFuZFwiOlxuICAgICAgcmV0dXJuIGV4cHIuY2xhdXNlcy5tYXAoKGMpID0+IGJvb2xlYW5FeHByVG9TcWwoYykpLm1hcCh3cmFwSW5QYXJlbnMpLmpvaW4oXCIgQU5EIFwiKTtcbiAgICBjYXNlIFwib3JcIjpcbiAgICAgIHJldHVybiBleHByLmNsYXVzZXMubWFwKChjKSA9PiBib29sZWFuRXhwclRvU3FsKGMpKS5tYXAod3JhcEluUGFyZW5zKS5qb2luKFwiIE9SIFwiKTtcbiAgICBjYXNlIFwibm90XCI6XG4gICAgICByZXR1cm4gYE5PVCAke3dyYXBJblBhcmVucyhib29sZWFuRXhwclRvU3FsKGV4cHIuY2xhdXNlKSl9YDtcbiAgfVxufVxuZnVuY3Rpb24gd3JhcEluUGFyZW5zKHNxbCkge1xuICByZXR1cm4gYCgke3NxbH0pYDtcbn1cbmZ1bmN0aW9uIHZhbHVlRXhwclRvU3FsKGV4cHIsIHRhYmxlQWxpYXMpIHtcbiAgaWYgKGlzTGl0ZXJhbEV4cHIoZXhwcikpIHtcbiAgICByZXR1cm4gbGl0ZXJhbFZhbHVlVG9TcWwoZXhwci52YWx1ZSk7XG4gIH1cbiAgY29uc3QgdGFibGUyID0gZXhwci50YWJsZTtcbiAgcmV0dXJuIGAke3F1b3RlSWRlbnRpZmllcih0YWJsZTIpfS4ke3F1b3RlSWRlbnRpZmllcihleHByLmNvbHVtbil9YDtcbn1cbmZ1bmN0aW9uIGxpdGVyYWxWYWx1ZVRvU3FsKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgcmV0dXJuIFwiTlVMTFwiO1xuICB9XG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIElkZW50aXR5IHx8IHZhbHVlIGluc3RhbmNlb2YgQ29ubmVjdGlvbklkKSB7XG4gICAgcmV0dXJuIGAweCR7dmFsdWUudG9IZXhTdHJpbmcoKX1gO1xuICB9XG4gIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgY2FzZSBcIm51bWJlclwiOlxuICAgIGNhc2UgXCJiaWdpbnRcIjpcbiAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICByZXR1cm4gdmFsdWUgPyBcIlRSVUVcIiA6IFwiRkFMU0VcIjtcbiAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICByZXR1cm4gYCcke3ZhbHVlLnJlcGxhY2UoLycvZywgXCInJ1wiKX0nYDtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGAnJHtKU09OLnN0cmluZ2lmeSh2YWx1ZSkucmVwbGFjZSgvJy9nLCBcIicnXCIpfSdgO1xuICB9XG59XG5mdW5jdGlvbiBxdW90ZUlkZW50aWZpZXIobmFtZSkge1xuICByZXR1cm4gYFwiJHtuYW1lLnJlcGxhY2UoL1wiL2csICdcIlwiJyl9XCJgO1xufVxuZnVuY3Rpb24gaXNMaXRlcmFsRXhwcihleHByKSB7XG4gIHJldHVybiBleHByLnR5cGUgPT09IFwibGl0ZXJhbFwiO1xufVxuXG4vLyBzcmMvbGliL3ZpZXdzLnRzXG5mdW5jdGlvbiBkZWZpbmVWaWV3KG9wdHMsIGFub24sIHBhcmFtcywgcmV0LCBmbikge1xuICBjb25zdCBwYXJhbXNCdWlsZGVyID0gbmV3IFJvd0J1aWxkZXIocGFyYW1zLCB0b1Bhc2NhbENhc2Uob3B0cy5uYW1lKSk7XG4gIGxldCByZXR1cm5UeXBlID0gcmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KHJldCkuYWxnZWJyYWljVHlwZTtcbiAgY29uc3QgeyB2YWx1ZTogcGFyYW1UeXBlIH0gPSByZXNvbHZlVHlwZShcbiAgICBNT0RVTEVfREVGLnR5cGVzcGFjZSxcbiAgICByZWdpc3RlclR5cGVzUmVjdXJzaXZlbHkocGFyYW1zQnVpbGRlcilcbiAgKTtcbiAgTU9EVUxFX0RFRi5taXNjRXhwb3J0cy5wdXNoKHtcbiAgICB0YWc6IFwiVmlld1wiLFxuICAgIHZhbHVlOiB7XG4gICAgICBuYW1lOiBvcHRzLm5hbWUsXG4gICAgICBpbmRleDogKGFub24gPyBBTk9OX1ZJRVdTIDogVklFV1MpLmxlbmd0aCxcbiAgICAgIGlzUHVibGljOiBvcHRzLnB1YmxpYyxcbiAgICAgIGlzQW5vbnltb3VzOiBhbm9uLFxuICAgICAgcGFyYW1zOiBwYXJhbVR5cGUsXG4gICAgICByZXR1cm5UeXBlXG4gICAgfVxuICB9KTtcbiAgaWYgKHJldHVyblR5cGUudGFnID09IFwiU3VtXCIpIHtcbiAgICBjb25zdCBvcmlnaW5hbEZuID0gZm47XG4gICAgZm4gPSAoKGN0eCwgYXJncykgPT4ge1xuICAgICAgY29uc3QgcmV0MiA9IG9yaWdpbmFsRm4oY3R4LCBhcmdzKTtcbiAgICAgIHJldHVybiByZXQyID09IG51bGwgPyBbXSA6IFtyZXQyXTtcbiAgICB9KTtcbiAgICByZXR1cm5UeXBlID0gQWxnZWJyYWljVHlwZS5BcnJheShcbiAgICAgIHJldHVyblR5cGUudmFsdWUudmFyaWFudHNbMF0uYWxnZWJyYWljVHlwZVxuICAgICk7XG4gIH1cbiAgKGFub24gPyBBTk9OX1ZJRVdTIDogVklFV1MpLnB1c2goe1xuICAgIGZuLFxuICAgIHBhcmFtczogcGFyYW1UeXBlLFxuICAgIHJldHVyblR5cGUsXG4gICAgcmV0dXJuVHlwZUJhc2VTaXplOiBic2F0bkJhc2VTaXplKE1PRFVMRV9ERUYudHlwZXNwYWNlLCByZXR1cm5UeXBlKVxuICB9KTtcbn1cbnZhciBWSUVXUyA9IFtdO1xudmFyIEFOT05fVklFV1MgPSBbXTtcblxuLy8gc3JjL2xpYi9wcm9jZWR1cmVzLnRzXG5mdW5jdGlvbiBwcm9jZWR1cmUobmFtZSwgcGFyYW1zLCByZXQsIGZuKSB7XG4gIGNvbnN0IHBhcmFtc1R5cGUgPSB7XG4gICAgZWxlbWVudHM6IE9iamVjdC5lbnRyaWVzKHBhcmFtcykubWFwKChbbiwgY10pID0+ICh7XG4gICAgICBuYW1lOiBuLFxuICAgICAgYWxnZWJyYWljVHlwZTogcmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KFxuICAgICAgICBcInR5cGVCdWlsZGVyXCIgaW4gYyA/IGMudHlwZUJ1aWxkZXIgOiBjXG4gICAgICApLmFsZ2VicmFpY1R5cGVcbiAgICB9KSlcbiAgfTtcbiAgY29uc3QgcmV0dXJuVHlwZSA9IHJlZ2lzdGVyVHlwZXNSZWN1cnNpdmVseShyZXQpLmFsZ2VicmFpY1R5cGU7XG4gIE1PRFVMRV9ERUYubWlzY0V4cG9ydHMucHVzaCh7XG4gICAgdGFnOiBcIlByb2NlZHVyZVwiLFxuICAgIHZhbHVlOiB7XG4gICAgICBuYW1lLFxuICAgICAgcGFyYW1zOiBwYXJhbXNUeXBlLFxuICAgICAgcmV0dXJuVHlwZVxuICAgIH1cbiAgfSk7XG4gIFBST0NFRFVSRVMucHVzaCh7XG4gICAgZm4sXG4gICAgcGFyYW1zVHlwZSxcbiAgICByZXR1cm5UeXBlLFxuICAgIHJldHVyblR5cGVCYXNlU2l6ZTogYnNhdG5CYXNlU2l6ZShNT0RVTEVfREVGLnR5cGVzcGFjZSwgcmV0dXJuVHlwZSlcbiAgfSk7XG59XG52YXIgUFJPQ0VEVVJFUyA9IFtdO1xuXG4vLyBzcmMvbGliL3NjaGVtYS50c1xudmFyIFJFR0lTVEVSRURfU0NIRU1BID0gbnVsbDtcbmZ1bmN0aW9uIGdldFJlZ2lzdGVyZWRTY2hlbWEoKSB7XG4gIGlmIChSRUdJU1RFUkVEX1NDSEVNQSA9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiU2NoZW1hIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkIHlldC4gQ2FsbCBzY2hlbWEoKSBmaXJzdC5cIik7XG4gIH1cbiAgcmV0dXJuIFJFR0lTVEVSRURfU0NIRU1BO1xufVxuZnVuY3Rpb24gdGFibGVzVG9TY2hlbWEodGFibGVzKSB7XG4gIHJldHVybiB7IHRhYmxlczogdGFibGVzLm1hcCh0YWJsZVRvU2NoZW1hKSB9O1xufVxuZnVuY3Rpb24gdGFibGVUb1NjaGVtYShzY2hlbWEyKSB7XG4gIGNvbnN0IGdldENvbE5hbWUgPSAoaSkgPT4gc2NoZW1hMi5yb3dUeXBlLmFsZ2VicmFpY1R5cGUudmFsdWUuZWxlbWVudHNbaV0ubmFtZTtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBzY2hlbWEyLnRhYmxlTmFtZSxcbiAgICBhY2Nlc3Nvck5hbWU6IHRvQ2FtZWxDYXNlKHNjaGVtYTIudGFibGVOYW1lKSxcbiAgICBjb2x1bW5zOiBzY2hlbWEyLnJvd1R5cGUucm93LFxuICAgIC8vIHR5cGVkIGFzIFRbaV1bJ3Jvd1R5cGUnXVsncm93J10gdW5kZXIgVGFibGVzVG9TY2hlbWE8VD5cbiAgICByb3dUeXBlOiBzY2hlbWEyLnJvd1NwYWNldGltZVR5cGUsXG4gICAgY29uc3RyYWludHM6IHNjaGVtYTIudGFibGVEZWYuY29uc3RyYWludHMubWFwKChjKSA9PiAoe1xuICAgICAgbmFtZTogYy5uYW1lLFxuICAgICAgY29uc3RyYWludDogXCJ1bmlxdWVcIixcbiAgICAgIGNvbHVtbnM6IGMuZGF0YS52YWx1ZS5jb2x1bW5zLm1hcChnZXRDb2xOYW1lKVxuICAgIH0pKSxcbiAgICAvLyBUT0RPOiBob3JyaWJsZSBob3JyaWJsZSBob3JyaWJsZS4gd2Ugc211Z2dsZSB0aGlzIGBBcnJheTxVbnR5cGVkSW5kZXg+YFxuICAgIC8vIGJ5IGNhc3RpbmcgaXQgdG8gYW4gYEFycmF5PEluZGV4T3B0cz5gIGFzIGBUYWJsZVRvU2NoZW1hYCBleHBlY3RzLlxuICAgIC8vIFRoaXMgaXMgdGhlbiB1c2VkIGluIGBUYWJsZUNhY2hlSW1wbC5jb25zdHJ1Y3RvcmAgYW5kIHdobyBrbm93cyB3aGVyZSBlbHNlLlxuICAgIC8vIFdlIHNob3VsZCBzdG9wIGx5aW5nIGFib3V0IG91ciB0eXBlcy5cbiAgICBpbmRleGVzOiBzY2hlbWEyLnRhYmxlRGVmLmluZGV4ZXMubWFwKChpZHgpID0+IHtcbiAgICAgIGNvbnN0IGNvbHVtbklkcyA9IGlkeC5hbGdvcml0aG0udGFnID09PSBcIkRpcmVjdFwiID8gW2lkeC5hbGdvcml0aG0udmFsdWVdIDogaWR4LmFsZ29yaXRobS52YWx1ZTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGlkeC5hY2Nlc3Nvck5hbWUsXG4gICAgICAgIHVuaXF1ZTogc2NoZW1hMi50YWJsZURlZi5jb25zdHJhaW50cy5zb21lKFxuICAgICAgICAgIChjKSA9PiBjLmRhdGEudmFsdWUuY29sdW1ucy5ldmVyeSgoY29sKSA9PiBjb2x1bW5JZHMuaW5jbHVkZXMoY29sKSlcbiAgICAgICAgKSxcbiAgICAgICAgYWxnb3JpdGhtOiBpZHguYWxnb3JpdGhtLnRhZy50b0xvd2VyQ2FzZSgpLFxuICAgICAgICBjb2x1bW5zOiBjb2x1bW5JZHMubWFwKGdldENvbE5hbWUpXG4gICAgICB9O1xuICAgIH0pXG4gIH07XG59XG52YXIgTU9EVUxFX0RFRiA9IHtcbiAgdHlwZXNwYWNlOiB7IHR5cGVzOiBbXSB9LFxuICB0YWJsZXM6IFtdLFxuICByZWR1Y2VyczogW10sXG4gIHR5cGVzOiBbXSxcbiAgbWlzY0V4cG9ydHM6IFtdLFxuICByb3dMZXZlbFNlY3VyaXR5OiBbXVxufTtcbnZhciBDT01QT1VORF9UWVBFUyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG5mdW5jdGlvbiByZXNvbHZlVHlwZSh0eXBlc3BhY2UsIHR5cGVCdWlsZGVyKSB7XG4gIGxldCB0eSA9IHR5cGVCdWlsZGVyLmFsZ2VicmFpY1R5cGU7XG4gIHdoaWxlICh0eS50YWcgPT09IFwiUmVmXCIpIHtcbiAgICB0eSA9IHR5cGVzcGFjZS50eXBlc1t0eS52YWx1ZV07XG4gIH1cbiAgcmV0dXJuIHR5O1xufVxuZnVuY3Rpb24gcmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KHR5cGVCdWlsZGVyKSB7XG4gIGlmICh0eXBlQnVpbGRlciBpbnN0YW5jZW9mIFByb2R1Y3RCdWlsZGVyICYmICFpc1VuaXQodHlwZUJ1aWxkZXIpIHx8IHR5cGVCdWlsZGVyIGluc3RhbmNlb2YgU3VtQnVpbGRlciB8fCB0eXBlQnVpbGRlciBpbnN0YW5jZW9mIFJvd0J1aWxkZXIpIHtcbiAgICByZXR1cm4gcmVnaXN0ZXJDb21wb3VuZFR5cGVSZWN1cnNpdmVseSh0eXBlQnVpbGRlcik7XG4gIH0gZWxzZSBpZiAodHlwZUJ1aWxkZXIgaW5zdGFuY2VvZiBPcHRpb25CdWlsZGVyKSB7XG4gICAgcmV0dXJuIG5ldyBPcHRpb25CdWlsZGVyKFxuICAgICAgcmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KHR5cGVCdWlsZGVyLnZhbHVlKVxuICAgICk7XG4gIH0gZWxzZSBpZiAodHlwZUJ1aWxkZXIgaW5zdGFuY2VvZiBSZXN1bHRCdWlsZGVyKSB7XG4gICAgcmV0dXJuIG5ldyBSZXN1bHRCdWlsZGVyKFxuICAgICAgcmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KHR5cGVCdWlsZGVyLm9rKSxcbiAgICAgIHJlZ2lzdGVyVHlwZXNSZWN1cnNpdmVseSh0eXBlQnVpbGRlci5lcnIpXG4gICAgKTtcbiAgfSBlbHNlIGlmICh0eXBlQnVpbGRlciBpbnN0YW5jZW9mIEFycmF5QnVpbGRlcikge1xuICAgIHJldHVybiBuZXcgQXJyYXlCdWlsZGVyKFxuICAgICAgcmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KHR5cGVCdWlsZGVyLmVsZW1lbnQpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdHlwZUJ1aWxkZXI7XG4gIH1cbn1cbmZ1bmN0aW9uIHJlZ2lzdGVyQ29tcG91bmRUeXBlUmVjdXJzaXZlbHkodHlwZUJ1aWxkZXIpIHtcbiAgY29uc3QgdHkgPSB0eXBlQnVpbGRlci5hbGdlYnJhaWNUeXBlO1xuICBjb25zdCBuYW1lID0gdHlwZUJ1aWxkZXIudHlwZU5hbWU7XG4gIGlmIChuYW1lID09PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgTWlzc2luZyB0eXBlIG5hbWUgZm9yICR7dHlwZUJ1aWxkZXIuY29uc3RydWN0b3IubmFtZSA/PyBcIlR5cGVCdWlsZGVyXCJ9ICR7SlNPTi5zdHJpbmdpZnkodHlwZUJ1aWxkZXIpfWBcbiAgICApO1xuICB9XG4gIGxldCByID0gQ09NUE9VTkRfVFlQRVMuZ2V0KHR5KTtcbiAgaWYgKHIgIT0gbnVsbCkge1xuICAgIHJldHVybiByO1xuICB9XG4gIGNvbnN0IG5ld1R5ID0gdHlwZUJ1aWxkZXIgaW5zdGFuY2VvZiBSb3dCdWlsZGVyIHx8IHR5cGVCdWlsZGVyIGluc3RhbmNlb2YgUHJvZHVjdEJ1aWxkZXIgPyB7XG4gICAgdGFnOiBcIlByb2R1Y3RcIixcbiAgICB2YWx1ZTogeyBlbGVtZW50czogW10gfVxuICB9IDogeyB0YWc6IFwiU3VtXCIsIHZhbHVlOiB7IHZhcmlhbnRzOiBbXSB9IH07XG4gIHIgPSBuZXcgUmVmQnVpbGRlcihNT0RVTEVfREVGLnR5cGVzcGFjZS50eXBlcy5sZW5ndGgpO1xuICBNT0RVTEVfREVGLnR5cGVzcGFjZS50eXBlcy5wdXNoKG5ld1R5KTtcbiAgQ09NUE9VTkRfVFlQRVMuc2V0KHR5LCByKTtcbiAgaWYgKHR5cGVCdWlsZGVyIGluc3RhbmNlb2YgUm93QnVpbGRlcikge1xuICAgIGZvciAoY29uc3QgW25hbWUyLCBlbGVtXSBvZiBPYmplY3QuZW50cmllcyh0eXBlQnVpbGRlci5yb3cpKSB7XG4gICAgICBuZXdUeS52YWx1ZS5lbGVtZW50cy5wdXNoKHtcbiAgICAgICAgbmFtZTogbmFtZTIsXG4gICAgICAgIGFsZ2VicmFpY1R5cGU6IHJlZ2lzdGVyVHlwZXNSZWN1cnNpdmVseShlbGVtLnR5cGVCdWlsZGVyKS5hbGdlYnJhaWNUeXBlXG4gICAgICB9KTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZUJ1aWxkZXIgaW5zdGFuY2VvZiBQcm9kdWN0QnVpbGRlcikge1xuICAgIGZvciAoY29uc3QgW25hbWUyLCBlbGVtXSBvZiBPYmplY3QuZW50cmllcyh0eXBlQnVpbGRlci5lbGVtZW50cykpIHtcbiAgICAgIG5ld1R5LnZhbHVlLmVsZW1lbnRzLnB1c2goe1xuICAgICAgICBuYW1lOiBuYW1lMixcbiAgICAgICAgYWxnZWJyYWljVHlwZTogcmVnaXN0ZXJUeXBlc1JlY3Vyc2l2ZWx5KGVsZW0pLmFsZ2VicmFpY1R5cGVcbiAgICAgIH0pO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlQnVpbGRlciBpbnN0YW5jZW9mIFN1bUJ1aWxkZXIpIHtcbiAgICBmb3IgKGNvbnN0IFtuYW1lMiwgdmFyaWFudF0gb2YgT2JqZWN0LmVudHJpZXModHlwZUJ1aWxkZXIudmFyaWFudHMpKSB7XG4gICAgICBuZXdUeS52YWx1ZS52YXJpYW50cy5wdXNoKHtcbiAgICAgICAgbmFtZTogbmFtZTIsXG4gICAgICAgIGFsZ2VicmFpY1R5cGU6IHJlZ2lzdGVyVHlwZXNSZWN1cnNpdmVseSh2YXJpYW50KS5hbGdlYnJhaWNUeXBlXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgTU9EVUxFX0RFRi50eXBlcy5wdXNoKHtcbiAgICBuYW1lOiBzcGxpdE5hbWUobmFtZSksXG4gICAgdHk6IHIucmVmLFxuICAgIGN1c3RvbU9yZGVyaW5nOiB0cnVlXG4gIH0pO1xuICByZXR1cm4gcjtcbn1cbmZ1bmN0aW9uIGlzVW5pdCh0eXBlQnVpbGRlcikge1xuICByZXR1cm4gdHlwZUJ1aWxkZXIudHlwZU5hbWUgPT0gbnVsbCAmJiB0eXBlQnVpbGRlci5hbGdlYnJhaWNUeXBlLnZhbHVlLmVsZW1lbnRzLmxlbmd0aCA9PT0gMDtcbn1cbmZ1bmN0aW9uIHNwbGl0TmFtZShuYW1lKSB7XG4gIGNvbnN0IHNjb3BlID0gbmFtZS5zcGxpdChcIi5cIik7XG4gIHJldHVybiB7IG5hbWU6IHNjb3BlLnBvcCgpLCBzY29wZSB9O1xufVxudmFyIFNjaGVtYSA9IGNsYXNzIHtcbiAgdGFibGVzRGVmO1xuICB0eXBlc3BhY2U7XG4gIHNjaGVtYVR5cGU7XG4gIGNvbnN0cnVjdG9yKHRhYmxlcywgdHlwZXNwYWNlLCBoYW5kbGVzKSB7XG4gICAgdGhpcy50YWJsZXNEZWYgPSB7IHRhYmxlcyB9O1xuICAgIHRoaXMudHlwZXNwYWNlID0gdHlwZXNwYWNlO1xuICAgIHRoaXMuc2NoZW1hVHlwZSA9IHRhYmxlc1RvU2NoZW1hKGhhbmRsZXMpO1xuICB9XG4gIHJlZHVjZXIobmFtZSwgcGFyYW1zT3JGbiwgZm4pIHtcbiAgICBpZiAodHlwZW9mIHBhcmFtc09yRm4gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgcmVkdWNlcihuYW1lLCB7fSwgcGFyYW1zT3JGbik7XG4gICAgICByZXR1cm4gcGFyYW1zT3JGbjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVkdWNlcihuYW1lLCBwYXJhbXNPckZuLCBmbik7XG4gICAgICByZXR1cm4gZm47XG4gICAgfVxuICB9XG4gIGluaXQobmFtZU9yRm4sIG1heWJlRm4pIHtcbiAgICBjb25zdCBbbmFtZSwgZm5dID0gdHlwZW9mIG5hbWVPckZuID09PSBcInN0cmluZ1wiID8gW25hbWVPckZuLCBtYXliZUZuXSA6IFtcImluaXRcIiwgbmFtZU9yRm5dO1xuICAgIGluaXQobmFtZSwge30sIGZuKTtcbiAgfVxuICBjbGllbnRDb25uZWN0ZWQobmFtZU9yRm4sIG1heWJlRm4pIHtcbiAgICBjb25zdCBbbmFtZSwgZm5dID0gdHlwZW9mIG5hbWVPckZuID09PSBcInN0cmluZ1wiID8gW25hbWVPckZuLCBtYXliZUZuXSA6IFtcIm9uX2Nvbm5lY3RcIiwgbmFtZU9yRm5dO1xuICAgIGNsaWVudENvbm5lY3RlZChuYW1lLCB7fSwgZm4pO1xuICB9XG4gIGNsaWVudERpc2Nvbm5lY3RlZChuYW1lT3JGbiwgbWF5YmVGbikge1xuICAgIGNvbnN0IFtuYW1lLCBmbl0gPSB0eXBlb2YgbmFtZU9yRm4gPT09IFwic3RyaW5nXCIgPyBbbmFtZU9yRm4sIG1heWJlRm5dIDogW1wib25fZGlzY29ubmVjdFwiLCBuYW1lT3JGbl07XG4gICAgY2xpZW50RGlzY29ubmVjdGVkKG5hbWUsIHt9LCBmbik7XG4gIH1cbiAgdmlldyhvcHRzLCByZXQsIGZuKSB7XG4gICAgZGVmaW5lVmlldyhvcHRzLCBmYWxzZSwge30sIHJldCwgZm4pO1xuICB9XG4gIC8vIFRPRE86IHJlLWVuYWJsZSBvbmNlIHBhcmFtZXRlcml6ZWQgdmlld3MgYXJlIHN1cHBvcnRlZCBpbiBTUUxcbiAgLy8gdmlldzxSZXQgZXh0ZW5kcyBWaWV3UmV0dXJuVHlwZUJ1aWxkZXI+KFxuICAvLyAgIG9wdHM6IFZpZXdPcHRzLFxuICAvLyAgIHJldDogUmV0LFxuICAvLyAgIGZuOiBWaWV3Rm48Uywge30sIFJldD5cbiAgLy8gKTogdm9pZDtcbiAgLy8gdmlldzxQYXJhbXMgZXh0ZW5kcyBQYXJhbXNPYmosIFJldCBleHRlbmRzIFZpZXdSZXR1cm5UeXBlQnVpbGRlcj4oXG4gIC8vICAgb3B0czogVmlld09wdHMsXG4gIC8vICAgcGFyYW1zOiBQYXJhbXMsXG4gIC8vICAgcmV0OiBSZXQsXG4gIC8vICAgZm46IFZpZXdGbjxTLCB7fSwgUmV0PlxuICAvLyApOiB2b2lkO1xuICAvLyB2aWV3PFBhcmFtcyBleHRlbmRzIFBhcmFtc09iaiwgUmV0IGV4dGVuZHMgVmlld1JldHVyblR5cGVCdWlsZGVyPihcbiAgLy8gICBvcHRzOiBWaWV3T3B0cyxcbiAgLy8gICBwYXJhbXNPclJldDogUmV0IHwgUGFyYW1zLFxuICAvLyAgIHJldE9yRm46IFZpZXdGbjxTLCB7fSwgUmV0PiB8IFJldCxcbiAgLy8gICBtYXliZUZuPzogVmlld0ZuPFMsIFBhcmFtcywgUmV0PlxuICAvLyApOiB2b2lkIHtcbiAgLy8gICBpZiAodHlwZW9mIHJldE9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gICAgIGRlZmluZVZpZXcobmFtZSwgZmFsc2UsIHt9LCBwYXJhbXNPclJldCBhcyBSZXQsIHJldE9yRm4pO1xuICAvLyAgIH0gZWxzZSB7XG4gIC8vICAgICBkZWZpbmVWaWV3KG5hbWUsIGZhbHNlLCBwYXJhbXNPclJldCBhcyBQYXJhbXMsIHJldE9yRm4sIG1heWJlRm4hKTtcbiAgLy8gICB9XG4gIC8vIH1cbiAgYW5vbnltb3VzVmlldyhvcHRzLCByZXQsIGZuKSB7XG4gICAgZGVmaW5lVmlldyhvcHRzLCB0cnVlLCB7fSwgcmV0LCBmbik7XG4gIH1cbiAgcHJvY2VkdXJlKG5hbWUsIHBhcmFtc09yUmV0LCByZXRPckZuLCBtYXliZUZuKSB7XG4gICAgaWYgKHR5cGVvZiByZXRPckZuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHByb2NlZHVyZShuYW1lLCB7fSwgcGFyYW1zT3JSZXQsIHJldE9yRm4pO1xuICAgICAgcmV0dXJuIHJldE9yRm47XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb2NlZHVyZShuYW1lLCBwYXJhbXNPclJldCwgcmV0T3JGbiwgbWF5YmVGbik7XG4gICAgICByZXR1cm4gbWF5YmVGbjtcbiAgICB9XG4gIH1cbiAgY2xpZW50VmlzaWJpbGl0eUZpbHRlciA9IHtcbiAgICBzcWwoZmlsdGVyKSB7XG4gICAgICBNT0RVTEVfREVGLnJvd0xldmVsU2VjdXJpdHkucHVzaCh7IHNxbDogZmlsdGVyIH0pO1xuICAgIH1cbiAgfTtcbn07XG5mdW5jdGlvbiBzY2hlbWEoLi4uYXJncykge1xuICBjb25zdCBoYW5kbGVzID0gYXJncy5sZW5ndGggPT09IDEgJiYgQXJyYXkuaXNBcnJheShhcmdzWzBdKSA/IGFyZ3NbMF0gOiBhcmdzO1xuICBjb25zdCB0YWJsZURlZnMgPSBoYW5kbGVzLm1hcCgoaCkgPT4gaC50YWJsZURlZik7XG4gIE1PRFVMRV9ERUYudGFibGVzLnB1c2goLi4udGFibGVEZWZzKTtcbiAgUkVHSVNURVJFRF9TQ0hFTUEgPSB7XG4gICAgdGFibGVzOiBoYW5kbGVzLm1hcCgoaGFuZGxlKSA9PiAoe1xuICAgICAgbmFtZTogaGFuZGxlLnRhYmxlTmFtZSxcbiAgICAgIGFjY2Vzc29yTmFtZTogaGFuZGxlLnRhYmxlTmFtZSxcbiAgICAgIGNvbHVtbnM6IGhhbmRsZS5yb3dUeXBlLnJvdyxcbiAgICAgIHJvd1R5cGU6IGhhbmRsZS5yb3dTcGFjZXRpbWVUeXBlLFxuICAgICAgaW5kZXhlczogaGFuZGxlLmlkeHMsXG4gICAgICBjb25zdHJhaW50czogaGFuZGxlLmNvbnN0cmFpbnRzXG4gICAgfSkpXG4gIH07XG4gIHJldHVybiBuZXcgU2NoZW1hKHRhYmxlRGVmcywgTU9EVUxFX0RFRi50eXBlc3BhY2UsIGhhbmRsZXMpO1xufVxuXG4vLyBzcmMvbGliL2F1dG9nZW4vcmF3X2luZGV4X2FsZ29yaXRobV90eXBlLnRzXG52YXIgUmF3SW5kZXhBbGdvcml0aG0gPSB0LmVudW0oXCJSYXdJbmRleEFsZ29yaXRobVwiLCB7XG4gIEJUcmVlOiB0LmFycmF5KHQudTE2KCkpLFxuICBIYXNoOiB0LmFycmF5KHQudTE2KCkpLFxuICBEaXJlY3Q6IHQudTE2KClcbn0pO1xudmFyIHJhd19pbmRleF9hbGdvcml0aG1fdHlwZV9kZWZhdWx0ID0gUmF3SW5kZXhBbGdvcml0aG07XG5cbi8vIHNyYy9saWIvdGFibGUudHNcbmZ1bmN0aW9uIHRhYmxlKG9wdHMsIHJvdywgLi4uXykge1xuICBjb25zdCB7XG4gICAgbmFtZSxcbiAgICBwdWJsaWM6IGlzUHVibGljID0gZmFsc2UsXG4gICAgaW5kZXhlczogdXNlckluZGV4ZXMgPSBbXSxcbiAgICBzY2hlZHVsZWRcbiAgfSA9IG9wdHM7XG4gIGNvbnN0IGNvbElkcyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKCk7XG4gIGNvbnN0IGNvbE5hbWVMaXN0ID0gW107XG4gIGlmICghKHJvdyBpbnN0YW5jZW9mIFJvd0J1aWxkZXIpKSB7XG4gICAgcm93ID0gbmV3IFJvd0J1aWxkZXIocm93KTtcbiAgfVxuICBpZiAocm93LnR5cGVOYW1lID09PSB2b2lkIDApIHtcbiAgICByb3cudHlwZU5hbWUgPSB0b1Bhc2NhbENhc2UobmFtZSk7XG4gIH1cbiAgY29uc3Qgcm93VHlwZVJlZiA9IHJlZ2lzdGVyVHlwZXNSZWN1cnNpdmVseShyb3cpO1xuICByb3cuYWxnZWJyYWljVHlwZS52YWx1ZS5lbGVtZW50cy5mb3JFYWNoKChlbGVtLCBpKSA9PiB7XG4gICAgY29sSWRzLnNldChlbGVtLm5hbWUsIGkpO1xuICAgIGNvbE5hbWVMaXN0LnB1c2goZWxlbS5uYW1lKTtcbiAgfSk7XG4gIGNvbnN0IHBrID0gW107XG4gIGNvbnN0IGluZGV4ZXMgPSBbXTtcbiAgY29uc3QgY29uc3RyYWludHMgPSBbXTtcbiAgY29uc3Qgc2VxdWVuY2VzID0gW107XG4gIGxldCBzY2hlZHVsZUF0Q29sO1xuICBmb3IgKGNvbnN0IFtuYW1lMiwgYnVpbGRlcl0gb2YgT2JqZWN0LmVudHJpZXMocm93LnJvdykpIHtcbiAgICBjb25zdCBtZXRhID0gYnVpbGRlci5jb2x1bW5NZXRhZGF0YTtcbiAgICBpZiAobWV0YS5pc1ByaW1hcnlLZXkpIHtcbiAgICAgIHBrLnB1c2goY29sSWRzLmdldChuYW1lMikpO1xuICAgIH1cbiAgICBjb25zdCBpc1VuaXF1ZSA9IG1ldGEuaXNVbmlxdWUgfHwgbWV0YS5pc1ByaW1hcnlLZXk7XG4gICAgaWYgKG1ldGEuaW5kZXhUeXBlIHx8IGlzVW5pcXVlKSB7XG4gICAgICBjb25zdCBhbGdvID0gbWV0YS5pbmRleFR5cGUgPz8gXCJidHJlZVwiO1xuICAgICAgY29uc3QgaWQgPSBjb2xJZHMuZ2V0KG5hbWUyKTtcbiAgICAgIGxldCBhbGdvcml0aG07XG4gICAgICBzd2l0Y2ggKGFsZ28pIHtcbiAgICAgICAgY2FzZSBcImJ0cmVlXCI6XG4gICAgICAgICAgYWxnb3JpdGhtID0gcmF3X2luZGV4X2FsZ29yaXRobV90eXBlX2RlZmF1bHQuQlRyZWUoW2lkXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJkaXJlY3RcIjpcbiAgICAgICAgICBhbGdvcml0aG0gPSByYXdfaW5kZXhfYWxnb3JpdGhtX3R5cGVfZGVmYXVsdC5EaXJlY3QoaWQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaW5kZXhlcy5wdXNoKHtcbiAgICAgICAgbmFtZTogdm9pZCAwLFxuICAgICAgICAvLyBVbm5hbWVkIGluZGV4ZXMgd2lsbCBiZSBhc3NpZ25lZCBhIGdsb2JhbGx5IHVuaXF1ZSBuYW1lXG4gICAgICAgIGFjY2Vzc29yTmFtZTogbmFtZTIsXG4gICAgICAgIC8vIFRoZSBuYW1lIG9mIHRoaXMgY29sdW1uIHdpbGwgYmUgdXNlZCBhcyB0aGUgYWNjZXNzb3IgbmFtZVxuICAgICAgICBhbGdvcml0aG1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoaXNVbmlxdWUpIHtcbiAgICAgIGNvbnN0cmFpbnRzLnB1c2goe1xuICAgICAgICBuYW1lOiB2b2lkIDAsXG4gICAgICAgIGRhdGE6IHsgdGFnOiBcIlVuaXF1ZVwiLCB2YWx1ZTogeyBjb2x1bW5zOiBbY29sSWRzLmdldChuYW1lMildIH0gfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChtZXRhLmlzQXV0b0luY3JlbWVudCkge1xuICAgICAgc2VxdWVuY2VzLnB1c2goe1xuICAgICAgICBuYW1lOiB2b2lkIDAsXG4gICAgICAgIHN0YXJ0OiB2b2lkIDAsXG4gICAgICAgIG1pblZhbHVlOiB2b2lkIDAsXG4gICAgICAgIG1heFZhbHVlOiB2b2lkIDAsXG4gICAgICAgIGNvbHVtbjogY29sSWRzLmdldChuYW1lMiksXG4gICAgICAgIGluY3JlbWVudDogMW5cbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoc2NoZWR1bGVkKSB7XG4gICAgICBjb25zdCBhbGdlYnJhaWNUeXBlID0gYnVpbGRlci50eXBlQnVpbGRlci5hbGdlYnJhaWNUeXBlO1xuICAgICAgaWYgKHNjaGVkdWxlX2F0X2RlZmF1bHQuaXNTY2hlZHVsZUF0KGFsZ2VicmFpY1R5cGUpKSB7XG4gICAgICAgIHNjaGVkdWxlQXRDb2wgPSBjb2xJZHMuZ2V0KG5hbWUyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZm9yIChjb25zdCBpbmRleE9wdHMgb2YgdXNlckluZGV4ZXMgPz8gW10pIHtcbiAgICBsZXQgYWxnb3JpdGhtO1xuICAgIHN3aXRjaCAoaW5kZXhPcHRzLmFsZ29yaXRobSkge1xuICAgICAgY2FzZSBcImJ0cmVlXCI6XG4gICAgICAgIGFsZ29yaXRobSA9IHtcbiAgICAgICAgICB0YWc6IFwiQlRyZWVcIixcbiAgICAgICAgICB2YWx1ZTogaW5kZXhPcHRzLmNvbHVtbnMubWFwKChjKSA9PiBjb2xJZHMuZ2V0KGMpKVxuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkaXJlY3RcIjpcbiAgICAgICAgYWxnb3JpdGhtID0geyB0YWc6IFwiRGlyZWN0XCIsIHZhbHVlOiBjb2xJZHMuZ2V0KGluZGV4T3B0cy5jb2x1bW4pIH07XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpbmRleGVzLnB1c2goeyBuYW1lOiB2b2lkIDAsIGFjY2Vzc29yTmFtZTogaW5kZXhPcHRzLm5hbWUsIGFsZ29yaXRobSB9KTtcbiAgfVxuICBmb3IgKGNvbnN0IGNvbnN0cmFpbnRPcHRzIG9mIG9wdHMuY29uc3RyYWludHMgPz8gW10pIHtcbiAgICBpZiAoY29uc3RyYWludE9wdHMuY29uc3RyYWludCA9PT0gXCJ1bmlxdWVcIikge1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgdGFnOiBcIlVuaXF1ZVwiLFxuICAgICAgICB2YWx1ZTogeyBjb2x1bW5zOiBjb25zdHJhaW50T3B0cy5jb2x1bW5zLm1hcCgoYykgPT4gY29sSWRzLmdldChjKSkgfVxuICAgICAgfTtcbiAgICAgIGNvbnN0cmFpbnRzLnB1c2goeyBuYW1lOiBjb25zdHJhaW50T3B0cy5uYW1lLCBkYXRhIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICB9XG4gIGZvciAoY29uc3QgaW5kZXggb2YgaW5kZXhlcykge1xuICAgIGNvbnN0IGNvbHMgPSBpbmRleC5hbGdvcml0aG0udGFnID09PSBcIkRpcmVjdFwiID8gW2luZGV4LmFsZ29yaXRobS52YWx1ZV0gOiBpbmRleC5hbGdvcml0aG0udmFsdWU7XG4gICAgY29uc3QgY29sUyA9IGNvbHMubWFwKChpKSA9PiBjb2xOYW1lTGlzdFtpXSkuam9pbihcIl9cIik7XG4gICAgaW5kZXgubmFtZSA9IGAke25hbWV9XyR7Y29sU31faWR4XyR7aW5kZXguYWxnb3JpdGhtLnRhZy50b0xvd2VyQ2FzZSgpfWA7XG4gIH1cbiAgY29uc3QgdGFibGVEZWYgPSB7XG4gICAgbmFtZSxcbiAgICBwcm9kdWN0VHlwZVJlZjogcm93VHlwZVJlZi5yZWYsXG4gICAgcHJpbWFyeUtleTogcGssXG4gICAgaW5kZXhlcyxcbiAgICBjb25zdHJhaW50cyxcbiAgICBzZXF1ZW5jZXMsXG4gICAgc2NoZWR1bGU6IHNjaGVkdWxlZCAmJiBzY2hlZHVsZUF0Q29sICE9PSB2b2lkIDAgPyB7XG4gICAgICBuYW1lOiB2b2lkIDAsXG4gICAgICByZWR1Y2VyTmFtZTogc2NoZWR1bGVkLFxuICAgICAgc2NoZWR1bGVkQXRDb2x1bW46IHNjaGVkdWxlQXRDb2xcbiAgICB9IDogdm9pZCAwLFxuICAgIHRhYmxlVHlwZTogeyB0YWc6IFwiVXNlclwiIH0sXG4gICAgdGFibGVBY2Nlc3M6IHsgdGFnOiBpc1B1YmxpYyA/IFwiUHVibGljXCIgOiBcIlByaXZhdGVcIiB9XG4gIH07XG4gIGNvbnN0IHByb2R1Y3RUeXBlID0gcm93LmFsZ2VicmFpY1R5cGUudmFsdWU7XG4gIHJldHVybiB7XG4gICAgcm93VHlwZTogcm93LFxuICAgIHRhYmxlTmFtZTogbmFtZSxcbiAgICByb3dTcGFjZXRpbWVUeXBlOiBwcm9kdWN0VHlwZSxcbiAgICB0YWJsZURlZixcbiAgICBpZHhzOiB7fSxcbiAgICBjb25zdHJhaW50c1xuICB9O1xufVxuXG4vLyBzcmMvc2VydmVyL2Vycm9ycy50c1xudmFyIFNwYWNldGltZUhvc3RFcnJvciA9IGNsYXNzIF9TcGFjZXRpbWVIb3N0RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvZGU7XG4gIG1lc3NhZ2U7XG4gIGNvbnN0cnVjdG9yKGNvZGUsIG1lc3NhZ2UpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnN0IHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpO1xuICAgIGxldCBjbHM7XG4gICAgaWYgKGVycm9yUHJvdG95cGVzLmhhcyhwcm90bykpIHtcbiAgICAgIGNscyA9IHByb3RvLmNvbnN0cnVjdG9yO1xuICAgICAgaWYgKGNvZGUgIT09IGNscy5DT0RFKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBpbnZhbGlkIGVycm9yIGNvZGUgZm9yICR7Y2xzLm5hbWV9YCk7XG4gICAgfSBlbHNlIGlmIChwcm90byA9PT0gX1NwYWNldGltZUhvc3RFcnJvci5wcm90b3R5cGUpIHtcbiAgICAgIGNscyA9IGVycm5vVG9DbGFzcy5nZXQoY29kZSk7XG4gICAgICBpZiAoIWNscykgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYHVua25vd24gZXJyb3IgY29kZSAke2NvZGV9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJjYW5ub3Qgc3ViY2xhc3MgU3BhY2V0aW1lRXJyb3JcIik7XG4gICAgfVxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBjbHMucHJvdG90eXBlKTtcbiAgICB0aGlzLmNvZGUgPSBjbHMuQ09ERTtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlID8/IGNscy5NRVNTQUdFO1xuICB9XG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiBlcnJub1RvQ2xhc3MuZ2V0KHRoaXMuY29kZSk/Lm5hbWUgPz8gXCJTcGFjZXRpbWVIb3N0RXJyb3JcIjtcbiAgfVxufTtcbnZhciBTZW5kZXJFcnJvciA9IGNsYXNzIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gIH1cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIFwiU2VuZGVyRXJyb3JcIjtcbiAgfVxufTtcbnZhciBlcnJvckRhdGEgPSB7XG4gIC8qKlxuICAgKiBBIGdlbmVyaWMgZXJyb3IgY2xhc3MgZm9yIHVua25vd24gZXJyb3IgY29kZXMuXG4gICAqL1xuICBIb3N0Q2FsbEZhaWx1cmU6IFsxLCBcIkFCSSBjYWxsZWQgYnkgaG9zdCByZXR1cm5lZCBhbiBlcnJvclwiXSxcbiAgLyoqXG4gICAqIEVycm9yIGluZGljYXRpbmcgdGhhdCBhbiBBQkkgY2FsbCB3YXMgbWFkZSBvdXRzaWRlIG9mIGEgdHJhbnNhY3Rpb24uXG4gICAqL1xuICBOb3RJblRyYW5zYWN0aW9uOiBbMiwgXCJBQkkgY2FsbCBjYW4gb25seSBiZSBtYWRlIHdoaWxlIGluIGEgdHJhbnNhY3Rpb25cIl0sXG4gIC8qKlxuICAgKiBFcnJvciBpbmRpY2F0aW5nIHRoYXQgQlNBVE4gZGVjb2RpbmcgZmFpbGVkLlxuICAgKiBUaGlzIHR5cGljYWxseSBtZWFucyB0aGF0IHRoZSBkYXRhIGNvdWxkIG5vdCBiZSBkZWNvZGVkIHRvIHRoZSBleHBlY3RlZCB0eXBlLlxuICAgKi9cbiAgQnNhdG5EZWNvZGVFcnJvcjogWzMsIFwiQ291bGRuJ3QgZGVjb2RlIHRoZSBCU0FUTiB0byB0aGUgZXhwZWN0ZWQgdHlwZVwiXSxcbiAgLyoqXG4gICAqIEVycm9yIGluZGljYXRpbmcgdGhhdCBhIHNwZWNpZmllZCB0YWJsZSBkb2VzIG5vdCBleGlzdC5cbiAgICovXG4gIE5vU3VjaFRhYmxlOiBbNCwgXCJObyBzdWNoIHRhYmxlXCJdLFxuICAvKipcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IGEgc3BlY2lmaWVkIGluZGV4IGRvZXMgbm90IGV4aXN0LlxuICAgKi9cbiAgTm9TdWNoSW5kZXg6IFs1LCBcIk5vIHN1Y2ggaW5kZXhcIl0sXG4gIC8qKlxuICAgKiBFcnJvciBpbmRpY2F0aW5nIHRoYXQgYSBzcGVjaWZpZWQgcm93IGl0ZXJhdG9yIGlzIG5vdCB2YWxpZC5cbiAgICovXG4gIE5vU3VjaEl0ZXI6IFs2LCBcIlRoZSBwcm92aWRlZCByb3cgaXRlcmF0b3IgaXMgbm90IHZhbGlkXCJdLFxuICAvKipcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IGEgc3BlY2lmaWVkIGNvbnNvbGUgdGltZXIgZG9lcyBub3QgZXhpc3QuXG4gICAqL1xuICBOb1N1Y2hDb25zb2xlVGltZXI6IFs3LCBcIlRoZSBwcm92aWRlZCBjb25zb2xlIHRpbWVyIGRvZXMgbm90IGV4aXN0XCJdLFxuICAvKipcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IGEgc3BlY2lmaWVkIGJ5dGVzIHNvdXJjZSBvciBzaW5rIGlzIG5vdCB2YWxpZC5cbiAgICovXG4gIE5vU3VjaEJ5dGVzOiBbOCwgXCJUaGUgcHJvdmlkZWQgYnl0ZXMgc291cmNlIG9yIHNpbmsgaXMgbm90IHZhbGlkXCJdLFxuICAvKipcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IGEgcHJvdmlkZWQgc2luayBoYXMgbm8gbW9yZSBzcGFjZSBsZWZ0LlxuICAgKi9cbiAgTm9TcGFjZTogWzksIFwiVGhlIHByb3ZpZGVkIHNpbmsgaGFzIG5vIG1vcmUgc3BhY2UgbGVmdFwiXSxcbiAgLyoqXG4gICAqIEVycm9yIGluZGljYXRpbmcgdGhhdCB0aGVyZSBpcyBubyBtb3JlIHNwYWNlIGluIHRoZSBkYXRhYmFzZS5cbiAgICovXG4gIEJ1ZmZlclRvb1NtYWxsOiBbXG4gICAgMTEsXG4gICAgXCJUaGUgcHJvdmlkZWQgYnVmZmVyIGlzIG5vdCBsYXJnZSBlbm91Z2ggdG8gc3RvcmUgdGhlIGRhdGFcIlxuICBdLFxuICAvKipcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IGEgdmFsdWUgd2l0aCBhIGdpdmVuIHVuaXF1ZSBpZGVudGlmaWVyIGFscmVhZHkgZXhpc3RzLlxuICAgKi9cbiAgVW5pcXVlQWxyZWFkeUV4aXN0czogW1xuICAgIDEyLFxuICAgIFwiVmFsdWUgd2l0aCBnaXZlbiB1bmlxdWUgaWRlbnRpZmllciBhbHJlYWR5IGV4aXN0c1wiXG4gIF0sXG4gIC8qKlxuICAgKiBFcnJvciBpbmRpY2F0aW5nIHRoYXQgdGhlIHNwZWNpZmllZCBkZWxheSBpbiBzY2hlZHVsaW5nIGEgcm93IHdhcyB0b28gbG9uZy5cbiAgICovXG4gIFNjaGVkdWxlQXREZWxheVRvb0xvbmc6IFtcbiAgICAxMyxcbiAgICBcIlNwZWNpZmllZCBkZWxheSBpbiBzY2hlZHVsaW5nIHJvdyB3YXMgdG9vIGxvbmdcIlxuICBdLFxuICAvKipcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IGFuIGluZGV4IHdhcyBub3QgdW5pcXVlIHdoZW4gaXQgd2FzIGV4cGVjdGVkIHRvIGJlLlxuICAgKi9cbiAgSW5kZXhOb3RVbmlxdWU6IFsxNCwgXCJUaGUgaW5kZXggd2FzIG5vdCB1bmlxdWVcIl0sXG4gIC8qKlxuICAgKiBFcnJvciBpbmRpY2F0aW5nIHRoYXQgYW4gaW5kZXggd2FzIG5vdCB1bmlxdWUgd2hlbiBpdCB3YXMgZXhwZWN0ZWQgdG8gYmUuXG4gICAqL1xuICBOb1N1Y2hSb3c6IFsxNSwgXCJUaGUgcm93IHdhcyBub3QgZm91bmQsIGUuZy4sIGluIGFuIHVwZGF0ZSBjYWxsXCJdLFxuICAvKipcbiAgICogRXJyb3IgaW5kaWNhdGluZyB0aGF0IGFuIGF1dG8taW5jcmVtZW50IHNlcXVlbmNlIGhhcyBvdmVyZmxvd2VkLlxuICAgKi9cbiAgQXV0b0luY092ZXJmbG93OiBbMTYsIFwiVGhlIGF1dG8taW5jcmVtZW50IHNlcXVlbmNlIG92ZXJmbG93ZWRcIl0sXG4gIFdvdWxkQmxvY2tUcmFuc2FjdGlvbjogW1xuICAgIDE3LFxuICAgIFwiQXR0ZW1wdGVkIGFzeW5jIG9yIGJsb2NraW5nIG9wIHdoaWxlIGhvbGRpbmcgb3BlbiBhIHRyYW5zYWN0aW9uXCJcbiAgXSxcbiAgVHJhbnNhY3Rpb25Ob3RBbm9ueW1vdXM6IFtcbiAgICAxOCxcbiAgICBcIk5vdCBpbiBhbiBhbm9ueW1vdXMgdHJhbnNhY3Rpb24uIENhbGxlZCBieSBhIHJlZHVjZXI/XCJcbiAgXSxcbiAgVHJhbnNhY3Rpb25Jc1JlYWRPbmx5OiBbXG4gICAgMTksXG4gICAgXCJBQkkgY2FsbCBjYW4gb25seSBiZSBtYWRlIHdoaWxlIHdpdGhpbiBhIG11dGFibGUgdHJhbnNhY3Rpb25cIlxuICBdLFxuICBUcmFuc2FjdGlvbklzTXV0OiBbXG4gICAgMjAsXG4gICAgXCJBQkkgY2FsbCBjYW4gb25seSBiZSBtYWRlIHdoaWxlIHdpdGhpbiBhIHJlYWQtb25seSB0cmFuc2FjdGlvblwiXG4gIF0sXG4gIEh0dHBFcnJvcjogWzIxLCBcIlRoZSBIVFRQIHJlcXVlc3QgZmFpbGVkXCJdXG59O1xuZnVuY3Rpb24gbWFwRW50cmllcyh4LCBmKSB7XG4gIHJldHVybiBPYmplY3QuZnJvbUVudHJpZXMoXG4gICAgT2JqZWN0LmVudHJpZXMoeCkubWFwKChbaywgdl0pID0+IFtrLCBmKGssIHYpXSlcbiAgKTtcbn1cbnZhciBlcnJvcnMgPSBPYmplY3QuZnJlZXplKFxuICBtYXBFbnRyaWVzKFxuICAgIGVycm9yRGF0YSxcbiAgICAobmFtZSwgW2NvZGUsIG1lc3NhZ2VdKSA9PiBPYmplY3QuZGVmaW5lUHJvcGVydHkoXG4gICAgICBjbGFzcyBleHRlbmRzIFNwYWNldGltZUhvc3RFcnJvciB7XG4gICAgICAgIHN0YXRpYyBDT0RFID0gY29kZTtcbiAgICAgICAgc3RhdGljIE1FU1NBR0UgPSBtZXNzYWdlO1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICBzdXBlcihjb2RlKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwibmFtZVwiLFxuICAgICAgeyB2YWx1ZTogbmFtZSwgd3JpdGFibGU6IGZhbHNlIH1cbiAgICApXG4gIClcbik7XG52YXIgZXJyb3JQcm90b3lwZXMgPSBuZXcgU2V0KE9iamVjdC52YWx1ZXMoZXJyb3JzKS5tYXAoKGNscykgPT4gY2xzLnByb3RvdHlwZSkpO1xudmFyIGVycm5vVG9DbGFzcyA9IG5ldyBNYXAoXG4gIE9iamVjdC52YWx1ZXMoZXJyb3JzKS5tYXAoKGNscykgPT4gW2Nscy5DT0RFLCBjbHNdKVxuKTtcblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3B1cmUtcmFuZEA3LjAuMS9ub2RlX21vZHVsZXMvcHVyZS1yYW5kL2xpYi9lc20vZGlzdHJpYnV0aW9uL1Vuc2FmZVVuaWZvcm1CaWdJbnREaXN0cmlidXRpb24uanNcbnZhciBTQmlnSW50ID0gdHlwZW9mIEJpZ0ludCAhPT0gXCJ1bmRlZmluZWRcIiA/IEJpZ0ludCA6IHZvaWQgMDtcbnZhciBPbmUgPSB0eXBlb2YgQmlnSW50ICE9PSBcInVuZGVmaW5lZFwiID8gQmlnSW50KDEpIDogdm9pZCAwO1xudmFyIFRoaXJ0eVR3byA9IHR5cGVvZiBCaWdJbnQgIT09IFwidW5kZWZpbmVkXCIgPyBCaWdJbnQoMzIpIDogdm9pZCAwO1xudmFyIE51bVZhbHVlcyA9IHR5cGVvZiBCaWdJbnQgIT09IFwidW5kZWZpbmVkXCIgPyBCaWdJbnQoNDI5NDk2NzI5NikgOiB2b2lkIDA7XG5mdW5jdGlvbiB1bnNhZmVVbmlmb3JtQmlnSW50RGlzdHJpYnV0aW9uKGZyb20yLCB0bywgcm5nKSB7XG4gIHZhciBkaWZmID0gdG8gLSBmcm9tMiArIE9uZTtcbiAgdmFyIEZpbmFsTnVtVmFsdWVzID0gTnVtVmFsdWVzO1xuICB2YXIgTnVtSXRlcmF0aW9ucyA9IDE7XG4gIHdoaWxlIChGaW5hbE51bVZhbHVlcyA8IGRpZmYpIHtcbiAgICBGaW5hbE51bVZhbHVlcyA8PD0gVGhpcnR5VHdvO1xuICAgICsrTnVtSXRlcmF0aW9ucztcbiAgfVxuICB2YXIgdmFsdWUgPSBnZW5lcmF0ZU5leHQoTnVtSXRlcmF0aW9ucywgcm5nKTtcbiAgaWYgKHZhbHVlIDwgZGlmZikge1xuICAgIHJldHVybiB2YWx1ZSArIGZyb20yO1xuICB9XG4gIGlmICh2YWx1ZSArIGRpZmYgPCBGaW5hbE51bVZhbHVlcykge1xuICAgIHJldHVybiB2YWx1ZSAlIGRpZmYgKyBmcm9tMjtcbiAgfVxuICB2YXIgTWF4QWNjZXB0ZWRSYW5kb20gPSBGaW5hbE51bVZhbHVlcyAtIEZpbmFsTnVtVmFsdWVzICUgZGlmZjtcbiAgd2hpbGUgKHZhbHVlID49IE1heEFjY2VwdGVkUmFuZG9tKSB7XG4gICAgdmFsdWUgPSBnZW5lcmF0ZU5leHQoTnVtSXRlcmF0aW9ucywgcm5nKTtcbiAgfVxuICByZXR1cm4gdmFsdWUgJSBkaWZmICsgZnJvbTI7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZU5leHQoTnVtSXRlcmF0aW9ucywgcm5nKSB7XG4gIHZhciB2YWx1ZSA9IFNCaWdJbnQocm5nLnVuc2FmZU5leHQoKSArIDIxNDc0ODM2NDgpO1xuICBmb3IgKHZhciBudW0gPSAxOyBudW0gPCBOdW1JdGVyYXRpb25zOyArK251bSkge1xuICAgIHZhciBvdXQgPSBybmcudW5zYWZlTmV4dCgpO1xuICAgIHZhbHVlID0gKHZhbHVlIDw8IFRoaXJ0eVR3bykgKyBTQmlnSW50KG91dCArIDIxNDc0ODM2NDgpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3B1cmUtcmFuZEA3LjAuMS9ub2RlX21vZHVsZXMvcHVyZS1yYW5kL2xpYi9lc20vZGlzdHJpYnV0aW9uL2ludGVybmFscy9VbnNhZmVVbmlmb3JtSW50RGlzdHJpYnV0aW9uSW50ZXJuYWwuanNcbmZ1bmN0aW9uIHVuc2FmZVVuaWZvcm1JbnREaXN0cmlidXRpb25JbnRlcm5hbChyYW5nZVNpemUsIHJuZykge1xuICB2YXIgTWF4QWxsb3dlZCA9IHJhbmdlU2l6ZSA+IDIgPyB+fig0Mjk0OTY3Mjk2IC8gcmFuZ2VTaXplKSAqIHJhbmdlU2l6ZSA6IDQyOTQ5NjcyOTY7XG4gIHZhciBkZWx0YVYgPSBybmcudW5zYWZlTmV4dCgpICsgMjE0NzQ4MzY0ODtcbiAgd2hpbGUgKGRlbHRhViA+PSBNYXhBbGxvd2VkKSB7XG4gICAgZGVsdGFWID0gcm5nLnVuc2FmZU5leHQoKSArIDIxNDc0ODM2NDg7XG4gIH1cbiAgcmV0dXJuIGRlbHRhViAlIHJhbmdlU2l6ZTtcbn1cblxuLy8gLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL3B1cmUtcmFuZEA3LjAuMS9ub2RlX21vZHVsZXMvcHVyZS1yYW5kL2xpYi9lc20vZGlzdHJpYnV0aW9uL2ludGVybmFscy9BcnJheUludDY0LmpzXG5mdW5jdGlvbiBmcm9tTnVtYmVyVG9BcnJheUludDY0KG91dCwgbikge1xuICBpZiAobiA8IDApIHtcbiAgICB2YXIgcG9zTiA9IC1uO1xuICAgIG91dC5zaWduID0gLTE7XG4gICAgb3V0LmRhdGFbMF0gPSB+fihwb3NOIC8gNDI5NDk2NzI5Nik7XG4gICAgb3V0LmRhdGFbMV0gPSBwb3NOID4+PiAwO1xuICB9IGVsc2Uge1xuICAgIG91dC5zaWduID0gMTtcbiAgICBvdXQuZGF0YVswXSA9IH5+KG4gLyA0Mjk0OTY3Mjk2KTtcbiAgICBvdXQuZGF0YVsxXSA9IG4gPj4+IDA7XG4gIH1cbiAgcmV0dXJuIG91dDtcbn1cbmZ1bmN0aW9uIHN1YnN0cmFjdEFycmF5SW50NjQob3V0LCBhcnJheUludEEsIGFycmF5SW50Qikge1xuICB2YXIgbG93QSA9IGFycmF5SW50QS5kYXRhWzFdO1xuICB2YXIgaGlnaEEgPSBhcnJheUludEEuZGF0YVswXTtcbiAgdmFyIHNpZ25BID0gYXJyYXlJbnRBLnNpZ247XG4gIHZhciBsb3dCID0gYXJyYXlJbnRCLmRhdGFbMV07XG4gIHZhciBoaWdoQiA9IGFycmF5SW50Qi5kYXRhWzBdO1xuICB2YXIgc2lnbkIgPSBhcnJheUludEIuc2lnbjtcbiAgb3V0LnNpZ24gPSAxO1xuICBpZiAoc2lnbkEgPT09IDEgJiYgc2lnbkIgPT09IC0xKSB7XG4gICAgdmFyIGxvd18xID0gbG93QSArIGxvd0I7XG4gICAgdmFyIGhpZ2ggPSBoaWdoQSArIGhpZ2hCICsgKGxvd18xID4gNDI5NDk2NzI5NSA/IDEgOiAwKTtcbiAgICBvdXQuZGF0YVswXSA9IGhpZ2ggPj4+IDA7XG4gICAgb3V0LmRhdGFbMV0gPSBsb3dfMSA+Pj4gMDtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIHZhciBsb3dGaXJzdCA9IGxvd0E7XG4gIHZhciBoaWdoRmlyc3QgPSBoaWdoQTtcbiAgdmFyIGxvd1NlY29uZCA9IGxvd0I7XG4gIHZhciBoaWdoU2Vjb25kID0gaGlnaEI7XG4gIGlmIChzaWduQSA9PT0gLTEpIHtcbiAgICBsb3dGaXJzdCA9IGxvd0I7XG4gICAgaGlnaEZpcnN0ID0gaGlnaEI7XG4gICAgbG93U2Vjb25kID0gbG93QTtcbiAgICBoaWdoU2Vjb25kID0gaGlnaEE7XG4gIH1cbiAgdmFyIHJlbWluZGVyTG93ID0gMDtcbiAgdmFyIGxvdyA9IGxvd0ZpcnN0IC0gbG93U2Vjb25kO1xuICBpZiAobG93IDwgMCkge1xuICAgIHJlbWluZGVyTG93ID0gMTtcbiAgICBsb3cgPSBsb3cgPj4+IDA7XG4gIH1cbiAgb3V0LmRhdGFbMF0gPSBoaWdoRmlyc3QgLSBoaWdoU2Vjb25kIC0gcmVtaW5kZXJMb3c7XG4gIG91dC5kYXRhWzFdID0gbG93O1xuICByZXR1cm4gb3V0O1xufVxuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vcHVyZS1yYW5kQDcuMC4xL25vZGVfbW9kdWxlcy9wdXJlLXJhbmQvbGliL2VzbS9kaXN0cmlidXRpb24vaW50ZXJuYWxzL1Vuc2FmZVVuaWZvcm1BcnJheUludERpc3RyaWJ1dGlvbkludGVybmFsLmpzXG5mdW5jdGlvbiB1bnNhZmVVbmlmb3JtQXJyYXlJbnREaXN0cmlidXRpb25JbnRlcm5hbChvdXQsIHJhbmdlU2l6ZSwgcm5nKSB7XG4gIHZhciByYW5nZUxlbmd0aCA9IHJhbmdlU2l6ZS5sZW5ndGg7XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCAhPT0gcmFuZ2VMZW5ndGg7ICsraW5kZXgpIHtcbiAgICAgIHZhciBpbmRleFJhbmdlU2l6ZSA9IGluZGV4ID09PSAwID8gcmFuZ2VTaXplWzBdICsgMSA6IDQyOTQ5NjcyOTY7XG4gICAgICB2YXIgZyA9IHVuc2FmZVVuaWZvcm1JbnREaXN0cmlidXRpb25JbnRlcm5hbChpbmRleFJhbmdlU2l6ZSwgcm5nKTtcbiAgICAgIG91dFtpbmRleF0gPSBnO1xuICAgIH1cbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4ICE9PSByYW5nZUxlbmd0aDsgKytpbmRleCkge1xuICAgICAgdmFyIGN1cnJlbnQgPSBvdXRbaW5kZXhdO1xuICAgICAgdmFyIGN1cnJlbnRJblJhbmdlID0gcmFuZ2VTaXplW2luZGV4XTtcbiAgICAgIGlmIChjdXJyZW50IDwgY3VycmVudEluUmFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudCA+IGN1cnJlbnRJblJhbmdlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vcHVyZS1yYW5kQDcuMC4xL25vZGVfbW9kdWxlcy9wdXJlLXJhbmQvbGliL2VzbS9kaXN0cmlidXRpb24vVW5zYWZlVW5pZm9ybUludERpc3RyaWJ1dGlvbi5qc1xudmFyIHNhZmVOdW1iZXJNYXhTYWZlSW50ZWdlciA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xudmFyIHNoYXJlZEEgPSB7IHNpZ246IDEsIGRhdGE6IFswLCAwXSB9O1xudmFyIHNoYXJlZEIgPSB7IHNpZ246IDEsIGRhdGE6IFswLCAwXSB9O1xudmFyIHNoYXJlZEMgPSB7IHNpZ246IDEsIGRhdGE6IFswLCAwXSB9O1xudmFyIHNoYXJlZERhdGEgPSBbMCwgMF07XG5mdW5jdGlvbiB1bmlmb3JtTGFyZ2VJbnRJbnRlcm5hbChmcm9tMiwgdG8sIHJhbmdlU2l6ZSwgcm5nKSB7XG4gIHZhciByYW5nZVNpemVBcnJheUludFZhbHVlID0gcmFuZ2VTaXplIDw9IHNhZmVOdW1iZXJNYXhTYWZlSW50ZWdlciA/IGZyb21OdW1iZXJUb0FycmF5SW50NjQoc2hhcmVkQywgcmFuZ2VTaXplKSA6IHN1YnN0cmFjdEFycmF5SW50NjQoc2hhcmVkQywgZnJvbU51bWJlclRvQXJyYXlJbnQ2NChzaGFyZWRBLCB0byksIGZyb21OdW1iZXJUb0FycmF5SW50NjQoc2hhcmVkQiwgZnJvbTIpKTtcbiAgaWYgKHJhbmdlU2l6ZUFycmF5SW50VmFsdWUuZGF0YVsxXSA9PT0gNDI5NDk2NzI5NSkge1xuICAgIHJhbmdlU2l6ZUFycmF5SW50VmFsdWUuZGF0YVswXSArPSAxO1xuICAgIHJhbmdlU2l6ZUFycmF5SW50VmFsdWUuZGF0YVsxXSA9IDA7XG4gIH0gZWxzZSB7XG4gICAgcmFuZ2VTaXplQXJyYXlJbnRWYWx1ZS5kYXRhWzFdICs9IDE7XG4gIH1cbiAgdW5zYWZlVW5pZm9ybUFycmF5SW50RGlzdHJpYnV0aW9uSW50ZXJuYWwoc2hhcmVkRGF0YSwgcmFuZ2VTaXplQXJyYXlJbnRWYWx1ZS5kYXRhLCBybmcpO1xuICByZXR1cm4gc2hhcmVkRGF0YVswXSAqIDQyOTQ5NjcyOTYgKyBzaGFyZWREYXRhWzFdICsgZnJvbTI7XG59XG5mdW5jdGlvbiB1bnNhZmVVbmlmb3JtSW50RGlzdHJpYnV0aW9uKGZyb20yLCB0bywgcm5nKSB7XG4gIHZhciByYW5nZVNpemUgPSB0byAtIGZyb20yO1xuICBpZiAocmFuZ2VTaXplIDw9IDQyOTQ5NjcyOTUpIHtcbiAgICB2YXIgZyA9IHVuc2FmZVVuaWZvcm1JbnREaXN0cmlidXRpb25JbnRlcm5hbChyYW5nZVNpemUgKyAxLCBybmcpO1xuICAgIHJldHVybiBnICsgZnJvbTI7XG4gIH1cbiAgcmV0dXJuIHVuaWZvcm1MYXJnZUludEludGVybmFsKGZyb20yLCB0bywgcmFuZ2VTaXplLCBybmcpO1xufVxuXG4vLyAuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vcHVyZS1yYW5kQDcuMC4xL25vZGVfbW9kdWxlcy9wdXJlLXJhbmQvbGliL2VzbS9nZW5lcmF0b3IvWG9yb1NoaXJvLmpzXG52YXIgWG9yb1NoaXJvMTI4UGx1cyA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gWG9yb1NoaXJvMTI4UGx1czIoczAxLCBzMDAsIHMxMSwgczEwKSB7XG4gICAgdGhpcy5zMDEgPSBzMDE7XG4gICAgdGhpcy5zMDAgPSBzMDA7XG4gICAgdGhpcy5zMTEgPSBzMTE7XG4gICAgdGhpcy5zMTAgPSBzMTA7XG4gIH1cbiAgWG9yb1NoaXJvMTI4UGx1czIucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBYb3JvU2hpcm8xMjhQbHVzMih0aGlzLnMwMSwgdGhpcy5zMDAsIHRoaXMuczExLCB0aGlzLnMxMCk7XG4gIH07XG4gIFhvcm9TaGlybzEyOFBsdXMyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5leHRSbmcgPSBuZXcgWG9yb1NoaXJvMTI4UGx1czIodGhpcy5zMDEsIHRoaXMuczAwLCB0aGlzLnMxMSwgdGhpcy5zMTApO1xuICAgIHZhciBvdXQgPSBuZXh0Um5nLnVuc2FmZU5leHQoKTtcbiAgICByZXR1cm4gW291dCwgbmV4dFJuZ107XG4gIH07XG4gIFhvcm9TaGlybzEyOFBsdXMyLnByb3RvdHlwZS51bnNhZmVOZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG91dCA9IHRoaXMuczAwICsgdGhpcy5zMTAgfCAwO1xuICAgIHZhciBhMCA9IHRoaXMuczEwIF4gdGhpcy5zMDA7XG4gICAgdmFyIGExID0gdGhpcy5zMTEgXiB0aGlzLnMwMTtcbiAgICB2YXIgczAwID0gdGhpcy5zMDA7XG4gICAgdmFyIHMwMSA9IHRoaXMuczAxO1xuICAgIHRoaXMuczAwID0gczAwIDw8IDI0IF4gczAxID4+PiA4IF4gYTAgXiBhMCA8PCAxNjtcbiAgICB0aGlzLnMwMSA9IHMwMSA8PCAyNCBeIHMwMCA+Pj4gOCBeIGExIF4gKGExIDw8IDE2IHwgYTAgPj4+IDE2KTtcbiAgICB0aGlzLnMxMCA9IGExIDw8IDUgXiBhMCA+Pj4gMjc7XG4gICAgdGhpcy5zMTEgPSBhMCA8PCA1IF4gYTEgPj4+IDI3O1xuICAgIHJldHVybiBvdXQ7XG4gIH07XG4gIFhvcm9TaGlybzEyOFBsdXMyLnByb3RvdHlwZS5qdW1wID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5leHRSbmcgPSBuZXcgWG9yb1NoaXJvMTI4UGx1czIodGhpcy5zMDEsIHRoaXMuczAwLCB0aGlzLnMxMSwgdGhpcy5zMTApO1xuICAgIG5leHRSbmcudW5zYWZlSnVtcCgpO1xuICAgIHJldHVybiBuZXh0Um5nO1xuICB9O1xuICBYb3JvU2hpcm8xMjhQbHVzMi5wcm90b3R5cGUudW5zYWZlSnVtcCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBuczAxID0gMDtcbiAgICB2YXIgbnMwMCA9IDA7XG4gICAgdmFyIG5zMTEgPSAwO1xuICAgIHZhciBuczEwID0gMDtcbiAgICB2YXIganVtcCA9IFszNjM5OTU2NjQ1LCAzNzUwNzU3MDEyLCAxMjYxNTY4NTA4LCAzODY0MjYzMzVdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpICE9PSA0OyArK2kpIHtcbiAgICAgIGZvciAodmFyIG1hc2sgPSAxOyBtYXNrOyBtYXNrIDw8PSAxKSB7XG4gICAgICAgIGlmIChqdW1wW2ldICYgbWFzaykge1xuICAgICAgICAgIG5zMDEgXj0gdGhpcy5zMDE7XG4gICAgICAgICAgbnMwMCBePSB0aGlzLnMwMDtcbiAgICAgICAgICBuczExIF49IHRoaXMuczExO1xuICAgICAgICAgIG5zMTAgXj0gdGhpcy5zMTA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51bnNhZmVOZXh0KCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuczAxID0gbnMwMTtcbiAgICB0aGlzLnMwMCA9IG5zMDA7XG4gICAgdGhpcy5zMTEgPSBuczExO1xuICAgIHRoaXMuczEwID0gbnMxMDtcbiAgfTtcbiAgWG9yb1NoaXJvMTI4UGx1czIucHJvdG90eXBlLmdldFN0YXRlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFt0aGlzLnMwMSwgdGhpcy5zMDAsIHRoaXMuczExLCB0aGlzLnMxMF07XG4gIH07XG4gIHJldHVybiBYb3JvU2hpcm8xMjhQbHVzMjtcbn0pKCk7XG5mdW5jdGlvbiBmcm9tU3RhdGUoc3RhdGUpIHtcbiAgdmFyIHZhbGlkID0gc3RhdGUubGVuZ3RoID09PSA0O1xuICBpZiAoIXZhbGlkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0YXRlIG11c3QgaGF2ZSBiZWVuIHByb2R1Y2VkIGJ5IGEgeG9yb3NoaXJvMTI4cGx1cyBSYW5kb21HZW5lcmF0b3JcIik7XG4gIH1cbiAgcmV0dXJuIG5ldyBYb3JvU2hpcm8xMjhQbHVzKHN0YXRlWzBdLCBzdGF0ZVsxXSwgc3RhdGVbMl0sIHN0YXRlWzNdKTtcbn1cbnZhciB4b3Jvc2hpcm8xMjhwbHVzID0gT2JqZWN0LmFzc2lnbihmdW5jdGlvbihzZWVkKSB7XG4gIHJldHVybiBuZXcgWG9yb1NoaXJvMTI4UGx1cygtMSwgfnNlZWQsIHNlZWQgfCAwLCAwKTtcbn0sIHsgZnJvbVN0YXRlIH0pO1xuXG4vLyBzcmMvc2VydmVyL3JuZy50c1xudmFyIHsgYXNVaW50TiB9ID0gQmlnSW50O1xuZnVuY3Rpb24gcGNnMzIoc3RhdGUpIHtcbiAgY29uc3QgTVVMID0gNjM2NDEzNjIyMzg0Njc5MzAwNW47XG4gIGNvbnN0IElOQyA9IDExNjM0NTgwMDI3NDYyMjYwNzIzbjtcbiAgc3RhdGUgPSBhc1VpbnROKDY0LCBzdGF0ZSAqIE1VTCArIElOQyk7XG4gIGNvbnN0IHhvcnNoaWZ0ZWQgPSBOdW1iZXIoYXNVaW50TigzMiwgKHN0YXRlID4+IDE4biBeIHN0YXRlKSA+PiAyN24pKTtcbiAgY29uc3Qgcm90ID0gTnVtYmVyKGFzVWludE4oMzIsIHN0YXRlID4+IDU5bikpO1xuICByZXR1cm4geG9yc2hpZnRlZCA+PiByb3QgfCB4b3JzaGlmdGVkIDw8IDMyIC0gcm90O1xufVxuZnVuY3Rpb24gZ2VuZXJhdGVGbG9hdDY0KHJuZykge1xuICBjb25zdCBnMSA9IHVuc2FmZVVuaWZvcm1JbnREaXN0cmlidXRpb24oMCwgKDEgPDwgMjYpIC0gMSwgcm5nKTtcbiAgY29uc3QgZzIgPSB1bnNhZmVVbmlmb3JtSW50RGlzdHJpYnV0aW9uKDAsICgxIDw8IDI3KSAtIDEsIHJuZyk7XG4gIGNvbnN0IHZhbHVlID0gKGcxICogTWF0aC5wb3coMiwgMjcpICsgZzIpICogTWF0aC5wb3coMiwgLTUzKTtcbiAgcmV0dXJuIHZhbHVlO1xufVxuZnVuY3Rpb24gbWFrZVJhbmRvbShzZWVkKSB7XG4gIGNvbnN0IHJuZyA9IHhvcm9zaGlybzEyOHBsdXMocGNnMzIoc2VlZC5taWNyb3NTaW5jZVVuaXhFcG9jaCkpO1xuICBjb25zdCByYW5kb20gPSAoKSA9PiBnZW5lcmF0ZUZsb2F0NjQocm5nKTtcbiAgcmFuZG9tLmZpbGwgPSAoYXJyYXkpID0+IHtcbiAgICBjb25zdCBlbGVtID0gYXJyYXkuYXQoMCk7XG4gICAgaWYgKHR5cGVvZiBlbGVtID09PSBcImJpZ2ludFwiKSB7XG4gICAgICBjb25zdCB1cHBlciA9ICgxbiA8PCBCaWdJbnQoYXJyYXkuQllURVNfUEVSX0VMRU1FTlQgKiA4KSkgLSAxbjtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYXJyYXlbaV0gPSB1bnNhZmVVbmlmb3JtQmlnSW50RGlzdHJpYnV0aW9uKDBuLCB1cHBlciwgcm5nKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbGVtID09PSBcIm51bWJlclwiKSB7XG4gICAgICBjb25zdCB1cHBlciA9ICgxIDw8IGFycmF5LkJZVEVTX1BFUl9FTEVNRU5UICogOCkgLSAxO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBhcnJheVtpXSA9IHVuc2FmZVVuaWZvcm1JbnREaXN0cmlidXRpb24oMCwgdXBwZXIsIHJuZyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnJheTtcbiAgfTtcbiAgcmFuZG9tLnVpbnQzMiA9ICgpID0+IHJuZy51bnNhZmVOZXh0KCk7XG4gIHJhbmRvbS5pbnRlZ2VySW5SYW5nZSA9IChtaW4sIG1heCkgPT4gdW5zYWZlVW5pZm9ybUludERpc3RyaWJ1dGlvbihtaW4sIG1heCwgcm5nKTtcbiAgcmFuZG9tLmJpZ2ludEluUmFuZ2UgPSAobWluLCBtYXgpID0+IHVuc2FmZVVuaWZvcm1CaWdJbnREaXN0cmlidXRpb24obWluLCBtYXgsIHJuZyk7XG4gIHJldHVybiByYW5kb207XG59XG5cbi8vIHNyYy9zZXJ2ZXIvcG9seWZpbGxzLnRzXG5fX3RvRVNNKHJlcXVpcmVfdGV4dF9taW4oKSk7XG5cbi8vIHNyYy9saWIvYXV0b2dlbi9zdW1fdHlwZV92YXJpYW50X3R5cGUudHNcbnZhciBzdW1fdHlwZV92YXJpYW50X3R5cGVfZGVmYXVsdCA9IHQub2JqZWN0KFwiU3VtVHlwZVZhcmlhbnRcIiwge1xuICBuYW1lOiB0Lm9wdGlvbih0LnN0cmluZygpKSxcbiAgZ2V0IGFsZ2VicmFpY1R5cGUoKSB7XG4gICAgcmV0dXJuIGFsZ2VicmFpY190eXBlX3R5cGVfZGVmYXVsdDtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWIvYXV0b2dlbi9zdW1fdHlwZV90eXBlLnRzXG52YXIgc3VtX3R5cGVfdHlwZV9kZWZhdWx0ID0gdC5vYmplY3QoXCJTdW1UeXBlXCIsIHtcbiAgZ2V0IHZhcmlhbnRzKCkge1xuICAgIHJldHVybiB0LmFycmF5KHN1bV90eXBlX3ZhcmlhbnRfdHlwZV9kZWZhdWx0KTtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWIvYXV0b2dlbi9wcm9kdWN0X3R5cGVfZWxlbWVudF90eXBlLnRzXG52YXIgcHJvZHVjdF90eXBlX2VsZW1lbnRfdHlwZV9kZWZhdWx0ID0gdC5vYmplY3QoXCJQcm9kdWN0VHlwZUVsZW1lbnRcIiwge1xuICBuYW1lOiB0Lm9wdGlvbih0LnN0cmluZygpKSxcbiAgZ2V0IGFsZ2VicmFpY1R5cGUoKSB7XG4gICAgcmV0dXJuIGFsZ2VicmFpY190eXBlX3R5cGVfZGVmYXVsdDtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWIvYXV0b2dlbi9wcm9kdWN0X3R5cGVfdHlwZS50c1xudmFyIHByb2R1Y3RfdHlwZV90eXBlX2RlZmF1bHQgPSB0Lm9iamVjdChcIlByb2R1Y3RUeXBlXCIsIHtcbiAgZ2V0IGVsZW1lbnRzKCkge1xuICAgIHJldHVybiB0LmFycmF5KHByb2R1Y3RfdHlwZV9lbGVtZW50X3R5cGVfZGVmYXVsdCk7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vYWxnZWJyYWljX3R5cGVfdHlwZS50c1xudmFyIEFsZ2VicmFpY1R5cGUyID0gdC5lbnVtKFwiQWxnZWJyYWljVHlwZVwiLCB7XG4gIFJlZjogdC51MzIoKSxcbiAgZ2V0IFN1bSgpIHtcbiAgICByZXR1cm4gc3VtX3R5cGVfdHlwZV9kZWZhdWx0O1xuICB9LFxuICBnZXQgUHJvZHVjdCgpIHtcbiAgICByZXR1cm4gcHJvZHVjdF90eXBlX3R5cGVfZGVmYXVsdDtcbiAgfSxcbiAgZ2V0IEFycmF5KCkge1xuICAgIHJldHVybiBBbGdlYnJhaWNUeXBlMjtcbiAgfSxcbiAgU3RyaW5nOiB0LnVuaXQoKSxcbiAgQm9vbDogdC51bml0KCksXG4gIEk4OiB0LnVuaXQoKSxcbiAgVTg6IHQudW5pdCgpLFxuICBJMTY6IHQudW5pdCgpLFxuICBVMTY6IHQudW5pdCgpLFxuICBJMzI6IHQudW5pdCgpLFxuICBVMzI6IHQudW5pdCgpLFxuICBJNjQ6IHQudW5pdCgpLFxuICBVNjQ6IHQudW5pdCgpLFxuICBJMTI4OiB0LnVuaXQoKSxcbiAgVTEyODogdC51bml0KCksXG4gIEkyNTY6IHQudW5pdCgpLFxuICBVMjU2OiB0LnVuaXQoKSxcbiAgRjMyOiB0LnVuaXQoKSxcbiAgRjY0OiB0LnVuaXQoKVxufSk7XG52YXIgYWxnZWJyYWljX3R5cGVfdHlwZV9kZWZhdWx0ID0gQWxnZWJyYWljVHlwZTI7XG5cbi8vIHNyYy9saWIvYXV0b2dlbi90eXBlc3BhY2VfdHlwZS50c1xudmFyIHR5cGVzcGFjZV90eXBlX2RlZmF1bHQgPSB0Lm9iamVjdChcIlR5cGVzcGFjZVwiLCB7XG4gIGdldCB0eXBlcygpIHtcbiAgICByZXR1cm4gdC5hcnJheShhbGdlYnJhaWNfdHlwZV90eXBlX2RlZmF1bHQpO1xuICB9XG59KTtcblxuLy8gc3JjL2xpYi9hdXRvZ2VuL3Jhd19jb2x1bW5fZGVmX3ZfOF90eXBlLnRzXG52YXIgcmF3X2NvbHVtbl9kZWZfdl84X3R5cGVfZGVmYXVsdCA9IHQub2JqZWN0KFwiUmF3Q29sdW1uRGVmVjhcIiwge1xuICBjb2xOYW1lOiB0LnN0cmluZygpLFxuICBnZXQgY29sVHlwZSgpIHtcbiAgICByZXR1cm4gYWxnZWJyYWljX3R5cGVfdHlwZV9kZWZhdWx0O1xuICB9XG59KTtcblxuLy8gc3JjL2xpYi9hdXRvZ2VuL2luZGV4X3R5cGVfdHlwZS50c1xudmFyIEluZGV4VHlwZSA9IHQuZW51bShcIkluZGV4VHlwZVwiLCB7XG4gIEJUcmVlOiB0LnVuaXQoKSxcbiAgSGFzaDogdC51bml0KClcbn0pO1xudmFyIGluZGV4X3R5cGVfdHlwZV9kZWZhdWx0ID0gSW5kZXhUeXBlO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vcmF3X2luZGV4X2RlZl92XzhfdHlwZS50c1xudmFyIHJhd19pbmRleF9kZWZfdl84X3R5cGVfZGVmYXVsdCA9IHQub2JqZWN0KFwiUmF3SW5kZXhEZWZWOFwiLCB7XG4gIGluZGV4TmFtZTogdC5zdHJpbmcoKSxcbiAgaXNVbmlxdWU6IHQuYm9vbCgpLFxuICBnZXQgaW5kZXhUeXBlKCkge1xuICAgIHJldHVybiBpbmRleF90eXBlX3R5cGVfZGVmYXVsdDtcbiAgfSxcbiAgY29sdW1uczogdC5hcnJheSh0LnUxNigpKVxufSk7XG5cbi8vIHNyYy9saWIvYXV0b2dlbi9yYXdfY29uc3RyYWludF9kZWZfdl84X3R5cGUudHNcbnZhciByYXdfY29uc3RyYWludF9kZWZfdl84X3R5cGVfZGVmYXVsdCA9IHQub2JqZWN0KFwiUmF3Q29uc3RyYWludERlZlY4XCIsIHtcbiAgY29uc3RyYWludE5hbWU6IHQuc3RyaW5nKCksXG4gIGNvbnN0cmFpbnRzOiB0LnU4KCksXG4gIGNvbHVtbnM6IHQuYXJyYXkodC51MTYoKSlcbn0pO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vcmF3X3NlcXVlbmNlX2RlZl92XzhfdHlwZS50c1xudmFyIHJhd19zZXF1ZW5jZV9kZWZfdl84X3R5cGVfZGVmYXVsdCA9IHQub2JqZWN0KFwiUmF3U2VxdWVuY2VEZWZWOFwiLCB7XG4gIHNlcXVlbmNlTmFtZTogdC5zdHJpbmcoKSxcbiAgY29sUG9zOiB0LnUxNigpLFxuICBpbmNyZW1lbnQ6IHQuaTEyOCgpLFxuICBzdGFydDogdC5vcHRpb24odC5pMTI4KCkpLFxuICBtaW5WYWx1ZTogdC5vcHRpb24odC5pMTI4KCkpLFxuICBtYXhWYWx1ZTogdC5vcHRpb24odC5pMTI4KCkpLFxuICBhbGxvY2F0ZWQ6IHQuaTEyOCgpXG59KTtcblxuLy8gc3JjL2xpYi9hdXRvZ2VuL3Jhd190YWJsZV9kZWZfdl84X3R5cGUudHNcbnZhciByYXdfdGFibGVfZGVmX3ZfOF90eXBlX2RlZmF1bHQgPSB0Lm9iamVjdChcIlJhd1RhYmxlRGVmVjhcIiwge1xuICB0YWJsZU5hbWU6IHQuc3RyaW5nKCksXG4gIGdldCBjb2x1bW5zKCkge1xuICAgIHJldHVybiB0LmFycmF5KHJhd19jb2x1bW5fZGVmX3ZfOF90eXBlX2RlZmF1bHQpO1xuICB9LFxuICBnZXQgaW5kZXhlcygpIHtcbiAgICByZXR1cm4gdC5hcnJheShyYXdfaW5kZXhfZGVmX3ZfOF90eXBlX2RlZmF1bHQpO1xuICB9LFxuICBnZXQgY29uc3RyYWludHMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkocmF3X2NvbnN0cmFpbnRfZGVmX3ZfOF90eXBlX2RlZmF1bHQpO1xuICB9LFxuICBnZXQgc2VxdWVuY2VzKCkge1xuICAgIHJldHVybiB0LmFycmF5KHJhd19zZXF1ZW5jZV9kZWZfdl84X3R5cGVfZGVmYXVsdCk7XG4gIH0sXG4gIHRhYmxlVHlwZTogdC5zdHJpbmcoKSxcbiAgdGFibGVBY2Nlc3M6IHQuc3RyaW5nKCksXG4gIHNjaGVkdWxlZDogdC5vcHRpb24odC5zdHJpbmcoKSlcbn0pO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vdGFibGVfZGVzY190eXBlLnRzXG52YXIgdGFibGVfZGVzY190eXBlX2RlZmF1bHQgPSB0Lm9iamVjdChcIlRhYmxlRGVzY1wiLCB7XG4gIGdldCBzY2hlbWEoKSB7XG4gICAgcmV0dXJuIHJhd190YWJsZV9kZWZfdl84X3R5cGVfZGVmYXVsdDtcbiAgfSxcbiAgZGF0YTogdC51MzIoKVxufSk7XG5cbi8vIHNyYy9saWIvYXV0b2dlbi9yZWR1Y2VyX2RlZl90eXBlLnRzXG52YXIgcmVkdWNlcl9kZWZfdHlwZV9kZWZhdWx0ID0gdC5vYmplY3QoXCJSZWR1Y2VyRGVmXCIsIHtcbiAgbmFtZTogdC5zdHJpbmcoKSxcbiAgZ2V0IGFyZ3MoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkocHJvZHVjdF90eXBlX2VsZW1lbnRfdHlwZV9kZWZhdWx0KTtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWIvYXV0b2dlbi90eXBlX2FsaWFzX3R5cGUudHNcbnZhciB0eXBlX2FsaWFzX3R5cGVfZGVmYXVsdCA9IHQub2JqZWN0KFwiVHlwZUFsaWFzXCIsIHtcbiAgbmFtZTogdC5zdHJpbmcoKSxcbiAgdHk6IHQudTMyKClcbn0pO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vbWlzY19tb2R1bGVfZXhwb3J0X3R5cGUudHNcbnZhciBNaXNjTW9kdWxlRXhwb3J0ID0gdC5lbnVtKFwiTWlzY01vZHVsZUV4cG9ydFwiLCB7XG4gIGdldCBUeXBlQWxpYXMoKSB7XG4gICAgcmV0dXJuIHR5cGVfYWxpYXNfdHlwZV9kZWZhdWx0O1xuICB9XG59KTtcbnZhciBtaXNjX21vZHVsZV9leHBvcnRfdHlwZV9kZWZhdWx0ID0gTWlzY01vZHVsZUV4cG9ydDtcblxuLy8gc3JjL2xpYi9hdXRvZ2VuL3Jhd19tb2R1bGVfZGVmX3ZfOF90eXBlLnRzXG52YXIgcmF3X21vZHVsZV9kZWZfdl84X3R5cGVfZGVmYXVsdCA9IHQub2JqZWN0KFwiUmF3TW9kdWxlRGVmVjhcIiwge1xuICBnZXQgdHlwZXNwYWNlKCkge1xuICAgIHJldHVybiB0eXBlc3BhY2VfdHlwZV9kZWZhdWx0O1xuICB9LFxuICBnZXQgdGFibGVzKCkge1xuICAgIHJldHVybiB0LmFycmF5KHRhYmxlX2Rlc2NfdHlwZV9kZWZhdWx0KTtcbiAgfSxcbiAgZ2V0IHJlZHVjZXJzKCkge1xuICAgIHJldHVybiB0LmFycmF5KHJlZHVjZXJfZGVmX3R5cGVfZGVmYXVsdCk7XG4gIH0sXG4gIGdldCBtaXNjRXhwb3J0cygpIHtcbiAgICByZXR1cm4gdC5hcnJheShtaXNjX21vZHVsZV9leHBvcnRfdHlwZV9kZWZhdWx0KTtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWIvYXV0b2dlbi9yYXdfaW5kZXhfZGVmX3ZfOV90eXBlLnRzXG52YXIgcmF3X2luZGV4X2RlZl92XzlfdHlwZV9kZWZhdWx0ID0gdC5vYmplY3QoXCJSYXdJbmRleERlZlY5XCIsIHtcbiAgbmFtZTogdC5vcHRpb24odC5zdHJpbmcoKSksXG4gIGFjY2Vzc29yTmFtZTogdC5vcHRpb24odC5zdHJpbmcoKSksXG4gIGdldCBhbGdvcml0aG0oKSB7XG4gICAgcmV0dXJuIHJhd19pbmRleF9hbGdvcml0aG1fdHlwZV9kZWZhdWx0O1xuICB9XG59KTtcblxuLy8gc3JjL2xpYi9hdXRvZ2VuL3Jhd191bmlxdWVfY29uc3RyYWludF9kYXRhX3ZfOV90eXBlLnRzXG52YXIgcmF3X3VuaXF1ZV9jb25zdHJhaW50X2RhdGFfdl85X3R5cGVfZGVmYXVsdCA9IHQub2JqZWN0KFwiUmF3VW5pcXVlQ29uc3RyYWludERhdGFWOVwiLCB7XG4gIGNvbHVtbnM6IHQuYXJyYXkodC51MTYoKSlcbn0pO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vcmF3X2NvbnN0cmFpbnRfZGF0YV92XzlfdHlwZS50c1xudmFyIFJhd0NvbnN0cmFpbnREYXRhVjkgPSB0LmVudW0oXCJSYXdDb25zdHJhaW50RGF0YVY5XCIsIHtcbiAgZ2V0IFVuaXF1ZSgpIHtcbiAgICByZXR1cm4gcmF3X3VuaXF1ZV9jb25zdHJhaW50X2RhdGFfdl85X3R5cGVfZGVmYXVsdDtcbiAgfVxufSk7XG52YXIgcmF3X2NvbnN0cmFpbnRfZGF0YV92XzlfdHlwZV9kZWZhdWx0ID0gUmF3Q29uc3RyYWludERhdGFWOTtcblxuLy8gc3JjL2xpYi9hdXRvZ2VuL3Jhd19jb25zdHJhaW50X2RlZl92XzlfdHlwZS50c1xudmFyIHJhd19jb25zdHJhaW50X2RlZl92XzlfdHlwZV9kZWZhdWx0ID0gdC5vYmplY3QoXCJSYXdDb25zdHJhaW50RGVmVjlcIiwge1xuICBuYW1lOiB0Lm9wdGlvbih0LnN0cmluZygpKSxcbiAgZ2V0IGRhdGEoKSB7XG4gICAgcmV0dXJuIHJhd19jb25zdHJhaW50X2RhdGFfdl85X3R5cGVfZGVmYXVsdDtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWIvYXV0b2dlbi9yYXdfc2VxdWVuY2VfZGVmX3ZfOV90eXBlLnRzXG52YXIgcmF3X3NlcXVlbmNlX2RlZl92XzlfdHlwZV9kZWZhdWx0ID0gdC5vYmplY3QoXCJSYXdTZXF1ZW5jZURlZlY5XCIsIHtcbiAgbmFtZTogdC5vcHRpb24odC5zdHJpbmcoKSksXG4gIGNvbHVtbjogdC51MTYoKSxcbiAgc3RhcnQ6IHQub3B0aW9uKHQuaTEyOCgpKSxcbiAgbWluVmFsdWU6IHQub3B0aW9uKHQuaTEyOCgpKSxcbiAgbWF4VmFsdWU6IHQub3B0aW9uKHQuaTEyOCgpKSxcbiAgaW5jcmVtZW50OiB0LmkxMjgoKVxufSk7XG5cbi8vIHNyYy9saWIvYXV0b2dlbi9yYXdfc2NoZWR1bGVfZGVmX3ZfOV90eXBlLnRzXG52YXIgcmF3X3NjaGVkdWxlX2RlZl92XzlfdHlwZV9kZWZhdWx0ID0gdC5vYmplY3QoXCJSYXdTY2hlZHVsZURlZlY5XCIsIHtcbiAgbmFtZTogdC5vcHRpb24odC5zdHJpbmcoKSksXG4gIHJlZHVjZXJOYW1lOiB0LnN0cmluZygpLFxuICBzY2hlZHVsZWRBdENvbHVtbjogdC51MTYoKVxufSk7XG5cbi8vIHNyYy9saWIvYXV0b2dlbi90YWJsZV90eXBlX3R5cGUudHNcbnZhciBUYWJsZVR5cGUgPSB0LmVudW0oXCJUYWJsZVR5cGVcIiwge1xuICBTeXN0ZW06IHQudW5pdCgpLFxuICBVc2VyOiB0LnVuaXQoKVxufSk7XG52YXIgdGFibGVfdHlwZV90eXBlX2RlZmF1bHQgPSBUYWJsZVR5cGU7XG5cbi8vIHNyYy9saWIvYXV0b2dlbi90YWJsZV9hY2Nlc3NfdHlwZS50c1xudmFyIFRhYmxlQWNjZXNzID0gdC5lbnVtKFwiVGFibGVBY2Nlc3NcIiwge1xuICBQdWJsaWM6IHQudW5pdCgpLFxuICBQcml2YXRlOiB0LnVuaXQoKVxufSk7XG52YXIgdGFibGVfYWNjZXNzX3R5cGVfZGVmYXVsdCA9IFRhYmxlQWNjZXNzO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vcmF3X3RhYmxlX2RlZl92XzlfdHlwZS50c1xudmFyIHJhd190YWJsZV9kZWZfdl85X3R5cGVfZGVmYXVsdCA9IHQub2JqZWN0KFwiUmF3VGFibGVEZWZWOVwiLCB7XG4gIG5hbWU6IHQuc3RyaW5nKCksXG4gIHByb2R1Y3RUeXBlUmVmOiB0LnUzMigpLFxuICBwcmltYXJ5S2V5OiB0LmFycmF5KHQudTE2KCkpLFxuICBnZXQgaW5kZXhlcygpIHtcbiAgICByZXR1cm4gdC5hcnJheShyYXdfaW5kZXhfZGVmX3ZfOV90eXBlX2RlZmF1bHQpO1xuICB9LFxuICBnZXQgY29uc3RyYWludHMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkocmF3X2NvbnN0cmFpbnRfZGVmX3ZfOV90eXBlX2RlZmF1bHQpO1xuICB9LFxuICBnZXQgc2VxdWVuY2VzKCkge1xuICAgIHJldHVybiB0LmFycmF5KHJhd19zZXF1ZW5jZV9kZWZfdl85X3R5cGVfZGVmYXVsdCk7XG4gIH0sXG4gIGdldCBzY2hlZHVsZSgpIHtcbiAgICByZXR1cm4gdC5vcHRpb24ocmF3X3NjaGVkdWxlX2RlZl92XzlfdHlwZV9kZWZhdWx0KTtcbiAgfSxcbiAgZ2V0IHRhYmxlVHlwZSgpIHtcbiAgICByZXR1cm4gdGFibGVfdHlwZV90eXBlX2RlZmF1bHQ7XG4gIH0sXG4gIGdldCB0YWJsZUFjY2VzcygpIHtcbiAgICByZXR1cm4gdGFibGVfYWNjZXNzX3R5cGVfZGVmYXVsdDtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWIvYXV0b2dlbi9yYXdfcmVkdWNlcl9kZWZfdl85X3R5cGUudHNcbnZhciByYXdfcmVkdWNlcl9kZWZfdl85X3R5cGVfZGVmYXVsdCA9IHQub2JqZWN0KFwiUmF3UmVkdWNlckRlZlY5XCIsIHtcbiAgbmFtZTogdC5zdHJpbmcoKSxcbiAgZ2V0IHBhcmFtcygpIHtcbiAgICByZXR1cm4gcHJvZHVjdF90eXBlX3R5cGVfZGVmYXVsdDtcbiAgfSxcbiAgZ2V0IGxpZmVjeWNsZSgpIHtcbiAgICByZXR1cm4gdC5vcHRpb24obGlmZWN5Y2xlX3R5cGVfZGVmYXVsdCk7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vcmF3X3Njb3BlZF90eXBlX25hbWVfdl85X3R5cGUudHNcbnZhciByYXdfc2NvcGVkX3R5cGVfbmFtZV92XzlfdHlwZV9kZWZhdWx0ID0gdC5vYmplY3QoXCJSYXdTY29wZWRUeXBlTmFtZVY5XCIsIHtcbiAgc2NvcGU6IHQuYXJyYXkodC5zdHJpbmcoKSksXG4gIG5hbWU6IHQuc3RyaW5nKClcbn0pO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vcmF3X3R5cGVfZGVmX3ZfOV90eXBlLnRzXG52YXIgcmF3X3R5cGVfZGVmX3ZfOV90eXBlX2RlZmF1bHQgPSB0Lm9iamVjdChcIlJhd1R5cGVEZWZWOVwiLCB7XG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiByYXdfc2NvcGVkX3R5cGVfbmFtZV92XzlfdHlwZV9kZWZhdWx0O1xuICB9LFxuICB0eTogdC51MzIoKSxcbiAgY3VzdG9tT3JkZXJpbmc6IHQuYm9vbCgpXG59KTtcblxuLy8gc3JjL2xpYi9hdXRvZ2VuL3Jhd19jb2x1bW5fZGVmYXVsdF92YWx1ZV92XzlfdHlwZS50c1xudmFyIHJhd19jb2x1bW5fZGVmYXVsdF92YWx1ZV92XzlfdHlwZV9kZWZhdWx0ID0gdC5vYmplY3QoXCJSYXdDb2x1bW5EZWZhdWx0VmFsdWVWOVwiLCB7XG4gIHRhYmxlOiB0LnN0cmluZygpLFxuICBjb2xJZDogdC51MTYoKSxcbiAgdmFsdWU6IHQuYnl0ZUFycmF5KClcbn0pO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vcmF3X3Byb2NlZHVyZV9kZWZfdl85X3R5cGUudHNcbnZhciByYXdfcHJvY2VkdXJlX2RlZl92XzlfdHlwZV9kZWZhdWx0ID0gdC5vYmplY3QoXCJSYXdQcm9jZWR1cmVEZWZWOVwiLCB7XG4gIG5hbWU6IHQuc3RyaW5nKCksXG4gIGdldCBwYXJhbXMoKSB7XG4gICAgcmV0dXJuIHByb2R1Y3RfdHlwZV90eXBlX2RlZmF1bHQ7XG4gIH0sXG4gIGdldCByZXR1cm5UeXBlKCkge1xuICAgIHJldHVybiBhbGdlYnJhaWNfdHlwZV90eXBlX2RlZmF1bHQ7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vcmF3X3ZpZXdfZGVmX3ZfOV90eXBlLnRzXG52YXIgcmF3X3ZpZXdfZGVmX3ZfOV90eXBlX2RlZmF1bHQgPSB0Lm9iamVjdChcIlJhd1ZpZXdEZWZWOVwiLCB7XG4gIG5hbWU6IHQuc3RyaW5nKCksXG4gIGluZGV4OiB0LnUzMigpLFxuICBpc1B1YmxpYzogdC5ib29sKCksXG4gIGlzQW5vbnltb3VzOiB0LmJvb2woKSxcbiAgZ2V0IHBhcmFtcygpIHtcbiAgICByZXR1cm4gcHJvZHVjdF90eXBlX3R5cGVfZGVmYXVsdDtcbiAgfSxcbiAgZ2V0IHJldHVyblR5cGUoKSB7XG4gICAgcmV0dXJuIGFsZ2VicmFpY190eXBlX3R5cGVfZGVmYXVsdDtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWIvYXV0b2dlbi9yYXdfbWlzY19tb2R1bGVfZXhwb3J0X3ZfOV90eXBlLnRzXG52YXIgUmF3TWlzY01vZHVsZUV4cG9ydFY5ID0gdC5lbnVtKFwiUmF3TWlzY01vZHVsZUV4cG9ydFY5XCIsIHtcbiAgZ2V0IENvbHVtbkRlZmF1bHRWYWx1ZSgpIHtcbiAgICByZXR1cm4gcmF3X2NvbHVtbl9kZWZhdWx0X3ZhbHVlX3ZfOV90eXBlX2RlZmF1bHQ7XG4gIH0sXG4gIGdldCBQcm9jZWR1cmUoKSB7XG4gICAgcmV0dXJuIHJhd19wcm9jZWR1cmVfZGVmX3ZfOV90eXBlX2RlZmF1bHQ7XG4gIH0sXG4gIGdldCBWaWV3KCkge1xuICAgIHJldHVybiByYXdfdmlld19kZWZfdl85X3R5cGVfZGVmYXVsdDtcbiAgfVxufSk7XG52YXIgcmF3X21pc2NfbW9kdWxlX2V4cG9ydF92XzlfdHlwZV9kZWZhdWx0ID0gUmF3TWlzY01vZHVsZUV4cG9ydFY5O1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vcmF3X3Jvd19sZXZlbF9zZWN1cml0eV9kZWZfdl85X3R5cGUudHNcbnZhciByYXdfcm93X2xldmVsX3NlY3VyaXR5X2RlZl92XzlfdHlwZV9kZWZhdWx0ID0gdC5vYmplY3QoXCJSYXdSb3dMZXZlbFNlY3VyaXR5RGVmVjlcIiwge1xuICBzcWw6IHQuc3RyaW5nKClcbn0pO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vcmF3X21vZHVsZV9kZWZfdl85X3R5cGUudHNcbnZhciByYXdfbW9kdWxlX2RlZl92XzlfdHlwZV9kZWZhdWx0ID0gdC5vYmplY3QoXCJSYXdNb2R1bGVEZWZWOVwiLCB7XG4gIGdldCB0eXBlc3BhY2UoKSB7XG4gICAgcmV0dXJuIHR5cGVzcGFjZV90eXBlX2RlZmF1bHQ7XG4gIH0sXG4gIGdldCB0YWJsZXMoKSB7XG4gICAgcmV0dXJuIHQuYXJyYXkocmF3X3RhYmxlX2RlZl92XzlfdHlwZV9kZWZhdWx0KTtcbiAgfSxcbiAgZ2V0IHJlZHVjZXJzKCkge1xuICAgIHJldHVybiB0LmFycmF5KHJhd19yZWR1Y2VyX2RlZl92XzlfdHlwZV9kZWZhdWx0KTtcbiAgfSxcbiAgZ2V0IHR5cGVzKCkge1xuICAgIHJldHVybiB0LmFycmF5KHJhd190eXBlX2RlZl92XzlfdHlwZV9kZWZhdWx0KTtcbiAgfSxcbiAgZ2V0IG1pc2NFeHBvcnRzKCkge1xuICAgIHJldHVybiB0LmFycmF5KHJhd19taXNjX21vZHVsZV9leHBvcnRfdl85X3R5cGVfZGVmYXVsdCk7XG4gIH0sXG4gIGdldCByb3dMZXZlbFNlY3VyaXR5KCkge1xuICAgIHJldHVybiB0LmFycmF5KHJhd19yb3dfbGV2ZWxfc2VjdXJpdHlfZGVmX3ZfOV90eXBlX2RlZmF1bHQpO1xuICB9XG59KTtcblxuLy8gc3JjL2xpYi9hdXRvZ2VuL3Jhd19tb2R1bGVfZGVmX3R5cGUudHNcbnZhciBSYXdNb2R1bGVEZWYgPSB0LmVudW0oXCJSYXdNb2R1bGVEZWZcIiwge1xuICBnZXQgVjhCYWNrQ29tcGF0KCkge1xuICAgIHJldHVybiByYXdfbW9kdWxlX2RlZl92XzhfdHlwZV9kZWZhdWx0O1xuICB9LFxuICBnZXQgVjkoKSB7XG4gICAgcmV0dXJuIHJhd19tb2R1bGVfZGVmX3ZfOV90eXBlX2RlZmF1bHQ7XG4gIH1cbn0pO1xudmFyIHJhd19tb2R1bGVfZGVmX3R5cGVfZGVmYXVsdCA9IFJhd01vZHVsZURlZjtcblxuLy8gc3JjL3NlcnZlci9yYW5nZS50c1xudmFyIFJhbmdlID0gY2xhc3Mge1xuICAjZnJvbTtcbiAgI3RvO1xuICBjb25zdHJ1Y3Rvcihmcm9tMiwgdG8pIHtcbiAgICB0aGlzLiNmcm9tID0gZnJvbTIgPz8geyB0YWc6IFwidW5ib3VuZGVkXCIgfTtcbiAgICB0aGlzLiN0byA9IHRvID8/IHsgdGFnOiBcInVuYm91bmRlZFwiIH07XG4gIH1cbiAgZ2V0IGZyb20oKSB7XG4gICAgcmV0dXJuIHRoaXMuI2Zyb207XG4gIH1cbiAgZ2V0IHRvKCkge1xuICAgIHJldHVybiB0aGlzLiN0bztcbiAgfVxufTtcblxuLy8gc3JjL3NlcnZlci9odHRwX2ludGVybmFsLnRzXG52YXIgaW1wb3J0X3N0YXR1c2VzID0gX190b0VTTShyZXF1aXJlX3N0YXR1c2VzKCkpO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vaHR0cF9oZWFkZXJfcGFpcl90eXBlLnRzXG52YXIgaHR0cF9oZWFkZXJfcGFpcl90eXBlX2RlZmF1bHQgPSB0Lm9iamVjdChcIkh0dHBIZWFkZXJQYWlyXCIsIHtcbiAgbmFtZTogdC5zdHJpbmcoKSxcbiAgdmFsdWU6IHQuYnl0ZUFycmF5KClcbn0pO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vaHR0cF9oZWFkZXJzX3R5cGUudHNcbnZhciBodHRwX2hlYWRlcnNfdHlwZV9kZWZhdWx0ID0gdC5vYmplY3QoXCJIdHRwSGVhZGVyc1wiLCB7XG4gIGdldCBlbnRyaWVzKCkge1xuICAgIHJldHVybiB0LmFycmF5KGh0dHBfaGVhZGVyX3BhaXJfdHlwZV9kZWZhdWx0KTtcbiAgfVxufSk7XG5cbi8vIHNyYy9saWIvYXV0b2dlbi9odHRwX21ldGhvZF90eXBlLnRzXG52YXIgSHR0cE1ldGhvZCA9IHQuZW51bShcIkh0dHBNZXRob2RcIiwge1xuICBHZXQ6IHQudW5pdCgpLFxuICBIZWFkOiB0LnVuaXQoKSxcbiAgUG9zdDogdC51bml0KCksXG4gIFB1dDogdC51bml0KCksXG4gIERlbGV0ZTogdC51bml0KCksXG4gIENvbm5lY3Q6IHQudW5pdCgpLFxuICBPcHRpb25zOiB0LnVuaXQoKSxcbiAgVHJhY2U6IHQudW5pdCgpLFxuICBQYXRjaDogdC51bml0KCksXG4gIEV4dGVuc2lvbjogdC5zdHJpbmcoKVxufSk7XG52YXIgaHR0cF9tZXRob2RfdHlwZV9kZWZhdWx0ID0gSHR0cE1ldGhvZDtcblxuLy8gc3JjL2xpYi9hdXRvZ2VuL2h0dHBfdmVyc2lvbl90eXBlLnRzXG52YXIgSHR0cFZlcnNpb24gPSB0LmVudW0oXCJIdHRwVmVyc2lvblwiLCB7XG4gIEh0dHAwOTogdC51bml0KCksXG4gIEh0dHAxMDogdC51bml0KCksXG4gIEh0dHAxMTogdC51bml0KCksXG4gIEh0dHAyOiB0LnVuaXQoKSxcbiAgSHR0cDM6IHQudW5pdCgpXG59KTtcbnZhciBodHRwX3ZlcnNpb25fdHlwZV9kZWZhdWx0ID0gSHR0cFZlcnNpb247XG5cbi8vIHNyYy9saWIvYXV0b2dlbi9odHRwX3JlcXVlc3RfdHlwZS50c1xudmFyIGh0dHBfcmVxdWVzdF90eXBlX2RlZmF1bHQgPSB0Lm9iamVjdChcIkh0dHBSZXF1ZXN0XCIsIHtcbiAgZ2V0IG1ldGhvZCgpIHtcbiAgICByZXR1cm4gaHR0cF9tZXRob2RfdHlwZV9kZWZhdWx0O1xuICB9LFxuICBnZXQgaGVhZGVycygpIHtcbiAgICByZXR1cm4gaHR0cF9oZWFkZXJzX3R5cGVfZGVmYXVsdDtcbiAgfSxcbiAgdGltZW91dDogdC5vcHRpb24odC50aW1lRHVyYXRpb24oKSksXG4gIHVyaTogdC5zdHJpbmcoKSxcbiAgZ2V0IHZlcnNpb24oKSB7XG4gICAgcmV0dXJuIGh0dHBfdmVyc2lvbl90eXBlX2RlZmF1bHQ7XG4gIH1cbn0pO1xuXG4vLyBzcmMvbGliL2F1dG9nZW4vaHR0cF9yZXNwb25zZV90eXBlLnRzXG52YXIgaHR0cF9yZXNwb25zZV90eXBlX2RlZmF1bHQgPSB0Lm9iamVjdChcIkh0dHBSZXNwb25zZVwiLCB7XG4gIGdldCBoZWFkZXJzKCkge1xuICAgIHJldHVybiBodHRwX2hlYWRlcnNfdHlwZV9kZWZhdWx0O1xuICB9LFxuICBnZXQgdmVyc2lvbigpIHtcbiAgICByZXR1cm4gaHR0cF92ZXJzaW9uX3R5cGVfZGVmYXVsdDtcbiAgfSxcbiAgY29kZTogdC51MTYoKVxufSk7XG5cbi8vIHNyYy9zZXJ2ZXIvaHR0cF9pbnRlcm5hbC50c1xudmFyIHsgZnJlZXplIH0gPSBPYmplY3Q7XG52YXIgdGV4dEVuY29kZXIgPSBuZXcgVGV4dEVuY29kZXIoKTtcbnZhciB0ZXh0RGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcihcbiAgXCJ1dGYtOFwiXG4gIC8qIHsgZmF0YWw6IHRydWUgfSAqL1xuKTtcbnZhciBtYWtlUmVzcG9uc2UgPSBTeW1ib2woXCJtYWtlUmVzcG9uc2VcIik7XG52YXIgU3luY1Jlc3BvbnNlID0gY2xhc3MgX1N5bmNSZXNwb25zZSB7XG4gICNib2R5O1xuICAjaW5uZXI7XG4gIGNvbnN0cnVjdG9yKGJvZHksIGluaXQyKSB7XG4gICAgaWYgKGJvZHkgPT0gbnVsbCkge1xuICAgICAgdGhpcy4jYm9keSA9IG51bGw7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhpcy4jYm9keSA9IGJvZHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuI2JvZHkgPSBuZXcgVWludDhBcnJheShib2R5KS5idWZmZXI7XG4gICAgfVxuICAgIHRoaXMuI2lubmVyID0ge1xuICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnMoaW5pdDI/LmhlYWRlcnMpLFxuICAgICAgc3RhdHVzOiBpbml0Mj8uc3RhdHVzID8/IDIwMCxcbiAgICAgIHN0YXR1c1RleHQ6IGluaXQyPy5zdGF0dXNUZXh0ID8/IFwiXCIsXG4gICAgICB0eXBlOiBcImRlZmF1bHRcIixcbiAgICAgIHVybDogbnVsbCxcbiAgICAgIGFib3J0ZWQ6IGZhbHNlXG4gICAgfTtcbiAgfVxuICBzdGF0aWMgW21ha2VSZXNwb25zZV0oYm9keSwgaW5uZXIpIHtcbiAgICBjb25zdCBtZSA9IG5ldyBfU3luY1Jlc3BvbnNlKGJvZHkpO1xuICAgIG1lLiNpbm5lciA9IGlubmVyO1xuICAgIHJldHVybiBtZTtcbiAgfVxuICBnZXQgaGVhZGVycygpIHtcbiAgICByZXR1cm4gdGhpcy4jaW5uZXIuaGVhZGVycztcbiAgfVxuICBnZXQgc3RhdHVzKCkge1xuICAgIHJldHVybiB0aGlzLiNpbm5lci5zdGF0dXM7XG4gIH1cbiAgZ2V0IHN0YXR1c1RleHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuI2lubmVyLnN0YXR1c1RleHQ7XG4gIH1cbiAgZ2V0IG9rKCkge1xuICAgIHJldHVybiAyMDAgPD0gdGhpcy4jaW5uZXIuc3RhdHVzICYmIHRoaXMuI2lubmVyLnN0YXR1cyA8PSAyOTk7XG4gIH1cbiAgZ2V0IHVybCgpIHtcbiAgICByZXR1cm4gdGhpcy4jaW5uZXIudXJsID8/IFwiXCI7XG4gIH1cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuI2lubmVyLnR5cGU7XG4gIH1cbiAgYXJyYXlCdWZmZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuYnl0ZXMoKS5idWZmZXI7XG4gIH1cbiAgYnl0ZXMoKSB7XG4gICAgaWYgKHRoaXMuI2JvZHkgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy4jYm9keSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgcmV0dXJuIHRleHRFbmNvZGVyLmVuY29kZSh0aGlzLiNib2R5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHRoaXMuI2JvZHkpO1xuICAgIH1cbiAgfVxuICBqc29uKCkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHRoaXMudGV4dCgpKTtcbiAgfVxuICB0ZXh0KCkge1xuICAgIGlmICh0aGlzLiNib2R5ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBcIlwiO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuI2JvZHkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJldHVybiB0aGlzLiNib2R5O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGV4dERlY29kZXIuZGVjb2RlKHRoaXMuI2JvZHkpO1xuICAgIH1cbiAgfVxufTtcbnZhciByZXF1ZXN0QmFzZVNpemUgPSBic2F0bkJhc2VTaXplKHsgdHlwZXM6IFtdIH0sIGh0dHBfcmVxdWVzdF90eXBlX2RlZmF1bHQuYWxnZWJyYWljVHlwZSk7XG52YXIgbWV0aG9kcyA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgTWFwKFtcbiAgW1wiR0VUXCIsIHsgdGFnOiBcIkdldFwiIH1dLFxuICBbXCJIRUFEXCIsIHsgdGFnOiBcIkhlYWRcIiB9XSxcbiAgW1wiUE9TVFwiLCB7IHRhZzogXCJQb3N0XCIgfV0sXG4gIFtcIlBVVFwiLCB7IHRhZzogXCJQdXRcIiB9XSxcbiAgW1wiREVMRVRFXCIsIHsgdGFnOiBcIkRlbGV0ZVwiIH1dLFxuICBbXCJDT05ORUNUXCIsIHsgdGFnOiBcIkNvbm5lY3RcIiB9XSxcbiAgW1wiT1BUSU9OU1wiLCB7IHRhZzogXCJPcHRpb25zXCIgfV0sXG4gIFtcIlRSQUNFXCIsIHsgdGFnOiBcIlRyYWNlXCIgfV0sXG4gIFtcIlBBVENIXCIsIHsgdGFnOiBcIlBhdGNoXCIgfV1cbl0pO1xuZnVuY3Rpb24gZmV0Y2godXJsLCBpbml0MiA9IHt9KSB7XG4gIGNvbnN0IG1ldGhvZCA9IG1ldGhvZHMuZ2V0KGluaXQyLm1ldGhvZD8udG9VcHBlckNhc2UoKSA/PyBcIkdFVFwiKSA/PyB7XG4gICAgdGFnOiBcIkV4dGVuc2lvblwiLFxuICAgIHZhbHVlOiBpbml0Mi5tZXRob2RcbiAgfTtcbiAgY29uc3QgaGVhZGVycyA9IHtcbiAgICAvLyBhbnlzIGJlY2F1c2UgdGhlIHR5cGluZ3MgYXJlIHdvbmt5IC0gc2VlIGNvbW1lbnQgaW4gU3luY1Jlc3BvbnNlLmNvbnN0cnVjdG9yXG4gICAgZW50cmllczogaGVhZGVyc1RvTGlzdChuZXcgSGVhZGVycyhpbml0Mi5oZWFkZXJzKSkuZmxhdE1hcCgoW2ssIHZdKSA9PiBBcnJheS5pc0FycmF5KHYpID8gdi5tYXAoKHYyKSA9PiBbaywgdjJdKSA6IFtbaywgdl1dKS5tYXAoKFtuYW1lLCB2YWx1ZV0pID0+ICh7IG5hbWUsIHZhbHVlOiB0ZXh0RW5jb2Rlci5lbmNvZGUodmFsdWUpIH0pKVxuICB9O1xuICBjb25zdCB1cmkgPSBcIlwiICsgdXJsO1xuICBjb25zdCByZXF1ZXN0ID0gZnJlZXplKHtcbiAgICBtZXRob2QsXG4gICAgaGVhZGVycyxcbiAgICB0aW1lb3V0OiBpbml0Mi50aW1lb3V0LFxuICAgIHVyaSxcbiAgICB2ZXJzaW9uOiB7IHRhZzogXCJIdHRwMTFcIiB9XG4gIH0pO1xuICBjb25zdCByZXF1ZXN0QnVmID0gbmV3IEJpbmFyeVdyaXRlcihyZXF1ZXN0QmFzZVNpemUpO1xuICBodHRwX3JlcXVlc3RfdHlwZV9kZWZhdWx0LnNlcmlhbGl6ZShyZXF1ZXN0QnVmLCByZXF1ZXN0KTtcbiAgY29uc3QgYm9keSA9IGluaXQyLmJvZHkgPT0gbnVsbCA/IG5ldyBVaW50OEFycmF5KCkgOiB0eXBlb2YgaW5pdDIuYm9keSA9PT0gXCJzdHJpbmdcIiA/IGluaXQyLmJvZHkgOiBuZXcgVWludDhBcnJheShpbml0Mi5ib2R5KTtcbiAgY29uc3QgW3Jlc3BvbnNlQnVmLCByZXNwb25zZUJvZHldID0gc3lzLnByb2NlZHVyZV9odHRwX3JlcXVlc3QoXG4gICAgcmVxdWVzdEJ1Zi5nZXRCdWZmZXIoKSxcbiAgICBib2R5XG4gICk7XG4gIGNvbnN0IHJlc3BvbnNlID0gaHR0cF9yZXNwb25zZV90eXBlX2RlZmF1bHQuZGVzZXJpYWxpemUobmV3IEJpbmFyeVJlYWRlcihyZXNwb25zZUJ1ZikpO1xuICByZXR1cm4gU3luY1Jlc3BvbnNlW21ha2VSZXNwb25zZV0ocmVzcG9uc2VCb2R5LCB7XG4gICAgdHlwZTogXCJiYXNpY1wiLFxuICAgIHVybDogdXJpLFxuICAgIHN0YXR1czogcmVzcG9uc2UuY29kZSxcbiAgICBzdGF0dXNUZXh0OiAoMCwgaW1wb3J0X3N0YXR1c2VzLmRlZmF1bHQpKHJlc3BvbnNlLmNvZGUpLFxuICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKCksXG4gICAgYWJvcnRlZDogZmFsc2VcbiAgfSk7XG59XG5mcmVlemUoZmV0Y2gpO1xudmFyIGh0dHBDbGllbnQgPSBmcmVlemUoeyBmZXRjaCB9KTtcblxuLy8gc3JjL3NlcnZlci9wcm9jZWR1cmVzLnRzXG52YXIgeyBmcmVlemU6IGZyZWV6ZTIgfSA9IE9iamVjdDtcbmZ1bmN0aW9uIGNhbGxQcm9jZWR1cmUoaWQsIHNlbmRlciwgY29ubmVjdGlvbklkLCB0aW1lc3RhbXAsIGFyZ3NCdWYpIHtcbiAgY29uc3QgeyBmbiwgcGFyYW1zVHlwZSwgcmV0dXJuVHlwZSwgcmV0dXJuVHlwZUJhc2VTaXplIH0gPSBQUk9DRURVUkVTW2lkXTtcbiAgY29uc3QgYXJncyA9IFByb2R1Y3RUeXBlLmRlc2VyaWFsaXplVmFsdWUoXG4gICAgbmV3IEJpbmFyeVJlYWRlcihhcmdzQnVmKSxcbiAgICBwYXJhbXNUeXBlLFxuICAgIE1PRFVMRV9ERUYudHlwZXNwYWNlXG4gICk7XG4gIGNvbnN0IGN0eCA9IHtcbiAgICBzZW5kZXIsXG4gICAgdGltZXN0YW1wLFxuICAgIGNvbm5lY3Rpb25JZCxcbiAgICBodHRwOiBodHRwQ2xpZW50LFxuICAgIC8vICoqTm90ZToqKiBtdXN0IGJlIDAuLj11MzI6Ok1BWFxuICAgIGNvdW50ZXJfdXVpZDogeyB2YWx1ZTogTnVtYmVyKDApIH0sXG4gICAgZ2V0IGlkZW50aXR5KCkge1xuICAgICAgcmV0dXJuIG5ldyBJZGVudGl0eShzeXMuaWRlbnRpdHkoKS5fX2lkZW50aXR5X18pO1xuICAgIH0sXG4gICAgd2l0aFR4KGJvZHkpIHtcbiAgICAgIGNvbnN0IHJ1biA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgdGltZXN0YW1wMiA9IHN5cy5wcm9jZWR1cmVfc3RhcnRfbXV0X3R4KCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgY3R4MiA9IG5ldyBSZWR1Y2VyQ3R4SW1wbChcbiAgICAgICAgICAgIHNlbmRlcixcbiAgICAgICAgICAgIG5ldyBUaW1lc3RhbXAodGltZXN0YW1wMiksXG4gICAgICAgICAgICBjb25uZWN0aW9uSWRcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiBib2R5KGN0eDIpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgc3lzLnByb2NlZHVyZV9hYm9ydF9tdXRfdHgoKTtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgbGV0IHJlcyA9IHJ1bigpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgc3lzLnByb2NlZHVyZV9jb21taXRfbXV0X3R4KCk7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUud2FybihcImNvbW1pdHRpbmcgYW5vbnltb3VzIHRyYW5zYWN0aW9uIGZhaWxlZFwiKTtcbiAgICAgIHJlcyA9IHJ1bigpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgc3lzLnByb2NlZHVyZV9jb21taXRfbXV0X3R4KCk7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyYW5zYWN0aW9uIHJldHJ5IGZhaWxlZCBhZ2FpblwiLCB7IGNhdXNlOiBlIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IHJhbmRvbSB7QGxpbmsgVXVpZH0gYHY0YCB1c2luZyB0aGUge0BsaW5rIGNyeXB0b30gUk5HLlxuICAgICAqXG4gICAgICogV0FSTjogVW50aWwgd2UgdXNlIGEgc3BhY2V0aW1lIFJORyB0aGlzIG1ha2UgY2FsbHMgbm9uLWRldGVybWluaXN0aWMuXG4gICAgICovXG4gICAgbmV3VXVpZFY0KCkge1xuICAgICAgY29uc3QgYnl0ZXMgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDE2KSk7XG4gICAgICByZXR1cm4gVXVpZC5mcm9tUmFuZG9tQnl0ZXNWNChieXRlcyk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgc29ydGFibGUge0BsaW5rIFV1aWR9IGB2N2AgdXNpbmcgdGhlIHtAbGluayBjcnlwdG99IFJORywgY291bnRlcixcbiAgICAgKiBhbmQgdGhlIHRpbWVzdGFtcC5cbiAgICAgKlxuICAgICAqIFdBUk46IFVudGlsIHdlIHVzZSBhIHNwYWNldGltZSBSTkcgdGhpcyBtYWtlIGNhbGxzIG5vbi1kZXRlcm1pbmlzdGljLlxuICAgICAqL1xuICAgIG5ld1V1aWRWNygpIHtcbiAgICAgIGNvbnN0IGJ5dGVzID0gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxMCkpO1xuICAgICAgcmV0dXJuIFV1aWQuZnJvbUNvdW50ZXJWNyh0aGlzLmNvdW50ZXJfdXVpZCwgdGhpcy50aW1lc3RhbXAsIGJ5dGVzKTtcbiAgICB9XG4gIH07XG4gIGZyZWV6ZTIoY3R4KTtcbiAgY29uc3QgcmV0ID0gY2FsbFVzZXJGdW5jdGlvbihmbiwgY3R4LCBhcmdzKTtcbiAgY29uc3QgcmV0QnVmID0gbmV3IEJpbmFyeVdyaXRlcihyZXR1cm5UeXBlQmFzZVNpemUpO1xuICBBbGdlYnJhaWNUeXBlLnNlcmlhbGl6ZVZhbHVlKHJldEJ1ZiwgcmV0dXJuVHlwZSwgcmV0LCBNT0RVTEVfREVGLnR5cGVzcGFjZSk7XG4gIHJldHVybiByZXRCdWYuZ2V0QnVmZmVyKCk7XG59XG5cbi8vIHNyYy9saWIvYXV0b2dlbi92aWV3X3Jlc3VsdF9oZWFkZXJfdHlwZS50c1xudmFyIFZpZXdSZXN1bHRIZWFkZXIgPSB0LmVudW0oXCJWaWV3UmVzdWx0SGVhZGVyXCIsIHtcbiAgUm93RGF0YTogdC51bml0KCksXG4gIFJhd1NxbDogdC5zdHJpbmcoKVxufSk7XG52YXIgdmlld19yZXN1bHRfaGVhZGVyX3R5cGVfZGVmYXVsdCA9IFZpZXdSZXN1bHRIZWFkZXI7XG5cbi8vIHNyYy9zZXJ2ZXIvcnVudGltZS50c1xudmFyIHsgZnJlZXplOiBmcmVlemUzIH0gPSBPYmplY3Q7XG52YXIgc3lzID0gZnJlZXplMyhcbiAgd3JhcFN5c2NhbGxzKF9zeXNjYWxsczFfMCwgX3N5c2NhbGxzMV8yLCBfc3lzY2FsbHMxXzMpXG4pO1xuZnVuY3Rpb24gcGFyc2VKc29uT2JqZWN0KGpzb24pIHtcbiAgbGV0IHZhbHVlO1xuICB0cnkge1xuICAgIHZhbHVlID0gSlNPTi5wYXJzZShqc29uKTtcbiAgfSBjYXRjaCB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBKU09OOiBmYWlsZWQgdG8gcGFyc2Ugc3RyaW5nXCIpO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJFeHBlY3RlZCBhIEpTT04gb2JqZWN0IGF0IHRoZSB0b3AgbGV2ZWxcIik7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxudmFyIEp3dENsYWltc0ltcGwgPSBjbGFzcyB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IEp3dENsYWltcyBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHJhd1BheWxvYWQgVGhlIEpXVCBwYXlsb2FkIGFzIGEgcmF3IEpTT04gc3RyaW5nLlxuICAgKiBAcGFyYW0gaWRlbnRpdHkgVGhlIGlkZW50aXR5IGZvciB0aGlzIEpXVC4gV2UgYXJlIG9ubHkgdGFraW5nIHRoaXMgYmVjYXVzZSB3ZSBkb24ndCBoYXZlIGEgYmxha2UzIGltcGxlbWVudGF0aW9uICh3aGljaCB3ZSBuZWVkIHRvIGNvbXB1dGUgaXQpLlxuICAgKi9cbiAgY29uc3RydWN0b3IocmF3UGF5bG9hZCwgaWRlbnRpdHkpIHtcbiAgICB0aGlzLnJhd1BheWxvYWQgPSByYXdQYXlsb2FkO1xuICAgIHRoaXMuZnVsbFBheWxvYWQgPSBwYXJzZUpzb25PYmplY3QocmF3UGF5bG9hZCk7XG4gICAgdGhpcy5faWRlbnRpdHkgPSBpZGVudGl0eTtcbiAgfVxuICBmdWxsUGF5bG9hZDtcbiAgX2lkZW50aXR5O1xuICBnZXQgaWRlbnRpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lkZW50aXR5O1xuICB9XG4gIGdldCBzdWJqZWN0KCkge1xuICAgIHJldHVybiB0aGlzLmZ1bGxQYXlsb2FkW1wic3ViXCJdO1xuICB9XG4gIGdldCBpc3N1ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZnVsbFBheWxvYWRbXCJpc3NcIl07XG4gIH1cbiAgZ2V0IGF1ZGllbmNlKCkge1xuICAgIGNvbnN0IGF1ZCA9IHRoaXMuZnVsbFBheWxvYWRbXCJhdWRcIl07XG4gICAgaWYgKGF1ZCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHJldHVybiB0eXBlb2YgYXVkID09PSBcInN0cmluZ1wiID8gW2F1ZF0gOiBhdWQ7XG4gIH1cbn07XG52YXIgQXV0aEN0eEltcGwgPSBjbGFzcyBfQXV0aEN0eEltcGwge1xuICBpc0ludGVybmFsO1xuICAvLyBTb3VyY2Ugb2YgdGhlIEpXVCBwYXlsb2FkIHN0cmluZywgaWYgdGhlcmUgaXMgb25lLlxuICBfand0U291cmNlO1xuICAvLyBXaGV0aGVyIHdlIGhhdmUgaW5pdGlhbGl6ZWQgdGhlIEpXVCBjbGFpbXMuXG4gIF9pbml0aWFsaXplZEpXVCA9IGZhbHNlO1xuICBfand0Q2xhaW1zO1xuICBfc2VuZGVySWRlbnRpdHk7XG4gIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICB0aGlzLmlzSW50ZXJuYWwgPSBvcHRzLmlzSW50ZXJuYWw7XG4gICAgdGhpcy5fand0U291cmNlID0gb3B0cy5qd3RTb3VyY2U7XG4gICAgdGhpcy5fc2VuZGVySWRlbnRpdHkgPSBvcHRzLnNlbmRlcklkZW50aXR5O1xuICB9XG4gIF9pbml0aWFsaXplSldUKCkge1xuICAgIGlmICh0aGlzLl9pbml0aWFsaXplZEpXVCkgcmV0dXJuO1xuICAgIHRoaXMuX2luaXRpYWxpemVkSldUID0gdHJ1ZTtcbiAgICBjb25zdCB0b2tlbiA9IHRoaXMuX2p3dFNvdXJjZSgpO1xuICAgIGlmICghdG9rZW4pIHtcbiAgICAgIHRoaXMuX2p3dENsYWltcyA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2p3dENsYWltcyA9IG5ldyBKd3RDbGFpbXNJbXBsKHRva2VuLCB0aGlzLl9zZW5kZXJJZGVudGl0eSk7XG4gICAgfVxuICAgIE9iamVjdC5mcmVlemUodGhpcyk7XG4gIH1cbiAgLyoqIExhemlseSBjb21wdXRlIHdoZXRoZXIgYSBKV1QgZXhpc3RzIGFuZCBpcyBwYXJzZWFibGUuICovXG4gIGdldCBoYXNKV1QoKSB7XG4gICAgdGhpcy5faW5pdGlhbGl6ZUpXVCgpO1xuICAgIHJldHVybiB0aGlzLl9qd3RDbGFpbXMgIT09IG51bGw7XG4gIH1cbiAgLyoqIExhemlseSBwYXJzZSB0aGUgSnd0Q2xhaW1zIG9ubHkgd2hlbiBhY2Nlc3NlZC4gKi9cbiAgZ2V0IGp3dCgpIHtcbiAgICB0aGlzLl9pbml0aWFsaXplSldUKCk7XG4gICAgcmV0dXJuIHRoaXMuX2p3dENsYWltcztcbiAgfVxuICAvKiogQ3JlYXRlIGEgY29udGV4dCByZXByZXNlbnRpbmcgaW50ZXJuYWwgKG5vbi11c2VyKSByZXF1ZXN0cy4gKi9cbiAgc3RhdGljIGludGVybmFsKCkge1xuICAgIHJldHVybiBuZXcgX0F1dGhDdHhJbXBsKHtcbiAgICAgIGlzSW50ZXJuYWw6IHRydWUsXG4gICAgICBqd3RTb3VyY2U6ICgpID0+IG51bGwsXG4gICAgICBzZW5kZXJJZGVudGl0eTogSWRlbnRpdHkuemVybygpXG4gICAgfSk7XG4gIH1cbiAgLyoqIElmIHRoZXJlIGlzIGEgY29ubmVjdGlvbiBpZCwgbG9vayB1cCB0aGUgSldUIHBheWxvYWQgZnJvbSB0aGUgc3lzdGVtIHRhYmxlcy4gKi9cbiAgc3RhdGljIGZyb21TeXN0ZW1UYWJsZXMoY29ubmVjdGlvbklkLCBzZW5kZXIpIHtcbiAgICBpZiAoY29ubmVjdGlvbklkID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gbmV3IF9BdXRoQ3R4SW1wbCh7XG4gICAgICAgIGlzSW50ZXJuYWw6IGZhbHNlLFxuICAgICAgICBqd3RTb3VyY2U6ICgpID0+IG51bGwsXG4gICAgICAgIHNlbmRlcklkZW50aXR5OiBzZW5kZXJcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IF9BdXRoQ3R4SW1wbCh7XG4gICAgICBpc0ludGVybmFsOiBmYWxzZSxcbiAgICAgIGp3dFNvdXJjZTogKCkgPT4ge1xuICAgICAgICBjb25zdCBwYXlsb2FkQnVmID0gc3lzLmdldF9qd3RfcGF5bG9hZChjb25uZWN0aW9uSWQuX19jb25uZWN0aW9uX2lkX18pO1xuICAgICAgICBpZiAocGF5bG9hZEJ1Zi5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBwYXlsb2FkU3RyID0gbmV3IFRleHREZWNvZGVyKCkuZGVjb2RlKHBheWxvYWRCdWYpO1xuICAgICAgICByZXR1cm4gcGF5bG9hZFN0cjtcbiAgICAgIH0sXG4gICAgICBzZW5kZXJJZGVudGl0eTogc2VuZGVyXG4gICAgfSk7XG4gIH1cbn07XG52YXIgUmVkdWNlckN0eEltcGwgPSBjbGFzcyBSZWR1Y2VyQ3R4IHtcbiAgI2lkZW50aXR5O1xuICAjc2VuZGVyQXV0aDtcbiAgI3V1aWRDb3VudGVyO1xuICAjcmFuZG9tO1xuICBzZW5kZXI7XG4gIHRpbWVzdGFtcDtcbiAgY29ubmVjdGlvbklkO1xuICBkYjtcbiAgY29uc3RydWN0b3Ioc2VuZGVyLCB0aW1lc3RhbXAsIGNvbm5lY3Rpb25JZCkge1xuICAgIE9iamVjdC5zZWFsKHRoaXMpO1xuICAgIHRoaXMuc2VuZGVyID0gc2VuZGVyO1xuICAgIHRoaXMudGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgIHRoaXMuY29ubmVjdGlvbklkID0gY29ubmVjdGlvbklkO1xuICAgIHRoaXMuZGIgPSBnZXREYlZpZXcoKTtcbiAgfVxuICBnZXQgaWRlbnRpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuI2lkZW50aXR5ID8/PSBuZXcgSWRlbnRpdHkoc3lzLmlkZW50aXR5KCkuX19pZGVudGl0eV9fKTtcbiAgfVxuICBnZXQgc2VuZGVyQXV0aCgpIHtcbiAgICByZXR1cm4gdGhpcy4jc2VuZGVyQXV0aCA/Pz0gQXV0aEN0eEltcGwuZnJvbVN5c3RlbVRhYmxlcyhcbiAgICAgIHRoaXMuY29ubmVjdGlvbklkLFxuICAgICAgdGhpcy5zZW5kZXJcbiAgICApO1xuICB9XG4gIGdldCByYW5kb20oKSB7XG4gICAgcmV0dXJuIHRoaXMuI3JhbmRvbSA/Pz0gbWFrZVJhbmRvbSh0aGlzLnRpbWVzdGFtcCk7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyByYW5kb20ge0BsaW5rIFV1aWR9IGB2NGAgdXNpbmcgdGhpcyBgUmVkdWNlckN0eGAncyBSTkcuXG4gICAqL1xuICBuZXdVdWlkVjQoKSB7XG4gICAgY29uc3QgYnl0ZXMgPSB0aGlzLnJhbmRvbS5maWxsKG5ldyBVaW50OEFycmF5KDE2KSk7XG4gICAgcmV0dXJuIFV1aWQuZnJvbVJhbmRvbUJ5dGVzVjQoYnl0ZXMpO1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgc29ydGFibGUge0BsaW5rIFV1aWR9IGB2N2AgdXNpbmcgdGhpcyBgUmVkdWNlckN0eGAncyBSTkcsIGNvdW50ZXIsXG4gICAqIGFuZCB0aW1lc3RhbXAuXG4gICAqL1xuICBuZXdVdWlkVjcoKSB7XG4gICAgY29uc3QgYnl0ZXMgPSB0aGlzLnJhbmRvbS5maWxsKG5ldyBVaW50OEFycmF5KDQpKTtcbiAgICBjb25zdCBjb3VudGVyID0gdGhpcy4jdXVpZENvdW50ZXIgPz89IHsgdmFsdWU6IDAgfTtcbiAgICByZXR1cm4gVXVpZC5mcm9tQ291bnRlclY3KGNvdW50ZXIsIHRoaXMudGltZXN0YW1wLCBieXRlcyk7XG4gIH1cbn07XG52YXIgY2FsbFVzZXJGdW5jdGlvbiA9IGZ1bmN0aW9uIF9fc3BhY2V0aW1lZGJfZW5kX3Nob3J0X2JhY2t0cmFjZShmbiwgLi4uYXJncykge1xuICByZXR1cm4gZm4oLi4uYXJncyk7XG59O1xudmFyIGhvb2tzID0ge1xuICBfX2Rlc2NyaWJlX21vZHVsZV9fKCkge1xuICAgIGNvbnN0IHdyaXRlciA9IG5ldyBCaW5hcnlXcml0ZXIoMTI4KTtcbiAgICBBbGdlYnJhaWNUeXBlLnNlcmlhbGl6ZVZhbHVlKFxuICAgICAgd3JpdGVyLFxuICAgICAgcmF3X21vZHVsZV9kZWZfdHlwZV9kZWZhdWx0LmFsZ2VicmFpY1R5cGUsXG4gICAgICByYXdfbW9kdWxlX2RlZl90eXBlX2RlZmF1bHQuVjkoTU9EVUxFX0RFRilcbiAgICApO1xuICAgIHJldHVybiB3cml0ZXIuZ2V0QnVmZmVyKCk7XG4gIH0sXG4gIF9fY2FsbF9yZWR1Y2VyX18ocmVkdWNlcklkLCBzZW5kZXIsIGNvbm5JZCwgdGltZXN0YW1wLCBhcmdzQnVmKSB7XG4gICAgY29uc3QgYXJnc1R5cGUgPSBNT0RVTEVfREVGLnJlZHVjZXJzW3JlZHVjZXJJZF0ucGFyYW1zO1xuICAgIGNvbnN0IGFyZ3MgPSBQcm9kdWN0VHlwZS5kZXNlcmlhbGl6ZVZhbHVlKFxuICAgICAgbmV3IEJpbmFyeVJlYWRlcihhcmdzQnVmKSxcbiAgICAgIGFyZ3NUeXBlLFxuICAgICAgTU9EVUxFX0RFRi50eXBlc3BhY2VcbiAgICApO1xuICAgIGNvbnN0IHNlbmRlcklkZW50aXR5ID0gbmV3IElkZW50aXR5KHNlbmRlcik7XG4gICAgY29uc3QgY3R4ID0gbmV3IFJlZHVjZXJDdHhJbXBsKFxuICAgICAgc2VuZGVySWRlbnRpdHksXG4gICAgICBuZXcgVGltZXN0YW1wKHRpbWVzdGFtcCksXG4gICAgICBDb25uZWN0aW9uSWQubnVsbElmWmVybyhuZXcgQ29ubmVjdGlvbklkKGNvbm5JZCkpXG4gICAgKTtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGNhbGxVc2VyRnVuY3Rpb24oUkVEVUNFUlNbcmVkdWNlcklkXSwgY3R4LCBhcmdzKSA/PyB7IHRhZzogXCJva1wiIH07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUgaW5zdGFuY2VvZiBTZW5kZXJFcnJvcikge1xuICAgICAgICByZXR1cm4geyB0YWc6IFwiZXJyXCIsIHZhbHVlOiBlLm1lc3NhZ2UgfTtcbiAgICAgIH1cbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG59O1xudmFyIGhvb2tzX3YxXzEgPSB7XG4gIF9fY2FsbF92aWV3X18oaWQsIHNlbmRlciwgYXJnc0J1Zikge1xuICAgIGNvbnN0IHsgZm4sIHBhcmFtcywgcmV0dXJuVHlwZSwgcmV0dXJuVHlwZUJhc2VTaXplIH0gPSBWSUVXU1tpZF07XG4gICAgY29uc3QgY3R4ID0gZnJlZXplMyh7XG4gICAgICBzZW5kZXI6IG5ldyBJZGVudGl0eShzZW5kZXIpLFxuICAgICAgLy8gdGhpcyBpcyB0aGUgbm9uLXJlYWRvbmx5IERiVmlldywgYnV0IHRoZSB0eXBpbmcgZm9yIHRoZSB1c2VyIHdpbGwgYmVcbiAgICAgIC8vIHRoZSByZWFkb25seSBvbmUsIGFuZCBpZiB0aGV5IGRvIGNhbGwgbXV0YXRpbmcgZnVuY3Rpb25zIGl0IHdpbGwgZmFpbFxuICAgICAgLy8gYXQgcnVudGltZVxuICAgICAgZGI6IGdldERiVmlldygpLFxuICAgICAgZnJvbTogbWFrZVF1ZXJ5QnVpbGRlcihnZXRSZWdpc3RlcmVkU2NoZW1hKCkpXG4gICAgfSk7XG4gICAgY29uc3QgYXJncyA9IFByb2R1Y3RUeXBlLmRlc2VyaWFsaXplVmFsdWUoXG4gICAgICBuZXcgQmluYXJ5UmVhZGVyKGFyZ3NCdWYpLFxuICAgICAgcGFyYW1zLFxuICAgICAgTU9EVUxFX0RFRi50eXBlc3BhY2VcbiAgICApO1xuICAgIGNvbnN0IHJldCA9IGNhbGxVc2VyRnVuY3Rpb24oZm4sIGN0eCwgYXJncyk7XG4gICAgY29uc3QgcmV0QnVmID0gbmV3IEJpbmFyeVdyaXRlcihyZXR1cm5UeXBlQmFzZVNpemUpO1xuICAgIGlmIChpc1Jvd1R5cGVkUXVlcnkocmV0KSkge1xuICAgICAgY29uc3QgcXVlcnkgPSB0b1NxbChyZXQpO1xuICAgICAgY29uc3QgdiA9IHZpZXdfcmVzdWx0X2hlYWRlcl90eXBlX2RlZmF1bHQuUmF3U3FsKHF1ZXJ5KTtcbiAgICAgIEFsZ2VicmFpY1R5cGUuc2VyaWFsaXplVmFsdWUoXG4gICAgICAgIHJldEJ1ZixcbiAgICAgICAgdmlld19yZXN1bHRfaGVhZGVyX3R5cGVfZGVmYXVsdC5hbGdlYnJhaWNUeXBlLFxuICAgICAgICB2LFxuICAgICAgICBNT0RVTEVfREVGLnR5cGVzcGFjZVxuICAgICAgKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRhdGE6IHJldEJ1Zi5nZXRCdWZmZXIoKVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgQWxnZWJyYWljVHlwZS5zZXJpYWxpemVWYWx1ZShcbiAgICAgICAgcmV0QnVmLFxuICAgICAgICB2aWV3X3Jlc3VsdF9oZWFkZXJfdHlwZV9kZWZhdWx0LmFsZ2VicmFpY1R5cGUsXG4gICAgICAgIHZpZXdfcmVzdWx0X2hlYWRlcl90eXBlX2RlZmF1bHQuUm93RGF0YSxcbiAgICAgICAgTU9EVUxFX0RFRi50eXBlc3BhY2VcbiAgICAgICk7XG4gICAgICBBbGdlYnJhaWNUeXBlLnNlcmlhbGl6ZVZhbHVlKFxuICAgICAgICByZXRCdWYsXG4gICAgICAgIHJldHVyblR5cGUsXG4gICAgICAgIHJldCxcbiAgICAgICAgTU9EVUxFX0RFRi50eXBlc3BhY2VcbiAgICAgICk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkYXRhOiByZXRCdWYuZ2V0QnVmZmVyKClcbiAgICAgIH07XG4gICAgfVxuICB9LFxuICBfX2NhbGxfdmlld19hbm9uX18oaWQsIGFyZ3NCdWYpIHtcbiAgICBjb25zdCB7IGZuLCBwYXJhbXMsIHJldHVyblR5cGUsIHJldHVyblR5cGVCYXNlU2l6ZSB9ID0gQU5PTl9WSUVXU1tpZF07XG4gICAgY29uc3QgY3R4ID0gZnJlZXplMyh7XG4gICAgICAvLyB0aGlzIGlzIHRoZSBub24tcmVhZG9ubHkgRGJWaWV3LCBidXQgdGhlIHR5cGluZyBmb3IgdGhlIHVzZXIgd2lsbCBiZVxuICAgICAgLy8gdGhlIHJlYWRvbmx5IG9uZSwgYW5kIGlmIHRoZXkgZG8gY2FsbCBtdXRhdGluZyBmdW5jdGlvbnMgaXQgd2lsbCBmYWlsXG4gICAgICAvLyBhdCBydW50aW1lXG4gICAgICBkYjogZ2V0RGJWaWV3KCksXG4gICAgICBmcm9tOiBtYWtlUXVlcnlCdWlsZGVyKGdldFJlZ2lzdGVyZWRTY2hlbWEoKSlcbiAgICB9KTtcbiAgICBjb25zdCBhcmdzID0gUHJvZHVjdFR5cGUuZGVzZXJpYWxpemVWYWx1ZShcbiAgICAgIG5ldyBCaW5hcnlSZWFkZXIoYXJnc0J1ZiksXG4gICAgICBwYXJhbXMsXG4gICAgICBNT0RVTEVfREVGLnR5cGVzcGFjZVxuICAgICk7XG4gICAgY29uc3QgcmV0ID0gY2FsbFVzZXJGdW5jdGlvbihmbiwgY3R4LCBhcmdzKTtcbiAgICBjb25zdCByZXRCdWYgPSBuZXcgQmluYXJ5V3JpdGVyKHJldHVyblR5cGVCYXNlU2l6ZSk7XG4gICAgaWYgKGlzUm93VHlwZWRRdWVyeShyZXQpKSB7XG4gICAgICBjb25zdCBxdWVyeSA9IHRvU3FsKHJldCk7XG4gICAgICBjb25zdCB2ID0gdmlld19yZXN1bHRfaGVhZGVyX3R5cGVfZGVmYXVsdC5SYXdTcWwocXVlcnkpO1xuICAgICAgQWxnZWJyYWljVHlwZS5zZXJpYWxpemVWYWx1ZShcbiAgICAgICAgcmV0QnVmLFxuICAgICAgICB2aWV3X3Jlc3VsdF9oZWFkZXJfdHlwZV9kZWZhdWx0LmFsZ2VicmFpY1R5cGUsXG4gICAgICAgIHYsXG4gICAgICAgIE1PRFVMRV9ERUYudHlwZXNwYWNlXG4gICAgICApO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGF0YTogcmV0QnVmLmdldEJ1ZmZlcigpXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBBbGdlYnJhaWNUeXBlLnNlcmlhbGl6ZVZhbHVlKFxuICAgICAgICByZXRCdWYsXG4gICAgICAgIHZpZXdfcmVzdWx0X2hlYWRlcl90eXBlX2RlZmF1bHQuYWxnZWJyYWljVHlwZSxcbiAgICAgICAgdmlld19yZXN1bHRfaGVhZGVyX3R5cGVfZGVmYXVsdC5Sb3dEYXRhLFxuICAgICAgICBNT0RVTEVfREVGLnR5cGVzcGFjZVxuICAgICAgKTtcbiAgICAgIEFsZ2VicmFpY1R5cGUuc2VyaWFsaXplVmFsdWUoXG4gICAgICAgIHJldEJ1ZixcbiAgICAgICAgcmV0dXJuVHlwZSxcbiAgICAgICAgcmV0LFxuICAgICAgICBNT0RVTEVfREVGLnR5cGVzcGFjZVxuICAgICAgKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRhdGE6IHJldEJ1Zi5nZXRCdWZmZXIoKVxuICAgICAgfTtcbiAgICB9XG4gIH1cbn07XG52YXIgaG9va3NfdjFfMiA9IHtcbiAgX19jYWxsX3Byb2NlZHVyZV9fKGlkLCBzZW5kZXIsIGNvbm5lY3Rpb25faWQsIHRpbWVzdGFtcCwgYXJncykge1xuICAgIHJldHVybiBjYWxsUHJvY2VkdXJlKFxuICAgICAgaWQsXG4gICAgICBuZXcgSWRlbnRpdHkoc2VuZGVyKSxcbiAgICAgIENvbm5lY3Rpb25JZC5udWxsSWZaZXJvKG5ldyBDb25uZWN0aW9uSWQoY29ubmVjdGlvbl9pZCkpLFxuICAgICAgbmV3IFRpbWVzdGFtcCh0aW1lc3RhbXApLFxuICAgICAgYXJnc1xuICAgICk7XG4gIH1cbn07XG52YXIgREJfVklFVyA9IG51bGw7XG5mdW5jdGlvbiBnZXREYlZpZXcoKSB7XG4gIERCX1ZJRVcgPz89IG1ha2VEYlZpZXcoTU9EVUxFX0RFRik7XG4gIHJldHVybiBEQl9WSUVXO1xufVxuZnVuY3Rpb24gbWFrZURiVmlldyhtb2R1bGVEZWYpIHtcbiAgcmV0dXJuIGZyZWV6ZTMoXG4gICAgT2JqZWN0LmZyb21FbnRyaWVzKFxuICAgICAgbW9kdWxlRGVmLnRhYmxlcy5tYXAoKHRhYmxlMikgPT4gW1xuICAgICAgICB0b0NhbWVsQ2FzZSh0YWJsZTIubmFtZSksXG4gICAgICAgIG1ha2VUYWJsZVZpZXcobW9kdWxlRGVmLnR5cGVzcGFjZSwgdGFibGUyKVxuICAgICAgXSlcbiAgICApXG4gICk7XG59XG5mdW5jdGlvbiBtYWtlVGFibGVWaWV3KHR5cGVzcGFjZSwgdGFibGUyKSB7XG4gIGNvbnN0IHRhYmxlX2lkID0gc3lzLnRhYmxlX2lkX2Zyb21fbmFtZSh0YWJsZTIubmFtZSk7XG4gIGNvbnN0IHJvd1R5cGUgPSB0eXBlc3BhY2UudHlwZXNbdGFibGUyLnByb2R1Y3RUeXBlUmVmXTtcbiAgaWYgKHJvd1R5cGUudGFnICE9PSBcIlByb2R1Y3RcIikge1xuICAgIHRocm93IFwiaW1wb3NzaWJsZVwiO1xuICB9XG4gIGNvbnN0IGJhc2VTaXplID0gYnNhdG5CYXNlU2l6ZSh0eXBlc3BhY2UsIHJvd1R5cGUpO1xuICBjb25zdCBzZXF1ZW5jZXMgPSB0YWJsZTIuc2VxdWVuY2VzLm1hcCgoc2VxKSA9PiB7XG4gICAgY29uc3QgY29sID0gcm93VHlwZS52YWx1ZS5lbGVtZW50c1tzZXEuY29sdW1uXTtcbiAgICBjb25zdCBjb2xUeXBlID0gY29sLmFsZ2VicmFpY1R5cGU7XG4gICAgbGV0IHNlcXVlbmNlVHJpZ2dlcjtcbiAgICBzd2l0Y2ggKGNvbFR5cGUudGFnKSB7XG4gICAgICBjYXNlIFwiVThcIjpcbiAgICAgIGNhc2UgXCJJOFwiOlxuICAgICAgY2FzZSBcIlUxNlwiOlxuICAgICAgY2FzZSBcIkkxNlwiOlxuICAgICAgY2FzZSBcIlUzMlwiOlxuICAgICAgY2FzZSBcIkkzMlwiOlxuICAgICAgICBzZXF1ZW5jZVRyaWdnZXIgPSAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJVNjRcIjpcbiAgICAgIGNhc2UgXCJJNjRcIjpcbiAgICAgIGNhc2UgXCJVMTI4XCI6XG4gICAgICBjYXNlIFwiSTEyOFwiOlxuICAgICAgY2FzZSBcIlUyNTZcIjpcbiAgICAgIGNhc2UgXCJJMjU2XCI6XG4gICAgICAgIHNlcXVlbmNlVHJpZ2dlciA9IDBuO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJpbnZhbGlkIHNlcXVlbmNlIHR5cGVcIik7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBjb2xOYW1lOiBjb2wubmFtZSxcbiAgICAgIHNlcXVlbmNlVHJpZ2dlcixcbiAgICAgIHJlYWQ6IChyZWFkZXIpID0+IEFsZ2VicmFpY1R5cGUuZGVzZXJpYWxpemVWYWx1ZShyZWFkZXIsIGNvbFR5cGUsIHR5cGVzcGFjZSlcbiAgICB9O1xuICB9KTtcbiAgY29uc3QgaGFzQXV0b0luY3JlbWVudCA9IHNlcXVlbmNlcy5sZW5ndGggPiAwO1xuICBjb25zdCBpdGVyID0gKCkgPT4gdGFibGVJdGVyYXRvcihzeXMuZGF0YXN0b3JlX3RhYmxlX3NjYW5fYnNhdG4odGFibGVfaWQpLCByb3dUeXBlKTtcbiAgY29uc3QgaW50ZWdyYXRlR2VuZXJhdGVkQ29sdW1ucyA9IGhhc0F1dG9JbmNyZW1lbnQgPyAocm93LCByZXRfYnVmKSA9PiB7XG4gICAgY29uc3QgcmVhZGVyID0gbmV3IEJpbmFyeVJlYWRlcihyZXRfYnVmKTtcbiAgICBmb3IgKGNvbnN0IHsgY29sTmFtZSwgcmVhZCwgc2VxdWVuY2VUcmlnZ2VyIH0gb2Ygc2VxdWVuY2VzKSB7XG4gICAgICBpZiAocm93W2NvbE5hbWVdID09PSBzZXF1ZW5jZVRyaWdnZXIpIHtcbiAgICAgICAgcm93W2NvbE5hbWVdID0gcmVhZChyZWFkZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfSA6IG51bGw7XG4gIGNvbnN0IHRhYmxlTWV0aG9kcyA9IHtcbiAgICBjb3VudDogKCkgPT4gc3lzLmRhdGFzdG9yZV90YWJsZV9yb3dfY291bnQodGFibGVfaWQpLFxuICAgIGl0ZXIsXG4gICAgW1N5bWJvbC5pdGVyYXRvcl06ICgpID0+IGl0ZXIoKSxcbiAgICBpbnNlcnQ6IChyb3cpID0+IHtcbiAgICAgIGNvbnN0IHdyaXRlciA9IG5ldyBCaW5hcnlXcml0ZXIoYmFzZVNpemUpO1xuICAgICAgQWxnZWJyYWljVHlwZS5zZXJpYWxpemVWYWx1ZSh3cml0ZXIsIHJvd1R5cGUsIHJvdywgdHlwZXNwYWNlKTtcbiAgICAgIGNvbnN0IHJldF9idWYgPSBzeXMuZGF0YXN0b3JlX2luc2VydF9ic2F0bih0YWJsZV9pZCwgd3JpdGVyLmdldEJ1ZmZlcigpKTtcbiAgICAgIGNvbnN0IHJldCA9IHsgLi4ucm93IH07XG4gICAgICBpbnRlZ3JhdGVHZW5lcmF0ZWRDb2x1bW5zPy4ocmV0LCByZXRfYnVmKTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSxcbiAgICBkZWxldGU6IChyb3cpID0+IHtcbiAgICAgIGNvbnN0IHdyaXRlciA9IG5ldyBCaW5hcnlXcml0ZXIoNCArIGJhc2VTaXplKTtcbiAgICAgIHdyaXRlci53cml0ZVUzMigxKTtcbiAgICAgIEFsZ2VicmFpY1R5cGUuc2VyaWFsaXplVmFsdWUod3JpdGVyLCByb3dUeXBlLCByb3csIHR5cGVzcGFjZSk7XG4gICAgICBjb25zdCBjb3VudCA9IHN5cy5kYXRhc3RvcmVfZGVsZXRlX2FsbF9ieV9lcV9ic2F0bihcbiAgICAgICAgdGFibGVfaWQsXG4gICAgICAgIHdyaXRlci5nZXRCdWZmZXIoKVxuICAgICAgKTtcbiAgICAgIHJldHVybiBjb3VudCA+IDA7XG4gICAgfVxuICB9O1xuICBjb25zdCB0YWJsZVZpZXcgPSBPYmplY3QuYXNzaWduKFxuICAgIC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgIHRhYmxlTWV0aG9kc1xuICApO1xuICBmb3IgKGNvbnN0IGluZGV4RGVmIG9mIHRhYmxlMi5pbmRleGVzKSB7XG4gICAgY29uc3QgaW5kZXhfaWQgPSBzeXMuaW5kZXhfaWRfZnJvbV9uYW1lKGluZGV4RGVmLm5hbWUpO1xuICAgIGxldCBjb2x1bW5faWRzO1xuICAgIHN3aXRjaCAoaW5kZXhEZWYuYWxnb3JpdGhtLnRhZykge1xuICAgICAgY2FzZSBcIkJUcmVlXCI6XG4gICAgICAgIGNvbHVtbl9pZHMgPSBpbmRleERlZi5hbGdvcml0aG0udmFsdWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkhhc2hcIjpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW1wb3NzaWJsZVwiKTtcbiAgICAgIGNhc2UgXCJEaXJlY3RcIjpcbiAgICAgICAgY29sdW1uX2lkcyA9IFtpbmRleERlZi5hbGdvcml0aG0udmFsdWVdO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgY29uc3QgbnVtQ29sdW1ucyA9IGNvbHVtbl9pZHMubGVuZ3RoO1xuICAgIGNvbnN0IGNvbHVtblNldCA9IG5ldyBTZXQoY29sdW1uX2lkcyk7XG4gICAgY29uc3QgaXNVbmlxdWUgPSB0YWJsZTIuY29uc3RyYWludHMuZmlsdGVyKCh4KSA9PiB4LmRhdGEudGFnID09PSBcIlVuaXF1ZVwiKS5zb21lKCh4KSA9PiBjb2x1bW5TZXQuaXNTdWJzZXRPZihuZXcgU2V0KHguZGF0YS52YWx1ZS5jb2x1bW5zKSkpO1xuICAgIGNvbnN0IGluZGV4VHlwZSA9IEFsZ2VicmFpY1R5cGUuUHJvZHVjdCh7XG4gICAgICBlbGVtZW50czogY29sdW1uX2lkcy5tYXAoKGlkKSA9PiByb3dUeXBlLnZhbHVlLmVsZW1lbnRzW2lkXSlcbiAgICB9KTtcbiAgICBjb25zdCBiYXNlU2l6ZTIgPSBic2F0bkJhc2VTaXplKHR5cGVzcGFjZSwgaW5kZXhUeXBlKTtcbiAgICBjb25zdCBzZXJpYWxpemVQcmVmaXggPSAod3JpdGVyLCBwcmVmaXgsIHByZWZpeF9lbGVtcykgPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmVmaXhfZWxlbXM7IGkrKykge1xuICAgICAgICBjb25zdCBlbGVtVHlwZSA9IGluZGV4VHlwZS52YWx1ZS5lbGVtZW50c1tpXS5hbGdlYnJhaWNUeXBlO1xuICAgICAgICBBbGdlYnJhaWNUeXBlLnNlcmlhbGl6ZVZhbHVlKHdyaXRlciwgZWxlbVR5cGUsIHByZWZpeFtpXSwgdHlwZXNwYWNlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3cml0ZXI7XG4gICAgfTtcbiAgICBjb25zdCBzZXJpYWxpemVQb2ludCA9IChjb2xWYWwpID0+IHtcbiAgICAgIGNvbnN0IHdyaXRlciA9IG5ldyBCaW5hcnlXcml0ZXIoYmFzZVNpemUyKTtcbiAgICAgIHNlcmlhbGl6ZVByZWZpeCh3cml0ZXIsIGNvbFZhbCwgbnVtQ29sdW1ucyk7XG4gICAgICByZXR1cm4gd3JpdGVyLmdldEJ1ZmZlcigpO1xuICAgIH07XG4gICAgY29uc3Qgc2luZ2xlRWxlbWVudCA9IG51bUNvbHVtbnMgPT09IDEgPyBpbmRleFR5cGUudmFsdWUuZWxlbWVudHNbMF0uYWxnZWJyYWljVHlwZSA6IG51bGw7XG4gICAgY29uc3Qgc2VyaWFsaXplU2luZ2xlUG9pbnQgPSBzaW5nbGVFbGVtZW50ICYmICgoY29sVmFsKSA9PiB7XG4gICAgICBjb25zdCB3cml0ZXIgPSBuZXcgQmluYXJ5V3JpdGVyKGJhc2VTaXplMik7XG4gICAgICBBbGdlYnJhaWNUeXBlLnNlcmlhbGl6ZVZhbHVlKHdyaXRlciwgc2luZ2xlRWxlbWVudCwgY29sVmFsLCB0eXBlc3BhY2UpO1xuICAgICAgcmV0dXJuIHdyaXRlci5nZXRCdWZmZXIoKTtcbiAgICB9KTtcbiAgICBsZXQgaW5kZXg7XG4gICAgaWYgKGlzVW5pcXVlICYmIHNlcmlhbGl6ZVNpbmdsZVBvaW50KSB7XG4gICAgICBpbmRleCA9IHtcbiAgICAgICAgZmluZDogKGNvbFZhbCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHBvaW50ID0gc2VyaWFsaXplU2luZ2xlUG9pbnQoY29sVmFsKTtcbiAgICAgICAgICBjb25zdCBpdGVyMiA9IHRhYmxlSXRlcmF0b3IoXG4gICAgICAgICAgICBzeXMuZGF0YXN0b3JlX2luZGV4X3NjYW5fcG9pbnRfYnNhdG4oaW5kZXhfaWQsIHBvaW50KSxcbiAgICAgICAgICAgIHJvd1R5cGVcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IHsgdmFsdWUsIGRvbmUgfSA9IGl0ZXIyLm5leHQoKTtcbiAgICAgICAgICBpZiAoZG9uZSkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgaWYgKCFpdGVyMi5uZXh0KCkuZG9uZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgXCJgZGF0YXN0b3JlX2luZGV4X3NjYW5fcmFuZ2VfYnNhdG5gIG9uIHVuaXF1ZSBmaWVsZCBjYW5ub3QgcmV0dXJuID4xIHJvd3NcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIGRlbGV0ZTogKGNvbFZhbCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHBvaW50ID0gc2VyaWFsaXplU2luZ2xlUG9pbnQoY29sVmFsKTtcbiAgICAgICAgICBjb25zdCBudW0gPSBzeXMuZGF0YXN0b3JlX2RlbGV0ZV9ieV9pbmRleF9zY2FuX3BvaW50X2JzYXRuKFxuICAgICAgICAgICAgaW5kZXhfaWQsXG4gICAgICAgICAgICBwb2ludFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIG51bSA+IDA7XG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZTogKHJvdykgPT4ge1xuICAgICAgICAgIGNvbnN0IHdyaXRlciA9IG5ldyBCaW5hcnlXcml0ZXIoYmFzZVNpemUyKTtcbiAgICAgICAgICBBbGdlYnJhaWNUeXBlLnNlcmlhbGl6ZVZhbHVlKHdyaXRlciwgcm93VHlwZSwgcm93LCB0eXBlc3BhY2UpO1xuICAgICAgICAgIGNvbnN0IHJldF9idWYgPSBzeXMuZGF0YXN0b3JlX3VwZGF0ZV9ic2F0bihcbiAgICAgICAgICAgIHRhYmxlX2lkLFxuICAgICAgICAgICAgaW5kZXhfaWQsXG4gICAgICAgICAgICB3cml0ZXIuZ2V0QnVmZmVyKClcbiAgICAgICAgICApO1xuICAgICAgICAgIGludGVncmF0ZUdlbmVyYXRlZENvbHVtbnM/Lihyb3csIHJldF9idWYpO1xuICAgICAgICAgIHJldHVybiByb3c7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChpc1VuaXF1ZSkge1xuICAgICAgaW5kZXggPSB7XG4gICAgICAgIGZpbmQ6IChjb2xWYWwpID0+IHtcbiAgICAgICAgICBpZiAoY29sVmFsLmxlbmd0aCAhPT0gbnVtQ29sdW1ucykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIndyb25nIG51bWJlciBvZiBlbGVtZW50c1wiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgcG9pbnQgPSBzZXJpYWxpemVQb2ludChjb2xWYWwpO1xuICAgICAgICAgIGNvbnN0IGl0ZXIyID0gdGFibGVJdGVyYXRvcihcbiAgICAgICAgICAgIHN5cy5kYXRhc3RvcmVfaW5kZXhfc2Nhbl9wb2ludF9ic2F0bihpbmRleF9pZCwgcG9pbnQpLFxuICAgICAgICAgICAgcm93VHlwZVxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgeyB2YWx1ZSwgZG9uZSB9ID0gaXRlcjIubmV4dCgpO1xuICAgICAgICAgIGlmIChkb25lKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICBpZiAoIWl0ZXIyLm5leHQoKS5kb25lKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBcImBkYXRhc3RvcmVfaW5kZXhfc2Nhbl9yYW5nZV9ic2F0bmAgb24gdW5pcXVlIGZpZWxkIGNhbm5vdCByZXR1cm4gPjEgcm93c1wiXG4gICAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZGVsZXRlOiAoY29sVmFsKSA9PiB7XG4gICAgICAgICAgaWYgKGNvbFZhbC5sZW5ndGggIT09IG51bUNvbHVtbnMpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwid3JvbmcgbnVtYmVyIG9mIGVsZW1lbnRzXCIpO1xuICAgICAgICAgIGNvbnN0IHBvaW50ID0gc2VyaWFsaXplUG9pbnQoY29sVmFsKTtcbiAgICAgICAgICBjb25zdCBudW0gPSBzeXMuZGF0YXN0b3JlX2RlbGV0ZV9ieV9pbmRleF9zY2FuX3BvaW50X2JzYXRuKFxuICAgICAgICAgICAgaW5kZXhfaWQsXG4gICAgICAgICAgICBwb2ludFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIG51bSA+IDA7XG4gICAgICAgIH0sXG4gICAgICAgIHVwZGF0ZTogKHJvdykgPT4ge1xuICAgICAgICAgIGNvbnN0IHdyaXRlciA9IG5ldyBCaW5hcnlXcml0ZXIoYmFzZVNpemUyKTtcbiAgICAgICAgICBBbGdlYnJhaWNUeXBlLnNlcmlhbGl6ZVZhbHVlKHdyaXRlciwgcm93VHlwZSwgcm93LCB0eXBlc3BhY2UpO1xuICAgICAgICAgIGNvbnN0IHJldF9idWYgPSBzeXMuZGF0YXN0b3JlX3VwZGF0ZV9ic2F0bihcbiAgICAgICAgICAgIHRhYmxlX2lkLFxuICAgICAgICAgICAgaW5kZXhfaWQsXG4gICAgICAgICAgICB3cml0ZXIuZ2V0QnVmZmVyKClcbiAgICAgICAgICApO1xuICAgICAgICAgIGludGVncmF0ZUdlbmVyYXRlZENvbHVtbnM/Lihyb3csIHJldF9idWYpO1xuICAgICAgICAgIHJldHVybiByb3c7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChzZXJpYWxpemVTaW5nbGVQb2ludCkge1xuICAgICAgaW5kZXggPSB7XG4gICAgICAgIGZpbHRlcjogKHJhbmdlKSA9PiB7XG4gICAgICAgICAgY29uc3QgcG9pbnQgPSBzZXJpYWxpemVTaW5nbGVQb2ludChyYW5nZSk7XG4gICAgICAgICAgcmV0dXJuIHRhYmxlSXRlcmF0b3IoXG4gICAgICAgICAgICBzeXMuZGF0YXN0b3JlX2luZGV4X3NjYW5fcG9pbnRfYnNhdG4oaW5kZXhfaWQsIHBvaW50KSxcbiAgICAgICAgICAgIHJvd1R5cGVcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBkZWxldGU6IChyYW5nZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHBvaW50ID0gc2VyaWFsaXplU2luZ2xlUG9pbnQocmFuZ2UpO1xuICAgICAgICAgIHJldHVybiBzeXMuZGF0YXN0b3JlX2RlbGV0ZV9ieV9pbmRleF9zY2FuX3BvaW50X2JzYXRuKFxuICAgICAgICAgICAgaW5kZXhfaWQsXG4gICAgICAgICAgICBwb2ludFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNlcmlhbGl6ZVJhbmdlID0gKHJhbmdlKSA9PiB7XG4gICAgICAgIGlmIChyYW5nZS5sZW5ndGggPiBudW1Db2x1bW5zKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwidG9vIG1hbnkgZWxlbWVudHNcIik7XG4gICAgICAgIGNvbnN0IHdyaXRlciA9IG5ldyBCaW5hcnlXcml0ZXIoYmFzZVNpemUyICsgMSk7XG4gICAgICAgIGNvbnN0IHByZWZpeF9lbGVtcyA9IHJhbmdlLmxlbmd0aCAtIDE7XG4gICAgICAgIHNlcmlhbGl6ZVByZWZpeCh3cml0ZXIsIHJhbmdlLCBwcmVmaXhfZWxlbXMpO1xuICAgICAgICBjb25zdCByc3RhcnRPZmZzZXQgPSB3cml0ZXIub2Zmc2V0O1xuICAgICAgICBjb25zdCB0ZXJtID0gcmFuZ2VbcmFuZ2UubGVuZ3RoIC0gMV07XG4gICAgICAgIGNvbnN0IHRlcm1UeXBlID0gaW5kZXhUeXBlLnZhbHVlLmVsZW1lbnRzW3JhbmdlLmxlbmd0aCAtIDFdLmFsZ2VicmFpY1R5cGU7XG4gICAgICAgIGxldCByc3RhcnQsIHJlbmQ7XG4gICAgICAgIGlmICh0ZXJtIGluc3RhbmNlb2YgUmFuZ2UpIHtcbiAgICAgICAgICBjb25zdCB3cml0ZUJvdW5kID0gKGJvdW5kKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YWdzID0geyBpbmNsdWRlZDogMCwgZXhjbHVkZWQ6IDEsIHVuYm91bmRlZDogMiB9O1xuICAgICAgICAgICAgd3JpdGVyLndyaXRlVTgodGFnc1tib3VuZC50YWddKTtcbiAgICAgICAgICAgIGlmIChib3VuZC50YWcgIT09IFwidW5ib3VuZGVkXCIpXG4gICAgICAgICAgICAgIEFsZ2VicmFpY1R5cGUuc2VyaWFsaXplVmFsdWUoXG4gICAgICAgICAgICAgICAgd3JpdGVyLFxuICAgICAgICAgICAgICAgIHRlcm1UeXBlLFxuICAgICAgICAgICAgICAgIGJvdW5kLnZhbHVlLFxuICAgICAgICAgICAgICAgIHR5cGVzcGFjZVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgIH07XG4gICAgICAgICAgd3JpdGVCb3VuZCh0ZXJtLmZyb20pO1xuICAgICAgICAgIGNvbnN0IHJlbmRPZmZzZXQgPSB3cml0ZXIub2Zmc2V0O1xuICAgICAgICAgIHdyaXRlQm91bmQodGVybS50byk7XG4gICAgICAgICAgcnN0YXJ0ID0gd3JpdGVyLmdldEJ1ZmZlcigpLnNsaWNlKHJzdGFydE9mZnNldCwgcmVuZE9mZnNldCk7XG4gICAgICAgICAgcmVuZCA9IHdyaXRlci5nZXRCdWZmZXIoKS5zbGljZShyZW5kT2Zmc2V0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3cml0ZXIud3JpdGVVOCgwKTtcbiAgICAgICAgICBBbGdlYnJhaWNUeXBlLnNlcmlhbGl6ZVZhbHVlKHdyaXRlciwgdGVybVR5cGUsIHRlcm0sIHR5cGVzcGFjZSk7XG4gICAgICAgICAgcnN0YXJ0ID0gcmVuZCA9IHdyaXRlci5nZXRCdWZmZXIoKS5zbGljZShyc3RhcnRPZmZzZXQpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IHdyaXRlci5nZXRCdWZmZXIoKTtcbiAgICAgICAgY29uc3QgcHJlZml4ID0gYnVmZmVyLnNsaWNlKDAsIHJzdGFydE9mZnNldCk7XG4gICAgICAgIHJldHVybiBbcHJlZml4LCBwcmVmaXhfZWxlbXMsIHJzdGFydCwgcmVuZF07XG4gICAgICB9O1xuICAgICAgaW5kZXggPSB7XG4gICAgICAgIGZpbHRlcjogKHJhbmdlKSA9PiB7XG4gICAgICAgICAgaWYgKHJhbmdlLmxlbmd0aCA9PT0gbnVtQ29sdW1ucykge1xuICAgICAgICAgICAgY29uc3QgcG9pbnQgPSBzZXJpYWxpemVQb2ludChyYW5nZSk7XG4gICAgICAgICAgICByZXR1cm4gdGFibGVJdGVyYXRvcihcbiAgICAgICAgICAgICAgc3lzLmRhdGFzdG9yZV9pbmRleF9zY2FuX3BvaW50X2JzYXRuKGluZGV4X2lkLCBwb2ludCksXG4gICAgICAgICAgICAgIHJvd1R5cGVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSBzZXJpYWxpemVSYW5nZShyYW5nZSk7XG4gICAgICAgICAgICByZXR1cm4gdGFibGVJdGVyYXRvcihcbiAgICAgICAgICAgICAgc3lzLmRhdGFzdG9yZV9pbmRleF9zY2FuX3JhbmdlX2JzYXRuKGluZGV4X2lkLCAuLi5hcmdzKSxcbiAgICAgICAgICAgICAgcm93VHlwZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRlbGV0ZTogKHJhbmdlKSA9PiB7XG4gICAgICAgICAgaWYgKHJhbmdlLmxlbmd0aCA9PT0gbnVtQ29sdW1ucykge1xuICAgICAgICAgICAgY29uc3QgcG9pbnQgPSBzZXJpYWxpemVQb2ludChyYW5nZSk7XG4gICAgICAgICAgICByZXR1cm4gc3lzLmRhdGFzdG9yZV9kZWxldGVfYnlfaW5kZXhfc2Nhbl9wb2ludF9ic2F0bihcbiAgICAgICAgICAgICAgaW5kZXhfaWQsXG4gICAgICAgICAgICAgIHBvaW50XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBhcmdzID0gc2VyaWFsaXplUmFuZ2UocmFuZ2UpO1xuICAgICAgICAgICAgcmV0dXJuIHN5cy5kYXRhc3RvcmVfZGVsZXRlX2J5X2luZGV4X3NjYW5fcmFuZ2VfYnNhdG4oXG4gICAgICAgICAgICAgIGluZGV4X2lkLFxuICAgICAgICAgICAgICAuLi5hcmdzXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKE9iamVjdC5oYXNPd24odGFibGVWaWV3LCBpbmRleERlZi5hY2Nlc3Nvck5hbWUpKSB7XG4gICAgICBmcmVlemUzKE9iamVjdC5hc3NpZ24odGFibGVWaWV3W2luZGV4RGVmLmFjY2Vzc29yTmFtZV0sIGluZGV4KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhYmxlVmlld1tpbmRleERlZi5hY2Nlc3Nvck5hbWVdID0gZnJlZXplMyhpbmRleCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBmcmVlemUzKHRhYmxlVmlldyk7XG59XG5mdW5jdGlvbiBoYXNPd24obywgaykge1xuICByZXR1cm4gT2JqZWN0Lmhhc093bihvLCBrKTtcbn1cbmZ1bmN0aW9uKiB0YWJsZUl0ZXJhdG9yKGlkLCB0eSkge1xuICB2YXIgX3N0YWNrID0gW107XG4gIHRyeSB7XG4gICAgY29uc3QgaXRlciA9IF9fdXNpbmcoX3N0YWNrLCBuZXcgSXRlcmF0b3JIYW5kbGUoaWQpKTtcbiAgICBjb25zdCB7IHR5cGVzcGFjZSB9ID0gTU9EVUxFX0RFRjtcbiAgICBsZXQgYnVmO1xuICAgIHdoaWxlICgoYnVmID0gYWR2YW5jZUl0ZXIoaXRlcikpICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBCaW5hcnlSZWFkZXIoYnVmKTtcbiAgICAgIHdoaWxlIChyZWFkZXIucmVtYWluaW5nID4gMCkge1xuICAgICAgICB5aWVsZCBBbGdlYnJhaWNUeXBlLmRlc2VyaWFsaXplVmFsdWUocmVhZGVyLCB0eSwgdHlwZXNwYWNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gY2F0Y2ggKF8pIHtcbiAgICB2YXIgX2Vycm9yID0gXywgX2hhc0Vycm9yID0gdHJ1ZTtcbiAgfSBmaW5hbGx5IHtcbiAgICBfX2NhbGxEaXNwb3NlKF9zdGFjaywgX2Vycm9yLCBfaGFzRXJyb3IpO1xuICB9XG59XG5mdW5jdGlvbiBhZHZhbmNlSXRlcihpdGVyKSB7XG4gIGxldCBidWZfbWF4X2xlbiA9IDY1NTM2O1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gaXRlci5hZHZhbmNlKGJ1Zl9tYXhfbGVuKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZSAmJiB0eXBlb2YgZSA9PT0gXCJvYmplY3RcIiAmJiBoYXNPd24oZSwgXCJfX2J1ZmZlcl90b29fc21hbGxfX1wiKSkge1xuICAgICAgICBidWZfbWF4X2xlbiA9IGUuX19idWZmZXJfdG9vX3NtYWxsX187XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cbn1cbnZhciBJdGVyYXRvckhhbmRsZSA9IGNsYXNzIF9JdGVyYXRvckhhbmRsZSB7XG4gICNpZDtcbiAgc3RhdGljICNmaW5hbGl6YXRpb25SZWdpc3RyeSA9IG5ldyBGaW5hbGl6YXRpb25SZWdpc3RyeShcbiAgICBzeXMucm93X2l0ZXJfYnNhdG5fY2xvc2VcbiAgKTtcbiAgY29uc3RydWN0b3IoaWQpIHtcbiAgICB0aGlzLiNpZCA9IGlkO1xuICAgIF9JdGVyYXRvckhhbmRsZS4jZmluYWxpemF0aW9uUmVnaXN0cnkucmVnaXN0ZXIodGhpcywgaWQsIHRoaXMpO1xuICB9XG4gIC8qKiBVbnJlZ2lzdGVyIHRoaXMgb2JqZWN0IHdpdGggdGhlIGZpbmFsaXphdGlvbiByZWdpc3RyeSBhbmQgcmV0dXJuIHRoZSBpZCAqL1xuICAjZGV0YWNoKCkge1xuICAgIGNvbnN0IGlkID0gdGhpcy4jaWQ7XG4gICAgdGhpcy4jaWQgPSAtMTtcbiAgICBfSXRlcmF0b3JIYW5kbGUuI2ZpbmFsaXphdGlvblJlZ2lzdHJ5LnVucmVnaXN0ZXIodGhpcyk7XG4gICAgcmV0dXJuIGlkO1xuICB9XG4gIC8qKiBDYWxsIGByb3dfaXRlcl9ic2F0bl9hZHZhbmNlYCwgcmV0dXJuaW5nIG51bGwgaWYgdGhpcyBpdGVyYXRvciB3YXMgYWxyZWFkeSBleGhhdXN0ZWQuICovXG4gIGFkdmFuY2UoYnVmX21heF9sZW4pIHtcbiAgICBpZiAodGhpcy4jaWQgPT09IC0xKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCB7IDA6IGRvbmUsIDE6IGJ1ZiB9ID0gc3lzLnJvd19pdGVyX2JzYXRuX2FkdmFuY2UoXG4gICAgICB0aGlzLiNpZCxcbiAgICAgIGJ1Zl9tYXhfbGVuXG4gICAgKTtcbiAgICBpZiAoZG9uZSkgdGhpcy4jZGV0YWNoKCk7XG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuICBbU3ltYm9sLmRpc3Bvc2VdKCkge1xuICAgIGlmICh0aGlzLiNpZCA+PSAwKSB7XG4gICAgICBjb25zdCBpZCA9IHRoaXMuI2RldGFjaCgpO1xuICAgICAgc3lzLnJvd19pdGVyX2JzYXRuX2Nsb3NlKGlkKTtcbiAgICB9XG4gIH1cbn07XG5mdW5jdGlvbiB3cmFwU3lzY2FsbHMoLi4ubW9kdWxlcykge1xuICByZXR1cm4gT2JqZWN0LmZyb21FbnRyaWVzKFxuICAgIG1vZHVsZXMuZmxhdE1hcChPYmplY3QuZW50cmllcykubWFwKChbaywgdl0pID0+IFtrLCB3cmFwU3lzY2FsbCh2KV0pXG4gICk7XG59XG5mdW5jdGlvbiB3cmFwU3lzY2FsbChmdW5jKSB7XG4gIGNvbnN0IG5hbWUgPSBmdW5jLm5hbWU7XG4gIHJldHVybiB7XG4gICAgW25hbWVdKC4uLmFyZ3MpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBmdW5jKC4uLmFyZ3MpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoZSAhPT0gbnVsbCAmJiB0eXBlb2YgZSA9PT0gXCJvYmplY3RcIiAmJiBoYXNPd24oZSwgXCJfX2NvZGVfZXJyb3JfX1wiKSAmJiB0eXBlb2YgZS5fX2NvZGVfZXJyb3JfXyA9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGhhc093bihlLCBcIl9fZXJyb3JfbWVzc2FnZV9fXCIpICYmIHR5cGVvZiBlLl9fZXJyb3JfbWVzc2FnZV9fID09PSBcInN0cmluZ1wiID8gZS5fX2Vycm9yX21lc3NhZ2VfXyA6IHZvaWQgMDtcbiAgICAgICAgICB0aHJvdyBuZXcgU3BhY2V0aW1lSG9zdEVycm9yKGUuX19jb2RlX2Vycm9yX18sIG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9W25hbWVdO1xufVxuZnVuY3Rpb24gZm10TG9nKC4uLmRhdGEpIHtcbiAgcmV0dXJuIGRhdGEuam9pbihcIiBcIik7XG59XG52YXIgY29uc29sZV9sZXZlbF9lcnJvciA9IDA7XG52YXIgY29uc29sZV9sZXZlbF93YXJuID0gMTtcbnZhciBjb25zb2xlX2xldmVsX2luZm8gPSAyO1xudmFyIGNvbnNvbGVfbGV2ZWxfZGVidWcgPSAzO1xudmFyIGNvbnNvbGVfbGV2ZWxfdHJhY2UgPSA0O1xudmFyIHRpbWVyTWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbnZhciBjb25zb2xlMiA9IHtcbiAgLy8gQHRzLWV4cGVjdC1lcnJvciB3ZSB3YW50IGEgYmxhbmsgcHJvdG90eXBlLCBidXQgdHlwZXNjcmlwdCBjb21wbGFpbnNcbiAgX19wcm90b19fOiB7fSxcbiAgW1N5bWJvbC50b1N0cmluZ1RhZ106IFwiY29uc29sZVwiLFxuICBhc3NlcnQ6IChjb25kaXRpb24gPSBmYWxzZSwgLi4uZGF0YSkgPT4ge1xuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBzeXMuY29uc29sZV9sb2coY29uc29sZV9sZXZlbF9lcnJvciwgZm10TG9nKC4uLmRhdGEpKTtcbiAgICB9XG4gIH0sXG4gIGNsZWFyOiAoKSA9PiB7XG4gIH0sXG4gIGRlYnVnOiAoLi4uZGF0YSkgPT4ge1xuICAgIHN5cy5jb25zb2xlX2xvZyhjb25zb2xlX2xldmVsX2RlYnVnLCBmbXRMb2coLi4uZGF0YSkpO1xuICB9LFxuICBlcnJvcjogKC4uLmRhdGEpID0+IHtcbiAgICBzeXMuY29uc29sZV9sb2coY29uc29sZV9sZXZlbF9lcnJvciwgZm10TG9nKC4uLmRhdGEpKTtcbiAgfSxcbiAgaW5mbzogKC4uLmRhdGEpID0+IHtcbiAgICBzeXMuY29uc29sZV9sb2coY29uc29sZV9sZXZlbF9pbmZvLCBmbXRMb2coLi4uZGF0YSkpO1xuICB9LFxuICBsb2c6ICguLi5kYXRhKSA9PiB7XG4gICAgc3lzLmNvbnNvbGVfbG9nKGNvbnNvbGVfbGV2ZWxfaW5mbywgZm10TG9nKC4uLmRhdGEpKTtcbiAgfSxcbiAgdGFibGU6ICh0YWJ1bGFyRGF0YSwgX3Byb3BlcnRpZXMpID0+IHtcbiAgICBzeXMuY29uc29sZV9sb2coY29uc29sZV9sZXZlbF9pbmZvLCBmbXRMb2codGFidWxhckRhdGEpKTtcbiAgfSxcbiAgdHJhY2U6ICguLi5kYXRhKSA9PiB7XG4gICAgc3lzLmNvbnNvbGVfbG9nKGNvbnNvbGVfbGV2ZWxfdHJhY2UsIGZtdExvZyguLi5kYXRhKSk7XG4gIH0sXG4gIHdhcm46ICguLi5kYXRhKSA9PiB7XG4gICAgc3lzLmNvbnNvbGVfbG9nKGNvbnNvbGVfbGV2ZWxfd2FybiwgZm10TG9nKC4uLmRhdGEpKTtcbiAgfSxcbiAgZGlyOiAoX2l0ZW0sIF9vcHRpb25zKSA9PiB7XG4gIH0sXG4gIGRpcnhtbDogKC4uLl9kYXRhKSA9PiB7XG4gIH0sXG4gIC8vIENvdW50aW5nXG4gIGNvdW50OiAoX2xhYmVsID0gXCJkZWZhdWx0XCIpID0+IHtcbiAgfSxcbiAgY291bnRSZXNldDogKF9sYWJlbCA9IFwiZGVmYXVsdFwiKSA9PiB7XG4gIH0sXG4gIC8vIEdyb3VwaW5nXG4gIGdyb3VwOiAoLi4uX2RhdGEpID0+IHtcbiAgfSxcbiAgZ3JvdXBDb2xsYXBzZWQ6ICguLi5fZGF0YSkgPT4ge1xuICB9LFxuICBncm91cEVuZDogKCkgPT4ge1xuICB9LFxuICAvLyBUaW1pbmdcbiAgdGltZTogKGxhYmVsID0gXCJkZWZhdWx0XCIpID0+IHtcbiAgICBpZiAodGltZXJNYXAuaGFzKGxhYmVsKSkge1xuICAgICAgc3lzLmNvbnNvbGVfbG9nKGNvbnNvbGVfbGV2ZWxfd2FybiwgYFRpbWVyICcke2xhYmVsfScgYWxyZWFkeSBleGlzdHMuYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRpbWVyTWFwLnNldChsYWJlbCwgc3lzLmNvbnNvbGVfdGltZXJfc3RhcnQobGFiZWwpKTtcbiAgfSxcbiAgdGltZUxvZzogKGxhYmVsID0gXCJkZWZhdWx0XCIsIC4uLmRhdGEpID0+IHtcbiAgICBzeXMuY29uc29sZV9sb2coY29uc29sZV9sZXZlbF9pbmZvLCBmbXRMb2cobGFiZWwsIC4uLmRhdGEpKTtcbiAgfSxcbiAgdGltZUVuZDogKGxhYmVsID0gXCJkZWZhdWx0XCIpID0+IHtcbiAgICBjb25zdCBzcGFuSWQgPSB0aW1lck1hcC5nZXQobGFiZWwpO1xuICAgIGlmIChzcGFuSWQgPT09IHZvaWQgMCkge1xuICAgICAgc3lzLmNvbnNvbGVfbG9nKGNvbnNvbGVfbGV2ZWxfd2FybiwgYFRpbWVyICcke2xhYmVsfScgZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHN5cy5jb25zb2xlX3RpbWVyX2VuZChzcGFuSWQpO1xuICAgIHRpbWVyTWFwLmRlbGV0ZShsYWJlbCk7XG4gIH0sXG4gIC8vIEFkZGl0aW9uYWwgY29uc29sZSBtZXRob2RzIHRvIHNhdGlzZnkgdGhlIENvbnNvbGUgaW50ZXJmYWNlXG4gIHRpbWVTdGFtcDogKCkgPT4ge1xuICB9LFxuICBwcm9maWxlOiAoKSA9PiB7XG4gIH0sXG4gIHByb2ZpbGVFbmQ6ICgpID0+IHtcbiAgfVxufTtcbmNvbnNvbGUyLkNvbnNvbGUgPSBjb25zb2xlMjtcbmdsb2JhbFRoaXMuY29uc29sZSA9IGNvbnNvbGUyO1xuXG4vLyBzcmMvc2VydmVyL3JlZ2lzdGVyX2hvb2tzLnRzXG5yZWdpc3Rlcl9ob29rcyhob29rcyk7XG5yZWdpc3Rlcl9ob29rcyQxKGhvb2tzX3YxXzEpO1xucmVnaXN0ZXJfaG9va3MkMihob29rc192MV8yKTtcbi8qISBCdW5kbGVkIGxpY2Vuc2UgaW5mb3JtYXRpb246XG5cbnN0YXR1c2VzL2luZGV4LmpzOlxuICAoKiFcbiAgICogc3RhdHVzZXNcbiAgICogQ29weXJpZ2h0KGMpIDIwMTQgSm9uYXRoYW4gT25nXG4gICAqIENvcHlyaWdodChjKSAyMDE2IERvdWdsYXMgQ2hyaXN0b3BoZXIgV2lsc29uXG4gICAqIE1JVCBMaWNlbnNlZFxuICAgKilcbiovXG5cbmV4cG9ydCB7IEFycmF5QnVpbGRlciwgQXJyYXlDb2x1bW5CdWlsZGVyLCBCb29sQnVpbGRlciwgQm9vbENvbHVtbkJ1aWxkZXIsIEJ5dGVBcnJheUJ1aWxkZXIsIEJ5dGVBcnJheUNvbHVtbkJ1aWxkZXIsIENvbHVtbkJ1aWxkZXIsIENvbHVtbkV4cHJlc3Npb24sIENvbm5lY3Rpb25JZEJ1aWxkZXIsIENvbm5lY3Rpb25JZENvbHVtbkJ1aWxkZXIsIEYzMkJ1aWxkZXIsIEYzMkNvbHVtbkJ1aWxkZXIsIEY2NEJ1aWxkZXIsIEY2NENvbHVtbkJ1aWxkZXIsIEkxMjhCdWlsZGVyLCBJMTI4Q29sdW1uQnVpbGRlciwgSTE2QnVpbGRlciwgSTE2Q29sdW1uQnVpbGRlciwgSTI1NkJ1aWxkZXIsIEkyNTZDb2x1bW5CdWlsZGVyLCBJMzJCdWlsZGVyLCBJMzJDb2x1bW5CdWlsZGVyLCBJNjRCdWlsZGVyLCBJNjRDb2x1bW5CdWlsZGVyLCBJOEJ1aWxkZXIsIEk4Q29sdW1uQnVpbGRlciwgSWRlbnRpdHlCdWlsZGVyLCBJZGVudGl0eUNvbHVtbkJ1aWxkZXIsIE9wdGlvbkJ1aWxkZXIsIE9wdGlvbkNvbHVtbkJ1aWxkZXIsIFByb2R1Y3RCdWlsZGVyLCBQcm9kdWN0Q29sdW1uQnVpbGRlciwgUmVmQnVpbGRlciwgUmVzdWx0QnVpbGRlciwgUmVzdWx0Q29sdW1uQnVpbGRlciwgUm93QnVpbGRlciwgU2NoZWR1bGVBdEJ1aWxkZXIsIFNjaGVkdWxlQXRDb2x1bW5CdWlsZGVyLCBTZW5kZXJFcnJvciwgU2ltcGxlU3VtQnVpbGRlciwgU2ltcGxlU3VtQ29sdW1uQnVpbGRlciwgU3BhY2V0aW1lSG9zdEVycm9yLCBTdHJpbmdCdWlsZGVyLCBTdHJpbmdDb2x1bW5CdWlsZGVyLCBTdW1CdWlsZGVyLCBTdW1Db2x1bW5CdWlsZGVyLCBUaW1lRHVyYXRpb25CdWlsZGVyLCBUaW1lRHVyYXRpb25Db2x1bW5CdWlsZGVyLCBUaW1lc3RhbXBCdWlsZGVyLCBUaW1lc3RhbXBDb2x1bW5CdWlsZGVyLCBUeXBlQnVpbGRlciwgVTEyOEJ1aWxkZXIsIFUxMjhDb2x1bW5CdWlsZGVyLCBVMTZCdWlsZGVyLCBVMTZDb2x1bW5CdWlsZGVyLCBVMjU2QnVpbGRlciwgVTI1NkNvbHVtbkJ1aWxkZXIsIFUzMkJ1aWxkZXIsIFUzMkNvbHVtbkJ1aWxkZXIsIFU2NEJ1aWxkZXIsIFU2NENvbHVtbkJ1aWxkZXIsIFU4QnVpbGRlciwgVThDb2x1bW5CdWlsZGVyLCBVdWlkQnVpbGRlciwgVXVpZENvbHVtbkJ1aWxkZXIsIGFuZCwgY3JlYXRlVGFibGVSZWZGcm9tRGVmLCBlcnJvcnMsIGZyb20sIGlzUm93VHlwZWRRdWVyeSwgaXNUeXBlZFF1ZXJ5LCBsaXRlcmFsLCBtYWtlUXVlcnlCdWlsZGVyLCBub3QsIG9yLCByZWR1Y2Vycywgc2NoZW1hLCB0LCB0YWJsZSwgdG9DYW1lbENhc2UsIHRvU3FsIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwIiwiaW1wb3J0IHsgc2NoZW1hLCB0YWJsZSwgdCwgU2VuZGVyRXJyb3IgfSBmcm9tICdzcGFjZXRpbWVkYi9zZXJ2ZXInO1xuXG5jb25zdCBwbGF5ZXJUYWJsZSA9IHRhYmxlKFxuICB7IG5hbWU6ICdwbGF5ZXInLCBwdWJsaWM6IHRydWUgfSxcbiAge1xuICAgIGlkOiB0LnN0cmluZygpLnByaW1hcnlLZXkoKSxcbiAgICBuYW1lOiB0LnN0cmluZygpLFxuICAgIHg6IHQuZjMyKCksXG4gICAgeTogdC5mMzIoKSxcbiAgICBoZWFsdGg6IHQuZjMyKCksXG4gICAgaHVuZ2VyOiB0LmYzMigpLFxuICAgIHN0YW1pbmE6IHQuZjMyKCksXG4gICAgcmVnaW9uOiB0LnN0cmluZygpLmluZGV4KCksXG4gICAgY29ubmVjdGVkOiB0LmJvb2woKSxcbiAgICBsYXN0U2VlbjogdC5mNjQoKSxcbiAgICBpZGVudGl0eTogdC5zdHJpbmcoKS5pbmRleCgpLmRlZmF1bHQoJycpLFxuICB9XG4pO1xuXG5jb25zdCBpbnB1dFRhYmxlID0gdGFibGUoXG4gIHsgbmFtZTogJ3BsYXllcl9pbnB1dCcsIHB1YmxpYzogdHJ1ZSB9LFxuICB7XG4gICAgaWQ6IHQuc3RyaW5nKCkucHJpbWFyeUtleSgpLFxuICAgIGtleXM6IHQuc3RyaW5nKCksXG4gICAgaGFzTW92ZVRhcmdldDogdC5ib29sKCksXG4gICAgbW92ZVRhcmdldFg6IHQuZjMyKCksXG4gICAgbW92ZVRhcmdldFk6IHQuZjMyKCksXG4gICAgaGFzUG9pbnRlcjogdC5ib29sKCksXG4gICAgcG9pbnRlclg6IHQuZjMyKCksXG4gICAgcG9pbnRlclk6IHQuZjMyKCksXG4gICAgYnVpbGRBY3RpdmU6IHQuYm9vbCgpLFxuICAgIGJ1aWxkU2VsZWN0ZWQ6IHQuc3RyaW5nKCksXG4gICAgYnVpbGRSb3RhdGlvbjogdC5pMzIoKSxcbiAgICBtb2RlOiB0LnN0cmluZygpLFxuICAgIGludmVudG9yeU9wZW46IHQuYm9vbCgpLFxuICAgIHVwZGF0ZWRBdDogdC5mNjQoKSxcbiAgfVxuKTtcblxuY29uc3QgY2hhdFRhYmxlID0gdGFibGUoXG4gIHsgbmFtZTogJ2NoYXQnLCBwdWJsaWM6IHRydWUgfSxcbiAge1xuICAgIGlkOiB0LnU2NCgpLmF1dG9JbmMoKSxcbiAgICBzZW5kZXI6IHQuc3RyaW5nKCkuaW5kZXgoKSxcbiAgICBtZXNzYWdlOiB0LnN0cmluZygpLFxuICAgIHRpbWU6IHQuZjY0KCksXG4gIH1cbik7XG5cbmNvbnN0IHdvcmxkVGFibGUgPSB0YWJsZShcbiAgeyBuYW1lOiAnd29ybGQnLCBwdWJsaWM6IHRydWUgfSxcbiAge1xuICAgIGlkOiB0LnN0cmluZygpLnByaW1hcnlLZXkoKSxcbiAgICBzZWVkOiB0LnUzMigpLFxuICAgIHRpbWVPZkRheTogdC5mMzIoKSxcbiAgICBsYXN0VGljazogdC5mNjQoKSxcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IHNwYWNldGltZWRiID0gc2NoZW1hKHBsYXllclRhYmxlLCBpbnB1dFRhYmxlLCBjaGF0VGFibGUsIHdvcmxkVGFibGUpO1xuXG5jb25zdCBSRVFVSVJFX0FVVEggPSBmYWxzZTtcblxuZnVuY3Rpb24gbm93TWlsbGlzKGN0eDogeyB0aW1lc3RhbXA6IHsgdG9NaWxsaXMoKTogYmlnaW50IH0gfSkge1xuICByZXR1cm4gTnVtYmVyKGN0eC50aW1lc3RhbXAudG9NaWxsaXMoKSk7XG59XG5cbmZ1bmN0aW9uIGVuc3VyZUF1dGgoY3R4OiBhbnkpIHtcbiAgaWYgKCFSRVFVSVJFX0FVVEgpIHJldHVybiBudWxsO1xuICBpZiAoIWN0eC5zZW5kZXJBdXRoPy5qd3QpIHtcbiAgICB0aHJvdyBuZXcgU2VuZGVyRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIHJlcXVpcmVkJyk7XG4gIH1cbiAgcmV0dXJuIGN0eC5zZW5kZXJBdXRoLmp3dDtcbn1cblxuZnVuY3Rpb24gdXBzZXJ0UGxheWVyKGN0eDogYW55LCBkYXRhOiBhbnkpIHtcbiAgY29uc3QgZXhpc3RpbmcgPSBjdHguZGIucGxheWVyLmlkLmZpbmQoZGF0YS5pZCk7XG4gIGlmIChleGlzdGluZykge1xuICAgIGN0eC5kYi5wbGF5ZXIuaWQudXBkYXRlKHsgLi4uZXhpc3RpbmcsIC4uLmRhdGEgfSk7XG4gIH0gZWxzZSB7XG4gICAgY3R4LmRiLnBsYXllci5pbnNlcnQoZGF0YSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBzZXJ0SW5wdXQoY3R4OiBhbnksIGRhdGE6IGFueSkge1xuICBpZiAoIWRhdGE/LmlkKSByZXR1cm47XG4gIGNvbnN0IGlucHV0VGFibGUgPSBjdHguZGIucGxheWVyX2lucHV0ID8/IGN0eC5kYi5wbGF5ZXJJbnB1dDtcbiAgaWYgKCFpbnB1dFRhYmxlKSByZXR1cm47XG4gIGNvbnN0IGV4aXN0aW5nID0gaW5wdXRUYWJsZS5pZC5maW5kKGRhdGEuaWQpO1xuICBpZiAoZXhpc3RpbmcpIHtcbiAgICBpbnB1dFRhYmxlLmlkLnVwZGF0ZSh7IC4uLmV4aXN0aW5nLCAuLi5kYXRhIH0pO1xuICB9IGVsc2Uge1xuICAgIGlucHV0VGFibGUuaW5zZXJ0KGRhdGEpO1xuICB9XG59XG5cbnNwYWNldGltZWRiLmluaXQoKGN0eCkgPT4ge1xuICBjb25zdCBleGlzdGluZyA9IGN0eC5kYi53b3JsZC5pZC5maW5kKCd3b3JsZCcpO1xuICBpZiAoIWV4aXN0aW5nKSB7XG4gICAgY3R4LmRiLndvcmxkLmluc2VydCh7XG4gICAgICBpZDogJ3dvcmxkJyxcbiAgICAgIHNlZWQ6IDEzMzcsXG4gICAgICB0aW1lT2ZEYXk6IDAuMjUsXG4gICAgICBsYXN0VGljazogbm93TWlsbGlzKGN0eCksXG4gICAgfSk7XG4gIH1cbn0pO1xuXG5zcGFjZXRpbWVkYi5jbGllbnRDb25uZWN0ZWQoKGN0eCkgPT4ge1xuICBlbnN1cmVBdXRoKGN0eCk7XG4gIGNvbnN0IGlkID0gY3R4LmNvbm5lY3Rpb25JZD8udG9IZXhTdHJpbmc/LigpID8/IGN0eC5pZGVudGl0eS50b0hleFN0cmluZygpO1xuICBjb25zdCBpZGVudGl0eSA9IGN0eC5pZGVudGl0eS50b0hleFN0cmluZygpO1xuICBjb25zdCBub3cgPSBub3dNaWxsaXMoY3R4KTtcbiAgdXBzZXJ0UGxheWVyKGN0eCwge1xuICAgIGlkLFxuICAgIGlkZW50aXR5LFxuICAgIG5hbWU6ICdQbGF5ZXInLFxuICAgIHg6IDAsXG4gICAgeTogMCxcbiAgICBoZWFsdGg6IDEwMCxcbiAgICBodW5nZXI6IDEwMCxcbiAgICBzdGFtaW5hOiAxMDAsXG4gICAgcmVnaW9uOiAncmVnaW9uLTAnLFxuICAgIGNvbm5lY3RlZDogdHJ1ZSxcbiAgICBsYXN0U2Vlbjogbm93LFxuICB9KTtcbn0pO1xuXG5zcGFjZXRpbWVkYi5jbGllbnREaXNjb25uZWN0ZWQoKGN0eCkgPT4ge1xuICBpZiAoUkVRVUlSRV9BVVRIICYmICFjdHguc2VuZGVyQXV0aD8uand0KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGlkID0gY3R4LmNvbm5lY3Rpb25JZD8udG9IZXhTdHJpbmc/LigpID8/IGN0eC5pZGVudGl0eS50b0hleFN0cmluZygpO1xuICBjb25zdCBleGlzdGluZyA9IGN0eC5kYi5wbGF5ZXIuaWQuZmluZChpZCk7XG4gIGlmIChleGlzdGluZykge1xuICAgIGN0eC5kYi5wbGF5ZXIuaWQudXBkYXRlKHsgLi4uZXhpc3RpbmcsIGNvbm5lY3RlZDogZmFsc2UsIGxhc3RTZWVuOiBub3dNaWxsaXMoY3R4KSB9KTtcbiAgfVxufSk7XG5cbnNwYWNldGltZWRiLnJlZHVjZXIoXG4gICdpbnB1dF9zYW1wbGUnLFxuICB7XG4gICAgeDogdC5mMzIoKSxcbiAgICB5OiB0LmYzMigpLFxuICAgIGhlYWx0aDogdC5mMzIoKSxcbiAgICBodW5nZXI6IHQuZjMyKCksXG4gICAgc3RhbWluYTogdC5mMzIoKSxcbiAgICBrZXlzOiB0LnN0cmluZygpLFxuICAgIGhhc01vdmVUYXJnZXQ6IHQuYm9vbCgpLFxuICAgIG1vdmVUYXJnZXRYOiB0LmYzMigpLFxuICAgIG1vdmVUYXJnZXRZOiB0LmYzMigpLFxuICAgIGhhc1BvaW50ZXI6IHQuYm9vbCgpLFxuICAgIHBvaW50ZXJYOiB0LmYzMigpLFxuICAgIHBvaW50ZXJZOiB0LmYzMigpLFxuICAgIGJ1aWxkQWN0aXZlOiB0LmJvb2woKSxcbiAgICBidWlsZFNlbGVjdGVkOiB0LnN0cmluZygpLFxuICAgIGJ1aWxkUm90YXRpb246IHQuaTMyKCksXG4gICAgbW9kZTogdC5zdHJpbmcoKSxcbiAgICBpbnZlbnRvcnlPcGVuOiB0LmJvb2woKSxcbiAgICByZWdpb246IHQuc3RyaW5nKCksXG4gIH0sXG4gIChjdHgsIHBheWxvYWQpID0+IHtcbiAgICBlbnN1cmVBdXRoKGN0eCk7XG4gICAgY29uc3QgaWQgPSBjdHguY29ubmVjdGlvbklkPy50b0hleFN0cmluZz8uKCkgPz8gY3R4LmlkZW50aXR5LnRvSGV4U3RyaW5nKCk7XG4gICAgY29uc3QgaWRlbnRpdHkgPSBjdHguaWRlbnRpdHkudG9IZXhTdHJpbmcoKTtcbiAgICBjb25zdCBub3cgPSBub3dNaWxsaXMoY3R4KTtcbiAgICB1cHNlcnRQbGF5ZXIoY3R4LCB7XG4gICAgICBpZCxcbiAgICAgIGlkZW50aXR5LFxuICAgICAgbmFtZTogJ1BsYXllcicsXG4gICAgICB4OiBwYXlsb2FkLngsXG4gICAgICB5OiBwYXlsb2FkLnksXG4gICAgICBoZWFsdGg6IHBheWxvYWQuaGVhbHRoLFxuICAgICAgaHVuZ2VyOiBwYXlsb2FkLmh1bmdlcixcbiAgICAgIHN0YW1pbmE6IHBheWxvYWQuc3RhbWluYSxcbiAgICAgIHJlZ2lvbjogcGF5bG9hZC5yZWdpb24sXG4gICAgICBjb25uZWN0ZWQ6IHRydWUsXG4gICAgICBsYXN0U2Vlbjogbm93LFxuICAgIH0pO1xuICAgIHVwc2VydElucHV0KGN0eCwge1xuICAgICAgaWQsXG4gICAgICBrZXlzOiBwYXlsb2FkLmtleXMsXG4gICAgICBoYXNNb3ZlVGFyZ2V0OiBwYXlsb2FkLmhhc01vdmVUYXJnZXQsXG4gICAgICBtb3ZlVGFyZ2V0WDogcGF5bG9hZC5tb3ZlVGFyZ2V0WCxcbiAgICAgIG1vdmVUYXJnZXRZOiBwYXlsb2FkLm1vdmVUYXJnZXRZLFxuICAgICAgaGFzUG9pbnRlcjogcGF5bG9hZC5oYXNQb2ludGVyLFxuICAgICAgcG9pbnRlclg6IHBheWxvYWQucG9pbnRlclgsXG4gICAgICBwb2ludGVyWTogcGF5bG9hZC5wb2ludGVyWSxcbiAgICAgIGJ1aWxkQWN0aXZlOiBwYXlsb2FkLmJ1aWxkQWN0aXZlLFxuICAgICAgYnVpbGRTZWxlY3RlZDogcGF5bG9hZC5idWlsZFNlbGVjdGVkLFxuICAgICAgYnVpbGRSb3RhdGlvbjogcGF5bG9hZC5idWlsZFJvdGF0aW9uLFxuICAgICAgbW9kZTogcGF5bG9hZC5tb2RlLFxuICAgICAgaW52ZW50b3J5T3BlbjogcGF5bG9hZC5pbnZlbnRvcnlPcGVuLFxuICAgICAgdXBkYXRlZEF0OiBub3csXG4gICAgfSk7XG4gIH1cbik7XG5cbnNwYWNldGltZWRiLnJlZHVjZXIoXG4gICdzZW5kX2NoYXQnLFxuICB7XG4gICAgbWVzc2FnZTogdC5zdHJpbmcoKSxcbiAgfSxcbiAgKGN0eCwgeyBtZXNzYWdlIH0pID0+IHtcbiAgICBlbnN1cmVBdXRoKGN0eCk7XG4gICAgY29uc3QgaWQgPSBjdHguaWRlbnRpdHkudG9IZXhTdHJpbmcoKTtcbiAgICBjdHguZGIuY2hhdC5pbnNlcnQoe1xuICAgICAgc2VuZGVyOiBpZCxcbiAgICAgIG1lc3NhZ2UsXG4gICAgICB0aW1lOiBub3dNaWxsaXMoY3R4KSxcbiAgICB9KTtcbiAgfVxuKTtcblxuc3BhY2V0aW1lZGIucmVkdWNlcihcbiAgJ3NldF9zZWVkJyxcbiAge1xuICAgIHNlZWQ6IHQudTMyKCksXG4gIH0sXG4gIChjdHgsIHsgc2VlZCB9KSA9PiB7XG4gICAgZW5zdXJlQXV0aChjdHgpO1xuICAgIGNvbnN0IGV4aXN0aW5nID0gY3R4LmRiLndvcmxkLmlkLmZpbmQoJ3dvcmxkJyk7XG4gICAgY29uc3Qgbm93ID0gbm93TWlsbGlzKGN0eCk7XG4gICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICBjdHguZGIud29ybGQuaWQudXBkYXRlKHsgLi4uZXhpc3RpbmcsIHNlZWQsIGxhc3RUaWNrOiBub3cgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN0eC5kYi53b3JsZC5pbnNlcnQoeyBpZDogJ3dvcmxkJywgc2VlZCwgdGltZU9mRGF5OiAwLjI1LCBsYXN0VGljazogbm93IH0pO1xuICAgIH1cbiAgfVxuKTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxJQUFJQSxhQUFXLE9BQU87QUFDdEIsSUFBSUMsY0FBWSxPQUFPO0FBQ3ZCLElBQUlDLHFCQUFtQixPQUFPO0FBQzlCLElBQUlDLHNCQUFvQixPQUFPO0FBQy9CLElBQUlDLGlCQUFlLE9BQU87QUFDMUIsSUFBSUMsaUJBQWUsT0FBTyxVQUFVO0FBQ3BDLElBQUlDLGdCQUFjLElBQUksUUFBUSxTQUFTLFlBQVk7QUFDakQsUUFBTyxRQUFRLEdBQUcsR0FBR0gsb0JBQWtCLEdBQUcsQ0FBQyxNQUFNLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFNBQVMsSUFBSSxFQUFFLElBQUk7O0FBRTdGLElBQUlJLGlCQUFlLElBQUksTUFBTSxRQUFRLFNBQVM7QUFDNUMsS0FBSSxRQUFRLE9BQU8sU0FBUyxZQUFZLE9BQU8sU0FBUyxZQUN0RDtPQUFLLElBQUksT0FBT0osb0JBQWtCLEtBQUssQ0FDckMsS0FBSSxDQUFDRSxlQUFhLEtBQUssSUFBSSxJQUFJLElBQUksUUFBUSxPQUN6QyxhQUFVLElBQUksS0FBSztHQUFFLFdBQVcsS0FBSztHQUFNLFlBQVksRUFBRSxPQUFPSCxtQkFBaUIsTUFBTSxJQUFJLEtBQUssS0FBSztHQUFZLENBQUM7O0FBRXhILFFBQU87O0FBRVQsSUFBSU0sYUFBVyxLQUFLLFlBQVksWUFBWSxTQUFTLE9BQU8sT0FBT1IsV0FBU0ksZUFBYSxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUVHLGNBS25HLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxhQUFhTixZQUFVLFFBQVEsV0FBVztDQUFFLE9BQU87Q0FBSyxZQUFZO0NBQU0sQ0FBQyxHQUFHLFFBQ3pHLElBQ0Q7QUEyS0QsSUFBSSwyQkFBMkJPLFVBeEtORixhQUFXLEVBQ2xDLG1EQUFtRCxTQUFTLFFBQVE7Q0FFbEUsSUFB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