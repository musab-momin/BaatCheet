import React, {memo} from 'react';
import { Button, Modal } from 'rsuite';
import { useActiveRoom } from '../../../context/active.room.context';
import { useDrawer } from '../../../misc/custom-hooks';

const RoomInfoModal = () => {
  const { isOpen, open, close } = useDrawer();
  const name = useActiveRoom(val => val.name);
  const description = useActiveRoom(val => val.description);

  return (
    <>
      <Button appearance="link" className="px-0" onClick={open}>
        Room info
      </Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>About, {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="mb-1">Description</h6>
          <p>{description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button block onClick={close} color="red">
            {' '}
            close{' '}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo(RoomInfoModal);
