const mysql = require("mysql");
require("dotenv").config(); // Load variables from .env file

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT, // Add this line to specify the port
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});




const userSchema = `create table if not exists users (
  id int auto_increment primary key ,
  username varchar(20) not null,  
  emailId varchar(30) not null,
  password varchar(20) not null,
  unique key unique_email (emailId)
)`;




connection.query(userSchema, (error)=>{
  try {
    if (error){
      console.log("err",error)
    throw new Error("user table is not created");}
    console.log(` user table is  created`);
  } catch (error) {
    
    console.log("eRROOOO", error);
  }
})
// connection.end();

module.exports = connection;

