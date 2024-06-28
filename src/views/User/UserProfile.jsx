import React from "react";
import AdminProfileBody from '../../components/profile-dashboard-components/AdminProfileBody';
import UserProfileHeader from '../../components/UserProfileHeader';
import '../../components/profile-dashboard-components/AdminProfile.css'
import Button from "../../components/BaseButton";
import { Link } from "react-router-dom";

const UserProfile = () =>{
        return (
        <div className="profile_view">
            <Button content={<Link to="/user" >Chequear Solicitud</Link>} icon="fa-solid fa-envelope-open-text" elementContext="absolute top-4 left-4"></Button>
            <UserProfileHeader headerIcon="fa-solid fa-user-tie" />
            <AdminProfileBody />
            <Button content={<Link to="/" >Cerrar Sesión</Link>} icon="fa-solid fa-power-off" elementContext="absolute bottom-4 left-8"></Button>
        </div>
    );
}
export default UserProfile;