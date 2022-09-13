import React from 'react'
import TimeAgo from 'timeago-react'


const ChatRoomItem = ({ room }) => {
  return (
    <div>
        <div className='d-flex justify-content-between align-items-center'>
            <h3 className='text-disappear'>{ room.name }</h3>
            <TimeAgo  datetime={ new Date(room.createdAt) } className='font-normal text-black-45'/>
        </div>
        <div className='d-flex align-items-center text-black-70'>
            <span>No messages yet...</span>
        </div>
    </div>
  )
}

export default ChatRoomItem