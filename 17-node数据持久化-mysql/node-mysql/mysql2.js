(async () => {

  // 引入mysql2
  const mysql = require('mysql2/promise')
  const cfg = {
    host: 'localhost',
    user: 'root',
    password: 'example',
    database: 'web9'
  }

  const connection = await mysql.createConnection(cfg)
  console.log('数据库成功连接')

  // 创建表
  let ret = await connection.execute(`
    create table if not exists test (
      id int not null auto_increment,
      message varchar(45) null,
      primary key (id)
    )
  `)

  // 插入数据
  // ret = await connection.execute(`
  //     insert into test(message) value(?)
  // `, ['abc'])

  // console.log('插入数据', ret)

  // 查询表 按照对应位置取值
  const [ rows ] = await connection.execute(`
      select * from test
  `)

  console.log('查询数据', rows)

})()