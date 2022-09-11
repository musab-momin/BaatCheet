import React, { useCallback } from 'react';
import { Alert, Button, Drawer, Icon } from 'rsuite'
import Dashboard from '.';
import { useDrawer, useMediaQuery } from '../../misc/custom-hooks';
import { auth } from '../../misc/firebase';


const DashboardToggle = () => {
    const {isOpen, open, close} = useDrawer();
    const isMobile = useMediaQuery('(max-width: 900px)');

    const onSignout = useCallback(()=>{
        auth.signOut();
        close();
        Alert.info('Signout', 3000);
    }, [close])

    return (
    <>
        <Button block color='blue' onClick={open}>
            <Icon icon='dashboard' /> Dashboard
        </Button>
        {/* full prop is for making dashboard responsive dashboard takes full width on mobile devices */}
        <Drawer full={ isMobile } show={isOpen} onHide={close} placement="left" >
            <Dashboard onSignout= { onSignout } />
        </Drawer>
    </>
  )
}

export default DashboardToggle