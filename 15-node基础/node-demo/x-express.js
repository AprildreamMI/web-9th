const http = require('http')
const url = require('url')

const routers = []

class Xexpress {
  get (path, cb) {
    routers.push({
      path,
      method: 'get',
      cb
    })
  }

  listen () {
    const server = http.createServer((req, res) => {
      const { pathname } = url.parse(req.url, true)
      for(const item of routers) {
        const { path, method, cb } = item
        if (pathname === path && req.method.toLowerCase() === method ) {
          return cb(req, res)
        }
      }
    })

    server.listen(...arguments)
  }
}



module.exports = () => {
  return new Xexpress()
}