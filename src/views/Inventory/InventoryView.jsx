import React, { useState, useEffect } from 'react';
import InventoryList from '../../components/InventoryList';
import ItemController from '../../controllers/ItemController';
import PaginationComponent from '../../components/PaginationComponent';
import Item from '../../models/ItemModel';

const InventoryView = () => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetchItems(currentPage); // Cargar la primera página al montar el componente
    }, [currentPage]);

    const fetchItems = async (pageNumber) => {
        try {
            const data = await ItemController.fetchItems(pageNumber);
            setItems(data.content.map(item => new Item(item.id, item.name, item.description, item.quantity, item.benefitItems)));
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching items', error);
            setError('Error al cargar los ítems');
        } finally{
            setLoading(false);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = async (searchTerm) => {
        setSearchTerm(searchTerm);
        try {
            setLoading(true);
            const searchResults = await ItemController.searchItems(searchTerm); // Ajusta según la implementación en ItemController
            setSearchResults(searchResults.content.map(item => new Item(item.id, item.name, item.description, item.quantity, item.benefitItems)));
            setLoading(false);
            setError(null);
        } catch (error) {
            console.error('Error searching items', error);
            setLoading(false);
            setError('Error al buscar los ítems');
            setSearchResults([]);
        }
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
    };

    return (
        <>
            <div className="w-screen h-screen bg-white bg-gradient-to-r from-yellow-600 to-yellow-500 overflow-y-auto no-scrollbar">
                <div className="flex flex-col w-screen m-auto bg-gray-400 h-1/3">
                    <div className="flex items-start content-center w-1/2 mx-auto h-2/5">
                        <img className="object-cover w-10/12 mx-auto fa-solid fa-cart-flatbed xl:w-6/12" src="/src/assets/undraw_logistics_x-4-dc.svg" />
                    </div>
                    <div className="flex content-center self-end w-full h-full">
                        <h1 className="m-auto text-4xl font-extrabold xl:text-8xl text-slate-300 lg:text-2x1">Gestión de Inventario</h1>
                    </div>
                </div>
                <InventoryList
                    items={items}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    loading={loading}
                    error={error}
                    searchTerm={searchTerm}
                    searchResults={searchResults}
                    onFetchItems={fetchItems}
                    onPageChange={handlePageChange}
                    onSearch={handleSearch}
                    onClearSearch={handleClearSearch}
                />
            </div>
        </>
    )
}

export default InventoryView;
