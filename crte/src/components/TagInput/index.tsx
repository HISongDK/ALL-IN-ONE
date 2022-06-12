import React, { useState } from 'react'
import './style.scss'

function TagInput({ tags }: any) {
  const [tagData, setTagData] = useState(tags)

  const removeTag = (removeIndex: number) => {
    setTagData([
      ...tagData.filter((_: any, index: number) => index !== removeIndex),
    ])
  }

  const addTagData = (e: any) => {
    if (e.target.value !== '') {
      setTagData([...tagData, e.target.value])
      e.target.value = ''
    }
  }

  return (
    <div className="tag-input">
      <ul className="tags">
        {tagData.map((tag: any, index: number) => (
          <li className="tag">
            <span className="tag-title">{tag}</span>
            <span className="tag-close-icon" onClick={() => removeTag(index)}>
              x
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        onKeyUp={(e) => (e.key === 'Enter' ? addTagData(e) : null)}
        placeholder="Press enter to  add a tag"
      />
    </div>
  )
}

export default TagInput
