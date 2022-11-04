import React from 'react'
import { Box } from '@mui/system';
import Header from '../components/Header';
import { Drawer, Toolbar } from '@mui/material';

import Chat from '../components/Chat/Chat';
import ThemeMenu from './../components/Menu/ThemeMenu';
import ChannelMenu from './../components/Menu/ChannelMenu';
import { useSelector } from 'react-redux';

function Main() {
  const { theme } = useSelector(state=>state)
    return (
      
      <Box sx={{display: 'flex', backgroundColor: theme.subTheme}}>
        <Header></Header>
        <Drawer variant="permanent" sx={{width: 300}} className="no-scroll">
          <Toolbar />
          <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
            <ThemeMenu/>
           <ChannelMenu/>
          </Box>
        </Drawer>
        <Box component="main" sx={{flexGrow:1, p:3}}>
          <Chat/>
        </Box>
      </Box>
    );
}

export default Main
