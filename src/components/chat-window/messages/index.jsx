/* eslint-disable consistent-return */
import React, { useState, useEffect, useCallback, useRef} from 'react';
import { useParams } from 'react-router';
import { Alert, Button } from 'rsuite';
import { auth, database, storage } from '../../../misc/firebase';
import { groupBy, transformToArrayById } from '../../../misc/helper';
import MessageItem from './MessageItem';


const PAGE_LIMIT = 5 
const messageRef = database.ref('/messages');

const shouldScrollBottom = (node, threshold = 30) =>{
  const percentage = (100 * node.scrollTop) / (node.scrollHeight - node.clientHeight) || 0
  return percentage > threshold;
}

const Messages = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState(null);
  const [limit, setLimit] = useState(PAGE_LIMIT)
  const refToLastMssg = useRef(null);

  const isChatEmpty = messages && messages.length === 0;
  const showMessages = messages && messages.length > 0;

  const loadMessages = useCallback((limitToLast)=>{
    
    const node = refToLastMssg.current;
    // unsubscribe from previouse transaction
    messageRef.off();

    messageRef
      .orderByChild('roomId')
      .equalTo(chatId)
      .limitToLast(limitToLast || PAGE_LIMIT)   // page_limit is for intial page load
      .on('value', snap => {
        const messageData = transformToArrayById(snap.val());
        setMessages(messageData);
        if(shouldScrollBottom(node)){
          node.scrollTop = node.scrollHeight;
        }
      });

    setLimit(prev => prev + PAGE_LIMIT)  // increase fetch limit on every fetch  
  }, [chatId])

  const onLoadMore = useCallback(()=>{
    loadMessages(limit)
  }, [limit, loadMessages])

  useEffect(() => {
    const node = refToLastMssg.current;
    loadMessages();
    
    // scrolling down the the last message
    setTimeout(()=>{
      // we wrote belowe line in setTimeout bcoz we want below line to run after loadMessage function and loadMessage is a async function 
      // so there is change that below line will run before loadMessage to prevent it we wrap below line inside setTimeout and setTimeout
      // always run after all async call backs are finished
      node.scrollTop = node.scrollHeight
    }, 100)
    
    return () => messageRef.off('value');
  }, [loadMessages]);


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
    const messagesRef = database.ref(`/messages/${mssgId}`);
    await messagesRef.transaction(mssg => {
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

  const handleDelete = useCallback(
    async (mssgId, file) => {
      // check the user want to delete this by confirm window
      // eslint-disable-next-line no-alert
      if (!window.confirm('Do you want to delete this message')) {
        // eslint-disable-next-line no-useless-return
        return;
      }

      // checking the deleting msssg is last or not bcoz we show last mssg with chat room
      const isLast = messages[messages.length - 1].id === mssgId;

      const updates = {};

      // deleting mssg from message table
      updates[`/messages/${mssgId}`] = null;

      // if our message is the last mssg so we have to delete it and set the previouse mssg to last message inside rooms table
      if (isLast && messages.length > 1) {
        updates[`/rooms/${chatId}/lastMessage`] = {
          ...messages[messages.length - 2],
          msgId: messages[messages.length - 2].id,
        };
      }

      if (isLast && messages.length === 1) {
        updates[`/rooms/${chatId}/lastMessage`] = null;
      }

      try {
        await database.ref().update(updates);
        Alert.info('Message has been deleted', 3000);
      } catch (err) {
        return Alert.error(err.message, 3000);
      }

      if (file) {
        try {
          const fileRef = storage.refFromURL(file.url);
          await fileRef.delete();
        } catch (err) {
          Alert.error(err.message, 3000);
        }
      }
    },
    [messages, chatId]
  );

  const renderMessages = () => {
    const groups = groupBy(messages, item =>
      new Date(item.createdAt).toDateString()
    );

    const items = [];
    Object.keys(groups).forEach(date => {
      items.push(<li className="text-center mb-1 padded">{date}</li>);
      const mssges = groups[date].map(mssg => (
        <MessageItem
          key={mssg.id}
          message={mssg}
          handleAdmin={handleAdmin}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      ));
      items.push([...mssges]);
    });
    return items;
  };

  return (
    <ul className="msg-list custom-scroll" ref={refToLastMssg}>
      {messages && messages.length >= PAGE_LIMIT && (
        <li className='text-center mt-2 mb-2'>
          <Button onClick={onLoadMore} color="green" appearance='link'>Load more</Button>
        </li>
      )}
      {isChatEmpty && <li> No messages yet! </li>}
      {showMessages && renderMessages()}
    </ul>
  );
};

export default Messages;
