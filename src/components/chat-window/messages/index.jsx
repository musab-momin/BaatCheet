import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { database } from '../../../misc/firebase';
import { transformToArrayById } from '../../../misc/helper';
import MessageItem from './MessageItem';

const Messages = () => {

  const {chatId} = useParams();
  const [messages, setMessages] = useState(null);

  const isChatEmpty = messages && messages.length === 0
  const showMessages = messages && messages.length > 0

  useEffect(()=>{
    const messageRef = database.ref('/messages');

    messageRef.orderByChild('roomId').equalTo(chatId).on('value', snap =>{

      const messageData = transformToArrayById(snap.val());
      setMessages(messageData)
    })

    return () => messageRef.off("value")

  }, [chatId])

  return (
    <ul className='msg-list custom-scroll'>
      {isChatEmpty && <li> No messages yet! </li>}
      { showMessages && messages.map( mssg => <MessageItem key={mssg.id} message = {mssg}  /> ) }
    </ul>
  )
}

export default Messages