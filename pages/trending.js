import Layout from "@/components/reuse/layout";
import React, { useContext } from "react";
import TrendingProverbCard from "@/components/reuse/trending_proverb_card";
import useApiCall from "@/hooks/useCallApi";
import { getTrendingProverbs } from "@/network/apiService";
import Loader from "@/components/reuse/loader";
import { ApiContext } from "@/context/apiContext";

const Trending = () => {
  const { trendingProverb, trendingLoading } = useContext(ApiContext);

  const MAIN_CONTAINER_STYLE = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "2rem",
    width: "100%",
    maxWidth: "1500px",
    margin: "0 auto",
  };

  const CONTAINER_STYLE = {
    display: "flex",
    marginBottom: "2rem",
    width: "100%",
    justifyContent: "center",
    padding: "2rem",
  };

  const CONTENT_STYLE = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",

    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    padding: "2rem",
    gap: "2rem",
    // // overflowX: "scroll",
    // // overflow: "hidden",
    // flexWrap: "wrap",
  };
  return (
    <div style={MAIN_CONTAINER_STYLE}>
      <Layout pageTitle="Trending Proverbs" pageLink="trending">
        <div style={CONTAINER_STYLE}>
          <div style={CONTENT_STYLE}>
            {trendingLoading ? (
              <div>
                <Loader />
              </div>
            ) : (
              trendingProverb?.map((item) => (
                <TrendingProverbCard
                  key={item.id}
                  proverb={item.content}
                  category={item.categories}
                  ethnic={item.ethnic.name}
                  id={item.id}
                />
              ))
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Trending;
