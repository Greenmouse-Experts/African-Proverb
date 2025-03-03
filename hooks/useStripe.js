import { PaymentContext } from "@/context/paymentContext";
import { createStripeSession } from "@/network/stripeService";
import { AxiosError } from "axios";
import { stubFalse } from "lodash";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { paymentCurrencies } from "./useCurrency";

const useStripe = (
  isPaymentAutoRenewed,
  typeofUpdgrade,
  planObject,
  type,
  subscribeMetadata,
  renewalMetadata
) => {
  const [isLoading, setIsLoading] = useState(stubFalse);
  const { currency } = useContext(PaymentContext);
  const { selectedCoupon } = useContext(PaymentContext);

  ///====COMMMENTED CODE ARE CODE FOR INITIAL VALIDATION=============================
  // const handlePayloadPrepForValidation = (type) => {
  //   let {
  //     fullDetails: {
  //       data: { email },
  //     },
  //   } = data;
  //   if (type === "upgrade") {
  //     return {
  //       transaction_type: "UPGRADE",
  //       upgrade: {
  //         upgradeType: typeofUpdgrade,
  //         packageId: planObject.id,
  //         email,
  //       },
  //     };
  //   }
  // }
  // const handleValidatePaymentData = async (type) => {
  //   if (!data) return;
  //   try {
  //     const payload = handlePayloadPrepForValidation(type);
  //     const response = await validateUpgradeData(payload, type);
  //     return response;
  //   } catch (e) {
  //     if (e instanceof AxiosError) {
  //       console.log(e);
  //       if (e.response.status === 400) {
  //         toast.error(e.response.data.userMessages);
  //       }
  //     }
  //   }
  // };
  ///====COMMMENTED CODE ARE CODE FOR INITIAL VALIDATION=============================

  const currencyCodes = {
    [paymentCurrencies.dollar]: "USD",
    [paymentCurrencies.naira]: "NGN",
  };

  const handlePayloadPrepForSession = (type) => {
    if (type === "upgrade") {
      const payload = {
        transaction_type: "UPGRADE",
        currencyCode: currencyCodes[currency],
        //this means so long we get here and there's a coupon code it's a combination payment
        payment:
          selectedCoupon && parseFloat(selectedCoupon.couponValue) > 0
            ? "combination"
            : "card_payment",
        // currencyCode:selectedCoupon,
        payment_type: "stripe",
        upgrade: {
          upgradeType: typeofUpdgrade,
          packageId: planObject.id,
        },
      };

      //since it's a combination payment add the coupon code to the payload
      if (selectedCoupon && parseFloat(selectedCoupon.couponValue) > 0) {
        payload.couponCode = selectedCoupon.couponCode;
      }

      return payload;
    }
  };

  const handleCreatePaymentSession = async (isPaymentAutoRenewed, type) => {
    let payload;
    try {
      //1 PREPARE THE PAYLOAD
      if (type === "subscribe") payload = subscribeMetadata;
      else if (type === "renew") payload = renewalMetadata;
      else payload = handlePayloadPrepForSession(type);
      //CREATE SESSION
      const response = await createStripeSession(
        payload,
        isPaymentAutoRenewed,
        type
      );
      return response;
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e);
        throw e;
      }
    }
  };

  const handleStripeButtonClicked = async () => {
    setIsLoading(true);
    try {
      //create session
      const response = await handleCreatePaymentSession(
        isPaymentAutoRenewed,
        type
      );

      if (response.status === 200) {
        const {
          data: { url },
        } = response;
        window.open(url, "_blank");
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e);
        if (e.response.status === 400) {
          toast.error(e.response.data.data.message);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { handleStripeButtonClicked, isLoading };
};

export default useStripe;
