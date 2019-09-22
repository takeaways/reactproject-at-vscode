const env = require('dotenv');
env.config();

module.exports = {
  development: {
    username:"root",
    password:process.env.DB_PASSWORD,
    database:"talkwithyou",
    host:"127.0.0.1",
    dialect:"mysql",
    operatorsAliases:false
  },
  test: {
    username:"root",
    password:"null",
    database:"database_test",
    host:"127.0.0.1",
    dialect:"mysql",
    operatorsAliases:false
  },
  production: {
    username:"root",
    password:"null",
    database:"database_production",
    host:"127.0.0.1",
    dialect:"mysql",
    operatorsAliases:false
  }
}