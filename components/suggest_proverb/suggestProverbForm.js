import SuggestProverbFormStyles from "../../styles/SuggestProverbFormStyles.module.scss";
import { useEffect, useState } from "react";
import Button from "@/components/reuse/button";
import { submitCorrection } from "@/network/proverbsService";
import { ToastContainer, toast } from "react-toastify";

const SuggestProverbForm = ({ id, categories, setOpen }) => {
  const initialCORRECTIONMODES = [
    { id: "1", mode: "UPDATE" },
    { id: "2", mode: "ADD" },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("");
  const [action, setAction] = useState("UPDATE");
  const [textValue, setTextValue] = useState("");
  const [categoriesData] = useState(categories);
  const [oldcategory, setOldCategory] = useState(categories[0].id);
  const [CORRECTIONMODES, setCORRECTIONMODES] = useState(
    initialCORRECTIONMODES
  );

  const CORRECTIONTYPES = [
    { id: "1", type: "PROVERB" },
    { id: "2", type: "CATEGORY" },
    { id: "3", type: "INHERENT WISDOM" },
    { id: "4", type: "TRANSLITERATION" },
  ];

  useEffect(() => {
    if (type !== "CATEGORY") {
      setAction("UPDATE");
      setCORRECTIONMODES([{ id: "1", mode: "UPDATE" }]);
    } else {
      setCORRECTIONMODES([
        { id: "1", mode: "UPDATE" },
        { id: "2", mode: "ADD" },
      ]);
    }
  }, [type]);

  async function handleSubmitCorrection(e) {
    e.preventDefault();
    const payload = {
      proverb_id: id,
      correction_type: type === "INHERENT WISDOM" ? "WISDOM" : type, // either PROVERB, TRANSLITERATION, WISDOM or CATEGORY
      correction_value: textValue,
      correction_old_id: oldcategory,
      correctionMode: action, //either ADD or UPDATE
    };
    setIsLoading(true);
    submitCorrection(payload)
      .then((res) => {
        toast.success("Correction Submitted for Review");
        setTimeout(() => {
          setOpen();
        }, 1000);
      })
      .catch((e) => {
        toast.error("an error occured please try again");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleChange(e) {
    setTextValue(e.target.value);
  }
  function handleChange(e) {
    setTextValue(e.target.value);
  }

  return (
    <div className={SuggestProverbFormStyles["container"]}>
      <h1 className={SuggestProverbFormStyles["form-title"]}>
        Suggest a Correction
      </h1>
      <form onSubmit={handleSubmitCorrection}>
        <div className={SuggestProverbFormStyles["form-group"]}>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={SuggestProverbFormStyles["select-dropdown"]}
          >
            <option>Choose Correction Type...</option>
            {CORRECTIONTYPES.map(({ id, type }) => (
              <option value={type} key={id}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className={SuggestProverbFormStyles["form-group"]}>
          <select
            value={action}
            onChange={(e) => setAction(e.target.value)}
            className={SuggestProverbFormStyles["select-dropdown"]}
          >
            {CORRECTIONMODES.map(({ id, mode }) => (
              <option
                disabled={type === "CATEGORY" ? false : true}
                value={mode}
                key={id}
              >
                {mode}
              </option>
            ))}
          </select>
        </div>

        {categoriesData && type === "CATEGORY" && action === "UPDATE" && (
          <div className={SuggestProverbFormStyles["form-group"]}>
            <select
              value={oldcategory}
              onChange={(e) => setOldCategory(e.target.value)}
              className={SuggestProverbFormStyles["select-dropdown"]}
            >
              {categoriesData.map(({ name, id }, index) => (
                <option value={id} key={index}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={SuggestProverbFormStyles["form-group"]}>
          <textarea
            onChange={handleChange}
            className={SuggestProverbFormStyles["form-text-area"]}
            placeholder="Enter suggestion"
          />
        </div>

        <div className={SuggestProverbFormStyles["form-group"]}>
          <Button
            isLoading={isLoading}
            disabled={textValue.length > 0 ? false : true}
            type="submit"
            textInput={isLoading ? "" : "Submit"}
          ></Button>
        </div>
      </form>
    </div>
  );
};

export default SuggestProverbForm;
