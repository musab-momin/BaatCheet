import React from 'react'
import CreateRoomModal from './dashboard/CreateRoomModal'
import DashboardToggle from './dashboard/DashboardToggle'


const Sidebar = () => {
  return (
    <div className='h-100 pt-2'>
        <div>
            <DashboardToggle />
            <CreateRoomModal />
        </div>
    </div>
  )
}

export default Sidebar