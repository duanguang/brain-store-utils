# brain-store-utils

前后端分离模式下，前端通过调用 ajax 请求，拿到后端数据，前端在直接使用后端数据模型在视图里面来进行数据绑定，这视乎看起来非常正常？在理想情况下确实如此，但我们必须得清楚业务是不断变化，后端的数据模型也是不可控，一旦当后端改变数据模型里面某一个属性值或结构，那么我们的视图将变得极不稳定，此时我们就需要一层相对较薄的模型来对后端数据进行映射如(A->A1)，当 A1 发生变化时，我们只需要重新调整映射关系即可。那么我们就需要统一前端数据模型结构。

# 介绍

此库主要结合 mobx 来做前端数据模型，每个数据实例都包含数据的 pending,resolve 等状态。

# API

- observablePromise
  ```js
    import {observablePromise} from 'brain-store-utils';
    let entity=new observablePromise(promise:Promise);//一般对应一个promise请求
    entity：{
       state：数据状态
       error：错误信息
       value: 接口数据
       isPending:布尔类型
       isResolved:布尔类型
       isRejected:布尔类型
    }
  ```

## ChangeLog

## 0.1.13-beta.2 (2020-08-31)

- fix: 优化 brain-store/mobx 依赖路径，不直接依赖 brain-store/mobx ,导致因外部升级版本而被迫频繁升级

* fix: 优化不同 mobx 版本被迫拆分为多个版本来做兼容，现在合并成一个版本兼容不同 mobx
* fix: 暂时废弃 1.x 版本维护，主维护分支切换到 o.x 版本
* fix: 修复 mobx.extras v4 版本 undefined 使用报错

## 废弃版本

npm deprecate brain-store-utils@"<0.1.3" "Error packet semantic"

# Licensing

MIT license
