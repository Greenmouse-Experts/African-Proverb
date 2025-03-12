import { useState } from 'react';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import Link from "next/link";

export default function RegisterPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [step, setStep] = useState(1);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const texts = [
    "Explore the Richness of African Proverbs",
    "Discover Proverbs from Various Cultures",
    "Wisdom, Unity, and Perseverance in Words"
  ];

  return (
    <div className="flex w-full">
      {/* Left Side */}
      <div className="hidden md:flex w-1/2 bg-[#BB5D06] flex-col items-center justify-center text-white p-10 fixed h-screen">
        <div className="relative mb-8">
          <Link href="/">
            <img
              src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1741078619/We-Immersive/africa-logo.cc06fc01_vkfvjj.png"
              alt="African Art"
              className="w-72 h-72 object-contain"
            />
          </Link>
        </div>
        <h2 className="text-3xl font-bold mb-4">{texts[activeIndex]}</h2>
        <p className="text-center max-w-lg leading-loose">
          Dive into a treasure trove of ancient wisdom and explore a wide range of African proverbs from various regions and ethnic groups.
        </p>
        <div className="mt-4 flex space-x-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`w-5 h-1 rounded-full cursor-pointer ${activeIndex === index ? 'bg-white' : 'bg-gray-400'}`}
              onClick={() => setActiveIndex(index)}
            ></div>
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 ml-auto flex justify-center items-center bg-white p-6 overflow-y-auto h-screen">
        <div className="w-full max-w-[600px] space-y-6">
          {step > 1 && (
            <ChevronLeft className="cursor-pointer text-gray-700" onClick={() => setStep(step - 1)} size={30} />
          )}

          {/* Logo */}
          <img
            src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1741096252/We-Immersive/primarylogo.ebc6ec00_x9uzsw.svg"
            alt="African Proverbs Logo"
            className="h-20 mx-auto"
          />

          <h2 className="text-xl font-semibold text-center">Create an account for Non-Corporate Client</h2>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <form>
              <div>
                  <label className="block text-base font-light text-[#0A0A0A] mb-3">First Name</label>
                  <input type="text" className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3" placeholder='Enter your first name' />
                </div>
                <div>
                  <label className="block text-base font-light text-[#0A0A0A] mb-3">Last Name</label>
                  <input type="text" className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3" placeholder='Enter your last name' />
                </div>
                <div>
                  <label className="block text-base font-light text-[#0A0A0A] mb-3">Phone Number</label>
                  <input type="tel" className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3" placeholder='Enter your phone number' />
                </div>
              <button type="button" className="w-full h-14 bg-[#BB5D06] text-white rounded-md mt-6" onClick={() => setStep(2)}>Next</button>
            </form>
          )}

          {/* Step 2: Password */}
          {step === 2 && (
            <form>
              <div>
                <label className="block text-base font-light text-[#0A0A0A] mb-3">Password</label>
                <div className="relative">
                  <input type={passwordVisible ? 'text' : 'password'} className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none mb-3" placeholder="Enter your password" />
                  <span className="absolute right-3 top-5 cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)}>
                    {passwordVisible ? <EyeOff /> : <Eye />}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-base font-light text-[#0A0A0A] mb-3">Confirm Password</label>
                <div className="relative">
                  <input type={passwordVisible ? 'text' : 'password'} className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none" placeholder="Confirm your password mb-3" />
                  <span className="absolute right-3 top-5 cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)}>
                    {passwordVisible ? <EyeOff /> : <Eye />}
                  </span>
                </div>
              </div>
              <button type="button" className="w-full h-14 bg-[#BB5D06] text-white rounded-md mt-6" onClick={() => setStep(3)}>Next</button>
            </form>
          )}

          {/* Step 3: Subscription */}
          {step === 3 && (
            <form>
              <div>
                <label className="block text-base font-light text-[#0A0A0A] mb-3">Annual Subscription</label>
                <select className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none  mb-6">
                  <option value="" disabled selected hidden>Select annual subscription</option>
                  <option value="tech">Technology</option>
                  <option value="finance">Finance</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="terms" className="w-5 h-5" />
                <label htmlFor="terms" className="text-base font-light">I agree to the <span className="text-[#BB5D06]">Privacy Policy</span> and <span className="text-[#BB5D06]">Terms of Use</span></label>
              </div>
              <button className="w-full h-14 bg-[#BB5D06] text-white rounded-md mt-6">Register</button>
              <p className="mt-6 text-gray-600 font-light">Already have an account? <a href="#" className="text-[#BB5D06]">Sign In</a></p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
