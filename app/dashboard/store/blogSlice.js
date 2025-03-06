import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [
    { id: 1, title: "Lorem ipsum dolor sit amet conshjetur", description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, asperiores?", category: "Artfical Intelligence", editedBy: "Admin", status: "Published", publishedAt: "10/02/2025 | 8:23 pm" },
    { id: 2, title: "Lorem ipsum dolor sit amet conshjetur", description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, asperiores?", category: "Artfical Intelligence", editedBy: "John Doe", status: "Published", publishedAt: "10/02/2025 | 8:23 pm" },
    { id: 3, title: "Lorem ipsum dolor sit amet conshjetur", description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, asperiores?", category: "Web Development", editedBy: "Jane Doe", status: "Published", publishedAt: "10/02/2025 | 8:23 pm" },
    { id: 4, title: "Lorem ipsum dolor sit amet conshjetur", description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, asperiores?", category: "Web Development", editedBy: "Jane Doe", status: "Published", publishedAt: "10/02/2025 | 8:23 pm" },
    { id: 5, title: "Lorem ipsum dolor sit amet conshjetur", description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, asperiores?", category: "Web Development", editedBy: "Jane Doe", status: "Published", publishedAt: "10/02/2025 | 8:23 pm" },
    { id: 6, title: "Lorem ipsum dolor sit amet conshjetur", description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, asperiores?", category: "App Development", editedBy: "Jane Doe", status: "Draft", publishedAt: "10/02/2025 | 8:23 pm" },
    { id: 7, title: "Lorem ipsum dolor sit amet conshjetur", description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, asperiores?", category: "App Development", editedBy: "Jane Doe", status: "Published", publishedAt: "10/02/2025 | 8:23 pm" },
    { id: 8, title: "Lorem ipsum dolor sit amet conshjetur", description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, asperiores?", category: "App Development", editedBy: "Jane Doe", status: "Published", publishedAt: "10/02/2025 | 8:23 pm" },
    { id: 9, title: "Lorem ipsum dolor sit amet conshjetur", description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, asperiores?", category: "App Development", editedBy: "Jane Doe", status: "Published", publishedAt: "10/02/2025 | 8:23 pm" },
    { id: 10, title: "Lorem ipsum dolor sit amet conshjetur", description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, asperiores?", category: "Artifical Intelligence", editedBy: "Jane Doe", status: "Draft", publishedAt: "10/02/2025 | 8:23 pm" },
  ],
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addBlog: (state, action) => {
      state.blogs.push(action.payload);
    },
    updateBlog: (state, action) => {
      const index = state.blogs.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.blogs[index] = action.payload;
      }
    },
    deleteBlog: (state, action) => {
      state.blogs = state.blogs.filter((b) => b.id !== action.payload);
    },
  },
});

export const { addBlog, updateBlog, deleteBlog } = blogSlice.actions;
export default blogSlice.reducer;
