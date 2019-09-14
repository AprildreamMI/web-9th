const state = {
  name: 'zhaosi',
  age: 20
}
const mutations = {
  updateName (state, data) {
    state.name = data
  },
  updateAge (state, data) {
    state.age++
  }
}
const actions = {
  asyncUpdateName ({commit}) {
    setTimeout(() => {
      commit('updateName', 'zhaosisi')
    }, 3000)
  }
}

export default {
  state,
  mutations,
  actions
}
