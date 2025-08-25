// Cache đơn giản qua localStorage: set/get với maxAge (ms)
export function setCache(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify({ t: Date.now(), data }));
    } catch { }
}

export function getCache(key, maxAgeMs = 30000) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (Date.now() - parsed.t <= maxAgeMs) return parsed.data;
    } catch { }
    return null;
}
