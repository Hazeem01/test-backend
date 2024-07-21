// This line imports the Express module. 
// Express is a popular Node.js framework used to build web applications and APIs. 
// The require function is used to include the Express library, which is installed via npm, "require" is similar to "import".
const express = require("express");

// This line imports the routes defined in a separate file located at ./routes/routes. 
// This file is expected to export an Express Router instance that contains various route definitions. 
// By modularizing routes, we're able to keep our main server file cleaner and more maintainable.
const routes =  require('./routes/routes');

// This line initializes an Express application by calling the express() function. 
// The resulting app object is an instance of an Express application, which you will use to define middleware and routes.
const app = express();

// This line adds a middleware function to the Express application that parses incoming requests with JSON payloads. 
// The express.json() middleware processes requests with a Content-Type header of application/json and makes the parsed data available in req.body.
app.use(express.json());

// This line mounts the imported routes at the /api path. 
// Any routes defined in the routes module will now be accessible under the /api path. 
// For example, if the routes module defines a route at /login, it will be accessible as /api/login.
app.use("/api", routes);

// This line starts the Express server and listens for incoming connections on port 3000. 
// The app.listen function takes two arguments: the port number and a callback function that is executed once the server starts. 
// The callback function logs a message to the console indicating that the server is running and listening on the specified port.
app.listen(3000, () => {
  console.log("Server listening on port 3000");
})
