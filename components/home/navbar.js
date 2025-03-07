import React, { useContext, useState } from "react";
import NavStyles from "../../styles/Navbar.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { AuthContext } from "@/context/authContext";
import AccountMenu from "./account_menu";
import UserNotification from "../usernotification/UserNotification";
const RegisterDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (accountType) => {
    setIsOpen(false);
    alert(`You selected ${accountType}`);
  };

  return (
    <div className="relative inline-block text-left">
      <div
        className="flex items-center justify-between text-white text-sm bg-[#BB5D06] font-bold cursor-pointer p-3 px-4 rounded-lg w-[180px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Register</span>
        <span className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
          ▼
        </span>
      </div>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
           
          <p
            className="block px-1 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer text-sm"
          >
            <Link href={"/"}>Individual Account</Link>
          </p>
          <p
            className="block px-1 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer text-sm"

          >
            <Link href={"/auth/corporate-signup"}>Corporate Account</Link>
            
          </p>
        </div>
      )}
    </div>
  );
};

const Navbar = ({ openSidebar, Logo, linksColor = "dark" }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const isActive = (path) => router.pathname === path;

  return (
    <div className={NavStyles.container}>
      <Link href={"/"}>
        <div className={NavStyles["nav-logo"]}>
          <Image src={Logo} width={"100%"} height={"100%"} alt={"African Proverb Logo"} />
        </div>
      </Link>

      <div
        className={`${NavStyles["nav-links"]} ${linksColor === "light" ? `text-white` : linksColor === "dark" ? "text-black" : ""}`}
      >
        <Link href={"/"} className={isActive("/") ? NavStyles["active"] : ""}>Home</Link>
        <Link href={"/about"} className={isActive("/about") ? NavStyles["active"] : ""}>About</Link>
        <Link href={"/pricing"} className={isActive("/pricing") ? NavStyles["active"] : ""}>Pricing</Link>
        <Link href={"/contact"} className={isActive("/contact") ? NavStyles["active"] : ""}>Contact Us</Link>

        {isAuthenticated && (
          <UserNotification color={linksColor === "dark" ? "#bb5d06" : "#fff"} />
        )}
      </div>

      {isAuthenticated ? (
        <div className={NavStyles["nav-right-loggedin"]}>
          <Link href="/add_proverb" className={NavStyles["nav-btn-primary"]}>
            Add Proverb
          </Link>
          <AccountMenu />
        </div>
      ) : (
        <div className={NavStyles["nav-auth-links"]} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link
            href="/auth/login"
            className={`${NavStyles["nav-auth-login"]} ${linksColor === "light" ? `text-white` : linksColor === "dark" ? "text-black" : ""}`}
          >
            Login
          </Link>
          {/* Register dropdown injected here */}
          <RegisterDropdown />

        </div>
      )}

      <div className={NavStyles["hamburger-background"]} onClick={openSidebar}>
        <svg width="70" height="57" viewBox="0 0 70 57" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export default Navbar;
