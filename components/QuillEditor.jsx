"use client";
import { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css"; // Keep CSS import here

const QuillEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const quillInstance = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isMounted || !editorRef.current) return;

    // Dynamically import Quill on the client side
    import("quill").then((QuillModule) => {
      const Quill = QuillModule.default;
      
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write something amazing...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "blockquote", "code-block"],
            ["clean"],
          ],
        },
      });

      quillInstance.current.on("text-change", () => {
        onChange(quillInstance.current.root.innerHTML);
      });

      // Set initial value
      if (value) {
        quillInstance.current.root.innerHTML = value;
      }
    });

    return () => {
      quillInstance.current = null;
    };
  }, [isMounted]); // Only re-run when mounted

  // Update content when `value` changes
  useEffect(() => {
    if (quillInstance.current && value !== quillInstance.current.root.innerHTML) {
      quillInstance.current.root.innerHTML = value;
    }
  }, [value]);

  return <div ref={editorRef} className="!border-none" />;
};

export default QuillEditor;