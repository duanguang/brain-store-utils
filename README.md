# brain-store-utils
  前后端分离模式下，前端通过调用ajax请求，拿到后端数据，前端在直接使用后端数据模型在视图里面来进行数据绑定，这视乎看起来非常正常？在理想情况下确实如此，但我们必须得清楚业务是不断变化，后端的数据模型也是不可控，一旦当后端改变数据模型里面某一个属性值或结构，那么我们的视图将变得极不稳定，此时我们就需要一层相对较薄的模型来对后端数据进行映射如(A->A1)，当A1发生变化时，我们只需要重新调整映射关系即可。那么我们就需要统一前端数据模型结构。
# 介绍  
  此库主要结合mobx来做前端数据模型，每个数据实例都包含数据的pending,resolve等状态。

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
# Licensing
MIT license  
