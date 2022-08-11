<template>
	<main>
		<Article v-bind:post="post" />
	</main>
</template>

<script>
import Article from '../components/Article.vue';

export default {
	async asyncData({ route, payload }) {
		return { post: payload };
	},
	components: { Article }
}
</script>
