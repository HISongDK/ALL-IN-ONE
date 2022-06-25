import React, { useState } from 'react'
import './css/ExpandingCards.scss'

const imgs = [
  {
    img: 'https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    title: '展开世界',
  },
  {
    img: 'https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    title: '森林',
  },
  {
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80',
    title: '海岸',
  },
  {
    img: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
    title: '冬日',
  },
  {
    img: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    title: '云山',
  },
]

function ExpandingCards() {
  const [active, setActive] = useState(0)

  return (
    <div className="container">
      {imgs.map((img, index) => (
        <div
          key={index}
          className={`panel ${active === index ? 'active' : ''}`}
          style={{ backgroundImage: `url(${img.img})` }}
          onClick={() => setActive(index)}
        >
          <h3>{img.title}</h3>
        </div>
      ))}
    </div>
  )
}

export default ExpandingCards
