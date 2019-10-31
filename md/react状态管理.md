# react 状态管理

## react-redux

### 安装redux react-redux

### 新建store.js

```javascript
import { createStore } from 'redux'

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

const store = createStore(counterReducer);

export default store
```

### 在组件中使用

```javascript
import React from 'react';
import { connect } from 'react-redux'

//把store中的state 映射给props
const mapStateToProps = state => ({
    num: state
  }
);

// 把更新方法映射到props
const mapDispatchToProps = {
  add: () => ({type: 'add'}),
  minus: () => ({type: 'minus'})
};




const MyComponent = (props) => {
  return (
    <div>
      <p>{ props.num }</p>
      <div>
        <button onClick={props.minus}> - </button>
        <button onClick={props.add}> + </button>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyComponent);
```

#### 装饰器写法

```javascript
@connect(mapStateToProps, mapDispatchToProps)
class ReduxTest extends React.Component {
  render() {
    // 解构props
    const { num, add, minus } = this.props
    return (
      <div>
        <p>{ num }</p>
        <div>
          <button onClick={minus}> - </button>
          <button onClick={add}> + </button>
        </div>
      </div>
    )
  }
}
```



### 在App.js中使用

```javascript
import React from 'react';
import './App.css';

import { Provider } from 'react-redux'
import store from '../src/store'
import ReduxTest from './components/ReduxTest'

function App() {
  return (
    <div className="App">
      // 引入包装组件 将store 传入进去 和 之前把<App>包装进去不同 这个说明只在这个组件中使用
      <Provider store={ store }>
        <ReduxTest />
      </Provider>
    </div>
  );
}

export default App;

```

## react-thunk && react-logger

### 安装

> `react-logger`是一个记录日志的插件 再更改store之后 会在控制台进行打印输出 来记录更改了内容和事件

```javascript
npm i react-thunk react-logger -S
```

### 使用

```javascript
// 创建store，应用中间件方法
import { createStore, applyMiddleware } from 'redux'
import reduxLogger from 'redux-logger'
import reduxThunk from 'redux-thunk'

//把 count 这个 reducer 抽出来
import { counterReducer } from './countReducer'

// 把应用中间件这个函数当作第二个参数给 createStore
const store = createStore(counterReducer, applyMiddleware(
  // 先做日志记录 （控制台打印的日志）
  reduxLogger,
  // 再做一部操作
  reduxThunk
));

export default store
```

#### 在组件中使用

>  一个函数 返回一个异步函数 当redux 接受到此函数的时候，处理不了，交给redux-thunk 此处理异步函数中间件来处理

```javascript
asyncAdd = () => dispatch => {
  setTimeout(() => {
    dispatch({
      type: 'add'
    })
  }, 1500)
};
```

##  改写 抽离

### 新建store文件夹 index.js

```javascript
// 创建store，应用中间件方法
import { createStore, applyMiddleware } from 'redux'
import reduxLogger from 'redux-logger'
import reduxThunk from 'redux-thunk'

//把 count 这个 reducer 抽出来
import { counterReducer } from './countReducer'

// 把应用中间件这个函数当作第二个参数给 createStore
const store = createStore(counterReducer, applyMiddleware(
  // 先做日志记录 （控制台打印的日志）
  reduxLogger,
  // 再做一部操作
  reduxThunk
));

export default store
```

### 把reducer抽出来 countReducer

### 处理reducer countReducer

1. 其实还可以把其中的action抽离出来
2. 还可以把action.type当成常量

```javascript
// 其实真实点 state 是一个对象
export const counterReducer = (state = 0, action) => {
  switch (action.type) {
    // 其实还可以把action.type 给抽出来 单独做为一个变量
    // 抽出来作为变量 有利于更改 和 编写代码（不容易打错）
    case 'add':
      // 因为这里的state是一个值 如果这里的state是一个对象的话 则应该返回一个新的对象
      return state + 1;
    case 'minus':
      return state - 1;
    default:
      return state
  }
};


// 可以把action 单独抽出来 给到一个单独的文件里面去
export const add = () => ({type: 'add'});
export const minus = () => ({type: 'minus'});
  // 一个函数 返回一个异步函数 当redux 接受到此函数的时候，处理不了，交给
  // redux-thunk 此处理异步函数中间件来处理
export const asyncAdd = () => dispatch => {
  setTimeout(() => {
    dispatch({
      type: 'add'
    })
  }, 1500)
};
```

