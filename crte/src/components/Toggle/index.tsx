import React, { useState } from 'react'
import './style.scss'

function Toggle({ defaultToggled = false }: any) {
  const [isToggleOn, setIsToggleOn] = useState(defaultToggled)

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={isToggleOn ? 'toggle on' : 'toggle off'}>
      <input
        type="checkbox"
        checked={isToggleOn}
        onChange={() => setIsToggleOn(!isToggleOn)}
      />
      {isToggleOn ? 'ON' : 'OFF'}
    </label>
  )
}

export default Toggle
