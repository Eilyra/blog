<template>
	<article class="post h-entry">
		<header class="post-header">
		<h2>
			<NuxtLink class="post-link p-name" v-bind:to="post.url" rel="bookmark" v-html="post.title" />
		</h2>
		
		</header>
		<section class="post-content e-content" v-html="post.html" />
		<div class="post-categories p-category"><NuxtLink v-if="post.primary_tag" v-bind:to="post.primary_tag.url">{{ post.primary_tag.name }}</NuxtLink></div><time class="post-date dt-published" v-bind:datetime="post.date">{{ post.published_at }}</time>
	</article>
</template>

<script>
export default {
	props: ['post']
}
</script>