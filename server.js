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
const detailsRoute = require('./routes/detailsRoute'); //Use the variable detailsRoute to store the required resource. 
const utilities = require('./utilities/');

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
app.get("/", utilities.handleErrors(baseController.buildHome))
// Inventory routes
app.use("/inv", inventoryRoute) 
app.use("/inv", detailsRoute) 
// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Looks like our website is out for a spin! Check back in a bit!'})
})

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  if(err.status == 404){ message = err.message
  } else {message = 'Oops! Our server is having a meltdown—kind of like a car with no oil. Hang tight while we cool things down!'}
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message, 
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
