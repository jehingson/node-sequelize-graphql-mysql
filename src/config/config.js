require('dotenv').config()

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME || "root",
    "password": process.env.PASSWORD || "root",
    "database": process.env.DB_NAME || "hydro",
    "host": process.env.DB_HOSTNAME || "127.0.0.1",
    "dialect": process.env.DB_SYSTEM || "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }

}
