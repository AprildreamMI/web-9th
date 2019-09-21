import axois from 'axios'

export default () => {
  // 请求拦截器
  axois.interceptors.request.use(config => {
    // 获取token
    const token = localStorage.getItem('token')
    // 如果存在令牌则添加token请求
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }

    return config
  })

  // 响应拦截器
  axois.interceptors.response.use(null, err => {
    // if (err.response.status === 401) {
    //   localStorage.setItem('token', '')

    //   location.href = '/login'
    // }
  })
}
