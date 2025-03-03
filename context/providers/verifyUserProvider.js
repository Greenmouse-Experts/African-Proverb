import React, { useEffect, useState } from "react";
import { VerifyUserContext } from "../verifyUserContext";
import { verifyUser } from "@/network/apiService";

const VerifyUserProvider = ({ children }) => {
  const [userExist, setUserExist] = useState(false);
  const [faqs, setFaqs] = useState([]);

  const getFaqs = async () => {
    try {
      const response = await fetch(`${process.env.BASE_URL}/api/faq/`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      setFaqs(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const res = verifyUser().then((res) => setUserExist(res.data));

    getFaqs();
  }, []);

  return (
    <VerifyUserContext.Provider
      value={{
        userExist,
        faqs,
      }}
    >
      {children}
    </VerifyUserContext.Provider>
  );
};

export default VerifyUserProvider;
