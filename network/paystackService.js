import HttpService from "./httpService";

export const initiatePaystackPayment = (payload) => {
  const http = new HttpService();
  const url = "/api/payments/pay/paystack";
  return http.postData(payload, url);
};
