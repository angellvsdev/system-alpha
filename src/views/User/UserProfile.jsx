import React from "react";
import AdminProfileBody from '../../components/profile-dashboard-components/AdminProfileBody';
import UserProfileHeader from '../../components/UserProfileHeader';
import '../../components/profile-dashboard-components/AdminProfile.css'
import Button from "../../components/BaseButton";
import { Link } from "react-router-dom";

const UserProfile = () =>{
        return (
        <div className="profile_view">
            <UserProfileHeader headerIcon="fa-solid fa-user-tie" />
            <AdminProfileBody />
        </div>
    );
}
export default UserProfile;