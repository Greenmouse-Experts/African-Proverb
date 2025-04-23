export default function SubscriptionReport({ selectedPeriod }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Subscription Report</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex justify-between items-center">
                    <span>Total Registered Students</span>
                    <span className="font-semibold">50,000</span>
                </div>
                <div className="flex justify-between items-center">
                    <span>Active Students</span>
                    <span className="font-semibold">345</span>
                </div>
                <div className="flex justify-between items-center">
                    <span>Inactive Students</span>
                    <span className="font-semibold">300</span>
                </div>
            </div>

            {/* Dropdown */}
            <div className="mt-4">
                <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="p-2 border rounded-lg"
                >
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>This Year</option>
                </select>
            </div>
        </div>
    );
}
