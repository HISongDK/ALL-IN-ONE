import React, { useRef } from 'react'
import applause from './sounds/applause.mp3'
import boo from './sounds/boo.mp3'
import gasp from './sounds/gasp.mp3'
import tada from './sounds/tada.mp3'
import victory from './sounds/victory.mp3'
import wrong from './sounds/wrong.mp3'
import './css/SoundBoard.scss'

const audios = [
  {
    text: 'applause',
    src: applause,
  },
  {
    text: 'boo',
    src: boo,
  },
  {
    text: 'gasp',
    src: gasp,
  },
  {
    text: 'tada',
    src: tada,
  },
  {
    text: 'victory',
    src: victory,
  },
  {
    text: 'wrong',
    src: wrong,
  },
]
function SoundBoard() {
  const audiosRef = useRef<HTMLAudioElement[]>([])

  const handlerClick = (index: number) => {
    // audiosRef.current[index].play()

    audiosRef.current.forEach((item, ind) => {
      if (index === ind) {
        item.play()
      } else {
        item.pause()
      }
    })
  }

  return (
    <div className="sound_board_wrapper">
      {audios.map((audio, index) => (
        <>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <audio
            key={index}
            src={audio.src}
            ref={(node) => {
              if (node) audiosRef.current.push(node)
            }}
          />
          <button key={audio.text} onClick={() => handlerClick(index)}>
            {audio.text}
          </button>
        </>
      ))}
    </div>
  )
}

export default SoundBoard
