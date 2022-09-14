import React, { memo } from 'react';
import { Button } from 'rsuite';
import TimeAgo from 'timeago-react';
import { useActiveRoom } from '../../../context/active.room.context';
import { useHover } from '../../../misc/custom-hooks';
import { auth } from '../../../misc/firebase';
import ProfileAvatar from '../../dashboard/ProfileAvatar';
import PresenceIndicator from './PresenceIndicator';
import ProfileModal from './ProfileModal';

const MessageItem = ({ message, handleAdmin }) => {
  const { author, createdAt, text } = message;

  const [selfRef, isHovered] = useHover();

  const isAdmin = useActiveRoom(val => val.isAdmin);
  const admins = useActiveRoom(val => val.admins);

  const isMssgAuthorIsAdmin = admins.includes( author.uid );
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdminPermission = isAdmin && !isAuthor;


  return(
    <li className={`padded mb-1 cursor-pointer ${isHovered ? 'bg-black-02' : ''}`} ref={selfRef}>
        <div className='d-flex align-items-center font-bolder mb-1'>
          <PresenceIndicator  userId = {author.uid} />
            <ProfileAvatar src={ author.avatar } name={author.name} className='ml-1' size='xs' />
            <ProfileModal author={author}>
              {
                canGrantAdminPermission &&
                <Button block color='blue' onClick={()=>{ handleAdmin(author.uid) }}>
                  { isMssgAuthorIsAdmin ? 'Remove admin' : 'Make admin' }
                </Button>
              }
            </ProfileModal>
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

export default memo(MessageItem);
