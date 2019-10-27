import React from 'react';
import './App.css';

// import HookTest from "./components/HookTest";
import ContextTest from "./components/ContextTest";
import KForm from "./components/KForm";
import ReduxTest from './components/ReduxTest'

function App() {
  return (
    <div className="App">
      {/* Hook */}
      {/*<HookTest />*/}
      {/* 上下文 */}
      {/*<ContextTest />*/}
      {/* 仿照antd 的 form */}
      {/*<KForm />*/}
      <ReduxTest />
    </div>
  );
}

export default App;
