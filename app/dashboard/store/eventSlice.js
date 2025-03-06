import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [
    { id: 1, title: "Lorem ipsum dolor sit amet conshjetur",description:"hi this is job description", category: "Artfical Intelligence", editedBy: "Admin", status: "Published", publishedAt: "10/02/2025 | 8:23 pm" },
    { id: 2, title: "Lorem ipsum dolor sit amet conshjetur",description:"hi this is job description", category: "Artfical Intelligence", editedBy: "John Doe", status: "Published", publishedAt: "10/02/2025 | 8:23 pm" },
    { id: 3, title: "Lorem ipsum dolor sit amet conshjetur",description:"hi this is job description", category: "Web Development", editedBy: "Jane Doe", status: "Published", publishedAt: "10/02/2025 | 8:23 pm" },
    { id: 4, title: "Lorem ipsum dolor sit amet conshjetur",description:"hi this is job description", category: "Web Development", editedBy: "Jane Doe", status: "Published", publishedAt: "10/02/2025 | 8:23 pm" },
    { id: 5, title: "Lorem ipsum dolor sit amet conshjetur",description:"hi this is job description", category: "Web Development", editedBy: "Jane Doe", status: "Published", publishedAt: "10/02/2025 | 8:23 pm" },
    { id: 6, title: "Lorem ipsum dolor sit amet conshjetur",description:"hi this is job description", category: "App Development", editedBy: "Jane Doe", status: "Draft", publishedAt: "10/02/2025 | 8:23 pm" },
    { id: 7, title: "Lorem ipsum dolor sit amet conshjetur",description:"hi this is job description", category: "App Development", editedBy: "Jane Doe", status: "Published", publishedAt: "10/02/2025 | 8:23 pm" },
    { id: 8, title: "Lorem ipsum dolor sit amet conshjetur",description:"hi this is job description", category: "App Development", editedBy: "Jane Doe", status: "Published", publishedAt: "10/02/2025 | 8:23 pm" },
    { id: 9, title: "Lorem ipsum dolor sit amet conshjetur",description:"hi this is job description", category: "App Development", editedBy: "Jane Doe", status: "Published", publishedAt: "10/02/2025 | 8:23 pm" },
    { id: 10, title: "Lorem ipsum dolor sit amet conshjetur",description:"hi this is job description", category: "Artifical Intelligence", editedBy: "Jane Doe", status: "Draft", publishedAt: "10/02/2025 | 8:23 pm" },
  ],
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.blogs.push(action.payload);
    },
    updateEvent: (state, action) => {
      const index = state.blogs.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.blogs[index] = action.payload;
      }
    },
    deleteEvent: (state, action) => {
      state.blogs = state.blogs.filter((b) => b.id !== action.payload);
    },
  },
});

export const { addEvent, updateEvent, deleteEvent } = eventSlice.actions;
export default eventSlice.reducer;
