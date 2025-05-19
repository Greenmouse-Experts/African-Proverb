import { useState } from 'react';
import Table from './Table';

export default function Settings() {
    const [activeTab, setActiveTab] = useState('Corporate Information');
    const [universityName, setUniversityName] = useState('University of Lagos');
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selfSignupOption, setSelfSignupOption] = useState('');
    const [currentPassword, setCurrentPassword] = useState('xxxxxxxx');
    const [newPassword, setNewPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [requireNewPassword, setRequireNewPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showRetypePassword, setShowRetypePassword] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCorporate, setNewCorporate] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      });

    const languageOptions = ['Igbo', 'Yoruba', 'Ijaw'];
    const selfSignupOptions = [
        'Decide if students can join automatically or require admin approval',
    ];

    const corporateAccounts = [
        { firstName: 'Olabangi', lastName: 'Alade', email: '@unilag.edu.ng', phone: '081724775587', dateAdded: '12-03-2024', action: 'Action' },
        { firstName: 'Olabangi', lastName: 'Alade', email: '@unilag.edu.ng', phone: '081724775587', dateAdded: '12-03-2024', action: 'Action' },
        { firstName: 'Olabangi', lastName: 'Alade', email: '@unilag.edu.ng', phone: '081724775587', dateAdded: '12-03-2024', action: 'Action' },
        { firstName: 'Olabangi', lastName: 'Hamzat Abdulazeez', email: '@unilag.edu.ng', phone: '081724775587', dateAdded: '12-03-2027', action: 'Action' },
        { firstName: 'Just Name', lastName: 'Unknow User', email: '@unosun.edu.ng', phone: '081724775587', dateAdded: '12-03-2027', action: 'Action' },
    ];

    const columns = [
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone Number' },
        { key: 'dateAdded', label: 'Date Added' },
        { key: 'action', label: 'Action' },
    ];

    const handleActionClick = (row) => {
        console.log('Action clicked for row:', row);

    };

    const toggleLanguage = (language) => {
        if (selectedLanguages.includes(language)) {
            setSelectedLanguages(selectedLanguages.filter((l) => l !== language));
        } else {
            setSelectedLanguages([...selectedLanguages, language]);
        }
    };

    const handleSaveNewCorporate = () => {
        console.log('New Corporate Account Added:', newCorporate);
        alert('New Corporate Account Added Successfully!');
        setNewCorporate({ firstName: '', lastName: '', email: '', phone: '' });
        setIsModalOpen(false);
      };

    const handleUpdate = () => {
        console.log('Corporate Information Updated:', {
            universityName,
            selectedLanguages,
            selfSignupOption,
        });
        alert('Corporate Information Updated Successfully!');
    };

    const handleSave = () => {
        if (newPassword !== retypePassword) {
            alert('New password and retype password do not match!');
            return;
        }
        if (newPassword.length < 8) {
            alert('New password must be at least 8 characters long!');
            return;
        }
        console.log('Password Saved:', {
            currentPassword,
            newPassword,
            retypePassword,
            requireNewPassword,
        });
        alert('Password Updated Successfully!');
    };

    return (
        <>
            {/* Top Navigation */}
            <div className="bg-white p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                        {['Corporate Information', 'Manage Corporate Accounts'].map((tab) => (
                            <button
                                key={tab}
                                className={`text-sm font-medium pb-3 ${activeTab === tab
                                    ? 'text-orange-600 border-b-2 border-orange-600'
                                    : 'text-gray-600'
                                    }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="w-full">
                    {activeTab === 'Corporate Information' && (
                        <div className="flex space-x-6 ">
                            <div className="w-1/2 p-6 rounded-lg bg-white">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        Corporate Information
                                    </h2>
                                    <button
                                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                        onClick={handleUpdate}
                                    >
                                        Update
                                    </button>

                                </div>

                                <div className="flex gap-6 mb-4">
                                    <div className="flex-[3] space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                                University Name
                                            </label>
                                            <input
                                                type="text"
                                                value={universityName}
                                                onChange={(e) => setUniversityName(e.target.value)}
                                                className="w-full border text-gray-700 text-sm border-gray-300 rounded-md p-4"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                                Select Language
                                            </label>
                                            <div className="relative">
                                                <div className="flex flex-wrap border border-gray-300 rounded-md p-4 outline-none bg-white">
                                                    {selectedLanguages.map((language) => (
                                                        <div
                                                            key={language}
                                                            className="flex items-center bg-gray-100 rounded px-2 py-1 mr-2 mb-2"
                                                        >
                                                            <span className="text-sm text-gray-700">{language}</span>
                                                            <button
                                                                className="ml-2 text-gray-500 hover:text-gray-700"
                                                                onClick={() => toggleLanguage(language)}
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <select
                                                        className="flex-1 border-none focus:ring-0 text-gray-500 text-sm appearance-none"
                                                        value=""
                                                        onChange={(e) => {
                                                            if (e.target.value) toggleLanguage(e.target.value);
                                                        }}
                                                    >
                                                        <option value="" disabled>
                                                            Select
                                                        </option>
                                                        {languageOptions
                                                            .filter((option) => !selectedLanguages.includes(option))
                                                            .map((option) => (
                                                                <option key={option} value={option}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>
                                                <div className="absolute inset-y-0 right-2 top-8 flex items-center pr-2 pointer-events-none">
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

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                                Enable/Disable Student Self-Signup
                                            </label>
                                            <div className="relative">
                                                <select
                                                    className="w-full border border-gray-300 rounded-md p-4 outline-none text-gray-700 text-sm appearance-none"
                                                    value={selfSignupOption}
                                                    onChange={(e) => setSelfSignupOption(e.target.value)}
                                                >
                                                    <option value="" disabled>
                                                        Select
                                                    </option>
                                                    {selfSignupOptions.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="absolute inset-y-0 right-2 top-8 flex items-center pr-2 pointer-events-none">
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

                                    <div className="flex-[1] flex items-start justify-center">
                                        <div
                                            className="w-32 h-32 flex items-center justify-center mt-8 cursor-pointer rounded"
                                            style={{
                                                backgroundImage:
                                                    'url(https://res.cloudinary.com/ddj0k8gdw/image/upload/v1747644184/Blastily-Images/Upload_Image_agiwg3.png)',
                                                backgroundSize: 'contain',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'center',
                                            }}
                                        ></div>
                                    </div>
                                </div>

                            </div>

                            <div className="w-1/2 bg-white p-6 rounded-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        Password Settings
                                    </h2>
                                    <button
                                        className="bg-blue-200 text-blue-800 py-2 px-4 rounded hover:bg-blue-300"
                                        onClick={() => {
                                            setCurrentPassword('xxxxxxxx');
                                            setNewPassword('');
                                            setRetypePassword('');
                                            setRequireNewPassword(false);
                                        }}
                                    >
                                        Change Password
                                    </button>
                                </div>

                                <p className="text-sm text-gray-600 mb-4">
                                    Create a new password that is at least 8 characters long.
                                </p>
                                <div className="space-y-4">
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Current Password
                                        </label>
                                        <input
                                            type={showCurrentPassword ? 'text' : 'password'}
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            className="w-full border border-gray-300 rounded-md p-4  outline-none pr-10"
                                            disabled
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-2 top-8 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        >
                                            {showCurrentPassword ? '👁️' : '👁️‍🗨️'}
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Type your new password
                                        </label>
                                        <input
                                            type={showNewPassword ? 'text' : 'password'}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full border border-gray-300 rounded-md p-4  outline-none pr-10"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-2 top-8 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                        >
                                            {showNewPassword ? '👁️' : '👁️‍🗨️'}
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Retype your new password
                                        </label>
                                        <input
                                            type={showRetypePassword ? 'text' : 'password'}
                                            value={retypePassword}
                                            onChange={(e) => setRetypePassword(e.target.value)}
                                            className="w-full border border-gray-300 rounded-md p-4  outline-none pr-10"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-2 top-8 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                                            onClick={() => setShowRetypePassword(!showRetypePassword)}
                                        >
                                            {showRetypePassword ? '👁️' : '👁️‍🗨️'}
                                        </button>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={requireNewPassword}
                                            onChange={(e) => setRequireNewPassword(e.target.checked)}
                                            className="mr-2"
                                        />
                                        <label className="text-sm text-gray-600">
                                            Require all devices to sign in with new password
                                        </label>
                                    </div>
                                    <button
                                        className="w-full bg-[#BB5D06] text-white py-3 rounded hover:bg-orange-700"
                                        onClick={handleSave}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Manage Corporate Accounts' && (
                        <>
                        <div className="w-full bg-white p-4 rounded-lg mb-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold text-gray-800">.</h2>
                                <button
                                    className="bg-[#BB5D06] text-white py-2 px-4 rounded hover:bg-orange-700"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    + New Corporate
                                </button>
                            </div>
                        </div>
                        <div>
                            <Table
                                columns={columns}
                                data={corporateAccounts}
                                title="All Admin"
                                // seeAllLink="/see-all" // Replace with actual link if needed
                                onActionClick={handleActionClick}
                            />
                        </div>
                        </>
                    )}
                    {/* Modal for New Corporate */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                                <button
                                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    ✕
                                </button>
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                    Add New Corporate Account
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Corporate Full Name
                                        </label>
                                        
                                        <input
                                            type="text"
                                            value={newCorporate.firstName}
                                            onChange={(e) =>
                                                setNewCorporate({ ...newCorporate, firstName: e.target.value })
                                            }
                                            placeholder="Enter Corporate Full Name"
                                            className="w-full border border-gray-300 text-xs text-gray-700 rounded-md p-4 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            value={newCorporate.lastName}
                                            onChange={(e) =>
                                                setNewCorporate({ ...newCorporate, lastName: e.target.value })
                                            }
                                            placeholder="Enter Corporate Last Name"
                                            className="w-full border border-gray-300 text-xs text-gray-700 rounded-md p-4 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Corporate university email
                                        </label>
                                        <input
                                            type="email"
                                            value={newCorporate.email}
                                            onChange={(e) =>
                                                setNewCorporate({ ...newCorporate, email: e.target.value })
                                            }
                                            placeholder="Enter university email"
                                            className="w-full border border-gray-300 text-xs text-gray-700 rounded-md p-4 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            value={newCorporate.phone}
                                            onChange={(e) =>
                                                setNewCorporate({ ...newCorporate, phone: e.target.value })
                                            }
                                            placeholder="Enter Phone number"
                                            className="w-full border border-gray-300 text-xs text-gray-700 rounded-md p-4 outline-none"
                                        />
                                    </div>
                                    <button
                                        className="w-full bg-[#BB5D06] text-white py-3 rounded hover:bg-orange-700"
                                        onClick={handleSaveNewCorporate}
                                    >
                                        Add Admin
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}