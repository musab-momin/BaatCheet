import React from 'react';
import { useParams } from 'react-router';
import { Loader } from 'rsuite';
import { useRooms } from "../../context/chatroom.context";
import ChatTop from '../../components/chat-window/top';
import Messages from '../../components/chat-window/messages';
import ChatBottom from '../../components/chat-window/bottom';

const Chat = () => {
  const { chatId } = useParams();
  const chatRooms = useRooms();

  if(!chatRooms){
    return <Loader vertical center size="md" speed='slow' content="Loading..." />
  }

  const activeRoom = chatRooms.find(room => room.id === chatId);

  if(!activeRoom){
    return <h6 className='text-center mt-page'>Chat { chatId } not found</h6>
  }

  return (
    <>
      <div className="chat-top">
        <ChatTop />
      </div>
      <div className="chat-middle">
        <Messages />
      </div>
      <div className="chat-bottom">
        <ChatBottom />
      </div>
    </>
  );
};

export default Chat;
