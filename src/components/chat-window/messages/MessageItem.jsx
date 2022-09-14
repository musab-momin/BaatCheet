import React, { memo } from 'react';
import { Button } from 'rsuite';
import TimeAgo from 'timeago-react';
import { useActiveRoom } from '../../../context/active.room.context';
import { useHover, useMediaQuery } from '../../../misc/custom-hooks';
import { auth } from '../../../misc/firebase';
import ProfileAvatar from '../../dashboard/ProfileAvatar';
import IconContolBtn from './IconContolBtn';
import PresenceIndicator from './PresenceIndicator';
import ProfileModal from './ProfileModal';

const MessageItem = ({ message, handleAdmin, handleLike }) => {
  const { author, createdAt, text, likes, likeCount } = message;

  const [selfRef, isHovered] = useHover();
  const isMobile = useMediaQuery('(max-width: 990px)');

  const isAdmin = useActiveRoom(val => val.isAdmin);
  const admins = useActiveRoom(val => val.admins);

  const isMssgAuthorIsAdmin = admins.includes( author.uid );
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdminPermission = isAdmin && !isAuthor;

  // checking the loggedin user have signed the message or not
  const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);
  const canShowIcon = isMobile || isHovered   // show like icon only eighter we are hovering on it or we are in mobile device

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
            <IconContolBtn 
            { ...(isLiked ? {color: 'red'} : {}) }
            isVisible = {canShowIcon}
            iconName = 'Heart'
            tooltip = {!isLiked ? 'give it a like' : 'revoke heart' }
            onClick = {() => handleLike(message.id)}
            badgeContent = {likeCount}
            />
        </div>
        <div>
            <span className='work-break-all'> {text} </span>
        </div>

    </li>
  );
};

export default memo(MessageItem);
