


function pickDefined(source, keys) {
    const result = {};
    keys.forEach((key) => {
        if (source[key] !== undefined) {
            result[key] = source[key];
        }
    });
    return result;
}

module.exports = { pickDefined };
