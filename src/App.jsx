import { useState } from 'react'

import './App.css'

export function App() {
  const [dotList, setDotList] = useState([])
  const [deletedDotList, setDeletedDotList] = useState([])

  const handleOnClick = (event) => {
    // console.log(event)
    const newDot = {
      clientX: event.clientX,
      clientY: event.clientY
    }
    
    setDotList((oldDotList) => [...oldDotList, newDot]);
    // console.log(dotList)
  }

  const handleUnDo = (event) => {
    event.stopPropagation()

    //setar o state de deletados
    const deletedDot = dotList[dotList.length -1]
    setDeletedDotList((oldDeletedDotList) => [...oldDeletedDotList, deletedDot])

    setDotList((oldDotList) => [...oldDotList].slice(0,-1))
  }

  const handleReDo = (event) => {
    event.stopPropagation()

    const reDoDot = deletedDotList[deletedDotList.length -1]
    setDeletedDotList((oldDeletedDotList) => [...oldDeletedDotList].slice(0,-1))

    setDotList((oldDotList) => [...oldDotList, reDoDot])
  }

  return (
    <div
      id='page'
      onClick={handleOnClick}
    >
      <button className='btn-undo' onClick={handleUnDo}>Desfazer</button>

      <button className='btn-redo' onClick={handleReDo}>Refazer</button>

      {
        dotList.map((mapDot, key) => (
          <div
            className='dot' 
            key={key} 
            style={{top: mapDot.clientY, left: mapDot.clientX}}
          />
        ))
      }
    </div>
  )
}
