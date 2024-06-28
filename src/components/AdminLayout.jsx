import React from "react";
import AdminMenu from './AdminMenu'
function AdminLayout({children}){
    return(
        <div>
            <AdminMenu />
            {children}
        </div>
    )
}
export default AdminLayout;