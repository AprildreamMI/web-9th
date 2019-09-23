const Koa = require('koa')
const Router = require('koa-router')
// 生成令牌 验证令牌
const jwt = require('jsonwebtoken')

// 验证令牌
const jwtAuth = require('koa-jwt')

// 生成数字签名的秘钥
const secret = "it's a secret"

//
const app = new Koa()

// 路由
const router = new Router()

router.get('/api/login', async ctx => {
  console.log(ctx.query)
  // 拿到用户名和密码
  const { username, password } = ctx.query

  if (username === 'zhaosi' && password === '123') {
    // 生成令牌
    const token = jwt.sign(
      {
        // 用户是可以拿到其中的数据 可以反解码出来
        data: {
          // 用户信息的数据
          name: 'zhaosi'
        },
        // 过期时间
        exp: Math.floor(Date.now() / 1000) + 60 * 60
      },
      secret
    )
    ctx.body = {
      code: 1,
      token
    }
  } else {
    ctx.status = 401
    ctx.body = {
      code: 0,
      message: '用户名或密码错误'
    }
  }
})

router.get(
  '/api/userinfo',
  jwtAuth({ secret }),
  async ctx => {
    ctx.body = {
      code: 1,
      data: {
        name: 'zhaosi',
        age: 20
      }
    }
  }
)

router.get(
  '/api/goods',
  jwtAuth({ secret }),
  async ctx => {
    ctx.body = {
      code: 1,
      slider: [
        {
          id: 21,
          img: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png'
        },
        {
          id: 22,
          img: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png'
        },
        {
          id: 23,
          img: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png'
        },
        {
          id: 24,
          img: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png'
        }
      ],
      data: {
        fe: [
          {
            id: 1,
            title: 'Vue2.x实战',
            price: '100',
            img: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png',
            count: 100
          },
          {
            id: 2,
            title: 'React16.x实战',
            price: '120',
            img: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png',
            count: 100
          },
          {
            id: 3,
            title: 'nodejs实战',
            price: '80',
            img: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png',
            count: 100
          },
          {
            id: 4,
            title: '前端工程化',
            price: '110',
            img: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png',
            count: 100
          },
          {
            id: 5,
            title: '面试',
            price: '200',
            img: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png',
            count: 100
          },
          {
            id: 6,
            title: '前端安全',
            price: '30',
            img: '/img/05.jpg',
            count: 100
          }
        ],
        python: [
          {
            id: 7,
            title: 'Python基础语法',
            price: '120',
            img: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png',
            count: 101
          },
          {
            id: 8,
            title: 'Flask实战',
            price: '80',
            img: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png',
            count: 100
          },
          {
            id: 9,
            title: 'Django实战',
            price: '110',
            img: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png',
            count: 100
          },
          {
            id: 10,
            title: 'Python语法进阶',
            price: '200',
            img: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png',
            count: 100
          }
        ],
        java: [
          {
            id: 11,
            title: 'java入门实战',
            price: '80',
            img: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png',
            count: 100
          },
          {
            id: 12,
            title: 'spring boot实战',
            price: '110',
            img: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png',
            count: 100
          },
          {
            id: 13,
            title: 'Java高并发',
            price: '30',
            img: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png',
            count: 100
          }
        ],
        bigdata: [
          {
            id: 14,
            title: '大数据实战',
            price: '200',
            img: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png',
            count: 100
          },
          {
            id: 15,
            title: 'Hadoop实战',
            price: '120',
            img: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png',
            count: 100
          },
          {
            id: 16,
            title: 'Kafka平台',
            price: '80',
            img: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png',
            count: 100
          }
        ],
        ai: [
          {
            id: 17,
            title: '算法实战',
            price: '100',
            img: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png',
            count: 100
          },
          {
            id: 18,
            title: '个性化推荐',
            price: '120',
            img: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png',
            count: 100
          },
          {
            id: 19,
            title: '机器学习',
            price: '80',
            img: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png',
            count: 100
          },
          {
            id: 20,
            title: 'AI实战',
            price: '110',
            img: '/img/05.jpg',
            count: 100
          }
        ]
      },
      keys: ['fe', 'python', 'java', 'bigdata', 'ai']
    }
  }
)

app.use(router.routes())

app.listen(3000)
