import React, { useState } from 'react'
import AddDrawer from './AddDrawer'

function Exercise() {
  const [isAddVisible, setIsAddVisible] = useState(false)

  return (
    <div>
      <AddDrawer visible={isAddVisible} setVisible={setIsAddVisible} />
    </div>
  )
}

export default Exercise
