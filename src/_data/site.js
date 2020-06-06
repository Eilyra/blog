require("dotenv").config();
const WPAPI = require("wpapi");
const api = new WPAPI({
    endpoint: process.env.WP_URL,
    username: process.env.WP_USER,
    password: process.env.WP_PASS
});

module.exports = async () => {
    return api.settings();
};