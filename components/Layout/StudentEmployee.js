import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';

const students = [
  { id: 1, idNumber: '00129834', name: 'John Doe', email: 'Jo@gmail.com', phone: '+234 901 9647 345' },
  { id: 2, idNumber: '00129834', name: 'John Doe', email: 'Jo@gmail.com', phone: '+234 901 9647 345' },
  { id: 3, idNumber: '00129834', name: 'John Doe', email: 'Jo@gmail.com', phone: '+234 901 9647 345' },
  { id: 4, idNumber: '00129834', name: 'John Doe', email: 'Jo@gmail.com', phone: '+234 901 9647 345' },
  { id: 5, idNumber: '00129834', name: 'John Doe', email: 'Jo@gmail.com', phone: '+234 901 9647 345' },
];

function StudentEmployee() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleView = (id) => {
    alert(`View student with ID: ${id}`);
  };

  const handleEdit = (id) => {
    alert(`Edit student with ID: ${id}`);
  };

  return (
    <div className="">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-[#BB5D06]">Student/ Employee</h2>
        <p className="text-gray-500 text-sm">Manage your Student/ Employees</p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <nav className="text-sm text-gray-600">
          <span className="mr-2">🏠 / Dashboard / Employee</span>
        </nav>
        <button className="flex items-center bg-[#BB5D06] text-white px-4 py-2 rounded">
          Add <span className="ml-2 font-bold">+</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded-md">
          <thead className="bg-[#BB5D06] text-white">
            <tr>
              <th className="p-5 text-base text-left">S/N</th>
              <th className="p-5 text-base text-left">ID Number</th>
              <th className="p-5 text-base text-left">Name</th>
              <th className="p-5 text-base text-left">Email</th>
              <th className="p-5 text-base text-left">Phone Number</th>
              <th className="p-5 text-base text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id} className="border-b">
                <td className="p-4 text-sm">{index + 1}</td>
                <td className="p-4 text-sm">{student.idNumber}</td>
                <td className="p-4 text-sm">{student.name}</td>
                <td className="p-4 text-sm">{student.email}</td>
                <td className="p-4 text-sm">{student.phone}</td>
                <td className="p-4 text-sm relative">
                  <button onClick={() => toggleDropdown(student.id)} className="p-2">
                    <FaEllipsisV />
                  </button>

                  {openDropdown === student.id && (
                    <div className="absolute right-0 top-10 bg-white shadow-md border rounded-md z-10 w-40">
                      <button onClick={() => handleView(student.id)} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">View Student</button>
                      <button onClick={() => handleEdit(student.id)} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Edit Student</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Cards */}
      <div className="block md:hidden">
        {students.map((student) => (
          <div key={student.id} className="bg-white shadow rounded-md p-3 mb-3 relative">
            <div className="flex justify-between">
              <span className="text-sm font-bold">ID: {student.idNumber}</span>
              <button onClick={() => toggleDropdown(student.id)} className="text-gray-500">
                <FaEllipsisV />
              </button>
            </div>
            <p className="text-sm">Name: {student.name}</p>
            <p className="text-sm">Email: {student.email}</p>
            <p className="text-sm">Phone: {student.phone}</p>

            {openDropdown === student.id && (
              <div className="absolute right-3 top-10 bg-white shadow-md border rounded-md z-10 w-40">
                <button onClick={() => handleView(student.id)} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">View Student</button>
                <button onClick={() => handleEdit(student.id)} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Edit Student</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentEmployee;
