export default {
  //  以 pases 作为根目录
  routes: [
    {
      path: '/',
      component: './index'
    },
    {
      path: '/about',
      component: './about/index'
    },
    {
      path: '/goodList',
      component: './goodList/index'
    },
    {
      // 只能算是一个布局 不能算是一个页面
      path: '/user',
      component: './user/index',
      routes: [
        {
          path: '/user',
          component: './user/index'
        },
        {
          path: '/user/:id',
          component: './user/$id'
        }
      ]
    }
  ],
  plugins: [
    [
      // 启用就是按需引用
      'umi-plugin-react', {
        antd: true,
        // 内置dva 直接启用
        dva: true
      }
    ]
  ]
}