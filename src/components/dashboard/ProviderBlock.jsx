import React, { useState } from 'react';
import firebase from 'firebase/app';
import { Icon, Tag, Button, Alert } from 'rsuite';
import { auth } from '../../misc/firebase';


const ProviderBlock = () => {

    // we are checking the user is loggedin by google or facebook
    const [isConnected, setIsConnected] = useState({
        'google.com': auth.currentUser ? auth?.currentUser.providerData.some(data => data.providerId === 'google.com') : false,
        'facebook.com': auth.currentUser ? auth.currentUser.providerData.some(data => data.providerId === 'facebook.com') : false
    });

    const updateIsConnected = (providerId, value) => {
        setIsConnected(prevState => {
            return { ...prevState, [providerId]: value }
        })
    }

    const unlink = async (providerId)=>{
        try {
            // if user is connect by only one provider (eighter by google or facebook) in that case we won't allow user to disconnect
            if(auth.currentUser.providerData.length === 1){
                throw new Error(`You can not disconnect from ${providerId}`)
            }

            // if user is connect by both provider google and facebook.
            await auth.currentUser.unlink(providerId)
            updateIsConnected(providerId, false)            
            Alert.info(`Disconnected from ${providerId}`)

        } catch (error) {
            Alert.error(error.message, 3000);
        }
    }

    const unlinkGoogle = ()=>{
        unlink('google.com')
    }
    const unlinkFacebook = ()=>{
        unlink('facebook.com')
    }

    const link = async (providerObj)=>{
        try {
            await auth.currentUser.linkWithPopup(providerObj)
            updateIsConnected(providerObj.providerId, true)  
            Alert.info(`Linked with ${providerObj.providerId}`);
        } catch (err) {
            Alert.error(err.message, 3000);
        }
    }

    const linkGoogle = ()=>{
        link( new firebase.auth.GoogleAuthProvider() )
    }
    const linkFacebook = ()=>{
        link( new firebase.auth.FacebookAuthProvider() )
    }

  return (
    <div>
        {
            isConnected['google.com'] &&
        <Tag color='green' closable onClose={unlinkGoogle} >
            <Icon icon='google' /> Connected
        </Tag>
        }
        {
            isConnected['facebook.com'] &&
        <Tag color='blue' closable onClose={unlinkFacebook}>
            <Icon icon='facebook' /> Connected
        </Tag>
        }
        <div className='mt-2'>
        {
            !isConnected['google.com'] &&
            <Button block color='green' onClick={linkGoogle}>
                <Icon icon='google' />Link to google
            </Button>
        }
        {
            !isConnected['facebook.com'] &&
            <Button block color='blue' onClick={linkFacebook}>
                <Icon icon='facebook' />Link to facebook
            </Button>

        }
        </div>
    </div>
  )
}

export default ProviderBlock