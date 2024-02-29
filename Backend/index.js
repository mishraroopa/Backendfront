const express = require("express");
const PORT = 2345;
const app = express();
const jwt = require('jsonwebtoken');
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

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    await connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).send('Internal Server Error');
        } else {
            if (result.length > 0) {
                const userid = result[0].id;
                const username = result[0].name;
                jwt.sign({ userid,username }, process.env.JWT_KEY, { expiresIn: "2h" }, (err, token) => {
                    if (err) {
                        res.send({ result: 'something went wrong' });
                    }
                    else{
                        console.log(token)
                        res.status(200).json({ auth: token });
                    }
                   
                });
                // res.status(200).json({ success: true, message: 'Login successful', });
            } else {
                res.status(401).json({ success: false, message: 'Invalid email or password' });
            }
        }
    });
});

app.post("/register", function (req, res) {
    const { username, email, password } = req.body;

   
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide username, email, and password' });
    }

   
    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    const values = [username, email, password];

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting user data:', err);
            res.status(500).send("Internal Server Error");
        } else {
            res.status(201).json({ success: true, message: 'User registered successfully' });
        }
    });
});

//profile

app.get(`/profile/:id`, function(req, res) {
    const Query = "SELECT id, username, email FROM users WHERE id = ?";
    connection.query(Query, [req.params.id], (err, results) => {
        if (err) {
            console.error('Error retrieving user profile:', err);
            return res.status(500).json({ message: 'Error retrieving user profile' });
        }
        try {
            if (results.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            const user = results[0];
            const profile = {
                id: user.id,
                username: user.username,
                email: user.email
            };
            res.json(profile);
        } catch (error) {
            console.error('Error processing user profile:', error);
            res.status(500).json({ message: 'Error processing user profile' });
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

app.put("/update/:id", function (req, res) {
    const id = req.params.id;
    const { username, email } = req.body; 

    const data = [username, email, id];

    connection.query("UPDATE users SET username = ?, email = ? WHERE id = ?", data, (err, result) => {
        if (err) {
            console.error("Error updating user:", err);
            res.status(500).send("Internal Server Error");
        } else {
            console.log("Data Updated successfully");
            res.status(200).send("Data Updated successfully");
        }
    });
});


app.delete("/delete", function (req, res) {
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
