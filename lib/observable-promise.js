'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObservablePromiseModel = exports.promiseStatus = exports.REJECT_ACTION = exports.RESOLVE_ACTION = undefined;

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3;

exports.default = observablePromise;

var _mobx = require('mobx');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  (0, _defineProperty2.default)(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

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

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

function observablePromise(promise) {
  return new ObservablePromiseModel(promise);
}

var RESOLVE_ACTION = exports.RESOLVE_ACTION = 'observableFromPromise-resolve';
var REJECT_ACTION = exports.REJECT_ACTION = 'observableFromPromise-reject';

var promiseStatus = exports.promiseStatus = {
  none: 'none',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected'
};
function isPromise(obj) {
  return !!obj && ((typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
var ObservablePromiseModel = exports.ObservablePromiseModel = (_class = function () {
  function ObservablePromiseModel(promise) {
    var _this = this;

    (0, _classCallCheck3.default)(this, ObservablePromiseModel);

    _initDefineProp(this, 'state', _descriptor, this);

    _initDefineProp(this, 'error', _descriptor2, this);

    _initDefineProp(this, 'value', _descriptor3, this);

    // this.promise = promise;
    if (promise && isPromise(promise)) {
      this.state = promiseStatus.pending;
      promise.then((0, _mobx.action)(RESOLVE_ACTION, function (value) {
        _this.state = promiseStatus.resolved;
        _this.value = value;
      }), (0, _mobx.action)(REJECT_ACTION, function (error) {
        _this.state = promiseStatus.rejected;
        _this.value = null;
        _this.error = error;
      }));
    }
  }

  (0, _createClass3.default)(ObservablePromiseModel, [{
    key: 'clear',
    value: function clear() {
      this.value = null;
      this.state = promiseStatus.none;
      this.error = null;
    }
  }, {
    key: 'isPending',
    get: function get() {
      return this.state === promiseStatus.pending;
    }
  }, {
    key: 'isResolved',
    get: function get() {
      return this.state === promiseStatus.resolved;
    }
  }, {
    key: 'isRejected',
    get: function get() {
      return this.state === promiseStatus.rejected;
    }
  }]);
  return ObservablePromiseModel;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'state', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return promiseStatus.none;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'error', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'value', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class.prototype, 'isPending', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'isPending'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'isResolved', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'isResolved'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'isRejected', [_mobx.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'isRejected'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'clear', [_mobx.action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'clear'), _class.prototype)), _class);