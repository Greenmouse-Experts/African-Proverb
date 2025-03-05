import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
    { month: 'Jan', suggested: 5, approved: 2 },
    { month: 'Feb', suggested: 15, approved: 10 },
    { month: 'Mar', suggested: 25, approved: 20 },
    { month: 'Apr', suggested: 35, approved: 30 },
    { month: 'May', suggested: 45, approved: 35 },
    { month: 'Jun', suggested: 40, approved: 33 },
    { month: 'Jul', suggested: 35, approved: 30 },
    { month: 'Aug', suggested: 30, approved: 25 },
    { month: 'Sept', suggested: 20, approved: 18 },
    { month: 'Oct', suggested: 15, approved: 12 },
    { month: 'Nov', suggested: 10, approved: 5 },
    { month: 'Dec', suggested: 5, approved: 3 },
];


function Dashboard() {
    return (
        <div className="min-h-screen w-full">
            {/* Breadcrumb */}
            <div className="text-lg text-[#BB5D06] flex items-center space-x-2 mb-6">
                <span className="text-xl">🏠</span>
                <span>/ Dashboard</span>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Total Staff */}
                <div className="bg-[#BB5D06] text-white p-8 rounded-md flex flex-col justify-between">
                    <div className="font-semibold">Total Staff</div>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-2xl font-bold">20</span>
                        <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1741163211/entypo_users_cqinpw.png" alt="Staff Icon" className="w-14 h-14 -mt-10" />
                    </div>
                </div>

                {/* Total Suggested Proverbs */}
                <div className="bg-white border border-[#BB5D06] p-8 rounded-md flex flex-col justify-between">
                    <div className="font-semibold">Total Suggested Proverbs</div>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-2xl font-bold">21</span>
                        <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1741163211/bi_chat-quote-fill_alsyer.png" alt="Staff Icon" className="w-14 h-14 -mt-10" />
                    </div>
                </div>

                {/* Total Approved Proverbs */}
                <div className="bg-[#BB5D06] text-white p-8 rounded-md flex flex-col justify-between">
                    <div className="font-semibold">Total Approved Proverbs</div>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-2xl font-bold">10</span>

                        <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1741163211/material-symbols_order-approve_ewipnz.png" alt="Staff Icon" className="w-14 h-14 -mt-10" />
                    </div>
                </div>
            </div>

            {/* Proverb Analysis Chart */}
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                <div className=" bg-[#BB5D06] text-white py-8 px-4 font-semibold">Proverb Analysis</div>
                <div className="p-4">
                    <ResponsiveContainer width="100%" height={500}>
                        <LineChart data={data}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="suggested" stroke="#666" strokeWidth={2} />
                            <Line type="monotone" dataKey="approved" stroke="#a56929" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                    <div className="flex items-center text-center space-x-4 mt-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gray-400"></div>
                            <span className="text-sm">Suggested Proverbs</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-[#a56929]"></div>
                            <span className="text-sm">Approved Proverbs</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
