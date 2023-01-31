
// This will run all tests
// npx wdio run test/test_web/test_saphetor/wdio.conf.saphetor.js
describe('Saphetor Test Challenge', () => {
    it.only('Verify that ...........................................', async () => {
        await browser.url(browser.options.baseUrl)

        const accept_cookies_button = $('button#onetrust-accept-btn-handler')
        await expect(accept_cookies_button).toBeDisplayedInViewport()

        // const user = (await users)['valid']

        // await LoginScreen.login(user)

        // await step_assert_we_are_logged_in()

        // await DashboardScreen.assert_is_rendered()

        // console.log(`Verify that if a user is already logged in and attempts to navigate to the dashboard screen, then the user will be allowed to have access to the dashboard screen, namely that the login state is preserved`)
        
        // await DashboardScreen.access_for_logged_in_user()

        // await DashboardScreen.assert_is_rendered()

        // console.log('Verify that logging out of the Dashboard and attempting to access the Dashboard screen will redirect the user back to the login screen')

        // await dashboard_header.logout()

        // await DashboardScreen.access_for_logged_out_user()

        // await LoginScreen.assert_login_is_reset()

        // console.log('whatenver')

        await browser.pause(3000)
    })
})
