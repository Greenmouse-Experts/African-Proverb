import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/public/icon/primarylogo.svg";

const AuthHeader = ({ headerText }) => {
  return (
    <>
      <Link href={"/"} className="flex justify-center">
        <Image src={Logo} width={100} alt={"African Proverb Logo"} />
      </Link>
      <h1>{headerText}</h1>
    </>
  );
};

export default AuthHeader;
