import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faWrench, faPenToSquare, faBan, faCheck } from '@fortawesome/free-solid-svg-icons';
import ItemController from "../controllers/ItemController";
import ConfirmationModal from "./ConfirmationModal";

const InventoryListItem = ({ item, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [editedItem, setEditedItem] = useState({
        name: item.name,
        description: item.description,
        quantity: item.quantity
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        const updatedItem = await ItemController.updateItem(item.id, editedItem);
        onEdit(updatedItem.id, updatedItem);
        setIsEditing(false);
    };

    const handleOpenDialog = () => {
        setIsOpen(true);
    };

    const handleCloseDialog = () => {
        setIsOpen(false);
    };

    const handleConfirmAction = (confirmed) => {
        if (confirmed) {
            handleDeleteClick();
            console.log('Acción confirmada');
        } else {
            console.log('Acción cancelada');
        }
        setIsOpen(false);
    };

    const handleCancelClick = () => {
        setEditedItem({
            name: item.name,
            description: item.description,
            quantity: item.quantity
        });
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedItem({
            ...editedItem,
            [name]: value
        });
    };

    const handleDeleteClick = async () => {
        try {
            await ItemController.deleteItem(item.id);
            onDelete(item.id);
        } catch (error) {
            console.error('Error al eliminar el ítem:', error);
        }
    };

    return (
        <div className="flex flex-wrap w-full h-auto p-2 my-1 rounded-lg sm:flex-nowrap sm:h-24 sm:my-2 bg-slate-300 sm:p-1">
            <button className="flex justify-center w-16 h-16 text-2xl rounded-lg sm:w-16 sm:h-full sm:text-4xl bg-slate-400">
                <FontAwesomeIcon icon={faBox} className="self-center text-white" />
            </button>
            <div className="flex flex-col flex-grow mx-2 my-2 sm:mx-4 plus-jakarta-sans-light">
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            name="name"
                            value={editedItem.name}
                            onChange={handleChange}
                            className="font-extrabold rounded-md sm:text-xl text-slate-200 focus:outline-none bg-slate-800"
                        />
                        <textarea
                            name="description"
                            value={editedItem.description}
                            onChange={handleChange}
                            className="h-12 mt-1 mb-2 text-sm font-medium bg-transparent text-slate-200 bg-slate-800 sm:h-auto focus:outline-none"
                        />
                        <input
                            type="number"
                            name="quantity"
                            value={editedItem.quantity}
                            onChange={handleChange}
                            className="text-xs font-bold bg-transparent  focus:outline-none text-slate-200 bg-slate-800"
                        />
                    </>
                ) : (
                    <>
                        <p className="text-lg font-extrabold sm:text-xl text-slate-950">{item.name}</p>
                        <p className="text-sm font-medium text-slate-600">{item.description}</p>
                        <p className="text-xs font-bold text-slate-600">Stock: {item.quantity}</p>
                    </>
                )}
            </div>
            <div className="flex items-center ml-auto space-x-4">
                {isEditing ? (
                    <>
                        <button type="button" onClick={handleSaveClick} className="flex items-center justify-center w-10 h-10 text-white border-2 rounded-full sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-green-700 border-green-950">
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button type="button" onClick={handleCancelClick} className="flex items-center justify-center w-10 h-10 text-white border-2 rounded-full sm:w-16 sm:h-16 bg-gradient-to-r from-red-500 to-red-700 border-red-950">
                            <FontAwesomeIcon icon={faBan} />
                        </button>
                    </>
                ) : (
                    <>
                        <div className="relative ml-2">
                            <button type="button" onClick={handleEditClick} className="flex items-center justify-center w-10 h-10 text-white border-2 rounded-full sm:w-16 sm:h-16 bg-gradient-to-r from-orange-800 to-orange-700 border-orange-950">
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                        </div>
                        <div className="relative ml-2">
                            <button type="button" onClick={handleOpenDialog} className="flex items-center justify-center w-10 h-10 text-white border-2 rounded-full sm:w-16 sm:h-16 bg-gradient-to-r from-red-500 to-red-700 border-red-950">
                                <FontAwesomeIcon icon={faBan} />
                            </button>
                        </div>
                    </>
                )}
            </div>
            <ConfirmationModal
                isOpen={isOpen}
                onClose={handleCloseDialog}
                onConfirm={handleConfirmAction}
                title="Confirmación de Acción"
                message="¿Estás seguro de que deseas realizar esta acción? Esta acción no se puede deshacer."
            />
        </div>
    );
};

export default InventoryListItem;
