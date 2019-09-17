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
        let attrs = node.attributes
        Array.from(attrs).forEach(attr => {
          // 列如： class="text_size_18"
          // 拿到属性名 class
          const attrName = attr.name
          // 属性值：text_size_18
          const attrValue = attr.value
          // 如果是指令属性： k-text...
          if (this.isDirective(attrName)) {
            // step stop 包括开始 不包括结束
            const dir = attrName.substring(2)
            // 执行此指令方法 如果此指令方法存在的话
            // 传入节点 vm 和 与指令属性绑定的属性值
            this[dir] && this[dir](node, this.$vm, attrValue)
          }
          if (this.isEvent(attrName)) {
            // @click
            const dir = attrName.substring(1)
            this.eventHandler(node, this.$vm, attrValue, dir)
          }
        })
      } else if (this.isInterpolation(node)) {
        console.log('编译文本', node.textContent)
        this.compileText(node)
      }
      if(node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }

  // 建立某一个属性值的依赖 让此属性值更新的时候 会执行new Watcher的回调
  update (node, vm, exp, dir) {
    // 通过传来的方法类型，拿到方法名称
    const updateFn = this[`${dir}Updater`]

    // 如果方法存在 执行一次这个方法 （做第一次更新）
    updateFn && updateFn(node, vm[exp]) 

    // 把依赖收集起来 
    // 在new Watcher 的时候 就已经把此Watcher实例给加入到了Dop的WatcherList中了
    // 然后等待相关值更新 然后触发watcher的update函数 其实就是下面传递下去的回调函数
    new Watcher(vm, exp, function(value) {
      updateFn && updateFn(node, value)
    })

  }
  
  // 编译文本
  compileText (node) {
    // 输出最近正则匹配的 RegExp.$1 的分组 '()' [这个圆括号中的]
    // 直接进行替换
    // node.textContent = this.$vm.$data[RegExp.$1]
    this.update(node, this.$vm, RegExp.$1, 'text')
  }

  // 编译文本指令
  text (node, vm, exp) {
    this.update(node, vm, exp, 'text')
  }

  // 编译html指令
  html (node, vm, exp) {
    this.update(node, vm, exp, 'html')
  }

  // 编译model指令
  model (node, vm, exp) {
    this.update(node, vm, exp, 'model')
    node.addEventListener('input', e => {
      vm[exp] = e.target.value
    })
  }

  // 编译事件的处理
  eventHandler (node, vm, exp, evenType) {
    let fn = vm.$option.methods && vm.$option.methods[exp]
    node.addEventListener(evenType, fn.bind(vm))
  }


  // 更新文本的方法
  textUpdater (node, value) {
    node.textContent = value
  }
  // 更新HTMK的方法
  htmlUpdater (node, value) {
    node.innerHTML = value
  }
  // 更新model的方法
  modlUpdater (node, value) {
    // 直接先赋值给输入框\表单组件
    node.value = value
  }

  // 判断是不是指令属性
  isDirective (attrName) {
    return attrName.indexOf('k-') === 0
  }

  // 判断是不是事件属性
  isEvent  (attrName) {
    return attrName.indexOf('@') === 0
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