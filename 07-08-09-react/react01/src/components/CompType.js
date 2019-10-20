import React from 'react';
/*
* 导出时大写导出 才能识别为React组件
* */

//函数类型的组件
export function FunctionTypeCom (props) {
  return (
    <div>
      函数类型的组件
      <div>
        {/* react 没有双向绑定 只有单项数据流 */}
        <h1>{ props.name }</h1>
      </div>
    </div>
  );
}

//组件类型的组件
export class ClassTypeCom extends React.Component {
  render() {
    return (
      <div>
        类声明类型组件
        <div>
          {/* react 没有双向绑定 只有单项数据流 */}
          <h1>{ this.props.name }</h1>
        </div>
      </div>
    )
  }
}