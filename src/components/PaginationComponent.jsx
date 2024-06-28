import React from 'react';
import { Pagination } from 'react-headless-pagination';

const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => {
  // Verificar si hay más de una página
  if (totalPages <= 1) {
    return null; // No renderizar nada si no hay más de una página
  }

  return (
    <div className="bottom-0 left-0 flex justify-center w-full p-4 pointer-events-none plus-jakarta-sans-bold">
      <div className="flex flex-col items-center w-full">
        <p className="mb-2">Página Actual | {currentPage + 1}</p>

        <Pagination
          currentPage={currentPage}
          setCurrentPage={onPageChange}
          totalPages={totalPages}
          className="flex"
          truncableText="..."
          truncableClassName=""
        >
          {/* Botón "Previous" */}
          <Pagination.PrevButton className="px-4 py-2 mr-2 text-white rounded-md pointer-events-auto bg-slate-950">
            Regresar
          </Pagination.PrevButton>

          {/* Lista de números de página */}
          <nav className="flex justify-center flex-grow">
            <ul className="flex items-center">
              <Pagination.PageButton
                activeClassName="bg-blue-500 text-white rounded-md px-4 py-2"
                inactiveClassName="text-gray-500 hover:bg-gray-200 rounded-md px-4 py-2"
                className="px-4 py-2 mx-1 rounded-md text-slate-950 hover:bg-gray-200"
              />
            </ul>
          </nav>

          {/* Botón "Next" */}
          <Pagination.NextButton className="px-4 py-2 ml-2 text-white rounded-md pointer-events-auto bg-slate-950">
            Siguiente
          </Pagination.NextButton>
        </Pagination>
      </div>
    </div>
  );
};

export default PaginationComponent;
