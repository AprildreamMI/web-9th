import goodsApi from '../service/goods'
export default {
  state: {
    slider: [],
    keys: [],
    goodsInfo: {}
  },
  mutations: {
    // 更新登录的状态
    setGoodsInfo (state, { slider, keys, goodsInfo }) {
      state.slider = slider
      state.keys = keys
      state.goodsInfo = goodsInfo
    }
  },
  getters: {
    goods: state => {
      // 得到一个二维数组
      return state.keys.map(key => {
        return state.goodsInfo[key]
      // 前一项数组和后一项数组进行拼接 得到一个一维数组
      }).reduce((prev, next) => {
        return prev.concat(next)
      })
    }
  },
  actions: {
    // 异步登录
    getGoodsInfo ({ state, commit }) {
      console.log(22)
      // 没有值才去获取
      goodsApi.getGoodsInfo().then(res => {
        commit('setGoodsInfo', res)
      })
    }
  }
}
