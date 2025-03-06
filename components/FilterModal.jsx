"use client"
export default function FilterModal({ show, onClose }) {
  if (!show) return null;

  return (
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
        <button className="px-4 py-2 bg-red text-white rounded-lg hover:bg-red-600">
          Apply
        </button>
      </div>
    </div>
  )
}