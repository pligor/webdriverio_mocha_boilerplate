/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Screen {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        const base_url = browser.options.baseUrl;
        return browser.url(`${base_url}/${path}`)
    }
}
