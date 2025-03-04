import React, { useState } from 'react';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { useRouter } from "next/router";

const Register = () => {
  const [step, setStep] = useState(1);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Image Section */}
      <div className="hidden md:flex w-1/2 bg-[#BB5D06] justify-center items-center">
        <img
          src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1741078619/We-Immersive/africa-logo.cc06fc01_vkfvjj.png"
          alt="African Art"
          className="max-w-[80%] object-contain"
        />
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-[#FEF9F6] p-6">
        <div className="w-full max-w-[500px] space-y-6">
          {step === 2 && (
            <ChevronLeft
              className="cursor-pointer text-gray-700"
              onClick={prevStep}
              size={30}
            />
          )}

          {/* Logo */}
          <img
            src="/path-to-your-logo.png"
            alt="African Proverbs Logo"
            className="h-12 mx-auto"
          />

          <h2 className="text-xl font-semibold text-center">
            {step === 1 ? 'Corporate Information' : 'Authorized Representative Details'}
          </h2>

          {step === 1 ? (
            // Step 1 - Corporate Information Form
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-800">Company Name</label>
                <input type="text" className="w-full h-11 px-3 border border-gray-300 rounded-lg" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800">Corporate Email</label>
                <input type="email" className="w-full h-11 px-3 border border-gray-300 rounded-lg" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800">Password</label>
                <div className="relative">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    className="w-full h-11 px-3 border border-gray-300 rounded-lg"
                  />
                  <span
                    className="absolute right-3 top-3 cursor-pointer"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <EyeOff /> : <Eye />}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={nextStep}
                className="w-full h-11 bg-[#6D6D6D] text-white rounded-lg"
              >
                Next
              </button>
            </form>
          ) : (
            // Step 2 - Representative Information Form
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-800">Full Name</label>
                <input type="text" className="w-full h-11 px-3 border border-gray-300 rounded-lg" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800">Designation/Position</label>
                <select className="w-full h-11 px-3 border border-gray-300 rounded-lg">
                  <option>Select Position</option>
                  <option>Manager</option>
                  <option>Director</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800">Work Email</label>
                <input type="email" className="w-full h-11 px-3 border border-gray-300 rounded-lg" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800">Work Phone Number</label>
                <input type="tel" className="w-full h-11 px-3 border border-gray-300 rounded-lg" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800">ID Proof</label>
                <select className="w-full h-11 px-3 border border-gray-300 rounded-lg">
                  <option>Select ID Proof</option>
                  <option>National ID</option>
                  <option>Passport</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-[#6D6D6D] text-white rounded-lg"
              >
                Sign up
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
