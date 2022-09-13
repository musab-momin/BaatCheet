import React from 'react';
import { useParams } from 'react-router';
import { Grid, Row, Col } from 'rsuite';
import Sidebar from '../../components/Sidebar';
import { RoomProvider } from '../../context/chatroom.context';
import Chat from './Chat';

const Home = () => {

  const link = useParams();
//  const isDesktop = useMediaQuery('(min-width: 990px)');


  return (
    <RoomProvider>
      <Grid fluid className="h-100">
        <Row className="h-100">
          <Col xs={24} md={8} className="h-100">
            <Sidebar />
          </Col>
          <Col xs={24} md={8} className="h-100">
          {
            link.chatId ? <Chat /> : <h5 className='text-center mt-page'>Please select Chat...</h5>
          }
          </Col>

        </Row>
      </Grid>
    </RoomProvider>
  );
};

export default Home;
