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
app.get("/", function(req, res){  //The express application will watch the "get" object, within the HTTP Request, for a particular route.  //A JavaScript function that takes the request and response objects as parameters.
  res.render("index", {title: "Home"})//The "res" is the response object, while "render()" is an Express function that will retrieve the specified view - "index" - to be sent back to the browser.  
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
