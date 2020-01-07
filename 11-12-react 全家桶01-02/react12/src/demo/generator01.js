// 定义生成器函数
function* g() {
  yield "a"
  yield "b"
  yield "c"
  return "ending";
}

// 返回Genrator 对象
console.log(g())   // Object [Generator] {}
console.log(g().toString())   // g { [object Generator] }
