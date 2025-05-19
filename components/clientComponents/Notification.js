import { useState } from 'react';

export default function Home() {
  const [activeTopTab, setActiveTopTab] = useState('Bulk Emails');
  const [activeTab, setActiveTab] = useState('All Messages');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [automaticRemindersEnabled, setAutomaticRemindersEnabled] = useState(true);
  const [selectedReminders, setSelectedReminders] = useState([]);
  const [frequency, setFrequency] = useState('Weekly');

  const notifications = [
    {
      id: 1,
      type: 'subscription',
      title: 'Bronze Subscription Expiry in 30Days',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
      time: '4 minutes ago',
      read: true,
      language: null,
    },
    {
      id: 2,
      type: 'trending',
      title: 'Trending Quiz',
      description: 'Yọ́ báálẹ̀, yọ́ báálẹ̀, ni lábálábá fi ...',
      time: '4 minutes ago',
      read: false,
      language: 'Igbo',
    },
    {
      id: 3,
      type: 'proverb',
      title: "Today's Proverbs",
      description: 'Yọ́ báálẹ̀, yọ́ báálẹ̀, ni lábálábá fi ...',
      time: '4 minutes ago',
      read: false,
      language: 'Yoruba',
    },
    {
      id: 4,
      type: 'failed',
      title: 'Failed Auto-Renewal',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
      time: '4 minutes ago',
      read: false,
      language: null,
    },
    {
      id: 5,
      type: 'proverb',
      title: "Today's Proverbs",
      description: 'Yọ́ báálẹ̀, yọ́ báálẹ̀, ni lábálábá fi ...',
      time: '4 minutes ago',
      read: false,
      language: 'Yoruba',
    },
  ];

  const reminderOptions = ['Renewal Notices', 'Pending Approvals', 'Quiz Reminders'];
  const frequencyOptions = ['Daily', 'Weekly', 'Monthly'];

  const getFilteredNotifications = () => {
    if (activeTab === 'Read') {
      return notifications.filter((notif) => notif.read);
    } else if (activeTab === 'Unread') {
      return notifications.filter((notif) => !notif.read);
    }
    return notifications;
  };

  const getIcon = (type) => {
    switch (type) {
      case 'subscription':
        return '⏰';
      case 'trending':
        return '🔥';
      case 'proverb':
        return '💬';
      case 'failed':
        return '❌';
      default:
        return '🔔';
    }
  };

  const handleTopTabClick = (tab) => {
    setActiveTopTab(tab);
    if (tab === 'Announcements') {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleReminder = (reminder) => {
    if (selectedReminders.includes(reminder)) {
      setSelectedReminders(selectedReminders.filter((r) => r !== reminder));
    } else {
      setSelectedReminders([...selectedReminders, reminder]);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full">
        {/* Top Navigation Bar */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            {['Bulk Emails', 'Announcements', 'Automated'].map((tab) => (
              <button
                key={tab}
                className={`text-sm font-medium pb-1 ${
                  activeTopTab === tab
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-600'
                }`}
                onClick={() => handleTopTabClick(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Modal for Announcements */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm relative">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                onClick={closeModal}
              >
                ✕
              </button>
              <div className="flex flex-col items-center">
                <div className="text-4xl mb-4">🔔</div>
                <h2 className="text-lg font-semibold text-orange-600 mb-2">
                  Are you sure you want to delete this selected notification
                </h2>
                <p className="text-sm text-gray-600 text-center mb-6">
                  Kindly note if you delete the notification you can't retrieve back
                </p>
                <div className="flex space-x-4">
                  <button
                    className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                    onClick={closeModal}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Based on Active Top Tab */}
        {activeTopTab === 'Bulk Emails' && (
          <div className="bg-white rounded-lg w-full">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {['All Messages', 'Read', 'Unread'].map((tab) => (
                <button
                  key={tab}
                  className={`flex-1 py-3 text-sm font-medium ${
                    activeTab === tab
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-gray-600'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab} {tab === 'All Messages' && `(${notifications.length})`}
                </button>
              ))}
            </div>

            {/* Notification Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Notification ({notifications.length})
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Send in App Notification</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationsEnabled}
                    onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-orange-600">
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                        notificationsEnabled ? 'translate-x-5' : 'translate-x-1'
                      } mt-0.5 ml-0.5`}
                    ></div>
                  </div>
                </label>
              </div>
            </div>

            {/* Notification List */}
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Today</h3>
              {getFilteredNotifications().length === 0 ? (
                <p className="text-gray-500 text-sm">No notifications to display.</p>
              ) : (
                getFilteredNotifications().map((notif) => (
                  <div
                    key={notif.id}
                    className="flex items-start space-x-3 py-3 border-b border-gray-100"
                  >
                    <input type="checkbox" className="mt-1" defaultChecked={notif.read} />
                    <div className="text-xl">{getIcon(notif.type)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium text-gray-800">{notif.title}</h4>
                        <span className="text-xs text-gray-500">{notif.time}</span>
                      </div>
                      <p className="text-sm text-gray-600">{notif.description}</p>
                      {notif.language && (
                        <span className="text-xs text-gray-500">{notif.language}</span>
                      )}
                    </div>
                    <button className="text-sm text-orange-600">View</button>
                    <button className="text-red-500">🗑️</button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Automated Tab Content */}
        {activeTopTab === 'Automated' && (
          <div className="bg-white rounded-lg w-full max-w-xl p-4">
            {/* Enable/Disable Automatic Reminders */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-medium text-gray-800">
                Enable/Disable Automatic Reminders
              </h2>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={automaticRemindersEnabled}
                  onChange={() => setAutomaticRemindersEnabled(!automaticRemindersEnabled)}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-orange-600">
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                      automaticRemindersEnabled ? 'translate-x-5' : 'translate-x-1'
                    } mt-0.5 ml-0.5`}
                  ></div>
                </div>
              </label>
            </div>

            {/* Reminder Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reminder Type
              </label>
              <div className="relative">
                <div className="flex flex-wrap border border-gray-300 rounded-md p-4 bg-white">
                  {selectedReminders.map((reminder) => (
                    <div
                      key={reminder}
                      className="flex items-center bg-gray-100 rounded px-2 py-1 mr-2 mb-2"
                    >
                      <span className="text-sm text-gray-700">{reminder}</span>
                      <button
                        className="ml-2 text-gray-500 hover:text-gray-700"
                        onClick={() => toggleReminder(reminder)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <select
                    className="flex-1 border-none focus:ring-0 text-gray-500 text-sm outline-none appearance-none"
                    value=""
                    onChange={(e) => {
                      if (e.target.value) toggleReminder(e.target.value);
                    }}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {reminderOptions
                      .filter((option) => !selectedReminders.includes(option))
                      .map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Frequency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Frequency
              </label>
              <div className="relative">
                <select
                  className="w-full border border-gray-300 rounded-md p-4 outline-none text-gray-700 text-sm appearance-none"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                >
                  {frequencyOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}