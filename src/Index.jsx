import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from "./views/Homepage/HomePage.jsx";
import SignUp from './views/SignUpForm/SignUp.jsx';
import Login from './views/LoginForm/Login.jsx';
import AdminView from './views/Admin/AdminView.jsx';
import UserView from './views/User/UserView.jsx';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const App = () => (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<SignUp />} />
          <Route path='/admin/*' element={<AdminView />} />
          <Route path='/user/*' element={<UserView />} />
        </Routes>
    </BrowserRouter>
  )

export default App;