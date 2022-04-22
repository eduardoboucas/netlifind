var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/tiny-lru/lib/tiny-lru.cjs.js
var require_tiny_lru_cjs = __commonJS({
  "node_modules/tiny-lru/lib/tiny-lru.cjs.js"(exports, module2) {
    "use strict";
    var LRU = class {
      constructor(max = 0, ttl = 0) {
        this.first = null;
        this.items = Object.create(null);
        this.last = null;
        this.max = max;
        this.size = 0;
        this.ttl = ttl;
      }
      has(key) {
        return key in this.items;
      }
      clear() {
        this.first = null;
        this.items = Object.create(null);
        this.last = null;
        this.size = 0;
        return this;
      }
      delete(key) {
        if (this.has(key)) {
          const item = this.items[key];
          delete this.items[key];
          this.size--;
          if (item.prev !== null) {
            item.prev.next = item.next;
          }
          if (item.next !== null) {
            item.next.prev = item.prev;
          }
          if (this.first === item) {
            this.first = item.next;
          }
          if (this.last === item) {
            this.last = item.prev;
          }
        }
        return this;
      }
      evict(bypass = false) {
        if (bypass || this.size > 0) {
          const item = this.first;
          delete this.items[item.key];
          this.size--;
          if (this.size === 0) {
            this.first = null;
            this.last = null;
          } else {
            this.first = item.next;
            this.first.prev = null;
          }
        }
        return this;
      }
      get(key) {
        let result;
        if (this.has(key)) {
          const item = this.items[key];
          if (this.ttl > 0 && item.expiry <= new Date().getTime()) {
            this.delete(key);
          } else {
            result = item.value;
            this.set(key, result, true);
          }
        }
        return result;
      }
      keys() {
        return Object.keys(this.items);
      }
      set(key, value, bypass = false) {
        let item;
        if (bypass || this.has(key)) {
          item = this.items[key];
          item.value = value;
          if (this.last !== item) {
            const last = this.last, next = item.next, prev = item.prev;
            if (this.first === item) {
              this.first = item.next;
            }
            item.next = null;
            item.prev = this.last;
            last.next = item;
            if (prev !== null) {
              prev.next = next;
            }
            if (next !== null) {
              next.prev = prev;
            }
          }
        } else {
          if (this.max > 0 && this.size === this.max) {
            this.evict(true);
          }
          item = this.items[key] = {
            expiry: this.ttl > 0 ? new Date().getTime() + this.ttl : this.ttl,
            key,
            prev: this.last,
            next: null,
            value
          };
          if (++this.size === 1) {
            this.first = item;
          } else {
            this.last.next = item;
          }
        }
        this.last = item;
        return this;
      }
    };
    function factory(max = 1e3, ttl = 0) {
      if (isNaN(max) || max < 0) {
        throw new TypeError("Invalid max value");
      }
      if (isNaN(ttl) || ttl < 0) {
        throw new TypeError("Invalid ttl value");
      }
      return new LRU(max, ttl);
    }
    module2.exports = factory;
  }
});

// node_modules/mmdb-lib/lib/utils.js
var require_utils = __commonJS({
  "node_modules/mmdb-lib/lib/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var concat2 = (a, b) => {
      return a << 8 | b;
    };
    var concat3 = (a, b, c) => {
      return a << 16 | b << 8 | c;
    };
    var concat4 = (a, b, c, d) => {
      return a << 24 | b << 16 | c << 8 | d;
    };
    var legacyErrorMessage = `Maxmind v2 module has changed API.
Upgrade instructions can be found here: https://github.com/runk/node-maxmind/wiki/Migration-guide
If you want to use legacy library then explicitly install maxmind@1`;
    exports.default = {
      concat2,
      concat3,
      concat4,
      legacyErrorMessage
    };
  }
});

// node_modules/mmdb-lib/lib/decoder.js
var require_decoder = __commonJS({
  "node_modules/mmdb-lib/lib/decoder.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var assert_1 = __importDefault(require("assert"));
    var utils_1 = __importDefault(require_utils());
    (0, assert_1.default)(typeof BigInt !== "undefined", "Apparently you are using old version of node. Please upgrade to node 10.4.x or above.");
    var DataType;
    (function(DataType2) {
      DataType2[DataType2["Extended"] = 0] = "Extended";
      DataType2[DataType2["Pointer"] = 1] = "Pointer";
      DataType2[DataType2["Utf8String"] = 2] = "Utf8String";
      DataType2[DataType2["Double"] = 3] = "Double";
      DataType2[DataType2["Bytes"] = 4] = "Bytes";
      DataType2[DataType2["Uint16"] = 5] = "Uint16";
      DataType2[DataType2["Uint32"] = 6] = "Uint32";
      DataType2[DataType2["Map"] = 7] = "Map";
      DataType2[DataType2["Int32"] = 8] = "Int32";
      DataType2[DataType2["Uint64"] = 9] = "Uint64";
      DataType2[DataType2["Uint128"] = 10] = "Uint128";
      DataType2[DataType2["Array"] = 11] = "Array";
      DataType2[DataType2["Container"] = 12] = "Container";
      DataType2[DataType2["EndMarker"] = 13] = "EndMarker";
      DataType2[DataType2["Boolean"] = 14] = "Boolean";
      DataType2[DataType2["Float"] = 15] = "Float";
    })(DataType || (DataType = {}));
    var pointerValueOffset = [0, 2048, 526336, 0];
    var noCache = {
      get: () => void 0,
      set: () => void 0
    };
    var cursor = (value, offset) => ({ value, offset });
    var Decoder = class {
      constructor(db2, baseOffset = 0, cache = noCache) {
        this.telemetry = {};
        (0, assert_1.default)(this.db = db2, "Database buffer is required");
        this.baseOffset = baseOffset;
        this.cache = cache;
      }
      decode(offset) {
        let tmp;
        const ctrlByte = this.db[offset++];
        let type = ctrlByte >> 5;
        if (type === DataType.Pointer) {
          tmp = this.decodePointer(ctrlByte, offset);
          return cursor(this.decodeFast(tmp.value).value, tmp.offset);
        }
        if (type === DataType.Extended) {
          tmp = this.db[offset] + 7;
          if (tmp < 8) {
            throw new Error("Invalid Extended Type at offset " + offset + " val " + tmp);
          }
          type = tmp;
          offset++;
        }
        const size = this.sizeFromCtrlByte(ctrlByte, offset);
        return this.decodeByType(type, size.offset, size.value);
      }
      decodeFast(offset) {
        const cached = this.cache.get(offset);
        if (cached) {
          return cached;
        }
        const result = this.decode(offset);
        this.cache.set(offset, result);
        return result;
      }
      decodeByType(type, offset, size) {
        const newOffset = offset + size;
        switch (type) {
          case DataType.Utf8String:
            return cursor(this.decodeString(offset, size), newOffset);
          case DataType.Map:
            return this.decodeMap(size, offset);
          case DataType.Uint32:
            return cursor(this.decodeUint(offset, size), newOffset);
          case DataType.Double:
            return cursor(this.decodeDouble(offset), newOffset);
          case DataType.Array:
            return this.decodeArray(size, offset);
          case DataType.Boolean:
            return cursor(this.decodeBoolean(size), offset);
          case DataType.Float:
            return cursor(this.decodeFloat(offset), newOffset);
          case DataType.Bytes:
            return cursor(this.decodeBytes(offset, size), newOffset);
          case DataType.Uint16:
            return cursor(this.decodeUint(offset, size), newOffset);
          case DataType.Int32:
            return cursor(this.decodeInt32(offset, size), newOffset);
          case DataType.Uint64:
            return cursor(this.decodeUint(offset, size), newOffset);
          case DataType.Uint128:
            return cursor(this.decodeUint(offset, size), newOffset);
        }
        throw new Error("Unknown type " + type + " at offset " + offset);
      }
      sizeFromCtrlByte(ctrlByte, offset) {
        const size = ctrlByte & 31;
        if (size < 29) {
          return cursor(size, offset);
        }
        if (size === 29) {
          return cursor(29 + this.db[offset], offset + 1);
        }
        if (size === 30) {
          return cursor(285 + this.db.readUInt16BE(offset), offset + 2);
        }
        return cursor(65821 + utils_1.default.concat3(this.db[offset], this.db[offset + 1], this.db[offset + 2]), offset + 3);
      }
      decodeBytes(offset, size) {
        return this.db.slice(offset, offset + size);
      }
      decodePointer(ctrlByte, offset) {
        const pointerSize = ctrlByte >> 3 & 3;
        const pointer = this.baseOffset + pointerValueOffset[pointerSize];
        let packed = 0;
        if (pointerSize === 0) {
          packed = utils_1.default.concat2(ctrlByte & 7, this.db[offset]);
        } else if (pointerSize === 1) {
          packed = utils_1.default.concat3(ctrlByte & 7, this.db[offset], this.db[offset + 1]);
        } else if (pointerSize === 2) {
          packed = utils_1.default.concat4(ctrlByte & 7, this.db[offset], this.db[offset + 1], this.db[offset + 2]);
        } else {
          packed = this.db.readUInt32BE(offset);
        }
        offset += pointerSize + 1;
        return cursor(pointer + packed, offset);
      }
      decodeArray(size, offset) {
        let tmp;
        const array = [];
        for (let i = 0; i < size; i++) {
          tmp = this.decode(offset);
          offset = tmp.offset;
          array.push(tmp.value);
        }
        return cursor(array, offset);
      }
      decodeBoolean(size) {
        return size !== 0;
      }
      decodeDouble(offset) {
        return this.db.readDoubleBE(offset);
      }
      decodeFloat(offset) {
        return this.db.readFloatBE(offset);
      }
      decodeMap(size, offset) {
        let tmp;
        let key;
        const map = {};
        for (let i = 0; i < size; i++) {
          tmp = this.decode(offset);
          key = tmp.value;
          tmp = this.decode(tmp.offset);
          offset = tmp.offset;
          map[key] = tmp.value;
        }
        return cursor(map, offset);
      }
      decodeInt32(offset, size) {
        if (size === 0) {
          return 0;
        }
        return this.db.readInt32BE(offset);
      }
      decodeUint(offset, size) {
        switch (size) {
          case 0:
            return 0;
          case 1:
            return this.db[offset];
          case 2:
            return utils_1.default.concat2(this.db[offset + 0], this.db[offset + 1]);
          case 3:
            return utils_1.default.concat3(this.db[offset + 0], this.db[offset + 1], this.db[offset + 2]);
          case 4:
            return utils_1.default.concat4(this.db[offset + 0], this.db[offset + 1], this.db[offset + 2], this.db[offset + 3]);
          case 8:
            return this.decodeBigUint(offset, size);
          case 16:
            return this.decodeBigUint(offset, size);
        }
        return 0;
      }
      decodeString(offset, size) {
        return this.db.slice(offset, offset + size).toString();
      }
      decodeBigUint(offset, size) {
        const buffer = Buffer.alloc(size);
        this.db.copy(buffer, 0, offset, offset + size);
        let integer = BigInt(0);
        const numberOfLongs = size / 4;
        for (let i = 0; i < numberOfLongs; i++) {
          integer = integer * BigInt(4294967296) + BigInt(buffer.readUInt32BE(i << 2));
        }
        return integer.toString();
      }
    };
    exports.default = Decoder;
  }
});

// node_modules/mmdb-lib/lib/ip.js
var require_ip = __commonJS({
  "node_modules/mmdb-lib/lib/ip.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var net_1 = __importDefault(require("net"));
    var parseIPv4 = (input) => {
      const ip = input.split(".", 4);
      const o0 = parseInt(ip[0]);
      const o1 = parseInt(ip[1]);
      const o2 = parseInt(ip[2]);
      const o3 = parseInt(ip[3]);
      return [o0, o1, o2, o3];
    };
    var hex = (v) => {
      const h = parseInt(v, 10).toString(16);
      return h.length === 2 ? h : "0" + h;
    };
    var parseIPv6 = (input) => {
      const addr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let i;
      let parsed;
      let chunk;
      const ip = input.indexOf(".") > -1 ? input.replace(/(\d+)\.(\d+)\.(\d+)\.(\d+)/, (match, a, b, c, d) => {
        return hex(a) + hex(b) + ":" + hex(c) + hex(d);
      }) : input;
      const [left, right] = ip.split("::", 2);
      if (left) {
        parsed = left.split(":");
        for (i = 0; i < parsed.length; i++) {
          chunk = parseInt(parsed[i], 16);
          addr[i * 2] = chunk >> 8;
          addr[i * 2 + 1] = chunk & 255;
        }
      }
      if (right) {
        parsed = right.split(":");
        const offset = 16 - parsed.length * 2;
        for (i = 0; i < parsed.length; i++) {
          chunk = parseInt(parsed[i], 16);
          addr[offset + i * 2] = chunk >> 8;
          addr[offset + (i * 2 + 1)] = chunk & 255;
        }
      }
      return addr;
    };
    var parse = (ip) => {
      return ip.indexOf(":") === -1 ? parseIPv4(ip) : parseIPv6(ip);
    };
    var bitAt = (rawAddress, idx) => {
      const bufIdx = idx >> 3;
      const bitIdx = 7 ^ idx & 7;
      return rawAddress[bufIdx] >>> bitIdx & 1;
    };
    var validate = (ip) => {
      const version = net_1.default.isIP(ip);
      return version === 4 || version === 6;
    };
    exports.default = {
      bitAt,
      parse,
      validate
    };
  }
});

// node_modules/mmdb-lib/lib/metadata.js
var require_metadata = __commonJS({
  "node_modules/mmdb-lib/lib/metadata.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isLegacyFormat = exports.parseMetadata = void 0;
    var assert_1 = __importDefault(require("assert"));
    var decoder_1 = __importDefault(require_decoder());
    var utils_1 = __importDefault(require_utils());
    var METADATA_START_MARKER = Buffer.from("ABCDEF4D61784D696E642E636F6D", "hex");
    var parseMetadata = (db2) => {
      const offset = findStart(db2);
      const decoder = new decoder_1.default(db2, offset);
      const metadata = decoder.decode(offset).value;
      if (!metadata) {
        throw new Error((0, exports.isLegacyFormat)(db2) ? utils_1.default.legacyErrorMessage : "Cannot parse binary database");
      }
      (0, assert_1.default)([24, 28, 32].indexOf(metadata.record_size) > -1, "Unsupported record size");
      return {
        binaryFormatMajorVersion: metadata.binary_format_major_version,
        binaryFormatMinorVersion: metadata.binary_format_minor_version,
        buildEpoch: new Date(metadata.build_epoch * 1e3),
        databaseType: metadata.database_type,
        description: metadata.description,
        ipVersion: metadata.ip_version,
        languages: metadata.languages,
        nodeByteSize: metadata.record_size / 4,
        nodeCount: metadata.node_count,
        recordSize: metadata.record_size,
        searchTreeSize: metadata.node_count * metadata.record_size / 4,
        treeDepth: Math.pow(2, metadata.ip_version + 1)
      };
    };
    exports.parseMetadata = parseMetadata;
    var findStart = (db2) => {
      let found = 0;
      let fsize = db2.length - 1;
      const mlen = METADATA_START_MARKER.length - 1;
      while (found <= mlen && fsize-- > 0) {
        found += db2[fsize] === METADATA_START_MARKER[mlen - found] ? 1 : -found;
      }
      return fsize + found;
    };
    var isLegacyFormat = (db2) => {
      const structureInfoMaxSize = 20;
      for (let i = 0; i < structureInfoMaxSize; i++) {
        const delim = db2.slice(db2.length - 3 - i, db2.length - i);
        if (delim[0] === 255 && delim[1] === 255 && delim[2] === 255) {
          return true;
        }
      }
      return false;
    };
    exports.isLegacyFormat = isLegacyFormat;
  }
});

// node_modules/mmdb-lib/lib/reader/walker.js
var require_walker = __commonJS({
  "node_modules/mmdb-lib/lib/reader/walker.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = __importDefault(require_utils());
    var readNodeRight24 = (db2) => (offset) => utils_1.default.concat3(db2[offset + 3], db2[offset + 4], db2[offset + 5]);
    var readNodeLeft24 = (db2) => (offset) => utils_1.default.concat3(db2[offset], db2[offset + 1], db2[offset + 2]);
    var readNodeLeft28 = (db2) => (offset) => utils_1.default.concat4(db2[offset + 3] >> 4, db2[offset], db2[offset + 1], db2[offset + 2]);
    var readNodeRight28 = (db2) => (offset) => utils_1.default.concat4(db2[offset + 3] & 15, db2[offset + 4], db2[offset + 5], db2[offset + 6]);
    var readNodeLeft32 = (db2) => (offset) => db2.readUInt32BE(offset);
    var readNodeRight32 = (db2) => (offset) => db2.readUInt32BE(offset + 4);
    exports.default = (db2, recordSize) => {
      switch (recordSize) {
        case 24:
          return { left: readNodeLeft24(db2), right: readNodeRight24(db2) };
        case 28:
          return { left: readNodeLeft28(db2), right: readNodeRight28(db2) };
        case 32:
          return { left: readNodeLeft32(db2), right: readNodeRight32(db2) };
      }
      throw new Error("Unsupported record size");
    };
  }
});

// node_modules/mmdb-lib/lib/reader/response.js
var require_response = __commonJS({
  "node_modules/mmdb-lib/lib/reader/response.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/mmdb-lib/lib/index.js
var require_lib = __commonJS({
  "node_modules/mmdb-lib/lib/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Reader = void 0;
    var decoder_1 = __importDefault(require_decoder());
    var ip_1 = __importDefault(require_ip());
    var metadata_1 = require_metadata();
    var walker_1 = __importDefault(require_walker());
    var DATA_SECTION_SEPARATOR_SIZE = 16;
    var Reader2 = class {
      constructor(db2, opts = {}) {
        this.opts = opts;
        this.load(db2);
      }
      load(db2) {
        if (!Buffer.isBuffer(db2)) {
          throw new Error(`mmdb-lib expects an instance of Buffer, got: ${typeof db2}`);
        }
        this.db = db2;
        this.metadata = (0, metadata_1.parseMetadata)(this.db);
        this.decoder = new decoder_1.default(this.db, this.metadata.searchTreeSize + DATA_SECTION_SEPARATOR_SIZE, this.opts.cache);
        this.walker = (0, walker_1.default)(this.db, this.metadata.recordSize);
        this.ipv4StartNodeNumber = this.ipv4Start();
      }
      get(ipAddress) {
        const [data] = this.getWithPrefixLength(ipAddress);
        return data;
      }
      getWithPrefixLength(ipAddress) {
        const [pointer, prefixLength] = this.findAddressInTree(ipAddress);
        const data = pointer ? this.resolveDataPointer(pointer) : null;
        return [data, prefixLength];
      }
      findAddressInTree(ipAddress) {
        const rawAddress = ip_1.default.parse(ipAddress);
        const nodeCount = this.metadata.nodeCount;
        const bitLength = rawAddress.length * 8;
        let bit;
        let nodeNumber = 0;
        let offset;
        let depth = 0;
        if (rawAddress.length === 4) {
          nodeNumber = this.ipv4StartNodeNumber;
        }
        for (; depth < bitLength && nodeNumber < nodeCount; depth++) {
          bit = ip_1.default.bitAt(rawAddress, depth);
          offset = nodeNumber * this.metadata.nodeByteSize;
          nodeNumber = bit ? this.walker.right(offset) : this.walker.left(offset);
        }
        if (nodeNumber > nodeCount) {
          return [nodeNumber, depth];
        }
        return [null, depth];
      }
      resolveDataPointer(pointer) {
        const resolved = pointer - this.metadata.nodeCount + this.metadata.searchTreeSize;
        return this.decoder.decodeFast(resolved).value;
      }
      ipv4Start() {
        if (this.metadata.ipVersion === 4) {
          return 0;
        }
        const nodeCount = this.metadata.nodeCount;
        let pointer = 0;
        let i = 0;
        for (; i < 96 && pointer < nodeCount; i++) {
          const offset = pointer * this.metadata.nodeByteSize;
          pointer = this.walker.left(offset);
        }
        return pointer;
      }
    };
    exports.Reader = Reader2;
    __exportStar(require_response(), exports);
  }
});

// node_modules/maxmind/lib/fs.js
var require_fs = __commonJS({
  "node_modules/maxmind/lib/fs.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var fs_1 = __importDefault(require("fs"));
    var util_1 = __importDefault(require("util"));
    exports.default = {
      existsSync: fs_1.default.existsSync,
      readFile: util_1.default.promisify(fs_1.default.readFile),
      watchFile: fs_1.default.watchFile
    };
  }
});

// node_modules/maxmind/lib/ip.js
var require_ip2 = __commonJS({
  "node_modules/maxmind/lib/ip.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var net_1 = __importDefault(require("net"));
    var parseIPv4 = (input) => {
      const ip = input.split(".", 4);
      const o0 = parseInt(ip[0]);
      const o1 = parseInt(ip[1]);
      const o2 = parseInt(ip[2]);
      const o3 = parseInt(ip[3]);
      return [o0, o1, o2, o3];
    };
    var hex = (v) => {
      v = parseInt(v, 10).toString(16);
      return v.length === 2 ? v : "0" + v;
    };
    var parseIPv6 = (ip) => {
      const addr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let i;
      let parsed;
      let chunk;
      if (ip.indexOf(".") > -1) {
        ip = ip.replace(/(\d+)\.(\d+)\.(\d+)\.(\d+)/, (match, a, b, c, d) => {
          return hex(a) + hex(b) + ":" + hex(c) + hex(d);
        });
      }
      const [left, right] = ip.split("::", 2);
      if (left) {
        parsed = left.split(":");
        for (i = 0; i < parsed.length; i++) {
          chunk = parseInt(parsed[i], 16);
          addr[i * 2] = chunk >> 8;
          addr[i * 2 + 1] = chunk & 255;
        }
      }
      if (right) {
        parsed = right.split(":");
        const offset = 16 - parsed.length * 2;
        for (i = 0; i < parsed.length; i++) {
          chunk = parseInt(parsed[i], 16);
          addr[offset + i * 2] = chunk >> 8;
          addr[offset + (i * 2 + 1)] = chunk & 255;
        }
      }
      return addr;
    };
    var parse = (ip) => {
      return ip.indexOf(":") === -1 ? parseIPv4(ip) : parseIPv6(ip);
    };
    var bitAt = (rawAddress, idx) => {
      const bufIdx = idx >> 3;
      const bitIdx = 7 ^ idx & 7;
      return rawAddress[bufIdx] >>> bitIdx & 1;
    };
    var validate = (ip) => {
      const version = net_1.default.isIP(ip);
      return version === 4 || version === 6;
    };
    exports.default = {
      bitAt,
      parse,
      validate
    };
  }
});

// node_modules/maxmind/lib/is-gzip.js
var require_is_gzip = __commonJS({
  "node_modules/maxmind/lib/is-gzip.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = (buf) => {
      if (!buf || buf.length < 3) {
        return false;
      }
      return buf[0] === 31 && buf[1] === 139 && buf[2] === 8;
    };
  }
});

// node_modules/maxmind/lib/utils.js
var require_utils2 = __commonJS({
  "node_modules/maxmind/lib/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var concat2 = (a, b) => {
      return a << 8 | b;
    };
    var concat3 = (a, b, c) => {
      return a << 16 | b << 8 | c;
    };
    var concat4 = (a, b, c, d) => {
      return a << 24 | b << 16 | c << 8 | d;
    };
    var legacyErrorMessage = `Maxmind v2 module has changed API.
Upgrade instructions can be found here: https://github.com/runk/node-maxmind/wiki/Migration-guide
If you want to use legacy libary then explicitly install maxmind@1`;
    exports.default = {
      concat2,
      concat3,
      concat4,
      legacyErrorMessage
    };
  }
});

// node_modules/maxmind/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/maxmind/lib/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Reader = exports.validate = exports.init = exports.openSync = exports.open = void 0;
    var assert_1 = __importDefault(require("assert"));
    var tiny_lru_1 = __importDefault(require_tiny_lru_cjs());
    var mmdb_lib_1 = require_lib();
    Object.defineProperty(exports, "Reader", { enumerable: true, get: function() {
      return mmdb_lib_1.Reader;
    } });
    var fs_1 = __importDefault(require_fs());
    var ip_1 = __importDefault(require_ip2());
    var is_gzip_1 = __importDefault(require_is_gzip());
    var utils_1 = __importDefault(require_utils2());
    var open = async (filepath, opts, cb) => {
      (0, assert_1.default)(!cb, utils_1.default.legacyErrorMessage);
      const database = await fs_1.default.readFile(filepath);
      if ((0, is_gzip_1.default)(database)) {
        throw new Error("Looks like you are passing in a file in gzip format, please use mmdb database instead.");
      }
      const cache = (0, tiny_lru_1.default)(opts && opts.cache && opts.cache.max || 6e3);
      const reader = new mmdb_lib_1.Reader(database, { cache });
      if (opts && !!opts.watchForUpdates) {
        if (opts.watchForUpdatesHook && typeof opts.watchForUpdatesHook !== "function") {
          throw new Error("opts.watchForUpdatesHook should be a function");
        }
        const watcherOptions = {
          persistent: opts.watchForUpdatesNonPersistent !== true
        };
        fs_1.default.watchFile(filepath, watcherOptions, async () => {
          const waitExists = async () => {
            for (let i = 0; i < 3; i++) {
              if (fs_1.default.existsSync(filepath)) {
                return true;
              }
              await new Promise((a) => setTimeout(a, 500));
            }
            return false;
          };
          if (!await waitExists()) {
            return;
          }
          const updatedDatabase = await fs_1.default.readFile(filepath);
          cache.clear();
          reader.load(updatedDatabase);
          if (opts.watchForUpdatesHook) {
            opts.watchForUpdatesHook();
          }
        });
      }
      return reader;
    };
    exports.open = open;
    var openSync = () => {
      throw new Error(utils_1.default.legacyErrorMessage);
    };
    exports.openSync = openSync;
    var init = () => {
      throw new Error(utils_1.default.legacyErrorMessage);
    };
    exports.init = init;
    exports.validate = ip_1.default.validate;
    __exportStar(require_lib(), exports);
    exports.default = {
      init: exports.init,
      open: exports.open,
      openSync: exports.openSync,
      validate: ip_1.default.validate
    };
  }
});

// node_modules/@maxmind/geoip2-node/dist/src/errors.js
var require_errors = __commonJS({
  "node_modules/@maxmind/geoip2-node/dist/src/errors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ValueError = exports.InvalidDbBufferError = exports.BadMethodCallError = exports.AddressNotFoundError = void 0;
    var AddressNotFoundError = class extends Error {
      constructor(message) {
        super(message);
        this.name = this.constructor.name;
      }
    };
    exports.AddressNotFoundError = AddressNotFoundError;
    var BadMethodCallError = class extends Error {
      constructor(message) {
        super(message);
        this.name = this.constructor.name;
      }
    };
    exports.BadMethodCallError = BadMethodCallError;
    var InvalidDbBufferError = class extends Error {
      constructor(message) {
        super(message);
        this.name = this.constructor.name;
      }
    };
    exports.InvalidDbBufferError = InvalidDbBufferError;
    var ValueError = class extends Error {
      constructor(message) {
        super(message);
        this.name = this.constructor.name;
      }
    };
    exports.ValueError = ValueError;
  }
});

// node_modules/assert-plus/assert.js
var require_assert = __commonJS({
  "node_modules/assert-plus/assert.js"(exports, module2) {
    var assert = require("assert");
    var Stream = require("stream").Stream;
    var util = require("util");
    var UUID_REGEXP = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
    function _capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function _toss(name, expected, oper, arg, actual) {
      throw new assert.AssertionError({
        message: util.format("%s (%s) is required", name, expected),
        actual: actual === void 0 ? typeof arg : actual(arg),
        expected,
        operator: oper || "===",
        stackStartFunction: _toss.caller
      });
    }
    function _getClass(arg) {
      return Object.prototype.toString.call(arg).slice(8, -1);
    }
    function noop() {
    }
    var types = {
      bool: {
        check: function(arg) {
          return typeof arg === "boolean";
        }
      },
      func: {
        check: function(arg) {
          return typeof arg === "function";
        }
      },
      string: {
        check: function(arg) {
          return typeof arg === "string";
        }
      },
      object: {
        check: function(arg) {
          return typeof arg === "object" && arg !== null;
        }
      },
      number: {
        check: function(arg) {
          return typeof arg === "number" && !isNaN(arg);
        }
      },
      finite: {
        check: function(arg) {
          return typeof arg === "number" && !isNaN(arg) && isFinite(arg);
        }
      },
      buffer: {
        check: function(arg) {
          return Buffer.isBuffer(arg);
        },
        operator: "Buffer.isBuffer"
      },
      array: {
        check: function(arg) {
          return Array.isArray(arg);
        },
        operator: "Array.isArray"
      },
      stream: {
        check: function(arg) {
          return arg instanceof Stream;
        },
        operator: "instanceof",
        actual: _getClass
      },
      date: {
        check: function(arg) {
          return arg instanceof Date;
        },
        operator: "instanceof",
        actual: _getClass
      },
      regexp: {
        check: function(arg) {
          return arg instanceof RegExp;
        },
        operator: "instanceof",
        actual: _getClass
      },
      uuid: {
        check: function(arg) {
          return typeof arg === "string" && UUID_REGEXP.test(arg);
        },
        operator: "isUUID"
      }
    };
    function _setExports(ndebug) {
      var keys = Object.keys(types);
      var out;
      if (process.env.NODE_NDEBUG) {
        out = noop;
      } else {
        out = function(arg, msg) {
          if (!arg) {
            _toss(msg, "true", arg);
          }
        };
      }
      keys.forEach(function(k) {
        if (ndebug) {
          out[k] = noop;
          return;
        }
        var type = types[k];
        out[k] = function(arg, msg) {
          if (!type.check(arg)) {
            _toss(msg, k, type.operator, arg, type.actual);
          }
        };
      });
      keys.forEach(function(k) {
        var name = "optional" + _capitalize(k);
        if (ndebug) {
          out[name] = noop;
          return;
        }
        var type = types[k];
        out[name] = function(arg, msg) {
          if (arg === void 0 || arg === null) {
            return;
          }
          if (!type.check(arg)) {
            _toss(msg, k, type.operator, arg, type.actual);
          }
        };
      });
      keys.forEach(function(k) {
        var name = "arrayOf" + _capitalize(k);
        if (ndebug) {
          out[name] = noop;
          return;
        }
        var type = types[k];
        var expected = "[" + k + "]";
        out[name] = function(arg, msg) {
          if (!Array.isArray(arg)) {
            _toss(msg, expected, type.operator, arg, type.actual);
          }
          var i;
          for (i = 0; i < arg.length; i++) {
            if (!type.check(arg[i])) {
              _toss(msg, expected, type.operator, arg, type.actual);
            }
          }
        };
      });
      keys.forEach(function(k) {
        var name = "optionalArrayOf" + _capitalize(k);
        if (ndebug) {
          out[name] = noop;
          return;
        }
        var type = types[k];
        var expected = "[" + k + "]";
        out[name] = function(arg, msg) {
          if (arg === void 0 || arg === null) {
            return;
          }
          if (!Array.isArray(arg)) {
            _toss(msg, expected, type.operator, arg, type.actual);
          }
          var i;
          for (i = 0; i < arg.length; i++) {
            if (!type.check(arg[i])) {
              _toss(msg, expected, type.operator, arg, type.actual);
            }
          }
        };
      });
      Object.keys(assert).forEach(function(k) {
        if (k === "AssertionError") {
          out[k] = assert[k];
          return;
        }
        if (ndebug) {
          out[k] = noop;
          return;
        }
        out[k] = assert[k];
      });
      out._setExports = _setExports;
      return out;
    }
    module2.exports = _setExports(process.env.NODE_NDEBUG);
  }
});

// node_modules/extsprintf/lib/extsprintf.js
var require_extsprintf = __commonJS({
  "node_modules/extsprintf/lib/extsprintf.js"(exports) {
    var mod_assert = require("assert");
    var mod_util = require("util");
    exports.sprintf = jsSprintf;
    exports.printf = jsPrintf;
    exports.fprintf = jsFprintf;
    function jsSprintf(fmt) {
      var regex = [
        "([^%]*)",
        "%",
        "(['\\-+ #0]*?)",
        "([1-9]\\d*)?",
        "(\\.([1-9]\\d*))?",
        "[lhjztL]*?",
        "([diouxXfFeEgGaAcCsSp%jr])"
      ].join("");
      var re = new RegExp(regex);
      var args = Array.prototype.slice.call(arguments, 1);
      var flags, width, precision, conversion;
      var left, pad, sign, arg, match;
      var ret = "";
      var argn = 1;
      mod_assert.equal("string", typeof fmt);
      while ((match = re.exec(fmt)) !== null) {
        ret += match[1];
        fmt = fmt.substring(match[0].length);
        flags = match[2] || "";
        width = match[3] || 0;
        precision = match[4] || "";
        conversion = match[6];
        left = false;
        sign = false;
        pad = " ";
        if (conversion == "%") {
          ret += "%";
          continue;
        }
        if (args.length === 0)
          throw new Error("too few args to sprintf");
        arg = args.shift();
        argn++;
        if (flags.match(/[\' #]/))
          throw new Error("unsupported flags: " + flags);
        if (precision.length > 0)
          throw new Error("non-zero precision not supported");
        if (flags.match(/-/))
          left = true;
        if (flags.match(/0/))
          pad = "0";
        if (flags.match(/\+/))
          sign = true;
        switch (conversion) {
          case "s":
            if (arg === void 0 || arg === null)
              throw new Error("argument " + argn + ": attempted to print undefined or null as a string");
            ret += doPad(pad, width, left, arg.toString());
            break;
          case "d":
            arg = Math.floor(arg);
          case "f":
            sign = sign && arg > 0 ? "+" : "";
            ret += sign + doPad(pad, width, left, arg.toString());
            break;
          case "x":
            ret += doPad(pad, width, left, arg.toString(16));
            break;
          case "j":
            if (width === 0)
              width = 10;
            ret += mod_util.inspect(arg, false, width);
            break;
          case "r":
            ret += dumpException(arg);
            break;
          default:
            throw new Error("unsupported conversion: " + conversion);
        }
      }
      ret += fmt;
      return ret;
    }
    function jsPrintf() {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(process.stdout);
      jsFprintf.apply(null, args);
    }
    function jsFprintf(stream) {
      var args = Array.prototype.slice.call(arguments, 1);
      return stream.write(jsSprintf.apply(this, args));
    }
    function doPad(chr, width, left, str) {
      var ret = str;
      while (ret.length < width) {
        if (left)
          ret += chr;
        else
          ret = chr + ret;
      }
      return ret;
    }
    function dumpException(ex) {
      var ret;
      if (!(ex instanceof Error))
        throw new Error(jsSprintf("invalid type for %%r: %j", ex));
      ret = "EXCEPTION: " + ex.constructor.name + ": " + ex.stack;
      if (ex.cause && typeof ex.cause === "function") {
        var cex = ex.cause();
        if (cex) {
          ret += "\nCaused by: " + dumpException(cex);
        }
      }
      return ret;
    }
  }
});

// node_modules/core-util-is/lib/util.js
var require_util = __commonJS({
  "node_modules/core-util-is/lib/util.js"(exports) {
    function isArray(arg) {
      if (Array.isArray) {
        return Array.isArray(arg);
      }
      return objectToString(arg) === "[object Array]";
    }
    exports.isArray = isArray;
    function isBoolean(arg) {
      return typeof arg === "boolean";
    }
    exports.isBoolean = isBoolean;
    function isNull(arg) {
      return arg === null;
    }
    exports.isNull = isNull;
    function isNullOrUndefined(arg) {
      return arg == null;
    }
    exports.isNullOrUndefined = isNullOrUndefined;
    function isNumber(arg) {
      return typeof arg === "number";
    }
    exports.isNumber = isNumber;
    function isString(arg) {
      return typeof arg === "string";
    }
    exports.isString = isString;
    function isSymbol(arg) {
      return typeof arg === "symbol";
    }
    exports.isSymbol = isSymbol;
    function isUndefined(arg) {
      return arg === void 0;
    }
    exports.isUndefined = isUndefined;
    function isRegExp(re) {
      return objectToString(re) === "[object RegExp]";
    }
    exports.isRegExp = isRegExp;
    function isObject(arg) {
      return typeof arg === "object" && arg !== null;
    }
    exports.isObject = isObject;
    function isDate(d) {
      return objectToString(d) === "[object Date]";
    }
    exports.isDate = isDate;
    function isError(e) {
      return objectToString(e) === "[object Error]" || e instanceof Error;
    }
    exports.isError = isError;
    function isFunction(arg) {
      return typeof arg === "function";
    }
    exports.isFunction = isFunction;
    function isPrimitive(arg) {
      return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || typeof arg === "undefined";
    }
    exports.isPrimitive = isPrimitive;
    exports.isBuffer = Buffer.isBuffer;
    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }
  }
});

// node_modules/verror/lib/verror.js
var require_verror = __commonJS({
  "node_modules/verror/lib/verror.js"(exports, module2) {
    var mod_assertplus = require_assert();
    var mod_util = require("util");
    var mod_extsprintf = require_extsprintf();
    var mod_isError = require_util().isError;
    var sprintf = mod_extsprintf.sprintf;
    module2.exports = VError;
    VError.VError = VError;
    VError.SError = SError;
    VError.WError = WError;
    VError.MultiError = MultiError;
    function parseConstructorArguments(args) {
      var argv, options, sprintf_args, shortmessage, k;
      mod_assertplus.object(args, "args");
      mod_assertplus.bool(args.strict, "args.strict");
      mod_assertplus.array(args.argv, "args.argv");
      argv = args.argv;
      if (argv.length === 0) {
        options = {};
        sprintf_args = [];
      } else if (mod_isError(argv[0])) {
        options = { "cause": argv[0] };
        sprintf_args = argv.slice(1);
      } else if (typeof argv[0] === "object") {
        options = {};
        for (k in argv[0]) {
          options[k] = argv[0][k];
        }
        sprintf_args = argv.slice(1);
      } else {
        mod_assertplus.string(argv[0], "first argument to VError, SError, or WError constructor must be a string, object, or Error");
        options = {};
        sprintf_args = argv;
      }
      mod_assertplus.object(options);
      if (!options.strict && !args.strict) {
        sprintf_args = sprintf_args.map(function(a) {
          return a === null ? "null" : a === void 0 ? "undefined" : a;
        });
      }
      if (sprintf_args.length === 0) {
        shortmessage = "";
      } else {
        shortmessage = sprintf.apply(null, sprintf_args);
      }
      return {
        "options": options,
        "shortmessage": shortmessage
      };
    }
    function VError() {
      var args, obj, parsed, cause, ctor, message, k;
      args = Array.prototype.slice.call(arguments, 0);
      if (!(this instanceof VError)) {
        obj = Object.create(VError.prototype);
        VError.apply(obj, arguments);
        return obj;
      }
      parsed = parseConstructorArguments({
        "argv": args,
        "strict": false
      });
      if (parsed.options.name) {
        mod_assertplus.string(parsed.options.name, `error's "name" must be a string`);
        this.name = parsed.options.name;
      }
      this.jse_shortmsg = parsed.shortmessage;
      message = parsed.shortmessage;
      cause = parsed.options.cause;
      if (cause) {
        mod_assertplus.ok(mod_isError(cause), "cause is not an Error");
        this.jse_cause = cause;
        if (!parsed.options.skipCauseMessage) {
          message += ": " + cause.message;
        }
      }
      this.jse_info = {};
      if (parsed.options.info) {
        for (k in parsed.options.info) {
          this.jse_info[k] = parsed.options.info[k];
        }
      }
      this.message = message;
      Error.call(this, message);
      if (Error.captureStackTrace) {
        ctor = parsed.options.constructorOpt || this.constructor;
        Error.captureStackTrace(this, ctor);
      }
      return this;
    }
    mod_util.inherits(VError, Error);
    VError.prototype.name = "VError";
    VError.prototype.toString = function ve_toString() {
      var str = this.hasOwnProperty("name") && this.name || this.constructor.name || this.constructor.prototype.name;
      if (this.message)
        str += ": " + this.message;
      return str;
    };
    VError.prototype.cause = function ve_cause() {
      var cause = VError.cause(this);
      return cause === null ? void 0 : cause;
    };
    VError.cause = function(err) {
      mod_assertplus.ok(mod_isError(err), "err must be an Error");
      return mod_isError(err.jse_cause) ? err.jse_cause : null;
    };
    VError.info = function(err) {
      var rv, cause, k;
      mod_assertplus.ok(mod_isError(err), "err must be an Error");
      cause = VError.cause(err);
      if (cause !== null) {
        rv = VError.info(cause);
      } else {
        rv = {};
      }
      if (typeof err.jse_info == "object" && err.jse_info !== null) {
        for (k in err.jse_info) {
          rv[k] = err.jse_info[k];
        }
      }
      return rv;
    };
    VError.findCauseByName = function(err, name) {
      var cause;
      mod_assertplus.ok(mod_isError(err), "err must be an Error");
      mod_assertplus.string(name, "name");
      mod_assertplus.ok(name.length > 0, "name cannot be empty");
      for (cause = err; cause !== null; cause = VError.cause(cause)) {
        mod_assertplus.ok(mod_isError(cause));
        if (cause.name == name) {
          return cause;
        }
      }
      return null;
    };
    VError.hasCauseWithName = function(err, name) {
      return VError.findCauseByName(err, name) !== null;
    };
    VError.fullStack = function(err) {
      mod_assertplus.ok(mod_isError(err), "err must be an Error");
      var cause = VError.cause(err);
      if (cause) {
        return err.stack + "\ncaused by: " + VError.fullStack(cause);
      }
      return err.stack;
    };
    VError.errorFromList = function(errors) {
      mod_assertplus.arrayOfObject(errors, "errors");
      if (errors.length === 0) {
        return null;
      }
      errors.forEach(function(e) {
        mod_assertplus.ok(mod_isError(e));
      });
      if (errors.length == 1) {
        return errors[0];
      }
      return new MultiError(errors);
    };
    VError.errorForEach = function(err, func) {
      mod_assertplus.ok(mod_isError(err), "err must be an Error");
      mod_assertplus.func(func, "func");
      if (err instanceof MultiError) {
        err.errors().forEach(function iterError(e) {
          func(e);
        });
      } else {
        func(err);
      }
    };
    function SError() {
      var args, obj, parsed, options;
      args = Array.prototype.slice.call(arguments, 0);
      if (!(this instanceof SError)) {
        obj = Object.create(SError.prototype);
        SError.apply(obj, arguments);
        return obj;
      }
      parsed = parseConstructorArguments({
        "argv": args,
        "strict": true
      });
      options = parsed.options;
      VError.call(this, options, "%s", parsed.shortmessage);
      return this;
    }
    mod_util.inherits(SError, VError);
    function MultiError(errors) {
      mod_assertplus.array(errors, "list of errors");
      mod_assertplus.ok(errors.length > 0, "must be at least one error");
      this.ase_errors = errors;
      VError.call(this, {
        "cause": errors[0]
      }, "first of %d error%s", errors.length, errors.length == 1 ? "" : "s");
    }
    mod_util.inherits(MultiError, VError);
    MultiError.prototype.name = "MultiError";
    MultiError.prototype.errors = function me_errors() {
      return this.ase_errors.slice(0);
    };
    function WError() {
      var args, obj, parsed, options;
      args = Array.prototype.slice.call(arguments, 0);
      if (!(this instanceof WError)) {
        obj = Object.create(WError.prototype);
        WError.apply(obj, args);
        return obj;
      }
      parsed = parseConstructorArguments({
        "argv": args,
        "strict": false
      });
      options = parsed.options;
      options["skipCauseMessage"] = true;
      VError.call(this, options, "%s", parsed.shortmessage);
      return this;
    }
    mod_util.inherits(WError, VError);
    WError.prototype.name = "WError";
    WError.prototype.toString = function we_toString() {
      var str = this.hasOwnProperty("name") && this.name || this.constructor.name || this.constructor.prototype.name;
      if (this.message)
        str += ": " + this.message;
      if (this.jse_cause && this.jse_cause.message)
        str += "; caused by " + this.jse_cause.toString();
      return str;
    };
    WError.prototype.cause = function we_cause(c) {
      if (mod_isError(c))
        this.jse_cause = c;
      return this.jse_cause;
    };
  }
});

// node_modules/json-schema/lib/validate.js
var require_validate = __commonJS({
  "node_modules/json-schema/lib/validate.js"(exports, module2) {
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define([], function() {
          return factory();
        });
      } else if (typeof module2 === "object" && module2.exports) {
        module2.exports = factory();
      } else {
        root.jsonSchema = factory();
      }
    })(exports, function() {
      var exports2 = validate;
      exports2.Integer = { type: "integer" };
      var primitiveConstructors = {
        String,
        Boolean,
        Number,
        Object,
        Array,
        Date
      };
      exports2.validate = validate;
      function validate(instance, schema) {
        return validate(instance, schema, { changing: false });
      }
      ;
      exports2.checkPropertyChange = function(value, schema, property) {
        return validate(value, schema, { changing: property || "property" });
      };
      var validate = exports2._validate = function(instance, schema, options) {
        if (!options)
          options = {};
        var _changing = options.changing;
        function getType(schema2) {
          return schema2.type || primitiveConstructors[schema2.name] == schema2 && schema2.name.toLowerCase();
        }
        var errors = [];
        function checkProp(value, schema2, path, i) {
          var l;
          path += path ? typeof i == "number" ? "[" + i + "]" : typeof i == "undefined" ? "" : "." + i : i;
          function addError(message) {
            errors.push({ property: path, message });
          }
          if ((typeof schema2 != "object" || schema2 instanceof Array) && (path || typeof schema2 != "function") && !(schema2 && getType(schema2))) {
            if (typeof schema2 == "function") {
              if (!(value instanceof schema2)) {
                addError("is not an instance of the class/constructor " + schema2.name);
              }
            } else if (schema2) {
              addError("Invalid schema/property definition " + schema2);
            }
            return null;
          }
          if (_changing && schema2.readonly) {
            addError("is a readonly field, it can not be changed");
          }
          if (schema2["extends"]) {
            checkProp(value, schema2["extends"], path, i);
          }
          function checkType(type, value2) {
            if (type) {
              if (typeof type == "string" && type != "any" && (type == "null" ? value2 !== null : typeof value2 != type) && !(value2 instanceof Array && type == "array") && !(value2 instanceof Date && type == "date") && !(type == "integer" && value2 % 1 === 0)) {
                return [{ property: path, message: value2 + " - " + typeof value2 + " value found, but a " + type + " is required" }];
              }
              if (type instanceof Array) {
                var unionErrors = [];
                for (var j2 = 0; j2 < type.length; j2++) {
                  if (!(unionErrors = checkType(type[j2], value2)).length) {
                    break;
                  }
                }
                if (unionErrors.length) {
                  return unionErrors;
                }
              } else if (typeof type == "object") {
                var priorErrors = errors;
                errors = [];
                checkProp(value2, type, path);
                var theseErrors = errors;
                errors = priorErrors;
                return theseErrors;
              }
            }
            return [];
          }
          if (value === void 0) {
            if (schema2.required) {
              addError("is missing and it is required");
            }
          } else {
            errors = errors.concat(checkType(getType(schema2), value));
            if (schema2.disallow && !checkType(schema2.disallow, value).length) {
              addError(" disallowed value was matched");
            }
            if (value !== null) {
              if (value instanceof Array) {
                if (schema2.items) {
                  var itemsIsArray = schema2.items instanceof Array;
                  var propDef = schema2.items;
                  for (i = 0, l = value.length; i < l; i += 1) {
                    if (itemsIsArray)
                      propDef = schema2.items[i];
                    if (options.coerce)
                      value[i] = options.coerce(value[i], propDef);
                    errors.concat(checkProp(value[i], propDef, path, i));
                  }
                }
                if (schema2.minItems && value.length < schema2.minItems) {
                  addError("There must be a minimum of " + schema2.minItems + " in the array");
                }
                if (schema2.maxItems && value.length > schema2.maxItems) {
                  addError("There must be a maximum of " + schema2.maxItems + " in the array");
                }
              } else if (schema2.properties || schema2.additionalProperties) {
                errors.concat(checkObj(value, schema2.properties, path, schema2.additionalProperties));
              }
              if (schema2.pattern && typeof value == "string" && !value.match(schema2.pattern)) {
                addError("does not match the regex pattern " + schema2.pattern);
              }
              if (schema2.maxLength && typeof value == "string" && value.length > schema2.maxLength) {
                addError("may only be " + schema2.maxLength + " characters long");
              }
              if (schema2.minLength && typeof value == "string" && value.length < schema2.minLength) {
                addError("must be at least " + schema2.minLength + " characters long");
              }
              if (typeof schema2.minimum !== "undefined" && typeof value == typeof schema2.minimum && schema2.minimum > value) {
                addError("must have a minimum value of " + schema2.minimum);
              }
              if (typeof schema2.maximum !== "undefined" && typeof value == typeof schema2.maximum && schema2.maximum < value) {
                addError("must have a maximum value of " + schema2.maximum);
              }
              if (schema2["enum"]) {
                var enumer = schema2["enum"];
                l = enumer.length;
                var found;
                for (var j = 0; j < l; j++) {
                  if (enumer[j] === value) {
                    found = 1;
                    break;
                  }
                }
                if (!found) {
                  addError("does not have a value in the enumeration " + enumer.join(", "));
                }
              }
              if (typeof schema2.maxDecimal == "number" && value.toString().match(new RegExp("\\.[0-9]{" + (schema2.maxDecimal + 1) + ",}"))) {
                addError("may only have " + schema2.maxDecimal + " digits of decimal places");
              }
            }
          }
          return null;
        }
        function checkObj(instance2, objTypeDef, path, additionalProp) {
          if (typeof objTypeDef == "object") {
            if (typeof instance2 != "object" || instance2 instanceof Array) {
              errors.push({ property: path, message: "an object is required" });
            }
            for (var i in objTypeDef) {
              if (objTypeDef.hasOwnProperty(i) && i != "__proto__" && i != "constructor") {
                var value = instance2.hasOwnProperty(i) ? instance2[i] : void 0;
                if (value === void 0 && options.existingOnly)
                  continue;
                var propDef = objTypeDef[i];
                if (value === void 0 && propDef["default"]) {
                  value = instance2[i] = propDef["default"];
                }
                if (options.coerce && i in instance2) {
                  value = instance2[i] = options.coerce(value, propDef);
                }
                checkProp(value, propDef, path, i);
              }
            }
          }
          for (i in instance2) {
            if (instance2.hasOwnProperty(i) && !(i.charAt(0) == "_" && i.charAt(1) == "_") && objTypeDef && !objTypeDef[i] && additionalProp === false) {
              if (options.filter) {
                delete instance2[i];
                continue;
              } else {
                errors.push({ property: path, message: "The property " + i + " is not defined in the schema and the schema does not allow additional properties" });
              }
            }
            var requires = objTypeDef && objTypeDef[i] && objTypeDef[i].requires;
            if (requires && !(requires in instance2)) {
              errors.push({ property: path, message: "the presence of the property " + i + " requires that " + requires + " also be present" });
            }
            value = instance2[i];
            if (additionalProp && (!(objTypeDef && typeof objTypeDef == "object") || !(i in objTypeDef))) {
              if (options.coerce) {
                value = instance2[i] = options.coerce(value, additionalProp);
              }
              checkProp(value, additionalProp, path, i);
            }
            if (!_changing && value && value.$schema) {
              errors = errors.concat(checkProp(value, value.$schema, path, i));
            }
          }
          return errors;
        }
        if (schema) {
          checkProp(instance, schema, "", _changing || "");
        }
        if (!_changing && instance && instance.$schema) {
          checkProp(instance, instance.$schema, "", "");
        }
        return { valid: !errors.length, errors };
      };
      exports2.mustBeValid = function(result) {
        if (!result.valid) {
          throw new TypeError(result.errors.map(function(error) {
            return "for property " + error.property + ": " + error.message;
          }).join(", \n"));
        }
      };
      return exports2;
    });
  }
});

// node_modules/jsprim/lib/jsprim.js
var require_jsprim = __commonJS({
  "node_modules/jsprim/lib/jsprim.js"(exports) {
    var mod_assert = require_assert();
    var mod_util = require("util");
    var mod_extsprintf = require_extsprintf();
    var mod_verror = require_verror();
    var mod_jsonschema = require_validate();
    exports.deepCopy = deepCopy;
    exports.deepEqual = deepEqual;
    exports.isEmpty = isEmpty;
    exports.hasKey = hasKey;
    exports.forEachKey = forEachKey;
    exports.pluck = pluck;
    exports.flattenObject = flattenObject;
    exports.flattenIter = flattenIter;
    exports.validateJsonObject = validateJsonObjectJS;
    exports.validateJsonObjectJS = validateJsonObjectJS;
    exports.randElt = randElt;
    exports.extraProperties = extraProperties;
    exports.mergeObjects = mergeObjects;
    exports.startsWith = startsWith;
    exports.endsWith = endsWith;
    exports.parseInteger = parseInteger;
    exports.iso8601 = iso8601;
    exports.rfc1123 = rfc1123;
    exports.parseDateTime = parseDateTime;
    exports.hrtimediff = hrtimeDiff;
    exports.hrtimeDiff = hrtimeDiff;
    exports.hrtimeAccum = hrtimeAccum;
    exports.hrtimeAdd = hrtimeAdd;
    exports.hrtimeNanosec = hrtimeNanosec;
    exports.hrtimeMicrosec = hrtimeMicrosec;
    exports.hrtimeMillisec = hrtimeMillisec;
    function deepCopy(obj) {
      var ret, key;
      var marker = "__deepCopy";
      if (obj && obj[marker])
        throw new Error("attempted deep copy of cyclic object");
      if (obj && obj.constructor == Object) {
        ret = {};
        obj[marker] = true;
        for (key in obj) {
          if (key == marker)
            continue;
          ret[key] = deepCopy(obj[key]);
        }
        delete obj[marker];
        return ret;
      }
      if (obj && obj.constructor == Array) {
        ret = [];
        obj[marker] = true;
        for (key = 0; key < obj.length; key++)
          ret.push(deepCopy(obj[key]));
        delete obj[marker];
        return ret;
      }
      return obj;
    }
    function deepEqual(obj1, obj2) {
      if (typeof obj1 != typeof obj2)
        return false;
      if (obj1 === null || obj2 === null || typeof obj1 != "object")
        return obj1 === obj2;
      if (obj1.constructor != obj2.constructor)
        return false;
      var k;
      for (k in obj1) {
        if (!(k in obj2))
          return false;
        if (!deepEqual(obj1[k], obj2[k]))
          return false;
      }
      for (k in obj2) {
        if (!(k in obj1))
          return false;
      }
      return true;
    }
    function isEmpty(obj) {
      var key;
      for (key in obj)
        return false;
      return true;
    }
    function hasKey(obj, key) {
      mod_assert.equal(typeof key, "string");
      return Object.prototype.hasOwnProperty.call(obj, key);
    }
    function forEachKey(obj, callback) {
      for (var key in obj) {
        if (hasKey(obj, key)) {
          callback(key, obj[key]);
        }
      }
    }
    function pluck(obj, key) {
      mod_assert.equal(typeof key, "string");
      return pluckv(obj, key);
    }
    function pluckv(obj, key) {
      if (obj === null || typeof obj !== "object")
        return void 0;
      if (obj.hasOwnProperty(key))
        return obj[key];
      var i = key.indexOf(".");
      if (i == -1)
        return void 0;
      var key1 = key.substr(0, i);
      if (!obj.hasOwnProperty(key1))
        return void 0;
      return pluckv(obj[key1], key.substr(i + 1));
    }
    function flattenIter(data, depth, callback) {
      doFlattenIter(data, depth, [], callback);
    }
    function doFlattenIter(data, depth, accum, callback) {
      var each;
      var key;
      if (depth === 0) {
        each = accum.slice(0);
        each.push(data);
        callback(each);
        return;
      }
      mod_assert.ok(data !== null);
      mod_assert.equal(typeof data, "object");
      mod_assert.equal(typeof depth, "number");
      mod_assert.ok(depth >= 0);
      for (key in data) {
        each = accum.slice(0);
        each.push(key);
        doFlattenIter(data[key], depth - 1, each, callback);
      }
    }
    function flattenObject(data, depth) {
      if (depth === 0)
        return [data];
      mod_assert.ok(data !== null);
      mod_assert.equal(typeof data, "object");
      mod_assert.equal(typeof depth, "number");
      mod_assert.ok(depth >= 0);
      var rv = [];
      var key;
      for (key in data) {
        flattenObject(data[key], depth - 1).forEach(function(p) {
          rv.push([key].concat(p));
        });
      }
      return rv;
    }
    function startsWith(str, prefix) {
      return str.substr(0, prefix.length) == prefix;
    }
    function endsWith(str, suffix) {
      return str.substr(str.length - suffix.length, suffix.length) == suffix;
    }
    function iso8601(d) {
      if (typeof d == "number")
        d = new Date(d);
      mod_assert.ok(d.constructor === Date);
      return mod_extsprintf.sprintf("%4d-%02d-%02dT%02d:%02d:%02d.%03dZ", d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());
    }
    var RFC1123_MONTHS = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var RFC1123_DAYS = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat"
    ];
    function rfc1123(date) {
      return mod_extsprintf.sprintf("%s, %02d %s %04d %02d:%02d:%02d GMT", RFC1123_DAYS[date.getUTCDay()], date.getUTCDate(), RFC1123_MONTHS[date.getUTCMonth()], date.getUTCFullYear(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    }
    function parseDateTime(str) {
      var numeric = +str;
      if (!isNaN(numeric)) {
        return new Date(numeric);
      } else {
        return new Date(str);
      }
    }
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
    var MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER || -9007199254740991;
    var PI_DEFAULTS = {
      base: 10,
      allowSign: true,
      allowPrefix: false,
      allowTrailing: false,
      allowImprecise: false,
      trimWhitespace: false,
      leadingZeroIsOctal: false
    };
    var CP_0 = 48;
    var CP_9 = 57;
    var CP_A = 65;
    var CP_B = 66;
    var CP_O = 79;
    var CP_T = 84;
    var CP_X = 88;
    var CP_Z = 90;
    var CP_a = 97;
    var CP_b = 98;
    var CP_o = 111;
    var CP_t = 116;
    var CP_x = 120;
    var CP_z = 122;
    var PI_CONV_DEC = 48;
    var PI_CONV_UC = 55;
    var PI_CONV_LC = 87;
    function parseInteger(str, uopts) {
      mod_assert.string(str, "str");
      mod_assert.optionalObject(uopts, "options");
      var baseOverride = false;
      var options = PI_DEFAULTS;
      if (uopts) {
        baseOverride = hasKey(uopts, "base");
        options = mergeObjects(options, uopts);
        mod_assert.number(options.base, "options.base");
        mod_assert.ok(options.base >= 2, "options.base >= 2");
        mod_assert.ok(options.base <= 36, "options.base <= 36");
        mod_assert.bool(options.allowSign, "options.allowSign");
        mod_assert.bool(options.allowPrefix, "options.allowPrefix");
        mod_assert.bool(options.allowTrailing, "options.allowTrailing");
        mod_assert.bool(options.allowImprecise, "options.allowImprecise");
        mod_assert.bool(options.trimWhitespace, "options.trimWhitespace");
        mod_assert.bool(options.leadingZeroIsOctal, "options.leadingZeroIsOctal");
        if (options.leadingZeroIsOctal) {
          mod_assert.ok(!baseOverride, '"base" and "leadingZeroIsOctal" are mutually exclusive');
        }
      }
      var c;
      var pbase = -1;
      var base = options.base;
      var start;
      var mult = 1;
      var value = 0;
      var idx = 0;
      var len = str.length;
      if (options.trimWhitespace) {
        while (idx < len && isSpace(str.charCodeAt(idx))) {
          ++idx;
        }
      }
      if (options.allowSign) {
        if (str[idx] === "-") {
          idx += 1;
          mult = -1;
        } else if (str[idx] === "+") {
          idx += 1;
        }
      }
      if (str[idx] === "0") {
        if (options.allowPrefix) {
          pbase = prefixToBase(str.charCodeAt(idx + 1));
          if (pbase !== -1 && (!baseOverride || pbase === base)) {
            base = pbase;
            idx += 2;
          }
        }
        if (pbase === -1 && options.leadingZeroIsOctal) {
          base = 8;
        }
      }
      for (start = idx; idx < len; ++idx) {
        c = translateDigit(str.charCodeAt(idx));
        if (c !== -1 && c < base) {
          value *= base;
          value += c;
        } else {
          break;
        }
      }
      if (start === idx) {
        return new Error("invalid number: " + JSON.stringify(str));
      }
      if (options.trimWhitespace) {
        while (idx < len && isSpace(str.charCodeAt(idx))) {
          ++idx;
        }
      }
      if (idx < len && !options.allowTrailing) {
        return new Error("trailing characters after number: " + JSON.stringify(str.slice(idx)));
      }
      if (value === 0) {
        return 0;
      }
      var result = value * mult;
      if (!options.allowImprecise && (value > MAX_SAFE_INTEGER || result < MIN_SAFE_INTEGER)) {
        return new Error("number is outside of the supported range: " + JSON.stringify(str.slice(start, idx)));
      }
      return result;
    }
    function translateDigit(d) {
      if (d >= CP_0 && d <= CP_9) {
        return d - PI_CONV_DEC;
      } else if (d >= CP_A && d <= CP_Z) {
        return d - PI_CONV_UC;
      } else if (d >= CP_a && d <= CP_z) {
        return d - PI_CONV_LC;
      } else {
        return -1;
      }
    }
    function isSpace(c) {
      return c === 32 || c >= 9 && c <= 13 || c === 160 || c === 5760 || c === 6158 || c >= 8192 && c <= 8202 || c === 8232 || c === 8233 || c === 8239 || c === 8287 || c === 12288 || c === 65279;
    }
    function prefixToBase(c) {
      if (c === CP_b || c === CP_B) {
        return 2;
      } else if (c === CP_o || c === CP_O) {
        return 8;
      } else if (c === CP_t || c === CP_T) {
        return 10;
      } else if (c === CP_x || c === CP_X) {
        return 16;
      } else {
        return -1;
      }
    }
    function validateJsonObjectJS(schema, input) {
      var report = mod_jsonschema.validate(input, schema);
      if (report.errors.length === 0)
        return null;
      var error = report.errors[0];
      var propname = error["property"];
      var reason = error["message"].toLowerCase();
      var i, j;
      if ((i = reason.indexOf("the property ")) != -1 && (j = reason.indexOf(" is not defined in the schema and the schema does not allow additional properties")) != -1) {
        i += "the property ".length;
        if (propname === "")
          propname = reason.substr(i, j - i);
        else
          propname = propname + "." + reason.substr(i, j - i);
        reason = "unsupported property";
      }
      var rv = new mod_verror.VError('property "%s": %s', propname, reason);
      rv.jsv_details = error;
      return rv;
    }
    function randElt(arr) {
      mod_assert.ok(Array.isArray(arr) && arr.length > 0, "randElt argument must be a non-empty array");
      return arr[Math.floor(Math.random() * arr.length)];
    }
    function assertHrtime(a) {
      mod_assert.ok(a[0] >= 0 && a[1] >= 0, "negative numbers not allowed in hrtimes");
      mod_assert.ok(a[1] < 1e9, "nanoseconds column overflow");
    }
    function hrtimeDiff(a, b) {
      assertHrtime(a);
      assertHrtime(b);
      mod_assert.ok(a[0] > b[0] || a[0] == b[0] && a[1] >= b[1], "negative differences not allowed");
      var rv = [a[0] - b[0], 0];
      if (a[1] >= b[1]) {
        rv[1] = a[1] - b[1];
      } else {
        rv[0]--;
        rv[1] = 1e9 - (b[1] - a[1]);
      }
      return rv;
    }
    function hrtimeNanosec(a) {
      assertHrtime(a);
      return Math.floor(a[0] * 1e9 + a[1]);
    }
    function hrtimeMicrosec(a) {
      assertHrtime(a);
      return Math.floor(a[0] * 1e6 + a[1] / 1e3);
    }
    function hrtimeMillisec(a) {
      assertHrtime(a);
      return Math.floor(a[0] * 1e3 + a[1] / 1e6);
    }
    function hrtimeAccum(a, b) {
      assertHrtime(a);
      assertHrtime(b);
      a[1] += b[1];
      if (a[1] >= 1e9) {
        a[0]++;
        a[1] -= 1e9;
      }
      a[0] += b[0];
      return a;
    }
    function hrtimeAdd(a, b) {
      assertHrtime(a);
      var rv = [a[0], a[1]];
      return hrtimeAccum(rv, b);
    }
    function extraProperties(obj, allowed) {
      mod_assert.ok(typeof obj === "object" && obj !== null, "obj argument must be a non-null object");
      mod_assert.ok(Array.isArray(allowed), "allowed argument must be an array of strings");
      for (var i = 0; i < allowed.length; i++) {
        mod_assert.ok(typeof allowed[i] === "string", "allowed argument must be an array of strings");
      }
      return Object.keys(obj).filter(function(key) {
        return allowed.indexOf(key) === -1;
      });
    }
    function mergeObjects(provided, overrides, defaults) {
      var rv, k;
      rv = {};
      if (defaults) {
        for (k in defaults)
          rv[k] = defaults[k];
      }
      if (provided) {
        for (k in provided)
          rv[k] = provided[k];
      }
      if (overrides) {
        for (k in overrides)
          rv[k] = overrides[k];
      }
      return rv;
    }
  }
});

// node_modules/ip6addr/ip6addr.js
var require_ip6addr = __commonJS({
  "node_modules/ip6addr/ip6addr.js"(exports, module2) {
    var assert = require_assert();
    var jsprim = require_jsprim();
    var util = require("util");
    function ParseError(input, message, index) {
      if (Error.captureStackTrace)
        Error.captureStackTrace(this, ParseError);
      this.input = input;
      this.message = message;
      if (index !== void 0) {
        this.message += " at index " + index;
      }
    }
    util.inherits(ParseError, Error);
    function modulo(a, n) {
      return (n + a % n) % n;
    }
    function _arrayToOctetString(input) {
      var out;
      out = (input[0] >> 8) + "." + (input[0] & 255) + ".";
      out += (input[1] >> 8) + "." + (input[1] & 255);
      return out;
    }
    function _isAddr(addr) {
      if (typeof addr === "object") {
        if (Array.isArray(addr._fields) && typeof addr._attrs === "object") {
          return true;
        }
      }
      return false;
    }
    function _toAddr(input) {
      if (typeof input === "string") {
        return ip6addrParse(input);
      } else if (_isAddr(input)) {
        return input;
      } else {
        throw new Error("Invalid argument: Addr or parsable string expected");
      }
    }
    function _arrayToHex(input, zeroElide, zeroPad) {
      var i;
      var elStart = null;
      var elLen = 0;
      if (zeroElide) {
        var start = null;
        var len = null;
        for (i = 0; i < input.length; i++) {
          if (input[i] === 0) {
            if (start === null) {
              start = i;
              len = 1;
            } else {
              len++;
            }
          } else if (start !== null) {
            if (len > elLen) {
              elStart = start;
              elLen = len;
            }
            start = null;
          }
        }
        if (start !== null && len > elLen) {
          elStart = start;
          elLen = len;
        }
      }
      var output = [];
      var num;
      for (i = 0; i < input.length; i++) {
        if (elStart !== null) {
          if (i === elStart) {
            if (elLen === 8) {
              return ["::"];
            } else if (elStart === 0 || elStart + elLen === input.length) {
              output.push(":");
            } else {
              output.push("");
            }
          }
          if (i >= elStart && i < elStart + elLen) {
            continue;
          }
        }
        num = input[i].toString(16);
        if (zeroPad && num.length != 4) {
          num = "0000".slice(num.length) + num;
        }
        output.push(num);
      }
      return output;
    }
    function _ipv4Mapped(input) {
      var comp = [0, 0, 0, 0, 0, 65535];
      var i;
      for (i = 0; i < 6; i++) {
        if (input[i] != comp[i])
          return false;
      }
      return true;
    }
    function _prefixToAddr(len) {
      assert.number(len);
      len = len | 0;
      assert.ok(len <= 128);
      assert.ok(len >= 0);
      var output = new Addr();
      var i;
      for (i = 0; len > 16; i++, len -= 16) {
        output._fields[i] = 65535;
      }
      if (len > 0) {
        output._fields[i] = 65535 - ((1 << 16 - len) - 1);
      }
      return output;
    }
    function _toCIDR(input) {
      if (typeof input === "string") {
        return new CIDR(input);
      } else if (input instanceof CIDR) {
        return input;
      } else {
        throw new Error("Invalid argument: CIDR or parsable string expected");
      }
    }
    var strDefaults = {
      format: "auto",
      zeroElide: true,
      zeroPad: false
    };
    function getStrOpt(opts, name) {
      if (opts && opts.hasOwnProperty(name)) {
        return opts[name];
      } else {
        return strDefaults[name];
      }
    }
    function Addr() {
      this._fields = [0, 0, 0, 0, 0, 0, 0, 0];
      this._attrs = {};
    }
    Addr.prototype.kind = function getKind() {
      if (v4subnet.contains(this)) {
        return "ipv4";
      } else {
        return "ipv6";
      }
    };
    Addr.prototype.toString = function toString(opts) {
      assert.optionalObject(opts, "opts");
      var format = getStrOpt(opts, "format");
      var zeroElide = getStrOpt(opts, "zeroElide");
      var zeroPad = getStrOpt(opts, "zeroPad");
      assert.string(format, "opts.format");
      assert.bool(zeroElide, "opts.zeroElide");
      assert.bool(zeroPad, "opts.zeroPad");
      if (format === "auto") {
        if (this._attrs.ipv4Bare) {
          format = "v4";
        } else if (this._attrs.ipv4Mapped) {
          format = "v4-mapped";
        } else {
          format = "v6";
        }
      }
      switch (format) {
        case "v4":
          if (!v4subnet.contains(this)) {
            throw new Error("cannot print non-v4 address in dotted quad notation");
          }
          return _arrayToOctetString(this._fields.slice(6));
        case "v4-mapped":
          if (!v4subnet.contains(this)) {
            throw new Error("cannot print non-v4 address as a v4-mapped address");
          }
          var output = _arrayToHex(this._fields.slice(0, 6), zeroElide, zeroPad);
          output.push(_arrayToOctetString(this._fields.slice(6)));
          return output.join(":");
        case "v6":
          return _arrayToHex(this._fields, zeroElide, zeroPad).join(":");
        default:
          throw new Error('unrecognized format method "' + format + '"');
      }
    };
    Addr.prototype.toBuffer = function toBuffer(buf) {
      if (buf !== void 0) {
        if (!Buffer.isBuffer(buf)) {
          throw new Error("optional arg must be Buffer");
        }
      } else {
        buf = new Buffer(16);
      }
      var i;
      for (i = 0; i < 8; i++) {
        buf.writeUInt16BE(this._fields[i], i * 2);
      }
      return buf;
    };
    Addr.prototype.toLong = function toLong() {
      if (!v4subnet.contains(this)) {
        throw new Error("only possible for ipv4-mapped addresses");
      }
      return (this._fields[6] << 16 >>> 0) + this._fields[7];
    };
    Addr.prototype.clone = function cloneAddr() {
      var out = new Addr();
      out._fields = this._fields.slice();
      for (var k in this._attrs) {
        out._attrs[k] = this._attrs[k];
      }
      return out;
    };
    Addr.prototype.offset = function offset(num) {
      if (num < -4294967295 || num > 4294967295) {
        throw new Error("offsets should be between -4294967295 and 4294967295");
      }
      var out = this.clone();
      var i, moved;
      for (i = 7; i >= 0; i--) {
        moved = out._fields[i] + num;
        if (moved > 65535) {
          num = moved >>> 16;
          moved = moved & 65535;
        } else if (moved < 0) {
          num = Math.floor(moved / (1 << 16));
          moved = modulo(moved, 1 << 16);
        } else {
          num = 0;
        }
        out._fields[i] = moved;
        if (num !== 0) {
          if (i === 0 || i === 6 && this._attrs.ipv4Mapped) {
            return null;
          }
        } else {
          break;
        }
      }
      return out;
    };
    Addr.prototype.and = function addrAnd(input) {
      input = _toAddr(input);
      var i;
      var output = this.clone();
      for (i = 0; i < 8; i++) {
        output._fields[i] = output._fields[i] & input._fields[i];
      }
      return output;
    };
    Addr.prototype.or = function addrOr(input) {
      input = _toAddr(input);
      var i;
      var output = this.clone();
      for (i = 0; i < 8; i++) {
        output._fields[i] = output._fields[i] | input._fields[i];
      }
      return output;
    };
    Addr.prototype.not = function addrNot() {
      var i;
      var output = this.clone();
      for (i = 0; i < 8; i++) {
        output._fields[i] = ~output._fields[i] & 65535;
      }
      return output;
    };
    Addr.prototype.compare = function compareMember(addr) {
      return ip6addrCompare(this, addr);
    };
    function CIDR(addr, prefixLen) {
      if (prefixLen === void 0) {
        assert.string(addr);
        var fields = addr.match(/^([a-fA-F0-9:.]+)\/([0-9]+)$/);
        if (fields === null) {
          throw new Error("Invalid argument: <addr>/<prefix> expected");
        }
        addr = fields[1];
        prefixLen = parseInt(fields[2], 10);
      }
      assert.number(prefixLen);
      prefixLen = prefixLen | 0;
      addr = _toAddr(addr);
      if (addr._attrs.ipv4Bare) {
        prefixLen += 96;
      }
      if (prefixLen < 0 || prefixLen > 128) {
        throw new Error("Invalid prefix length");
      }
      this._prefix = prefixLen;
      this._mask = _prefixToAddr(prefixLen);
      this._addr = addr.and(this._mask);
    }
    CIDR.prototype.contains = function cidrContains(input) {
      input = _toAddr(input);
      return this._addr.compare(input.and(this._mask)) === 0;
    };
    CIDR.prototype.first = function cidrFirst() {
      if (this._prefix >= 127) {
        return this._addr;
      } else {
        return this._addr.offset(1);
      }
    };
    CIDR.prototype.last = function cidrLast() {
      var ending = this._addr.or(this._mask.not());
      if (this._prefix >= 127) {
        return ending;
      } else {
        if (this._addr._attrs.ipv4Mapped) {
          return ending.offset(-1);
        } else {
          return ending;
        }
      }
    };
    CIDR.prototype.broadcast = function getBroadcast() {
      if (!v4subnet.contains(this._addr)) {
        throw new Error("Only IPv4 networks have broadcast addresses");
      }
      return this._addr.or(this._mask.not());
    };
    CIDR.prototype.compare = function compareCIDR(cidr) {
      return ip6cidrCompare(this, cidr);
    };
    CIDR.prototype.prefixLength = function getPrefixLength(format) {
      assert.optionalString(format, "format");
      if (format === void 0 || format === "auto") {
        format = this._addr._attrs.ipv4Bare ? "v4" : "v6";
      }
      switch (format) {
        case "v4":
          if (!v4subnet.contains(this._addr)) {
            throw new Error("cannot return v4 prefix length for non-v4 address");
          }
          return this._prefix - 96;
        case "v6":
          return this._prefix;
        default:
          throw new Error('unrecognized format method "' + format + '"');
      }
    };
    CIDR.prototype.address = function getAddressComponent() {
      return this._addr;
    };
    CIDR.prototype.toString = function cidrString(opts) {
      assert.optionalObject(opts, "opts");
      var format = getStrOpt(opts, "format");
      if (format === "v4-mapped") {
        format = "v6";
      }
      return this._addr.toString(opts) + "/" + this.prefixLength(format);
    };
    var v4subnet = new CIDR("::ffff:0:0", 96);
    function ip6cidrCompare(a, b) {
      a = _toCIDR(a);
      b = _toCIDR(b);
      var cmp = ip6addrCompare(a._addr, b._addr);
      return cmp === 0 ? b._prefix - a._prefix : cmp;
    }
    function AddrRange(begin, end) {
      begin = _toAddr(begin);
      end = _toAddr(end);
      if (begin.compare(end) > 0) {
        throw new Error("begin address must be <= end address");
      }
      this._begin = begin;
      this._end = end;
    }
    AddrRange.prototype.contains = function addrRangeContains(input) {
      input = _toAddr(input);
      return this._begin.compare(input) <= 0 && this._end.compare(input) >= 0;
    };
    AddrRange.prototype.first = function addrRangeFirst() {
      return this._begin;
    };
    AddrRange.prototype.last = function addrRangeLast() {
      return this._end;
    };
    function ip6addrParse(input) {
      if (typeof input === "string") {
        return parseString(input);
      } else if (typeof input === "number") {
        return parseLong(input);
      } else if (typeof input === "object" && _isAddr(input)) {
        return input;
      } else {
        throw new Error("Invalid argument: only string|number allowed");
      }
    }
    function parseString(input) {
      assert.string(input);
      input = input.toLowerCase();
      var result = new Addr();
      var ip6Fields = [];
      var ip4Fields = [];
      var expIndex = null;
      var value = "";
      var i, c;
      if (input.length > 40) {
        throw new ParseError(input, "Input too long");
      }
      for (i = 0; i < input.length; i++) {
        c = input[i];
        if (c === ":") {
          if (i + 1 < input.length && input[i + 1] === ":") {
            if (expIndex !== null) {
              throw new ParseError(input, "Multiple :: delimiters", i);
            }
            if (value !== "") {
              ip6Fields.push(value);
              value = "";
            }
            expIndex = ip6Fields.length;
            i++;
          } else {
            if (value === "") {
              throw new ParseError(input, "illegal delimiter", i);
            }
            ip6Fields.push(value);
            value = "";
          }
        } else if (c === ".") {
          ip4Fields.push(value);
          value = "";
        } else {
          value = value + c;
        }
      }
      if (value !== "") {
        if (ip4Fields.length !== 0) {
          ip4Fields.push(value);
        } else {
          ip6Fields.push(value);
        }
        value = "";
      } else {
        if (expIndex !== ip6Fields.length || ip4Fields.length > 0) {
          throw new ParseError(input, "Cannot end with delimiter besides ::");
        }
      }
      if (ip4Fields.length === 0) {
        if (ip6Fields.length > 8) {
          throw new ParseError(input, "Too many fields");
        } else if (ip6Fields.length < 8 && expIndex === null) {
          throw new ParseError(input, "Too few fields");
        }
      } else {
        if (ip4Fields.length !== 4) {
          throw new ParseError(input, "IPv4 portion must have 4 fields");
        }
        if (ip6Fields.length === 0 && expIndex === null) {
          result._attrs.ipv4Bare = true;
          ip6Fields = ["ffff"];
          expIndex = 0;
        }
        if (ip6Fields.length > 6) {
          throw new ParseError(input, "Too many fields");
        } else if (ip6Fields.length < 6 && expIndex === null) {
          throw new ParseError(input, "Too few fields");
        }
      }
      var field, num;
      for (i = 0; i < ip6Fields.length; i++) {
        field = ip6Fields[i];
        num = jsprim.parseInteger(field, { base: 16, allowSign: false });
        if (num instanceof Error || num < 0 || num > 65535) {
          throw new ParseError(input, "Invalid field value: " + field);
        }
        ip6Fields[i] = num;
      }
      for (i = 0; i < ip4Fields.length; i++) {
        field = ip4Fields[i];
        num = jsprim.parseInteger(field, { base: 10, allowSign: false });
        if (num instanceof Error || num < 0 || num > 255) {
          throw new ParseError(input, "Invalid field value: " + field);
        }
        ip4Fields[i] = num;
      }
      if (ip4Fields.length !== 0) {
        ip6Fields.push(ip4Fields[0] * 256 + ip4Fields[1]);
        ip6Fields.push(ip4Fields[2] * 256 + ip4Fields[3]);
      }
      if (ip6Fields.length < 8 && expIndex !== null) {
        var filler = [];
        for (i = 0; i < 8 - ip6Fields.length; i++) {
          filler.push(0);
        }
        ip6Fields = Array.prototype.concat(ip6Fields.slice(0, expIndex), filler, ip6Fields.slice(expIndex));
      }
      if (ip4Fields.length !== 0) {
        if (!_ipv4Mapped(ip6Fields)) {
          throw new ParseError(input, "invalid dotted-quad notation");
        } else {
          result._attrs.ipv4Mapped = true;
        }
      }
      result._fields = ip6Fields;
      return result;
    }
    function parseLong(input) {
      assert.number(input);
      if (input !== Math.floor(input)) {
        throw new Error("Value must be integer");
      }
      if (input < 0 || input > 4294967295) {
        throw new Error("Value must be 32 bit");
      }
      var out = new Addr();
      out._fields[7] = input & 65535;
      out._fields[6] = input >>> 16;
      out._fields[5] = 65535;
      out._attrs.ipv4Bare = true;
      out._attrs.ipv4Mapped = true;
      return out;
    }
    function ip6addrCompare(a, b) {
      a = _toAddr(a);
      b = _toAddr(b);
      var i;
      for (i = 0; i < 8; i++) {
        if (a._fields[i] < b._fields[i]) {
          return -1;
        } else if (a._fields[i] > b._fields[i]) {
          return 1;
        }
      }
      return 0;
    }
    module2.exports = {
      parse: ip6addrParse,
      compare: ip6addrCompare,
      createCIDR: function(addr, len) {
        return new CIDR(addr, len);
      },
      compareCIDR: ip6cidrCompare,
      createAddrRange: function(begin, end) {
        return new AddrRange(begin, end);
      }
    };
  }
});

// node_modules/lodash.set/index.js
var require_lodash = __commonJS({
  "node_modules/lodash.set/index.js"(exports, module2) {
    var FUNC_ERROR_TEXT = "Expected a function";
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var INFINITY = 1 / 0;
    var MAX_SAFE_INTEGER = 9007199254740991;
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var symbolTag = "[object Symbol]";
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
    var reIsPlainProp = /^\w*$/;
    var reLeadingDot = /^\./;
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reEscapeChar = /\\(\\)?/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    function isHostObject(value) {
      var result = false;
      if (value != null && typeof value.toString != "function") {
        try {
          result = !!(value + "");
        } catch (e) {
        }
      }
      return result;
    }
    var arrayProto = Array.prototype;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var coreJsData = root["__core-js_shared__"];
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectToString = objectProto.toString;
    var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    var Symbol2 = root.Symbol;
    var splice = arrayProto.splice;
    var Map2 = getNative(root, "Map");
    var nativeCreate = getNative(Object, "create");
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolToString = symbolProto ? symbolProto.toString : void 0;
    function Hash(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }
    function hashDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    function hashSet(key, value) {
      var data = this.__data__;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
    }
    function listCacheDelete(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      return true;
    }
    function listCacheGet(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    function listCacheSet(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function mapCacheClear() {
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    function mapCacheDelete(key) {
      return getMapData(this, key)["delete"](key);
    }
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    function mapCacheSet(key, value) {
      getMapData(this, key).set(key, value);
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
        object[key] = value;
      }
    }
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    function baseSet(object, path, value, customizer) {
      if (!isObject(object)) {
        return object;
      }
      path = isKey(path, object) ? [path] : castPath(path);
      var index = -1, length = path.length, lastIndex = length - 1, nested = object;
      while (nested != null && ++index < length) {
        var key = toKey(path[index]), newValue = value;
        if (index != lastIndex) {
          var objValue = nested[key];
          newValue = customizer ? customizer(objValue, key, nested) : void 0;
          if (newValue === void 0) {
            newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
          }
        }
        assignValue(nested, key, newValue);
        nested = nested[key];
      }
      return object;
    }
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    function castPath(value) {
      return isArray(value) ? value : stringToPath(value);
    }
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
    }
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    var stringToPath = memoize(function(string) {
      string = toString(string);
      var result = [];
      if (reLeadingDot.test(string)) {
        result.push("");
      }
      string.replace(rePropName, function(match, number, quote, string2) {
        result.push(quote ? string2.replace(reEscapeChar, "$1") : number || match);
      });
      return result;
    });
    function toKey(value) {
      if (typeof value == "string" || isSymbol(value)) {
        return value;
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    function memoize(func, resolver) {
      if (typeof func != "function" || resolver && typeof resolver != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result);
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache)();
      return memoized;
    }
    memoize.Cache = MapCache;
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    var isArray = Array.isArray;
    function isFunction(value) {
      var tag = isObject(value) ? objectToString.call(value) : "";
      return tag == funcTag || tag == genTag;
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    function set(object, path, value) {
      return object == null ? object : baseSet(object, path, value);
    }
    module2.exports = set;
  }
});

// node_modules/@maxmind/geoip2-node/dist/src/models/AnonymousIP.js
var require_AnonymousIP = __commonJS({
  "node_modules/@maxmind/geoip2-node/dist/src/models/AnonymousIP.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AnonymousIP = class {
      constructor(response) {
        this.ipAddress = response.ip_address;
        this.isAnonymous = !!response.is_anonymous;
        this.isAnonymousVpn = !!response.is_anonymous_vpn;
        this.isHostingProvider = !!response.is_hosting_provider;
        this.isPublicProxy = !!response.is_public_proxy;
        this.isResidentialProxy = !!response.is_residential_proxy;
        this.isTorExitNode = !!response.is_tor_exit_node;
      }
    };
    exports.default = AnonymousIP;
  }
});

// node_modules/@maxmind/geoip2-node/dist/src/models/Asn.js
var require_Asn = __commonJS({
  "node_modules/@maxmind/geoip2-node/dist/src/models/Asn.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Asn = class {
      constructor(response) {
        this.autonomousSystemNumber = response.autonomous_system_number;
        this.autonomousSystemOrganization = response.autonomous_system_organization;
        this.ipAddress = response.ip_address;
      }
    };
    exports.default = Asn;
  }
});

// node_modules/map-obj/index.js
var require_map_obj = __commonJS({
  "node_modules/map-obj/index.js"(exports, module2) {
    "use strict";
    var isObject = (value) => typeof value === "object" && value !== null;
    var mapObjectSkip = Symbol("skip");
    var isObjectCustom = (value) => isObject(value) && !(value instanceof RegExp) && !(value instanceof Error) && !(value instanceof Date);
    var mapObject = (object, mapper, options, isSeen = new WeakMap()) => {
      options = __spreadValues({
        deep: false,
        target: {}
      }, options);
      if (isSeen.has(object)) {
        return isSeen.get(object);
      }
      isSeen.set(object, options.target);
      const { target } = options;
      delete options.target;
      const mapArray = (array) => array.map((element) => isObjectCustom(element) ? mapObject(element, mapper, options, isSeen) : element);
      if (Array.isArray(object)) {
        return mapArray(object);
      }
      for (const [key, value] of Object.entries(object)) {
        const mapResult = mapper(key, value, object);
        if (mapResult === mapObjectSkip) {
          continue;
        }
        let [newKey, newValue, { shouldRecurse = true } = {}] = mapResult;
        if (newKey === "__proto__") {
          continue;
        }
        if (options.deep && shouldRecurse && isObjectCustom(newValue)) {
          newValue = Array.isArray(newValue) ? mapArray(newValue) : mapObject(newValue, mapper, options, isSeen);
        }
        target[newKey] = newValue;
      }
      return target;
    };
    module2.exports = (object, mapper, options) => {
      if (!isObject(object)) {
        throw new TypeError(`Expected an object, got \`${object}\` (${typeof object})`);
      }
      return mapObject(object, mapper, options);
    };
    module2.exports.mapObjectSkip = mapObjectSkip;
  }
});

// node_modules/camelcase/index.js
var require_camelcase = __commonJS({
  "node_modules/camelcase/index.js"(exports, module2) {
    "use strict";
    var UPPERCASE = /[\p{Lu}]/u;
    var LOWERCASE = /[\p{Ll}]/u;
    var LEADING_CAPITAL = /^[\p{Lu}](?![\p{Lu}])/gu;
    var IDENTIFIER = /([\p{Alpha}\p{N}_]|$)/u;
    var SEPARATORS = /[_.\- ]+/;
    var LEADING_SEPARATORS = new RegExp("^" + SEPARATORS.source);
    var SEPARATORS_AND_IDENTIFIER = new RegExp(SEPARATORS.source + IDENTIFIER.source, "gu");
    var NUMBERS_AND_IDENTIFIER = new RegExp("\\d+" + IDENTIFIER.source, "gu");
    var preserveCamelCase = (string, toLowerCase, toUpperCase) => {
      let isLastCharLower = false;
      let isLastCharUpper = false;
      let isLastLastCharUpper = false;
      for (let i = 0; i < string.length; i++) {
        const character = string[i];
        if (isLastCharLower && UPPERCASE.test(character)) {
          string = string.slice(0, i) + "-" + string.slice(i);
          isLastCharLower = false;
          isLastLastCharUpper = isLastCharUpper;
          isLastCharUpper = true;
          i++;
        } else if (isLastCharUpper && isLastLastCharUpper && LOWERCASE.test(character)) {
          string = string.slice(0, i - 1) + "-" + string.slice(i - 1);
          isLastLastCharUpper = isLastCharUpper;
          isLastCharUpper = false;
          isLastCharLower = true;
        } else {
          isLastCharLower = toLowerCase(character) === character && toUpperCase(character) !== character;
          isLastLastCharUpper = isLastCharUpper;
          isLastCharUpper = toUpperCase(character) === character && toLowerCase(character) !== character;
        }
      }
      return string;
    };
    var preserveConsecutiveUppercase = (input, toLowerCase) => {
      LEADING_CAPITAL.lastIndex = 0;
      return input.replace(LEADING_CAPITAL, (m1) => toLowerCase(m1));
    };
    var postProcess = (input, toUpperCase) => {
      SEPARATORS_AND_IDENTIFIER.lastIndex = 0;
      NUMBERS_AND_IDENTIFIER.lastIndex = 0;
      return input.replace(SEPARATORS_AND_IDENTIFIER, (_, identifier) => toUpperCase(identifier)).replace(NUMBERS_AND_IDENTIFIER, (m) => toUpperCase(m));
    };
    var camelCase = (input, options) => {
      if (!(typeof input === "string" || Array.isArray(input))) {
        throw new TypeError("Expected the input to be `string | string[]`");
      }
      options = __spreadValues({
        pascalCase: false,
        preserveConsecutiveUppercase: false
      }, options);
      if (Array.isArray(input)) {
        input = input.map((x) => x.trim()).filter((x) => x.length).join("-");
      } else {
        input = input.trim();
      }
      if (input.length === 0) {
        return "";
      }
      const toLowerCase = options.locale === false ? (string) => string.toLowerCase() : (string) => string.toLocaleLowerCase(options.locale);
      const toUpperCase = options.locale === false ? (string) => string.toUpperCase() : (string) => string.toLocaleUpperCase(options.locale);
      if (input.length === 1) {
        return options.pascalCase ? toUpperCase(input) : toLowerCase(input);
      }
      const hasUpperCase = input !== toLowerCase(input);
      if (hasUpperCase) {
        input = preserveCamelCase(input, toLowerCase, toUpperCase);
      }
      input = input.replace(LEADING_SEPARATORS, "");
      if (options.preserveConsecutiveUppercase) {
        input = preserveConsecutiveUppercase(input, toLowerCase);
      } else {
        input = toLowerCase(input);
      }
      if (options.pascalCase) {
        input = toUpperCase(input.charAt(0)) + input.slice(1);
      }
      return postProcess(input, toUpperCase);
    };
    module2.exports = camelCase;
    module2.exports.default = camelCase;
  }
});

// node_modules/quick-lru/index.js
var require_quick_lru = __commonJS({
  "node_modules/quick-lru/index.js"(exports, module2) {
    "use strict";
    var QuickLRU = class {
      constructor(options = {}) {
        if (!(options.maxSize && options.maxSize > 0)) {
          throw new TypeError("`maxSize` must be a number greater than 0");
        }
        this.maxSize = options.maxSize;
        this.onEviction = options.onEviction;
        this.cache = new Map();
        this.oldCache = new Map();
        this._size = 0;
      }
      _set(key, value) {
        this.cache.set(key, value);
        this._size++;
        if (this._size >= this.maxSize) {
          this._size = 0;
          if (typeof this.onEviction === "function") {
            for (const [key2, value2] of this.oldCache.entries()) {
              this.onEviction(key2, value2);
            }
          }
          this.oldCache = this.cache;
          this.cache = new Map();
        }
      }
      get(key) {
        if (this.cache.has(key)) {
          return this.cache.get(key);
        }
        if (this.oldCache.has(key)) {
          const value = this.oldCache.get(key);
          this.oldCache.delete(key);
          this._set(key, value);
          return value;
        }
      }
      set(key, value) {
        if (this.cache.has(key)) {
          this.cache.set(key, value);
        } else {
          this._set(key, value);
        }
        return this;
      }
      has(key) {
        return this.cache.has(key) || this.oldCache.has(key);
      }
      peek(key) {
        if (this.cache.has(key)) {
          return this.cache.get(key);
        }
        if (this.oldCache.has(key)) {
          return this.oldCache.get(key);
        }
      }
      delete(key) {
        const deleted = this.cache.delete(key);
        if (deleted) {
          this._size--;
        }
        return this.oldCache.delete(key) || deleted;
      }
      clear() {
        this.cache.clear();
        this.oldCache.clear();
        this._size = 0;
      }
      *keys() {
        for (const [key] of this) {
          yield key;
        }
      }
      *values() {
        for (const [, value] of this) {
          yield value;
        }
      }
      *[Symbol.iterator]() {
        for (const item of this.cache) {
          yield item;
        }
        for (const item of this.oldCache) {
          const [key] = item;
          if (!this.cache.has(key)) {
            yield item;
          }
        }
      }
      get size() {
        let oldCacheSize = 0;
        for (const key of this.oldCache.keys()) {
          if (!this.cache.has(key)) {
            oldCacheSize++;
          }
        }
        return Math.min(this._size + oldCacheSize, this.maxSize);
      }
    };
    module2.exports = QuickLRU;
  }
});

// node_modules/camelcase-keys/index.js
var require_camelcase_keys = __commonJS({
  "node_modules/camelcase-keys/index.js"(exports, module2) {
    "use strict";
    var mapObj = require_map_obj();
    var camelCase = require_camelcase();
    var QuickLru = require_quick_lru();
    var has = (array, key) => array.some((x) => {
      if (typeof x === "string") {
        return x === key;
      }
      x.lastIndex = 0;
      return x.test(key);
    });
    var cache = new QuickLru({ maxSize: 1e5 });
    var isObject = (value) => typeof value === "object" && value !== null && !(value instanceof RegExp) && !(value instanceof Error) && !(value instanceof Date);
    var camelCaseConvert = (input, options) => {
      if (!isObject(input)) {
        return input;
      }
      options = __spreadValues({
        deep: false,
        pascalCase: false
      }, options);
      const { exclude, pascalCase, stopPaths, deep } = options;
      const stopPathsSet = new Set(stopPaths);
      const makeMapper = (parentPath) => (key, value) => {
        if (deep && isObject(value)) {
          const path = parentPath === void 0 ? key : `${parentPath}.${key}`;
          if (!stopPathsSet.has(path)) {
            value = mapObj(value, makeMapper(path));
          }
        }
        if (!(exclude && has(exclude, key))) {
          const cacheKey = pascalCase ? `${key}_` : key;
          if (cache.has(cacheKey)) {
            key = cache.get(cacheKey);
          } else {
            const returnValue = camelCase(key, { pascalCase, locale: false });
            if (key.length < 100) {
              cache.set(cacheKey, returnValue);
            }
            key = returnValue;
          }
        }
        return [key, value];
      };
      return mapObj(input, makeMapper(void 0));
    };
    module2.exports = (input, options) => {
      if (Array.isArray(input)) {
        return Object.keys(input).map((key) => camelCaseConvert(input[key], options));
      }
      return camelCaseConvert(input, options);
    };
  }
});

// node_modules/@maxmind/geoip2-node/dist/src/models/Country.js
var require_Country = __commonJS({
  "node_modules/@maxmind/geoip2-node/dist/src/models/Country.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var camelcaseKeys = require_camelcase_keys();
    var Country = class {
      constructor(response) {
        const camelcaseResponse = camelcaseKeys(response, {
          deep: true,
          exclude: [/-/]
        });
        this.continent = camelcaseResponse.continent || void 0;
        this.country = camelcaseResponse.country || void 0;
        this.maxmind = camelcaseResponse.maxmind || void 0;
        this.registeredCountry = this.setBooleanRegisteredCountry(camelcaseResponse.registeredCountry) || void 0;
        this.representedCountry = camelcaseResponse.representedCountry || void 0;
        this.traits = this.setBooleanTraits(camelcaseResponse.traits || {});
      }
      setBooleanTraits(traits) {
        const booleanTraits = [
          "isAnonymous",
          "isAnonymousProxy",
          "isAnonymousVpn",
          "isHostingProvider",
          "isLegitimateProxy",
          "isPublicProxy",
          "isResidentialProxy",
          "isSatelliteProvider",
          "isTorExitNode"
        ];
        booleanTraits.forEach((trait) => {
          traits[trait] = !!traits[trait];
        });
        return traits;
      }
      setBooleanRegisteredCountry(country) {
        if (country) {
          country.isInEuropeanUnion = !!country.isInEuropeanUnion;
        }
        return country;
      }
    };
    exports.default = Country;
  }
});

// node_modules/@maxmind/geoip2-node/dist/src/models/City.js
var require_City = __commonJS({
  "node_modules/@maxmind/geoip2-node/dist/src/models/City.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var camelcaseKeys = require_camelcase_keys();
    var Country_1 = __importDefault(require_Country());
    var City = class extends Country_1.default {
      constructor(response) {
        super(response);
        const camelcaseResponse = camelcaseKeys(response, {
          deep: true,
          exclude: [/-/]
        });
        this.city = camelcaseResponse.city || void 0;
        this.location = camelcaseResponse.location || void 0;
        this.postal = camelcaseResponse.postal || void 0;
        this.subdivisions = camelcaseResponse.subdivisions || void 0;
      }
    };
    exports.default = City;
  }
});

// node_modules/@maxmind/geoip2-node/dist/src/models/ConnectionType.js
var require_ConnectionType = __commonJS({
  "node_modules/@maxmind/geoip2-node/dist/src/models/ConnectionType.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ConnectionType = class {
      constructor(response) {
        this.connectionType = response.connection_type;
        this.ipAddress = response.ip_address;
      }
    };
    exports.default = ConnectionType;
  }
});

// node_modules/@maxmind/geoip2-node/dist/src/models/Domain.js
var require_Domain = __commonJS({
  "node_modules/@maxmind/geoip2-node/dist/src/models/Domain.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Domain = class {
      constructor(response) {
        this.domain = response.domain;
        this.ipAddress = response.ip_address;
      }
    };
    exports.default = Domain;
  }
});

// node_modules/@maxmind/geoip2-node/dist/src/models/Enterprise.js
var require_Enterprise = __commonJS({
  "node_modules/@maxmind/geoip2-node/dist/src/models/Enterprise.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var City_1 = __importDefault(require_City());
    var Enterprise = class extends City_1.default {
      constructor(response) {
        super(response);
      }
    };
    exports.default = Enterprise;
  }
});

// node_modules/@maxmind/geoip2-node/dist/src/models/Insights.js
var require_Insights = __commonJS({
  "node_modules/@maxmind/geoip2-node/dist/src/models/Insights.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var City_1 = __importDefault(require_City());
    var Insights = class extends City_1.default {
      constructor(response) {
        super(response);
      }
    };
    exports.default = Insights;
  }
});

// node_modules/@maxmind/geoip2-node/dist/src/models/Isp.js
var require_Isp = __commonJS({
  "node_modules/@maxmind/geoip2-node/dist/src/models/Isp.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var Asn_1 = __importDefault(require_Asn());
    var Isp = class extends Asn_1.default {
      constructor(response) {
        super(response);
        this.isp = response.isp;
        this.mobileCountryCode = response.mobile_country_code;
        this.mobileNetworkCode = response.mobile_network_code;
        this.organization = response.organization;
      }
    };
    exports.default = Isp;
  }
});

// node_modules/@maxmind/geoip2-node/dist/src/models/index.js
var require_models = __commonJS({
  "node_modules/@maxmind/geoip2-node/dist/src/models/index.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Isp = exports.Insights = exports.Enterprise = exports.Domain = exports.Country = exports.ConnectionType = exports.City = exports.Asn = exports.AnonymousIP = void 0;
    var AnonymousIP_1 = __importDefault(require_AnonymousIP());
    exports.AnonymousIP = AnonymousIP_1.default;
    var Asn_1 = __importDefault(require_Asn());
    exports.Asn = Asn_1.default;
    var City_1 = __importDefault(require_City());
    exports.City = City_1.default;
    var ConnectionType_1 = __importDefault(require_ConnectionType());
    exports.ConnectionType = ConnectionType_1.default;
    var Country_1 = __importDefault(require_Country());
    exports.Country = Country_1.default;
    var Domain_1 = __importDefault(require_Domain());
    exports.Domain = Domain_1.default;
    var Enterprise_1 = __importDefault(require_Enterprise());
    exports.Enterprise = Enterprise_1.default;
    var Insights_1 = __importDefault(require_Insights());
    exports.Insights = Insights_1.default;
    var Isp_1 = __importDefault(require_Isp());
    exports.Isp = Isp_1.default;
  }
});

// node_modules/@maxmind/geoip2-node/dist/src/readerModel.js
var require_readerModel = __commonJS({
  "node_modules/@maxmind/geoip2-node/dist/src/readerModel.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var ip6addr = require_ip6addr();
    var set = require_lodash();
    var mmdb = require_lib2();
    var errors_1 = require_errors();
    var models = __importStar(require_models());
    var ReaderModel2 = class {
      constructor(mmdbReader) {
        this.mmdbReader = mmdbReader;
      }
      anonymousIP(ipAddress) {
        return this.modelFor(models.AnonymousIP, "GeoIP2-Anonymous-IP", ipAddress, "anonymousIP()");
      }
      city(ipAddress) {
        return this.modelFor(models.City, "City", ipAddress, "city()");
      }
      country(ipAddress) {
        return this.modelFor(models.Country, "Country", ipAddress, "country()");
      }
      asn(ipAddress) {
        return this.modelFor(models.Asn, "ASN", ipAddress, "asn()");
      }
      connectionType(ipAddress) {
        return this.modelFor(models.ConnectionType, "Connection-Type", ipAddress, "connectionType()");
      }
      domain(ipAddress) {
        return this.modelFor(models.Domain, "Domain", ipAddress, "domain()");
      }
      isp(ipAddress) {
        return this.modelFor(models.Isp, "ISP", ipAddress, "isp()");
      }
      enterprise(ipAddress) {
        return this.modelFor(models.Enterprise, "Enterprise", ipAddress, "enterprise()");
      }
      getRecord(dbType, ipAddress, fnName) {
        const metaDbType = this.mmdbReader.metadata.databaseType;
        if (!mmdb.validate(ipAddress)) {
          throw new errors_1.ValueError(`${ipAddress} is invalid`);
        }
        if (!metaDbType.includes(dbType)) {
          throw new errors_1.BadMethodCallError(`The ${fnName} method cannot be used with the ${metaDbType} database`);
        }
        const [record, prefixLength] = this.mmdbReader.getWithPrefixLength(ipAddress);
        if (!record) {
          throw new errors_1.AddressNotFoundError(`The address ${ipAddress} is not in the database`);
        }
        return [record, ip6addr.createCIDR(ipAddress, prefixLength).toString()];
      }
      modelFor(modelClass, dbType, ipAddress, fnName) {
        const [record, network] = this.getRecord(dbType, ipAddress, fnName);
        const model = new modelClass(record);
        switch (dbType) {
          case "ASN":
          case "Connection-Type":
          case "Domain":
          case "GeoIP2-Anonymous-IP":
          case "ISP":
            set(model, "ipAddress", ipAddress);
            set(model, "network", network);
            break;
          default:
            set(model, "traits.ipAddress", ipAddress);
            set(model, "traits.network", network);
        }
        return model;
      }
    };
    exports.default = ReaderModel2;
  }
});

// node_modules/@maxmind/geoip2-node/dist/src/reader.js
var require_reader = __commonJS({
  "node_modules/@maxmind/geoip2-node/dist/src/reader.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var mmdb = require_lib2();
    var errors_1 = require_errors();
    var readerModel_1 = __importDefault(require_readerModel());
    var Reader2 = class {
      static open(file, opts) {
        return mmdb.open(file, opts).then((reader) => new readerModel_1.default(reader));
      }
      static openBuffer(buffer) {
        let reader;
        try {
          reader = new mmdb.Reader(buffer);
        } catch (e) {
          throw new errors_1.InvalidDbBufferError(e);
        }
        return new readerModel_1.default(reader);
      }
    };
    exports.default = Reader2;
  }
});

// node_modules/@maxmind/geoip2-node/dist/package.json
var require_package = __commonJS({
  "node_modules/@maxmind/geoip2-node/dist/package.json"(exports, module2) {
    module2.exports = {
      name: "@maxmind/geoip2-node",
      version: "3.4.0",
      description: "Node.js API for GeoIP2 webservice client and database reader",
      main: "dist/src/index.js",
      homepage: "https://github.com/maxmind/GeoIP2-node",
      repository: {
        type: "git",
        url: "https://github.com/maxmind/GeoIP2-node.git"
      },
      author: "MaxMind",
      license: "Apache-2.0",
      private: false,
      keywords: [
        "geoip",
        "geoip2",
        "geoip precision",
        "geoip2 precision",
        "geolite",
        "geolite2",
        "maxmind",
        "maxminddb",
        "mmdb"
      ],
      files: ["dist"],
      types: "dist/src/index.d.ts",
      devDependencies: {
        "@types/ip6addr": "^0.2.3",
        "@types/jest": "^27.0.1",
        "@types/lodash.set": "^4.3.4",
        "@types/node": "^16.0.1",
        "@typescript-eslint/eslint-plugin": "^5.6.0",
        "@typescript-eslint/parser": "^5.6.0",
        eslint: "^8.4.1",
        "eslint-config-prettier": "^8.3.0",
        "eslint-plugin-prefer-arrow": "^1.2.3",
        "gh-pages": "^3.0.0",
        husky: "^7.0.4",
        jest: "^27.0.1",
        "lint-staged": "^12.1.2",
        lodash: "^4.17.11",
        nock: "^13.0.2",
        pinst: "^2.1.4",
        prettier: "^2.0.3",
        "ts-jest": "^27.0.1",
        typedoc: "^0.22.10",
        typescript: "^4.5.2"
      },
      "lint-staged": {
        "*.json": ["prettier --parser json --write"],
        "*.ts": [
          "prettier --parser typescript --single-quote true --trailing-comma es5 --write",
          "eslint -c .eslintrc.js --ext ts,js . --fix"
        ]
      },
      publishConfig: {
        access: "public"
      },
      scripts: {
        build: "rimraf dist && tsc",
        "build:docs": 'rimraf docs && typedoc src/index.ts --out docs --exclude "**/*.spec.ts" --readme README.md && ./bin/sanitize-doc-refs.sh',
        "deploy:docs": "gh-pages -d docs",
        lint: "eslint -c .eslintrc.js --ext ts,js .",
        "prettier:ts": "prettier --parser typescript --single-quote true --trailing-comma es5 --write 'src/**/*.ts'",
        "prettier:ci": "prettier --parser typescript --single-quote true --trailing-comma es5 --list-different 'src/**/*.ts'",
        "prettier:json": "prettier --parser json --write '**/*.json'",
        test: "jest",
        "test:watch": "jest --watch",
        postinstall: "husky install",
        prepublishOnly: "npm run build && npm run test && npm run lint && npm run build:docs && npm run deploy:docs && pinst --disable",
        postpublish: "pinst --enable"
      },
      dependencies: {
        "camelcase-keys": "^7.0.0",
        ip6addr: "^0.2.5",
        "lodash.set": "^4.3.2",
        maxmind: "^4.2.0"
      }
    };
  }
});

// node_modules/@maxmind/geoip2-node/dist/src/webServiceClient.js
var require_webServiceClient = __commonJS({
  "node_modules/@maxmind/geoip2-node/dist/src/webServiceClient.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var https = require("https");
    var mmdb = require_lib2();
    var package_json_1 = require_package();
    var models = __importStar(require_models());
    var WebServiceClient = class {
      constructor(accountID, licenseKey, options) {
        this.timeout = 3e3;
        this.host = "geoip.maxmind.com";
        this.accountID = accountID;
        this.licenseKey = licenseKey;
        if (options === void 0) {
          return;
        }
        if (typeof options === "object") {
          if (options.host !== void 0) {
            this.host = options.host;
          }
          if (options.timeout !== void 0) {
            this.timeout = options.timeout;
          }
          return;
        }
        this.timeout = options;
      }
      city(ipAddress) {
        return this.responseFor("city", ipAddress, models.City);
      }
      country(ipAddress) {
        return this.responseFor("country", ipAddress, models.Country);
      }
      insights(ipAddress) {
        return this.responseFor("insights", ipAddress, models.Insights);
      }
      responseFor(path, ipAddress, modelClass) {
        const parsedPath = `/geoip/v2.1/${path}/${ipAddress}`;
        const url = `https://${this.host}${parsedPath}`;
        if (!mmdb.validate(ipAddress)) {
          return Promise.reject({
            code: "IP_ADDRESS_INVALID",
            error: "The IP address provided is invalid",
            url
          });
        }
        const options = {
          auth: `${this.accountID}:${this.licenseKey}`,
          headers: {
            Accept: "application/json",
            "User-Agent": `GeoIP2-node/${package_json_1.version}`
          },
          host: this.host,
          method: "GET",
          path: parsedPath,
          timeout: this.timeout
        };
        return new Promise((resolve2, reject) => {
          const req = https.request(options, (response) => {
            let data = "";
            response.on("data", (chunk) => {
              data += chunk;
            });
            response.on("end", () => {
              try {
                data = JSON.parse(data);
              } catch (_a) {
                return reject(this.handleError({}, response, url));
              }
              if (response.statusCode && response.statusCode !== 200) {
                return reject(this.handleError(data, response, url));
              }
              return resolve2(new modelClass(data));
            });
          });
          req.on("error", (err) => {
            return reject({
              code: err.code,
              error: err.message,
              url
            });
          });
          req.end();
        });
      }
      handleError(data, response, url) {
        if (response.statusCode && response.statusCode >= 500 && response.statusCode < 600) {
          return {
            code: "SERVER_ERROR",
            error: `Received a server error with HTTP status code: ${response.statusCode}`,
            url
          };
        }
        if (response.statusCode && (response.statusCode < 400 || response.statusCode >= 600)) {
          return {
            code: "HTTP_STATUS_CODE_ERROR",
            error: `Received an unexpected HTTP status code: ${response.statusCode}`,
            url
          };
        }
        if (!data.code || !data.error) {
          return {
            code: "INVALID_RESPONSE_BODY",
            error: "Received an invalid or unparseable response body",
            url
          };
        }
        return Object.assign(Object.assign({}, data), { url });
      }
    };
    exports.default = WebServiceClient;
  }
});

// node_modules/@maxmind/geoip2-node/dist/src/records.js
var require_records = __commonJS({
  "node_modules/@maxmind/geoip2-node/dist/src/records.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@maxmind/geoip2-node/dist/src/index.js
var require_src = __commonJS({
  "node_modules/@maxmind/geoip2-node/dist/src/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebServiceClient = exports.ReaderModel = exports.Reader = void 0;
    var reader_1 = __importDefault(require_reader());
    exports.Reader = reader_1.default;
    var webServiceClient_1 = __importDefault(require_webServiceClient());
    exports.WebServiceClient = webServiceClient_1.default;
    var readerModel_1 = __importDefault(require_readerModel());
    exports.ReaderModel = readerModel_1.default;
    __exportStar(require_records(), exports);
    __exportStar(require_models(), exports);
  }
});

// netlify/functions/geo.ts
__export(exports, {
  handler: () => handler
});
var import_path = __toModule(require("path"));
var import_geoip2_node = __toModule(require_src());
var DB_PATH = (0, import_path.resolve)(__dirname, "../../db/GeoLite2-City.mmdb");
console.log({ __dirname, DB_PATH });
var db;
var handler = async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  if (db === void 0) {
    db = import_geoip2_node.Reader.open(DB_PATH);
  }
  const ip = event.headers["x-nf-client-connection-ip"];
  const reader = await db;
  const res = reader.city(ip);
  const geo = {
    city: (_b = (_a = res.city) == null ? void 0 : _a.names) == null ? void 0 : _b.en,
    country: {
      code: (_c = res.country) == null ? void 0 : _c.isoCode,
      name: (_e = (_d = res.country) == null ? void 0 : _d.names) == null ? void 0 : _e.en
    },
    subdivision: {
      code: (_f = res.subdivisions[0]) == null ? void 0 : _f.isoCode,
      name: (_h = (_g = res.subdivisions[0]) == null ? void 0 : _g.names) == null ? void 0 : _h.en
    }
  };
  return {
    statusCode: 200,
    body: JSON.stringify(geo)
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=geo.js.map
