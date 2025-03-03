import { PaymentContext } from "@/context/paymentContext";
import { getCouponAmountDiff } from "@/network/couponsService";
import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import CouponDropdown from "../payment/coupon_dropdown";
import PaymentBanner from "../payment/paymentBanner";
import PriceBreakdown from "../payment/price_breakdown";
import CouponPaymentButton from "../paymentButton/CouponPaymentButton";

const CouponStop = ({
  selectedPackage,
  handleMoveToPreviousPage,
  handleMoveToNextPage,
  typeofUpdgrade,
  currentPackageAmount,
  updateModalTab
}) => {
  const { selectedCoupon } = useContext(PaymentContext);
  const [amoutPayableDiff, setAmountPayableDiff] = useState(null);
  const [isDiffLoading, setIsDiffLoading] = useState(false);

  //FUNCTION RETURNS A BOOLEAN VALUE THAT DETERMINES IF THE BUTTON SHOULD LEAD TO PAYMENT GATEWAY OR FULL ON COUPON PAYMENT
  const handleShouldShowCouponButton = (
    selectedPlanAmount,
    couponAmount,
    type
  ) => {
    //1.FULL UPGRADE TYPE,COUPON ONLY I.E COUPON CAN CATER FOR THE PAYMENT
    if (couponAmount >= selectedPlanAmount && type === "FULL") {
      return true;
    }
    //2.FULL UPGRADE TYPE, COMBINED PAYMENT. COUPON CANT CATER FOR THE ENTIRE PAYMENT
    else if (couponAmount < selectedPlanAmount && type === "FULL") {
      return false;
    }

    // 3. DIFF UPGRADE TYPE, COUPON ONLY. THE  COMPARISON IS DONE WITH THE DIFFERENCE BETWEEN CURRENT PLAN AND INTENDED PLAN TO BE UPGRADED TO
    else if (
      couponAmount >= (selectedPlanAmount - currentPackageAmount) && type === "DIFF"
    ) {
      return true;
    }
    // 3. DIFF UPGRADE TYPE, COMBINED PAY. THE  COMPARISON IS DONE WITH THE DIFFERENCE BETWEEN CURRENT PLAN AND INTENDED PLAN TO BE UPGRADED TO
    else if (
      couponAmount < (selectedPlanAmount - currentPackageAmount) && type === "DIFF"
    ) {
      return false;
    }
  };

  
  // THIS USE EFFECT CONTROLS THE REQUEST TO THE DIFFERNTIAL ENDPOINTS
  useEffect(() => {
    const handlePayByDiff = async () => {
      setIsDiffLoading(true);

      let payload, typeOfDiff;
      if (typeofUpdgrade === "FULL" || !selectedPackage) return;

      if (typeofUpdgrade === "DIFF" && !selectedCoupon) {
        //u want to pay with diff and u didnt select a coupon...so full card payment differential
        payload = {
          desiredPackageId: selectedPackage.id,
        };
        typeOfDiff = "FULLCARDDIFF";
      } else if (
        typeofUpdgrade === "DIFF" &&
        selectedCoupon.couponValue >=
          selectedPackage?.amount - currentPackageAmount
      ) {
        payload = {
          couponCode: selectedCoupon.couponCode,
          desiredPackageId: selectedPackage.id,
        };
        typeOfDiff = "FULLCOUPONDIFF";
      } else if (
        typeofUpdgrade === "DIFF" &&
        selectedCoupon.couponValue <
          selectedPackage?.amount - currentPackageAmount
      ) {
        payload = {
          couponCode: selectedCoupon.couponCode,
          desiredPackageId: selectedPackage.id,
        };
        typeOfDiff = "CARDCOUPONDIFF";
      }
      try {
        const response = await getCouponAmountDiff(payload, typeOfDiff);
        if (response.status === 200) {
          setAmountPayableDiff(response.data.message);
        }
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.response.status.toString().startsWith("4")) {
            return toast.error(e.response.data.data.message);
          }
        }
        toast.error("Error Fetching Amount,Try again ");
      } finally {
        setIsDiffLoading(false);
      }
    };
    handlePayByDiff();
  }, [
    selectedPackage,
    typeofUpdgrade,
    selectedCoupon,
    selectedPackage?.amount,
    currentPackageAmount,
  ]);

  //IMPLEMENTS THE HANDLESHOULDSHOUWCOUPONBUTTONFUNCTION ABOVE
  const shouldShowCouponButton = handleShouldShowCouponButton(
    parseFloat(selectedPackage?.amount),
    parseFloat(selectedCoupon?.couponValue),
    typeofUpdgrade
  );

  return (
    <>
      <span onClick={handleMoveToPreviousPage} className="cursor-pointer">
        Back
      </span>
      <div className="flex flex-col items-center gap-10 md:flex-row">
        <div className="w-full md:w-[50%]">
          <PaymentBanner planObject={selectedPackage} type="upgrade" />
        </div>

        <div className="w-full md:w-[50%]">
          <CouponDropdown />
          <PriceBreakdown
            subscriptionTotal={selectedPackage?.amount}
            typeofUpdgrade={typeofUpdgrade}
            amoutPayableDiff={amoutPayableDiff}
            isDiffLoading={isDiffLoading}
            shouldPayWithCoupon={shouldShowCouponButton}
            couponValue={
              selectedCoupon?.couponValue &&
              parseFloat(selectedCoupon?.couponValue)
            }
          />
          {shouldShowCouponButton ? (
            <CouponPaymentButton transactionType="upgrade" typeofUpdgrade={typeofUpdgrade} packageId={selectedPackage.id} updateModalTab={updateModalTab} />
          ) : (
            <div className="mt-6">
              <button
                onClick={handleMoveToNextPage}
                className="p-3 px-10 w-full text-white rounded-md text-sm  bg-[#BB5D06] selected-button-disabled"
              >
                Proceed to Pay
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CouponStop;
