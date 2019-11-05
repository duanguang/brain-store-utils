import {mobx} from "brain-store/lib/index";
import  invariant from "invariant";
const {action,keys, asMap, observable, isObservableObject, isObservableArray, isObservableMap, computed,isComputed,extras,isComputedProp, _getAdministration} = mobx;
import {cloneDeep} from 'lodash'
const RESERVED_NAMES = ["model", "reset", "submit", "isDirty", "isPropertyDirty"];
import { getAllMethodsAndProperties } from './utils';
function observableViewModel(model) {
    return new ViewModel(model);
}

export class ViewModel {
    _observableModel;
    _localValues = observable.map();
    localComputedValues= observable.map({})
    /* _defaultModel */
    constructor(model) {
        invariant(!Array.isArray(model), `传入参数必须是一个纯对象，且不是数组对象`);
        invariant(typeof model==='object', `传入参数必须是一个纯对象`);  
        this._defaultModel =cloneDeep(model) 
        this._observableModel = isObservableObject(model) ? model : observable.object(model);
        getAllMethodsAndProperties(model).forEach(key => {
            const descriptor = Object.getOwnPropertyDescriptor(model, key);
            const additionalDescriptor = descriptor ? { enumerable: descriptor.enumerable } : {};
            invariant(RESERVED_NAMES.indexOf(key) === -1, `The propertyname ${key} is reserved and cannot be used with viewModels`);
            if (isComputedProp(model, key)) {
                const derivation =  _getAdministration(model, key).derivation // Fixme: there is no clear api to get the derivation
                this.localComputedValues.set(key, computed(derivation.bind(this)))
            }
            Object.defineProperty(this, key, {
                enumerable: true,
                /* ...additionalDescriptor, */
                configurable: true,
                get: () => {
                    if (isComputedProp(model, key)) return this.localComputedValues.get(key).get()
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

    @computed
    get changedValues() {
        return this._localValues.toJS()
    }
    @action reset() {
        /* this._observableModel={...this._defaultModel} */
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
        
        keys(this._localValues).forEach((key) => {
            const source = this._localValues.get(key);
            /* this._observableModel[key] = source; */
            const destination = this._observableModel[key]         
            if (isObservableArray(destination)) {
                destination.replace(source)
            } else if (isObservableMap(destination)) {
                destination.clear()
                destination.merge(source)
            } else if (!isComputedProp(source,key)) {
                this._observableModel[key] = source
            }
        });
        this._localValues.clear();
    }

    /**
     *
     * 初始化数据模型
     * @memberof ViewModel
     */
    @action initialize(model){
        if(model&&typeof model==='object'&&!Array.isArray(model)){
            this._observableModel={...model}
        }
        else{
            this._observableModel={...this._defaultModel}
        }
        this._localValues.clear();
    }
    /**
     *
     * 修改store上面变量值，严格模式下，必须在action 里面修改值
     * @param {*} dispatch
     * @memberof ViewModel
     */
    @action dispatchAction(dispatch){
        if(typeof dispatch==='function'){
            dispatch&&dispatch()
        }
    }
}

export default observableViewModel;



