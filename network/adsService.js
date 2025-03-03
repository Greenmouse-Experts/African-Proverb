import HttpService from "./httpService";

export const getAdList = () => {
	const http = new HttpService();
	const url = `/api/ads/adverts`;
	return http.getData(url);
};

export const getVideoAds = (id) => {
	const http = new HttpService();
	const url = `/api/ads/` + id;
	return http.getData(url);
};
export const getImageAds = (id) => {
	const http = new HttpService();
	const url = `/api/ads/` + id;
	return http.getData(url);
};

export const toggleAds = (payload) => {
	const http = new HttpService();
	const url = `/api/toggle`;
	return http.postData(payload,url);
};

export const getAdToggleValue = () => {
	const http = new HttpService();
	const url = `/api/toggle`;
	return http.getData(url);
};
