<template>
    <article class="post h-entry">
        <img v-if="post.feature_image" v-bind:src="post.feature_image">

        <header class="post-header">
        <h1 class="post-title p-name" v-html="post.title"></h1>
        </header>
        <section class="post-content e-content" v-html="post.html"></section>
        <div v-if="post.primary_tag" class="category p-category"><a v-bind:href="post.primary_tag.url">{{ post.primary_tag.name }}</a></div>
        <time class="dt-published" v-bind:datetime="post.date">{{ post.published_at }}</time>
        <div v-if="post.tags" class="tags"><NuxtLink v-for="tag in post.tags" v-bind:key="tag.slug" v-bind:to="tag.url" rel="tag">#{{ tag.name }}</NuxtLink></div>
    </article>
</template>

<script>
export default {
    props: ['post']
}
</script>