import { PaymentContext } from "@/context/paymentContext";
import { ProfileContext } from "@/context/profileContext";
import { useContext, useEffect, useState } from "react";
import PaypalPaymentButton from "./PaypalPaymentButton";
import PaystackPaymentButton from "./PaystackPaymentButton";
import StripePaymentButton from "./StripePaymentButton";
import { paymentCurrencies } from "@/hooks/useCurrency";

const GateWayPaymentButton = ({
  planObject,
  typeofUpdgrade,
  type,
  payment,
  currentPlan,
}) => {
  const {
    isPaymentAutoRenewed,
    subscribeMetadataCouponOnly,
    paymentOption,
    selectedCoupon,
    currency,
  } = useContext(PaymentContext);
  const { fullDetails } = useContext(ProfileContext);
  const [upgradeMetadata, setUpgradeMetadata] = useState({});
  const [subscribeMetadata, setSubscribeMetadata] = useState({});
  const [renewalMetadata, setRenewalMetadata] = useState("");

  const currencyCodes = {
    [paymentCurrencies.dollar]: "USD",
    [paymentCurrencies.naira]: "NGN",
  };

  useEffect(() => {
    setSubscribeMetadata({
      transaction_type: subscribeMetadataCouponOnly?.transaction_type,
      payment: payment,
      payment_type: paymentOption?.toUpperCase(),
      couponCode: subscribeMetadataCouponOnly?.couponCode,
      currencyCode: paymentOption === "paystack" ? "NGN" : "USD",
      subscribe: {
        packageId: subscribeMetadataCouponOnly?.subscribe?.packageId,
        selectedEthnic: subscribeMetadataCouponOnly?.subscribe?.selectedEthnic,
        preferredEthnic:
          subscribeMetadataCouponOnly?.subscribe?.preferredEthnic,
        email: fullDetails?.data?.email,
      },
    });
  }, [paymentOption]);

  useEffect(() => {
    setRenewalMetadata({
      transaction_type: "RENEW",
      payment: payment, // card_payment, combination
      payment_type: paymentOption?.toUpperCase(),
      couponCode: selectedCoupon?.couponCode,
      currencyCode: paymentOption === "paystack" ? "NGN" : "USD",
      renewal: {
        packageID: currentPlan?.package_, // this is required if payment_type is payment
        selectedEthnic: currentPlan?.selectedEthnic,
        preferredEthnic: currentPlan?.preferredEthnic,
      },
    });
  }, [paymentOption]);

  useEffect(() => {
    setUpgradeMetadata({
      transaction_type: "UPGRADE",
      // currencyCode: currencyCodes[currency],
      currencyCode: paymentOption === "paystack" ? "NGN" : "USD",
      couponCode: selectedCoupon?.couponCode,
      //this means so long we get here and there's a coupon code it's a combination payment
      payment:
        selectedCoupon && parseFloat(selectedCoupon?.couponValue) > 0
          ? "combination"
          : "card_payment",
      // currencyCode:selectedCoupon,
      payment_type: paymentOption,
      upgrade: {
        upgradeType: typeofUpdgrade,
        packageId: planObject?.id,
      },
    });
  }, [typeofUpdgrade, paymentOption, planObject]);

  let paymentButtonComponent = null;

  if (paymentOption === "paystack") {
    paymentButtonComponent = (
      <PaystackPaymentButton
        upgradeMetadata={upgradeMetadata}
        type={type}
        subscribeMetadata={subscribeMetadata}
        setSubscribeMetadata={setSubscribeMetadata}
        renewalMetadata={renewalMetadata}
      />
    );
  } else if (paymentOption === "paypal") {
    paymentButtonComponent = (
      <PaypalPaymentButton
        upgradeMetadata={upgradeMetadata}
        type={type}
        subscribeMetadata={subscribeMetadata}
        renewalMetadata={renewalMetadata}
      />
    );
  } else {
    paymentButtonComponent = (
      <StripePaymentButton
        subscribeMetadata={subscribeMetadata}
        renewalMetadata={renewalMetadata}
        planObject={planObject}
        typeofUpdgrade={typeofUpdgrade}
        type={type}
      />
    );
  }

  return paymentButtonComponent;
};

export default GateWayPaymentButton;
