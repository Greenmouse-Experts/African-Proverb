import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ProtectedPages = ({ children }) => {
  const router = useRouter();
  const DashboardRoute = "/dashboard";
  const loginRoute = "/auth/login";

  const allowedPaths = [
    loginRoute,
    DashboardRoute,
    "/",
    "/auth/signup",
    "/auth/cover",
    "/auth/login-cover",
    "/auth/activate",
    "/auth/admin",
    "/auth/student-login",
    "/auth/corporate-signup",
    "/auth/non-corporate",
    "/auth/verify-email",
    "/auth/forget_password",
    "/auth/reset_password",
    "/add_proverb",
    "/contact",
    "/pricing",
    "/about",
    "/search_result",
    "/test",
    "/register_payment_success",
    "/privacy_policy",
    "/payment_success",
    "/404",
    // Dashboard
    "/dashboard",
    "/dashboard/EmployeePage",
    "/dashboard/NotificationPage",
    "/dashboard/Proverb",
  ];
  

  useEffect(() => {
    const token = Cookies.get("userToken");

    if (!allowedPaths.includes(router.pathname)) {
      if (!token) {
        router.push(loginRoute);
      }
    }
  }, [router.pathname]);

  return children;
};

export default ProtectedPages;
