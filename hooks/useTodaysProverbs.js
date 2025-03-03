import { getTodaysProverbs } from "@/network/proverbsService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const prepareTodaysProverbs = (proverbsObj) => {
  const { preferredLanguage, selectedLanguage } = proverbsObj;

  if (preferredLanguage && selectedLanguage) {
    const streamLinedProverbsOfPreffered = preferredLanguage["proverbs"].map(
      ({ id, content, slug, categories }) => ({
        id,
        content,
        slug,
        categories,
      })
    );
    const prepared = [
      {
        ethnic_name: preferredLanguage["ethnic_name"],
        proverbs: streamLinedProverbsOfPreffered,
      },
    ];

    const streamLinedProverbsOfSelectedLanguage = selectedLanguage.map(
      ({ proverbs, ethnic_name }) => {
        const proverbsForLanguage = proverbs.map(
          ({ id, content, slug, categories }) => ({
            id,
            content,
            slug,
            categories,
          })
        );
        return {
          ethnic_name,
          proverbs: proverbsForLanguage,
        };
      }
    );

    return [...prepared, ...streamLinedProverbsOfSelectedLanguage];
  }

  return [];
};

const useTodaysProverbs = () => {
  const [todaysProverbs, setTodaysProverbs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodaysProverbs()
      .then((res) => {
        setTodaysProverbs(res.data);
      })
      .catch((e) => {
        toast.error("an error occured");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { todaysProverbs: prepareTodaysProverbs(todaysProverbs), isLoading };
};

export default useTodaysProverbs;
