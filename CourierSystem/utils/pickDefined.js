function pickDefined(source, keys) {
    // Express 5 leaves req.body undefined when a request has no body,
    // so treat that like an empty object instead of crashing.
    const data = source || {};
    const result = {};
    keys.forEach((key) => {
        if (data[key] !== undefined) {
            result[key] = data[key];
        }
    });
    return result;
}

module.exports = { pickDefined };