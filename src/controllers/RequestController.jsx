import axios from 'axios';
import Request from '../models/RequestModel';

const API_URL = '/api/requests'; // Asegúrate de que la URL es correcta

const isOnline = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.status === 200;
    } catch (error) {
        return false; // En caso de error, asumimos que no hay conexión
    }
};

const RequestController = {
    fetchRequests: async (pageNumber) => {
        try {
            // Consulta a la API real si hay conexión
            const response = await axios.get(API_URL,{
                params: {
                    page: pageNumber // Envía el número de página como parámetro
                }
            });
        return response.data;
        } catch (error) {
            console.error('Error fetching requests', error);
            return [];
        }
    },

    createRequest: async (newRequest) => {
        try {
            // Creación de request en la API real si hay conexión
            const response = await axios.post(API_URL, newRequest);
            if (!response.data) {
                throw new Error('Invalid response data');
            }
            return Request.fromJson(response.data);
        } catch (error) {
            console.error('Error creating request', error);
            throw new Error(`Error al crear la solicitud: ${error.message}`);
        }
    },

    getRequestsByUserId: async (userId) => {
        try {
            const response = await axios.get(`${API_URL}/user/${userId}`);
            const data = response.data;
            if (!data) {
                throw new Error('Invalid response data');
            }
            return Request.fromJson(data);
        } catch (error) {
            console.error('Error fetching requests by userId', error);
            return null;
        }
    },

    updateRequest: async (requestId, updatedData) => {
        try {
            const online = await isOnline();
            if (!online) {
                const requestIndex = requestMocks.findIndex(req => req.id === requestId);
                if (requestIndex === -1) {
                    throw new Error('Request not found');
                }
                const updatedRequest = {
                    ...requestMocks[requestIndex],
                    ...updatedData,
                };
                requestMocks[requestIndex] = updatedRequest;
                return new Request(updatedRequest.id, updatedRequest.message, updatedRequest.user);
            }

            const response = await axios.put(`${API_URL}/${requestId}`, updatedData);
            if (!response.data) {
                throw new Error('Invalid response data');
            }
            return new Request(response.data.id, response.data.message, response.data.user);
        } catch (error) {
            console.error('Error updating request', error);
            throw new Error(`Error al actualizar la solicitud: ${error.message}`);
        }
    },

    deleteRequest: async (requestId) => {
        try {
            const online = await isOnline();
            if (!online) {
                const requestIndex = requestMocks.findIndex(req => req.id === requestId);
                if (requestIndex === -1) {
                    throw new Error('Request not found');
                }
                const deletedRequest = requestMocks.splice(requestIndex, 1)[0];
                return new Request(deletedRequest.id, deletedRequest.message, deletedRequest.user);
            }

            await axios.delete(`${API_URL}/${requestId}`);
            return { id: requestId };
        } catch (error) {
            console.error('Error deleting request', error);
            throw new Error(`Error al eliminar la solicitud: ${error.message}`);
        }
    }
};

export default RequestController;
