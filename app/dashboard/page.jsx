"use client"
import Image from "next/image"
// import { FaPlus } from "react-icons/fa6";

import { CiSearch } from "react-icons/ci";
import { FiArrowLeft } from "react-icons/fi";
import { LuArrowRight } from "react-icons/lu";

import { FaPlus, FaFilter } from "react-icons/fa";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import Header from "@/components/Header";
import TableComponent from "@/components/TableComponent";
import BlogForm from "@/components/BlogForm";
import NewHeader from "@/components/NewHeader";
export default function Home() {
  const data = [
    { id: 1, description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam accusantium voluptate omnis.",category:"Artificial Intelligence", title: "Lorem ipsum dolor sit amet conshjetur",postType:"Blog", editedBy: "Admin", publishedAt: "10/02/2025 | 8:23 pm" },
    { id: 2, description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam accusantium voluptate omnis.",category:"Artificial Intelligence", title: "Lorem ipsum dolor sit amet conshjetur",postType:"Blog", editedBy: "John Doe", publishedAt: "10/02/2025 | 8:23 pm" },
    { id: 3, description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam accusantium voluptate omnis.",category:"Artificial Intelligence", title: "Junior UI/UX Designer",postType:"Job", editedBy: "Jane Doe", publishedAt: "10/02/2025 | 8:23 pm" },
    { id: 4, description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam accusantium voluptate omnis.",category:"Artificial Intelligence", title: "Senior Laravel Developer",postType:"Job", editedBy: "Jane Doe", publishedAt: "10/02/2025 | 8:23 pm" },
    { id: 5, description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam accusantium voluptate omnis.",category:"Web Development", title: "Hi-Tea at Monal with IT Team",postType:"Event", editedBy: "Jane Doe", publishedAt: "10/02/2025 | 8:23 pm" },
    { id: 6, description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam accusantium voluptate omnis.",category:"Web Development", title: "CEO Dinner with Sales Team: Strngthin...",postType:"Event", editedBy: "Jane Doe", publishedAt: "10/02/2025 | 8:23 pm" },
    { id: 7, description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam accusantium voluptate omnis.",category:"App Development", title: "CEO Dinner with Sales Team: Strngthin...",postType:"Event", editedBy: "Jane Doe", publishedAt: "10/02/2025 | 8:23 pm" },
    { id: 8, description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam accusantium voluptate omnis.",category:"App Development", title: "CEO Dinner with Sales Team: Strngthin...",postType:"Event", editedBy: "Jane Doe", publishedAt: "10/02/2025 | 8:23 pm" },
    { id: 9, description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam accusantium voluptate omnis.",category:"App Development", title: "CEO Dinner with Sales Team: Strngthin...",postType:"Event", editedBy: "Jane Doe", publishedAt: "10/02/2025 | 8:23 pm" },
    { id: 10, description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam accusantium voluptate omnis.",category:"App Development", title: "CEO Dinner with Sales Team: Strngthin...",postType:"Event", editedBy: "Jane Doe", publishedAt: "10/02/2025 | 8:23 pm" },
  ];
  const [visiAbleNewBlog, setvisiAbleNewBlog] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
    const itemsPerPage = 5; 
    const [isEditing, setIsEditing] = useState(false);
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
  const [openDropdown, setOpenDropdown] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [showFilterModal, setShowFilterModal] = useState(false)
  const cardsData =[
    {
      title:"Blogs Posted",
      count:"10",
      topIcon:"/dashboard/bl.png",
      icon:"/dashboard/wbl.png",
      i:"/dashboard/blog-i.png"
    },
    {
      title:"Jobs Posted",
      count:"10",
      topIcon:"/dashboard/posts.png",
      icon:"/dashboard/wbl.png",
      i:"/dashboard/job-i.png"
    },
    {
      title:"Events Posted",
      count:"10",
      topIcon:"/dashboard/events.png",
      icon:"/dashboard/wbl.png",
      i:"/dashboard/event-i.png"
    },
  ]
  const [showModalSuccess, setShowModalSuccess] = useState(false);


  const handleopenModal = () => {
    setShowFilterModal(!showFilterModal)
  }
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
  return (
    <>
    {isEditing ? (
      <>
        {/* <Header title={`Edit ${currentBlog.postType}`} /> */}
        <NewHeader title={`Edit ${currentBlog.postType}`} onclick={setShowModalSuccess} />
        <BlogForm
          initialValues={currentBlog || { title: "", category: "", description: "" }} // Pass currentBlog or default values
          onSubmit={handleSubmit}
          isEditing={isEditing}
        />
      </>
    ):(

    <>
      <Header title={"Dashboard"} />
  
      <section className="bg-[#F6F6F6] py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cls-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
            {cardsData.map((card,index) => (
              <div className={`w-full ps-6 ${card?.title === "Blogs Posted" ? "bg-[#5856D6]": card?.title === "Jobs Posted" ? "bg-[#007AFF]" : "bg-[#30B0C7]"
              } rounded-xl flex items-center overflow-x-hidden sm-h-30 md:min-h-[170px] lg:min-h-[170px]`} key={index}>
                <div className="flex w-full justify-between">
                  <div className="flex flex-col">
                    <p className="text-white text-xl flex items-center gap-4">{card.title} <Image src={card.i} width={index === 0 ? 20 : 27} height={24} alt={card.title} /> </p>
                    <span className="text-xl text-white mt-4 font-bold">{card.count}</span>
                  </div>



                  <div className="relative h-full">
                    <Image src={card.topIcon} width={100} height={100} alt="" className="-mt-12 z-50 mb-7 ms-9" />
                    <Image src={card.icon} width={100} height={100} alt="" className="absolute z-0 top-0" />
                  </div>
                </div>
              </div>
            ))}



          </div>
        </div>
      </section>




      <section className="bg-[#F6F6F6]">
        <div className="container mx-auto px-6">
          <div className="flex justify-end items-center">
            
            <div className="flex gap-4 items-center">
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
                        <th className="p-3 text-left">Post type</th>
                        {/* {category ? <th className="p-3 text-left">Category</th> :""} */}
                        <th className="p-3 text-left">Edited By</th>
                        <th className="p-3 text-left">Published At</th>
                        <th className="p-3 text-center">Action</th>
                      </tr>
                    </thead>
          
                    {/* Table Body */}
                    <tbody>
                    {paginatedData.map((item) => (
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
                              <button type="button" className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition duration-200" onClick={() => handleEditBlog(item)}>Edit</button>
                              <button type="button" className="w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-red-100 transition duration-200">Delete</button>
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
                {/* <TableComponent data={data} /> */}
            </div>
        </div>
      </section>
    </>
    )}
    </>
  )
}





