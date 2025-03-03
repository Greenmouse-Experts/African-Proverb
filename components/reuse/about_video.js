import AboutStyles from "../../styles/AboutVideo.module.scss";
import HomeAboutImage from "../../public/img/homeaboutimage.png";
import "react-html5video/dist/styles.css";
import Image from "next/image";

const AboutVideo = ({ proverb, category, ethnic }) => {
  return (
    <div className={AboutStyles["about-section-right"]}>
      <div className={AboutStyles["about-section-video"]}>
        <video
          controls
          controlsList="nodownload"
          disablePictureInPicture
          poster="https://res.cloudinary.com/dbw7rwfa3/image/upload/v1679059376/aboutposter_t0z9j3.png"
        >
          <source
            src="https://api.africanproverbs.com/munaapi/api/proverbs/video/ff16cb46-116e-4d76-a16e-f8b515a90cb0.mp4"
            // src="https://dev-api.africanproverbs.com/api/proverbs/video/00d9b2c9-2e69-4cd5-b5c6-5d77d6a65d59.mp4"
            type="video/mp4"
          ></source>
        </video>
      </div>

      <div className={AboutStyles["about-section-image"]}>
        <Image src={HomeAboutImage} alt={"About us image1"} />
      </div>
    </div>
  );
};

export default AboutVideo;
