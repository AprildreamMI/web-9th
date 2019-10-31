import React from 'react';
import { connect } from 'react-redux'
import { add, minus, asyncAdd } from '../store/countReducer'

//把store中的state 映射给props
const mapStateToProps = state => ({
    num: state
  }
);

const mapDispatchToProps = {add, minus, asyncAdd};


const MyComponent = (props) => {
  return (
    <div>
      <p>{ props.num }</p>
      <div>
        <button onClick={props.minus}> - </button>
        <button onClick={props.add}> + </button>
        <button onClick={props.asyncAdd}> asyncAdd </button>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyComponent);


/*
@connect(mapStateToProps, mapDispatchToProps)
class ReduxTest extends React.Component {
  render() {
    // 解构props
    const { num, add, minus } = this.props
    return (
      <div>
        <p>{ num }</p>
        <div>
          <button onClick={minus}> - </button>
          <button onClick={add}> + </button>
        </div>
      </div>
    )
  }
}

export default ReduxTest*/
