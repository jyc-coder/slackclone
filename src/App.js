
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Join from './Pages/Join';
import Login from './Pages/Login';

function App() {
  return (
    <Routes>
      <Route path="login" element ={<Login/>}></Route>
      <Route path="/join" element={<Join/>}></Route>
    </Routes>
  );
}

export default App;
