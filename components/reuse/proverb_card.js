import React from "react";
import ProverbCardStyles from "../../styles/Proverbcard.module.scss";
import ArrowForward from "../../public/img/arrowforward.svg";
import Image from "next/image";
import Link from "next/link";
import { arrayToString, stringToArray } from "@/utils";
import SuggestProverb from "./suggest_proverb";

const prepareCategory = (category) => {
  // category = category.replace(/,\s*$/, "");
  // if (typeof category === "string" && category.length !== 0) return category?.split(",").slice(0, 2);
  if (typeof category === "string") return [category];
  else return category.map(({ name }) => name);
};
// const prepareProfileCategory = (category) => {
//   console.log(category);
//   if (typeof category === "string") return [category];
//   else return category.map((name) => name);
// };
const ProverbCard = ({
  type,
  id,
  proverb,
  category,
  ethnic,
  slug,
  setCategory,
  setEthnic,
  page,
  eth,
  currentCategory,
  currentEthnic,
  currentPage,
}) => {
  const searchId = id;

  return (
    <div className={ProverbCardStyles["card-container"]}>
      <div className={ProverbCardStyles["proverb-btn"]}>
        <button
          onClick={() => setEthnic(ethnic)}
          className={ProverbCardStyles["ethnic"]}
        >
          {ethnic}
        </button>
        <div>
          {prepareCategory(category)
            .slice(0, 2)
            .map((item, index) => {
              return (
                <button
                  key={index}
                  onClick={() => setCategory(item)}
                  className={ProverbCardStyles["category"]}
                >
                  {item}
                </button>
              );
            })}
        </div>
      </div>

      <p className={ProverbCardStyles["proverb"]}>{proverb}</p>

      <div className={ProverbCardStyles["other-categories"]}>
        {category > 1 ? (
          <span>
            <p>
              Other Categories:
              {categoryArray.slice(1).map((item) => {
                return (
                  <span
                    key={item}
                    className={ProverbCardStyles["other-categories-btn"]}
                    onClick={() => setCategory(item)}
                  >
                    <p>{`#${item} `}</p>
                  </span>
                );
              })}
            </p>
          </span>
        ) : (
          ""
        )}
      </div>

      <Link
        className={ProverbCardStyles["view-proverb"]}
        // href={`/proverb_detail?q=${id}&page=${page}&ethnic=${eth}&proverb=${proverb}`}
        // as={`/proverb_detail?q=${id}&page=${page}&ethnic=${eth}&proverb=${proverb}`}
        href={`/proverb_detail?q=${id}&page=${currentPage}&category=${currentCategory}&ethnic=${currentEthnic}&proverb=${proverb}`}
        as={`/proverb_detail?q=${id}&page=${currentPage}&category=${currentCategory}&ethnic=${currentEthnic}&proverb=${proverb}`}
        passHref
      >
        <p>View Proverb</p>
        <Image src={ArrowForward} alt={"Forward Arrow Icon"} />
      </Link>
    </div>
  );
};

export default ProverbCard;
