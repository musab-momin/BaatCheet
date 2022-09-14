import React from 'react'
import { Button, Modal } from 'rsuite'
import { useDrawer } from '../../../misc/custom-hooks';
import ProfileAvatar from '../../dashboard/ProfileAvatar';

const ProfileModal = ({ author, children }) => {
    
    const { isOpen, open, close } = useDrawer();
    const firstname = author.name.split(' ')[0]
    const membersince = new Date(author.createdAt).toLocaleDateString();

    return (
    <>
        <Button onClick={open} appearance='link' className='p-0 ml-1 text-black'>
            { firstname }
        </Button>
        <Modal show={ isOpen } onHide={ close }>
            <Modal.Header>
                <Modal.Title> {firstname} profile </Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
                <ProfileAvatar 
                src={ author.avatar } 
                name={author.name} 
                className='width-150 height-150 img-fullsize font-huge' 
                />
                <h4 className='mt-2'>{ author.name }</h4>
                <p>Member since { membersince }</p>
            </Modal.Body>
            <Modal.Footer>
                { children }
                <Button block onClick={close}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default ProfileModal