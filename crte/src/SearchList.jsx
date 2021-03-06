import React, { useState, useRef } from 'react'

function SearchList() {
  const list = ['1', '123', '1234', '12345']
  const [val, setVal] = useState('')
  const [showList, setShowList] = useState(list)

  const timerRef = useRef(null)

  // 搜索
  const search = (value) => {
    // console.log('执行搜索', value)
    const arr = []
    // eslint-disable-next-line no-restricted-syntax
    for (const item of list) {
      if (item.indexOf(value) > -1) {
        arr.push(item)
      }
    }
    setShowList(arr)
  }

  // 防抖
  const debounce = (fn, delay = 500) => {
    return (e) => {
      // console.log(e)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(fn, delay, e)
    }
  }

  // 输入框变动
  const handleChangeInput = (e) => {
    const { value } = e.target

    setVal(value)
    debounce(search)(value)
  }

  return (
    <div>
      <input value={val} onChange={handleChangeInput} />
      <ul>
        {showList.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default SearchList
