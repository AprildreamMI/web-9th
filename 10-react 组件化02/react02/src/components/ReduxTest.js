import React from 'react';
import store from '../store'

const MyComponent = (props) => {
  return (
    <div>
      <p>{ store.getState() }</p>
      <div>
        <button onClick={() =>
          store.dispatch({
            type: 'minus'
          })
        }> - </button>
        <button onClick={() =>
          store.dispatch({
            type: 'add'
          })
        }> + </button>
      </div>
    </div>
  );
};

export default MyComponent;
