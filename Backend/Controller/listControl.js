//Import Statement
const client = require('../Model/dbPg')

const listControl = {
    TotalWattage: (req, res) => {
        

            client.query(`SELECT SUM("readings"."Wattage") as "Wattage","readings"."DateTime" 
                            FROM readings 
                            GROUP BY "readings"."DateTime"
                            ORDER BY "readings"."DateTime"`,
                            (err, result) => {
                                if (!err) {
                                   return res.json(result.rows);
                                } 
                                // else {
                                //     console.log(err.message);
                                // }
                                client.end;
                            })
    },

    WattageBySerialNumber: (req, res) => {

        const serialNumber = req.params.serialNumber;

        client.query(`SELECT "readings"."Serial_Number", "readings"."DateTime", "readings"."Wattage" 
                        FROM readings
                        WHERE "readings"."Serial_Number" = '${serialNumber}'
                        ORDER BY "readings"."DateTime"`,
                        (err, result) => {
                            if (!err) {
                               return res.json(result.rows);
                            } 
                            // else {
                            //     console.log(err.message);
                            // }
                            client.end;
                        })
    },

    WattageByDeviceID: (req, res) => {

        const deviceID = req.params.deviceID;

        client.query(`select "readings"."Device_ID", "readings"."DateTime", "readings"."Wattage" 
                        from readings
                        where "readings"."Device_ID" = '${deviceID}'
                        order by "readings"."DateTime"`,
                        (err, result) => {
                            if (!err) {
                               return res.json(result.rows);
                            } 
                            client.end;
                        })
            
    }
}

module.exports = listControl;