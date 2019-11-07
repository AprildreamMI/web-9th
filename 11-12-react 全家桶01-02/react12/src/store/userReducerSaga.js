const init = {
  isLogin: false,
  loading: false,
  error: ''
};

export const userReducerSaga = (state = init, action) => {
  switch (action.type) {
    // 其实还可以把action.type 给抽出来 单独做为一个变量
    // 抽出来作为变量 有利于更改 和 编写代码（不容易打错）
    case 'loginPending':
      // 因为这里的state是一个值 如果这里的state是一个对象的话 则应该返回一个新的对象
      return {
        isLogin: false,
        loading: true
      };
    case 'loginSuccess':
      return {
        isLogin: true,
        loading: false
      };
    case 'loginFailure':
      return {
        isLogin: false,
        loading: false,
        error: '登录失败'
      };
    default:
      return state
  }
};


// 可以把action 单独抽出来 给到一个单独的文件里面去

// 此login 会被 saga 监听到
export const login = (username) => ({
  type: 'login',
  username
});
