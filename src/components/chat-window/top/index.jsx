import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonToolbar, Icon } from 'rsuite';
import { useActiveRoom } from '../../../context/active.room.context';
import { useMediaQuery } from '../../../misc/custom-hooks';
import EditRoomDrawer from './EditRoomDrawer';
import RoomInfoModal from './RoomInfoModal';

const ChatTop = () => {
  const roomName = useActiveRoom(value => value.name);
  const isMobile = useMediaQuery('(max-width: 990px)');

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className='text-disappear d-flex align-items-center'>
          <Icon
            componentClass={Link}
            to="/"
            icon="arrow-circle-left"
            size='2x'
            className={
              isMobile ? 'd-inline-block p-0 mr-2 text-blue link-unstyled' : 'd-none'
            }
          />
          <span> {roomName} </span>
        </h4>
        <ButtonToolbar className='white-space-nowarp'>
          <EditRoomDrawer />
        </ButtonToolbar>
      </div>
      <div className='d-flex justify-content-between align-items-center'>
        <span>TODO://</span>
        <RoomInfoModal />
      </div>
    </div>
  );
};

export default React.memo(ChatTop);
