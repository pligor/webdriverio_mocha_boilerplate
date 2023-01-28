const { SignupScreen } = require('../pageobjects/signup')


describe('User can Signup ', () => {
    it.only('Verify that the user can successfully signup after filling both required and optional fields', async () => {
        const signup_screen = SignupScreen.random()

        await signup_screen.register_new_user()
    })
})
