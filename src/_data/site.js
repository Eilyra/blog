require("dotenv").config();
const ghostContentAPI = require("@tryghost/content-api");
const api = new ghostContentAPI({
    url: process.env.GHOST_API_URL,
    key: process.env.GHOST_CONTENT_API_KEY,
    version: "v3"
});

module.exports = async () => {
    let settings = await api.settings.browse();
    if (settings.url.endsWith('/')) settings.url = settings.url.substr(0, settings.url.length - 1);
    return settings;
};