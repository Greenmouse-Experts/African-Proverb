'use client';

import React from "react";
import StatsCard from "../../components/clientComponents/StatsCard";
import BarChart from "../../components/clientComponents/BarChart";
import ProgressChart from "../../components/clientComponents/ProgressChart";
import PendingApprovals from "../../components/clientComponents/PendingApprovals";
import LanguagePreferencesChart from "../../components/clientComponents/PreferencesChart";
import NotificationPanel from "../../components/clientComponents/NotificationPanel";
import SubscriptionPlanTable from "../../components/clientComponents/SubscriptionPlanTable";

export default function DashboardMain() {
  return (
    <div className="bg-gray-100 min-h-screen space-y-6">
      {/* Top Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatsCard 
          title="Subscription Status" 
          value="Active" 
          image="https://res.cloudinary.com/greenmouse-tech/image/upload/v1742745769/African-Proverb/Icon_h0j2tg.png" 
          link="/subscription"
          isActive={true}
        />
        <StatsCard 
          title="Total Active Students" 
          value="40,689" 
          image="https://res.cloudinary.com/greenmouse-tech/image/upload/v1742745768/African-Proverb/Icon2_xfo6hu.png" 
          link="/students"
        />
      </div>

      {/* Engagement Metrics */}
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold text-black mb-4">Engagement Metrics Section</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BarChart 
            title="Most Engaged Students" 
            labels={["Temi", "Fumi", "John", "Henry", "Dami", "Alade"]} 
            data={[30, 50, 40, 60, 80, 55]} 
            link="/engagement"
          />
          <ProgressChart 
            title="Daily Active Users" 
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

      <PendingApprovals />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <LanguagePreferencesChart />
        </div>
        <div>
          <NotificationPanel />
        </div>
      </div>

      <SubscriptionPlanTable />
    </div>
  );
}
