import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import PaymentButton from "./signup_forms/payment_button";
import MultiStepContext from "@/context/StepContext";
import {
  extractNameById,
  extractPackageEthnicsNo,
  extractPriceById,
} from "@/utils";
import { PackageContext } from "@/context/packageContext";

export default function BasicModal({
  text,
  type,
  disabled,
  open,
  setOpen,
  description,
  formik,
  setPreferredLanguage,
}) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { packageList } = useContext(PackageContext);

  const { finalData } = useContext(MultiStepContext);

  const packageName = extractNameById(packageList, finalData.packageId);
  const packagePrice = extractPriceById(packageList, finalData.packageId);
  const noOfLanguages = extractPackageEthnicsNo(
    packageList,
    finalData.packageId
  );

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "600px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 3,
  };

  const MODAL_STYLES = {
    outline: "none",
    border: "none",
    borderRadius: "30px",
    height: "100%",
    maxHeight: "351px",
    width: "90%",
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const PLAN_STYLES = {
    height: "auto",
    width: "100%",
    border: "2px solid #BB5D06",
    borderRadius: "10px",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
  };

  const BUTTON_STYLES = {
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
  };

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Button
        disabled={disabled}
        style={buttonStyles}
        type={type}
        onClick={handleOpen}
      >
        {text}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={MODAL_STYLES}>
          <CloseIcon
            style={{ alignSelf: "flex-end", cursor: "pointer" }}
            onClick={handleClose}
          />
          <Typography
            style={{ marginTop: "-40px", alignSelf: "center" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Payment Summary
          </Typography>

          <div style={PLAN_STYLES}>
            <div className="flex items-center gap-2">
              <Image
                width={60}
                height={60}
                alt="Package Image"
                src={
                  packageName === "BRONZE"
                    ? "https://res.cloudinary.com/dbw7rwfa3/image/upload/v1694015188/goldpaymentimage_pktnho.png"
                    : packageName === "SILVER"
                    ? "https://res.cloudinary.com/dbw7rwfa3/image/upload/v1694015188/platinumpaymentimage_f7azs4.png"
                    : packageName === "GOLD"
                    ? "https://res.cloudinary.com/dbw7rwfa3/image/upload/v1694015188/goldpaymentimage_pktnho.png"
                    : packageName === "PLATINUM"
                    ? "https://res.cloudinary.com/dbw7rwfa3/image/upload/v1694015188/platinumpaymentimage_f7azs4.png"
                    : ""
                }
              />
              <div>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    marginBottom: "0.5rem",
                  }}
                >
                  {packageName} Plan({noOfLanguages} Languages)
                </p>
                <p style={{ color: "#707070", fontSize: "12px" }}>
                  {description}
                </p>
              </div>
            </div>

            <p
              style={{
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              ₦{packagePrice}/year
            </p>
          </div>

          <PaymentButton
            formik={formik}
            setPreferredLanguage={setPreferredLanguage}
            handleClose={handleClose}
            style={BUTTON_STYLES}
            packagePrice={packagePrice}
          />
        </Box>
      </Modal>
    </div>
  );
}
