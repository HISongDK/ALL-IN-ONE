import React from 'react'

function Env() {
  return (
    <>
      <div>{import.meta.env.REACT_APP_ENV}</div>
      <hr />
      <p>{import.meta.env.NODE_ENV}</p>
    </>
  )
}

export default Env
