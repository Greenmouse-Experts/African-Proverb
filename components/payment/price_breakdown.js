import { Loader2 } from "lucide-react";

const PriceBreakdown = ({
  subscriptionTotal,
  couponValue,
  typeofUpdgrade,
  amoutPayableDiff,
  isDiffLoading,
  shouldPayWithCoupon,
}) => {
  const couponValuedAt = couponValue ? couponValue : 0;

  return (
    <div className="border-dashed border-2 border-[#BB5D06] p-5 mt-5">
      <div className="flex justify-between">
        <p className="text-[#707070] text-sm">Subscription Total</p>
        <p className="text-sm font-bold">${subscriptionTotal}</p>
      </div>
      <div className="h-px bg-[#707070] w-full"></div>
      <div className="flex justify-between mt-2">
        <p className="text-[#707070] text-sm">Coupon Value</p>
        <p className="text-sm font-bold">${couponValuedAt}</p>
      </div>
      <div className="h-px bg-[#707070] w-full"></div>
      <div className="flex justify-between mt-2">
        <p className="text-[#707070] text-sm">
          Amount To Pay{" "}
          <span className="font-bold text-black">
            {typeofUpdgrade === "DIFF" && "(DIFF)"}
          </span>
        </p>
        <p
          className={`flex gap-2 text-sm font-bold ${
            shouldPayWithCoupon ? "line-through" : ""
          }`}
        >
          $
          {typeofUpdgrade ? (typeofUpdgrade === "FULL" ? (
            shouldPayWithCoupon ? (
              subscriptionTotal
            ) : (
              Math.abs(subscriptionTotal - couponValuedAt)
            )
          ) : isDiffLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            amoutPayableDiff
          )):Math.abs(subscriptionTotal - couponValuedAt)}
        </p>
      </div>
    </div>
  );
};

export default PriceBreakdown;
