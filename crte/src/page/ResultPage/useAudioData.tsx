import React, { useEffect } from 'react'

function useAudioData() {
  useEffect(() => {
    // 获取对应 video DOM 元素
    const audio = document.querySelector(`audio`) as any
    // 音频上下文
    const audioContext = new AudioContext()
    let sourceNode: any
    if (!sourceNode) sourceNode = audioContext.createMediaElementSource(audio)
    const analyserNode = audioContext.createAnalyser()
    sourceNode.connect(analyserNode)
    analyserNode.connect(audioContext.destination)

    const bufferLength = analyserNode.frequencyBinCount

    // audio.play()

    const timer = setInterval(() => {
      // 从 DOM 元素获取流
      // const stream = audio?.captureStream?.()

      // 从流中获取源节点
      // try {
      // sourceNode = audioContext.createMediaStreamSource(stream)

      // } catch (error) {
      //   console.log(error)
      // }

      if (!sourceNode) return

      const dataArray = new Uint8Array(bufferLength)

      console.log('---  analyserNode  ---\n', analyserNode)

      analyserNode.getByteFrequencyData(dataArray)

      console.log('---  dataArray  ---\n', dataArray)
    }, 3000)

    return () => timer && clearInterval(timer)
  }, [])
}

export default useAudioData
