import { PaymentContext } from "@/context/paymentContext";
import { initiatePaystackPayment } from "@/network/paystackService";
import ConfirmPlanStyles from "@/styles/ConfirmPlan.module.scss";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { toast } from "react-toastify";
import Button from "../reuse/button";

const PaystackPaymentButton = ({
  type,
  upgradeMetadata,
  subscribeMetadata,
  setSubscribeMetadata,
  renewalMetadata,
}) => {
  const router = useRouter();
  const [paystackLoading, setPaystackLoading] = useState(false);

  const {
    isPaymentAutoRenewed,

    setSelectedCoupon,
  } = useContext(PaymentContext);

  const initializeOutrightPayment = () => {
    setPaystackLoading(true);
    initiatePaystackPayment(
      type === "subscribe"
        ? subscribeMetadata
        : type === "renew"
        ? renewalMetadata
        : type === "upgrade"
        ? upgradeMetadata
        : ""
    )
      .then(({ data }) => {
        router.push(data.data.authorization_url);
        setPaystackLoading(false);
        setSelectedCoupon({});
      })
      .catch((error) => {
        toast.error("an error occured fetching results");
        setPaystackLoading(false);
      });
  };

  return (
    <>
      {isPaymentAutoRenewed ? (
        <button className={ConfirmPlanStyles["button"]}>
          Proceed to pay Recurring <AiOutlineArrowRight />
        </button>
      ) : (
        <Button
          onClick={initializeOutrightPayment}
          textInput={"Proceed to pay with paystack"}
          isLoading={paystackLoading}
          disabled={paystackLoading}
        ></Button>
        // <PaystackButton
        //   className={ConfirmPlanStyles["button"]}
        //   {...componentProps}
        // />
      )}
    </>
  );
};

export default PaystackPaymentButton;
