import React from 'react'
import { Box } from '@mui/system';
import Header from '../components/Header';
import { Drawer, Toolbar } from '@mui/material';
import ChannelMenu from '../components/ChannelMenu';

function Main() {
    return (
      //TODO backgroundColor 테마 적용
      <Box sx={{display:"flex", backgroundColor:'white'}}>
            <Header></Header>
            <Drawer variant="permanent" sx={{width: 300}} className="no-scroll">
                <Toolbar />
                <Box sx={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
                   <ChannelMenu></ChannelMenu>
                </Box>
            </Drawer>
    </Box>
  )
}

export default Main
