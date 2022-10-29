
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Join from './Pages/Join';
import Login from './Pages/Login';
import { getAuth } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setUser } from './store/userReducer';
import Main from './Pages/Main';
import { Stack } from '@mui/system';
import { CircularProgress } from '@mui/material';

function App() {
  const dispatch = useDispatch()
  const {isLoading, currentUser} = useSelector((state) => state.user)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (!!user) {
        dispatch(setUser(user))
      } else {
        dispatch(clearUser())
      }
    })
    return () => unsubscribe();
  }, [dispatch])
  
  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" height="100vh" >
        <CircularProgress color="secondary" size={150}/>
      </Stack>
    )
  }
  return (
    <Routes>
      <Route path="/" element={currentUser ? <Main /> : <Navigate to="/login" />}></Route>
      <Route path="/login" element={currentUser ? <Navigate to ="/"/> :<Login />}></Route>
      <Route path="/join" element={currentUser ? <Navigate to="/" /> : <Join />}></Route>
    </Routes>
  );
}

export default App;
