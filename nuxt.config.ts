/* // https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
 */

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    sharedPrerenderData: false,
    compileTemplate: true,
    templateUtils: true,
    relativeWatchPaths: true,
    resetAsyncDataToUndefined: true,
    defaults: {
      useAsyncData: {
        deep: true,
      },
    },
  },
  unhead: {
    renderSSRHeadOptions: {
      omitLineBreaks: false,
    },
  },
  devtools: { enabled: true },
  modules: [
   "@nuxtjs/tailwindcss",
   "@nuxtjs/google-fonts",
   "@nuxt/icon",
   "@nuxt/image",
   "@nuxtjs/color-mode"
  ],

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light'
  },

  googleFonts: {
    families: {
      Montserrat: true,
    },
  },
});