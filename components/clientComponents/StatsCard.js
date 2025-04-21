import React from "react";

export default function StatsCard({ title, value, image, icon, link, isActive }) {
  return (
    <div className="bg-white p-6 rounded-lg flex justify-between items-center">
      <div>
        <h3 className="text-black text-lg mb-3">{title}</h3>
        <p className={`text-2xl font-semibold ${isActive ? "text-green-600" : "text-black"}`}>
          {value}
        </p>
      </div>
      
      <div className="flex flex-col items-center">
        {/* Show Image if provided, otherwise show icon */}
        {image ? (
          <img src={image} alt={title} className="w-12 h-12 object-cover rounded-lg" />
        ) : (
          <div className="w-12 h-12 flex items-center justify-center rounded-lg p-2">
            {icon}
          </div>
        )}

        {/* View Link under Image/Icon */}
        {link && (
          <a href={link} className="text-green-600 text-sm flex items-center space-x-2 mt-4">
            <span>↗</span> <span>{isActive ? "View" : "See More"}</span>
          </a>
        )}
      </div>
    </div>
  );
}
