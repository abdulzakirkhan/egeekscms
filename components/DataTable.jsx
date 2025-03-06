"use client"
import Image from "next/image"

export default function DataTable({ 
  columns, 
  data, 
  currentPage, 
  totalPages, 
  onPageChange,
  onEdit,
  onDelete
}) {
  return (
    <>
      <div className="overflow-x-auto border-2 bg-white shadow-lg rounded-lg my-8">
        <table className="w-full border-slate-500">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              {columns.map((col) => (
                <th key={col.key} className="p-3 text-left">{col.header}</th>
              ))}
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.key} className="p-3">
                    {col.render ? col.render(item) : item[col.key]}
                  </td>
                ))}
                <td className="p-3 text-center relative">
                  {/* Action dropdown implementation */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}