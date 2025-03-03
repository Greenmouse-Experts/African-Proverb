"use-client";

import React, { useContext, useEffect, useState } from "react";
import AuthLayout from "@/components/reuse/auth_Layout";
import FavoriteProverbStye from "@/styles/FavouriteProverb.module.scss";
import SearchResultStyles from "@/styles/Searchresult.module.scss";
import PrevArrow from "@/public/icon/arrowforward.svg";
import ForwardArrow from "@/public/icon/arrowback.svg";
import { getAuthStatus, removeHtmlTags, sliceString } from "@/utils";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { parse } from "url";
import { headers } from "@/next.config";
import { getAccessToken } from "@/utils";
import Loader from "@/components/reuse/loader";
import { BsArrowLeft } from "react-icons/bs";
import ProverbCard from "@/components/reuse/proverb_card";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Searchresult = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [proverbs, setProverbs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const router = useRouter();
  const { query } = parse(router.asPath, true);
  const { searchTerm, ethnic } = query;

  const pageSize = 12;
  const totalElements = proverbs.totalElements;
  const numPages = proverbs.totalPages;

  const prevEnabled = page > 1;
  const nextEnabled = page < numPages;

  const handleScrollToTop = () => {
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  const handlePrevClick = () => {
    setIsLoading(true);
    setPage((prevPage) => prevPage - 1);
    //  handleScrollToTop()
  };

  const handleNextClick = () => {
    setIsLoading(true);
    setPage((prevPage) => prevPage + 1);
    //  handleScrollToTop()
  };

  const payload = {
    q: searchTerm,
    ethnic_in: ethnic,
    page,
    size: pageSize,
  };
  const fetchProverbs = async () => {
    try {
      setIsLoading(true);
      const token = getAccessToken();
      const url = `${process.env.BASE_URL}/api/favourite-proverbs/search`;
      const res = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setProverbs(res.data);
      setTotalPages(res.data?.totalPages);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.response.q);
    }
  };
  function handleBack() {
    router.back();
  }
  const prepare = (arr) => {
    const newArray = arr.split(",").slice(0, 2).filter(Boolean);
    return newArray.map((name) => ({ name }));
  };

  useEffect(() => {
    fetchProverbs();
    if (proverbs) {
      handleScrollToTop();
    }
  }, [searchTerm, ethnic, page]);

  return (
    <AuthLayout>
      <div className={FavoriteProverbStye["main-container"]}>
        <div className={FavoriteProverbStye["proverb-container"]}>
          <div
            className="flex items-center mb-10 gap-2 text-xl hover:cursor-pointer text-gray-500"
            onClick={handleBack}
          >
            {" "}
            <BsArrowLeft /> Back
          </div>
          <h1>Search Result</h1>
          {!isLoading && error && !proverbs && (
            <div className="text-red-700">
              <p>{error.error}</p>
              <p>An Error Occured! Please Try Again</p>
            </div>
          )}

          {!isLoading && proverbs.totalElements === 0 && (
            <div>
              <p>{searchTerm} Proverb Not Found! Try Another Search</p>
            </div>
          )}

          {isLoading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-12">
              {proverbs &&
                proverbs?.content.map(
                  ({ categories, content, ethnic, id, slug }) => {
                    const withoutTags = removeHtmlTags(content);
                    const slicedString = sliceString(withoutTags);
                    const categorArry = prepare(categories);

                    if (proverbs) {
                      return (
                        <ProverbCard
                          proverb={slicedString}
                          id={id}
                          category={categorArry}
                          ethnic={ethnic}
                          key={id}
                          slug={slug}
                          type="Today's"
                        />
                      );
                    } else {
                      return null; // or a fallback value
                    }
                  }
                )}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 mb-10">
        <button
          onClick={handlePrevClick}
          disabled={!prevEnabled}
          className={`flex items-center justify-center gap-1 text-lg ${
            !prevEnabled ? "text-gray-400" : "text-[#BB5D06]"
          }`}
        >
          <IoIosArrowBack />
          Prev
        </button>

        <button
          onClick={handleNextClick}
          disabled={!nextEnabled}
          className={`flex items-center gap-1 text-lg justify-center ${
            !nextEnabled ? "text-gray-400" : "text-[#BB5D06]"
          }`}
        >
          Next
          <IoIosArrowForward />
        </button>
      </div>
    </AuthLayout>
  );
};

export default Searchresult;
