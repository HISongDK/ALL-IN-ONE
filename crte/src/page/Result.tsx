import React from 'react'

interface IProps {
  code: number
  text: string
}

// export default function Result(props: IProps) {
//   const { code, text } = props
//   return (
//     <div
//       style={{
//         fontSize: '20px',
//       }}
//     >
//       {code + ':' + text}
//     </div>
//   )
// }

function Result({ code = 404, text = '找不到页面。。。' }: IProps) {
  //   const { code, text } = props
  return (
    <div
      style={{
        fontSize: '20px',
      }}
    >
      {`${code}: ${text}`}
    </div>
  )
}

export default Result
