require('dotenv').config()
const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL_NODE)
console.log('Connected to PlanetScale!')
connection.end()