"use client";
import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import QuillEditor from "@/components/QuillEditor";

// Yup Validation Schema
const BlogSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
});

export default function BlogForm({ initialValues, onSubmit, isEditing }) {
  const [selectedFile, setSelectedFile] = useState(initialValues?.image || null);
  const fileInputRef = useRef(null);

  const handleFileClick = () => fileInputRef.current.click();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedFile(file);
  };

  return (
    <Formik
      initialValues={initialValues || { title: "", category: "", description: "" }} // Pre-fill form if initialValues exist
      validationSchema={BlogSchema}
      onSubmit={(values, { resetForm }) => {
        const formData = {
          ...values,
          id: isEditing ? initialValues?.id : Date.now(), // Ensure ID is added
          status:isEditing ? initialValues.status : "Published",
          editedBy:isEditing ? initialValues.editedBy : "Admin",
          publishedAt: isEditing ? initialValues.publishedAt : new Date().toISOString().split("T")[0],
          image: selectedFile,
        };
        onSubmit(formData); // Ensure correct data is passed
        resetForm();
        setSelectedFile(null);
      }}
      enableReinitialize // Reinitialize form when initialValues change
    >
      {({ setFieldValue, values }) => (
        <Form className="flex flex-wrap gap-6 p-6">
          {/* Left Column (Content) */}
          <div className="w-full md:w-[65%] space-y-4">
            {/* Title Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Title</label>
              <Field
                name="title"
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter blog title"
              />
              <ErrorMessage name="title" component="p" className="text-red-500" />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Category</label>
              <Field as="select" name="category" className="w-full px-4 py-2 border rounded-md bg-white">
                <option value="">Select Category</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Web Development">Web Development</option>
                <option value="App Development">App Development</option>
              </Field>
              <ErrorMessage name="category" component="p" className="text-red-500" />
            </div>

            {/* Blog Description (Rich Text Editor) */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Description</label>
              <div className="p-2 min-h-[200px]">
                <QuillEditor
                  value={values.description || ""}
                  onChange={(content) => setFieldValue("description", content)}
                />
              </div>
              <ErrorMessage name="description" component="p" className="text-red-500" />
            </div>
          </div>

          {/* Right Column (Image Upload) */}
          <div className="h-full md:w-[30%] flex justify-center py-6">
            <div
              className="flex flex-col justify-center items-center px-4 border-2 border-dashed rounded-xl border-[#CBCBCB] h-40 cursor-pointer"
              onClick={handleFileClick}
            >
              <Image src={"/CreateBlog/upload.png"} width={74} height={80} alt="Upload Icon" />
              <p className="text-lg">
                Drag and drop an image, <span className="text-blue-600"> or Browse</span>
              </p>
              <p className="text-sm">Minimum 1200px width recommended.</p>
              <input
                ref={fileInputRef}
                id="fileInput"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              {selectedFile && <p className="text-sm text-green-600 mt-2">{selectedFile.name}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full absolute top-6 right-4 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-red text-white rounded-md hover:bg-blue-700 transition"
            >
              {isEditing ? "Save Changes" : "Publish"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}