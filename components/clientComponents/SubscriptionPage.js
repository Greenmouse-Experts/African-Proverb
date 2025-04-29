import { useState } from "react";
import CurrentSubscriptionTable from "./CurrentSubscriptionTable";
import BillingHistoryTable from "./BillingHistoryTable";

export default function SubscriptionPage() {
    const [activeTab, setActiveTab] = useState('current-plan');
    const [filterOptions, setFilterOptions] = useState({
        planType: '',
        state: ''
    });

    const handleFilterChange = (e) => {
        setFilterOptions({
            ...filterOptions,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="space-y-6">
            {/* Tab navigation */}
            <div className="bg-white p-6 rounded-lg">
                <div className="flex border-b">
                    <button
                        onClick={() => setActiveTab('current-plan')}
                        className={`py-2 px-6 ${activeTab === 'current-plan' ? 'border-b-2 border-[#BB5D06] text-[#BB5D06]' : 'text-gray-500'}`}
                    >
                        Current Subscription Plan
                    </button>
                    <button
                        onClick={() => setActiveTab('billing-history')}
                        className={`py-2 px-6 ${activeTab === 'billing-history' ? 'border-b-2 border-[#BB5D06] text-[#BB5D06]' : 'text-gray-500'}`}
                    >
                        Billing History
                    </button>
                </div>
            </div>

            {/* Filter Section */}
            <div className="bg-white p-6 rounded-lg">
                <div className="flex space-x-6">
                    <div className="flex space-x-4">
                        <select
                            name="planType"
                            value={filterOptions.planType}
                            onChange={handleFilterChange}
                            className="border border-gray-300 px-3 py-3 outline-none rounded"
                        >
                            <option value="">Plan Type</option>
                            <option value="5 Languages">5 Languages</option>
                            <option value="10 Languages">10 Languages</option>
                        </select>
                        <select
                            name="state"
                            value={filterOptions.state}
                            onChange={handleFilterChange}
                            className="border border-gray-300 px-3 outline-none py-3 rounded"
                        >
                            <option value="">State</option>
                            <option value="Active">Active</option>
                            <option value="Expired">Expired</option>
                        </select>
                        <button
                            className="bg-[#BB5D06] text-white px-4 outline-none py-2 rounded"
                            onClick={() => {
                                
                            }}
                        >
                            Filter
                        </button>
                    </div>
                </div>
            </div>

            {/* Conditional Rendering Based on Active Tab */}
            {activeTab === 'current-plan' ? <CurrentSubscriptionTable filters={filterOptions} /> : <BillingHistoryTable filters={filterOptions} />}
        </div>
    );
}
