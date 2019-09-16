class KVue {
  constructor (option) {
    if (typeof option.data !== 'object') {
      throw TypeError('data 不是一个对象')
      return
    }
    this.$data = option.data
    this.observe(this.$data)
    // new Watcher()
    // this.$data.title
    // new Watcher()
    // this.$data.foo.bar

    // 传入#app 和 当前实例
    new Compile(option.el, this)
  }

  // 接受一个对象 把对象中的属性全部劫持住
  observe (data) {
    if (typeof data !== 'object') {
      // throw TypeError('data 不是一个对象')
      return
    }

    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }

  // 把传入的key劫持住
  defineReactive (obj, key, value) {
    this.observe(value)
    
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      get () {
        // 如果当前的静态方法存在的话
        // 把此Dep.target（当前新new的watcher加入dep.watcherList）
        Dep.target && dep.addWatcher(Dep.target)
        return value
      },
      set (newValue) {
        if ( value === newValue) return
        // 进行赋值 会触发get
        value = newValue
        // 把此dep中的watcher通知其更新
        dep.notify()
      }
    })
  }
}

class Dep {
  constructor () {
    this.watcherList = []
  }

  addWatcher (watcher) {
    this.watcherList.push(watcher)
  }

  // 通知所有的依赖去做更新
  notify () {
    this.watcherList.forEach(watcher => {
      watcher.update()
    })
  }
}

class Watcher {
  constructor () {
    // 将当前water指向到Dep的静态属性上
    Dep.target = this
  }

  update () {
    console.log('wather 属性更新了')
  }

  
}