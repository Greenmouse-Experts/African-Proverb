import { PaymentContext } from "@/context/paymentContext";
import useStripe from "@/hooks/useStripe";
import { useContext } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import {RiLoader4Fill } from 'react-icons/ri'
import ConfirmPlanStyles from "../../styles/ConfirmPlan.module.scss";


const StripePaymentButton = ({ planObject, typeofUpdgrade, type,  subscribeMetadata,renewalMetadata }) => {
  const { isPaymentAutoRenewed } = useContext(PaymentContext);
  const { handleStripeButtonClicked, isLoading } = useStripe(
    isPaymentAutoRenewed,
    typeofUpdgrade,
    planObject,
    type,
    subscribeMetadata,
    renewalMetadata
  );

  return (
    <div className="flex flex-col gap-5">
      <button
        onClick={handleStripeButtonClicked}
        className={ConfirmPlanStyles["button"]}
      >
        Proceed to pay With Stripe
        {isLoading ? <RiLoader4Fill className="animate-spin" /> : <AiOutlineArrowRight />}
      </button>

    </div>
  );
};

export default StripePaymentButton;
