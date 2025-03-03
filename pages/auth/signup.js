import React, { useContext, useEffect, useState } from "react";
import PersonalInformation from "@/components/auth/signup_forms/personal_information";
import SubscriptionPlanInformation from "@/components/auth/signup_forms/subscription_plan_information";
import AuthWrapper from "@/components/auth/auth_wrapper";
import MultiStepContext from "@/context/StepContext";
import { useFormik } from "formik";
import { validationSchema } from "@/utils";
import { Registration, ValidateRegistrationData } from "@/network/authService";
import { toast } from "react-toastify";
import { PaymentContext } from "@/context/paymentContext";
import { useRouter } from "next/router";

const SignUp = () => {
  const [paymentBannerOpen, setPaymentBannerOpen] = useState(false);
  const [registrationLoading, setRegistrationLoading] = useState(false);

  const {
    currentStep,
    selectedLanguage,
    finalData,
    setFinalData,
    setStep,
    registrationSuccessModal,
    setRegistrationSuccessModal,
  } = useContext(MultiStepContext);
  const { paymentOption } = useContext(PaymentContext);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password1: "",
      password2: "",
      // packageId: "",
      reference: "",
      ethnics: [],
      username: "",
      preferredEthnic: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      otherName: "",
      dateOfBirth: "",
      promoCode: null,
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      const registrationData = {
        register: {
          email: values.email,
          password1: values.password1,
          password2: values.password2,
          // packageId: values.packageId,
          ethnics: selectedLanguage,
          preferredEthnic: selectedLanguage[0],
          profile: {
            username: "",
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber,
            otherName: values.otherName,
            dateOfBirth: values.dateOfBirth,
            reg_promo_code: values.promoCode || null,
          },
        },
        transaction_type: "REGISTER",
      };

      // ValidateRegistrationData(registrationData)
      //   .then((res) => {
      //     if (res.status === 201) {
      //       setFinalData(registrationData);
      //       setPaymentBannerOpen(true);
      //     }
      //     if (res.status === 500) {
      //       // console.log(res.response)
      //     }
      //   })
      //   .catch((err) => {
      //     toast.error(err.response.data.data.error);
      //   });
      setRegistrationLoading(true);
      Registration(registrationData.register)
        .then((res) => {
          if (res.status === 201) {
            console.log(res);
            // setPaymentBannerOpen(true);
            
            // setRegistrationSuccessModal(true);
            
            router.push(`/register_payment_success/?email=${registrationData?.register?.email}&linkOrigin=signup`);
            setRegistrationLoading(false);
          }
          if (res.status === 500) {
            // console.log(res.response)
          }
        })
        .catch((err) => {
          setRegistrationLoading(false);

          console.log(err);
          toast.error(err?.response?.data?.data?.message);
        });

      // formik.resetForm();
    },
  });

  function showStep(step) {
    switch (step) {
      case 1:
        return <PersonalInformation formik={formik} />;
      case 2:
        return (
          <SubscriptionPlanInformation
            paymentBannerOpen={paymentBannerOpen}
            setPaymentBannerOpen={setPaymentBannerOpen}
            formik={formik}
            registrationLoading={registrationLoading}
          />
        );
    }
  }

  useEffect(() => {
    if (registrationSuccessModal) {
      formik.resetForm();
    }
    setRegistrationSuccessModal(false);
  }, [registrationSuccessModal]);

  return (
    <AuthWrapper headerText="Create an Account">
      {showStep(currentStep)}
    </AuthWrapper>
  );
};

export default SignUp;
