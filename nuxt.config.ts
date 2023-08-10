// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules:['@nuxtjs/tailwindcss'],
  runtimeConfig:{
    appId:"",
    baseUrl:"",
    serverApiKey:"",
    db:"",
    collection:"",
    jwtSecret:"",
  }
})
