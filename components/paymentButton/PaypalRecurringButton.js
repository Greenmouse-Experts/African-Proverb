import { useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const ButtonWrapper = ({ type }) => {
  const [{ options }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        intent: "subscription",
      },
    });
  }, [type]);

  return (
    <PayPalButtons
      createSubscription={(data, actions) => {
        return actions.subscription
          .create({
            plan_id: "P-3RX065706M3469222L5IFM4I",
          })
          .then((orderId) => {
            // Your code here after create the order
            return orderId;
          });
      }}
      style={{
        label: "subscribe",
      }}
    />
  );
};

export default function PaypalRecurringPaymentButton() {
  return (
    // <PayPalScriptProvider
    //   options={{
    //     // clientId: "test",
    //     clientId:
    //       "AQBLWFHdKTQ2yoEsTOlGsUIaXI4rDXQS8lDn4udPsKYzHn7D84iSY-yoI3eJimM9Sc4zVnqI7CpoRDGf",
    //     components: "buttons",
    //     intent: "subscription",
    //     vault: true,
    //   }}
    // >
    <ButtonWrapper type="subscription" />
    // </PayPalScriptProvider>
  );
}
