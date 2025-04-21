import React, { useState } from "react";

export default function Table({ columns, data, title, seeAllLink, onActionClick }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search input
  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-black mb-4">{title}</h2>

        <div className="flex items-center space-x-2 mt-2 md:mt-0">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search..."
            className="border px-3 py-2 rounded text-sm outline-none border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* See All Button */}
          {seeAllLink && (
            <a href={seeAllLink} className="text-gray-500 text-sm border px-3 py-2 border-gray-300 rounded">
              See All
            </a>
          )}
        </div>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-4 text-gray-600 text-base">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t border-gray-300">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-4 text-gray-700 text-base">
                      {col.key === "action" ? (
                        <button
                          className="px-3 py-1 border border-gray-300 text-gray-700 rounded text-base"
                          onClick={() => onActionClick(row)}
                        >
                          {row[col.key]}
                        </button>
                      ) : (
                        row[col.key]
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-5 text-gray-500">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
