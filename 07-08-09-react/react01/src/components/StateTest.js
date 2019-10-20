import React, {Component} from 'react';

class StateTest extends Component {
  state = {
    counter: 1
  };

  //批量执行 合并操作
  componentDidMount() {
    // 直接修改state不会生效
    // this.state.counter += 1
    /*this.setState({
      counter: this.state.counter + 1
    });
    // 这个counter 不会立即发生改变
    // （在小程序中以为值会立即变化 但页面不会变化）
    console.log(this.state.counter)*/

    // 多次setState 不用担心新能问题 React 会执行合并操作
    this.setState(prevState => ({
      counter: prevState.counter + 1
    }));
    this.setState(prevState => {
      return {
        counter: prevState.counter + 1
      }
    });
    this.setState(prevState => {
      return {
        counter: prevState.counter + 1
      }
    });
  }

  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default StateTest;