const pool = require("../database/")

/* *****************************
*   Register new account
* *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password){
    try {
      const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"
      return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
    } catch (error) {
      return error.message
    }
  }

/* **********************
 *   Check for existing email
 * ********************* */
async function checkExistingEmail(account_email){
  try {
    const sql = "SELECT * FROM account WHERE account_email = $1"
    const email = await pool.query(sql, [account_email])
    return email.rowCount
  } catch (error) {
    return error.message
  }
}

/* *****************************
* Return account data using email address
* ***************************** */
async function getAccountByEmail (account_email) {
  try {
    const result = await pool.query(
      'SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_email = $1',
      [account_email])
    return result.rows[0]
  } catch (error) {
    return new Error("No matching email found")
  }
}

/* *****************************
* Return User data for Log in
* *************************** */
async function accountLogin(account_email, account_password) {
  try {
    const sql = "SELECT * FROM account WHERE account_email = $1";
    const result = await pool.query(sql, [account_email]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(account_password, user.account_password);
      if (passwordMatch) {
        return user;
      }
    }
    return null;
  } catch (error) {
    return error.message;
  }
}

module.exports = {registerAccount, checkExistingEmail, accountLogin, getAccountByEmail}