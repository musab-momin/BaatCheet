import React from 'react'
import { Button, Drawer, Icon } from 'rsuite'
import Dashboard from '.';
import { useDrawer, useMediaQuery } from '../../misc/custom-hooks';


const DashboardToggle = () => {
    const {isOpen, open, close} = useDrawer();
    const isMobile = useMediaQuery('(max-width: 900px)');


    return (
    <>
        <Button block color='blue' onClick={open}>
            <Icon icon='dashboard' /> Dashboard
        </Button>
        {/* full prop is for making dashboard responsive dashboard takes full width on mobile devices */}
        <Drawer full={ isMobile } show={isOpen} onHide={close} placement="left" >
            <Dashboard />
        </Drawer>
    </>
  )
}

export default DashboardToggle