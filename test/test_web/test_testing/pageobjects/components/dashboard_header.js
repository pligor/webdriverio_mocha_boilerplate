class DashboardHeader {
    // logged in

    get login_label_email () {
        return $("[for='email']");
    }

    get logout_menu_link() {
        return $("a#logout")
    }

    get dashboard_menu_link() {
        return $("a#dashboard")
    }

    get task_db_menu_link() {
        return $("a#task_db")
    }

    get settings_menu_link() {
        return $("a#settings")
    }

    async assert_menu_items() {
        await expect(this.logout_menu_link).toHaveText('Logout');
        await expect(this.dashboard_menu_link).toHaveText('Dashboard');
        await expect(this.task_db_menu_link).toHaveText('TaskDB');
        await expect(this.settings_menu_link).toHaveText('Settings');
    }

    async logout() {
        await this.assert_menu_items();
        await this.logout_menu_link.click();
    }

    // logged out

    get login_menu_button() {
        return $("a#login")
    }

    get signup_menu_button() {
        return $("a#signup")
    }

    async assert_logged_out_menu_items() {
        await expect(this.login_menu_button).toBeDisplayedInViewport();
        await expect(this.signup_menu_button).toBeDisplayedInViewport();
    }

    async visit_signup() {
        await browser.url(browser.options.baseUrl)
        await this.signup_menu_button.click()
    }
}

module.exports = new DashboardHeader();
