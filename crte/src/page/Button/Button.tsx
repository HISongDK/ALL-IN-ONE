import React, { ReactElement } from 'react'

interface Props {
  text: string
}

function Button({ text = '按钮' }: Props): ReactElement {
  return <div>{text}</div>
}

export default Button
