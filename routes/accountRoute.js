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

//Route to post registration
router.post('/registration',
  regValidate.validate.registrationRules(),
  regValidate.validate.checkRegData,
  utilities.handleErrors(accountController.registerAccount))

// Process the registration data
router.post("/registration",
    regValidate.validate.registrationRules(),
    regValidate.validate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  )

//Route to post login
router.post(
  "/login",
  regValidate.logValidate.loginRules(),
  regValidate.logValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
);

//Route to user page
router.get("/user", utilities.handleErrors(accountController.buildUser));

module.exports = router;