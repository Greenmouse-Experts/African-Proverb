import React, { useContext, useEffect, useState } from "react";
import HomeproverbStyles from "../../styles/TrendingProverbCard.module.scss";
import Image from "next/image";
import ArrowForward from "../../public/img/arrowforward.svg";
import { useRouter } from "next/router";
import Link from "next/link";
import VideoIcon from "../../public/icon/videoicon.png";
import AudioIcon from "../../public/icon/audioicon.png";
import { AuthContext } from "@/context/authContext";
import { toast } from "react-toastify";
import { sliceString } from "@/utils";
import ReusableModal from "./resuableModal/reuseable_modal";
import TrendingVideo from "../trending_video/TrendingVideo";
import TrendingAudio from "../trending_audio/TrendingAudio";
import { getProverbDetails } from "@/network/apiService";
import LIKE from "../../public/icon/Vector.svg";

const TrendingProverbCard = ({
  proverb,
  category,
  ethnic,
  id,
  interpretation,
  transliteration,
}) => {
  // const searchId = slug;
  const proverbId = id;
  const { isAuthenticated } = useContext(AuthContext);
  // const [ethnic, setEthnic] = useState("Igbo");
  const router = useRouter();
  const [toggleAudioOpen, setToggleAudioOpen] = useState(false);
  const [toggleVideoOpen, setToggleVideoOpen] = useState(false);
  const [like, setLike] = useState(0);

  function handleEthnicClick(text) {
    router.push({
      pathname: "/search_result",
      query: { searchEthnic: text },
    });
  }

  useEffect(() => {
    // setLoading(true);

    if (proverbId) {
      getProverbDetails(proverbId)
        .then((res) => {
          setLike(res?.data?.number_of_likes);
          // setLoading(false);
        })
        .catch((err) => {
          // setError(err);
          // setLoading(false);
        });
    }
  }, [proverbId]);


  const divStyle = {
    backgroundImage: `url(${
      ethnic === "Yoruba"
      ? "/img/4.jpeg"
      : ethnic === "Igbo"
        ? "/img/5.jpeg"
        : ethnic === "Hausa"
          ? "/img/6.jpeg"
          : ""
    })`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    minHeight: "400px",
    // width: "330px",
  };

  return (
    <div style={divStyle} className={HomeproverbStyles["homeproverbcard"]}>
      <div className={HomeproverbStyles["home-proverb-content"]}>
        <p
          onClick={() => handleEthnicClick(ethnic)}
          className={HomeproverbStyles["category"]}
        >
          {ethnic}
        </p>

        <div className={HomeproverbStyles["proverb-detail"]}>
          <p className={HomeproverbStyles["proverb"]}>{sliceString(proverb)}</p>
        </div>

        <div className={HomeproverbStyles["calm-tag"]}>
          <p className={HomeproverbStyles["calm-tag-header"]}>
            Transliteration
          </p>
          <p className={HomeproverbStyles["trans"]}>
            {sliceString(transliteration)}
          </p>
          <p className={HomeproverbStyles["calm-tag-header"]}>
            Inherent Wisdom
          </p>
          <p className={HomeproverbStyles["inter"]}>
            {sliceString(interpretation)}
          </p>
        </div>

        <div className="flex gap-5 items-center justify-center mb-5">
            <Image
              style={{ cursor: "pointer" }}
              onClick={() => setToggleVideoOpen(true)}
              src={VideoIcon}
              width={35}
              height={35}
              alt=""
            />
            <Image
              style={{ cursor: "pointer" }}
              onClick={() => setToggleAudioOpen(true)}
              src={AudioIcon}
              width={35}
              height={35}
              alt=""
            />
          </div>

        <div className="flex justify-center items-center gap-2 w-full mb-5">
            <Image
              style={{ cursor: "pointer" }}
              width={25}
              height={25}
              alt={"like icon"}
              src={LIKE}
            />

            <span className="text-zinc-900">{like}</span>
          </div>

        <Link
          className={HomeproverbStyles["view-proverb"]}
          href={isAuthenticated ? `/proverb_detail/?q=${proverbId}` : "#"}
        >
          <p>View Proverb</p>
          <Image width={15} height={15} src={ArrowForward} alt={"Next Arrow"} />
        </Link>
      </div>
      <ReusableModal
        showCloseIcon={false}
        open={toggleVideoOpen}
        setOpen={setToggleVideoOpen}
        padding={0}
      >
        <TrendingVideo proverbId={proverbId} />
      </ReusableModal>
      <ReusableModal
        showCloseIcon={false}
        open={toggleAudioOpen}
        setOpen={setToggleAudioOpen}
        padding={0}
      >
        <TrendingAudio proverbId={proverbId} />
      </ReusableModal>
    </div>
  );
};

export default TrendingProverbCard;
