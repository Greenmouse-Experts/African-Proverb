import { useState } from "react";

const allBillingData = Array.from({ length: 50 }, (_, i) => ({
    invoice: `5 Languages, paid, 01-07-2023 - 05-02-2024`,
    paymentMethod: "Paypal",
}));

export default function BillingHistoryTable({ filters }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [billingData, setBillingData] = useState(allBillingData.slice(0, 10));

    const filteredData = allBillingData.filter((data) => {
        const matchesPlanType = filters.planType ? data.invoice.includes(filters.planType) : true;
        const matchesState = filters.state ? data.paymentMethod === filters.state : true;
        return matchesPlanType && matchesState;
    });

    const handleNextPage = () => {
        const nextPage = currentPage + 1;
        const start = nextPage * 10;
        const end = start + 10;
        if (start < filteredData.length) {
            setBillingData(filteredData.slice(start, end));
            setCurrentPage(nextPage);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            const prevPage = currentPage - 1;
            const start = prevPage * 10;
            setBillingData(filteredData.slice(start, start + 10));
            setCurrentPage(prevPage);
        }
    };

    return (
        <>
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Billing History</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-center">
                        <thead>
                            <tr className="bg-[#F1F4F9] text-base">
                                <th className="px-4 py-5">Invoices</th>
                                <th className="px-4 py-5">Payment Method</th>
                            </tr>
                        </thead>
                        <tbody>
                            {billingData.map((data, index) => (
                                <tr key={index} className="border-t border-gray-200 text-sm">
                                    <td className="px-4 py-5 text-[#033D77] cursor-pointer">
                                        {data.invoice}
                                    </td>
                                    <td className="px-4 py-5">{data.paymentMethod}</td>
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
