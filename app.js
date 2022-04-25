const client = require("./connection.js");
const express = require("express");
const cors = require("cors");
const app = express();
const moment = require('moment');

app.listen(3400, () => {
  console.log("Server is now listening at port 3400");
});

app.use(express.json());
app.use(cors());


// app.get("/home", async (req, res) => {
//   res.send(data);

//  // return client.query(select * from "eservices" join "eservicesdetail" on "eservicesdetail"."servicecode" = "eservices"."servicecode", (err, data) => {
//     // console.log(err, res);
//     if(data){
//       return res.send(data);
//     }
//     else{
//       console.log(err);
//     }
//   });

app.get("/home", (req, res) => {
  return client.query("SELECT * FROM eservicesdetail", (err, result) => {
    if (!err) {
      console.log(result.rows);
      return res.send(result.rows);
    }
  });
  client.end;
});


app.post("/users", (req, res) => {
  //console.log(req.body.launch_date);
 // console.log(moment(req.body.launch_date).format("YYYY-MM-DD"))
 console.log(req.body.DepartmentName)
  console.log(req.body.ServiceName)
  console.log(req.body.MajorVersion)
  console.log(req.body.MinorVersion)
  console.log(req.body.Description)
  console.log(req.body.servicelink)
  console.log(moment(req.body.launch_date).format("YYYY-MM-DD"))

  Promise.all([
  // client.query(`Insert into sp_departmentmaster(departmentname) values('${req.body.DepartmentName}')`),
   //client.query(`Insert into sp_servicemaster(servicename) values('${req.body.ServiceName}')`),
   //client.query(`Insert into eservices(majorversion,minorversion,description,serviceslink) values('${req.body.MajorVersion}','${req.body.MinorVersion}','${req.body.Description}','${req.body.servicelink}')`),
   //client.query(`Insert into eservicesdetail(launch_date) values('${moment(req.body.launch_date).format("YYYY-MM-DD")}')`),
   client.query(`Insert into eservicesdetail(departmentname,servicename,majorversion,minorversion,servicelink,launch_date,description) 
                 values('${req.body.DepartmentName}','${req.body.ServiceName}','${req.body.MajorVersion}','${req.body.MinorVersion}',
                        '${req.body.servicelink}','${moment(req.body.launch_date).format("YYYY-MM-DD")}',
                        '${req.body.Description}')`),
client.query(`Insert into sp_departmentdetail(departmentname,servicename,launch_date) values('${req.body.DepartmentName}',
              '${req.body.ServiceName}','${moment(req.body.launch_date).format("YYYY-MM-DD")}')`),
client.query(`Insert into sp_servicedetail(servicename,departmentname,launch_date) values('${req.body.ServiceName}',
               '${req.body.DepartmentName}','${moment(req.body.launch_date).format("YYYY-MM-DD")}')`),



  ]).then(result =>{
    if(result){
      console.log("result",result)
    }
  }).catch(err =>{
    console.log("-er",err)
    return res.send({message:"Something went wrong"})
  }) 
});


app.get('/getJson', function (req, res) {
  console.log(req.body.cars);
});