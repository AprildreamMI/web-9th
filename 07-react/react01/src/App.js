import React, { Component } from 'react';
import logo from './logo.svg';
import { FunctionTypeCom, ClassTypeCom } from './components/CompType'
import Clock from "./components/Clock";
import StateTest from "./components/StateTest";
import CartSample from "./components/CartSample";
import './App.css';

/*function formatName (user) {
  return user.firstName + '' + user.lastName
}*/

class App extends Component {
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
      </div>
    );
  }
}

export default App;
