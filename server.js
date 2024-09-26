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
