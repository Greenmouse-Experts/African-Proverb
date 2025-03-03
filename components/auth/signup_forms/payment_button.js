import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import MultiStepContext from "@/context/StepContext";
import { Registration } from "@/network/authService";
import Button from "@/components/reuse/button";

const PaymentButton = ({
  style,
  packagePrice,
  handleClose,
  formik,
  setPreferredLanguage,
}) => {
  const router = useRouter();

  const { finalData, setRegistrationSuccessModal } =
    useContext(MultiStepContext);

  const [loading, setLoading] = useState(false);

  // Initialize Paystack
  const handlePayment = () => {
    const paymentHandler = window.PaystackPop.setup({
      key: process.env.PAYSTACK_PUBLIC_KEY,
      email: finalData.email,
      amount: packagePrice * 100,
      metadata: {},
      onClose: () => console.log("Payment window closed."),
      callback: (response) => {
        let message = "Payment complete! Reference: " + response.reference;

        // Call the Registration function only when payment is successful
        // if (response.status === "success") {
        //   setLoading(true);
        //   Registration({ ...finalData, reference: response.reference })
        //     .then(async (data) => {
        //       handleClose();
        //       if (data) {
        //         setRegistrationSuccessModal(true);
        //         formik.resetForm();
        //         setPreferredLanguage("");
        //       }
        //       setLoading(false);
        //     })
        //     .catch((err) => {
        //       setLoading(false);
        //     });
        // }
      },
    });

    // Open the Paystack payment popup
    paymentHandler.openIframe();
  };

  const BUTTON_STYLES = {
    height: "50px",
    width: "100%",
    background: "#BB5D06",
    color: "#fff",
    border: "0",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div>
      <Script src="https://js.paystack.co/v1/inline.js" strategy="lazyOnload" />

      <Button isLoading={loading} textInput="Proceed With Payment" onClick={handlePayment} />
    </div>
  );
};

export default PaymentButton;
