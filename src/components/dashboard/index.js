import React from 'react'
import { Button, Drawer } from 'rsuite'
import { useProfile } from '../../context/Profile.context'


// we named this component file as index.js bcoz while importing this file we just have to mention the folder name  import ./dashboar;
// and this file will get imported. It is just a trick
const Dashboard = ({ onSignout }) => {

  const { profile } = useProfile();

  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h3>Hey, { profile.name} </h3>
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