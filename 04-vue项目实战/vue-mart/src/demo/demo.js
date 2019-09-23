function f1 () {
  console.log(this)
}
f1()

setInterval(() => {
  console.log(this)
}, 1000)
