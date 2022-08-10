<template>
  <main>
    <div class="post-list h-feed">
      <ArticleCard v-for="post in posts" v-bind:key="post.id" v-bind:post="post" />
    </div>
  </main>
</template>

<script>
import { getPosts } from '../api/ghost';
import ArticleCard from '../components/ArticleCard.vue';

export default {
    name: "IndexPage",
    head() {
        return {
            meta: [{
                    content: "Nuxt",
                    name: "generator"
                }]
        };
    },
    async asyncData() {
        const posts = await getPosts();
        return { posts: posts };
    },
    components: { ArticleCard }
}
</script>
