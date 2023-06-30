// const mysql = require('mysql2')
// 
// const pool = mysql.createPool({
//     host:process.env.HOST,
//     user:process.env.USER,
//     database:process.env.DATABASE,
//     password: process.env.PASSWORD
// })
// 
// module.exports = pool.promise()

const Sequelize = require("sequelize")

const sequelize = new Sequelize(process.env.DATABASE,process.env.USER,process.env.PASSWORD,{dialect:"mysql",host:process.env.HOST})

module.exports = sequelize
