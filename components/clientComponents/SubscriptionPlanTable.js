import React from "react";
import Table from "./Table";

const SubscriptionPlanTable = () => {
  const subscriptions = [
    { planType: "5 Languages", activationDate: "11-02-2024", userCount: "500,000", expiryDate: "12-01-2025", status: "Active",  },
    { planType: "5 Languages", activationDate: "11-02-2024", userCount: "500,000", expiryDate: "12-01-2025", status: "Expired", },
    { planType: "5 Languages", activationDate: "11-02-2024", userCount: "500,000", expiryDate: "12-01-2025", status: "Expired", },
    { planType: "5 Languages", activationDate: "11-02-2024", userCount: "500,000", expiryDate: "12-01-2025", status: "Expired", },
  ];

  const columns = [
    { key: "planType", label: "Plan Type" },
    { key: "activationDate", label: "Activation Date" },
    { key: "userCount", label: "Allowed User Count" },
    { key: "expiryDate", label: "Expiry Date" },
    {
      key: "status",
      label: "Status",
      render: (status) => (
        <span
          className={`px-3 py-1 text-sm font-semibold rounded-full ${
            status === "Active" ? "bg-[#00B69B] text-green-800" : "bg-gray-200 text-gray-600"
          }`}
        >
          {status}
        </span>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg">
      {/* Table with Search & See All Button */}
      <Table
        columns={columns}
        data={subscriptions}
        title="Total Subscription Plan Details"
        seeAllLink="#"
        onActionClick={(row) => alert(`Action clicked for: ${row.planType}`)}
      />
    </div>
  );
};

export default SubscriptionPlanTable;
