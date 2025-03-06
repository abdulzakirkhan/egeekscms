import Image from 'next/image';
import React, { useState } from 'react'
import { FiArrowLeft } from "react-icons/fi";
const itemsPerPage = 5; // Change this as needed
import { LuArrowRight } from "react-icons/lu";
const Tables = ({data}) => {
  const [currentPage, setCurrentPage] = useState(1);
  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [openActionsDropdown, setOpenActionsDropdown] = useState(null);
  // Get data for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedData = data.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleopenModal = () => {
    setShowFilterModal(!showFilterModal)
  }

  return (
     <>
          {/* Table */}
          <div className="overflow-x-auto border-2 bg-white shadow-lg rounded-lg my-8">
            <table className="w-full border-slate-500">
              {/* Table Head */}
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">type</th>
                  <th className="p-3 text-left">Edited By</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Published At</th>
                  <th className="p-3 text-left">Deadline</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
    
              {/* Table Body */}
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{item.id}</td>
                  <td className="p-3">{item.title}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">{item.type}</td>
                  <td className="p-3">{item.editedBy}</td>

                  {/* Status with Badge */}
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-white text-xs ${item.status === "Published" ? "!text-green-600" : "text-yellow-400"}`}>
                      {item.status}
                    </span>
                  </td>

                  <td className="p-3">{item.publishedAt}</td>
                  <td className="p-3">{item.deadline}</td>

                  {/* Action Dropdown */}
                  <td className="p-3 text-center relative">
                    <button onClick={() => setOpenActionsDropdown(openActionsDropdown === index ? null : index)} className="p-2 rounded-full hover:bg-gray-100">
                      <Image src={"/dashboard/update.png"} width={24} height={24} alt="" />
                    </button>

                    {openActionsDropdown === index && (
                      <div className="absolute z-50 right-0 mt-2 w-32 bg-white border border-gray-300 shadow-lg rounded-lg">
                        <ul className="py-2 text-left">
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Edit</li>
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500">Delete</li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
    
          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 space-x-2">
            <button
              className={`px-4 flex items-center gap-4 py-2 rounded-lg ${
                currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200 text-red"
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FiArrowLeft />
              Prev
            </button>
    
            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === i + 1 ? "bg-red text-white" : "hover:bg-gray-200"
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
    
            <button
              className={`px-4 flex items-center gap-4 py-2 rounded-lg ${
                currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200 text-red"
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <LuArrowRight />
            </button>
          </div>
        </>
  )
}

export default Tables
