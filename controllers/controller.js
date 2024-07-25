const mysql = require('mysql');
const db = require("../dbConnection");
const bcrypt = require('bcrypt');

module.exports = {
  // This function checks if req.body is present and responds accordingly.
  welcome: (req, res) => {
    if (req.body) {
      return res.send("Body contained");
    }
    return res.send("Nothing in body");
  },

  createUser: (req, res) => {
    const { first_name, last_name, password, email } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = { first_name, last_name, password: hashedPassword, email };

    let sql = "INSERT into user_table SET ?";
      let query = db.query(sql, user, (err, result) => {
        if (err) {
          if (err.errno == 1062) {
            return res.status(500).json({ message: "A user already exists with this email" });
          }
          res.status(500).json({ message: "An error occured..." });
          throw err;
        }
        return res.status(201).json({ message: "User created !" });
      })
  },

  getUsers: (req, res) => {
    let sql = "SELECT * FROM `user_table`";

    try {
      let query = db.query(sql, (err, result) => {
        if (err) {
          throw err;
        }
        return res.status(200).json({ message: result });
      })
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occured..." });
      throw error;
    }
  },

  login: (req, res) => { //controller function accepting 2 parameters
    const { email, password } = req.body; //req is object(params, headers etc from postman), bodys is keys from user data
    sql = `SELECT * FROM user_table WHERE email='${email}'`;
    let query = db.query(sql, (err, user_info) => {
      if (err) {
        res.status(500).json({ message: "An error occured..." });
        throw err;
      }
      const result = bcrypt.compareSync(password, user_info[0].password)
      if (result) {
        return res.status(200).json({ message: user_info });
      }
      return res.status(400).json({ message: "Wrong password!" });
    })
  },

  deleteUser: async (req, res) => { // async needs to be at parent function for await to work 
    const email = req.body.email;
    sql = `SELECT * FROM user_table WHERE email= '${email}'`;
    let query = await db.query(sql, (err, user_info) => { //add await here when operation takes more time
      if (err) {
        res.status(500).json({ message: "An error occured"});
        throw err;
      }
      if (user_info.length == 0){
        return res.status(400).json({message: "User does not exist"});
      }
      let deleteQuery = `DELETE FROM user_table WHERE id = '${user_info[0].id}'`; 
      let query = db.query(deleteQuery, (err, result) => { //query data using delete query command 
        if (err) {
          return res.status(500).json({message: "An error occured"});
        }
      })
      res.status(200).json({ message: "User deleted successfully "});
    })
  },

  update: (req, res) => {
    const id = req.body.id;
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    sql = `SELECT * FROM user_table WHERE id= '${id}'`;
    let query = db.query(sql, (err, user_info) => {
      if (err) {
        res.status(500).json({message: "An error occured"});
        throw err;
      }
      if (user_info.length == 0){
        return res.status(400).json({message: "User does not exist"});
      }
      let updateQuery =  `UPDATE user_table SET first_name = '${req.body.first_name}', last_name = '${req.body.last_name}', password = '${hashedPassword}', email = '${req.body.email}'WHERE id = '${user_info[0].id}'`;
      let query = db.query(updateQuery, (err, result) => { //query data using delete query command 
        if (err) {
          return res.status(500).json({message: "An error occured"});
        }
      })
      res.status(200).json({ message: "User updated successfully "});
    })
  }
}