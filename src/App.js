
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
  },[dispatch])
  return (
    <Routes>
      <Route path="/" element={<Main/>}></Route>
      <Route path="login" element ={<Login/>}></Route>
      <Route path="/join" element={ currentUser ? <Navigate to="/"/> : <Join/>}></Route>
    </Routes>
  );
}

export default App;
