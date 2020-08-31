const mobx = require('mobx');
const isGetter = (x, name) =>
  (Object.getOwnPropertyDescriptor(x, name) || {}).get;
const isFunction = (x, name) => typeof x[name] === 'function';
const deepFunctions = x =>
  x &&
  x !== Object.prototype &&
  Object.getOwnPropertyNames(x)
    .filter(name => isGetter(x, name) || isFunction(x, name))
    .concat(deepFunctions(Object.getPrototypeOf(x)) || []);
const distinctDeepFunctions = x => Array.from(new Set(deepFunctions(x)));
export const getAllMethodsAndProperties = x =>
  distinctDeepFunctions(x).filter(
    name => name !== 'constructor' && !~name.indexOf('__')
  );
function mobxVersion() {
  if (mobx['useStrict']) {
    return 'v3';
  } else if (mobx['configure']) {
    return 'v4';
  } else {
    return '';
  }
}
export const MOBX_VERSION = mobxVersion();
