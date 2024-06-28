import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import Benefit from '../models/BenefitModel';
import ItemController from '../controllers/ItemController';
import BenefitItem from '../models/BenefitItemModel';
import Item from '../models/ItemModel';
import ItemSelectionModal from './ItemSelectionModal';
import BenefitController from '../controllers/BenefitController';
import { List, ListItem, Badge, IconButton, ListItemSuffix } from '@material-tailwind/react';
function TrashIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
        >
            <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                clipRule="evenodd"
            />
        </svg>
    );
}
const BenefitFormModal = ({ modalOpen, onRequestClose, onRequestSubmit, benefit, request }) => {
    const [details, setDetails] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [status, setStatus] = useState('APPROVED');
    const [itemModalOpen, setItemModalOpen] = useState(false);
    useEffect(() => {
        if (benefit) {
            // Si hay un beneficio existente, inicializa el estado con sus valores
            setDetails(benefit.details || '');
            setStatus(benefit.status || 'APPROVED');
            setSelectedItems(benefit.benefitItems || []);
        } else {
            // Si no hay 'request' (es decir, estamos creando un nuevo beneficio), reinicia el estado
            setDetails('');
            setStatus('APPROVED');
            setSelectedItems([]);
        }
    }, [benefit]);

    const handleItemsSelected = (items) => {
        setSelectedItems(items);
    };
    const statuses = {
        APPROVED: 'Aprobado',
        REJECTED: 'Rechazado',
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const itemsToAdd = status === 'APPROVED'
            ? selectedItems.map(item => {
                return BenefitItem.fromJson({
                    quantity: item.quantity,
                    item: Item.fromJson(item)
                });
            })
            : [];
        const newBenefit = {
            user: request.user,
            details: details,
            request: request,
            status: status,
            benefitItems: itemsToAdd,
            creationDate: new Date(),
        };

        try {
            if (benefit) {
                // Si estamos editando, enviamos una solicitud PATCH con el ID del beneficio
                await BenefitController.updateBenefit(benefit.id, newBenefit)
            } else {
                // Si estamos creando, enviamos una solicitud POST
                await onRequestSubmit(newBenefit);
            }
            onRequestClose();
        } catch (error) {
            console.error('Error submitting benefit:', error);
        }
    };

    return (
        <Modal
            isOpen={modalOpen}
            onRequestClose={onRequestClose}
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex justify-center items-center"
            className="w-full max-w-lg p-6 bg-white rounded-md shadow-lg outline-none max-h-[95vh] overflow-auto"
        >
            <Transition
                show={modalOpen}  // Agrega la prop `show` basada en `modalOpen`

                as={React.Fragment}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="w-full">
                    <div className='object-contain w-full h-40'>
                        <img src="/src/assets/undraw_message_sent_re_q2kl.svg" alt="Mensaje de entrada" className='h-full mx-auto' />
                    </div>
                    <h3 className="my-12 mb-8 text-lg font-bold text-center md:text-2xl text-gray-950">Aceptar Prestación</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="details" className="block text-sm font-medium text-gray-700 md:text-lg">
                                Detalles de la Prestación
                            </label>
                            <textarea
                                id="details"
                                name="details"
                                rows="3"
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                                className="block w-full p-4 mt-1 text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-400 sm:text-sm"
                                placeholder="Añadir Detalles"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 md:text-lg">
                                Estado
                            </label>
                            <Listbox value={status} onChange={setStatus}>
                                <ListboxButton className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none sm:text-sm">
                                    <span className="block truncate">{statuses[status]}</span>
                                    <svg className="absolute inset-y-0 right-0 w-5 h-5 pt-1 pr-2 text-gray-400" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.29348 10.7071L12.0001 13.4141L14.7068 10.7071C15.0995 10.3117 15.0995 9.68831 14.7068 9.29284L11.4142 6.5859L9.29348 10.7071Z" fill="currentColor" />
                                    </svg>
                                </ListboxButton>

                                <Listbox.Options className="absolute py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg w-36 max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {Object.keys(statuses).map((statusValue) => (
                                        <Listbox.Option
                                            key={statusValue}
                                            value={statusValue}
                                            className={({ active }) =>
                                                `${active ? 'text-gray-300 bg-slate-950' : 'text-gray-900'} cursor-default select-none relative py-2 pl-10 pr-4`
                                            }
                                        >
                                            {statuses[statusValue]}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Listbox>
                        </div>
                        {status === 'APPROVED' && (
                            <div className="mb-4">
                                <button
                                    type="button"
                                    onClick={() => setItemModalOpen(true)}
                                    className="px-4 py-2 text-sm font-bold text-gray-900 transition bg-gray-300 rounded focus:outline-none hover:bg-gray-950 hover:text-gray-300"
                                >
                                    Seleccionar Items
                                </button>
                                {selectedItems && selectedItems.length > 0 && (
                                    <div className="mt-4">
                                        <h4 className="text-sm font-medium text-gray-700">Ítems Seleccionados</h4>
                                        <List className="mt-2">
                                            {selectedItems.map((item) => (
                                                <ListItem key={item.id} className="flex items-center justify-between p-2 border-b border-gray-300">
                                                    <span>{item.name}</span>
                                                    <ListItemSuffix >
                                                        <Badge color="blue">{item.quantity}</Badge>
                                                        <IconButton
                                                            variant="text"
                                                            color="blue-gray"
                                                            className='inline-flex justify-center items-center'
                                                            onClick={() => {
                                                                setSelectedItems(prevItems => prevItems.filter(i => i.id !== item.id));
                                                            }}
                                                        >
                                                            <i class="fa-solid fa-trash"></i>
                                                        </IconButton>
                                                    </ListItemSuffix>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </div>
                                )}

                            </div>
                        )}
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={onRequestClose}
                                className="px-4 py-2 mr-2 text-sm font-bold text-gray-200 transition rounded bg-gradient-to-r from-red-900 to-red-700 hover:from-gray-950 hover:to-gray-800 hover:text-gray-300 focus:outline-none"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-bold text-gray-900 transition bg-gray-300 rounded focus:outline-none hover:bg-gray-950 hover:text-gray-300"
                            >
                                Crear Benefit
                            </button>
                        </div>
                    </form>
                </div>
            </Transition>
            <ItemSelectionModal
                isOpen={itemModalOpen}
                onRequestClose={() => setItemModalOpen(false)}
                onItemsSelected={handleItemsSelected}
            />
        </Modal>
    );
};

export default BenefitFormModal;
