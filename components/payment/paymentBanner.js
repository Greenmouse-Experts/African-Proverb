import { useContext, useEffect } from "react";
import ConfirmPlanStyles from "../../styles/ConfirmPlan.module.scss";
import { PaymentContext } from "@/context/paymentContext";
import { addCommasToNumber, numberToWords } from "@/utils";
import Loader from "../reuse/loader";

const PaymentBanner = ({
  selectedLanguages,
  planObject,
  preferredLanguageName,
  type,
}) => {
  const { conversionRate, conversionRateloading, setAmountToPay, amountToPay } =
    useContext(PaymentContext);

  useEffect(() => {
    setAmountToPay(conversionRate.rate * parseInt(planObject?.amount));
  }, [conversionRate, planObject?.amount]);

  return (
    <>
      <h1 className={ConfirmPlanStyles["title"]}>Payment Summary</h1>
      <div className={ConfirmPlanStyles["banner"]}>
        <div className={ConfirmPlanStyles["banner-img-container"]}>
          <img src="/img/payment.png" alt="payment" />
        </div>
        <div className={ConfirmPlanStyles["banner-description"]}>
          <div className={ConfirmPlanStyles["banner-title"]}>
            <h3>
              {`${
                planObject?.name.charAt(0).toUpperCase() +
                planObject?.name.slice(1).toLowerCase()
              }`}{" "}
              Plan
            </h3>
            <h3 className={ConfirmPlanStyles["banner-amount"]}>
              (
              {conversionRateloading ? (
                <Loader />
              ) : (
                `${conversionRate.symbol}${addCommasToNumber(
                  conversionRate.rate * parseInt(planObject?.amount)
                )}`
              )}
              /year)
            </h3>
          </div>
          {type !== "upgrade" && (
            <>
              <h4>{`
             (${preferredLanguageName} , ${selectedLanguages
                .map(({ name }) => name)
                .join(",")})`}</h4>
              <p>
                This plan covers your preferred language choice and{" "}
                {numberToWords(planObject?.noOfEthnics - 1).toLowerCase()}{" "}
                additional languages of your choice
              </p>
              <ul>
                {planObject?.name !== "Gold" ? (
                  <li>
                    Roll over from{" "}
                    {planObject?.name.charAt(0).toUpperCase() +
                      planObject?.name.slice(1).toLowerCase()}{" "}
                    to Gold
                  </li>
                ) : null}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentBanner;
