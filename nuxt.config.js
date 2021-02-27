// nuxt.config.js
{
    buildModules: [
      // Simple usage
      '@nuxtjs/vuetify',
  
      // With options
      ['@nuxtjs/vuetify', { /* module options */ }]
    ]
}
export default {
    vuetify: {
      customVariables: ['~/assets/variables.scss'],
      treeShake: true
    },
  }