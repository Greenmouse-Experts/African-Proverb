import { getRecentQuizes } from "@/network/quizService";
import QuizCard from "./QuizCard";
import Loader from "../reuse/loader";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const RecentlyAttempted = () => {
  const [recentQuizes, setRecentQuizes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getRecentQuizes()
      .then(({ data: { data } }) => {
        setRecentQuizes(data);
        setIsLoading(true);
      })
      .catch((e) => {
        toast.error("an error occured fetching quizes");
      });
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-[1200px] mx-auto">
        {!isLoading ? (
          <div className="col-span-3 flex justify-center">
            <Loader />
          </div>
        ) : !(recentQuizes.length > 0)? (
          <h2 className="col-span-3 text-[#777] flex justify-center font-bold text-lg lg:text-2xl">
            You have no Available Quizes{" "}
          </h2>
        ) : (
          recentQuizes.map((quiz, index) => {
            return <QuizCard key={quiz.id} quiz={quiz} index={index} />;
          })
        )}
      </div>
    </div>
  );
};

export default RecentlyAttempted;
