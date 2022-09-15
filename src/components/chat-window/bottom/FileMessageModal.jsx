import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Alert, Button, Icon, InputGroup, Modal, Uploader } from 'rsuite';
import { useDrawer } from '../../../misc/custom-hooks';
import { storage } from '../../../misc/firebase';

const MAX_FILE_SIZE = 1000 * 1024 * 5       // this is equal to 5MB

const FileMessageModal = ({ afterUpload }) => {
  const { isOpen, open, close } = useDrawer();
  const [fileList, setFileList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {chatId} = useParams();


  const onFileChange = fileArr => {
    const filteredFiles = fileArr.filter(el => el.blobFile.size <= MAX_FILE_SIZE).slice(0, 5);  // only five files are allowed at a time
    setFileList(filteredFiles)
  }

  const handleUpload = async ()=>{
    setIsLoading(true);
    
    try {
        // first will upload the file into firebase storage it will give us promise for each file
        const filePromises = fileList.map( file => {
            return storage.ref(`/chat/${chatId}`)
            .child(Date.now() + file.name)  // to get unique name for file
            .put( file.blobFile, {
                cacheControl: `public, max-age=${3600 * 24 * 3}`
            })
        })    

        const uploadSnapshots = await Promise.all(filePromises);
        // we are retriving the download url for each file
        const snapPromises = uploadSnapshots.map( async snap => {
            return {
                contentType: snap.metadata.contentType,
                name: snap.metadata.name, 
                url: await snap.ref.getDownloadURL()
            }
        })

        const files = await Promise.all(snapPromises);
        await afterUpload(files)
        
        setIsLoading(false)
        close();

    } catch (err) {
        setIsLoading(false);
        Alert.error(err.message, 3000)
    }
  }

  return (
    <>
      <InputGroup.Button onClick={open}>
        <Icon icon="attachment" />
      </InputGroup.Button>

      <Modal show={isOpen} onHide={close} >
        <Modal.Header>
            <Modal.Title>Upload Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Uploader 
                autoUpload={false}
                fileList={fileList}
                action=""
                onChange={onFileChange}
                multiple
                listType='picture-text'
                className='w-100 mt-3'
                disabled={isLoading}
            />
        </Modal.Body>
        <Modal.Footer>
            <Button block onClick={handleUpload} disabled={isLoading}> send to chat </Button>
            <div className='text-right mt-2'>
                <small>*only files less 5MB are alllowed</small>
            </div>
        </Modal.Footer>
      </Modal>


    </>
  );
};

export default FileMessageModal;
