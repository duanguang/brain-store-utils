'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObservableTempState = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _desc, _value, _class;

var _observablePromise = require('./observable-promise');

var _mobx = require('mobx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function isPromise(obj) {
  return !!obj && ((typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
var ObservableTempState = exports.ObservableTempState = (_class = function (_ObservablePromiseMod) {
  (0, _inherits3.default)(ObservableTempState, _ObservablePromiseMod);

  function ObservableTempState(value) {
    (0, _classCallCheck3.default)(this, ObservableTempState);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ObservableTempState.__proto__ || (0, _getPrototypeOf2.default)(ObservableTempState)).call(this, value));

    if (!isPromise(value)) {
      _this.value = value;
    }
    return _this;
  }

  (0, _createClass3.default)(ObservableTempState, [{
    key: 'clear',
    value: function clear() {
      this.value = null;
      this.state = _observablePromise.promiseStatus.none;
      this.error = null;
    }
  }]);
  return ObservableTempState;
}(_observablePromise.ObservablePromiseModel), (_applyDecoratedDescriptor(_class.prototype, 'clear', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'clear'), _class.prototype)), _class);