import {InsertEmoticon} from '@mui/icons-material';
import {Grid, IconButton, InputAdornment, LinearProgress, TextField} from '@mui/material';
import React, {useCallback, useState} from 'react';
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';
import '../../firebase';
import {getDatabase, push, ref, serverTimestamp, set} from 'firebase/database';
import { useSelector } from 'react-redux';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import ImageModal from '../Modal/ImageModal';



function ChatInput() {
  const {channel, user} = useSelector((state) => state);
    const [message, setMessage] = useState('');
    const [showEmoji, setShowEmogi] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [percent, setPercent] = useState(0);

    
    const handleTogglePicker = useCallback(() => setShowEmogi((show) => !show), [])
    
    const handleClickOpen = useCallback(() => setImageModalOpen(true),[])
    const handleClickClose =  useCallback(() => setImageModalOpen(false),[])
    
  const handleChange = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const createMessage = useCallback(() => ({
    timestamp: serverTimestamp(),
      user: { id: user.currentUser.uid, name: user.currentUser.displayName, avatar: user.currentUser.photoURL },
    content:message
  }), [message, user.currentUser.displayName, user.currentUser.photoURL, user.currentUser.uid]);
    
    
  const clickSendMessage = useCallback(async () => {
    if (!message) return;
    setLoading(true);
    try {
        await set(
            push(ref(getDatabase(), 'messages/' + channel.currentChannel.id)),
            createMessage()
        );
        setLoading(false);
        setMessage("")
    } catch (error) {
        console.error(error)
        setLoading(false)
    }
  }, [channel.currentChannel?.id, createMessage, message]);
    
    
    
    const handleSelectEmoji = useCallback((e) => {
        const sym = e.unified.split("-");
        const codesArray = [];
        sym.forEach(el => codesArray.push("0x" + el));
        const emoji = String.fromCodePoint(...codesArray);
        setMessage((messageValue) => messageValue+emoji)
    },[])
    
  return (
    <Grid container sx={{p: '20px'}}>
      <Grid item xs={12} sx={{position: 'relative'}}>
        {showEmoji && (
          <Picker
            set="google"
            className="emojipicker"
            title="이모지를 선택하세요."
                      emoji="point_up"
                      onSelect={handleSelectEmoji}
            style={{position: 'absolute', bottom: '80px'}}
          />
        )}
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleTogglePicker}>
                  <InsertEmoticon />
                </IconButton>
                <IconButton onClick={handleClickOpen}>
                  <ImageIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="start">
                <IconButton disabled={loading} onClick={clickSendMessage}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          autoComplete="off"
          label="메세지 입력"
          fullWidth
          value={message}
          onChange={handleChange}
              />
              {uploading ? <Grid item xs={12} sx={{ m:"10px" }}>
                  <LinearProgress variant="determinate" value={percent} />
              </Grid> : null }
              <ImageModal handleClose={handleClickClose} setPercent={setPercent} setUploading={setUploading} open={imageModalOpen}/>
      </Grid>
    </Grid>
  );
}

export default ChatInput;
