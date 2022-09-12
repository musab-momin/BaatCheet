import React from 'react'
import { Button, Divider, Drawer } from 'rsuite'
import { useProfile } from '../../context/Profile.context'
import EditableInput from '../EditableInput';


// we named this component file as index.js bcoz while importing this file we just have to mention the folder name  import ./dashboar;
// and this file will get imported. It is just a trick
const Dashboard = ({ onSignout }) => {

  const { profile } = useProfile();

  const onSave = async (newData) =>{
    console.log(newData);
  }

  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h3>Hey, { profile.name} </h3>
        <Divider />
        <EditableInput 
        name = "nickname"
        initialValue = { profile.name }
        onSave = { onSave }
        label = { <h6 className='mb-2'>Nickname</h6> }
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