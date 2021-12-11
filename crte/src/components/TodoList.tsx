import React, { memo } from 'react'

import { useStoreState } from 'easy-peasy'

export default memo(function TodoList() {
  const todos = useStoreState((state: any) => state.todos.list)
  return (
    <div>
      {todos.map((todo: string) => (
        <li>{todo}</li>
      ))}
    </div>
  )
})
