const express = require("express");
const PORT = 2345;
const app = express();
require('dotenv').config();
const connection = require("./db");
const cors = require('cors');
app.use(cors('*'));
app.use(express.json());

const userRouter = require("./Routes/userRouter");
app.use("/user", userRouter);

// app.get("/register", function (req, res) {
//     connection.query("SELECT * FROM users", (err, result) => {
//         if (err) {
//             res.status(500).send("Internal Server Error");
//         } else {
//             res.status(200).json(result);
//         }
//     });
// });

app.post('/login', (req, res) => {
    const { emailid, password } = req?.body;
  console.log(req.body,"uuu")
    
    connection.query('SELECT * FROM users WHERE emailid = ? AND password = ?', [emailid, password], (err, result) => {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Internal Server Error');
      } else {
        if (result.length > 0) {
         
          res.status(200).json({ success: true, message: 'Login successful' });
        } else {
         
          res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
      }
    });
  });



app.post("/insert", function (req, res) {
    const data = req.body;
    connection.query("INSERT INTO users SET ?", data, (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.status(200).send("Data inserted successfully");
        }
    });
});

app.put("/update", function (req, res) {
    const data = ['zenith', 'zenith@gmail.com', 1];
    connection.query("UPDATE users SET username=?, emailid=? WHERE id=?", data, (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.status(200).send("Data Updated successfully");
        }
    });
});

app.delete("/delete/:id", function (req, res) {
    let users_id = req.params.id;
    connection.query("DELETE FROM users WHERE id=?", [users_id], (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.status(200).send("Data Deleted successfully");
        }
    });
});

app.listen(PORT, (err) => {
    if (err) {
        console.error("Error starting the server:", err);
    } else {
        console.log("App is listening on port", PORT);
    }
});

module.exports = connection;
