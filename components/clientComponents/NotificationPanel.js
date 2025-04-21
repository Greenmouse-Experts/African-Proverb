import React from "react";

const notifications = [
  {
    title: "Bronze Subscription Expiry in 30 days",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    time: "4 minutes ago",
    type: null,
  },
  {
    title: "Trending Proverb",
    message: "Yọò balẹ̀, yọò balẹ̀, ni labalábá fi...",
    time: "4 minutes ago",
    type: "Igbo",
  },
  {
    title: "Today's Proverbs",
    message: "Yọò balẹ̀, yọò balẹ̀, ni labalábá fi...",
    time: "4 minutes ago",
    type: "Yoruba",
  },
  {
    title: "Failed Auto-Renewal",
    message: "Lorem ipsum dolor sit amet, consect.",
    time: "4 minutes ago",
    type: null,
  },
];

export default function NotificationPanel() {
  return (
    <div className="bg-white p-6 rounded-lg w-full">
      <h2 className="text-lg font-semibold text-black">
        Notification (10)
      </h2>

      <div className="divide-y">
        {notifications.map((item, index) => (
          <div key={index} className="py-4 flex justify-between items-center">
            <div>
              <h3 className="font-medium text-base text-black mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.message}</p>
              {item.type && (
                <span className="text-xs font-semibold bg-gray-200 px-2 py-1 rounded">
                  {item.type}
                </span>
              )}
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-400">{item.time}</span>
              <div className="text-sm text-orange-600 cursor-pointer">View</div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-2">
        <button className="text-gray-600 text-sm">See all</button>
      </div>
    </div>
  );
}
