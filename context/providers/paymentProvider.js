import { paymentCurrencies, useCurrency } from "@/hooks/useCurrency";
import { useContext, useEffect, useState } from "react";
import MultiStepContext from "../StepContext";
import { PaymentContext } from "../paymentContext";

const PaymentProvider = ({ children }) => {
  const [paymentOption, setPaymentOption] = useState("");
  const [currency, setCurrency] = useState(paymentCurrencies.dollar);
  const [isPaymentAutoRenewed, setIsPaymentAutoRenewed] = useState(false);
  const { conversionRate, conversionRateloading } = useCurrency(currency);
  const [amountToPay, setAmountToPay] = useState();
  const [paystackReference, setPaystackReference] = useState();
  const [registerMetadata, setRegisterMetadata] = useState("");
  const [subscribeMetadataCouponOnly, setSubscribeMetadataCouponOnly] =
    useState("");
  const { finalData } = useContext(MultiStepContext);
  const [selectedCoupon, setSelectedCoupon] = useState();

  useEffect(() => {
    setRegisterMetadata({
      ...finalData,
      payment_type: paymentOption.toUpperCase(),
    });
  }, [paymentOption, finalData]);

  useEffect(() => {
    if (paymentOption === "paystack") {
      setCurrency(paymentCurrencies.naira);
    } else {
      setCurrency(paymentCurrencies.dollar);
    }
  }, [paymentOption]);

  return (
    <PaymentContext.Provider
      value={{
        setPaystackReference,
        paystackReference,
        setAmountToPay,
        amountToPay,
        paymentOption,
        setPaymentOption,
        conversionRate,
        setIsPaymentAutoRenewed,
        isPaymentAutoRenewed,
        conversionRateloading,
        setRegisterMetadata,
        registerMetadata,
        setSelectedCoupon,
        selectedCoupon,
        setSubscribeMetadataCouponOnly,
        subscribeMetadataCouponOnly,
        currency
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentProvider;
