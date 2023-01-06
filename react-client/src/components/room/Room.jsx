import React from 'react'

function Room(props) {
    console.log(props)
  return (
      <>
          <div className="room">
              <h2>{props.room.name}</h2>
              <h3>{props.room.description}</h3>
          </div>
          
      </>
  )
}

export default Room