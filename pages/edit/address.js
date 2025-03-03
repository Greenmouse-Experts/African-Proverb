import React, { useContext, useState, useEffect } from "react";
import EditProfilebStyles from "@/styles/EditProfile.module.scss";
import Navbar from "@/components/home/navbar";
import ReusableTextField from "@/components/reuse/textfield";
import { useFormik } from "formik";
import { EditAddressValiadtionSchema } from "@/utils";
import SelectDropdown from "@/components/reuse/selectDropdown";
import Button from "@/components/reuse/button";
import { Country, State } from "country-state-city";
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
import axios from "axios";
import { updateAddress } from "@/network/apiService";
import Loader from "@/components/reuse/loader";

const EditAddress = () => {
  const [loading, setLoading] = useState(false);
  const { personalInfo, error, address, setupdateInfo } =
    useContext(ProfileContext);

  const router = useRouter();
  const [countries, setCountries] = useState();
  const [states, setstates] = useState([]);

  const formik = useFormik({
    initialValues: {
      country: address?.data?.country || "",
      state: address?.data?.state || "",
      city: address?.data?.city || "",
      street: address?.data?.street || "",
      house_number: address?.data?.homeNumber || "",
      postal_code: address?.data?.postalCode || "",
    },

    validationSchema: EditAddressValiadtionSchema,
    onSubmit: (values) => {
      const addressData = {
        country: values.country,
        state: values.state,
        city: values.city,
        street: values.street,
        homeNumber: values.house_number,
        postalCode: values.postal_code,
      };

      setLoading(true);
      updateAddress(addressData)
        .then((res) => {
          if (res.status === 200) {
            toast.success(res.data.userMessages);
          }
          setLoading(false);
          setupdateInfo(true);
          router.push("/profile");
        })
        .catch((err) => {
          setLoading(false);
          toast.error("Failed to update profile. Please try again.");
        });

      formik.resetForm();
    },
  });

  const handleCountryChange = (value) => {
    const selectedCountryName = value;
    const selectedCountry = countries.find(
      (country) => country.name === selectedCountryName
    );

    setstates([]);
    if (selectedCountry) {
      const statesOfCountry = State.getStatesOfCountry(selectedCountry.isoCode);
      setstates(statesOfCountry);
    }

    formik.setFieldValue("country", selectedCountryName);
    formik.setFieldValue("state", "");
    formik.setFieldValue("city", "");
    formik.setFieldValue("street", "");
  };

  function handleBack() {
    Router.back();
  }

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);

    if (address?.data?.country) {
      const selectedCountry = allCountries.find(
        (country) => country.name === address?.data?.country
      );
      if (selectedCountry) {
        const statesOfCountry = State.getStatesOfCountry(
          selectedCountry.isoCode
        );
        setstates(statesOfCountry);

        formik.setFieldValue("state", address?.data?.state);
      }
    }
  }, []);

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
          <h1>Edit Address</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className={EditProfilebStyles["double-column-fields"]}>
              <SelectDropdown
                id="country"
                name="country"
                label="Country"
                value={formik.values.country}
                placeholder="Select country"
                onChange={(e) => handleCountryChange(e.target.value)}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.language && Boolean(formik.errors.country)
                }
                helperText={formik.touched.language && formik.errors.country}
              >
                {countries?.map((country) => {
                  return (
                    <MenuItem key={country.name} value={country.name}>
                      {country.name}
                    </MenuItem>
                  );
                })}
              </SelectDropdown>
              <SelectDropdown
                id="state"
                name="state"
                label="State"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
              >
                {states?.map((state) => {
                  return (
                    <MenuItem key={state.name} value={state.name}>
                      {state.name}
                    </MenuItem>
                  );
                })}
              </SelectDropdown>
            </div>
            <div className={EditProfilebStyles["double-column-fields"]}>
              <ReusableTextField
                label="City"
                id="city"
                name="city"
                type={"text"}
                placeholder="Enter City"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
              <ReusableTextField
                label="Street"
                id="street"
                name="street"
                type={"text"}
                placeholder="street"
                value={formik.values.street}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.street && Boolean(formik.errors.street)}
                helperText={formik.touched.street && formik.errors.street}
              />
            </div>
            <div className={EditProfilebStyles["double-column-fields"]}>
              <ReusableTextField
                label="House Number"
                id="house_number"
                name="house_number"
                type={"text"}
                placeholder="Enter house number"
                value={formik.values.house_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.house_number &&
                  Boolean(formik.errors.house_number)
                }
                helperText={
                  formik.touched.house_number && formik.errors.house_number
                }
              />
              <ReusableTextField
                label="Postal Code"
                id="postal_code"
                name="postal_code"
                type={"text"}
                placeholder="Enter postal code"
                value={formik.values.postal_code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.postal_code &&
                  Boolean(formik.errors.postal_code)
                }
                helperText={
                  formik.touched.postal_code && formik.errors.postal_code
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

export default EditAddress;
