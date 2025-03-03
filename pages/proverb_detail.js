import Like from "@/components/like/Like";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useContext, useState } from "react";
import Facebook from "../public/icon/facebookp.svg";
import Linkedin from "../public/icon/linkedin.svg";
import Twitter from "../public/icon/twitterp.svg";
import DetailStyles from "../styles/Detail.module.scss";
import HomeproverbStyles from "@/styles/HomeProverb2.module.scss"
import CustomAds from "@/components/customads";
import { prepare } from "@/components/home/today_proverb";
import AuthLayout from "@/components/reuse/auth_Layout";
import Loader from "@/components/reuse/loader";
import Sidebar from "@/components/reuse/sidebar";
import SuggestProverb from "@/components/reuse/suggest_proverb";
import { getAdList, getAdToggleValue, getVideoAds } from "@/network/adsService";
import { getProverbDetails } from "@/network/apiService";
import { AuthContext } from "@/context/authContext";

import { removeHtmlTags } from "@/utils";
import ErrorIcon from "@mui/icons-material/Error";
import { Tabs } from "antd";
import { useRouter } from "next/router";
import useApiCall from "@/hooks/useCallApi";

const { TabPane } = Tabs;
function ProverbDetail() {
  const [data, setData] = useState([]);
  const [transliteration, setTransliteration] = useState([]);
  const [interpretation, setInterpretation] = useState("");
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [showInterpretation, setShowInterpretation] = useState(false);
  const [toggleIcon, setToggleIcon] = useState(false);
  const [toggleIcon2, setToggleIcon2] = useState(false);
  const [addLink, setAddLink] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [addEnded, setAdEnded] = useState(false);
  const [checked, setChecked] = useState(false);
  const [toggleStatus, setToggleStatus] = useState(false);
  const Pagekey = "proverbdetails";
  const [activeTab, setActiveTab] = useState(
    data?.transliteration?.[0]?.language?.name ?? "English"
  );
  const [sidebar, setSidebar] = useState(false);
  const [proverbDetail, setProverbDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const audioRef = useRef(null);
  const router = useRouter();
  const proverbId = router.query.q;
  const { category, ethnic, page, proverb } = router.query
  const BASE_URL = process.env.BASE_URL;
  const { isAuthenticated } = useContext(AuthContext);


  const fetchVideoAds = async (name) => {
    try {
      const videoAds = await getVideoAds(name);
      setAddLink(videoAds);
    } catch (error) {
      console.error("Error fetching video ads", error);
    }
  };

  useEffect(() => {
    window.onpopstate = () => {
      router.push(
        {
          pathname: "/search_result",
          query: {
            // searchTerm: proverb,
            searchCategory: category,
            searchEthnic: ethnic,
            queryPage: page
          },
        },
        undefined,
        { shallow: true }
      );
    };
  });

  const videoRef = useRef(null);
  const adRef = useRef(null);
  const [adPlayed, setAdPlayed] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    const adElement = adRef.current;

    const handleTimeUpdate = () => {
      if (videoElement.currentTime >= 10 && !adPlayed && toggleStatus) {
        getAdList()
          .then((res) => {
            if (videoElement.currentTime >= 10) {
              getAdList()
                .then((res) => {
                  if (res.status === 200) {
                    // setAddLink(res.data[0].name);

                    if (res.data && res.data.length > 0) {
                      res.data.forEach((ad) => {
                        if (ad.type === "video/mp4") {
                          fetchVideoAds(ad.name);
                        }
                      });
                    }
                    videoElement.pause();
                    videoElement.style.display = "none";
                    adRef.current.style.display = "block";
                    adRef.current.play();
                    setAdPlayed(true);
                  }
                })
                .catch((err) => {
                  setError(err);
                });
            }
          })
          .catch((err) => {
            setError(err);
          });
      }
    };

    const handleAdEnded = () => {
      adElement.style.display = "none";
      videoElement.style.display = "block";
      videoElement.play();
    };

    videoElement?.addEventListener("timeupdate", handleTimeUpdate);
    adElement?.addEventListener("ended", handleAdEnded);

    return () => {
      videoElement?.removeEventListener("timeupdate", handleTimeUpdate);
      adElement?.removeEventListener("ended", handleAdEnded);
    };
  }, [videoRef, adRef, loading, adPlayed]);

  function handleEthnicClick(text) {
    // setActiveTab(tabName);
    router.push({
      pathname: "/search_result",
      query: { searchEthnic: text },
    });
  }

  const onChange = (key) => {
    console.log(key);
  };

  function handleCategoryClick(text) {
    // setActiveTab(tabName);
    router.push({
      pathname: "/search_result",
      query: { searchCategory: text.toLowerCase() },
    });
  }

  const handleTabClick = (languageName) => {
    setActiveTab(languageName);
  };

  function callback(key) {
    console.log(key);
  }

  useEffect(() => {
    setLoading(true);

    if (proverbId) {
      getProverbDetails(proverbId)
        .then((res) => {
          // console.log(res);
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError(err);
          setLoading(false);
        });
    }
  }, [proverbId]);

  const getTransliterationContent = () => {
    const transliteration = data.transliteration.find(
      (transliteration) => transliteration.language.name === activeTab
    );
    return transliteration ? transliteration.content : "";
  };

  const getInterpretationContent = () => {
    const interpretation = data.interpretation.find(
      (interpretation) => interpretation.language.name === activeTab
    );
    return interpretation ? interpretation.content : "";
  };

  const items = data?.transliteration?.map((transliteration) => {
    return {
      key: transliteration.language.id,
      label: transliteration.language.name,
      children: "Content of Tab Pane 1",
    };
  });

  const toggleSidebar = () => {
    setSidebar((prevState) => !prevState);
  };

  // const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareUrl = `http://africanproverbs.com/proverb_detail/?q=${proverbId}`;
  const title =
    "African Proverbs promote African culture and encourage using them for communication and teaching to gain wisdom for a fulfilling life worldwide.";
  const instagramUrl = "https://www.instagram.com/calmglobal_it/";

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${title}`,
    linkedin: `https://www.linkedin.com/shareArticle?url=${shareUrl}&title=${title}`,
  };

  const shareOnSocialMedia = (platform) => {
    const url = shareUrls[platform];
    if (url) {
      window.open(url);
    } else if (platform === "instagram") {
      window.open(instagramUrl);
    }
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    videoRef.current.play();
    audioRef.current.pause();
    // audioRef.current.currentTime = 0;
  };

  const handleAudioPlay = () => {
    setIsVideoPlaying(false);
    audioRef.current.play();
    videoRef.current.pause();
    // videoRef.current.currentTime = 0;
  };

  const handleAudioPause = () => {
    setIsVideoPlaying(false);
  };

  const ad = `data:video/mp4;base64,${addLink && addLink.data.file}`;

  useState(() => {
    async function getToggleStatus() {
      getAdToggleValue()
        .then((res) => {
          if (res.status === 200) {
            setToggleStatus(res.data);
          }
        })
        .catch((e) => {
          console.log("error occured while fetching ads toggle ads status");
        });
    }

    getToggleStatus();
  }, []);

  if (loading) {
    return (
      <AuthLayout>
        <div className="flex justify-center w-full h-screen">
          <Loader />
        </div>
      </AuthLayout>
    );
  }

  if (error) {
    return (
      <AuthLayout>
        <div className="flex items-center justify-center w-full h-full m-20">
          <div className="shadow-2xl w-full bg-white p-10 flex items-center justify-center gap-5 flex-col max-w-[300px]">
            <ErrorIcon sx={{ color: "red", fontSize: "5rem" }} />
            <p className="text-sm text-center">
              {error?.response?.data?.message}
            </p>
          </div>
        </div>
      </AuthLayout>
    );
  }

  const { categories } = data;

  const preparedCategories = prepare(categories);


  return (
    <div>
      <Head>
        <title>
          Proverb Detail ||{" "}
          {data && data.content && removeHtmlTags(data.content)}
        </title>
        <meta
          name="description"
          content={
            data &&
            data.interpretation &&
            data.interpretation[0] &&
            data.interpretation[0].content
          }
        />
        <meta
          property="og:description"
          content={
            data &&
            data.interpretation &&
            data.interpretation[0] &&
            data.interpretation[0].content
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:site_name" content="African Proverbs"></meta>
        <meta property="og:title" content="African Proverbs"></meta>
        <meta
          property="article:tag"
          content={`African proverb || ${data && data.ethnic && data.ethnic.name
            }`}
        ></meta>
        <meta
          name="tags"
          content={`African Proverb ${data && data.ethnic && data.ethnic.name
            }, African Proverb ${data &&
            data.categories &&
            data.categories[0] &&
            data.categories[0].name
            } category`}
        ></meta>
        <meta
          property="article:tag"
          content={
            data &&
            data.transliteration &&
            data.transliteration[0].content &&
            data &&
            data.transliteration[0].content
          }
        ></meta>
        <meta
          property="article:section"
          content={data && data.ethnic && data.ethnic.name}
        ></meta>
        <meta
          property="og:url"
          content={`https://africanproverbs.com/proverb_detail/?q=${proverbId}`}
        ></meta>

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthLayout>
        {/* <main className={DetailStyles.main}> */}
        <div className={DetailStyles["media-container"]}>
          <section className={DetailStyles["video-media"]}>
            <div className={DetailStyles["video"]}>
              <video
                ref={videoRef}
                poster={
                  "https://res.cloudinary.com/dbw7rwfa3/image/upload/v1679468939/defaultposter_iyrwyk.jpg"
                }
                onPlay={handleVideoPlay}
                width="720px"
                height="480px"
                controls
                controlsList="nodownload"
              >
                <source
                  src={`${BASE_URL}/api/proverbs/video/${data.id}.mp4`}
                  // src="https://pub-d9d1d49152e64cb1b584945280fb6f5c.r2.dev/01191210Gc1A2GX32hXyW70h0BhRH-webm"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              {/* Ad video */}
              <video ref={adRef} style={{ display: "none" }} loop={false}>
                {addLink && <source src={ad} type="video/mp4" />}
                Your browser does not support the video tag.
              </video>
            </div>
          </section>

          <div className={DetailStyles["audio"]}>
            <audio
              ref={audioRef}
              controls
              width="720px"
              height="480px"
              onPlay={handleAudioPlay}
              onPause={handleAudioPause}
            >
              <source src={`${BASE_URL}/api/proverbs/audio/${data.id}.mp3`} type="audio/mpeg" />
              <source src={`${BASE_URL}/api/proverbs/audio/${data.id}.wav`} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
          </div>

          <section className={DetailStyles["detail-content"]}>
            <div className={DetailStyles["left"]}>
              <h2>Proverb</h2>

              <div className={DetailStyles["left-content"]}>
                {data.transliteration.map((transliteration) => (
                  <h4
                    key={transliteration.language.id}
                    onClick={() =>
                      handleTabClick(transliteration.language.name)
                    }
                    className={
                      activeTab === transliteration.language.name
                        ? DetailStyles["active"]
                        : ""
                    }
                  >
                    {transliteration.language.name}
                  </h4>
                ))}
              </div>
            </div>

            <div className={DetailStyles["middle"]}>
              <div className={DetailStyles["proverb-btn"]}>
                <button onClick={() => handleEthnicClick(data.ethnic.name)}>
                  {data && data.ethnic && data.ethnic.name}
                </button>
                {data.categories && data.categories.length !== 0 && (
                  <button
                    onClick={() => handleCategoryClick(data.categories[0].name)}
                  >
                    {data &&
                      data.categories &&
                      data.categories[0] &&
                      data.categories[0].name}
                  </button>
                )}
              </div>

              <div className={DetailStyles["proverb-btn-category"]}>
                {data.categories &&
                  data.categories.slice(1)?.map((item) => {
                    return (
                      <button
                        onClick={() => handleCategoryClick(item.name)}
                        className={DetailStyles["proverb-btn-other-categories"]}
                        key={item.id}
                      >
                        #{item.name}
                      </button>
                    );
                  })}
              </div>

              <div className={DetailStyles["main-proverb"]}>
                <div
                  style={{
                    backgroundImage: `url(${data && data.ethnic
                      ? data.ethnic.name === "Yoruba"
                        ? "/img/yoruba-scroll.jpeg"
                        : data.ethnic.name === "Igbo"
                          ? "/img/igbo-scroll.jpeg"
                          : data.ethnic.name === "Hausa"
                            ? "/img/hausa-scroll.jpeg"
                            : data.ethnic.name === "Akan"
                              ? "/img/akan-scroll.jpeg"
                              : data.ethnic.name === "Kiswahili"
                                ? "/img/kiswahili-scroll.jpeg"
                                : data.ethnic.name === "Zulu"
                                  ? "/img/zulu-scroll.jpeg"
                                  : data.ethnic.name === "Amharic"
                                    ? "/img/amharic-scroll.jpeg"
                                    : data.ethnic.name === "Afaan Oromo"
                                      ? "/img/afan-oromo-scroll.jpeg"
                                      : ""
                      : ""
                      })`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    borderRadius: "15px",
                    width: "450px",
                    minHeight: "500px",
                  }}
                  className={DetailStyles["homeproverbcard"]}

                >
                  <div className={DetailStyles["home-proverb-content"]}>
                    <p
                      onClick={() => handleTabClick(data?.ethnic?.name)}
                      className={DetailStyles["category"]}
                    >
                      {data && data?.ethnic?.name}
                    </p>

                    <div className={DetailStyles["proverb-detail"]}>
                      <p className={DetailStyles["proverb"]}>{data && removeHtmlTags(data?.content)}</p>
                    </div>

                    <div className={DetailStyles["calm-tag"]}>
                      <p className={DetailStyles["calm-tag-header"]}>
                        Transliteration
                      </p>
                      <p className={DetailStyles["trans"]}>{data && data?.transliteration[0]?.content}</p>
                      <p className={DetailStyles["calm-tag-header"]}>
                        Inherent Wisdom
                      </p>
                      <p className={DetailStyles["inter"]}>{data && data?.interpretation[0]?.content}</p>

                    </div>
                  </div>


                </div>


                {/* <Image
                  width={216}
                  height={152}
                  alt={"Proverb Ethnic Image"}
                  style={{ borderRadius: "5px" }}
                  src={
                    data && data.ethnic && data && data.ethnic.name === "Yoruba"
                      ? "https://res.cloudinary.com/dbw7rwfa3/image/upload/v1679053288/yoruba_rsdxmk.png"
                      : data &&
                        data.ethnic &&
                        data &&
                        data.ethnic.name === "Igbo"
                        ? "https://res.cloudinary.com/dbw7rwfa3/image/upload/v1679053298/igbo_xzvho8.png"
                        : data &&
                          data.ethnic &&
                          data &&
                          data.ethnic.name === "Hausa"
                          ? "https://res.cloudinary.com/dbw7rwfa3/image/upload/v1679053288/hausa_qmsf8r.png"
                          : data &&
                            data.ethnic &&
                            data &&
                            data.ethnic.name === "Akan"
                            ? "https://res.cloudinary.com/dbw7rwfa3/image/upload/v1693559094/akan_s02s3n.webp"
                            : data &&
                              data.ethnic &&
                              data &&
                              data.ethnic.name === "Kiswahili"
                              ? "https://res.cloudinary.com/dbw7rwfa3/image/upload/v1693559428/kiswahili_h73roi.jpg"
                              : ""
                  }
                /> */}

                {/* <p>{data && data.content && removeHtmlTags(data.content)}</p> */}
              </div>

              {/* <hr /> */}

              {/* <div className={DetailStyles["interpretation"]}>
                <div className={DetailStyles["tabs-container"]}>
                  {data?.transliteration?.map((transliteration) => (
                    <h4
                      key={transliteration.language.id}
                      onClick={() =>
                        handleTabClick(transliteration.language.name)
                      }
                      className={`${DetailStyles["tab"]} ${activeTab === transliteration.language.name
                          ? DetailStyles["active"]
                          : ""
                        }`}
                    >
                      {transliteration.language.name}
                    </h4>
                  ))}
                </div>

                <div>
                  <h2>Transliteration</h2>
                  {data &&
                    data.transliteration &&
                    data.transliteration[0].content && (
                      <p>{getTransliterationContent()}</p>
                    )}
                </div>
                <div>
                  <h2>Inherent Wisdom</h2>
                  {data && data.interpretation && data.interpretation[0] && (
                    <p>{getInterpretationContent()}</p>
                  )}
                </div>
              </div> */}
            </div>

            <div className={DetailStyles["right"]}>
              <Like data={data} />
              <h3>Share</h3>

              <div className={DetailStyles["right-icons"]}>
                <Image
                  src={Facebook}
                  width={"100%"}
                  height={"100%"}
                  onClick={() => shareOnSocialMedia("facebook")}
                  alt={"Facebook Icon"}
                />
                <Image
                  src={Twitter}
                  width={"100%"}
                  height={"100%"}
                  onClick={() => shareOnSocialMedia("twitter")}
                  alt={"Twitter Icon"}
                />
                <Image
                  src={Linkedin}
                  width={"100%"}
                  height={"100%"}
                  onClick={() => shareOnSocialMedia("linkedin")}
                  alt={"Linkedin Icon"}
                />
                <SuggestProverb
                  id={proverbId}
                  categories={preparedCategories}
                />
              </div>
            </div>
          </section>
        </div>
        <CustomAds />

        <Sidebar toggleSidebar={toggleSidebar} sidebar={sidebar} />
        {/* </main> */}
      </AuthLayout>
    </div>
  );
}

export default ProverbDetail;
