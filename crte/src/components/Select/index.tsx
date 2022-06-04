import React from 'react'

function Select({ values, onValueChange, selectedValue, ...rest }: any) {
  return (
    <select
      defaultValue={selectedValue}
      onChange={({ target: { value } }) => onValueChange(value)}
    >
      {values.map(([value, text]: [string, string]) => (
        <option key={value} value={value}>
          {text}
        </option>
      ))}
    </select>
  )
}

export default Select
