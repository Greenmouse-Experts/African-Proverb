import { PaymentContext } from "@/context/paymentContext";
import { getActiveCoupons } from "@/network/couponsService";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CouponDropdown = () => {
  const [activeCoupons, setActiveCoupons] = useState([]);
  const { setSelectedCoupon,selectedCoupon } = useContext(PaymentContext);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === "") {
      setSelectedCoupon(null);
    } else {
      try {
        const selectedCouponObject = JSON.parse(selectedValue);
        setSelectedCoupon(selectedCouponObject);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  };

  useEffect(() => {
    getActiveCoupons()
      .then((res) => {
        setActiveCoupons(res.data);
      })
      .catch((e) => {
        toast.error("an error occured while fetching active coupons");
      });
  }, []);

  useEffect(() => {
    if (selectedCoupon) setSelectedCoupon(null)
  },[])


  useEffect(() => {
    
  })

  return (
    <div className="relative mt-5">
      <select
        className={`p-5 shadow-xl rounded-md w-full cursor-pointer appearance-none font-bold`}
        name="coupons"
        id="coupons"
        onChange={handleSelectChange}
      >
        <option defaultValue="" value={""}>
          APPLY COUPON
        </option>

        {activeCoupons?.map((coupon) => {
          const jsonValue = `{"couponId": "${coupon.couponId}", "couponCode": "${coupon.couponCode}", "couponValue": "${coupon.couponValue}"}`;
          return (
            <option key={coupon.couponId} value={jsonValue}>
              {coupon.couponCode} (${coupon.couponValue})
            </option>
          );
        })}
      </select>
      <span className={`absolute right-5 top-4 cursor-pointer`}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.45383 7.93918C2.73512 7.65797 3.11658 7.5 3.51433 7.5C3.91207 7.5 4.29354 7.65797 4.57483 7.93918L11.9998 15.3642L19.4248 7.93918C19.7077 7.66594 20.0866 7.51475 20.4799 7.51817C20.8732 7.52159 21.2494 7.67934 21.5276 7.95745C21.8057 8.23556 21.9634 8.61178 21.9668 9.00508C21.9703 9.39837 21.8191 9.77728 21.5458 10.0602L13.0603 18.5457C12.779 18.8269 12.3976 18.9849 11.9998 18.9849C11.6021 18.9849 11.2206 18.8269 10.9393 18.5457L2.45383 10.0602C2.17262 9.77889 2.01465 9.39743 2.01465 8.99968C2.01465 8.60193 2.17262 8.22047 2.45383 7.93918Z"
            fill="#BB5D06"
          />
        </svg>
      </span>
    </div>
  );
};

export default CouponDropdown;
