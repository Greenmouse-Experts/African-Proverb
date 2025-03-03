import React, { useContext, useEffect, useState } from "react";
import EditProfilebStyles from "@/styles/EditProfile.module.scss";
import Navbar from "@/components/home/navbar";
import ReusableTextField from "@/components/reuse/textfield";
import { useFormik } from "formik";
import { EditProfileValiadtionSchema } from "@/utils";
import SelectDropdown from "@/components/reuse/selectDropdown";
import Button from "@/components/reuse/button";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import ReusableModal from "@/components/reuse/resuableModal/reuseable_modal";
import Image from "next/image";
import SuccessIcon from "@/public/img/success-icon.png";
import Link from "next/link";
import AuthLayout from "@/components/reuse/auth_Layout";
import { BsArrowLeft } from "react-icons/bs";
import Router, { useRouter } from "next/router";
import { ProfileContext } from "@/context/profileContext";
import { updateProfile } from "@/network/apiService";
import Loader from "@/components/reuse/loader";

const EditProfile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { personalInfo, error, fullDetails, setupdateInfo } =
    useContext(ProfileContext);



  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      surname: "",
      phoneNumber: "",
      othername: "",
      nickName: "",
      username: "",
    },

    validationSchema: EditProfileValiadtionSchema,
    onSubmit: (values) => {
      const profileData = {
        firstName: values.firstName,
        lastName: values.surname,
        otherName: values.othername,
        username: values.username,
        nick_name: values.nickName,
        phoneNumber: values.phoneNumber,
      };
      setLoading(true);
      updateProfile(profileData)
        .then((res) => {
          if (res?.status === 200) {
            toast.success(res?.data?.message);
            setupdateInfo(true);
            router.push("/profile")
            formik.resetForm(); 
          }
          setLoading(false);

        })
        .catch((err) => {
          setLoading(false);
          toast.error("Failed to update profile. Please try again.");
        });
    },
  });

  useEffect(() => {
    if (personalInfo?.data?.content) {
      const { firstName, lastName, phoneNumber, otherName, nickName, username } = personalInfo.data.content;
      formik.setValues({
        email: fullDetails?.data?.email || "",
        firstName: firstName || "",
        surname: lastName || "",
        phoneNumber: phoneNumber || "",
        othername: otherName || "",
        nickName: nickName || "",
        username: username || "",
      });
    }
  }, [personalInfo]);

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
          <h1>Edit Profile</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className={EditProfilebStyles["double-column-fields"]}>
              <ReusableTextField
                label="First Name"
                id="firstName"
                name="firstName"
                type={"text"}
                placeholder="John Doe"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              <ReusableTextField
                label="Surname"
                id="surname"
                name="surname"
                type={"text"}
                placeholder="Surname"
                value={formik.values.surname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.surname && Boolean(formik.errors.surname)}
                helperText={formik.touched.surname && formik.errors.surname}
              />
            </div>
            <div className={EditProfilebStyles["double-column-fields"]}>
              <ReusableTextField
                label="Nickname"
                id="nickName"
                name="nickName"
                type={"Nickname"}
                placeholder="Nickname"
                value={formik.values.nickName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.nickName && Boolean(formik.errors.nickName)
                }
                helperText={formik.touched.nickName && formik.errors.nickName}
              />
              <ReusableTextField
                label="Othername"
                id="othername"
                name="othername"
                type={"Othername"}
                placeholder="Othername"
                value={formik.values.othername}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.othername && Boolean(formik.errors.othername)
                }
                helperText={formik.touched.othername && formik.errors.othername}
              />
            </div>
            <div className={EditProfilebStyles["double-column-fields"]}>
              <ReusableTextField
                label="Username"
                id="username"
                name="username"
                type={"text"}
                placeholder="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
              <ReusableTextField
                label="Email Address"
                id="email"
                name="email"
                type={"Email"}
                disabled
                placeholder="Youremail@gmail.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </div>

            <div className={EditProfilebStyles["double-column-fields"]}>
              <ReusableTextField
                label="Phone Number"
                id="phoneNumber"
                name="phoneNumber"
                type={"text"}
                placeholder="+234 0000 000 000"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />

            </div>

            <Button textInput={loading ? <Loader /> : "Update"} type="submit" />
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default EditProfile;
