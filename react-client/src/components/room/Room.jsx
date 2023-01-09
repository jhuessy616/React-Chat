// !Room------------------------------------------------------------
import React from 'react'
// ! How we want each room to be displayed with a name and a description
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
// Exporting room
export default Room