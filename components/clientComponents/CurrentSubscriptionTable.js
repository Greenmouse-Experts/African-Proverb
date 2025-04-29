import { useState } from "react";

const allTableData = Array.from({ length: 50 }, (_, i) => ({
    planType: "5 Languages",
    activationDate: "11-02-2024",
    allowedUserCount: "500,000",
    expiryDate: "12-01-2025",
    status: i === 0 ? "Active" : "Expired",
}));

export default function CurrentSubscriptionTable({ filters }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [students, setStudents] = useState(allTableData.slice(0, 10));

    const filteredData = allTableData.filter((data) => {
        const matchesPlanType = filters.planType ? data.planType === filters.planType : true;
        const matchesState = filters.state ? data.status === filters.state : true;
        return matchesPlanType && matchesState;
    });

    const handleNextPage = () => {
        const nextPage = currentPage + 1;
        const start = nextPage * 10;
        const end = start + 10;
        if (start < filteredData.length) {
            setStudents(filteredData.slice(start, end));
            setCurrentPage(nextPage);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            const prevPage = currentPage - 1;
            const start = prevPage * 10;
            setStudents(filteredData.slice(start, start + 10));
            setCurrentPage(prevPage);
        }
    };

    return (
        <>
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Current Subscription Plan</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-center">
                        <thead>
                            <tr className="bg-[#F1F4F9] text-base">
                                <th className="px-4 py-5">Plan Type</th>
                                <th className="px-4 py-5">Activation Date</th>
                                <th className="px-4 py-5">Allowed User Count</th>
                                <th className="px-4 py-5">Expiry Date</th>
                                <th className="px-4 py-5">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((data, index) => (
                                <tr key={index} className="border-t border-gray-200 text-sm">
                                    <td className="px-4 py-5">{data.planType}</td>
                                    <td className="px-4 py-5">{data.activationDate}</td>
                                    <td className="px-4 py-5">{data.allowedUserCount}</td>
                                    <td className="px-4 py-5">{data.expiryDate}</td>
                                    <td className="px-4 py-5">
                                        <span className={`px-2 py-1 rounded ${data.status === 'Active' ? 'bg-green-200 text-green-600' : 'bg-gray-200 text-gray-600'}`}>
                                            {data.status}
                                        </span>
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
                    Fetch Previous 10
                </button>
                <button
                    className="px-4 py-2 bg-[#BB5D06] text-white rounded"
                    disabled={(currentPage + 1) * 10 >= filteredData.length}
                    onClick={handleNextPage}
                >
                    Fetch Next 10
                </button>
            </div>
        </>
    );
}
