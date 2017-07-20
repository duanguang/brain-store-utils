import {mobx} from "brain-store/lib/index";
import  invariant from "invariant";
const {action, asMap, observable, isObservableObject, isObservableArray, isObservableMap, computed} = mobx;

const RESERVED_NAMES = ["model", "reset", "submit", "isDirty", "isPropertyDirty"];

function observableViewModel(model) {
    return new ViewModel(model);
}

export class ViewModel {
    _observableModel;
    _localValues = asMap({});
    constructor(model) {
        this._observableModel = isObservableObject(model) ? model : observable.shallowObject(model);
        Object.keys(model).forEach(key => {
            invariant(RESERVED_NAMES.indexOf(key) === -1, `The propertyname ${key} is reserved and cannot be used with viewModels`);
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get: () => {
                    if (this.isPropertyDirty(key)){
                        return this._localValues.get(key);
                    }
                    else
                        return (this._observableModel)[key];
                },
                set: action((value) => {
                    if (this.isPropertyDirty(key) || value !== (this._observableModel)[key]) {
                        this._localValues.set(key, value);
                    }
                })
            });
        });
    }

    get model() {
        return mobx.toJS(this._observableModel);
    }

    @action reset() {
        this._localValues.clear();
    }

    @action resetProperty(key) {
        this._localValues.delete(key);
    }

    @computed get isDirty() {
        return this._localValues.size > 0;
    }

    isPropertyDirty(key) {
        return this._localValues.has(key);
    }

    @action submit() {
        this._localValues.keys().forEach((key) => {
            const source = this._localValues.get(key);
            this._observableModel[key] = source;
        });
        this._localValues.clear();
    }
}

export default observableViewModel;



