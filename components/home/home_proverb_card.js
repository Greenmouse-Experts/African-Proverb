import React from "react";
import HomeproverbStyles from "../../styles/Homeproverb.module.scss";
import Image from "next/image";
import ArrowForward from "../../public/img/arrowforward.svg";
import Yoruba from "../../public/img/yoruba-scroll.jpeg";
import Igbo from "../../public/img/igbo-trending-bg.png";
import Hausa from "../../public/img/hausa.jpeg";
import { useRouter } from "next/router";
import Link from "next/link";
import Facebook from "../../public/icon/facebookp.svg";
import Twitter from "../../public/icon/twitterp.svg";
import Linkedin from "../../public/icon/linkedin.svg";

const HomeProverb = ({ ethnic, proverb, slug }) => {
  const searchId = slug;

  const router = useRouter();

  function handleTabClick(text) {
    router.push({
      pathname: "/search_result",
      query: { searchEthnic: text },
    });
  }

  const shareUrl = `http://africanproverbs.com/proverb_detail?q=${slug}`;
  const title =
    "African Proverbs promote African culture and encourage using them for communication and teaching to gain wisdom for a fulfilling life worldwide.";

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

  return (
    <div
      className={HomeproverbStyles["view-proverb"]}
      href={`/proverb_detail?q=${searchId}`}
    >
      <div className={HomeproverbStyles["home-proverb-container"]}>
        <div className={HomeproverbStyles["home-proverb-card-head"]}>
          {/* <Image
            src={
              ethnic === "Yoruba"
                ? Yoruba
                : ethnic === "Igbo"
                ? Igbo
                : ethnic === "Hausa"
                ? Hausa
                : ""
            }
            alt="Ethnic Image"
          /> */}
        </div>

        <div className={HomeproverbStyles["home-proverb-content"]}>
          <p
            onClick={() => handleTabClick(ethnic)}
            className={HomeproverbStyles["category"]}
          >
            {ethnic}
          </p>
          <p className={HomeproverbStyles["proverb"]}>{proverb}</p>

          <div className={HomeproverbStyles["social-links"]}>
            <Image
              src={Facebook}
              width={12}
              height={12}
              onClick={() => shareOnSocialMedia("facebook")}
              alt="Facebook Logo"
            />

            <Image
              src={Twitter}
              width={12}
              height={12}
              onClick={() => shareOnSocialMedia("twitter")}
              alt="Twitter Logo"
            />

            <Image
              src={Linkedin}
              width={12}
              height={12}
              onClick={() => shareOnSocialMedia("linkedin")}
              alt="Linkedin Icon"
            />
          </div>

          <Link
            className={HomeproverbStyles["view-proverb"]}
            href={`/proverb_detail?q=${searchId}`}
          >
            <p>View Proverb</p>
            <Image
              width={"100%"}
              height={"100%"}
              src={ArrowForward}
              alt="Arrow FOrward Icon"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeProverb;
