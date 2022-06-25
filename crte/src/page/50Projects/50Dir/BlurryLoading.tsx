import React, { useState, useCallback } from 'react'
import { useInterval } from '@/utils/hooks'
import './css/BlurryLoading.scss'

function BlurryLoading() {
  const [loadNum, setLoadNum] = useState(0)

  useInterval(() => {
    if (loadNum > 99) {
      return
    }
    setLoadNum(loadNum + 1)
  }, 20)

  const scale = useCallback(
    (inMin, inMax, outMin, outMax, num = loadNum) => {
      const process = num - inMin // 当前进度
      const inScope = inMax - inMin // 输入区间差
      const outScope = outMax - outMin // 输出区间差
      const outMapIn = outScope / inScope // 输出对输入的比例

      return process * outMapIn + outMin

      // 输出的最小值 + 进度的输入占比对应输出的占比
      // return (num - inMin) * ((outMax - outMin) / (inMax - inMin)) + outMin
      // 实话说 我理不清 除 和 比，具体意思的异同，应该是一样的，但是语言的不同导致我思想上也有种割裂，无法融合在一起
      // 关于数字上的具体细节的语义应该是很困扰我的，可能从小时候，就觉得无法理清，脑海深处有种茫然

      // 这一行代码没理清的时候我都没想到，我前几天做的一个根据百分比进行节点缩放的应该采用了差不多的逻辑，虽说是自己瞎调出来也粗糙一点，也不清楚是否就和这个一致，不过我觉得起码有一半是差不多的。运气好的话可能就是一致的，不过逻辑没有抽的这么通用而且简洁
    },
    [loadNum],
  )

  return (
    <div className="blurry_loading_wrapper">
      <section
        className="bg"
        style={{ filter: `blur(${scale(0, 100, 30, 0)}px)` }}
        onClick={() => setLoadNum(0)}
      />
      <div className="loading_text" style={{ opacity: scale(0, 100, 1, 0) }}>
        {loadNum}%
      </div>
    </div>
  )
}

export default BlurryLoading
