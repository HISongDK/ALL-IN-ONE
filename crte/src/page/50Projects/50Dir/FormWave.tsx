import React from 'react'
import './css/FormWave.scss'

const generateStr = (str: string) =>
  str
    .split('')
    .map((char, index) => (
      <span style={{ transitionDelay: `${index * 50}ms` }}>{char}</span>
    ))

function FormWave() {
  return (
    <div className="form_wave_wrapper">
      <div className="form_wave_container">
        <h1>请登录</h1>
        <form>
          <div className="form_control">
            <input type="text" name="email" required />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="email">{generateStr('Email')}</label>
          </div>
          <div className="form_control">
            <input type="password" name="password" required />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="password">{generateStr('Password')}</label>
          </div>

          <button className="btn">登录</button>

          <p className="text">
            Don&#39;t have an account? <a href="#">Register</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default FormWave
