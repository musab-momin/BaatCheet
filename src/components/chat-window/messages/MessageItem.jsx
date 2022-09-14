import React from 'react';
import TimeAgo from 'timeago-react';
import ProfileAvatar from '../../dashboard/ProfileAvatar';
import PresenceIndicator from './PresenceIndicator';
import ProfileModal from './ProfileModal';

const MessageItem = ({ message }) => {
  const { author, createdAt, text } = message;



  return(
    <li className='padded mb-1'>
        <div className='d-flex align-items-center font-bolder mb-1'>
          <PresenceIndicator  userId = {author.uid} />
            <ProfileAvatar src={ author.avatar } name={author.name} className='ml-1' size='xs' />
            <ProfileModal author={author} />
            <TimeAgo 
            datetime={createdAt}
            className="font-normal text-black-45 ml-2"
            />
        </div>
        <div>
            <span className='work-break-all'> {text} </span>
        </div>

    </li>
  );
};

export default MessageItem;
