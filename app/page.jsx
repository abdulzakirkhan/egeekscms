"use client";

import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { IoEyeOff } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

const LogInPage = () => {
  const [visiable, setVisiable] = useState(false);
  const [isAuth, setIsAuth] = useState(false)
  const router = useRouter()
  const handleVisAble = () => {
    setVisiable(!visiable);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSubmit =async (values, { setSubmitting }) =>{
    try {
      console.log("Form Data:", values);
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      toast.success("Login successfully!");
      
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);


    } catch (error) {
      toast.error("Login failed:", error);
    } finally {
      setSubmitting(false);
    }
  }



  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      router.push("/dashboard")
    }
  }, [])
  

  return (
    <>
      <section
        className="bg-no-repeat bg-center w-full h-[100vh] flex justify-center items-center"
        style={{ backgroundImage: "url(/login/bg.png)", backgroundSize: "100% 100%" }}
      >
        <div className="container mx-auto px-7">
          <div className="bg-[#BBC0C5] w-[70%] mx-auto p-10 h-[547px] rounded-xl">
            <div className="flex justify-center">
              <Image src={"/Egeek Logo.png"} width={300} height={122} alt="" />
            </div>
            <Formik
              initialValues={{ email: "", password: "", rememberMe: false }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (

                <Form className="mt-6 space-y-8">
                  {/* Email Field */}
                  <p className="text-[#5A686F] text-md font-semibold">Login to CMS</p>
                  <div className="relative">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      className="w-full px-8 py-2 border rounded-md"
                    />
                    <IoMdMail className="text-grey absolute bottom-3 left-2" />
                    <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                  </div>

                  {/* Password Field */}
                  <div className="relative mt-4">
                    <Field
                      type={visiable ? "text" : "password"}
                      name="password"
                      placeholder="Enter password"
                      className="w-full px-10 py-2 border rounded-md"
                    />
                    <div className="absolute bottom-2 right-3">
                      {visiable ? (
                        <IoEyeOff className="text-grey cursor-pointer" size={30} onClick={handleVisAble} />
                      ) : (
                        <FaEye className="text-grey cursor-pointer" size={30} onClick={handleVisAble} />
                      )}
                    </div>
                    <Image src={"/MyAccount/Key.png"} width={24} height={24} alt="Key" className="absolute bottom-2 left-2" />
                    <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex justify-between items-center">
                    <label className="flex items-center space-x-2">
                      <Field type="checkbox" name="rememberMe" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                      <span className="text-sm text-gray-700">Remember me</span>
                    </label>
                    <a href="/forgot-password" className="text-blue-500 text-sm hover:underline">
                      Forgot Password?
                    </a>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 mt-4 bg-red text-white rounded-lg btntext"
                    >
                      {isSubmitting ? "Saving..." : "Login"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={2000} />
      </section>
    </>
  );
};

export default LogInPage;
