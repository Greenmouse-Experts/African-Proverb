import styles from "@/styles/Authwrapper.module.scss";
import React from "react";
import AfricaLogo from "@/public/img/africa-logo.png";
import Logo from "@/public/icon/primarylogo.svg";
import Image from "next/image";
// import { Carousel } from "react-responsive-carousel";
import { Carousel } from "antd";
import Link from "next/link";

const contentStyle = {
  margin: 0,
  color: "#fff",
  textAlign: "center",
  marginBottom: "3rem",
};
const AuthWrapper = ({ children, headerText }) => {
  const onChange = (currentSlide) => {};
  return (
    <div className={styles["container"]}>
      <div className={styles["left"]}>
        <div style={{ width: "300px" }}>
          <Carousel autoplay afterChange={onChange}>
            <div>
              <Image src={AfricaLogo} alt={"African Proverb Logo"}></Image>

              <h3 style={contentStyle}>
                Dive into a treasure trove of ancient wisdom and explore a wide
                range of African proverbs from various regions and ethnic
                groups. Discover proverbs that reflect the values, beliefs, and
                traditions of Africa, spanning themes like wisdom, love, unity,
                perseverance, and much more.
              </h3>
            </div>
            <div>
              <Image src={AfricaLogo} alt={"African Proverb Logo"}></Image>
              <h3 style={contentStyle}>
                Dive into a treasure trove of ancient wisdom and explore a wide
                range of African proverbs from various regions and ethnic
                groups. Discover proverbs that reflect the values, beliefs, and
                traditions of Africa, spanning themes like wisdom, love, unity,
                perseverance, and much more.
              </h3>
            </div>
            <div>
              <Image src={AfricaLogo} alt={"African Proverb Logo"}></Image>
              <h3 style={contentStyle}>
                Dive into a treasure trove of ancient wisdom and explore a wide
                range of African proverbs from various regions and ethnic
                groups. Discover proverbs that reflect the values, beliefs, and
                traditions of Africa, spanning themes like wisdom, love, unity,
                perseverance, and much more.
              </h3>
            </div>
          </Carousel>
        </div>
      </div>
      <div className={styles["right"]}>
        <div className={styles["children"]}>{children}</div>
      </div>
    </div>
  );
};

export default AuthWrapper;
