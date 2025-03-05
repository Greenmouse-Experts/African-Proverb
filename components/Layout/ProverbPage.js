import React from 'react';

function ProverbPage() {
    return (
        <div className="min-h-screen">
            <h1 className="text-2xl font-bold text-[#BB5D06] mb-6">Add Proverb</h1>

            <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-base font-normal text-black mb-3">Email</label>
                        <input type="email" className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none placeholder:text-gray-400" />
                    </div>

                    <div>
                        <label className="block text-base font-normal text-black mb-3">Name</label>
                        <input type="text" className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none placeholder:text-gray-400" />
                    </div>
                </div>

                <div>
                    <label className="block text-base font-normal text-black mb-3">Ethnic</label>
                    <select className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none placeholder:text-gray-400">
                        <option>Choose one</option>
                        {/* You can add real options here */}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-base font-normal text-black mb-3">Language</label>
                        <input type="text" className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none placeholder:text-gray-400" />
                    </div>

                    <div>
                        <label className="block text-base font-normal text-black mb-3">Suggested Category</label>
                        <input type="text" className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none placeholder:text-gray-400" />
                    </div>
                </div>

                <div>
                    <label className="block text-base font-normal text-black mb-3">Suggested Proverb</label>
                    <textarea className="w-full px-3 border border-gray-300 rounded-lg outline-none placeholder:text-gray-400" rows="4"></textarea>
                </div>

                <div>
                    <label className="block text-base font-normal text-black mb-3">Suggested English Transliteration</label>
                    <textarea className="w-full px-3 border border-gray-300 rounded-lg outline-none placeholder:text-gray-400" rows="4"></textarea>
                </div>

                <div>
                    <label className="block text-base font-normal text-black mb-3">Suggested English Interpretation</label>
                    <textarea className="w-full px-3 border border-gray-300 rounded-lg outline-none placeholder:text-gray-400" rows="4"></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#BB5D06] text-white py-4 rounded-md font-medium"
                >
                    Suggested English Interpretation
                </button>
            </form>
        </div>
    );
}

export default ProverbPage;
