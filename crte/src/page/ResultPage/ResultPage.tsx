import React, { useEffect } from 'react'
import { debounce } from '@/utils'
// import img403 from '../../static/image/403.jpg'
// import img404 from '../../static/image/404.jpg'
import './index.css'

import video from './lubang.MP4'
import audio from './audio.mp3'

// import { type } from '../../constant/index'
import useAudioData from './useAudioData'

interface IResult {
  code: number
  text: string
}

function ResultPage(props: IResult) {
  const { code, text } = props

  // const setPic = () => { //   switch (code) { //     case 403: //       return img403 //     case 404: //       return img404 //     default: //       return img404 //   } // }

  // const handleResize = debounce(() => {
  //   console.log(window.innerWidth)
  // })

  // useEffect(() => {
  //   window.addEventListener('resize', handleResize)
  //   return () => window.removeEventListener('resize', handleResize)
  // }, [handleResize])

  // useVideoAudioData()

  useAudioData()

  return (
    <div className="result-page">
      <div className="bg-pic">
        {/* <img src={setPic()} className="bg-pic-img" alt="" /> */}
        {/* <div className="desc-text">{text}</div> */}

        <video
          style={{ width: 600, height: 400, border: 'solid 1px #333' }}
          src={video}
          // type="video/mp4"
          controls
        >
          <track kind="captions" {...props} />
        </video>

        <audio controls src={audio}>
          audio
          <track kind="captions" />
        </audio>
      </div>
    </div>
  )
}

export default ResultPage
