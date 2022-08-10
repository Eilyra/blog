<template>
	<main>
		<h1>Posted in {{ tag.name }}</h1>
		<div class="post-list h-feed">
			<ArticleCard v-for="post in tag.posts" v-bind:key="post.slug" v-bind:post="post" />
		</div>
	</main>
</template>

<script>
import { getTag } from '~/api/ghost';
import ArticleCard from '~/components/ArticleCard.vue';

export default {
	async asyncData({route, payload}) {
		const posts = payload ? payload : await getTag(route.params.slug);
		return { tag: posts };
	},
	components: { ArticleCard }
}
</script>
