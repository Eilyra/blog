const WPAPI = require("wpapi");


module.exports = async () => {
    const api = await WPAPI.discover("https://blog.faarao.net");
    const posts = await api.posts().embed();
    return posts;
}