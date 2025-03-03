import React, { useContext } from "react";
import SubSectionHeader from "../reuse/sub_section_header/sub_section_header";
import TrendingProverbCard from "../reuse/trending_proverb_card";
import Carousel from "better-react-carousel";
import TodaysProverbsScss from "../../styles/TodaysProverbs.module.scss";
import Loader from "../reuse/loader";
import { getAuthStatus } from "@/utils";
import { ApiContext } from "@/context/apiContext";

const TrendingProverb = () => {
  const { trendingProverb, trendingLoading } = useContext(ApiContext);

  const firstFiveTrending = trendingProverb?.slice(0, 5);
  const MAIN_CONTAINER_STYLE = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "2rem",
    width: "100%",
    maxWidth: "1500px",
    margin: "0 auto",
    // alignItems: "center"
  };


  const CONTAINER_STYLE = {
    display: "flex",
    marginBottom: "2rem",
    width: "100%",
    justifyContent: "center",
  };

  const CONTENT_STYLE = {
    display: "flex",
    justifyContent: "space-between",
    gap: "2rem",
    overflowX: "scroll",
    overflow: "hidden",
    margin: "0 auto",
  };

  return (
    <div className={TodaysProverbsScss["wapper"]} id="trendingproverbs">
      <SubSectionHeader header="Trending Proverbs" link="/trending" />

      <div className={TodaysProverbsScss["container"]}>
        <div className={TodaysProverbsScss["nested-container"]}>
          {
            trendingLoading ? (
              <div>
                <Loader />
              </div>
            ) : (
              <>
                <Carousel
                  mobileBreakpoint={400}
                  responsiveLayout={[
                    {
                      breakpoint: 700,
                      cols: 3,
                      rows: 1,
                      gap: 10,
                    },

										{
											breakpoint: 600,
											cols: 2,
											rows: 1,
											gap: 10,
										},
									]}
									cols={4}
									showDots={true}
								>
									{firstFiveTrending && firstFiveTrending?.map((item) => (
										<Carousel.Item key={item.id}>
											<TrendingProverbCard
												key={item.id}
												proverb={item.content}
												category={item.categories}
												ethnic={item.ethnic.name}
												interpretation={item.interpretation[0].content}
												transliteration={item.transliteration[0].content}
												id={item.id}
											/>
										</Carousel.Item>
									))}
								</Carousel>
							</>
						)
					}
				</div>
			</div>
		</div>
	);
};

export default TrendingProverb;
