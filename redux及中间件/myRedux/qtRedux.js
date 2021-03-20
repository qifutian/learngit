/**
 * 
 * createStore(reducer,preloadedState,enhancer)
 * 
 * {getState,dispatch,subscribe}
 */

 function createStore(reducer,preloadedState,enhancer){
    // 约束reducer参数类型
    if(typeof reducer!== 'function') throw new Error("reducer必须是函数")
    // 判断对象中是否含有type属性
    if (typeof enhancer !== 'undefined') {
        if (typeof enhancer !== 'function') {
          throw new Error('enhancer必须是函数')
        }
        return enhancer(createStore)(reducer, preloadedState);
    }
     // store对象中存储的状态
     var currentState = preloadedState;
     // 存放订阅者函数
     var currentListeners = [];
     // 获取状态 将state放到内存中
     function getState(){
         return  currentState
     }

     // 触发action
     function dispatch(action){
        // 判断action是否是一个对象
        if (!isPlainObject(action)) throw new Error('action必须是一个对象');
        // 判断action中的type属性是否存在
        if (typeof action.type === 'undefined') throw new Error('action对象中必须有type属性');
         currentState = reducer(currentState,action);
         // 循环数组 调用订阅者
         for(var i=0; i<currentListeners.length;i++){
             // 获取订阅者
             var listener = currentListeners[i];
             // 调用订阅者
             listener();
         }
     }

     // 订阅状态
     function subscribe(listener) {
        currentListeners.push(listener)
     }

     return {
         getState,
         dispatch,
         subscribe
     }
 }


//  store.subscribe(() =>{

//  })
 

// 判断参数是否是对象类型
// 判断对象的当前原型对象是否和顶层原型对象相同
function isPlainObject (obj) {
    if (typeof obj !== 'object' || obj === null) return false;
    var proto = obj;
    while (Object.getPrototypeOf(proto) != null) {
      proto = Object.getPrototypeOf(proto)
    }
    return Object.getPrototypeOf(obj) === proto;
  }



  
function applyMiddleware (...middlewares) {
    return function (createStore) {
      return function (reducer, preloadedState) {
        // 创建 store
        var store = createStore(reducer, preloadedState);
        // 阉割版的 store
        var middlewareAPI = {
          getState: store.getState,
          dispatch: store.dispatch
        }
        // 调用中间件的第一层函数 传递阉割版的store对象
        var chain = middlewares.map(middleware => middleware(middlewareAPI));
        var dispatch = compose(...chain)(store.dispatch);
        return {
          ...store,
          dispatch
        }
      }
    }
}

function compose () {
    var funcs = [...arguments];
    return function (dispatch) {
      for (var i = funcs.length - 1; i >= 0; i--) {
        dispatch = funcs[i](dispatch);
      }
      return dispatch;
    }
  }