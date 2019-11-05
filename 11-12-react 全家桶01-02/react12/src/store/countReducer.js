// 其实真实点 state 是一个对象
export const counterReducer = (state = 0, action) => {
  switch (action.type) {
    // 其实还可以把action.type 给抽出来 单独做为一个变量
    // 抽出来作为变量 有利于更改 和 编写代码（不容易打错）
    case 'add':
      // 因为这里的state是一个值 如果这里的state是一个对象的话 则应该返回一个新的对象
      return state + 1;
    case 'minus':
      return state - 1;
    default:
      return state
  }
};


// 可以把action 单独抽出来 给到一个单独的文件里面去
export const add = () => ({type: 'add'});
export const minus = () => ({type: 'minus'});
  // 一个函数 返回一个异步函数 当redux 接受到此函数的时候，处理不了，交给
  // redux-thunk 此处理异步函数中间件来处理
export const asyncAdd = () => dispatch => {
  setTimeout(() => {
    dispatch({
      type: 'add'
    })
  }, 1500)
};
