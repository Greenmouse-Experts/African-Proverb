import HttpService from "./httpService";

export const getActiveCoupons = () => {
  const http = new HttpService();
  const url = `/accounts/user_active/coupon`;
  return http.getData(url);
};

export const payWithCoupon = (payload) => {
  const http = new HttpService();
  const url = `/api/coupon-payment`;
  return http.postData(payload, url);
};

export const getCouponAmountDiff = (payload, typeofDiff) => {
  let url;
  const http = new HttpService();

  switch (typeofDiff) {
    case "FULLCARDDIFF":
      url = "/api/payment/package-differential";
      break;
    case "FULLCOUPONDIFF":
      url = "/api/payment/differential-with-coupon-only";
      break;
    case "CARDCOUPONDIFF":
      url = "/api/payment/package-differential-with-coupon";
      break;
  }
  return http.postData(payload, url);
};
