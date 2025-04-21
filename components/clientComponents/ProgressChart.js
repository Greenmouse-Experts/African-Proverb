import React from "react";

export default function ProgressChart({ title, data, link }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-[#eee]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-600 font-semibold">{title}</h3>
        {link && <a href={link} className="text-green-600 text-sm">➤ See More</a>}
      </div>
      <div>
        {data.map((item, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between text-base font-medium mb-3">
              <span>{item.label}</span>
              <span>{item.value}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded h-6">
              <div
                className="h-6 rounded"
                style={{ width: `${item.value}%`, backgroundColor: item.color }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
