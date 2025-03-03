import React from "react";
import ProfileStyles from "@/styles/Profile.module.scss";
import Link from "next/link";
import Logo from "../../public/icon/quiz.svg";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

const Header = ({ setOpen }) => {
  return (
    <div className="flex justify-between items-center mb-[3rem] max-sm:flex-col max-sm:justify-start">
      <h1 className={ProfileStyles["header-text"]}>My Profile</h1>
      <div className="flex items-center gap-10">
        <Link href={`/quiz`} className="flex border-[0.5px] border-[#BB5D06] text-[#BB5D06] py-[8px] px-[20px] rounded-[5px] items-center gap-2">
          <span className=" border-[0.2px] border-[#BB5D06] rounded-[3px] p-1">
            <Image src={Logo} alt="icon" width={15} height={15} />

          </span>
          Available Quiz
          <FaArrowRight className="text-[#BB5D06]" />
        </Link>
        <Link
          href={``}
          onClick={() => setOpen(true)}
          className="flex border-[0.5px] border-[#BB5D06] text-[#BB5D06] py-[8px] px-[20px] rounded-[5px] items-center gap-2">
          <span className=" border-[0.2px] border-[#BB5D06] rounded-[3px] p-1">
            <Image src={Logo} alt="icon" width={15} height={15} />

          </span>
          Generate Quiz
          <FaArrowRight className="text-[#BB5D06]" />
        </Link>
        <Link
          href={`/edit/reset-password`}
          className={ProfileStyles["reset-password"]}
        >
          Change Password
        </Link>
      </div>
    </div>
  );
};

export default Header;
