import React from 'react'

import './index.css'
import img403 from '../static/image/403.jpg'
import img404 from '../static/image/404.jpg'

interface IResult {
  code: number
  text: string
}

function ResultPage(props: IResult) {
  const { code, text } = props

  const setPic = (code: number) => {
    switch (code) {
      case 403:
        return img403
      case 404:
        return img404
      default:
        return ''
    }
  }

  return (
    <div className="result-page">
      <div className="bg-pic">
        <img src={setPic(code)} className="bg-pic-img" />
        <div className="desc-text">{text}</div>
      </div>
    </div>
  )
}

export default ResultPage
