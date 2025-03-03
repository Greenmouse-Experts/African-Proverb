import HttpService from "./httpService";

export const getCurrentPlan = (userid) => {
	const http = new HttpService();
	const url = `/api/userPackage/activeUserPackage/`;
	return http.getData(url);
};

// export const submitCorrection = (payload) => {
// 	const http = new HttpService();
// 	const url = `/api/proverbs/correction`;
// 	return http.postData(payload, url);
// };
