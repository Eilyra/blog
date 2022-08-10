require("dotenv").config();
import { getPosts, getTag, getTags } from './api/ghost';

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'blog',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/style.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  env: process.env,

  generate: {
    async routes() {
      const posts = await getPosts();
      const tags = await getTags();
      const post_routes = posts.map(post => {
        return {
          route: '/' + post.slug,
          payload: post
        };
      });
      const tag_routes = tags.map(tag => {
        return {
          route: '/tag/' + tag.slug,
          payload: tag
        };
      });

      return [
        ...post_routes,
        ...tag_routes,
        {
          route: '/',
          payload: posts
        }
      ];
    }
  }
}
