import React, { useContext, useState, useEffect } from "react";
import EditProfilebStyles from "@/styles/EditProfile.module.scss";

import ReusableTextField from "@/components/reuse/textfield";
import { useFormik } from "formik";
import { updateProfilePasswordValidationSchema } from "@/utils";

import Button from "@/components/reuse/button";
import { Box, InputAdornment } from "@mui/material";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { toast } from "react-toastify";

import { BiSolidLockAlt } from "react-icons/bi";

import AuthLayout from "@/components/reuse/auth_Layout";
import { BsArrowLeft } from "react-icons/bs";
import Router, { useRouter } from "next/router";

import axios from "axios";
import { updateAddress, updateProfilePassword } from "@/network/apiService";
import Loader from "@/components/reuse/loader";
import { AuthContext } from "@/context/authContext";

const EditAddress = () => {
  const [loading, setLoading] = useState(false);
  const { logout } = useContext(AuthContext);
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [newpasswordConfirmVisible, setnewpasswordConfirmVisible] =
    useState(true);
  const [confirmVisiblenewpassword, setconfirmVisiblenewpassword] =
    useState(true);
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const togglenewPasswordVisibility = () =>
    setnewpasswordConfirmVisible(!newpasswordConfirmVisible);
  const toggleConfirmPasswordVisibility = () =>
    setconfirmVisiblenewpassword(!confirmVisiblenewpassword);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },

    validationSchema: updateProfilePasswordValidationSchema,
    onSubmit: (values) => {
      const payload = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword,
      };

      setLoading(true);
      updateProfilePassword(payload)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Password successfully updated");
            setLoading(false);
            formik.resetForm();
            logout();
            router.push("/auth/login");
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data);
          // const apiErrorMessage =
          //   err.response?.data?.error || "An error occurred.";
          // const errorMessage = `${apiErrorMessage}` || `: ${err.message}`;
          // toast.error(`Error: ${errorMessage}`);
          // setLoading(false);
        });
    },
  });

  function handleBack() {
    Router.back();
  }

  return (
    <AuthLayout>
      <div className={EditProfilebStyles["main-container"]}>
        <div className={EditProfilebStyles["form-container"]}>
          <div
            className="flex items-center mb-10 gap-2 text-xl hover:cursor-pointer text-gray-500"
            onClick={handleBack}
          >
            {" "}
            <BsArrowLeft /> Back
          </div>
          <h1>Update Password</h1>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 px-5 text-black"
          >
            <ReusableTextField
              id="oldPassword"
              icon="lock"
              label="Old Password"
              name="oldPassword"
              type={passwordVisible ? "password" : "text"}
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
              }
              helperText={
                formik.touched.oldPassword && formik.errors.oldPassword
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
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </Box>
                ),
              }}
            />

            <ReusableTextField
              label="New Password"
              name="newPassword"
              type={newpasswordConfirmVisible ? "password" : "text"}
              id="newPassword"
              icon="lock"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.newPassword && Boolean(formik.errors.newPassword)
              }
              helperText={
                formik.touched.newPassword && formik.errors.newPassword
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
                    onClick={togglenewPasswordVisibility}
                  >
                    {newpasswordConfirmVisible ? (
                      <AiFillEyeInvisible />
                    ) : (
                      <AiFillEye />
                    )}
                  </Box>
                ),
              }}
            />
            <ReusableTextField
              label="Confirm New Password"
              name="confirmNewPassword"
              type={confirmVisiblenewpassword ? "password" : "text"}
              id="confirmNewPassword"
              icon="lock"
              value={formik.values.confirmNewPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmNewPassword &&
                Boolean(formik.errors.confirmNewPassword)
              }
              helperText={
                formik.touched.confirmNewPassword &&
                formik.errors.confirmNewPassword
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
                    {confirmVisiblenewpassword ? (
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
                // isLoading={isLoading}
                type="submit"
                textInput={loading ? <Loader /> : "Update Password"}
                // disabled={isLoading}
              ></Button>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default EditAddress;
