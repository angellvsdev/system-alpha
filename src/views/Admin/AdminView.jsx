import React, { useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import AdminRoutes from "../../components/AdminRoutes";
import "../../components/profile-dashboard-components/admin-view.css";
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";

const AdminView = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    useEffect(() => {
        // Verifica si no hay un usuario guardado en el contexto
        if (!user || user.roles === null) {
            navigate("/login");
        }
    }, [user, navigate]);

    if (!user || user.roles !== "ADMIN") {
        return (
            <div>
                <h1>
                    Acceso no autorizado
                </h1>
            </div>
        );
    }

    return (
        <AdminLayout>
            <AdminRoutes />
        </AdminLayout>
    );
};

export default AdminView;
