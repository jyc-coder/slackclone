import {Alert, Avatar, Grid, TextField, Typography} from '@mui/material';
import {Box, Container} from '@mui/system';
import React from 'react';
import TagIcon from '@mui/icons-material/Tag';
import {LoadingButton} from '@mui/lab';
import { Link } from 'react-router-dom';

function Join() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <TagIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <Box component="form" noValidate sx={{mt: 3}} >
                  <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField name="name" required fullWidth label="닉네임" autoFocus></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField name="email" required fullWidth label="이메일 주소"></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField name="password" required fullWidth label="비밀번호" type="password"></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField name="confirmPassword" required fullWidth label="확인 비밀번호" type="password"></TextField>
            </Grid>
          </Grid>
          <Alert sx={{mt: 3}} severity="error">
            에러메시지
          </Alert>
          <LoadingButton type="submit" fullWidth variant="contained" color="secondary" sx={{mt: 3, mb: 2}}>
            회원 가입
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login" style={{textDecoration: 'none', color: 'blue'}}>
                이미 계정이 있나요? 로그인으로 이동하기 -&gt;
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Join;
