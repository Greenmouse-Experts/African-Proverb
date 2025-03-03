import { useEffect, useState } from "react";
import RenewSubscriptionForm from "./renewSubscriptionForm";
import Payment from "./Payment";
import CouponSelection from "./CouponSelection";
import CouponPaymentSuccess from "../new_subscription/coupon_payment_success";
// import SelectPlan from "./SelectPlan";
// import SelectLanguages from "./SelectLanguages";
// import ConfirmPlan from "./ConfirmPlan";

const ModalDialogue = ({
  selectedPlan,
  filteredEthnic,
  preferredLanguage,
  currentPlan,
  setOpen,
}) => {
  const [modaltab, updateModalTab] = useState(1);
  const [payment, setPayment] = useState("");
  const [renewMetadataCouponOnly, setRenewMetadataCouponOnly] = useState({});

  const handleMoveToNextPage = () => {
    if (modaltab < 3) {
      updateModalTab(modaltab + 1);
    } else return;
  };

  const handleMoveToPreviousPage = () => {
    if (modaltab > 1) {
      updateModalTab(modaltab - 1);
    } else return;
  };

  const commonProps = {
    selectedPlan,
    filteredEthnic,
    handleMoveToNextPage,
    handleMoveToPreviousPage,
    updateModalTab,
    setPayment,
    payment,
    preferredLanguage,
    renewMetadataCouponOnly,
    setRenewMetadataCouponOnly,
    currentPlan,
    setOpen,
  };

  return (
    <>
      {modaltab === 1 && <RenewSubscriptionForm {...commonProps} />}
      {modaltab === 2 && <CouponSelection {...commonProps} />}
      {modaltab === 3 && <Payment {...commonProps} />}
      {modaltab === 4 && <CouponPaymentSuccess {...commonProps} />}
    </>
  );
};

export default ModalDialogue;
