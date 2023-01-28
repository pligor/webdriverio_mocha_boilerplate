const Screen = require('./screen');


/**
 * sub page containing specific selectors and methods for a specific page
 */
class VerifyAccountScreen extends Screen {
    path = 'verifyAccount'

    /**
     * define selectors using getter methods
     */

    get verify_title () { //DO NOT CALL THIS AS A FUNCTION
        return $('.card-title');
    }

    get verify_content () {
        return $('.card-content p');
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        throw new Error("This method should only be implemented if testing whether the screen is directly accessible which it shouldn't");
        return super.open(this.path);
    }

    async assert_successful_account() {
        console.log('asserting that verify account is rendered successfully informing the user whether');
        await expect(browser).toHaveUrlContaining(`/${this.path}`)
        await expect(this.verify_title).toBeDisplayedInViewport()
        await expect(this.verify_title).toHaveText('Verify your account')
        await expect(this.verify_content).toBeDisplayedInViewport()
    }
}

module.exports = new VerifyAccountScreen();
