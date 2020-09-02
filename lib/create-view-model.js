'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewModel = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _desc, _value, _class;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _lodash = require('lodash');

var _utils = require('./utils');

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

var mobx = require('mobx');
var action = mobx.action,
    asMap = mobx.asMap,
    observable = mobx.observable,
    isObservableObject = mobx.isObservableObject,
    isObservableArray = mobx.isObservableArray,
    isObservableMap = mobx.isObservableMap,
    computed = mobx.computed,
    isComputed = mobx.isComputed,
    extras = mobx.extras;

var RESERVED_NAMES = ['model', 'reset', 'submit', 'isDirty', 'isPropertyDirty'];
var getComputedProp = {
  v3: isComputed,
  v4: mobx.isComputedProp
};
var getAdministration = {
  v3: extras ? extras.getAdministration : null,
  v4: mobx._getAdministration
};

function observableViewModel(model) {
  return new ViewModel(model);
}

var ViewModel = exports.ViewModel = (_class = function () {
  /* _defaultModel */
  function ViewModel(model) {
    var _this = this;

    (0, _classCallCheck3.default)(this, ViewModel);
    this._localValues = observable.map();
    this.localComputedValues = observable.map({});

    (0, _invariant2.default)(!Array.isArray(model), '\u4F20\u5165\u53C2\u6570\u5FC5\u987B\u662F\u4E00\u4E2A\u7EAF\u5BF9\u8C61\uFF0C\u4E14\u4E0D\u662F\u6570\u7EC4\u5BF9\u8C61');
    (0, _invariant2.default)((typeof model === 'undefined' ? 'undefined' : (0, _typeof3.default)(model)) === 'object', '\u4F20\u5165\u53C2\u6570\u5FC5\u987B\u662F\u4E00\u4E2A\u7EAF\u5BF9\u8C61');
    this._defaultModel = (0, _lodash.cloneDeep)(model);
    var shallowObject = {
      v3: observable.shallowObject,
      v4: observable.object
    };
    this._observableModel = isObservableObject(model) ? model : shallowObject[_utils.MOBX_VERSION](model);
    (0, _utils.getAllMethodsAndProperties)(model).forEach(function (key) {
      var descriptor = (0, _getOwnPropertyDescriptor2.default)(model, key);
      var additionalDescriptor = descriptor ? { enumerable: descriptor.enumerable } : {};
      (0, _invariant2.default)(RESERVED_NAMES.indexOf(key) === -1, 'The propertyname ' + key + ' is reserved and cannot be used with viewModels');
      if (getComputedProp[_utils.MOBX_VERSION](model, key)) {
        var derivation = getAdministration[_utils.MOBX_VERSION](model, key).derivation; // Fixme: there is no clear api to get the derivation
        _this.localComputedValues.set(key, computed(derivation.bind(_this)));
      }
      (0, _defineProperty2.default)(_this, key, {
        enumerable: true,
        /* ...additionalDescriptor, */
        configurable: true,
        get: function get() {
          if (getComputedProp[_utils.MOBX_VERSION](model, key)) return _this.localComputedValues.get(key).get();
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
    key: 'reset',
    value: function reset() {
      /* this._observableModel={...this._defaultModel} */
      this._localValues.clear();
    }
  }, {
    key: 'resetProperty',
    value: function resetProperty(key) {
      this._localValues.delete(key);
    }
  }, {
    key: 'isPropertyDirty',
    value: function isPropertyDirty(key) {
      return this._localValues.has(key);
    }
  }, {
    key: 'submit',
    value: function submit() {
      var _this2 = this;

      var getItemKeys = {
        v3: this._localValues.keys(),
        v4: mobx.keys(this._localValues)
      };

      getItemKeys[_utils.MOBX_VERSION].forEach(function (key) {
        var source = _this2._localValues.get(key);
        var isComputedProps = {
          v3: isComputed(source),
          v4: mobx.isComputedProp(source, key)
        };
        /* this._observableModel[key] = source; */
        var destination = _this2._observableModel[key];
        if (isObservableArray(destination)) {
          destination.replace(source);
        } else if (isObservableMap(destination)) {
          destination.clear();
          destination.merge(source);
        } else if (!isComputedProps[_utils.MOBX_VERSION]) {
          _this2._observableModel[key] = source;
        }
      });
      this._localValues.clear();
    }

    /**
     *
     * 初始化数据模型
     * @memberof ViewModel
     */

  }, {
    key: 'initialize',
    value: function initialize(model) {
      if (model && (typeof model === 'undefined' ? 'undefined' : (0, _typeof3.default)(model)) === 'object' && !Array.isArray(model)) {
        this._observableModel = (0, _extends3.default)({}, model);
      } else {
        this._observableModel = (0, _extends3.default)({}, this._defaultModel);
      }
      this._localValues.clear();
    }
    /**
     *
     * 修改store上面变量值，严格模式下，必须在action 里面修改值
     * @param {*} dispatch
     * @memberof ViewModel
     */

  }, {
    key: 'dispatchAction',
    value: function dispatchAction(dispatch) {
      if (typeof dispatch === 'function') {
        dispatch && dispatch();
      }
    }
  }, {
    key: 'model',
    get: function get() {
      return mobx.toJS(this._observableModel);
    }
  }, {
    key: 'changedValues',
    get: function get() {
      return this._localValues.toJS();
    }
  }, {
    key: 'isDirty',
    get: function get() {
      return this._localValues.size > 0;
    }
  }]);
  return ViewModel;
}(), (_applyDecoratedDescriptor(_class.prototype, 'changedValues', [computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'changedValues'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'reset', [action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'reset'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'resetProperty', [action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'resetProperty'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'isDirty', [computed], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'isDirty'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'submit', [action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'submit'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'initialize', [action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'initialize'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'dispatchAction', [action], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'dispatchAction'), _class.prototype)), _class);
exports.default = observableViewModel;