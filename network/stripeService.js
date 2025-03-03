import HttpService from "./httpService";

export const createStripeSession = (payload, isAutoRenewed, type) => {
  let url;
  const http = new HttpService();
  if (!isAutoRenewed) {
      url = `/api/payments/stripe/pay`;
  }

  return http.postData(payload, url);
};
