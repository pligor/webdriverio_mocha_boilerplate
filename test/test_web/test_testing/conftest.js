const {read_csv} = require("../../helpers/csv_helpers");
const {safe_clear_input_element, send_keys} = require("../../helpers/wdio_mocha_helpers");

const ENVIRONMENT_VARIABLE_NAME = "ENVIRONMENT";

const environments = {  // TODO note that the dev, staging, and production environments are imaginary and will not work
    'dev': 'https://dev-node-fs-app.herokuapp.com',
    'test': 'https://node-fs-app.herokuapp.com',
    'staging': 'https://staging-node-fs-app.herokuapp.com',
    'production': 'https://prod-node-fs-app.herokuapp.com',
};

const currentEnvironmentName = () => {
    const hostName = process.env[ENVIRONMENT_VARIABLE_NAME];

    if (hostName) {
        const host_name = hostName.toLowerCase()
        if (!environments[host_name]) {
            throw new Error(
                `${ENVIRONMENT_VARIABLE_NAME} environment variable needs to have one of these values: ${Object.keys(environments)}`
            );
        }

        return host_name
    } else {
        throw new Error(
            `You need to define Environment variable with name ${ENVIRONMENT_VARIABLE_NAME}\nFor example in command line: ${ENVIRONMENT_VARIABLE_NAME}=test <the command follows here>`
        );
    }
};

const users = read_csv(__dirname + `/users/${currentEnvironmentName()}_users.csv`)

const naturally_fill_pmtool_input = async (label_elem, field_elem, characters) => {
    await label_elem.click()

    // expect.element(label_elem).to.have.attribute('class').which.contains('active');
    await expect(label_elem).toHaveAttributeContaining('class', 'active')

    // const value = await field_elem.getAttribute('value');
    const value = await field_elem.getValue();

    if(!(value === '')) {
        await field_elem.click()
        await safe_clear_input_element(field_elem)
    }

    await send_keys(field_elem, characters, true)
}

module.exports = {
    users,
    naturally_fill_pmtool_input,
}

