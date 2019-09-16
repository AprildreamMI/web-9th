class Compile {
  constructor (el, vm) {
    // 要遍历的宿主节点
    this.$el = document.querySelector(el)

    this.$vm = vm

    // 编译
    if (this.$el) {
      // 转换内部内容为片段Fragment
      this.$fragment = this.node2Fragment(this.$el)
      // 执行编译
      this.compile(this.$fragment)

      // 将编译完的html结果追加至$el
      this.$el.appendChild(this.$fragment)
    }
  }

  // 把 #app 中的元素节点 遍历出来 
  node2Fragment (el) {
    // 就是创建一个虚拟的文本对象 可能更加高效一点
    const frag = document.createDocumentFragment()
    // 将el中所有子元素移动至frag中
    let child
    // el 元素持续变小
    // appendChild： 会改变原来dom
    while (child = el.firstChild) {
      frag.appendChild(child)
    }

    return frag
  }

  compile (el) {
    const childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      if (this.isElement(node)) {
        console.log('编译元素')
      } else if (this.isInterpolation(node)) {
        console.log('编译文本', node.textContent)
        this.compileText(node)
      }
      if(node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }

  // 编译文本
  compileText (node) {
    // 输出最近正则匹配的 RegExp.$1 的分组 '()' [这个圆括号中的]
    // 直接进行替换
    node.textContent = this.$vm.$data[RegExp.$1]
  }

  // 判断是不是元素节点
  isElement (node) {
    return node.nodeType === 1
  }

  // 判断是不是文本节点 并且是带插值表达式的文本节点才有效
  isInterpolation (node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
}