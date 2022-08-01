import React, { useEffect } from 'react'
import { debounce } from '@/utils'
import img403 from '../static/image/403.jpg'
import img404 from '../static/image/404.jpg'
import './index.css'

interface IResult {
  code: number
  text: string
}

function ResultPage(props: IResult) {
  const { code, text } = props

  const setPic = () => {
    switch (code) {
      case 403:
        return img403
      case 404:
        return img404
      default:
        return img404
    }
  }

  const handleResize = debounce(() => {
    console.log(window.innerWidth)
  })

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="result-page">
      <div className="bg-pic">
        <img src={setPic()} className="bg-pic-img" alt="" />
        <div className="desc-text">{text}</div>
      </div>
    </div>
  )
}

export default ResultPage
