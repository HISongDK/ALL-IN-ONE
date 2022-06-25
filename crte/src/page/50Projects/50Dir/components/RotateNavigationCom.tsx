import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import cls from 'classnames'
import Calendar from './Calendar'
import { FiftyPath } from '../../router'
import '../css/RotateNavigation.scss'

function RotateNavigation({ children }: any) {
  const [showNav, setShowNav] = useState(false)
  return (
    <div className="rotate-navigation-wrapper">
      <div className={cls('nav-container', { show_nav: showNav })}>
        <div className="circle-container">
          <div className="close_icon" onClick={() => setShowNav(false)}>
            X
          </div>
          <div className="nav_icon" onClick={() => setShowNav(true)}>
            三
          </div>
        </div>
        <div className="content">{children || <Calendar />}</div>
      </div>
      <nav className={cls('navigation_container', { show_nav: showNav })}>
        <ul className="navigation_list">
          {Object.values(FiftyPath)
            .slice(1)
            .map((route, index) => (
              <li
                key={index}
                style={{
                  marginLeft: index * 10,
                  transitionDelay: `${index * -10}ms`,
                }}
              >
                <NavLink to={`/50days/${route}`}>
                  {index + 1}. {route}
                </NavLink>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  )
}

export default RotateNavigation
