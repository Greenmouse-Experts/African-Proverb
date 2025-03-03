import { PaymentContext } from "@/context/paymentContext";
import { getAccessToken } from "@/utils";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import { useContext } from "react";

const style = { layout: "vertical" };

async function createOrder(data) {
  const token = getAccessToken(); // Replace with your actual authentication token
  const response = await fetch(
    `${process.env.BASE_URL}/api/payments/paypal/register/create_order`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  const order = await response.json();
  return order.id;
}

async function onApprove(data, router, type) {
  const response = await fetch(
    `${process.env.BASE_URL}/api/payments/paypal/register/capture_order`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: data.orderID,
      }),
    }
  );
  return await response.json().then((orderData) => {
    router.push("/payment_success");
  });
}

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({
  showSpinner,
  type,
  upgradeMetadata,
  subscribeMetadata,
  renewalMetadata,
}) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const router = useRouter();

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style]}
        fundingSource={undefined}
        createOrder={() =>
          createOrder(
            type === "subscribe"
              ? subscribeMetadata
              : type === "renew"
              ? renewalMetadata
              : type === "upgrade"
              ? upgradeMetadata
              : ""
          )
        }
        onApprove={(data) => onApprove(data, router, type)}
      />
    </>
  );
};

export default function PaypalPaymentButton({
  type,
  upgradeMetadata,
  subscribeMetadata,
  renewalMetadata,
}) {
  return (
    <div style={{ maxWidth: "750px", minHeight: "200px" }}>
      <PayPalScriptProvider
        options={{
          clientId:
            "AYEXymt4YCo_b2zL2OlpgoECdx7tcaqacLjKHDFu1goTtbRuXgb2uvZslojHw4P9by4pe9iloDubuzVy",
          components: "buttons",
          currency: "USD",
        }}
      >
        <ButtonWrapper
          showSpinner={false}
          upgradeMetadata={upgradeMetadata}
          subscribeMetadata={subscribeMetadata}
          renewalMetadata={renewalMetadata}
          type={type}
        />
      </PayPalScriptProvider>
    </div>
  );
}
