import SignUpSuccessModal from "@/components/reuse/signUpSuccessModal";
import MultiStepContext from "@/context/StepContext";
import React, { useContext, useEffect, useState } from "react";
import SuccessIcon from "@/public/img/success-icon.png";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Button from "@/components/reuse/button";
import Link from "next/link";
import { useRouter } from "next/router";
import { ResendEmailVerificationLink } from "@/network/authService";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const email = router?.query?.email;
  const linkOrigin = router?.query?.linkOrigin;

  console.log(linkOrigin);

  const handleResendVerificationMail = () => {
    setLoading(true);
    ResendEmailVerificationLink({
      email: email,
    })
      .then((res) => {
        toast.success(res?.data?.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.data?.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
      });
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center p-10">
      <div className="w-full md:w-[40%] h-[50%] flex flex-col justify-center items-center">
        <Image src={SuccessIcon} alt="Success Icon" />
        {linkOrigin === "signup" && (
          <Typography
            style={{
              textAlign: "center",
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
            id="modal-modal-title"
            variant="h6"
            // component="h2"
          >
            <p className="font-bold">Registration Successful</p>
            <br></br>
            <p className="text-sm mt-5">
              You have been sent a Activation email, Please follow the
              instruction in the email, You can also click the resend button
              below to request a new activation mail.
            </p>
          </Typography>
        )}
        {linkOrigin === "signin" && (
          <Typography
            style={{
              textAlign: "center",
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
            id="modal-modal-title"
            variant="h6"
            // component="h2"
          >
            <p className="font-bold">You're yet to activate your account</p>
            <br></br>
            <p className="text-sm mt-5">
              Check your email for an activation link, If you're unable to
              locate it, you can alternatively click the button below to request
              a new link.
            </p>
          </Typography>
        )}

        <div className="flex w-full gap-5 flex-col md:flex-row">
          <Button
            textInput={"Login"}
            type="submit"
            onClick={() => router.push("/auth/login")}
          />
          <Button
            isLoading={loading}
            textInput={"Resend Activation Link"}
            type="submit"
            onClick={handleResendVerificationMail}
            variant="secondary"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
