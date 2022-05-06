//Import Statements
const express = require('express');
const app = express();
const cors = require('cors');
//const bodyParser = require('body-parser');
//const dotenv = require('dotenv');

//Database PG Import
const client = require('./Model/dbPg');

//Middleware
app.use(cors());
app.use(express.json());

//Port Set-up
const port = 4000;

app.get('/userID', (req, res) => {
    try {
        const serialNumber = req.body.serialNumber;
        const userDeviceName = req.body.userDeviceName;
        const deviceID = req.body.deviceID;



    } catch (error) {
        
    }
})

//Database PG Connect
//client.connect();
//dotenv.config();

//Listening Port
app.listen(port, () => 
{
    console.log(`Application listening at http://localhost:${port}`)
})