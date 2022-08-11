<template>
	<main>
		<h1>Posted in {{ tag.name }}</h1>
		<div class="post-list h-feed">
			<ArticleCard v-for="post in tag.posts" v-bind:key="post.slug" v-bind:post="post" />
		</div>
	</main>
</template>

<script>
import ArticleCard from '~/components/ArticleCard.vue';

export default {
	async asyncData({route, payload}) {
		return { tag: payload };
	},
	components: { ArticleCard }
}
</script>
