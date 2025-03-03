import AuthWrapper from "@/components/auth/auth_wrapper";
import Button from "@/components/reuse/button";
import ReusableTextField from "@/components/reuse/textfield";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { resetpasswordValidationSchema } from "@/utils";
import { Box, InputAdornment } from "@mui/material";
import { BiSolidLockAlt } from "react-icons/bi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/router";
import {
  requestPasswordReset,
  resetPassword,
  verifyResetPasswordToken,
} from "@/network/apiService";
import ReusableModal from "@/components/reuse/resuableModal/reuseable_modal";
import AuthHeader from "@/components/auth/auth_header";

const ResetPassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(true);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setPasswordConfirmVisible(!passwordConfirmVisible);
  const [isTokenValid, setIsTokenValid] = useState();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const { token, email } = router.query;

  const [loadingResend, setLoadingResend] = useState(false);
  const handleResendForgotPasswordLink = (e) => {
    e.preventDefault();
    setLoadingResend(true); // Set loading to true when the request is initiated

    requestPasswordReset({
      email: email,
    })
      .then((res) => {
        if (res.status === 200) {
          setOpenModal(false);
          toast.success(res.data);
        }
      })
      .catch((err) => {
        toast.error(err.response.data);
      })
      .finally(() => {
        setLoadingResend(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validationSchema: resetpasswordValidationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    if (email && token) {
      verifyResetPasswordToken({
        email: email,
        token: token,
      })
        .then((res) => {
          if (res.status === 200) {
            setIsTokenValid(true);
            setOpenModal(false);
          }
        })
        .catch((err) => {
          if (err.response.status === 500) {
            setIsTokenValid(false);
            setOpenModal(true);
          }
        });
    }
  }, [email, token]);

  const payload = {
    password: formik.values?.password,
    confirmPassword: formik.values?.confirmPassword,
    email: email,
    token: token,
  };

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    if (isTokenValid) {
      resetPassword(payload)
        .then((res) => {
          if (res.status === 200) {
            console.log(res)
            toast.success(res.data.message);
            formik.resetForm();
            setLoading(false)
            router.push("/auth/login");
          }
        })
        .catch((err) => {
          console.log(err)
          setIsTokenValid(false);
          setOpenModal(true);
          setLoading(false)
          toast.error(err.response.data);
        });
    } else {
      setIsTokenValid(false);
      setOpenModal(true);

      // router.push("/auth/forget_password");
      // toast.error("Token Expired, please rerequest");
    }
  };

  return (
    <>
      <ReusableModal setOpen={setOpenModal} open={openModal}>
        <div className="mt-[3rem] w-full flex flex-col justify-center p-25">
          <p className="text-center mb-10">
            We're sorry, but the password reset link you previously requested
            has expired and is no longer valid. For your security, these links
            are time-sensitive. To request a new password reset link, simply
            click the "Resend Link" button below.
          </p>
          <Button
            isLoading={loadingResend}
            type="submit"
            textInput={"Resend Link"}
            disabled={loadingResend}
            onClick={handleResendForgotPasswordLink}
          ></Button>
        </div>
      </ReusableModal>

      <AuthWrapper headerText="Password Reset">
        <AuthHeader headerText="Forgot password?" />

        <p className="text-gray-400 text-xs text-center -mt-5 mb-8">
          Enter new password and then repeat it.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 px-5 text-black"
        >
          <ReusableTextField
            id="password"
            icon="lock"
            label="Password"
            name="password"
            type={passwordVisible ? "password" : "text"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {<BiSolidLockAlt style={{ fontSize: "1.2rem" }} />}
                </InputAdornment>
              ),
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

          <ReusableTextField
            label="Confirm Password"
            name="confirmPassword"
            type={passwordConfirmVisible ? "password" : "text"}
            id="confirmPassword"
            icon="lock"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {<BiSolidLockAlt style={{ fontSize: "1.2rem" }} />}
                </InputAdornment>
              ),
              endAdornment: (
                <Box
                  sx={{ cursor: "pointer" }}
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {passwordConfirmVisible ? (
                    <AiFillEyeInvisible />
                  ) : (
                    <AiFillEye />
                  )}
                </Box>
              ),
            }}
          />
          <div className="mb-2.9">
            <Button
              isLoading={loading}
              type="submit"
              textInput={"Submit"}
              disabled={loading}
            ></Button>
          </div>
        </form>
      </AuthWrapper>
    </>
  );
};

export default ResetPassword;

// import React from "react";
// import { useFormik } from "formik";

// const SignupForm = () => {
//   const formik = useFormik({
//     initialValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//     },
//     onSubmit: (values) => {
//       alert(JSON.stringify(values, null, 2));
//     },
//   });
//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <label htmlFor="firstName">First Name</label>
//       <input
//         id="firstName"
//         name="firstName"
//         type="text"
//         onChange={formik.handleChange}
//         value={formik.values.firstName}
//       />
//       <label htmlFor="lastName">Last Name</label>
//       <input
//         id="lastName"
//         name="lastName"
//         type="text"
//         onChange={formik.handleChange}
//         value={formik.values.lastName}
//       />
//       <label htmlFor="email">Email Address</label>
//       <input
//         id="email"
//         name="email"
//         type="email"
//         onChange={formik.handleChange}
//         value={formik.values.email}
//       />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default SignupForm;
