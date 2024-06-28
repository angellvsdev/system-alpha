// BenefitList.jsx

import React from 'react';
import Benefit from './Benefit';
import PaginationComponent from './PaginationComponent';

const BenefitList = ({ benefits, onUpdate, onDelete, currentPage, onPageChange, totalPages }) => {
  return (
    <div className="self-center h-6 space-y-4">
      {benefits.map(benefit => (
        <Benefit
          key={benefit.id}
          benefit={benefit}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
      <PaginationComponent
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages} />
    </div>
  );
};

export default BenefitList;
