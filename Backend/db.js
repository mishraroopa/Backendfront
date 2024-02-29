const mysql = require("mysql");
require("dotenv").config(); 

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT, 
  database:process.env.DB_NAME,
  
 

  
 
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

 
connection.query("CREATE DATABASE IF NOT EXISTS signup", (error) => {
    if (error) {
      console.error("Error creating database:", error);
      return;
    }
    console.log("Database created successfully");
  });


const userSchema = `CREATE TABLE IF NOT EXISTS users (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(20) NOT NULL
   
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

