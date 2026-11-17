// A small "too many requests" limiter. Each key (for example IP + email) may
// make `max` requests per `windowMs`; after that it gets 429 until the window
// ends. It keeps its counters in memory, which is fine for one server process;
// with several servers you would switch to a shared store such as Redis.
//
// Behind a proxy or load balancer, call app.set('trust proxy', 1) in server.js
// so req.ip is the real visitor, not the proxy.
function rateLimit({ windowMs, max, keyFn, message }) {
    const hits = new Map(); // key -> { count, resetAt }

    // Forget finished windows now and then so the Map can't grow forever.
    setInterval(() => {
        const now = Date.now();
        for (const [key, entry] of hits) {
            if (entry.resetAt <= now) hits.delete(key);
        }
    }, windowMs).unref(); // unref: don't keep the process alive just for this timer

    return (req, res, next) => {
        if (process.env.RATE_LIMIT_DISABLED === 'true') return next(); // handy for automated tests

        const now = Date.now();
        const key = keyFn(req);
        let entry = hits.get(key);
        if (!entry || entry.resetAt <= now) {
            entry = { count: 0, resetAt: now + windowMs };
            hits.set(key, entry);
        }

        entry.count += 1;
        if (entry.count > max) {
            res.set('Retry-After', String(Math.ceil((entry.resetAt - now) / 1000)));
            return res.status(429).json({ message: message || 'Too many requests. Please try again later.' });
        }
        return next();
    };
}

// The email address a request is about, in a form that can be used as a key.
const emailOf = (req) => String((req.body && req.body.email) || '').trim().toLowerCase();

module.exports = { rateLimit, emailOf };