import React from 'react'

const btns = [
  {
    text: 'applause',
  },
  {
    text: 'boo',
  },
  {
    text: 'gasp',
  },
  {
    text: 'tada',
  },
  {
    text: 'victory',
  },
  {
    text: 'wrong',
  },
]
function SoundBoard() {
  return (
    <div className="sound_board_wrapper">
      {btns.map((btn) => (
        <>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <audio id={btn.text} src={`./sounds/${btn.text}.msp`} />
          <button>{btn.text}</button>
        </>
      ))}
    </div>
  )
}

export default SoundBoard
