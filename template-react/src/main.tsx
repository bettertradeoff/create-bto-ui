import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { Data, defineComponent } from '@bto-ui/shared'

import App from './App'

export default defineComponent({
  render(element: Element, attrs: Data) {
    render(React.createElement(App, attrs), element)
  },
  onUnmount(element: Element) {
    return unmountComponentAtNode(element)
  }
})