import SignUpSuccessModal from "@/components/reuse/signUpSuccessModal";
import MultiStepContext from "@/context/StepContext";
import React, { useContext, useEffect } from "react";
import SuccessIcon from "@/public/img/success-icon.png";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Button from "@/components/reuse/button";
import Link from "next/link";
import { useRouter } from "next/router";

const CouponPaymentSuccess = ({ setShowPopup }) => {
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <Image src={SuccessIcon} alt="Success Icon" />
        <Typography
          style={{
            textAlign: "center",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Subscription Successful <br></br>
        </Typography>
        <Button
          textInput={"Go To Your Profile"}
          type="submit"
          onClick={() => {
            router.push("/profile");
            setShowPopup(false);
            router.reload();
          }}
        />
      </div>
    </div>
  );
};

export default CouponPaymentSuccess;
