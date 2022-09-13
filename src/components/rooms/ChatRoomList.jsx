import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Loader, Nav } from 'rsuite';
import { useRooms } from '../../context/chatroom.context';
import ChatRoomItem from './ChatRoomItem';

const ChatRoomList = ({ aboveElementHeight }) => {
  const rooms = useRooms();
  const location = useLocation();

  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{ height: `calc(100% - ${aboveElementHeight}px)` }}
      activeKey={location.pathname}
    >
      {!rooms && <Loader vertical center size="md" speed="slow" />}
      {rooms?.map(room => (
        <Nav.Item
          componentClass={Link}
          to={`/chat/${room.id}`}
          eventKey={`/chat/${room.id}`}
          key={room.id}
        >
          <ChatRoomItem room={room} />
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default ChatRoomList;
