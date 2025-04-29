import { useState, useEffect, useContext } from 'react';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import Link from "next/link";
import Select from "react-select";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getLanguages, getSubscriptions } from '@/network/apiService';
import { CorporateSignUp } from '@/network/authService';
import { toast } from 'react-toastify';
import { EthnicContext } from '@/context/ethnicContext';

export default function RegisterPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('admin');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const { ethnicsList } = useContext(EthnicContext);


  const [languages, setLanguages] = useState([]);

  const [languageOptions, setLanguageOptions] = useState([]);

  const [subscriptionPackages, setPackages] = useState([]);

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  const texts = [
    "Explore the Richness of African Proverbs",
    "Discover Proverbs from Various Cultures",
    "Wisdom, Unity, and Perseverance in Words"
  ];




  // Admin form validation schemas
  const adminStep1Schema = Yup.object().shape({
    universityName: Yup.string().required('University name is required'),
    email: Yup.string().required('Email domain is required'),
    adminName: Yup.string().required('Admin name is required'),
    adminPhoneNumber: Yup.string().required('Phone number is required'),
    adminEmail: Yup.string().email('Invalid email').required('Email is required'),
  });

  const adminStep2Schema = Yup.object().shape({
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters').trim(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required')
      .test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.password === value;
      }),
    subscriptionPackage: Yup.string().required('Subscription is required'),
    preferredEthnicId: Yup.string().required('Preferred language is required'),
    ethnicIds: Yup.array().min(2, 'Select at least 2 additional languages').required('Additional languages are required'),
    terms: Yup.boolean().oneOf([true], 'You must accept the terms'),
    promoCode: Yup.string().when('hasPromoCode', {
      is: true,
      then: Yup.string().required('Promo code is required'),
    }),
  });

  // Student form validation schemas
  const studentStep1Schema = Yup.object().shape({
    universityEmail: Yup.string().email('Invalid email').required('University email is required'),
  });

  const studentStep2Schema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    graduationYear: Yup.string().required('Graduation year is required'),
  });

  const studentStep3Schema = Yup.object().shape({
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    subscription: Yup.string().required('Subscription is required'),
    preferredLanguage: Yup.string().required('Preferred language is required'),
    additionalLanguages: Yup.array().min(2, 'Select at least 2 additional languages').required('Additional languages are required'),
    terms: Yup.boolean().oneOf([true], 'You must accept the terms'),
    promoCode: Yup.string().when('hasPromoCode', {
      is: true,
      then: Yup.string().required('Promo code is required'),
    }),
  });


  // Admin formik
  const adminFormik = useFormik({
    initialValues: {
      universityName: '',
      email: '',
      adminName: '',
      adminPhoneNumber: '',
      adminEmail: '',
      password: '',
      confirmPassword: '',
      subscriptionPackage: '',
      preferredEthnicId: '',
      ethnicIds: [],
      hasPromoCode: false,
      promoCode: '',
      terms: false,
    },
    validationSchema: step === 1 ? adminStep1Schema : adminStep2Schema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: values => {
      if (step === 1) {
        nextStep();
      } else {

        console.log('Admin form submitted:', values);

        const { hasPromoCode, terms, ...registrationData } = values;
        registrationData.ethnicIds = registrationData.ethnicIds.map(x => x.value);

        if (registrationData.promoCode === '') {
          delete registrationData.promoCode
        }

        setLoading(true);
        CorporateSignUp(registrationData)
          .then((res) => {
            if (res.status === 200) {
              // setPaymentBannerOpen(true);

              // setRegistrationSuccessModal(true);

              // router.push(`/auth/verify-email`);
              toast.success('Account created successfully', {
                position: toast.POSITION.TOP_CENTER,
              });
              router.push(`/auth/login`);

              setLoading(false);
            }
            if (res.status === 500) {
              // console.log(res.response)
            }
          })
          .catch((err) => {
            setLoading(false);

            console.log(err);
            toast.error(err?.response?.data?.data?.message);
          });


      }
    },
  });







  const handleBlurWithValidation = (fieldName) => async (e) => {
    adminFormik.handleBlur(e);
    try {
      const schema = step === 1 ? adminStep1Schema : adminStep2Schema;
      const fieldSchema = Yup.reach(schema, fieldName);
      await fieldSchema.validate(adminFormik.values[fieldName]);
      adminFormik.setFieldError(fieldName, undefined); // clear any previous error
    } catch (err) {
      adminFormik.setFieldError(fieldName, err.message);
    }
  };







  // Student formik
  const studentFormik = useFormik({
    initialValues: {
      universityEmail: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      graduationYear: '',
      password: '',
      confirmPassword: '',
      subscription: '',
      preferredLanguage: '',
      additionalLanguages: [],
      hasPromoCode: false,
      promoCode: '',
      terms: false,
    },
    validationSchema:
      step === 1 ? studentStep1Schema :
        step === 2 ? studentStep2Schema :
          studentStep3Schema,
    onSubmit: values => {
      if (step === 1 || step === 2) {
        nextStep();
      } else {
        // Submit form
        console.log('Student form submitted:', values);
      }
    },
  });

  // Auto-change text every 4 seconds
  useEffect(() => {
    getLanguagesData();
    getPackages();
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);


  const getLanguagesData = () => {
    setLanguageOptions(ethnicsList.map((language) => ({
      value: language.id,
      label: language.name
    })));

    setLanguages(ethnicsList.map((language) => ({
      id: language.id,
      name: language.name
    })))
  }


  const getPackages = () => {
    getSubscriptions().then((res) => {
      setPackages(res.data)
    }).catch((err) => {
      return {};
    })
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setStep(1);
    if (tab === 'admin') {
      adminFormik.resetForm();
    } else {
      studentFormik.resetForm();
    }
  };



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
              onClick={() => handleTabChange('admin')}
            >
              Register as an Admin
            </button>
            <button
              className={`flex-1 text-[#0A0A0A] px-4 py-3 rounded-t-lg ${activeTab === 'student' ? 'border border-[#BB5D06] font-light text-[#BB5D06]' : 'border text-[#0A0A0A]'}`}
              onClick={() => handleTabChange('student')}
            >
              Register as a Student
            </button>
          </div>

          {/* Forms */}
          {activeTab === 'admin' ? (
            <form onSubmit={adminFormik.handleSubmit}>
              {step === 1 ? (
                <>
                  <div>
                    <label className="block text-base font-light text-[#0A0A0A] mb-3">University Name</label>
                    <input
                      type="text"
                      name="universityName"
                      className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3"
                      placeholder='Enter University name'
                      onChange={adminFormik.handleChange}
                      onBlur={adminFormik.handleBlur}
                      value={adminFormik.values.universityName}
                    />
                    {adminFormik.touched.universityName && adminFormik.errors.universityName ? (
                      <div className="text-red-500 text-sm">{adminFormik.errors.universityName}</div>
                    ) : null}
                  </div>
                  <div>
                    <label className="block text-base font-light text-[#0A0A0A] mb-3">Official Email Domain</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3"
                      placeholder='Enter official email domain'
                      onChange={adminFormik.handleChange}
                      onBlur={adminFormik.handleBlur}
                      value={adminFormik.values.email}
                    />
                    {adminFormik.touched.email && adminFormik.errors.email ? (
                      <div className="text-red-500 text-sm">{adminFormik.errors.email}</div>
                    ) : null}
                  </div>
                  <div>
                    <label className="block text-base font-light text-[#0A0A0A] mb-3">Admin Name</label>
                    <input
                      type="text"
                      name="adminName"
                      className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3"
                      placeholder='John Doe'
                      onChange={adminFormik.handleChange}
                      onBlur={adminFormik.handleBlur}
                      value={adminFormik.values.adminName}
                    />
                    {adminFormik.touched.adminName && adminFormik.errors.adminName ? (
                      <div className="text-red-500 text-sm">{adminFormik.errors.adminName}</div>
                    ) : null}
                  </div>
                  <div>
                    <label className="block text-base font-light text-[#0A0A0A] mb-3">Admin Phone Number</label>
                    <input
                      type="tel"
                      name="adminPhoneNumber"
                      className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3"
                      placeholder='Enter phone number'
                      onChange={adminFormik.handleChange}
                      onBlur={adminFormik.handleBlur}
                      value={adminFormik.values.adminPhoneNumber}
                    />
                    {adminFormik.touched.adminPhoneNumber && adminFormik.errors.adminPhoneNumber ? (
                      <div className="text-red-500 text-sm">{adminFormik.errors.adminPhoneNumber}</div>
                    ) : null}
                  </div>
                  <div>
                    <label className="block text-base font-light text-[#0A0A0A] mb-3">Admin Email</label>
                    <input
                      type="email"
                      name="adminEmail"
                      className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3"
                      placeholder='Enter your email'
                      onChange={adminFormik.handleChange}
                      onBlur={adminFormik.handleBlur}
                      value={adminFormik.values.adminEmail}
                    />
                    {adminFormik.touched.adminEmail && adminFormik.errors.adminEmail ? (
                      <div className="text-red-500 text-sm">{adminFormik.errors.adminEmail}</div>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    className="w-full h-14 bg-[#858585] text-white rounded-md mt-4"
                  >
                    Next
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-base font-light text-[#0A0A0A] mb-3">Password</label>
                    <div className="relative">
                      <input
                        type={passwordVisible ? 'text' : 'password'}
                        name="password"
                        className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3"
                        placeholder='Enter your password'
                        onChange={adminFormik.handleChange}
                        onBlur={handleBlurWithValidation('password')}
                        value={adminFormik.values.password}
                      />
                      <span
                        className="absolute right-3 top-5 cursor-pointer text-[#A2A3A9]"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      >
                        {passwordVisible ? <EyeOff /> : <Eye />}
                      </span>
                    </div>
                    {adminFormik.touched.password && adminFormik.errors.password ? (
                      <div className="text-red-500 text-sm">{adminFormik.errors.password}</div>
                    ) : null}
                  </div>
                  <div>
                    <label className="block text-base font-light text-[#0A0A0A] mb-3">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={confirmPasswordVisible ? 'text' : 'password'}
                        name="confirmPassword"
                        className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3"
                        placeholder='Enter your confirm password'
                        onChange={adminFormik.handleChange}
                        onBlur={handleBlurWithValidation('confirmPassword')}
                        value={adminFormik.values.confirmPassword}
                      />
                      <span
                        className="absolute right-3 top-5 cursor-pointer text-[#A2A3A9]"
                        onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                      >
                        {confirmPasswordVisible ? <EyeOff /> : <Eye />}
                      </span>
                    </div>
                    {adminFormik.touched.confirmPassword && adminFormik.errors.confirmPassword ? (
                      <div className="text-red-500 text-sm">{adminFormik.errors.confirmPassword}</div>
                    ) : null}
                  </div>
                  <div>
                    <label className="block text-base font-light text-[#0A0A0A] mb-3">Annual Subscription</label>
                    <select
                      name="subscriptionPackage"
                      className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3"
                      onChange={adminFormik.handleChange}
                      onBlur={handleBlurWithValidation('subscriptionPackage')}
                      value={adminFormik.values.subscriptionPackage}
                    >
                      <option value="" disabled>Select annual subscription</option>
                      {subscriptionPackages.map((packages, index) => (
                        <option key={index} value={packages.id}>{packages.name}</option>
                      ))}
                    </select>
                    {adminFormik.touched.subscriptionPackage && adminFormik.errors.subscriptionPackage ? (
                      <div className="text-red-500 text-sm">{adminFormik.errors.subscriptionPackage}</div>
                    ) : null}
                  </div>
                  <div>
                    <label className="block text-base font-light text-[#0A0A0A] mb-3">Preferred Language</label>
                    <select
                      name="preferredEthnicId"
                      className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3"
                      onChange={adminFormik.handleChange}
                      onBlur={handleBlurWithValidation('preferredEthnicId')}
                      value={adminFormik.values.preferredEthnicId}
                    >
                      <option value="" disabled>Select one</option>
                      {languages &&
                        languages?.map((item) => {
                          return (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                    {adminFormik.touched.preferredEthnicId && adminFormik.errors.preferredEthnicId ? (
                      <div className="text-red-500 text-sm">{adminFormik.errors.preferredEthnicId}</div>
                    ) : null}
                  </div>
                  <label className="block text-base leading-loose font-light text-[#A2A3A9] mb-3">
                    Choose two languages choice in addition to your preferred language without subsidize commercials
                  </label>
                  <div>
                    <label className="block text-base font-light text-[#0A0A0A] mb-3">
                      Select Language <span className="text-red-500">*</span>
                    </label>
                    <Select
                      isMulti
                      name="ethnicIds"
                      options={languageOptions}
                      value={adminFormik.values.ethnicIds}
                      onChange={(selectedOptions) => adminFormik.setFieldValue('ethnicIds', selectedOptions)}
                      onBlur={() => adminFormik.setFieldTouched('ethnicIds', true)}
                      className="outline-none placeholder:text-[#A2A3A9] font-light text-sm w-full"
                      classNamePrefix="react-select"
                      placeholder="Select one or more"
                    />
                    {adminFormik.touched.ethnicIds && adminFormik.errors.ethnicIds ? (
                      <div className="text-red-500 text-sm">{adminFormik.errors.ethnicIds}</div>
                    ) : null}
                  </div>
                  <div>
                    <div className="flex flex-col space-y-2">
                      <label className="text-base font-light text-[#0A0A0A] mb-3 mt-3">
                        Did you get a promo code from a friend?
                      </label>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="hasPromoCode"
                            value={true}
                            className="cursor-pointer"
                            onChange={() => {
                              adminFormik.setFieldValue('hasPromoCode', true);
                              setShowPromoInput(true);
                            }}
                            checked={adminFormik.values.hasPromoCode === true}
                          />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="hasPromoCode"
                            value={false}
                            className="cursor-pointer"
                            onChange={() => {
                              adminFormik.setFieldValue('hasPromoCode', false);
                              adminFormik.setFieldValue('promoCode', '');
                              setShowPromoInput(false);
                            }}
                            checked={adminFormik.values.hasPromoCode === false}
                          />
                          <span>No</span>
                        </label>
                      </div>
                    </div>
                    {showPromoInput && (
                      <div className="mt-4">
                        <label className="block text-base font-light text-[#0A0A0A] mb-3">
                          Enter Promo Code
                        </label>
                        <input
                          type="text"
                          name="promoCode"
                          placeholder="Enter your promo code"
                          className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3"
                          onChange={adminFormik.handleChange}
                          onBlur={adminFormik.handleBlur}
                          value={adminFormik.values.promoCode}
                        />
                        {adminFormik.touched.promoCode && adminFormik.errors.promoCode ? (
                          <div className="text-red-500 text-sm">{adminFormik.errors.promoCode}</div>
                        ) : null}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      className="w-5 h-5 mt-3"
                      onChange={adminFormik.handleChange}
                      onBlur={adminFormik.handleBlur}
                      checked={adminFormik.values.terms}
                    />
                    <label htmlFor="terms" className="text-base font-light text-[#0A0A0A] mb-3 mt-3">
                      I have read and agree to the <span className="text-[#BB5D06] font-medium">Privacy Policy</span> and <span className="text-[#BB5D06] font-medium">Terms of Use</span>
                    </label>
                  </div>
                  {adminFormik.touched.terms && adminFormik.errors.terms ? (
                    <div className="text-red-500 text-sm">{adminFormik.errors.terms}</div>
                  ) : null}
                  <button
                    type="submit"
                    className="w-full h-14 bg-[#BB5D06] text-white rounded-md mt-6"
                  >
                    Register
                  </button>
                  <p className="mt-6 text-gray-600 font-light">
                    Already have an account? <Link href="/auth/admin" className="text-[#BB5D06] font-medium hover:underline"> Sign In</Link>
                  </p>
                </>
              )}
            </form>
          ) : (
            <form onSubmit={studentFormik.handleSubmit}>
              {step === 1 ? (
                <>
                  <div>
                    <label className="block text-base font-light text-[#0A0A0A] mb-3">University Email</label>
                    <input
                      type="email"
                      name="universityEmail"
                      className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3"
                      placeholder='Enter your university email'
                      onChange={studentFormik.handleChange}
                      onBlur={studentFormik.handleBlur}
                      value={studentFormik.values.universityEmail}
                    />
                    {studentFormik.touched.universityEmail && studentFormik.errors.universityEmail ? (
                      <div className="text-red-500 text-sm">{studentFormik.errors.universityEmail}</div>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    className="w-full h-14 bg-[#858585] text-white rounded-md mt-4"
                  >
                    Next
                  </button>
                  <p className="mt-6 text-gray-600 font-light">
                    Already have an account? <Link href="/auth/student-login" className="text-[#BB5D06] font-medium hover:underline"> Sign In</Link>
                  </p>
                </>
              ) : step === 2 ? (
                <>
                  <div>
                    <label className="block text-base font-light text-[#0A0A0A] mb-3">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3"
                      placeholder='Enter your first name'
                      onChange={studentFormik.handleChange}
                      onBlur={studentFormik.handleBlur}
                      value={studentFormik.values.firstName}
                    />
                    {studentFormik.touched.firstName && studentFormik.errors.firstName ? (
                      <div className="text-red-500 text-sm">{studentFormik.errors.firstName}</div>
                    ) : null}
                  </div>
                  <div>
                    <label className="block text-base font-light text-[#0A0A0A] mb-3">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3"
                      placeholder='Enter your last name'
                      onChange={studentFormik.handleChange}
                      onBlur={studentFormik.handleBlur}
                      value={studentFormik.values.lastName}
                    />
                    {studentFormik.touched.lastName && studentFormik.errors.lastName ? (
                      <div className="text-red-500 text-sm">{studentFormik.errors.lastName}</div>
                    ) : null}
                  </div>
                  <div>
                    <label className="block text-base font-light text-[#0A0A0A] mb-3">Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3"
                      placeholder='Enter your phone number'
                      onChange={studentFormik.handleChange}
                      onBlur={studentFormik.handleBlur}
                      value={studentFormik.values.phoneNumber}
                    />
                    {studentFormik.touched.phoneNumber && studentFormik.errors.phoneNumber ? (
                      <div className="text-red-500 text-sm">{studentFormik.errors.phoneNumber}</div>
                    ) : null}
                  </div>
                  <div>
                    <label className="block text-base font-light text-[#0A0A0A] mb-3">Year of Graduation</label>
                    <input
                      type="text"
                      name="graduationYear"
                      className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3"
                      placeholder='Enter year'
                      onChange={studentFormik.handleChange}
                      onBlur={studentFormik.handleBlur}
                      value={studentFormik.values.graduationYear}
                    />
                    {studentFormik.touched.graduationYear && studentFormik.errors.graduationYear ? (
                      <div className="text-red-500 text-sm">{studentFormik.errors.graduationYear}</div>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    className="w-full h-14 bg-[#858585] text-white rounded-md mt-4"
                  >
                    Next
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-base font-light text-[#0A0A0A] mb-3">Password</label>
                    <div className="relative">
                      <input
                        type={passwordVisible ? 'text' : 'password'}
                        name="password"
                        className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3"
                        placeholder='Enter your password'
                        onChange={studentFormik.handleChange}
                        onBlur={studentFormik.handleBlur}
                        value={studentFormik.values.password}
                      />
                      <span
                        className="absolute right-3 top-5 cursor-pointer text-[#A2A3A9]"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      >
                        {passwordVisible ? <EyeOff /> : <Eye />}
                      </span>
                    </div>
                    {studentFormik.touched.password && studentFormik.errors.password ? (
                      <div className="text-red-500 text-sm">{studentFormik.errors.password}</div>
                    ) : null}
                  </div>
                  <div>
                    <label className="block text-base font-light text-[#0A0A0A] mb-3">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={passwordVisible ? 'text' : 'password'}
                        name="confirmPassword"
                        className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3"
                        placeholder='Enter your confirm password'
                        onChange={studentFormik.handleChange}
                        onBlur={studentFormik.handleBlur}
                        value={studentFormik.values.confirmPassword}
                      />
                      <span
                        className="absolute right-3 top-5 cursor-pointer text-[#A2A3A9]"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      >
                        {passwordVisible ? <EyeOff /> : <Eye />}
                      </span>
                    </div>
                    {studentFormik.touched.confirmPassword && studentFormik.errors.confirmPassword ? (
                      <div className="text-red-500 text-sm">{studentFormik.errors.confirmPassword}</div>
                    ) : null}
                  </div>
                  <div>
                    <label className="block text-base font-light text-[#0A0A0A] mb-3">Annual Subscription</label>
                    <select
                      name="subscription"
                      className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3"
                      onChange={studentFormik.handleChange}
                      onBlur={studentFormik.handleBlur}
                      value={studentFormik.values.subscription}
                    >
                      <option value="" disabled>Select annual subscription</option>
                      <option value="tech">Technology</option>
                      <option value="finance">Finance</option>
                    </select>
                    {studentFormik.touched.subscription && studentFormik.errors.subscription ? (
                      <div className="text-red-500 text-sm">{studentFormik.errors.subscription}</div>
                    ) : null}
                  </div>
                  <div>
                    <label className="block text-base font-light text-[#0A0A0A] mb-3">Preferred Language</label>
                    <select
                      name="preferredLanguage"
                      className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3"
                      onChange={studentFormik.handleChange}
                      onBlur={studentFormik.handleBlur}
                      value={studentFormik.values.preferredLanguage}
                    >
                      <option value="" disabled>Select one</option>
                      {languages.map((language, index) => (
                        <option key={index} value={language.id}>{language.name}</option>
                      ))}
                    </select>
                    {studentFormik.touched.preferredLanguage && studentFormik.errors.preferredLanguage ? (
                      <div className="text-red-500 text-sm">{studentFormik.errors.preferredLanguage}</div>
                    ) : null}
                  </div>
                  <label className="block text-base leading-loose font-light text-[#A2A3A9] mb-3">
                    Choose two languages choice in addition to your preferred language without subsidize commercials
                  </label>
                  <div>
                    <label className="block text-base font-light text-[#0A0A0A] mb-3">
                      Select Language <span className="text-red-500">*</span>
                    </label>
                    <Select
                      isMulti
                      name="additionalLanguages"
                      options={languageOptions}
                      value={studentFormik.values.additionalLanguages}
                      onChange={(selectedOptions) => studentFormik.setFieldValue('additionalLanguages', selectedOptions)}
                      onBlur={() => studentFormik.setFieldTouched('additionalLanguages', true)}
                      className="outline-none placeholder:text-[#A2A3A9] font-light text-sm w-full"
                      classNamePrefix="react-select"
                      placeholder="Select one or more"
                    />
                    {studentFormik.touched.additionalLanguages && studentFormik.errors.additionalLanguages ? (
                      <div className="text-red-500 text-sm">{studentFormik.errors.additionalLanguages}</div>
                    ) : null}
                  </div>
                  <div>
                    <div className="flex flex-col space-y-2">
                      <label className="text-base font-light text-[#0A0A0A] mb-3 mt-3">
                        Did you get a promo code from a friend?
                      </label>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="hasPromoCode"
                            value={true}
                            className="cursor-pointer"
                            onChange={() => {
                              studentFormik.setFieldValue('hasPromoCode', true);
                              setShowPromoInput(true);
                            }}
                            checked={studentFormik.values.hasPromoCode === true}
                          />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="hasPromoCode"
                            value={false}
                            className="cursor-pointer"
                            onChange={() => {
                              studentFormik.setFieldValue('hasPromoCode', false);
                              studentFormik.setFieldValue('promoCode', '');
                              setShowPromoInput(false);
                            }}
                            checked={studentFormik.values.hasPromoCode === false}
                          />
                          <span>No</span>
                        </label>
                      </div>
                    </div>
                    {showPromoInput && (
                      <div className="mt-4">
                        <label className="block text-base font-light text-[#0A0A0A] mb-3">
                          Enter Promo Code
                        </label>
                        <input
                          type="text"
                          name="promoCode"
                          placeholder="Enter your promo code"
                          className="w-full h-14 px-6 border border-gray-300 rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-3"
                          onChange={studentFormik.handleChange}
                          onBlur={studentFormik.handleBlur}
                          value={studentFormik.values.promoCode}
                        />
                        {studentFormik.touched.promoCode && studentFormik.errors.promoCode ? (
                          <div className="text-red-500 text-sm">{studentFormik.errors.promoCode}</div>
                        ) : null}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      className="w-5 h-5 mt-3"
                      onChange={studentFormik.handleChange}
                      onBlur={studentFormik.handleBlur}
                      checked={studentFormik.values.terms}
                    />
                    <label htmlFor="terms" className="text-base font-light text-[#0A0A0A] mb-3 mt-3">
                      I have read and agree to the <span className="text-[#BB5D06] font-medium">Privacy Policy</span> and <span className="text-[#BB5D06] font-medium">Terms of Use</span>
                    </label>
                  </div>
                  {studentFormik.touched.terms && studentFormik.errors.terms ? (
                    <div className="text-red-500 text-sm">{studentFormik.errors.terms}</div>
                  ) : null}
                  <button
                    type="submit"
                    className="w-full h-14 bg-[#BB5D06] text-white rounded-md mt-6"
                  >
                    Register
                  </button>
                  <p className="mt-6 text-gray-600 font-light">
                    Already have an account? <Link href="/auth/student-login" className="text-[#BB5D06] font-medium hover:underline"> Sign In</Link>
                  </p>
                </>
              )}
            </form>
          )}
        </div>
      </div>

    </div>
  )
}
