import React from "react";
import Footer from "../home/footer";
import Logo from "../../public/icon/logo.svg";
import Navbar from "../home/navbar";

const AuthLayout = ({ children, linksColor }) => {
  return (
    <div className="flex flex-col items-center w-full relative h-screen">
      <Navbar Logo={Logo} linksColor={linksColor} />
      {children}
      <Footer />
    </div>
  );
};

export default AuthLayout;
