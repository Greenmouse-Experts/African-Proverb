import Button from "@/components/reuse/button";
import Loader from "@/components/reuse/loader";
import MultipleSelect from "@/components/reuse/multiple_select";
import ReusableModal from "@/components/reuse/resuableModal/reuseable_modal";
import SelectDropdown from "@/components/reuse/selectDropdown";
import MultiStepContext from "@/context/StepContext";
import { EthnicContext } from "@/context/ethnicContext";
import { PackageContext } from "@/context/packageContext";
import useApiCall from "@/hooks/useCallApi";
import { getLastActivePackage, renewSubscription } from "@/network/apiService";
import {
  extractNameById,
  extractPackage,
  extractPackageDescription,
  extractPackageEthnicsNo,
  extractPriceById,
  validationSchema,
} from "@/utils";
import { MenuItem } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import BasicModal from "../auth/signup_payment_modal";
import { PaymentContext } from "@/context/paymentContext";
import ModalDialogue from "./ModalDialogue";
import PaymentOptions from "../payment/payment_option";
import GateWayPaymentButton from "../paymentButton/paymentButton";
import PaymentBanner from "../payment/paymentBanner";
import { ProfileContext } from "@/context/profileContext";
import { AuthContext } from "@/context/authContext";


const RenewSubscriptionForm = ({ handleMoveToNextPage }) => {
  const [open, setOpen] = useState(false);
  const { packageList } = useContext(PackageContext);
  const [maxLanguageSelections, setMaxLanguageSelections] = useState(1);
  const [description, setDescription] = useState("");
  const [paymentBannerOpen, setPaymentBannerOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRenewed, setIsRenewed] = useState(false);
  const { paymentOption, setRenewalMetadata } = useContext(PaymentContext);

  const {
    fullDetails,
    personalInfo,
    loading: profileDetailsLoading,
  } = useContext(ProfileContext);
  const { isAuthenticated } = useContext(AuthContext);

  const [selectedPlan, setSelectedPlan] = useState(null);

  const {
    data: currentPlan,
    loading: currentPlanLoading,
    error: currentPlanError,
  } = useApiCall(getLastActivePackage, null, isAuthenticated);

  


  useEffect(() => {
    setMaxLanguageSelections(
      extractPackageEthnicsNo(packageList, currentPlan.package_)
    );
    setSelectedPlan(extractPackage(packageList, currentPlan.package_));
  }, [currentPlanLoading]);

  const formik = useFormik({
    initialValues: {
      packageId: "",
      reference: "",
      ethnics: [],
      preferredEthnic: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const filteredEthnic = currentPlan?.selected_Ethincs?.map((ethnic) => {
    return ethnic.id;
  });

  const payload = {
    renewal: {
      packageID: currentPlan.package_,
      selectedEthnic: filteredEthnic,
      preferredEthnic: currentPlan?.preferred_Ethnic?.id,
      email: fullDetails?.data?.email,
    },
    payment_type: paymentOption,
    transaction_type: "RENEW",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRenewalMetadata(payload);
  };

  return (
    <div className="w-full h-full">
      <span className="flex justify-center mb-5 text-2xl">
        Renew Subscription
      </span>
      {currentPlanLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="border  current border-[#BB5D06] w-fit px-6 py-2 rounded-lg mx-auto bg-gray-200">
            <input
              type="radio"
              value={"GOLD"}
              checked={true}
              className="cursor-pointer inline-block mr-4"
            />
            <label for="html" className="ml-4 ">
              {`${extractNameById(
                packageList,
                currentPlan?.package_
              )} ${extractPriceById(packageList, currentPlan?.package_)}/annum`}
            </label>
          </div>

          {<p className="text-gray-500 mb-5 text-xs ">{description}</p>}

          <div className="flex flex-col items-center gap-3">
            <h1 className="text-[#BB5D06] text-xl">Preferred Ethnic</h1>
            <div className="border w-fit px-6 py-2 rounded-lg bg-gray-200">
              {currentPlan?.preferred_Ethnic?.name}
            </div>

            <h1 className="text-[#BB5D06] text-xl">Selected Ethnic</h1>
            <div className="flex mb-10 gap-3">
              {currentPlan?.selected_Ethincs?.map((ethnic) => {
                return (
                  <div
                    key={ethnic.name}
                    className="border w-fit px-6 py-2 rounded-lg bg-gray-200"
                  >
                    {ethnic.name}
                  </div>
                );
              })}
            </div>
          </div>

          {/* <SelectDropdown
          label="Preferred Language"
          id="ethnics"
          name="ethnics"
          items={ethnicsList}
          value={preferredLanguage}
          size="small"
          onChange={(e) => setPreferredLanguage(e.target.value)}
          // onBlur={formik.handleBlur}
        >
          {ethnicsList?.map((item, index) => {
            return (
              <MenuItem key={item.name} value={item}>
                {item.name}
              </MenuItem>
            );
          })}
        </SelectDropdown> */}

          {/* <MultipleSelect
          value={formik.values.ethnics}
          preferredLanguage={preferredLanguage}
          maxSelections={maxLanguageSelections}
        /> */}
          <Button
            type="submit"
            onClick={handleMoveToNextPage}
            textInput="Renew Your Subscription"
          ></Button>

          <ReusableModal
            open={paymentBannerOpen}
            setOpen={setPaymentBannerOpen}
          >
            <ModalDialogue />
            {/* <PaymentBanner
              planObject={selectedPlan}
              selectedLanguages={selectedLanguage}
              preferredLanguageName={""}
            />
            <PaymentOptions />
            <GateWayPaymentButton type={"renew"} /> */}
          </ReusableModal>
        </div>
      )}
    </div>
  );
};

export default RenewSubscriptionForm;
