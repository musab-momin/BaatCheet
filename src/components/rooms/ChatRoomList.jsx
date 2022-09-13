import React from 'react'
import { Nav } from 'rsuite'
import ChatRoomItem from './ChatRoomItem'

const ChatRoomList = ({ aboveElementHeight }) => {
  return (
    <Nav 
    appearance='subtle'
    vertical
    reversed
    className='overflow-y-scroll custom-scroll'
    style={{ height: `calc(100% - ${aboveElementHeight}px)` }}
    >
        <Nav.Item> 
            <ChatRoomItem />
        </Nav.Item>

    </Nav>

  )
}

export default ChatRoomList