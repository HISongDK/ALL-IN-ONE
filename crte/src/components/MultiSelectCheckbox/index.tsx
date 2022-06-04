import React, { useState } from 'react'

/**
 * Renders a checkbox list that uses a callback function to pass its selected value/values to the parent component.
 * Use the useState() hook to create the data state variable and use the options prop to initialize its value.
 * Create a toggle function that uses the spread operator (...) and Array.prototype.splice() to update the data state variable and call the onChange callback with any checked options.
 * Use Array.prototype.map() to map the data state variable to individual <input type="checkbox" /> elements. Wrap each one in a <label>,binding the onClick handler to toggle function.
 */

export type optionsProp = { label: string; checked?: boolean }[]

interface IMultiSelectCheckbox {
  options: optionsProp
  onChange: (checked: optionsProp) => void
}

function MultiSelectCheckbox({ options, onChange }: IMultiSelectCheckbox) {
  const [data, setData] = useState(options)

  const toggle = (index: number) => {
    const newData = [...data]
    newData.splice(index, 1, {
      label: data[index].label,
      checked: !data[index].checked,
    })
    setData(newData)
    onChange(newData.filter((x) => x.checked))
  }

  return (
    <div>
      {data.map((item, index) => (
        <label key={item.label} htmlFor={item.label}>
          <input
            readOnly
            type="checkbox"
            name={item.label}
            checked={item.checked || false}
            onClick={() => toggle(index)}
          />
          {item.label}
        </label>
      ))}
    </div>
  )
}
export default MultiSelectCheckbox
