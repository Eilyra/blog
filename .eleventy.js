require("dotenv").config();
const pluginRss = require("@11ty/eleventy-plugin-rss");
const ghostContentAPI = require("@tryghost/content-api");
const api = new ghostContentAPI({
    url: process.env.GHOST_API_URL,
    key: process.env.GHOST_CONTENT_API_KEY,
    version: "v3"
});

const replaceUrl = url => {
    return url.replace(process.env.GHOST_API_URL, "").replace(process.env.SITE_URL, "");
}
const fixPost = post => {
    post.date = post.published_at;
    post.url = replaceUrl(post.url);
    if (post.primary_tag) post.primary_tag.url = replaceUrl(post.primary_tag.url);
    if (post.tags) {
        post.tags.forEach(tag => {
            tag.url = replaceUrl(tag.url);
        });
        post.tags = post.tags.filter(tag => tag.slug != post.primary_tag.slug);
    }
    post.published_at = new Intl.DateTimeFormat(
        "en-US",
        {
            timeZone: "Europe/Helsinki",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        }).format(new Date(post.published_at));
}

module.exports = (conf) => {
    conf.addPlugin(pluginRss);
    
    conf.addPassthroughCopy({ "src/static": "/" });

    conf.addCollection("posts", async (collection) => {
        collection = await api.posts.browse({
            include: "tags,authors",
            limit: "all"
        }).catch(err => {
            console.error(err);
        });

        collection.forEach(fixPost);

        return collection;
    });

    conf.addCollection("tags", async (collection) => {
        collection = await api.tags.browse({
            include: "count.posts",
            limit: "all"
        }).catch(err => {
            console.error(err);
        });

        const posts = await api.posts.browse({
            include: "tags,authors",
            limit: "all"
        }).catch(err => {
            console.error(err);
        });
        posts.forEach(fixPost);

        collection.forEach(async tag => {
            const taggedPosts = posts.filter(post => {
                return post.primary_tag && post.primary_tag.slug === tag.slug;
            });
            if (taggedPosts.length) tag.posts = taggedPosts;

            tag.url = replaceUrl(tag.url);
        });

        return collection;
    });

    return {
        dir: {
            input: "src"
        }
    }
};