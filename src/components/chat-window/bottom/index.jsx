import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router';
import { InputGroup, Input, Icon, Alert } from 'rsuite';
import firebase from 'firebase/app';
import { useProfile } from '../../../context/Profile.context';
import { database } from '../../../misc/firebase';

function assembleMessage(profile, chatId) {
  return {
    roomId: chatId,
    author: {
      name: profile.name,
      uid: profile.uid,
      createdAt: profile.createdAt,
      ...(profile.avatar ? { avatar: profile.avatar } : {}), // if user has profile pic than it wil add avatar: image else it will add nothing
    },
    createdAt: firebase.database.ServerValue.TIMESTAMP,
  };
}

const ChatBottom = () => {
  const [mssg, setMssg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useProfile();
  const { chatId } = useParams();

  const onInputChange = useCallback(value => {
    setMssg(value);
  }, []);

  const onSendMssg = async () => {
    if (mssg.trim().length === 0) {
      // eslint-disable-next-line no-useless-return
      return;
    }

    const mssgData = assembleMessage(profile, chatId);
    mssgData.text = mssg;

    const updates = {};
    // we are creating a unique id for each mssg
    const messageId = database.ref('message').push().key;

    updates[`/messages/${messageId}`] = mssgData;
    updates[`/rooms/${chatId}/lastMessage`] = {
      ...mssgData,
      mssgId: messageId,
    };

    setIsLoading(true);
    try {
      // we will get the root of database when we don't write anything inside ref() function.
      await database.ref().update(updates);
      setMssg('');
      setIsLoading(false);
    } catch (error) {
      // console.log(error.message)
      setIsLoading(false);
      Alert.error(error.message, 3000);
    }
  };

  const handleOnKeyDown = (eve) =>{
    if(eve.keyCode === 13){
      eve.preventDefault();
      onSendMssg();
    }
  }

  return (
    <div>
      <InputGroup>
        <Input
          placeholder="type something..."
          value={mssg}
          onChange={onInputChange}
          onKeyDown={handleOnKeyDown}
        />
        <InputGroup.Button
          color="blue"
          appearance="primary"
          onClick={onSendMssg}
          disabled={isLoading}
        >
          <Icon icon="send" />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

export default ChatBottom;
