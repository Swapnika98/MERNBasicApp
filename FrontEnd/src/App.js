import React from 'react'
import {Route,Routes} from 'react-router-dom'
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import Home from './pages/Home';

import './App.css';
import Update from './pages/Update';
import Fetch from './pages/Fetch';
import Create from './pages/Create';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<SigninPage/>}/>
        <Route path="/signin" element={<SigninPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/fetch" element={<Fetch/>}/>
        <Route path="/fetch/:fetchId" element={<Update/>}/>
        <Route path="/update" element={<Update/>}/>
      </Routes>
    </div>
  );
}

export default App;
