import axios from 'axios'

export default {
  getGoodsInfo () {
    return axios.get('/api/goods').then(res => {
      console.log(res)
      const { code, slider, data: goodsInfo, keys } = res.data
      if (code) {
        return { goodsInfo, slider, keys }
      } else {
        return null
      }
    })
  }
}
