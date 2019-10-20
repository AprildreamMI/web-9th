import React from 'react';

// 使用props.children 相当于vue的slot
function Dialog(props) {
  // 默认样式
  const defaultStyle={
    borderWidth: '5px',
    borderColor: 'blue',
    borderStyle: 'soild'
  };
  return (
    <div style={{borderWidth: '5px',
      borderColor: 'blue',
      borderStyle: 'soild'}}>
      { props.children }
      <footer>
        {props.footer}
      </footer>
    </div>
  );
}

function WrapDialog(props) {
  return (
    <Dialog {...props}>
      <h1>欢迎光临</h1>
      <h2>感谢使用</h2>
    </Dialog>
  )
}

//使用Reach.children.map 进行过滤
function FilterChildren(props) {
  return (
    React.Children.map(props.children, child => {
      if (child.type !== props.name) {
        return child
      } else {
        return
      }
    })
  )
}

function Fetcher (props) {
  const API = {
    getUser () {
      return {
        name: '赵思',
        age: 22
      }
    }
  };
  return props.children(API[props.name]())
}

// 父组件去更改子组件
function ReadioGroup(props) {
  return React.Children.map(props.children, child => {
    return React.cloneElement(child,{name: props.name})
  })
}

function Readio({children, ...attr}) {
  return (
    <label>
      <input type="radio" {...attr}/>
      {children}
    </label>
  )
}

export default function (props) {
  /*const footer =
    <div>
      <button onClick={() => alert('wdwd')}>确定</button>
      <button>{props.title}</button>
    </div>
  ;
  return <WrapDialog
    style={{borderColor: 'red', borderWidth: '10px'}}
    footer={footer}
  />*/

  /*return (
    // scope-slot
    <Fetcher name="getUser">
      {
        ({name, age}) => (
          <p>
            {name} - {age}
          </p>
        )
      }
    </Fetcher>
  )*/

  /*return (
    <FilterChildren name="p">
      <h1>h1标签</h1>
      <p>h1标签</p>
      <h2>h2标签</h2>
      <p>h1标签</p>
    </FilterChildren>
  )*/

  return (
    <ReadioGroup name={"mvvm"}>
      <Readio value="vue">vue</Readio>
      <Readio value={"react"}>react</Readio>
      <Readio value={"angrily"}>angrily</Readio>
    </ReadioGroup>
  )
};