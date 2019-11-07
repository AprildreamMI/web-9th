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

// 路由守卫
const PrivateRoute = connect(
  // 映射store的state 到 props 必须返回一个对象
  state => ({
    isLogin: state.userReducerSaga.isLogin
  })
)(
  ({component: Com, isLogin, ...rest}) => {
    return (
      // Route 好像是一个槽 route-view
      //  必须把component 从 props 中解构出来 因为 会于render 起冲突
      <Route
          { ...rest }
          render = { props =>
            // 如果登录了 返回这个需要渲染的组件
            // 否则 重定向 接收一个对象 有重定向的地址及传递过去的参数
            isLogin ?
              <Com /> :
              <Redirect
                to={{
                  pathname: '/login',
                  state: {
                    redirect: props.location.pathname
                  }
                }}
              />
          }
        />
    )
  }
);

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

// 首页组件
function Home(props) {
  return (
    <div>
      HomePage
      <h2>课程列表</h2>
      <ul>
        <li>
          {/* parmers 传参 */}
          <Link to={"/details/web"}>Web 架构师</Link>
          <Link to={"/details/Python"}>Python 架构师</Link>
        </li>
      </ul>
    </div>
  )
}

// 详情页
function Details(props) {
  /**
   *  1.history:  命令式导航 指令
         action: "PUSH"
         block:
         createHref:
         go:
         goBack:
         goForward:
         length:
         listen:
         location:
         push:
         replace:
   *  2.location:  获取路径信息
         hash: ""
         key: "hm99ww"
         pathname: "/details/web"
         search: ""
         state: undefined
      3.match: 参数
         isExact: true
         params: {course: "web"}
         path: "/details/:course"
         url: "/details/web"
   */
  console.log(props);
  return (
    <div>
      当前课程 { props.match.params.course }
      <button onClick={ props.history.goBack }>后退</button>
    </div>
  )
}

// 关于我们页组件
function About(props) {
  return (
    <div>
      关于我们 || 个人中心
      <ul>
        <li>
          <Link to={"/about/me"}>我的</Link>
        </li>
        <li>
          <Link to={"/about/order"}>订单</Link>
        </li>
      </ul>
      <Route path={"/about/me"} component={Me} />
      <Route path={"/about/Order"} component={ Order } />
      {/* 嵌套路由中的重定向 */}
      <Redirect to={"/about/me"} />
      {/* 嵌套路由中的重定向 */}
      <Redirect to={"/about/me"} />
    </div>
  )
}

// 关于我们 下 “我的” 页面
function Me(props) {
  return (
    <div>
      Me
    </div>
  )
}

// 关于我们 下 “订单” 页面
function Order(props) {
  return (
    <div>
      Order 订单页
    </div>
  )
}

// 关于我们页组件
function NoPage(props) {
  return (
    <div>
      404
    </div>
  )
}

function RouterSample(props) {
  return (
    <div>
      {/*
        路由即组件
         Router 只能有一个子节点
      */}
      <Router>
          <React.Fragment>
            <Link to={"/"}>首页</Link>
            <span>   </span>
            <Link to={"/about"}>关于我们页</Link>
          </React.Fragment>
          {/*
            1、包含式的路由
              -- 如果不适用exact 关键字 因为"/about"路径包含"/"所以，在关于我们页 也会显示homePage
            2、其实 Router 就是 路由插槽
        */}
        <Switch>
          <Route exact path={"/"} component={ Home } />
          <Route exact path={"/details/:course"} component={ Details } />
          <Route path={"/login"} component={ Login } />
          {/* 因为 about 有嵌套路由 所以 不能加上 exact */}
          <PrivateRoute path={"/about"} component={ About } />
          {/* 404 直接匹配 没有路径 在Switch 包裹的情况下 当其他匹配不到的时候 就会匹配他 */}
          <Route component={ NoPage } />
        </Switch>
      </Router>
    </div>
  );
}

export default RouterSample;