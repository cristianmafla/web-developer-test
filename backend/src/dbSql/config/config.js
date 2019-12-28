const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

module.exports = {
  development: {
    username: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB,
    host: process.env.HOST_DB,
    dialect: "mysql",
    operatorsAliases: false,
    logging: console.log
  },
  test: {
    username: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB,
    host: process.env.HOST_DB,
    dialect: "mysql",
    operatorsAliases: false,
    logging: false
  },
  production: {
    username: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB,
    host: process.env.HOST_DB,
    dialect: "mysql",
    operatorsAliases: false,
    logging: false
  }
}
