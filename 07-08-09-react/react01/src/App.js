import React, { Component } from 'react';
import logo from './logo.svg';
import { FunctionTypeCom, ClassTypeCom } from './components/CompType'
import Clock from "./components/Clock";
import StateTest from "./components/StateTest";
import CartSample from "./components/CartSample";
import CommentList from "./components/CommentList";
import Hoc from "./components/Hoc";
import Dialog from "./components/ComSlot";
import './App.css';

/*function formatName (user) {
  return user.firstName + '' + user.lastName
}*/

class App extends Component {
  // 之所以 render Comment 会渲染4此 前两次是其父组件的 后两次是这个app
  // 更新 导致其父组件更新 又导致其更新 导致其又出现两次render Comment
  componentWillMount() {
    setTimeout(() => {
      this.setState({prop:''});
    }, 1000);
  }

  render() {
    // const name = 'jerry';
    // const user = {firstName: 'tom', lastName: 'jerry'};
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
{/*          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <h1>{ name }</h1>
          <h1>{ formatName(user) }</h1>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>*/}
        </header>
        <div>
          <FunctionTypeCom name="赵思" />
          <ClassTypeCom name="赵思" />
        </div>
        <div>
          <h1>时钟</h1>
          <Clock />
        </div>
        <div>
          <h1>测试state</h1>
          <StateTest />
        </div>
        <div>
          <h1>购物车</h1>
          <CartSample title="购物车标题"/>
        </div>
        <div>
          <h1>评论列表</h1>
          <CommentList/>
        </div>
        <div>
          <h1>高阶组件</h1>
          <Hoc />
        </div>
        <div>
          <h1>slot 插槽 </h1>
          <Dialog title={"dhwdw"}/>
        </div>
      </div>
    );
  }
}

export default App;
