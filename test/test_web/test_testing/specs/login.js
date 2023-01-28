const LoginScreen = require('../pageobjects/login')
const DashboardScreen = require('../pageobjects/dashboard').default
const {users} = require('../conftest')
const {step_assert_we_are_logged_in, step_assert_we_are_logged_out} = require('../steps/steps_login')
const dashboard_header = require('../pageobjects/components/dashboard_header')


describe('User can Login and Logout successfully', () => {
    it('Verify that using valid credentials in the Login screen will yield the dashboard screen of the app', async () => {
        await LoginScreen.open()

        const user = (await users)['valid']

        await LoginScreen.login(user)

        await step_assert_we_are_logged_in()

        await DashboardScreen.assert_is_rendered()

        console.log(`Verify that if a user is already logged in and attempts to navigate to the dashboard screen, then the user will be allowed to have access to the dashboard screen, namely that the login state is preserved`)
        
        await DashboardScreen.access_for_logged_in_user()

        await DashboardScreen.assert_is_rendered()

        console.log('Verify that logging out of the Dashboard and attempting to access the Dashboard screen will redirect the user back to the login screen')

        await dashboard_header.logout()

        await DashboardScreen.access_for_logged_out_user()

        await LoginScreen.assert_login_is_reset()

        console.log('whatenver')
    })
})
