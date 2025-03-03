import { useState, useContext } from "react";
// import "antd/dist/antd.css";
import "antd/dist/reset.css";
import AddIcon from "@mui/icons-material/Add";
import MinusIcon from "@mui/icons-material/Remove";
import ReusableModal from "./reuse/resuableModal/reuseable_modal";
import { Switch } from "antd";
import { AuthContext } from "@/context/authContext";
import Link from "next/link";
import { VerifyUserContext } from "@/context/verifyUserContext";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import PricingStyles from "../styles/pricing.module.scss";
import Loader from "./reuse/loader";
import { addCommasToNumber } from "@/utils";
import { PaymentContext } from "@/context/paymentContext";
import ModalDialogue from "./new_subscription/ModalDialogue";
import { ApiContext } from "@/context/apiContext";
import { toast } from "react-toastify";

const Price = ({
  billings,
  billingType,
  expanded,
  handleChange,
  handleToggleBilling,
  conversionRate,
  conversionRateloading,
}) => {
  const { userExist, faqs } = useContext(VerifyUserContext);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState();
  const { isAuthenticated } = useContext(AuthContext);
  const { selectedCoupon } = useContext(PaymentContext);
  const { hasActivePackage } = useContext(ApiContext);

  const handleGetStarted = (price, billingName, billing) => {
    if (hasActivePackage) {
      toast.error("You currently have an active package");
    } else {
      if (userExist.exists) {
        setShowPopup(true);
        setSelectedPackage(billing);
      } else {
        setShowPopup(true);
        setSelectedPackage(billing);
      }
    }
  };

  return (
    <>
      <div className={PricingStyles["price-container"]}>
        <div className={PricingStyles["price-text"]}>
          <h1>Unveiling Priceless Proverbs at Unbeatable Prices!</h1>
          <p>Discover the Wisdom of Africa</p>
        </div>
        <div className={PricingStyles["pricetogglecontainer"]}>
          <div className={PricingStyles["toggle"]}>
            <Switch
              checked={billingType === "annual"}
              onChange={handleToggleBilling}
              disabled={billingType === "annual"}
            />

            <span
              style={{
                marginLeft: "8px",
                color: billingType === "annual" ? "#808080" : "#000",
              }}
            >
              {billingType === "annual"
                ? "Annual billing"
                : "Monthly billing (Disabled)"}
            </span>
          </div>

          <div className={PricingStyles["price-cards"]}>
            {billings.map((billing, index) => (
              <div
                key={billing.id}
                className={`${PricingStyles["price-card"]} ${billing.isRecommended === true
                    ? PricingStyles["last-card"]
                    : ""
                  }`}
              >
                <h2
                  style={{
                    color: billing.isRecommended === true ? "#000" : "#363636",
                    fontFamily: "Mulish",
                    fontSize: "16.686px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "108.4%",
                  }}
                >
                  {billing.name}
                </h2>
                <p
                  style={{
                    color: billing.isRecommended === true ? "#000" : "#BB5D06",
                    fontFamily: "Mulish",
                    fontSize: "33.372px",
                    fontStyle: "normal",
                    fontWeight: "700",
                    lineHeight: "normal",
                  }}
                >
                  {billingType === "annual" ? (
                    <>
                      {conversionRateloading ? (
                        <Loader />
                      ) : (
                        <>
                          {" "}
                          {conversionRate.symbol}
                          {billing.amount &&
                            addCommasToNumber(
                              conversionRate.rate * parseInt(billing.amount)
                            )}
                          <span
                            style={{
                              color:
                                billing.isRecommended === true
                                  ? "#000"
                                  : "#BB5D06",
                              fontSize: "16.686px",
                              fontWeight: "400",
                            }}
                          >
                            /annum
                          </span>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      ₦{parseFloat((billing.amount / 12).toFixed(2))}
                      <span
                        style={{
                          color:
                            billing.isRecommended === true ? "#000" : "#BB5D06",
                          fontSize: "16.686px",
                          fontWeight: "400",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {" "}
                        /month
                      </span>
                    </>
                  )}
                </p>

                <p
                  style={{
                    color: billing.isRecommended === true ? "#000" : "#707070",
                    fontFamily: "Mulish",
                    fontSize: "12.515px",
                    fontWeight: "400",
                    marginBottom: "0.5rem",
                  }}
                >
                  No of Languages: {billing.noOfEthnics}
                </p>
                <p
                  style={{
                    color: billing.isRecommended === true ? "#000" : "#707070",
                    fontFamily: "Mulish",
                    fontSize: "12.515px",
                    fontWeight: "400",
                    marginBottom: "0.5rem",
                  }}
                >
                  Allow Adverts: {billing.allowAdvert ? "Yes" : "No"}
                </p>

                <p
                  style={{
                    color: billing.isRecommended === true ? "#000" : "#707070",
                    fontFamily: "Mulish",
                    fontSize: "12.515px",
                    fontWeight: "400",
                  }}
                >
                  {billing.description}
                </p>
                <button
                  style={{
                    width: "100%",
                    padding: "10.846px 33.372px",
                    color: "#FFF",
                    borderRadius: "4.172px",
                    background: isAuthenticated
                      ? billing.isRecommended === true
                        ? "#123456"
                        : "#808080"
                      : "#BB5D06",
                    border: "none",
                    cursor: isAuthenticated ? "default" : "pointer",
                  }}
                  onClick={() =>
                    handleGetStarted(
                      billingType === "annual"
                        ? billing.amount
                        : parseFloat((billing.amount / 12).toFixed(2)),
                      billing.name,
                      billing
                    )
                  }
                // disabled={hasActivePackage}
                >
                  {isAuthenticated ? "Subscribe" : "Get Started"}
                </button>

                <ReusableModal setOpen={setShowPopup} open={showPopup}>
                  {!isAuthenticated ? (
                    <div
                      style={{
                        display: "flex",
                        height: "100%",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "20px",
                      }}
                    >
                      <h1
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          color: "#333",
                          textAlign: "center",
                          margin: "20px 0",
                        }}
                      >
                        Kindly register to subscribe to a package
                      </h1>

                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          gap: "20px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <button
                            style={{
                              width: "100%",
                              padding: "10px 15px",
                              color: "#BB5D06",
                              borderRadius: "4.172px",
                              background: "#fff",
                              border: "1px solid #BB5D06",
                              cursor: "pointer",
                              fontWeight: "bold",
                              fontSize: "18px",
                            }}
                            onClick={() => setShowPopup(false)}
                          >
                            Cancel
                          </button>
                        </div>
                        <Link href={"/auth/signup"} style={{ flex: 1 }}>
                          <button
                            style={{
                              width: "100%",
                              padding: "10px 15px",
                              color: "#FFF",
                              borderRadius: "4.172px",
                              background: "#BB5D06",
                              border: "none",
                              cursor: "pointer",
                              fontWeight: "bold",
                              fontSize: "18px",
                            }}
                          >
                            Proceed
                          </button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <ModalDialogue
                      selectedPackage={selectedPackage}
                      setShowPopup={setShowPopup}
                    />
                  )}
                </ReusableModal>
              </div>
            ))}
          </div>
        </div>
        <div className={PricingStyles["freq-container"]}>
          <h1>Frequently Asked Questions</h1>
          <div className={PricingStyles["freq-tab"]}>
            {faqs &&
              faqs?.map((faq) => (
                <Accordion
                  key={faq.id}
                  expanded={expanded === faq.id}
                  onChange={handleChange(faq.id)}
                  style={{
                    borderRadius: "17.802px",
                    background: "#FFF",
                    boxShadow:
                      "0px 5.5631px 17.80192px 0px rgba(8, 15, 52, 0.06)",
                    padding: "1rem",
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      expanded === faq.id ? (
                        <MinusIcon
                          style={{
                            borderRadius: "8.901px",
                            background: "#121212",
                            color: "#fff",
                          }}
                        />
                      ) : (
                        <AddIcon
                          style={{
                            borderRadius: "8.901px",
                            background: "#F7F7FF",
                            color: "#000",
                          }}
                        />
                      )
                    }
                    aria-controls={`${faq.id}-content`}
                    id={`${faq.id}-header`}
                  >
                    <Typography
                      sx={{
                        color: "#121212",
                        fontFamily: "Mulish",
                        fontSize: "20px",
                        fontWeight: 500,
                      }}
                    >
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                      sx={{
                        color: "#575757",
                        fontFamily: "Mulish",
                        fontSize: "18px",
                        fontStyle: "normal",
                        fontWeight: 400,
                      }}
                    >
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Price;
