import React from 'react';
import { Badge, Tooltip, Whisper } from 'rsuite';
import { usePresence } from '../../../misc/custom-hooks';

const getColor = (presence) => {
    if(!presence){
        return 'grey'
    }
    if(presence.state === 'online'){
        return 'green'
    }
    if(presence.state === 'offline'){
        return 'grey'
    }
    return 'grey';
}


const getText = (presence) => {
    if(!presence){
        return 'uknow state'
    }
    return presence.state === 'online' ? 'Online' : `Last seen ${new Date(presence.last_changed).toLocaleDateString()}`
}


const PresenceIndicator = ({ userId }) => {
  const presence = usePresence(userId);

  return (
    <Whisper
      placement="top"
      controlId="control-id-hover"
      trigger="hover"
      speaker={
        <Tooltip>
          {getText(presence)}
        </Tooltip>
      }
    >
      <Badge className='cursor-pointer' style={{ background: getColor(presence) }} />
    </Whisper>
  );
};

export default PresenceIndicator;
