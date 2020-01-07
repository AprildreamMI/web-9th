// const express = require('express')
const express = require('./x-express')

const app = express()

console.dir(app)

app.get('/', (req, res) => {
  res.end('Hello Express......')
})

app.get('/users', (req, res) => {
  res.end(JSON.stringify({
    name: 'zhaosi'
  }))
})

app.listen(3000, () => {
  console.log('App listen at 3000 x')
})