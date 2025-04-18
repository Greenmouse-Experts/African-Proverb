import HttpService from "./httpService";
import AxiosService from "./axiosService";

export const Login = (payload) => {
  const http = new HttpService();
  const url = `/accounts/login/`;
  return http.postDataWithoutToken(payload, url);
};

export const Registration = (payload) => {
  const http = new HttpService();
  const url = `/accounts/register/`;
  return http.postData(payload, url);
};
export const ValidateRegistrationData = (payload) => {
  const http = new HttpService();
  const url = `/accounts/validate/userRegistration`;
  return http.postDataWithoutToken(payload, url);
};

export const ActivateAccount = (payload) => {
  const http = new HttpService();
  const url = `/accounts/activate/`;
  return http.postData(payload, url);
};
export const ResendEmailVerificationLink = (email) => {
  const http = new HttpService();
  const url = `/accounts/resend-email`;
  return http.postData(email, url);
};

export const CorporateSignUp = (payload) => {
  const http = new AxiosService();
  const url = `/cooperate-auth/cooperate-signup`;
  return http.postDataWithoutToken(payload, url);
};

export const CorporateLogin = (payload) => {
  const http = new AxiosService();
  const url = `/cooperate-auth/cooperate-signin`;
  return http.postDataWithoutToken(payload, url);
}

// export const UpdatePassword = () => {
//     const http = new HttpService();
//     const url = `api/public/proverbs/random`;
//     return http.getDataWithoutToken(url);
// };

// export const UpdateProfile = () => {
//     const http = new HttpService();
//     const url = `api/public/proverbs/random`;
//     return http.getDataWithoutToken(url);
// };

// export const RequestResetPassword = (payload) => {
//     const http = new HttpService();
//     const url = `accounts/request-reset-email/`;
//     return http.postDataWithoutToken(payload, url);
// };

// export const ResetUpdatePassword = () => {
//     const http = new HttpService();
//     const url = `api/public/proverbs/random`;
//     return http.getDataWithoutToken(url);
// };
