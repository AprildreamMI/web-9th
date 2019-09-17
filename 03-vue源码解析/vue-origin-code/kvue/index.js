class KVue {
  constructor (option) {
    if (typeof option.data !== 'object') {
      throw TypeError('data 不是一个对象')
      return
    }
    this.$option = option
    this.$data = option.data
    this.observe(this.$data)
    
    // 传入#app 和 当前实例
    new Compile(option.el, this)

    // 如果 create 此生命周期函数存在的话 绑定this进行执行此函数
    if (option.created) {
      option.created.call(this)
    }
  }

  // 接受一个对象 把对象中的属性全部劫持住
  observe (data) {
    if (typeof data !== 'object') {
      // throw TypeError('data 不是一个对象')
      return
    }

    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
      // 把data中的属性全部代理到this实例上
      this.proxyData(key)
    })
  }

  // 代理
  proxyData (key) {
    Object.defineProperty(this, key, {
      get () {
        return this.$data[key]
      },
      set (newValue) {
        this.$data[key] = newValue
      }
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
        if (value === newValue) return
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

  // 加入依赖
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

// 依赖
class Watcher {
  constructor (vm, exp, cb) {
    this.vm = vm
    this.exp = exp
    this.cb = cb
    // 将当前water指向到Dep的静态属性上
    Dep.target = this
    console.dir(Dep.target)
    // 去访问一次跟依赖进行相关绑定的值，把此watcher加入到那个值所创建的DOP类中
    this.vm[this.exp]
    Dep.target = null
  }

  // 在值set之后 调用 dep.notify() 把加入进来的所有watcher.update
  update () {
    this.cb.call(this.vm, this.vm[this.exp])
  }
}