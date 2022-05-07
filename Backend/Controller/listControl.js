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

    },

    FilterOptions: async (req, res) => {
        const deviceIDQuery = await client.query({
            rowMode: 'rowMode',
            text: `SELECT DISTINCT "readings"."Device_ID"
                   FROM readings`
        })
        let deviceIds = deviceIDQuery.rows.map(s => {
            return s.Device_ID;
        });

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

module.exports = listControl;