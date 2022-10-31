import React from 'react';
import {Avatar, Grid, ListItem, ListItemAvatar, ListItemText} from '@mui/material';

function ChatMessage() {
  return (
    <ListItem>
      <ListItemAvatar sx={{alignSelf: 'stretch'}}>
        <Avatar variant="rounded" sx={{width: 50, height: 50}} alt="profile image" />
      </ListItemAvatar>
      <Grid container sx={{ml: 2}}>
        <Grid item xs={12} sx={{display: 'flex', justifyContent: 'left'}}>
          <ListItemText
            sx={{display: 'flex'}}
            primary={'닉네임'}
            primaryTypographyProps={{fontWeight: 'bold', color: 'orange'}}
            secondary={'2022.10.31'}
            secondaryTypographyProps={{color: 'gray', ml: 1}}
          />
        </Grid>
        <Grid item xs={12}>
          <ListItemText align="left" sx={{wordBreak: 'break-all'}} primary={'채팅메시지 입니다.'} />
          {/* TODO 이미지 추가 */}
          {/* <img alt='message' src="" style={{maxWidth:"100%"}} /> */}
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default ChatMessage;
