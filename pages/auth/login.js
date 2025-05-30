import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CorporateLogin } from "@/network/authService";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/authContext";


export default function LoginPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const texts = [
    "Explore the Richness of African Proverbs",
    "Discover Proverbs from Various Cultures",
    "Wisdom, Unity, and Perseverance in Words",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Formik + Yup setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      const loginPayload = values;

      delete loginPayload.remember;

      setLoading(true);

      CorporateLogin(loginPayload).then((res) => {
       // login(null, res.data.tokens.access);
        toast.success('Logged in successfully', {
          position: toast.POSITION.TOP_CENTER,
        });
        router.push(`/dashboard`);
        setLoading(false);
      })
        .catch((err) => {
          setLoading(false);
          toast.error(err?.response?.data?.data?.message);
        });

      // Do login action here
    },
  });

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
        <h2 className="text-3xl font-bold mb-4 text-center">{texts[activeIndex]}</h2>
        <p className="text-center max-w-lg leading-loose">
          Dive into a treasure trove of ancient wisdom and explore a wide range of African proverbs from various regions and ethnic groups.
        </p>
        <div className="mt-4 flex space-x-2">
          {texts.map((_, index) => (
            <div
              key={index}
              className={`w-5 h-1 rounded-full cursor-pointer transition-all duration-300 ${activeIndex === index ? "bg-white" : "bg-gray-400"
                }`}
              onClick={() => setActiveIndex(index)}
            ></div>
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 ml-auto flex justify-center items-center bg-white p-6 overflow-y-auto h-screen">
        <div className="w-full max-w-[500px] space-y-6">
          <div className="flex justify-center">
            <img
              src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1741096252/We-Immersive/primarylogo.ebc6ec00_x9uzsw.svg"
              alt="African Proverbs Logo"
              className="h-16"
            />
          </div>

          <h2 className="text-2xl font-semibold text-center">Hello Again!</h2>

          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-base font-light text-[#0A0A0A] mb-3">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="e.g student@unilag.edu.ng"
                className={`w-full h-14 px-6 border ${formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
                  } rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-1`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-base font-light text-[#0A0A0A] mb-3">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-7 transform -translate-y-1/2 text-gray-400">
                  <Lock size={20} />
                </span>
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={`w-full pl-10 pr-12 py-4 h-14 px-6 border ${formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                    } rounded-md outline-none placeholder:text-[#A2A3A9] font-light text-sm mb-1`}
                  placeholder="****************"
                />
                <span
                  className="absolute right-3 top-7 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                onChange={formik.handleChange}
                checked={formik.values.remember}
                className="mr-2"
              />
              <label htmlFor="remember" className="text-gray-600 text-sm">
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#BB5D06] text-white py-3 rounded-md text-lg font-medium hover:bg-[#994A04] transition-all"
            >
              Login
            </button>
          </form>

          {/* Forgot Password */}
          <div className="text-center">
            <Link href="#" className="text-[#BB5D06] text-sm font-medium hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Sign Up */}
          <p className="text-center text-gray-600 text-sm">
            Don’t have an account yet?
            <Link href="/auth/cover" className="text-[#BB5D06] font-medium hover:underline"> Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
