import React from 'react'

function Env() {
  return (
    <>
      <div>{process.env.REACT_APP_ENV}</div>
      <hr />
      <p>{process.env.NODE_ENV}</p>
    </>
  )
}

export default Env
