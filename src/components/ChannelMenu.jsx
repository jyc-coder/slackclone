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
import React, {useState} from 'react';
import AddIcon from '@mui/icons-material/Add';

function ChannelMenu() {
  const [open, setOpen] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [channelDetail, setChannelDetail] = useState('');
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <Button>생성</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ChannelMenu;
