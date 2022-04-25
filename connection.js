const {Client} = require('pg')

const client = new Client({


    host: "localhost",
    user: "postgres",
    port:  5432,
    password: "Ramram@04",
    database: "NeservicesPb"

})
// client.connect().then(res =>{
//     console.log("Database connected")
// }) .catch(err =>{
//   console.log("Database not connected")
// })

// client.connect();
client.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = client