import React, { useRef, useState } from 'react';
import { Alert, Button, Modal } from 'rsuite';
import AvatarEditor from 'react-avatar-editor';
import { useDrawer } from '../../misc/custom-hooks';
import { database, storage } from '../../misc/firebase';
import { useProfile } from '../../context/Profile.context';
import ProfileAvatar from './ProfileAvatar';

const inputFileTypes = '.png, .jpeg, .jpg, .webp';

const acceptableImageTypes = [
  'image/png',
  'image/jpeg',
  'image/pjeg',
  'image/jpg',
  'image/webp',
];
const isValidFile = file => acceptableImageTypes.includes(file.type);

// we are creating the function so that it will convert canvas to blob file with promise bcoz we want this operation to async
const getBlob = canvas => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(actualBlob => {
      if (actualBlob) {
        resolve(actualBlob);
      } else {
        reject(new Error('Error while converting image to blub'));
      }
    });
  });
};

const UploadAvatar = () => {
  const { isOpen, open, close } = useDrawer();
  const { profile } = useProfile();
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const avatarCanvasRef = useRef(null);

  const onFileChange = eve => {
    // selected files are always is array format
    const selectedFiles = eve.target.files;

    // we are checking the length of file array bcoz only one file is allowed
    if (selectedFiles.length === 1) {
      const currentFile = selectedFiles[0];
      if (isValidFile(currentFile)) {
        setImage(currentFile);
        open();
      } else {
        Alert.warning('Select a valid image file', 3000);
      }
    }
  };

  const handleUpload = async () => {
    const canvas = avatarCanvasRef.current.getImageScaledToCanvas();
    // convert canvas to bulb file
    setIsLoading(true);
    try {
      const readyBlob = await getBlob(canvas);
      const avatarFileRef = storage
        .ref(`/profiles/${profile.uid}`)
        .child('avatar');

      // now we are storing our blob file insdie firebase storage
      const uploadAvatarResult = await avatarFileRef.put(readyBlob, {
        cacheControl: `public, max-age=${3600 * 24 * 3}`, // this is a payload to cache the image on browser and the math is equal to 3 days
      });

      // we are getting the download url of uploaded image
      const avatarDownloadURL = await uploadAvatarResult.ref.getDownloadURL();

      const userAvatarRef = database
        .ref(`/profiles/${profile.uid}`)
        .child('avatar');
      userAvatarRef.set(avatarDownloadURL);

      Alert.success('Profile image is uploaded', 3000);
      setIsLoading(false);
    } catch (err) {
      Alert.error(err.message, 3000);
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-3 text-center">
      <ProfileAvatar
        src={profile.avatar}
        name={profile.name}
        className="width-150 height-150 img-fullsize font-huge"
      />
      <div>
        <label htmlFor="profile-pic" className="d-block cursor-pointer padded">
          Select new avatar
          <input
            type="file"
            id="profile-pic"
            className="d-none"
            accept={inputFileTypes}
            onChange={onFileChange}
          />
        </label>

        {/* modal for image preview */}
        <Modal show={isOpen} onHide={close}>
          <Modal.Header>
            <Modal.Title>Upload new avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center">
              {image && (
                <AvatarEditor
                  ref={avatarCanvasRef}
                  image={image}
                  width={150}
                  height={150}
                  border={1}
                  borderRadius={100}
                  rotate={0}
                />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              block
              appearance="ghost"
              onClick={handleUpload}
              disabled={isLoading}
            >
              Upload
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default UploadAvatar;
