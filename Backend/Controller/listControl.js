//Import Statement
const client = require('../Model/dbPg')

const listControl = {
    userID: (req, res) => {
        const serialNumber = req.body.serialNumber;
        const userDeviceName = req.body.userDeviceName;
        const deviceID = req.body.deviceID;

        if( serialNumber != 'none' && userDeviceName != 'none' && deviceID != 'none' ){

            client.query(`SELECT "User_Device_Name", "Device_Type", "Serial_Number" FROM readings`,
                            (err, result) => {
                                if (!err) {
                                    res.end(JSON.stringify(result.rows));
                                } else {
                                    console.log(err.message);
                                }
                                client.end;
                            })
        }
    }
}

module.exports = listControl;