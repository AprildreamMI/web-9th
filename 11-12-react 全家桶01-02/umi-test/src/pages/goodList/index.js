import React, { useEffect } from 'react'
import { Button, Card } from 'antd'
import { connect } from 'dva'

//  要保持pages 目录 也在src 目录下 才生效
export default connect(
  //  返回一个对象 映射需要使用到的state
  state => {
    console.log('state', state)
    return {
      goodList: state.goodList,
      loading: state.loading
    }
  },
  // 返回一个对象
  {
    // 有一些对象属性返回的是函数
    addGood: title => ({
      // action 的 type 需要以命名空间为前缀
      type: 'goodList/addGood',
      title
    }),
    getGoodList: () => ({
      // action 的 type 需要以命名空间为前缀
      type: 'goodList/getGoodList'
    })
  }
)((props) => {
  console.log(props)

  // 只会执行一次
  useEffect(() => {
    props.getGoodList()
  }, [])

  return (
    <div>
      <h1>good list</h1>
      <div>
        {
          // 找到模型
          /**
           * loading: {
              global: false,
              models: {
                goodList: false
              },
              effects: {
                'goodList/getGoodList': false
              }
            }
           */
          props.loading.models.goodList && <p>Loading....</p>
        }
        {
          props.goodList.map(item => {
            return (
              <Card key={ item.title }>
                <div>{ item.title }</div>
              </Card>
            )
          })
        }
        <Button onClick={ () => props.addGood('商品' + new Date().getTime()) }>添加商品</Button>
      </div>
    </div>
  )
})
