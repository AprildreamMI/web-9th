// 创建store，应用中间件方法
import { createStore, applyMiddleware, combineReducers } from 'redux'

import createSagaMiddlewate from 'redux-saga'
import mySaga from './sagas'

import reduxLogger from 'redux-logger'
// import reduxThunk from 'redux-thunk'

//把 count 这个 reducer 抽出来
import { counterReducer } from './countReducer'
// import { userReducer } from './userReducer'
import { userReducerSaga } from './userReducerSaga'

// 创建一下saga 的 中间件
const sagaMiddleware = createSagaMiddlewate();

// 把应用中间件这个函数当作第二个参数给 createStore
const store = createStore(
  combineReducers({
    counterReducer,
    userReducerSaga
  }),
  applyMiddleware(
    // 先做日志记录 （控制台打印的日志）
    reduxLogger,
    /*// 再做一部操作
    reduxThunk*/
    // 使用 saga 的 中间件
    sagaMiddleware
  )
);

// 运行中间件 接收一个函数
sagaMiddleware.run(mySaga);

export default store