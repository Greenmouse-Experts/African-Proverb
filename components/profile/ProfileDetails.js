import React, { useContext, useEffect, useState } from "react";
import ToggleSwitch from "../reuse/ToggleSwitch";
import ProfileStyles from "@/styles/Profile.module.scss";
import { MdOutlineContentCopy } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import ProfileImage from "./ProfileImage";
import { toast } from "react-toastify";
import RenewSubscription from "../renew_subscription/renew_subscription";
import { BiSolidCoupon } from "react-icons/bi";
import ReusableModal from "../reuse/resuableModal/reuseable_modal";
import { motion } from "framer-motion";
import CouponList from "./CouponList";
import { toggleAds, getAdList, getAdToggleValue } from "@/network/adsService";
import { ApiContext } from "@/context/apiContext";
import { AdsContext } from "@/context/adsContext";

import Loader from "../reuse/loader";
import { convertToHumanReadableDate } from "@/utils";

const ProfileDetails = ({
  personalInfo,
  fullDetails,
  setupdateSubModalOne,
  cancelSubscription,
  setCancelSubscription,
}) => {
  const [togglePromoCode, settogglePromoCode] = useState(false);
  const [isOpenCouponModal, setisOpenCouponModal] = useState(false);

  const promoCode = fullDetails?.data?.profile?.my_promo_code;
  const packageDetails = fullDetails?.data?.userPackage?._package?.name;
  const { hasActivePackage, activeUserPackage, activePackageloading } = useContext(ApiContext);
  const { toggleStatus } = useContext(AdsContext);
  const [checked, setChecked] = useState(toggleStatus);


  const formattedPackage = packageDetails
    ? packageDetails.charAt(0).toUpperCase() +
    packageDetails.slice(1).toLowerCase()
    : "";

  useEffect(() => {
    let timeoutId;

    if (togglePromoCode) {
      timeoutId = setTimeout(() => {
        settogglePromoCode(false);
      }, 5000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [togglePromoCode]);


  const handleUpgradepopup = () => {
    if (hasActivePackage === false) {
      toast.error("You currently do not have an active package");
    } else {
      setupdateSubModalOne(true)
    }
  }





  function handleCopyPromoCode() {
    const baseUrl = process.env.BASE_URL;
    navigator.clipboard.writeText(`${baseUrl}/auth/signup/` + promoCode);
    toast.success("Promo code copied");
  }

  function CancelSubsription() {
    setCancelSubscription(true);
  }


  const handleChangeCheckbox = (e) => {
    if (hasActivePackage === false) {
      toast.error("You need an active package to toggle off ads.");
      return;
    }
    if (checked) {
      // setCurrency(paymentCurrencies.dollar);
      const payload = { toggleButton: false };
      toggleAds(payload)
        .then((res) => {
          toast.success("Ads Removed");
        })
        .catch((e) => {
          toast.error("An error occured please try again");
        })
        .finally(() => {
          setChecked(false);
        });
    } else {
      // setCurrency(e.target.value);
      const payload = { toggleButton: true };
      toggleAds(payload)
        .then((res) => {
          toast.success("Ads on");
        })
        .catch((e) => {
          toast.error("an error occured please try again");
        })
        .finally(() => {
          setChecked(true);
        });
    }
  };


  return (
    <>
      <div className={ProfileStyles["profile-content"]}>
        <div className={ProfileStyles["left-content"]}>
          <ProfileImage />
          <div>
            <div className="flex flex-col justify-between ">
              <p className="leading-none font-bold text-[#363636]">
                {personalInfo?.data?.content?.firstName}{" "}
                {personalInfo?.data?.content?.lastName}
              </p>
              <span className="text-base text-[#707070]">
                {fullDetails?.data?.email}
              </span>

              <div className="flex justify-start items-center gap-1  max-[960px]:justify-center">
                <span className="text-base text-[#707070]">
                  Promo Code: {togglePromoCode ? promoCode : ""}
                </span>
                <div>
                  {!togglePromoCode ? (
                    <AiFillEye
                      className="text-[#BB5D06] hover:cursor-pointer"
                      onClick={() => settogglePromoCode(true)}
                    />
                  ) : (
                    <MdOutlineContentCopy
                      className="text-[#BB5D06]"
                      onClick={handleCopyPromoCode}
                    />
                  )}
                </div>
              </div>
              <div
                onClick={() => setisOpenCouponModal(!isOpenCouponModal)}
                className="flex justify-start cursor-pointer items-center gap-1  max-[960px]:justify-center"
              >
                <span className="text-base flex items-center  text-[#707070]">
                  Active Coupons{" "}
                  <BiSolidCoupon className="ml-1 mt-[0.1rem] text-[#BB5D06]" />
                </span>
              </div>
            </div>
            <div className="my-1">
              <label className="relative inline-flex items-center mr-2 cursor-pointer">
                <input
                  type="checkbox"
                  onChange={handleChangeCheckbox}
                  className="sr-only peer"
                  checked={checked}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                <span className="ml-3 text-base font-medium text-[#707070] dark:text-gray-300">
                  {checked ? "Toggle off Ads" : "Toggle on Ads"}
                </span>
              </label>
            </div>
            <div className="mt-2 lg:mt-4 flex gap-2  max-[480px]:flex-col  max-[480px]:gap-1  max-[480px]:w-full">
              {/* <button className="text-[#BB5D06] bg-[#FAF2EB] p-2 rounded-md text-sm md:text-base">
                Payment Method
              </button> */}
              {/* <button className="text-[#BB5D06] bg-[#FAF2EB] p-2 rounded-sm text-sm md:text-base">
                Manage Subscription
              </button> */}
              <RenewSubscription />
            </div>
          </div>
        </div>
        <div className={ProfileStyles["right-content"]}>
          <div className="flex justify-between items-center gap-[2rem]  max-[480px]:flex-col max-[480px]:gap-1">
            {formattedPackage ? (
              <div className="flex justify-center items-center gap-2 border border-[#f7e5d4] px-3 py-1 rounded-md">
                <div className="w-4 h-4 rounded-sm">
                  <img
                    src="/img/payment.png"
                    alt="payment"
                    className="w-full h-full "
                  />
                </div>
                <span className="text-[#BB5D06] text-sm">
                  {formattedPackage} Plan
                </span>

                <span className="text-[#BB5D06] text-sm">
                  {activePackageloading ? (
                    <Loader />
                  ) : (
                    `Subscription End Date: ${convertToHumanReadableDate(
                      activeUserPackage?.expiry_date
                    )}`
                    // `Subscription End Date: ${activeUserPackage?.expiry_date?.substring(
                    //   0,
                    //   10
                    // )}`
                  )}
                </span>
              </div>
            ) : (
              <span className="text-[#BB5D06] text-sm">No Active Package</span>
            )}

            {/* <div className="flex items-center justify-center gap-1 ">
              <span className="text-base text-gray-500">Auto Renewal</span>
              <ToggleSwitch />
            </div> */}
          </div>
          <div className={ProfileStyles["horizontal-rule"]} />
          <div className="flex gap-6 max-[510px]:flex-col max-[510px]:gap-2 max-[510px]:w-full ">
            <button
              onClick={handleUpgradepopup}
              className="bg-[#BB5D06] text-white rounded-md text-sm p-2 lg:p-3 md:text-base max-[510px]:flex-1"
            >
              Upgrade Subscription
            </button>
            <button
              onClick={CancelSubsription}
              className="text-red-600 border transition background-color ease-in-out delay-150 border-[#FF0000] hover:bg-[#FF0000] hover:text-white rounded-md text-sm p-2 lg:p-3 md:text-base max-[510px]:flex-grow"
            >
              Cancel Subscription Renewal
            </button>
          </div>
        </div>
      </div>

      <ReusableModal setOpen={setisOpenCouponModal} open={isOpenCouponModal}>
        <CouponList />
      </ReusableModal>
    </>
  );
};

export default ProfileDetails;
