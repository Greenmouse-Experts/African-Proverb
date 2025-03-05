import React, { useState } from 'react';

const Register = () => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Side - Image Section */}
            <div className="hidden md:flex w-1/2 bg-[#BB5D06] justify-center items-center">
                <img
                    src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1741078619/We-Immersive/africa-logo.cc06fc01_vkfvjj.png"
                    alt="African Art"
                    className="max-w-[100%] object-contain"
                />
            </div>

            {/* Right Side - Form Section */}
            <div className="w-full md:w-1/2 flex justify-center items-center bg-[#fff] p-6" style={{ fontFamily: 'Mulish' }}>
                <div className="w-full max-w-[600px] space-y-6">

                    {/* Logo */}
                    <img
                        src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1741096252/We-Immersive/primarylogo.ebc6ec00_x9uzsw.svg"
                        alt="African Proverbs Logo"
                        className="h-12 mx-auto"
                    />

                    <h2 className="text-xl font-semibold text-center">
                    Verifiy Your Email
                    </h2>
                    <form className="space-y-6">
                        <div>
                            <label className="block text-base font-normal text-black mb-3">OTP</label>
                            <input type="email" className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none placeholder:text-gray-400" />
                        </div>
                        <button
                            type="submit"
                            className="w-full h-11 bg-[#6D6D6D] text-white rounded-lg"
                        >
                            Verify
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
