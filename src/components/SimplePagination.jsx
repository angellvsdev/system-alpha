import React from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";
export function SimplePagination({ currentPage, totalPages, onPageChange }) {
  const next = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-16 w-full bg-transparent">
      <IconButton
        size="sm"
        variant="text"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography color="gray" className="font-normal">
        Página <strong className="text-gray-900">{currentPage + 1}</strong> de {" "}
        <strong className="text-gray-900">{totalPages}</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="text"
        onClick={next}
        disabled={currentPage === totalPages}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
}
