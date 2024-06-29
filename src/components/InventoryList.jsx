import React from 'react';
import InventoryListItem from './InventoryListItem.jsx';
import InventoryItemAddingModal from './InventoryItemAddingModal.jsx';
import PaginationComponent from './PaginationComponent.jsx';
import SearchInput from './SearchInput';

const InventoryList = ({
    items,
    currentPage,
    totalPages,
    loading,
    error,
    searchTerm,
    searchResults,
    onFetchItems,
    onPageChange,
    onSearch,
    onClearSearch
}) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    // Abrir el modal de agregar ítem
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Cerrar el modal de agregar ítem
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Manejar la adición de un nuevo ítem
    const handleItemAdded = (newItem) => {
        // Actualizar la lista de ítems en `InventoryView` si es necesario
        onFetchItems(currentPage);  // Volver a cargar los ítems después de agregar uno nuevo
    };

    // Determinar qué lista mostrar (todos los ítems o los resultados de la búsqueda)
    const displayedItems = searchTerm === '' ? items : searchResults;

    return (
        <div className="flex flex-col w-full h-auto p-2 mx-auto my-8 lg:w-4/5 lg:p-1 lg:my-12 lg:ml-8 xl:mx-auto">
            <div className="plus-jakarta-sans-bold w-full h-12 bg-gradient-to-r from-emerald-700 from-10% via-emerald-600 via-30% to-emerald-500 to-90% rounded-lg mb-2 lg:mb-4">
                <button
                    onClick={openModal}
                    type="button"
                    className="w-full h-full p-2 font-bold text-white transition border-2 rounded-lg border-emerald-900 hover:bg-slate-200 hover:text-emerald-700 hover:border-emerald-500"
                >
                    <i className="fa-solid fa-truck-ramp-box"></i> Añadir Insumo
                </button>
            </div>
            {/* Barra de búsqueda utilizando SearchInput */}
            <SearchInput
                onSearch={onSearch}
                onClearSearch={onClearSearch}
                searchTerm={searchTerm}
            />

            <div className="flex flex-col flex-grow w-full p-2 lg:p-1 my-1 lg:my-0.5 bg-yellow-500 rounded-lg overflow-y-auto max-h-96 lg:max-h-72">
                {/* Mostrar mensajes de carga, error o resultados */}
                {loading ? (
                    <p className="text-gray-500 text-center">Cargando...</p>
                ) : error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : displayedItems.length === 0 ? (
                    <p className="text-gray-500 text-center">No encontrado</p>
                ) : (
                    displayedItems.map((item) => (
                        <InventoryListItem
                            key={item.id}
                            item={item}
                            onEdit={(itemId, editedItem) => {
                                // Actualizar la lista de ítems en `InventoryView` si es necesario
                                onFetchItems(currentPage);  // Volver a cargar los ítems después de editar uno
                            }}
                            onDelete={(itemId) => {
                                // Actualizar la lista de ítems en `InventoryView` si es necesario
                                onFetchItems(currentPage);  // Volver a cargar los ítems después de eliminar uno
                            }}
                        />
                    ))
                )}
            </div>
            <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
            <InventoryItemAddingModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                onItemAdded={handleItemAdded}
            />
        </div>
    );
};

export default InventoryList;
