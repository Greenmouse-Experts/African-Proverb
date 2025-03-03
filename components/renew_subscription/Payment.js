import React, { useContext } from "react";
import PaymentOptions from "../payment/payment_option";
import PaymentBanner from "../payment/paymentBanner";
import GateWayPaymentButton from "../paymentButton/paymentButton";
import MultiStepContext from "@/context/StepContext";

const Payment = ({
  handleMoveToPreviousPage,
  selectedPlan,
  payment,
  preferredLanguage,
  renewMetadataCouponOnly,
  currentPlan
}) => {
  const { selectedLanguages } = useContext(MultiStepContext);

  const preferredLanguageName = "";

  return (
    <div>
      <h1 onClick={handleMoveToPreviousPage}>Back</h1>
      <PaymentBanner
        planObject={selectedPlan}
        selectedLanguages={selectedLanguages}
        preferredLanguageName={preferredLanguage}
      />
      <PaymentOptions />
      <GateWayPaymentButton
        payment={payment}
        type="renew"
        currentPlan={currentPlan}
      />
    </div>
  );
};

export default Payment;
