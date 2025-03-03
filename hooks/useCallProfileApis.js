import { useState, useEffect } from "react";

function useApiCallProfileApis(apiFunctions) {
  // const [userpicture, setuserpicture] = useState(null);
  // const [personalInfo, setpersonalInfo] = useState(null);
  // const [address, setaddress] = useState(null);
  // const [imageData, setImageData] = useState(null);
  // const [fullDetails, setfullDetails] = useState(null);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);

  return Promise.all(apiFunctions.map((apiRequest) => apiRequest()));
}

export default useApiCallProfileApis;
