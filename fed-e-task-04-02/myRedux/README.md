#### 核心逻辑
```javascript
/*
  createStore(reducer, preloadedState, enhancer)
  { getState, dispatch, subscribe }
*/
function createStore (reducer, preloadedState) {
  // store 对象中存储的状态
  var currentState = preloadedState
  // 存放订阅者函数
  var currentListeners = []

  // 通过闭包来返回状态
  function getState () {
    return currentState
  }

  // 触发 action
  function dispatch (action) {
    // 通过 reducer 更新状态
    currentState = reducer(currentState, action)
    // 循环数组，调用订阅者
    for (var i = 0; i < currentListeners.length; i++) {
      var listener = currentListeners[i]
      listener()
    }
  }

  // 订阅状态
  function subscribe (listener) {
    currentListeners.push(listener)
  }

  return {
    getState,
    dispatch,
    subscribe
  }
}
```

#### 参数类型约束
- `reducer` 必须是函数类型
  ```javascript
  // 约束 reducer 参数类型
  if (typeof reducer !== 'function') throw new Error('reducer 必须是函数')
  ```
- `action` 类型约束
  ```javascript
  // 判断 action 是否是对象
  if (!isPlainObject(action)) throw new Error('action 必须是对象')
  // 判断对象中是否具有 type 属性
  if (typeof action.type === 'undefined') throw new Error('action 对象中必须要有 type 属性')

  // 判断 obj 参数是否是对象
  function isPlainObject (obj) {
    // 排除基本数据类型和 null
    if (typeof obj !== 'object' || obj === null) return false
    // 区分数组和对象，采用原型对象对比的方式
    var proto = obj
    while (Object.getPrototypeOf(proto) != null) {
      proto = Object.getPrototypeOf(proto)
    }
    return Object.getPrototypeOf(obj) === proto
  }
  ```

#### `createStore` 第三个参数 `enhancer`
- 判断可选参数 `enhancer` 有没有传递
- 判断 `enhancer` 是不是函数

```javascript
if (typeof enhancer !== 'undefined') {
  if (typeof enhancer !== 'function') {
    throw new Error('enhancer 必须是函数')
  }
  return enhancer(createStore)(reducer, preloadedState)
}
```

#### `applyMiddleware`
- `applyMiddleware` 就是 `redux` 封装好的 `enhancer` 函数
- 中间件两层函数的参数分别是什么
  - 第一层 store，就是简化版的 store，只有 dispatch 和 getState
  - 第二层 next，最后一个中间件之前的中间件，next 都是指下一个中间件，最后一个中间件里的 next 就是 dispatch 函数，即调用 reducer

```javascript
// applyMiddleware 就是封装好的 enhancer 函数，所以要遵守 enhancer 函数的规定
function applyMiddleware (...middlewares) {
  return function (createStore) {
    return function (reducer, preloadedState) {
      // 创建 store
      var store = createStore(reducer, preloadedState)
      // 简化版 store
      var middlewareAPI = {
        getState: store.getState,
        dispatch: store.dispatch
      }
      // 调用各个中间件的第一层函数，传递简化版的 store 对象
      var chain = middlewares.map(middleware => middleware(middlewareAPI))
      // 最后一个中间件函数的 next 是 dispatch
      var dispatch = compose(...chain)(store.dispatch)
      return {
        ...store,
        dispatch
      }
    }
  }
}

function compose () {
  var func = [...arguments]
  return function (dispatch) {
    // 反向的，从最后一个中间件开始调用
    // 例如正向 logger -> thunk -> dispatch(即 reducer)
    // 反向为 dispatch -> thunk -> logger
    // 将下一个中间件的执行结果作为参数传递给上一个中间件
    for (var i = func.length - 1; i >= 0; i--) {
      dispatch = func[i](dispatch)
    }
    return dispatch
  }
}
```

> applyMiddleware 的关键在于 compose 函数对中间件调用关系的“反向构建”


#### `bindActionCreators`
```javascript
function bindActionCreators (actionCreators, dispatch) {
  var boundActionCreators = {}
  for (var key in actionCreators) {
    (function (key) {
      boundActionCreators[key] = function () {
        // actionCreators[key]() -> 得到 action
        // dispatch 触发 action
        dispatch(actionCreators[key]())
      }
    })(key)
  }
  return boundActionCreators
}
```

#### `combineReducers`
> `reducer` 函数的化整为零和聚沙成塔
```javascript
function combineReducers (reducers) {
  // 检查 reducer 类型，必须是函数
  var reducerkeys = Object.keys(reducers)
  for (var i = 0; i < reducerkeys.length; i++) {
    var key = reducerkeys[i]
    if (typeof reducers[key] !== 'function') throw new Error('reducer 必须是函数')
  }
  // 调用一个一个的小的 reducer，将每一个小的 reducer 中返回的状态存储在一个新的大的对象中
  return function (state, action) {
    var nextState = {}
    for (var i = 0; i < reducerkeys.length; i++) {
      var key = reducerkeys[i]
      var reducer = reducers[key]
      var prevStateForKey = state[key]
      nextState[key] = reducer(prevStateForKey, action)
    }
    return nextState
  }
}
```
