import React from "react";
import SectionHeader from "../reuse/section_header";
import AboutStyles from "../../styles/Homeaboutsection.module.scss";
import AboutVideo from "../reuse/about_video";


const AboutSection = () => {
  return (
    <div className={AboutStyles["about-section-main-container"]}>
      <SectionHeader header="About Us" />

     

      <div className={AboutStyles["about-section-container"]}>
        <div className={AboutStyles["about-section-left"]}>
          <h3>Celebrating African Culture and Wisdom through Proverbs</h3>

          <p>
            Proverbs have been an integral part of African oral tradition for
            centuries, offering valuable lessons and insights into the
            complexities of life. They offer a unique glimpse into the wisdom
            and values of different African cultures, and their relevance is as
            strong today as it was in the past.
          </p>
          <p>
            Through this website, we aim to promote a deeper understanding and
            appreciation of African culture, as well as to encourage the use of
            proverbs as a means of communication and teaching. We believe that
            the knowledge and insights gained from African proverbs can help
            people all over the world to lead happier, more fulfilling lives.
          </p>
        </div>

        <div className={AboutStyles["about-section-right"]}>
          <AboutVideo />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
