import React, {useEffect, useRef, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, Stack} from '@mui/material';
import {useCallback} from 'react';
import AvatarEditor from 'react-avatar-editor';
import '../../firebase';
import {useSelector} from 'react-redux';
import {getDownloadURL, getStorage, ref as refStorage, uploadBytes} from 'firebase/storage';
import {updateProfile} from 'firebase/auth';
import {getDatabase, ref, update} from 'firebase/database';

function ProfileModal({open, handleClose}) {
  const {user} = useSelector((state) => state);
  const [previewImage, setPreviewImage] = useState('');
  const [croppedImage, setCroppedImage] = useState('');
  const [blob, setBlob] = useState('');
  const [uploadedCroppedImage, setUploadedCroppedImage] = useState('');
  const avatarEditorRef = useRef(null);

  const closeModal = useCallback(() => {
    handleClose();
    setPreviewImage('');
    setCroppedImage('');
    setUploadedCroppedImage('');
  }, [handleClose]);

  const handleChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      setPreviewImage(reader.result);
    });
  }, []);

  const handleCropImage = useCallback(() => {
    avatarEditorRef.current.getImageScaledToCanvas().toBlob((blob) => {
      const imageUrl = URL.createObjectURL(blob);
      setCroppedImage(imageUrl);
      setBlob(blob);
    });
  }, []);

  const uploadCroppedImage = useCallback(async () => {
    if (!user.currentUser?.uid) return;
    const storageRef = refStorage(getStorage(), `avatars/users/${user.currentUser.uid}`);
    const uploadTask = await uploadBytes(storageRef, blob);
    const downloadUrl = await getDownloadURL(uploadTask.ref);
    setUploadedCroppedImage(downloadUrl);
  }, [blob, user.currentUser.uid]);

  useEffect(() => {
    if (!uploadedCroppedImage || !user.currentUser) return;
    async function changeAvatar() {
      await updateProfile(user.currentUser, {
        photoURL: uploadedCroppedImage,
      });
      const newData = {avatar: uploadedCroppedImage};
      const updates = {};
      updates['/users/' + user.currentUser.uid] = newData;
      await update(ref(getDatabase()), updates);
      closeModal();
    }
    changeAvatar();
  }, [closeModal, uploadedCroppedImage, user.currentUser]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>프로필 이미지 변경</DialogTitle>
      <DialogContent>
        <Stack direction="column" spacing={3}>
          <Input
            type="file"
            inputProps={{accept: 'image/jpeg, image/jpg, image/png'}}
            label="변결할 프로필 이미지 선택"
            onChange={handleChange}
          />
          <div style={{display: 'flex', alignItems: 'center'}}>
            {previewImage && (
              <AvatarEditor
                ref={avatarEditorRef}
                image={previewImage}
                width={120}
                height={120}
                border={50}
                scale={2}
                style={{display: 'inline'}}
              />
            )}
            {croppedImage && (
              <img alt="cropped" style={{marginLeft: '50px'}} width={100} height={100} src={croppedImage} />
            )}
          </div>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>취소</Button>
        {previewImage && <Button onClick={handleCropImage}>이미지 변경</Button>}
        {croppedImage && <Button onClick={uploadCroppedImage}>이미지 적용</Button>}
      </DialogActions>
    </Dialog>
  );
}

export default ProfileModal;
