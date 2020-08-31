'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MOBX_VERSION = exports.getAllMethodsAndProperties = undefined;

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mobx = require('mobx');
var isGetter = function isGetter(x, name) {
  return ((0, _getOwnPropertyDescriptor2.default)(x, name) || {}).get;
};
var isFunction = function isFunction(x, name) {
  return typeof x[name] === 'function';
};
var deepFunctions = function deepFunctions(x) {
  return x && x !== Object.prototype && (0, _getOwnPropertyNames2.default)(x).filter(function (name) {
    return isGetter(x, name) || isFunction(x, name);
  }).concat(deepFunctions((0, _getPrototypeOf2.default)(x)) || []);
};
var distinctDeepFunctions = function distinctDeepFunctions(x) {
  return (0, _from2.default)(new _set2.default(deepFunctions(x)));
};
var getAllMethodsAndProperties = exports.getAllMethodsAndProperties = function getAllMethodsAndProperties(x) {
  return distinctDeepFunctions(x).filter(function (name) {
    return name !== 'constructor' && !~name.indexOf('__');
  });
};
function mobxVersion() {
  if (mobx['useStrict']) {
    return 'v3';
  } else if (mobx['configure']) {
    return 'v4';
  } else {
    return '';
  }
}
var MOBX_VERSION = exports.MOBX_VERSION = mobxVersion();