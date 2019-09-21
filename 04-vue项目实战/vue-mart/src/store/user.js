import userApi from '../service/user'
export default {
  state: {
    // 保存登录的状态
    isLogin: false
  },
  mutations: {
    // 更新登录的状态
    setLoginState (state, data) {
      state.isLogin = data
    }
  },
  actions: {
    // 异步登录
    login ({ commit }, formData) {
      return userApi.login(formData).then(res => {
        const { code, token } = res.data
        console.log(code, token)
        if (code) {
          commit('setLoginState', true)
          localStorage.setItem('token', token)
        }
        return code
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
