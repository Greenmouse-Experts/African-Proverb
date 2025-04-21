import React from "react";

export default function BarChart({ title, labels, data, link }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-[#eee]">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-gray-600 font-semibold">{title}</h3>
        {link && <a href={link} className="text-green-600 text-sm">➤ See More</a>}
      </div>
      <div className="flex justify-between items-end h-88">
        {data.map((value, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="w-2 bg-[#5DB6DC] rounded transition-all"
              style={{ height: `${value * 4}px` }}
            ></div>
            <span className="text-xs mt-1">{labels[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
