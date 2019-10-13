import React, {Component} from 'react';

class MyComponent extends Component {
  constructor (props) {
    super(props);
    this.state = {

    }
    console.log('1.组件构造函数执行')
  }

  // 组件将要挂载
  componentWillMount() {
    console.log('2.组件将要挂载')
  }

  // 组件已经挂载
  componentDidMount() {
    console.log('3.组件已经挂载')

  }

  // 父组件传来的prop发生更新
  componentWillReceiveProps(nextProps) {
    console.log('4.将要接受属性传递')

  }

  // 是否进行更新
  shouldComponentUpdate(nextProps, nextState) {
    console.log('5.是否进行更新')

  }

  // 组件将要更新
  componentWillUpdate(nextProps, nextState) {
    console.log('6.组件将要更新')

  }

  // 组件已经更新
  componentDidUpdate(prevProps, prevState) {
    console.log('7.组件已经更新')
  }

  // 组件卸载
  componentWillUnmount() {
    console.log('8.组件卸载')
  }

  render() {
    /**
     * render -> componentDidUpdate
     * render -> componentDidMount
     *
     */
    console.log('组件render方法发生调用 组件渲染');
    return (
      <div>

      </div>
    );
  }
}

export default MyComponent;
