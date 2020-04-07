'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.store = store;

var _uuid = require('uuid');

var _meta = require('./utils/meta');

var _namedModelDecorator = require('./utils/namedModelDecorator');

var _namedModelDecorator2 = _interopRequireDefault(_namedModelDecorator);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function store(arg1) {
    if ((0, _isString3.default)(arg1)) {
        return (0, _namedModelDecorator2.default)(arg1, _meta.storeSymbol);
    }

    var name = (0, _uuid.v4)();
    return (0, _namedModelDecorator2.default)(name, _meta.storeSymbol)(arg1);
};