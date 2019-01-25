import { ObservablePromiseModel, promiseStatus } from './observable-promise';
import {action} from 'brain-store';
function isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';   
}
export class ObservableTempState extends ObservablePromiseModel{
   constructor(value){
      super(value);
      if(!(isPromise(value))){
          this.value=value;
      }
   }
   @action
   clear(){
       this.value=null;
       this.state=promiseStatus.none;
       this.error=null;
   }
}