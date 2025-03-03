import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";

const PersonalAndContactHeader = ({ toggleUserInfo, settoggleUserInfo }) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-[#BB5D06] font-bold text-xl font-sans">
          {toggleUserInfo === "contact-info"
            ? "Personal Information"
            : "Address Information"}
        </h3>
        <Link
          href={`${
            toggleUserInfo === "contact-info" ? "edit/profile" : "edit/address"
          }`}
          className="flex gap-1 items-center bg-[#FAF2EB] px-4 py-2 rounded-md font-semibold text-[#BB5D06]"
        >
          Edit <AiOutlineEdit />
        </Link>
      </div>

      <div className="flex gap-1 p-2 bg-[#EFEFEF] rounded-sm w-fit">
        <button
          className={`py-1 px-2 text-white text-sm rounded-sm ${
            toggleUserInfo === "contact-info" ? "bg-[#BB5D06]" : "bg-gray-500"
          }`}
          onClick={() => settoggleUserInfo("contact-info")}
        >
          Personal
        </button>
        <button
          className={`py-1 px-2 text-white text-sm rounded-sm ${
            toggleUserInfo === "address-info" ? "bg-[#BB5D06]" : "bg-gray-500"
          }`}
          onClick={() => settoggleUserInfo("address-info")}
        >
          Address
        </button>
      </div>
    </>
  );
};

export default PersonalAndContactHeader;
