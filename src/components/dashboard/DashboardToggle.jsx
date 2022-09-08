import React from 'react'
import { Button, Drawer, Icon } from 'rsuite'
import Dashboard from '.';
import { useDrawer } from '../../misc/custom-hooks';


const DashboardToggle = () => {
    const {isOpen, open, close} = useDrawer();
  
    return (
    <>
        <Button block color='blue' onClick={open}>
            <Icon icon='dashboard' /> Dashboard
        </Button>
        <Drawer show={isOpen} onHide={close} placement="left" >
            <Dashboard />
        </Drawer>
    </>
  )
}

export default DashboardToggle