const os = require('os');
const assert = require('assert');
const msecBETWEEN_KEYBOARD_KEYS = 50;
const { sleep } = require('./node_helpers');

const isClickable = async (element) => {
    const is_disabled = await element
}

const send_keys = async (elem, characters, naturalSpeed = false, delayMsBetweenKeys = msecBETWEEN_KEYBOARD_KEYS) => {
    assert(characters.length > 0, "use non empty strings as input, otherwise use safeClearInputElement directly");

    if (naturalSpeed) {
        await browser.pause(delayMsBetweenKeys);
        for (let curChar of characters) {
            elem.addValue(curChar);
            await browser.pause(delayMsBetweenKeys);
        }
    } else {
        elem.addValue(characters);
    }
}

const safe_clear_input_element = async (elem) => {
    await expect(elem).toBeExisting()
    await expect(elem).toBeFocused()

    const os_base = os.platform().toLowerCase()

    const sel_all = [(os_base === 'darwin' ? Key.Command : Key.Control), 'A']

    await browser.keys(sel_all)
    await browser.keys(Key.Delete)

    //redundant supposingly but better be both implicit and explicit
    await elem.clearValue()

    await expect(elem).toHaveValue('')
}

const Key = {
    /**
     * Special control key that works cross browser for Mac, where it's the command key, and for
     * Windows or Linux, where it is the control key.
     */
    Ctrl: "WDIO_CONTROL",
    NULL: "",
    Cancel: "",
    Help: "",
    Backspace: "",
    Tab: "",
    Clear: "",
    Return: "",
    Enter: "",
    Shift: "",
    Control: "",
    Alt: "",
    Pause: "",
    Escape: "",
    Space: "",
    PageUp: "",
    PageDown: "",
    End: "",
    Home: "",
    ArrowLeft: "",
    ArrowUp: "",
    ArrowRight: "",
    ArrowDown: "",
    Insert: "",
    Delete: "",
    Semicolon: "",
    Equals: "",
    Numpad0: "",
    Numpad1: "",
    Numpad2: "",
    Numpad3: "",
    Numpad4: "",
    Numpad5: "",
    Numpad6: "",
    Numpad7: "",
    Numpad8: "",
    Numpad9: "",
    Multiply: "",
    Add: "",
    Separator: "",
    Subtract: "",
    Decimal: "",
    Divide: "",
    F1: "",
    F2: "",
    F3: "",
    F4: "",
    F5: "",
    F6: "",
    F7: "",
    F8: "",
    F9: "",
    F10: "",
    F11: "",
    F12: "",
    Command: "",
    ZenkakuHankaku: "",
};


module.exports = {
    safe_clear_input_element,
    send_keys,
}


