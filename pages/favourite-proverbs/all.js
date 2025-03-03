import React, { useContext, useEffect, useState } from "react";
import AuthLayout from "@/components/reuse/auth_Layout";
import ProverbCard from "@/components/reuse/proverb_card";
import { ProfileContext } from "@/context/profileContext";
import FavoriteProverbStye from "@/styles/FavouriteProverb.module.scss";
import { useRouter } from "next/router";
import { BsArrowLeft, BsSearch } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CustomAds from "@/components/customads";
import { removeHtmlTags, sliceString } from "@/utils";
import { EthnicContext } from "@/context/ethnicContext";
import { toast } from "react-toastify";

const AllFavouriteProverbs = () => {
  const router = useRouter();
  const [searchProverbs, setsearchProverbs] = useState([]);
  const [searchEthnic, setSearchEthnic] = useState("");
  const { ethnicsList, loggedInEthnicsList } = useContext(EthnicContext);

  const [searchText, setsearchText] = useState("");
  const { favoriteProverbs } = useContext(ProfileContext);

  const [proverbsPerPage, setproverbsPerPage] = useState(18);
  const [currentPage, setcurrentPage] = useState(1);

  useEffect(() => {
    if (!searchText) {
      setsearchProverbs([]);
    }
  }, [searchText]);

  const numOfTotalPages = Math.ceil(
    (searchProverbs && searchProverbs.length > 0
      ? searchProverbs.length
      : favoriteProverbs?.data?.length) / proverbsPerPage
  );

  const pages = Array.from(
    { length: numOfTotalPages },
    (_, index) => index + 1
  );

  // pick proverbs based on currentPage;
  const indexOfLastProverb = currentPage * proverbsPerPage; // (4 * 14) 56;
  const indexOfFirstProverb = indexOfLastProverb - proverbsPerPage; // (56 - 14) 42;

  const visibleProverbs =
    searchProverbs && searchProverbs.length > 0
      ? searchProverbs.slice(
          indexOfFirstProverb,
          Math.min(indexOfLastProverb, searchProverbs.length)
        )
      : favoriteProverbs?.data?.slice(indexOfFirstProverb, indexOfLastProverb);

  function handleNextProverb() {
    if (currentPage !== numOfTotalPages) setcurrentPage(currentPage + 1);
  }

  function handlePreviousProverb() {
    if (currentPage !== 1) setcurrentPage(currentPage - 1);
  }

  const handleSearch = () => {
    router.push(
      {
        pathname: "/favourite-proverbs/search_result",
        query: {
          searchTerm: searchText,
          ethnic: searchEthnic,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchText) {
      toast.error("Enter a proverb to search");
      return;
    }
    handleSearch();
  };

  const getPaginationRange = (currentPage, totalPages) => {
    let range = [];
    const displayPages = 2;

    if (totalPages <= 1) {
      range = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else if (totalPages <= 5) {
      range = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else if (currentPage - 1 <= displayPages) {
      range = [1, 2, "...", totalPages];
    } else if (totalPages - currentPage <= displayPages) {
      range = [];
    } else {
      range = [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      ];
    }

    return range;
  };
  const prepare = (arr) => {
    if (!arr) return [];
    if (typeof arr === "string") return [string];
    return arr.map(({ name }) => ({ name }));
  };

  function handleBack() {
    router.back();
  }
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
          <h1>Favourite Proverbs</h1>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 flex-wrap "
          >
            <div className="flex items-center border-2 gap-2 border-gray-200 rounded-md pl-2 py-2  w-[25rem]">
              <BsSearch className="text-gray-400" />
              <input
                type="text"
                name=""
                id=""
                value={searchText}
                onChange={(e) => setsearchText(e.target.value)}
                className="h-full w-full bg-transparent focus:border-none focus:outline-none text-gray-500 "
              />
            </div>
            <select
              value={searchEthnic}
              onChange={(e) => setSearchEthnic(e.target.value)}
              name="ethnic"
              id="ethnic"
              className="border-2 border-gray-200 rounded-md p-[.41rem] focus:outline-none text-gray-400 w-[25rem] bg-transparent"
            >
              <option value="" disabled>
                Select Ethnic
              </option>
              {ethnicsList?.map((item) => {
                return (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <button
              type="submit"
              className="bg-[#BB5D06] py-2 px-5 md:px-8 shadow-md text-white rounded-md"
            >
              Search
            </button>
          </form>

          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-12">
              {visibleProverbs?.map(
                ({ id, content, slug, ethnic, categories }) => {
                  const withoutTags = removeHtmlTags(content);
                  const slicedString = sliceString(withoutTags);
                  const categorArry = prepare(categories);

                  return (
                    <div>
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
                }
              )}
            </div>
          </div>

          <div className="flex justify-center items-center gap-1 my-8">
            <button
              className={`flex items-center ${
                currentPage !== 1 ? "text-[#BB5D06]" : "text-gray-400"
              }`}
              onClick={handlePreviousProverb}
              disabled={currentPage === 1}
            >
              {" "}
              <IoIosArrowBack /> Prev
            </button>
            {getPaginationRange(currentPage, numOfTotalPages).map(
              (page, index) => (
                <span
                  className={`hover:cursor-pointer mx-1 ${
                    currentPage === page
                      ? "text-[#BB5D06] px-2 border border-gray-200 rounded-md "
                      : typeof page === "number"
                      ? "text-gray-500"
                      : "text-[#BB5D06]"
                  }`}
                  onClick={() =>
                    typeof page === "number" && setcurrentPage(page)
                  }
                >
                  {page}
                </span>
              )
            )}
            <button
              className={`flex items-center  ${
                currentPage !== numOfTotalPages
                  ? "text-[#BB5D06]"
                  : "text-gray-400"
              }`}
              onClick={handleNextProverb}
              disabled={currentPage === numOfTotalPages}
            >
              {" "}
              <IoIosArrowForward /> Next
            </button>
          </div>
        </div>
      </div>
      <CustomAds />
    </AuthLayout>
  );
};

export default AllFavouriteProverbs;
