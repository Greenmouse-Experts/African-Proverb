import { AiOutlineArrowLeft } from "react-icons/ai";
import ConfirmPlanStyles from "../../styles/ConfirmPlan.module.scss";
import PaymentBanner from "../payment/paymentBanner";
import PaymentOptions from "../payment/payment_option";
import GateWayPaymentButton from "../paymentButton/paymentButton";


const ConfirmPlan = ({
  handleMoveToPreviousPage,
  planObject,
  typeofUpdgrade
}) => {

  return (
    <div className={ConfirmPlanStyles["wrapper"]}>
      <div
        onClick={handleMoveToPreviousPage}
        className={ConfirmPlanStyles["back-arrow"]}
      >
        <AiOutlineArrowLeft />
      </div>
      <PaymentBanner
        planObject={planObject}
        type={'upgrade'}
      />
      <PaymentOptions />
      <GateWayPaymentButton planObject={planObject} typeofUpdgrade={typeofUpdgrade} type={'upgrade'} />
    </div>
  );
};

export default ConfirmPlan;
