"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import QuillEditor from "./QuillEditor";

// Yup Validation Schema
const BlogSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  type: Yup.string().required("Category is required"),
  jobcategory: Yup.string().required("Job Category is required"),
  experience: Yup.string().required("Experience is required"),
  totalpositions: Yup.string().required("Total Positions is required"),
  location: Yup.string().required("Location is required"),
  description: Yup.string().required("Description is required"),
});

const JobForm = ({ initialValues, onSubmit, isEditing }) => {
  return (
    <Formik
      initialValues={initialValues || { title: "", type: "", jobcategory: "", experience: "", totalpositions: "", location: "", description: "" }}
      validationSchema={BlogSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values); // Call the onSubmit function passed from the parent
        resetForm();
      }}
      enableReinitialize // Reinitialize form when initialValues change
    >
      {({ setFieldValue, values }) => (
        <Form className="p-6">
          {/* Left Column (70%) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title Field */}
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-1">Title</label>
              <Field
                name="title"
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Title Here"
              />
              <ErrorMessage name="title" component="p" className="text-red-500" />
            </div>

            {/* Job Category Dropdown */}
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-1">Job Category</label>
              <Field
                as="select"
                name="jobcategory"
                className="w-full px-4 py-2 h-10 border rounded-md bg-white"
              >
                <option value="">Select Category</option>
                <option value="tech">IT</option>
                <option value="business">AI</option>
                <option value="lifestyle">Mobile Dev</option>
              </Field>
              <ErrorMessage name="jobcategory" component="p" className="text-red-500" />
            </div>

            {/* Job Type Dropdown */}
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-1">Job Type</label>
              <Field
                as="select"
                name="type"
                className="w-full px-4 py-2 h-10 border rounded-md bg-white"
              >
                <option value="">Select Type</option>
                <option value="Full">Full Time</option>
                <option value="part">Part Time</option>
              </Field>
              <ErrorMessage name="type" component="p" className="text-red-500" />
            </div>

            {/* Experience */}
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-1">Experience</label>
              <Field
                name="experience"
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="0-1 Years"
              />
              <ErrorMessage name="experience" component="p" className="text-red-500" />
            </div>

            {/* Total Positions */}
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-1">Total Postion</label>
              <Field
                name="totalpositions"
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="1"
              />
              <ErrorMessage name="totalpositions" component="p" className="text-red-500" />
            </div>

            {/* Location */}
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-1">Location</label>
              <Field
                name="location"
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Rawalpindi"
              />
              <ErrorMessage name="location" component="p" className="text-red-500" />
            </div>
          </div>

          {/* Blog Description (Rich Text Editor) */}
          <div className="py-2">
            <label className="block text-gray-700 font-medium px-2 -mb-3 text-lg">Description</label>
            <div className="p-2 min-h-[200px]">
              <QuillEditor
                value={values.description}
                onChange={(content) => setFieldValue("description", content)}
              />
            </div>
            <ErrorMessage name="description" component="p" className="text-red-500" />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-red absolute top-5 text-white rounded-md hover:bg-blue-700 transition"
            >
              {isEditing ? "Save Changes" : "Create Job"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default JobForm;