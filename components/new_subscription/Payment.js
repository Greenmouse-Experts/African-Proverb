import React, { useContext } from "react";
import PaymentOptions from "../payment/payment_option";
import PaymentBanner from "../payment/paymentBanner";
import GateWayPaymentButton from "../paymentButton/paymentButton";
import MultiStepContext from "@/context/StepContext";

const Payment = ({ handleMoveToPreviousPage, selectedPackage, payment }) => {
  const { selectedLanguages } = useContext(MultiStepContext);

  const preferredLanguageName = "";

  return (
    <div>
      <h1 onClick={handleMoveToPreviousPage}>Back</h1>
      <PaymentBanner
        planObject={selectedPackage}
        selectedLanguages={selectedLanguages}
        preferredLanguageName={preferredLanguageName}
      />
      <PaymentOptions />
      <GateWayPaymentButton payment={payment} type="subscribe" />
    </div>
  );
};

export default Payment;
