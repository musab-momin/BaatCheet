import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import { Alert } from 'rsuite';
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

  const handleAdmin = useCallback(async (uid)=>{
    const adminRef = database.ref(`/rooms/${chatId}/admins`);
    let alertMssg;
    await adminRef.transaction(admins => {
      if(admins){
       if(admins[uid]){
        admins[uid] = null
        alertMssg = "Admin permission removed"
        } else {
          admins[uid] = true
          alertMssg = "Admin permission granted"
        }
      }
      return admins;
    })
    Alert.info(alertMssg, 3000);
  }, [chatId])

  return (
    <ul className='msg-list custom-scroll'>
      {isChatEmpty && <li> No messages yet! </li>}
      { showMessages && messages.map( mssg => <MessageItem key={mssg.id} message = {mssg} handleAdmin={handleAdmin} /> ) }
    </ul>
  )
}

export default Messages