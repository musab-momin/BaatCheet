import React, { useState, useCallback } from 'react';
import { ReactMic } from 'react-mic';
import { useParams } from 'react-router';
import { Alert, Icon, InputGroup } from 'rsuite';
import { storage } from '../../../misc/firebase';

const AudioMessageModal = ({ afterUpload }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { chatId } = useParams();

  const audioClick = useCallback(() => {
    setIsRecording(!isRecording);
  }, [isRecording]);

  const onAudioUpload = useCallback(
    async audioData => {
      setIsLoading(true);
      try {
        const snap = await storage
          .ref(`/chat/${chatId}`)
          .child(`audio_${Date.now()}.mp3`)
          .put(audioData.blob, {
            cacheControl: `public, max-age=${3600 * 24 * 3}`,
          });

        const file = {
          contentType: snap.metadata.contentType,
          name: snap.metadata.name,
          url: await snap.ref.getDownloadURL(),
        };
        afterUpload([file]);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        Alert.error(err.message, 3000);
      }
    },
    [afterUpload, chatId, setIsLoading]
  );

  return (
    <InputGroup.Button
      onClick={audioClick}
      disabled={isLoading}
      className={isRecording ? 'animate-blink' : ''}
    >
      <Icon icon="microphone" />
      <ReactMic
        record={isRecording}
        className="d-none"
        onStop={onAudioUpload}
        mimeType="audio/mp3"
      />
    </InputGroup.Button>
  );
};

export default AudioMessageModal;
