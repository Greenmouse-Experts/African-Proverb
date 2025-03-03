import Cookies from "js-cookie";

export const getAccessToken = () => {
  const accessToken = Cookies.get("userToken");
  return accessToken;
};

export const getCurrentDate = () => {
  const currentDate = new Date();
  // Extract the components of the current date
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};


export const formatTime = (originalTime) => {
  const date = new Date(originalTime);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  // Add suffix to the day
  const suffix = (day > 10 && day < 20) || (day % 10 === 0) ? 'th' : ['st', 'nd', 'rd'][day % 10 - 1] || 'th';
  return `${day}${suffix} ${month}, ${year}`;
};
