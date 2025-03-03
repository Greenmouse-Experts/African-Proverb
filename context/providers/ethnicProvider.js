import React, { useEffect, useContext, useState } from "react";
import { EthnicContext } from "../ethnicContext";
import { AuthContext } from "@/context/authContext";

import {
  getCategories,
  getEthnics,
  getLogginInEthnics,
  getTrendingProverbs,
  getSelectedLanguage,
  getLanguages,
} from "@/network/apiService";
import { getAuthStatus } from "@/utils";
import useApiCall from "@/hooks/useCallApi";

const EthnicProvider = ({ children }) => {
  const [ethnicsList, setEthnicsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [userselectLang, setUserSelectLang] = useState([]);
  const [languages, setLanguages] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);


  useEffect(() => {
    const res = getEthnics().then((res) => setEthnicsList(res.data));
  }, []);

  useEffect(() => {
    const res = getLanguages().then((res) => setLanguages(res.data));
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const selectedLanguageRes = await getSelectedLanguage();
          setUserSelectLang(selectedLanguageRes.data);
        } catch (error) {
          console.error("Error fetching selected language:", error);
        }
      };
      fetchData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const res = getCategories().then((res) =>
      setCategoriesList(res.data.content)
    );
  }, []);

  const {
    data: loggedInEthnicsList,
    loading: loggedEthnicLoading,
    error: loggedEthnicErrorError,
  } = useApiCall(getLogginInEthnics, null, isAuthenticated);

  return (
    <EthnicContext.Provider
      value={{
        languages,
        ethnicsList,
        categoriesList,
        userselectLang,
        setUserSelectLang,
        loggedInEthnicsList,
      }}
    >
      {children}
    </EthnicContext.Provider>
  );
};

export default EthnicProvider;
