<template>
	<main>
		<Article v-bind:post="post" />
	</main>
</template>

<script>
import { getPost } from '../api/ghost';
import Article from '../components/Article.vue';

export default {
	async asyncData({ route, payload }) {
		const post = payload ? payload : await getPost(route.params.slug);
		return { post: post };
	},
	components: { Article }
}
</script>
