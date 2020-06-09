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
        let posts = await api.posts().perPage(100).embed();
        let categories = await api.categories();
        collection = [...posts]
        while (posts._paging.links.next) {
            posts = await posts._paging.next.get();
            collection.push(...posts);
        }

        collection.map(post => {
            post.content = post.content.rendered;
            post.title = post.title.rendered;
            post.posted_at = new Intl.DateTimeFormat(
                "en-US",
                {
                    timeZone: "Europe/Helsinki",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                }).format(new Date(post.date_gmt + "Z"));
            post.author = post._embedded.author[0].name;
            post.link = replaceUrl(post.link);
            post.categories = post.categories.map(category => {
                let c = categories.filter(c => c.id == category)[0];
                return { name: c.name, link: replaceUrl(c.link)};
            });
            post.category = post.categories[0];
        });

        return collection;
    });

    conf.addCollection("categories", async () => {
        let categories = await api.categories().get();
        let postsCollector = await api.posts().perPage(100).embed();
        const posts = [...postsCollector];

        while (postsCollector._paging.links.next) {
            postsCollector = await postsCollector._paging.next.get();
            posts.push(...postsCollector);
        }

        categories.map(category => {
            category.link = replaceUrl(category.link);
            category.posts = posts.filter(post => {
                return category.id === post.categories[0];
            }).map(post => {
                post.content = post.content.rendered;
                post.title = post.title.rendered;
                post.posted_at = new Intl.DateTimeFormat(
                    "en-US",
                    {
                        timeZone: "Europe/Helsinki",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    }).format(new Date(post.date_gmt + "Z"));
                post.author = post._embedded.author[0].name;
                post.link = replaceUrl(post.link);
                post.categories = post.categories.map(category => {
                    let c = categories.filter(c => c.id == category)[0];
                    return { name: c.name, link: replaceUrl(c.link)};
                });
                post.category = post.categories[0];
                return post;
            });
            return category;
        });
        return categories;
    });

    return {
        dir: {
            input: "src"
        }
    }
};