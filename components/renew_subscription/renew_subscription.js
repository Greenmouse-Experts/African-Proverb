import ReusableModal from "@/components/reuse/resuableModal/reuseable_modal";

import { useContext, useEffect, useState } from "react";
import ModalDialogue from "./ModalDialogue";
import { ProfileContext } from "@/context/profileContext";
import { getLastActivePackage } from "@/network/apiService";
import useApiCall from "@/hooks/useCallApi";
import { extractPackage, extractPackageEthnicsNo } from "@/utils";
import { PackageContext } from "@/context/packageContext";
import { ApiContext } from "@/context/apiContext";
import { AuthContext } from "@/context/authContext";


const RenewSubscription = () => {
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const { packageList } = useContext(PackageContext);
  const { hasActivePackage } = useContext(ApiContext);
  const { isAuthenticated } = useContext(AuthContext);


  const {
    data: currentPlan,
    loading: currentPlanLoading,
    error: currentPlanError,
  } = useApiCall(getLastActivePackage, null, isAuthenticated );

  useEffect(() => {
    setSelectedPlan(extractPackage(packageList, currentPlan.package_));
  }, [currentPlanLoading]);

  const filteredEthnic = currentPlan?.selected_Ethincs?.map((ethnic) => {
    return ethnic.id;
  });

  return (
    <>
      <button
        disabled={hasActivePackage}
        onClick={() => setOpen(true)}
        className={`text-[#BB5D06] bg-[#FAF2EB] p-2 rounded-sm text-sm md:text-base ${
          hasActivePackage
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-[#F8E8D4]"
        }`}
      >
        Renew Subscription
      </button>
      <ReusableModal open={open} setOpen={setOpen}>
        <ModalDialogue
          setOpen={setOpen}
          selectedPlan={selectedPlan}
          filteredEthnic={filteredEthnic}
          preferredLanguage={currentPlan?.preferred_Ethnic?.name}
          currentPlan={currentPlan}
        />
      </ReusableModal>
    </>
  );
};

export default RenewSubscription;
