import React, { useContext } from "react";
import SidebarStyles from "../../styles/Sidebar.module.scss";
import { AuthContext } from "@/context/authContext";

import Link from "next/link";

const Sidebar = ({ sidebar, toggleSidebar }) => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  // const router = useRouter();
  function handleLogout() {
    logout();
    // router.push("/auth/login");
  }
  return (
    <div className={SidebarStyles.sidebarcontainer}>
      <div
        className={`${
          sidebar ? SidebarStyles.sidebaropen : SidebarStyles.sidebarcontent
        } : ${SidebarStyles.sidebarcontent}`}
      >
        <h1>Menu</h1>

        <ul>
          <Link href={"/"}>
            <li>Home</li>
          </Link>
          <Link href={"/about"}>
            {" "}
            <li>About Us</li>
          </Link>
          <Link href={"/search_result"}>
            <li>African Proverbs</li>
          </Link>
          <Link href={"/contact"}>
            <li>Contact Us</li>
          </Link>
          <Link href={"/contact"}>
            <li>Profile</li>
          </Link>
          {isAuthenticated && (
            <Link href={"#"} onClick={handleLogout}>
              <li>Logout</li>
            </Link>
          )}

          {!isAuthenticated && (
            <div className={SidebarStyles["nav-auth-links"]}>
              <Link
                className={SidebarStyles["nav-auth-login"]}
                href={"/auth/login"}
              >
                Login
              </Link>
              <Link
                className={SidebarStyles["nav-auth-signup"]}
                href={"/auth/signup"}
              >
                Sign Up
              </Link>
            </div>
          )}
        </ul>
      </div>

      <div
        onClick={toggleSidebar}
        className={`${
          sidebar
            ? SidebarStyles.sidebaroverlayopen
            : SidebarStyles.sidebaroverlay
        }`}
      ></div>
    </div>
  );
};

export default Sidebar;
