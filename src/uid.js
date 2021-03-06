/**
 * Generate a unique ID by converting the current time to base36
 * and adding a random number to it as a salt.
 * Big thanks to Simonwep!
 * @param {Number} length length of the unique ID to generate
 */
export const uid = (length = 8) => {
    if (length < 8) {
        throw new Error('Minimum length for an uid is 8.');
    }

    let str = Date.now().toString(36);

    /**
     * Keep entire date for very long uid's,
     * the salt-value should cover least 2 characters.
     */
    if (length < 10) {
        str = str.slice(length - 2);
    }

    while (str.length < length) {
        const salt = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(36);
        str += salt.slice(str.length - length);
    }

    return str;
};