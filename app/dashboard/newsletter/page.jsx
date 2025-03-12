"use client";
import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";
import { LuArrowRight } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import Lottie from "lottie-react";
import { FaPlus, FaFilter } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import TableComponent from "@/components/TableComponent";
import NewHeader from "@/components/NewHeader";
import BlogForm from "@/components/BlogForm";
// import successAnimation from "../../public/Success.json";
import successAnimation from "@/public/Success.json";
import Card from "@/components/Card";
import { useSelector, useDispatch } from "react-redux";
import { addBlog, deleteBlog, updateBlog } from "../store/blogSlice";
import { Trash } from "lucide-react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Table from "@/components/Table";









export default function BlogsPage() {
  const dispatch =useDispatch()
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [deleteAlert, setDeleteAlert] = useState(false)
  const blogs = useSelector((state) => state.blog.blogs);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [visiAbleNewBlog, setvisiAbleNewBlog] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState(null)
  const [showToast, setShowToast] = useState(false)




  const handleFileClick = () => fileInputRef.current.click();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedFile(file.name);
  };
// Function to handle "Edit" button click
  const handleEditBlog = (blog) => {
    setCurrentBlog(blog); // Set the blog to be edited
    setIsEditing(true); // Enable editing mode
    setvisiAbleNewBlog(true); // Show the BlogForm
  };
  const handleSubmit = (formData) => {
    // console.log("Form submitted:", formData);
  
    const formDataUpdated = { 
      ...formData, 
      id: isEditing ? formData.id : blogs.length+1, 
      image: selectedFile || null,  
    };
  
    try {
      dispatch(isEditing ? updateBlog(formDataUpdated) : addBlog(formDataUpdated));
      setShowModalSuccess(true);

      console.log("formDataUpdated", formDataUpdated)
      setTimeout(() => {
        setShowModalSuccess(false);
        setvisiAbleNewBlog(false); // Ensure it closes after modal hides
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(blogs.length / itemsPerPage);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedData = blogs.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  };

  const handleDropdown = (id) => setActiveDropdown(activeDropdown === id ? null : id);
  const handleopenModal = () => setShowFilterModal(!showFilterModal);
  const toggleVisibilityNewBlog = () => setvisiAbleNewBlog(!visiAbleNewBlog);



  const handelDeleteBlog =(id) => {
    setDeleteAlert(true)
    setId(id)
  }




  const deleteBlogs = () => {
    try {
      setDeleteAlert(false)
      setShowToast(true)
      toast.success("Successfully! deleted blog")
      setTimeout(() => {
        dispatch(deleteBlog(id))
      }, 2000);
      setShowToast(false)
    } catch (error) {
      toast.error("Failed to delete the blog.",error);
    }
  }
  useEffect(() => {
    console.log("Success modal visibility:", showModalSuccess);
  }, [showModalSuccess]);

  const columns = [
    { header: "ID"},
    { header: "Title"},
    { header: "Post Type"},
    { header: "Edited By"},
    { header: "Published At"},
    { header: "Action"},
  ];
  return (
    <>
    {showToast && <ToastContainer position="top-right" autoClose={2000} />}
      {visiAbleNewBlog ? (
        <>
        <div className="lg:container lg:pl-8">
          <NewHeader title={currentBlog ? "Update Newsletter" :"New Newsletter"} onclick={setShowModalSuccess} />
          <BlogForm
            initialValues={currentBlog || { title: "", category: "", description: "" }} // Pass currentBlog or default values
            onSubmit={handleSubmit}
            isEditing={isEditing}
          />
        </div>
        </>
      ) : (
        <>

          <Header title={"Manage Newsletter"} />
          <section className="bg-[#F6F6F6] py-8">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
                <Card />
              </div>
            </div>
          </section>
          <section className="bg-[#F6F6F6]">
            <div className="container mx-auto px-6">
              <div className="flex flex-wrap space-y-4 lg:flex-nowrap justify-between items-center">
                <div>
                  <button className="w-[142px] h-[43px] bg-red btntext rounded-lg flex justify-center items-center gap-3" onClick={toggleVisibilityNewBlog}>Create New <FaPlus /></button>
                </div>
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="relative">
                    <input type="text" placeholder="Search..." className="w-[300px] h-[40px] px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red" />
                    <CiSearch size={20} className="absolute top-2 right-2" />
                  </div>
                  <div className="flex items-center">
                    <Image src={"/dashboard/sort.png"} width={14} height={12} alt="sort" />
                    <select className="selection:outline-none selection:border-none outline-none px-4 appearance-none bg-transparent cursor-pointer" onChange={(e) => setSortOrder(e.target.value)}>
                      <option value="asc">Sort</option>
                      <option value="desc">Sort Z-A</option>
                    </select>
                  </div>
                  <div className="relative">
                    <button className="flex justify-center items-center gap-3" onClick={handleopenModal}>
                      <Image src={"/dashboard/filter.png"} width={18} height={18} alt="" />
                      Filter
                    </button>
                    {showFilterModal && (
                      <div className="bg-white fixed right-16 rounded-xl z-50 shadow-lg border-2 p-6 w-[390px] h-[362px]">
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
                        <div className="mb-4">
                          <label className="text-sm font-semibold mb-1 block">Category</label>
                          <select className="border p-2 rounded-lg w-full">
                            <option value="">Select Category</option>
                            <option value="news">News</option>
                            <option value="blog">Blog</option>
                            <option value="tutorial">Tutorial</option>
                          </select>
                        </div>
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
                        <div className="flex justify-center mt-8">
                          <button className="px-4 py-2 bg-red text-white rounded-lg hover:bg-red-600">Apply</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>


              <div className="py-6">
                <div className="overflow-x-auto border-2 bg-white shadow-lg rounded-lg my-8">
                  <table className="w-full border-slate-500">
                    <thead>
                      <tr className="bg-gray-200 text-gray-700">
                        <th className="p-3 text-left">ID</th>
                        <th className="p-3 text-left">Title</th>
                        <th className="p-3 text-left">Category</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Edited By</th>
                        <th className="p-3 text-left">Published At</th>
                        <th className="p-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="p-3">{item?.id}</td>
                          <td className="p-3">{item.title}</td>
                          <td className="p-3">{item.category}</td>
                          <td className={`p-3 ${item.status === "Published" ? "text-emerald-600" : "text-yellow-400"}`}>{item.status}</td>
                          <td className="p-3">{item.editedBy}</td>
                          <td className="p-3">{item.publishedAt}</td>
                          <td className="p-3 text-center relative">
                            <button className="p-2 rounded-full hover:bg-gray-100" onClick={() => handleDropdown(item.id)}>
                              <img src="/dashboard/update.png" width={24} height={24} alt="" />
                            </button>
                            {activeDropdown === item.id && (
                              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-50 flex flex-col items-start px-4 py-2 space-y-2">
                                <button type="button" className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition duration-200" onClick={() => handleEditBlog(item)}>Edit</button>
                                <button type="button" className="w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-red-100 transition duration-200" onClick={() => handelDeleteBlog(item.id)}>Delete</button>
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

              </div>
            </div>
          </section>
        </>
      )}
      {showModalSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={() => setShowModalSuccess(false)}>
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-center items-center w-96 h-72 text-center">
            <div className="w-32 h-32">
              <Lottie animationData={successAnimation} loop={false} />
            </div>
            <h1 className="text-xl font-bold mb-2">Blog Published Successfully</h1>
            <p className="text-gray-600">Click anywhere to continue</p>
          </div>
        </div>
      )}
      {deleteAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={() => setShowModalSuccess(false)}>
          <div className="bg-white shadow-lg rounded-lg p-3 flex flex-col lg:w-410 lg:h-40">
            <div className="px-6 py-3">
              <h1 className="text-xl font-bold mb-2 flex items-center gap-2 text-red"><MdOutlineDeleteOutline size={40} className="text-red" />   Delete</h1>
              <p className="text-gray-600">Are you sure you want to delete <span className="text-red">Lorem ipsum dolor...</span> ?</p>
            </div>
            {/* cancel and delete buttons */}
            <div className="flex justify-end items-center gap-4">
              <button className="bg-grey py-2 px-4 rounded-lg text-white" onClick={() => setDeleteAlert(false)}>Cancel</button>
              <button className="bg-red py-2 px-4 rounded-lg text-white" onClick={deleteBlogs}>Delete</button>
            </div>
          </div>
        </div>
      )}


    </>
  );
}