import React, { useContext } from "react";
import PaymentBanner from "../payment/paymentBanner";
import CouponDropdown from "../payment/coupon_dropdown";
import PriceBreakdown from "../payment/price_breakdown";
import { PaymentContext } from "@/context/paymentContext";
import CouponPaymentButton from "../paymentButton/CouponPaymentButton";
import Payment from "./Payment";
import Button from "../reuse/button";

const CouponSelection = ({
  selectedPackage,
  handleMoveToPreviousPage,
  handleMoveToNextPage,
  updateModalTab,
  setPayment,
  payment,
}) => {
  const { selectedCoupon, subscribeMetadataCouponOnly } = useContext(PaymentContext);
  const validCouponValue = isNaN(Number(selectedCoupon?.couponValue))
    ? 0
    : Number(selectedCoupon?.couponValue);

  const handlePaymentCombinationType = () => {
    if (
      selectedPackage?.amount - validCouponValue ===
      selectedPackage?.amount
    ) {
      setPayment("CARD_PAYMENT");
    } else {
      setPayment("COMBINATION");
    }
  };


  return (
    <>
      <h1 onClick={handleMoveToPreviousPage}>Back</h1>
      <div className="flex gap-10 flex-col items-center md:flex-row">
        <div className="w-full md:w-[50%]">
          <PaymentBanner
            planObject={selectedPackage}
            selectedLanguages={[]}
            preferredLanguageName={""}
          />
        </div>

        <div className="w-full md:w-[50%]">
          <CouponDropdown />
          <PriceBreakdown
            subscriptionTotal={selectedPackage?.amount}
            couponValue={validCouponValue}
          />
          {validCouponValue >= selectedPackage?.amount && (
            <CouponPaymentButton
              transactionType="subscribe"
              handleMoveToNextPage={handleMoveToNextPage}
              updateModalTab={updateModalTab}
            />
          )}
          {validCouponValue < selectedPackage?.amount && (
            <div className="w-full mt-5">
              <Button
                // disabled={loading}
                // isLoading={loading}
                onClick={() => {
                  handleMoveToNextPage();
                  handlePaymentCombinationType();
                }}
                textInput="Proceed To Payment"
              ></Button>
            </div>
          )}
        </div>

        {/* <PaymentOptions /> */}
        {/* <GateWayPaymentButton type={"renew"} /> */}
      </div>
    </>
  );
};

export default CouponSelection;
