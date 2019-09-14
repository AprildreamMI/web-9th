const state = {
  age: 18
}
const mutations = {
  updateAge (state, data) {
    state.age++
  }
}
const actions = {
  asyncUpdateAge ({commit}) {
    setTimeout(() => {
      commit('updateAge')
    }, 3000)
  }
}

export default {
  state,
  mutations,
  actions
}
