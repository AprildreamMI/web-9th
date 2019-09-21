module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: "http://127.0.0.1:3000/",
          changeOrigin: true
        }
      }
      // 假的代理服务器
      // before(app) {
      //   app.get("/api/login", (req, res) => {
      //     const { username, password } = req.query

      //     if (username === 'zhaosi' && password == '123') {
      //       res.json({
      //         code: 1,
      //         token: 'tokenzhaosi'
      //       })
      //     } else {
      //       res.status(401).json({
      //         code: 0,
      //         message: '用户名或者密码错误'
      //       })
      //     }
      //   })

      //   // 验证登录
      //   function auth(req, res ,next) {
      //     if (req.headers.token) {
      //       // 已认证
      //       next()
      //     } else {
      //       res.sendStatus(401)
      //     }
      //   }

      //   /**
      //    * 获取用户信息
      //    * auth
      //    *  中间件
      //    */
      //   app.get('/api/userinfo', auth, (req, res) => {
      //     res.json({
      //       code: 1,
      //       data: {
      //         name: 'zhaosi',
      //         age: 21
      //       }
      //     })
      //   })
      // }
    }
  }
}
