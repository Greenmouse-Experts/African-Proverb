import React from "react";
import Footer from "../home/footer";
import PagesHero from "./pages_hero";

const Layout = ({ children, pageTitle, pageLink}) => {
  return (
    <div style={{width:"100%"}}>
      <PagesHero pageTitle={pageTitle} pageLink={pageLink}/>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
