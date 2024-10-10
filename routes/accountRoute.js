// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')

//Move to the view for My Account page
router.get("/login", accountController.buildLogin);

//Route to the Registration view
router.get('/registration', utilities.handleErrors(accountController.buildRegistration));

//Route to post Registration
router.post('/register', utilities.handleErrors(accountController.registerAccount))

// Process the registration data
router.post("/registration",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  )

module.exports = router;