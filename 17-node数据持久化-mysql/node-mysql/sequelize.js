(async ()=> {
    const Sequelize = require('sequelize')

    const sequelize = new Sequelize('web9', 'root', 'example', {
      host: 'localhost',
      dialect: 'mysql',
      operatorsAliases: false
    })

    // 定义模型
    const Fruit = sequelize.define('Fruit', {
      name: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    })

    // 同步
    let ret = await Fruit.sync()
    console.log('ret', ret)

    // 插入记录
    ret = await Fruit.create({
      name: '香蕉',
      price: 3.5
    })

    // 查询记录
    ret = await Fruit.findAll()
    console.log('查询的Fruit表', JSON.stringify(ret))

})() 