var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = {
    exports: {}
  }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
// If the importer is in node compatibility mode or this is not an ESM
// file that has been converted to a CommonJS file using a Babel-
// compatible transform (i.e. "__esModule" has not been set), then set
// "default" to the CommonJS "module.exports" for node compatibility.
isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
  value: mod,
  enumerable: true
}) : target, mod));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = value => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = value => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = x => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// (disabled):crypto
var require_crypto = __commonJS({
  "(disabled):crypto"() {}
});

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports) {
    "use strict";

    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
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
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
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
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
      }
      return parts.join("");
    }
  }
});

// node_modules/ieee754/index.js
var require_ieee754 = __commonJS({
  "node_modules/ieee754/index.js"(exports) {
    exports.read = function (buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {}
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {}
      buffer[offset + i - d] |= s * 128;
    };
  }
});

// (disabled):node_modules/buffer/index.js
var require_buffer = __commonJS({
  "(disabled):node_modules/buffer/index.js"(exports) {
    "use strict";

    var base64 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer2;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
    }
    function typedArraySupport() {
      try {
        var arr = new Uint8Array(1);
        var proto = {
          foo: function () {
            return 42;
          }
        };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer2.prototype, "parent", {
      enumerable: true,
      get: function () {
        if (!Buffer2.isBuffer(this)) return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer2.prototype, "offset", {
      enumerable: true,
      get: function () {
        if (!Buffer2.isBuffer(this)) return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      var buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function Buffer2(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError('The "string" argument must be of type string. Received type number');
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer2.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError('The "value" argument must not be of type number. Received type number');
      }
      var valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer2.from(valueOf, encodingOrOffset, length);
      }
      var b = fromObject(value);
      if (b) return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
    }
    Buffer2.from = function (value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer2, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer2.alloc = function (size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer2.allocUnsafe = function (size) {
      return allocUnsafe(size);
    };
    Buffer2.allocUnsafeSlow = function (size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer2.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      var length = byteLength(string, encoding) | 0;
      var buf = createBuffer(length);
      var actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      var length = array.length < 0 ? 0 : checked(array.length) | 0;
      var buf = createBuffer(length);
      for (var i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        var copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      var buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array);
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer2.isBuffer(obj)) {
        var len = checked(obj.length) | 0;
        var buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer2.alloc(+length);
    }
    Buffer2.isBuffer = function isBuffer(b) {
      return b != null && b._isBuffer === true && b !== Buffer2.prototype;
    };
    Buffer2.compare = function compare(a, b) {
      if (isInstance(a, Uint8Array)) a = Buffer2.from(a, a.offset, a.byteLength);
      if (isInstance(b, Uint8Array)) b = Buffer2.from(b, b.offset, b.byteLength);
      if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
        throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
      }
      if (a === b) return 0;
      var x = a.length;
      var y = b.length;
      for (var i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    Buffer2.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer2.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer2.alloc(0);
      }
      var i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      var buffer = Buffer2.allocUnsafe(length);
      var pos = 0;
      for (i = 0; i < list.length; ++i) {
        var buf = list[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            Buffer2.from(buf).copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(buffer, buf, pos);
          }
        } else if (!Buffer2.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength(string, encoding) {
      if (Buffer2.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string);
      }
      var len = string.length;
      var mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0) return 0;
      var loweredCase = false;
      for (;;) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      var loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding) encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.prototype._isBuffer = true;
    function swap(b, n, m) {
      var i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer2.prototype.swap16 = function swap16() {
      var len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (var i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer2.prototype.swap32 = function swap32() {
      var len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (var i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer2.prototype.swap64 = function swap64() {
      var len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (var i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer2.prototype.toString = function toString() {
      var length = this.length;
      if (length === 0) return "";
      if (arguments.length === 0) return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
    Buffer2.prototype.equals = function equals(b) {
      if (!Buffer2.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
      if (this === b) return true;
      return Buffer2.compare(this, b) === 0;
    };
    Buffer2.prototype.inspect = function inspect() {
      var str = "";
      var max = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max) str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
    }
    Buffer2.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer2.from(target, target.offset, target.byteLength);
      }
      if (!Buffer2.isBuffer(target)) {
        throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target) return 0;
      var x = thisEnd - thisStart;
      var y = end - start;
      var len = Math.min(x, y);
      var thisCopy = this.slice(thisStart, thisEnd);
      var targetCopy = target.slice(start, end);
      for (var i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0) return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir) return -1;else byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;else return -1;
      }
      if (typeof val === "string") {
        val = Buffer2.from(val, encoding);
      }
      if (Buffer2.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      var indexSize = 1;
      var arrLength = arr.length;
      var valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      var i;
      if (dir) {
        var foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          var found = true;
          for (var j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
          }
          if (found) return i;
        }
      }
      return -1;
    }
    Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      var remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      var strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      for (var i = 0; i < length; ++i) {
        var parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed)) return i;
        buf[offset + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer2.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0) encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
      }
      var remaining = this.length - offset;
      if (length === void 0 || length > remaining) length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding) encoding = "utf8";
      var loweredCase = false;
      for (;;) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer2.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      var res = [];
      var i = start;
      while (i < end) {
        var firstByte = buf[i];
        var codePoint = null;
        var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          var secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      var len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      var res = "";
      var i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      var ret = "";
      end = Math.min(buf.length, end);
      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      var ret = "";
      end = Math.min(buf.length, end);
      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      var len = buf.length;
      if (!start || start < 0) start = 0;
      if (!end || end < 0 || end > len) end = len;
      var out = "";
      for (var i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      var bytes = buf.slice(start, end);
      var res = "";
      for (var i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer2.prototype.slice = function slice(start, end) {
      var len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start) end = start;
      var newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer2.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
      if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      var val = this[offset + --byteLength2];
      var mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      var i = byteLength2;
      var mul = 1;
      var val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128)) return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      var val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      var val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer2.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
    }
    Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      var mul = 1;
      var i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      var i = byteLength2 - 1;
      var mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      var i = 0;
      var mul = 1;
      var sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      var i = byteLength2 - 1;
      var mul = 1;
      var sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
      if (value < 0) value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0) value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
      if (offset < 0) throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer2.isBuffer(target)) throw new TypeError("argument should be a Buffer");
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start;
      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
      if (end < 0) throw new RangeError("sourceEnd out of bounds");
      if (end > this.length) end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      var len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
      }
      return len;
    };
    Buffer2.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          var code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val) val = 0;
      var i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        var bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
        var len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2) return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      var codePoint;
      var length = string.length;
      var leadSurrogate = null;
      var bytes = [];
      for (var i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0) break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0) break;
          bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0) break;
          bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0) break;
          bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      var byteArray = [];
      for (var i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      var c, hi, lo;
      var byteArray = [];
      for (var i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset, length) {
      for (var i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length) break;
        dst[i + offset] = src[i];
      }
      return i;
    }
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = function () {
      var alphabet = "0123456789abcdef";
      var table = new Array(256);
      for (var i = 0; i < 16; ++i) {
        var i16 = i * 16;
        for (var j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i] + alphabet[j];
        }
      }
      return table;
    }();
  }
});

// node_modules/js-sha256/src/sha256.js
var require_sha256 = __commonJS({
  "node_modules/js-sha256/src/sha256.js"(exports, module) {
    (function () {
      "use strict";

      var ERROR = "input is invalid type";
      var WINDOW = typeof window === "object";
      var root = WINDOW ? window : {};
      if (root.JS_SHA256_NO_WINDOW) {
        WINDOW = false;
      }
      var WEB_WORKER = !WINDOW && typeof self === "object";
      var NODE_JS = !root.JS_SHA256_NO_NODE_JS && typeof process === "object" && process.versions && process.versions.node;
      if (NODE_JS) {
        root = global;
      } else if (WEB_WORKER) {
        root = self;
      }
      var COMMON_JS = !root.JS_SHA256_NO_COMMON_JS && typeof module === "object" && module.exports;
      var AMD = typeof define === "function" && define.amd;
      var ARRAY_BUFFER = !root.JS_SHA256_NO_ARRAY_BUFFER && typeof ArrayBuffer !== "undefined";
      var HEX_CHARS = "0123456789abcdef".split("");
      var EXTRA = [-2147483648, 8388608, 32768, 128];
      var SHIFT = [24, 16, 8, 0];
      var K = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
      var OUTPUT_TYPES = ["hex", "array", "digest", "arrayBuffer"];
      var blocks = [];
      if (root.JS_SHA256_NO_NODE_JS || !Array.isArray) {
        Array.isArray = function (obj) {
          return Object.prototype.toString.call(obj) === "[object Array]";
        };
      }
      if (ARRAY_BUFFER && (root.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
        ArrayBuffer.isView = function (obj) {
          return typeof obj === "object" && obj.buffer && obj.buffer.constructor === ArrayBuffer;
        };
      }
      var createOutputMethod = function (outputType, is224) {
        return function (message) {
          return new Sha256(is224, true).update(message)[outputType]();
        };
      };
      var createMethod = function (is224) {
        var method = createOutputMethod("hex", is224);
        if (NODE_JS) {
          method = nodeWrap(method, is224);
        }
        method.create = function () {
          return new Sha256(is224);
        };
        method.update = function (message) {
          return method.create().update(message);
        };
        for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
          var type = OUTPUT_TYPES[i];
          method[type] = createOutputMethod(type, is224);
        }
        return method;
      };
      var nodeWrap = function (method, is224) {
        var crypto = require_crypto();
        var Buffer2 = require_buffer().Buffer;
        var algorithm = is224 ? "sha224" : "sha256";
        var bufferFrom;
        if (Buffer2.from && !root.JS_SHA256_NO_BUFFER_FROM) {
          bufferFrom = Buffer2.from;
        } else {
          bufferFrom = function (message) {
            return new Buffer2(message);
          };
        }
        var nodeMethod = function (message) {
          if (typeof message === "string") {
            return crypto.createHash(algorithm).update(message, "utf8").digest("hex");
          } else {
            if (message === null || message === void 0) {
              throw new Error(ERROR);
            } else if (message.constructor === ArrayBuffer) {
              message = new Uint8Array(message);
            }
          }
          if (Array.isArray(message) || ArrayBuffer.isView(message) || message.constructor === Buffer2) {
            return crypto.createHash(algorithm).update(bufferFrom(message)).digest("hex");
          } else {
            return method(message);
          }
        };
        return nodeMethod;
      };
      var createHmacOutputMethod = function (outputType, is224) {
        return function (key, message) {
          return new HmacSha256(key, is224, true).update(message)[outputType]();
        };
      };
      var createHmacMethod = function (is224) {
        var method = createHmacOutputMethod("hex", is224);
        method.create = function (key) {
          return new HmacSha256(key, is224);
        };
        method.update = function (key, message) {
          return method.create(key).update(message);
        };
        for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
          var type = OUTPUT_TYPES[i];
          method[type] = createHmacOutputMethod(type, is224);
        }
        return method;
      };
      function Sha256(is224, sharedMemory) {
        if (sharedMemory) {
          blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
          this.blocks = blocks;
        } else {
          this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        if (is224) {
          this.h0 = 3238371032;
          this.h1 = 914150663;
          this.h2 = 812702999;
          this.h3 = 4144912697;
          this.h4 = 4290775857;
          this.h5 = 1750603025;
          this.h6 = 1694076839;
          this.h7 = 3204075428;
        } else {
          this.h0 = 1779033703;
          this.h1 = 3144134277;
          this.h2 = 1013904242;
          this.h3 = 2773480762;
          this.h4 = 1359893119;
          this.h5 = 2600822924;
          this.h6 = 528734635;
          this.h7 = 1541459225;
        }
        this.block = this.start = this.bytes = this.hBytes = 0;
        this.finalized = this.hashed = false;
        this.first = true;
        this.is224 = is224;
      }
      Sha256.prototype.update = function (message) {
        if (this.finalized) {
          return;
        }
        var notString,
          type = typeof message;
        if (type !== "string") {
          if (type === "object") {
            if (message === null) {
              throw new Error(ERROR);
            } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
              message = new Uint8Array(message);
            } else if (!Array.isArray(message)) {
              if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
                throw new Error(ERROR);
              }
            }
          } else {
            throw new Error(ERROR);
          }
          notString = true;
        }
        var code,
          index = 0,
          i,
          length = message.length,
          blocks2 = this.blocks;
        while (index < length) {
          if (this.hashed) {
            this.hashed = false;
            blocks2[0] = this.block;
            this.block = blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
          }
          if (notString) {
            for (i = this.start; index < length && i < 64; ++index) {
              blocks2[i >>> 2] |= message[index] << SHIFT[i++ & 3];
            }
          } else {
            for (i = this.start; index < length && i < 64; ++index) {
              code = message.charCodeAt(index);
              if (code < 128) {
                blocks2[i >>> 2] |= code << SHIFT[i++ & 3];
              } else if (code < 2048) {
                blocks2[i >>> 2] |= (192 | code >>> 6) << SHIFT[i++ & 3];
                blocks2[i >>> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
              } else if (code < 55296 || code >= 57344) {
                blocks2[i >>> 2] |= (224 | code >>> 12) << SHIFT[i++ & 3];
                blocks2[i >>> 2] |= (128 | code >>> 6 & 63) << SHIFT[i++ & 3];
                blocks2[i >>> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
              } else {
                code = 65536 + ((code & 1023) << 10 | message.charCodeAt(++index) & 1023);
                blocks2[i >>> 2] |= (240 | code >>> 18) << SHIFT[i++ & 3];
                blocks2[i >>> 2] |= (128 | code >>> 12 & 63) << SHIFT[i++ & 3];
                blocks2[i >>> 2] |= (128 | code >>> 6 & 63) << SHIFT[i++ & 3];
                blocks2[i >>> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
              }
            }
          }
          this.lastByteIndex = i;
          this.bytes += i - this.start;
          if (i >= 64) {
            this.block = blocks2[16];
            this.start = i - 64;
            this.hash();
            this.hashed = true;
          } else {
            this.start = i;
          }
        }
        if (this.bytes > 4294967295) {
          this.hBytes += this.bytes / 4294967296 << 0;
          this.bytes = this.bytes % 4294967296;
        }
        return this;
      };
      Sha256.prototype.finalize = function () {
        if (this.finalized) {
          return;
        }
        this.finalized = true;
        var blocks2 = this.blocks,
          i = this.lastByteIndex;
        blocks2[16] = this.block;
        blocks2[i >>> 2] |= EXTRA[i & 3];
        this.block = blocks2[16];
        if (i >= 56) {
          if (!this.hashed) {
            this.hash();
          }
          blocks2[0] = this.block;
          blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
        }
        blocks2[14] = this.hBytes << 3 | this.bytes >>> 29;
        blocks2[15] = this.bytes << 3;
        this.hash();
      };
      Sha256.prototype.hash = function () {
        var a = this.h0,
          b = this.h1,
          c = this.h2,
          d = this.h3,
          e = this.h4,
          f = this.h5,
          g = this.h6,
          h = this.h7,
          blocks2 = this.blocks,
          j,
          s0,
          s1,
          maj,
          t1,
          t2,
          ch,
          ab,
          da,
          cd,
          bc;
        for (j = 16; j < 64; ++j) {
          t1 = blocks2[j - 15];
          s0 = (t1 >>> 7 | t1 << 25) ^ (t1 >>> 18 | t1 << 14) ^ t1 >>> 3;
          t1 = blocks2[j - 2];
          s1 = (t1 >>> 17 | t1 << 15) ^ (t1 >>> 19 | t1 << 13) ^ t1 >>> 10;
          blocks2[j] = blocks2[j - 16] + s0 + blocks2[j - 7] + s1 << 0;
        }
        bc = b & c;
        for (j = 0; j < 64; j += 4) {
          if (this.first) {
            if (this.is224) {
              ab = 300032;
              t1 = blocks2[0] - 1413257819;
              h = t1 - 150054599 << 0;
              d = t1 + 24177077 << 0;
            } else {
              ab = 704751109;
              t1 = blocks2[0] - 210244248;
              h = t1 - 1521486534 << 0;
              d = t1 + 143694565 << 0;
            }
            this.first = false;
          } else {
            s0 = (a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10);
            s1 = (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7);
            ab = a & b;
            maj = ab ^ a & c ^ bc;
            ch = e & f ^ ~e & g;
            t1 = h + s1 + ch + K[j] + blocks2[j];
            t2 = s0 + maj;
            h = d + t1 << 0;
            d = t1 + t2 << 0;
          }
          s0 = (d >>> 2 | d << 30) ^ (d >>> 13 | d << 19) ^ (d >>> 22 | d << 10);
          s1 = (h >>> 6 | h << 26) ^ (h >>> 11 | h << 21) ^ (h >>> 25 | h << 7);
          da = d & a;
          maj = da ^ d & b ^ ab;
          ch = h & e ^ ~h & f;
          t1 = g + s1 + ch + K[j + 1] + blocks2[j + 1];
          t2 = s0 + maj;
          g = c + t1 << 0;
          c = t1 + t2 << 0;
          s0 = (c >>> 2 | c << 30) ^ (c >>> 13 | c << 19) ^ (c >>> 22 | c << 10);
          s1 = (g >>> 6 | g << 26) ^ (g >>> 11 | g << 21) ^ (g >>> 25 | g << 7);
          cd = c & d;
          maj = cd ^ c & a ^ da;
          ch = g & h ^ ~g & e;
          t1 = f + s1 + ch + K[j + 2] + blocks2[j + 2];
          t2 = s0 + maj;
          f = b + t1 << 0;
          b = t1 + t2 << 0;
          s0 = (b >>> 2 | b << 30) ^ (b >>> 13 | b << 19) ^ (b >>> 22 | b << 10);
          s1 = (f >>> 6 | f << 26) ^ (f >>> 11 | f << 21) ^ (f >>> 25 | f << 7);
          bc = b & c;
          maj = bc ^ b & d ^ cd;
          ch = f & g ^ ~f & h;
          t1 = e + s1 + ch + K[j + 3] + blocks2[j + 3];
          t2 = s0 + maj;
          e = a + t1 << 0;
          a = t1 + t2 << 0;
          this.chromeBugWorkAround = true;
        }
        this.h0 = this.h0 + a << 0;
        this.h1 = this.h1 + b << 0;
        this.h2 = this.h2 + c << 0;
        this.h3 = this.h3 + d << 0;
        this.h4 = this.h4 + e << 0;
        this.h5 = this.h5 + f << 0;
        this.h6 = this.h6 + g << 0;
        this.h7 = this.h7 + h << 0;
      };
      Sha256.prototype.hex = function () {
        this.finalize();
        var h0 = this.h0,
          h1 = this.h1,
          h2 = this.h2,
          h3 = this.h3,
          h4 = this.h4,
          h5 = this.h5,
          h6 = this.h6,
          h7 = this.h7;
        var hex = HEX_CHARS[h0 >>> 28 & 15] + HEX_CHARS[h0 >>> 24 & 15] + HEX_CHARS[h0 >>> 20 & 15] + HEX_CHARS[h0 >>> 16 & 15] + HEX_CHARS[h0 >>> 12 & 15] + HEX_CHARS[h0 >>> 8 & 15] + HEX_CHARS[h0 >>> 4 & 15] + HEX_CHARS[h0 & 15] + HEX_CHARS[h1 >>> 28 & 15] + HEX_CHARS[h1 >>> 24 & 15] + HEX_CHARS[h1 >>> 20 & 15] + HEX_CHARS[h1 >>> 16 & 15] + HEX_CHARS[h1 >>> 12 & 15] + HEX_CHARS[h1 >>> 8 & 15] + HEX_CHARS[h1 >>> 4 & 15] + HEX_CHARS[h1 & 15] + HEX_CHARS[h2 >>> 28 & 15] + HEX_CHARS[h2 >>> 24 & 15] + HEX_CHARS[h2 >>> 20 & 15] + HEX_CHARS[h2 >>> 16 & 15] + HEX_CHARS[h2 >>> 12 & 15] + HEX_CHARS[h2 >>> 8 & 15] + HEX_CHARS[h2 >>> 4 & 15] + HEX_CHARS[h2 & 15] + HEX_CHARS[h3 >>> 28 & 15] + HEX_CHARS[h3 >>> 24 & 15] + HEX_CHARS[h3 >>> 20 & 15] + HEX_CHARS[h3 >>> 16 & 15] + HEX_CHARS[h3 >>> 12 & 15] + HEX_CHARS[h3 >>> 8 & 15] + HEX_CHARS[h3 >>> 4 & 15] + HEX_CHARS[h3 & 15] + HEX_CHARS[h4 >>> 28 & 15] + HEX_CHARS[h4 >>> 24 & 15] + HEX_CHARS[h4 >>> 20 & 15] + HEX_CHARS[h4 >>> 16 & 15] + HEX_CHARS[h4 >>> 12 & 15] + HEX_CHARS[h4 >>> 8 & 15] + HEX_CHARS[h4 >>> 4 & 15] + HEX_CHARS[h4 & 15] + HEX_CHARS[h5 >>> 28 & 15] + HEX_CHARS[h5 >>> 24 & 15] + HEX_CHARS[h5 >>> 20 & 15] + HEX_CHARS[h5 >>> 16 & 15] + HEX_CHARS[h5 >>> 12 & 15] + HEX_CHARS[h5 >>> 8 & 15] + HEX_CHARS[h5 >>> 4 & 15] + HEX_CHARS[h5 & 15] + HEX_CHARS[h6 >>> 28 & 15] + HEX_CHARS[h6 >>> 24 & 15] + HEX_CHARS[h6 >>> 20 & 15] + HEX_CHARS[h6 >>> 16 & 15] + HEX_CHARS[h6 >>> 12 & 15] + HEX_CHARS[h6 >>> 8 & 15] + HEX_CHARS[h6 >>> 4 & 15] + HEX_CHARS[h6 & 15];
        if (!this.is224) {
          hex += HEX_CHARS[h7 >>> 28 & 15] + HEX_CHARS[h7 >>> 24 & 15] + HEX_CHARS[h7 >>> 20 & 15] + HEX_CHARS[h7 >>> 16 & 15] + HEX_CHARS[h7 >>> 12 & 15] + HEX_CHARS[h7 >>> 8 & 15] + HEX_CHARS[h7 >>> 4 & 15] + HEX_CHARS[h7 & 15];
        }
        return hex;
      };
      Sha256.prototype.toString = Sha256.prototype.hex;
      Sha256.prototype.digest = function () {
        this.finalize();
        var h0 = this.h0,
          h1 = this.h1,
          h2 = this.h2,
          h3 = this.h3,
          h4 = this.h4,
          h5 = this.h5,
          h6 = this.h6,
          h7 = this.h7;
        var arr = [h0 >>> 24 & 255, h0 >>> 16 & 255, h0 >>> 8 & 255, h0 & 255, h1 >>> 24 & 255, h1 >>> 16 & 255, h1 >>> 8 & 255, h1 & 255, h2 >>> 24 & 255, h2 >>> 16 & 255, h2 >>> 8 & 255, h2 & 255, h3 >>> 24 & 255, h3 >>> 16 & 255, h3 >>> 8 & 255, h3 & 255, h4 >>> 24 & 255, h4 >>> 16 & 255, h4 >>> 8 & 255, h4 & 255, h5 >>> 24 & 255, h5 >>> 16 & 255, h5 >>> 8 & 255, h5 & 255, h6 >>> 24 & 255, h6 >>> 16 & 255, h6 >>> 8 & 255, h6 & 255];
        if (!this.is224) {
          arr.push(h7 >>> 24 & 255, h7 >>> 16 & 255, h7 >>> 8 & 255, h7 & 255);
        }
        return arr;
      };
      Sha256.prototype.array = Sha256.prototype.digest;
      Sha256.prototype.arrayBuffer = function () {
        this.finalize();
        var buffer = new ArrayBuffer(this.is224 ? 28 : 32);
        var dataView = new DataView(buffer);
        dataView.setUint32(0, this.h0);
        dataView.setUint32(4, this.h1);
        dataView.setUint32(8, this.h2);
        dataView.setUint32(12, this.h3);
        dataView.setUint32(16, this.h4);
        dataView.setUint32(20, this.h5);
        dataView.setUint32(24, this.h6);
        if (!this.is224) {
          dataView.setUint32(28, this.h7);
        }
        return buffer;
      };
      function HmacSha256(key, is224, sharedMemory) {
        var i,
          type = typeof key;
        if (type === "string") {
          var bytes = [],
            length = key.length,
            index = 0,
            code;
          for (i = 0; i < length; ++i) {
            code = key.charCodeAt(i);
            if (code < 128) {
              bytes[index++] = code;
            } else if (code < 2048) {
              bytes[index++] = 192 | code >>> 6;
              bytes[index++] = 128 | code & 63;
            } else if (code < 55296 || code >= 57344) {
              bytes[index++] = 224 | code >>> 12;
              bytes[index++] = 128 | code >>> 6 & 63;
              bytes[index++] = 128 | code & 63;
            } else {
              code = 65536 + ((code & 1023) << 10 | key.charCodeAt(++i) & 1023);
              bytes[index++] = 240 | code >>> 18;
              bytes[index++] = 128 | code >>> 12 & 63;
              bytes[index++] = 128 | code >>> 6 & 63;
              bytes[index++] = 128 | code & 63;
            }
          }
          key = bytes;
        } else {
          if (type === "object") {
            if (key === null) {
              throw new Error(ERROR);
            } else if (ARRAY_BUFFER && key.constructor === ArrayBuffer) {
              key = new Uint8Array(key);
            } else if (!Array.isArray(key)) {
              if (!ARRAY_BUFFER || !ArrayBuffer.isView(key)) {
                throw new Error(ERROR);
              }
            }
          } else {
            throw new Error(ERROR);
          }
        }
        if (key.length > 64) {
          key = new Sha256(is224, true).update(key).array();
        }
        var oKeyPad = [],
          iKeyPad = [];
        for (i = 0; i < 64; ++i) {
          var b = key[i] || 0;
          oKeyPad[i] = 92 ^ b;
          iKeyPad[i] = 54 ^ b;
        }
        Sha256.call(this, is224, sharedMemory);
        this.update(iKeyPad);
        this.oKeyPad = oKeyPad;
        this.inner = true;
        this.sharedMemory = sharedMemory;
      }
      HmacSha256.prototype = new Sha256();
      HmacSha256.prototype.finalize = function () {
        Sha256.prototype.finalize.call(this);
        if (this.inner) {
          this.inner = false;
          var innerHash = this.array();
          Sha256.call(this, this.is224, this.sharedMemory);
          this.update(this.oKeyPad);
          this.update(innerHash);
          Sha256.prototype.finalize.call(this);
        }
      };
      var exports2 = createMethod();
      exports2.sha256 = exports2;
      exports2.sha224 = createMethod(true);
      exports2.sha256.hmac = createHmacMethod();
      exports2.sha224.hmac = createHmacMethod(true);
      if (COMMON_JS) {
        module.exports = exports2;
      } else {
        root.sha256 = exports2.sha256;
        root.sha224 = exports2.sha224;
        if (AMD) {
          define(function () {
            return exports2;
          });
        }
      }
    })();
  }
});

// node_modules/keycloak-js/dist/keycloak.mjs
var import_js_sha256 = __toESM(require_sha256(), 1);

// node_modules/jwt-decode/build/esm/index.js
var InvalidTokenError = class extends Error {};
InvalidTokenError.prototype.name = "InvalidTokenError";
function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).replace(/(.)/g, (m, p) => {
    let code = p.charCodeAt(0).toString(16).toUpperCase();
    if (code.length < 2) {
      code = "0" + code;
    }
    return "%" + code;
  }));
}
function base64UrlDecode(str) {
  let output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw new Error("base64 string is not of the correct length");
  }
  try {
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
}
function jwtDecode(token, options) {
  if (typeof token !== "string") {
    throw new InvalidTokenError("Invalid token specified: must be a string");
  }
  options || (options = {});
  const pos = options.header === true ? 0 : 1;
  const part = token.split(".")[pos];
  if (typeof part !== "string") {
    throw new InvalidTokenError(`Invalid token specified: missing part #${pos + 1}`);
  }
  let decoded;
  try {
    decoded = base64UrlDecode(part);
  } catch (e) {
    throw new InvalidTokenError(`Invalid token specified: invalid base64 for part #${pos + 1} (${e.message})`);
  }
  try {
    return JSON.parse(decoded);
  } catch (e) {
    throw new InvalidTokenError(`Invalid token specified: invalid json for part #${pos + 1} (${e.message})`);
  }
}

// node_modules/keycloak-js/dist/keycloak.mjs
if (typeof Promise === "undefined") {
  throw Error("Keycloak requires an environment that supports Promises. Make sure that you include the appropriate polyfill.");
}
function Keycloak(config) {
  if (!(this instanceof Keycloak)) {
    throw new Error("The 'Keycloak' constructor must be invoked with 'new'.");
  }
  var kc = this;
  var adapter;
  var refreshQueue = [];
  var callbackStorage;
  var loginIframe = {
    enable: true,
    callbackList: [],
    interval: 5
  };
  var scripts = document.getElementsByTagName("script");
  for (var i = 0; i < scripts.length; i++) {
    if ((scripts[i].src.indexOf("keycloak.js") !== -1 || scripts[i].src.indexOf("keycloak.min.js") !== -1) && scripts[i].src.indexOf("version=") !== -1) {
      kc.iframeVersion = scripts[i].src.substring(scripts[i].src.indexOf("version=") + 8).split("&")[0];
    }
  }
  var useNonce = true;
  var logInfo = createLogger(console.info);
  var logWarn = createLogger(console.warn);
  kc.init = function (initOptions) {
    if (kc.didInitialize) {
      throw new Error("A 'Keycloak' instance can only be initialized once.");
    }
    kc.didInitialize = true;
    kc.authenticated = false;
    callbackStorage = createCallbackStorage();
    var adapters = ["default", "cordova", "cordova-native"];
    if (initOptions && adapters.indexOf(initOptions.adapter) > -1) {
      adapter = loadAdapter(initOptions.adapter);
    } else if (initOptions && typeof initOptions.adapter === "object") {
      adapter = initOptions.adapter;
    } else {
      if (window.Cordova || window.cordova) {
        adapter = loadAdapter("cordova");
      } else {
        adapter = loadAdapter();
      }
    }
    if (initOptions) {
      if (typeof initOptions.useNonce !== "undefined") {
        useNonce = initOptions.useNonce;
      }
      if (typeof initOptions.checkLoginIframe !== "undefined") {
        loginIframe.enable = initOptions.checkLoginIframe;
      }
      if (initOptions.checkLoginIframeInterval) {
        loginIframe.interval = initOptions.checkLoginIframeInterval;
      }
      if (initOptions.onLoad === "login-required") {
        kc.loginRequired = true;
      }
      if (initOptions.responseMode) {
        if (initOptions.responseMode === "query" || initOptions.responseMode === "fragment") {
          kc.responseMode = initOptions.responseMode;
        } else {
          throw "Invalid value for responseMode";
        }
      }
      if (initOptions.flow) {
        switch (initOptions.flow) {
          case "standard":
            kc.responseType = "code";
            break;
          case "implicit":
            kc.responseType = "id_token token";
            break;
          case "hybrid":
            kc.responseType = "code id_token token";
            break;
          default:
            throw "Invalid value for flow";
        }
        kc.flow = initOptions.flow;
      }
      if (initOptions.timeSkew != null) {
        kc.timeSkew = initOptions.timeSkew;
      }
      if (initOptions.redirectUri) {
        kc.redirectUri = initOptions.redirectUri;
      }
      if (initOptions.silentCheckSsoRedirectUri) {
        kc.silentCheckSsoRedirectUri = initOptions.silentCheckSsoRedirectUri;
      }
      if (typeof initOptions.silentCheckSsoFallback === "boolean") {
        kc.silentCheckSsoFallback = initOptions.silentCheckSsoFallback;
      } else {
        kc.silentCheckSsoFallback = true;
      }
      if (typeof initOptions.pkceMethod !== "undefined") {
        if (initOptions.pkceMethod !== "S256" && initOptions.pkceMethod !== false) {
          throw new TypeError(`Invalid value for pkceMethod', expected 'S256' or false but got ${initOptions.pkceMethod}.`);
        }
        kc.pkceMethod = initOptions.pkceMethod;
      } else {
        kc.pkceMethod = "S256";
      }
      if (typeof initOptions.enableLogging === "boolean") {
        kc.enableLogging = initOptions.enableLogging;
      } else {
        kc.enableLogging = false;
      }
      if (initOptions.logoutMethod === "POST") {
        kc.logoutMethod = "POST";
      } else {
        kc.logoutMethod = "GET";
      }
      if (typeof initOptions.scope === "string") {
        kc.scope = initOptions.scope;
      }
      if (typeof initOptions.acrValues === "string") {
        kc.acrValues = initOptions.acrValues;
      }
      if (typeof initOptions.messageReceiveTimeout === "number" && initOptions.messageReceiveTimeout > 0) {
        kc.messageReceiveTimeout = initOptions.messageReceiveTimeout;
      } else {
        kc.messageReceiveTimeout = 1e4;
      }
    }
    if (!kc.responseMode) {
      kc.responseMode = "fragment";
    }
    if (!kc.responseType) {
      kc.responseType = "code";
      kc.flow = "standard";
    }
    var promise = createPromise();
    var initPromise = createPromise();
    initPromise.promise.then(function () {
      kc.onReady && kc.onReady(kc.authenticated);
      promise.setSuccess(kc.authenticated);
    }).catch(function (error) {
      promise.setError(error);
    });
    var configPromise = loadConfig();
    function onLoad() {
      var doLogin = function (prompt) {
        if (!prompt) {
          options.prompt = "none";
        }
        if (initOptions && initOptions.locale) {
          options.locale = initOptions.locale;
        }
        kc.login(options).then(function () {
          initPromise.setSuccess();
        }).catch(function (error) {
          initPromise.setError(error);
        });
      };
      var checkSsoSilently = function () {
        var ifrm = document.createElement("iframe");
        var src = kc.createLoginUrl({
          prompt: "none",
          redirectUri: kc.silentCheckSsoRedirectUri
        });
        ifrm.setAttribute("src", src);
        ifrm.setAttribute("sandbox", "allow-storage-access-by-user-activation allow-scripts allow-same-origin");
        ifrm.setAttribute("title", "keycloak-silent-check-sso");
        ifrm.style.display = "none";
        document.body.appendChild(ifrm);
        var messageCallback = function (event) {
          if (event.origin !== window.location.origin || ifrm.contentWindow !== event.source) {
            return;
          }
          var oauth = parseCallback(event.data);
          processCallback(oauth, initPromise);
          document.body.removeChild(ifrm);
          window.removeEventListener("message", messageCallback);
        };
        window.addEventListener("message", messageCallback);
      };
      var options = {};
      switch (initOptions.onLoad) {
        case "check-sso":
          if (loginIframe.enable) {
            setupCheckLoginIframe().then(function () {
              checkLoginIframe().then(function (unchanged) {
                if (!unchanged) {
                  kc.silentCheckSsoRedirectUri ? checkSsoSilently() : doLogin(false);
                } else {
                  initPromise.setSuccess();
                }
              }).catch(function (error) {
                initPromise.setError(error);
              });
            });
          } else {
            kc.silentCheckSsoRedirectUri ? checkSsoSilently() : doLogin(false);
          }
          break;
        case "login-required":
          doLogin(true);
          break;
        default:
          throw "Invalid value for onLoad";
      }
    }
    function processInit() {
      var callback = parseCallback(window.location.href);
      if (callback) {
        window.history.replaceState(window.history.state, null, callback.newUrl);
      }
      if (callback && callback.valid) {
        return setupCheckLoginIframe().then(function () {
          processCallback(callback, initPromise);
        }).catch(function (error) {
          initPromise.setError(error);
        });
      } else if (initOptions) {
        if (initOptions.token && initOptions.refreshToken) {
          setToken(initOptions.token, initOptions.refreshToken, initOptions.idToken);
          if (loginIframe.enable) {
            setupCheckLoginIframe().then(function () {
              checkLoginIframe().then(function (unchanged) {
                if (unchanged) {
                  kc.onAuthSuccess && kc.onAuthSuccess();
                  initPromise.setSuccess();
                  scheduleCheckIframe();
                } else {
                  initPromise.setSuccess();
                }
              }).catch(function (error) {
                initPromise.setError(error);
              });
            });
          } else {
            kc.updateToken(-1).then(function () {
              kc.onAuthSuccess && kc.onAuthSuccess();
              initPromise.setSuccess();
            }).catch(function (error) {
              kc.onAuthError && kc.onAuthError();
              if (initOptions.onLoad) {
                onLoad();
              } else {
                initPromise.setError(error);
              }
            });
          }
        } else if (initOptions.onLoad) {
          onLoad();
        } else {
          initPromise.setSuccess();
        }
      } else {
        initPromise.setSuccess();
      }
    }
    function domReady() {
      var promise2 = createPromise();
      var checkReadyState = function () {
        if (document.readyState === "interactive" || document.readyState === "complete") {
          document.removeEventListener("readystatechange", checkReadyState);
          promise2.setSuccess();
        }
      };
      document.addEventListener("readystatechange", checkReadyState);
      checkReadyState();
      return promise2.promise;
    }
    configPromise.then(function () {
      domReady().then(check3pCookiesSupported).then(processInit).catch(function (error) {
        promise.setError(error);
      });
    });
    configPromise.catch(function (error) {
      promise.setError(error);
    });
    return promise.promise;
  };
  kc.login = function (options) {
    return adapter.login(options);
  };
  function generateRandomData(len) {
    var array = null;
    var crypto = window.crypto || window.msCrypto;
    if (crypto && crypto.getRandomValues && window.Uint8Array) {
      array = new Uint8Array(len);
      crypto.getRandomValues(array);
      return array;
    }
    array = new Array(len);
    for (var j = 0; j < array.length; j++) {
      array[j] = Math.floor(256 * Math.random());
    }
    return array;
  }
  function generateCodeVerifier(len) {
    return generateRandomString(len, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");
  }
  function generateRandomString(len, alphabet) {
    var randomData = generateRandomData(len);
    var chars = new Array(len);
    for (var i2 = 0; i2 < len; i2++) {
      chars[i2] = alphabet.charCodeAt(randomData[i2] % alphabet.length);
    }
    return String.fromCharCode.apply(null, chars);
  }
  function generatePkceChallenge(pkceMethod, codeVerifier) {
    if (pkceMethod !== "S256") {
      throw new TypeError(`Invalid value for 'pkceMethod', expected 'S256' but got '${pkceMethod}'.`);
    }
    const hashBytes = new Uint8Array(import_js_sha256.default.arrayBuffer(codeVerifier));
    const encodedHash = bytesToBase64(hashBytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
    return encodedHash;
  }
  function buildClaimsParameter(requestedAcr) {
    var claims = {
      id_token: {
        acr: requestedAcr
      }
    };
    return JSON.stringify(claims);
  }
  kc.createLoginUrl = function (options) {
    var state = createUUID();
    var nonce = createUUID();
    var redirectUri = adapter.redirectUri(options);
    var callbackState = {
      state,
      nonce,
      redirectUri: encodeURIComponent(redirectUri)
    };
    if (options && options.prompt) {
      callbackState.prompt = options.prompt;
    }
    var baseUrl;
    if (options && options.action == "register") {
      baseUrl = kc.endpoints.register();
    } else {
      baseUrl = kc.endpoints.authorize();
    }
    var scope = options && options.scope || kc.scope;
    if (!scope) {
      scope = "openid";
    } else if (scope.indexOf("openid") === -1) {
      scope = "openid " + scope;
    }
    var url = baseUrl + "?client_id=" + encodeURIComponent(kc.clientId) + "&redirect_uri=" + encodeURIComponent(redirectUri) + "&state=" + encodeURIComponent(state) + "&response_mode=" + encodeURIComponent(kc.responseMode) + "&response_type=" + encodeURIComponent(kc.responseType) + "&scope=" + encodeURIComponent(scope);
    if (useNonce) {
      url = url + "&nonce=" + encodeURIComponent(nonce);
    }
    if (options && options.prompt) {
      url += "&prompt=" + encodeURIComponent(options.prompt);
    }
    if (options && options.maxAge) {
      url += "&max_age=" + encodeURIComponent(options.maxAge);
    }
    if (options && options.loginHint) {
      url += "&login_hint=" + encodeURIComponent(options.loginHint);
    }
    if (options && options.idpHint) {
      url += "&kc_idp_hint=" + encodeURIComponent(options.idpHint);
    }
    if (options && options.action && options.action != "register") {
      url += "&kc_action=" + encodeURIComponent(options.action);
    }
    if (options && options.locale) {
      url += "&ui_locales=" + encodeURIComponent(options.locale);
    }
    if (options && options.acr) {
      var claimsParameter = buildClaimsParameter(options.acr);
      url += "&claims=" + encodeURIComponent(claimsParameter);
    }
    if (options && options.acrValues || kc.acrValues) {
      url += "&acr_values=" + encodeURIComponent(options.acrValues || kc.acrValues);
    }
    if (kc.pkceMethod) {
      var codeVerifier = generateCodeVerifier(96);
      callbackState.pkceCodeVerifier = codeVerifier;
      var pkceChallenge = generatePkceChallenge(kc.pkceMethod, codeVerifier);
      url += "&code_challenge=" + pkceChallenge;
      url += "&code_challenge_method=" + kc.pkceMethod;
    }
    callbackStorage.add(callbackState);
    return url;
  };
  kc.logout = function (options) {
    return adapter.logout(options);
  };
  kc.createLogoutUrl = function (options) {
    const logoutMethod = options?.logoutMethod ?? kc.logoutMethod;
    if (logoutMethod === "POST") {
      return kc.endpoints.logout();
    }
    var url = kc.endpoints.logout() + "?client_id=" + encodeURIComponent(kc.clientId) + "&post_logout_redirect_uri=" + encodeURIComponent(adapter.redirectUri(options, false));
    if (kc.idToken) {
      url += "&id_token_hint=" + encodeURIComponent(kc.idToken);
    }
    return url;
  };
  kc.register = function (options) {
    return adapter.register(options);
  };
  kc.createRegisterUrl = function (options) {
    if (!options) {
      options = {};
    }
    options.action = "register";
    return kc.createLoginUrl(options);
  };
  kc.createAccountUrl = function (options) {
    var realm = getRealmUrl();
    var url = void 0;
    if (typeof realm !== "undefined") {
      url = realm + "/account?referrer=" + encodeURIComponent(kc.clientId) + "&referrer_uri=" + encodeURIComponent(adapter.redirectUri(options));
    }
    return url;
  };
  kc.accountManagement = function () {
    return adapter.accountManagement();
  };
  kc.hasRealmRole = function (role) {
    var access = kc.realmAccess;
    return !!access && access.roles.indexOf(role) >= 0;
  };
  kc.hasResourceRole = function (role, resource) {
    if (!kc.resourceAccess) {
      return false;
    }
    var access = kc.resourceAccess[resource || kc.clientId];
    return !!access && access.roles.indexOf(role) >= 0;
  };
  kc.loadUserProfile = function () {
    var url = getRealmUrl() + "/account";
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Authorization", "bearer " + kc.token);
    var promise = createPromise();
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if (req.status == 200) {
          kc.profile = JSON.parse(req.responseText);
          promise.setSuccess(kc.profile);
        } else {
          promise.setError();
        }
      }
    };
    req.send();
    return promise.promise;
  };
  kc.loadUserInfo = function () {
    var url = kc.endpoints.userinfo();
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Authorization", "bearer " + kc.token);
    var promise = createPromise();
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if (req.status == 200) {
          kc.userInfo = JSON.parse(req.responseText);
          promise.setSuccess(kc.userInfo);
        } else {
          promise.setError();
        }
      }
    };
    req.send();
    return promise.promise;
  };
  kc.isTokenExpired = function (minValidity) {
    if (!kc.tokenParsed || !kc.refreshToken && kc.flow != "implicit") {
      throw "Not authenticated";
    }
    if (kc.timeSkew == null) {
      logInfo("[KEYCLOAK] Unable to determine if token is expired as timeskew is not set");
      return true;
    }
    var expiresIn = kc.tokenParsed["exp"] - Math.ceil((/* @__PURE__ */new Date()).getTime() / 1e3) + kc.timeSkew;
    if (minValidity) {
      if (isNaN(minValidity)) {
        throw "Invalid minValidity";
      }
      expiresIn -= minValidity;
    }
    return expiresIn < 0;
  };
  kc.updateToken = function (minValidity) {
    var promise = createPromise();
    if (!kc.refreshToken) {
      promise.setError();
      return promise.promise;
    }
    minValidity = minValidity || 5;
    var exec = function () {
      var refreshToken = false;
      if (minValidity == -1) {
        refreshToken = true;
        logInfo("[KEYCLOAK] Refreshing token: forced refresh");
      } else if (!kc.tokenParsed || kc.isTokenExpired(minValidity)) {
        refreshToken = true;
        logInfo("[KEYCLOAK] Refreshing token: token expired");
      }
      if (!refreshToken) {
        promise.setSuccess(false);
      } else {
        var params = "grant_type=refresh_token&refresh_token=" + kc.refreshToken;
        var url = kc.endpoints.token();
        refreshQueue.push(promise);
        if (refreshQueue.length == 1) {
          var req = new XMLHttpRequest();
          req.open("POST", url, true);
          req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          req.withCredentials = true;
          params += "&client_id=" + encodeURIComponent(kc.clientId);
          var timeLocal = (/* @__PURE__ */new Date()).getTime();
          req.onreadystatechange = function () {
            if (req.readyState == 4) {
              if (req.status == 200) {
                logInfo("[KEYCLOAK] Token refreshed");
                timeLocal = (timeLocal + (/* @__PURE__ */new Date()).getTime()) / 2;
                var tokenResponse = JSON.parse(req.responseText);
                setToken(tokenResponse["access_token"], tokenResponse["refresh_token"], tokenResponse["id_token"], timeLocal);
                kc.onAuthRefreshSuccess && kc.onAuthRefreshSuccess();
                for (var p = refreshQueue.pop(); p != null; p = refreshQueue.pop()) {
                  p.setSuccess(true);
                }
              } else {
                logWarn("[KEYCLOAK] Failed to refresh token");
                if (req.status == 400) {
                  kc.clearToken();
                }
                kc.onAuthRefreshError && kc.onAuthRefreshError();
                for (var p = refreshQueue.pop(); p != null; p = refreshQueue.pop()) {
                  p.setError(true);
                }
              }
            }
          };
          req.send(params);
        }
      }
    };
    if (loginIframe.enable) {
      var iframePromise = checkLoginIframe();
      iframePromise.then(function () {
        exec();
      }).catch(function (error) {
        promise.setError(error);
      });
    } else {
      exec();
    }
    return promise.promise;
  };
  kc.clearToken = function () {
    if (kc.token) {
      setToken(null, null, null);
      kc.onAuthLogout && kc.onAuthLogout();
      if (kc.loginRequired) {
        kc.login();
      }
    }
  };
  function getRealmUrl() {
    if (typeof kc.authServerUrl !== "undefined") {
      if (kc.authServerUrl.charAt(kc.authServerUrl.length - 1) == "/") {
        return kc.authServerUrl + "realms/" + encodeURIComponent(kc.realm);
      } else {
        return kc.authServerUrl + "/realms/" + encodeURIComponent(kc.realm);
      }
    } else {
      return void 0;
    }
  }
  function getOrigin() {
    if (!window.location.origin) {
      return window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
    } else {
      return window.location.origin;
    }
  }
  function processCallback(oauth, promise) {
    var code = oauth.code;
    var error = oauth.error;
    var prompt = oauth.prompt;
    var timeLocal = (/* @__PURE__ */new Date()).getTime();
    if (oauth["kc_action_status"]) {
      kc.onActionUpdate && kc.onActionUpdate(oauth["kc_action_status"]);
    }
    if (error) {
      if (prompt != "none") {
        var errorData = {
          error,
          error_description: oauth.error_description
        };
        kc.onAuthError && kc.onAuthError(errorData);
        promise && promise.setError(errorData);
      } else {
        promise && promise.setSuccess();
      }
      return;
    } else if (kc.flow != "standard" && (oauth.access_token || oauth.id_token)) {
      authSuccess(oauth.access_token, null, oauth.id_token, true);
    }
    if (kc.flow != "implicit" && code) {
      var params = "code=" + code + "&grant_type=authorization_code";
      var url = kc.endpoints.token();
      var req = new XMLHttpRequest();
      req.open("POST", url, true);
      req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      params += "&client_id=" + encodeURIComponent(kc.clientId);
      params += "&redirect_uri=" + oauth.redirectUri;
      if (oauth.pkceCodeVerifier) {
        params += "&code_verifier=" + oauth.pkceCodeVerifier;
      }
      req.withCredentials = true;
      req.onreadystatechange = function () {
        if (req.readyState == 4) {
          if (req.status == 200) {
            var tokenResponse = JSON.parse(req.responseText);
            authSuccess(tokenResponse["access_token"], tokenResponse["refresh_token"], tokenResponse["id_token"], kc.flow === "standard");
            scheduleCheckIframe();
          } else {
            kc.onAuthError && kc.onAuthError();
            promise && promise.setError();
          }
        }
      };
      req.send(params);
    }
    function authSuccess(accessToken, refreshToken, idToken, fulfillPromise) {
      timeLocal = (timeLocal + (/* @__PURE__ */new Date()).getTime()) / 2;
      setToken(accessToken, refreshToken, idToken, timeLocal);
      if (useNonce && kc.idTokenParsed && kc.idTokenParsed.nonce != oauth.storedNonce) {
        logInfo("[KEYCLOAK] Invalid nonce, clearing token");
        kc.clearToken();
        promise && promise.setError();
      } else {
        if (fulfillPromise) {
          kc.onAuthSuccess && kc.onAuthSuccess();
          promise && promise.setSuccess();
        }
      }
    }
  }
  function loadConfig(url) {
    var promise = createPromise();
    var configUrl;
    if (!config) {
      configUrl = "keycloak.json";
    } else if (typeof config === "string") {
      configUrl = config;
    }
    function setupOidcEndoints(oidcConfiguration) {
      if (!oidcConfiguration) {
        kc.endpoints = {
          authorize: function () {
            return getRealmUrl() + "/protocol/openid-connect/auth";
          },
          token: function () {
            return getRealmUrl() + "/protocol/openid-connect/token";
          },
          logout: function () {
            return getRealmUrl() + "/protocol/openid-connect/logout";
          },
          checkSessionIframe: function () {
            var src = getRealmUrl() + "/protocol/openid-connect/login-status-iframe.html";
            if (kc.iframeVersion) {
              src = src + "?version=" + kc.iframeVersion;
            }
            return src;
          },
          thirdPartyCookiesIframe: function () {
            var src = getRealmUrl() + "/protocol/openid-connect/3p-cookies/step1.html";
            if (kc.iframeVersion) {
              src = src + "?version=" + kc.iframeVersion;
            }
            return src;
          },
          register: function () {
            return getRealmUrl() + "/protocol/openid-connect/registrations";
          },
          userinfo: function () {
            return getRealmUrl() + "/protocol/openid-connect/userinfo";
          }
        };
      } else {
        kc.endpoints = {
          authorize: function () {
            return oidcConfiguration.authorization_endpoint;
          },
          token: function () {
            return oidcConfiguration.token_endpoint;
          },
          logout: function () {
            if (!oidcConfiguration.end_session_endpoint) {
              throw "Not supported by the OIDC server";
            }
            return oidcConfiguration.end_session_endpoint;
          },
          checkSessionIframe: function () {
            if (!oidcConfiguration.check_session_iframe) {
              throw "Not supported by the OIDC server";
            }
            return oidcConfiguration.check_session_iframe;
          },
          register: function () {
            throw 'Redirection to "Register user" page not supported in standard OIDC mode';
          },
          userinfo: function () {
            if (!oidcConfiguration.userinfo_endpoint) {
              throw "Not supported by the OIDC server";
            }
            return oidcConfiguration.userinfo_endpoint;
          }
        };
      }
    }
    if (configUrl) {
      var req = new XMLHttpRequest();
      req.open("GET", configUrl, true);
      req.setRequestHeader("Accept", "application/json");
      req.onreadystatechange = function () {
        if (req.readyState == 4) {
          if (req.status == 200 || fileLoaded(req)) {
            var config2 = JSON.parse(req.responseText);
            kc.authServerUrl = config2["auth-server-url"];
            kc.realm = config2["realm"];
            kc.clientId = config2["resource"];
            setupOidcEndoints(null);
            promise.setSuccess();
          } else {
            promise.setError();
          }
        }
      };
      req.send();
    } else {
      if (!config.clientId) {
        throw "clientId missing";
      }
      kc.clientId = config.clientId;
      var oidcProvider = config["oidcProvider"];
      if (!oidcProvider) {
        if (!config["url"]) {
          var scripts2 = document.getElementsByTagName("script");
          for (var i2 = 0; i2 < scripts2.length; i2++) {
            if (scripts2[i2].src.match(/.*keycloak\.js/)) {
              config.url = scripts2[i2].src.substr(0, scripts2[i2].src.indexOf("/js/keycloak.js"));
              break;
            }
          }
        }
        if (!config.realm) {
          throw "realm missing";
        }
        kc.authServerUrl = config.url;
        kc.realm = config.realm;
        setupOidcEndoints(null);
        promise.setSuccess();
      } else {
        if (typeof oidcProvider === "string") {
          var oidcProviderConfigUrl;
          if (oidcProvider.charAt(oidcProvider.length - 1) == "/") {
            oidcProviderConfigUrl = oidcProvider + ".well-known/openid-configuration";
          } else {
            oidcProviderConfigUrl = oidcProvider + "/.well-known/openid-configuration";
          }
          var req = new XMLHttpRequest();
          req.open("GET", oidcProviderConfigUrl, true);
          req.setRequestHeader("Accept", "application/json");
          req.onreadystatechange = function () {
            if (req.readyState == 4) {
              if (req.status == 200 || fileLoaded(req)) {
                var oidcProviderConfig = JSON.parse(req.responseText);
                setupOidcEndoints(oidcProviderConfig);
                promise.setSuccess();
              } else {
                promise.setError();
              }
            }
          };
          req.send();
        } else {
          setupOidcEndoints(oidcProvider);
          promise.setSuccess();
        }
      }
    }
    return promise.promise;
  }
  function fileLoaded(xhr) {
    return xhr.status == 0 && xhr.responseText && xhr.responseURL.startsWith("file:");
  }
  function setToken(token, refreshToken, idToken, timeLocal) {
    if (kc.tokenTimeoutHandle) {
      clearTimeout(kc.tokenTimeoutHandle);
      kc.tokenTimeoutHandle = null;
    }
    if (refreshToken) {
      kc.refreshToken = refreshToken;
      kc.refreshTokenParsed = jwtDecode(refreshToken);
    } else {
      delete kc.refreshToken;
      delete kc.refreshTokenParsed;
    }
    if (idToken) {
      kc.idToken = idToken;
      kc.idTokenParsed = jwtDecode(idToken);
    } else {
      delete kc.idToken;
      delete kc.idTokenParsed;
    }
    if (token) {
      kc.token = token;
      kc.tokenParsed = jwtDecode(token);
      kc.sessionId = kc.tokenParsed.sid;
      kc.authenticated = true;
      kc.subject = kc.tokenParsed.sub;
      kc.realmAccess = kc.tokenParsed.realm_access;
      kc.resourceAccess = kc.tokenParsed.resource_access;
      if (timeLocal) {
        kc.timeSkew = Math.floor(timeLocal / 1e3) - kc.tokenParsed.iat;
      }
      if (kc.timeSkew != null) {
        logInfo("[KEYCLOAK] Estimated time difference between browser and server is " + kc.timeSkew + " seconds");
        if (kc.onTokenExpired) {
          var expiresIn = (kc.tokenParsed["exp"] - (/* @__PURE__ */new Date()).getTime() / 1e3 + kc.timeSkew) * 1e3;
          logInfo("[KEYCLOAK] Token expires in " + Math.round(expiresIn / 1e3) + " s");
          if (expiresIn <= 0) {
            kc.onTokenExpired();
          } else {
            kc.tokenTimeoutHandle = setTimeout(kc.onTokenExpired, expiresIn);
          }
        }
      }
    } else {
      delete kc.token;
      delete kc.tokenParsed;
      delete kc.subject;
      delete kc.realmAccess;
      delete kc.resourceAccess;
      kc.authenticated = false;
    }
  }
  function createUUID() {
    var hexDigits = "0123456789abcdef";
    var s = generateRandomString(36, hexDigits).split("");
    s[14] = "4";
    s[19] = hexDigits.substr(s[19] & 3 | 8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
  }
  function parseCallback(url) {
    var oauth = parseCallbackUrl(url);
    if (!oauth) {
      return;
    }
    var oauthState = callbackStorage.get(oauth.state);
    if (oauthState) {
      oauth.valid = true;
      oauth.redirectUri = oauthState.redirectUri;
      oauth.storedNonce = oauthState.nonce;
      oauth.prompt = oauthState.prompt;
      oauth.pkceCodeVerifier = oauthState.pkceCodeVerifier;
    }
    return oauth;
  }
  function parseCallbackUrl(url) {
    var supportedParams;
    switch (kc.flow) {
      case "standard":
        supportedParams = ["code", "state", "session_state", "kc_action_status", "iss"];
        break;
      case "implicit":
        supportedParams = ["access_token", "token_type", "id_token", "state", "session_state", "expires_in", "kc_action_status", "iss"];
        break;
      case "hybrid":
        supportedParams = ["access_token", "token_type", "id_token", "code", "state", "session_state", "expires_in", "kc_action_status", "iss"];
        break;
    }
    supportedParams.push("error");
    supportedParams.push("error_description");
    supportedParams.push("error_uri");
    var queryIndex = url.indexOf("?");
    var fragmentIndex = url.indexOf("#");
    var newUrl;
    var parsed;
    if (kc.responseMode === "query" && queryIndex !== -1) {
      newUrl = url.substring(0, queryIndex);
      parsed = parseCallbackParams(url.substring(queryIndex + 1, fragmentIndex !== -1 ? fragmentIndex : url.length), supportedParams);
      if (parsed.paramsString !== "") {
        newUrl += "?" + parsed.paramsString;
      }
      if (fragmentIndex !== -1) {
        newUrl += url.substring(fragmentIndex);
      }
    } else if (kc.responseMode === "fragment" && fragmentIndex !== -1) {
      newUrl = url.substring(0, fragmentIndex);
      parsed = parseCallbackParams(url.substring(fragmentIndex + 1), supportedParams);
      if (parsed.paramsString !== "") {
        newUrl += "#" + parsed.paramsString;
      }
    }
    if (parsed && parsed.oauthParams) {
      if (kc.flow === "standard" || kc.flow === "hybrid") {
        if ((parsed.oauthParams.code || parsed.oauthParams.error) && parsed.oauthParams.state) {
          parsed.oauthParams.newUrl = newUrl;
          return parsed.oauthParams;
        }
      } else if (kc.flow === "implicit") {
        if ((parsed.oauthParams.access_token || parsed.oauthParams.error) && parsed.oauthParams.state) {
          parsed.oauthParams.newUrl = newUrl;
          return parsed.oauthParams;
        }
      }
    }
  }
  function parseCallbackParams(paramsString, supportedParams) {
    var p = paramsString.split("&");
    var result = {
      paramsString: "",
      oauthParams: {}
    };
    for (var i2 = 0; i2 < p.length; i2++) {
      var split = p[i2].indexOf("=");
      var key = p[i2].slice(0, split);
      if (supportedParams.indexOf(key) !== -1) {
        result.oauthParams[key] = p[i2].slice(split + 1);
      } else {
        if (result.paramsString !== "") {
          result.paramsString += "&";
        }
        result.paramsString += p[i2];
      }
    }
    return result;
  }
  function createPromise() {
    var p = {
      setSuccess: function (result) {
        p.resolve(result);
      },
      setError: function (result) {
        p.reject(result);
      }
    };
    p.promise = new Promise(function (resolve, reject) {
      p.resolve = resolve;
      p.reject = reject;
    });
    return p;
  }
  function applyTimeoutToPromise(promise, timeout, errorMessage) {
    var timeoutHandle = null;
    var timeoutPromise = new Promise(function (resolve, reject) {
      timeoutHandle = setTimeout(function () {
        reject({
          "error": errorMessage || "Promise is not settled within timeout of " + timeout + "ms"
        });
      }, timeout);
    });
    return Promise.race([promise, timeoutPromise]).finally(function () {
      clearTimeout(timeoutHandle);
    });
  }
  function setupCheckLoginIframe() {
    var promise = createPromise();
    if (!loginIframe.enable) {
      promise.setSuccess();
      return promise.promise;
    }
    if (loginIframe.iframe) {
      promise.setSuccess();
      return promise.promise;
    }
    var iframe = document.createElement("iframe");
    loginIframe.iframe = iframe;
    iframe.onload = function () {
      var authUrl = kc.endpoints.authorize();
      if (authUrl.charAt(0) === "/") {
        loginIframe.iframeOrigin = getOrigin();
      } else {
        loginIframe.iframeOrigin = authUrl.substring(0, authUrl.indexOf("/", 8));
      }
      promise.setSuccess();
    };
    var src = kc.endpoints.checkSessionIframe();
    iframe.setAttribute("src", src);
    iframe.setAttribute("sandbox", "allow-storage-access-by-user-activation allow-scripts allow-same-origin");
    iframe.setAttribute("title", "keycloak-session-iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    var messageCallback = function (event) {
      if (event.origin !== loginIframe.iframeOrigin || loginIframe.iframe.contentWindow !== event.source) {
        return;
      }
      if (!(event.data == "unchanged" || event.data == "changed" || event.data == "error")) {
        return;
      }
      if (event.data != "unchanged") {
        kc.clearToken();
      }
      var callbacks = loginIframe.callbackList.splice(0, loginIframe.callbackList.length);
      for (var i2 = callbacks.length - 1; i2 >= 0; --i2) {
        var promise2 = callbacks[i2];
        if (event.data == "error") {
          promise2.setError();
        } else {
          promise2.setSuccess(event.data == "unchanged");
        }
      }
    };
    window.addEventListener("message", messageCallback, false);
    return promise.promise;
  }
  function scheduleCheckIframe() {
    if (loginIframe.enable) {
      if (kc.token) {
        setTimeout(function () {
          checkLoginIframe().then(function (unchanged) {
            if (unchanged) {
              scheduleCheckIframe();
            }
          });
        }, loginIframe.interval * 1e3);
      }
    }
  }
  function checkLoginIframe() {
    var promise = createPromise();
    if (loginIframe.iframe && loginIframe.iframeOrigin) {
      var msg = kc.clientId + " " + (kc.sessionId ? kc.sessionId : "");
      loginIframe.callbackList.push(promise);
      var origin = loginIframe.iframeOrigin;
      if (loginIframe.callbackList.length == 1) {
        loginIframe.iframe.contentWindow.postMessage(msg, origin);
      }
    } else {
      promise.setSuccess();
    }
    return promise.promise;
  }
  function check3pCookiesSupported() {
    var promise = createPromise();
    if (loginIframe.enable || kc.silentCheckSsoRedirectUri) {
      var iframe = document.createElement("iframe");
      iframe.setAttribute("src", kc.endpoints.thirdPartyCookiesIframe());
      iframe.setAttribute("sandbox", "allow-storage-access-by-user-activation allow-scripts allow-same-origin");
      iframe.setAttribute("title", "keycloak-3p-check-iframe");
      iframe.style.display = "none";
      document.body.appendChild(iframe);
      var messageCallback = function (event) {
        if (iframe.contentWindow !== event.source) {
          return;
        }
        if (event.data !== "supported" && event.data !== "unsupported") {
          return;
        } else if (event.data === "unsupported") {
          logWarn("[KEYCLOAK] Your browser is blocking access to 3rd-party cookies, this means:\n\n - It is not possible to retrieve tokens without redirecting to the Keycloak server (a.k.a. no support for silent authentication).\n - It is not possible to automatically detect changes to the session status (such as the user logging out in another tab).\n\nFor more information see: https://www.keycloak.org/docs/latest/securing_apps/#_modern_browsers");
          loginIframe.enable = false;
          if (kc.silentCheckSsoFallback) {
            kc.silentCheckSsoRedirectUri = false;
          }
        }
        document.body.removeChild(iframe);
        window.removeEventListener("message", messageCallback);
        promise.setSuccess();
      };
      window.addEventListener("message", messageCallback, false);
    } else {
      promise.setSuccess();
    }
    return applyTimeoutToPromise(promise.promise, kc.messageReceiveTimeout, "Timeout when waiting for 3rd party check iframe message.");
  }
  function loadAdapter(type) {
    if (!type || type == "default") {
      return {
        login: function (options) {
          window.location.assign(kc.createLoginUrl(options));
          return createPromise().promise;
        },
        logout: function (options) {
          return __async(this, null, function* () {
            const logoutMethod = options?.logoutMethod ?? kc.logoutMethod;
            if (logoutMethod === "GET") {
              window.location.replace(kc.createLogoutUrl(options));
              return;
            }
            const logoutUrl = kc.createLogoutUrl(options);
            const response = yield fetch(logoutUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              body: new URLSearchParams({
                id_token_hint: kc.idToken,
                client_id: kc.clientId,
                post_logout_redirect_uri: adapter.redirectUri(options, false)
              })
            });
            if (response.redirected) {
              window.location.href = response.url;
              return;
            }
            if (response.ok) {
              window.location.reload();
              return;
            }
            throw new Error("Logout failed, request returned an error code.");
          });
        },
        register: function (options) {
          window.location.assign(kc.createRegisterUrl(options));
          return createPromise().promise;
        },
        accountManagement: function () {
          var accountUrl = kc.createAccountUrl();
          if (typeof accountUrl !== "undefined") {
            window.location.href = accountUrl;
          } else {
            throw "Not supported by the OIDC server";
          }
          return createPromise().promise;
        },
        redirectUri: function (options, encodeHash) {
          if (options && options.redirectUri) {
            return options.redirectUri;
          } else if (kc.redirectUri) {
            return kc.redirectUri;
          } else {
            return location.href;
          }
        }
      };
    }
    if (type == "cordova") {
      loginIframe.enable = false;
      var cordovaOpenWindowWrapper = function (loginUrl, target, options) {
        if (window.cordova && window.cordova.InAppBrowser) {
          return window.cordova.InAppBrowser.open(loginUrl, target, options);
        } else {
          return window.open(loginUrl, target, options);
        }
      };
      var shallowCloneCordovaOptions = function (userOptions) {
        if (userOptions && userOptions.cordovaOptions) {
          return Object.keys(userOptions.cordovaOptions).reduce(function (options, optionName) {
            options[optionName] = userOptions.cordovaOptions[optionName];
            return options;
          }, {});
        } else {
          return {};
        }
      };
      var formatCordovaOptions = function (cordovaOptions) {
        return Object.keys(cordovaOptions).reduce(function (options, optionName) {
          options.push(optionName + "=" + cordovaOptions[optionName]);
          return options;
        }, []).join(",");
      };
      var createCordovaOptions = function (userOptions) {
        var cordovaOptions = shallowCloneCordovaOptions(userOptions);
        cordovaOptions.location = "no";
        if (userOptions && userOptions.prompt == "none") {
          cordovaOptions.hidden = "yes";
        }
        return formatCordovaOptions(cordovaOptions);
      };
      var getCordovaRedirectUri = function () {
        return kc.redirectUri || "http://localhost";
      };
      return {
        login: function (options) {
          var promise = createPromise();
          var cordovaOptions = createCordovaOptions(options);
          var loginUrl = kc.createLoginUrl(options);
          var ref = cordovaOpenWindowWrapper(loginUrl, "_blank", cordovaOptions);
          var completed = false;
          var closed = false;
          var closeBrowser = function () {
            closed = true;
            ref.close();
          };
          ref.addEventListener("loadstart", function (event) {
            if (event.url.indexOf(getCordovaRedirectUri()) == 0) {
              var callback = parseCallback(event.url);
              processCallback(callback, promise);
              closeBrowser();
              completed = true;
            }
          });
          ref.addEventListener("loaderror", function (event) {
            if (!completed) {
              if (event.url.indexOf(getCordovaRedirectUri()) == 0) {
                var callback = parseCallback(event.url);
                processCallback(callback, promise);
                closeBrowser();
                completed = true;
              } else {
                promise.setError();
                closeBrowser();
              }
            }
          });
          ref.addEventListener("exit", function (event) {
            if (!closed) {
              promise.setError({
                reason: "closed_by_user"
              });
            }
          });
          return promise.promise;
        },
        logout: function (options) {
          var promise = createPromise();
          var logoutUrl = kc.createLogoutUrl(options);
          var ref = cordovaOpenWindowWrapper(logoutUrl, "_blank", "location=no,hidden=yes,clearcache=yes");
          var error;
          ref.addEventListener("loadstart", function (event) {
            if (event.url.indexOf(getCordovaRedirectUri()) == 0) {
              ref.close();
            }
          });
          ref.addEventListener("loaderror", function (event) {
            if (event.url.indexOf(getCordovaRedirectUri()) == 0) {
              ref.close();
            } else {
              error = true;
              ref.close();
            }
          });
          ref.addEventListener("exit", function (event) {
            if (error) {
              promise.setError();
            } else {
              kc.clearToken();
              promise.setSuccess();
            }
          });
          return promise.promise;
        },
        register: function (options) {
          var promise = createPromise();
          var registerUrl = kc.createRegisterUrl();
          var cordovaOptions = createCordovaOptions(options);
          var ref = cordovaOpenWindowWrapper(registerUrl, "_blank", cordovaOptions);
          ref.addEventListener("loadstart", function (event) {
            if (event.url.indexOf(getCordovaRedirectUri()) == 0) {
              ref.close();
              var oauth = parseCallback(event.url);
              processCallback(oauth, promise);
            }
          });
          return promise.promise;
        },
        accountManagement: function () {
          var accountUrl = kc.createAccountUrl();
          if (typeof accountUrl !== "undefined") {
            var ref = cordovaOpenWindowWrapper(accountUrl, "_blank", "location=no");
            ref.addEventListener("loadstart", function (event) {
              if (event.url.indexOf(getCordovaRedirectUri()) == 0) {
                ref.close();
              }
            });
          } else {
            throw "Not supported by the OIDC server";
          }
        },
        redirectUri: function (options) {
          return getCordovaRedirectUri();
        }
      };
    }
    if (type == "cordova-native") {
      loginIframe.enable = false;
      return {
        login: function (options) {
          var promise = createPromise();
          var loginUrl = kc.createLoginUrl(options);
          universalLinks.subscribe("keycloak", function (event) {
            universalLinks.unsubscribe("keycloak");
            window.cordova.plugins.browsertab.close();
            var oauth = parseCallback(event.url);
            processCallback(oauth, promise);
          });
          window.cordova.plugins.browsertab.openUrl(loginUrl);
          return promise.promise;
        },
        logout: function (options) {
          var promise = createPromise();
          var logoutUrl = kc.createLogoutUrl(options);
          universalLinks.subscribe("keycloak", function (event) {
            universalLinks.unsubscribe("keycloak");
            window.cordova.plugins.browsertab.close();
            kc.clearToken();
            promise.setSuccess();
          });
          window.cordova.plugins.browsertab.openUrl(logoutUrl);
          return promise.promise;
        },
        register: function (options) {
          var promise = createPromise();
          var registerUrl = kc.createRegisterUrl(options);
          universalLinks.subscribe("keycloak", function (event) {
            universalLinks.unsubscribe("keycloak");
            window.cordova.plugins.browsertab.close();
            var oauth = parseCallback(event.url);
            processCallback(oauth, promise);
          });
          window.cordova.plugins.browsertab.openUrl(registerUrl);
          return promise.promise;
        },
        accountManagement: function () {
          var accountUrl = kc.createAccountUrl();
          if (typeof accountUrl !== "undefined") {
            window.cordova.plugins.browsertab.openUrl(accountUrl);
          } else {
            throw "Not supported by the OIDC server";
          }
        },
        redirectUri: function (options) {
          if (options && options.redirectUri) {
            return options.redirectUri;
          } else if (kc.redirectUri) {
            return kc.redirectUri;
          } else {
            return "http://localhost";
          }
        }
      };
    }
    throw "invalid adapter type: " + type;
  }
  var LocalStorage = function () {
    if (!(this instanceof LocalStorage)) {
      return new LocalStorage();
    }
    localStorage.setItem("kc-test", "test");
    localStorage.removeItem("kc-test");
    var cs = this;
    function clearExpired() {
      var time = (/* @__PURE__ */new Date()).getTime();
      for (var i2 = 0; i2 < localStorage.length; i2++) {
        var key = localStorage.key(i2);
        if (key && key.indexOf("kc-callback-") == 0) {
          var value = localStorage.getItem(key);
          if (value) {
            try {
              var expires = JSON.parse(value).expires;
              if (!expires || expires < time) {
                localStorage.removeItem(key);
              }
            } catch (err) {
              localStorage.removeItem(key);
            }
          }
        }
      }
    }
    cs.get = function (state) {
      if (!state) {
        return;
      }
      var key = "kc-callback-" + state;
      var value = localStorage.getItem(key);
      if (value) {
        localStorage.removeItem(key);
        value = JSON.parse(value);
      }
      clearExpired();
      return value;
    };
    cs.add = function (state) {
      clearExpired();
      var key = "kc-callback-" + state.state;
      state.expires = (/* @__PURE__ */new Date()).getTime() + 60 * 60 * 1e3;
      localStorage.setItem(key, JSON.stringify(state));
    };
  };
  var CookieStorage = function () {
    if (!(this instanceof CookieStorage)) {
      return new CookieStorage();
    }
    var cs = this;
    cs.get = function (state) {
      if (!state) {
        return;
      }
      var value = getCookie("kc-callback-" + state);
      setCookie("kc-callback-" + state, "", cookieExpiration(-100));
      if (value) {
        return JSON.parse(value);
      }
    };
    cs.add = function (state) {
      setCookie("kc-callback-" + state.state, JSON.stringify(state), cookieExpiration(60));
    };
    cs.removeItem = function (key) {
      setCookie(key, "", cookieExpiration(-100));
    };
    var cookieExpiration = function (minutes) {
      var exp = /* @__PURE__ */new Date();
      exp.setTime(exp.getTime() + minutes * 60 * 1e3);
      return exp;
    };
    var getCookie = function (key) {
      var name = key + "=";
      var ca = document.cookie.split(";");
      for (var i2 = 0; i2 < ca.length; i2++) {
        var c = ca[i2];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    };
    var setCookie = function (key, value, expirationDate) {
      var cookie = key + "=" + value + "; expires=" + expirationDate.toUTCString() + "; ";
      document.cookie = cookie;
    };
  };
  function createCallbackStorage() {
    try {
      return new LocalStorage();
    } catch (err) {}
    return new CookieStorage();
  }
  function createLogger(fn) {
    return function () {
      if (kc.enableLogging) {
        fn.apply(console, Array.prototype.slice.call(arguments));
      }
    };
  }
}
function bytesToBase64(bytes) {
  const binString = String.fromCodePoint(...bytes);
  return btoa(binString);
}
export { Keycloak as default };
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

js-sha256/src/sha256.js:
  (**
   * [js-sha256]{@link https://github.com/emn178/js-sha256}
   *
   * @version 0.11.0
   * @author Chen, Yi-Cyuan [emn178@gmail.com]
   * @copyright Chen, Yi-Cyuan 2014-2024
   * @license MIT
   *)
*/