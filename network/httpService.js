import { getAccessToken } from "@/utils";
import axios from "axios";

class HttpService {
  constructor(token, baseUrl) {
    this.token = getAccessToken();
    this.baseUrl = process.env.BASE_URL;
  }

  postData = async (payload, url) => {
    const AuthStr = "Bearer ".concat(this.token);

    return axios.post(this.baseUrl + url, payload, {
      headers: { "Content-Type": "application/json", Authorization: AuthStr },
    });
  };

  uploadImage = async (payload, url) => {
    const AuthStr = "Bearer ".concat(this.token);
    return axios.post(this.baseUrl + url, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: AuthStr,
      },
    });
  };

  postDataWithoutToken = async (payload, url) => {
    return axios.post(this.baseUrl + url, payload);
  };

  getData = async (url) => {
    const AuthStr = "Bearer ".concat(this.token);
    return axios.get(this.baseUrl + url, {
      headers: { "Content-Type": "application/json", Authorization: AuthStr },
    });
  };


  getDataWithoutToken = async (url) => {
    return axios.get(this.baseUrl + url);
  };
  //   putData = async (formData,url) => {
  //     const AuthStr = 'Bearer '.concat(this.token);
  //     return axios.put(this.baseUrl + url, formData, { headers: { Authorization: AuthStr } })
  //   };
  //   putDataWithoutToken = async (formData,url) => {
  //     return axios.put(this.baseUrl + url, formData)
  //   };
  //   deleteData = async (url) => {
  //     const AuthStr = 'Bearer '.concat(this.token);
  //     return axios.delete(this.baseUrl + url, { headers: { Authorization: AuthStr } })
  //   };
}
export default HttpService;
