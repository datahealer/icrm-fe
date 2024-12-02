import React from 'react';

function Pagination({ itemsPerPage, totalItems, currentPage, setCurrentPage }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Function to handle page change
  const handleClick = (pageNumber) => {
    // Ensure the current page doesn't exceed the total number of pages
    const newPage = Math.min(Math.max(1, pageNumber), totalPages);
    setCurrentPage(newPage);
  };
  
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => handleClick(currentPage - 1)}
            >
              Previous
            </a>
          </li>
          {pageNumbers.map((number) => (
          <li key={number}>
            <a
              href="#"
              onClick={() => handleClick(number)}
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === number ? 'bg-blue-50 text-blue-600' : ''}`}
            >
              {number}
            </a>
          </li>
        ))}
          <li>
            <a
              href="#"
              onClick={() => handleClick(currentPage + 1)}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Pagination;
