import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@mui/material';
import React, {useCallback, useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import "../firebase"
import { child, getDatabase, onChildAdded, push, ref, update } from 'firebase/database';
import { useEffect } from 'react';

function ChannelMenu() {
  const [open, setOpen] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [channelDetail, setChannelDetail] = useState('');
  const [channels, setChannels] = useState([]);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const db = getDatabase();
    const unsubscribe = onChildAdded(ref(db, "channels"), (snapshot) => {
      setChannels((channelArr) =>[...channelArr, snapshot.val()] )
    })

    return () => {
      setChannels([])
      unsubscribe()
    }
  },[])

  const handleSubmit = useCallback(async () => {
    //firebase의 데이터베이스에 데이터를 등록
    const db = getDatabase();
    const key = push(child(ref(db), "channels")).key;
    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetail
    };
    const updates = {};
    updates["/channels/" + key] = newChannel

    try {
      await update(ref(db), updates)
      setChannelName("")
      setChannelDetail("")
      handleClose()
    } catch (error) {
      console.error(error)
    }
  },[channelDetail, channelName])

  return (
    <>
      {/* TODO 테마 반영을 할 예정이므로 추후 수정 */}
      <List sx={{overflow: 'auto', width: 240, backgroundColor: '#123123'}}>
        <ListItem
          secondaryAction={
            <IconButton sx={{color: '#aebbb5'}} onClick={handleClickOpen}>
              <AddIcon />
            </IconButton>
          }
        >
          <ListItemIcon>
            <ListItemText primary="채널" sx={{wordBreak: 'break-all', color: '#9a939b'}} />
          </ListItemIcon>
        </ListItem>
        {channels.map((channel) => (
          // TODO store 구현 , selected 구현
          <ListItem button key={channel.id}>
            <ListItemText primary={`# ${channel.name}`} sx={{wordBreak: 'break-all', color: '#9a939b'}} />
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>채널 추가</DialogTitle>
        <DialogContent>
          <DialogContentText>생성할 채널명과 설명을 입력해주세요</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="채널명"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setChannelName(e.currentTarget.value)}
          />
          <TextField
            margin="dense"
            label="설명"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setChannelDetail(e.currentTarget.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleSubmit}>생성</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ChannelMenu;
