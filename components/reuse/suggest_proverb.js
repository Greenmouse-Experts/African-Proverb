import { useState } from "react";
import ReusableModal from "./resuableModal/reuseable_modal";
import Link from "next/link";
import SuggestProverbForm from "../suggest_proverb/suggestProverbForm";
import { BiPencil, BiSolidPencil } from "react-icons/bi";
import { Tooltip } from "@mui/material";

const SuggestProverb = ({ id, categories }) => {
  const [showPopup, setOpen] = useState(false);
  return (
    <>
      <Tooltip title="Suggest a Correction">
        <span
          style={{
            padding: ".2em",
            border: "1px solid var(--primary-color)",
            borderRadius: "10px",
            justifyContent: "center",
            color: "var(--primary-color)",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            justifyContent: "center",
          }}
          onClick={() => setOpen(!showPopup)}
        >
          <BiPencil style={{ fontSize: "18px" }} />
        </span>
      </Tooltip>
      <ReusableModal setOpen={setOpen} open={showPopup}>
        <SuggestProverbForm id={id}  categories={categories} setOpen={setOpen} />
      </ReusableModal>
    </>
  );
};

export default SuggestProverb;
