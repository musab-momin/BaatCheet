import React from 'react'
import { Alert, Button, Divider, Drawer } from 'rsuite'
import { useProfile } from '../../context/Profile.context'
import { database } from '../../misc/firebase';
import EditableInput from '../EditableInput';
import ProviderBlock from './ProviderBlock';


// we named this component file as index.js bcoz while importing this file we just have to mention the folder name  import ./dashboar;
// and this file will get imported. It is just a trick
const Dashboard = ({ onSignout }) => {

  const { profile } = useProfile();

  const onSave = async (newData) =>{
    const usernameRef = database.ref(`/profiles/${profile.uid}`).child('name');
    
    try{
      await usernameRef.set(newData)
      Alert.success('Username has been updated', 3000);
    }catch(err){
      Alert.error(err.message, 3000);
    }
  
  }

  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h3>Hey, { profile.name} </h3>
        <ProviderBlock />
        <Divider />
        <EditableInput 
        name = "nickname"
        initialValue = { profile.name }
        onSave = { onSave }
        label = { <h6 className='mb-2'>Username</h6> }
        />
      </Drawer.Body>
      <Drawer.Footer>
        <Button block color='red' onClick={onSignout}>
          sign out
        </Button>
      </Drawer.Footer>

    </>
  )
}

export default Dashboard