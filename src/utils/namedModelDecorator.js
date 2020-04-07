import { modelTypeSymbol, modelNameSymbol } from './meta';
export default function namedModelDecorator(name,type) {
    return function (target) {
        target[modelNameSymbol] = name;
        target[modelTypeSymbol] = type;
        return target;
    };
}