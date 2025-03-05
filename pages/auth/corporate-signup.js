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
          className="max-w-[100%] object-contain"
        />
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-[#fff] p-6" style={{ fontFamily: 'Mulish' }}>
        <div className="w-full max-w-[600px] space-y-6">
          {step === 2 && (
            <ChevronLeft
              className="cursor-pointer text-gray-700"
              onClick={prevStep}
              size={30}
            />
          )}

          {/* Logo */}
          <img
            src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1741096252/We-Immersive/primarylogo.ebc6ec00_x9uzsw.svg"
            alt="African Proverbs Logo"
            className="h-12 mx-auto"
          />

          <h2 className="text-xl font-semibold text-center">
            {step === 1 ? 'Welcome, Create a Corporate account' : 'Authorized Representative Details'}
          </h2>

          {step === 1 ? (
            // Step 1 - Welcome, Create a Corporate account Form
            <form className="space-y-6">
              <div>
                <label className="block text-base font-normal text-black mb-3 ">Organization Name</label>
                <input
                  type="text"
                  className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-base font-normal text-black mb-3 ">
                  Organization Registration Number <span className="text-gray-500 text-sm">(if available)</span>
                </label>
                <input
                  type="text"
                  className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-base font-normal text-black mb-3 ">Industry Type</label>
                <select
                  className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none placeholder:text-gray-400 bg-white"
                >
                  <option value="" disabled selected hidden>Select industry type</option>
                  <option value="tech">Technology</option>
                  <option value="finance">Finance</option>
                </select>
              </div>

              <div>
                <label className="block text-base font-normal text-black mb-3 ">Business Type</label>
                <select
                  className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none text-gray-400 bg-white"
                >
                  <option value="" disabled selected hidden>Select business type</option>
                  <option value="tech">Technology</option>
                  <option value="finance">Finance</option>
                </select>
              </div>

              <div>
                <label className="block text-base font-normal text-black mb-3 ">Country of Incorporation</label>
                <input
                  type="text"
                  className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-base font-normal text-black mb-3 ">Company Address</label>
                <input
                  type="text"
                  className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-base font-normal text-black mb-3 ">
                  Business Website <span className="text-gray-500 text-sm">(Optional)</span>
                </label>
                <input
                  type="url"
                  className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-base font-normal text-black mb-3 ">
                  Organization Email <span className="text-gray-500 text-sm">(Official Contact Email)</span>
                </label>
                <input
                  type="email"
                  className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-base font-normal text-black mb-3 ">Organization Phone Number</label>
                <input
                  type="tel"
                  className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-base font-normal text-black mb-3 ">Username</label>
                <input
                  type="text"
                  className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none placeholder:text-gray-400"
                />
              </div>
              <div>
                <label className="block text-base font-normal text-black mb-4">Password</label>
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
            // Step 2 - Authorized Representative Details Form
            <form className="space-y-6">
              <div>
                <label className="block text-base font-normal text-black mb-3">Full Name</label>
                <input type="text" className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none placeholder:text-gray-400" />
              </div>

              <div>
                <label className="block text-base font-normal text-black mb-3">Designation/Position</label>
                <select className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none placeholder:text-gray-400">
                  <option>Select Position</option>
                  <option>Manager</option>
                  <option>Director</option>
                </select>
              </div>

              <div>
                <label className="block text-base font-normal text-black mb-3">Work Email</label>
                <input type="email" className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none placeholder:text-gray-400" />
              </div>

              <div>
                <label className="block text-base font-normal text-black mb-3">Work Phone Number</label>
                <input type="tel" className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none placeholder:text-gray-400" />
              </div>

              <div>
                <label className="block text-base font-normal text-black mb-3">ID Proof</label>

                <select className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none text-gray-400">
                  <option value="" disabled selected hidden>Select ID Proof</option>
                  <option value="tech">National ID</option>
                  <option value="finance">Passport</option>

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
