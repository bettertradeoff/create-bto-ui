import React from 'react'

import './hello-world.css'

export interface HelloWorldProps {
  message?: string
}

const HelloWorld = (props: HelloWorldProps) => {
  return (
    <h1>
      Hello { props.message }
    </h1>
  )
}

export default HelloWorld