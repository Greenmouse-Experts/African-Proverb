import React, { useContext } from "react";
import HomeproverbStyles from "../../styles/HomeProverb2.module.scss";
import Image from "next/image";
import ArrowForward from "../../public/img/arrowforward.svg";
import { useRouter } from "next/router";
import Link from "next/link";
import Facebook from "../../public/icon/facebookp.svg";
import Twitter from "../../public/icon/twitterp.svg";
import Linkedin from "../../public/icon/linkedin.svg";
import { AuthContext } from "@/context/authContext";
import { toast } from "react-toastify";

const HomeProverb = ({
  ethnic,
  proverb,
  slug,
  transliteration,
  interpretation,
}) => {
  const searchId = slug;
  const { isAuthenticated } = useContext(AuthContext);

  const router = useRouter();

  function handleTabClick(text) {
    router.push({
      pathname: "/search_result",
      query: { searchEthnic: text },
    });
  }

  const handleViewDetail = () => {
    if (!isAuthenticated) {
      toast.error("Kindly register to view proverb details", {
        autoClose: 1000,
        theme: "dark",
      });
    }
  };

  const shareUrl = `http://africanproverbs.com/proverb_detail/?q=${slug}`;
  const title =
    "African Proverbs promote African culture and encourage using them for communication and teaching to gain wisdom for a fulfilling life worldwide.";

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${title}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
  };

  const shareOnSocialMedia = (platform) => {
    const url = shareUrls[platform];
    if (url) {
      window.open(url);
    } else if (platform === "instagram") {
      window.open(instagramUrl);
    }
  };


  const divStyle = {
    backgroundImage: `url(${
      ethnic === "Yoruba"
        ? "/img/yoruba-scroll.jpeg"
        : ethnic === "Igbo"
        ? "/img/igbo-scroll.jpeg"
        : ethnic === "Hausa"
        ? "/img/hausa-scroll.jpeg"
        : ethnic === "Akan"
        ? "/img/akan-scroll.jpeg"
        : ethnic === "Kiswahili"
        ? "/img/kiswahili-scroll.jpeg"
        : ethnic === "Zulu"
        ? "/img/zulu-scroll.jpeg"
        : ethnic === "Amharic"
        ? "/img/amharic-scroll.jpeg"
        : ethnic === "Afaan Oromo"
        ? "/img/afan-oromo-scroll.jpeg"
        : ""
    })`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    minHeight: "400px",
    width: "330px",
  };

  return (
    <div style={divStyle} 
    className={HomeproverbStyles["homeproverbcard"]}
    >
      <div className={HomeproverbStyles["home-proverb-content"]}>
        <p
          onClick={() => handleTabClick(ethnic)}
          className={HomeproverbStyles["category"]}
        >
          {ethnic}
        </p>

        <div className={HomeproverbStyles["proverb-detail"]}>
          <p className={HomeproverbStyles["proverb"]}>{proverb}</p>
        </div>

        <div className={HomeproverbStyles["calm-tag"]}>
          <p className={HomeproverbStyles["calm-tag-header"]}>
            Transliteration
          </p>
          <p className={HomeproverbStyles["trans"]}>{transliteration}</p>
          <p className={HomeproverbStyles["calm-tag-header"]}>
            Inherent Wisdom
          </p>
          <p className={HomeproverbStyles["inter"]}>{interpretation}</p>
          <div className={HomeproverbStyles["social-links"]}>
            <Image
              src={Facebook}
              width={15}
              height={5}
              onClick={() => shareOnSocialMedia("facebook")}
              alt={"Facebook Logo"}
            />

            <Image
              src={Twitter}
              width={15}
              height={15}
              onClick={() => shareOnSocialMedia("twitter")}
              alt={"Twitter Logo"}
            />

            <Image
              src={Linkedin}
              width={15}
              height={15}
              onClick={() => shareOnSocialMedia("linkedin")}
              alt={"Linkedin Logo"}
            />
          </div>
          <Link
            onClick={handleViewDetail}
            className={HomeproverbStyles["view-proverb"]}
            href={isAuthenticated ? `/proverb_detail/?q=${searchId}` : "#"}
          >
            <p>View Proverb</p>
            <Image
              width={"100%"}
              height={"100%"}
              src={ArrowForward}
              alt={"Next Arrow"}
            />
          </Link>

          <Link
            href={"https://www.instagram.com/africanproverbsdotcom/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className={HomeproverbStyles["insta-link"]}>@africanproverbs</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeProverb;
