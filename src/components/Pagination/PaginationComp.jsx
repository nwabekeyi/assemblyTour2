import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <div className="flex justify-center mt-8 space-x-2">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md border ${
            page === currentPage
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
