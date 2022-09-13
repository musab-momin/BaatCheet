import React from 'react';
import { Grid, Row, Col } from 'rsuite';
import Sidebar from '../components/Sidebar';
import { RoomProvider } from '../context/chatroom.context';

const Home = () => {
  return (
    <RoomProvider>
      <Grid fluid className="h-100">
        <Row className="h-100">
          <Col xs={24} md={8} className="h-100">
            <Sidebar />
          </Col>
        </Row>
      </Grid>
    </RoomProvider>
  );
};

export default Home;
