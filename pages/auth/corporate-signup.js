import { useState, useEffect } from 'react';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import Link from "next/link";
import Select from "react-select";

export default function RegisterPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('admin');
  const [step, setStep] = useState(1);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showPromoInput, setShowPromoInput] = useState(false);

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  const texts = [
    "Explore the Richness of African Proverbs",
    "Discover Proverbs from Various Cultures",
    "Wisdom, Unity, and Perseverance in Words"
  ];

  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const languageOptions = [
    { value: "Yoruba", label: "Yoruba" },
    { value: "Igbo", label: "Igbo" },
    { value: "Hausa", label: "Hausa" },
    { value: "Ijaw", label: "Ijaw" },
    { value: "Twi", label: "Twi" },
  ];

  // Auto-change text every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
          Dive into a treasure trove of ancient wisdom and explore a wide range of African proverbs from various regions and ethnic groups. Discover proverbs that reflect the values, beliefs, and traditions of Africa, spanning themes like wisdom, love, unity, perseverance, and much more.
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
            className="h-20 mx-auto"
          />

          <h2 className="text-xl font-semibold text-center">
            {step === 1 ? 'Create an account for Corporate Client' : 'Create an account for Corporate Client'}
          </h2>
          {/* Tabs */}
          <div className="flex space-x-2 mb-6 text-center">
            <button
              className={`flex-1 px-4 py-3 text-[#0A0A0A] font-light rounded-t-lg ${activeTab === 'admin' ? 'border border-[#BB5D06] font-light text-[#BB5D06]' : ' border  text-[#0A0A0A] font-light'}`}
              onClick={() => { setActiveTab('admin'); setStep(1); }}
            >
              Register as an Admin
            </button>
            <button
              className={`flex-1 text-[#0A0A0A] px-4 py-3 rounded-t-lg ${activeTab === 'student' ? 'border border-[#BB5D06] font-light text-[#BB5D06]' : 'border text-[#0A0A0A]'}`}
              onClick={() => { setActiveTab('student'); setStep(1); }}
            >
              Register as a Student
            </button>
          </div>

          {/* Forms */}
          {activeTab === 'admin' ? (
            step === 1 ? (
              <form className="">
                <div>
                  <label className="block text-base font-light text-[#0A0A0A] mb-3">University Name</label>
                  <input type="text" className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3" placeholder='Enter University name' required />
                </div>
                <div>
                  <label className="block text-base font-light text-[#0A0A0A] mb-3">Official Email Domain</label>
                  <input type="email" className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3" placeholder='Enter official email domain' required />
                </div>
                <div>
                  <label className="block text-base font-light text-[#0A0A0A] mb-3">Admin Name</label>
                  <input type="text" className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3" placeholder='Join Doe' required />
                </div>
                <div>
                  <label className="block text-base font-light text-[#0A0A0A] mb-3">Admin Phone Number</label>
                  <input type="tel" className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3" placeholder='Enter phone number' required />
                </div>

                <div>
                  <label className="block text-base font-light text-[#0A0A0A] mb-3">Admin Email </label>
                  <input type="email" className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3" placeholder='Enter your email' required />
                </div>
                <button type="button" className="w-full h-14 bg-[#858585] text-white rounded-md mt-4" onClick={() => setStep(2)}>Next </button>
              </form>
            ) : (
              <form className="">
                <div>
                  <label className="block text-base font-light text-[#0A0A0A] mb-3">Password</label>
                  <div className="relative">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3" placeholder='Enter your password' required
                    />
                    <span
                      className="absolute right-3 top-5 cursor-pointer text-[#A2A3A9]"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? <EyeOff /> : <Eye />}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-base font-light text-[#0A0A0A] mb-3">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3" placeholder='Enter your confirm password ' required
                    />
                    <span
                      className="absolute right-3 top-5 cursor-pointer text-[#A2A3A9]"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? <EyeOff /> : <Eye />}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-base font-light text-[#0A0A0A] mb-3">Annual Subscription </label>
                  <select
                    className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3" required
                  >
                    <option value="" disabled selected hidden>Select annual subscription</option>
                    <option value="tech">Technology</option>
                    <option value="finance">Finance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-base font-light text-[#0A0A0A] mb-3">Preferred Langauage  </label>
                  <select
                    className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3" required
                  >
                    <option value="" disabled selected hidden>Select one </option>
                    <option value="tech">Langauage 1</option>
                    <option value="finance">Langauage 2</option>
                    <option value="finance">Langauage 3</option>
                  </select>
                </div>
                <label className="block text-base leading-loose font-light text-[#A2A3A9] mb-3">Choose two languages choice in addition to your
                  preferred language without subsidize commercials  </label>

                <div>
                  <label className="block text-base font-light text-[#0A0A0A] mb-3">
                    Select Language <span className="text-red-500">*</span>
                  </label>
                  <Select
                    isMulti
                    options={languageOptions}
                    value={selectedLanguages}
                    onChange={setSelectedLanguages}
                    className="outline-none placeholder:text-[#A2A3A9] font-light text-sm w-full"
                    classNamePrefix="react-select"
                    placeholder="Select one or more"
                  />
                </div>

                <div>
                  {/* Promo Code Question */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-base font-light text-[#0A0A0A] mb-3 mt-3">
                      Did you get a promo code from a friend?
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="promo"
                          value="yes"
                          className="cursor-pointer"
                          onChange={() => setShowPromoInput(true)}
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="promo"
                          value="no"
                          className="cursor-pointer"
                          onChange={() => setShowPromoInput(false)}
                          defaultChecked
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>

                  {/* Promo Code Input (Visible Only If "Yes" is Selected) */}
                  {showPromoInput && (
                    <div className="mt-4">
                      <label className="block text-base font-light text-[#0A0A0A] mb-3">
                        Enter Promo Code
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your promo code"
                        className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3"
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="terms" className="w-5 h-5 mt-3" />
                  <label htmlFor="terms" className="text-base font-light text-[#0A0A0A] mb-3 mt-3">
                    I have read and agree to the <span className="text-[#BB5D06] font-medium">Privacy Policy</span> and <span className="text-[#BB5D06] font-medium">Terms of Use</span>
                  </label>
                </div>
                <button className="w-full h-14 bg-[#BB5D06] text-white rounded-md mt-6">Register</button>
                <p className="mt-6 text-gray-600 font-light">
                  Already have an account? <Link href="/auth/admin" className="text-[#BB5D06] font-medium hover:underline"> Sign In</Link>
                </p>
              </form>
            )
          ) : (
            step === 1 ? (
              <form className="">
                <div>
                  <label className="block text-base font-light text-[#0A0A0A] mb-3">University Email</label>
                  <input type="email" className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3" placeholder='Enter your university email' required />
                </div>
                <button type="button" className="w-full h-14 bg-[#858585] text-white rounded-md mt-4" onClick={() => setStep(2)}>Next</button>
                <p className="mt-6 text-gray-600 font-light">
                  Already have an account? <Link href="/auth/student-login" className="text-[#BB5D06] font-medium hover:underline"> Sign In</Link>
                </p>
              </form>
            ) : step === 2 ? (
              <form className="">
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
                <div>
                  <label className="block text-base font-light text-[#0A0A0A] mb-3">Year of Graduation</label>
                  <input type="text" className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3" placeholder='Enter year' />
                </div>
                <button type='submit' className="w-full h-14 bg-[#858585] text-white rounded-md mt-4" onClick={() => setStep(3)}>Next</button>
              </form>
            ) : (
              <form className="">
                <div>
                  <label className="block text-base font-light text-[#0A0A0A] mb-3">Password</label>
                  <div className="relative">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3" placeholder='Enter your password' required
                    />
                    <span
                      className="absolute right-3 top-5 cursor-pointer text-[#A2A3A9]"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? <EyeOff /> : <Eye />}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-base font-light text-[#0A0A0A] mb-3">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3" placeholder='Enter your confirm password ' required
                    />
                    <span
                      className="absolute right-3 top-5 cursor-pointer text-[#A2A3A9]"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? <EyeOff /> : <Eye />}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-base font-light text-[#0A0A0A] mb-3">Annual Subscription </label>
                  <select
                    className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3" required
                  >
                    <option value="" disabled selected hidden>Select annual subscription</option>
                    <option value="tech">Technology</option>
                    <option value="finance">Finance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-base font-light text-[#0A0A0A] mb-3">Preferred Langauage  </label>
                  <select
                    className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3" required
                  >
                    <option value="" disabled selected hidden>Select one </option>
                    <option value="tech">Langauage 1</option>
                    <option value="finance">Langauage 2</option>
                    <option value="finance">Langauage 3</option>
                  </select>
                </div>
                <label className="block text-base leading-loose font-light text-[#A2A3A9] mb-3">Choose two languages choice in addition to your
                  preferred language without subsidize commercials  </label>

                <div>
                  <label className="block text-base font-light text-[#0A0A0A] mb-3">
                    Select Language <span className="text-red-500">*</span>
                  </label>
                  <Select
                    isMulti
                    options={languageOptions}
                    value={selectedLanguages}
                    onChange={setSelectedLanguages}
                    className="outline-none placeholder:text-[#A2A3A9] font-light text-sm w-full"
                    classNamePrefix="react-select"
                    placeholder="Select one or more"
                  />
                </div>

                <div>
                  {/* Promo Code Question */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-base font-light text-[#0A0A0A] mb-3 mt-3">
                      Did you get a promo code from a friend?
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="promo"
                          value="yes"
                          className="cursor-pointer"
                          onChange={() => setShowPromoInput(true)}
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="promo"
                          value="no"
                          className="cursor-pointer"
                          onChange={() => setShowPromoInput(false)}
                          defaultChecked
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>

                  {/* Promo Code Input (Visible Only If "Yes" is Selected) */}
                  {showPromoInput && (
                    <div className="mt-4">
                      <label className="block text-base font-light text-[#0A0A0A] mb-3">
                        Enter Promo Code
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your promo code"
                        className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3"
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="terms" className="w-5 h-5 mt-3" />
                  <label htmlFor="terms" className="text-base font-light text-[#0A0A0A] mb-3 mt-3">
                    I have read and agree to the <span className="text-[#BB5D06] font-medium">Privacy Policy</span> and <span className="text-[#BB5D06] font-medium">Terms of Use</span>
                  </label>
                </div>
                <button className="w-full h-14 bg-[#BB5D06] text-white rounded-md mt-6">Register</button>

                <p className="mt-6 text-gray-600 font-light">
                  Already have an account? <Link href="/auth/student-login" className="text-[#BB5D06] font-medium hover:underline"> Sign In</Link>
                </p>
              </form>
            )
          )}
        </div>
      </div>
    </div>
  );
}
