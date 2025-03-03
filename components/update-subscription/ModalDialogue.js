import { PaymentContext } from "@/context/paymentContext";
import { useContext, useState } from "react";
import ConfirmPlan from "./ConfirmPlan";
import CouponStop from "./CouponStep";
import SelectPlan from "./SelectPlan";
import CouponSuccessUpgrade from "./CouponSuccessUpgrade";

const ModalDialogue = () => {
  const [modaltab, updateModalTab] = useState(1);
  const [selectedPlan, setselectedPlan] = useState();
  const [typeofUpdgrade, setTypeofUpgrade] = useState("FULL");
  const [currentPackageAmount, setcurrentPackageAmount] = useState(null);

  const { setSelectedCoupon } = useContext(PaymentContext);

  const handleSetTypeofUpgrade = (type) => {
    setTypeofUpgrade(type);
  };
  const handleMoveToNextPage = () => {
    if (modaltab < 4) {
      updateModalTab(modaltab + 1);
    } else return;
  };

  function handleSelectPlan(plan) {
    setselectedPlan(plan);
  }
  const handleMoveToPreviousPage = () => {
    if (modaltab > 0) {
      updateModalTab(modaltab - 1);
    } else return;
  };


  return (
    <>
      {modaltab === 1 && (
        <SelectPlan
          handleSelectPlan={handleSelectPlan}
          selectedPlan={selectedPlan}
          handleMoveToNextPage={handleMoveToNextPage}
          typeofUpdgrade={typeofUpdgrade}
          setTypeofUpgrade={handleSetTypeofUpgrade}
          setcurrentPackageAmount={setcurrentPackageAmount}
          currentPackageAmount={currentPackageAmount}
        />
      )}

      {modaltab === 2 && (
        <CouponStop
          selectedPackage={selectedPlan}
          handleMoveToPreviousPage={handleMoveToPreviousPage}
          handleMoveToNextPage={handleMoveToNextPage}
          typeofUpdgrade={typeofUpdgrade}
          currentPackageAmount={currentPackageAmount}
          updateModalTab={updateModalTab}
        />
      )}

      {modaltab === 3 && (
        <ConfirmPlan
          handleMoveToPreviousPage={handleMoveToPreviousPage}
          planObject={selectedPlan}
          typeofUpdgrade={typeofUpdgrade}
        />
      )}

{modaltab === 4 && (
        <CouponSuccessUpgrade/>
      )}
    </>
  );
};

export default ModalDialogue;
