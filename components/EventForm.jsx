"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import QuillEditor from "./QuillEditor";
import Image from "next/image";

// Yup Validation Schema
const BlogSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

const EventForm = ({ initialValues, onSubmit, isEditing }) => {
  const [selectedFile, setSelectedFile] = useState(initialValues?.image || null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <Formik
      initialValues={initialValues || { title: "", description: "" }}
      validationSchema={BlogSchema}
      onSubmit={(values, { resetForm }) => {
        const formData = { ...values, image: selectedFile }; // Include the selected file in the form data
        onSubmit(formData); // Call the onSubmit function passed from the parent
        resetForm();
        setSelectedFile(null); // Reset the file input
      }}
      enableReinitialize // Reinitialize form when initialValues change
    >
      {({ setFieldValue, values }) => (
        <Form className="flex flex-wrap gap-6 p-6">
          {/* Left Column (70%) */}
          <div className="w-full md:w-[65%] space-y-4">
            {/* Title Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Title</label>
              <Field
                name="title"
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Title Here"
              />
              <ErrorMessage name="title" component="p" className="text-red-500" />
            </div>

            {/* Blog Description (Rich Text Editor) */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Description</label>
              <div className="p-2 min-h-[200px]">
                <QuillEditor
                  value={values.description}
                  onChange={(content) => setFieldValue("description", content)}
                />
              </div>
              <ErrorMessage name="description" component="p" className="text-red-500" />
            </div>
          </div>

          {/* Right Column (30%) */}
          <div className="h-full md:w-[30%] flex justify-center py-6">
            <div
              className="flex flex-col justify-center items-center px-4 border-2 border-dashed rounded-xl border-[#CBCBCB] h-40 cursor-pointer"
              onClick={() => document.getElementById("fileInput").click()}
            >
              <Image src={"/CreateBlog/upload.png"} width={74} height={80} alt="" />
              <p className="text-lg">Drag and drop an image, <span className="text-blue-600"> or Browse</span> </p>
              <p className="text-sm">Minimum 1200px width recommended. </p>
              <input
                id="fileInput"
                type="file"
                className="absolute opacity-0"
                onChange={handleFileChange}
              />
              {selectedFile && <p className="text-sm text-green-600 mt-2">{selectedFile.name}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {isEditing ? "Save Changes" : "Create Event"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EventForm;