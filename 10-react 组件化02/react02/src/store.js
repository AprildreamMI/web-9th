import { createStore } from 'redux'

// 其实真实点 state 是一个对象
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'add':
      // 因为这里的state是一个值 如果这里的state是一个对象的话 则应该返回一个新的对象
      return state + 1;
    case 'minus':
      return state - 1;
    default:
      return state
  }
};

const store = createStore(counterReducer);

export default store