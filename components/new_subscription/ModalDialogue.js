import { PaymentContext } from "@/context/paymentContext";
import { useContext, useState } from "react";
import CouponSelection from "./CouponSelection";
import Payment from "./Payment";
import NewSubscriptionForm from "./newSubscriptionForm";
import { useFormik } from "formik";
import { validationSchema } from "@/utils";
import CouponPaymentSuccess from "./coupon_payment_success";
// import SelectPlan from "./SelectPlan";
// import SelectLanguages from "./SelectLanguages";
// import ConfirmPlan from "./ConfirmPlan";

const ModalDialogue = ({ selectedPackage, setShowPopup }) => {
  const [modaltab, updateModalTab] = useState(1);
  const [payment, setPayment] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { selectedCoupon } = useContext(PaymentContext);


  const formik = useFormik({
    initialValues: {
      ethnics: [],
      preferredEthnic: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
    selectedPackage,
    selectedPlan,
    setSelectedPlan,
    handleMoveToNextPage,
    handleMoveToPreviousPage,
    updateModalTab,
    formik,
    setPayment,
    payment,
    setShowPopup
  };


  return (
    <>
      {modaltab === 1 && <NewSubscriptionForm {...commonProps} />}
      {modaltab === 2 && <CouponSelection {...commonProps} />}
      {modaltab === 3 && <Payment {...commonProps} />}
      {modaltab === 4 && <CouponPaymentSuccess {...commonProps} />}
    </>
  );
};

export default ModalDialogue;
