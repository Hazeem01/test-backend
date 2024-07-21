// This line imports the Router function from the Express module. 
// The Router function is used to create a new router object that can handle routes separately from the main application. 
// This helps in organizing and modularizing route definitions.
const { Router } = require("express");

// This line imports a module located at ../controllers/controller. 
// This module is expected to export functions that act as route handlers (controllers). 
// These functions will be called when their respective routes are accessed.
const controller = require("../controllers/controller");

// This line creates a new instance of an Express router by calling the Router function. 
// The routes object will be used to define and group route handlers.
const routes = Router();


// This line defines a GET route at the path /welcome on the routes router. 
// When a GET request is made to /welcome, the welcome function from the controller module will be called to handle the request.
routes.get("/welcome", controller.welcome);

// This line defines a POST route at the path /login on the routes router. 
// When a POST request is made to /login, the login function from the controller module will be called to handle the request.
routes.post("/login", controller.login);

// This line exports the routes router object, making it available for import in other parts of the application. 
// This allows you to mount the routes object onto an Express application instance or another router just as we've done in the main file (app.js).
module.exports = routes;