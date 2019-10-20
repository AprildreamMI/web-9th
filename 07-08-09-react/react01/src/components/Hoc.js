import React, {Component} from 'react';

function TextCom (props) {
  return (
    <div>
      { props.target } - { props.name }
    </div>
  )
}

// 返回的是一个函数 根本不是一个组件
const WrapCom = (Com) => {
  const name = "高阶组件"
  // 返回的根本不是一个函数 还需要调用 只是返回的一个组件（如上面TextCom 组件（函数式写法的组件））
  return function NewTestCom (props) {
    return <Com {...props} name={ name } />
  }
};

const NewTextCom = WrapCom(TextCom)

export default class Hoc extends Component {
  render() {
    return (
      <div>
        <NewTextCom target={"react4"}/>
      </div>
    )
  }
}

