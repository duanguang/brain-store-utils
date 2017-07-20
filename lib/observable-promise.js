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

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3;

exports.default = observablePromise;

var _brainStore = require('brain-store');

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
    pending: 'pending',
    resolved: 'resolved',
    rejected: 'rejected'
};

var ObservablePromiseModel = exports.ObservablePromiseModel = (_class = function () {
    function ObservablePromiseModel(promise) {
        var _this = this;

        (0, _classCallCheck3.default)(this, ObservablePromiseModel);

        _initDefineProp(this, 'state', _descriptor, this);

        _initDefineProp(this, 'error', _descriptor2, this);

        _initDefineProp(this, 'value', _descriptor3, this);

        // this.promise = promise;
        promise.then((0, _brainStore.action)(RESOLVE_ACTION, function (value) {
            _this.state = promiseStatus.resolved;
            _this.value = value;
        }), (0, _brainStore.action)(REJECT_ACTION, function (error) {
            _this.state = promiseStatus.rejected;
            _this.value = null;
            _this.error = error;
        }));
    }

    (0, _createClass3.default)(ObservablePromiseModel, [{
        key: 'isPending',
        get: function get() {
            return this.state == promiseStatus.pending;
        }
    }, {
        key: 'isResolved',
        get: function get() {
            return this.state == promiseStatus.resolved;
        }
    }, {
        key: 'isRejected',
        get: function get() {
            return this.state == promiseStatus.resolved;
        }
    }]);
    return ObservablePromiseModel;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'state', [_brainStore.observable], {
    enumerable: true,
    initializer: function initializer() {
        return promiseStatus.pending;
    }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'error', [_brainStore.observable], {
    enumerable: true,
    initializer: function initializer() {
        return null;
    }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'value', [_brainStore.observable], {
    enumerable: true,
    initializer: function initializer() {
        return null;
    }
}), _applyDecoratedDescriptor(_class.prototype, 'isPending', [_brainStore.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'isPending'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'isResolved', [_brainStore.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'isResolved'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'isRejected', [_brainStore.computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'isRejected'), _class.prototype)), _class);