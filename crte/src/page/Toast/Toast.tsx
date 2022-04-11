import React from 'react'
import './index.scss'

function Toast(props: any) {
  const toast = document.createElement('div')
  toast.className = 'toast-container'

  if (typeof props === 'string') {
    toast.innerText = props
  }

  if (Object.prototype.toString.call(props) === '[object Object]') {
    const { img, text } = props
    toast.innerHTML = `<img  src="${img}"/><p>${text}</p>`
  }

  document.body.appendChild(toast)
}

export default Toast
