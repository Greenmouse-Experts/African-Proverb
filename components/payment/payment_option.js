import { PaymentContext } from "@/context/paymentContext";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import { useContext } from "react";

const PaymentOptions = () => {
  const {
    paymentOption,
    setPaymentOption,
    setIsPaymentAutoRenewed,
    isPaymentAutoRenewed,
  } = useContext(PaymentContext);

  const handleChange = (event) => {
    setPaymentOption(event.target.value);
    setIsPaymentAutoRenewed(false);
  };

 

  const paymentOptions = [
    { id: 1, name: "PayStack", value: "paystack" },
    { id: 2, name: "PayPal", value: "paypal" },
    { id: 3, name: "Stripe", value: "stripe" },
  ];

  const handleChangeCheckbox = (e) => {
    setIsPaymentAutoRenewed(!isPaymentAutoRenewed);
  };

  return (
    <div className="flex flex-col w-full h-full gap-6 bg-white">
      <h1 className="text-2xl text-center">Choose a Payment Method</h1>
      <div className="my-0">
        <label class="relative inline-flex items-center mr-5 cursor-pointer">
          <input
            type="checkbox"
            onChange={handleChangeCheckbox}
            value={isPaymentAutoRenewed}
            defaultChecked={isPaymentAutoRenewed}
            class="sr-only peer"
            checked={isPaymentAutoRenewed}
          />
          <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
          <span class="ml-3 text-md font-medium text-gray-900 dark:text-gray-300  ">
            Auto Renew Plan
          </span>
        </label>
      </div>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={paymentOption}
        onChange={handleChange}
      >
        <div className="flex flex-col gap-2">
          {paymentOptions.map(({ id, name, value }) => {
            return (
              <FormControlLabel
                key={id}
                value={value}
                control={
                  <Radio
                    sx={{
                      color: "#BB5D06",
                      "&.Mui-checked": {
                        color: "#BB5D06",
                      },
                    }}
                  />
                }
                label={name}
              />
            );
          })}
        </div>
      </RadioGroup>
    </div>
  );
};

export default PaymentOptions;
