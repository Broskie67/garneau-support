const mysql = require('mysql2/promise')
const dotenv = require('dotenv')

dotenv.config()

async function createDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  })

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`
  )

  await connection.end()
}

module.exports = createDatabase