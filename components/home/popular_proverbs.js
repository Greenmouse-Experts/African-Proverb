import React, { useContext, useState, useRef, useEffect } from "react";
import PopularProverbsStyles from "../../styles/Popularproverbs.module.scss";
import SectionHeader from "../reuse/section_header";
import HomeProverb from "./home_proverb_card_2";
import { useRouter } from "next/router";
import Loader from "../reuse/loader";
import { removeHtmlTags, sliceString } from "@/utils";
import { AuthContext } from "@/context/authContext";
import TodayProverb from "./today_proverb";
import TrendingProverb from "./trending_proverb";
import Carousel from "better-react-carousel";
import { toast } from "react-toastify";
import { ApiContext } from "@/context/apiContext";

const PopularProverbs = ({ category, randomProverbs, isLoading }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("");
  const { isAuthenticated } = useContext(AuthContext);
  const { hasActivePackage, activePackageLoading } = useContext(ApiContext);
  



  function handleTabClick(tabName, text) {
    if (!isAuthenticated) {
      toast.error("Please Kindly Register To Access", {
        autoClose: 1000,
        theme: "dark",
      });
    } else {
      router.push({
        pathname: "/search_result",
        query: { searchCategory: text.toLowerCase() },
      });
    }
  }

  return (
    <div className={PopularProverbsStyles["popular-proverbs-container"]}>
      <SectionHeader header="Proverbs Category" />
      <div className={PopularProverbsStyles["category-links"]}>
        {category.map((item) => {
          const categoryName = item.name;
          return (
            <button
              key={categoryName}
              onClick={() => handleTabClick(categoryName, item.name)}
              className={`${
                activeTab === categoryName
                  ? PopularProverbsStyles["active"]
                  : ""
              }`}
            >
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </button>
          );
        })}
      </div>
      <div className={PopularProverbsStyles["cards-container"]}>
        <div className={PopularProverbsStyles["nested-cards-container"]}>
          {isLoading || activePackageLoading ? (
            <Loader />
          ) : (
            <Carousel
              mobileBreakpoint={400}
              responsiveLayout={[
                {
                  breakpoint: 700,
                  cols: 3,
                  rows: 1,
                  gap: 5,
                },
                {
                  breakpoint: 600,
                  cols: 2,
                  rows: 1,
                  gap: 5,
                },
              ]}
              cols={3}
              showDots={false}
            >
              {randomProverbs?.map((proverb) => {
                const withoutTags = sliceString(
                  removeHtmlTags(proverb?.content)
                );
                const interpretation = sliceString(
                  proverb?.interpretation[0]?.content
                );
                const transliteration = sliceString(
                  proverb?.transliteration[0]?.content
                );

                return !isAuthenticated || !hasActivePackage ? (
                  <Carousel.Item key={proverb?.id}>
                    <HomeProverb
                      key={proverb?.id}
                      ethnic={proverb?.ethnic?.name}
                      proverb={withoutTags}
                      slug={proverb?.slug}
                      transliteration={transliteration}
                      interpretation={interpretation}
                    />
                  </Carousel.Item>
                ) : null;
              })}
            </Carousel>
          )}
        </div>
      </div>
      {activePackageLoading ? (
        <Loader />
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          {isAuthenticated && hasActivePackage && <TodayProverb />}
          {isAuthenticated && hasActivePackage && <TrendingProverb />}
        </div>
      )}
    </div>
  );
};

export default PopularProverbs;
