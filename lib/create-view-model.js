"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ViewModel = undefined;

var _getOwnPropertyDescriptor = require("babel-runtime/core-js/object/get-own-property-descriptor");

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _defineProperty = require("babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _desc, _value, _class;

var _index = require("brain-store/lib/index");

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

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

var action = _index.mobx.action,
    asMap = _index.mobx.asMap,
    observable = _index.mobx.observable,
    isObservableObject = _index.mobx.isObservableObject,
    isObservableArray = _index.mobx.isObservableArray,
    isObservableMap = _index.mobx.isObservableMap,
    computed = _index.mobx.computed;


var RESERVED_NAMES = ["model", "reset", "submit", "isDirty", "isPropertyDirty"];

function observableViewModel(model) {
    return new ViewModel(model);
}

var ViewModel = exports.ViewModel = (_class = function () {
    function ViewModel(model) {
        var _this = this;

        (0, _classCallCheck3.default)(this, ViewModel);
        this._localValues = asMap({});

        this._observableModel = isObservableObject(model) ? model : observable.shallowObject(model);
        (0, _keys2.default)(model).forEach(function (key) {
            (0, _invariant2.default)(RESERVED_NAMES.indexOf(key) === -1, "The propertyname " + key + " is reserved and cannot be used with viewModels");
            (0, _defineProperty2.default)(_this, key, {
                enumerable: true,
                configurable: true,
                get: function get() {
                    if (_this.isPropertyDirty(key)) {
                        return _this._localValues.get(key);
                    } else return _this._observableModel[key];
                },
                set: action(function (value) {
                    if (_this.isPropertyDirty(key) || value !== _this._observableModel[key]) {
                        _this._localValues.set(key, value);
                    }
                })
            });
        });
    }

    (0, _createClass3.default)(ViewModel, [{
        key: "reset",
        value: function reset() {
            this._localValues.clear();
        }
    }, {
        key: "resetProperty",
        value: function resetProperty(key) {
            this._localValues.delete(key);
        }
    }, {
        key: "isPropertyDirty",
        value: function isPropertyDirty(key) {
            return this._localValues.has(key);
        }
    }, {
        key: "submit",
        value: function submit() {
            var _this2 = this;

            this._localValues.keys().forEach(function (key) {
                var source = _this2._localValues.get(key);
                _this2._observableModel[key] = source;
            });
            this._localValues.clear();
        }
    }, {
        key: "model",
        get: function get() {
            return _index.mobx.toJS(this._observableModel);
        }
    }, {
        key: "isDirty",
        get: function get() {
            return this._localValues.size > 0;
        }
    }]);
    return ViewModel;
}(), (_applyDecoratedDescriptor(_class.prototype, "reset", [action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, "reset"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "resetProperty", [action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, "resetProperty"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "isDirty", [computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, "isDirty"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "submit", [action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, "submit"), _class.prototype)), _class);
exports.default = observableViewModel;