import React from "react";
import { BsArrowRightShort } from "react-icons/bs";
import ProfileStyles from "@/styles/Profile.module.scss";
import ProverbCard from "../reuse/proverb_card";
import Link from "next/link";
import { removeHtmlTags, sliceString } from "@/utils";

const FavouriteProverbs = ({ proverbs }) => {
  // const res = Array.isArray(proverbs) ? proverbs : [proverbs];
  const prepare = (arr) => {
    if (!arr) return [];
    if (typeof arr === "string") return [string];
    return arr.map(({ name }) => ({ name }));
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-[#BB5D06] font-bold text-xl font-sans">
          Favourite Proverbs
        </h3>
        <Link
          href={"/favourite-proverbs/all"}
          className="flex gap-1 items-center px-4 py-2 rounded-md font-semibold text-[#BB5D06]"
        >
          View All <BsArrowRightShort />
        </Link>
      </div>
      <div className={ProfileStyles["favourite-proverbs"]}>
        {proverbs &&
          proverbs?.data
            .slice(0, 4)
            ?.map(({ id, content, slug, ethnic, categories }) => {
              const withoutTags = removeHtmlTags(content);
              const slicedString = sliceString(withoutTags);
              const categorArry = prepare(categories);

              return (
                <div className={ProfileStyles["favourite-proverbs-card"]} key={id}>
                  <ProverbCard
                    proverb={slicedString}
                    id={id}
                    category={categorArry}
                    ethnic={ethnic.name}
                    key={id}
                    slug={slug}
                    type="Today's"
                  />
                </div>
              );
            })}
      </div>
    </>
  );
};

export default FavouriteProverbs;
