import AuthWrapper from "@/components/auth/auth_wrapper";
import Button from "@/components/reuse/button";
import ReusableTextField from "@/components/reuse/textfield";
import React, { useContext, useState } from "react";
import styles from "@/styles/Login.module.scss";
import Link from "next/link";
import { toast } from "react-toastify";
import { Login } from "@/network/authService";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/authContext";
import { Box } from "@mui/material";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import AuthHeader from "@/components/auth/auth_header";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous error messages and set isLoading to true
    setIsLoading(true);

    // Call the Login function
    Login({
      email: email,
      password: password,
    })
      .then((res) => {
        if (res.status === 200) {
          const user = res.data.user;
          const token = res.data.tokens.access;
          login(user, token);
          router.push("/");
          setIsLoading(false);
        } else {
          toast.error("Invalid email or password");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error?.response?.data?.message === "Bad credentials") {
          toast.error("Incorrect Email or Password");
        }

        toast.error(error?.response?.data?.data?.message);
        if (error?.response?.data?.data?.message === "User is not active") {
          // toast.error(
          //   "You are yet to activate your account, you'll be redirected to a page where you can request for a new verification link"
          // );
          router.push(
            `/register_payment_success/?email=${email}&linkOrigin=signin`
          );
        }

        // toast.error(error?.response?.data?.data?.message);
        setIsLoading(false);
      });
  };
  return (
    <AuthWrapper>
      <div>
        <AuthHeader headerText="Hello Again!" />

        <form className={styles["main-container"]} onSubmit={handleSubmit}>
          <ReusableTextField
            icon="email"
            label="Email"
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <ReusableTextField
            icon="lock"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={passwordVisible ? "password" : "text"}
            InputProps={{
              endAdornment: (
                <Box
                  sx={{ cursor: "pointer" }}
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                </Box>
              ),
            }}
          />

          <div className="mt-6">
            <Button
              isLoading={isLoading}
              type="submit"
              textInput={isLoading ? "" : "Login"}
              disabled={isLoading}
            ></Button>
          </div>

          <Link
            className={styles["forget-password"]}
            href={"/auth/forget_password"}
          >
            <p>Forgot Password?</p>
          </Link>
          <p className={styles["signup"]}>
            Don't have an account yet?{" "}
            <Link href={"/auth/signup"}>
              <span>Sign Up</span>
            </Link>
          </p>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default Signin;
