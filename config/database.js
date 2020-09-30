const sequelize = require("sequelize")
mysql= require('mysql')
const db = new sequelize("todo-app","root","",{
  host:"localhost",
  dialect  : "mysql",
   define :
   {
     timestamps: false
    }
  // operatorsAliases: false,
  // pool: {
  //   max: 5,
  //   min: 0,
  //   acquire: 30000,
  //   idle: 10000
  // }
})


//test db
db.authenticate()
  .then(()=>console.log("Database connected"))
  .catch((err)=>console.log("error"+err))

  module.exports = db