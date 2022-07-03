import React, { useRef } from 'react'
import './css/SplitLandingPage.scss'
import img1 from '@image/2022-05-17-马拉斯盐田.jpg'
import img2 from '@image/2022-05-18-护城河边的格吕克斯堡城堡.jpg'
import img3 from '@image/2022-06-15-大雾山国家公园.jpg'
import img4 from '@image/2022-06-18-黄金海岸上的冲浪者.jpg'
import img5 from '@image/2022-06-23-莫斯塔尔古桥.jpg'
import img6 from '@image/2022-07-02-分隔两个湖泊的公路.jpg'
import useTranslate from './hooks/useTranslate'

const picArrayList = [
  [img1, img2],
  [img3, img4],
  [img5, img6],
]

function SplitLandingPage() {
  const containerRef = useRef<any>()
  const boxesRef = useRef<Element[]>([])

  const getBoxesRef = (dom: Element | null) => {
    if (dom) boxesRef.current.push(dom)
  }

  // 位移逻辑抽离出去
  useTranslate(containerRef, boxesRef)

  return (
    <div className="split_landing_page_wrapper" ref={containerRef}>
      {picArrayList.map((images, index) => (
        <div className="split_page_container" key={index}>
          <div
            ref={getBoxesRef}
            className="split left"
            style={{ backgroundImage: `url(${images[0]})` }}
          >
            <h1>Page {index + 1} Left</h1>
            <a href="#">Look Carefully</a>
          </div>
          <div
            ref={getBoxesRef}
            className="split right"
            style={{ backgroundImage: `url(${images[1]})` }}
          >
            <h1>Page {index + 1} Right</h1>
            <a href="#">Look Carefully</a>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SplitLandingPage
