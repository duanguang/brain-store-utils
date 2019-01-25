namespace observablePromise{
    type PramsResult<T>={
        /**
         *数据状态 none 数据初始化状态
         *pending 数据请求中
         * resolved 数据请求完成
         * rejected 数据请求异常
         * @type {('none'|'pending'|'resolved'|'rejected')}
         */
        state:'none'|'pending'|'resolved'|'rejected'

        /**
         *数据异常时，错误信息存储 例如 rejected
         *
         * @type {String}
         */
        error:String

        /**
         *目标数据存放 如api接口请求结果
         *
         * @type {(T|any)}
         */
        value:T|any

        /**
         *是否请求中
         *
         * @type {boolean}
         */
        isPending:boolean

        /**
         *请求完成
         *
         * @type {boolean}
         */
        isResolved:boolean

        /**
         *请求异常状态
         *
         * @type {boolean}
         */
        isRejected:boolean

        /**
         *初始化数据函数
         *
         * @type {Function}
         */
        clear:Function
    }
}
export function observablePromise(promise:null|Promise,clazz:any):observablePromise.PramsResult<clazz>

export class ObservableTempState{
    constructor(value:Object|Promise);

     /**
         *数据状态 none 数据初始化状态
         *pending 数据请求中
         * resolved 数据请求完成
         * rejected 数据请求异常
         * @type {('none'|'pending'|'resolved'|'rejected')}
         */
        state:'none'|'pending'|'resolved'|'rejected'

        /**
         *数据异常时，错误信息存储 例如 rejected
         *
         * @type {String}
         */
        error:String

        /**
         *目标数据存放 如api接口请求结果
         *
         * @type {(T|any)}
         */
        value:T|any

        /**
         *是否请求中
         *
         * @type {boolean}
         */
        isPending:boolean

        /**
         *请求完成
         *
         * @type {boolean}
         */
        isResolved:boolean

        /**
         *请求异常状态
         *
         * @type {boolean}
         */
        isRejected:boolean

        /**
         *临时数据初始化
         *
         * @memberof ObservableTempState
         */
        clear():void
}