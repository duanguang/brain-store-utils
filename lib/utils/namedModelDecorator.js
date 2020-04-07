'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = namedModelDecorator;

var _meta = require('./meta');

function namedModelDecorator(name, type) {
    return function (target) {
        target[_meta.modelNameSymbol] = name;
        target[_meta.modelTypeSymbol] = type;
        return target;
    };
}
module.exports = exports['default'];