import React, { useState } from "react";

export default function Modal({ onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    year: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Student:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-lg font-semibold mb-4">Manually Add Student</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="w-full border p-2 rounded mb-2" required />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="w-full border p-2 rounded mb-2" required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded mb-2" required />
          <input type="text" name="year" placeholder="Year of Graduation" value={formData.year} onChange={handleChange} className="w-full border p-2 rounded mb-4" required />

          <div className="flex justify-between">
            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="bg-yellow-700 text-white px-4 py-2 rounded">
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
