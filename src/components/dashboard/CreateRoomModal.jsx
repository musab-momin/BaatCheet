import React, { useState, useRef, useCallback } from 'react';
import {
  Alert,
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Icon,
  Modal,
  Schema,
} from 'rsuite';
import firebase from 'firebase/app';
import { useDrawer } from '../../misc/custom-hooks';
import { auth, database } from '../../misc/firebase';

const INITIAL_FRM = {
  name: '',
  description: '',
};

// rsuit does the form validation for us. to do so we have to create our own schema(validation rules)
const { StringType } = Schema.Types;

const validationModel = Schema.Model({
  name: StringType().isRequired('name is required'), // we spedify that name should be of type string and it should not be an emptry field
  description: StringType().isRequired('description is required'), // same as name
});

const CreateRoomModal = () => {
  const { isOpen, open, close } = useDrawer();
  const [formValues, setFormValues] = useState(INITIAL_FRM);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);

  const onFormChange = useCallback(value => {
    setFormValues(value);
  }, []);

  const handleSubmit = async () => {
    // .check() is the function from rsuit it will check form values against our formModelSchema
    if (!formRef.current.check()) {
      // eslint-disable-next-line no-useless-return
      return;
    }

    setIsLoading(true);
    const newRoomData = {
      ...formValues,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      admins: {
        [auth.currentUser.uid] : true,
      }
    }; 

    try {
      await database.ref('/rooms').push(newRoomData);
      Alert.info(`${formValues.name} has been created`, 3000);
      setIsLoading(false);
      setFormValues(INITIAL_FRM);
      close(); // to close modal
    } catch (error) {
      setIsLoading(false);
      Alert.error(error.message, 3000);
    }
  };

  return (
    <div className="mt-2">
      <Button block color="green" onClick={open}>
        <Icon icon="creative" /> Create Baithak
      </Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>Start New Baithak</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* fluid make element to take full width of it's parent */}
          <Form
            ref={formRef}
            fluid
            onChange={onFormChange}
            formValue={formValues}
            model={validationModel}
          >
            <FormGroup>
              <ControlLabel>Name</ControlLabel>
              <FormControl name="name" />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                rows={5}
                name="description"
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            appearance="primary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {' '}
            create it!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRoomModal;
