// components/RequestList.js
import React from 'react';
import Request from './Request';
import PaginationComponent from './PaginationComponent';
const RequestList = ({ requests, currentPage, onPageChange, totalPages }) => {
    if (requests.length === 0) {
        return <p className="text-xl text-center text-gray-200 plus-jakarta-sans-bold">No hay solicitudes para mostrar.</p>;
    }

    return (
        <div className="self-center w-2/3 space-y-4">
            {requests.map(request => (
                <Request key={request.id} request={request} />
            ))}
            <PaginationComponent
                currentPage={currentPage}
                onPageChange={onPageChange}
                totalPages={totalPages} />
        </div>
    );
};

export default RequestList;
