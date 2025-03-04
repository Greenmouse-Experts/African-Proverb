import React, { useState } from "react";

const RegisterDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (accountType) => {
    setIsOpen(false);
    alert(`You selected ${accountType}`);
  };

  return (
    <div className="relative inline-block">
      <div
        className="flex items-center justify-between text-white text-sm bg-[#BB5D06] font-bold cursor-pointer text-md p-3 px-4 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Register</span>
        <span
          className={`ml-2 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </div>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <p
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelect("Individual Account")}
          >
            Individual Account
          </p>
          <p
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelect("Corporate Account")}
          >
            Corporate Account
          </p>
        </div>
      )}
    </div>
  );
};

export default RegisterDropdown;
