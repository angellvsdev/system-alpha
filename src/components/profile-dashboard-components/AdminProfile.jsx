import React from "react";
import UserProfileHeader from "../UserProfileHeader";
import AdminProfileBody from "./AdminProfileBody";
import "./admin-view.css";
import "./AdminProfile.css";
import "../../styles/responsive-adaptations/general_responsive.css";


const AdminProfile = (props) => (
    <>
        <div className="profile_view">
            <UserProfileHeader headerIcon="fa-solid fa-user-tie" />
            <AdminProfileBody />
        </div>
    </>
)

export default AdminProfile;