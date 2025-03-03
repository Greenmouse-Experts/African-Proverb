import Image from "next/image";
import React from "react";
import RealcousinStyles from "../../styles/Realcousin.module.scss";
import RealCousnImage from "../../public/img/realcousinimage.png";
import Link from "next/link";

const RealCousin = () => {
  return (
    <div className={RealcousinStyles["realcousin-section"]}>
      <div className={RealcousinStyles["realcousin-container"]}>
        <div className={RealcousinStyles["realcousin-left"]}>
          <Image src={RealCousnImage} width={"100%"} height={"100%"} alt={"Real cousin website Logo"}  />
        </div>

        <div className={RealcousinStyles["realcousin-right"]}>
          <h1>You can now build your family tree. </h1>
          {/* <Link href="http://realcousins.com/" target="_blank">
            <button>Realcousins</button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default RealCousin;
