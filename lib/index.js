'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.observablePromise = exports.observableViewModel = undefined;

var _createViewModel = require('./create-view-model');

var _createViewModel2 = _interopRequireDefault(_createViewModel);

var _observablePromise2 = require('./observable-promise');

var _observablePromise3 = _interopRequireDefault(_observablePromise2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.observableViewModel = _createViewModel2.default;
exports.observablePromise = _observablePromise3.default;