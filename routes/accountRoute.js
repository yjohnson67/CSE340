// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")

//Move to the view for My Account page
router.get("/login", accountController.buildLogin);

module.exports = router;