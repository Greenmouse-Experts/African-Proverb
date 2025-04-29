import { useState } from "react";
import StudentEngagementReport from "./StudentEngagementReport";
import LoginFrequencyGraph from "./LoginFrequencyGraph";
import BarChart from "./BarChart";
import ProgressChart from "./ProgressChart";
import LanguagePreferencesChart from "./PreferencesChart";

export default function AnalyticsPage() {
    const [selectedPeriod] = useState("This Week");

    return (
        <div className="space-y-6">
            <StudentEngagementReport selectedPeriod={selectedPeriod} />
            <LoginFrequencyGraph selectedPeriod={selectedPeriod} />
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-black mb-4">Quiz Performance </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <BarChart
                        title="Average quiz scores"
                        labels={["Temi", "Fumi", "John", "Henry", "Dami", "Alade"]}
                        data={[30, 50, 40, 60, 80, 55]}
                    />
                    <ProgressChart
                        title="Most attempted quizzes"
                        data={[
                            { label: "Teamwork", value: 50, color: "#82C91E" },
                            { label: "PERSEVERANCE", value: 30, color: "#FFB400" },
                            { label: "PEACE", value: 10, color: "#748FFC" },
                            { label: "TIME", value: 8, color: "#5C7CFA" },
                            { label: "EXTOL", value: 2, color: "#E03131" },
                        ]}
                        link="/active-users"
                    />
                    <BarChart
                        title="Quiz Participation Rate"
                        labels={["Temi", "Fumi", "John", "Henry", "Dami", "Alade"]}
                        data={[25, 45, 35, 55, 70, 50]}
                        link="/quiz-participation"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <LanguagePreferencesChart />
                </div>
            </div>
        </div>
    );
}
