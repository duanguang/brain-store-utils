import { v4 } from 'uuid';
import { storeSymbol } from './utils/meta';
import namedModelDecorator from './utils/namedModelDecorator';
import _isString from 'lodash/isString';
export  function store(arg1) {
    if (_isString(arg1)) {
        return namedModelDecorator(arg1, storeSymbol);
    }
    
    var name = v4();
    return namedModelDecorator(name, storeSymbol)(arg1);
};