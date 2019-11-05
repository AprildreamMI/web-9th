import React from 'react';
import './App.css';

import { Provider } from 'react-redux'
import store from '../src/store/index'
// import HookTest from "./components/HookTest";
// import ContextTest from "./components/ContextTest";
// import KForm from "./components/KForm";
import ReduxTest from './components/ReduxTest'
// import RouterSample from './components/RouterSample'

function App() {
  return (
    <div className="App">
      {/* Hook */}
      {/*<HookTest />*/}
      {/* 上下文 */}
      {/*<ContextTest />*/}
      {/* 仿照antd 的 form */}
      {/*<KForm />*/}
      <Provider store={ store }>
        <ReduxTest />
      </Provider>
      {/*<Provider store={ store }>
        <RouterSample />
      </Provider>*/}
    </div>
  );
}

export default App;
