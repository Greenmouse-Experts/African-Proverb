import React from "react";
import Table from "./Table";

export default function PendingApprovals() {
  const columns = [
    { key: "name", label: "Student Name" },
    { key: "type", label: "Request Type" },
    { key: "status", label: "Status" },
    { key: "date", label: "Application Date" },
    { key: "action", label: "Action" },
  ];

  const data = [
    { name: "Temidune Opeyemi", type: "Register", status: "Pending", date: "12-01-2025", action: "🔍 Action" },
    { name: "Temidune Opeyemi", type: "Register", status: "Pending", date: "12-01-2025", action: "🔍 Action" },
    { name: "Temidune Opeyemi", type: "Register", status: "Pending", date: "12-01-2025", action: "🔍 Action" },
    { name: "Temidune Opeyemi", type: "Register", status: "Pending", date: "12-01-2025", action: "🔍 Action" },
  ];

  return (
    <div className="">
      <Table title="Pending Approvals" columns={columns} data={data} seeAllLink="/approvals" />
    </div>
  );
}
