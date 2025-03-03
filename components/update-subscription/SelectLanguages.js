import { EthnicContext } from "@/context/ethnicContext";
import { useContext, useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { toast } from "react-toastify";
import SelectLanguage from "../../styles/SelectLanguage.module.scss";

const SelectLanguages = ({
  handleMoveToNextPage,
  handleMoveToPreviousPage,
  selectedPlan,
  setTypeofUpgrade,
  typeofUpdgrade,
  prefferedLanguage,
  setPrefferedLanguage,
  selectedLanguages,
  setSelectedLanguages,
  setPreferredLanguageName,
}) => {
  const { ethnicsList } = useContext(EthnicContext);
  const [showdropdown, setShowDropdown] = useState(false);

  const activeState = (type) => {
    return type === typeofUpdgrade;
  };

  const handleAddSelectedLanguage = (ethnic) => {
    const { noOfEthnics } = selectedPlan;
    if (!prefferedLanguage)
      return toast.error("Please choose a preferred language first");
    const ethnicToBeAdded = selectedLanguages.find(
      ({ name }) => name === ethnic.name
    );
    if (ethnicToBeAdded) return toast.error("Language already selected");

    if (selectedLanguages.length > noOfEthnics - 1) {
      toast.error("Sorry you can't add any more languages to this plan");
      return;
    }
    setSelectedLanguages((prev) => [...prev, ethnic]);
  };

  const removeSelectedLanguage = (ethnic) => {
    if (ethnic.id === prefferedLanguage) {
      setPrefferedLanguage("");
      setPreferredLanguageName("");
      return setSelectedLanguages([]);
    }
    const filteredLanguages = selectedLanguages.filter(
      ({ language }) => language !== ethnic.language
    );
    setSelectedLanguages(filteredLanguages);
  };

  const handleChangePreferredLanguage = (e) => {
    if (e.target.value === "") {
      setPrefferedLanguage("");
      setPreferredLanguageName("");
      return setSelectedLanguages([]);
    }
    setPrefferedLanguage(e.target.value);
    setPreferredLanguageName(e.target.name);
  };

  useEffect(() => {
    if (selectedLanguages.length > 0) return;
    if (prefferedLanguage) {
      const preferredLanguageEthnicity = ethnicsList.find(
        ({ id }) => id === prefferedLanguage
      );
      setSelectedLanguages([preferredLanguageEthnicity]);
    }
  }, [prefferedLanguage]);

  return (
    <div className={SelectLanguage["wrapper"]}>
      <div
        onClick={handleMoveToPreviousPage}
        className={SelectLanguage["back-arrow"]}
      >
        <AiOutlineArrowLeft />
      </div>
      <h1 className={SelectLanguage["title"]}>Update your subscription</h1>

      <div>
        <label className={SelectLanguage["label"]}>
          Preffered Language <span>*</span>
        </label>
        <select
          value={prefferedLanguage}
          onChange={handleChangePreferredLanguage}
          className={SelectLanguage["ethnic-dropdown"]}
        >
          <option value=""> choose preferred language</option>
          {ethnicsList &&
            ethnicsList?.map((ethnic) => (
              <option key={ethnic.id} value={ethnic.id} name={ethnic.language}>
                {ethnic.language}
              </option>
            ))}
        </select>
      </div>

      <div className={SelectLanguage["language-wrapper"]}>
        <label className={SelectLanguage["label"]}>
          Select Language <span>*</span>
        </label>
        <div className={SelectLanguage["language-container"]}>
          <div className={SelectLanguage["language-pill-container"]}>
            {selectedLanguages.length > 0 ? (
              selectedLanguages.map((ethnic) => (
                <span
                  key={ethnic.id}
                  style={{
                    backgroundColor: `${
                      ethnic?.id === prefferedLanguage ? "#E7E7E7" : ""
                    }`,
                    border: `.5px solid ${
                      ethnic?.id === prefferedLanguage ? "#4F4F4F" : ""
                    } `,
                  }}
                  className={SelectLanguage["language-result"]}
                >
                  {ethnic?.name}
                  <span
                    key={ethnic?.id}
                    onClick={() => removeSelectedLanguage(ethnic)}
                    className={SelectLanguage["language-icon"]}
                  >
                    &times;
                  </span>
                </span>
              ))
            ) : (
              <p
                onClick={() => setShowDropdown(!showdropdown)}
                style={{ cursor: "pointer" }}
              >
                Select other languages
              </p>
            )}
          </div>
          <div className={SelectLanguage["icon-container"]}>
            {showdropdown ? (
              <span
                className={SelectLanguage["icon"]}
                onClick={() => setShowDropdown(!showdropdown)}
              >
                <BsChevronUp />
              </span>
            ) : (
              <span
                className={SelectLanguage["icon"]}
                onClick={() => setShowDropdown(!showdropdown)}
              >
                <BsChevronDown />
              </span>
            )}
          </div>
        </div>

        {showdropdown && (
          <div className={SelectLanguage["dropdown-container"]}>
            {ethnicsList &&
              ethnicsList?.map((ethnic) => (
                <p
                  key={ethnic.id}
                  onClick={() => handleAddSelectedLanguage(ethnic)}
                  className={SelectLanguage["language"]}
                >
                  {ethnic.language}
                </p>
              ))}
          </div>
        )}
      </div>

      <div className={SelectLanguage["pricing-options"]}>
        <div
          onClick={() => setTypeofUpgrade("DIFF")}
          className={SelectLanguage["pricing-option"]}
          style={{
            backgroundColor: activeState("DIFF") && "#ddd",
            border: activeState("DIFF") && "1px solid #666",
          }}
        >
          <div
            style={{
              backgroundColor: activeState("DIFF") && "#888",
              border: activeState("DIFF") && "2px solid #666",
            }}
          ></div>
          <p>Upgrade with differential price</p>
        </div>
        <div
          onClick={() => setTypeofUpgrade("FULL")}
          className={SelectLanguage["pricing-option"]}
          style={{
            backgroundColor: activeState("FULL") && "#ddd",
            border: activeState("FULL") && "1px solid #666",
          }}
        >
          <div
            style={{
              backgroundColor: activeState("FULL") && "#888",
              border: activeState("FULL") && "2px solid #666",
            }}
          ></div>
          <p>Upgrade with full package price</p>
        </div>
      </div>

      <button
        onClick={handleMoveToNextPage}
        className={SelectLanguage["button"]}
        disabled={!(selectedLanguages.length > 0) && true}
      >
        Next <AiOutlineArrowRight />
      </button>
      {/* <h1>Page 2</h1>
      <button onClick={handleMoveToNextPage}>next</button>
      <button onClick={handleMoveToPreviousPage}>previous</button> */}
    </div>
  );
};

export default SelectLanguages;
