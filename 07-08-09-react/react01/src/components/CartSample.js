import React, {Component} from 'react';
import Cart from "./Cart";

import update from 'react-addons-update';

class CartSample extends Component {
  constructor (props) {
    super(props);
    this.state = {
      text: '输入框的值',
      //商品列表
      goods: [
        {
          id: 1,
          name: '支点学院'
        },
        {
          id: 2,
          name: '通天减排'
        },
      ],
      //  购物车列表
      cartList: []
    }
  }
  // 输入框onChange
  handleInput = (e) => {
    this.setState({
      text: e.target.value
    })
  };
  //添加商品
  addGood = () => {
    this.setState(update(this.state, {
      goods: {
        $push: [{
          id: this.state.goods.length + 1,
          name: this.state.text
        }]
      }
    }))
  };
  // 加入到购物车
  addCard (good) {
    let goodIndex = this.state.cartList.findIndex(item => {
      return item.id === good.id
    });
    if (goodIndex !== -1) {
      this.setState(update(this.state, {
        cartList: {
          [goodIndex]: {
            count: {
              $apply: (value) => value + 1
            }
          }
        }
      }))
    } else {
      this.setState(update(this.state, {
        cartList: {
          $push: [{
            ...good,
            count: 1
          }]
        }
      }))
    }
  };
  // 增加
  addCount (index) {
    this.setState(update(this.state, {
      cartList: {
        [index]: {
          count: {
            $apply: (value) => value + 1
          }
        }
      }
    }))
  }
  // 减少
  minusCount (index) {

  }
  render() {
    // const title = this.props.title ? <h1>this.props.title</h1> : null
    return (
      <div>
        <div>
          <h1>条件渲染</h1>
          { this.props.title && <h1>{ this.props.title }</h1> }
        </div>
        <div>
           <h1>列表渲染</h1>
           <ul>
             { this.state.goods.map(good => {
               return (
                 <li key={good.id}>
                   { good.name }
                   <button onClick={ () => this.addCard(good) }>加入到购物车</button>
                 </li>
               )
             }) }
           </ul>
        </div>
        <div>
          <h1>事件处理</h1>
          <input
            type="text"
            value={ this.state.text }
            onChange={ this.handleInput }/>
          <button onClick={this.addGood}>添加商品</button>
        </div>
        <Cart
          data={ this.state.cartList }
          addCount={ (index) =>this.addCount(index) } />
      </div>
    );
  }
}

export default CartSample;