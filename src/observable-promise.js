import  {observable, action, computed} from 'brain-store';

export default function observablePromise(promise) {
    return new ObservablePromiseModel(promise);
}

export const RESOLVE_ACTION = 'observableFromPromise-resolve';
export const REJECT_ACTION = 'observableFromPromise-reject';

export const promiseStatus = {
    none:'none',
    pending: 'pending',
    resolved: 'resolved',
    rejected: 'rejected'
};
function isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';   
}
export class ObservablePromiseModel {
    // promise = null;
    @observable state = promiseStatus.none;
    @observable error = null;
    @observable value = null;

    constructor(promise) {
        // this.promise = promise;
        if(promise&&isPromise(promise)){
            this.state=promiseStatus.pending;
            promise.then(
                action(RESOLVE_ACTION, (value) => {
                    this.state = promiseStatus.resolved;
                    this.value = value;
                }),
                action(REJECT_ACTION, (error) => {
                    this.state = promiseStatus.rejected;
                    this.value = null;
                    this.error = error;
                })
            );
        }     
    }

    @computed get isPending() {
        return this.state == promiseStatus.pending;
    }

    @computed get isResolved() {
        return this.state == promiseStatus.resolved;
    }

    @computed get isRejected() {
        return this.state == promiseStatus.resolved;
    }
    @action
    clear(){
       this.value=null;
       this.state=promiseStatus.none;
       this.error=null;
    }
}