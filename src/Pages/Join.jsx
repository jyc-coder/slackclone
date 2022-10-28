import {Alert, Avatar, Grid, TextField, Typography} from '@mui/material';
import {Box, Container} from '@mui/system';
import React, {useState} from 'react';
import TagIcon from '@mui/icons-material/Tag';
import {LoadingButton} from '@mui/lab';
import {Link} from 'react-router-dom';
import { useEffect } from 'react';
import "../firebase"
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import md5 from 'md5';
import { getDatabase, ref, set } from "firebase/database";
import { setUser } from './../store/userReducer';
import { useDispatch } from 'react-redux';





function Join() {
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name');
    const email = data.get('email');
    const password = data.get('password');
    const confirmPassword = data.get('confirmPassword');

    if (!name || !email || !password || !confirmPassword) {
      setError('모든 항목을 입력해주세요');
      return;
      }
      if (password.length < 6 || confirmPassword.length < 6) {
        setError('비밀번호는 최소 6자 이상이어야 합니다');
        return;
      } else if (password !== confirmPassword) {
        setError('비밀번호와 확인비밀번호가 일치하지 않습니다')
          return;
      }
    
      postUserData(name,email,password)
    };


    const postUserData = async (name, email, password) => {
        setLoading(true)
        try {
            
            const { user } = await createUserWithEmailAndPassword(getAuth(), email, password);
            await updateProfile(user, {
                displayName: name,
                photoURL:`https:/www.gravatar.com/avatar/${md5(email)}?d=retro`
            })

            await set(ref(getDatabase(), 'users/' + user.uid), {
                name: user.displayName,
                avatar: user.photoURL
            })

            dispatch(setUser(user))
            console.log(user)
            
            // store 에 user 저장
        } catch (e) {
            setError(e.message);
            setLoading(false);
        }
    }
    
    useEffect(() => {
        if (!error) return;
        setTimeout(() => {setError("")}, 3000)
    },[error])
  return (
    <Container component="main" maxWidth="xs" sx={{transition:"all 1s"}}>
      <Box
        sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <TagIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <Box component="form" noValidate sx={{mt: 3 }} onSubmit={handleSubmit}>
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
          {error ? (
            <Alert sx={{mt: 3}} severity="error">
             {error}
            </Alert>
          ) : null}

          <LoadingButton type="submit" fullWidth variant="contained" color="secondary" sx={{mt: 3, mb: 2}} loading={loading}>
            회원 가입
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
                          <Link to="/login" style={{ textDecoration: "none", color: 'blue'}} >
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
