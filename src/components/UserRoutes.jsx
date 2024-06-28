import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserProfile from '../views/User/UserProfile';
import UserStatus from './UserStatus'
function UserRoutes() {
    return (
        <Routes>
            <Route path='/' element={<UserStatus/>} />
            <Route path='/profile' element={<UserProfile />} />
        </Routes>
    )
}
export default UserRoutes;