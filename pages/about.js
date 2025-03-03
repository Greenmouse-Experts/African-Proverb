import Layout from "@/components/reuse/layout";
import Head from "next/head";
import Image from "next/image";
import AboutStyles from "../styles/About.module.scss";
import AboutImage2 from "../public/img/aboutimage2.png";
import AboutVideo from "@/components/reuse/about_video";
import CustomAds from "@/components/customads";

export default function About() {
  return (
    <div>
      <Head>
        <title>About Us || Page</title>
        <meta name="description" content="About African Proverbs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={AboutStyles.main}>
        <Layout pageTitle="About Us" pageLink="About">
          <div className={AboutStyles["about-container"]}>
            <div className={AboutStyles["header-paragraph"]}>
              <p>
                Welcome to our website dedicated to celebrating the wisdom and
                culture of Africa through the rich tradition of proverbs. Our
                mission is to share and promote the knowledge and insights
                gained from the proverbs that have been passed down through
                generations in African societies.
              </p>
            </div>

            <div className={AboutStyles["about-section-container"]}>
              <div className={AboutStyles["about-section-left"]}>
                <h3>Celebrating African Culture and Wisdom through Proverbs</h3>

                <p>
                  Proverbs have been an integral part of African oral tradition
                  for centuries, offering valuable lessons and insights into the
                  complexities of life. They offer a unique glimpse into the
                  wisdom and values of different African cultures, and their
                  relevance is as strong today as it was in the past.
                </p>
                <p>
                  Through this website, we aim to promote a deeper understanding
                  and appreciation of African culture, as well as to encourage
                  the use of proverbs as a means of communication and teaching.
                  We believe that the knowledge and insights gained from African
                  proverbs can help people all over the world to lead happier,
                  more fulfilling lives.
                </p>
              </div>

              <div className={AboutStyles["about-section-right"]}>
                <AboutVideo />
              </div>
              <CustomAds />
            </div>

            <div className={AboutStyles["about-below-group"]}>
              <div className={AboutStyles["about-below-left"]}>
                <Image src={AboutImage2} alt="About Us Image 2" />
              </div>

              <div className={AboutStyles["about-below-right"]}>
                <h3>Mission Statement</h3>
                <p>
                  Our mission is to preserve and share the wisdom of African
                  culture through a collection of authentic proverbs, providing
                  a platform for users to engage with and learn from this rich
                  tradition.
                </p>

                <h3 className={AboutStyles["about-vision-statement"]}>
                  Vision Statement
                </h3>
                <p>
                  Our vision is to be the leading online destination for African
                  proverbs, fostering cultural exchange and promoting mutual
                  understanding among people of all backgrounds. We strive to
                  create a community of learners and seekers, connecting
                  individuals across borders and building bridges of
                  understanding through the power of language and tradition.
                </p>
              </div>
            </div>
          </div>
        </Layout>
      </main>
    </div>
  );
}
