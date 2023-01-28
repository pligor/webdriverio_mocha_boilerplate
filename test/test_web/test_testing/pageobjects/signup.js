const Screen = require('./screen');
const VerifyAccountScreen = require('./verify_account');
const { naturally_fill_pmtool_input } = require('../conftest');
const { get_random_name, get_random_email, get_random_numbers_fast } = require('../../../helpers/random_helpers')
const DashboardHeader = require('./components/dashboard_header');
const verify_account = require('./verify_account');


/**
 * sub page containing specific selectors and methods for a specific page
 */
class SignupScreen extends Screen {
    // define selectors using getter methods

    constructor(name = '', email = '', password = '', company=null, address=null) {
        super();
        this.name = name
        this.email = email
        this.password = password
        this.company = company
        this.address = address
    }

    get name_field() {
        return $('input#fullName')
    }
    get label_name() {
        return $('label[for="fullName"]')
    }
    get email_field() {
        return $('input#email')
    }
    get label_email() {
        return $('label[for="email"]')
    }
    get password_field() {
        return $('input#password')
    }
    get label_password() {
        return $('label[for="password"]')
    }
    get company_field() {
        return $('input#company')
    }
    get label_company() {
        return $('label[for="company"]')
    }
    get address_field() {
        return $('input#address')
    }
    get label_address() {
        return $('label[for="address"]')
    }
    get city_field() {
        return $('input#city')
    }
    get signup_action() {
        return $("button[name='action']")
    }
    get name_error_message() {
        return $('.row:nth-of-type(1) .invalid-feedback');
    }
    get email_error_message() {
        return $('.row:nth-of-type(2) .invalid-feedback');
    }
    get password_error_message() {
        return $('.row:nth-of-type(3) .invalid-feedback');
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        super.open('signup');
    }

    static random() {
        const signup_screen = new SignupScreen(`${get_random_name(5)} ${get_random_name(8)}`,
            get_random_email('pligor.george+', 'gmail.com'),
            `${get_random_name(6)}${get_random_numbers_fast(2)}`,
            get_random_name(5),
            get_random_name(5))

        console.log('Signup screen with random values was generated', signup_screen);

        return signup_screen
    }


    async register_new_user() {
        console.log('Registering user:', this)

        await DashboardHeader.visit_signup()
        await this.fill_signup_form()
        await this.assert_signup_form()
        const verify_account_screen = await this.submit_signup()
        await verify_account_screen.assert_successful_account()
    }

    async fill_signup_form() {
        await naturally_fill_pmtool_input(this.label_name, this.name_field, this.name)
        await naturally_fill_pmtool_input(this.label_email, this.email_field, this.email)
        await naturally_fill_pmtool_input(this.label_password, this.password_field, this.password)
        await naturally_fill_pmtool_input(this.label_company, this.company_field, this.company)
        await naturally_fill_pmtool_input(this.label_address, this.address_field, this.address)
    }

    async assert_signup_form() {
        await expect(this.name_field).toHaveValue(this.name)
        await expect(this.email_field).toHaveValue(this.email)
        await expect(this.password_field).toHaveValue(this.password)
        await expect(this.company_field).toHaveValue(this.company)
        await expect(this.address_field).toHaveValue(this.address)
        await expect(this.signup_action).toBeDisplayedInViewport()
    }

    async submit_signup() {
        await this.signup_action.click()
        return VerifyAccountScreen;
    }
}

module.exports = {
    signup_screen: new SignupScreen(),
    SignupScreen,
}
