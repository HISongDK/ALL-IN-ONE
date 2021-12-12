import React, { ReactElement } from 'react'

interface Props {
  text: string
}

function Button({ text }: Props): ReactElement {
  return <div>{{ text }}</div>
}

export default <Button text="Hello World" />
