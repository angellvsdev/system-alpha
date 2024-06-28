import React, { useEffect } from "react";
import UserLayout from '../../components/UserLayout';
import UserRoutes from '../../components/UserRoutes';
import "../../components/profile-dashboard-components/admin-view.css";
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";

const UserView = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    useEffect(() => {
        // Verifica si no hay un usuario guardado en el contexto
        if (!user || user.roles === null) {
            navigate("/login");
        }
    }, [user, navigate]);
    // Verifica si no hay un usuario guardado en el contexto
    if (!user) {
        navigate("/login");
        return null; // Retorna null para evitar renderizar el componente
    }

    if (user.roles === "USER") {
        return (
            <UserLayout>
                <UserRoutes />
            </UserLayout>
        );
    } else if (user.roles === null) {
        navigate("/login");
        return null; // Retorna null para evitar renderizar el componente
    } else {
        return (
            <div>
                <h1>
                    Acceso no autorizado
                </h1>
            </div>
        );
    }
}

export default UserView;
