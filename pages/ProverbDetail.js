import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import DetailStyles from "../styles/Detail.module.scss";
import Like from "@/components/like/Like";
import Facebook from "../public/icon/facebookp.svg";
import Twitter from "../public/icon/twitterp.svg";
import Linkedin from "../public/icon/linkedin.svg";
import Sidebar from "@/components/reuse/sidebar";
import { useRouter } from "next/router";
import { removeHtmlTags } from "@/utils";
import { getProverbDetails } from "@/network/apiService";
import Loader from "@/components/reuse/loader";
import ErrorIcon from "@mui/icons-material/Error";
import AuthLayout from "@/components/reuse/auth_Layout";
import SuggestProverb from "@/components/reuse/suggest_proverb";
import { prepare } from "@/components/home/today_proverb";

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

  const [activeTab, setActiveTab] = useState(
    data?.transliteration?.[0]?.language?.name ?? "English"
  );
  const [sidebar, setSidebar] = useState(false);
  const [proverbDetail, setProverbDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const router = useRouter();
  const proverbId = router.query.q;

  const BASE_URL = process.env.BASE_URL;

  useEffect(() => {
    window.onpopstate = () => {
      router.push("/search_result");
    };
  });

  // useEffect(() => {
  //   if (addLink || addEnded) return;
  //   const videoElement = videoRef.current;
  //   if (!videoElement) return;
  //   const handleTimeUpdate = () => {
  //     setCurrentTime(videoElement.currentTime);
  //     if (videoElement.currentTime >= 10) {
  //       getAdList()
  //         .then((res) => {
  //           if (res.status === 200) {
  //             let filteredObjects = res.data.filter(
  //               (obj) => obj.type === "video/mp4"
  //             );
  //             if (filteredObjects.length > 0) {
  //               let randomObject =
  //                 filteredObjects[
  //                   Math.floor(Math.random() * filteredObjects.length)
  //                 ];
  //               if (randomObject) {
  //                 setAddLink(randomObject.name);
  //               }
  //             } else {
  //               console.log("No objects with type video/mp4 found.");
  //             }
  //           }
  //         })
  //         .catch((err) => {
  //           // console.log(err);
  //           setError(err);
  //         });
  //     }
  //   };
  //   videoElement.addEventListener("timeupdate", handleTimeUpdate);
  //   return () => {
  //     videoElement.removeEventListener("timeupdate", handleTimeUpdate);
  //   };
  // }, [videoRef.current,addEnded]);
  // useEffect(() => {
  //   if (addLink) {
  //     const videoElement = videoRef.current;
  //     if (!videoElement) return;
  //     const handleVideoEnded = () => {
  //       console.log("chidera")
  //       setAddLink('')
  //       setAdEnded(true)
  //       videoElement.onLo = currentTime
  //       videoElement.play()
  //     };
  //     videoElement.addEventListener('ended', handleVideoEnded);
  //     return () => {
  //       // Cleanup: remove the event listener when the component unmounts
  //       videoElement.removeEventListener('ended', handleVideoEnded);
  //     };
  //   }
  // }, [addLink])
  // const videoRef = useRef(null);
  const adRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    const handleTimeUpdate = () => {
      // Check if the video has reached 10 seconds and the ad is not playing
      if (video.currentTime >= 10 && !adRef.current) {
        // Pause the video
        video.pause();

        // Display and play the ad
        adRef.current.style.display = "block";
        adRef.current.play();
      }
    };

    const handleAdEnded = () => {
      // Hide the ad and resume the video from where it was paused
      adRef.current.style.display = "none";
      video.play();
    };

    // Attach event listeners
    video.addEventListener("timeupdate", handleTimeUpdate);
    adRef.current.addEventListener("ended", handleAdEnded);

    return () => {
      // Remove event listeners on component unmount
      video.removeEventListener("timeupdate", handleTimeUpdate);
      adRef.current.removeEventListener("ended", handleAdEnded);
    };
  }, []);

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
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
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

  if (loading) {
    return (
      <AuthLayout>
        <div className="h-screen w-full flex justify-center">
          <Loader />
        </div>
      </AuthLayout>
    );
  }

  if (error) {
    return (
      <AuthLayout>
        <div className="h-full w-full flex justify-center items-center m-20">
          <div className="shadow-2xl w-full bg-white p-10 flex items-center justify-center gap-5 flex-col max-w-[300px]">
            <ErrorIcon sx={{ color: "red", fontSize: "5rem" }} />
            <p className="text-sm text-center">{error.response.data}</p>
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
          content={`African proverb || ${
            data && data.ethnic && data.ethnic.name
          }`}
        ></meta>
        <meta
          name="tags"
          content={`African Proverb ${
            data && data.ethnic && data.ethnic.name
          }, African Proverb ${
            data &&
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
                onPlay={handleVideoPlay}
                // src={`${BASE_URL}/api/proverbs/video/${data.id}.mp4`}
                // src={addLink?`${BASE_URL}/api/ads/${addLink}`:`https://pub-d9d1d49152e64cb1b584945280fb6f5c.r2.dev/SK9qMehgB5Ae_TSHIZVlC-webm`}
                poster={
                  "https://res.cloudinary.com/dbw7rwfa3/image/upload/v1679468939/defaultposter_iyrwyk.jpg"
                }
                width="720px"
                height="480px"
                controls
                controlsList="nodownload"
                preload="none"
              ></video>
            </div>
          </section>

          <div className={DetailStyles["audio"]}>
            <audio
              ref={audioRef}
              src={`${BASE_URL}/api/proverbs/audio/${data.id}.mp3`}
              controls
              width="720px"
              height="480px"
              onPlay={handleAudioPlay}
              onPause={handleAudioPause}
            ></audio>
          </div>

          <section className={DetailStyles["detail-content"]}>
            {/* <div className={DetailStyles["left"]}>
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
              </div> */}

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
                <Image
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
                />

                <p>{data && data.content && removeHtmlTags(data.content)}</p>
              </div>

              <hr />

              <div className={DetailStyles["interpretation"]}>
                <div className={DetailStyles["tabs-container"]}>
                  {data.transliteration.map((transliteration) => (
                    <h4
                      key={transliteration.language.id}
                      onClick={() =>
                        handleTabClick(transliteration.language.name)
                      }
                      className={`${DetailStyles["tab"]} ${
                        activeTab === transliteration.language.name
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
              </div>
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

        <Sidebar toggleSidebar={toggleSidebar} sidebar={sidebar} />
        {/* </main> */}
      </AuthLayout>
    </div>
  );
}

export default ProverbDetail;
