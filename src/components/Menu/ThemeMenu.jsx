import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemIcon, Stack } from '@mui/material'
import React, { useCallback, useState } from 'react'
import PaletteIcon from '@mui/icons-material/Palette';
import { HexColorPicker } from 'react-colorful';


function ThemeMenu() {
    const [showThemeModal, setShowThemeModal] = useState(false)

    const handleClickOpen = useCallback(() => setShowThemeModal(true),[]);
    const handleClose = useCallback(() => setShowThemeModal(false),[]);
  return (
    <>
      <List sx={{overflow: 'auto', width: 60, backgroundColor: '#150c16'}}>
        <ListItem button onClick={handleClickOpen}>
          <ListItemIcon sx={{color: 'white'}}>
            <PaletteIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem>
          <div className="theme-box">
            <div className="theme-main" style={{backgroundColor: 'red'}}></div>

            <div className="theme-sub" style={{backgroundColor: 'white'}}></div>
          </div>
        </ListItem>
      </List>
      <Dialog open={showThemeModal} onClose={handleClose}>
        <DialogTitle>테마 색상 선택</DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={2}>
            <div>
              Main
              <HexColorPicker />
            </div>
            <div>
              sub
              <HexColorPicker />
            </div>
          </Stack>
        </DialogContent>
        <DialogActions>
                  <Button onClick={handleClose}>취소</Button>
          <Button>테마 저장</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ThemeMenu
