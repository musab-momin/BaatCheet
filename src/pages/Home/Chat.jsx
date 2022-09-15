import React from 'react';
import { useParams } from 'react-router';
import { Loader } from 'rsuite';
import { useRooms } from "../../context/chatroom.context";
import ChatTop from '../../components/chat-window/top';
import Messages from '../../components/chat-window/messages';
import ChatBottom from '../../components/chat-window/bottom';
import { transformToArray } from '../../misc/helper';
import { ActiveRoomProvider } from '../../context/active.room.context';
import { auth } from '../../misc/firebase';

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

  const {name, description} = activeRoom;
  const admins = transformToArray(activeRoom.admins);     // converting admins={} object to admins = [] array
  const isAdmin = admins.includes(auth.currentUser.uid)   // checking the current logged in user is a admin of the chatRoom or not

  const activeRoomData = {
    name, 
    description,
    admins,
    isAdmin
  }

  return (
    <ActiveRoomProvider data={activeRoomData}>
      <div className="chat-top">
        <ChatTop />
      </div>
      <div className="chat-middle hide-scrollbar">
        <Messages />
      </div>
      <div className="chat-bottom">
        <ChatBottom />
      </div>
    </ActiveRoomProvider>
  );
};

export default Chat;
