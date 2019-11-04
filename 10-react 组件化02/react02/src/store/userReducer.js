const init = {
  isLogin: false,
  loading: false
};

export const userReducer = (state = init, action) => {
  switch (action.type) {
    // 其实还可以把action.type 给抽出来 单独做为一个变量
    // 抽出来作为变量 有利于更改 和 编写代码（不容易打错）
    case 'loginPending':
      // 因为这里的state是一个值 如果这里的state是一个对象的话 则应该返回一个新的对象
      return {
        isLogin: false,
        loading: true
      };
    case 'login':
      return {
        isLogin: true,
        loading: true
      };
    default:
      return state
  }
};


// 可以把action 单独抽出来 给到一个单独的文件里面去

// 一个函数 返回一个异步函数 当redux 接受到此函数的时候，处理不了，交给

// redux-thunk 此处理异步函数中间件来处理
export const login = () => dispatch => {
  // 先更新loading
  dispatch({
    type: 'loginPending'
  });
  // 登录成功直接更新isLogin
  setTimeout(() => {
    dispatch({
      type: 'login'
    })
  }, 3000)
};
