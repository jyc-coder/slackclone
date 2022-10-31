import { InsertEmoticon } from '@mui/icons-material'
import { Grid, IconButton, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';
function ChatInput() {
  return (
      <Grid container sx={{ p: "20px" }}>
          <Grid item xs={12} sx={{ position: 'relative' }}>
              <TextField
                  InputProps={{
                      startAdornment: (
                          <InputAdornment position="start">
                              <IconButton>
                                  <InsertEmoticon/>
                              </IconButton>
                              <IconButton>
                                  <ImageIcon/>
                              </IconButton>
                          </InputAdornment>
                      ),
                      endAdornment: (
                          <InputAdornment positon="start">
                              <IconButton>
                                  <SendIcon/>
                              </IconButton>
                          </InputAdornment>
                      )
                  }}
                  autoComplete="off"
                  label="메세지 입력"
                  fullWidth
              >
                  
              </TextField>
          </Grid>
          
    </Grid>
  )
}

export default ChatInput
