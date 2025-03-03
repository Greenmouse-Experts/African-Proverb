import React, { useContext, useEffect } from "react";
import NavStyles from "../../styles/Navbar.module.scss";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "@/context/authContext";
import { useRouter } from "next/router";
import AccountMenu from "./account_menu";
import UserNotification from "../usernotification/UserNotification";
import { Button, Modal } from "antd";

const Navbar_auth = ({ openSidebar, Logo }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const isActive = (path) => {
    return router.pathname === path;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={NavStyles.container}>
      <Link href={"/"}>
        <div className={NavStyles["nav-logo"]}>
          <Image
            src={Logo}
            width={"100%"}
            height={"100%"}
            alt={"African Proverb Logo"}
          />
        </div>
      </Link>

      <div className={NavStyles["nav-links_auth"]}>
        <Link
          href={"/"}
          className={isActive("/") ? NavStyles["active"] : ""}

        >
          Home
        </Link>
        <Link href={"/about"}
          className={isActive("/about") ? NavStyles["active"] : ""}
        >About</Link>
        <Link href={"/pricing"}
          className={isActive("/pricing") ? NavStyles["active"] : ""}
        >Pricing</Link>
        <Link href={"/contact"}
          className={isActive("/contact") ? NavStyles["active"] : ""}
        >Contact Us</Link>
        {!isAuthenticated && (
          <Link
            className="bg-[#BB5D06] h-10 flex justify-center items-center p-3 rounded-sm md:self-end"
            href={"/auth/signup?freeTrial=true"}
          >
            Activate Free Trial Now
          </Link>
        )}
        {isAuthenticated && <UserNotification color="#BB5D06" />}
      </div>

      {isAuthenticated && (
        <div className={NavStyles["nav-right-loggedin"]}>
          <Link className={NavStyles["nav-btn-primary"]} href={"add_proverb"}>
            Add Proverb
          </Link>
          <AccountMenu />
        </div>
      )}

      {!isAuthenticated && (
        <div className={NavStyles["nav-auth-links"]}>
          <Link
            className={NavStyles["nav-auth-login_auth"]}
            href={"/auth/login"}
          >
            Login
          </Link>
          <Link className={NavStyles["nav-btn-primary"]} href={"/auth/signup"}>
            Sign Up
          </Link>
        </div>
      )}

      <div className={NavStyles["hamburger-background"]} onClick={openSidebar}>
        <svg
          width="70"
          height="57"
          viewBox="0 0 70 57"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="0.302734" width="70" height="56" rx="5" fill="#F7F7FF" />
          <path
            d="M16 16.3027H54.7857M16 28.6436H54.7857M16 40.9845H54.7857"
            stroke="#BB5D06"
            strokeWidth="4.23117"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Navbar_auth;
