import SignUpSuccessModal from "@/components/reuse/signUpSuccessModal";
import MultiStepContext from "@/context/StepContext";
import React, { useContext, useEffect } from "react";
import SuccessIcon from "@/public/img/success-icon.png";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Button from "@/components/reuse/button";
import Link from "next/link";
import { useRouter } from "next/router";

const PaymentSuccess = () => {
  const { registrationSuccessModal, setRegistrationSuccessModal } =
    useContext(MultiStepContext);

  const router = useRouter();

  //   useEffect(() => {
  //     setRegistrationSuccessModal(true);
  //   }, []);
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-[30%] h-[50%] flex flex-col justify-center items-center">
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
          Payment Successful <br></br>
          Please go to your profile to confirm your subscription
        </Typography>
        <Button
          textInput={"Go Back Profile"}
          //   disabled={}
          type="submit"
          onClick={() => router.push("/profile")}
          //   onClick={handleValidateData}
        />
      </div>
    </div>
  );
};

export default PaymentSuccess;
