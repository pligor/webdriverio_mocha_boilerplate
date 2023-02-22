// import { browser, $, $$, expect } from '@wdio/globals';
const os = require("os");
const assert = require("assert");
const msecBETWEEN_KEYBOARD_KEYS = 50;
const { sleep, writeArrayToFile, getMethods } = require("./node_helpers");

/**
 * Is value from promise evaluated to be the same for the last xx times ? Given that this is checked by a yy interval for no longer than zz msecs
 * @param {*} promise_wrapper a function returning a promise that an await will be called upon it and needs to be the value that will be evaluated
 * @param {*} minlen how many concurrent calls the promise wrapper needs to be stable
 * @param {*} interval how frequently the value of the promise will be checked
 * @param {*} timeout after how many milliseconds the loop will be stopped as failure
 * @param {*} timeoutMsg what message will be displayed if the timeout is reached
 * @returns promise, which means it will need an await to be called upon it
 */
const wait_to_stabilize = (
  promise_wrapper,
  minlen = 10,
  interval = 1000,
  timeout = 20000,
  timeoutMsg = null
) => {
  const prevs = [];

  return browser.waitUntil(
    async () => {
      const current = await promise_wrapper();
      prevs.push(current);

      if (prevs.length < minlen) {
        console.log("prevs length is", prevs.length);
        return false;
      } else {
        console.log(prevs);
        return prevs.slice(-minlen).every((prev) => prev === current);
      }
    },
    {
      timeout: timeout,
      timeoutMsg:
        timeoutMsg ||
        `Promise was expected to be steady for ${minlen} times and be found steady, instead the timeout of ${timeout}msec was reached`,
      interval: interval,
    }
  );
};

const is_topmost_element = async (element) => {
  const loc = await element.getLocation();
  const size = await element.getSize();
  // console.log(`info: `, loc, size)
  // console.log('sel', await element.selector)

  //if you think about it, because width and height cannot be decimals
  //division by 2 when 0 or 1 using Math.floor is zero
  //division by 2 when 0 or 1 using Math.ceil is 0 or 1 correspondingly, which both fall within the boundaries of the box
  const halfWidth = Math.floor(size.width / 2);
  const halfHeight = Math.floor(size.height / 2);
  const obj = await browser.execute(
    (xx, yy, half_width, half_height) =>
      document.elementFromPoint(xx + half_width, yy + half_height),
    loc.x,
    loc.y,
    halfWidth,
    halfHeight
  );
  const vals = Object.values(obj);
  assert(vals.length == 1, "The returned objects is expected to be 1");
  const elem_id_at_location = vals[0];
  const elem_id = await element.elementId;
  return elem_id === elem_id_at_location;
};

const is_clickable = async (element) => {
  //only even if disabled is included as attribute it does not matter its value, the element will be disabled
  const is_enabled = !(await element.getAttribute("disabled"));
  const is_displayed = await element.isDisplayedInViewport();
  const has_pointer_events = !(
    (await element.getCSSProperty("pointer-events")) === "none"
  );

  const is_topmost = await is_topmost_element(element);

  return is_enabled && is_displayed && has_pointer_events && is_topmost;
};

const send_keys = async (
  elem,
  characters,
  naturalSpeed = false,
  delayMsBetweenKeys = msecBETWEEN_KEYBOARD_KEYS
) => {
  assert(
    characters.length > 0,
    "use non empty strings as input, otherwise use safeClearInputElement directly"
  );

  if (naturalSpeed) {
    await browser.pause(delayMsBetweenKeys);
    for (let curChar of characters) {
      elem.addValue(curChar);
      await browser.pause(delayMsBetweenKeys);
    }
  } else {
    elem.addValue(characters);
  }
};

const safe_clear_input_element = async (elem) => {
  await expect(elem).toBeExisting();
  await expect(elem).toBeFocused();

  const os_base = os.platform().toLowerCase();

  const sel_all = [os_base === "darwin" ? Key.Command : Key.Control, "A"];

  await browser.keys(sel_all);
  await browser.keys(Key.Delete);

  //redundant supposingly but better be both implicit and explicit
  await elem.clearValue();

  await expect(elem).toHaveValue("");
};

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
  is_clickable,
};
