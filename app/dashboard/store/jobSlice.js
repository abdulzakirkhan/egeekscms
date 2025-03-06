import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [
    { id: 1, title: "Junior UI/UX Designer",description:"hi this is job description",experience:"1-2 Years",category:"Full",location:"Rawalpindi",totalpositions:"1", jobcategory: "IT", type:"Full Time", editedBy: "Admin", status: "Published", publishedAt: "10/02/2025 | 8:23 pm",deadline:"10/02/2025 | 8:23 pm" },
    { id: 2, title: "Senior Laravel Developer",description:"hi this is job description",experience:"1-2 Years",category:"Full",location:"Rawalpindi",totalpositions:"1", jobcategory: "IT", type:"Full Time", editedBy: "John Doe", status: "Published", publishedAt: "10/02/2025 | 8:23 pm",deadline:"10/02/2025 | 8:23 pm" },
    { id: 3, title: "Freelance Academic Writer",description:"hi this is job description",experience:"1-2 Years",category:"Full",location:"Rawalpindi",totalpositions:"1", jobcategory: "LG", type:"Part Time", editedBy: "Jane Doe", status: "Published", publishedAt: "10/02/2025 | 8:23 pm",deadline:"10/02/2025 | 8:23 pm" },
    { id: 4, title: "International Sales Execu...",description:"hi this is job description",experience:"1-2 Years",category:"Full",location:"Rawalpindi",totalpositions:"1", jobcategory: "Sales", type:"Full Time", editedBy: "Jane Doe", status: "Published", publishedAt: "10/02/2025 | 8:23 pm",deadline:"10/02/2025 | 8:23 pm" },
    { id: 5, title: "International Sales Execu...",description:"hi this is job description",experience:"1-2 Years",category:"Full",location:"Rawalpindi",totalpositions:"1", jobcategory: "Sales", type:"Full Time", editedBy: "Jane Doe", status: "Published", publishedAt: "10/02/2025 | 8:23 pm",deadline:"10/02/2025 | 8:23 pm" },
    { id: 6, title: "Sales Coordinator  Execu...",description:"hi this is job description",experience:"1-2 Years",category:"Full",location:"Rawalpindi",totalpositions:"1", jobcategory: "Sales", type:"Full Time", editedBy: "Jane Doe", status: "Published", publishedAt: "10/02/2025 | 8:23 pm" ,deadline:"10/02/2025 | 8:23 pm"},
    { id: 7, title: "Sales Coordinator  Execu...",description:"hi this is job description",experience:"1-2 Years",category:"Full",location:"Rawalpindi",totalpositions:"1", jobcategory: "Sales", type:"Full Time", editedBy: "Jane Doe", status: "Published", publishedAt: "10/02/2025 | 8:23 pm",deadline:"10/02/2025 | 8:23 pm" },
    { id: 8, title: "Mid-level React Developer",description:"hi this is job description",experience:"1-2 Years",category:"Full",location:"Rawalpindi",totalpositions:"1", jobcategory: "IT", type:"Full Time", editedBy: "Jane Doe", status: "Draft", publishedAt: "10/02/2025 | 8:23 pm",deadline:"10/02/2025 | 8:23 pm" },
    { id: 9, title: "Mid-level React Developer",description:"hi this is job description",experience:"1-2 Years",category:"Full",location:"Rawalpindi",totalpositions:"1", jobcategory: "IT", type:"Full Time", editedBy: "Jane Doe", status: "Draft", publishedAt: "10/02/2025 | 8:23 pm",deadline:"10/02/2025 | 8:23 pm" },
    { id: 10, title: "Mid-level React Developer",description:"hi this is job description",experience:"1-2 Years",category:"Full",location:"Rawalpindi",totalpositions:"1", jobcategory: "IT", type:"Full Time", editedBy: "Jane Doe", status: "Draft", publishedAt: "10/02/2025 | 8:23 pm" ,deadline:"10/02/2025 | 8:23 pm"},
    { id: 11, title: "Freelance Academic Writer",description:"hi this is job description",experience:"1-2 Years",category:"Full",location:"Rawalpindi",totalpositions:"1", jobcategory: "LG", type:"Part Time", editedBy: "Jane Doe", status: "Draft", publishedAt: "10/02/2025 | 8:23 pm" ,deadline:"10/02/2025 | 8:23 pm"},
  ],
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    addJob: (state, action) => {
      state.jobs.push(action.payload);
    },
    updateJob: (state, action) => {
      const index = state.jobs.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.jobs[index] = action.payload;
      }
    },
    deleteJob: (state, action) => {
      state.jobs = state.jobs.filter((b) => b.id !== action.payload);
    },
  },
});

export const { addJob, updateJob, deleteJob } = jobSlice.actions;
export default jobSlice.reducer;
