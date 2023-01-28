const { range } = require('./node_helpers')
const assert = require('assert')

const get_random_name = (length) => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

/**
 * we hypothesize that with the (2*26)^8 is a pretty huge number of combinations to not get any collisions
 * @param prefix
 * @param domain
 */
const get_random_email = (prefix='mail', domain='mx.com') => {
// TODO later we need to have a stored counter and simplify this by just incrementing
    return `${prefix}${get_random_name(8)}@${domain}`
}

const get_random_numbers_fast = (length=10) => {
    if(length <= 0) {
        return ''
    }

    assert(length <= 16, 'the produced length must be less than 16')
    const factor = Math.pow(10, length)
    return (Math.round(Math.random() * factor) % factor).toString().padStart(length, '0');
}

const get_random_numbers = (length=10) => {
    return range(length).map((_) => {
        return Math.round(Math.random()*10).toString()
    }).join('')
}

module.exports = {
    get_random_name,
    get_random_email,
    get_random_numbers_fast,
    get_random_numbers,
}
