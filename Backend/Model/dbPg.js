//Database Setup

//Import Statements
const { Client } = require ('pg');
const fs = require('fs');
require('dotenv/config')

//Database PG Credentials
const client = new Client({
    host: process.env.host,
    user: process.env.user,
    port: process.env.port,
    password: process.env.password,
    database: process.env.database,
    sslmode: process.env.sslmode,
    ssl: {
        cert: fs.readFileSync('./Certificate/BaltimoreCyberTrustRoot.crt.pem'),
        rejectUnauthorized: true
    }
})

module.exports = client