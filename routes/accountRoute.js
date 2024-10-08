// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/index")
const accountController = require("../controllers/accountController")

//Move to the view for My Account page
router.get("login/:user", accountController.buildLogin);

module.exports = router;