import {AppBar, Avatar, IconButton, Menu, MenuItem, Toolbar, Typography} from '@mui/material';
import React, { useCallback, useState } from 'react';
import {Box} from '@mui/system';
import TagIcon from '@mui/icons-material/Tag';
import "../firebase"

import { useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import ProfileModal from './Modal/ProfileModal';
function Header() {
  const [showProfileModal, setShowProfileModal] = useState(false);
    const { user } = useSelector(state => state)
  const [anchorEl, setAnchorEl] = useState(null);
 
  const handleCloseMenu = () => setAnchorEl(null);
   const handleLogout = async () => {
     await signOut(getAuth());
   };
  
  const handleClickOpen = useCallback(() => {
    setShowProfileModal(true)
    handleCloseMenu()
  }, [])
  
    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget)
    } 

  const handleCloseProfileModal = useCallback(() => { setShowProfileModal(false) },[])
  
  

  return (
    <>
      {/* TODO backgroundColor 테마 적용 */}
      <AppBar
        position="fixed"
        sx={{zIndex: (theme) => theme.zIndex.drawer + 1, color: '#9A9398', backgroundColor: '#d8bbdf'}}
      >
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between', height: '50px'}}>
          <Box sx={{display: 'flex'}}>
                      <TagIcon sx={{mt:"3px"}} />
            <Typography variant="h6" component="div">
              SLACK
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={handleOpenMenu}>
              <Typography variant="h6" component="div">
                {user.currentUser?.displayName}
              </Typography>
              <Avatar sx={{ml: '10px'}} alt="profileImage" src={user.currentUser?.photoURL} />
            </IconButton>
            <Menu sx={{mt: '45px'}} anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu} anchorOrigin={{vertical:"top", horizontal:"right"}}>
              <MenuItem onClick={handleClickOpen}>
                <Typography textAlign="center">프로필이미지</Typography>
              </MenuItem>
                          <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Log out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <ProfileModal open={showProfileModal} handleClose={handleCloseProfileModal} />
    </>
  );
}

export default Header;
