import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ItemController from '../controllers/ItemController';
import Item from '../models/ItemModel';
import SearchInput from './SearchInput';
import { Typography } from '@material-tailwind/react';

const ItemSelectionModal = ({ isOpen, onRequestClose, onItemsSelected }) => {
    // Estados para manejar items, ítems seleccionados, cantidades, término de búsqueda, resultados de búsqueda, carga y errores.
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [itemQuantities, setItemQuantities] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Hook para cargar los items desde el servidor cuando el componente se monta.
    useEffect(() => {
        const fetchItems = async () => {
            try {
                setLoading(true);
                const fetchedItems = await ItemController.fetchItems();
                setItems(fetchedItems.content.map(item => new Item(item.id, item.name, item.description, item.quantity, item.benefitItems)));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching items:', error);
                setLoading(false);
                setError('Error al cargar los ítems');
            }
        };
        fetchItems();
    }, []);

    // Maneja la selección y deselección de items.
    const handleItemSelect = (item) => {
        setSelectedItems((prevItems) => {
            const itemExists = prevItems.find((i) => i.id === item.id);
            if (itemExists) {
                const newSelectedItems = prevItems.filter((i) => i.id !== item.id);
                const newQuantities = { ...itemQuantities };
                delete newQuantities[item.id];
                setItemQuantities(newQuantities);
                return newSelectedItems;
            } else {
                setItemQuantities((prevQuantities) => ({
                    ...prevQuantities,
                    [item.id]: item.quantity, // Guardar la cantidad disponible del ítem
                }));
                return [...prevItems, { ...item, availableQuantity: item.quantity }]; // Agregar la cantidad disponible
            }
        });
    };

    // Maneja el cambio en la cantidad de los items seleccionados.
    const handleQuantityChange = (item, newQuantity) => {
        // Validar y asegurar que la cantidad es un número dentro de los límites permitidos
        const validatedQuantity = Math.max(1, Math.min(parseInt(newQuantity, 10) || 1, item.availableQuantity));

        setItemQuantities((prevQuantities) => ({
            ...prevQuantities,
            [item.id]: validatedQuantity,
        }));
    };

    // Envía los items seleccionados con las cantidades correspondientes y cierra el modal.
    const handleSubmit = () => {
        const itemsToSend = selectedItems.map((item) => ({
            ...item,
            quantity: itemQuantities[item.id],
        }));
        onItemsSelected(itemsToSend);
        onRequestClose();
    };

    // Maneja la búsqueda de items desde el servidor.
    const handleSearch = async (searchTerm) => {
        setSearchTerm(searchTerm);
        if (!searchTerm.trim()) {
            setSearchResults([]);
            return;
        }
        try {
            setLoading(true);
            const searchResults = await ItemController.searchItems(searchTerm);
            setSearchResults(searchResults.content.map(item => new Item(item.id, item.name, item.description, item.quantity)));
            setLoading(false);
        } catch (error) {
            console.error('Error searching items:', error);
            setLoading(false);
            setError('Error al buscar los ítems');
            setSearchResults([]);
        }
    };

    // Limpia el término de búsqueda y los resultados.
    const handleClearSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
    };

    // Maneja la selección de items desde los resultados de búsqueda.
    const handleSelectFromSearch = (item) => {
        handleItemSelect(item);

        // Inicializar cantidad en caso de que se seleccione desde búsqueda
        setItemQuantities((prevQuantities) => ({
            ...prevQuantities,
            [item.id]: prevQuantities[item.id] || 1, // Mantener cantidad existente o inicializar a 1
        }));

        setSearchResults([]); // Mantener los resultados si es necesario
        setSearchTerm(''); // Limpiar el término de búsqueda para mejor UX
    };

    // Renderizado optimizado de ítems con filtrado eficiente.
    const filteredItems = searchTerm === ''
        ? items.filter((item) => !selectedItems.some((selectedItem) => selectedItem.id === item.id))
        : searchResults.filter((item) => !selectedItems.some((selectedItem) => selectedItem.id === item.id));

    // Mover los ítems seleccionados a la parte superior de la lista filtrada.
    const sortedFilteredItems = [...selectedItems, ...filteredItems.filter((item) => !selectedItems.some((selectedItem) => selectedItem.id === item.id))];

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex justify-center items-center"
            className="w-full max-w-lg p-6 bg-white rounded-md shadow-lg outline-none max-h-[95vh] overflow-auto"
        >
            <h3 className="mb-4 text-lg font-bold text-center text-gray-950">Seleccionar Items</h3>

            {/* Componente SearchInput para filtrar */}
            <SearchInput onSearch={handleSearch} />

            {/* Lista de ítems, filtrado basado en búsqueda y selección, y ordenando ítems seleccionados al tope */}
            {loading ? (
                <p className="text-gray-500 text-center">Cargando...</p>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : sortedFilteredItems.length === 0 ? (
                <p className="text-gray-500 text-center">No encontrado</p>
            ) : (
                <div className="flex flex-col gap-2">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                            Seleccionar
                                        </Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                            Nombre
                                        </Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                            Cantidad
                                        </Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                            ID
                                        </Typography>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedFilteredItems.map((item) => (
                                    <tr key={item.id} className="border-b border-blue-gray-50">
                                        <td className="p-4">
                                            <input
                                                type="checkbox"
                                                id={`item-${item.id}`}
                                                checked={selectedItems.some((i) => i.id === item.id)}
                                                onChange={() => handleSelectFromSearch(item)}
                                                className="mr-2"
                                            />
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {item.name}
                                            </Typography>
                                        </td>
                                        <td className="p-4">
                                            <input
                                                type="number"
                                                min="1"
                                                max={item.availableQuantity || 1} // Cantidad disponible
                                                value={itemQuantities[item.id] || 1} // Valor de la cantidad
                                                onChange={(e) => handleQuantityChange(item, e.target.value)}
                                                disabled={!selectedItems.some((i) => i.id === item.id)} // Deshabilitar si no está seleccionado
                                                className="w-16 border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-400 sm:text-sm"
                                            />
                                        </td>
                                        <td className="p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {item.id}
                                            </Typography>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            <div className="flex justify-end mt-4">
                <button
                    type="button"
                    onClick={onRequestClose}
                    className="px-4 py-2 mr-2 text-sm font-bold text-gray-200 transition rounded bg-gradient-to-r from-red-900 to-red-700 hover:from-gray-950 hover:to-gray-800 hover:text-gray-300 focus:outline-none"
                >
                    Cancelar
                </button>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-4 py-2 text-sm font-bold text-gray-900 transition bg-gray-300 rounded focus:outline-none hover:bg-gray-950 hover:text-gray-300"
                >
                    Seleccionar
                </button>
            </div>
        </Modal>
    );
};

export default ItemSelectionModal;
