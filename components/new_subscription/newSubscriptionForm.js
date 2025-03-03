import Button from "@/components/reuse/button";
import MultipleSelect from "@/components/reuse/multiple_select";
import SelectDropdown from "@/components/reuse/selectDropdown";
import MultiStepContext from "@/context/StepContext";
import { EthnicContext } from "@/context/ethnicContext";
import { extractPackage, validationSchema } from "@/utils";
import { MenuItem } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { PaymentContext } from "@/context/paymentContext";
import { ProfileContext } from "@/context/profileContext";

const NewSubscriptionForm = ({
  handleMoveToNextPage,
  setSelectedPlan,
  selectedPlan,
  selectedPackage,
  formik,
}) => {
  const { ethnicsList } = useContext(EthnicContext);
  const { selectedLanguage } = useContext(MultiStepContext);
  const { setSubscribeMetadataCouponOnly, selectedCoupon, subscribeMetadataCouponOnly } =
    useContext(PaymentContext);

  const payload = {
    transaction_type: "SUBSCRIBE",
    couponCode: selectedCoupon?.couponCode,
    subscribe: {
      packageId: selectedPackage?.id,
      selectedEthnic: selectedLanguage,
      preferredEthnic: formik.values.preferredEthnic,
    },
  };

  const handleSubmit = (e) => {
    setSubscribeMetadataCouponOnly(payload);
    handleMoveToNextPage();
  };

  useEffect(() => {
    setSubscribeMetadataCouponOnly({
      ...subscribeMetadataCouponOnly,
      couponCode: selectedCoupon?.couponCode,
    });
    }, [selectedCoupon, formik.values.preferredEthnic, selectedLanguage]);
  // }, [selectedCoupon]);


  return (
    <div className="w-full h-full p-10">
      <span className="flex justify-center mb-5 text-2xl">
        New Subscription
      </span>

      <div className="border  current border-[#BB5D06] w-fit px-6 py-2 rounded-lg mb-10 bg-gray-200">
        <input
          type="radio"
          value={"GOLD"}
          checked={true}
          defaultChecked
          className="cursor-pointer inline-block mr-4"
        />
        <label for="html" className="ml-4 ">
          {`${selectedPackage?.name} ${selectedPackage?.amount}/annum`}
        </label>
      </div>

      <div className="w-full mt-5">
        <SelectDropdown
          label="Preferred Language"
          id="preferredEthnic"
          name="preferredEthnic"
          // items={ethnicsList}
          value={formik.values.preferredEthnic}
          size="small"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          {ethnicsList?.map((item, index) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            );
          })}
        </SelectDropdown>

        <MultipleSelect
          value={formik.values.ethnics}
          preferredLanguage={extractPackage(
            ethnicsList,
            formik.values.preferredEthnic
          )}
          maxSelections={selectedPackage?.noOfEthnics}
        />

        <Button
          type="submit"
          onClick={handleSubmit}
          textInput="Proceed"
          disabled={
            formik.values.preferredEthnic === "" ||
            selectedLanguage.length === 0
          }
          // disabled={selectedLanguage.length === 0}
        ></Button>
      </div>
    </div>
  );
};

export default NewSubscriptionForm;
