const connection = require("../db")

const registerUser =async(req, res) => {
  try {
    console.log("Request body:", req);
    const { username, emailid, password } = req.body;

    const query = `INSERT INTO users(username, emailid, password) 
    VALUES(?, ?, ?)`;
    const values = [username, emailid, password];

    connection.query(query, values, (err, result) => {
      if (err) {
        console.error("Error inserting user:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        console.log("User created:", result);
        res.status(200).json({ message: "User created", result });
      }
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports ={
  registerUser,
};
