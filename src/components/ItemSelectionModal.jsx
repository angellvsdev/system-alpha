import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ItemController from '../controllers/ItemController';
import Item from '../models/ItemModel';
import SearchInput from './SearchInput';
import { Typography } from '@material-tailwind/react';

const ItemSelectionModal = ({ isOpen, onRequestClose, onItemsSelected }) => {
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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
    const handleQuantityChange = (item, newQuantity) => {
        // Validar que newQuantity no sea mayor que item.quantity
        if (newQuantity > item.quantity) {
            newQuantity = item.quantity;  // Si es mayor, limitarlo al máximo permitido
        }

        // Actualizar selectedItems con la nueva cantidad
        const updatedItems = selectedItems.map((i) =>
            i.id === item.id ? { ...i, quantity: newQuantity } : i
        );

        // Actualizar el estado con los items actualizados
        setSelectedItems(updatedItems);
    };
    const handleItemSelect = (item) => {
        setSelectedItems((prevItems) => {
            const itemExists = prevItems.find((i) => i.id === item.id);
            if (itemExists) {
                return prevItems.filter((i) => i.id !== item.id);
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    // const handleQuantityChange = (item, quantity) => {
    //     setSelectedItems((prevItems) =>
    //         prevItems.map((i) => (i.id === item.id ? { ...i, quantity: quantity } : i))
    //     );
    // };

    const handleSubmit = () => {
        onItemsSelected(selectedItems);
        onRequestClose();
    };

    const handleSearch = async (searchTerm) => {
        setSearchTerm(searchTerm);
        try {
            setLoading(true);
            const searchResults = await ItemController.searchItems(searchTerm);
            setSearchResults(searchResults.content.map(item => new Item(item.id, item.name, item.description, item.quantity, item.benefitItems)));
            setLoading(false);
        } catch (error) {
            console.error('Error searching items:', error);
            setLoading(false);
            setError('Error al buscar los ítems');
            setSearchResults([]);
        }
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
    };

    const handleSelectFromSearch = (item) => {
        handleItemSelect(item);
        setSearchResults([]); // Maintain search results if desired
        setSearchTerm(''); // Clear search term for better UX
    };

    // Optimized item rendering with efficient filtering
    const filteredItems = searchTerm === ''
        ? items.filter((item) => !selectedItems.some((selectedItem) => selectedItem.id === item.id))
        : searchResults.filter((item) => !selectedItems.some((selectedItem) => selectedItem.id === item.id));

    // Move selected items to the top of the filteredItems list
    const sortedFilteredItems = [...selectedItems, ...filteredItems.filter((item) => !selectedItems.some((selectedItem) => selectedItem.id === item.id))];

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex justify-center items-center"
            className="w-full max-w-lg p-6 bg-white rounded-md shadow-lg outline-none max-h-[95vh] overflow-auto"
        >
            <h3 className="mb-4 text-lg font-bold text-center text-gray-950">Seleccionar Items</h3>

            {/* SearchInput component for filtering */}
            <SearchInput onSearch={handleSearch} />

            {/* List of items, filtering based on search and selection, and sorting selected items to the top */}

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
                                                max={item.quantity}
                                                value={selectedItems.find((i) => i.id === item.id)?.quantity || 1}
                                                onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
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