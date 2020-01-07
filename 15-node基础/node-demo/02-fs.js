const fs = require('fs')

const { promisify } = require('util')

// 1、同步读文件 返回的是一个buffer流
// const data = fs.readFileSync('./package.json')

// console.log(data.toString())

// 2、异步读文件 使用promisify 包装一下 让其返回为promis
const readFilePromis = promisify(fs.readFile)

const data = readFilePromis('./package.json').then( data =>{
  console.log(data.toString())
})

// 使用async await

/* (async () => {
  const fs = require('fs')
  const { promisify } = require('util')

  const readFilePromis = promisify(fs.readFile)

  const data = await readFilePromis('./package.json')

  console.log(data.toString())
})() */