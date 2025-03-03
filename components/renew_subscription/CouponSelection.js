import React, { useContext, useEffect } from "react";
import PaymentBanner from "../payment/paymentBanner";
import CouponDropdown from "../payment/coupon_dropdown";
import PriceBreakdown from "../payment/price_breakdown";
import { PaymentContext } from "@/context/paymentContext";
import CouponPaymentButton from "../paymentButton/CouponPaymentButton";
import Button from "../reuse/button";

const CouponSelection = ({
  selectedPlan,
  handleMoveToPreviousPage,
  handleMoveToNextPage,
  updateModalTab,
  setPayment,
  filteredEthnic,
  payment,
  preferredLanguage,
  renewMetadataCouponOnly,
  currentPlan,
  setRenewMetadataCouponOnly,
}) => {
  const { selectedCoupon } = useContext(PaymentContext);
  const validCouponValue = isNaN(Number(selectedCoupon?.couponValue))
    ? 0
    : Number(selectedCoupon?.couponValue);

  const handlePaymentCombinationType = () => {
    if (selectedPlan?.amount - validCouponValue === selectedPlan?.amount) {
      setPayment("CARD_PAYMENT");
    } else {
      setPayment("COMBINATION");
    }
  };

  useEffect(() => {
    setRenewMetadataCouponOnly({
      transaction_type: "RENEW",
      couponCode: selectedCoupon?.couponCode,
      renewal: {
        packageID: "0451c295-e9c9-47bc-b4d2-8fa2966d13f1",
        selectedEthnic: currentPlan?.selectedEthnic,
        preferredEthnic: currentPlan?.preferredEthnic,
      },
    });
  }, []);

  return (
    <>
      <h1 onClick={handleMoveToPreviousPage}>Back</h1>
      <div className="flex gap-10 flex-col items-center md:flex-row">
        <div className="w-full md:w-[50%]">
          <PaymentBanner
            planObject={selectedPlan}
            selectedLanguages={filteredEthnic}
            preferredLanguageName={preferredLanguage}
          />
        </div>

        <div className="w-full md:w-[50%]">
          <CouponDropdown />
          <PriceBreakdown
            subscriptionTotal={selectedPlan?.amount}
            couponValue={validCouponValue}
          />
          {validCouponValue && validCouponValue >= selectedPlan?.amount ? (
            <CouponPaymentButton
              transactionType="renew"
              handleMoveToNextPage={handleMoveToNextPage}
              updateModalTab={updateModalTab}
              renewMetadataCouponOnly={renewMetadataCouponOnly}
            />
          ) : (
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
      </div>
    </>
  );
};

export default CouponSelection;
