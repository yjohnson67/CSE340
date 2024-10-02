/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express") //imports the express package
const expressLayouts = require('express-ejs-layouts')
const env = require("dotenv").config()
const app = express() //creates the "application"
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const inventoryRoute = require('./routes/inventoryRoute'); //Use the variable inventoryRoute to store the required resource. 
const utilities = require('./utilities/index');

/* ***********************
 * view engine and templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root

/* ***********************
 * Routes
 *************************/
//Notice that instead of router.use, it is now app.use, meaning that the application itself will use this resource.
app.use(static)
//Index route
app.get("/", baseController.buildHome)
// Inventory routes
app.use("/inv", inventoryRoute)  
// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message: err.message,
    nav
  })
})

/* ***********************
 * Local Server host name and port are defined
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
