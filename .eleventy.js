require("dotenv").config();
const WPAPI = require("wpapi");
const api = new WPAPI({ endpoint: process.env.WP_URL });
const localImages = require("eleventy-plugin-local-images");

const replaceUrl = url => {
    let re = new RegExp("https://[A-z0-9\\.]+", "i");
    let baseUrl = re.exec(process.env.WP_URL);
    return url.replace(baseUrl[0], "");
}

module.exports = (conf) => {
    conf.addPlugin(localImages, {
        distPath: "_site",
        assetPath: "/static/images/uploads",
        selector: "img",
        attribute: "src"
    });
    
    conf.addPassthroughCopy({ "src/static": "/" });

    conf.addCollection("posts", async (collection) => {
        collection = await api.posts().embed().get();

        collection.map(post => {
            post.content = post.content.rendered;
            post.title = post.title.rendered;
            post.posted_at = new Date(post.date_gmt + "Z");
            post.author = post._embedded.author[0].name;
            post.link = replaceUrl(post.link);
        });

        return collection;
    });

    return {
        dir: {
            input: "src"
        }
    }
};