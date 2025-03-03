import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import SuccessIcon from "@/public/img/success-icon.png";
import MultiStepContext from "@/context/StepContext";
import ReusableModal from "./resuableModal/reuseable_modal";
import { useRouter } from "next/router";

export default function SignUpSuccessModal({
  text,
  type,
  disabled,
  setPaymentBannerOpen,
  onClick,
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false); // Set the first variable to false
    // Set another variable to false (replace `setAnotherVariable` with your actual state-setting function)
    setRegistrationSuccessModal(false);
  };
  const { registrationSuccessModal, setRegistrationSuccessModal } =
    useContext(MultiStepContext);

  useEffect(() => {
    if (registrationSuccessModal) {
      handleOpen();
      // setPaymentBannerOpen(false);
    }
  }, [registrationSuccessModal]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 3,
  };

  const MODAL_STYLES = {
    // background: "red",
    outline: "none",
    border: "none",
    borderRadius: "30px",
    height: "301px",
    width: "550px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  };

  const PLAN_STYLES = {
    // background: "red",
    height: "80px",
    width: "100%",
    border: "2px solid  #BB5D06",
    borderRadius: "10px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    gap: "25px",
  };

  const BUTTON_STYLES = {
    // background: "red",
    height: "50px",
    width: "100%",
    background: "#BB5D06",
    color: "#fff",
    border: "0",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const buttonStyles = {
    width: "100%",
    backgroundColor: "#BB5906",
    border: "none",
    color: "#FFFFFF",
    padding: "1rem",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    // marginTop: "-25px"
  };

  return (
    <ReusableModal open={open} setOpen={setOpen}>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Image src={SuccessIcon} alt="Success Icon" />
        <Typography
          style={{ textAlign: "center", marginTop: "2rem" }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Registration Successful <br></br>
          Please Check Your Email For A Verification Link
        </Typography>
      </div>
    </ReusableModal>
  );
}
