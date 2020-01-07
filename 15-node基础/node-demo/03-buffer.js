// 开辟一段内存空间
const buf1 = Buffer.alloc(10)
// <Buffer 00 00 00 00 00 00 00 00 00 00>
console.log(buf1)

const buf2 = Buffer.from([1, 2, 3])
// 二进制的1，2，3 <Buffer 01 02 03>
console.log(buf2)

const buf3 = Buffer.from('Buffer创建方法')
// <Buffer 42 75 66 66 65 72 e5 88 9b e5 bb ba e6 96 b9 e6 b3 95>
console.log(buf3)
console.log(buf3.toString())

// 写入到提前开辟的空间中
buf1.write('hello')
console.log('buf1:', buf1)
console.log('buf1:', buf1.toString())

// 把两个buffer做链接
const buf4 = Buffer.concat([buf1, buf3])
console.log('buf4', buf4.toString())