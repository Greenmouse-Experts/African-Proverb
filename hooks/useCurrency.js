import { getConversionRate } from "@/network/currencyService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const paymentCurrencies = {
  naira: 'Naira',
  dollar: 'Dollar'
}

export const useCurrency = (currency) => {
  const [conversionRate, setConversionRate] = useState({ rate: 1, symbol: "$" });
  const [conversionRateloading, setLoading] = useState(false);

  useEffect(() => {

    if (currency === paymentCurrencies.naira) {
      setLoading(true);
      getConversionRate()
        .then((res) => {
          setConversionRate({ rate: res.data[0]["exchangeRate"], symbol: res.data[0]["toCurrencySymbol"] });
        })
        .catch((e) => {
          toast.error("an error occured fetching exchange rate");
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (currency === paymentCurrencies.dollar) {
      setConversionRate({ rate: 1, symbol: "$" })
    }
  }, [currency]);
  return { conversionRate, conversionRateloading };
};
