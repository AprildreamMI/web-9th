import React, {Component} from 'react';

class Clock extends Component {
  state = {
    date: new Date()
  };
  // 组件挂载的时刻
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        date: new Date()
      })
    }, 1000)
  }

  //组件卸载
  componentWillMount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <div>
        { this.state.date.toLocaleTimeString() }
      </div>
    );
  }
}

export default Clock;