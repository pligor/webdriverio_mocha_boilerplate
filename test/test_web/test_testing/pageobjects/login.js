const Screen = require('./screen');
const { naturally_fill_pmtool_input } = require('../conftest');


/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginScreen extends Screen {
    /**
     * define selectors using getter methods
     */

    get login_label_email () { //DO NOT CALL THIS AS A FUNCTION
        return $("[for='email']");
    }

    get email_field () {
        return $("input#email");
    }

    get login_label_password () {
        return $("[for='password']");
    }

    get password_field () {
        return $('input#password');
    }

    get login_button () {
        return $("button[name='action']");
    }

    get login_email_error() {
        return $(".s12 .row:nth-of-type(1) .invalid-feedback")
    } 

    get login_password_error() {
        return $(".row:nth-of-type(2) .invalid-feedback")
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('login');
    }

    async login(user) {
        console.log('Logging in with user:', user)

        // await this.email_field.setValue(user.email);

        await naturally_fill_pmtool_input(this.login_label_email, this.email_field, user.email)

        await naturally_fill_pmtool_input(this.login_label_password, this.password_field, user.password)

        await expect(this.login_button).toBeDisplayedInViewport()

        await this.login_button.click()
    }

    async assert_login_is_reset() {
        console.log('asserting login form is reset')

        await expect(browser).toHaveUrlContaining('/login');

        await expect(this.email_field).toHaveValue('')
        await expect(this.password_field).toHaveValue('')
    
        await expect(this.login_button).toBeDisplayed()
    }
}

module.exports = new LoginScreen();
