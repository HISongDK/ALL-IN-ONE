import React from 'react'
import RotateNavigationCom from './50Dir/components/RotateNavigationCom'
import Calendar from './50Dir/components/Calendar'

const Home: React.FC = () => {
  return (
    <RotateNavigationCom>
      <Calendar />
    </RotateNavigationCom>
  )
}

export default Home
