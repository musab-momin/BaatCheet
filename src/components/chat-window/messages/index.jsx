import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import { Alert } from 'rsuite';
import { auth, database } from '../../../misc/firebase';
import { transformToArrayById } from '../../../misc/helper';
import MessageItem from './MessageItem';

const Messages = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState(null);

  const isChatEmpty = messages && messages.length === 0;
  const showMessages = messages && messages.length > 0;

  useEffect(() => {
    const messageRef = database.ref('/messages');

    messageRef
      .orderByChild('roomId')
      .equalTo(chatId)
      .on('value', snap => {
        const messageData = transformToArrayById(snap.val());
        setMessages(messageData);
      });

    return () => messageRef.off('value');
  }, [chatId]);

  // this function is for adding and revoking admin permission to perticular user
  const handleAdmin = useCallback(
    async uid => {
      const adminRef = database.ref(`/rooms/${chatId}/admins`);
      let alertMssg;
      await adminRef.transaction(admins => {
        if (admins) {
          if (admins[uid]) {
            admins[uid] = null;
            alertMssg = 'Admin permission removed';
          } else {
            admins[uid] = true;
            alertMssg = 'Admin permission granted';
          }
        }
        return admins;
      });
      Alert.info(alertMssg, 3000);
    },
    [chatId]
  );

  const handleLike = useCallback(async mssgId => {
    const { uid } = auth.currentUser;
    const messageRef = database.ref(`/messages/${mssgId}`);
    await messageRef.transaction(mssg => {
      if (mssg) {
        if (mssg.likes && mssg.likes[uid]) {
          mssg.likeCount -= 1;
          mssg.likes[uid] = null;
        } else {
          mssg.likeCount += 1;
          if (!mssg.likes) {
            mssg.likes = {};
          }
          mssg.likes[uid] = true;
        }
      }
      return mssg;
    });
  }, []);

  const handleDelete = useCallback(async mssgId => {
    // check the user want to delete this by confirm window
    // eslint-disable-next-line no-alert
    if(!window.confirm("Do you want to delete this message")){
      // eslint-disable-next-line no-useless-return
      return;
    }

    // checking the deleting msssg is last or not bcoz we show last mssg with chat room
    const isLast = messages[messages.length - 1].id === mssgId; 

    const updates = {}

    // deleting mssg from message table
    updates[`/messages/${mssgId}`] = null;

    // if our message is the last mssg so we have to delete it and set the previouse mssg to last message inside rooms table
    if(isLast && messages.length > 1){
      updates[`/rooms/${ chatId }/lastMessage`] = {
        ...messages[messages.length - 2],
        msgId: messages[messages.length - 2].id
      }
    }

    if(isLast && messages.length === 1){
      updates[`/rooms/${ chatId }/lastMessage`] = null
    }

    try {
      await database.ref().update(updates)
      Alert.info('Message has been deleted', 3000)
    } catch (err) {
      Alert.error(err.message, 3000) 
    }

  }, [messages, chatId]);

  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li> No messages yet! </li>}
      {showMessages &&
        messages.map(mssg => (
          <MessageItem
            key={mssg.id}
            message={mssg}
            handleAdmin={handleAdmin}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        ))}
    </ul>
  );
};

export default Messages;
