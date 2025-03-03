import React, { useEffect, useState, useContext } from "react";
import { AdsContext } from "../adsContext";
import { ApiContext } from "@/context/apiContext";
import { AuthContext } from "@/context/authContext";

import { getAdList, getAdToggleValue, getImageAds, getVideoAds } from "@/network/adsService";
import useApiCall from "@/hooks/useCallApi";
import { useRouter } from "next/router";

const AdsProvider = ({ children }) => {
  const [ads, setAds] = useState(null);
  const [adsImg, setAdsImg] = useState(null);
  const [adsVideo, setAdsVideo] = useState(null);
  const { activeUserPackage, hasActivePackage, activePackageloading } = useContext(ApiContext);
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);
  const [toggleStatus, setToggleStatus] = useState(false);


  const {
    data: adsFile,
    loading: adsloading,
    error: adseError,
  } = useApiCall(getAdList, null, isAuthenticated);

  useEffect(() => {
    // Define variables to store the setTimeout references
    let imageAdTimerId;
    let videoAdTimerId;

    // Function to fetch image ads
    const fetchImageAds = async (name) => {
      try {
        const imageAds = await getImageAds(name);
        setAdsImg(imageAds);
      } catch (error) {
        console.error("Error fetching image ads", error);
      }
    };

    // Function to fetch video ads
    const fetchVideoAds = async (name) => {
      try {
        const videoAds = await getVideoAds(name);
        setAdsVideo(videoAds);
      } catch (error) {
        console.error("Error fetching video ads", error);
      }
    };


    // console.log("toggleStatuss", toggleStatus);

    // console.log("toggleStatuss", hasActivePackage);



    // Set timers to fetch ads after 10 seconds
    if (adsFile && adsFile.length > 0 && (hasActivePackage === false || (hasActivePackage && toggleStatus))) {
      adsFile.forEach((ad) => {
        if (ad.type === "image/webp") {
          imageAdTimerId = setTimeout(() => fetchImageAds(ad.name), 10000);
        } else if (ad.type === "video/mp4") {
          videoAdTimerId = setTimeout(() => fetchVideoAds(ad.name), 10000);
        }
      });
    }

    // Clear the timers if the component unmounts or if activeUserPackage or adsFile changes
    return () => {
      clearTimeout(imageAdTimerId);
      clearTimeout(videoAdTimerId);
    };
  }, [router.pathname, activeUserPackage, adsFile, toggleStatus]);

  useEffect(() => {
    async function getToggleStatus() {
      getAdToggleValue()
        .then((res) => {
          if (res.status === 200) {
            setToggleStatus(res?.data);
          }
        })
        .catch((e) => {
          console.log("error occured while fetching ads toggle ads status");
        });
    }

    if (isAuthenticated) {
      getToggleStatus();
    }
  }, [isAuthenticated, toggleStatus]);

  return (
    <AdsContext.Provider
      value={{
        ads,
        adsImg,
        adsVideo,
        adsFile,
        toggleStatus
      }}
    >
      {children}
    </AdsContext.Provider>
  );
};

export default AdsProvider;
