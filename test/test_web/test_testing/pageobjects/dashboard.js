

import Screen from './screen';
const {step_assert_we_are_logged_in, step_assert_we_are_logged_out} = require('../steps/steps_login')


class DashboardScreen extends Screen {
    /**
     * define selectors using getter methods
     */

    get create_project_button() { return $(".s12 >  .btn.waves-effect.waves-light") }
    get single_project_title() { return $(".card-title") }
    get single_project_description() { return $(".card-content > p") }
    get project_cards() { return $$(".card") }
    get single_project_edit_button() { return $("#btn_update_project") }
    get single_project_delete_button() { return $("#delete_project") }
    get single_project_add_task_button() { return $("#btn_add_task") }
    get single_project_view_tasks_button() { return $("#btn_view_tasks") }

    async assert_is_rendered() {
        await expect(browser).toHaveUrlContaining('/dashboard');

        await expect(this.create_project_button).toBeDisplayed()
        await expect(this.create_project_button).toHaveTextContaining('CREATE');
    }

    async access_for_logged_in_user() {
        await step_assert_we_are_logged_in()
        await this.open()
    }

    async access_for_logged_out_user() {
        await step_assert_we_are_logged_out()
        await this.open()
    }

    async open() {
        await super.open('dashboard')
    }
}

export default new DashboardScreen()
