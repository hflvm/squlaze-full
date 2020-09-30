const db = require("../config/database")
const sequelize = require("sequelize")

const User = db.define('users',{
  UserName:{
    type:sequelize.STRING
  },
  Password:{
    type:sequelize.STRING
  },
  Email:{
    type:sequelize.STRING
  },
  Phone:{
    type:sequelize.STRING
  },
  Address:{
    type:sequelize.TEXT
  },
  Date:{
    type:sequelize.DATE
 }
})

module.exports= User
