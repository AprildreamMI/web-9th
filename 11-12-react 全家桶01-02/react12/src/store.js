// 创建store，应用中间件方法
import { createStore, applyMiddleware } from 'redux'
import reduxLogger from 'redux-logger'
import reduxThunk from 'redux-thunk'

// 其实真实点 state 是一个对象
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'add':
      // 因为这里的state是一个值 如果这里的state是一个对象的话 则应该返回一个新的对象
      return state + 1;
    case 'minus':
      return state - 1;
    default:
      return state
  }
};

// 把应用中间件这个函数当作第二个参数给 createStore
const store = createStore(counterReducer, applyMiddleware(
  // 先做日志记录 （控制台打印的日志）
  reduxLogger,
  // 再做一部操作
  reduxThunk
));

export default store