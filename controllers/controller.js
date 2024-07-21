const fs = require('fs');
const path = require('path');

// This function checks if req.body is present and responds accordingly.
exports.welcome = (req, res) => {
  if (req.body) {
    return res.send("Body contained");
  }
  return res.send("Nothing in body");
};

exports.login = (req, res) => {
  const filePath = path.join(__dirname, "../Database/database.json");
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return res.status(500).json({ response: "Internal Server Error" });
    }

    try {
      const user = JSON.parse(data);
      if (user.username === req.body.username && user.password === req.body.password) {
        return res.json({ response: "Login successful" });
      }
      return res.json({ response: "Incorrect credentials" });
    } catch (err) {
      console.error('Error parsing JSON:', err);
      return res.status(500).json({ response: "Internal Server Error" });
    }
  });
};
