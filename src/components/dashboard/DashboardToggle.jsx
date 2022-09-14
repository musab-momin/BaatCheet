import React, { useCallback } from 'react';
import { Navigate } from 'react-router';
import { Alert, Button, Drawer, Icon } from 'rsuite'
import Dashboard from '.';
import { isOfflineForDatabase } from '../../context/Profile.context';
import { useDrawer, useMediaQuery } from '../../misc/custom-hooks';
import { auth, database } from '../../misc/firebase';


const DashboardToggle = () => {
    const {isOpen, open, close} = useDrawer();
    const isMobile = useMediaQuery('(max-width: 900px)');

    const onSignout = useCallback(()=>{
        // changingt the user status on database for real time presence
        database.ref(`/status/${auth.currentUser.uid}`)
        .set(isOfflineForDatabase)
        .then(()=>{
            auth.signOut();
            close();
            Alert.info('Signout', 3000);
            <Navigate replace to='/signin' />
        }).catch(err => Alert.error(err.message, 3000));
        
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