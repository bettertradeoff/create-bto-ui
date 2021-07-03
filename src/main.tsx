import { createApp } from 'vue'
import { defineComponent } from '@bto-ui/shared'

import HelloWorld from './HelloWorld.vue'

export default defineComponent({
  render(element: Element) {
    createApp(HelloWorld).mount(element)
  }
})