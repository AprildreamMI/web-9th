import React, {Component} from 'react';

function KFormCreate(Com) {
  class KFormWarp extends Component {
    constructor (props) {
      super(props);
      this.options = {};
      this.state = {

      }
    }

    // 输入框值发生改变
    handleInputChange (e) {
      let { name, value } = e.target;
      this.setState({
        [name]: value
      }, () => {
        this.validateField(name)
      })
    }

    // 验证所有的field
    validateAllField (callback) {
      const visibleList = Object.keys(this.options).map(key => {
        return this.validateField(key)
      });
      const visibleAll = visibleList.every(item => {
        return item
      });
      callback(visibleAll, this.state)
    };

    // 验证 字段
    validateField (field) {
      if (this.options[field].hasOwnProperty('rules')) {
        // some一直在找符合条件的值，一旦找到，则不会继续迭代下去。
        let visible =  !this.options[field].rules.some(item => {
          if (item.required) {
            if (!this.state[field] || this.state[field] === '') {
              let mapStr = field + 'VisibleMessage';
              this.setState({
                [mapStr]: item.message
              })

              return true
            }
          }
        })


        if (visible) {
          let mapStr = field + 'VisibleMessage';
          this.setState({
            [mapStr]: ''
          })
        }

        // 返回true 则代表无错，反之有错
        return visible
      }
    }

    getFieldDecorator = (field, options) => {
      this.options[field] = options;
      return FormItem => (
        <div>
          {
            React.cloneElement(FormItem, {
              name: field,
              value: this.state[field] || '',
              onChange: this.handleInputChange.bind(this)
            })
          }
          {
            this.state[field + 'VisibleMessage'] &&
            <p style={{color:'red'}}>{this.state[field + 'VisibleMessage']}</p>
          }
        </div>
      )
    };

    render() {
      return <Com getFieldDecorator={this.getFieldDecorator} validateAllField={this.validateAllField.bind(this)} />
    }
  }

  return KFormWarp
}

class KForm extends Component {
  submit () {
    this.props.validateAllField((visible, data) => {
      if (visible) {
        console.log('登录成功', visible, data)
      } else {
        console.log('登录失败', visible, data)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props
    return (
      <div>
        用户名：
        {
          getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <input/>
          )
        }
        密  码：
        {
          getFieldDecorator('pwd', {
            rules: [{ required: true, message: 'Please input your pwd!' }]
          })(
            <input/>
          )
        }
        <button onClick={ this.submit.bind(this) }>提交</button>
      </div>
    );
  }
}

export default KFormCreate(KForm);