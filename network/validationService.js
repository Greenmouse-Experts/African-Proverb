import HttpService from "./httpService";

export const validateUpgradeData = (payload, type) => {
  let url;
  const http = new HttpService();
  switch (type) {
    case "upgrade":
      url = `/api/userPackage/package_upgrade_validation`;
      break;
    default:
      break;
  }
  return http.postData(payload, url);
};

export const validateNewSubscriptionData = (payload) => {
  const http = new HttpService();
  const url = "/api/userPackage/fresh-subscription-validation";
  return http.postDataWithoutToken(payload, url);
};
