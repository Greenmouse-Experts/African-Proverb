import MultiStepContext from "@/context/StepContext";
import { PaymentContext } from "@/context/paymentContext";
import { payWithCoupon } from "@/network/couponsService";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import Button from "../reuse/button";

const CouponPaymentButton = ({
  transactionType,
  handleMoveToNextPage,
  updateModalTab,
  typeofUpdgrade,
  packageId,
  renewMetadataCouponOnly,
}) => {
  const {
    subscribeMetadata,
    setSubscribeMetadata,
    selectedCoupon,
    subscribeMetadataCouponOnly,
    setSubscribeMetadataCouponOnly,

    setSelectedCoupon,
  } = useContext(PaymentContext);
  const { setSelectedLanguage } = useContext(MultiStepContext);
  const [loading, setLoading] = useState(false);

  const callUpgradeAPI = () => {
    setLoading(true);
    // Implement the API call for 'upgrade' here
    payWithCoupon({
      transaction_type: "UPGRADE",
      couponCode: selectedCoupon.couponCode,
      upgrade: {
        packageId: packageId,
        upgradeType: typeofUpdgrade,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          updateModalTab(4);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const callRenewAPI = () => {
    setLoading(true);
    payWithCoupon({
      ...renewMetadataCouponOnly,
      couponCode: selectedCoupon.couponCode,
    })
      .then((res) => {
        if (res.status === 200) {
          // setSubscribeMetadataCouponOnly({});
          // setSelectedCoupon({});
          // setSelectedLanguage([]);
          setLoading(false);
          handleMoveToNextPage();
          updateModalTab(4);
        }
      })
      .catch((err) => {
        // toast.error(err.response.data.data.message);
        setLoading(false);
      });
  };

  const callSubscribeAPI = () => {
    setLoading(true);
    payWithCoupon(subscribeMetadataCouponOnly)
      .then((res) => {
        if (res.status === 200) {
          setSubscribeMetadataCouponOnly({});
          setSelectedCoupon({});
          setSelectedLanguage([]);
          setLoading(false);
          handleMoveToNextPage();
          updateModalTab(4);
        }
      })
      .catch((err) => {
        // toast.error(err.response.data.data.message);
        setLoading(false);
      });
  };

  const handleButtonClick = () => {
    if (transactionType === "upgrade") {
      callUpgradeAPI();
    } else if (transactionType === "renew") {
      callRenewAPI();
    } else if (transactionType === "subscribe") {
      callSubscribeAPI();
    }
  };

  return (
    <div className="mt-5">
      <Button
        disabled={loading}
        isLoading={loading}
        onClick={handleButtonClick}
        textInput={
          transactionType === "upgrade"
            ? "UPGRADE WITH COUPON"
            : transactionType === "renew"
            ? "RENEW WITH COUPON "
            : transactionType === "subscribe"
            ? "SUBSCRIBE WITH COUPON"
            : ""
        }
      ></Button>
    </div>
  );
};

export default CouponPaymentButton;
