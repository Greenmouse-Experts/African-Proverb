import React, { useContext, useState, useEffect } from "react";
import {
  OutlinedInput,
  FormControl,
  MenuItem,

} from "@mui/material";
import { EthnicContext } from "@/context/ethnicContext";
import { getSelectedLanguage } from "@/network/apiService";
import { useFormik } from "formik";
import { ProfileContext } from "@/context/profileContext";
import { upgradeLanguage } from "@/network/apiService";
import { toast } from "react-toastify";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';



const convertArrayToOptions = (array) => {
  return array.map((item) => ({
    label: item.ethnic_name,
    value: item.ethnic_id
  }));
};


const UpgradeSubLag = () => {
  const { fullDetails, getAllData } = useContext(ProfileContext);
  const { userselectLang, setUserSelectLang } = useContext(EthnicContext);
  const animatedComponents = makeAnimated();

  const [loading, setLoading] = useState(false);
  const [userPreferredLanguage, setUserPreferredLanguage] = useState("");
  const [selectedEthnicNames, setSelectedEthnicNames] = useState([]);
  const userPreferredLanguages = userselectLang?.userSelectedLanguages;
  const userAvailableLang = userselectLang?.userUnSelectedLanguages || [];
  const displayUserAvailableLanguage = userAvailableLang?.filter((item) => {
    const noOfEthnics = fullDetails?.data?.userPackage?._package?.noOfEthnics || 0;
    return selectedEthnicNames?.length !== noOfEthnics || selectedEthnicNames?.includes(item.ethnic_name);
  });
  const Languages = [
    ...userAvailableLang,
    ...(Array.isArray(userPreferredLanguages) ? userPreferredLanguages : []),
  ];
  const LanguageDisplay = Languages.filter((item) => item.ethnic_name !== userPreferredLanguage);



  useEffect(() => {

    const preferredLanguage =
      fullDetails?.data?.userPackage?.preferredEthnic?.name || "";
    setUserPreferredLanguage(preferredLanguage);

    const selectedEthnicNames = userPreferredLanguages?.map((item) => ({
      label: item.ethnic_name,
      value: item.ethnic_id
    }));

    setSelectedEthnicNames(selectedEthnicNames);
    const defaultOption = convertArrayToOptions(Languages).find(option => option.label === preferredLanguage);

    formik.setValues({
      ...formik.values,
      newLanguage: selectedEthnicNames,
      preferred_ethnic_id: defaultOption,
      initialSelectedEthnicNames: selectedEthnicNames,
    });

  }, [userPreferredLanguages]);






  const formik = useFormik({
    initialValues: {
      newLanguage: selectedEthnicNames,
      preferred_ethnic_id: userPreferredLanguage,
      initialSelectedEthnicNames: selectedEthnicNames,
    },

    onSubmit: async (values, { resetForm }) => {
      if (!formik.dirty) {
        return;
      }
      setLoading(true);



      try {
        // Check if both preferred language and additional languages have changed
        const bothChanged = values.preferred_ethnic_id.label !== userPreferredLanguage && values.newLanguage !== selectedEthnicNames;

        if (bothChanged) {
          const preferredLanguage = Languages.find(
            (lang) => lang.ethnic_name === values.preferred_ethnic_id.label
          );
          const preferredLanguageId = preferredLanguage
            ? preferredLanguage.ethnic_id
            : null;

          // Find the ethnic names that were initially selected
          const initialSelectedEthnicIds = values.initialSelectedEthnicNames.map((languageName) => {
            const selectedLanguage = Languages.find(
              (lang) => lang.ethnic_name === languageName.label
            );
            return selectedLanguage?.ethnic_id;
          });

          // Find the newly selected ethnic names
          const newSelectedEthnicIds = values.newLanguage.map((languageName) => {
            const selectedLanguage = Languages.find(
              (lang) => lang.ethnic_name === languageName.label
            );
            return selectedLanguage?.ethnic_id;
          });

          const selectedEthnicIds = newSelectedEthnicIds.filter((id) => !initialSelectedEthnicIds.includes(id));

          const updatelanguage = {
            subscriptionid:
              userselectLang?.userSelectedLanguages[0]?.subscriptionid,
            preferred_ethnic_id: preferredLanguageId,
            selected_ethnic_id: selectedEthnicIds,
          };

          const res = await upgradeLanguage(updatelanguage);

          if (res.status === 200) {
            toast.success("Preferred and Additional Languages Updated", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            throw new Error("Failed to update both preferred and additional languages");
          }
        } else if (values.preferred_ethnic_id.label !== userPreferredLanguage) {

          // Only preferred language has changed
          const preferredLanguage = Languages.find(
            (lang) => lang.ethnic_name === values.preferred_ethnic_id.label
          );
          const preferredLanguageId = preferredLanguage
            ? preferredLanguage.ethnic_id
            : null;

          const updatelanguage = {
            subscriptionid:
              userselectLang?.userSelectedLanguages[0]?.subscriptionid,
            preferred_ethnic_id: preferredLanguageId,
            selected_ethnic_id: [],
          };

          const res = await upgradeLanguage(updatelanguage);

          if (res.status === 200) {
            toast.success("Preferred Language Updated", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            throw new Error("Failed to update preferred language");
          }
        } else if ((values.newLanguage) !== (selectedEthnicNames)) {
          // Find the ethnic names that were initially selected
          const initialSelectedEthnicIds = values.initialSelectedEthnicNames.map((languageName) => {
            const selectedLanguage = Languages.find(
              (lang) => lang.ethnic_name === languageName
            );
            return selectedLanguage?.ethnic_id;
          });

          // Find the newly selected ethnic names
          const newSelectedEthnicIds = values.newLanguage.map((languageName) => {
            const selectedLanguage = Languages.find(
              (lang) => lang.ethnic_name === languageName.label
            );
            return selectedLanguage?.ethnic_id;
          });
          const selectedEthnicIds = newSelectedEthnicIds.filter((id) => !initialSelectedEthnicIds.includes(id));
          const updatelanguage = {
            subscriptionid:
              userselectLang?.userSelectedLanguages[0]?.subscriptionid,
            preferred_ethnic_id:
              fullDetails?.data?.userPackage?.preferredEthnic?.id,
            selected_ethnic_id: selectedEthnicIds,
          };

          const res = await upgradeLanguage(updatelanguage);

          if (res.status === 200) {
            toast.success("Additional Languages Updated", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            throw new Error("Failed to update additional languages");
          }
        }

        resetForm();
        getAllData();
        getSelectedLanguage().then((res) => {
          setUserSelectLang(res.data);
        });
      } catch (err) {
        handleApiError(err);
      } finally {
        setLoading(false);
      }
    },
  });


  const handleApiError = (err) => {

    const apiErrorMessage = err.response?.data?.data?.message || err.response?.data?.message;
    const errorMessage = `${apiErrorMessage}` || `: ${err.message}`;
    toast.error(
      <span style={{ fontSize: "15px" }}>{errorMessage}</span>,
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
  };


  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-[#BB5D06] font-bold text-xl">
          Subscription Language
        </h3>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col">
          <div className="mt-4">
            <FormControl className="w-full">
              <p
                style={{
                  color: "var(--neutral-neutral-0, #0A0A0A)",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "26.899px",
                }}
              >
                Preffered Language <span style={{ color: "#ff0000" }}>*</span>
              </p>

              <Select
                className="basic-single"
                classNamePrefix="Select a preferred Language"
                components={animatedComponents}

                value={formik?.values?.preferred_ethnic_id}
                isSearchable={true}
                name="preferred_ethnic_id"
                options={convertArrayToOptions(LanguageDisplay)}
                onChange={(selectedOption) => {
                  formik.setFieldValue("preferred_ethnic_id", selectedOption);
                }}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary25: '#BB5D06',
                  },
                })}
              />
            </FormControl>
          </div>
          <div className="mt-4">
            <FormControl className="w-full">

              <p
                style={{
                  color: "var(--neutral-neutral-0, #0A0A0A)",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "26.899px",
                }}
              >
                Selected Languages <span style={{ color: "#ff0000" }}>*</span>
              </p>

              <Select
                className="basic-single"
                classNamePrefix="Select Additional Language"
                value={formik.values.newLanguage}
                components={animatedComponents}

                isSearchable={true}
                isMulti
                name="newLanguage"
                options={convertArrayToOptions(displayUserAvailableLanguage)}
                onChange={(selectedOption) => {
                  formik.setFieldValue("newLanguage", selectedOption);
                }}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary25: '#BB5D06',
                  },
                })}
              />
            </FormControl>

          </div>
          <div className="w-full mt-4">
            <button
              type="submit"
              disabled={!formik.dirty}
              className="w-full bg-[#BB5D06] text-white rounded-md text-sm p-2 lg:p-3 md:text-base"
            >
              Update Language
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpgradeSubLag;
