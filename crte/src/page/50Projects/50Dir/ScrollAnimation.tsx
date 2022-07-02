import React, { useEffect, useRef, useCallback } from 'react'
import useUpdate from '@utils/ahook/useUpdate'
import './css/ScrollAnimation.scss'

function ScrollAnimation() {
  const update = useUpdate()

  const boxesRef = useRef<Element[]>([])
  const getRefList = useCallback((dom: any) => {
    if (dom) boxesRef.current.push(dom)
  }, [])

  useEffect(() => {
    const container = document.querySelector('.scroll_animation_wrapper')
    const { current: boxes } = boxesRef
    const triggerBottom = window.innerHeight * 0.8 // 指定可视区域高度，元素距离顶部小于这个高度才显示

    const checkBox = () => {
      boxes.forEach((box, index) => {
        const { top } = box.getBoundingClientRect()
        // Work Around: getBoundingClientRect 好像是渲染原因这个方法初始获取的值可不准，下面就用 index 先判断了下默认显示的
        if (top < triggerBottom || index < 4) {
          box.classList.add('show')
        } else {
          box.classList.remove('show')
        }
      })
    }
    checkBox()
    update() // 修改过 dom class 属性后先手动重渲染一下
    container?.addEventListener('scroll', checkBox)
    return () => container?.removeEventListener('scroll', checkBox)
  }, [update, boxesRef])

  console.count()
  return (
    <div className="scroll_animation_wrapper">
      <h1>滚动查看动画</h1>
      {Array(15)
        .fill('')
        .map((_, index) => {
          return (
            <div key={index} className="box" ref={getRefList}>
              <h2>内容</h2>
            </div>
          )
        })}
    </div>
  )
}

export default ScrollAnimation
