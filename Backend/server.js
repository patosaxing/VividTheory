//Import Statements
const express = require('express');
const app = express();
const cors = require('cors');
//const bodyParser = require('body-parser');

//Database PG Import
const client = require('./Model/dbPg');

//Middleware
app.use(cors());
app.use(express.json());

//Port Set-up
const port = 4000;

app.get('/userID', (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

//Database PG Connect
client.connect();

//Listening Port
app.listen(port, () => 
{
    console.log(`Application listening at http://localhost:${port}`)
})