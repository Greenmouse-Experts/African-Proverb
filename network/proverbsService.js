import HttpService from "./httpService";

export const getTodaysProverbs = () => {
	const http = new HttpService();
	const url = `/api/proverbs/today`;
	return http.getData(url);
};

export const submitCorrection = (payload) => {
	const http = new HttpService();
	const url = `/api/proverbs/correction`;
	return http.postData(payload, url);
};
