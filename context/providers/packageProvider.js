import { useContext } from "react";
import { PackageContext } from "../packageContext";
import { getPackages, getTrendingProverbs } from "@/network/apiService";
import useApiCall from "@/hooks/useCallApi";
import { AuthContext } from "@/context/authContext";

// import { getAuthStatus } from "@/utils";

const PackageProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  const {
    data: packageList,
    loading: isTrendingloading,
    error: trendingError,
  } = useApiCall(getPackages, null, isAuthenticated);

  const {
    data: trendingProverb,
    loading,
    error,
  } = useApiCall(getTrendingProverbs, null, isAuthenticated);

  return (
    <PackageContext.Provider
      value={{
        packageList,
        loading,
        trendingProverb,
        error,
      }}
    >
      {children}
    </PackageContext.Provider>
  );
};

export default PackageProvider;
