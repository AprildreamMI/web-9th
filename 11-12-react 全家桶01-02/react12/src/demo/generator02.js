
// 2、生成器函数在执行的时候可以暂停 后面又能从暂停处继续执行
// 定义生成器函数
function* g() {
  yield "a"
  yield "b"
  yield "c"
  return "ending";
}

// 
var gen = g()

// { value: 'a', done: false }
// console.log(gen.next())

// // { value: 'b', done: false }
// console.log(gen.next())

// // { value: 'c', done: false }
// console.log(gen.next())

// // { value: 'ending', done: true }
// console.log(gen.next())

// 利用递归函数调用Next
function next() {
  let { value, done } = gen.next()
  console.log(value)
  if (!done) next()
}

next()

// 如果没有 return 最后一个是undefined
/* a
b
c
ending
undefined */

// 如果有 return
/* a
b
c
ending */