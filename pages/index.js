import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components//home/navbar";
import Hero from "@/components/home/hero";
import PopularProverbs from "@/components/home/popular_proverbs";
import AboutSection from "@/components/home/aboutsection";
import RealCousin from "@/components/home/realcousin";
import Testimonials from "@/components/home/testimonials";
import Footer from "@/components/home/footer";
import Sidebar from "@/components/reuse/sidebar";
// import Twitter from "../public/icon/twitter.svg";
// import Instagram from "../public/icon/instagram.svg";
// import Linkedin from "../public/icon/wlinkedin.svg";
// import Facebook from "../public/icon/Facebook.svg";
import Logo from "../public/icon/whitelogo.svg";
import axios from "axios";
import { ProfileContext } from "@/context/profileContext";
import { AuthContext } from "@/context/authContext";
import { ApiContext } from "@/context/apiContext";
import CustomAds from "@/components/customads";
import Loader from "@/components/reuse/loader";
import { EthnicContext } from "@/context/ethnicContext";
import AdSense from "@/components/Adsense";

import { getActiveUserPackage } from "@/network/apiService";

import Link from "next/link";

export default function Home({ categories }) {
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [randomProverbs, setRandomProverbs] = useState([]);
  const [sidebar, setSidebar] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const { getPicture } = useContext(ProfileContext);
  const { categoriesList } = useContext(EthnicContext);


  const {
    hasActivePackage,
    activePackageLoading,
  } = useContext(ApiContext);
  const toggleSidebar = () => {
    setSidebar((prevState) => !prevState);
  };

  useEffect(() => {
    window.BASE_URL = process.env.BASE_URL;

    // Fetch a single random proverb
    axios
      .get(`${BASE_URL}/api/public/proverbs/random/`)
      .then((response) => {
        setRandomProverbs(response.data);
      })
      .catch((error) => { });

    // Fetch a list of 8 random proverbs from the "public" category
    axios
      .get(
        `${BASE_URL}/api/proverbs/category/public?type=random&size=8&t=${new Date().getTime()}`
      )
      .then((response) => {
        setCategory(response.data.content);
      })
      .catch((error) => { });
  }, []);

  useEffect(() => {
    if (category && randomProverbs) {
      setIsLoading(false);
    }
  }, [category, randomProverbs, isAuthenticated, hasActivePackage]);


  if (activePackageLoading) {
    return <Loader />;
  }
  useEffect(() => {
    if (isAuthenticated) {
      getPicture();
    }
  }, [isAuthenticated]);

  return (
    <>
      <Head>
        <title>African || Proverbs</title>
        <meta
          name="description"
          content="Celebrating African Culture and Wisdom through Proverbs - African Proverbs"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:site_name" content="African Proverbs"></meta>
        <meta property="article:tag" content="African proverb"></meta>
        <meta property="og:url" content="https://africanproverbs.com/"></meta>
        <meta
          name="tags"
          content={`words, African proverbs, trivia, fun facts, culture, history, geography,current affairs, africa, proverbs, african, ${categoriesList?.map((item) => {
            return "African Proverb " + item.name + " category";
          })}`}
        ></meta>
        {/* ,   */}

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Hero categories={categoriesList}>
          <Navbar
            linksColor="light"
            openSidebar={toggleSidebar}
            // Twitter={Twitter}
            // Instagram={Instagram}
            // Linkedin={Linkedin}
            // Facebook={Facebook}
            Logo={Logo}
          />
        </Hero>

        {randomProverbs && (
          <PopularProverbs
            isLoading={isLoading}
            category={category}
            randomProverbs={randomProverbs}
          />
        )}

        <Sidebar toggleSidebar={toggleSidebar} sidebar={sidebar} />

        <AboutSection />
        {/* <AdSense
          adSlot={4024351708}
        /> */}
        {/* <RealCousin /> */}
        <Testimonials />
        <CustomAds />
        <Footer />
      </main>
    </>
  );
}

