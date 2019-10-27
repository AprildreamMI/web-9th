import React, { useContext } from 'react';

// 创建一个上下文 如果是组件在多个文件的话 只需要引入用一个myContent 即可
const myContent = React.createContext();
const { Provider, Consumer } = myContent;
// 使用 Consumer 的方式
function Child(props) {
  return (
    <div>
      child1 { props.foo }
    </div>
  )
}
// 使用Hook 方式 直接在组件中拿到context
function Child2(props) {
  const ctx = useContext(myContent)
  return (
    <div>
      child2 { ctx.foo }
    </div>
  )
}

// 使用Hook 方式 直接在组件中拿到context
class Child3 extends React.Component {
  static contextType = myContent
  render() {
    return (
      <div>
        child3 { this.context.foo }
      </div>
    )
  }
}

function ContextTest(props) {
  return (
    <div>
      <Provider value={{foo: 'foo'}} >
        {/* 第一种使用方法 Provider 和 Consumer 之间可以嵌套无数层 */}
        {/*<Consumer>
            必须放在表达式中
            {
              value => <Child {...value} />
            }
          </Consumer>*/}

        {/* 第二种方式 */}
        {/*<Child2/>*/}

        {/* 第三种方式 通过class 中定义静态的contextType接受myContext  */}
        <Child3/>
      </Provider>
    </div>
  );
}

export default ContextTest;