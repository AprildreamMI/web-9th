const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  let { url, method } = req

  if (url === '/' && method === 'GET') {
    fs.readFile('./index.html', (err, data) => {
      // 出错返回
      if (err) {
        // 【和writeHead区别】可以一次设置一组
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        })
        res.end('Server Error')
      }

      // 正确返回
      res.statusCode = 200
      // 【和writeHead区别】 只能当个设置
      res.setHeader('Content-Type', 'text/html')
      res.end(data)
    })
  } else if (url === '/users' && method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    })

    res.end(JSON.stringify(
      {
        name: 'zhaosi'
      }
    ))
  }

})

server.listen(3000)