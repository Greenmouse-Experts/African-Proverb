import React from "react";
import HeroStyles from "../../styles/Pageshero.module.scss";
import Navbar from "../home/navbar";
import { useState } from "react";
import Sidebar from "./sidebar";
import Link from "next/link";
import Twitter from "../../public/icon/twitter.svg";
import Instagram from "../../public/icon/instagram.svg";
import Linkedin from "../../public/icon/wlinkedin.svg";
import Facebook from "../../public/icon/facebook.svg";
import Logo from "../../public/icon/whitelogo.svg";


const PagesHero = ({ pageTitle, pageLink }) => {
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar((prevState) => !prevState);
  };
  return (
    <>
      <div className={HeroStyles["hero-container"]}>
        <Navbar linksColor="light" openSidebar={toggleSidebar} Twitter={Twitter} Instagram={Instagram} Linkedin={Linkedin} Facebook={Facebook} Logo={Logo}/>
        <div className={HeroStyles["hero-content"]}>
          <h1>{pageTitle}</h1>
          <p>
            <Link href={"./"}>
            <span className={HeroStyles["left-span"]}>Home </span>{" "}
            </Link>
            <span> &gt; </span>
            <span className={HeroStyles["right-span"]}>{pageLink}</span>
          </p>
        </div>

        <div className={HeroStyles["base-pattern"]}></div>
      </div>
      <Sidebar toggleSidebar={toggleSidebar} sidebar={sidebar}  />
    </>
  );
};

export default PagesHero;
