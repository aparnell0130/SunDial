require('dotenv').config(); // this is important!

module.exports = {
  "development": {
    "username": "root",
    "password": process.env.DB_PASS || "password",
    "database": "sundial",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "sundial",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
}
