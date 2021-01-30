require("dotenv").config(); // this is important!

module.exports = {
  development: {
    // username: process.env.DB_USER || "root",
    // password: process.env.DB_PASS || "password",
    username: "root",
    password: "6Japan9!",
    database: "sundial",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "sundial",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    // eslint-disable-next-line camelcase
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql"
  }
};
