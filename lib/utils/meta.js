'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeSymbol = exports.modelNameSymbol = exports.modelTypeSymbol = undefined;

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modelTypeSymbol = exports.modelTypeSymbol = (0, _symbol2.default)('brain-store-utils-model-type');
var modelNameSymbol = exports.modelNameSymbol = (0, _symbol2.default)('brain-store-utils-model-name');
var storeSymbol = exports.storeSymbol = (0, _symbol2.default)('Store');