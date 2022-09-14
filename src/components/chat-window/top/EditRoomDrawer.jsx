import React from 'react';
import { useParams } from 'react-router';
import { Alert, Button, Drawer } from 'rsuite';
import { useActiveRoom } from '../../../context/active.room.context';
import { useDrawer, useMediaQuery } from '../../../misc/custom-hooks';
import { database } from '../../../misc/firebase';
import EditableInput from '../../EditableInput';

const EditRoomDrawer = () => {
  const { chatId } = useParams();
  const { isOpen, open, close } = useDrawer();
  const isMobile = useMediaQuery('(max-width: 990px)');

  const name = useActiveRoom(val => val.name);
  const description = useActiveRoom(val => val.description);

  const updateData = (key, value) => {
    database
      .ref(`/rooms/${chatId}`)
      .child(key)
      .set(value)
      .then(() => Alert.success('Updated Succesfully', 3000))
      .catch(err => Alert.error(err.message, 3000));
  };

  const onNameSave = newName => {
    updateData('name', newName);
  };

  const onDescriptionSave = newDescription => {
    updateData('description', newDescription);
  };

  return (
    <div>
      <Button className="btn-cricle" size="sm" color="red" onClick={open}>
        A
      </Button>
      <Drawer show={isOpen} full={isMobile}>
        <Drawer.Header>
          <Drawer.Title>Edit Room</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <EditableInput
            initialValue={name}
            onSave={onNameSave}
            label={<h6 className="mb-2">Name</h6>}
          />
          <EditableInput
            componentClass="textarea"
            row={5}
            initialValue={description}
            onSave={onDescriptionSave}
            label={<h6 className="mb-2">Name</h6>}
            wrapperClass="mt-3"
          />
        </Drawer.Body>
        <Drawer.Footer>
          <Button block onClick={close}>
            Close
          </Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
};

export default EditRoomDrawer;
