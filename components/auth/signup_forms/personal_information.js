import Button from "@/components/reuse/button";
import ReusableTextField from "@/components/reuse/textfield";
import MultiStepContext from "@/context/StepContext";
import { verifyPhoneNUmber } from "@/network/apiService";
import styles from "@/styles/Signup.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import AuthHeader from "../auth_header";

const PersonalInformation = ({ formik }) => {
  const { setStep } = useContext(MultiStepContext);
  const [phoneExists, setPhoneExists] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isPhoneChecked, setIsPhoneChecked] = useState(false);
  const router = useRouter();

  const { freeTrial } = router.query;

  useEffect(() => {
    const verifyPhoneNumberAsync = async () => {
      try {
        setIsLoading(true);
        const res = await verifyPhoneNUmber(formik.values.phoneNumber);
        setPhoneExists(true);
      } catch (error) {
        setPhoneExists(false);
      } finally {
        setIsLoading(false);
        setIsPhoneChecked(true);
      }
    };

    if (formik.values.phoneNumber) {
      verifyPhoneNumberAsync();
    } else {
      setIsPhoneChecked(false);
    }
  }, [formik.values.phoneNumber]);

  const isButtonDisabled = () => {
    return (
      !formik.values.firstName ||
      !formik.values.lastName ||
      !formik.values.phoneNumber ||
      Boolean(formik.errors.firstName) ||
      Boolean(formik.errors.lastName) ||
      Boolean(formik.errors.phoneNumber) ||
      phoneExists ||
      isLoading ||
      !isPhoneChecked
    );
  };
  useEffect(() => {
    formik.validateForm({
      firstName: formik.values.firstName,
      lastName: formik.values.lastName,
      phoneNumber: formik.values.phoneNumber,
    });
  }, [formik.values.firstName, formik.values.lastName, formik.values.phoneNumber]);



  return (
    <div>
      <AuthHeader headerText="Create an Account" />
      {freeTrial && (
        <p className="text-center text-black font-thin mb-5 text-sm">
          Get Free 30 days of our Premium plan by signing up
        </p>
      )}

      <form>
        <ReusableTextField
          icon="user"
          label="First Name"
          id="firstName"
          name="firstName"
          type={"text"}
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />

        <ReusableTextField
          icon="user"
          label="Last Name"
          id="lastName"
          name="lastName"
          type={"text"}
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />

        <ReusableTextField
          icon="call"
          label="Phone Number"
          id="phoneNumber"
          name="phoneNumber"
          type={"text"}
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
          helperText={
            (formik.touched.phoneNumber && formik.errors.phoneNumber)
          }
          inputProps={{
            maxLength: 15,
          }}
        />

        {phoneExists && (
          <p style={{ color: "red", marginBottom: "1rem" }}>
            The phone number you've entered is already in use. Please enter a different phone number to proceed.
          </p>
        )}

        <Button
          disabled={isButtonDisabled()}
          onClick={() => setStep(2)}
          type="button"
          textInput={isLoading ? "Loading..." : "Next"}
        />

        <p className={styles["signin-link"]}>
          Already have an account?{" "}
          <Link href={"/auth/login"}>
            <span>Sign In</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default PersonalInformation;
