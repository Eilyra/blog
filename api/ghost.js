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
	
export async function getPosts() {
	const posts = await api.posts.browse({
		include: "tags,authors",
		limit: "all"
	}).catch(err => {
		console.error(err);
	});

	posts.forEach(fixPost);

	return posts;
}

export async function getPost(slug) {
	const post = await api.posts.read({ slug: slug, include: "tags,authors"});
	fixPost(post);

	return post;
}

export async function getTags() {
	const tags = await api.tags.browse({
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

	tags.forEach(async tag => {
		const taggedPosts = posts.filter(post => {
			return post.tags.filter(t => t.id === tag.id) === 1;
		});
		if (taggedPosts.length) tag.posts = taggedPosts;

		tag.url = replaceUrl(tag.url);
	});

	return tags;
}

export async function getTag(slug) {
	const tag = await api.tags.read(
		{ slug: slug },
		{
			include: "tags,authors,posts",
			filter: "visibility:public"
		}
		).catch(err => {
			console.error(err);
		});
	tag.posts = await api.posts.browse({
		include: "tags,authors",
		filter: "tag:"+slug
	});
	tag.posts.forEach(fixPost);

	return tag;
}

export async function getSite() {
	return await (await fetch(`${process.env.GHOST_API_URL}/ghost/api/admin/site`)).json();
}