import { defineClientConfig } from 'vuepress/client'
import SocialIcons from './components/SocialIcons.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('SocialIcons', SocialIcons)
  },
})
