import React, { Component } from "react";

// 容器组件
export default class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        comments: [
          { body: "react is very good", author: "facebook" },
          { body: "vue is very good", author: "youyuxi" }
        ]
      });
    }, 1000);
  }

  render() {
    return (
      <div>
        {this.state.comments.map((c, i) => (
          <Comment key={i} {...c} />
        ))}
      </div>
    );
  }
}
// 展示组件
// memo高阶组件
// function Comment (props) {
//   console.log("render Comment");
//
//   return (
//     <div>
//       <p>{props.body}</p>
//       <p> --- {props.author}</p>
//     </div>
//   );
// }
// 继承纯组件 他会简单检查组件的值是否发生改变 如果没有 则不会render 组件
/*class Comment extends React.PureComponent {
  render() {
    console.log("render Comment");
    return (
      <div>
        <p>{this.props.body}</p>
        <p> --- {this.props.author}</p>
      </div>
    );
  }
}*/

// 高阶组件 进行了一层包装 实现了在 shouldComponentUpdate 生命周期进行浅对比
const Comment = React.memo(function (props) {
  console.log("render Comment");
  return (
    <div>
      <p>{props.body}</p>
      <p> --- {props.author}</p>
    </div>
  )
})
