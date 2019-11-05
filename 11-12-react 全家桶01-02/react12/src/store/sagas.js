/**
 * call: 调用异步函数
 * put: 当异步函数执行有结果了，去通知状态进行更新
 * takeEvery: 负责在全局监听action
 */
import { call, put, takeEvery } from 'redux-saga/effects'

// 登录的api调用
const userService = {
  login(username) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'Jerry') {
          resolve({
            id: 1,
            name: 'Jerry',
            age: 20
          })
        } else {
          reject(new Error('用户名或密码错误！'))
        }
      }, 2000)
    })
  }
};

// 当函数名和函数之间有星号的时候 此函数就是一个生成器函数
function* login(action) {
  try {
    // 按顺序执行 卡在这
    yield put({type: 'requestLogin'})
    // 拿到返回
    const result = yield call(userService.login, action.username)
    yield put({type: 'loginSuccess', result})
  // 如果失败 捕获错误
  } catch (err) {
    yield put({type: 'loginFailure', err})
  }
}

// 全局拦截住 action 让其执行我们定义好的login
function* mySaga() {
  yield takeEvery('login', login)
}

// 必须导出的是一个函数
export default mySaga