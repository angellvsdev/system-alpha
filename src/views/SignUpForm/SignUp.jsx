import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../components/BaseButton";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { useUser } from "../../UserContext";
import { Link } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    userName: "",
    userSurname: "",
    userEmail: "",
    userPassword: "",
    userPasswordConfirm: "",
    userDocumentId: "",
    documentType: "",
    userLocation: "",
    sector: "",
    userNumber: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      userName,
      userSurname,
      userEmail,
      userPassword,
      userPasswordConfirm,
      userDocumentId,
      documentType,
      userLocation,
      sector,
      userNumber,
    } = formData;

    if (
      !userName ||
      !userSurname ||
      !userEmail ||
      !userPassword ||
      !userPasswordConfirm ||
      !userDocumentId ||
      !documentType ||
      !userLocation ||
      !sector ||
      !userNumber
    ) {
      setErrorMessage("Por favor complete todos los campos.");
      return;
    }

    if (userPassword !== userPasswordConfirm) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:8080/api/register", {
        name: userName,
        surname: userSurname,
        email: userEmail,
        password: userPassword,
        idNumber: `${documentType}${userDocumentId}`,
        documentType: documentType,
        sector: sector,
        location: userLocation,
        gender: "Male", // Ajustable según tus necesidades
        age: 30, // Ajustable según tus necesidades
        phone: userNumber,
      });

      if (response.status === 201) {
        navigate("/login"); // Redirigir a la página de inicio de sesión después del registro exitoso
      } else {
        setErrorMessage("Ocurrió un error al registrarse.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error al registrar usuario.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-500">
      <Button content={<Link to="/" >Atras</Link>} icon="fa-solid fa-circle-xmark" elementContext="absolute top-2 left-2"></Button>
      <div className="w-3/6 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-center">Registro</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
              Nombres
            </label>
            <input
              id="userName"
              type="text"
              placeholder="Ej: Manuel Finol"
              value={formData.userName}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="userSurname" className="block text-sm font-medium text-gray-700">
              Apellidos
            </label>
            <input
              id="userSurname"
              type="text"
              placeholder="Ej: Finol Manuel"
              value={formData.userSurname}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              id="userEmail"
              type="email"
              placeholder="Ej: manufinol@correo.com"
              value={formData.userEmail}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="userPassword" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="userPassword"
              type="password"
              placeholder="Ej: Mi-Contraseña123"
              value={formData.userPassword}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="userPasswordConfirm" className="block text-sm font-medium text-gray-700">
              Confirmar contraseña
            </label>
            <input
              id="userPasswordConfirm"
              type="password"
              placeholder="Ej: Mi-Contraseña123"
              value={formData.userPasswordConfirm}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <label htmlFor="userDocumentId">Número de documento</label>

          <div className="flex items-center mb-6">
            <select
              id="documentType"
              className="block w-1/12 px-2 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.documentType}
              onChange={handleChange}
              required
            >
              <option value="V">V</option>
              <option value="E">E</option>
              <option value="J">J</option>
            </select>
            <input
              id="userDocumentId"
              type="number"
              placeholder="Ej: 12345678"
              value={formData.userDocumentId}
              onChange={handleChange}
              className="block w-5/6 px-3 py-2 mt-1 ml-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="userLocation" className="block text-sm font-medium text-gray-700">
              Ubicación
            </label>
            <select
              id="userLocation"
              className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.userLocation}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione su ubicación</option>
              <option value="Libertad">Libertad</option>
              <option value="Río Negro">Río Negro</option>
              <option value="Bartolomé de las Casas">Bartolomé de las Casas</option>
              <option value="San José">San José</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="sector" className="block text-sm font-medium text-gray-700">
              Sector
            </label>
            <input
              id="sector"
              type="text"
              placeholder="Ej: Sector A"
              value={formData.sector}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="userNumber" className="block text-sm font-medium text-gray-700">
              Número de teléfono
            </label>
            <input
              id="userNumber"
              type="tel"
              placeholder="Ej: 0412-123-4567"
              value={formData.userNumber}
              onChange={handleChange}
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
              content="Registrarse"
              className="text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
