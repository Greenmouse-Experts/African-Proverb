import HttpService from "./httpService";

export const getEthnics = () => {
  const http = new HttpService();
  const url = `/api/proverbs/ethnic/public?q=all`;
  return http.getDataWithoutToken(url);
};
export const getLanguages = () => {
  const http = new HttpService();
  const url = `/api/proverbs/language/`;
  return http.getData(url);
};
export const getLogginInEthnics = () => {
  const http = new HttpService();
  const url = `/api/proverbs/ethnic/logged`;
  return http.getData(url);
};
export const getCategories = () => {
  const http = new HttpService();
  const url = `/api/proverbs/category/public`;
  return http.getDataWithoutToken(url);
};
export const getPackages = () => {
  const http = new HttpService();
  const url = `/api/packages/`;
  return http.getDataWithoutToken(url);
};

export const getTrendingProverbs = () => {
  const http = new HttpService();
  const url = `/api/proverbs/trending-proverbs`;
  return http.getData(url);
};

export const verifyUser = (email) => {
  const http = new HttpService();
  const url = `/accounts/check/?email=${email}`;
  return http.getDataWithoutToken(url);
};

export const verifyPhoneNUmber = (phone) => {
  const http = new HttpService();
  const url = `/accounts/checkphone/${phone}`;
  return http.getDataWithoutToken(url);
};

export const verifyPromoCode = (promoCode) => {
  const http = new HttpService();
  const url = `/api/user/profile/verify_promo-code/${promoCode}`;
  return http.getDataWithoutToken(url);
};
export const getActiveUserPackage = () => {
  const http = new HttpService();
  const url = `/api/userPackage/activeUserPackage`;
  return http.getData(url);
};

export const getProverbDetails = (slug) => {
  const http = new HttpService();
  const url = `/api/proverbs/proverbs_logged/${slug}/`;
  return http.getData(url);
};

export const getUserNotification = ({ page = 1, size = 7 } = {}) => {
  const http = new HttpService();
  const url = `/user/notification/fetch?page=${page}&size=${size}`;
  return http.getData(url);
};

export const getUserUnreadCount = () => {
  const http = new HttpService();
  const url = "/user/notification/unread/count";
  return http.getData(url);
};

export const getUserNotificationById = (id) => {
  const http = new HttpService();
  const url = `/user/notification/fetch/${id}`;
  return http.getData(url);
};

export const getUserNotificationUnread = ({ page = 1, size = 7 } = {}) => {
  const http = new HttpService();
  const url = `/user/notification/unReadNotification?page=${page}&size=${size}`;
  return http.getData(url);
};
export const getUserNotificationRead = ({ page = 1, size = 7 } = {}) => {
  const http = new HttpService();
  const url = `/user/notification/readNotification?page=${page}&size=${size}`;
  return http.getData(url);
};

export const LeaderBoardPlayers = () => {
  const http = new HttpService();
  const url = "/api/leaderboard/get_players";
  return http.getData(url);
};

export const LeaderBoardPlayer = () => {
  const http = new HttpService();
  const url = "/api/leaderboard/get_player";
  return http.getData(url);
};

export const addProverbs = (payload) => {
  const http = new HttpService();
  const url = "/api/suggest-proverb";
  return http.postData(payload, url);
};

//Save to User token web
export const SaveWebToken = (payload) => {
  const http = new HttpService();
  const url = "/firebase/device/save/";
  return http.postData(payload, url);
};

export const requestPasswordReset = (email) => {
  const http = new HttpService();
  const url = "/accounts/reset-password-request";
  return http.postDataWithoutToken(email, url);
};
export const resetPassword = (payload) => {
  const http = new HttpService();
  const url = "/accounts/save-reset-password-web";
  return http.postDataWithoutToken(payload, url);
};
export const verifyResetPasswordToken = (payload) => {
  const http = new HttpService();
  const url = "/accounts/verify-password-token-web";
  return http.postDataWithoutToken(payload, url);
};

export const getUserPicture = () => {
  const http = new HttpService();
  const url = "/api/user/profile/picture";
  return http.getData(url);
};

export const getPersonalInfo = () => {
  const http = new HttpService();
  const url = "/api/user/profile/personalInfo";
  return http.getData(url);
};

export const getAddress = () => {
  const http = new HttpService();
  const url = "/api/user/profile/address";
  return http.getData(url);
};

export const getFullDetails = () => {
  const http = new HttpService();
  const url = "/api/user/profile/full";
  return http.getData(url);
};

export const getSelectedLanguage = () => {
  const http = new HttpService();
  const url = "/api/userPackage/languages";
  return http.getData(url);
};

export const upgradeLanguage = (payload) => {
  const http = new HttpService();
  const url = "/api/userPackage/languages/update";
  return http.postData(payload, url);
};

export const updateProfile = (payload) => {
  const http = new HttpService();
  const url = "/api/user/profile/personalInfo";
  return http.postData(payload, url);
};

export const updateAddress = (payload) => {
  const http = new HttpService();
  const url = "/api/user/profile/address";
  return http.postData(payload, url);
};

export const uploadPicture = (payload) => {
  const http = new HttpService();
  const url = `/api/user/profile/picture`;
  return http.uploadImage(payload, url);
};

export const updateProfilePassword = (payload) => {
  const http = new HttpService();
  const url = "/accounts/password-update/";
  return http.postData(payload, url);
};

export const getFavouriteProverbs = () => {
  const http = new HttpService();
  const url = "/api/proverbs/favourites";
  return http.getData(url);
};

export const getLastActivePackage = () => {
  const http = new HttpService();
  const url = "/api/userPackage/last_active_UserPackage";
  return http.getData(url);
};
export const searchProverb = (url) => {
  const http = new HttpService();
  return http.getData(url);
};
export const getSubscriptions = () => {
  const http = new HttpService();
  const url = "/api/packages/"
  return http.getData(url);
};
