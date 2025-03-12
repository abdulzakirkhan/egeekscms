"use client"
import { IoMdMail } from "react-icons/io";
import Header from '@/components/Header';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IoEyeOff } from "react-icons/io5";
import Image from "next/image";
import { FaEye } from "react-icons/fa";
const MyAccountPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [visiable, setVisiable] = useState(false)
  const [oldPassword, setOldPassword] = useState(false)
  const [newPassVisiable, setNewPassVisiable] = useState(false)
  const [confirmNewPassword, setConfirmNewPassword] = useState(false)
// Validation Schema
const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters"),
  });




  const handleVisAble =() => {
    setVisiable(!visiable)
  }
  const handleNewVisAble = () => {
    setNewPassVisiable(!newPassVisiable)
    
}
const toggleConfirmPasswordVisibility = () => {
    setConfirmNewPassword(!confirmNewPassword)
}

const toggleOldPasswordVisibility =() => {
    setOldPassword(!oldPassword)
}
  return (
    <>
      <div className="container mx-auto pl-8">
        <Header title="My Account" />
      </div>
      <section className="py-6 px-20">
        {/* Tabs */}
        <div className="flex justify-center items-center gap-4 pb-3">
          <button
            className={`px-4 py-2 text-lg font-medium ${activeTab === "general" ? "border-b-2 border-red text-red" : "text-gray-600"}`}
            onClick={() => setActiveTab("general")}
          >
            General
          </button>
          <button
            className={`px-4 py-2 text-lg font-medium ${activeTab === "password" ? "border-b-2 border-red text-red" : "text-gray-600"}`}
            onClick={() => setActiveTab("password")}
          >
            Change Password
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "general" && (
            <>
                <div>
                <h2 className="text-xl font-bold mb-4">Account Details</h2>
                </div>
                <div className="flex justify-between items-center border-b-2 pb-3">
                    <div className="flex items-center gap-4">
                        <div className="bg-no-repeat cursor-pointer flex justify-center items-center bg-center w-[80px] h-[80px] rounded-full" style={{backgroundImage:"url(/Header/bg.png)",backgroundSize:"100% 100%"}}>
                            <span className="text-[#4F378A]">S</span>
                        </div>
                        <div className="">
                            <h2 className='font-bold text-black mb-2'>John Mark</h2>
                            <p>johnmark@gmail.com</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <label htmlFor="file" className="bg-white py-2 px-6 rounded-lg">Upload new picture</label>
                        <input type="file" id='file'  className='hidden'/>



                        <div className="">
                            <button className="bg-grey py-3 px-3 !text-[#000000] btntext rounded-lg">Remove</button>
                        </div>
                    </div>
                </div>


                <div className="">
                    {/* here should be formik form , having firstName last fileds in row and email password in another row  */}
                    <Formik
              initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log("Form Data:", values);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="mt-6 space-y-4">
                    <h1 className="text-lg font-bold">Full Name</h1>
                  <div className="grid grid-cols-2 gap-4">
                    {/* First Name */}
                    <div>
                      <label className="block text-gray-700">First Name</label>
                      <Field
                        type="text"
                        name="firstName"
                        placeholder="Enter first name"
                        className="w-full px-4 py-2 border rounded-md"
                      />
                      <ErrorMessage name="firstName" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-gray-700">Last Name</label>
                      <Field
                        type="text"
                        name="lastName"
                        placeholder="Enter last name"
                        className="w-full px-4 py-2 border rounded-md"
                      />
                      <ErrorMessage name="lastName" component="p" className="text-red-500 text-sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="!relative">
                      <label className="block text-gray-700">Email</label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        className="w-full px-8 py-2 border rounded-md"
                      />
                      <IoMdMail className="text-grey !absolute top-9 left-2" />
                      <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Password */}
                    <div className="relative">
                      <label className="block text-gray-700">Password</label>
                      <Field
                        type={visiable ? "text" :"password"}
                        name="password"
                        placeholder="Enter password"
                        className="w-full px-10 py-2 border rounded-md"
                      />
                      <div className="absolute top-7 right-3">
                         {visiable ? <IoEyeOff className="text-grey cursor-pointer" size={30} onClick={handleVisAble}  /> : <FaEye  className="text-grey cursor-pointer" size={30} onClick={handleVisAble} />}
                      </div>
                      <Image src={"/MyAccount/Key.png"} width={24} height={24} alt="Key" className="absolute top-8 left-2" />
                      <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
                    </div>
                  </div>


                  <div className="flex justify-end items-center gap-4">
                    <button className="btntext bg-blck py-2 px-5 rounded-lg">Cancel</button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-red text-white rounded-lg btntext"
                    >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                  </div>

                </Form>
              )}
            </Formik>
                </div>
            </>
          )}

        {activeTab === "password" && (
            <div>
                <h2 className="text-xl font-bold mb-4">Change your Password</h2>
                <form className="space-y-4">
                {/* First Row - Old Password */}
                <div>
                    <label className="block text-md font-bold">Old Password</label>
                    <div className="relative">
                      <input
                        type={oldPassword ? "text" :"password"}
                        name="password"
                        placeholder="Re-enter new password"
                        className="w-full px-10 py-2 border rounded-md"
                      />
                      <div className="absolute bottom-2 right-3">
                         {oldPassword ? <IoEyeOff className="text-grey cursor-pointer" size={30} onClick={toggleOldPasswordVisibility}  /> : <FaEye  className="text-grey cursor-pointer" size={30} onClick={toggleOldPasswordVisibility} />}
                      </div>
                      <Image src={"/MyAccount/Key.png"} width={24} height={24} alt="Key" className="absolute bottom-2 left-2" />
                    </div>
                </div>

                {/* Second Row - New Password & Re-enter New Password */}
                    <h1 className="block text-gray-700">New Password</h1>
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        type={newPassVisiable ? "text" :"password"}
                        name="password"
                        placeholder="Enter new password"
                        className="w-full px-10 py-2 border rounded-md"
                      />
                      <div className="absolute bottom-2 right-3">
                         {newPassVisiable ? <IoEyeOff className="text-grey cursor-pointer" size={30} onClick={handleNewVisAble}  /> : <FaEye  className="text-grey cursor-pointer" size={30} onClick={handleNewVisAble} />}
                      </div>
                      <Image src={"/MyAccount/Key.png"} width={24} height={24} alt="Key" className="absolute bottom-2 left-2" />
                    </div>
                    <div className="relative">
                      <input
                        type={confirmNewPassword ? "text" :"password"}
                        name="password"
                        placeholder="Re-enter new password"
                        className="w-full px-10 py-2 border rounded-md"
                      />
                      <div className="absolute bottom-2 right-3">
                         {confirmNewPassword ? <IoEyeOff className="text-grey cursor-pointer" size={30} onClick={toggleConfirmPasswordVisibility}  /> : <FaEye  className="text-grey cursor-pointer" size={30} onClick={toggleConfirmPasswordVisibility} />}
                      </div>
                      <Image src={"/MyAccount/Key.png"} width={24} height={24} alt="Key" className="absolute bottom-2 left-2" />
                    </div>
                </div>

                    <div className="flex justify-end items-center gap-4">
                        <button className="btntext bg-blck py-2 px-5 rounded-lg">Cancel</button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-red text-white rounded-lg btntext"
                        >
                           Save Changes
                        </button>
                  </div>
                </form>
            </div>
        )}
        </div>
      </section>
    </>
  );
};

export default MyAccountPage;
