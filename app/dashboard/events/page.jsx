"use client"
import Image from "next/image"
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import Header from "@/components/Header";
import Tables from "@/components/Tables";
import NewHeader from "@/components/NewHeader";
import { FiArrowLeft } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
const itemsPerPage = 5; // Change this as needed
import { LuArrowRight } from "react-icons/lu";
import JobForm from "@/components/JobForm";
import Card from "@/components/Card";
export default function JobsPage() {
  const events = useSelector((state) => state.events.events);

  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [visiAbleNewBlog, setvisiAbleNewBlog] = useState(false)

  const [currentBlog, setCurrentBlog] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);

  const handleEditBlog = (blog) => {
    setCurrentBlog(blog); // Set the blog to be edited
    setIsEditing(true); // Enable editing mode
    setvisiAbleNewBlog(true); // Show the BlogForm
  };
    const handleSubmit = (values) => {
      console.log("Form submitted:", values);
      setShowModalSuccess(true);
      setvisiAbleNewBlog(false);
    };
  const handleopenModal = () => {
    setShowFilterModal(!showFilterModal)
  }
  const toggleVisibilityNewBlog = () => {
    setvisiAbleNewBlog(!visiAbleNewBlog)
  }


  // table
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedData = events.slice(indexOfFirstItem, indexOfLastItem);
  // Calculate total pages
  const totalPages = Math.ceil(events.length / itemsPerPage);
  const [openActionsDropdown, setOpenActionsDropdown] = useState(null);
  // Handle page changes
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
    {visiAbleNewBlog ? <>
      <div className="lg:container lg:pl-8">
          <NewHeader title={currentBlog ? "Update Event" : "New Event"} onclick={setShowModalSuccess} />
          <JobForm
            initialValues={currentBlog || { title: "", category: "", description: "" }} // Pass currentBlog or default values
            onSubmit={handleSubmit}
            isEditing={isEditing}
            toggleVisibilityNewBlog={toggleVisibilityNewBlog}
          />
      </div>
    </> :
    <>
        <Header title={"Manage Events"} />
        <section className="bg-[#F6F6F6] py-8">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cls-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
              <Card />



            </div>
          </div>
        </section>
        <section className="bg-[#F6F6F6]">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap space-y-4 lg:flex-nowrap justify-between items-center">
              <div className="">
                <button className="w-[142px] h-[43px] bg-red btntext rounded-lg flex justify-center items-center gap-3" onClick={toggleVisibilityNewBlog}>Create New <FaPlus /></button>
              </div>
              <div className="flex flex-wrap gap-4 items-center">
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-[300px] h-[40px] px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red"
                />
                <CiSearch size={20} className="absolute top-2 right-2" />

              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center">
                {/* Arrow Icons */}
                <div className="">
                  <Image src={"/dashboard/sort.png"} width={14} height={12} alt="sort" />
                </div>
                <select
                  className=" selection:outline-none selection:border-none outline-none px-4 appearance-none bg-transparent cursor-pointer"
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="asc">Sort</option>
                  <option value="desc">Sort Z-A</option>
                </select>
              </div>

              {/* Filter Button */}
              <div className="relative">
                <button className="flex justify-center items-center gap-3" onClick={handleopenModal}>
                  <Image src={"/dashboard/filter.png"} width={18} height={18} alt="" />
                  Filter
                </button>

                {showFilterModal && (
                  <div className="bg-white fixed right-16 rounded-xl z-50 shadow-lg border-2 p-6 w-[390px] h-[362px]">
                    
                    {/* Start Date & End Date Row */}
                    <div className="flex gap-4 mb-4">
                      <div className="flex flex-col w-1/2">
                        <label className="text-sm font-semibold mb-1">Start Date</label>
                        <input type="date" className="border p-2 rounded-lg w-full" />
                      </div>
                      <div className="flex flex-col w-1/2">
                        <label className="text-sm font-semibold mb-1">End Date</label>
                        <input type="date" className="border p-2 rounded-lg w-full" />
                      </div>
                    </div>

                    {/* Category Dropdown Row */}
                    <div className="mb-4">
                      <label className="text-sm font-semibold mb-1 block">Category</label>
                      <select className="border p-2 rounded-lg w-full">
                        <option value="">Select Category</option>
                        <option value="news">News</option>
                        <option value="blog">Blog</option>
                        <option value="tutorial">Tutorial</option>
                      </select>
                    </div>

                    {/* Status Radio Buttons Row */}
                    <div className="mb-4">
                      <label className="text-sm font-semibold mb-1 block">Status</label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input type="radio" name="status" value="all" className="mr-2" defaultChecked />
                          All
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="status" value="published" className="mr-2" />
                          Published
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="status" value="draft" className="mr-2" />
                          Draft
                        </label>
                      </div>
                    </div>

                    {/* Apply & Reset Buttons */}
                    <div className="flex justify-center mt-8">
                      <button className="px-4 py-2 bg-red text-white rounded-lg hover:bg-red-600">
                        Apply
                      </button>
                    </div>

                  </div>
                )}
              </div>
            </div>
            </div>
            <div className="py-6">
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
                                <td className="p-3">{item.jobcategory}</td>
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
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleEditBlog(item)}>Edit</li>
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
            </div>
          </div>
        </section>
      </>}
      
    </>
  )
}





