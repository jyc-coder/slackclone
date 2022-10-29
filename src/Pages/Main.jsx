import React from 'react'
import { Box } from '@mui/system';
import Header from '../components/Header';

function Main() {
    return (
      //TODO backgroundColor 테마 적용
      <Box sx={{display:"flex", backgroundColor:'white'}}>
          <Header></Header>
    </Box>
  )
}

export default Main
