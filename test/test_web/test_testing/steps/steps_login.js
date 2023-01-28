const DashboardHeader = require('../pageobjects/components/dashboard_header')

const step_assert_we_are_logged_in = async () => {
    await DashboardHeader.assert_menu_items()
}

const step_assert_we_are_logged_out = async() => {
    await DashboardHeader.assert_logged_out_menu_items();
}

module.exports = {
    step_assert_we_are_logged_in,
    step_assert_we_are_logged_out,
}