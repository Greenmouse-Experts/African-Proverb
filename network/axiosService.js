import { getAccessToken } from "@/utils";
import axios from "axios";

class AxiosService {
  constructor(token, baseUrl) {
    this.token = getAccessToken();
    this.baseUrl = `https://api.african-proverbs.greenmouseonline.com/munaapi`;
  }

  postData = async (payload, url) => {
    const AuthStr = "Bearer ".concat(this.token);

    return axios.post(this.baseUrl + url, payload, {
      headers: { "Content-Type": "application/json", Authorization: AuthStr },
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


};
export default AxiosService;
