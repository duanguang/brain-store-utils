import { ObservablePromiseModel, promiseStatus } from './observable-promise';
import {action} from 'brain-store';
export class ObservableTempState extends ObservablePromiseModel{
   constructor(value){
      super(value);
      if(!(value instanceof Promise)){
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