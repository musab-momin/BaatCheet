import React, { useEffect, useRef, useState } from 'react'
import { Divider } from 'rsuite'
import CreateRoomModal from './dashboard/CreateRoomModal'
import DashboardToggle from './dashboard/DashboardToggle'
import ChatRoomList from './rooms/ChatRoomList'


const Sidebar = () => {

  const sidebarRef = useRef(null);
  const [height, setHeight] = useState(null);

  useEffect(()=>{
    if(sidebarRef.current){
      setHeight(sidebarRef.current.scrollHeight)
    }

  }, [sidebarRef])

  return (
    <div className='h-100 pt-2'>
        <div ref={sidebarRef}>
            <DashboardToggle />
            <CreateRoomModal />
            <Divider>Join Conversation</Divider>
        </div>
        <ChatRoomList aboveElementHeight = {height} />
    </div>
  )
}

export default Sidebar