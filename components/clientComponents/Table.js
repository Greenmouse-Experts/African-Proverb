import React, { useState } from "react";

export default function Table({ columns, data, title, seeAllLink, onActionClick }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 md:mb-0">{title}</h2>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="border px-3 py-2 rounded text-sm outline-none border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {seeAllLink && (
            <a
              href={seeAllLink}
              className="text-gray-500 text-sm border px-3 py-2 border-gray-300 rounded"
            >
              See All
            </a>
          )}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
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
                <tr key={rowIndex} className="border-t border-gray-200">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-4 text-gray-700 text-sm">
                      {col.key === "action" ? (
                        <button
                          className="px-3 py-1 border border-gray-300 text-gray-700 rounded text-sm"
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

      {/* Mobile View */}
      <div className="block md:hidden space-y-4">
        {filteredData.length > 0 ? (
          filteredData.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
            >
              {columns.map((col) => (
                <div key={col.key} className="mb-2">
                  <div className="text-gray-500 text-xs uppercase font-semibold tracking-wide mb-2">
                    {col.label}
                  </div>
                  <div className="text-gray-800 text-sm">
                    {col.key === "action" ? (
                      <button
                        className="mt-1 px-3 py-1 border border-gray-300 text-gray-700 rounded text-sm"
                        onClick={() => onActionClick(row)}
                      >
                        {row[col.key]}
                      </button>
                    ) : (
                      row[col.key]
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-6">No results found.</div>
        )}
      </div>
    </div>
  );
}
