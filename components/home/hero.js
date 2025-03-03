import React, { useState, useEffect, useContext } from "react";
import HeroStyles from "../../styles/Hero.module.scss";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/router";
import Link from "next/link";
import { HomeBackgroundData } from "@/constants";
import { AuthContext } from "@/context/authContext";
import { EthnicContext } from "@/context/ethnicContext";
import { getAuthStatus } from "@/utils";
import { toast } from "react-toastify";

const Hero = ({ children, categories }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchEthnic, setSearchEthnic] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);
  let debounceTimer;

  const { ethnicsList, loggedInEthnicsList } = useContext(EthnicContext);

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value.toLowerCase();

    // Remove extra spaces with a regular expression
    const cleanedValue = value.replace(/\s+/g, " ");

    setSearchTerm(cleanedValue);

    if (cleanedValue.trim() !== "") {
      setIsDropdownOpen(true);
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        fetchSuggestions(cleanedValue);
      }, 0);
    } else {
      setIsDropdownOpen(false);
      setSuggestions([]);
    }
  };

  // useEffect to handle changes in searchTerm
  useEffect(() => {
    return () => {
      clearTimeout(debounceTimer);
      setSuggestions([]); // Clear suggestions on component unmount
    };
  }, []);

  const handleSuggestionClick = (suggestion) => {
    setIsDropdownOpen(false);
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  async function fetchSuggestions(query) {
    // Rename the parameter to 'query'
    try {
      const apiUrl = `${process.env.BASE_URL
        }/api/proverbs/predictsearch/query/?query=${encodeURIComponent(query)}`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Update the 'suggestions' state with the fetched suggestions
      setSuggestions(data); // Assuming 'data' is an array of suggestions
    } catch (error) { }
  }

  const handleSearch = () => {
    router.push(
      {
        pathname: "/search_result",
        query: {
          searchTerm: searchTerm,
          searchCategory: searchCategory,
          searchEthnic: searchEthnic,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentSlide === 1) {
        setCurrentSlide(0);
      } else {
        setCurrentSlide(currentSlide + 1);
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const bgImageStyle = {
    backgroundImage: `url(${HomeBackgroundData[currentSlide].url})`,
    backgroundPosition: "center",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    height: "100%",
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleSearch();
  };

  const handleTrendingAndTodayView = (text) => {
    if (!isAuthenticated) {
      toast.error(`login to be able to view ${text}`);
    } else {
      return;
    }
  };

  const handleQuizClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      router.push("/auth/signup");
    }
  };

  return (
    <>
      <div className={HeroStyles["hero-container"]} style={bgImageStyle}>
        {children}
        <div className={HeroStyles["hero-contentparent"]}>
          <div className={HeroStyles["hero-content"]}>
            <h1>Unveiling the Riches of Proverbs from the Motherland</h1>

            <div className={HeroStyles["form-background"]}>
              <form onSubmit={handleSubmit}>
                <div className={HeroStyles["Input-box"]}>
                  <input
                    value={searchTerm}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    type="text"
                    placeholder="Search African Proverbs"
                  />
                  {isDropdownOpen && (
                    <ul className={HeroStyles["predictiveSearch"]}>
                      {suggestions &&
                        Array.isArray(suggestions) &&
                        suggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            onClick={() =>
                              handleSuggestionClick(suggestion.response)
                            }
                          >
                            <BiSearch /> <span>{suggestion.response}</span>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>

                <div className={HeroStyles["search-form-select"]}>
                  <select
                    name="category"
                    id="category"
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    className={HeroStyles["categories"]}
                  >
                    <option value="" defaultValue={""}>
                      All Categories
                    </option>{" "}
                    {categories?.map((item) => {
                      return (
                        <option value={item.name} key={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  {!getAuthStatus() && (
                    <select
                      value={searchEthnic}
                      onChange={(e) => setSearchEthnic(e.target.value)}
                      name="ethnic"
                      id="ethnic"
                      className={HeroStyles["ethnic"]}
                    >
                      <option value="" defaultValue={""}>
                        All Languages
                      </option>{" "}
                      {ethnicsList &&
                        ethnicsList?.map((item) => {
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
                      value={searchEthnic}
                      onChange={(e) => setSearchEthnic(e.target.value)}
                      name="ethnic"
                      id="ethnic"
                      className={HeroStyles["ethnic"]}
                    >
                      <option value="" defaultValue={""}>
                        All Languages
                      </option>{" "}
                      {loggedInEthnicsList &&
                        loggedInEthnicsList?.map((item) => {
                          return (
                            <option key={item.name} value={item.name}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                  )}
                </div>

                <button type="submit">
                  Search <BiSearch />
                </button>
              </form>
            </div>

            <ul className={HeroStyles["list-buttons"]}>

              {!isAuthenticated && (
                <li>
                  <Link href={"/auth/signup?freeTrial=true"} legacyBehavior>
                    <a>Free Trial</a>
                  </Link>
                </li>
              )}
              <li>
                <Link href={"/quiz"} legacyBehavior>
                  <a onClick={handleQuizClick}>Quiz</a>
                </Link>
              </li>
              <li
                onClick={() => {
                  handleTrendingAndTodayView("Today's Proverb");
                }}
              >
                <Link href="#todaysproverbs" legacyBehavior>
                  <a>Today’s Proverb</a>
                </Link>
              </li>
              <li
                onClick={() => {
                  handleTrendingAndTodayView("Trending Proverb");
                }}
              >
                <Link href="#trendingproverbs" legacyBehavior>
                  <a>Trending Proverb</a>
                </Link>
              </li>
              <li>
                <Link href="/add_proverb" legacyBehavior>
                  <a>Add Proverb</a>
                </Link>
              </li>
              <li>
                <Link href="/contact" legacyBehavior>
                  <a>Feedback</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={HeroStyles["base-pattern"]}></div>
      </div>
    </>
  );
};

export default Hero;
