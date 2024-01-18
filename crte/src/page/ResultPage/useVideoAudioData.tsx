import React, { useEffect } from 'react'

function useVideoAudioData() {
  useEffect(() => {
    const timer = setInterval(() => {
      // 获取对应 video DOM 元素
      const video = document.querySelector(`video`) as any

      // 从 DOM 元素获取流
      const stream = video?.captureStream?.()

      // 音频上下文
      const audioContext = new AudioContext()

      // 左右声道分析节点
      const leftAnalyserNode = audioContext.createAnalyser()
      const rightAnalyserNode = audioContext.createAnalyser()

      // 从流中获取源节点
      let sourceNode
      try {
        // sourceNode = audioContext.createMediaStreamSource(stream)
        sourceNode = audioContext.createMediaStreamSource(video)
      } catch (error) {
        console.log(error)
      }
      if (!sourceNode) return
      const analyserNode = audioContext.createAnalyser()
      sourceNode.connect(analyserNode)
      analyserNode.connect(audioContext.destination)

      const bufferLength = analyserNode.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)
      console.log('---  analyserNode  ---\n', analyserNode)
      analyserNode.getByteFrequencyData(dataArray)

      console.log('---  dataArray  ---\n', dataArray)

      // 左右声道拆分
      // const splitterNode = audioContext.createChannelSplitter(2)
      // sourceNode.connect(splitterNode)

      // splitterNode.connect(leftAnalyserNode, 0)
      // splitterNode.connect(rightAnalyserNode, 1)

      // // 左声道数据
      // // leftAnalyserNode.fftSize = 256

      // console.log('---  leftAnalyserNode  ---\n', leftAnalyserNode)

      // const leftFreqByteData = new Uint8Array(
      //   leftAnalyserNode.frequencyBinCount,
      // )
      // // leftAnalyserNode.getByteTimeDomainData(leftFreqByteData)
      // leftAnalyserNode.getByteFrequencyData(leftFreqByteData)

      // // 右声道数据
      // // rightAnalyserNode.fftSize = 256
      // const rightFreqByteData = new Uint8Array(
      //   rightAnalyserNode.frequencyBinCount,
      // )
      // // leftAnalyserNode.getByteTimeDomainData(rightFreqByteData)
      // rightAnalyserNode.getByteFrequencyData(rightFreqByteData)

      // console.log(
      //   '--- leftFreqByteData, rightFreqByteData  ---\n',
      //   leftFreqByteData,
      //   rightFreqByteData,
      // )
    }, 3000)

    return () => timer && clearInterval(timer)
  }, [])
}

export default useVideoAudioData
