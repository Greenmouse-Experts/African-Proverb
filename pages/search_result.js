"use-client";

import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import SearchResultStyles from "../styles/Searchresult.module.scss";
import ProverbCard from "@/components/reuse/proverb_card";
import { getAuthStatus, removeHtmlTags, sliceString } from "@/utils";
import Image from "next/image";
import PrevArrow from "../public/icon/arrowforward.svg";
import ForwardArrow from "../public/icon/arrowback.svg";
import { useRouter } from "next/router";
import { parse } from "url";
import Layout from "@/components/reuse/layout";
import Loader from "@/components/reuse/loader";
import { EthnicContext } from "@/context/ethnicContext";
import { searchProverb } from "@/network/apiService";
import { AuthContext } from "@/context/authContext";

const SearchResult = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [proverbs, setProverbs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const { query } = parse(router.asPath, true);
  const { searchTerm, searchCategory, searchEthnic, queryPage } = query;
  const [page, setPage] = useState(queryPage || 1);
  const { ethnicsList, categoriesList, loggedInEthnicsList } = useContext(EthnicContext);




  const [proverb, setProverb] = useState(() => {
    return searchTerm || "";
  });
  const [category, setCategory] = useState(() => {
    return searchCategory || "";
  });

  const [ethnic, setEthnic] = useState(() => {
    return searchEthnic || "";
  });

  // const [eth, setEth] = useState(() => {
  //   return searchEthnic || "";
  // });

  const [currentCategory, setcurrentCategory] = useState(() => {
    return searchCategory || "";
  });
  const [currentEthnic, setcurrentEthnic] = useState(() => {
    return searchEthnic || "";
  });

  const [currentPage, setCurrentPage] = useState(() => {
    return queryPage || 1;
  });


  useEffect(() => {
    // if (searchEthnic !== "undefined") {
    //   setcurrentEthnic("")
    //   setEthnic(searchEthnic || "");
    //   // setEth(searchEthnic || "");
    // }

    if (searchEthnic === "undefined") {
      setcurrentEthnic("")
      setEthnic("");
    }
    if (searchCategory === "undefined") {
      setcurrentCategory("");
      setCategory("");
    }
  }, [queryPage, searchEthnic, searchCategory]);

  useEffect(() => {
    setIsLoading(true);
    setCurrentPage(page);
    setIsLoading(false);

    if (queryPage === undefined || queryPage === "undefined") {
      setPage(1);

      router.push(
        {
          pathname: "/search_result",
          query: {
            queryPage: 1,
          },
        },
        undefined,
        { shallow: true }
      );
    }
  }, [page, queryPage]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetchProverbs();
  };

  const fetchProverbs = async () => {
    let url = "";

    if (category || ethnic || proverb) {
      url = `${process.env.BASE_URL}/api/public/proverbs/search?category_in=${category}&ethnic_in=${ethnic}&search=${proverb}&page=${page}&size=${pageSize}`;
      // url = `http://calm.calminfotech.com:8885/api/public/proverbs/?category_in=&ethnic_in=&size=&page=&search=${"Ọ̀nà ọ̀fun ò gba"}`;
    } else {
      url = `${process.env.BASE_URL}/api/public/proverbs/randomtwenty?size=20`;
    }
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(true);
        setProverbs(data);
        setTotalPages(data.totalPages);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(true);

        setError(error.name);
        setIsLoading(false);

        // Handle error here
      });
  };

  const fetchLoggedInUserProverbs = async () => {
    try {
      const res = await searchProverb(
        `/api/public/proverbs/search?category_in=${category}&ethnic_in=${ethnic}&search=${proverb}&page=${page}&size=${pageSize}`
      );
      setIsLoading(true);
      setProverbs(res.data);
      setTotalPages(res.data.totalPages);
      setIsLoading(false);
      // console.log(res);
    } catch (error) {
      setIsLoading(true);
      setError(error.name);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // fetchCategories()
    setIsLoading(true);
    // fetchRandom();
    if (isAuthenticated) {
      fetchLoggedInUserProverbs();
    } else {
      fetchProverbs();
    }

    if (proverbs) {
      handleScrollToTop();
    }

    setIsLoading(false);
  }, [
    // searchTerm,
    // searchCategory,
    // searchEthnic,
    page,
    category,
    ethnic,
    isAuthenticated,
    // proverb,
  ]);


  // Define the page size
  const pageSize = 12;

  // Define the total number of elements
  const totalElements = proverbs?.totalElements;

  // Calculate the total number of pages
  const numPages = proverbs?.totalPages;

  // Calculate whether the "prev" button should be enabled
  const prevEnabled = page > 1;

  // Calculate whether the "next" button should be enabled
  const nextEnabled = page < numPages;

  const handleScrollToTop = () => {
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  // Define the handler for the "prev" button click
  const handlePrevClick = () => {
    setIsLoading(true);
    setPage((prevPage) => Number(prevPage) - 1);
  };

  // Define the handler for the "next" button click
  const handleNextClick = () => {
    setIsLoading(true);
    setPage((prevPage) => Number(prevPage) + 1);
  };


  return (
    <div>
      <Head>
        <title>Search || Result</title>
        <meta
          name="description"
          content="Proverb search result page of African Proverbs"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:site_name" content="African Proverbs"></meta>
        <meta
          property="article:tag"
          content="African Proverbs || Yoruba Proverbs || Igbo Proverbs || Hausa Proverbs"
        ></meta>
        <meta
          property="og:url"
          content="https://africanproverbs.com/search_result/"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={SearchResultStyles.main}>
        <Layout
          pageTitle={`Proverbs  ${!category ? " " : "- " + category} ${!ethnic ? " " : "- " + ethnic
            }`}
          pageLink="Proverbs"
        >
          <div className={SearchResultStyles["search-form-container"]}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={proverb}
                placeholder="Search African Proverbs"
                onChange={(e) => setProverb(e.target.value)}
              />

              <div className={SearchResultStyles["search-form-select"]}>
                <select
                  name="category"
                  id="category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setcurrentCategory(e.target.value);
                    // setPage(1);
                  }}
                  className={SearchResultStyles["categories"]}
                >
                  <option value="" defaultValue={""}>
                    All Categories
                  </option>{" "}
                  {categoriesList?.map((item) => {
                    return (
                      <option value={item.name} key={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
                {!getAuthStatus() && (
                  <select
                    value={ethnic}
                    onChange={(e) => {
                      setEthnic(e.target.value);
                      setcurrentEthnic(e.target.value)
                      // setEth(e.target.value);
                      // setPage(1);
                    }}
                    name="ethnic"
                    id="ethnic"
                    className={SearchResultStyles["ethnic"]}
                  >
                    <option value="" defaultValue={""}>
                      All Languages
                    </option>{" "}
                    {ethnicsList?.map((item) => {
                      return (
                        <option key={item.name} value={item.name}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                )}
                {getAuthStatus() && (
                  <select
                    value={ethnic}
                    onChange={(e) => {
                      setEthnic(e.target.value);
                      setcurrentEthnic(e.target.value)
                      // setEth(e.target.value);
                      // setPage(1);
                    }}
                    name="ethnic"
                    id="ethnic"
                    className={SearchResultStyles["ethnic"]}
                  >
                    <option value="" defaultValue={""}>
                      All Languages
                    </option>{" "}
                    {loggedInEthnicsList?.map((item) => {
                      return (
                        <option key={item.name} value={item.name}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                )}
              </div>

              <button type="submit">Search</button>
            </form>
          </div>

          {category || proverb || ethnic ? (
            <div className={SearchResultStyles["proverb-card-wrapper"]}>
              {!isLoading && error && !proverbs && (
                <div className={SearchResultStyles["error"]}>
                  <p>{error.error}</p>
                  <p>An Error Occured! Please Try Again</p>
                </div>
              )}

              {!isLoading && proverbs.empty && (
                <div className={SearchResultStyles["error"]}>
                  <p>
                    {ethnic} {category} Proverb Not Found! Try Another Search
                  </p>
                </div>
              )}

              {isLoading ? (
                <div>
                  <Loader />
                </div>
              ) : (
                <div className={SearchResultStyles["proverb-card-container"]}>
                  {proverbs?.content?.map((item) => {
                    const withoutTags = removeHtmlTags(item.content);
                    const slicedString = sliceString(withoutTags);
                    if (proverbs) {
                      return (
                        <ProverbCard
                          proverb={slicedString}
                          category={item.categories}
                          ethnic={item.ethnic}
                          key={item.id}
                          slug={item.id}
                          setCategory={setCategory}
                          setEthnic={setEthnic}
                          // eth={eth}
                          currentCategory={currentCategory}
                          currentEthnic={currentEthnic}
                          currentPage={currentPage}
                          page={page}
                          id={item?.id}
                        />
                      );
                    } else {
                      return null; // or a fallback value
                    }
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className={SearchResultStyles["proverb-card-wrapper"]}>
              {!isLoading && error && (
                <div className={SearchResultStyles["error"]}>
                  <p>{error.error}</p>
                  <p>An Error Occured! Please Try Again</p>
                </div>
              )}

              {!isLoading && proverbs.empty && (
                <div className={SearchResultStyles["error"]}>
                  <p>
                    {ethnic} {category} Proverb Not Found! Try Another Search
                  </p>
                </div>
              )}

              {isLoading ? (
                <div>
                  <Loader />
                </div>
              ) : (
                <div className={SearchResultStyles["proverb-card-container"]}>
                  {proverbs?.content?.map((item) => {
                    const withoutTags = removeHtmlTags(item.content);
                    const slicedString = sliceString(withoutTags);
                    if (proverbs && item.categories.length !== 0) {
                      return (
                        <ProverbCard
                          proverb={slicedString}
                          category={item.categories}
                          ethnic={item.ethnic}
                          key={item.id}
                          slug={item.slug}
                          id={item.id}
                          setCategory={setCategory}
                          setEthnic={setEthnic}
                        />
                      );
                    } else {
                      return null; lue
                    }
                  })}
                </div>
              )}
            </div>
          )}

          <div className={SearchResultStyles["pagination-container"]}>
            <div className={SearchResultStyles["pagination"]}>
              <button onClick={handlePrevClick} disabled={!prevEnabled}>
                <Image src={ForwardArrow} alt={"Next Page Icon"} />
                Prev
              </button>

              <button onClick={handleNextClick} disabled={!nextEnabled}>
                Next
                <Image src={PrevArrow} alt={"Previous Page Icon"} />
              </button>

              <div>
                Page {page} of {totalPages}
              </div>
            </div>
          </div>
        </Layout>
      </main>
    </div>
  );
};

export default SearchResult;

