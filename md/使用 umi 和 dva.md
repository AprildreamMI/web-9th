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
// 用于浏览器的router
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import { connect } from 'react-redux'

import { login } from '../store/userReducerSaga'

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

## umi

### 安装

> 更多的看文档

```javascript
npm install umi -g
```

### 自定路由

`/config/index`

```javascript
export default {
  //  以 pases 作为根目录
  routes: [
    {
      path: '/',
      component: './index'
    },
    {
      path: '/about',
      component: './about/index'
    },
    {
      path: '/goodList',
      component: './goodList/index'
    },
    {
      // 只能算是一个布局 不能算是一个页面
      path: '/user',
      component: './user/index',
      routes: [
        {
          // 需要有一个默认路由的默认页面
          path: '/user',
          component: './user/index'
        },
        {
          path: '/user/:id',
          component: './user/$id'
        }
      ]
    }
  ]
}
```

### 使用antd

```javascript
npm install antd -S
npm install umi-plugin-react -D
```

```javascript
export default {
  plugins: [
    [
      // 启用就是按需引用
      'umi-plugin-react', {
        antd: true,
        // 内置dva 直接启用
        dva: true
      }
    ]
  ]
}
```

```javascript
// 页面
import { Button, Card } from 'antd'
        <Button onClick={ () => props.addGood('商品' + new Date().getTime()) }>添加商品</Button>
```

### 使用dva

```javascript
// 直接启用 内置 都不需要安装
export default {
  plugins: [
    [
      // 启用就是按需引用
      'umi-plugin-react', {
        antd: true,
        // 内置dva 直接启用
        dva: true
      }
    ]
  ]
}
```

### mock数据

> 直接在根目录新建Mock文件夹并在其中新建Js文件即可
>
> 会自动拦截ajax请求

`/mock/goods.js`

```javascript
const data = [
  {
    title: "web全栈"
  },
  {
    title: 'java架构师'
  }
]

export default {
   'get /api/goods': (req, res) => {
     setTimeout(() => {
       res.json({result: data})
     }, 1500)
   }
}
```

### 全局models

> 新建下方文件夹及文件，文件名字为默认的命名空间

`/src/models/goodList.js`

```javascript
import axios from 'axios'

function getGoodList () {
  return axios.get('/api/goods')
}

export default {
  //  命名空间
  namespace: 'goodList',
  state: [
    {
      title: "web全栈"
    },
    { 
      title: "java架构师1"
    }
  ],
  // 异步操作
  effects:{
    *getGoodList (action, { call, put }) {
      // 调用
      const res = yield call(getGoodList)
      // 更新
      yield put({
        type: 'initGoods',
        payload: res.data.result
      })
    }
  }, 
  // 更新状态
  reducers: {
    // 直接更新 返回一个
    addGood (state, action) {
      return [...state, { title: action.title }]
    },
    //  初始化列表 直接返回
    initGoods (state, action) {
      return action.payload
    }
  }
}
```

#### 页面中使用 状态 及操作异步方法 使用loading

```javascript
import React, { useEffect } from 'react'
import { Button, Card } from 'antd'
import { connect } from 'dva'

//  要保持pages 目录 也在src 目录下 才生效
export default connect(
  //  返回一个对象 映射需要使用到的state
  state => {
    console.log('state', state)
    return {
      goodList: state.goodList,
      loading: state.loading
    }
  },
  // 返回一个对象
  {
    // 有一些对象属性返回的是函数
    addGood: title => ({
      // action 的 type 需要以命名空间为前缀
      type: 'goodList/addGood',
      title
    }),
    getGoodList: () => ({
      // action 的 type 需要以命名空间为前缀
      type: 'goodList/getGoodList'
    })
  }
)((props) => {
  console.log(props)

  // 只会执行一次
  useEffect(() => {
    props.getGoodList()
  }, [])

  return (
    <div>
      <h1>good list</h1>
      <div>
        {
          // 找到模型
          /**
           * loading: {
              global: false,
              models: {
                goodList: false
              },
              effects: {
                'goodList/getGoodList': false
              }
            }
           */
          props.loading.models.goodList && <p>Loading....</p>
        }
        {
          props.goodList.map(item => {
            return (
              <Card key={ item.title }>
                <div>{ item.title }</div>
              </Card>
            )
          })
        }
        <Button onClick={ () => props.addGood('商品' + new Date().getTime()) }>添加商品</Button>
      </div>
    </div>
  )
})

```

