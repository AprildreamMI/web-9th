[TOC]



# 使用 umi 和 dva

## redux-saga

更好的再redux中管理异步数据，具有更强大的异步数据管理功能

于`redux-thunk`不同的是

+ `redux-thunk`返回的是一个函数

### 在store文件夹新建sagas.js

```react
/**
 * call: 调用异步函数
 * put: 当异步函数执行有结果了，去通知状态进行更新
 * takeEvery: 负责在全局监听action
 */
import { call, put, takeEvery } from 'redux-saga/effects'

// 登录的api调用
const userService = {
  login(username) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'Jerry') {
          resolve({
            id: 1,
            name: 'Jerry',
            age: 20
          })
        } else {
          reject(new Error('用户名或密码错误！'))
        }
      }, 2000)
    })
  }
};

// 当函数名和函数之间有星号的时候 此函数就是一个生成器函数 (按照yield顺序执行)
// 程序是不会停止的
function* login(action) {
  try {
    // 按顺序执行 卡在这
    yield put({type: 'requestLogin'})
    // 拿到返回
    const result = yield call(userService.login, action.username)
    yield put({type: 'loginSuccess', result})
  // 如果失败 捕获错误
  } catch (err) {
    yield put({type: 'loginFailure', err})
  }
}

// 全局拦截住 action 让其执行我们定义好的login
function* mySaga() {
  yield takeEvery('login', login)
}

// 必须导出的是一个函数
export default mySaga
```

### 在store.js

```javascript
// 创建store，应用中间件方法
import { createStore, applyMiddleware, combineReducers } from 'redux'

import createSagaMiddlewate from 'redux-saga'
// 引入sagas
import mySaga from './sagas'
// 日志记录
import reduxLogger from 'redux-logger'

//把 count 这个 reducer 抽出来
import { counterReducer } from './countReducer'
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
    // 使用 saga 的 中间件
    sagaMiddleware
  )
);

// 运行中间件 接收的是一个函数
sagaMiddleware.run(mySaga);

export default store
```

### user

```javascript
const init = {
  isLogin: false,
  loading: false,
  error: ''
};

export const userReducerSaga = (state = init, action) => {
  switch (action.type) {
    // 其实还可以把action.type 给抽出来 单独做为一个变量
    // 抽出来作为变量 有利于更改 和 编写代码（不容易打错）
    case 'loginPending':
      // 因为这里的state是一个值 如果这里的state是一个对象的话 则应该返回一个新的对象
      return {
        isLogin: false,
        loading: true
      };
    case 'loginSuccess':
      return {
        isLogin: true,
        loading: false
      };
    case 'loginFailure':
      return {
        isLogin: false,
        loading: false,
        error: '登录失败'
      };
    default:
      return state
  }
};


// 可以把action 单独抽出来 给到一个单独的文件里面去

// 此login 会被 saga 监听到
export const login = (username) => ({
  type: 'login',
  username
});

```

### 组件中使用

```react
import React, { useState } from 'react';

// 登录页面
const Login = connect(
  state => ({
    isLogin: state.userReducerSaga.isLogin,
    loading: state.userReducerSaga.loading,
    error: state.userReducerSaga.error
  }),
  { login }
)(
  ({ isLogin, loading, location, login, error }) => {
    let [username, setUserNmae] = useState('')
    // 如果已经登录的话 直接去重定向页面
    if (isLogin) {
      console.log(location.state.redirect)
      return <Redirect to={{
        pathname: location.state.redirect
      }}/>
    }
    return (
      <div>
        <p>登录页</p>
        <hr/>
        { error && <p>{ error }</p> }
        <input
          type="text"
          value={ username }
          onChange={ e => setUserNmae(e.target.value) } />
        <button onClick={_ => login(username)} disabled={ loading }>
          { loading? '登录中...' : '登录' }
        </button>
      </div>
    )
  }
);
```

