
import { useEffect, useState } from "react";

import Coupon from "./Coupon";
import { getActiveCoupons } from "@/network/couponsService";
import { toast } from "react-toastify";

const CouponList = () => {

  const [activeCoupons, setActiveCoupons] = useState([
    // {
    //   status: "ACTIVE",
    //   dateIssued: "2023-10-27T11:23:42.51",
    //   couponCode: "738d1609",
    //   dateModified: null,
    //   packageId: "6772f5cf-a581-42b7-8b17-dea158142f87",
    //   userId: "17",
    //   expiryDate: "2025-10-27T11:23:42.51",
    //   couponId: "579f5334-5e29-4344-a5ce-384effe44cdc",
    // },
    // {
    //   status: "ACTIVE",
    //   dateIssued: "2023-10-27T09:55:40.277",
    //   couponCode: "14a2c4e6",
    //   dateModified: null,
    //   packageId: "6772f5cf-a581-42b7-8b17-dea158142f87",
    //   userId: "17",
    //   expiryDate: "2025-10-27T09:55:40.277",
    //   couponId: "7008e408-5887-42be-93e3-cc7867d44b59",
    // },
  ]);

    useEffect(() => {
      getActiveCoupons()
        .then((res) => {
          setActiveCoupons(res.data);
        })
        .catch((e) => {
          toast.error("an error occured while fetching active coupons");
        })
       
    }, []);



  return (
    <>
      <div className="border-b pb-4 border-b-gray-200">
        <h1 className="text-2xl m-0 text bold text-center">
          Your Active Coupons
        </h1>
      </div>
      <div className="my-10">
        {activeCoupons.length > 0 ? (
          activeCoupons.map(
            ({ couponCode, dateIssued, expiryDate, status }) => (
             <Coupon key={couponCode} couponCode={couponCode} dateIssued={dateIssued} expiryDate={expiryDate} status={status}  />
            )
          )
        ) : (
          <div className="flex justify-center items-center"><h3 className="text-2xl font-bold text-gray-400">You have No Active Coupons</h3></div>
        )}
      </div>
    </>
  );
};

export default CouponList;
