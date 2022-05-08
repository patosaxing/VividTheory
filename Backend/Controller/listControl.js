//Import Statement
const client = require('../Model/dbPg')

const listControl = {
    //Total Wattage function and PostGre Query 
    TotalWattage: (req, res) => {


        client.query(`SELECT SUM("readings"."Wattage") as "Wattage","readings"."DateTime" 
                            FROM readings 
                            GROUP BY "readings"."DateTime"
                            ORDER BY "readings"."DateTime"`,
            (err, result) => {
                if (!err) {
                    return res.json(result.rows);
                }
                client.end;
            })
    },

    //Wattage By Device ID Function and PostGre Query
    WattageByDeviceID: (req, res) => {

        const deviceID = req.body.deviceIds;
        const serialNumber = req.body.serialNumber;
        
        console.log(serialNumber, deviceID)

        client.query(`SELECT "readings"."Device_ID", "readings"."DateTime", "readings"."Wattage" 
                        FROM readings
                        WHERE "readings"."Device_ID" = '${deviceID}'
                        AND "readings"."Serial_Number" = '${serialNumber}'
                        ORDER by "readings"."DateTime"`,
            (err, result) => {
                if (!err) {
                    return res.json(result.rows);
                }
                client.end;
            })

    },

    //Filter Options Function depending on what is selected
    FilterOptions: async (req, res) => {
        /*Function for Serial Numbers and PostGre Query that Filters
          the Device ID */
        const deviceIDQuery = await client.query({
            rowMode: 'rowMode',
            text: `SELECT DISTINCT "readings"."Device_ID"
                   FROM readings
                   WHERE "readings"."Device_ID" = 'mains'
                   OR "readings"."Device_ID" = 'always_on'`
                   
        })
        let deviceIds = deviceIDQuery.rows.map(s => {
            return s.Device_ID;
        });

        /*Function for Serial Numbers and PostGre Query that Selects
          the Serial Number */
        const serialNumbers = await client.query({
            rowMode: 'rowMode',
            text: `SELECT DISTINCT "readings"."Serial_Number"
                                FROM readings`
        });

        let digits = serialNumbers.rows.map(s => {
            return s.Serial_Number;
        });

        client.end;
        return res.json({
            deviceIds: deviceIds,
            serialNumbers: digits,
        });
    }
}

//Exports the List Control Function
module.exports = listControl;