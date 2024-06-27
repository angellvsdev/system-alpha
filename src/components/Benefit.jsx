import React, { useState } from 'react';
import BenefitController from '../controllers/BenefitController';
import { Dialog } from '@headlessui/react'; // Importamos Dialog de Headless UI
import BenefitFormModal from './BenefitFormModal';
import ConfirmationModal from './ConfirmationModal';
import benefits from '../mocks/benefitMocks';

const Benefit = ({ benefit, onUpdate, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false); // Estado para controlar la visibilidad de los detalles
  const [editModalOpen, setEditModalOpen] = useState(false); // Estado para controlar la apertura del modal de edición
  const [editedBenefit, setEditedBenefit] = useState({}); // Estado para almacenar los datos editados del beneficio

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
  };

  const handleEdit = () => {
    setEditedBenefit({
      id: benefit.id,
      details: benefit.details,
      status: benefit.status,
      benefitItems: benefit.benefitItems.map(item => ({
        id: item.id,
        quantity: item.quantity,
        item: { ...item.item }
      })),
      user: benefit.user,
      request: benefit.request
    });
    setEditModalOpen(true);
  };

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  const handleConfirmAction = (confirmed) => {
    if (confirmed) {
      handleDelete();
      console.log('Acción confirmada');
      // Aquí puedes realizar cualquier lógica o llamada a funciones que necesites al confirmar la acción.
    } else {
      console.log('Acción cancelada');
      // Manejar la cancelación de la acción si es necesario
    }
    setIsOpen(false); // Cerrar el diálogo después de confirmar o cancelar
  };

  const handleSave = async () => {
    try {
      const updatedBenefit = await BenefitController.updateBenefit(benefit.id, editedBenefit);
      onUpdate(updatedBenefit);
      setEditModalOpen(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await BenefitController.deleteBenefit(benefit.id);
      onDelete(benefit.id);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBenefit(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="p-6 m-4 overflow-x-hidden rounded-md shadow-md bg-gradient-to-r from-slate-900 to-slate-800 shadow-black">
      <h3 className="mb-2 text-lg font-bold text-slate-200 plus-jakarta-sans-light">Prestación #{benefit.id}</h3>

      {/* Section for basic details */}
      <div className="mb-4 plus-jakarta-sans-light text-slate-200">
        <h4 className="mb-2 font-medium text-md">ID de Prestación: {benefit.id}</h4>
        <p className="mb-2 text-sm font-medium">Solicitante: {benefit.request.user.name} {benefit.request.user.surname} | ID: {benefit.request.id}</p>
      </div>

      {/* Acordeón para mostrar detalles */}
      <div>
        <button
          onClick={toggleDetails}
          className="px-4 py-2 mb-2 font-bold text-gray-900 transition bg-gray-300 rounded hover:bg-gray-950 hover:text-gray-300 focus:outline-none"
        >
          {showDetails ? 'Ocultar Detalles' : 'Mostrar Detalles'}
        </button>
        {showDetails && (
          <div className="text-gray-200 rounded-md bg-gradient-to-r from-slate-900 to-slate-800 plus-jakarta-sans-light">
            <p className="mb-2 font-bold">Mensaje de Solicitud: <p className='font-light'>{benefit.request.message}</p></p>
            <p className="mb-2 font-bold">Estado de Solicitud: <p className='font-light'>{benefit.status === "APPROVED" ? "Aprobada" : "Denegada"}</p></p>
            {benefit.benefitItems.length > 0 ? (
              <ul className="mb-2 plus-jakarta-sans-light">
                <h4 className="mb-2 font-semibold text-md">Items para Prestación</h4>
                {benefit.benefitItems.map(benefitItem => (
                  <li key={benefitItem.id}>
                    {benefitItem.item.name} | Stock: {benefitItem.quantity}
                  </li>
                ))}
              </ul>
            ) : (
              <p className='self-center text-lg text-red-600'>Stock No Disponible</p>
            )}
          </div>
        )}
      </div>

      {/* Edit and Delete buttons */}
      <div className="flex mt-4 space-x-2">
        <button
          onClick={handleEdit}
          className="px-4 py-2 font-bold text-gray-200 transition rounded-md shadow-md shadow-black bg-gradient-to-r from-slate-900 to-slate-800 hover:bg-gray-950 hover:text-gray-300 focus:outline-none"
        >
          Editar
        </button>
        <button
          onClick={handleOpenDialog}
          className="px-4 py-2 font-bold text-gray-200 transition rounded-md shadow-md shadow-black bg-gradient-to-r from-slate-900 to-slate-800 hover:bg-gray-950 hover:text-gray-300 focus:outline-none"
        >
          Eliminar
        </button>
      </div>

      <BenefitFormModal
        modalOpen={editModalOpen}
        onRequestClose={handleCloseModal}
        onRequestSubmit={handleSave}
        benefit={editedBenefit}
        request={benefit.request}
      />

      <ConfirmationModal isOpen={isOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmAction}
        title="Confirmación de Acción"
        message="¿Estás seguro de que deseas realizar esta acción? Esta acción no se puede deshacer." />
    </div>
  );
};

export default Benefit;
