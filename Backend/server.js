//Import Statements
const express = require('express');
const app = express();
const cors = require('cors');
const listControl = require('./Controller/listControl')

//Database PG Import
const client = require('./Model/dbPg');

//Middleware
app.use(cors());
app.use(express.json());


//Port Set-up
const port = 4000;

//Routes GET and POST
app.get('/totalWattage', listControl.TotalWattage);
app.post('/wattageByDeviceID', listControl.WattageByDeviceID);
app.get('/filterOptions', listControl.FilterOptions);

//Database PG Connect
client.connect();

//Listening Port
app.listen(port, () => 
{
    console.log(`Application listening at http://localhost:${port}`)
})