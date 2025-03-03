import React, { useEffect, useContext, useState } from "react";
import { ApiContext } from "../apiContext";
import useApiCall from "@/hooks/useCallApi";
import { AuthContext } from "@/context/authContext";

import { getActiveUserPackage, getTrendingProverbs } from "@/network/apiService";

const ApiProvider = ({ children }) => {
  const [hasActivePackage, setHasActivePackage] = useState(false);
  const [activeUserPackage, setActiveUserPackage] = useState(null);

  const [activePackageloading, setActivePackageLoading] = useState(false);
  const [activePackageError, setActivePackageError] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);


  const {
    data: trendingProverb,
    loading: trendingLoading,
    error: trendingError,
  } = useApiCall(getTrendingProverbs, null, isAuthenticated);


  const fetchActivePackage = async () => {
    try {
      setActivePackageLoading(true);
      const res = await getActiveUserPackage();
      setActiveUserPackage(res.data);
      setHasActivePackage(true);
    } catch (error) {
      setHasActivePackage(false);
      setActivePackageError(error?.response?.data);
    } finally {
      setActivePackageLoading(false);
    }
  };





  useEffect(() => {
    if (isAuthenticated) {
      fetchActivePackage();
    }
  }, [isAuthenticated]);


  useEffect(() => {
    if (activeUserPackage === null) {
      setHasActivePackage(false);
    } else {
      setHasActivePackage(true);
    }
  }, [activeUserPackage, hasActivePackage, activePackageError, activePackageloading]);

  return (
    <ApiContext.Provider
      value={{
        hasActivePackage,
        activePackageloading,
        setActivePackageLoading,
        setHasActivePackage,
        activePackageError,
        setActivePackageError,
        activeUserPackage,
        setActiveUserPackage,
        trendingProverb,
        trendingLoading,
        trendingError,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
