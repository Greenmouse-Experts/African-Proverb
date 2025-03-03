import React from "react";
import ProverbCardStyles from "../../styles/Proverbcard.module.scss";
import ArrowForward from "../../public/img/arrowforward.svg";
import Image from "next/image";
import Link from "next/link";

const ProverbCard2 = ({
  proverb,
  category,
  ethnic,
  slug,
  setCategory,
  setEthnic,
}) => {
  const searchId = slug;

  return (
    <div className={ProverbCardStyles["card-container"]}>
      <div className={ProverbCardStyles["proverb-btn"]}>
        <button
          onClick={() => setEthnic(ethnic)}
          className={ProverbCardStyles["ethnic"]}
        >
          {ethnic}
        </button>
        <button
          onClick={() => setCategory(category[0].name)}
          className={ProverbCardStyles["category"]}
        >
          {category[0].name}
        </button>
      </div>

      <p className={ProverbCardStyles["proverb"]}>{proverb}</p>

      <div className={ProverbCardStyles["other-categories"]}></div>

      <Link
        className={ProverbCardStyles["view-proverb"]}
        href={`/proverb_detail?q=${searchId}`}
      >
        <p>View Proverb</p>
        <Image src={ArrowForward} alt={"Forward Arrow Icon"} />
      </Link>
    </div>
  );
};

export default ProverbCard2;
