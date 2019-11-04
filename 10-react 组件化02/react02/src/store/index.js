// 创建store，应用中间件方法
import { createStore, applyMiddleware, combineReducers } from 'redux'
import reduxLogger from 'redux-logger'
import reduxThunk from 'redux-thunk'

//把 count 这个 reducer 抽出来
import { counterReducer } from './countReducer'
import { userReducer } from './userReducer'

// 把应用中间件这个函数当作第二个参数给 createStore
const store = createStore(
  combineReducers({
    counterReducer,
    userReducer
  }),
  applyMiddleware(
    // 先做日志记录 （控制台打印的日志）
    reduxLogger,
    // 再做一部操作
    reduxThunk
  )
);

export default store