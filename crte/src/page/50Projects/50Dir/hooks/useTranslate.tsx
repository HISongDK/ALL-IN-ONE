import React, { useEffect } from 'react'

const triggerBottom = window.innerHeight * 0.8

function useTranslate(containerRef: any, boxesRef: any) {
  useEffect(() => {
    const container = containerRef.current
    const boxes = boxesRef.current

    const checkbox = () => {
      boxes.forEach((box: Element, index: number) => {
        const { top } = box.getBoundingClientRect()
        if (top < triggerBottom || index < 2) {
          box.classList.add('show')
        } else {
          box.classList.remove('show')
        }
      })
    }

    checkbox()

    container.addEventListener('scroll', checkbox)
    return () => container.addEventListener('scroll', checkbox)
  }, [containerRef, boxesRef])
}

export default useTranslate
