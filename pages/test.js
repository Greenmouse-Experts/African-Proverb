import HomeProverb from "@/components/home/home_proverb_card_2";
import PaymentOptions from "@/components/payment/payment_option";
import PaypalPaymentButton from "@/components/paymentButton/PaypalPaymentButton";
import RenewSubscription from "@/components/renew_subscription/renew_subscription";
import { AuthContext } from "@/context/authContext";
import { PaymentContext } from "@/context/paymentContext";
import { getUserId, removeHtmlTags, sliceString } from "@/utils";
import React, { useContext, useEffect, useState } from "react";

const test = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [videoData, setVideoData] = useState();
  const url = "api/proverbs/video/00d9b2c9-2e69-4cd5-b5c6-5d77d6a65d59";
  const playVideo = async () => {
    try {
      const response = await fetch(
        `https://dev-api.africanproverbs.com/${url}`,
        {
          headers: {
            // Range: "streaming audio allowed",
            // Range: "streaming allowed",
          },
        }
      );

      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }

      // const data = await response;
      setVideoData(response.url);
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  useEffect(() => {
    playVideo();
  }, []);


  return (
    <>
      <video
        controls
        controlsList="nodownload"
        disablePictureInPicture
        poster="https://res.cloudinary.com/dbw7rwfa3/image/upload/v1679059376/aboutposter_t0z9j3.png"
      >
        <source
          // src="https://dev-api.africanproverbs.com/api/proverbs/video/ff16cb46-116e-4d76-a16e-f8b515a90cb0.mp4"
          src={videoData + ".mp4"}
          type="video/mp4"
        ></source>
      </video>

      <audio
        // ref={audioRef}
        src={videoData + ".mp3"}
        controls
        width="720px"
        height="480px"
        // onPlay={handleAudioPlay}
        // onPause={handleAudioPause}
      ></audio>
    </>
  );
};

export default test;
