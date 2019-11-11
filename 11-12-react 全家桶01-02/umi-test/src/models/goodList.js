import axios from 'axios'

function getGoodList () {
  return axios.get('/api/goods')
}

export default {
  //  命名空间
  namespace: 'goodList',
  state: [
    {
      title: "web全栈"
    },
    { 
      title: "java架构师1"
    }
  ],
  // 异步操作
  effects:{
    *getGoodList (action, { call, put }) {
      // 调用
      const res = yield call(getGoodList)
      // 更新
      yield put({
        type: 'initGoods',
        payload: res.data.result
      })
    }
  }, 
  // 更新状态
  reducers: {
    // 直接更新 返回一个
    addGood (state, action) {
      return [...state, { title: action.title }]
    },
    //  初始化列表
    initGoods (state, action) {
      return action.payload
    }
  }
  
}