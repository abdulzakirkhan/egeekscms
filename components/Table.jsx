import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { LuArrowRight } from "react-icons/lu";

const Table = ({ columns, data, handleEdit, handleDelete,activeDropdown  ,handleDropdown,setActiveDropdown }) => {
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    // const [activeDropdown, setActiveDropdown] = useState(null);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const paginatedData = data.slice(indexOfFirstItem, indexOfLastItem);

     
    const handlePageChange = (pageNumber) => {
      if (pageNumber > 0 && pageNumber <= totalPages) setCurrentPage(pageNumber);
    };
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              {columns.map((column, index) => (
                <th key={index} className="py-2 px-4 border-b">{column.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          {data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{item.id}</td>
              <td className="p-3">{item.title}</td>
              <td className="p-3">{item.postType}</td>
              <td className="p-3">{item.editedBy}</td>
              <td className="p-3">{item.publishedAt}</td>
              <td className="p-3 text-center relative">
                  <button className="p-2 rounded-full hover:bg-gray-100" onClick={() => handleDropdown(item.id)}>
                  <img src="/dashboard/update.png" width={24} height={24} alt="" />
                  </button>
                  {activeDropdown === item.id && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-50 flex flex-col items-start px-4 py-2 space-y-2">
                      <button type="button" className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition duration-200" onClick={() => handleEdit(item)}>Edit</button>
                      <button type="button" className="w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-red-100 transition duration-200">Delete</button>
                  </div>
                  )}
              </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        <button
          className={`px-4 flex items-center gap-4 py-2 rounded-lg ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200 text-red"}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FiArrowLeft /> Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-4 py-2 rounded-lg ${currentPage === i + 1 ? "bg-red text-white" : "hover:bg-gray-200"}`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className={`px-4 flex items-center gap-4 py-2 rounded-lg ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200 text-red"}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next <LuArrowRight />
        </button>
      </div>
    </>
  );
};

export default Table;
