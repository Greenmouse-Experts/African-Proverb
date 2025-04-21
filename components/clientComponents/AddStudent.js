'use client';

import React, { useState } from 'react';

export default function AddStudentPage() {
    const allStudents = Array.from({ length: 50 }, (_, i) => ({
        firstName: "Olabangi",
        lastName: "Alade",
        email: "Alade@uni.lag.ng",
        year: 2026,
    }));

    const [students, setStudents] = useState(allStudents.slice(0, 10));
    const [currentPage, setCurrentPage] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const handleNextPage = () => {
        const nextPage = currentPage + 1;
        const start = nextPage * 10;
        const end = start + 10;
        if (start < allStudents.length) {
            setStudents(allStudents.slice(start, end));
            setCurrentPage(nextPage);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            const prevPage = currentPage - 1;
            const start = prevPage * 10;
            setStudents(allStudents.slice(start, start + 10));
            setCurrentPage(prevPage);
        }
    };

    return (
        <div>
            {/* Filter Section */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-6 bg-white p-6 rounded-lg">
                    <select className="border border-gray-300 px-3 py-2 outline-none rounded">
                        <option>Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                    <select className="border border-gray-300 px-3 py-2 outline-none rounded">
                        <option>Graduated Status</option>
                        <option>Graduated</option>
                        <option>Not Graduated</option>
                    </select>
                    <select className="border border-gray-300 px-3 py-2 outline-none rounded">
                        <option>Graduated Year</option>
                        <option>2025</option>
                        <option>2024</option>
                        <option>2023</option>
                    </select>
                    <button className="bg-[#BB5D06] text-white px-6 py-2 rounded">Filter</button>
                </div>
                <button
                    className="bg-[#BB5D06] text-white px-4 py-2 rounded"
                    onClick={() => setShowModal(true)}
                >
                    + Manually Add Students
                </button>
            </div>

            {/* Student Table */}
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">All Students</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-[#F1F4F9] text-left">
                                <th className="px-4 py-4">First Name</th>
                                <th className="px-4 py-4">Last Name</th>
                                <th className="px-4 py-4">Email</th>
                                <th className="px-4 py-4">Year of Graduation</th>
                                <th className="px-4 py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={index} className="border-t border-gray-300">
                                    <td className="px-4 py-4">{student.firstName}</td>
                                    <td className="px-4 py-4">{student.lastName}</td>
                                    <td className="px-4 py-4">{student.email}</td>
                                    <td className="px-4 py-4">{student.year}</td>
                                    <td className="px-4 py-4">
                                        <button className="px-3 py-1 border border-gray-300 rounded text-sm">Action ⚙</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-end space-x-3 mt-4">
                <button
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                    disabled={currentPage === 0}
                    onClick={handlePreviousPage}
                >
                    Fetch previous 10
                </button>
                <button
                    className="px-4 py-2 bg-[#BB5D06] text-white rounded"
                    disabled={(currentPage + 1) * 10 >= allStudents.length}
                    onClick={handleNextPage}
                >
                    Fetch Next 10
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded w-[90%] max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Manually Add Student</h2>
                            <button className="bg-[#BB5D06] text-white px-3 py-2 rounded">Bulk CSV Upload</button>
                        </div>
                        <input type="text" placeholder="First Name" className="border px-3 py-4 border-gray-300 w-full mb-4 rounded-md outline-none" />
                        <input type="text" placeholder="Last Name" className="border px-3 py-4 border-gray-300 w-full mb-4 rounded-md outline-none" />
                        <input type="email" placeholder="User school email" className="border px-3 py-4 border-gray-300 w-full mb-4 rounded-md outline-none" />
                        <select className="border px-3 py-4 border-gray-300 w-full mb-4 rounded-md outline-none">
                            <option>Year of Graduation</option>
                            <option>2025</option>
                            <option>2024</option>
                            <option>2023</option>
                        </select>
                        <div className="flex justify-end space-x-2 mt-4">
                            <button className="px-6 py-2 border rounded" onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                            <button className="px-6 py-2 bg-[#BB5D06] text-white rounded">Add Student</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
