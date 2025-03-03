import ProverbCard from "../reuse/proverb_card";
// import SearchResultStyles from "../../styles/Searchresult.module.scss";
import { removeHtmlTags, sliceString } from "@/utils";
import Carousel from "better-react-carousel";
import SubSectionHeader from "../reuse/sub_section_header/sub_section_header";

import useTodaysProverbs from "@/hooks/useTodaysProverbs";
import TodaysProverbsScss from "../../styles/TodaysProverbs.module.scss";
import Loader from "../reuse/loader";


export const prepare = (arr) => {
	if (!arr) return [];
	if (typeof arr === "string") return [string];
	return arr.map(({ name,id }) => ({name,id}));
};

const TodayProverb = () => {
  const { isLoading, todaysProverbs } = useTodaysProverbs();


  return (
    <div className={TodaysProverbsScss["wapper"]} id="todaysproverbs">
      <SubSectionHeader header="Today's Proverbs" />
      <div className={TodaysProverbsScss["container"]}>
        <div className={TodaysProverbsScss["nested-container"]}>
          {isLoading ? (
            // Render a loading indicator while data is being fetched
            <div>
              <Loader />
            </div>
          ) : (
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
              cols={5}
              showDots={true}
            >
              {todaysProverbs &&
                todaysProverbs.map(({ ethnic_name, proverbs }) => {
                  return proverbs.map(({ id, content, slug, categories }) => {
                    const categorArry = prepare(categories);
                    const withoutTags = removeHtmlTags(content);
                    const slicedString = sliceString(withoutTags);
                    return (
                      <Carousel.Item key={id}>
                        <ProverbCard
                          proverb={slicedString}
                          id={id}
                          category={categorArry}
                          ethnic={ethnic_name}
                          slug={slug}
                          type="Today's"
                        />
                      </Carousel.Item>
                    );
                  });
                })}
            </Carousel>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodayProverb;
