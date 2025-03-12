import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { LuArrowRight } from "react-icons/lu";
const itemsPerPage = 5; 
export default function TableComponent({data,category}) {
  const [currentPage, setCurrentPage] = useState(1);
 
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedData = data.slice(indexOfFirstItem, indexOfLastItem);
  const [showDropDown, setShowDropDown] = useState(true)
  // Handle page changes
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };


  const handleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };
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
              {category ? <th className="p-3 text-left">Category</th> :""}
              <th className="p-3 text-left">Edited By</th>
              <th className="p-3 text-left">Published At</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{item.id}</td>
                <td className="p-3">{item.title}</td>
                {category ? <td className="p-3">{item.category}</td> : ""}
                <td className="p-3">{item.editedBy}</td>



                <td className="p-3">{item.publishedAt}</td>

                {/* Action Dropdown */}
                <td className="p-3 text-center relative">
                  <button 
                    className="p-2 rounded-full hover:bg-gray-100" 
                    onClick={() => handleDropdown(item.id)}
                  >
                    <img src="/dashboard/update.png" width={24} height={24} alt="" />
                  </button>

                  {activeDropdown === item.id && (
                    
                    <div className="absolute right-0 mt-2 w-40 bg-white shadowCustom  rounded-lg z-50 flex flex-col items-start px-4 py-2 space-y-2">
                      <button 
                        type="button" 
                        className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition duration-200"
                      >
                        Edit
                      </button>
                      <button 
                        type="button" 
                        className="w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-red-100 transition duration-200"
                      >
                        Delete
                      </button>
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
}
