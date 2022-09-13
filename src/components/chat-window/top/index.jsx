import React from 'react'
import { useActiveRoom } from '../../../context/active.room.context'

const ChatTop = () => {
  const roomName = useActiveRoom(value => value.name);

  return (
    <div>{ roomName }</div>
  )
}

export default React.memo(ChatTop);