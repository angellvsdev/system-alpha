import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import axios from "axios";
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import Button from '../../components/BaseButton'
import { Link } from "react-router-dom";

function Login() {
    const [documentId, setDocumentId] = useState('');
    const [password, setPassword] = useState('');
    const [documentType, setDocumentType] = useState('V');
    const [errorMessage, setErrorMessage] = useState('');
    const { setUser } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!documentId || !password || !documentType) {
            setErrorMessage('Por favor complete todos los campos.');
            return;
        }

        setErrorMessage('');

        try {
            const formattedDocumentId = `${documentType}${documentId}`;

            const response = await axios.post('http://localhost:8080/api/login', {
                username: formattedDocumentId,
                password: password
            });

            if (response.status === 200) {
                const userData = response.data;
                setUser(userData);

                if (userData.roles === "ADMIN") {
                    navigate("/admin");
                } else if (userData.roles === "USER") {
                    navigate("/user");
                } else {
                    console.error("Error, rol de usuario no identificado");
                }
            } else {
                setErrorMessage('Ocurrió un error al iniciar sesión.');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage('Error al iniciar sesión.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-red-500">
            <Button content={<Link to="/" >Atras</Link>} icon="fa-solid fa-circle-xmark" elementContext="absolute top-4 left-4"></Button>
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
                <h1 className="mb-6 text-2xl font-bold text-center">Inicio de Sesión</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="documentId" className="block text-sm font-medium text-gray-700 w-max">Número de documento</label>

                    <div className="flex items-center mb-6">
                        <select
                            id="documentType"
                            className="block w-1/6 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={documentType}
                            onChange={(e) => setDocumentType(e.target.value)}
                            required
                        >
                            <option value="V" default>V</option>
                            <option value="E">E</option>
                            <option value="J">J</option>
                        </select>
                        <input
                            id="documentId"
                            type="text"
                            placeholder="Ej: 12345678"
                            value={documentId}
                            onChange={(e) => setDocumentId(e.target.value)}
                            className="block w-5/6 px-3 py-2 mt-1 ml-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Ej: Mi-Contraseña123"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    {errorMessage && (
                        <div className="flex items-center p-2 mb-4 text-sm text-red-500 bg-red-100 rounded-lg">
                            <ExclamationCircleIcon className="w-4 h-4 mr-1" aria-hidden="true" />
                            <span>{errorMessage}</span>
                        </div>
                    )}
                    <div className="flex items-center justify-between">
                        <Button
                            type="submit"
                            content="Iniciar Sesión"
                            className="text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
