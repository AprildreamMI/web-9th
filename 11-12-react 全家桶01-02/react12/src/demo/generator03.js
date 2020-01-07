
// 3、传参
// 定义生成器函数
function* say() {
  let a = yield "1"
  console.log(a)
  let b = yield "2"
  console.log(b)
}

let it = say()

// { value: '1', done: false }
console.log(it.next())

/**
 * 在执行玩第一个next后，会在let a = yield "1" 
 * 这个赋值卡住，所以在走第二个next的时候 会 执行赋值语句，把传入
 * 的参数赋值给a，然后打印a,然后执行 yield "2" 然后再在赋值b的这里卡住
 */
// 我是被传进来的1
// { value: '2', done: false }
console.log(it.next('我是被传进来的1'))
