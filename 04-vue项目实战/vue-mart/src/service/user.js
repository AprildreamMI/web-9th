import axios from 'axios'

export default {
  login (formData) {
    return axios.get('/api/login', {
      params: formData
    })
  }
}
