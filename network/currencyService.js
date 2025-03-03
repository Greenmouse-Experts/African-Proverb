import HttpService from "./httpService";

export const getConversionRate = () => {
	const http = new HttpService();
	const url = `/api/currency/exchange-rates`;
	return http.getData(url);
};